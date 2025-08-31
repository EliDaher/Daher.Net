import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import PopupForm from "@/components/ui/custom/PopupForm";
import { Input } from "@/components/ui/input";
import getPOSUsers, { addPOSPayment, endPOSDebt, getPOSDebt } from "@/services/pos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function POSUsers() {

    const [amount, setAmount] = useState(0)
    const [openUserId, setOpenUserId] = useState(null);
    const queryClient = useQueryClient();

    const { data: posData, isLoading: posLoading } = useQuery({
        queryKey: ['POSUsers-table'],
        queryFn: getPOSUsers,
    });

    const { data: debtData, isLoading: debtLoading } = useQuery({
        queryKey: ['POSdebt-table'],
        queryFn: getPOSDebt,
    });

    const mutation = useMutation({
        mutationFn: addPOSPayment,
        onSuccess: () => {
            alert('تمت إضافة الدفعة.');
            queryClient.invalidateQueries({
                queryKey: ['POSdebt-table'],
            });
            setOpenUserId(null)
            setAmount(0)
        },
        onError: () => {
            alert('حدث خطأ أثناء الإرسال.');
        }
    });
    
    const endDebtMutation = useMutation({
        mutationFn: endPOSDebt,
        onSuccess: () => {
            alert('تم انهاء الدين.');
            queryClient.invalidateQueries({
                queryKey: ['POSdebt-table'],
            });
            setOpenUserId(null)
            setAmount(0)
        },
        onError: () => {
            alert('حدث خطأ أثناء الإرسال.');
        }
    });

    const posColumns = [
        { key: '_id', label: 'المعرف', sortable: true, hidden: true },
        { key: 'name', label: 'الاسم', sortable: true },
        { key: 'email', label: 'email', sortable: true },
        { key: 'password', label: 'كلمة السر', sortable: true },
        { key: 'role', label: 'الصلاحية', sortable: true },
        { key: 'balance', label: 'الرصيد', sortable: true },
        { key: 'number', label: 'الرقم', sortable: true },
    ];

    const debtColumns = [
        { key: '_id', label: 'المعرف', sortable: true, hidden: true },
        { key: 'destination', label: 'الوجهة', sortable: true },
        { key: 'name', label: 'الاسم', sortable: true },
        { key: 'number', label: 'الرقم', sortable: true },
        { key: 'operator', label: 'المنفذ', sortable: true },
        { key: 'amount', label: 'الكمية', sortable: true },
        { key: 'date', label: 'التاريخ', sortable: true },
        { key: 'status', label: 'الحالة', sortable: true },
    ];

    const totalDebt = useMemo(() => {
        return debtData?.reduce((sum, c) => sum + Number(c.amount), 0) ?? 0;
    }, [debtData]);

    const totalBalances = useMemo(() => {
        return posData?.reduce((sum, c) => sum + Number(c.balance), 0) ?? 0;
    }, [posData]);

    if (posLoading || debtLoading) {
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
            <div dir="rtl" className="">
                <DataTable
                    className="mb-4"
                    title="نقاط البيع"
                    description={totalBalances}
                    columns={posColumns}
                    data={posData}
                    renderRowActions={(row) => (
                        <PopupForm
                            title="اضافة دفعة لنقطة البيع"
                            trigger={<Button>اضافة دفعة</Button>}
                            isOpen={openUserId === row._id}
                            setIsOpen={(open) => setOpenUserId(open ? row._id : null)}
                        >
                            <div>
                                <form 

                                    className="gap-4 flex flex-col"
                                    onSubmit={(e)=>{
                                        e.preventDefault()
                                        mutation.mutate({id: openUserId, amount})
                                    }}
                                >

                                    <Input readOnly={true} value={row.name ? row.name  + '  //  ' + row.email : row.email} title="نقطة البيع"></Input>
                                    
                                    <Input value={amount} onChange={(e) => {setAmount(Number(e.target.value))}} type="number" title="قيمة الدفعة"></Input>

                                    <Button>{mutation.isPending ? 'جاري التاكيد ...' : 'تأكيد'}</Button>

                                </form>
                            </div>
                        </PopupForm>
                    )}
                />

                <DataTable
                    title="ديون نقاط البيع"
                    description={totalDebt}
                    columns={debtColumns}
                    data={debtData}
                    renderRowActions={(row) => {
                        return (
                            <Button
                                disabled={endDebtMutation.isPending}
                                onClick={()=>{
                                    window.confirm('هل انت متأكد من العملية ؟') &&
                                    endDebtMutation.mutate({
                                        id: row._id,
                                        email: row.email,
                                        amount: row.amount
                                    })
                                    
                                }}
                            >{endDebtMutation.isPending ? 'جاري الانهاء...' : 'انهاء الدين'}</Button>
                        )
                    }}
                />
            </div>
        </DashboardLayout>
    );
}
