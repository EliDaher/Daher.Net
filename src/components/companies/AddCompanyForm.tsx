import React from "react";
import PopupForm from "../ui/custom/PopupForm";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCompany } from "@/services/companies";
import FormInput from "../ui/custom/FormInput";
import { useForm } from "react-hook-form";

type AddCompanyFormValues = {
  name: string;
  initialBalance: number;
  balanceLimit: number;
};

export default function AddCompanyForm({ isOpen, setIsOpen }) {
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
      queryClient.invalidateQueries({ queryKey: ["company-table"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      alert("حدث خطأ أثناء الإضافة");
    },
  });

  const onSubmit = (data: AddCompanyFormValues) => {
    addCompanyMutation.mutate(data);
  };

  return (
    <PopupForm
      trigger={<Button
        className="absolute right-5 bottom-5 z-50"
      >
        اضافة شركة جديدة
      </Button>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="اضافة شركة جديدة"
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
