import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, CreditCard, HandCoins, Coins } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DataTable } from "@/components/dashboard/DataTable";
import getWifiCustomers, {
  getWifiBalance,
} from "@/services/wifi";
import { useNavigate } from "react-router-dom";
import monthlyRevenue from "@/services/reports";
import { Button } from "@/components/ui/button";
import { getPendingExchange } from "@/services/exchange";
import ExchangeFrom from "@/components/balance/ExchangeFrom";
import DoneExForm from "@/components/balance/DoneExForm";
import BalancePaymentForm from "@/components/balance/BalancePaymentForm";

export default function Balance() {
  const navigate = useNavigate();

  const [totalBalance, setTotalBalance] = useState(0);
  const [todayTotal, setTodayTotal] = useState(0);
  const [monthTotal, setMonthTotal] = useState(0);

  const [openRowId, setOpenRowId] = useState<string | null>(null);
  const [isOpenEx, setIsOpenEx] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");


  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ["customers-table"],
    queryFn: getWifiCustomers,
  });

  const unpaidValue = useMemo(() => {
    const totalDebt = customers
      ?.filter((c) => c?.Balance < 0)
      ?.reduce((sum, c) => sum + Number(c?.Balance), 0);

    return Math.abs(totalDebt);
  }, [customers]);

  // Fetch dashboard data using React Query
  const { data: balance, isLoading: balanceLoading } = useQuery({
    queryKey: ["balance-table"],
    queryFn: getWifiBalance,
  });

  useEffect(() => {
    let temBalance = 0;
    balance?.WifiBalance?.map((ele) => {
      temBalance += Number(ele.amount);
    });
    balance?.WifiPayments?.map((ele) => {
      temBalance += Number(ele.Amount);
    });
    setTotalBalance(temBalance);

    // احصل على التاريخ الحالي
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth(); // صفر-based (0=يناير)
    const currentDay = today.getDate();

    // فلترة البيانات
    const paymentsThisMonth = balance?.WifiPayments?.filter((payment) => {
      const paymentDate = new Date(payment.Date);
      return (
        paymentDate.getFullYear() === currentYear &&
        paymentDate.getMonth() === currentMonth
      );
    });

    const paymentsThisDay = balance?.WifiPayments?.filter((payment) => {
      const paymentDate = new Date(payment.Date);
      return (
        paymentDate.getFullYear() === currentYear &&
        paymentDate.getMonth() === currentMonth &&
        paymentDate.getDate() === currentDay
      );
    });

    let temMonth = 0;
    paymentsThisMonth?.map((ele) => {
      temMonth += Number(ele.Amount);
    });
    setMonthTotal(temMonth);

    let temDay = 0;
    paymentsThisDay?.map((ele) => {
      temDay += Number(ele.Amount);
    });
    setTodayTotal(temDay);

  }, [balance]);



  const { data: pendingData, isLoading: pendingLoading } = useQuery({
    queryKey: ["pendingEx"],
    queryFn: getPendingExchange,
  });

  const totalAmounts = useMemo(() => {
    let sypTotal = 0;
    let usdTotal = 0;

    pendingData?.pendingList.forEach((item) => {
      sypTotal += item.sypAmount || 0;
      usdTotal += item.usdAmount || 0;
    });

    return {
      sypTotal,
      usdTotal,
    };
  }, [pendingData]);

  const { data: monthly, isLoading: monthlyLoading } = useQuery({
    queryKey: ["monthlyRevenue"],
    queryFn: monthlyRevenue,
  });

  const PendingColumns = [
    { key: "id", label: "المعرف", sortable: true, hidden: true },
    { key: "sypAmount", label: "السوري", sortable: true },
    { key: "usdAmount", label: "دولار", sortable: true },
    { key: "details", label: "التفاصيل", sortable: true },
    { key: "timestamp", label: "الوقت", sortable: true },
  ];
  const BalanceColumns = [
    { key: "amount", label: "الكمية", sortable: true },
    { key: "details", label: "التفاصيل", sortable: true },
    { key: "timestamp", label: "الوقت", sortable: true },
  ];
  const PaymentsColumns = [
    { key: "Amount", label: "الكمية", sortable: true },
    { key: "customerName", label: "اسم الزبون", sortable: true },
    { key: "type", label: "طريقة الدفع", sortable: true },
    { key: "Details", label: "التفاصيل", sortable: true },
    { key: "Date", label: "الوقت", sortable: true },
  ];
  
  const customersById = customers?.reduce((acc, customer) => {
    acc[String(customer.id)] = customer;
    return acc;
  }, {});

  
  return (
    <DashboardLayout>
      <BalancePaymentForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formTitle={formTitle}
      />

      {/* Stats Cards */}
      <div dir="rtl" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <StatsCard
            className="rounded-b-none"
            title="الرصيد الحالي"
            value={totalBalance || 0}
            description=" . فرق عن الشهر السابق"
            icon={TrendingUp}
            trend={{
              value: totalBalance - monthTotal || 0,
              isPositive: totalBalance - monthTotal > 0 ? true : false,
            }}
            loading={balanceLoading}
          />
          <div className="">
            <Button
              onClick={() => {
                setFormTitle("اضافة دفعة الى الصندوق");
                setIsOpen(true);
              }}
              className="w-1/2 rounded-l-none rounded-tr-none"
              disabled={balanceLoading}
            >
              اضف دفعة
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setFormTitle("دفع من الصندوق");
                setIsOpen(true);
              }}
              className="w-1/2 rounded-r-none rounded-tl-none"
              disabled={balanceLoading}
            >
              دفع من الصندوق
            </Button>
          </div>
        </div>
        <StatsCard
          title="ايرادات هذا الشهر"
          value={monthTotal || 0}
          description=" . اليوم"
          icon={CreditCard}
          trend={{ value: todayTotal || 0, isPositive: true }}
        />

        <StatsCard
          onClick={() => {
            navigate("/users", { state: "unpaid" });
          }}
          title="الديون"
          value={unpaidValue || 0}
          description=""
          icon={HandCoins}
          loading={customersLoading}
        />

        <div className="flex flex-col">
          <StatsCard
            className="rounded-b-none"
            title="للتحويل"
            value={totalAmounts.sypTotal}
            description=" . دولار"
            icon={Coins}
            trend={{
              value: totalAmounts?.usdTotal || 0,
              isPositive: false,
            }}
            loading={pendingLoading}
          />
          <ExchangeFrom
            className={"rounded-t-none w-full"}
            isOpen={isOpenEx}
            setIsOpen={setIsOpenEx}
          />
        </div>
      </div>

      {/* Charts Section */}
      <ChartContainer
        className="mdL:col-span-2"
        title=" الحركة المالية "
        data={
          monthly
            ? Object.entries(monthly).map(([month, values]: any) => ({
                name: month,
                الفواتير: values.invoices,
                المدفوعات: values.payments,
              }))
            : []
        }
        type="area"
        dataKey2="المدفوعات"
        dataKey="الفواتير"
      />

      {/* Data Tables */}
      <div dir="rtl" className="flex flex-col md:flex-row gap-4">
        <DataTable
          title="الصندوق"
          description=""
          columns={BalanceColumns}
          data={balance?.WifiBalance ? [...balance.WifiBalance].reverse() : []}
        />
        <DataTable
          title="الدفعات"
          description="دفعات المشتركين"
          columns={PaymentsColumns}
          data={
            balance?.WifiPayments
              ? balance.WifiPayments.map((payment) => ({
                  ...payment,
                  customerName:
                    customersById?.[String(payment.SubscriberID)]?.Name ||
                    "غير معروف",
                })).reverse()
              : []
          }
        />

        <DataTable
          title="دفعات للتحويل"
          description=""
          columns={PendingColumns}
          data={pendingData?.pendingList ? pendingData?.pendingList : []}
          renderRowActions={(x) => (
            <DoneExForm
              isOpen={openRowId === x.id}
              setIsOpen={(v) => setOpenRowId(v ? x.id : null)}
              className=""
              SYPAmount={x.sypAmount}
              USDAmount={x.usdAmount}
              pendingId={x.id}
            />
          )}
        />
      </div>
    </DashboardLayout>
  );
}
