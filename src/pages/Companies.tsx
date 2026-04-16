import AddCompanyForm from "@/components/companies/AddCompanyForm";
import CompanyIncreaseForm from "@/components/companies/CompanyIncreasForm";
import TransfareBalanceForm from "@/components/companies/TransfareBalanceForm";
import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useCompaniesContext } from "@/contexts/CompaniesProvider";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  Building2,
  CalendarClock,
  LayoutGrid,
  Search,
  Table,
  Wallet,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type StatusFilter = "all" | "low" | "healthy";

type CompanyRow = {
  id: string;
  name: string;
  balance: number;
  balanceLimit: number;
  lastUpdate?: string | null;
  [key: string]: unknown;
};

const companiesColumns = [
  { key: "name", label: "الشركة", sortable: true },
  { key: "balance", label: "الرصيد", sortable: true },
  { key: "balanceLimit", label: "الحد الأدنى", sortable: true },
  { key: "lastUpdate", label: "آخر عملية", sortable: true },
];

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString("en-SY", {
    maximumFractionDigits: 2,
  });
}

function formatLastUpdate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return date.toLocaleString("en-GB");
}

export default function Companies() {
  const { data: companies, isLoading } = useCompaniesContext();
  const navigate = useNavigate();

  const [openTransferId, setOpenTransferId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const normalizedCompanies = useMemo<CompanyRow[]>(() => {
    if (!Array.isArray(companies)) {
      return [];
    }

    return companies.map((company: any) => ({
      ...company,
      id: String(company.id),
      name: String(company.name || "-"),
      balance: Number(company.balance || 0),
      balanceLimit: Number(company.balanceLimit || 0),
      lastUpdate: company.lastUpdate || null,
    }));
  }, [companies]);

  const lowBalanceCount = useMemo(
    () => normalizedCompanies.filter((company) => company.balance < company.balanceLimit).length,
    [normalizedCompanies],
  );

  const totalBalance = useMemo(
    () => normalizedCompanies.reduce((sum, company) => sum + company.balance, 0),
    [normalizedCompanies],
  );

  const averageBalance = normalizedCompanies.length > 0 ? totalBalance / normalizedCompanies.length : 0;

  const latestUpdateLabel = useMemo(() => {
    const latestTimestamp = normalizedCompanies.reduce((latest, company) => {
      const current = company.lastUpdate ? new Date(company.lastUpdate).getTime() : 0;
      return current > latest ? current : latest;
    }, 0);

    if (!latestTimestamp) return "-";
    return new Date(latestTimestamp).toLocaleString("en-GB");
  }, [normalizedCompanies]);

  const filteredCompanies = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return normalizedCompanies.filter((company) => {
      const isLowBalance = company.balance < company.balanceLimit;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "low" ? isLowBalance : !isLowBalance);
      const matchesSearch =
        normalizedQuery.length === 0 ||
        company.name.toLowerCase().includes(normalizedQuery);

      return matchesStatus && matchesSearch;
    });
  }, [normalizedCompanies, searchQuery, statusFilter]);

  const statusFilters: Array<{ key: StatusFilter; label: string; count: number }> = [
    { key: "all", label: "كل الشركات", count: normalizedCompanies.length },
    { key: "low", label: "تحت الحد", count: lowBalanceCount },
    {
      key: "healthy",
      label: "مستقرة",
      count: normalizedCompanies.length - lowBalanceCount,
    },
  ];

  return (
    <DashboardLayout>
      <div dir="rtl" className="space-y-6 pb-6">
        <div className="rounded-2xl border bg-gradient-to-l from-primary-50/40 via-background to-accent-900/10 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">الشركات</h1>
              <p className="text-sm text-muted-foreground">
                إدارة أرصدة الشركات ومراقبة الشركات التي اقتربت من الحد الأدنى.
              </p>
            </div>

            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
              <AddCompanyForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                trigger={<Button variant="accent">إضافة شركة جديدة</Button>}
              />

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "cards" ? "default" : "outline"}
                  onClick={() => setViewMode("cards")}
                >
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  عرض كبطاقات
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "outline"}
                  onClick={() => setViewMode("table")}
                >
                  <Table className="mr-2 h-4 w-4" />
                  عرض كجدول
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full xl:max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="ابحث باسم الشركة"
                className="pl-9"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {statusFilters.map((filter) => (
                <Button
                  key={filter.key}
                  size="sm"
                  variant={statusFilter === filter.key ? "default" : "outline"}
                  onClick={() => setStatusFilter(filter.key)}
                >
                  {filter.label}
                  <span className="rounded-full bg-black/10 px-2 py-0.5 text-xs dark:bg-white/20">
                    {filter.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>إجمالي الشركات</CardDescription>
              <CardTitle className="text-2xl">{normalizedCompanies.length}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="h-4 w-4" />
                كل الشركات المسجلة
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>شركات حرجة</CardDescription>
              <CardTitle className="text-2xl">{lowBalanceCount}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-xs text-destructive">
                <AlertTriangle className="h-4 w-4" />
                تحتاج متابعة سريعة
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>مجموع الأرصدة</CardDescription>
              <CardTitle className="text-2xl">{formatNumber(totalBalance)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Wallet className="h-4 w-4" />
                رصيد تراكمي لكل الشركات
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>متوسط الرصيد</CardDescription>
              <CardTitle className="text-2xl">{formatNumber(averageBalance)}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CalendarClock className="h-4 w-4" />
                آخر تحديث: {latestUpdateLabel}
              </div>
            </CardContent>
          </Card>
        </div>

        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <Card key={`company-skeleton-${index}`}>
                  <CardHeader className="space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-2 w-full" />
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : filteredCompanies.length === 0 ? (
              <Card className="col-span-full border-dashed">
                <CardContent className="py-14 text-center text-muted-foreground">
                  لا توجد شركات مطابقة للفلاتر الحالية.
                </CardContent>
              </Card>
            ) : (
              filteredCompanies.map((company) => {
                const isLowBalance = company.balance < company.balanceLimit;
                const minCoveragePercent =
                  company.balanceLimit > 0
                    ? Math.min(100, Math.max(0, (company.balance / company.balanceLimit) * 100))
                    : 100;

                return (
                  <Card
                    key={company.id}
                    className={cn(
                      "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                      isLowBalance
                        ? "border-destructive/40 bg-gradient-to-b from-destructive/5 to-background"
                        : "border-accent-500/40 bg-gradient-to-b from-accent-900/10 to-background",
                    )}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <CardTitle className="line-clamp-1 text-xl font-bold">{company.name}</CardTitle>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <CalendarClock className="h-3.5 w-3.5" />
                            {formatLastUpdate(company.lastUpdate)}
                          </div>
                        </div>

                        <Badge
                          variant={isLowBalance ? "destructive" : "outline"}
                          className={cn(!isLowBalance && "border-accent-500/40 text-accent-600")}
                        >
                          {isLowBalance ? "تحت الحد" : "مستقرة"}
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="rounded-lg border bg-background/60 p-3">
                        <p className="mb-1 text-xs text-muted-foreground">الرصيد الحالي</p>
                        <p
                          className={cn(
                            "text-2xl font-extrabold",
                            isLowBalance ? "text-destructive" : "text-accent-600",
                          )}
                        >
                          {formatNumber(company.balance)}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>الحد الأدنى</span>
                          <span>{formatNumber(company.balanceLimit)}</span>
                        </div>

                        <div className="h-2 rounded-full bg-muted">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              isLowBalance ? "bg-destructive" : "bg-accent-600",
                            )}
                            style={{ width: `${minCoveragePercent}%` }}
                          />
                        </div>

                        <p className="text-xs text-muted-foreground">
                          فارق الأمان: {formatNumber(company.balance - company.balanceLimit)}
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="grid gap-2 pt-0">
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/companies/${company.id}`)}
                      >
                        تفاصيل الشركة
                      </Button>

                      <CompanyIncreaseForm
                        companyId={company.id}
                        companyName={company.name}
                        isOpen={openId === company.id}
                        setIsOpen={(value) => {
                          if (value) {
                            setOpenId(company.id);
                          } else {
                            setOpenId(null);
                          }
                        }}
                      />

                      {["برونت", "هاي فاي"].includes(company.name) && (
                        <TransfareBalanceForm
                          companyId={company.id}
                          companyName={company.name}
                          isOpen={openTransferId === company.id}
                          setIsOpen={(value) => {
                            if (value) {
                              setOpenTransferId(company.id);
                            } else {
                              setOpenTransferId(null);
                            }
                          }}
                        />
                      )}
                    </CardFooter>
                  </Card>
                );
              })
            )}
          </div>
        ) : (
          <DataTable
            title="قائمة الشركات"
            description={`النتائج: ${filteredCompanies.length} | آخر تحديث: ${latestUpdateLabel}`}
            data={filteredCompanies}
            columns={companiesColumns}
            searchable={false}
            isLoading={isLoading}
            renderRowActions={(row) => (
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate(`/companies/${row.id}`)}
              >
                تفاصيل
              </Button>
            )}
            getRowClassName={(row) =>
              Number(row.balance) < Number(row.balanceLimit)
                ? "bg-destructive/10 hover:bg-destructive/20"
                : ""
            }
          />
        )}
      </div>
    </DashboardLayout>
  );
}
