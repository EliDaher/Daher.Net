import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import PopupForm from "@/components/ui/custom/PopupForm";
import FormInput from "@/components/ui/custom/FormInput";
import { Button } from "@/components/ui/button";
import { LocalizedInputs } from "@/components/store/LocalizedInputs";
import { storeApi } from "@/services/store";
import type { LocalizedText, StoreBanner } from "@/types/store";

type BannerForm = {
  title: LocalizedText;
  subtitle: LocalizedText;
  imageUrl: string;
  linkUrl: string;
  sortOrder: string;
  isActive: boolean;
};

const initialForm: BannerForm = {
  title: { ar: "", en: "" },
  subtitle: { ar: "", en: "" },
  imageUrl: "",
  linkUrl: "",
  sortOrder: "0",
  isActive: true,
};

function toForm(item: StoreBanner): BannerForm {
  return {
    title: item.title,
    subtitle: item.subtitle,
    imageUrl: item.imageUrl || "",
    linkUrl: item.linkUrl || "",
    sortOrder: String(item.sortOrder ?? 0),
    isActive: Boolean(item.isActive),
  };
}

export default function StoreBanners() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StoreBanner | null>(null);
  const [form, setForm] = useState<BannerForm>(initialForm);

  const query = useQuery({
    queryKey: ["store-banners"],
    queryFn: () => storeApi.listBanners(),
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        title: form.title,
        subtitle: form.subtitle,
        imageUrl: form.imageUrl,
        linkUrl: form.linkUrl,
        sortOrder: Number(form.sortOrder),
        isActive: form.isActive,
      };

      if (editingItem) {
        return storeApi.updateBanner(editingItem.id, payload);
      }
      return storeApi.createBanner(payload);
    },
    onSuccess: () => {
      toast.success(editingItem ? "تم تعديل البنر" : "تم إنشاء البنر");
      setIsModalOpen(false);
      setEditingItem(null);
      setForm(initialForm);
      queryClient.invalidateQueries({ queryKey: ["store-banners"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل الحفظ");
    },
  });

  const activeMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      storeApi.setBannerActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-banners"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث الحالة");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => storeApi.deleteBanner(id),
    onSuccess: () => {
      toast.success("تم حذف البنر");
      queryClient.invalidateQueries({ queryKey: ["store-banners"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل الحذف");
    },
  });

  const rows = useMemo(
    () =>
      (query.data || []).map((item) => ({
        ...item,
        titleAr: item.title.ar,
        titleEn: item.title.en,
        status: item.isActive ? "Active" : "Inactive",
      })),
    [query.data],
  );

  const columns = [
    { key: "titleAr", label: "العنوان (AR)", sortable: true },
    { key: "titleEn", label: "Title (EN)", sortable: true },
    { key: "sortOrder", label: "الترتيب", sortable: true },
    { key: "status", label: "الحالة", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Store Banners</h1>
              <p className="text-sm text-muted-foreground mt-1">إدارة بنرات الواجهة</p>
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
                إضافة بنر
              </Button>
              <Button
                variant="outline"
                onClick={() => query.refetch()}
                disabled={query.isFetching}
              >
                {query.isFetching ? (
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
          title="Store Banners"
          description="البيانات من /api/store/banners"
          columns={columns}
          data={rows}
          isLoading={query.isLoading}
          renderRowActions={(row: StoreBanner) => (
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
              >
                {row.isActive ? "تعطيل" : "تفعيل"}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => {
                  const confirmed = window.confirm("هل تريد حذف البنر؟");
                  if (!confirmed) return;
                  deleteMutation.mutate(row.id);
                }}
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
          title={editingItem ? "تعديل بنر" : "إضافة بنر"}
        >
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              saveMutation.mutate();
            }}
          >
            <LocalizedInputs
              labelAr="العنوان (AR)"
              labelEn="Title (EN)"
              value={form.title}
              onChange={(next) => setForm((prev) => ({ ...prev, title: next }))}
            />
            <LocalizedInputs
              labelAr="العنوان الفرعي (AR)"
              labelEn="Subtitle (EN)"
              value={form.subtitle}
              onChange={(next) => setForm((prev) => ({ ...prev, subtitle: next }))}
            />

            <FormInput
              label="رابط الصورة"
              type="text"
              value={form.imageUrl}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, imageUrl: event.target.value }))
              }
            />
            <FormInput
              label="رابط التحويل"
              type="text"
              value={form.linkUrl}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, linkUrl: event.target.value }))
              }
            />
            <FormInput
              label="الترتيب"
              type="number"
              value={form.sortOrder}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, sortOrder: event.target.value }))
              }
            />
            <label className="flex items-center justify-end gap-2 text-sm font-medium">
              <span>نشط</span>
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
