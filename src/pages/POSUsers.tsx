import { DataTable } from "@/components/dashboard/DataTable";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import PopupForm from "@/components/ui/custom/PopupForm";
import { Input } from "@/components/ui/input";
import getPOSUsers, {
  addPOSPayment,
  addPOSUser,
  AddNewUser,
  deleteUser,
  endPOSDebt,
  getPOSBalanceReport,
  getPOSDebt,
} from "@/services/pos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import AddUser from '@/components/invoices/AddUser'

export default function POSUsers() {
  const [amount, setAmount] = useState(0);
  const [openUserId, setOpenUserId] = useState(null);
  const [openUserId2, setOpenUserId2] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: "",
    agent: "",
    owner: "",
    password: "",
    number: "",
    createdAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { data: posReport, isLoading: posReportLoading } = useQuery({
    queryKey: ["POSReport-table"],
    queryFn: getPOSBalanceReport,
  });

  useEffect(() => {
    console.log(posReport);
  }, [posReport]);
  
  const { data: posData, isLoading: posLoading } = useQuery({
    queryKey: ["POSUsers-table"],
    queryFn: getPOSUsers,
  });

  const { data: debtData, isLoading: debtLoading } = useQuery({
    queryKey: ["POSdebt-table"],
    queryFn: getPOSDebt,
  });

  const mutation = useMutation({
    mutationFn: addPOSPayment,
    onSuccess: () => {
      alert("تمت إضافة الدفعة.");
      queryClient.invalidateQueries({
        queryKey: ["POSdebt-table"],
      });
      setOpenUserId(null);
      setAmount(0);
    },
    onError: () => {
      alert("حدث خطأ أثناء الإرسال.");
    },
  });

  const endDebtMutation = useMutation({
    mutationFn: endPOSDebt,
    onSuccess: () => {
      alert("تم انهاء الدين.");
      queryClient.invalidateQueries({
        queryKey: ["POSdebt-table"],
      });
      setOpenUserId(null);
      setAmount(0);
    },
    onError: () => {
      alert("حدث خطأ أثناء الإرسال.");
    },
  });

  const addPoint = useMutation({
    mutationFn: addPOSUser,
    onSuccess: () => {
      alert("تم اضافة نقطة البيع.");
      queryClient.invalidateQueries({
        queryKey: ["POSUsers-table"],
      });
      setOpenUserId(null);
      setAmount(0);
    },
    onError: () => {
      alert("حدث خطأ أثناء الإرسال.");
    },
  });


  const deleteUsers = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("تم حذف المستخدم بنجاح.");
      queryClient.invalidateQueries({
        queryKey: ["POSUsers-table"],
      });
      setOpenUserId(null);
      setAmount(0);
    },
    onError: () => {
      alert("حدث خطأ أثناء الإرسال.");
    },
  });

  const addUserMutation = useMutation({
    mutationFn: AddNewUser,
    onSuccess: () => {
      alert("تم إضافة المستخدم بنجاح.");
      queryClient.invalidateQueries({
        queryKey: ["POSUsers-table"],
      });
      setOpenAdd(false);
    },
    onError: () => {
      alert("حدث خطأ أثناء إضافة المستخدم.");
    },
  });



  const posReportColumns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "name", label: "الاسم", sortable: true },
    { key: "email", label: "البريد الإلكتروني", sortable: true },
    { key: "confirmedDeposits", label: "الايداعات المؤكدة", sortable: true },
    { key: "expensesPaid", label: "المصاريف المدفوعة", sortable: true },
    { key: "netBalance", label: "الرصيد الصافي", sortable: true },
    { key: "POSbalance", label: "الميزانية", sortable: true },
    { key: "balance", label: "الرصيد", sortable: true },
    { key: "expensesInProgress", label: "المصاريف الجارية", sortable: true },
    { key: "totalDeposits", label: "إجمالي الإيداعات", sortable: true },
    { key: "finalBalance", label: "الرصيد النهائي", sortable: true },
    { key: "unconfirmedDeposits", label: "الايداعات المرفوضة", sortable: true },
    { key: "expensesUnpaid", label: "المصاريف غير المدفوعة", sortable: true },
    { key: "totalExpenses", label: "إجمالي المصاريف", sortable: true },
  ];


  const posColumns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "name", label: "الاسم", sortable: true },
    { key: "email", label: "email", sortable: true },
    { key: "password", label: "كلمة السر", sortable: true },
    { key: "role", label: "الصلاحية", sortable: true },
    { key: "balance", label: "الرصيد", sortable: true },
    { key: "number", label: "الرقم", sortable: true },
  ];

  const debtColumns = [
    { key: "_id", label: "المعرف", sortable: true, hidden: true },
    { key: "destination", label: "الوجهة", sortable: true },
    { key: "name", label: "الاسم", sortable: true },
    { key: "number", label: "الرقم", sortable: true },
    { key: "operator", label: "المنفذ", sortable: true },
    { key: "amount", label: "الكمية", sortable: true },
    { key: "date", label: "التاريخ", sortable: true },
  ];

  const totalDebt = useMemo(() => {
    return debtData?.reduce((sum, c) => sum + Number(c.amount), 0) ?? 0;
  }, [debtData]);

  const totalBalances = useMemo(() => {
    return posData?.reduce((sum, c) => sum + Number(c.balance), 0) ?? 0;
  }, [posData]);

  if (posLoading || debtLoading) {
    return (
      <DashboardLayout>
        <div dir="rtl" className="space-y-6 text-center text-lg font-semibold">
          جارِ تحميل البيانات...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div dir="rtl" className="grid gap-4 grid-cols-1">
        <PopupForm
        title="اضافة مستخدم جديد"
        trigger= {<Button>اضافة مستخدم جديد</Button>}
        isOpen={openAdd}
        setIsOpen={setOpenAdd}
        
        >
          <AddUser onSubmit={(userData) => addUserMutation.mutate(userData)} />
        </PopupForm>
        
        <DataTable
          title="نقاط البيع"
          description={totalBalances.toFixed(0) + " ل.س مجموع أرصدة نقاط البيع"}
          columns={posColumns}
          data={posData}
          renderRowActions={(row) => (
            <div className="flex gap-2">
              <PopupForm
                title="اضافة دفعة لنقطة البيع"
                trigger={<Button variant="accent">اضافة دفعة</Button>}
                isOpen={openUserId === row._id}
                setIsOpen={(open) => setOpenUserId(open ? row._id : null)}
              >
                <div>
                  <form
                    className="gap-4 flex flex-col"
                    onSubmit={(e) => {
                      e.preventDefault();
                      mutation.mutate({ id: openUserId, amount });
                    }}
                  >
                    <Input
                      readOnly={true}
                      value={
                        row.name ? row.name + "  //  " + row.email : row.email
                      }
                      title="نقطة البيع"
                    ></Input>

                    <Input
                      value={amount}
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                      }}
                      type="number"
                      title="قيمة الدفعة"
                    ></Input>

                    <Button>
                      {mutation.isPending ? "جاري التاكيد ..." : "تأكيد"}
                    </Button>
                  </form>
                </div>
              </PopupForm>
              <PopupForm
                title="إضافة نقطة بيع"
                trigger={<Button>اضافة نقطة بيع فرعية</Button>}
                isOpen={openUserId2 === row._id}
                setIsOpen={(open) => setOpenUserId2(open ? row._id : null)}
              >
                <div>
                  <form
                    className="gap-4 flex flex-col"
                    onSubmit={(e) => {
                      e.preventDefault();
                      addPoint.mutate({ formData: formData, email: row.email });
                    }}
                  >
                    <Input
                      type="text"
                      name="username"
                      placeholder="اسم المستخدم"
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    <Input
                      type="text"
                      name="password"
                      placeholder="كلمة المرور"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    <Input
                      type="text"
                      name="number"
                      placeholder="رقم الخليوي"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />
                    <Input
                      type="text"
                      name="agent"
                      placeholder="الوكيل"
                      value={row.email}
                      readOnly
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />

                    <Input
                      type="text"
                      name="owner"
                      placeholder="اسم صاحب النقطة"
                      value={formData.owner}
                      onChange={handleChange}
                      className="w-full border px-3 py-2 rounded"
                    />

                    <Button>
                      {mutation.isPending ? "جاري التاكيد ..." : "تأكيد"}
                    </Button>
                  </form>
                </div>
              </PopupForm>
              <Button onClick={()=> {deleteUsers.mutate({id: row._id})}} variant="destructive">حذف نقطة البيع</Button>
            </div>
            
          )}
          
        />
        

        <DataTable
          title="ديون نقاط البيع"
          description={totalDebt}
          columns={debtColumns}
          data={debtData}
          renderRowActions={(row) => {
            return (
              <>
                <Button
                  disabled={endDebtMutation.isPending}
                  onClick={() => {
                    window.confirm("هل انت متأكد من العملية ؟") &&
                      endDebtMutation.mutate({
                        id: row._id,
                        email: row.email,
                        amount: row.amount,
                      });
                  }}
                >
                  {endDebtMutation.isPending
                    ? "جاري الانهاء..."
                    : "انهاء الدين"}
                </Button>
              </>
            );
          }}
        />

        <DataTable
          title="تقرير عمليات النقاط"
          data={
            posReport?.map((row) => ({
              ...row,
              POSbalance:
                row.confirmedDeposits - row.expensesPaid - row.netBalance,
            })) || []
          }
          columns={posReportColumns}
          isLoading={posReportLoading}
          getRowClassName={(row) => 
            row.POSbalance != 0 ? 'bg-destructive/20' : 'bg-green-500/20'
          }
        />
      </div>
    </DashboardLayout>
  );
}
