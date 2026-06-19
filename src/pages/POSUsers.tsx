import { useMemo, useState, type ReactNode } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  Plus,
  ReceiptText,
  Search,
  ShieldAlert,
  Users,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/dashboard/DataTable";
import AddUser from "@/components/invoices/AddUser";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PopupForm from "@/components/ui/custom/PopupForm";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import getPOSUsers, {
  addPOSPayment,
  addPOSUser,
  AddNewUser,
  deleteUser,
  endPOSDebt,
  getPOSBalanceReport,
  getPOSDebt,
  type POSBalanceReportRow,
  type POSDebtRow,
  type POSUserRow,
} from "@/services/pos";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function toNumber(value: unknown) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function includesTerm(values: unknown[], term: string) {
  if (!term) {
    return true;
  }

  return values.some((value) =>
    String(value ?? "").toLowerCase().includes(term),
  );
}

function PageLoader({
  title = "جاري تحميل بيانات نقاط البيع",
  description = "يتم جلب أحدث البيانات من الخادم...",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex min-h-[320px] items-center justify-center rounded-md border bg-card p-6 text-center shadow-sm">
      <div className="flex max-w-sm flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-1 rounded-full border border-primary/10" />
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="grid w-full gap-2">
          <div className="h-2 rounded-full bg-muted">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-primary/40" />
          </div>
          <div className="mx-auto h-2 w-3/4 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon: typeof Users;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-3">
          <CardDescription>{title}</CardDescription>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}

function TableOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-10 flex items-start justify-center rounded-md bg-background/70 p-6 backdrop-blur-[2px]">
      <div className="mt-20 flex items-center gap-3 rounded-md border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-lg">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
        <span>{label}</span>
      </div>
    </div>
  );
}

function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative w-full md:max-w-sm">
      <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pr-9"
      />
    </div>
  );
}

