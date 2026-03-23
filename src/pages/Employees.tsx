import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Coins, ListChecks, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { getEmployeeBalanceTable } from "@/services/balance";

interface EmployeeKpis {
  topEmployee?: {
    employee?: string;
    operations?: number;
    total?: number;
  };
  totalAmount?: number;
  totalOperations?: number;
  employeesActive?: number;
}

interface EmployeeSummaryRow {
  employee?: string;
  operations?: number;
  total?: number;
}

interface EmployeeOperationRow {
  id?: string;
  employee?: string;
  amount?: number;
  details?: string;
  timestamp?: string | number;
  customerName?: string;
  customerNumber?: string;
  invoiceNumber?: string;
}

interface EmployeeBalanceResponse {
  success?: boolean;
  date?: string;
  kpis?: EmployeeKpis;
  employeesSummary?: EmployeeSummaryRow[];
  employeesOperations?: EmployeeOperationRow[];
}

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString("en-SY");
}

export default function Employees() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { data, isLoading } = useQuery<EmployeeBalanceResponse>({
    queryKey: ["employees-balance-table", date],
    queryFn: async () => {
      const response = await getEmployeeBalanceTable("all", date);
      return (response ?? {}) as EmployeeBalanceResponse;
    },
  });

  const kpis = useMemo(() => data?.kpis ?? {}, [data?.kpis]);

  const summaryRows = useMemo(
    () =>
      (data?.employeesSummary ?? []).map((row) => ({
        employee: row.employee || "غير محدد",
        operations: Number(row.operations || 0),
        total: Number(row.total || 0),
      })),
    [data?.employeesSummary],
  );

  const operationRows = useMemo(
    () =>
      (data?.employeesOperations ?? []).map((row, index) => ({
        id: row.id || `${row.employee || "employee"}-${index}`,
        employee: row.employee || "غير محدد",
        amount: Number(row.amount || 0),
        details: row.details || "",
        timestamp: row.timestamp ?? "",
        customerName: row.customerName || "-",
        customerNumber: row.customerNumber || "-",
        invoiceNumber: row.invoiceNumber || "-",
      })),
    [data?.employeesOperations],
  );

  const summaryColumns = [
    { key: "employee", label: "الموظف", sortable: true },
    { key: "operations", label: "عدد العمليات", sortable: true },
    { key: "total", label: "الإجمالي", sortable: true },
  ];

  const operationsColumns = [
    { key: "employee", label: "الموظف", sortable: true },
    { key: "customerName", label: "العميل", sortable: true },
    { key: "customerNumber", label: "رقم العميل", sortable: true },
    { key: "invoiceNumber", label: "رقم الفاتورة", sortable: true },
    { key: "amount", label: "المبلغ", sortable: true },
    { key: "details", label: "التفاصيل", sortable: true },
    { key: "timestamp", label: "الوقت", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">عمليات الموظفين</h1>
          <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="الموظفون النشطون"
            value={Number(kpis.employeesActive || 0)}
            icon={Users}
            loading={isLoading}
            description="موظفون لديهم عمليات في هذا التاريخ"
          />
          <StatsCard
            title="إجمالي العمليات"
            value={Number(kpis.totalOperations || 0)}
            icon={ListChecks}
            loading={isLoading}
            description="عدد العمليات المنفذة"
          />
          <StatsCard
            title="إجمالي المبالغ"
            value={formatNumber(Number(kpis.totalAmount || 0))}
            icon={Coins}
            loading={isLoading}
            description="مجموع كل مبالغ العمليات"
          />
          <StatsCard
            title="أفضل موظف"
            value={kpis.topEmployee?.employee || "-"}
            icon={Users}
            loading={isLoading}
            description={
              kpis.topEmployee
                ? `${Number(kpis.topEmployee.operations || 0)} عملية / ${formatNumber(
                    Number(kpis.topEmployee.total || 0),
                  )}`
                : "لا يوجد بيانات"
            }
          />
        </div>

        <DataTable
          title="ملخص الموظفين"
          description={`التاريخ: ${data?.date || date}`}
          columns={summaryColumns}
          data={summaryRows}
          isLoading={isLoading}
          searchable
          defaultPageSize={10}
        />

        <DataTable
          title="تفاصيل العمليات"
          columns={operationsColumns}
          data={operationRows}
          isLoading={isLoading}
          amountBold
          defaultPageSize={10}
        />
      </div>
    </DashboardLayout>
  );
}
