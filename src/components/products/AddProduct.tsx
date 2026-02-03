import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormInput from "@/components/ui/custom/FormInput";
import { Button } from "@/components/ui/button";
import PopupForm from "@/components/ui/custom/PopupForm";

import { addPosProductSchema, AddPosProductInput } from "@/schemas/addPosProduct.schema";

type AddPosProductProp = {
  isOpen: boolean;
  setIsOpen: any;
};

export default function AddPosProduct({
  isOpen,
  setIsOpen,
}: AddPosProductProp) {
  const [serverMessage, setServerMessage] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddPosProductInput>({
    resolver: zodResolver(addPosProductSchema),
    defaultValues: {
      stock: 0,
    },
  });

  const onSubmit = async (data: AddPosProductInput) => {
    setServerMessage(null);

    try {
      setUploading(true);

      const apiBase = "https://paynet-1.onrender.com";

      await axios.post(`${apiBase}/api/product/add`, data);

      setServerMessage({
        type: "success",
        text: "تم إضافة المنتج بنجاح",
      });

      reset();
    } catch (err: any) {
      const errMsg =
        err?.response?.data?.message || err.message || "حدث خطأ أثناء الحفظ";

      setServerMessage({
        type: "error",
        text: errMsg,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <PopupForm
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={<Button className="w-full">إضافة منتج</Button>}
    >
      <form dir="rtl" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-3">
        <FormInput
          label="اسم المنتج"
          type="text"
          {...register("name")}
          error={errors.name?.message}
        />

        <FormInput
          label="سعر البيع"
          type="number"
          step="0.01"
          {...register("price")}
          error={errors.price?.message}
        />

        <FormInput
          label="سعر الشراء"
          type="number"
          step="0.01"
          {...register("priceCost")}
          error={errors.priceCost?.message}
        />

        <FormInput
          label="سعر الجملة"
          type="number"
          step="0.01"
          {...register("priceWholesale")}
          error={errors.priceWholesale?.message}
        />

        <FormInput
          label="التصنيف"
          type="text"
          {...register("category")}
          error={errors.category?.message}
        />

        <FormInput
          label="الكمية"
          type="number"
          {...register("stock")}
          error={errors.stock?.message}
        />

        <FormInput
          label="الوصف"
          type="text"
          {...register("description")}
          error={errors.description?.message}
        />

        <FormInput
          label="رابط الصورة"
          type="text"
          {...register("imageUrl")}
          error={errors.imageUrl?.message}
        />

        <Button className="col-span-2" type="submit" disabled={uploading}>
          {uploading ? "جاري الحفظ..." : "إضافة المنتج"}
        </Button>

        {serverMessage && (
          <p
            className={`text-sm mt-2 ${
              serverMessage.type === "error" ? "text-red-500" : "text-green-600"
            }`}
          >
            {serverMessage.text}
          </p>
        )}
      </form>
    </PopupForm>
  );
}
