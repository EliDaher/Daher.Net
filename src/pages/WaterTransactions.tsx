import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, Droplets, Search } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BILL_TRANSACTION_INVOICE_GROUP_LABELS,
  getWaterTransactionsByDateRange,
  updateWaterTransactionReviewed,
  type BillTransaction,
  type BillTransactionInvoiceGroup,
  type UpdateBillTransactionReviewedPayload,
} from "@/services/balance";

const todayDate = new Date().toISOString().split("T")[0];
type QueryMode = "all-unreviewed" | "date-range";
type InvoiceGroupFilter = "all" | BillTransactionInvoiceGroup;

function formatAmount(value: number | string | undefined) {
  return Number(value || 0).toLocaleString("en-EG", {
    minimumFractionDigits: 0,
  });
}

export default function WaterTransactions() {
  const queryClient = useQueryClient();
  const [fromDate, setFromDate] = useState(todayDate);
  const [toDate, setToDate] = useState(todayDate);
  const [appliedDateRange, setAppliedDateRange] = useState({
    fromDate: todayDate,
    toDate: todayDate,
  });
  const [queryMode, setQueryMode] = useState<QueryMode>("all-unreviewed");
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [reviewedFilter, setReviewedFilter] = useState("false");
  const [invoiceGroupFilter, setInvoiceGroupFilter] =
    useState<InvoiceGroupFilter>("all");

  const queryKey = [
    "water-transactions",
    queryMode,
    appliedDateRange.fromDate,
    appliedDateRange.toDate,
    employeeFilter,
    reviewedFilter,
    invoiceGroupFilter,
  ];

  const { data: response, isFetching, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      getWaterTransactionsByDateRange({
        fromDate:
          queryMode === "date-range" ? appliedDateRange.fromDate : undefined,
        toDate: queryMode === "date-range" ? appliedDateRange.toDate : undefined,
        employee: employeeFilter,
        reviewed: reviewedFilter,
        allDates: queryMode === "all-unreviewed",
      }),
  });

  const rawTransactions: BillTransaction[] = response?.data || [];
  const transactions = useMemo(
    () =>
      rawTransactions.filter((transaction) =>
        invoiceGroupFilter === "all"
          ? true
          : transaction.invoiceGroup === invoiceGroupFilter,
      ),
    [invoiceGroupFilter, rawTransactions],
  );
  const appliedRangeLabel =
    queryMode === "all-unreviewed"
      ? "All dates - not reviewed"
      : appliedDateRange.fromDate === appliedDateRange.toDate
      ? appliedDateRange.fromDate
      : `${appliedDateRange.fromDate} - ${appliedDateRange.toDate}`;

  const toggleReviewedMutation = useMutation({
    mutationFn: (payload: UpdateBillTransactionReviewedPayload) =>
      updateWaterTransactionReviewed(payload),
    onSuccess: () => {
      toast.success("Water transaction updated.");
      void queryClient.invalidateQueries({
        queryKey: ["water-transactions"],
      });
    },
    onError: () => {
      toast.error("Failed to update water transaction.");
    },
  });

  const employeeOptions = useMemo(() => {
    const names = new Set<string>();

    transactions.forEach((transaction) => {
      if (transaction.employee) {
        names.add(transaction.employee);
      }
    });

    return ["all", ...Array.from(names).sort()];
  }, [transactions]);

  const reviewedCount = transactions.filter(
    (transaction) => transaction.reviewed,
  ).length;
  const pendingCount = transactions.length - reviewedCount;
  const totalAmount = transactions.reduce(
    (total, transaction) => total + Number(transaction.invoiceValue || 0),
    0,
  );

  const handleGetTransactions = () => {
    if (!fromDate || !toDate) {
      toast.error("Please select from and to dates.");
      return;
    }

    if (fromDate > toDate) {
      toast.error("From date must be before to date.");
      return;
    }

    setAppliedDateRange({ fromDate, toDate });
    setQueryMode("date-range");
  };

  const handleShowDefaultTransactions = () => {
    setReviewedFilter("false");
    setInvoiceGroupFilter("all");
    setAppliedDateRange({ fromDate: todayDate, toDate: todayDate });
    setFromDate(todayDate);
    setToDate(todayDate);
    setQueryMode("all-unreviewed");
  };

  const columns = [
    { key: "customerName", label: "Customer", sortable: true },
    { key: "customerNumber", label: "Number", sortable: true },
    { key: "customerDetails", label: "Details", sortable: true },
    { key: "invoiceNumber", label: "Invoice", sortable: true },
    { key: "invoiceGroupLabel", label: "Invoice group", sortable: true },
    {
      key: "invoiceValue",
      label: "Amount",
      sortable: true,
      accessor: (row: any) => formatAmount(row.invoiceValue),
    },
    { key: "employee", label: "Employee", sortable: true },
    {
      key: "createdAt",
      label: "Created",
      sortable: true,
      hidden: reviewedFilter === "true",
    },
    {
      key: "reviewedAt",
      label: "Reviewed at",
      sortable: true,
      hidden: reviewedFilter !== "true",
    },
    {
      key: "reviewedStatus",
      label: "Reviewed",
      sortable: true,
      accessor: (row: any) => (row.reviewed ? "Reviewed" : "Not reviewed"),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <div className="grid gap-4 md:grid-cols-3">
          <StatsCard
            title="Water Total"
            value={formatAmount(totalAmount)}
            description={appliedRangeLabel}
            icon={Droplets}
            loading={isLoading}
          />
          <StatsCard
            title="Reviewed"
            value={reviewedCount.toString()}
            description={appliedRangeLabel}
            icon={CheckCircle2}
            loading={isLoading}
          />
          <StatsCard
            title="Not Reviewed"
            value={pendingCount.toString()}
            description={appliedRangeLabel}
            icon={Circle}
            loading={isLoading}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">From date</label>
            <Input
              onChange={(event) => setFromDate(event.target.value)}
              type="date"
              value={fromDate}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">To date</label>
            <Input
              onChange={(event) => setToDate(event.target.value)}
              type="date"
              value={toDate}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Employee</label>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(event) => setEmployeeFilter(event.target.value)}
              value={employeeFilter}
            >
              {employeeOptions.map((employee) => (
                <option key={employee} value={employee}>
                  {employee === "all" ? "All employees" : employee}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Reviewed</label>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(event) => setReviewedFilter(event.target.value)}
              value={reviewedFilter}
            >
              <option value="all">All</option>
              <option value="true">Reviewed</option>
              <option value="false">Not reviewed</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Invoice group</label>
            <select
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(event) =>
                setInvoiceGroupFilter(event.target.value as InvoiceGroupFilter)
              }
              value={invoiceGroupFilter}
            >
              <option value="all">All</option>
              <option value="shopNumbers">
                {BILL_TRANSACTION_INVOICE_GROUP_LABELS.shopNumbers}
              </option>
              <option value="otherNumbers">
                {BILL_TRANSACTION_INVOICE_GROUP_LABELS.otherNumbers}
              </option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <Button
              className="flex-1"
              disabled={isFetching}
              loading={isFetching}
              onClick={handleGetTransactions}
              type="button"
            >
              <Search />
              Get transactions
            </Button>
            <Button
              className="flex-1"
              disabled={isFetching}
              onClick={handleShowDefaultTransactions}
              type="button"
              variant="outline"
            >
              Default
            </Button>
          </div>
        </div>

        <DataTable
          title="Water Transactions"
          description={`${transactions.length} rows - total ${formatAmount(totalAmount)} - ${appliedRangeLabel}`}
          columns={columns}
          data={transactions}
          defaultPageSize={20}
          defaultSort={
            reviewedFilter === "true"
              ? { key: "reviewedAt", direction: "desc" }
              : reviewedFilter === "false"
              ? { key: "createdAt", direction: "asc" }
              : null
          }
          isLoading={isLoading}
          renderRowActions={(row) => (
            <label className="inline-flex items-center justify-center">
              <input
                aria-label="Toggle reviewed"
                checked={Boolean(row.reviewed)}
                className="h-4 w-4 accent-primary"
                disabled={toggleReviewedMutation.isPending}
                onChange={(event) =>
                  toggleReviewedMutation.mutate({
                    id: row.id,
                    date: row.date || appliedDateRange.fromDate,
                    reviewed: event.target.checked,
                    category: "waterTotal",
                  })
                }
                type="checkbox"
              />
            </label>
          )}
        />
      </div>
    </DashboardLayout>
  );
}

