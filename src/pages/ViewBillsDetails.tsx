import React from 'react'
import { useParams } from 'react-router';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/dashboard/DataTable';
import DetailsInputs from "@/components/customers/DetailsInputs";
import { Plus, RefreshCwIcon } from 'lucide-react';
import InvoiceForm from '@/components/products/InvoiceProduct';
import PopupForm from "@/components/ui/custom/PopupForm";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useRef } from "react";
import { Form } from 'react-router-dom';




export default function ViewBillsDetails() {
    const id = useParams().id;
    const [bill, setBill] = useState(null);
    const [items, setItems] = useState([]);
    const [addProduct, SetAddProduct] = useState(false);
    const [UpdateProduct, setUpdateProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [formTitle, setFormTitle] = useState("اضافة دفعة");
    const [paymentValue, setPaymentValue] = useState(0);
    const [paymentDate, setPaymentDate] = useState(dayjs());
    const [paymentDetails, setPaymentDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [printOnly, setPrintOnly] = useState(false);
    const tableRef = useRef(null);
    const [payments, setPayments] = useState([]);
    const daherUser = JSON.parse(localStorage.getItem("DaherUser"));
    const getCurrentDateTime = () => {
        const now = new Date();
        const options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return now.toLocaleDateString("en-GB", options as any);
    };

    const fetchBillDetails = async () => {
        try {
            const res = await axios.get(`https://paynet-1.onrender.com/api/invoice/viewBills/${id}`);
            setBill(res.data);
            setItems(res.data.items);
            setPayments(res.data.payments || []);
        } catch (err) {
            console.error(err);
        }
    };
    const handelDelete = async (itemId) => {
        try {
            const isConfirm = window.confirm('هل انت متاكد من حذف الفاتورة؟');
            if (!isConfirm) return;
            await axios.delete(`https://paynet-1.onrender.com/api/invoice/delete-bill-items/${id}/delete-item/${itemId}`);
            alert('تم حذف الفاتورة بنجاح');
            setItems(prev => prev.filter(item => item._id !== itemId));
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || 'حدث خطأ أثناء الحذف');
        }
    };
    useEffect(() => {
        fetchBillDetails();
    }, [id]);

    const apiBase = "https://paynet-1.onrender.com";

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${apiBase}/api/product/get-product`)

            setProducts(res.data)
        }
        catch (err) {
            console.log(err)
            alert(err?.response?.data?.message || 'حدث خطأ أثناء الحذف');

        }
    }
    const handelPayment = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await axios.post(`https://paynet-1.onrender.com/api/invoice/new-payment/${id}`, {
                amount: paymentValue,
                date: paymentDate,
                details: paymentDetails,
                FormTitle: formTitle,
            });
            alert('تم إضافة الدفعة بنجاح');
            setIsOpen(false);
            fetchBillDetails();
        } catch (err) {
            console.log(err);
            alert(err?.response?.data?.message || 'حدث خطأ أثناء إضافة الدفعة');
        }
        finally {
            setLoading(false);
        }


    }

    const handelDeletePayment = async (paymentId) => {
        try {
            const isConfirm = window.confirm('هل انت متاكد من حذف الدفعة؟');
            if (!isConfirm) return;
            await axios.delete(`https://paynet-1.onrender.com/api/invoice/delete-payment/${id}/delete-payment/${paymentId}`);
            alert('تم حذف الدفعة بنجاح');
            setPayments(prev => prev.filter(payment => payment._id !== paymentId));
        } catch (err) {
            console.error(err);
            alert(err?.response?.data?.message || 'حدث خطأ أثناء الحذف');
        }
    };




    const PaymentsColumns = [
        { key: "amount", label: "المبلغ" },
        { key: "details", label: "التفاصيل" },
        { key: "date", label: "التاريخ" },
    ];





    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <DashboardLayout>
            <PopupForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title={formTitle}
                trigger={<></>}
            >
                <div className="flex flex-row-reverse gap-2">
                    {/* تاكيد العمليه */}
                    {printOnly ? (
                        <></>
                    ) : (
                        <form onSubmit={handelPayment} className="space-y-4 w-2/3">
                            <Input
                                value={paymentValue}
                                onChange={(e) => setPaymentValue(Number(e.target.value))}
                                type="number"
                                placeholder="القيمة بالدولار"
                                required
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    className="w-full"
                                    label="اختر التاريخ"
                                    value={paymentDate}
                                    onChange={(newValue) => setPaymentDate(newValue as any)}
                                    format="DD/MM/YYYY" // ✅ هنا التنسيق الجديد
                                />
                            </LocalizationProvider>
                            <Input
                                value={paymentDetails}
                                onChange={(e) => setPaymentDetails(e.target.value)}
                                type="text"
                                placeholder="تفاصيل (اختياري)"
                            />
                            <button
                                disabled={loading ? true : false}
                                type="submit"
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                            >
                                {!loading ? "إرسال" : "جاري حفظ التعديلات ..."}
                            </button>
                        </form>
                    )}

                    {/* البيانات المطبوعة */}
                    <div ref={tableRef} className="p-4 text-sm" dir="rtl">
                        {/* رأس الفاتورة */}
                        <div className="header">
                            <h1>Daher.Net</h1>
                            <span>{getCurrentDateTime()}</span>
                        </div>

                        {/* معلومات المشترك */}
                        <div className="text-right font-bold mb-2">
                            <div>اسم المشترك: {bill?.customerName || "غير معروف"}</div>
                            <div>الرقم: {bill?.customerPhone || "غير معروف"}</div>
                        </div>

                        {/* تفاصيل الدفع */}
                        <div className="text-right mb-2">
                            <div className="font-semibold">التفاصيل:</div>
                            <div className="border p-1 rounded">
                                {paymentDetails || "بدون ملاحظات"}
                            </div>
                        </div>

                        {/* المبلغ */}
                        <div className="text-right totalValue mt-4">
                            <div className="text-lg font-extrabold border-t pt-2">
                                {formTitle == "اضافة دفعة"
                                    ? "المبلغ المدفوع"
                                    : "المبلغ المطلوب"}
                                : {paymentValue} دولار
                            </div>
                        </div>

                        {/* خط فاصل للطباعة */}
                        <div className="cut mt-4 border-t pt-2 text-center text-xs">
                            -- شكراً لثقتكم بخدماتنا --
                        </div>
                    </div>
                </div>
            </PopupForm>
            <div className="text-right" dir="rtl">

                <Card >
                    <CardHeader>
                        <CardTitle>المعلومات الأساسية</CardTitle>
                    </CardHeader>
                    <CardContent className="">
                        <DetailsInputs
                            customer={{ ...bill }}
                            setCustomer={setBill}
                        />

                        <div className="flex justify-start gap-2">
                            {daherUser.role == "admin" && (
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        setFormTitle("اضافة فاتورة");
                                        setPrintOnly(false);
                                        setIsOpen(true);
                                    }}
                                >
                                    <Plus className="w-4 h-4 ml-2" /> إضافة فاتورة
                                </Button>
                            )}
                            <Button
                                variant="default"
                                onClick={() => {
                                    setFormTitle("اضافة دفعة");
                                    setPrintOnly(false);
                                    setIsOpen(true);
                                }}
                            >
                                <Plus className="w-4 h-4 ml-2" /> إضافة دفعة
                            </Button>
                            <Button variant="outline" >
                                واتساب
                            </Button>

                            <Button variant="outline" >
                                <RefreshCwIcon />
                            </Button>
                        </div>

                    </CardContent>

                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {items.map((item, idx) => (


                        <Card key={item._id}>
                            <CardHeader>
                                <CardTitle>عنصر رقم {idx + 1}</CardTitle>
                                {UpdateProduct ? (
                                    <CardDescription><input type="text" value={item.name} onChange={(e) => setItems(items.map((i, index) => index === idx ? { ...i, name: e.target.value } : i))} /></CardDescription>
                                ) : (<CardDescription>{item.name}</CardDescription>)}
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <div className="flex justify-between">
                                    <span>السعر:</span>
                                    {UpdateProduct ? (
                                        <input type="number" value={item.price} onChange={(e) => setItems(items.map((i, index) => index === idx ? { ...i, price: Number(e.target.value) } : i))} />
                                    ) : (<span>{item.price} $</span>
                                    )}

                                </div>

                                <div className="flex justify-between">
                                    <span>الكمية:</span>
                                    {UpdateProduct ? (
                                        <input type="number" value={item.stock} onChange={(e) => setItems(items.map((i, index) => index === idx ? { ...i, stock: Number(e.target.value) } : i))} />
                                    ) : (<span>{item.stock}</span>
                                    )}
                                </div>

                                <div className="flex justify-between font-bold">
                                    <span>المجموع:</span>
                                    <span>{item.price * item.stock} $</span>
                                </div>
                            </CardContent>


                            <CardFooter className="flex justify-end gap-2">
                                {UpdateProduct ? (
                                    <Button
                                        size="sm" variant="accent"
                                        onClick={() => setUpdateProduct(false)}
                                    >
                                        حفظ التعديلات
                                    </Button>
                                ) :
                                    // (
                                    //     <Button
                                    //         size="sm" variant="default"
                                    //         onClick={() => setUpdateProduct(true)}
                                    //     >   تعديل العنصر
                                    //     </Button>
                                    // )}
                                    // {UpdateProduct ? (
                                    //     <Button
                                    //         size="sm" variant="destructive"
                                    //         onClick={() => setUpdateProduct(false)}
                                    //     >   الغاء التعديل
                                    //     </Button>

                                    // ) : 
                                    (
                                        <Button
                                            onClick={() => handelDelete(item._id)}
                                            size="sm" variant="destructive"
                                        >
                                            حذف العنصر
                                        </Button>

                                    )}

                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <div className="mt-4">
                    <Button variant='secondary' onClick={() => SetAddProduct(!addProduct)}>
                        {addProduct ? "إلغاء" : "اضافة عنصر جديد"}
                    </Button>

                    {addProduct && (
                        <InvoiceForm initialItems={items} products={products} />
                    )}
                </div>

                <DataTable
                    className='my-4'
                    title="الفواتير"
                    description="جميع الفواتير المسجلة"
                    columns={PaymentsColumns}
                    data={payments}
                    getRowClassName={(row) =>
                        row.FormTitle === "اضافة دفعة"
                            ? "text-green-500"
                            : "text-red-500"
                    }
                    renderRowActions = {(payment) => (
                        <div className="flex gap-2">
                            <Button onClick={() => handelDeletePayment(payment._id)} variant='destructive'>حذف</Button>
                        </div>
                    )}
                />


            </div>


        </DashboardLayout>
    )
}
