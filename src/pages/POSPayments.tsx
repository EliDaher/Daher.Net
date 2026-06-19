import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import PopupForm from "@/components/ui/custom/PopupForm";
import {
  confirmPayment,
  deletePayment,
  getPayments,
  type PosPayment,
} from "@/services/invoices";

const PAYMENT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function PosPaymentsLoader({
  title = "جاري تحميل دفعات نقاط البيع",
  description = "يتم جلب أحدث الدفعات من الخادم...",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div
      dir="rtl"
      className="flex min-h-[420px] items-center justify-center rounded-md border bg-card p-6 text-center shadow-sm"
    >
      <div className="flex max-w-sm flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div className="absolute inset-1 rounded-full border border-primary/10" />
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="grid w-full gap-2">
          <div className="h-2 rounded-full bg-muted">
            <div className="h-full w-2/3 animate-pulse rounded-full bg-primary/40" />
          </div>
          <div className="mx-auto h-2 w-3/4 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function POSPayments() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<PosPayment | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const queryClient = useQueryClient();

  const {
    data: paymentData,
    isLoading: paymentLoading,
    isFetching: paymentFetching,
    isError: paymentError,
  } = useQuery({
    queryKey: ["payment-table", page, limit],
    queryFn: () => getPayments({ page, limit }),
    placeholderData: (previousData) => previousData,
  });

  const confirmMutation = useMutation({
    mutationFn: ({ id, email, amount }: { id: string; email: string; amount: number }) =>
      confirmPayment(id, email, amount),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["payment-table"] });
      toast.success("تم تأكيد الدفعة بنجاح.");
      setIsOpen(false);
      setSelectedRow(null);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء تأكيد الدفعة.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePayment(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["payment-table"] });
      toast.success("تم حذف الدفعة بنجاح.");
    },
    onError: () => {
      toast.error("حدث خطأ أثناء حذف الدفعة.");
    },
  });

  const payments = paymentData?.data ?? [];
  const totalPayments = paymentData?.total ?? 0;
  const showInitialLoader = paymentLoading && !paymentData;
  const showTableLoader = paymentFetching && Boolean(paymentData);

  const invoicesColumns = [
    { key: "_id", label: "المعرف", hidden: true },
    { key: "destination", label: "الوجهة" },
    { key: "name", label: "الاسم" },
    { key: "number", label: "الرقم" },
    { key: "operator", label: "العملية" },
    { key: "amount", label: "المبلغ" },
    { key: "noticeNumber", label: "ملاحظة" },
    { key: "date", label: "التاريخ" },
    { key: "isConfirmed", label: "الحالة" },
    { key: "createdAt", label: "تاريخ العملية" },
  ];

  const handlePageSizeChange = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  const handleConfirmPayment = () => {
    if (!selectedRow?._id) {
      return;
    }

    confirmMutation.mutate({
      id: selectedRow._id,
      email: String(selectedRow.name ?? ""),
      amount: Number(selectedRow.amount ?? 0),
    });
  };

  return (
    <DashboardLayout>
      <PopupForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="تأكيد الدفعة"
        trigger={<></>}
      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleConfirmPayment();
          }}
          className="w-full space-y-4"
        >
          {selectedRow && (
            <p className="text-right">
              هل تريد تأكيد الدفعة بقيمة {selectedRow.amount} للمستخدم{" "}
              <strong className="text-lg">{selectedRow.name}</strong>
            </p>
          )}
          <Button disabled={confirmMutation.isPending || !selectedRow} type="submit">
            {confirmMutation.isPending ? "جاري التأكيد..." : "تأكيد الدفعة"}
          </Button>
        </form>
      </PopupForm>

      <div dir="rtl" className="space-y-6">
        {paymentError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            حدث خطأ أثناء تحميل دفعات نقاط البيع.
          </div>
        )}

        {showInitialLoader ? (
          <PosPaymentsLoader />
        ) : (
          <div className="relative">
            {showTableLoader && (
              <div className="absolute inset-0 z-10 flex items-start justify-center rounded-md bg-background/70 p-6 backdrop-blur-[2px]">
                <div className="mt-20 flex items-center gap-3 rounded-md border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-lg">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span>جاري تحديث الدفعات...</span>
                </div>
              </div>
            )}

            <div className={showTableLoader ? "pointer-events-none" : undefined}>
              <DataTable
                title="دفعات نقاط البيع"
                description={`إجمالي الدفعات: ${totalPayments}`}
                columns={invoicesColumns}
                data={payments}
                searchable={false}
                defaultPageSize={limit}
                pageSizeOptions={PAYMENT_PAGE_SIZE_OPTIONS}
                isLoading={paymentLoading}
                serverPagination={{
                  page: paymentData?.page ?? page,
                  pageSize: paymentData?.limit ?? limit,
                  total: totalPayments,
                  onPageChange: setPage,
                  onPageSizeChange: handlePageSizeChange,
                }}
                renderRowActions={(row: PosPayment) => (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      disabled={confirmMutation.isPending || Boolean(row.isConfirmed)}
                      variant={row.isConfirmed ? "default" : "secondary"}
                      className="capitalize"
                      onClick={() => {
                        setSelectedRow(row);
                        setIsOpen(true);
                      }}
                    >
                      {row.isConfirmed ? "تم التأكيد" : "بحاجة إلى تأكيد"}
                    </Button>
                    <Button
                      className="capitalize"
                      variant="destructive"
                      disabled={deleteMutation.isPending || !row._id}
                      onClick={() => {
                        if (window.confirm("هل أنت متأكد من حذف هذه الدفعة؟")) {
                          deleteMutation.mutate(row._id);
                        }
                      }}
                    >
                      {deleteMutation.isPending ? "جاري الحذف..." : "حذف الدفعة"}
                    </Button>
                  </div>
                )}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
