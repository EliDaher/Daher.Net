import { DataTable } from '@/components/dashboard/DataTable';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import PopupForm from '@/components/ui/custom/PopupForm';
import { Input } from '@/components/ui/input';
import getPendingInvoices, { confirmInvoice, rejectInvoice } from '@/services/invoices';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { io, Socket } from "socket.io-client";

export default function PendingTransactions() {
  const [isOpen, setIsOpen] = useState(false);
  const [formTitle] = useState('سبب الغاء العملية');
  const [reason, setReason] = useState('');
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("https://paynet-cdji.onrender.com");
    setSocket(newSocket);

    newSocket.on("pendingPaymentsUpdate", (updatedPayments) => {
      queryClient.setQueryData(['pending-table'], updatedPayments);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [queryClient]);

  const { data: pendingData, isLoading: pendingLoading } = useQuery({
    queryKey: ['pending-table'],
    queryFn: getPendingInvoices,
  });

  const confirmMutation = useMutation({
    mutationFn: (invoiceId: string) => confirmInvoice(invoiceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-table'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (data: { payment: object; reason: string }) => rejectInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pending-table'] });
    },
  });

  const invoicesColumns = [
    { key: '_id', label: 'المعرف', sortable: true, hidden: true },
    { key: 'landline', label: 'الرقم', sortable: true },
    { key: 'company', label: 'الشركة', sortable: true },
    { key: 'speed', label: 'السرعة', sortable: true },
    { key: 'email', label: 'الحساب المرسل', sortable: true },
    { key: 'amount', label: 'المبلغ الواجب دفعه', sortable: true },
    { key: 'status', label: 'حالة العملية', sortable: true },
    { key: 'createdAt', label: 'الوقت', sortable: true },
  ];

  if (pendingLoading) {
    return (
      <DashboardLayout>
        <div dir="rtl" className="space-y-6 text-center text-lg font-semibold">
          جارِ تحميل البيانات...
        </div>
      </DashboardLayout>
    );
  }

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);
  
  const prevDataRef = useRef<any[]>([]);

  useEffect(() => {
    if (pendingData && pendingData.length > 0) {
      const prevData = prevDataRef.current;

      // استخراج الطلبات الجديدة فقط
      const newItems = pendingData.filter(
        (item) => !prevData.some((prev) => prev._id === item._id)
      );

      if (newItems.length > 0) {
        // إرسال إشعار بأول عنصر جديد كمثال
        new Notification("طلب دفع جديد", {
          body: `المبلغ: ${newItems[0].amount} - الشركة: ${newItems[0].company}`,
          icon: "/logo.png"
        });

        const audio = new Audio("/notification.mp3");
        audio.play();
      }

      // تحديث النسخة السابقة
      prevDataRef.current = pendingData;
    }
  }, [pendingData]);

  

  return (
    <DashboardLayout>
      {/* نافذة إدخال سبب الرفض */}
      <PopupForm isOpen={isOpen} setIsOpen={setIsOpen} title={formTitle} trigger={<></>}>
        <div className="flex flex-row-reverse gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedRow) {
                deleteMutation.mutate({
                  payment: {
                    id: selectedRow._id,
                    email: selectedRow.email,
                    amount: selectedRow.amount,
                  },
                  reason: reason,
                });
                setIsOpen(false);
                setReason('');
              }
            }}
            className="space-y-4 w-full"
          >
            <Input
              dir="rtl"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              type="text"
              placeholder="سبب الرفض (مثال: لا يوجد رصيد)"
              required
            />
            <Button type="submit">تأكيد الرفض</Button>
          </form>
        </div>
      </PopupForm>

      {/* جدول الفواتير */}
      <div dir="rtl" className="space-y-6">
        <DataTable
          title="تسديدات معلقة"
          description=""
          columns={invoicesColumns}
          data={pendingData || []}
          renderRowActions={(row) => (
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                onClick={() => { window.confirm('هل انت متأكد من انهاء العملية') ? confirmMutation.mutate(row._id) : null }}
                disabled={confirmMutation.isPending}
              >
                {confirmMutation.isPending ? '...' : 'تأكيد'}
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setSelectedRow(row);
                  setIsOpen(true);
                }}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? '...' : 'رفض'}
              </Button>
            </div>
          )}
        />
      </div>
    </DashboardLayout>
  );
}
