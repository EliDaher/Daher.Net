import React, { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Plus, Printer, Save, Trash2, X } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { addBillInvoice, type BillCategoryTotals } from "@/services/balance";
import billManualRowShortcuts from "@/data/billManualRowShortcuts.json";

type CategoryKey = keyof BillCategoryTotals;
type ManualCategoryValue = CategoryKey | "";
type SaveMode = "save" | "print";

type ConfirmInvFormProps = {
  clearAllTables: () => void;
  TotalInvoices: number;
  setTotalInvoices: (value: number) => void;
  finalTable: InvoiceRow[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  categoryTotals: BillCategoryTotals;
};

type InvoiceRow = {
  id?: string;
  category?: CategoryKey;
  customerDetails?: string;
  customerName?: string;
  customerNumber?: string;
  invoiceNumber?: string;
  invoiceValue?: number | string;
};

type ManualInvoiceRow = InvoiceRow & {
  id: string;
  category: CategoryKey;
  customerDetails: string;
  customerName: string;
  customerNumber: string;
  invoiceNumber: string;
  invoiceValue: number;
};

type ManualRowShortcut = {
  label: string;
  category: CategoryKey;
  value: number;
  details: string;
};

const categoryOptions: Array<{ value: CategoryKey; label: string; color: string }> = [
  {
    value: "internetTotal",
    label: "إنترنت",
    color: "border-sky-200 bg-sky-50 text-sky-800",
  },
  {
    value: "elecTotal",
    label: "كهرباء",
    color: "border-amber-200 bg-amber-50 text-amber-800",
  },
  {
    value: "waterTotal",
    label: "مياه",
    color: "border-cyan-200 bg-cyan-50 text-cyan-800",
  },
  {
    value: "phoneTotal",
    label: "أرضي",
    color: "border-orange-200 bg-orange-50 text-orange-800",
  },
];

const manualRowShortcuts = billManualRowShortcuts as ManualRowShortcut[];

const emptyManualForm = {
  category: "" as ManualCategoryValue,
  value: "",
  details: "",
};

const emptyTotals: BillCategoryTotals = {
  internetTotal: 0,
  elecTotal: 0,
  waterTotal: 0,
  phoneTotal: 0,
};

function formatAmount(value: number | string | undefined) {
  return Number(value || 0).toLocaleString("en-EG", {
    minimumFractionDigits: 0,
  });
}

function sumTotals(totals: BillCategoryTotals) {
  return (
    Number(totals.internetTotal || 0) +
    Number(totals.elecTotal || 0) +
    Number(totals.waterTotal || 0) +
    Number(totals.phoneTotal || 0)
  );
}

function ConfirmInvForm({
  clearAllTables,
  finalTable,
  isOpen,
  onClose,
  onSubmit,
  categoryTotals,
}: ConfirmInvFormProps) {
  const tableRef = useRef<HTMLDivElement>(null);
  const printFinalizePendingRef = useRef(false);
  const [loadingMode, setLoadingMode] = useState<SaveMode | null>(null);
  const [manualForm, setManualForm] = useState(emptyManualForm);
  const [selectedShortcut, setSelectedShortcut] = useState("");
  const [manualRows, setManualRows] = useState<ManualInvoiceRow[]>([]);
  const [manualFormError, setManualFormError] = useState("");
  const [saveError, setSaveError] = useState("");
  const user = JSON.parse(localStorage.getItem("DaherUser") || "{}");

  const manualCategoryTotals = useMemo(
    () =>
      manualRows.reduce<BillCategoryTotals>(
        (totals, row) => ({
          ...totals,
          [row.category]:
            Number(totals[row.category] || 0) + Number(row.invoiceValue || 0),
        }),
        emptyTotals,
      ),
    [manualRows],
  );

  const adjustedCategoryTotals = useMemo<BillCategoryTotals>(
    () => ({
      internetTotal:
        Number(categoryTotals.internetTotal || 0) +
        manualCategoryTotals.internetTotal,
      elecTotal:
        Number(categoryTotals.elecTotal || 0) + manualCategoryTotals.elecTotal,
      waterTotal:
        Number(categoryTotals.waterTotal || 0) + manualCategoryTotals.waterTotal,
      phoneTotal:
        Number(categoryTotals.phoneTotal || 0) + manualCategoryTotals.phoneTotal,
    }),
    [categoryTotals, manualCategoryTotals],
  );

  const categorizedTotal = sumTotals(adjustedCategoryTotals);
  const combinedFinalTable = useMemo(
    () => [...finalTable, ...manualRows],
    [finalTable, manualRows],
  );

  const manualValue = Number(manualForm.value);
  const canAddManualRow =
    Boolean(manualForm.category) &&
    Boolean(manualForm.details.trim()) &&
    Number.isFinite(manualValue) &&
    manualValue !== 0;
  const isSaving = loadingMode !== null;

  const resetManualRows = () => {
    setManualRows([]);
    setManualForm(emptyManualForm);
    setSelectedShortcut("");
    setManualFormError("");
    setSaveError("");
  };

  const handleClose = () => {
    if (isSaving) {
      return;
    }

    printFinalizePendingRef.current = false;
    resetManualRows();
    onClose();
  };

  const finalizeInvoice = async (mode: SaveMode) => {
    setLoadingMode(mode);
    setSaveError("");

    try {
      const response = await addBillInvoice({
        amount: categorizedTotal,
        employee: user.username,
        details: combinedFinalTable,
        categoryTotals: adjustedCategoryTotals,
      });

      if (response.success) {
        resetManualRows();
        clearAllTables();
        onSubmit();
        onClose();
      }
    } catch (error: any) {
      setSaveError(
        error?.response?.data?.message ||
          error?.message ||
          "تعذر حفظ الفاتورة",
      );
    } finally {
      setLoadingMode(null);
      printFinalizePendingRef.current = false;
    }
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await finalizeInvoice("save");
  };

  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    pageStyle: `
      @page {
        size: 80mm auto;
        margin: 0;
      }

      body {
        font-family: Arial, sans-serif;
      }

      td, th {
        border: 1px solid black;
        padding: 2px;
        font-weight: bold;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        text-align: center;
        max-width: 65px;
        width: 65px;
        height: auto;
      }

      .no-print {
        display: none;
      }

      .totalValue {
        font-weight: bold;
        font-size: 24px;
      }

      @media print {
        body, table, th, td {
          color: black !important;
        }

        body {
          width: 80mm;
          height: auto;
          margin: 0;
          padding-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          font-family: Arial, sans-serif;
          font-size: 14px;
        }

        .header {
          text-align: center;
          font-size: 16px;
          margin-bottom: 10px;
          margin-top: 10px;
          font-weight: 900;
        }

        .header span {
          display: block;
          margin-bottom: 2px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }
      }
    `,
    onAfterPrint: () => {
      if (printFinalizePendingRef.current) {
        void finalizeInvoice("print");
      }
    },
  });

  const handlePrintAndSave = () => {
    if (isSaving) {
      return;
    }

    printFinalizePendingRef.current = true;
    handlePrint();
  };

  const getCurrentDateTime = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return now.toLocaleDateString("en-GB", options);
  };

  const handleAddManualRow = () => {
    const value = Number(manualForm.value);
    const details = manualForm.details.trim();
    const category = categoryOptions.find(
      (option) => option.value === manualForm.category,
    );

    if (!category || !details || !Number.isFinite(value) || value === 0) {
      setManualFormError("اختر التصنيف وأدخل القيمة والتفاصيل");
      return;
    }

    setManualFormError("");
    setManualRows((rows: any) => [
      ...rows,
      {
        id: `${Date.now()}-${rows.length}`,
        category: manualForm.category,
        customerDetails: category.label,
        customerName: details,
        customerNumber: "يدوي",
        invoiceNumber: "-",
        invoiceValue: value,
      },
    ]);
    setManualForm(emptyManualForm);
  };

  const handleShortcutChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextShortcut = event.target.value;
    setSelectedShortcut(nextShortcut);

    const shortcut = manualRowShortcuts[Number(nextShortcut)];
    const value = Number(shortcut?.value);
    const details = String(shortcut?.details || "").trim();
    const category = categoryOptions.find(
      (option) => option.value === shortcut?.category,
    );

    if (!shortcut || !category || !details || !Number.isFinite(value) || value === 0) {
      setManualFormError("اختر التصنيف وأدخل القيمة والتفاصيل");
      setSelectedShortcut("");
      return;
    }

    setManualFormError("");
    setManualRows((rows: any) => [
      ...rows,
      {
        id: `${Date.now()}-${rows.length}`,
        category: category.value,
        customerDetails: category.label,
        customerName: details,
        customerNumber: "يدوي",
        invoiceNumber: "-",
        invoiceValue: value,
      },
    ]);
    setSelectedShortcut("");
  };

  const handleRemoveManualRow = (id: string) => {
    setManualRows((rows) => rows.filter((row) => row.id !== id));
  };

  if (!isOpen) return null;

  return createPortal(
    (
    <div className="fixed inset-0 z-[100] flex bg-black/60 sm:items-center sm:justify-center sm:p-2">
      <div
        className="flex h-[100svh] w-screen flex-col overflow-hidden bg-background shadow-2xl sm:h-[calc(100svh-1rem)] sm:w-[calc(100vw-1rem)] sm:rounded-lg sm:border lg:max-h-[calc(100svh-1rem)] lg:max-w-[1180px]"
        dir="rtl"
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b bg-muted/30 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-foreground sm:text-xl">تأكيد الفواتير</h2>
            <p className="hidden text-sm text-muted-foreground sm:block">
              مراجعة الفاتورة وإضافة أي سطر يدوي قبل الحفظ
            </p>
          </div>
          <button
            aria-label="إغلاق"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-muted-foreground hover:bg-muted disabled:opacity-50"
            disabled={isSaving}
            onClick={handleClose}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
          onSubmit={handleFormSubmit}
        >
          <div className="min-h-0 flex-1 overflow-y-auto p-2 sm:p-3 lg:p-4">
            <div className="grid min-w-0 gap-3 lg:grid-cols-[minmax(0,1fr)_360px]">
              <div className="order-2 min-w-0 bg-white lg:order-1">
              <div
                ref={tableRef}
                className="mx-auto max-w-full rounded-md border bg-white p-3 text-gray-950 shadow-sm print:border-0 print:shadow-none sm:p-4 lg:max-w-3xl"
              >
                <div className="header text-center font-bold">
                  <span className="block text-lg">Daher.Net</span>
                  <span className="block text-sm">{getCurrentDateTime()}</span>
                </div>

                <div className="mt-4 max-w-full overflow-x-auto text-right">
                  {combinedFinalTable.length > 0 ? (
                    <table className="w-full min-w-[560px] border-collapse text-sm">
                      <thead>
                        <tr className="border bg-gray-100">
                          <th className="px-2 py-2">نوع الفاتورة</th>
                          <th className="px-2 py-2">الاسم</th>
                          <th className="px-2 py-2">الرقم</th>
                          <th className="px-2 py-2">الدورة</th>
                          <th className="px-2 py-2">المبلغ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {combinedFinalTable.map((invoice, index) => (
                          <tr
                            className="border-b"
                            key={`${invoice.id || invoice.customerNumber || "row"}-${index}`}
                          >
                            <td className="px-2 py-2">
                              {invoice.customerDetails || "-"}
                            </td>
                            <td className="px-2 py-2">
                              {invoice.customerName || "-"}
                            </td>
                            <td className="px-2 py-2">
                              {invoice.customerNumber || "-"}
                            </td>
                            <td className="px-2 py-2">
                              {invoice.invoiceNumber || "-"}
                            </td>
                            <td className="px-2 py-2 font-bold">
                              {formatAmount(invoice.invoiceValue)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                      لا توجد فواتير محددة
                    </div>
                  )}
                </div>

                <div className="totalValue mt-4 flex items-center justify-between border-t pt-3">
                  <span>المجموع</span>
                  <span>{formatAmount(categorizedTotal)}</span>
                </div>
              </div>
            </div>

            <aside className="no-print order-1 min-w-0 rounded-md border bg-muted/20 p-3 lg:order-2 lg:p-4">
              <div className="space-y-4">
                <section className="rounded-md border bg-background p-3 sm:p-4">
                  <p className="text-sm font-semibold text-muted-foreground">
                    المجموع النهائي
                  </p>
                  <p className="mt-1 text-3xl font-extrabold text-primary">
                    {formatAmount(categorizedTotal)}
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-bold">الإجماليات حسب التصنيف</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categoryOptions.map((category) => (
                      <div
                        className={`rounded-md border p-3 ${category.color}`}
                        key={category.value}
                      >
                        <p className="text-xs font-semibold">{category.label}</p>
                        <p className="mt-1 text-lg font-extrabold">
                          {formatAmount(adjustedCategoryTotals[category.value])}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-3 rounded-md border bg-background p-3 sm:p-4">
                  <h3 className="text-sm font-bold">إضافة سطر يدوي</h3>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        اختصار جاهز
                      </label>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={selectedShortcut}
                        onChange={handleShortcutChange}
                      >
                        <option value="">اختر اختصار للإضافة السريعة</option>
                        {manualRowShortcuts.map((shortcut, index) => (
                          <option key={`${shortcut.label}-${index}`} value={index}>
                            {shortcut.label} - {formatAmount(shortcut.value)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        التصنيف
                      </label>
                      <select
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={manualForm.category}
                        onChange={(event) =>
                          setManualForm((prev) => ({
                            ...prev,
                            category: event.target.value as ManualCategoryValue,
                          }))
                        }
                      >
                        <option value="">اختر التصنيف</option>
                        {categoryOptions.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        القيمة
                      </label>
                      <input
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        onChange={(event) =>
                          setManualForm((prev) => ({
                            ...prev,
                            value: event.target.value,
                          }))
                        }
                        placeholder="0"
                        type="number"
                        value={manualForm.value}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        التفاصيل
                      </label>
                      <input
                        className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        onChange={(event) =>
                          setManualForm((prev) => ({
                            ...prev,
                            details: event.target.value,
                          }))
                        }
                        placeholder="مثال: فرق فاتورة"
                        type="text"
                        value={manualForm.details}
                      />
                    </div>

                    {manualFormError && (
                      <p className="text-sm text-destructive">{manualFormError}</p>
                    )}

                    <button
                      className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={!canAddManualRow}
                      onClick={handleAddManualRow}
                      type="button"
                    >
                      <Plus className="h-4 w-4" />
                      إضافة السطر
                    </button>
                  </div>
                </section>

                {manualRows.length > 0 && (
                  <section className="space-y-3">
                    <h3 className="text-sm font-bold">الأسطر اليدوية</h3>
                    <div className="space-y-2">
                      {manualRows.map((row) => (
                        <div
                          className="flex items-center gap-3 rounded-md border bg-background p-3"
                          key={row.id}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold">
                              {row.customerName}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {row.customerDetails} - {formatAmount(row.invoiceValue)}
                            </p>
                          </div>
                          <button
                            aria-label="حذف السطر"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleRemoveManualRow(row.id)}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {saveError && (
                  <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {saveError}
                  </p>
                )}
              </div>
            </aside>
            </div>
          </div>

          <div className="no-print flex shrink-0 flex-wrap gap-2 border-t bg-background p-3 sm:p-4">
                <button
                  className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  disabled={isSaving}
                  type="submit"
                >
                  <Save className="h-4 w-4" />
                  {loadingMode === "save" ? "جاري الحفظ..." : "Save"}
                </button>
                <button
                  className="inline-flex h-10 min-w-[8rem] flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 text-sm font-bold text-accent-foreground hover:bg-accent/90 disabled:opacity-60"
                  disabled={isSaving}
                  onClick={handlePrintAndSave}
                  type="button"
                >
                  <Printer className="h-4 w-4" />
                  {loadingMode === "print" ? "جاري الحفظ..." : "Print"}
                </button>
                <button
                  className="inline-flex h-10 min-w-[6rem] flex-1 items-center justify-center rounded-md border px-4 text-sm font-bold hover:bg-muted disabled:opacity-60 sm:flex-none"
                  disabled={isSaving}
                  onClick={handleClose}
                  type="button"
                >
                  Close
                </button>
          </div>
        </form>
      </div>
    </div>
    ),
    document.body,
  );
}

export default ConfirmInvForm;
