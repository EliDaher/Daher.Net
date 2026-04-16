import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertTriangle, RefreshCw, Scale, ShieldAlert, Wallet, Users } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import PopupForm from "@/components/ui/custom/PopupForm";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoredUser } from "@/lib/auth";
import getPOSUsers, { addPOSPayment, endPOSDebt, getPOSDebt } from "@/services/pos";
import { buildPosKey, getPOSLimits, type PosLimitRecord, upsertPOSLimit } from "@/services/posLimits";

type PosUser = {
  _id: string;
  name?: string;
  email?: string;
  balance?: number | string;
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
  minLimit: number;
  debtCount: number;
  debtTotal: number;
  posKey: string;
  limitUpdatedBy: string;
  limitUpdatedAt: string;
};

type StatusFilter = "all" | "low";

const USERS_QUERY_KEY = ["POSBalance-users"];
const DEBTS_QUERY_KEY = ["POSBalance-debts"];
const LIMITS_QUERY_KEY = ["POSBalance-limits"];

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

function isBelowLimit(balance: number, minLimit: number) {
  return minLimit > 0 && balance < minLimit;
}

export default function POSBalance() {
  const currentUser = getStoredUser();
  const queryClient = useQueryClient();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [openTopupId, setOpenTopupId] = useState<string | null>(null);
  const [openLimitId, setOpenLimitId] = useState<string | null>(null);
  const [openDebtId, setOpenDebtId] = useState<string | null>(null);
  const [topupAmount, setTopupAmount] = useState<number>(0);
  const [limitAmount, setLimitAmount] = useState<number>(0);
  const [selectedDebtId, setSelectedDebtId] = useState<string>("");

  const posUsersQuery = useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: async () => {
      const data = await getPOSUsers();
      return Array.isArray(data) ? (data as PosUser[]) : [];
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

  const posLimitsQuery = useQuery({
    queryKey: LIMITS_QUERY_KEY,
    queryFn: getPOSLimits,
    refetchInterval: 10_000,
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
      void queryClient.invalidateQueries({ queryKey: DEBTS_QUERY_KEY });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to settle debt.");
    },
  });

  const limitMutation = useMutation({
    mutationFn: ({
      posKey,
      minBalance,
      updatedBy,
    }: {
      posKey: string;
      minBalance: number;
      updatedBy: string;
    }) => upsertPOSLimit({ posKey, minBalance, updatedBy }),
    onMutate: async ({ posKey, minBalance, updatedBy }) => {
      await queryClient.cancelQueries({ queryKey: LIMITS_QUERY_KEY });
      const previousLimits = queryClient.getQueryData<PosLimitRecord[]>(LIMITS_QUERY_KEY) || [];

      const optimisticRecord: PosLimitRecord = {
        posKey,
        minBalance,
        updatedBy,
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<PosLimitRecord[]>(LIMITS_QUERY_KEY, (old = []) => {
        const withoutCurrent = old.filter((item) => item.posKey !== posKey);
        return [optimisticRecord, ...withoutCurrent];
      });

      return { previousLimits };
    },
    onSuccess: () => {
      toast.success("Minimum limit updated.");
      setOpenLimitId(null);
    },
    onError: (error, _variables, context) => {
      if (context?.previousLimits) {
        queryClient.setQueryData(LIMITS_QUERY_KEY, context.previousLimits);
      }

      toast.error(error instanceof Error ? error.message : "Failed to update limit.");
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: LIMITS_QUERY_KEY });
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

  const limitsByKey = useMemo(() => {
    const output = new Map<string, PosLimitRecord>();
    (posLimitsQuery.data || []).forEach((item) => {
      output.set(item.posKey, item);
    });
    return output;
  }, [posLimitsQuery.data]);

  const rows = useMemo<PosBalanceRow[]>(() => {
    return (posUsersQuery.data || []).map((user) => {
      const email = normalizeEmail(user.email);
      const posKey = buildPosKey({ email, id: String(user._id || "") });
      const matchingLimit = limitsByKey.get(posKey);
      const userDebts = debtByEmail.get(email) || [];
      const debtTotal = userDebts.reduce((sum, debt) => sum + toNumber(debt.amount), 0);
      const balance = toNumber(user.balance);

      return {
        _id: String(user._id || ""),
        name: String(user.name || "-"),
        email: email || "-",
        balance,
        minLimit: toNumber(matchingLimit?.minBalance),
        debtCount: userDebts.length,
        debtTotal,
        posKey,
        limitUpdatedBy: matchingLimit?.updatedBy || "-",
        limitUpdatedAt: matchingLimit?.updatedAt
          ? new Date(matchingLimit.updatedAt).toLocaleString("en-GB")
          : "-",
      };
    });
  }, [debtByEmail, limitsByKey, posUsersQuery.data]);

  const filteredRows = useMemo(() => {
    if (statusFilter === "all") {
      return rows;
    }

    return rows.filter((row) => isBelowLimit(row.balance, row.minLimit));
  }, [rows, statusFilter]);

  const totalBalance = useMemo(
    () => rows.reduce((sum, row) => sum + row.balance, 0),
    [rows],
  );

  const lowBalanceCount = useMemo(
    () => rows.filter((row) => isBelowLimit(row.balance, row.minLimit)).length,
    [rows],
  );

  const latestRefresh = useMemo(() => {
    return Math.max(
      posUsersQuery.dataUpdatedAt || 0,
      posDebtsQuery.dataUpdatedAt || 0,
      posLimitsQuery.dataUpdatedAt || 0,
    );
  }, [posDebtsQuery.dataUpdatedAt, posLimitsQuery.dataUpdatedAt, posUsersQuery.dataUpdatedAt]);

  const isLoading = posUsersQuery.isLoading || posDebtsQuery.isLoading || posLimitsQuery.isLoading;
  const isRefreshing =
    posUsersQuery.isFetching || posDebtsQuery.isFetching || posLimitsQuery.isFetching;

  const handleManualRefresh = async () => {
    await Promise.all([
      posUsersQuery.refetch(),
      posDebtsQuery.refetch(),
      posLimitsQuery.refetch(),
    ]);
    toast.success("POS balance data refreshed.");
  };

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
            <h1 className="text-3xl font-bold">POS Balance</h1>
            <p className="text-sm text-muted-foreground">
              Live watch and control center for POS balances and debt-based deductions.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
            >
              All POS
            </Button>
            <Button
              variant={statusFilter === "low" ? "destructive" : "outline"}
              onClick={() => setStatusFilter("low")}
            >
              Below Limit
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                void handleManualRefresh();
              }}
              disabled={isRefreshing}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total POS Users</CardDescription>
              <CardTitle className="text-2xl">{rows.length}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-muted-foreground">
              <Users className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Balance</CardDescription>
              <CardTitle className="text-2xl">{formatNumber(totalBalance)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-muted-foreground">
              <Wallet className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Below Limit</CardDescription>
              <CardTitle className="text-2xl">{lowBalanceCount}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-destructive">
              <ShieldAlert className="h-4 w-4" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Refresh</CardDescription>
              <CardTitle className="text-sm">{formatDateTime(latestRefresh)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 text-muted-foreground">
              <Scale className="h-4 w-4" />
            </CardContent>
          </Card>
        </div>

        <DataTable
          title="POS Balance Watch"
          description={`Rows: ${filteredRows.length}`}
          columns={[
            { key: "name", label: "Name", sortable: true },
            { key: "email", label: "Email", sortable: true },
            { key: "balance", label: "Balance", sortable: true },
            { key: "minLimit", label: "Min Limit", sortable: true },
            { key: "debtTotal", label: "Debt Total", sortable: true },
            { key: "debtCount", label: "Debt Count", sortable: true },
            { key: "limitUpdatedBy", label: "Limit Updated By", sortable: true },
            { key: "limitUpdatedAt", label: "Limit Updated At", sortable: true },
          ]}
          data={filteredRows}
          isLoading={isLoading}
          getRowClassName={(row) =>
            isBelowLimit(Number(row.balance), Number(row.minLimit))
              ? "bg-destructive/10 hover:bg-destructive/20"
              : ""
          }
          renderRowActions={(row: PosBalanceRow) => {
            const userDebts = debtByEmail.get(normalizeEmail(row.email)) || [];

            return (
              <div className="flex flex-wrap gap-2">
                <PopupForm
                  title="Top-up POS Balance"
                  trigger={<Button size="sm">Top-up</Button>}
                  isOpen={openTopupId === row._id}
                  setIsOpen={(open) => {
                    if (open) {
                      setTopupAmount(0);
                      setOpenTopupId(row._id);
                    } else {
                      setOpenTopupId(null);
                    }
                  }}
                >
                  <form
                    className="space-y-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      topupMutation.mutate({ id: row._id, amount: toNumber(topupAmount) });
                    }}
                  >
                    <Input readOnly value={`${row.name} (${row.email})`} />
                    <Input
                      type="number"
                      min={0}
                      value={topupAmount}
                      onChange={(event) => setTopupAmount(toNumber(event.target.value))}
                      placeholder="Amount"
                    />
                    <Button type="submit" disabled={topupMutation.isPending}>
                      {topupMutation.isPending ? "Saving..." : "Confirm Top-up"}
                    </Button>
                  </form>
                </PopupForm>

                <PopupForm
                  title="Debt-based Deduction"
                  trigger={
                    <Button size="sm" variant="outline" disabled={userDebts.length === 0}>
                      Deduct (Debt)
                    </Button>
                  }
                  isOpen={openDebtId === row._id}
                  setIsOpen={(open) => {
                    if (open) {
                      if (userDebts.length === 0) {
                        return;
                      }
                      setOpenDebtId(row._id);
                      setSelectedDebtId(userDebts[0]?._id || "");
                    } else {
                      setOpenDebtId(null);
                    }
                  }}
                >
                  {userDebts.length === 0 ? (
                    <div className="text-sm text-muted-foreground">No pending debts for this POS user.</div>
                  ) : (
                    <form
                      className="space-y-3"
                      onSubmit={(event) => {
                        event.preventDefault();
                        const selectedDebt = userDebts.find((item) => item._id === selectedDebtId);
                        if (!selectedDebt) {
                          toast.error("Select a debt item first.");
                          return;
                        }

                        settleDebtMutation.mutate({
                          id: String(selectedDebt._id),
                          email: String(selectedDebt.email || row.email),
                          amount: toNumber(selectedDebt.amount),
                        });
                      }}
                    >
                      <select
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={selectedDebtId}
                        onChange={(event) => setSelectedDebtId(event.target.value)}
                      >
                        {userDebts.map((debt) => (
                          <option key={debt._id} value={debt._id}>
                            {`${formatNumber(toNumber(debt.amount))} - ${debt.number || "-"} - ${
                              debt.date || "-"
                            }`}
                          </option>
                        ))}
                      </select>
                      <Button type="submit" disabled={settleDebtMutation.isPending}>
                        {settleDebtMutation.isPending ? "Processing..." : "Settle Selected Debt"}
                      </Button>
                    </form>
                  )}
                </PopupForm>

                <PopupForm
                  title="Edit Minimum Limit"
                  trigger={<Button size="sm" variant="secondary">Edit Limit</Button>}
                  isOpen={openLimitId === row._id}
                  setIsOpen={(open) => {
                    if (open) {
                      setLimitAmount(row.minLimit);
                      setOpenLimitId(row._id);
                    } else {
                      setOpenLimitId(null);
                    }
                  }}
                >
                  <form
                    className="space-y-3"
                    onSubmit={(event) => {
                      event.preventDefault();
                      const nextValue = toNumber(limitAmount);
                      if (nextValue < 0) {
                        toast.error("Minimum limit cannot be negative.");
                        return;
                      }

                      limitMutation.mutate({
                        posKey: row.posKey,
                        minBalance: nextValue,
                        updatedBy: currentUser.username,
                      });
                    }}
                  >
                    <Input readOnly value={`${row.name} (${row.email})`} />
                    <Input
                      type="number"
                      min={0}
                      value={limitAmount}
                      onChange={(event) => setLimitAmount(toNumber(event.target.value))}
                    />
                    <Button type="submit" disabled={limitMutation.isPending}>
                      {limitMutation.isPending ? "Saving..." : "Save Limit"}
                    </Button>
                  </form>
                </PopupForm>
              </div>
            );
          }}
        />

        {lowBalanceCount > 0 && (
          <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            {lowBalanceCount} POS users are currently below their configured minimum limits.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
