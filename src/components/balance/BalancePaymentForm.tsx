import { useReactToPrint } from "react-to-print";
import PopupForm from "../ui/custom/PopupForm";
import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addWifiExpenses } from "@/services/wifi";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import FormInput from "../ui/custom/FormInput";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BalancePaymentFormData, BalancePaymentFormSchema } from "@/schemas/BalancePaymentForm.schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner";

type BalancePaymentFormProp = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  formTitle: string;
};

const BalancePaymentForm = ({
  isOpen,
  setIsOpen,
  formTitle,
}: BalancePaymentFormProp) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  /* ------------------ React Hook Form ------------------ */
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BalancePaymentFormData>({
    resolver: zodResolver(BalancePaymentFormSchema),
    defaultValues: {
      amount: 0,
      date: null,
      details: "",
    },
  });

  const amount = watch("amount");
  const details = watch("details");

  /* ------------------ Mutation ------------------ */
  const mutation = useMutation({
    mutationFn: addWifiExpenses,
    onSuccess: () => {
      toast.success("✅ تمت إضافة الدفعة.");
      queryClient.invalidateQueries({ queryKey: ["balance-table"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      toast.error("❌ حدث خطأ أثناء الإرسال.");
    },
  });

  /* ------------------ Print ------------------ */
  const handlePrint = useReactToPrint({
    contentRef: tableRef,
    pageStyle: `
      @page { size: 80mm auto; margin: 0; }
      body { direction: rtl; font-size: 12px; }
      .no-print { display: none !important; }
    `,
  });

  /* ------------------ Submit ------------------ */
  const onSubmit = (data: BalancePaymentFormData) => {
    if (window.confirm("هل تريد طباعة ايصال ؟")) {
      handlePrint();
    }

    mutation.mutate({
      amount:
        formTitle === "اضافة دفعة الى الصندوق" ? data.amount : -data.amount,
      date: data.date ? dayjs(data.date).format("YYYY-MM-DD") : "",
      details: data.details || "",
      type: data.type || "cash"
    });
  };

  return (
    <PopupForm
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={formTitle}
      trigger={<></>}
    >
      <div className="p-2">
        {/* ---------- FORM ---------- */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <FormInput
                label=""
                {...field}
                type="number"
                placeholder="القيمة بالدولار"
                error={errors.amount?.message}
              />
            )}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DatePicker
                  className="w-full"
                  label="اختر التاريخ"
                  format="DD/MM/YYYY"
                  {...field}
                />
              )}
            />
          </LocalizationProvider>

          <Controller
            name="details"
            control={control}
            render={({ field }) => (
              <FormInput label="" {...field} type="text" placeholder="تفاصيل (اختياري)" />
            )}
          /> 

          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" disabled>
                    اختر نوع الدفع
                  </SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="shamCash">Sham Cash</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <button
            type="submit"
            disabled={isSubmitting || mutation.isPending}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            {mutation.isPending ? "جارٍ الحفظ..." : "حفظ"}
          </button>
        </form>

        {/* ---------- PRINT ---------- */}
        <div ref={tableRef} className="sr-only" dir="rtl">
          <h2 className="text-center font-bold">Daher.Net</h2>
          <p>{dayjs().format("DD/MM/YYYY HH:mm")}</p>

          <div className="mt-2">
            <strong>التفاصيل:</strong>
            <p>{details || "بدون ملاحظات"}</p>
          </div>

          <div className="mt-4 font-bold">
            {formTitle}: {amount} $
          </div>
        </div>
      </div>
    </PopupForm>
  );
};

export default BalancePaymentForm;
