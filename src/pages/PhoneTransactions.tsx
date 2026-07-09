import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, Phone, Search } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getBillTransactionsByDateRange,
  updateBillTransactionReviewed,
  type BillTransaction,
  type UpdateBillTransactionReviewedPayload,
} from "@/services/balance";

const todayDate = new Date().toISOString().split("T")[0];

function formatAmount(value: number | string | undefined) {
  return Number(value || 0).toLocaleString("en-EG", {
    minimumFractionDigits: 0,
  });
}

export default function PhoneTransactions() {
  const queryClient = useQueryClient();
  const [fromDate, setFromDate] = useState(todayDate);
  const [toDate, setToDate] = useState(todayDate);
  const [appliedDateRange, setAppliedDateRange] = useState({
    fromDate: todayDate,
    toDate: todayDate,
  });
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [reviewedFilter, setReviewedFilter] = useState("all");

  const queryKey = [
    "phone-transactions",
    appliedDateRange.fromDate,
    appliedDateRange.toDate,
    employeeFilter,
    reviewedFilter,
  ];

  const { data: response, isFetching, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      getBillTransactionsByDateRange({
        fromDate: appliedDateRange.fromDate,
        toDate: appliedDateRange.toDate,
        employee: employeeFilter,
        reviewed: reviewedFilter,
        category: "phoneTotal",
      }),
  });

  const transactions: BillTransaction[] = response?.data || [];
  const appliedRangeLabel =
    appliedDateRange.fromDate === appliedDateRange.toDate
      ? appliedDateRange.fromDate
      : `${appliedDateRange.fromDate} - ${appliedDateRange.toDate}`;

  const toggleReviewedMutation = useMutation({
    mutationFn: (payload: UpdateBillTransactionReviewedPayload) =>
      updateBillTransactionReviewed(payload),
    onSuccess: () => {
      toast.success("Phone transaction updated.");
      void queryClient.invalidateQueries({
        queryKey: ["phone-transactions"],
      });
    },
    onError: () => {
      toast.error("Failed to update phone transaction.");
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
  };

  const columns = [
    { key: "customerName", label: "Customer", sortable: true },
    { key: "customerNumber", label: "Number", sortable: true },
    { key: "customerDetails", label: "Details", sortable: true },
    { key: "invoiceNumber", label: "Invoice", sortable: true },
    {
      key: "invoiceValue",
      label: "Amount",
      sortable: true,
      accessor: (row: any) => formatAmount(row.invoiceValue),
    },
    { key: "employee", label: "Employee", sortable: true },
    { key: "createdAt", label: "Created", sortable: true },
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
            title="Phone Total"
            value={formatAmount(totalAmount)}
            description={appliedRangeLabel}
            icon={Phone}
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

        <div className="grid gap-3 md:grid-cols-5">
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

          <div className="flex items-end">
            <Button
              className="w-full"
              disabled={isFetching}
              loading={isFetching}
              onClick={handleGetTransactions}
              type="button"
            >
              <Search />
              Get transactions
            </Button>
          </div>
        </div>

        <DataTable
          title="Phone Transactions"
          description={`${transactions.length} rows - total ${formatAmount(totalAmount)} - ${appliedRangeLabel}`}
          columns={columns}
          data={transactions}
          defaultPageSize={20}
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
                    category: "phoneTotal",
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
