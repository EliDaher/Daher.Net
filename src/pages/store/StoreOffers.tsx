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
import type { LocalizedText, StoreOffer } from "@/types/store";

type OfferForm = {
  title: LocalizedText;
  description: LocalizedText;
  imageUrl: string;
  startsAt: string;
  endsAt: string;
  isActive: boolean;
  productId: string;
  categoryId: string;
};

const initialForm: OfferForm = {
  title: { ar: "", en: "" },
  description: { ar: "", en: "" },
  imageUrl: "",
  startsAt: "",
  endsAt: "",
  isActive: false,
  productId: "",
  categoryId: "",
};

function toForm(offer: StoreOffer): OfferForm {
  return {
    title: offer.title,
    description: offer.description,
    imageUrl: offer.imageUrl || "",
    startsAt: offer.startsAt ? offer.startsAt.slice(0, 16) : "",
    endsAt: offer.endsAt ? offer.endsAt.slice(0, 16) : "",
    isActive: Boolean(offer.isActive),
    productId: offer.productId || "",
    categoryId: offer.categoryId || "",
  };
}

export default function StoreOffers() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StoreOffer | null>(null);
  const [form, setForm] = useState<OfferForm>(initialForm);

  const offersQuery = useQuery({
    queryKey: ["store-offers"],
    queryFn: () => storeApi.listOffers(),
  });

  const productsQuery = useQuery({
    queryKey: ["store-products-for-offers"],
    queryFn: () => storeApi.listProducts({ isPublished: true }),
  });

  const categoriesQuery = useQuery({
    queryKey: ["store-categories-for-offers"],
    queryFn: () => storeApi.listCategories({ isActive: true }),
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        title: form.title,
        description: form.description,
        imageUrl: form.imageUrl,
        startsAt: form.startsAt ? new Date(form.startsAt).toISOString() : "",
        endsAt: form.endsAt ? new Date(form.endsAt).toISOString() : "",
        isActive: form.isActive,
        productId: form.productId,
        categoryId: form.categoryId,
      };

      if (editingItem) {
        return storeApi.updateOffer(editingItem.id, payload);
      }

      return storeApi.createOffer(payload);
    },
    onSuccess: () => {
      toast.success(editingItem ? "تم تعديل العرض" : "تم إنشاء العرض");
      setIsModalOpen(false);
      setEditingItem(null);
      setForm(initialForm);
      queryClient.invalidateQueries({ queryKey: ["store-offers"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل حفظ العرض");
    },
  });

  const activeMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      storeApi.setOfferActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-offers"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث حالة العرض");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => storeApi.deleteOffer(id),
    onSuccess: () => {
      toast.success("تم حذف العرض");
      queryClient.invalidateQueries({ queryKey: ["store-offers"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل حذف العرض");
    },
  });

  const rows = useMemo(
    () =>
      (offersQuery.data || []).map((item) => ({
        ...item,
        titleAr: item.title.ar,
        titleEn: item.title.en,
        status: item.isActive ? "Active" : "Inactive",
      })),
    [offersQuery.data],
  );

  const columns = [
    { key: "titleAr", label: "العنوان (AR)", sortable: true },
    { key: "titleEn", label: "Title (EN)", sortable: true },
    { key: "startsAt", label: "Starts", sortable: true },
    { key: "endsAt", label: "Ends", sortable: true },
    { key: "status", label: "الحالة", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Store Offers</h1>
              <p className="text-sm text-muted-foreground mt-1">
                إدارة العروض مع التحكم بالتاريخ والحالة
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setEditingItem(null);
                  setForm(initialForm);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                إضافة عرض
              </Button>
              <Button
                variant="outline"
                onClick={() => offersQuery.refetch()}
                disabled={offersQuery.isFetching}
              >
                {offersQuery.isFetching ? (
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
          title="Store Offers"
          description="البيانات من /api/store/offers"
          columns={columns}
          data={rows}
          isLoading={offersQuery.isLoading}
          renderRowActions={(row: StoreOffer) => (
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingItem(row);
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
                  activeMutation.mutate({
                    id: row.id,
                    isActive: !row.isActive,
                  })
                }
                disabled={activeMutation.isPending}
              >
                {row.isActive ? "تعطيل" : "تفعيل"}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  const confirmed = window.confirm("هل تريد حذف هذا العرض؟");
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
          title={editingItem ? "تعديل عرض" : "إضافة عرض"}
        >
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              saveMutation.mutate();
            }}
          >
            <LocalizedInputs
              labelAr="عنوان العرض (AR)"
              labelEn="Offer Title (EN)"
              value={form.title}
              onChange={(next) => setForm((prev) => ({ ...prev, title: next }))}
            />

            <div className="text-right">
              <label className="block mb-1 text-sm font-medium text-gray-700">الوصف (AR)</label>
              <Textarea
                value={form.description.ar}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: { ...prev.description, ar: event.target.value },
                  }))
                }
                className="text-right"
              />
            </div>

            <div className="text-right">
              <label className="block mb-1 text-sm font-medium text-gray-700">Description (EN)</label>
              <Textarea
                value={form.description.en}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    description: { ...prev.description, en: event.target.value },
                  }))
                }
                className="text-left"
              />
            </div>

            <FormInput
              label="رابط صورة العرض"
              type="text"
              value={form.imageUrl}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, imageUrl: event.target.value }))
              }
            />

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormInput
                label="تاريخ البداية"
                type="datetime-local"
                value={form.startsAt}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, startsAt: event.target.value }))
                }
              />
              <FormInput
                label="تاريخ النهاية"
                type="datetime-local"
                value={form.endsAt}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, endsAt: event.target.value }))
                }
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="text-right">
                <label className="block mb-1 text-sm font-medium text-gray-700">ربط منتج</label>
                <select
                  className="w-full rounded border px-3 py-2 text-sm"
                  value={form.productId}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, productId: event.target.value }))
                  }
                >
                  <option value="">بدون</option>
                  {(productsQuery.data || []).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name.ar || item.name.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-right">
                <label className="block mb-1 text-sm font-medium text-gray-700">ربط تصنيف</label>
                <select
                  className="w-full rounded border px-3 py-2 text-sm"
                  value={form.categoryId}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, categoryId: event.target.value }))
                  }
                >
                  <option value="">بدون</option>
                  {(categoriesQuery.data || []).map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label.ar || item.label.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="flex items-center justify-end gap-2 text-sm font-medium">
              <span>تفعيل العرض</span>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, isActive: event.target.checked }))
                }
              />
            </label>

            <Button className="w-full" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "جاري الحفظ..." : "حفظ"}
            </Button>
          </form>
        </PopupForm>
      </div>
    </DashboardLayout>
  );
}
