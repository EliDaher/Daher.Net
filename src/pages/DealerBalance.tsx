import { DataTable } from '@/components/dashboard/DataTable'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getPaymentDealer } from '@/services/dealer';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react'

interface Payment {
  Amount: number | string;
  Date: string; // بصيغة "YYYY-MM-DD"
  [key: string]: any;
}

export default function DealerBalance() {

    const { data: DealerPayments, isLoading: DealerPaymentsLoading } = useQuery({
        queryKey: ["dealerPayments-table"],
        queryFn: getPaymentDealer,
    });

    const PaymentsColumns = [
        { key: "subscriberName", label: "اسم المشترك", sortable: true },
        { key: "Amount", label: "المبلغ", sortable: true },
        { key: "Details", label: "التفاصيل", sortable: true },
        { key: "Date", label: "الوقت", sortable: true },
    ];

    const ThisMonthPayments = useMemo(() => {
        const currentMonth = new Date().getMonth() + 1; // الشهر الحالي (1-12)

        const totalDebt = !DealerPayments ? 0 : Object.values(DealerPayments)
          .filter((c: Payment) => {
            const paymentMonth = new Date(c.Date).getMonth() + 1;
            return paymentMonth === currentMonth;
          })
          .reduce((sum, c: Payment) => Number(sum) + Number(c.Amount), 0);

        return Math.abs(Number(totalDebt));
    }, [DealerPayments]);

    return (
        <DashboardLayout>

            <div dir='rtl'>
                <DataTable
                    title="الدفعات"
                    description={"دفعات المشتركين لهذا الشهر " + ThisMonthPayments}
                    columns={PaymentsColumns}
                    data={DealerPayments ? Object.values(DealerPayments).reverse() : []}
                />
            </div>
        
        </DashboardLayout>
    )
}
