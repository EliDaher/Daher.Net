import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Circle, Zap } from "lucide-react";
import { toast } from "sonner";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  getElectricityTransactions,
  updateElectricityTransactionReviewed,
  type ElectricityTransaction,
  type UpdateElectricityTransactionReviewedPayload,
} from "@/services/balance";

const todayDate = new Date().toISOString().split("T")[0];

function formatAmount(value: number | string | undefined) {
  return Number(value || 0).toLocaleString("en-EG", {
    minimumFractionDigits: 0,
  });
}

export default function ElectricityTransactions() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [reviewedFilter, setReviewedFilter] = useState("all");

  const queryKey = [
    "electricity-transactions",
    selectedDate,
    employeeFilter,
    reviewedFilter,
  ];

  const { data: response, isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      getElectricityTransactions({
        date: selectedDate,
        employee: employeeFilter,
        reviewed: reviewedFilter,
      }),
  });

  const transactions: ElectricityTransaction[] = response?.data || [];

  const toggleReviewedMutation = useMutation({
    mutationFn: (payload: UpdateElectricityTransactionReviewedPayload) =>
      updateElectricityTransactionReviewed(payload),
    onSuccess: () => {
      toast.success("Electricity transaction updated.");
      void queryClient.invalidateQueries({
        queryKey: ["electricity-transactions"],
      });
    },
    onError: () => {
      toast.error("Failed to update electricity transaction.");
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
            title="Electricity Total"
            value={formatAmount(totalAmount)}
            description={selectedDate}
            icon={Zap}
            loading={isLoading}
          />
          <StatsCard
            title="Reviewed"
            value={reviewedCount.toString()}
            description={selectedDate}
            icon={CheckCircle2}
            loading={isLoading}
          />
          <StatsCard
            title="Not Reviewed"
            value={pendingCount.toString()}
            description={selectedDate}
            icon={Circle}
            loading={isLoading}
          />
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Date</label>
            <input
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              onChange={(event) => setSelectedDate(event.target.value)}
              type="date"
              value={selectedDate}
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
        </div>

        <DataTable
          title="Electricity Transactions"
          description={`${transactions.length} rows - total ${formatAmount(totalAmount)}`}
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
                    date: row.date || selectedDate,
                    reviewed: event.target.checked,
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
