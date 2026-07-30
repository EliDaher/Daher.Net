import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "sonner";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/custom/FormInput";
import { searchInvoice } from "@/services/invoices";

type InvoiceResult = Record<string, any>;

function getInvoiceDetails(item: InvoiceResult) {
  const details = item?.invoiceData?.details ?? item?.details ?? [];

  if (Array.isArray(details)) {
    return details;
  }

  if (details && typeof details === "object") {
    return Object.values(details);
  }

  return [];
}

function normalizeInvoiceResults(payload: any): InvoiceResult[] {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.invoices)) {
    return payload.invoices;
  }

  return [];
}

export default function FinancialStatement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<InvoiceResult[]>([]);

  const searchMutation = useMutation({
    mutationFn: async () => {
      if (!searchTerm.trim()) {
        toast.error("الرجاء إدخال كلمة للبحث");
        return null;
      }

      return searchInvoice(searchTerm);
    },
    onSuccess: (data) => {
      if (!data || data.message) {
        setResults([]);
        toast.error("لا توجد نتائج مطابقة");
        return;
      }

      const rows = normalizeInvoiceResults(data);

      if (rows.length === 0) {
        setResults([]);
        toast.error("لا توجد نتائج مطابقة");
        return;
      }

      setResults(rows);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("حدث خطأ أثناء تنفيذ البحث");
    },
  });

  const handleSearch = () => {
    searchMutation.mutate();
  };

  return (
    <DashboardLayout>
      <div dir="rtl" className="space-y-4 p-2 sm:p-4">
        <Card>
          <CardHeader>
            <CardTitle>البحث في الفواتير (البيان المالي)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                handleSearch();
              }}
            >
              <FormInput
                label=""
                id="BillSearch"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="أدخل اسم الزبون أو رقم الفاتورة"
                className="w-full sm:rounded-l-none"
              />

              <Button
                type="submit"
                disabled={searchMutation.isPending}
                className="w-full sm:mt-1 sm:w-auto sm:rounded-r-none"
              >
                {searchMutation.isPending ? "جاري البحث..." : "بحث"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>نتائج البحث</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-lg border bg-background shadow-sm">
                {searchMutation.isPending ? (
                  <div className="p-6 text-center text-foreground">
                    جاري التحميل...
                  </div>
                ) : (
                  <table className="min-w-[720px] text-sm text-foreground">
                    <thead>
                      <tr className="bg-foreground/20 text-right text-foreground">
                        <th className="px-4 py-3">#</th>
                        <th className="px-4 py-3">الموظف</th>
                        <th className="px-4 py-3">التفاصيل</th>
                        <th className="px-4 py-3">المبلغ</th>
                        <th className="px-4 py-3">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((item, index) => {
                        const details = getInvoiceDetails(item);

                        return (
                          <tr
                            key={item?._id ?? index}
                            className="border-b transition hover:bg-foreground/20"
                          >
                            <td className="px-4 py-3">{index + 1}</td>
                            <td className="px-4 py-3 font-medium">
                              {item.employee}
                            </td>

                            <td className="max-w-[360px] px-4 py-3">
                              {details.length > 0 ? (
                                <Popover.Root>
                                  <Popover.Trigger asChild>
                                    <button className="max-w-full truncate text-accent hover:underline">
                                      {details
                                        .map(
                                          (detail: any) =>
                                            `${detail.customerName || ""}//${
                                              detail.invoiceNumber || ""
                                            }//${detail.customerDetails || ""}`,
                                        )
                                        .join(", ")}
                                    </button>
                                  </Popover.Trigger>
                                  <Popover.Content
                                    side="bottom"
                                    align="start"
                                    className="max-w-[calc(100vw-2rem)] overflow-x-auto rounded-lg border border-gray-200 bg-background p-4 shadow-lg"
                                  >
                                    <table className="w-full min-w-[560px] border-collapse text-sm">
                                      <thead>
                                        <tr className="bg-foreground/30 text-foreground">
                                          <th className="border px-2 py-1">
                                            العميل
                                          </th>
                                          <th className="border px-2 py-1">
                                            الرقم
                                          </th>
                                          <th className="border px-2 py-1">
                                            رقم الفاتورة
                                          </th>
                                          <th className="border px-2 py-1">
                                            القيمة
                                          </th>
                                          <th className="border px-2 py-1">
                                            الملاحظات
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {details.map((detail: any, idx) => (
                                          <tr key={idx}>
                                            <td className="border px-2 py-1">
                                              {detail.customerName}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {detail.customerNumber}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {detail.invoiceNumber}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {detail.invoiceValue}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {detail.customerDetails}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </Popover.Content>
                                </Popover.Root>
                              ) : (
                                <span className="text-gray-400">لا تفاصيل</span>
                              )}
                            </td>

                            <td className="px-4 py-3 font-semibold text-blue-600">
                              {item.invoiceData?.amount?.toLocaleString(
                                "en-EG",
                                {
                                  minimumFractionDigits: 0,
                                },
                              )}
                            </td>
                            <td className="px-4 py-3">
                              {item.invoiceData?.timestamp || item.date}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
