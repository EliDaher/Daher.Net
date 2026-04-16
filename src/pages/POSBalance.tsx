import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  RefreshCw,
  Scale,
  ShieldAlert,
  TrendingUp,
  Wallet,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import PopupForm from "@/components/ui/custom/PopupForm";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStoredUser } from "@/lib/auth";
import getPOSUsers, {
  addPOSPayment,
  endPOSDebt,
  getPOSBalanceReport,
  getPOSDebt,
} from "@/services/pos";
import { getPosProfitLogs } from "@/services/profitLogs";

type PosUser = {
  _id: string;
  name?: string;
  email?: string;
  balance?: number | string;
};

type PosReport = {
  _id?: string;
  name?: string;
  email?: string;
  confirmedDeposits?: number | string;
  expensesPaid?: number | string;
  totalExpenses?: number | string;
  expensesUnpaid?: number | string;
  expensesInProgress?: number | string;
  netBalance?: number | string;
  POSbalance?: number | string;
};

type PosDebt = {
  _id: string;
  email?: string;
  amount?: number | string;
  date?: string;
  number?: string;
};

type PosBalanceRow = {
  _id: string;
  name: string;
  email: string;
  balance: number;
  confirmedDeposits: number;
  expensesPaid: number;
  netBalance: number;
  difference: number;
  isMatched: boolean;
  debtCount: number;
  debtTotal: number;
};

type StatusFilter = "all" | "mismatch";

const USERS_QUERY_KEY = ["POSBalance-users"];
const REPORT_QUERY_KEY = ["POSBalance-report"];
const DEBTS_QUERY_KEY = ["POSBalance-debts"];
const PROFIT_LOGS_QUERY_KEY = ["POSBalance-profit-logs"];
const RECON_TOLERANCE = 0.01;

function toNumber(value: unknown) {
  const normalized = Number(value);
  return Number.isFinite(normalized) ? normalized : 0;
}

function normalizeEmail(value?: string) {
  return String(value || "").trim().toLowerCase();
}

function formatNumber(value: number) {
  return value.toLocaleString("en-SY", { maximumFractionDigits: 2 });
}

function formatDateTime(timestamp: number) {
  if (!timestamp || Number.isNaN(timestamp)) {
    return "-";
  }

  return new Date(timestamp).toLocaleString("en-GB");
}

function isMatchedDifference(difference: number) {
  return Math.abs(difference) <= RECON_TOLERANCE;
}

function pickBestExpensesValue({
  confirmedDeposits,
  netBalance,
  expensesPaid,
  totalExpenses,
  expensesUnpaid,
  expensesInProgress,
}: {
  confirmedDeposits: number;
  netBalance: number;
  expensesPaid: number;
  totalExpenses: number;
  expensesUnpaid: number;
  expensesInProgress: number;
}) {
  const candidates = Array.from(
    new Set([
      Math.max(expensesPaid, 0),
      Math.max(totalExpenses - expensesUnpaid, 0),
      Math.max(totalExpenses, 0),
      Math.max(expensesPaid + expensesUnpaid, 0),
      Math.max(expensesPaid + expensesInProgress, 0),
    ]),
  );

  let best = candidates[0] ?? 0;
  let bestDiff = Math.abs(confirmedDeposits - best - netBalance);

  for (const candidate of candidates) {
    const diff = Math.abs(confirmedDeposits - candidate - netBalance);
    if (diff < bestDiff) {
      best = candidate;
      bestDiff = diff;
    }
  }

  return best;
}

