import React from "react";
import PopupForm from "../ui/custom/PopupForm";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import decreaseBalance from "@/services/companies";
import FormInput from "../ui/custom/FormInput";
import { toast } from "sonner";

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

  const TransfarBalanceMutation = useMutation({
    mutationFn: (data: TransferFormValues) => {
      const payload: DecreaseBalancePayload = {
        amount: data.amount,
        reason: data.reason || "تحويل رصيد",
        company: companyName,
        number: 56315, // يمكنك لاحقًا تمريرها من props
        companyId,
        port: daherUser?.username || "",
      };

      return decreaseBalance(payload);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company-table"] });
      reset();
      setIsOpen(false);
    },

    onError: () => {
      toast.error("حدث خطأ أثناء تحويل الرصيد");
    },
  });

  const onSubmit = (data: TransferFormValues) => {
    TransfarBalanceMutation.mutate(data);
  };

  return (
    <PopupForm
      title={`تحويل رصيد ${companyName}`}
      trigger={<Button>تحويل رصيد</Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="amount"
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
          id="reason"
          label="ملاحظات + الوجهة"
          type="text"
          {...register("reason", {
            required: "مطلوب",
          })}
          error={errors.reason?.message}
        />

        <Button
          type="submit"
          disabled={TransfarBalanceMutation.isPending}
          className="w-full"
        >
          {TransfarBalanceMutation.isPending
            ? "جارٍ التحويل..."
            : "تأكيد التحويل"}
        </Button>
      </form>
    </PopupForm>
  );
}