function TableSection({
  children,
  controls,
  error,
  isInitialLoading,
  isRefreshing,
  empty,
  emptyMessage,
  loadingTitle,
  loadingDescription,
}: {
  children: ReactNode;
  controls?: ReactNode;
  error?: boolean;
  isInitialLoading: boolean;
  isRefreshing: boolean;
  empty: boolean;
  emptyMessage: string;
  loadingTitle: string;
  loadingDescription: string;
}) {
  return (
    <div className="space-y-3">
      {controls && (
        <Card>
          <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
            {controls}
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
          حدث خطأ أثناء تحميل هذا الجدول.
        </div>
      )}

      {isInitialLoading ? (
        <PageLoader title={loadingTitle} description={loadingDescription} />
      ) : (
        <div className="relative">
          {isRefreshing && <TableOverlay label="جاري تحديث البيانات..." />}
          {empty && !isRefreshing && (
            <div className="mb-4 rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          )}
          <div className={isRefreshing ? "pointer-events-none" : undefined}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

type ReportRow = POSBalanceReportRow & {
  POSbalance: number;
};

export default function POSUsers() {
  const queryClient = useQueryClient();

  const [amount, setAmount] = useState(0);
  const [openUserId, setOpenUserId] = useState<string | null>(null);
  const [openUserId2, setOpenUserId2] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [usersPage, setUsersPage] = useState(1);
  const [usersLimit, setUsersLimit] = useState(20);
  const [debtsPage, setDebtsPage] = useState(1);
  const [debtsLimit, setDebtsLimit] = useState(20);
  const [reportPage, setReportPage] = useState(1);
  const [reportLimit, setReportLimit] = useState(20);
  const [usersSearch, setUsersSearch] = useState("");
  const [debtsSearch, setDebtsSearch] = useState("");
  const [reportSearch, setReportSearch] = useState("");
  const [reportFilter, setReportFilter] = useState<"all" | "mismatch">("all");
  const [formData, setFormData] = useState({
    username: "",
    agent: "",
    owner: "",
    password: "",
    number: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const usersQuery = useQuery({
    queryKey: ["POSUsers-table", usersPage, usersLimit],
    queryFn: () => getPOSUsers({ page: usersPage, limit: usersLimit }),
    placeholderData: (previousData) => previousData,
  });

  const debtsQuery = useQuery({
    queryKey: ["POSdebt-table", debtsPage, debtsLimit],
    queryFn: () => getPOSDebt({ page: debtsPage, limit: debtsLimit }),
    placeholderData: (previousData) => previousData,
  });

  const reportQuery = useQuery({
    queryKey: ["POSReport-table", reportPage, reportLimit],
    queryFn: () => getPOSBalanceReport({ page: reportPage, limit: reportLimit }),
    placeholderData: (previousData) => previousData,
  });

  const posData = usersQuery.data?.data ?? [];
  const debtData = debtsQuery.data?.data ?? [];
  const posReport = reportQuery.data?.data ?? [];

  const invalidateUsers = () =>
    queryClient.invalidateQueries({ queryKey: ["POSUsers-table"] });
  const invalidateDebts = () =>
    queryClient.invalidateQueries({ queryKey: ["POSdebt-table"] });
  const invalidateReport = () =>
    queryClient.invalidateQueries({ queryKey: ["POSReport-table"] });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const addPaymentMutation = useMutation({
    mutationFn: addPOSPayment,
    onSuccess: () => {
      toast.success("تمت إضافة الدفعة.");
      void invalidateDebts();
      void invalidateReport();
      setOpenUserId(null);
      setAmount(0);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال.");
    },
  });

  const endDebtMutation = useMutation({
    mutationFn: endPOSDebt,
    onSuccess: () => {
      toast.success("تم انهاء الدين.");
      void invalidateDebts();
      void invalidateReport();
      setOpenUserId(null);
      setAmount(0);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال.");
    },
  });

  const addPointMutation = useMutation({
    mutationFn: addPOSUser,
    onSuccess: () => {
      toast.success("تم اضافة نقطة البيع.");
      void invalidateUsers();
      setOpenUserId2(null);
      setAmount(0);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال.");
    },
  });

  const deleteUsersMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success("تم حذف المستخدم بنجاح.");
      void invalidateUsers();
      void invalidateReport();
      setOpenUserId(null);
      setAmount(0);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإرسال.");
    },
  });

  const addUserMutation = useMutation({
    mutationFn: AddNewUser,
    onSuccess: () => {
      toast.success("تم إضافة المستخدم بنجاح.");
      void invalidateUsers();
      setOpenAdd(false);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء إضافة المستخدم.");
    },
  });

  const posReportColumns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "name", label: "الاسم", sortable: true },
    { key: "email", label: "البريد الإلكتروني", sortable: true },
    { key: "confirmedDeposits", label: "الايداعات المؤكدة", sortable: true },
    { key: "expensesPaid", label: "المصاريف المدفوعة", sortable: true },
    { key: "netBalance", label: "الرصيد الصافي", sortable: true },
    { key: "POSbalance", label: "الميزانية", sortable: true },
    { key: "balance", label: "الرصيد", sortable: true },
    { key: "expensesInProgress", label: "المصاريف الجارية", sortable: true },
    { key: "totalDeposits", label: "إجمالي الإيداعات", sortable: true },
    { key: "finalBalance", label: "الرصيد النهائي", sortable: true },
    { key: "unconfirmedDeposits", label: "الايداعات المرفوضة", sortable: true },
    { key: "expensesUnpaid", label: "المصاريف غير المدفوعة", sortable: true },
    { key: "totalExpenses", label: "إجمالي المصاريف", sortable: true },
  ];

  const posColumns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "name", label: "الاسم", sortable: true },
    { key: "email", label: "email", sortable: true },
    { key: "password", label: "كلمة السر", sortable: true },
    { key: "role", label: "الصلاحية", sortable: true },
    { key: "balance", label: "الرصيد", sortable: true },
    { key: "number", label: "الرقم", sortable: true },
  ];

  const debtColumns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "destination", label: "الوجهة", sortable: true },
    { key: "name", label: "الاسم", sortable: true },
    { key: "number", label: "الرقم", sortable: true },
    { key: "operator", label: "المنفذ", sortable: true },
    { key: "amount", label: "الكمية", sortable: true },
    { key: "date", label: "التاريخ", sortable: true },
  ];

  const filteredUsers = useMemo(() => {
    const term = usersSearch.trim().toLowerCase();

    return posData.filter((row) =>
      includesTerm([row.name, row.email, row.number], term),
    );
  }, [posData, usersSearch]);

  const filteredDebts = useMemo(() => {
    const term = debtsSearch.trim().toLowerCase();

    return debtData.filter((row) =>
      includesTerm([row.name, row.number, row.destination, row.operator], term),
    );
  }, [debtData, debtsSearch]);

  const reportRows = useMemo<ReportRow[]>(() => {
    return posReport.map((row) => ({
      ...row,
      POSbalance:
        toNumber(row.confirmedDeposits) -
        toNumber(row.expensesPaid) -
        toNumber(row.netBalance),
    }));
  }, [posReport]);

  const filteredReportRows = useMemo(() => {
    const term = reportSearch.trim().toLowerCase();

    return reportRows
      .filter((row) =>
        reportFilter === "mismatch" ? toNumber(row.POSbalance) !== 0 : true,
      )
      .filter((row) => includesTerm([row.name, row.email], term));
  }, [reportFilter, reportRows, reportSearch]);

  const totalDebt = useMemo(() => {
    return filteredDebts.reduce((sum, row) => sum + toNumber(row.amount), 0);
  }, [filteredDebts]);

  const totalBalances = useMemo(() => {
    return filteredUsers.reduce((sum, row) => sum + toNumber(row.balance), 0);
  }, [filteredUsers]);

  const usersTotal = usersQuery.data?.total ?? 0;
  const debtsTotal = debtsQuery.data?.total ?? 0;
  const initialLoading =
    (usersQuery.isLoading && !usersQuery.data) ||
    (debtsQuery.isLoading && !debtsQuery.data) ||
    (reportQuery.isLoading && !reportQuery.data);

  const handleUsersPageSizeChange = (nextLimit: number) => {
    setUsersLimit(nextLimit);
    setUsersPage(1);
  };

  const handleDebtsPageSizeChange = (nextLimit: number) => {
    setDebtsLimit(nextLimit);
    setDebtsPage(1);
  };

  const handleReportPageSizeChange = (nextLimit: number) => {
    setReportLimit(nextLimit);
    setReportPage(1);
  };

  return (
    <DashboardLayout>
      <div dir="rtl" className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl">إدارة نقاط البيع</CardTitle>
                <CardDescription>
                  متابعة المستخدمين والديون وتقرير أرصدة نقاط البيع
                </CardDescription>
              </div>
              <PopupForm
                title="اضافة مستخدم جديد"
                trigger={
                  <Button>
                    <Plus className="h-4 w-4" />
                    اضافة مستخدم جديد
                  </Button>
                }
                isOpen={openAdd}
                setIsOpen={setOpenAdd}
              >
                <AddUser onSubmit={(userData) => addUserMutation.mutate(userData)} />
              </PopupForm>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="إجمالي نقاط البيع"
              value={formatNumber(usersTotal)}
              icon={Users}
            />
            <MetricCard
              title="إجمالي الديون"
              value={formatNumber(debtsTotal)}
              icon={ReceiptText}
            />
            <MetricCard
              title="أرصدة الصفحة الحالية"
              value={formatNumber(totalBalances)}
              icon={Wallet}
            />
            <MetricCard
              title="ديون الصفحة الحالية"
              value={formatNumber(totalDebt)}
              icon={ShieldAlert}
            />
          </CardContent>
        </Card>

        {initialLoading ? (
          <PageLoader />
        ) : (
          <>
            <TableSection
              controls={
                <SearchInput
                  value={usersSearch}
                  onChange={setUsersSearch}
                  placeholder="بحث بالاسم أو البريد أو الرقم"
                />
              }
              error={usersQuery.isError}
              isInitialLoading={usersQuery.isLoading && !usersQuery.data}
              isRefreshing={usersQuery.isFetching && Boolean(usersQuery.data)}
              empty={filteredUsers.length === 0}
              emptyMessage="لا توجد نقاط بيع مطابقة للبحث في الصفحة الحالية."
              loadingTitle="جاري تحميل نقاط البيع"
              loadingDescription="يتم جلب مستخدمي نقاط البيع من الخادم..."
            >
              <DataTable
                title="نقاط البيع"
                description={`${formatNumber(totalBalances)} ل.س مجموع أرصدة الصفحة الحالية`}
                columns={posColumns}
                data={filteredUsers}
                searchable={false}
                defaultPageSize={usersLimit}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                isLoading={usersQuery.isLoading}
                serverPagination={{
                  page: usersQuery.data?.page ?? usersPage,
                  pageSize: usersQuery.data?.limit ?? usersLimit,
                  total: usersTotal,
                  onPageChange: setUsersPage,
                  onPageSizeChange: handleUsersPageSizeChange,
                }}
                renderRowActions={(row: POSUserRow) => (
                  <div className="flex flex-wrap gap-2">
                    <PopupForm
                      title="اضافة دفعة لنقطة البيع"
                      trigger={<Button variant="accent">اضافة دفعة</Button>}
                      isOpen={openUserId === row._id}
                      setIsOpen={(open) => setOpenUserId(open ? row._id : null)}
                    >
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={(event) => {
                          event.preventDefault();
                          addPaymentMutation.mutate({ id: row._id, amount });
                        }}
                      >
                        <Input
                          readOnly
                          value={row.name ? `${row.name} // ${row.email}` : row.email ?? ""}
                        />
                        <Input
                          value={amount}
                          onChange={(event) => setAmount(Number(event.target.value))}
                          type="number"
                        />
                        <Button loading={addPaymentMutation.isPending}>
                          تأكيد
                        </Button>
                      </form>
                    </PopupForm>

                    <PopupForm
                      title="إضافة نقطة بيع"
                      trigger={<Button>اضافة نقطة بيع فرعية</Button>}
                      isOpen={openUserId2 === row._id}
                      setIsOpen={(open) => setOpenUserId2(open ? row._id : null)}
                    >
                      <form
                        className="flex flex-col gap-4"
                        onSubmit={(event) => {
                          event.preventDefault();
                          addPointMutation.mutate({ formData, email: row.email });
                        }}
                      >
                        <Input
                          type="text"
                          name="username"
                          placeholder="اسم المستخدم"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        <Input
                          type="text"
                          name="password"
                          placeholder="كلمة المرور"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <Input
                          type="text"
                          name="number"
                          placeholder="رقم الخليوي"
                          value={formData.number}
                          onChange={handleChange}
                        />
                        <Input
                          type="text"
                          name="agent"
                          placeholder="الوكيل"
                          value={row.email ?? ""}
                          readOnly
                          onChange={handleChange}
                        />
                        <Input
                          type="text"
                          name="owner"
                          placeholder="اسم صاحب النقطة"
                          value={formData.owner}
                          onChange={handleChange}
                        />
                        <Button loading={addPointMutation.isPending}>
                          تأكيد
                        </Button>
                      </form>
                    </PopupForm>

                    <Button
                      onClick={() => deleteUsersMutation.mutate({ id: row._id })}
                      variant="destructive"
                      loading={deleteUsersMutation.isPending}
                    >
                      حذف نقطة البيع
                    </Button>
                  </div>
                )}
              />
            </TableSection>

            <TableSection
              controls={
                <SearchInput
                  value={debtsSearch}
                  onChange={setDebtsSearch}
                  placeholder="بحث بالاسم أو الرقم أو الوجهة أو المنفذ"
                />
              }
              error={debtsQuery.isError}
              isInitialLoading={debtsQuery.isLoading && !debtsQuery.data}
              isRefreshing={debtsQuery.isFetching && Boolean(debtsQuery.data)}
              empty={filteredDebts.length === 0}
              emptyMessage="لا توجد ديون مطابقة للبحث في الصفحة الحالية."
              loadingTitle="جاري تحميل ديون نقاط البيع"
              loadingDescription="يتم جلب الديون المفتوحة من الخادم..."
            >
              <DataTable
                title="ديون نقاط البيع"
                description={`${formatNumber(totalDebt)} مجموع ديون الصفحة الحالية`}
                columns={debtColumns}
                data={filteredDebts}
                searchable={false}
                defaultPageSize={debtsLimit}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                isLoading={debtsQuery.isLoading}
                serverPagination={{
                  page: debtsQuery.data?.page ?? debtsPage,
                  pageSize: debtsQuery.data?.limit ?? debtsLimit,
                  total: debtsTotal,
                  onPageChange: setDebtsPage,
                  onPageSizeChange: handleDebtsPageSizeChange,
                }}
                renderRowActions={(row: POSDebtRow) => (
                  <Button
                    loading={endDebtMutation.isPending}
                    onClick={() => {
                      if (window.confirm("هل انت متأكد من العملية ؟")) {
                        endDebtMutation.mutate({
                          id: row._id,
                          email: String(row.email ?? ""),
                          amount: toNumber(row.amount),
                        });
                      }
                    }}
                  >
                    انهاء الدين
                  </Button>
                )}
              />
            </TableSection>
{/* 
            <TableSection
              controls={
                <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <SearchInput
                    value={reportSearch}
                    onChange={setReportSearch}
                    placeholder="بحث بالاسم أو البريد"
                  />
                  <Select
                    value={reportFilter}
                    onValueChange={(value) => setReportFilter(value as "all" | "mismatch")}
                  >
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="فلترة التقرير" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل النتائج</SelectItem>
                      <SelectItem value="mismatch">النقاط غير المطابقة فقط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              }
              error={reportQuery.isError}
              isInitialLoading={reportQuery.isLoading && !reportQuery.data}
              isRefreshing={reportQuery.isFetching && Boolean(reportQuery.data)}
              empty={filteredReportRows.length === 0}
              emptyMessage="لا توجد نتائج مطابقة في تقرير الصفحة الحالية."
              loadingTitle="جاري تحميل تقرير النقاط"
              loadingDescription="يتم جلب تقرير أرصدة نقاط البيع من الخادم..."
            >
              <DataTable
                title="تقرير عمليات النقاط"
                data={filteredReportRows}
                columns={posReportColumns}
                searchable={false}
                defaultPageSize={reportLimit}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                isLoading={reportQuery.isLoading}
                serverPagination={{
                  page: reportQuery.data?.page ?? reportPage,
                  pageSize: reportQuery.data?.limit ?? reportLimit,
                  total: reportQuery.data?.total ?? 0,
                  onPageChange: setReportPage,
                  onPageSizeChange: handleReportPageSizeChange,
                }}
                getRowClassName={(row) =>
                  toNumber(row.POSbalance) !== 0
                    ? "bg-destructive/20"
                    : "bg-green-500/20"
                }
              />
            </TableSection> */}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
