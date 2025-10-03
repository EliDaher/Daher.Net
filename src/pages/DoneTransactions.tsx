import { DataTable } from '@/components/dashboard/DataTable';
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { getDoneInvoices } from '@/services/invoices';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function DoneTransactions() {

    // جلب الفواتير المعلقة
    const { data: doneData, isLoading: doneLoading } = useQuery({
        queryKey: ['done-table'],
        queryFn: getDoneInvoices,
    });

    const invoicesColumns = [
        { key: '_id', label: 'المعرف', sortable: true, hidden: true },
        { key: 'landline', label: 'الرقم', sortable: true },
        { key: 'company', label: 'الشركة', sortable: true },
        { key: 'speed', label: 'السرعة', sortable: true },
        { key: 'email', label: 'الحساب المرسل', sortable: true },
        { key: 'amount', label: 'المبلغ المسدد', sortable: true },
        { key: 'status', label: 'حالة العملية', sortable: true },
        { key: 'note', label: 'ملاحظات', sortable: true },
        { key: 'createdAt', label: 'الوقت', sortable: true },
    ];

    if (doneLoading) {
        return (
          <DashboardLayout>
            <div dir="rtl" className="space-y-6 text-center text-lg font-semibold">
              جارِ تحميل البيانات...
            </div>
          </DashboardLayout>
        );
    }

    return (

        <DashboardLayout>

            <div dir='rtl' className='space-y-6'>

                <DataTable
                    title='التسديدات المنتهية'
                    description='عمليات التسديد المنجزة'
                    columns={invoicesColumns}
                    data={doneData ? doneData : []}
                />

            </div>

        </DashboardLayout>

    )
}
