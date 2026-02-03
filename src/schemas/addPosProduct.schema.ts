import { z } from "zod";

export const addPosProductSchema = z
  .object({
    name: z.string().trim().min(2, "اسم المنتج مطلوب"),

    price: z.coerce.number().positive("سعر البيع غير صالح"),

    priceCost: z.coerce.number().positive("سعر التكلفة غير صالح"),

    priceWholesale: z.coerce.number().positive("سعر الجملة غير صالح"),

    category: z.string().trim().min(1, "التصنيف مطلوب"),

    stock: z.coerce.number().int().min(0, "الكمية غير صالحة"),

    description: z.string().trim().max(500).optional(),

    imageUrl: z.string().url("رابط صورة غير صالح"),
  })
  .refine((d) => d.price >= d.priceCost, {
    message: "سعر البيع يجب أن يكون أكبر من سعر التكلفة",
    path: ["price"],
  });

export type AddPosProductInput = z.infer<typeof addPosProductSchema>;
