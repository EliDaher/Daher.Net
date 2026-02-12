import { z } from "zod";

export const wifiCustomerForm = z.object({
  amount: z.coerce
    .number({ invalid_type_error: "القيمة مطلوبة" }),
  date: z.any().nullable(),
  type: z.enum(["cash", "shamCash"]), // ✅ تصحيح هنا
  details: z.string().optional(),
});

export type wifiCustomerFormData = z.infer<typeof wifiCustomerForm>;
