import { DataTable } from '@/components/dashboard/DataTable'
import { StatsCard } from '@/components/dashboard/StatsCard';
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getDailyBalance, getEmployeeBalanceTable } from '@/services/balance';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BoxIcon, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BillBalance() {

    const { data: balance, isLoading: balanceLoading } = useQuery({
        queryKey: ["dailyBalance-table"],
        queryFn: getDailyBalance,
    });
    
    const { data: todayalance, isLoading: todayBalanceLoading } = useQuery({
        queryKey: ["todayBalance-table"],
        queryFn: () => getEmployeeBalanceTable('all', new Date().toISOString().split('T')[0]),
    });
    
    const BalanceColumns = [
        { key: "total", label: "الكمية", sortable: true },
        { key: "date", label: "الوقت", sortable: true },
    ];
    
    const BalanceByEmployeeColumns = [
        { key: "employee", label: "الموظف", sortable: true },
        { key: "total", label: "الكمية", sortable: true },
    ];

    const [totalBalance, setTotalBalance] = useState(0)
    const [todayBalance, setTodayBalance] = useState(0)
    const [BalanceByEmployee, setBalanceByEmployee] = useState([])

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
            let temp2 = 0
            todayalance.data.forEach((b: any) => {
                if(b.employee != 'mahal'){
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
            const totalsArray = Object.entries(groupedTotals).map(([employee, total]) => ({
              employee,
              total,
            }));
            setBalanceByEmployee(totalsArray)
            
        }

    }, [balance, todayalance]);


    useEffect(()=>{
        console.log(todayalance)
    }, [todayalance])

    
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

        <DashboardLayout>

            <div dir='rtl' className='space-y-6'>

                <div dir="rtl" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

                    <StatsCard
                        title="الرصيد الحالي"
                        value={totalBalance || 0}
                        description=""
                        icon={BoxIcon}
                    />
                    <StatsCard
                        title="صناديق اليوم"
                        value={todayBalance || 0}
                        description=""
                        icon={Plus}
                    />

                </div>

                <DataTable
                    title='الرصيد'
                    description={`المجموع ${totalBalance - todayBalance}`}
                    columns={BalanceColumns}
                    data={balance ? balance.reverse() : []}
                />
                
                <DataTable  
                    searchable={false}
                    title=''
                    description=''
                    columns={BalanceByEmployeeColumns}
                    data={BalanceByEmployee ? BalanceByEmployee : []}
                />

            </div>

        </DashboardLayout>

    )
}
