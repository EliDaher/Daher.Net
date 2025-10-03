import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBalanceByDate } from "@/services/balance";
import { getDoneInvoices } from "@/services/invoices";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

export default function Analytics() {

  const [monthBalance, setMonthBalance] = useState([])
  const [balanceDate, setBalanceDate] = useState('')

  const { data: doneData, isLoading: doneLoading } = useQuery({
    queryKey: ['done-table'],
    queryFn: getDoneInvoices,
    staleTime: 1000 * 60 * 1
  });

  const getMonthTable = async () => {
    const res = await getBalanceByDate("");
    if(res?.success){
      setMonthBalance(res.BalanceTable);
    }else{
      console.error(res)
    }
  }


  type Payment = {
    _id: string;
    landline: string;
    company: string;
    speed: string;
    email: string;
    amount: number;
    paymentType: string;
    status: string;
    note: string;
    user: string;
    createdAt: string;
    __v: number;
  };

  type Aggregated = {
    company: string;
    date: string;
    sumAmount: number;
    avgAmount: number;
    count: number;
  };

  function aggregatePayments(data: Payment[]): Aggregated[] {
    const map = new Map<
      string,
      { sum: number; count: number; days: Set<string> }
    >();

    data?.forEach((item) => {
      // استخراج السنة والشهر واليوم
      const dateObj = new Date(item.createdAt);
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const monthKey = `${year}-${month}`;
      const dayKey = `${year}-${month}-${day}`;

      const key = `${item.company}_${monthKey}`;

      if (!map.has(key)) {
        map.set(key, { sum: 0, count: 0, days: new Set() });
      }

      const current = map.get(key)!;
      current.sum += item.amount;
      current.count += 1;
      current.days.add(dayKey); // نخزن اليوم حتى نحسب المتوسط
    });

    return Array.from(map.entries())
      .filter(([key]) => key.includes(balanceDate)) // فلترة حسب الشهر المطلوب
      .map(([key, value]) => {
        const [company, date] = key.split("_");
        const uniqueDays = value.days.size;
        return {
          company,
          date, // YYYY-MM
          sumAmount: value.sum,
          avgAmount: uniqueDays > 0 ? value.sum / uniqueDays : 0, // المتوسط اليومي
          count: value.count, // عدد الدفعات
          days: uniqueDays,   // عدد الأيام الفعلية التي تم الدفع فيها
        };
      });
  }

  const totalAmount = useMemo(() => {
    return aggregatePayments(doneData).reduce((sum, c) => sum + Number(c.sumAmount), 0);
  }, [aggregatePayments(doneData)]);


  useEffect(() => {
    getMonthTable();
  }, []);

  const DoneColumns = [
    { key: 'company', label: 'الشركة', sortable: true },
    { key: 'date', label: 'التاريخ', sortable: true },
    { key: 'sumAmount', label: 'مجموع التسديد', sortable: true },
    { key: 'count', label: 'العدد', sortable: true },
    { key: 'avgAmount', label: 'المتوسط', sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="grid gap-6">
        <CardHeader>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into your business metrics and performance insights.
          </p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker', 'DatePicker']}>
              <DatePicker
                views={['month', 'year']}
                value={dayjs(balanceDate)}
                onChange={(newValue) => {
                  const formatted = newValue.format('YYYY-MM');
                  setBalanceDate(formatted);
                  getBalanceByDate(formatted).then(res => {
                    if (res?.success) {
                      setMonthBalance(res.BalanceTable);
                    }
                  });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <ChartContainer
                title={!balanceDate ? "تقرير الشهر الحالي" : "تقرير الشهر " + dayjs(balanceDate).format("M")}
                data={monthBalance || []}
                type="stackBar"
                dataKey="users"
              />
            </div>
            <div dir="rtl">
              <DataTable
                title="التسديد"
                description={totalAmount.toString()}
                columns={DoneColumns}
                data={(doneData && !doneData.error) ? aggregatePayments(doneData) : []}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
