import { z } from "zod";

export const BalancePaymentFormSchema = z.object({
  amount: z
    .number({ invalid_type_error: "القيمة مطلوبة" })
    .positive("يجب أن تكون القيمة أكبر من 0"),

  date: z.any().nullable(),

  details: z.string().optional(),
});

export type BalancePaymentFormData = z.infer<typeof BalancePaymentFormSchema>;
