import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function ViewBills() {
    const [bills, setBills] = useState([]);

  const getBills = async ()=>{
    try{
      const res = await axios.get('https://paynet-1.onrender.com/api/invoice/viewBills');
      console.log(res.data);
      setBills(res.data);

    }catch(err){
      console.error(err);
    }
  }
  const handelDelete = async (id) => {
    try {
      const isConfirm = window.confirm('هل انت متاكد من حذف الفاتورة؟');
      if (!isConfirm) return;
      await axios.delete(`https://paynet-1.onrender.com/api/invoice/delete-bill/${id}`);
      toast.success('تم حذف الفاتورة بنجاح');
      setBills(prev => prev.filter(bill => bill._id !== id));
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'حدث خطأ أثناء الحذف');
    }
  };

  useEffect(()=>{getBills()} , [])
  const navigate = useNavigate();

return (
  <DashboardLayout>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bills.map((bill , idx ) => (
        <Card key={bill._id}>
          <CardHeader>
            <CardTitle>فاتورة : {bill.customerName}</CardTitle>
            <CardDescription>{idx + 1}</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="font-bold mb-2">
              المجموع: {bill.total} $
            </p>

            <div className="space-y-2">
              {bill.items.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-between text-sm border-b pb-1"
                >
                  <span>{item.name}</span>
                  <span>{item.price}$ × {item.stock}</span>
                </div>
              ))}
            </div>
          </CardContent>
<CardFooter className="flex items-center justify-between gap-2">
  {/* التاريخ */}
  <span className="text-xs text-muted-foreground">
    {new Date(bill.createdAt).toLocaleString()}
  </span>

  {/* الأزرار */}
  <div className="flex gap-2">
    <Button
      size="sm"
      onClick={() => navigate(`/viewBills/${bill._id}`)}
    >
      عرض
    </Button>

    <Button
      size="sm"
      variant="destructive"
      onClick={() => handelDelete(bill._id)}
    >
      حذف
    </Button>
  </div>
</CardFooter>

        </Card>
      ))}
    </div>
  </DashboardLayout>
);

}
