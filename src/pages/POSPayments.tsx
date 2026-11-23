import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PopupForm from "@/components/ui/custom/PopupForm";
import {
  confirmPayment,
  deletePayment,
  getPayments,
  type PosPayment,
} from "@/services/invoices";

const PAYMENT_PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const EMPTY_FILTERS = { search: "", status: "", from: "", to: "" };

async function getAllPayments(signal: AbortSignal) {
  const firstPage = await getPayments({ page: 1, limit: 100 }, signal);
  const payments = new Map(firstPage.data.map((payment) => [payment._id, payment]));

  for (let page = 2; page <= firstPage.totalPages; page++) {
    const result = await getPayments({ page, limit: firstPage.limit }, signal);
    for (const payment of result.data) {
      payments.set(payment._id, payment);
    }
  }

  return Array.from(payments.values());
}

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
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [search, setSearch] = useState("");
  const normalizedSearch = filters.search.trim().toLowerCase();
  const invalidDates = Boolean(filters.from && filters.to && filters.from > filters.to);
  const filtered = Boolean(normalizedSearch || filters.status || filters.from || filters.to);
  const searchPending = normalizedSearch !== search;

  useEffect(() => {
    if (!searchPending) return;

    const timeout = window.setTimeout(() => setSearch(normalizedSearch), 300);
    return () => window.clearTimeout(timeout);
  }, [normalizedSearch, searchPending]);

  const updateFilter = (key: keyof typeof EMPTY_FILTERS, value: string) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
    setPage(1);
  };

  const queryClient = useQueryClient();

  const paginatedQuery = useQuery({
    queryKey: ["payment-table", page, limit],
    queryFn: ({ signal }) => getPayments({ page, limit }, signal),
    placeholderData: (previousData) => previousData,
    enabled: !filtered,
  });
  const filteredQuery = useQuery({
    queryKey: ["payment-table", "all"],
    queryFn: ({ signal }) => getAllPayments(signal),
    enabled: filtered && !invalidDates && !searchPending,
  });
  const activeQuery = filtered ? filteredQuery : paginatedQuery;
  const isWaiting = !invalidDates && (activeQuery.isLoading || (filtered && searchPending));
  const paymentError = !invalidDates && !isWaiting && activeQuery.isError;

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

  const matchingPayments = filtered && !isWaiting && !invalidDates && !paymentError
    ? (filteredQuery.data ?? []).filter((payment) => {
        const matchesSearch = !search || [payment.name, payment.number, payment.noticeNumber]
          .some((value) => String(value ?? "").toLowerCase().includes(search));
        const matchesStatus = !filters.status ||
          Boolean(payment.isConfirmed) === (filters.status === "confirmed");
        const date = String(payment.date ?? "").match(/^\d{4}-\d{2}-\d{2}/)?.[0];
        const matchesDate = (!filters.from && !filters.to) || Boolean(date &&
          (!filters.from || date >= filters.from) && (!filters.to || date <= filters.to));
        return matchesSearch && matchesStatus && matchesDate;
      })
    : [];
  const paymentData = paginatedQuery.data;
  const totalPayments = filtered ? matchingPayments.length : paymentData?.total ?? 0;
  const pageSize = filtered ? limit : paymentData?.limit ?? limit;
  const lastPage = Math.max(1, Math.ceil(totalPayments / pageSize));
  const currentPage = Math.min(page, lastPage);

  useEffect(() => {
    if (!activeQuery.isFetching && !isWaiting && !invalidDates && !paymentError && page > lastPage) {
      setPage(lastPage);
    }
  }, [activeQuery.isFetching, invalidDates, isWaiting, lastPage, page, paymentError]);

  const payments = filtered
    ? matchingPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : paymentData?.data ?? [];
  const showInitialLoader = isWaiting;
  const showTableLoader = !invalidDates && activeQuery.isFetching && !showInitialLoader;

  const invoicesColumns = [
    { key: "_id", label: "المعرف", hidden: true },
    { key: "destination", label: "الوجهة", sortable: true },
    { key: "name", label: "الاسم", sortable: true },
    { key: "number", label: "الرقم", sortable: true },
    { key: "operator", label: "العملية", sortable: true },
    { key: "amount", label: "المبلغ", sortable: true },
    { key: "noticeNumber", label: "ملاحظة", sortable: true },
    { key: "date", label: "التاريخ", sortable: true },
    { key: "isConfirmed", label: "الحالة", sortable: true },
    { key: "createdAt", label: "تاريخ العملية", sortable: true },
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
        <div className="grid items-end gap-3 rounded-md border bg-card p-4 sm:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_auto]">
          <label className="space-y-1 text-sm font-medium">
            <span>البحث</span>
            <Input type="search" value={filters.search} placeholder="الاسم أو الرقم أو رقم الإشعار"
              onChange={(event) => updateFilter("search", event.target.value)} />
          </label>
          <label className="space-y-1 text-sm font-medium">
            <span>الحالة</span>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3"
              value={filters.status} onChange={(event) => updateFilter("status", event.target.value)}>
              <option value="">الكل</option>
              <option value="confirmed">تم التأكيد</option>
              <option value="pending">بحاجة إلى تأكيد</option>
            </select>
          </label>
          <label className="space-y-1 text-sm font-medium">
            <span>من تاريخ</span>
            <Input type="date" value={filters.from}
              onChange={(event) => updateFilter("from", event.target.value)} />
          </label>
          <label className="space-y-1 text-sm font-medium">
            <span>إلى تاريخ</span>
            <Input type="date" value={filters.to}
              onChange={(event) => updateFilter("to", event.target.value)} />
          </label>
          <Button variant="outline" onClick={() => {
            setFilters(EMPTY_FILTERS);
            setSearch("");
            setPage(1);
          }}>
            مسح الفلاتر
          </Button>
        </div>
        {invalidDates && (
          <p role="alert" className="text-sm text-destructive">
            يجب أن يكون تاريخ النهاية في يوم البداية أو بعده.
          </p>
        )}
        {paymentError && (
          <div role="alert" className="flex flex-wrap items-center gap-3 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            حدث خطأ أثناء تحميل دفعات نقاط البيع.
            <Button variant="outline" onClick={() => void activeQuery.refetch()}>
              إعادة المحاولة
            </Button>
          </div>
        )}

        {showInitialLoader ? (
          <PosPaymentsLoader />
        ) : !invalidDates && !paymentError && (
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
                description={filtered
                  ? `النتائج المطابقة: ${totalPayments}`
                  : `إجمالي الدفعات: ${totalPayments}`}
                columns={invoicesColumns}
                data={payments}
                searchable={false}
                emptyMessage={filtered ? "لا توجد دفعات مطابقة." : "لا توجد دفعات."}
                defaultPageSize={limit}
                pageSizeOptions={PAYMENT_PAGE_SIZE_OPTIONS}
                isLoading={isWaiting}
                serverPagination={{
                  page: filtered ? currentPage : paymentData?.page ?? page,
                  pageSize,
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
