import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DataTable } from "@/components/dashboard/DataTable";
import PopupForm from "@/components/ui/custom/PopupForm";
import FormInput from "@/components/ui/custom/FormInput";
import { Button } from "@/components/ui/button";
import { storeApi } from "@/services/store";
import type { StoreBrand } from "@/types/store";

type BrandForm = {
  name: string;
  logoUrl: string;
  sortOrder: string;
  isActive: boolean;
};

const initialForm: BrandForm = {
  name: "",
  logoUrl: "",
  sortOrder: "0",
  isActive: true,
};

function toForm(item: StoreBrand): BrandForm {
  return {
    name: item.name || "",
    logoUrl: item.logoUrl || "",
    sortOrder: String(item.sortOrder ?? 0),
    isActive: Boolean(item.isActive),
  };
}

export default function StoreBrands() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StoreBrand | null>(null);
  const [form, setForm] = useState<BrandForm>(initialForm);

  const query = useQuery({
    queryKey: ["store-brands"],
    queryFn: () => storeApi.listBrands(),
  });

  const saveMutation = useMutation({
    mutationFn: () => {
      const payload = {
        name: form.name,
        logoUrl: form.logoUrl,
        sortOrder: Number(form.sortOrder),
        isActive: form.isActive,
      };

      if (editingItem) {
        return storeApi.updateBrand(editingItem.id, payload);
      }
      return storeApi.createBrand(payload);
    },
    onSuccess: () => {
      toast.success(editingItem ? "تم تعديل العلامة" : "تم إنشاء العلامة");
      setIsModalOpen(false);
      setEditingItem(null);
      setForm(initialForm);
      queryClient.invalidateQueries({ queryKey: ["store-brands"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل الحفظ");
    },
  });

  const activeMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      storeApi.setBrandActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["store-brands"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث الحالة");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => storeApi.deleteBrand(id),
    onSuccess: () => {
      toast.success("تم حذف العلامة");
      queryClient.invalidateQueries({ queryKey: ["store-brands"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل الحذف");
    },
  });

  const rows = useMemo(
    () =>
      (query.data || []).map((item) => ({
        ...item,
        status: item.isActive ? "Active" : "Inactive",
      })),
    [query.data],
  );

  const columns = [
    { key: "name", label: "العلامة", sortable: true },
    { key: "logoUrl", label: "الشعار", sortable: true },
    { key: "sortOrder", label: "الترتيب", sortable: true },
    { key: "status", label: "الحالة", sortable: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6" dir="rtl">
        <div className="rounded-xl border bg-card p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Store Brands</h1>
              <p className="text-sm text-muted-foreground mt-1">إدارة العلامات التجارية</p>
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
                إضافة علامة
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
          title="Store Brands"
          description="البيانات من /api/store/brands"
          columns={columns}
          data={rows}
          isLoading={query.isLoading}
          renderRowActions={(row: StoreBrand) => (
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
                  const confirmed = window.confirm("هل تريد حذف العلامة؟");
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
          title={editingItem ? "تعديل علامة" : "إضافة علامة"}
        >
          <form
            className="space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              saveMutation.mutate();
            }}
          >
            <FormInput
              label="الاسم"
              type="text"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
            />
            <FormInput
              label="رابط الشعار"
              type="text"
              value={form.logoUrl}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, logoUrl: event.target.value }))
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
