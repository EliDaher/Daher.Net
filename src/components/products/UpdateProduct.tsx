import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import PopupForm from "@/components/ui/custom/PopupForm";
import FormInput from "@/components/ui/custom/FormInput";
import { Textarea } from "@/components/ui/textarea";

export default function UpdateProduct({ product, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    name: product.name || "",
    price: product.price || "",
    priceCost: product.priceCost || "",
    priceWolesale: product.priceWolesale || "",
    category: product.category || "",
    stock: product.stock || "",
    description: product.description || "",
    imageUrl: product.imageUrl || "",
  });

  const [loading, setLoading] = useState(false);
  const apiBase = "https://paynet-0dzj.onrender.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${apiBase}/api/product/update-product/${product._id}`,
        formData,
      );
      onUpdated(res.data);
    } catch (err) {
      toast.error(err?.response?.data?.message || "حدث خطأ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopupForm
      isOpen={true}
      setIsOpen={(open) => {
        if (!open) onClose();
      }}
      trigger={<></>}
      title="تعديل المنتج"
    >
      <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
        <div className="rounded-xl border bg-background/70 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">المعلومات الأساسية</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormInput
              id="name"
              name="name"
              label="اسم المنتج"
              value={formData.name}
              onChange={handleChange}
              placeholder="أدخل اسم المنتج"
              autoFocus
            />

            <FormInput
              id="category"
              name="category"
              label="التصنيف"
              value={formData.category}
              onChange={handleChange}
              placeholder="مثال: إلكترونيات"
            />
          </div>

          <FormInput
            id="imageUrl"
            name="imageUrl"
            label="رابط الصورة"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            type="url"
            inputMode="url"
          />

          {formData.imageUrl ? (
            <div className="rounded-lg border bg-muted/30 p-2">
              <img
                src={formData.imageUrl}
                alt={formData.name || "Product preview"}
                className="h-28 w-full rounded object-cover"
              />
            </div>
          ) : null}
        </div>

        <div className="rounded-xl border bg-background/70 p-4 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">الأسعار والمخزون</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <FormInput
              id="price"
              name="price"
              label="سعر البيع"
              value={formData.price}
              onChange={handleChange}
              type="number"
              step="0.01"
              min="0"
              inputMode="decimal"
              placeholder="0.00"
            />
            <FormInput
              id="priceCost"
              name="priceCost"
              label="سعر الشراء"
              value={formData.priceCost}
              onChange={handleChange}
              type="number"
              step="0.01"
              min="0"
              inputMode="decimal"
              placeholder="0.00"
            />
            <FormInput
              id="priceWolesale"
              name="priceWolesale"
              label="سعر الجملة"
              value={formData.priceWolesale}
              onChange={handleChange}
              type="number"
              step="0.01"
              min="0"
              inputMode="decimal"
              placeholder="0.00"
            />

            <FormInput
              id="stock"
              name="stock"
              label="الكمية"
              value={formData.stock}
              onChange={handleChange}
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="0"
            />
          </div>
        </div>

        <div className="rounded-xl border bg-background/70 p-4 space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-right text-gray-700">
            الوصف
          </label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="اكتب وصفًا مختصرًا يساعد على فهم المنتج"
            className="min-h-[110px] text-right"
          />
        </div>

        <div className="pt-1 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
            إلغاء
          </Button>
          <Button type="submit" disabled={loading} className="min-w-[150px]">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              "حفظ التعديلات"
            )}
          </Button>
        </div>
      </form>
    </PopupForm>
  );
}
