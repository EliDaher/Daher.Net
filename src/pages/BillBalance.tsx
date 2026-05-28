import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BoxIcon, Droplets, Phone, Plus, Wifi, Zap } from "lucide-react";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import AddBalanceForm from "@/components/invoices/AddBalanceForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  getBillCategoryTotals,
  getDailyBalance,
  getEmployeeBalanceTable,
  type BillCategoryTotals,
} from "@/services/balance";

const todayDate = new Date().toISOString().split("T")[0];

const categoryOptions = [
  { value: "all", label: "كل التصنيفات" },
  { value: "internetTotal", label: "إنترنت" },
  { value: "elecTotal", label: "كهرباء" },
  { value: "waterTotal", label: "مياه" },
  { value: "phoneTotal", label: "أرضي" },
];

const emptyTotals: BillCategoryTotals & { total: number } = {
  internetTotal: 0,
  elecTotal: 0,
  waterTotal: 0,
  phoneTotal: 0,
  total: 0,
};

function formatAmount(value: number) {
  return Number(value || 0).toLocaleString("en-EG", {
    minimumFractionDigits: 0,
  });
}

export default function BillBalance() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [employeeFilter, setEmployeeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [totalBalance, setTotalBalance] = useState(0);
  const [todayBalance, setTodayBalance] = useState(0);
  const [balanceByEmployee, setBalanceByEmployee] = useState<any[]>([]);
  const [payIsOpen, setPayIsOpen] = useState(false);
  const [payOrInv, setPayOrInv] = useState("pay");

  const { data: balance = [], isLoading: balanceLoading } = useQuery({
    queryKey: ["dailyBalance-table"],
    queryFn: getDailyBalance,
  });

  const { data: dayBalance } = useQuery({
    queryKey: ["todayBalance-table", selectedDate],
    queryFn: () => getEmployeeBalanceTable("all", selectedDate),
  });

  const {
    data: categoryReport,
    isLoading: categoryReportLoading,
  } = useQuery({
    queryKey: [
      "bill-category-totals",
      selectedDate,
      employeeFilter,
      categoryFilter,
    ],
    queryFn: () =>
      getBillCategoryTotals({
        date: selectedDate,
        employee: employeeFilter,
        category: categoryFilter,
      }),
  });

  const balanceColumns = [
    { key: "total", label: "الكمية", sortable: true },
    { key: "date", label: "الوقت", sortable: true },
  ];

  const balanceByEmployeeColumns = [
    { key: "employee", label: "الموظف", sortable: true },
    { key: "total", label: "الكمية", sortable: true },
  ];

  const categoryEmployeeColumns = [
    { key: "employee", label: "الموظف", sortable: true },
    { key: "internetTotal", label: "إنترنت", sortable: true },
    { key: "elecTotal", label: "كهرباء", sortable: true },
    { key: "waterTotal", label: "مياه", sortable: true },
    { key: "phoneTotal", label: "أرضي", sortable: true },
    { key: "total", label: "المجموع", sortable: true },
  ];

  const categoryColumns = [
    { key: "label", label: "التصنيف", sortable: true },
    { key: "total", label: "المجموع", sortable: true },
  ];

  const categoryTotals = categoryReport?.totals || emptyTotals;
  const categoryByEmployee = categoryReport?.byEmployee || [];
  const categoryByType = categoryReport?.byCategory || [];

  const employeeOptions = useMemo(() => {
    const names = new Set<string>();

    balanceByEmployee.forEach((row) => {
      if (row.employee) {
        names.add(row.employee);
      }
    });

    categoryByEmployee.forEach((row: any) => {
      if (row.employee) {
        names.add(row.employee);
      }
    });

    return ["all", ...Array.from(names).sort()];
  }, [balanceByEmployee, categoryByEmployee]);

  const closePayModal = () => setPayIsOpen(false);
  const openAddBalanceForm = () => setPayIsOpen(true);

  const handlePayFormSubmit = () => {
    closePayModal();
    void queryClient.invalidateQueries({ queryKey: ["dailyBalance-table"] });
    void queryClient.invalidateQueries({ queryKey: ["todayBalance-table"] });
  };

  useEffect(() => {
    if (!balance || !dayBalance?.data) {
      return;
    }

    let runningTotal = 0;
    balance.forEach((item: any) => {
      runningTotal += Number(item.total || 0);
    });
    dayBalance.data.forEach((item: any) => {
      runningTotal += Number(item.amount || 0);
    });
    setTotalBalance(runningTotal);

    let dayTotal = 0;
    dayBalance.data.forEach((item: any) => {
      if (item.employee !== "mahal") {
        dayTotal += Number(item.amount || 0);
      }
    });
    setTodayBalance(dayTotal);

    const groupedTotals = dayBalance.data.reduce((acc: any, item: any) => {
      const employee = item.employee || "غير محدد";
      acc[employee] = (acc[employee] || 0) + Number(item.amount || 0);

      return acc;
    }, {});

    setBalanceByEmployee(
      Object.entries(groupedTotals).map(([employee, total]) => ({
        employee,
        total,
      })),
    );
  }, [balance, dayBalance]);

  if (balanceLoading) {
    return (
      <DashboardLayout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div dir="rtl" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col">
              <StatsCard
                title="الرصيد الحالي"
                value={formatAmount(totalBalance)}
                description=""
                icon={BoxIcon}
                className="rounded-b-none"
              />
              <div className="flex w-full">
                <button
                  onClick={() => {
                    setPayOrInv("pay");
                    openAddBalanceForm();
                  }}
                  className="w-1/2 rounded-br bg-primary-500 p-2 text-white hover:bg-primary-600"
                >
                  قبض
                </button>
                <button
                  onClick={() => {
                    setPayOrInv("inv");
                    openAddBalanceForm();
                  }}
                  className="w-1/2 rounded-bl bg-red-500 p-2 text-white hover:bg-red-600"
                >
                  دفع
                </button>
              </div>
            </div>

            <StatsCard
              title="صناديق اليوم"
              value={formatAmount(todayBalance)}
              description={selectedDate}
              icon={Plus}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-sm font-medium">التاريخ</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">الموظف</label>
              <select
                value={employeeFilter}
                onChange={(event) => setEmployeeFilter(event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {employeeOptions.map((employee) => (
                  <option key={employee} value={employee}>
                    {employee === "all" ? "كل الموظفين" : employee}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">التصنيف</label>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categoryOptions.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="إنترنت"
              value={formatAmount(categoryTotals.internetTotal)}
              description={selectedDate}
              icon={Wifi}
              loading={categoryReportLoading}
            />
            <StatsCard
              title="كهرباء"
              value={formatAmount(categoryTotals.elecTotal)}
              description={selectedDate}
              icon={Zap}
              loading={categoryReportLoading}
            />
            <StatsCard
              title="مياه"
              value={formatAmount(categoryTotals.waterTotal)}
              description={selectedDate}
              icon={Droplets}
              loading={categoryReportLoading}
            />
            <StatsCard
              title="أرضي"
              value={formatAmount(categoryTotals.phoneTotal)}
              description={selectedDate}
              icon={Phone}
              loading={categoryReportLoading}
            />
          </div>

          <DataTable
            title="إجماليات الفواتير حسب الموظف"
            description={`المجموع ${formatAmount(categoryTotals.total)}`}
            columns={categoryEmployeeColumns}
            data={categoryByEmployee}
            isLoading={categoryReportLoading}
          />

          <DataTable
            title="إجماليات الفواتير حسب التصنيف"
            description=""
            columns={categoryColumns}
            data={categoryByType}
            isLoading={categoryReportLoading}
          />

          <DataTable
            title="الرصيد"
            description={`المجموع ${formatAmount(totalBalance - todayBalance)}`}
            columns={balanceColumns}
            data={balance ? [...balance].reverse() : []}
          />

          <DataTable
            searchable={false}
            title="صناديق الموظفين"
            description=""
            columns={balanceByEmployeeColumns}
            data={balanceByEmployee}
          />
        </div>
      </DashboardLayout>

      <AddBalanceForm
        mahal={true}
        payOrInv={payOrInv}
        isOpen={payIsOpen}
        onClose={closePayModal}
        onSubmit={handlePayFormSubmit}
      />
    </>
  );
}
