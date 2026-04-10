import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, BarChart3, Coins, ListChecks } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanyDetails } from "@/services/companies";

type ChartMetric = "amount" | "count";

function formatNumber(value: number) {
  return Number(value || 0).toLocaleString("en-SY", {
    maximumFractionDigits: 2,
  });
}

function getCurrentMonth() {
  return new Date().toISOString().slice(0, 7);
}

function formatDateLabel(value: string) {
  if (!value) return "-";
  return value.slice(8, 10);
}

export default function CompanyDetails() {
  const navigate = useNavigate();
  const { companyId = "" } = useParams<{ companyId: string }>();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [chartMetric, setChartMetric] = useState<ChartMetric>("amount");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["company-details", companyId, selectedMonth],
    queryFn: () => getCompanyDetails(companyId, selectedMonth),
    enabled: !!companyId,
  });

  const chartData = data?.dailyUsage ?? [];
  const summary = data?.summary;
  const company = data?.company;

  const recentLogsRows = useMemo(
    () =>
      (data?.recentUsageLogs ?? []).map((log) => ({
        id: log.id,
        date: log.date || log.dateKey,
        amount: Number(log.amount || 0),
        number: log.number || "-",
        port: log.port || "-",
        reason: log.reason || "-",
      })),
    [data?.recentUsageLogs],
  );

  const recentIncreaseRows = useMemo(
    () =>
      (data?.recentIncreaseLogs ?? []).map((log) => ({
        id: log.id,
        date: log.date || log.dateKey,
        amount: Number(log.amount || 0),
        number: log.number || "-",
        port: log.port || "-",
        reason: log.reason || "-",
      })),
    [data?.recentIncreaseLogs],
  );

  return (
    <DashboardLayout>
      <div dir="rtl" className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-fit"
              onClick={() => navigate("/companies")}
            >
              <ArrowRight className="mr-2 h-4 w-4" />
              العودة إلى الشركات
            </Button>
            <h1 className="text-3xl font-bold">
              {company?.name ? `تفاصيل ${company.name}` : "تفاصيل الشركة"}
            </h1>
            {company && (
              <p className="text-sm text-muted-foreground">
                الرصيد الحالي: {formatNumber(company.balance)} | الحد الأدنى:{" "}
                {formatNumber(company.balanceLimit)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="month" className="text-sm text-muted-foreground">
              الشهر
            </label>
            <input
              id="month"
              type="month"
              value={selectedMonth}
              onChange={(event) => setSelectedMonth(event.target.value)}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                إجمالي الصرف
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {formatNumber(summary?.totalSpentAmount || 0)}
              </span>
              <Coins className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                عدد العمليات
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {formatNumber(summary?.operationsCount || 0)}
              </span>
              <ListChecks className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                متوسط الصرف اليومي
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                {formatNumber(summary?.averageDailySpent || 0)}
              </span>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle>الاستهلاك اليومي خلال الشهر</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={chartMetric === "amount" ? "default" : "outline"}
                onClick={() => setChartMetric("amount")}
              >
                قيمة الصرف
              </Button>
              <Button
                variant={chartMetric === "count" ? "default" : "outline"}
                onClick={() => setChartMetric("count")}
              >
                عدد العمليات
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[320px] animate-pulse rounded-md bg-muted/50" />
            ) : isError ? (
              <div className="text-sm text-red-600">
                {(error as Error)?.message || "حدث خطأ أثناء تحميل بيانات الشركة"}
              </div>
            ) : (
              <div className="h-[320px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDateLabel} />
                    <YAxis allowDecimals={chartMetric === "amount"} />
                    <Tooltip />
                    <Bar
                      dataKey={chartMetric}
                      name={chartMetric === "amount" ? "قيمة الصرف" : "عدد العمليات"}
                      fill="#2563eb"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <DataTable
          title="آخر عمليات الصرف"
          description={`الشهر المحدد: ${selectedMonth}`}
          columns={[
            { key: "date", label: "التاريخ", sortable: true },
            { key: "amount", label: "المبلغ", sortable: true },
            { key: "number", label: "الرقم", sortable: true },
            { key: "port", label: "المنفذ", sortable: true },
            { key: "reason", label: "السبب", sortable: true },
          ]}
          data={recentLogsRows}
          searchable
          isLoading={isLoading}
          defaultPageSize={10}
        />

        <DataTable
          title="Recent Increase Operations"
          description={`Month: ${selectedMonth}`}
          columns={[
            { key: "date", label: "Date", sortable: true },
            { key: "amount", label: "Amount", sortable: true },
            { key: "number", label: "Number", sortable: true },
            { key: "port", label: "Port", sortable: true },
            { key: "reason", label: "Reason", sortable: true },
          ]}
          data={recentIncreaseRows}
          searchable
          isLoading={isLoading}
          defaultPageSize={10}
        />
      </div>
    </DashboardLayout>
  );
}

