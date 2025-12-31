import AddCompanyForm from "@/components/companies/AddCompanyForm";
import CompanyIncreaseForm from "@/components/companies/CompanyIncreasForm";
import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompaniesContext } from "@/contexts/CompaniesProvider";
import { LayoutGrid, Table } from "lucide-react";
import { useEffect, useState } from "react";

export default function Companies() {
  const { data: companies, isLoading } = useCompaniesContext();

  const [isOpen, setIsOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  const [openId, setOpenId] = useState<string | null>(null);

  const companiesColumns = [
    { key: "name", label: "الشركة", sortable: true },
    { key: "balance", label: "الرصيد", sortable: true },
    { key: "balanceLimit", label: "الحد الادنى للرصيد", sortable: true },
    { key: "lastUpdate", label: "اخر عملية", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div dir="rtl">
        <AddCompanyForm isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Header */}
        <div className="mb-10 flex flex-col items-center md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">الشركات</h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant={viewMode === "cards" ? "default" : "outline"}
              onClick={() => setViewMode("cards")}
            >
              <LayoutGrid className="w-4 h-4 mr-2" />
              عرض كبطاقات
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              onClick={() => setViewMode("table")}
            >
              <Table className="w-4 h-4 mr-2" />
              عرض كجدول
            </Button>
          </div>
        </div>

        <div
          dir="rtl"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {!isLoading && viewMode === "cards" ? (
            !companies ? [] : companies?.map((company) => (
              <Card
                dir="rtl"
                key={company.id}
                className={`
                  hover:shadow-lg
                  transition-shadow
                  duration-300
                  ${company.balance < company.balanceLimit ? "border-destructive border-2" : "border-accent-500 border-2"}  
                `}
              >
                <CardHeader>
                  <CardTitle>
                    <h3 className="text-xl font-bold mb-2">{company.name}</h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>الرصيد: {company.balance}</p>
                  <p>الحد الادنى للرصيد: {company.balanceLimit}</p>
                  <p>
                    اخر عملية:{" "}
                    {new Date(company.lastUpdate).toLocaleString("en-GB")}
                  </p>
                </CardContent>

                <CardFooter>
                  <CompanyIncreaseForm
                    companyId={company.id}
                    companyName={company.name}
                    isOpen={openId === company.id}
                    setIsOpen={(value) => {
                      if (value) {
                        setOpenId(company.id); // فتح
                      } else {
                        setOpenId(null); // إغلاق
                      }
                    }}
                  />
                </CardFooter>
              </Card>
            ))
          ) : (
            <DataTable
              title=""
              data={companies ? companies : []}
              columns={companiesColumns}
              getRowClassName={(row) =>
                row.balance < row.balanceLimit
                  ? "bg-red-100 dark:bg-red-900"
                  : "bg-accent-900 dark:bg-accent-100"
              }
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
