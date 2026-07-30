import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Loader2 } from "lucide-react";
import { DateRange } from "react-day-picker";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getDoneInvoicesByDate,
  type DoneInternetPayment,
} from "@/services/invoices";

function formatDateParam(date?: Date) {
  if (!date) {
    return "";
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().split("T")[0];
}

function getTodayRange(): DateRange {
  const today = new Date();

  return { from: today, to: today };
}

function getLastSevenDaysRange(): DateRange {
  const today = new Date();
  const from = new Date(today);
  from.setDate(today.getDate() - 6);

  return { from, to: today };
}

function DoneTransactionsLoader({
  title = "جاري تحميل التسديدات المنتهية",
  description = "يتم جلب العمليات حسب المدة الزمنية المحددة...",
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

export default function DoneTransactions() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  // 🔹 فلاتر الفرونت فقط
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [selectedEmail, setSelectedEmail] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  // 🔸 تنسيق التواريخ
  const fromDate = formatDateParam(dateRange?.from);
  const toDate = formatDateParam(dateRange?.to ?? dateRange?.from);

  // ⚙️ جلب البيانات من السيرفر فقط حسب التاريخ
  const {
    data: doneData = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["done-invoices", fromDate, toDate],
    queryFn: () => getDoneInvoicesByDate(fromDate, toDate),
    enabled: !!fromDate && !!toDate,
    placeholderData: (previousData) => previousData,
  });
  const hasDateRange = Boolean(fromDate && toDate);
  const showInitialLoader = isLoading && hasDateRange;
  const showTableLoader = isFetching && !isLoading && hasDateRange;

  // 🧮 تطبيق الفلاتر محليًا في الفرونت
  const filteredData = useMemo(() => {
    return doneData
      .filter((item: DoneInternetPayment) =>
        selectedCompany === "all" ? true : item.company === selectedCompany,
      )
      .filter((item: DoneInternetPayment) =>
        selectedStatus === "all" ? true : item.status === selectedStatus,
      )
      .filter((item: DoneInternetPayment) =>
        selectedEmail === "all" ? true : item.email === selectedEmail,
      );
  }, [doneData, selectedCompany, selectedEmail, selectedStatus]);

  const columns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "landline", label: "الرقم", sortable: true },
    { key: "company", label: "الشركة", sortable: true },
    { key: "speed", label: "السرعة", sortable: true },
    { key: "email", label: "الحساب المرسل", sortable: true },
    { key: "amount", label: "المبلغ المسدد", sortable: true },
    { key: "status", label: "حالة العملية", sortable: true },
    // { key: "paymentMethod", label: "طريقة الدفع", sortable: true },
    { key: "note", label: "ملاحظات", sortable: true },
    { key: "createdAt", label: "تاريخ العملية", sortable: true },
  ];

  const companyList = useMemo(() => {
    const unique = new Set<string>();
    doneData.forEach((item: DoneInternetPayment) => {
      if (item.company) unique.add(item.company);
    });
    return Array.from(unique);
  }, [doneData]);

  const posList = useMemo(() => {
    const unique = new Set<string>();
    doneData.forEach((item: DoneInternetPayment) => {
      if (item.email) unique.add(item.email);
    });
    return Array.from(unique);
  }, [doneData]);

  const totalAmount = useMemo(() => {
    return filteredData.reduce((acc: number, item: DoneInternetPayment) => {
      if (item.amount) acc += item.amount;
      return acc;
    }, 0);
  }, [filteredData]);

  const selectToday = () => setDateRange(getTodayRange());
  const selectLastSevenDays = () => setDateRange(getLastSevenDaysRange());
  const clearDateRange = () => setDateRange(undefined);

  return (
    <DashboardLayout>
      <div dir="rtl" className="space-y-6">
        {/* 🎛️ الفلاتر */}
        <Card className="overflow-hidden">
          <CardHeader className="border-b bg-muted/30 pb-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">الفلاتر</CardTitle>
                <CardDescription>
                  {hasDateRange
                    ? `المدة المحددة: من ${fromDate} إلى ${toDate}`
                    : "اختر مدة زمنية لعرض التسديدات المنتهية"}
                </CardDescription>
              </div>
              {showTableLoader && (
                <div className="inline-flex w-fit items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  جاري تحديث البيانات...
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
            {/* الشركة */}
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="الشركة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                {companyList.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* البريد الإلكتروني */}
            <Select value={selectedEmail} onValueChange={setSelectedEmail}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="الحساب المرسل" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                {posList.map((email) => (
                  <SelectItem key={email} value={email}>
                    {email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* الحالة */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="تم التسديد">تم التسديد</SelectItem>
                <SelectItem value="غير مسددة">غير مسددة</SelectItem>
                <SelectItem value="مرفوضة">مرفوضة</SelectItem>
              </SelectContent>
            </Select>

            {/* المدة الزمنية */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="h-auto min-h-10 w-full justify-start gap-3 whitespace-normal px-3 py-2 text-right"
                >
                  <CalendarDays className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <span className="flex min-w-0 flex-col">
                    <span className="text-xs text-muted-foreground">المدة الزمنية</span>
                    <span className="truncate">
                      {hasDateRange
                        ? `من ${fromDate} إلى ${toDate}`
                        : "اختر المدة الزمنية"}
                    </span>
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />
                <div className="flex flex-wrap gap-2 border-t p-3">
                  <Button type="button" variant="secondary" size="sm" onClick={selectToday}>
                    اليوم
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={selectLastSevenDays}
                  >
                    آخر 7 أيام
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearDateRange}
                  >
                    مسح
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        {isError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm font-medium text-destructive">
            حدث خطأ أثناء تحميل البيانات. تأكد من اختيار مدة صحيحة ثم حاول مرة أخرى.
          </div>
        )}

        {!hasDateRange ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-md border bg-card p-6 text-center shadow-sm">
            <div className="flex max-w-sm flex-col items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CalendarDays className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h2 className="text-lg font-semibold">اختر مدة زمنية</h2>
                <p className="text-sm text-muted-foreground">
                  ستظهر التسديدات المنتهية بعد تحديد تاريخ البداية والنهاية.
                </p>
              </div>
            </div>
          </div>
        ) : showInitialLoader ? (
          <DoneTransactionsLoader />
        ) : (
          <div className="relative">
            {showTableLoader && (
              <div className="absolute inset-0 z-10 flex items-start justify-center rounded-md bg-background/70 p-6 backdrop-blur-[2px]">
                <div className="mt-20 flex items-center gap-3 rounded-md border bg-card px-5 py-3 text-sm font-medium text-foreground shadow-lg">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span>جاري تحديث التسديدات...</span>
                </div>
              </div>
            )}

            <div className={showTableLoader ? "pointer-events-none" : undefined}>
              <DataTable
                title="التسديدات المنتهية"
                description={`إجمالي المبلغ: ${totalAmount.toLocaleString()}`}
                columns={columns}
                data={filteredData}
                pageSizeOptions={[10,20,50,100,200,500]}
                pagination={true}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
