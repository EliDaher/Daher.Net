import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Copy, Loader2, Pencil, RefreshCw, Trash } from "lucide-react";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import UpdateProduct from "@/components/products/UpdateProduct";
import AddPosProduct from "@/components/products/AddProduct";
import Invoice from "@/components/invoices/Invoice";
import { toast } from "sonner";

type Product = {
  _id: string;
  name: string;
  price: number;
  priceCost: number;
  priceWolesale: number;
  category: string;
  stock: number;
  description?: string;
  imageUrl?: string;
};

type InvoiceItem = {
  _id: string;
  name: string;
  price: number;
  priceCost: number;
  priceWolesale: number;
  quantity: number;
};

const apiBase = "https://paynet-1.onrender.com";

export default function ViewProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [invoice, setInvoice] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isRefreshingProducts, setIsRefreshingProducts] = useState(false);

  const columns = [
    { key: "name", label: "اسم المنتج", sortable: true },
    { key: "price", label: "سعر البيع", sortable: true },
    { key: "priceCost", label: "سعر الشراء", sortable: true, onlyAdmin: true },
    { key: "priceWolesale", label: "سعر الجملة", sortable: true, onlyAdmin: true },
    { key: "category", label: "الصنف" },
    { key: "stock", label: "المستودع" },
    { key: "description", label: "الوصف" },
    { key: "imageUrl", label: "رابط الصورة" },
  ];

  const fetchProduct = useCallback(async (silent = false) => {
    try {
      if (silent) {
        setIsRefreshingProducts(true);
      } else {
        setIsLoadingProducts(true);
      }

      const res = await axios.get<Product[]>(`${apiBase}/api/product/get-product`);
      setProducts(res.data);
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء جلب المنتجات");
    } finally {
      if (silent) {
        setIsRefreshingProducts(false);
      } else {
        setIsLoadingProducts(false);
      }
    }
  }, []);

  useEffect(() => {
    void fetchProduct();
  }, [fetchProduct]);

  const fetchDelete = async (id: string) => {
    try {
      const isConfirm = window.confirm("هل أنت متأكد من حذف المنتج؟");
      if (!isConfirm) return;

      setDeletingId(id);
      await axios.delete(`${apiBase}/api/product/delete-product/${id}`);

      toast.success("تم حذف المنتج بنجاح");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      console.log(err);
      toast.error(err?.response?.data?.message || "حدث خطأ أثناء الحذف");
    } finally {
      setDeletingId(null);
    }
  };

  const startInvoiceCreation = () => {
    if (!invoice) {
      toast.success("يمكنك الآن البدء في إنشاء فاتورة جديدة");
    } else {
      setInvoiceItems([]);
      toast.warning("تم إلغاء إنشاء الفاتورة");
    }

    setInvoice((prev) => !prev);
  };

  const addToInvoice = (product: Product) => {
    if (Number(product.stock) <= 0) {
      toast.warning("هذا المنتج غير متوفر في المخزن");
      return;
    }

    setInvoiceItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        if (existing.quantity >= Number(product.stock)) {
          toast.warning("لا يمكن تجاوز كمية المخزون");
          return prev;
        }

        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

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

  const productsCount = products.length;
  const lowStockCount = useMemo(
    () => products.filter((product) => Number(product.stock) > 0 && Number(product.stock) <= 5).length,
    [products],
  );

  const handleProductDialogOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      setSelectedProduct(null);
      void fetchProduct(true);
    }
  };

  return (
    <DashboardLayout>
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdated={(updatedProduct: Product) => {
            setProducts((prev) =>
              prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p)),
            );
            setSelectedProduct(null);
            void fetchProduct(true);
          }}
        />
      )}

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 text-right md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">المنتجات المتاحة</h1>
            <p className="mt-1 text-sm text-gray-500">قم بإدارة المنتجات وإنشاء فاتورة بيع بسهولة</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                إجمالي المنتجات: {productsCount}
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                مخزون منخفض: {lowStockCount}
              </span>
              {invoice && (
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                  عناصر الفاتورة: {invoiceItems.length}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <AddPosProduct
              isOpen={isOpen}
              setIsOpen={handleProductDialogOpenChange}
              product={selectedProduct}
            />

            <Button
              variant="outline"
              onClick={() => void fetchProduct(true)}
              disabled={isRefreshingProducts || isLoadingProducts}
            >
              {isRefreshingProducts ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              تحديث المنتجات
            </Button>

            <Button variant="outline" onClick={startInvoiceCreation}>
              {invoice ? "إلغاء الفاتورة" : "إنشاء فاتورة"}

              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {invoice ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M12 5v14M5 12h14" />}
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
        isLoading={isLoadingProducts}
        renderRowActions={(product: Product) => (
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
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsOpen(true);
                  }}
                  size="sm"
                  variant="outline"
                  title="نسخ المنتج كمدخل جديد"
                >
                  <Copy className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => setSelectedProduct(product)}
                  size="sm"
                  variant="outline"
                  title="تعديل بيانات المنتج"
                >
                  <Pencil className="h-4 w-4" />
                </Button>

                <Button
                  onClick={() => fetchDelete(product._id)}
                  size="sm"
                  variant="destructive"
                  disabled={deletingId === product._id}
                >
                  {deletingId === product._id ? (
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
