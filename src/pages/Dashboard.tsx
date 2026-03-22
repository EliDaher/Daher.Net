import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CreditCard,
  ReceiptIcon,
  ShieldAlert,
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
import { Badge } from "@/components/ui/badge";
import getWifiCustomers from "@/services/wifi";
import getTodayBalance, { getBalanceByDate } from "@/services/balance";
import getPendingInvoices from "@/services/invoices";
import { getAllCompanies } from "@/services/companies";
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

interface ProviderCompany {
  id?: string;
  name: string;
  balance: number;
  balanceLimit: number;
  lastUpdate?: string;
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
  const isAdmin = currentUser?.role === "admin";
  const [balanceDate, setBalanceDate] = useState(dayjs().format("YYYY-MM"));

  usePendingPaymentsRealtime(Boolean(currentUser));

  const { data: pendingData = [], isLoading: pendingLoading } = useQuery<
    PendingTransaction[]
  >({
    queryKey: ["pending-table"],
    queryFn: getPendingInvoices,
    enabled: isAdmin,
  });

  const { data: monthBalance = [], isLoading: monthBalanceLoading } = useQuery({
    queryKey: ["monthBalance-table", balanceDate],
    queryFn: () => getBalanceByDate(balanceDate),
    enabled: isAdmin,
  });

  const { data: providerCompanies = [], isLoading: providersLoading } = useQuery<
    ProviderCompany[]
  >({
    queryKey: ["provider-companies-dashboard"],
    queryFn: async () => (await getAllCompanies()) as ProviderCompany[],
    enabled: isAdmin,
  });

