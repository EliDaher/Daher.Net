import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2 } from "lucide-react";
import SendToPay from "@/components/companies/SendToPay";
import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import PopupForm from "@/components/ui/custom/PopupForm";
import { Input } from "@/components/ui/input";
import { useCompaniesContext } from "@/contexts/CompaniesProvider";
import { getStoredUser } from "@/lib/auth";
import { usePendingPaymentsRealtime } from "@/hooks/usePendingPaymentsRealtime";
import decreaseBalance from "@/services/companies";
import getPendingInvoices, {
  confirmInvoice,
  rejectInvoice,
  startPayment,
} from "@/services/invoices";
import { createPosProfitLog } from "@/services/profitLogs";
import {
  createReportedTransaction,
  deleteReportedTransaction,
  getReportedTransactions,
  type ReportedTransaction,
} from "@/services/reportedTransactions";

interface PendingTransaction {
  _id: string;
  amount: number;
  company: string;
  email: string;
  landline?: string;
  number?: string;
  speed?: string;
  status: string;
  createdAt: string;
  extra?: {
    playerId?: string;
  };
}

interface RejectInvoicePayload {
  payment: {
    id: string;
    email: string;
    amount: number;
  };
  reason: string;
}

interface DecreaseBalancePayload {
  amount: number;
  reason: string;
  company: string;
  number: string;
  companyId: string;
  port: string;
}

interface ConfirmInvoiceMutationPayload {
  id: string;
  row: PendingTransaction;
}

const REJECTION_FORM_TITLE = "سبب الغاء العملية";
const REPORTED_FORM_TITLE = "تسجيل عملية مبلغ عنها";
const STARTED_TRANSACTION_FORM_TITLE = "تفاصيل العملية";

function getPendingTransactionNumber(row: PendingTransaction) {
  return row.extra?.playerId || row.landline || row.number || "";
}

function normalizeNumberForReportedMatch(number?: string) {
  const trimmed = String(number || "").trim();

  if (trimmed.startsWith("013") || trimmed.startsWith("033")) {
    return trimmed.slice(3);
  }

  if (trimmed.startsWith("13") || trimmed.startsWith("33")) {
    return trimmed.slice(2);
  }

  return trimmed;
}

function buildReportedMatchKey(number?: string, company?: string) {
  return `${String(number || "").trim()}::${String(company || "")
    .trim()
    .toLowerCase()}`;
}

function normalizeLandlineForClipboard(number?: string) {
  if (!number) {
    return "";
  }

  if (number.startsWith("033") || number.startsWith("013")) {
    return number.slice(3);
  }

  if (number.startsWith("33") || number.startsWith("13")) {
    return number.slice(2);
  }

  return number;
}

