import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import UpdateProduct from "@/components/products/UpdateProduct";
import { Eye, Trash, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import Invoice from "@/components/invoices/Invoice";
import AddPosProduct from "../components/products/AddProduct";

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [invoice, setInvoice] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const columns = [
    { key: "name", label: "اسم المنتج", sortable: true },
    { key: "price", label: "سعر المبيع", sortable: true },
    { key: "priceCost", label: "سعر الشراء", sortable: true },
    { key: "priceWolesale", label: "سعر الجملة", sortable: true },
    { key: "category", label: "الصنف" },
    { key: "stock", label: "المستودع" },
    { key: "description", label: "الوصف" },
    { key: "imageUrl", label: "رابط الصورة" },
  ];
  const apiBase = "https://paynet-1.onrender.com";

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${apiBase}/api/product/get-product`);
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "حدث خطأ أثناء الحذف");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchDelete = async (id) => {
    try {
      const isConfirm = window.confirm("هل انت متاكد من حذف المنتج");
      if (!isConfirm) return;
      setDeletingId(id);

      await axios.delete(`${apiBase}/api/product/delete-product/${id}`);
      alert("تم حذف المنتج بنجاح");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "حدث خطأ أثناء الحذف");
    } finally {
      setDeletingId(null);
    }
  };

  const startInvoiceCreation = () => {
    if (!invoice) {
      alert("يمكنك الان البدء في انشاء فاتورة جديدة");
    } else {
      alert("تم إلغاء إنشاء الفاتورة");
    }
    setInvoice(!invoice);
  };
  const addToInvoice = (product) => {
    setInvoiceItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        // إذا كان موجودًا ➜ زِد الكمية
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // إذا لم يكن موجودًا ➜ أضفه
      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          priceCost: product.priceCost,
          priceWolesale: product.priceWolesale,
          quantity: 1,
        },
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
            setProducts((prev) =>
              prev.map((p) =>
                p._id === updatedProduct._id ? updatedProduct : p,
              ),
            );
            setSelectedProduct(null);
          }}
        />
      )}
      <div className="mb-8 p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex text-right flex-col md:flex-row-reverse md:items-center md:justify-between gap-4">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              إنشاء فاتورة جديدة
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              قم بإنشاء فاتورة للعملاء بسهولة
            </p>
          </div>

          <div
            className="flex flex-col gap-2"
          >
            <AddPosProduct isOpen={isOpen} setIsOpen={setIsOpen} />

            {/* Action Button */}
            <Button variant="outline" onClick={() => startInvoiceCreation()}>
              {invoice ? "إلغاء الفاتورة" : "إنشاء فاتورة"}

              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {invoice ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M12 5v14M5 12h14" />
                )}
              </svg>
            </Button>
          </div>
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
                  size="sm"
                  variant="outline"
                >
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
      {invoice && <Invoice items={invoiceItems} setItems={setInvoiceItems} />}
    </DashboardLayout>
  );
}
