import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/ui/custom/FormInput";
import { searchInvoice } from "@/services/invoices";
import * as Popover from "@radix-ui/react-popover";
import { toast } from "sonner";

export default function FinancialStatement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const searchMutation = useMutation({
    mutationFn: async () => {
      if (!searchTerm.trim()) {
        toast.error("الرجاء إدخال كلمة للبحث");
        return;
      }
      const data = await searchInvoice(searchTerm);
      return data;
    },
    onSuccess: (data) => {
      if (!data || data.message) {
        setResults([]);
        toast.error("لا توجد نتائج مطابقة");
      } else {
        console.log("Search Results:", data);
        setResults(data); // ← لأنها مصفوفة مباشرة
      }
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
      <div dir="rtl" className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>البحث في الفواتير (البيان المالي)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
            >
              <FormInput
                label=""
                id="BillSearch"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="أدخل اسم الزبون أو رقم الفاتورة"
                className="w-full rounded-l-none"
              />

              <Button
                type="submit"
                disabled={searchMutation.isPending}
                className="mt-1 rounded-r-none"
              >
                {searchMutation.isPending ? "جاري البحث..." : "بحث"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* عرض النتائج */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>نتائج البحث</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-background rounded-xl shadow-md overflow-x-auto">
                {searchMutation.isPending ? (
                  <div className="p-6 text-center text-foreground">
                    جاري التحميل...
                  </div>
                ) : (
                  <table className="min-w-full text-sm text-foreground">
                    <thead>
                      <tr className="bg-foreground/20 text-foreground text-right">
                        <th className="py-3 px-4">#</th>
                        <th className="py-3 px-4">الموظف</th>
                        <th className="py-3 px-4">التفاصيل</th>
                        <th className="py-3 px-4">المبلغ</th>
                        <th className="py-3 px-4">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((item, index) => {
                        const details = item.invoiceData?.details
                          ? Object.values(item.invoiceData.details)
                          : [];

                        return (
                          <tr
                            key={index}
                            className="border-b hover:bg-foreground/20 transition"
                          >
                            <td className="py-3 px-4">{index + 1}</td>
                            <td className="py-3 px-4 font-medium">
                              {item.employee}
                            </td>

                            <td className="py-3 px-4">
                              {details.length > 0 ? (
                                <Popover.Root>
                                  <Popover.Trigger asChild>
                                    <button className="text-accent hover:underline">
                                      {details
                                        .map(
                                          (d: any) =>
                                            d.customerName +
                                            "//" +
                                            d.invoiceNumber +
                                            "//" +
                                            d.customerDetails,
                                        )
                                        .join(", ")}
                                    </button>
                                  </Popover.Trigger>
                                  <Popover.Content
                                    side="bottom"
                                    align="start"
                                    className="bg-background border border-gray-200 rounded-lg shadow-lg p-4 max-w-lg"
                                  >
                                    <table className="text-sm w-full border-collapse">
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
                                        {details.map((d: any, idx) => (
                                          <tr key={idx}>
                                            <td className="border px-2 py-1">
                                              {d.customerName}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {d.customerNumber}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {d.invoiceNumber}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {d.invoiceValue}
                                            </td>
                                            <td className="border px-2 py-1">
                                              {d.customerDetails}
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

                            <td className="py-3 px-4 text-blue-600 font-semibold">
                              {item.invoiceData?.amount?.toLocaleString(
                                "en-EG",
                                {
                                  minimumFractionDigits: 0,
                                },
                              )}
                            </td>
                            <td className="py-3 px-4">
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