  const { data: todayBalance = [], isLoading: todayBalanceLoading } = useQuery<
    DailyBalanceEntry[]
  >({
    queryKey: ["todayBalance-table"],
    queryFn: async () => {
      const response = await getTodayBalance("");
      return response?.success ? response.BalanceTable : [];
    },
    enabled: Boolean(currentUser),
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

  const pendingByCompany = useMemo(() => {
    const company: Record<string, number> = {};

    pendingData.forEach((payment) => {
      const name = payment.company || "غير معروف";
      company[name] = (company[name] || 0) + 1;
    });

    return Object.entries(company).map(([name, value]) => ({ name, value }));
  }, [pendingData]);

  const pendingTotalAmount = useMemo(
    () =>
      pendingData.reduce((sum, payment) => sum + Number(payment.amount || 0), 0),
    [pendingData],
  );

  const lowBalanceProviders = useMemo(
    () =>
      providerCompanies
        .filter(
          (company) =>
            Number(company.balance) <= Number(company.balanceLimit || 0),
        )
        .sort((a, b) => Number(a.balance) - Number(b.balance)),
    [providerCompanies],
  );

  const criticalProviders = useMemo(
    () =>
      lowBalanceProviders.filter(
        (company) => Number(company.balance) <= 0,
      ).length,
    [lowBalanceProviders],
  );

  const providerBalanceChartData = useMemo(
    () =>
      lowBalanceProviders.slice(0, 8).map((company) => ({
        sender: company.name,
        balance: Number(company.balance || 0),
        balanceLimit: Number(company.balanceLimit || 0),
      })),
    [lowBalanceProviders],
  );

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
        value: `${formatCurrency(totalSpeed)} Mbps`,
      },
    ],
    [
      averageDebt,
      debtCustomers.length,
      topSender,
      totalSpeed,
      totalTransactionsToday,
    ],
  );

  const currentMonthLabel = useMemo(() => {
    if (!balanceDate) {
      return "الشهر الحالي";
    }

    return dayjs(`${balanceDate}-01`).format("MMMM YYYY");
  }, [balanceDate]);

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <Card className="border-primary/20 bg-gradient-to-l from-primary/5 to-background">
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">
                لوحة التحكم التشغيلية
              </CardTitle>
              <CardDescription>
                نظرة لحظية على المشتركين، الديون، والطلبات المعلقة مع مسارات
                متابعة سريعة.
              </CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1">
                <Users className="h-3.5 w-3.5" />
                {currentUser?.username || "مستخدم"}
              </Badge>
              <Badge variant={isAdmin ? "default" : "secondary"}>
                {isAdmin ? "صلاحية مدير" : "صلاحية موظف"}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {currentMonthLabel}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div
          className={`grid gap-4 ${isAdmin ? "md:grid-cols-2 xl:grid-cols-6" : "md:grid-cols-2 xl:grid-cols-4"}`}
        >
          <StatsCard
            onClick={() => navigate("/users")}
            title="عدد المشتركين"
            value={customers.length}
            icon={Users}
            loading={customersLoading}
            description={`${formatCurrency(totalSpeed)} Mbps إجمالي السرعات`}
          />
          <StatsCard
            onClick={() => navigate("/users", { state: "unpaid" })}
            title="إجمالي الديون"
            value={`${formatCurrency(unpaidValue)} USD`}
            icon={CreditCard}
            loading={customersLoading}
            description={`${debtCustomers.length} مشترك بحاجة متابعة`}
          />
          <StatsCard
            onClick={() => navigate("/users", { state: "unpaid" })}
            title="عملاء عاليي المخاطر"
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
                ? `${topSender.customerCount} مشترك / ${formatCurrency(topSender.totalSpeed)} Mbps`
                : "لا يوجد بيانات"
            }
          />
          {isAdmin && (
            <StatsCard
              onClick={() => navigate("/PendingTransactions")}
              title="الفواتير غير المدفوعة"
              value={pendingData.length}
              icon={ReceiptIcon}
              loading={pendingLoading}
              description={
                pendingData.length
                  ? `${formatCurrency(pendingTotalAmount)} SYP بانتظار المعالجة`
                  : "لا يوجد طلبات معلقة"
              }
            />
          )}
          {isAdmin && (
            <StatsCard
              onClick={() => navigate("/companies")}
              title="مزودون تحت الحد"
              value={lowBalanceProviders.length}
              icon={ShieldAlert}
              loading={providersLoading}
              description={
                lowBalanceProviders.length
                  ? `${criticalProviders} أرصدة حرجة (<= 0)`
                  : "جميع المزودين ضمن الحدود الآمنة"
              }
            />
          )}
          {/* {isAdmin && (
            <StatsCard
              onClick={() => navigate("/companies")}
              title="إجمالي أرصدة المزودين"
              value={`${formatCurrency(providersTotalBalance)} SYP`}
              icon={Building2}
              loading={providersLoading}
              description={
                topProvider
                  ? `أعلى رصيد: ${topProvider.name}`
                  : "لا يوجد بيانات مزودين"
              }
            />
          )} */}
        </div>

        <div
          className={`grid gap-6 ${
            isAdmin
              ? "xl:grid-cols-[1.2fr_1fr_1fr_1fr]"
              : "xl:grid-cols-[1.2fr_1fr]"
          }`}
        >
          <Card>
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

          <Card>
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
                <div key={item.label} className="rounded-lg border px-3 py-3">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-semibold">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {isAdmin && (
            <Card>
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
                        <p className="font-semibold">
                          {payment.company || "غير معروف"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {payment.status || "جديد"} /{" "}
                          {formatRelativeTime(payment.createdAt)}
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

          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldAlert className="h-5 w-5 text-destructive" />
                  تنبيهات أرصدة المزودين
                </CardTitle>
                <CardDescription>
                  المزودون الذين وصلوا للحد الأدنى أو أقل ويحتاجون تعبئة عاجلة.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {lowBalanceProviders.slice(0, 5).length ? (
                  lowBalanceProviders.slice(0, 5).map((provider) => (
                    <button
                      key={provider.id || provider.name}
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg border px-3 py-3 text-right transition-colors hover:bg-accent/30"
                      onClick={() => navigate("/companies")}
                    >
                      <div className="space-y-1">
                        <p className="font-semibold">{provider.name}</p>
                        <p className="text-sm text-muted-foreground">
                          الحد الأدنى:{" "}
                          {formatCurrency(Number(provider.balanceLimit || 0))}{" "}
                          SYP
                        </p>
                      </div>
                      <span className="font-bold text-destructive">
                        {formatCurrency(Number(provider.balance || 0))} SYP
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">
                    لا يوجد مزودون تحت الحد الأدنى حالياً.
                  </p>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid gap-6 text-center lg:grid-cols-2">
          {isAdmin && (
            <ChartContainer
              className="md:col-span-2"
              title="صناديق اليوم"
              data={todayBalance as any}
              type="line"
              dataKey2="count"
              desc={totalBalance.toString()}
              dataKey="total"
              loading={todayBalanceLoading}
            />
          )}

          <ChartContainer
            className="md:col-span-2"
            title="توزيع المرسلين"
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
            desc={`${formatCurrency(totalSpeed)} Mbps`}
          />

          {isAdmin && providerBalanceChartData.length > 0 && (
            <ChartContainer
              title="مقارنة رصيد المزودين منخفضي الرصيد"
              type="bar"
              data={providerBalanceChartData as any}
              dataKey="balance"
              dataKey2="balanceLimit"
            />
          )}
        </div>

        {isAdmin && (
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="analytics">تحليلات</TabsTrigger>
              <TabsTrigger value="reports">تقارير</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع الطلبات المعلقة</CardTitle>
                    <CardDescription>
                      توزيع الطلبات حسب الجهة أو النوع الأكثر تكراراً.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      title="حالة المدفوعات"
                      type="pie"
                      dataKey="value"
                      data={pendingByCompany}
                      desc={`${pendingData.length} طلب`}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>مؤشرات اليوم</CardTitle>
                    <CardDescription>
                      ملخص تنفيذي لأداء اليوم الحالي.
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
                      <p className="text-sm text-muted-foreground">أفضل مرسل</p>
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
                <div className="rounded-lg border bg-background/80 p-2 text-foreground">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="الشهر"
                        views={["month", "year"]}
                        value={balanceDate ? dayjs(`${balanceDate}-01`) : null}
                        onChange={(newValue: Dayjs | null) => {
                          setBalanceDate(
                            newValue ? newValue.format("YYYY-MM") : "",
                          );
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <ChartContainer
                  title="صناديق الشهر"
                  data={monthBalance as any}
                  type="stackBar"
                  dataKey="users"
                  loading={monthBalanceLoading}
                />
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-6 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>تقارير موصى بها</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>أكبر العملاء ديوناً خلال الشهر.</p>
                    <p>أداء الموظفين حسب عمليات الصندوق.</p>
                    <p>تغير حجم كل مرسل عبر الأشهر.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>تحسينات مستقبلية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>مقارنة شهرية بالنسبة المئوية.</p>
                    <p>فلتر زمني موحد لكل الصفحة.</p>
                    <p>تصدير مباشر للتقارير PDF / Excel.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>روتين العمل اليومي</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>مراجعة قائمة المتابعة يومياً.</p>
                    <p>فتح الطلبات المعلقة مباشرة من البطاقة.</p>
                    <p>متابعة أفضل المرسلين عند تغير الحمل.</p>
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
