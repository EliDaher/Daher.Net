import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBalanceByDate } from "@/services/balance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Analytics() {

  const [monthBalance, setMonthBalance] = useState([])
  const [balanceDate, setBalanceDate] = useState('')

  const getMonthTable = async () => {
    const res = await getBalanceByDate("");
    if(res?.success){
      setMonthBalance(res.BalanceTable);
    }else{
      console.error(res)
    }
  }


  useEffect(() => {
    getMonthTable();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into your business metrics and performance insights.
          </p>
        </div>
        <div className="grid gap-6 text-center">
          <div className="bg-background/80 text-foreground">
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
          </div>
          <ChartContainer
            title={!balanceDate ? "تقرير الشهر الحالي" : "تقرير الشهر " + dayjs(balanceDate).format("M")}
            data={monthBalance || []}
            type="stackBar"
            dataKey="users"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
