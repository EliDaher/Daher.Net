import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

  const handleConfirm = (row: PendingTransaction) => {
    if (!window.confirm("هل انت متأكد من انهاء العملية")) {
      return;
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
  };

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

      <div dir="rtl" className="space-y-6">
        <DataTable
          amountBold
          title="تسديدات معلقة"
          description=""
          totalPend
          columns={invoicesColumns}
          data={pendingData}
          isLoading={pendingLoading}
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
      </div>
    </DashboardLayout>
  );
}
