import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRightLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import decreaseBalance from "@/services/companies";
import { Button } from "../ui/button";
import FormInput from "../ui/custom/FormInput";
import PopupForm from "../ui/custom/PopupForm";

type TransferFormValues = {
  reason: string;
  amount: number;
};

type DecreaseBalancePayload = {
  amount: number;
  reason: string;
  company: string;
  number: number;
  companyId: string;
  port: string;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  companyId: string;
  companyName: string;
};

export default function TransfareBalanceForm({
  isOpen,
  setIsOpen,
  companyId,
  companyName,
}: Props) {
  const queryClient = useQueryClient();

  const daherUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("DaherUser") || "{}");
    } catch {
      return {};
    }
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TransferFormValues>({
    defaultValues: {
      reason: "",
      amount: 0,
    },
  });

  const transferBalanceMutation = useMutation({
    mutationFn: (data: TransferFormValues) => {
      const payload: DecreaseBalancePayload = {
        amount: data.amount,
        reason: data.reason || "تحويل رصيد",
        company: companyName,
        number: 56315,
        companyId,
        port: daherUser?.username || "",
      };

      return decreaseBalance(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies-table"] });
      reset();
      setIsOpen(false);
    },

    onError: () => {
      toast.error("حدث خطأ أثناء تحويل الرصيد");
    },
  });

  const onSubmit = (data: TransferFormValues) => {
    transferBalanceMutation.mutate(data);
  };

  return (
    <PopupForm
      title={`تحويل رصيد ${companyName}`}
      description="تسجيل عملية تحويل من رصيد الشركة مع توضيح الوجهة أو سبب التحويل."
      trigger={
        <Button className="w-full justify-center gap-2">
          <ArrowRightLeft className="h-4 w-4" />
          تحويل رصيد
        </Button>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentClassName="sm:max-w-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-4">
          <FormInput
            id="transfer-amount"
            label="المبلغ"
            type="number"
            {...register("amount", {
              valueAsNumber: true,
              required: "المبلغ مطلوب",
              min: { value: 1, message: "يجب أن يكون أكبر من صفر" },
            })}
            error={errors.amount?.message}
          />

          <FormInput
            id="transfer-reason"
            label="ملاحظات + الوجهة"
            type="text"
            {...register("reason", {
              required: "مطلوب",
            })}
            error={errors.reason?.message}
          />
        </div>

        <div className="flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={transferBalanceMutation.isPending}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={transferBalanceMutation.isPending}>
            {transferBalanceMutation.isPending
              ? "جارٍ التحويل..."
              : "تأكيد التحويل"}
          </Button>
        </div>
      </form>
    </PopupForm>
  );
}
