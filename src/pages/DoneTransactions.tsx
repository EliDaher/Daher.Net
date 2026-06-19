import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarDays, Loader2, Search } from "lucide-react";
import { DateRange } from "react-day-picker";

import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

function getTodayRange(): DateRange {
  const today = new Date();

  return { from: today, to: today };
}

function formatDateParam(date?: Date) {
  if (!date) {
    return "";
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return localDate.toISOString().split("T")[0];
}

function toNumber(value: unknown) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

function formatAmount(value: number) {
  return value.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function DoneTransactionsLoader({
  title = "جاري تحميل التسديدات المنتهية",
  description = "يتم جلب عمليات اليوم من الخادم...",
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
  const [dateRange, setDateRange] = useState<DateRange>(() => getTodayRange());
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [selectedEmail, setSelectedEmail] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const fromDate = formatDateParam(dateRange?.from);
  const toDate = formatDateParam(dateRange?.to ?? dateRange?.from);

  const {
    data: doneResponse,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["done-invoices", fromDate, toDate, page, limit],
    queryFn: () => getDoneInvoicesByDate({ fromDate, toDate, page, limit }),
    enabled: Boolean(fromDate && toDate),
    placeholderData: (previousData) => previousData,
  });

  const doneData = doneResponse?.data ?? [];
  const totalRows = doneResponse?.total ?? 0;
  const showInitialLoader = isLoading && !doneResponse;
  const showTableLoader = isFetching && Boolean(doneResponse);

  const columns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "landline", label: "الرقم", sortable: true },
    { key: "company", label: "الشركة", sortable: true },
    { key: "speed", label: "السرعة", sortable: true },
    { key: "email", label: "الحساب المرسل", sortable: true },
    { key: "amount", label: "المبلغ المسدد", sortable: true },
    { key: "status", label: "حالة العملية", sortable: true },
    // { key: "paymentMethod", label: "طريقة الدفع", sortable: true },
    // { key: "note", label: "ملاحظات", sortable: true },
    { key: "createdAt", label: "تاريخ العملية", sortable: true },
  ];

  const filteredData = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return doneData
      .filter((item) =>
        selectedCompany === "all" ? true : item.company === selectedCompany,
      )
      .filter((item) =>
        selectedStatus === "all" ? true : item.status === selectedStatus,
      )
      .filter((item) =>
        selectedEmail === "all" ? true : item.email === selectedEmail,
      )
      .filter((item) => {
        if (!normalizedSearchTerm) {
          return true;
        }

        return [
          item.landline,
          item.email,
          item.note,
          item.company,
          item.status,
          item.paymentMethod,
        ].some((value) =>
          String(value ?? "").toLowerCase().includes(normalizedSearchTerm),
        );
      });
  }, [doneData, searchTerm, selectedCompany, selectedEmail, selectedStatus]);

  const companyList = useMemo(() => {
    return Array.from(
      new Set(doneData.map((item) => item.company).filter(Boolean) as string[]),
    );
  }, [doneData]);

  const emailList = useMemo(() => {
    return Array.from(
      new Set(doneData.map((item) => item.email).filter(Boolean) as string[]),
    );
  }, [doneData]);

  const statusList = useMemo(() => {
    return Array.from(
      new Set(doneData.map((item) => item.status).filter(Boolean) as string[]),
    );
  }, [doneData]);

  const totalAmount = useMemo(() => {
    return filteredData.reduce((total, item) => total + toNumber(item.amount), 0);
  }, [filteredData]);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range ?? getTodayRange());
    setPage(1);
  };

  const handlePageSizeChange = (nextLimit: number) => {
    setLimit(nextLimit);
    setPage(1);
  };

  const handleFilterChange = (setter: (value: string) => void) => (value: string) => {
    setter(value);
  };

  return (
    <DashboardLayout>
      <div dir="rtl" className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl">التسديدات المنتهية</CardTitle>
                <CardDescription>
                  مراجعة عمليات الإنترنت المنتهية حسب التاريخ والصفحة الحالية
                </CardDescription>
              </div>
              {showTableLoader && (
                <div className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  جاري التحديث...
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start whitespace-nowrap">
                    <CalendarDays className="h-4 w-4" />
                    {fromDate && toDate
                      ? `من ${fromDate} إلى ${toDate}`
                      : "اختر المدة الزمنية"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={dateRange}
                    onSelect={handleDateRangeChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>

              <Select value={selectedCompany} onValueChange={handleFilterChange(setSelectedCompany)}>
                <SelectTrigger>
                  <SelectValue placeholder="الشركة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الشركات</SelectItem>
                  {companyList.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedEmail} onValueChange={handleFilterChange(setSelectedEmail)}>
                <SelectTrigger>
                  <SelectValue placeholder="الحساب المرسل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحسابات</SelectItem>
                  {emailList.map((email) => (
                    <SelectItem key={email} value={email}>
                      {email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={handleFilterChange(setSelectedStatus)}>
                <SelectTrigger>
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الحالات</SelectItem>
                  {statusList.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="بحث في الصفحة الحالية"
                  className="pr-9"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border bg-background p-4">
                <p className="text-sm text-muted-foreground">إجمالي النتائج</p>
                <p className="mt-2 text-2xl font-semibold">{formatAmount(totalRows)}</p>
              </div>
              <div className="rounded-md border bg-background p-4">
                <p className="text-sm text-muted-foreground">نتائج الصفحة بعد الفلترة</p>
                <p className="mt-2 text-2xl font-semibold">{formatAmount(filteredData.length)}</p>
              </div>
              <div className="rounded-md border bg-background p-4">
                <p className="text-sm text-muted-foreground">مجموع الصفحة الحالية</p>
                <p className="mt-2 text-2xl font-semibold">{formatAmount(totalAmount)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {isError && (
          <div className="rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
            حدث خطأ أثناء تحميل التسديدات المنتهية. تأكد من اختيار تاريخ صحيح ثم أعد المحاولة.
          </div>
        )}

        {showInitialLoader ? (
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

            {filteredData.length === 0 && !showTableLoader && (
              <div className="mb-4 rounded-md border bg-muted/30 p-4 text-sm text-muted-foreground">
                لا توجد عمليات مطابقة للتاريخ أو الفلاتر الحالية.
              </div>
            )}

            <div className={showTableLoader ? "pointer-events-none" : undefined}>
              <DataTable
                title="التسديدات المنتهية"
                description={`إجمالي المبلغ في الصفحة الحالية: ${formatAmount(totalAmount)}`}
                columns={columns}
                data={filteredData}
                searchable={false}
                defaultPageSize={limit}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                isLoading={isLoading}
                serverPagination={{
                  page: doneResponse?.page ?? page,
                  pageSize: doneResponse?.limit ?? limit,
                  total: totalRows,
                  onPageChange: setPage,
                  onPageSizeChange: handlePageSizeChange,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
