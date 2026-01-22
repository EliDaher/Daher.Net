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


export default function ViewBillsDetails() {
    const id = useParams().id;
    const [bill, setBill] = useState(null);
    const [items, setItems] = useState([]);
    const [addProduct, SetAddProduct] = useState(false);
    const [UpdateProduct, setUpdateProduct] = useState(false);
    const daherUser = JSON.parse(localStorage.getItem("DaherUser"));

    const fetchBillDetails = async () => {
        try {
            const res = await axios.get(`https://paynet-1.onrender.com/api/invoice/viewBills/${id}`);
            setBill(res.data);
            setItems(res.data.items);
        } catch (err) {
            console.error(err);
        }
    };
    const handelDelete = async (itemId) => {
        try {
            const isConfirm = window.confirm('هل انت متاكد من حذف الفاتورة؟');
            if (!isConfirm) return;
            await axios.delete(`https://paynet-1.onrender.com/api/invoice/delete-bill-items/${id}/delete-item/${itemId}` );
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

    const addPatch = async () => {
        try {
            const res = await axios.post(`https://paynet-1.onrender.com/api/invoice/add-bill-items/${id}`);
        }
        catch (err) {
        }

    };

    return (
        <DashboardLayout>
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

                                >
                                    <Plus className="w-4 h-4 ml-2" /> إضافة فاتورة
                                </Button>
                            )}
                            <Button
                                variant="default"
                                onClick={()=> {}}

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
                                ) : (
                                    <Button
                                        size="sm" variant="default"
                                        onClick={() => setUpdateProduct(true)}
                                    >   تعديل العنصر
                                    </Button>
                                )}
                                {UpdateProduct ? (
                                    <Button
                                        size="sm" variant="destructive"
                                        onClick={() => setUpdateProduct(false)}
                                    >   الغاء التعديل
                                    </Button>

                                ) : (
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
        <InvoiceForm initialItems={items} />
    )}
</div>

                <DataTable
                    className='my-4'
                    title="الفواتير"
                    description="جميع الفواتير المسجلة"
                    columns={[]}
                    data={[]}
                />


            </div>


        </DashboardLayout>
    )
}
