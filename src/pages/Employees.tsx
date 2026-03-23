import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Coins, ListChecks, Users } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/dashboard/DataTable";
import { getEmployeersOerations } from "@/services/ports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface EmployeeOperationRow {
  id?: string;
  employee?: string;
  amount?: number;
  operationType?: string;
  port?: string;
  note?: string;
  details?: string;
  timestamp?: string | number;
  dateKey?: string;
}

const CHART_COLORS = [
  "#16a34a",
  "#2563eb",
  "#d97706",
  "#9333ea",
  "#0891b2",
  "#dc2626",
  "#4f46e5",
  "#0f766e",
  "#7c3aed",
  "#ea580c",
];

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString("en-SY");
}

function getMonthStartAndToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return {
    fromDate: `${year}-${month}-01`,
    toDate: `${year}-${month}-${day}`,
  };
}

function parseNumber(value: unknown) {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
}

function pickString(row: Record<string, unknown>, keys: string[], fallback = "-") {
  for (const key of keys) {
    const value = row[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value);
    }
  }

  return fallback;
}

function normalizeDay(value: unknown) {
  if (!value) return "غير معروف";

  const date = new Date(String(value));
  if (!Number.isNaN(date.getTime())) {
    return date.toISOString().slice(0, 10);
  }

  const raw = String(value);
  return raw.length >= 10 ? raw.slice(0, 10) : raw;
}

function extractAmountFromNote(note: string) {
  const match = note.match(/(?:بقيمة|قيمة)\s*([-+]?[0-9][0-9,]*(?:\.[0-9]+)?)/);
  if (!match?.[1]) return 0;
  const normalized = match[1].replace(/,/g, "");
  return parseNumber(normalized);
}

function extractPortFromNote(note: string) {
  const match = note.match(/(?:في\s+شركة|شركة)\s+([^\s،,.]+)/);
  return match?.[1] || "غير محدد";
}

