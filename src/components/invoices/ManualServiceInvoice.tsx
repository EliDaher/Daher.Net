import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  addBillInvoice, getBillTransactionInvoiceGroup,
  BILL_TRANSACTION_INVOICE_GROUP_LABELS,
  type BillTransactionCategory,
} from "@/services/balance";

const serviceLabels: Record<BillTransactionCategory, string> = {
  elecTotal: "الكهرباء", phoneTotal: "الهاتف", waterTotal: "المياه",
};
const emptyForm = {
  customerName: "", customerNumber: "", customerDetails: "",
  invoiceNumber: "", invoiceValue: "",
};
const fields = [
  ["customerName", "اسم العميل"],
  ["customerNumber", "رقم الاشتراك أو الهاتف"],
  ["customerDetails", "التفاصيل"],
  ["invoiceNumber", "رقم الفاتورة (اختياري)"],
  ["invoiceValue", "المبلغ"],
] as const;

export function ManualServiceInvoice({ category }: { category: BillTransactionCategory }) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [employee, setEmployee] = useState("");
  const [confirming, setConfirming] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);

  const changeOpen = (next: boolean) => {
    if (submitting.current) return;
    setOpen(next);
    setForm(emptyForm);
    setConfirming(false);
    setError("");
  };

  const review = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = Object.fromEntries(
      Object.entries(form).map(([key, value]) => [key, value.trim()]),
    ) as typeof form;
    if (!trimmed.customerName || !trimmed.customerNumber || !trimmed.customerDetails ||
        !Number.isFinite(Number(trimmed.invoiceValue)) || Number(trimmed.invoiceValue) <= 0) {
      setError("يرجى تعبئة الحقول المطلوبة وإدخال مبلغ موجب.");
      return;
    }
    let username = "";
    try {
      const user = JSON.parse(localStorage.getItem("DaherUser") || "{}");
      username = typeof user?.username === "string" ? user.username.trim() : "";
    } catch { /* Missing or invalid session is handled below. */ }
    if (!username) {
      setError("تعذر تحديد الموظف الحالي. يرجى تسجيل الدخول مجدداً.");
      return;
    }
    setEmployee(username);
    setForm(trimmed);
    setError("");
    setConfirming(true);
  };

  const send = async () => {
    if (submitting.current || !confirming) return;
    submitting.current = true;
    setSaving(true);
    setError("");
    try {
      const amount = Number(form.invoiceValue);
      const result = await addBillInvoice({
        employee, amount,
        details: [{ ...form, invoiceValue: amount, category }],
        categoryTotals: {
          internetTotal: 0, elecTotal: 0, phoneTotal: 0, waterTotal: 0, otherTotal: 0,
          [category]: amount,
        },
      });
      if (!result?.success) throw new Error(result?.message || "تعذر حفظ الفاتورة.");
      setOpen(false);
      setForm(emptyForm);
      setConfirming(false);
      toast.success("تم إرسال الفاتورة للمراجعة بنجاح.");
      const keys = [
        "electricity-transactions", "phone-transactions", "water-transactions",
        "dailyBalance-table", "todayBalance-table", "bill-category-totals",
        "monthBalance-table", "employees-operations", "invoice-recent-balance-operations",
      ];
      keys.forEach((key) => { void queryClient.invalidateQueries({ queryKey: [key] }); });
    } catch (err) {
      const failure = err as { response?: { data?: { message?: string } }; message?: string };
      setError(failure.response?.data?.message || failure.message || "تعذر إرسال الفاتورة. يرجى المحاولة مجدداً.");
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <Button type="button"><Send />إرسال يدوي</Button>
      </DialogTrigger>
      <DialogContent dir="rtl" className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto">
        <DialogHeader className="text-right sm:text-right">
          <DialogTitle>{confirming ? "تأكيد الفاتورة" : "إرسال فاتورة يدوياً"} — {serviceLabels[category]}</DialogTitle>
        </DialogHeader>
        {confirming ? (
          <div className="space-y-4">
            <dl className="space-y-3 rounded-md border p-4">
              {fields.map(([key, label]) => (
                <div key={key} className="grid grid-cols-2 gap-3">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="break-words">{key === "invoiceValue" ? Number(form[key]).toLocaleString("en-EG") : form[key] || "—"}</dd>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3"><dt>الموظف</dt><dd className="break-words">{employee}</dd></div>
              <div className="grid grid-cols-2 gap-3"><dt>مجموعة الفاتورة</dt><dd>{BILL_TRANSACTION_INVOICE_GROUP_LABELS[getBillTransactionInvoiceGroup(form)]}</dd></div>
            </dl>
            <div className="flex flex-wrap gap-2">
              <Button type="button" loading={saving} onClick={() => void send()}>تأكيد وإرسال</Button>
              <Button type="button" variant="outline" disabled={saving} onClick={() => { setConfirming(false); setError(""); }}>رجوع للتعديل</Button>
            </div>
          </div>
        ) : (
          <form onSubmit={review} className="space-y-4">
            {fields.map(([key, label]) => (
              <label key={key} className="block space-y-2">
                <span className="text-sm font-medium">{label}</span>
                <Input
                  value={form[key]} required={key !== "invoiceNumber"}
                  type={key === "invoiceValue" ? "number" : "text"}
                  step={key === "invoiceValue" ? "any" : undefined}
                  min={key === "invoiceValue" ? "0" : undefined}
                  onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                />
              </label>
            ))}
            <Button type="submit" className="w-full">مراجعة البيانات</Button>
          </form>
        )}
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
