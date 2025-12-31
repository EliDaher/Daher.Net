import React, { useEffect, useMemo } from "react";
import PopupForm from "../ui/custom/PopupForm";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseBalance } from "@/services/companies";
import FormInput from "../ui/custom/FormInput";
import { useForm } from "react-hook-form";

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

  // ✅ Safe localStorage access
  const daherUser = useMemo(() => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("DaherUser");
    return user ? JSON.parse(user) : null;
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

  // ✅ Update form when company changes
  useEffect(() => {
    if (!companyId) return;

    setValue("companyId", companyId);
    setValue("company", companyName);
  }, [companyId, companyName, setValue]);

  const increaseBalanceMutation = useMutation({
    mutationFn: (data: CompanyIncreaseFormValues) => increaseBalance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-table"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      alert("حدث خطأ أثناء زيادة الرصيد");
    },
  });

  const onSubmit = (data: CompanyIncreaseFormValues) => {
    increaseBalanceMutation.mutate(data);
  };

  return (
    <PopupForm
      trigger=<>
        <Button variant="outline">
          زيادة رصيد شركة
        </Button>
      </>
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="زيادة رصيد شركة"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormInput
            label="معرف الشركة"
            {...register("companyId", { required: "معرف الشركة مطلوب" })}
            error={errors.companyId?.message}
            disabled
          />

          <FormInput label="اسم الشركة" {...register("company")} disabled />

          <FormInput label="رقم الاشعار اذا وجد" {...register("number")} />

          <FormInput label="المنفذ" {...register("port")} disabled />

          <FormInput
            label="قيمة الزيادة"
            type="number"
            {...register("amount", {
              valueAsNumber: true,
              required: "قيمة الزيادة مطلوبة",
            })}
            error={errors.amount?.message}
          />

          <FormInput
            label="المبلغ المدفوع"
            type="number"
            {...register("paidAmount", { valueAsNumber: true })}
          />

          <FormInput label="ملاحظة الدفع" {...register("paymentNote")} />

          <Button type="submit" disabled={increaseBalanceMutation.isPending}>
            {increaseBalanceMutation.isPending ? "جاري الحفظ..." : "حفظ"}
          </Button>
        </div>
      </form>
    </PopupForm>
  );
}