function formatDateTime(value: unknown) {
  if (!value) return "-";
  const date = new Date(String(value));
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.toLocaleDateString("en-CA")} ${date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export default function Employees() {
  const [filters, setFilters] = useState(getMonthStartAndToday());
  const [executorName, setExecutorName] = useState("");

  const { data: rawOperations, isLoading } = useQuery({
    queryKey: ["employees-operations", filters.fromDate, filters.toDate, executorName],
    queryFn: async () => {
      const response = await getEmployeersOerations({
        fromDate: filters.fromDate,
        toDate: filters.toDate,
        executorName: executorName.trim() || undefined,
      });

      return Array.isArray(response) ? response : [];
    },
  });

  const operationRows = useMemo(
    () =>
      (rawOperations ?? []).map((rawRow: Record<string, unknown>, index) => ({
        id: String(rawRow._id ?? rawRow.id ?? `${index}`),
        employee: pickString(rawRow, ["executorName", "employee", "executor", "username", "user", "createdBy"]),
        operationType: pickString(rawRow, ["operationType", "type", "serviceType"], "غير محدد"),
        note: pickString(rawRow, ["note", "details", "reason", "description"], ""),
        amount:
          parseNumber(rawRow.amount ?? rawRow.total ?? rawRow.value ?? rawRow.price) ||
          parseNumber(
            extractAmountFromNote(pickString(rawRow, ["note", "details", "reason", "description"], "")),
          ),
        port:
          pickString(rawRow, ["portName", "port", "company", "sender", "gateway", "sourcePort"], "") ||
          extractPortFromNote(pickString(rawRow, ["note", "details", "reason", "description"], "")),
        details: pickString(rawRow, ["note", "details", "reason", "description", "operationType"], ""),
        timestamp: formatDateTime(pickString(rawRow, ["isoTime", "createdAt", "timestamp", "date", "time"], "")),
        dateKey: pickString(rawRow, ["dateKey"], ""),
      })),
    [rawOperations],
  );

  const kpis = useMemo(() => {
    const totalsByEmployee = new Map<string, { operations: number; total: number }>();
    let totalAmount = 0;

    for (const row of operationRows) {
      const employee = row.employee || "-";
      const amount = Number(row.amount || 0);

      totalAmount += amount;

      const current = totalsByEmployee.get(employee) || { operations: 0, total: 0 };
      totalsByEmployee.set(employee, {
        operations: current.operations + 1,
        total: current.total + amount,
      });
    }

    let topEmployee: { employee: string; operations: number; total: number } | null = null;
    for (const [employee, values] of totalsByEmployee.entries()) {
      if (!topEmployee || values.total > topEmployee.total) {
        topEmployee = { employee, operations: values.operations, total: values.total };
      }
    }

    return {
      employeesActive: [...totalsByEmployee.keys()].filter((name) => name && name !== "-").length,
      totalOperations: operationRows.length,
      totalAmount,
      topEmployee: topEmployee || undefined,
    };
  }, [operationRows]);

  const summaryRows = useMemo(() => {
    const grouped = new Map<string, { employee: string; operations: number; total: number }>();

    for (const row of operationRows) {
      const employee = row.employee || "غير محدد";
      const current = grouped.get(employee) || { employee, operations: 0, total: 0 };
      grouped.set(employee, {
        employee,
        operations: current.operations + 1,
        total: current.total + Number(row.amount || 0),
      });
    }

    return [...grouped.values()];
  }, [operationRows]);

  const chartRows = useMemo(
    () =>
      (rawOperations ?? []).map((row: Record<string, unknown>) => ({
        day: normalizeDay(row.dateKey ?? row.isoTime ?? row.createdAt ?? row.timestamp ?? row.date ?? row.time),
        executor: pickString(
          row,
          ["executorName", "employee", "executor", "username", "user", "createdBy"],
          "غير محدد",
        ),
        type: pickString(
          row,
          ["operationType", "type", "serviceType", "category"],
          "غير محدد",
        ),
        port:
          pickString(row, ["portName", "port", "company", "sender", "gateway", "sourcePort"], "") ||
          extractPortFromNote(pickString(row, ["note", "details", "reason", "description"], "")),
      })),
    [rawOperations],
  );

  const operationTypePieData = useMemo(() => {
    const counts = new Map<string, number>();
    for (const row of chartRows) {
      counts.set(row.type, (counts.get(row.type) || 0) + 1);
    }

    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [chartRows]);

  const barsByDayExecutor = useMemo(() => {
    const dayExecutorMap = new Map<string, Record<string, number>>();
    const executorSet = new Set<string>();

    for (const row of chartRows) {
      const day = row.day;
      const executor = row.executor;
      executorSet.add(executor);

      if (!dayExecutorMap.has(day)) {
        dayExecutorMap.set(day, {});
      }

      const current = dayExecutorMap.get(day)!;
      current[executor] = (current[executor] || 0) + 1;
    }

    const executors = [...executorSet].sort((a, b) => a.localeCompare(b));
    const data = [...dayExecutorMap.entries()]
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([day, executorCounts]) => {
        const row: Record<string, string | number> = { day };
        for (const executor of executors) {
          row[executor] = executorCounts[executor] || 0;
        }
        return row;
      });

    return { data, executors };
  }, [chartRows]);

  const summaryColumns = [
    { key: "employee", label: "الموظف", sortable: true },
    { key: "operations", label: "عدد العمليات", sortable: true },
    { key: "total", label: "الإجمالي", sortable: true },
  ];

  const operationsColumns = [
    { key: "employee", label: "الموظف", sortable: true },
    { key: "operationType", label: "نوع العملية", sortable: true },
    { key: "port", label: "المنفذ / الشركة", sortable: true },
    { key: "amount", label: "المبلغ", sortable: true },
    { key: "note", label: "الملاحظة", sortable: true },
    { key: "timestamp", label: "الوقت", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">عمليات الموظفين</h1>
          <div className="grid gap-3 rounded-xl border bg-card p-3 md:grid-cols-4">
            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">من</span>
              <input
                type="date"
                value={filters.fromDate}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, fromDate: event.target.value }))
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">إلى</span>
              <input
                type="date"
                value={filters.toDate}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, toDate: event.target.value }))
                }
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <input
              type="text"
              value={executorName}
              onChange={(event) => setExecutorName(event.target.value)}
              placeholder="اسم المنفذ (اختياري)"
              className="h-10 rounded-lg border bg-transparent px-3 text-sm outline-none"
            />
            <button
              type="button"
              className="h-10 rounded-lg border px-3 text-sm hover:bg-muted/60"
              onClick={() => setFilters(getMonthStartAndToday())}
            >
              هذا الشهر
            </button>
          </div>
          <div className="text-sm text-muted-foreground">
            النطاق الحالي: من {filters.fromDate} إلى {filters.toDate}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatsCard
            title="الموظفون النشطون"
            value={Number(kpis.employeesActive || 0)}
            icon={Users}
            loading={isLoading}
            description="عدد الموظفين الذين لديهم عمليات ضمن النطاق المحدد"
          />
          <StatsCard
            title="إجمالي العمليات"
            value={Number(kpis.totalOperations || 0)}
            icon={ListChecks}
            loading={isLoading}
            description="عدد جميع العمليات المنفذة"
          />
          <StatsCard
            title="إجمالي المبالغ"
            value={formatNumber(Number(kpis.totalAmount || 0))}
            icon={Coins}
            loading={isLoading}
            description="مجموع مبالغ العمليات"
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

        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="xl:col-span-1">
            <CardHeader>
              <CardTitle>نسبة أنواع العمليات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={operationTypePieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={110}
                      label={({ percent }) => `${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {operationTypePieData.map((_, index) => (
                        <Cell key={`type-cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle>العمليات اليومية حسب اسم المنفذ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barsByDayExecutor.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {barsByDayExecutor.executors.map((executor, index) => (
                      <Bar
                        key={executor}
                        dataKey={executor}
                        name={executor}
                        fill={CHART_COLORS[index % CHART_COLORS.length]}
                        radius={[3, 3, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          title="ملخص الموظفين"
          description={`من ${filters.fromDate} إلى ${filters.toDate}`}
          columns={summaryColumns}
          data={summaryRows}
          isLoading={isLoading}
          searchable
          defaultPageSize={10}
        />

        <DataTable
          title="تفاصيل العمليات"
          description={executorName.trim() ? `المنفذ: ${executorName.trim()}` : "جميع المنفذين"}
          columns={operationsColumns}
          data={operationRows}
          isLoading={isLoading}
          amountBold
          searchable
          defaultPageSize={10}
        />
      </div>
    </DashboardLayout>
  );
}
