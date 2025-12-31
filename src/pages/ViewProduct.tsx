    import React from 'react'
    import { DashboardLayout } from '@/components/layout/DashboardLayout'
    import { DataTable } from '@/components/dashboard/DataTable';
    import { Button } from "@/components/ui/button";
    import UpdateProduct from '@/components/products/UpdateProduct'
    import { Eye, Trash , Loader2} from "lucide-react";
    import { useState, useEffect } from 'react';
    import axios from 'axios';

    export default function ViewProduct() {
        const [products, setProducts] = useState([])
        const [deletingId, setDeletingId] = useState(null);
        const [selectedProduct , setSelectedProduct] = useState(null);  

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
                <DataTable
                    title="Products"
                    description="All available products"
                    columns={columns}
                    data={products}
                    renderRowActions={(row) => (
                        <div className="flex gap-2">
                            <Button
                            onClick={()=> setSelectedProduct(row)}
                            size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                            </Button>
                            <Button   
                                onClick={() => fetchDelete(row._id)}
                                size="sm"
                                    variant="destructive"
                                    disabled={deletingId === row._id}

                                    
                                    >

                                {deletingId ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>

                                ) : (<Trash className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                    )}
                />
            </DashboardLayout>
        )
    }
