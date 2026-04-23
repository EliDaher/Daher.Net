import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import PopupForm from "@/components/ui/custom/PopupForm";
import FormInput from "@/components/ui/custom/FormInput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LocalizedInputs } from "@/components/store/LocalizedInputs";
import { storeApi } from "@/services/store";
import type { LocalizedText, StoreProduct, StoreProductType } from "@/types/store";

type ProductForm = {
  name: LocalizedText;
  description: LocalizedText;
  type: StoreProductType;
  imageUrl: string;
  priceSell: string;
  priceCost: string;
  priceWholesale: string;
  stock: string;
  categoryId: string;
  brandId: string;
  isPublished: boolean;
  isFeatured: boolean;
};

const initialForm: ProductForm = {
  name: { ar: "", en: "" },
  description: { ar: "", en: "" },
  type: "product",
  imageUrl: "",
  priceSell: "0",
  priceCost: "0",
  priceWholesale: "0",
  stock: "0",
  categoryId: "",
  brandId: "",
  isPublished: false,
  isFeatured: false,
};

function toNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toForm(product: StoreProduct): ProductForm {
  return {
    name: product.name,
    description: product.description,
    type: product.type,
    imageUrl: product.imageUrl || "",
    priceSell: String(product.priceSell ?? 0),
    priceCost: String(product.priceCost ?? 0),
    priceWholesale: String(product.priceWholesale ?? 0),
    stock: String(product.stock ?? 0),
    categoryId: product.categoryId || "",
    brandId: product.brandId || "",
    isPublished: Boolean(product.isPublished),
    isFeatured: Boolean(product.isFeatured),
  };
}

