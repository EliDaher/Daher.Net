import React from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { DataTable } from '@/components/dashboard/DataTable';
import { Button } from "@/components/ui/button";
import UpdateProduct from '@/components/products/UpdateProduct'
import { Eye, Trash, Loader2 } from "lucide-react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Invoice from "@/components/invoices/Invoice";

export default function ViewProduct() {
    const [products, setProducts] = useState([])
    const [deletingId, setDeletingId] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [invoice, setInvoice] = useState(false);
    const [invoiceItems, setInvoiceItems] = useState([]);


    const columns = [
        { key: "name", label: "Name", sortable: true },
        { key: "price", label: "Price", sortable: true },
        { key: "category", label: "Category" },
        { key: "stock", label: "Stock" },
        { key: "description", label: "Description" },
        { key: "imageUrl", label: "ImageUrl" },

    ];
    const apiBase = "https://paynet-1.onrender.com";

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`${apiBase}/api/product/get-product`)
            console.log(res.data)
            setProducts(res.data)
        }
        catch (err) {
            console.log(err)
            alert(err?.response?.data?.message || 'حدث خطأ أثناء الحذف');

        }
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const fetchDelete = async (id) => {
        try {
            const isConfirm = window.confirm('هل انت متاكد من حذف المنتج')
            if (!isConfirm) return
            setDeletingId(id)


            await axios.delete(`${apiBase}/api/product/delete-product/${id}`)
            alert('تم حذف المنتج بنجاح');
            setProducts(prev => prev.filter(p => p._id !== id));

        } catch (err) {
            console.log(err)
            alert(err?.response?.data?.message || 'حدث خطأ أثناء الحذف');


        } finally {
            setDeletingId(null)
        }
    }

    const startInvoiceCreation = () => {
        if (!invoice) {

            alert('يمكنك الان البدء في انشاء فاتورة جديدة')
        } else {
            alert('تم إلغاء إنشاء الفاتورة')
        }
        setInvoice(!invoice);
    }
const addToInvoice = (product) => {
  setInvoiceItems(prev => {
    const existing = prev.find(item => item._id === product._id);

    if (existing) {
      // إذا كان موجودًا ➜ زِد الكمية
      return prev.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    // إذا لم يكن موجودًا ➜ أضفه
    return [
      ...prev,
      {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    ];
  });
};


    return (
        <DashboardLayout>
            {selectedProduct && (
                <UpdateProduct
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onUpdated={(updatedProduct) => {
                        setProducts(prev =>
                            prev.map(p => p._id === updatedProduct._id ? updatedProduct : p)
                        );
                        setSelectedProduct(null);
                    }}
                />
            )}
            <div className="mb-8 p-6  rounded-lg border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">إنشاء فاتورة جديدة</h1>
                        <p className="text-gray-600 text-sm">قم بإنشاء فاتورة للعملاء بسهولة</p>
                    </div>
                    <Button
                        onClick={() => startInvoiceCreation()}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-2 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
                    >
                        {invoice ? "إلغاء" : "انشاء فاتورة"}
                    </Button>
                </div>
            </div>


            <DataTable

                title="Products"
                description="All available products"
                columns={columns}
                data={products}
                renderRowActions={(product) => (
                    <div className="flex gap-2">
                        {invoice ? (
                            <Button
                                onClick={() => addToInvoice(product)}
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                            >
                                إضافة إلى الفاتورة
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => setSelectedProduct(product)}
                                    size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                    onClick={() => fetchDelete(product._id)}
                                    size="sm"
                                    variant="destructive"
                                    disabled={deletingId === product._id}
                                >
                                    {deletingId ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        <Trash className="h-4 w-4" />
                                    )}
                                </Button>
                            </>
                        )}
                    </div>
                )}
            />
            {invoice && (
  <Invoice
    items={invoiceItems}
    setItems={setInvoiceItems}
  />
)}

        </DashboardLayout>
    )
}
