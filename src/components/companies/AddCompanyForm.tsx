import React from "react";
import PopupForm from "../ui/custom/PopupForm";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompany } from "@/services/companies";
import FormInput from "../ui/custom/FormInput";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type AddCompanyFormValues = {
  name: string;
  initialBalance: number;
  balanceLimit: number;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  trigger?: React.ReactNode;
};

export default function AddCompanyForm({ isOpen, setIsOpen, trigger }: Props) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCompanyFormValues>({
    defaultValues: {
      name: "",
      initialBalance: 0,
      balanceLimit: 0,
    },
  });

  const addCompanyMutation = useMutation({
    mutationFn: (data: AddCompanyFormValues) => addCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies-table"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error("حدث خطأ أثناء الإضافة");
    },
  });

  const onSubmit = (data: AddCompanyFormValues) => {
    addCompanyMutation.mutate(data);
  };

  return (
    <PopupForm
      trigger={
        trigger ?? (
          <Button className="fixed bottom-5 right-5 z-50">إضافة شركة جديدة</Button>
        )
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="إضافة شركة جديدة"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormInput
            id="companyName"
            label="اسم الشركة"
            {...register("name", { required: "اسم الشركة مطلوب" })}
            error={errors.name?.message}
          />

          <FormInput
            id="initialBalance"
            label="الرصيد الافتتاحي"
            type="number"
            {...register("initialBalance", {
              valueAsNumber: true,
              required: "الرصيد الافتتاحي مطلوب",
            })}
            error={errors.initialBalance?.message}
          />

          <FormInput
            id="balanceLimit"
            label="حد الرصيد"
            type="number"
            {...register("balanceLimit", {
              valueAsNumber: true,
              required: "حد الرصيد مطلوب",
            })}
            error={errors.balanceLimit?.message}
          />

          <Button type="submit" disabled={addCompanyMutation.isPending}>
            {addCompanyMutation.isPending ? "جاري الإضافة..." : "إضافة"}
          </Button>
        </div>
      </form>
    </PopupForm>
  );
}
