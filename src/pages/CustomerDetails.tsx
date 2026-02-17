import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Plus, Printer } from "lucide-react";
import { getCustomerById, getTransactionsForCustomer } from "../services/wifi";
import DetailsInputs, { Customer } from "@/components/customers/DetailsInputs";
import { useReactToPrint } from "react-to-print";
import { DataTable } from "@/components/dashboard/DataTable";
import { useQuery } from "@tanstack/react-query";
import CustomerPaymentForm from "@/components/customers/CustomerPaymentForm";
import { toast } from "sonner";

export default function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const pppData = location.state as any;

  const daherUser = JSON.parse(localStorage.getItem("DaherUser") || "{}");

  const [isOpen, setIsOpen] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [printOnly, setPrintOnly] = useState(false);

  const [editedCustomer, setEditedCustomer] = useState<Customer | null>(null);

  /* ================= FETCH CUSTOMER ================= */

  const { data: customer, isLoading: customerLoading } = useQuery({
    queryKey: ["customer", id],
    queryFn: () => getCustomerById(id as string),
    enabled: !!id,
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ["transactions", id],
    queryFn: () => getTransactionsForCustomer(id as string),
    enabled: !!id,
  });

  /* ================= INIT EDITED CUSTOMER ================= */

  useEffect(() => {
    if (customer) {
      setEditedCustomer({
        ...customer,
        address: pppData?.address || "",
      });
    }
  }, [customer, pppData]);

  /* ================= WHATSAPP ================= */

  const handleWhatsApp = () => {
    if (!customer?.Contact) {
      toast.error("لا يوجد رقم هاتف للمشترك");
      return;
    }

    if (customer.Balance >= 0) {
      toast.error("لا يوجد عليه فواتير");
      return;
    }

    const phone = customer.Contact.replace(/\D/g, "");
    const message = `عزيزي المشترك ${customer.Name}، قيمة فاتورتك الحالية هي: ${
      customer.Balance * -1
    } دولار.
يرجى التسديد قبل تاريخ 5-2-2026 لضمان استمرار الخدمة دون انقطاع.
شكرًا لثقتك بخدماتنا.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  /* ================= PRINT ================= */

  const tableRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    pageStyle: `
      @page { size: 80mm auto; margin: 0; }
      body {
        font-family: Arial;
        font-size: 12px;
        direction: rtl;
      }
      .no-print { display: none !important; }
    `,
    onAfterPrint: () => setIsOpen(false),
  });

  useEffect(() => {
    if (isOpen && printOnly) {
      handlePrint();
    }
  }, [isOpen, printOnly, handlePrint]);

  /* ================= LOADING ================= */

  if (customerLoading || !editedCustomer) {
    return (
      <DashboardLayout>
        <Skeleton className="h-64 w-full" />
      </DashboardLayout>
    );
  }

  /* ================= TABLE ================= */

  const PaymentsColumns = [
    { key: "amount", label: "الكمية", sortable: true },
    { key: "Details", label: "التفاصيل", sortable: true },
    { key: "date", label: "الوقت", sortable: true },
  ];

  /* ================= RENDER ================= */

  return (
    <DashboardLayout>
      <CustomerPaymentForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formTitle={formTitle}
        customer={{
          ...customer,
          address: pppData?.address || "",
        }}
      />

      <div className="space-y-6" dir="rtl">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">بيانات المشترك</h1>
          <Button onClick={() => navigate("/users")} variant="outline">
            <ArrowLeft className="ml-2 w-4 h-4" /> رجوع
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>المعلومات الأساسية</CardTitle>
          </CardHeader>
          <CardContent>
            <DetailsInputs
              customer={editedCustomer}
              setCustomer={setEditedCustomer}
            />
          </CardContent>
        </Card>

        <div className="flex justify-start gap-2">
          {daherUser.role === "admin" && (
            <Button
              variant="destructive"
              onClick={() => {
                setFormTitle("اضافة فاتورة");
                setPrintOnly(false);
                setIsOpen(true);
              }}
            >
              <Plus className="w-4 h-4 ml-2" /> اصدار فاتورة
            </Button>
          )}

          <Button
            onClick={() => {
              setFormTitle("اضافة دفعة");
              setPrintOnly(false);
              setIsOpen(true);
            }}
          >
            <Plus className="w-4 h-4 ml-2" /> إضافة دفعة
          </Button>

          <Button variant="outline" onClick={handleWhatsApp}>
            واتساب
          </Button>
        </div>

        <Card className="overflow-x-auto" ref={tableRef}>
          {transactions?.length === 0 ? (
            <p className="text-muted-foreground text-center">
              لا توجد معاملات حالياً.
            </p>
          ) : (
            <DataTable
              title="البيان المالي"
              columns={PaymentsColumns}
              data={transactions || []}
              defaultPageSize={5}
              getRowClassName={(row) =>
                row.type !== "payment" ? "text-red-500" : "text-green-500"
              }
              renderRowActions={(tx) => (
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormTitle(
                      tx.type === "payment" ? "اضافة دفعة" : "اضافة فاتورة",
                    );
                    setPrintOnly(true);
                    setIsOpen(true);
                  }}
                >
                  <Printer />
                </Button>
              )}
              isLoading={transactionsLoading}
            />
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
}
