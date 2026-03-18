import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  CreditCard,
  ReceiptIcon,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { type Dayjs } from "dayjs";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getWifiCustomers from "@/services/wifi";
import getTodayBalance, { getBalanceByDate } from "@/services/balance";
import getPendingInvoices from "@/services/invoices";
import { getStoredUser } from "@/lib/auth";
import { usePendingPaymentsRealtime } from "@/hooks/usePendingPaymentsRealtime";

interface Customer {
  id?: string;
  Name?: string;
  UserName?: string;
  Balance: number;
  SubscriptionSpeed: number | string;
  dealer?: string;
  sender?: string;
}

interface DailyBalanceEntry {
  id?: string | number;
  total: number;
  count?: number;
}

interface PendingTransaction {
  _id: string;
  amount: number;
  company: string;
  status: string;
  createdAt?: string;
  email?: string;
  landline?: string;
}

function formatCurrency(value: number) {
  return Number(value || 0).toLocaleString("en-SY");
}

function formatRelativeTime(timestamp?: string) {
  if (!timestamp) {
    return "بدون وقت";
  }

  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffMinutes = Math.max(Math.floor(diffMs / 60000), 0);

  if (diffMinutes < 1) {
    return "الآن";
  }

  if (diffMinutes < 60) {
    return `منذ ${diffMinutes} دقيقة`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `منذ ${diffHours} ساعة`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `منذ ${diffDays} يوم`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const currentUser = getStoredUser();
  const [todayBalance, setTodayBalance] = useState<DailyBalanceEntry[]>([]);
  const [balanceDate, setBalanceDate] = useState("");

  usePendingPaymentsRealtime(Boolean(currentUser));

  const { data: pendingData = [], isLoading: pendingLoading } = useQuery<
    PendingTransaction[]
  >({
    queryKey: ["pending-table"],
    queryFn: getPendingInvoices,
    enabled: currentUser?.role === "admin",
  });

  const { data: monthBalance = [], isLoading: monthBalanceLoading } = useQuery({
    queryKey: ["monthBalance-table", balanceDate],
    queryFn: () => getBalanceByDate(balanceDate),
  });

  const { data: customers = [], isLoading: customersLoading } = useQuery<
    Customer[]
  >({
    queryKey: ["customers-table"],
    queryFn: getWifiCustomers,
    select: (response: Customer[] | undefined) => {
      if (!response) {
        return [];
      }

      if (currentUser?.role === "dealer") {
        return response.filter((customer) => customer.dealer === "habeb");
      }

      return response;
    },
  });

  useEffect(() => {
    async function loadTodayBalance() {
      const response = await getTodayBalance("");

      if (response?.success) {
        setTodayBalance(response.BalanceTable);
      }
    }

    void loadTodayBalance();
  }, []);

  const totalBalance = useMemo(
    () => todayBalance.reduce((sum, item) => sum + Number(item.total), 0),
    [todayBalance],
  );

  const totalTransactionsToday = useMemo(
    () => todayBalance.reduce((sum, item) => sum + Number(item.count || 0), 0),
    [todayBalance],
  );

  const totalSpeed = useMemo(
    () =>
      customers.reduce(
        (sum, customer) => sum + Number(customer.SubscriptionSpeed),
        0,
      ),
    [customers],
  );

  const debtCustomers = useMemo(
    () =>
      customers
        .filter((customer) => Number(customer.Balance) < 0)
        .sort((a, b) => Number(a.Balance) - Number(b.Balance)),
    [customers],
  );

  const unpaidValue = useMemo(() => {
    const totalDebt = debtCustomers.reduce(
      (sum, customer) => sum + Number(customer.Balance),
      0,
    );

    return Math.abs(totalDebt);
  }, [debtCustomers]);

  const averageDebt = useMemo(
    () => (debtCustomers.length ? unpaidValue / debtCustomers.length : 0),
    [debtCustomers.length, unpaidValue],
  );

  const customersSpeedData = useMemo(() => {
    const speedMap: Record<string, { name: string; value: number }> = {};

    customers.forEach((customer) => {
      const speed = String(customer.SubscriptionSpeed || "غير محددة");

      if (!speedMap[speed]) {
        speedMap[speed] = { name: `${speed} Mbps`, value: 0 };
      }

      speedMap[speed].value += 1;
    });

    return Object.values(speedMap);
  }, [customers]);

  const senderDistributionData = useMemo(
    () =>
      customers.reduce(
        (
          acc: Array<{
            sender: string;
            totalSpeed: number;
            customerCount: number;
          }>,
          customer,
        ) => {
          const sender = (customer.sender ?? "غير محدد").trim() || "غير محدد";
          const subscriptionSpeed = Number(customer.SubscriptionSpeed);
          const existing = acc.find((item) => item.sender === sender);

          if (existing) {
            existing.totalSpeed += subscriptionSpeed;
            existing.customerCount += 1;
            return acc;
          }

          acc.push({
            sender,
            totalSpeed: subscriptionSpeed,
            customerCount: 1,
          });
          return acc;
        },
        [],
      ),
    [customers],
  );

  const topSender = useMemo(
    () =>
      [...senderDistributionData].sort(
        (a, b) => b.customerCount - a.customerCount,
      )[0],
    [senderDistributionData],
  );

  const watchlistCustomers = useMemo(
    () => debtCustomers.slice(0, 5),
    [debtCustomers],
  );

  const recentPendingPayments = useMemo(
    () =>
      [...pendingData]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        )
        .slice(0, 5),
    [pendingData],
  );

  const pendingByStatus = useMemo(() => {
    const statusMap: Record<string, number> = {};

    pendingData.forEach((payment) => {
      const status = payment.status || "غير معروف";
      statusMap[status] = (statusMap[status] || 0) + 1;
    });

    return Object.entries(statusMap).map(([name, value]) => ({ name, value }));
  }, [pendingData]);

  const quickInsights = useMemo(
    () => [
      {
        label: "أعلى مرسل",
        value: topSender
          ? `${topSender.sender} (${topSender.customerCount})`
          : "لا يوجد بيانات",
      },
      {
        label: "متوسط الدين",
        value: debtCustomers.length ? `${formatCurrency(averageDebt)} USD` : "0",
      },
      {
        label: "عمليات اليوم",
        value: `${totalTransactionsToday}`,
      },
      {
        label: "حجم السرعات",
        value: `${totalSpeed} Mbps`,
      },
    ],
    [averageDebt, debtCustomers.length, topSender, totalSpeed, totalTransactionsToday],
  );

  const isAdmin = currentUser?.role === "admin";

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div
          dir="rtl"
          className={`grid gap-4 ${isAdmin ? "md:grid-cols-2 xl:grid-cols-5" : "md:grid-cols-2 xl:grid-cols-4"}`}
        >
          <StatsCard
            onClick={() => navigate("/users")}
            title="عدد مشتركين الفضائي"
            value={customers.length}
            icon={Users}
            loading={customersLoading}
            description={`${formatCurrency(totalSpeed)} Mbps مجموع السرعات`}
          />
          <StatsCard
            onClick={() => navigate("/users", { state: "unpaid" })}
            title="ديون الفضائي"
            value={`${formatCurrency(unpaidValue)} USD`}
            icon={CreditCard}
            loading={customersLoading}
            description={`${debtCustomers.length} مشترك بحاجة متابعة`}
          />
          <StatsCard
            onClick={() => navigate("/users", { state: "unpaid" })}
            title="العملاء الخطرين"
            value={debtCustomers.length}
            icon={AlertTriangle}
            loading={customersLoading}
            description={
              debtCustomers.length
                ? `${formatCurrency(averageDebt)} USD متوسط الدين`
                : "لا يوجد ديون حالياً"
            }
          />
          <StatsCard
            title="أفضل مرسل"
            value={topSender?.sender || "غير محدد"}
            icon={TrendingUp}
            loading={customersLoading}
            description={
              topSender
                ? `${topSender.customerCount} مشترك / ${topSender.totalSpeed} Mbps`
                : "لا يوجد بيانات"
            }
          />
          {isAdmin && (
            <StatsCard
              onClick={() => navigate("/PendingTransactions")}
              title="الفواتير الغير مدفوعة"
              value={pendingData.length}
              icon={ReceiptIcon}
              loading={pendingLoading}
              description={
                pendingData.length
                  ? `${formatCurrency(
                      pendingData.reduce(
                        (sum, payment) => sum + Number(payment.amount || 0),
                        0,
                      ),
                    )} SYP بانتظار المعالجة`
                  : "لا يوجد طلبات معلقة"
              }
            />
          )}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr_1fr]">
          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                قائمة المتابعة
              </CardTitle>
              <CardDescription>
                أعلى العملاء ديوناً ويحتاجون تواصل سريع.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {watchlistCustomers.length ? (
                watchlistCustomers.map((customer) => (
                  <button
                    key={customer.id || customer.UserName}
                    type="button"
                    className="flex w-full items-center justify-between rounded-lg border px-3 py-3 text-right transition-colors hover:bg-accent/30"
                    onClick={() =>
                      customer.id && navigate(`/CustomerDetails/${customer.id}`)
                    }
                  >
                    <div className="space-y-1">
                      <p className="font-semibold">
                        {customer.Name || customer.UserName || "بدون اسم"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {customer.sender || "غير محدد"} /{" "}
                        {customer.SubscriptionSpeed} Mbps
                      </p>
                    </div>
                    <span className="font-bold text-destructive">
                      {formatCurrency(Math.abs(Number(customer.Balance)))} USD
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  لا يوجد عملاء بحاجة متابعة حالياً.
                </p>
              )}
            </CardContent>
          </Card>

          <Card dir="rtl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Wallet className="h-5 w-5 text-primary" />
                ملخص سريع
              </CardTitle>
              <CardDescription>
                مؤشرات تشغيلية مختصرة من نفس بيانات الصفحة.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickInsights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border px-3 py-3"
                >
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-semibold">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {isAdmin && (
            <Card dir="rtl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5 text-emerald-500" />
                  آخر الطلبات المعلقة
                </CardTitle>
                <CardDescription>
                  أحدث الطلبات التي وصلت وتحتاج متابعة من الإدارة.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentPendingPayments.length ? (
                  recentPendingPayments.map((payment) => (
                    <button
                      key={payment._id}
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg border px-3 py-3 text-right transition-colors hover:bg-accent/30"
                      onClick={() => navigate("/PendingTransactions")}
                    >
                      <div className="space-y-1">
                        <p className="font-semibold">{payment.company}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.status} / {formatRelativeTime(payment.createdAt)}
                        </p>
                      </div>
                      <span className="font-bold">
                        {formatCurrency(Number(payment.amount || 0))} SYP
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    لا يوجد طلبات معلقة حالياً.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid gap-6 text-center lg:grid-cols-2">
          {isAdmin && (
            <ChartContainer
              className="col-span-2"
              title="صناديق اليوم"
              data={todayBalance as any}
              type="line"
              dataKey2="count"
              desc={totalBalance.toString()}
              dataKey="total"
            />
          )}

          <ChartContainer
            className="mdL:col-span-2"
            title="توزيع المرسلات"
            data={senderDistributionData as any}
            type="bar"
            dataKey2="customerCount"
            dataKey="totalSpeed"
          />

          <ChartContainer
            title="عدد المشتركين حسب السرعة"
            type="pie"
            dataKey="value"
            data={customersSpeedData}
            desc={`${totalSpeed} Mbps`}
          />
        </div>

        {isAdmin && (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card dir="rtl">
                  <CardHeader>
                    <CardTitle>حالة الطلبات الحالية</CardTitle>
                    <CardDescription>
                      توزيع الطلبات المعلقة حسب الحالة.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      title="حالة المدفوعات"
                      type="pie"
                      dataKey="value"
                      data={pendingByStatus}
                      desc={`${pendingData.length} طلب`}
                    />
                  </CardContent>
                </Card>

                <Card dir="rtl">
                  <CardHeader>
                    <CardTitle>مؤشرات اليوم</CardTitle>
                    <CardDescription>
                      عرض سريع لما حدث خلال اليوم الحالي.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border p-4 text-right">
                      <p className="text-sm text-muted-foreground">
                        مجموع صناديق اليوم
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {formatCurrency(totalBalance)} SYP
                      </p>
                    </div>
                    <div className="rounded-lg border p-4 text-right">
                      <p className="text-sm text-muted-foreground">
                        عدد العمليات اليوم
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {totalTransactionsToday}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4 text-right">
                      <p className="text-sm text-muted-foreground">
                        العملاء المديونون
                      </p>
                      <p className="mt-2 text-2xl font-bold">
                        {debtCustomers.length}
                      </p>
                    </div>
                    <div className="rounded-lg border p-4 text-right">
                      <p className="text-sm text-muted-foreground">
                        أعلى مرسل
                      </p>
                      <p className="mt-2 text-lg font-bold">
                        {topSender?.sender || "غير محدد"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4 text-center">
              <div className="grid gap-6">
                <div className="bg-background/80 text-foreground">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker", "DatePicker", "DatePicker"]}
                    >
                      <DatePicker
                        views={["month", "year"]}
                        value={balanceDate ? dayjs(balanceDate) : null}
                        onChange={(newValue: Dayjs | null) => {
                          setBalanceDate(newValue ? newValue.format("YYYY-MM") : "");
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <ChartContainer
                  title="صناديق الشهر الحالي"
                  data={monthBalance}
                  type="stackBar"
                  dataKey="users"
                  loading={monthBalanceLoading}
                />
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-3">
                <Card dir="rtl">
                  <CardHeader>
                    <CardTitle>اقتراح تقارير</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>أكبر العملاء ديوناً خلال الشهر</p>
                    <p>أداء الموظفين حسب عمليات الصندوق</p>
                    <p>تغير حجم كل مرسل عبر الأشهر</p>
                  </CardContent>
                </Card>
                <Card dir="rtl">
                  <CardHeader>
                    <CardTitle>ماذا تضيف لاحقاً</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>مقارنة شهرية بالنسبة المئوية</p>
                    <p>فلتر زمني موحد لكل الصفحة</p>
                    <p>تصدير مباشر للتقارير PDF / Excel</p>
                  </CardContent>
                </Card>
                <Card dir="rtl">
                  <CardHeader>
                    <CardTitle>أقصر طريق للعمل</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>راجع قائمة المتابعة يومياً</p>
                    <p>افتح الطلبات المعلقة مباشرة من البطاقة</p>
                    <p>تابع أفضل المرسلين عند تغير الحمل</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </DashboardLayout>
  );
}