export default function PendingTransactions() {
  const { data: companies = [] } = useCompaniesContext();
  const currentUser = getStoredUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [selectedRow, setSelectedRow] = useState<PendingTransaction | null>(null);
  const [sendToPayOpen, setSendToPayOpen] = useState(false);
  const [reportedDialogOpen, setReportedDialogOpen] = useState(false);
  const [reportedNumber, setReportedNumber] = useState("");
  const [reportedCompany, setReportedCompany] = useState("");
  const [reportedNote, setReportedNote] = useState("");
  const [startedTransactionOpen, setStartedTransactionOpen] = useState(false);
  const [startedTransaction, setStartedTransaction] =
    useState<PendingTransaction | null>(null);
  const [startedRejectReason, setStartedRejectReason] = useState("");
  const [showStartedRejectForm, setShowStartedRejectForm] = useState(false);

  usePendingPaymentsRealtime();

  const {
    data: pendingData = [],
    isLoading: pendingLoading,
    isError,
    error,
  } = useQuery<PendingTransaction[]>({
    queryKey: ["pending-table"],
    queryFn: getPendingInvoices,
  });

  const {
    data: reportedTransactions = [],
    isLoading: reportedLoading,
  } = useQuery<ReportedTransaction[]>({
    queryKey: ["reported-transactions"],
    queryFn: getReportedTransactions,
  });

  useEffect(() => {
    if (isError && error instanceof Error && error.message === "No token found") {
      navigate("/login");
    }
  }, [error, isError, navigate]);

  const confirmMutation = useMutation({
    mutationFn: ({ id }: ConfirmInvoiceMutationPayload) => confirmInvoice(id),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({ queryKey: ["pending-table"] });

      const row = variables.row;

      void createPosProfitLog({
        invoiceId: row._id,
        amount: Number(row.amount || 0),
        company: row.company,
        email: row.email,
        number: row.landline || row.number || "",
        operator: currentUser?.username || "",
        source: "pending_transactions",
        operationState: "تم التسديد",
      }).catch((error) => {
        console.error("POS profit log failed:", error);
      });
    },
  });

  const decreaseBalanceMutation = useMutation({
    mutationFn: (payload: DecreaseBalancePayload) => decreaseBalance(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pending-table"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (payload: RejectInvoicePayload) => rejectInvoice(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pending-table"] });
    },
  });

  const startMutation = useMutation({
    mutationFn: startPayment,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pending-table"] });
    },
  });

  const createReportedMutation = useMutation({
    mutationFn: createReportedTransaction,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["reported-transactions"] });
      setReportedDialogOpen(false);
      setReportedNumber("");
      setReportedCompany("");
      setReportedNote("");
    },
  });

  const deleteReportedMutation = useMutation({
    mutationFn: deleteReportedTransaction,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["reported-transactions"] });
    },
  });

  const companyIdByName = useMemo(
    () =>
      new Map(
        companies.map((company: any) => [company.name, company.id] as const),
      ),
    [companies],
  );

  const invoicesColumns = useMemo(
    () => [
      { key: "_id", label: "المعرف", sortable: true, hidden: true },
      {
        key: "landline",
        label: "الرقم / ID",
        accessor: (row: PendingTransaction) => row.extra?.playerId || row.landline,
      },
      { key: "company", label: "الشركة", sortable: true },
      { key: "speed", label: "السرعة", sortable: true },
      { key: "email", label: "الحساب المرسل", sortable: true },
      { key: "amount", label: "المبلغ الواجب دفعه", sortable: true },
      { key: "status", label: "حالة العملية", sortable: true },
      { key: "createdAt", label: "الوقت", sortable: true },
    ],
    [],
  );

  const reportedColumns = useMemo(
    () => [
      { key: "number", label: "الرقم", sortable: true },
      { key: "company", label: "الشركة", sortable: true },
      { key: "note", label: "ملاحظة" },
      { key: "createdBy", label: "المستخدم", sortable: true },
      { key: "createdAt", label: "الوقت", sortable: true },
    ],
    [],
  );

  const reportedMatchKeys = useMemo(
    () =>
      new Set(
        reportedTransactions.map((transaction) =>
          buildReportedMatchKey(
            normalizeNumberForReportedMatch(transaction.number),
            transaction.company,
          ),
        ),
      ),
    [reportedTransactions],
  );

  const getPendingRowClassName = (row: PendingTransaction) => {
    const key = buildReportedMatchKey(
      normalizeNumberForReportedMatch(getPendingTransactionNumber(row)),
      row.company,
    );

    return reportedMatchKeys.has(key)
      ? "bg-yellow-200 text-yellow-900 hover:bg-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-100 dark:hover:bg-yellow-800/60"
      : "";
  };

  const resetStartedTransactionPopup = () => {
    setStartedTransactionOpen(false);
    setStartedTransaction(null);
    setStartedRejectReason("");
    setShowStartedRejectForm(false);
  };

  const handleStartedTransactionOpenChange = (open: boolean) => {
    setStartedTransactionOpen(open);

    if (!open) {
      setStartedTransaction(null);
      setStartedRejectReason("");
      setShowStartedRejectForm(false);
    }
  };

  const handleConfirm = (row: PendingTransaction) => {
    if (!window.confirm("هل انت متأكد من انهاء العملية")) {
      return false;
    }

    confirmMutation.mutate({ id: row._id, row });
    decreaseBalanceMutation.mutate({
      amount: row.amount,
      reason: "",
      company: row.company,
      number: row.landline || row.number || "",
      companyId: companyIdByName.get(row.company) || "",
      port: currentUser?.username || "",
    });

    return true;
  };

  const handleStartedTransactionConfirm = () => {
    if (!startedTransaction) {
      return;
    }

    if (handleConfirm(startedTransaction)) {
      resetStartedTransactionPopup();
    }
  };

  const handleRejectSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedRow) {
      return;
    }

    rejectMutation.mutate({
      payment: {
        id: selectedRow._id,
        email: selectedRow.email,
        amount: selectedRow.amount,
      },
      reason: rejectionReason,
    });

    setIsRejectDialogOpen(false);
    setRejectionReason("");
    setSelectedRow(null);
  };

  const handleStartExecution = (row: PendingTransaction) => {
    const textToCopy = normalizeLandlineForClipboard(row.landline);

    if (textToCopy) {
      void navigator.clipboard.writeText(textToCopy).catch(() => undefined);
    }

    startMutation.mutate(row._id);
    setStartedTransaction(row);
    setStartedRejectReason("");
    setShowStartedRejectForm(false);
    setStartedTransactionOpen(true);
  };

  const handleReportedSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createReportedMutation.mutate({
      number: reportedNumber,
      company: reportedCompany,
      note: reportedNote,
      createdBy: currentUser?.username || "",
    });
  };

  const handleStartedRejectSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!startedTransaction) {
      return;
    }

    rejectMutation.mutate({
      payment: {
        id: startedTransaction._id,
        email: startedTransaction.email,
        amount: startedTransaction.amount,
      },
      reason: startedRejectReason,
    });

    resetStartedTransactionPopup();
  };

  const startedTransactionDetails = startedTransaction
    ? [
        {
          label: "الرقم / ID",
          value: getPendingTransactionNumber(startedTransaction) || "-",
        },
        { label: "الشركة", value: startedTransaction.company || "-" },
        { label: "السرعة", value: startedTransaction.speed || "-" },
        {
          label: "الحساب المرسل",
          value: startedTransaction.email || "-",
        },
        { label: "المبلغ", value: startedTransaction.amount || "-" },
        { label: "الحالة", value: startedTransaction.status || "-" },
        {
          label: "الوقت",
          value: startedTransaction.createdAt
            ? new Date(startedTransaction.createdAt).toLocaleString("en-GB")
            : "-",
        },
      ]
    : [];

  return (
    <DashboardLayout>
      <SendToPay isOpen={sendToPayOpen} setIsOpen={setSendToPayOpen} />

      <PopupForm
        isOpen={isRejectDialogOpen}
        setIsOpen={setIsRejectDialogOpen}
        title={REJECTION_FORM_TITLE}
        trigger={<></>}
      >
        <div className="flex flex-row-reverse gap-2">
          <form onSubmit={handleRejectSubmit} className="w-full space-y-4">
            <Input
              dir="rtl"
              value={rejectionReason}
              onChange={(event) => setRejectionReason(event.target.value)}
              type="text"
              placeholder="سبب الرفض (مثال: لا يوجد رصيد)"
              required
            />
            <Button type="submit">تأكيد الرفض</Button>
          </form>
        </div>
      </PopupForm>

      <PopupForm
        isOpen={startedTransactionOpen}
        setIsOpen={handleStartedTransactionOpenChange}
        title={STARTED_TRANSACTION_FORM_TITLE}
        trigger={<></>}
      >
        {startedTransaction && (
          <div className="space-y-5" dir="rtl">
            <div className="grid gap-3 rounded-md border bg-muted/20 p-4 sm:grid-cols-2">
              {startedTransactionDetails.map((detail) => (
                <div key={detail.label} className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {detail.label}
                  </p>
                  <p className="break-words text-sm font-semibold">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            {showStartedRejectForm && (
              <form onSubmit={handleStartedRejectSubmit} className="space-y-3">
                <Input
                  value={startedRejectReason}
                  onChange={(event) =>
                    setStartedRejectReason(event.target.value)
                  }
                  type="text"
                  placeholder="سبب الرفض (مثال: لا يوجد رصيد)"
                  required
                />
                <Button
                  type="submit"
                  variant="destructive"
                  className="w-full"
                  disabled={rejectMutation.isPending}
                >
                  {rejectMutation.isPending ? "..." : "تأكيد الرفض"}
                </Button>
              </form>
            )}

            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={resetStartedTransactionPopup}
              >
                إخفاء
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowStartedRejectForm(true)}
                disabled={rejectMutation.isPending}
              >
                رفض
              </Button>
              <Button
                type="button"
                onClick={handleStartedTransactionConfirm}
                disabled={
                  confirmMutation.isPending || decreaseBalanceMutation.isPending
                }
              >
                {confirmMutation.isPending || decreaseBalanceMutation.isPending
                  ? "..."
                  : "تأكيد"}
              </Button>
            </div>
          </div>
        )}
      </PopupForm>

      <PopupForm
        isOpen={reportedDialogOpen}
        setIsOpen={setReportedDialogOpen}
        title={REPORTED_FORM_TITLE}
        trigger={<></>}
      >
        <form onSubmit={handleReportedSubmit} className="space-y-4" dir="rtl">
          <div className="space-y-2">
            <label className="block text-sm font-medium">الرقم</label>
            <Input
              value={reportedNumber}
              onChange={(event) => setReportedNumber(event.target.value)}
              type="text"
              placeholder="أدخل الرقم"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">الشركة</label>
            <select
              value={reportedCompany}
              onChange={(event) => setReportedCompany(event.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              required
            >
              <option value="">اختر الشركة</option>
              {companies.map((company: any) => (
                <option key={company.id || company.name} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">ملاحظة</label>
            <Input
              value={reportedNote}
              onChange={(event) => setReportedNote(event.target.value)}
              type="text"
              placeholder="أدخل ملاحظة اختيارية"
            />
          </div>

          {createReportedMutation.isError && (
            <p className="text-sm text-destructive">
              {createReportedMutation.error instanceof Error
                ? createReportedMutation.error.message
                : "فشل تسجيل العملية"}
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={createReportedMutation.isPending}
          >
            {createReportedMutation.isPending ? "..." : "حفظ"}
          </Button>
        </form>
      </PopupForm>

      <div dir="rtl" className="space-y-6">
        <div className="flex justify-end">
          <Button onClick={() => setReportedDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            إضافة عملية مبلغ عنها
          </Button>
        </div>

        <DataTable
          amountBold
          title="تسديدات معلقة"
          description=""
          totalPend
          columns={invoicesColumns}
          data={pendingData}
          isLoading={pendingLoading}
          getRowClassName={getPendingRowClassName}
          renderRowActions={(row: PendingTransaction) =>
            row.status !== "جاري التسديد" ? (
              <div className="flex gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => handleConfirm(row)}
                  disabled={
                    confirmMutation.isPending || decreaseBalanceMutation.isPending
                  }
                >
                  {confirmMutation.isPending || decreaseBalanceMutation.isPending
                    ? "..."
                    : "تأكيد"}
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    setSelectedRow(row);
                    setIsRejectDialogOpen(true);
                  }}
                  disabled={rejectMutation.isPending}
                >
                  {rejectMutation.isPending ? "..." : "رفض"}
                </Button>
              </div>
            ) : (
              <Button
                variant="default"
                disabled={startMutation.isPending}
                onClick={() => handleStartExecution(row)}
              >
                {startMutation.isPending ? "..." : "بدء التنفيذ"}
              </Button>
            )
          }
        />

        <DataTable
          title="العمليات المبلغ عنها"
          description=""
          columns={reportedColumns}
          data={reportedTransactions}
          isLoading={reportedLoading}
          renderRowActions={(row: ReportedTransaction) => (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteReportedMutation.mutate(row.id)}
              disabled={deleteReportedMutation.isPending}
            >
              <Trash2 className="h-4 w-4" />
              {deleteReportedMutation.isPending ? "..." : "حذف"}
            </Button>
          )}
        />
      </div>
    </DashboardLayout>
  );
}
