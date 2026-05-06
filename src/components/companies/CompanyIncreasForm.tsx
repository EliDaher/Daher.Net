import { useEffect, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { increaseBalance } from "@/services/companies";
import { Button } from "../ui/button";
import FormInput from "../ui/custom/FormInput";
import PopupForm from "../ui/custom/PopupForm";

type CompanyIncreaseFormValues = {
  companyId: string;
  company: string;
  number: string;
  port: string;
  amount: number;
  paidAmount: number;
  reason: string;
  paymentNote: string;
};

type Props = {
  companyId: string | null;
  companyName?: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function CompanyIncreaseForm({
  isOpen,
  setIsOpen,
  companyId,
  companyName = "",
}: Props) {
  const queryClient = useQueryClient();

  const daherUser = useMemo(() => {
    if (typeof window === "undefined") return null;

    try {
      const user = localStorage.getItem("DaherUser");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CompanyIncreaseFormValues>({
    defaultValues: {
      companyId: "",
      company: "",
      number: "",
      port: daherUser?.username || "",
      amount: 0,
      paidAmount: 0,
      reason: "",
      paymentNote: "",
    },
  });

  useEffect(() => {
    if (!isOpen || !companyId) return;

    setValue("companyId", companyId);
    setValue("company", companyName);
    setValue("port", daherUser?.username || "");
  }, [companyId, companyName, daherUser?.username, isOpen, setValue]);

  const increaseBalanceMutation = useMutation({
    mutationFn: (data: CompanyIncreaseFormValues) => increaseBalance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies-table"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء زيادة الرصيد");
    },
  });

  const onSubmit = (data: CompanyIncreaseFormValues) => {
    increaseBalanceMutation.mutate(data);
  };

  return (
    <PopupForm
      trigger={
        <Button variant="outline" className="w-full justify-center gap-2">
          <Plus className="h-4 w-4" />
          زيادة رصيد
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="زيادة رصيد شركة"
      description={
        companyName
          ? `إضافة رصيد جديد إلى حساب ${companyName}.`
          : "إضافة رصيد جديد إلى حساب الشركة المحددة."
      }
      contentClassName="sm:max-w-2xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <FormInput
            id="increase-company-id"
            label="معرف الشركة"
            {...register("companyId", { required: "معرف الشركة مطلوب" })}
            error={errors.companyId?.message}
            disabled
          />

          <FormInput
            id="increase-company-name"
            label="اسم الشركة"
            {...register("company")}
            disabled
          />

          <FormInput
            id="increase-number"
            label="رقم الإشعار إذا وجد"
            {...register("number")}
          />

          <FormInput
            id="increase-port"
            label="المنفذ"
            {...register("port")}
            disabled
          />

          <FormInput
            id="increase-amount"
            label="قيمة الزيادة"
            type="number"
            {...register("amount", {
              valueAsNumber: true,
              required: "قيمة الزيادة مطلوبة",
            })}
            error={errors.amount?.message}
          />

          <FormInput
            id="increase-paid-amount"
            label="المبلغ المدفوع"
            type="number"
            {...register("paidAmount", { valueAsNumber: true })}
          />
        </div>

        <FormInput
          id="increase-reason"
          label="ملاحظة الدفع"
          {...register("reason")}
        />

        <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={increaseBalanceMutation.isPending}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={increaseBalanceMutation.isPending}>
            {increaseBalanceMutation.isPending ? "جاري الحفظ..." : "حفظ الزيادة"}
          </Button>
        </div>
      </form>
    </PopupForm>
  );
}