export default function POSBalance() {
  const currentUser = getStoredUser();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [openTopupId, setOpenTopupId] = useState<string | null>(null);
  const [openDebtId, setOpenDebtId] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState<number>(0);
  const [selectedDebtId, setSelectedDebtId] = useState<string>("");
  const [profitFromDate, setProfitFromDate] = useState<string>("");
  const [profitToDate, setProfitToDate] = useState<string>("");

  const isProfitDateRangeValid =
    !profitFromDate || !profitToDate || profitFromDate <= profitToDate;

  const posUsersQuery = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const data = await getPOSUsers();
      return Array.isArray(data) ? (data as PosUser[]) : [];
    },
    refetchInterval: 10_000,
  });

  const posReportQuery = useQuery({
    queryKey: REPORT_QUERY_KEY,
    queryFn: async () => {
      const data = await getPOSBalanceReport();
      return Array.isArray(data) ? (data as PosReport[]) : [];
    },
    refetchInterval: 10_000,
  });

  const posDebtsQuery = useQuery({
    queryKey: DEBTS_QUERY_KEY,
    queryFn: async () => {
      const data = await getPOSDebt();
      return Array.isArray(data) ? (data as PosDebt[]) : [];
    },
    refetchInterval: 10_000,
  });

  const profitLogsQuery = useQuery({
    queryKey: [...PROFIT_LOGS_QUERY_KEY, profitFromDate, profitToDate],
    queryFn: () =>
      getPosProfitLogs({
        fromDate: profitFromDate || undefined,
        toDate: profitToDate || undefined,
        limit: 2000,
      }),
    refetchInterval: 10_000,
    enabled: isProfitDateRangeValid,
  });

  const topupMutation = useMutation({
    mutationFn: async ({ id, amount }: { id: string; amount: number }) => {
      if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
      }

      const response = await addPOSPayment({ id, amount });
      if ((response as { success?: boolean })?.success === false) {
        throw new Error("Failed to top up POS balance");
      }
    },
    onSuccess: () => {
      toast.success("Top-up completed.");
      setTopupAmount(0);
      setOpenTopupId(null);
      void queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: DEBTS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to top up.");
    },
  });

  const settleDebtMutation = useMutation({
    mutationFn: async ({
      id,
      email,
      amount,
    }: {
      id: string;
      email: string;
      amount: number;
    }) => {
      const response = await endPOSDebt({ id, email, amount });
      if ((response as { success?: boolean })?.success === false) {
        throw new Error("Failed to settle POS debt");
      }
    },
    onSuccess: () => {
      toast.success("Debt settled successfully.");
      setOpenDebtId(null);
      setSelectedDebtId("");
      void queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: REPORT_QUERY_KEY });
      void queryClient.invalidateQueries({ queryKey: DEBTS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to settle debt.");
    },
  });

  const debtByEmail = useMemo(() => {
    const output = new Map<string, PosDebt[]>();

    (posDebtsQuery.data || []).forEach((debt) => {
      const key = normalizeEmail(debt.email);
      if (!key) return;

      const list = output.get(key) || [];
      list.push(debt);
      output.set(key, list);
    });

    return output;
  }, [posDebtsQuery.data]);

  const usersByKey = useMemo(() => {
    const output = new Map<string, PosUser>();
    (posUsersQuery.data || []).forEach((user) => {
      const emailKey = normalizeEmail(user.email);
      const idKey = String(user._id || "");
      const key = emailKey || idKey;
      if (key) output.set(key, user);
    });
    return output;
  }, [posUsersQuery.data]);

  const reportByKey = useMemo(() => {
    const output = new Map<string, PosReport>();
    (posReportQuery.data || []).forEach((row) => {
      const emailKey = normalizeEmail(row.email);
      const idKey = String(row._id || "");
      const key = emailKey || idKey;
      if (key) output.set(key, row);
    });
    return output;
  }, [posReportQuery.data]);

  const rows = useMemo<PosBalanceRow[]>(() => {
    const allKeys = new Set<string>([...usersByKey.keys(), ...reportByKey.keys()]);

    return [...allKeys].map((key) => {
      const user = usersByKey.get(key);
      const report = reportByKey.get(key);
      const email = normalizeEmail(user?.email || report?.email);
      const userDebts = debtByEmail.get(email) || [];
      const debtTotal = userDebts.reduce((sum, debt) => sum + toNumber(debt.amount), 0);

      const confirmedDeposits = toNumber(report?.confirmedDeposits);
      const rawExpensesPaid = toNumber(report?.expensesPaid);
      const totalExpenses = toNumber(report?.totalExpenses);
      const expensesUnpaid = toNumber(report?.expensesUnpaid);
      const expensesInProgress = toNumber(report?.expensesInProgress);
      const netBalance = toNumber(report?.netBalance);
      const expensesPaid = pickBestExpensesValue({
        confirmedDeposits,
        netBalance,
        expensesPaid: rawExpensesPaid,
        totalExpenses,
        expensesUnpaid,
        expensesInProgress,
      });
      let difference = confirmedDeposits - expensesPaid - netBalance;

      // If there are no successful operations yet, do not flag mismatch based on carry/opening/refund balance.
      if (confirmedDeposits === 0 && expensesPaid === 0) {
        difference = 0;
      }

      return {
        _id: String(user?._id || report?._id || key),
        name: String(user?.name || report?.name || "-"),
        email: email || "-",
        balance: netBalance,
        confirmedDeposits,
        expensesPaid,
        netBalance,
        difference,
        isMatched: isMatchedDifference(difference),
        debtCount: userDebts.length,
        debtTotal,
      };
    });
  }, [debtByEmail, reportByKey, usersByKey]);

  const filteredRows = useMemo(() => {
    if (statusFilter === "all") {
      return rows;
    }

    return rows.filter((row) => !row.isMatched);
  }, [rows, statusFilter]);

  const totalBalance = useMemo(
    () => rows.reduce((sum, row) => sum + row.netBalance, 0),
    [rows],
  );

  const mismatchCount = useMemo(
    () => rows.filter((row) => !row.isMatched).length,
    [rows],
  );

  const mismatchAmount = useMemo(
    () =>
      rows
        .filter((row) => !row.isMatched)
        .reduce((sum, row) => sum + Math.abs(row.difference), 0),
    [rows],
  );

  const profitLogsRows = useMemo(() => {
    return (profitLogsQuery.data?.logs || []).map((log) => ({
      _id: log.id,
      invoiceId: log.invoiceId,
      amount: Number(log.amount || 0),
      profitAmount: Number(log.profitAmount || 0),
      company: log.company || "-",
      email: log.email || "-",
      operator: log.operator || "-",
      createdAt: log.createdAt,
    }));
  }, [profitLogsQuery.data?.logs]);

  const profitByDayRows = useMemo(() => {
    const grouped = new Map<
      string,
      { dateKey: string; logsCount: number; totalAmount: number; totalProfit: number }
    >();

    (profitLogsQuery.data?.logs || []).forEach((log) => {
      const key = String(log.dateKey || "").trim() || String(log.createdAt || "").slice(0, 10);
      if (!key) return;

      const current = grouped.get(key) || {
        dateKey: key,
        logsCount: 0,
        totalAmount: 0,
        totalProfit: 0,
      };

      current.logsCount += 1;
      current.totalAmount += Number(log.amount || 0);
      current.totalProfit += Number(log.profitAmount || 0);
      grouped.set(key, current);
    });

    return [...grouped.values()]
      .sort((a, b) => b.dateKey.localeCompare(a.dateKey))
      .map((row) => ({
        ...row,
        totalAmount: Number(row.totalAmount.toFixed(2)),
        totalProfit: Number(row.totalProfit.toFixed(2)),
      }));
  }, [profitLogsQuery.data?.logs]);

  const totalProfitAmount = useMemo(
    () => Number(profitLogsQuery.data?.summary?.totalProfitAmount || 0),
    [profitLogsQuery.data?.summary?.totalProfitAmount],
  );

  const latestRefresh = useMemo(() => {
    return Math.max(
      posUsersQuery.dataUpdatedAt || 0,
      posReportQuery.dataUpdatedAt || 0,
      posDebtsQuery.dataUpdatedAt || 0,
      profitLogsQuery.dataUpdatedAt || 0,
    );
  }, [
    posUsersQuery.dataUpdatedAt,
    posReportQuery.dataUpdatedAt,
    posDebtsQuery.dataUpdatedAt,
    profitLogsQuery.dataUpdatedAt,
  ]);

  const isLoading =
    posUsersQuery.isLoading ||
    posReportQuery.isLoading ||
    posDebtsQuery.isLoading ||
    profitLogsQuery.isLoading;
  const isRefreshing =
    posUsersQuery.isFetching ||
    posReportQuery.isFetching ||
    posDebtsQuery.isFetching ||
    profitLogsQuery.isFetching;

  const handleManualRefresh = async () => {
    await Promise.all([
      posUsersQuery.refetch(),
      posReportQuery.refetch(),
      posDebtsQuery.refetch(),
      profitLogsQuery.refetch(),
    ]);
    toast.success("POS balance data refreshed.");
  };

  const selectedProfitRangeText =
    profitFromDate && profitToDate
      ? `From ${profitFromDate} to ${profitToDate}`
      : profitFromDate
        ? `From ${profitFromDate}`
        : profitToDate
          ? `Until ${profitToDate}`
          : "All dates";

  if (currentUser?.role !== "admin") {
    return (
      <DashboardLayout>
        <div dir="rtl" className="text-lg font-semibold text-destructive">
          This page is available for admins only.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div dir="rtl" className="space-y-6">
        <div className="flex flex-col gap-3 rounded-xl border bg-background p-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">رصيد نقاط البيع</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
            >
              كل نقاط البيع
            </Button>
            <Button
              variant={statusFilter === "mismatch" ? "destructive" : "outline"}
              onClick={() => setStatusFilter("mismatch")}
            >
              النقاط الخاطئة فقط
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                void handleManualRefresh();
              }}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              تحديث البيانات
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>عدد مستخدمي نقاط البيع</CardDescription>
              <CardTitle className="text-2xl">{rows.length}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-muted-foreground">
              <Users className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>إجمالي الرصيد</CardDescription>
              <CardTitle className="text-2xl">{formatNumber(totalBalance)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-muted-foreground">
              <Wallet className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>الصفوف الخاطئة</CardDescription>
              <CardTitle className="text-2xl">{mismatchCount}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-destructive">
              <ShieldAlert className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>مبلغ عدم التوافق</CardDescription>
              <CardTitle className="text-2xl">{formatNumber(mismatchAmount)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-destructive">
              <AlertTriangle className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>اخر تحديث</CardDescription>
              <CardTitle className="text-sm">{formatDateTime(latestRefresh)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-muted-foreground">
              <Scale className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>إجمالي ربح نقاط البيع</CardDescription>
              <CardTitle className="text-2xl">{formatNumber(totalProfitAmount)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-emerald-600">
              <TrendingUp className="h-4 w-4" />
            </CardContent>
          </Card>
        </div>

        <DataTable
          title="POS Reconciliation"
          description={`Rows: ${filteredRows.length}`}
          columns={[
            { key: "name", label: "الاسم", sortable: true },
            { key: "email", label: "الحساب", sortable: true },
            { key: "confirmedDeposits", label: "المدفوعات الناجحة", sortable: true },
            { key: "expensesPaid", label: "الفواتير الناجحة", sortable: true },
            { key: "netBalance", label: "الرصيد الحالي", sortable: true },
            { key: "difference", label: "الفرق", sortable: true },
            { key: "status", label: "الحالة", sortable: true },
            { key: "debtTotal", label: "إجمالي الدين", sortable: true },
            { key: "debtCount", label: "عدد الديون", sortable: true },
          ]}
          data={filteredRows.map((row) => ({
            ...row,
            status: row.isMatched ? "Matched" : "Mismatch",
          }))}
          isLoading={isLoading}
          getRowClassName={(row) =>
            Math.abs(Number(row.difference || 0)) > RECON_TOLERANCE
              ? "bg-destructive/10 hover:bg-destructive/20"
              : ""
          }
        />

        <DataTable
          title="POS Profit Logs"
          description={`Logs: ${profitLogsQuery.data?.summary?.count || 0} • ${selectedProfitRangeText}`}
          columns={[
            { key: "invoiceId", label: "رقم الفاتورة", sortable: true },
            { key: "amount", label: "المبلغ", sortable: true },
            { key: "profitAmount", label: "الربح", sortable: true },
            { key: "company", label: "الشركة", sortable: true },
            { key: "email", label: "البريد الإلكتروني", sortable: true },
            { key: "operator", label: "المشغل", sortable: true },
            { key: "createdAt", label: "تاريخ الإنشاء", sortable: true },
          ]}
          data={profitLogsRows}
          isLoading={profitLogsQuery.isLoading}
        />

        <Card>
          <CardHeader>
            <CardTitle>المرابح حسب التاريخ</CardTitle>
            <CardDescription>اختر التاريخ البداية والنهاية حسب الحاجة.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-4">
              <Input
                type="date"
                value={profitFromDate}
                onChange={(event) => setProfitFromDate(event.target.value)}
              />
              <Input
                type="date"
                value={profitToDate}
                onChange={(event) => setProfitToDate(event.target.value)}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setProfitFromDate("");
                  setProfitToDate("");
                }}
              >
                مسح الفلاتر
              </Button>
              <div className="flex items-center text-sm text-muted-foreground">
                {selectedProfitRangeText}
              </div>
            </div>
            {!isProfitDateRangeValid && (
              <p className="mt-3 text-sm text-destructive">
                يرجى التأكد من أن تاريخ البداية أصغر من تاريخ النهاية.
              </p>
            )}
          </CardContent>
        </Card>

        <DataTable
          title="POS Profit By Day"
          description={`Days: ${profitByDayRows.length} • ${selectedProfitRangeText}`}
          columns={[
            { key: "dateKey", label: "التاريخ", sortable: true },
            { key: "logsCount", label: "العمليات", sortable: true },
            { key: "totalAmount", label: "المبلغ الإجمالي", sortable: true },
            { key: "totalProfit", label: "الربح الإجمالي", sortable: true },
          ]}
          data={profitByDayRows}
          isLoading={profitLogsQuery.isLoading}
        />
      </div>
    </DashboardLayout>
  );
}