export default function StoreProducts() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);
  const [form, setForm] = useState<ProductForm>(initialForm);

  const productsQuery = useQuery({
    queryKey: ["store-products"],
    queryFn: () => storeApi.listProducts(),
  });

  const categoriesQuery = useQuery({
    queryKey: ["store-categories-active"],
    queryFn: () => storeApi.listCategories({ isActive: true }),
  });

  const brandsQuery = useQuery({
    queryKey: ["store-brands-active"],
    queryFn: () => storeApi.listBrands({ isActive: true }),
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        name: form.name,
        description: form.description,
        type: form.type,
        imageUrl: form.imageUrl,
        priceSell: toNumber(form.priceSell),
        priceCost: toNumber(form.priceCost),
        priceWholesale: toNumber(form.priceWholesale),
        stock: toNumber(form.stock),
        categoryId: form.categoryId,
        brandId: form.brandId,
        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
      };

      if (editingProduct) {
        return storeApi.updateProduct(editingProduct.id, payload);
      }

      return storeApi.createProduct(payload);
    },
    onSuccess: () => {
      toast.success(editingProduct ? "تم تعديل المنتج" : "تم إنشاء المنتج");
      setIsModalOpen(false);
      setEditingProduct(null);
      setForm(initialForm);
      queryClient.invalidateQueries({ queryKey: ["store-products"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل حفظ المنتج");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => storeApi.deleteProduct(id),
    onSuccess: () => {
      toast.success("تم حذف المنتج");
      queryClient.invalidateQueries({ queryKey: ["store-products"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل حذف المنتج");
    },
  });

  const publishMutation = useMutation({
    mutationFn: ({ id, isPublished }: { id: string; isPublished: boolean }) =>
      storeApi.setProductPublish(id, isPublished),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-products"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث حالة النشر");
    },
  });

  const stockMutation = useMutation({
    mutationFn: ({ id, delta }: { id: string; delta: number }) =>
      storeApi.updateProductStock(id, { delta }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-products"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تعديل المخزون");
    },
  });

  const rows = useMemo(
    () =>
      (productsQuery.data || []).map((item) => ({
        ...item,
        nameAr: item.name.ar,
        nameEn: item.name.en,
        typeLabel: item.type === "service" ? "Service" : "Product",
        publishedLabel: item.isPublished ? "Published" : "Draft",
      })),
    [productsQuery.data],
  );

  const columns = [
    { key: "nameAr", label: "الاسم (AR)", sortable: true },
    { key: "nameEn", label: "Name (EN)", sortable: true },
    { key: "typeLabel", label: "النوع", sortable: true },
    { key: "priceSell", label: "Sell", sortable: true },
    { key: "priceCost", label: "Cost", sortable: true, onlyAdmin: true },
    { key: "priceWholesale", label: "Wholesale", sortable: true, onlyAdmin: true },
    { key: "stock", label: "المخزون", sortable: true },
    { key: "publishedLabel", label: "الحالة", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Store Products</h1>
              <p className="text-sm text-muted-foreground mt-1">
                إدارة المنتجات والخدمات من مسار `/api/store/products`
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setEditingProduct(null);
                  setForm(initialForm);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                إضافة منتج
              </Button>
              <Button
                variant="outline"
                onClick={() => productsQuery.refetch()}
                disabled={productsQuery.isFetching}
              >
                {productsQuery.isFetching ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                تحديث
              </Button>
            </div>
          </div>
        </div>

        <DataTable
          title="Store Products"
          description="البيانات من الخادم الرئيسي Daher.Net Server"
          columns={columns}
          data={rows}
          isLoading={productsQuery.isLoading}
          renderRowActions={(row: StoreProduct) => (
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingProduct(row);
                  setForm(toForm(row));
                  setIsModalOpen(true);
                }}
              >
                تعديل
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  publishMutation.mutate({
                    id: row.id,
                    isPublished: !row.isPublished,
                  })
                }
                disabled={publishMutation.isPending}
              >
                {row.isPublished ? "إلغاء نشر" : "نشر"}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => stockMutation.mutate({ id: row.id, delta: 1 })}
                disabled={stockMutation.isPending}
              >
                +1
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => stockMutation.mutate({ id: row.id, delta: -1 })}
                disabled={stockMutation.isPending}
              >
                -1
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  const confirmed = window.confirm("هل أنت متأكد من حذف المنتج؟");
                  if (!confirmed) return;
                  deleteMutation.mutate(row.id);
                }}
                disabled={deleteMutation.isPending}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        />

        <PopupForm
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          trigger={<></>}
          title={editingProduct ? "تعديل منتج" : "إضافة منتج"}
        >
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              saveMutation.mutate();
            }}
          >
            <LocalizedInputs
              labelAr="الاسم (عربي)"
              labelEn="Name (English)"
              value={form.name}
              onChange={(next) => setForm((prev) => ({ ...prev, name: next }))}
            />

            <div className="text-right">
              <label className="block mb-1 text-sm font-medium text-gray-700">الوصف (عربي)</label>
              <Textarea
                value={form.description.ar}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: {
                      ...prev.description,
                      ar: event.target.value,
                    },
                  }))
                }
                className="text-right"
              />
            </div>
            <div className="text-right">
              <label className="block mb-1 text-sm font-medium text-gray-700">Description (English)</label>
              <Textarea
                value={form.description.en}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: {
                      ...prev.description,
                      en: event.target.value,
                    },
                  }))
                }
                className="text-left"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="text-right">
                <label className="block mb-1 text-sm font-medium text-gray-700">النوع</label>
                <select
                  className="w-full rounded border px-3 py-2 text-sm"
                  value={form.type}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      type: event.target.value as StoreProductType,
                    }))
                  }
                >
                  <option value="product">Product</option>
                  <option value="service">Service</option>
                </select>
              </div>

              <FormInput
                label="رابط الصورة"
                type="text"
                value={form.imageUrl}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, imageUrl: event.target.value }))
                }
              />

              <div className="text-right">
                <label className="block mb-1 text-sm font-medium text-gray-700">التصنيف</label>
                <select
                  className="w-full rounded border px-3 py-2 text-sm"
                  value={form.categoryId}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, categoryId: event.target.value }))
                  }
                >
                  <option value="">بدون</option>
                  {(categoriesQuery.data || []).map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label.ar || category.label.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-right">
                <label className="block mb-1 text-sm font-medium text-gray-700">العلامة</label>
                <select
                  className="w-full rounded border px-3 py-2 text-sm"
                  value={form.brandId}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, brandId: event.target.value }))
                  }
                >
                  <option value="">بدون</option>
                  {(brandsQuery.data || []).map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              <FormInput
                label="سعر البيع"
                type="number"
                value={form.priceSell}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, priceSell: event.target.value }))
                }
              />
              <FormInput
                label="سعر التكلفة"
                type="number"
                value={form.priceCost}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, priceCost: event.target.value }))
                }
              />
              <FormInput
                label="سعر الجملة"
                type="number"
                value={form.priceWholesale}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, priceWholesale: event.target.value }))
                }
              />
              <FormInput
                label="المخزون"
                type="number"
                value={form.stock}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, stock: event.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="flex items-center justify-end gap-2 text-sm font-medium">
                <span>منشور</span>
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      isPublished: event.target.checked,
                    }))
                  }
                />
              </label>
              <label className="flex items-center justify-end gap-2 text-sm font-medium">
                <span>مميز</span>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      isFeatured: event.target.checked,
                    }))
                  }
                />
              </label>
            </div>

            <Button className="w-full" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </form>
        </PopupForm>
      </div>
    </DashboardLayout>
  );
}
