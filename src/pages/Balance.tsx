import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TrendingUp, CreditCard, HandCoins, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import ExchangeFrom from "@/components/balance/ExchangeFrom";
import DoneExForm from "@/components/balance/DoneExForm";
import BalancePaymentForm from "@/components/balance/BalancePaymentForm";
import getWifiCustomers, { getWifiBalance } from "@/services/wifi";
import monthlyRevenue from "@/services/reports";
import { getPendingExchange } from "@/services/exchange";


export default function Balance() {
  const navigate = useNavigate();

  /* ===================== UI State ===================== */
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentTitle, setPaymentTitle] = useState("");
  const [isExchangeOpen, setIsExchangeOpen] = useState(false);
  const [activePendingId, setActivePendingId] = useState<string | null>(null);

  /* ===================== Queries ===================== */

  const { data: customers, isLoading: customersLoading } = useQuery({
    queryKey: ["customers-table"],
    queryFn: getWifiCustomers,
  });

  const { data: balance, isLoading: balanceLoading } = useQuery({
    queryKey: ["balance-table"],
    queryFn: getWifiBalance,
  });

  const { data: pendingData, isLoading: pendingLoading } = useQuery({
    queryKey: ["pending-exchange"],
    queryFn: getPendingExchange,
  });

  const { data: monthly } = useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: monthlyRevenue,
  });

  /* ===================== Computed Values ===================== */


  const paymentsByType = useMemo<any>(() => {
    const initial: any = {
      cash: { total: 0, count: 0 },
      shamCash: { total: 0, count: 0 },
      other: { total: 0, count: 0 },
    };

    if (!balance?.WifiPayments) return initial;

    balance.WifiPayments.forEach((payment) => {
      const amount = Number(payment.Amount) || 0;
      const type = payment.type as any;

      if (type === "cash" || type === "shamCash") {
        initial[type].total += amount;
        initial[type].count += 1;
      } else {
        initial.other.total += amount;
        initial.other.count += 1;
      }
    });
    
    balance.WifiBalance.forEach((payment) => {
      const amount = Number(payment.Amount) || 0;
      const type = payment.type as any;

      if (type === "cash" || type === "shamCash") {
        initial[type].total += amount;
        initial[type].count += 1;
      } else {
        initial.other.total += amount;
        initial.other.count += 1;
      }
    });

    return initial;
  }, [balance]);

  const customersById = useMemo(() => {
    return (customers as any[])?.reduce<Record<string, any>>((acc, c) => {
      acc[String(c.id)] = c;
      return acc;
    }, {});
  }, [customers]);

  const unpaidValue = useMemo(() => {
    const debt =
      customers
        ?.filter((c) => Number(c.Balance) < 0)
        .reduce((sum, c) => sum + Number(c.Balance), 0) ?? 0;

    return Math.abs(debt);
  }, [customers]);

  const totalBalance = useMemo(() => {
    if (!balance) return 0;

    const box =
      balance.WifiBalance?.reduce((sum, b) => sum + Number(b.amount), 0) ?? 0;

    const payments =
      balance.WifiPayments?.reduce((sum, p) => sum + Number(p.Amount), 0) ?? 0;

    return box + payments;
  }, [balance]);

  const today = new Date();

  const { monthTotal, todayTotal } = useMemo(() => {
    if (!balance?.WifiPayments) return { monthTotal: 0, todayTotal: 0 };

    let month = 0;
    let day = 0;

    balance.WifiPayments.forEach((p) => {
      const d = new Date(p.Date);

      if (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth()
      ) {
        month += Number(p.Amount);

        if (d.getDate() === today.getDate()) {
          day += Number(p.Amount);
        }
      }
    });

    return { monthTotal: month, todayTotal: day };
  }, [balance]);

  const pendingTotals = useMemo(() => {
    let syp = 0;
    let usd = 0;

    pendingData?.pendingList?.forEach((p) => {
      syp += p.sypAmount || 0;
      usd += p.usdAmount || 0;
    });

    return { syp, usd };
  }, [pendingData]);

  /* ===================== Columns ===================== */

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

  const PendingColumns = [
    { key: "id", label: "ID", hidden: true },
    { key: "sypAmount", label: "السوري", sortable: true },
    { key: "usdAmount", label: "دولار", sortable: true },
    { key: "details", label: "التفاصيل", sortable: true },
    { key: "timestamp", label: "الوقت", sortable: true },
  ];

  /* ===================== Render ===================== */

  return (
    <DashboardLayout>
      {/* Payment Form */}
      <BalancePaymentForm
        isOpen={isPaymentOpen}
        setIsOpen={setIsPaymentOpen}
        formTitle={paymentTitle}
      />

      {/* ===================== Stats ===================== */}
      <div dir="rtl" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <StatsCard
            className="rounded-b-none"
            title="الرصيد الحالي"
            value={totalBalance}
            icon={TrendingUp}
            trend={{
              value: totalBalance - monthTotal,
              isPositive: totalBalance - monthTotal > 0,
            }}
            loading={balanceLoading}
          />

          <div className="flex">
            <Button
              className="w-1/2 rounded-l-none rounded-t-none"
              onClick={() => {
                setPaymentTitle("إضافة دفعة إلى الصندوق");
                setIsPaymentOpen(true);
              }}
            >
              إضافة
            </Button>

            <Button
              variant="destructive"
              className="w-1/2 rounded-r-none rounded-t-none"
              onClick={() => {
                setPaymentTitle("دفع من الصندوق");
                setIsPaymentOpen(true);
              }}
            >
              سحب
            </Button>
          </div>
        </div>

        <StatsCard
          title="إيرادات هذا الشهر"
          value={monthTotal}
          icon={CreditCard}
          trend={{ value: todayTotal, isPositive: true }}
        />

        <StatsCard
          title="مقبوضات الشام كاش"
          value={paymentsByType.shamCash.total}
          icon={CreditCard}
        />

        <StatsCard
          title="مقبوضات كاش"
          value={paymentsByType.cash.total}
          icon={CreditCard}
        />

        <StatsCard
          title="الديون"
          value={unpaidValue}
          icon={HandCoins}
          loading={customersLoading}
          onClick={() => navigate("/users", { state: "unpaid" })}
        />

        <div>
          <StatsCard
            className="rounded-b-none"
            title="للتحويل"
            value={pendingTotals.syp}
            icon={Coins}
            trend={{ value: pendingTotals.usd, isPositive: false }}
            loading={pendingLoading}
          />

          <ExchangeFrom
            className="rounded-t-none"
            isOpen={isExchangeOpen}
            setIsOpen={setIsExchangeOpen}
          />
        </div>
      </div>

      {/* ===================== Chart ===================== */}
      <ChartContainer
        title="الحركة المالية"
        type="area"
        dataKey="الفواتير"
        dataKey2="المدفوعات"
        data={
          monthly
            ? Object.entries(monthly).map(([month, v]: any) => ({
                name: month,
                الفواتير: v.invoices,
                المدفوعات: v.payments,
              }))
            : []
        }
      />

      {/* ===================== Tables ===================== */}
      <div dir="rtl" className="flex flex-col md:flex-row gap-4">
        <DataTable
          title="الصندوق"
          columns={BalanceColumns}
          data={[...(balance?.WifiBalance ?? [])].reverse()}
        />

        <DataTable
          title="الدفعات"
          columns={PaymentsColumns}
          data={
            balance?.WifiPayments?.map((p) => ({
              ...p,
              customerName:
                customersById?.[String(p.SubscriberID)]?.Name || "غير معروف",
            })).reverse() ?? []
          }
        />

        <DataTable
          title="دفعات للتحويل"
          columns={PendingColumns}
          data={pendingData?.pendingList ?? []}
          renderRowActions={(row) => (
            <DoneExForm
              className={""}
              isOpen={activePendingId === row.id}
              setIsOpen={(v) => setActivePendingId(v ? row.id : null)}
              SYPAmount={row.sypAmount}
              USDAmount={row.usdAmount}
              pendingId={row.id}
            />
          )}
        />
      </div>
    </DashboardLayout>
  );
}
