import { DataTable } from "@/components/dashboard/DataTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import AddBalanceForm from "@/components/invoices/AddBalanceForm";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getDailyBalance, getEmployeeBalanceTable } from "@/services/balance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BoxIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";

export default function BillBalance() {
  const { data: balance, isLoading: balanceLoading } = useQuery({
    queryKey: ["dailyBalance-table"],
    queryFn: getDailyBalance,
  });

  const { data: todayalance, isLoading: todayBalanceLoading } = useQuery({
    queryKey: ["todayBalance-table"],
    queryFn: () =>
      getEmployeeBalanceTable("all", new Date().toISOString().split("T")[0]),
  });

  const BalanceColumns = [
    { key: "total", label: "الكمية", sortable: true },
    { key: "date", label: "الوقت", sortable: true },
  ];

  const BalanceByEmployeeColumns = [
    { key: "employee", label: "الموظف", sortable: true },
    { key: "total", label: "الكمية", sortable: true },
  ];

  const [totalBalance, setTotalBalance] = useState(0);
  const [todayBalance, setTodayBalance] = useState(0);
  const [BalanceByEmployee, setBalanceByEmployee] = useState([]);

  const [payIsOpen, setPayIsOpen] = useState(false);
  const [payOrInv, setPayOrInv] = useState("pay");
  const closePayModal = () => setPayIsOpen(false);
  const openAddBalanceForm = () => setPayIsOpen(true);

  const handlePayFormSubmit = () => {
    closePayModal(); // إغلاق النموذج بعد الإرسال
  };

  useEffect(() => {
    if (balance && todayalance) {
      let temp = 0;
      balance.forEach((b: any) => {
        temp += b.total;
      });
      todayalance.data.forEach((b: any) => {
        temp += b.amount;
      });
      setTotalBalance(temp);
      let temp2 = 0;
      todayalance.data.forEach((b: any) => {
        if (b.employee != "mahal") {
          temp2 += b.amount;
        }
      });
      setTodayBalance(temp2);
      const groupedTotals = todayalance.data.reduce((acc, curr) => {
        const emp = curr.employee;
        if (!acc[emp]) {
          acc[emp] = 0;
        }
        acc[emp] += curr.amount;
        return acc;
      }, {});
      const totalsArray = Object.entries(groupedTotals).map(
        ([employee, total]) => ({
          employee,
          total,
        }),
      );
      setBalanceByEmployee(totalsArray);
    }
  }, [balance, todayalance]);

  useEffect(() => {
    console.log(todayalance);
  }, [todayalance]);

  if (balanceLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <>
      <DashboardLayout>
        <div dir="rtl" className="space-y-6">
          <div dir="rtl" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <div className="flex flex-col w-full">
                <StatsCard
                  title="الرصيد الحالي"
                  value={
                    totalBalance.toLocaleString("en-EG", {
                      minimumFractionDigits: 0,
                    }) || 0
                  }
                  description=""
                  icon={BoxIcon}
                  className="rounded-b-none"
                />
                <div className="w-full">
                  <button
                    onClick={() => {
                      setPayOrInv("pay");
                      openAddBalanceForm();
                    }}
                    className="p-2 w-1/2 bg-primary-500 text-white rounded-br hover:bg-primary-600"
                  >
                    قبض
                  </button>
                  <button
                    onClick={() => {
                      setPayOrInv("inv");
                      openAddBalanceForm();
                    }}
                    className="p-2 w-1/2 bg-red-500 text-white rounded-bl hover:bg-red-600"
                  >
                    دفع
                  </button>
                </div>
              </div>
            </div>

            <StatsCard
              title="صناديق اليوم"
              value={
                todayBalance.toLocaleString("en-EG", {
                  minimumFractionDigits: 0,
                }) || 0
              }
              description=""
              icon={Plus}
            />
          </div>

          <DataTable
            title="الرصيد"
            description={`المجموع ${(totalBalance - todayBalance).toLocaleString("en-EG", { minimumFractionDigits: 0 })}`}
            columns={BalanceColumns}
            data={balance ? balance.reverse() : []}
          />

          <DataTable
            searchable={false}
            title=""
            description=""
            columns={BalanceByEmployeeColumns}
            data={BalanceByEmployee ? BalanceByEmployee : []}
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
