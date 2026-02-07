import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PopupForm from "../ui/custom/PopupForm";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  wifiCustomerForm,
  wifiCustomerFormData,
} from "@/schemas/WifiCustomerForm.schema";

import FormInput from "../ui/custom/FormInput";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPayment } from "@/services/wifi";

/* ================= TYPES ================= */

type CustomerPaymentFormProps = {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  formTitle: string;
  printOnly?: boolean;
  customer?: {
    Name?: string;
    Contact?: string;
    Balance?: number;
    id?: string;
  };
};

/* ================= COMPONENT ================= */

const CustomerPaymentForm = ({
  isOpen,
  setIsOpen,
  formTitle,
  printOnly = false,
  customer,
}: CustomerPaymentFormProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  /* ================= FORM ================= */
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<wifiCustomerFormData>({
    resolver: zodResolver(wifiCustomerForm),
    defaultValues: {
      amount: 0,
      date: dayjs(),
      details: "",
      type: "cash",
    },
  });

  const amount = watch("amount");
  const details = watch("details");
  const type = watch("type");

  /* ================= PRINT ================= */

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    pageStyle: `
      @page { size: 80mm auto; margin: 0; }
      body { font-family: Arial; font-size: 12px; direction: rtl; }
    `,
  });

  const getCurrentDateTime = () => dayjs().format("DD/MM/YYYY HH:mm");

  /* ================= MUTATION ================= */

  const paymentMutation = useMutation({
    mutationFn: addPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance-table"] });

      if (window.confirm("هل تريد طباعة إيصال؟")) {
        handlePrint();
      }

      reset();
      setIsOpen(false);
    },
    onError: () => {
      alert("❌ حدث خطأ أثناء تسجيل الدفعة");
    },
  });

  /* ================= SUBMIT ================= */

  const onSubmit = (data: wifiCustomerFormData) => {
    if (!customer?.id) {
      alert("❌ المشترك غير معروف");
      return;
    }

    const confirmed = window.confirm(
      `تأكيد تسجيل دفعة بقيمة ${data.amount}$ ؟`,
    );
    if (!confirmed) return;

    paymentMutation.mutate({
      amount: data.amount,
      date: dayjs(data.date).format("YYYY-MM-DD"),
      details: data.details,
      subscriberID: customer.id,
      total: customer.Balance ?? 0,
      type: data.type,
    });
  };

  /* ================= RENDER ================= */

  return (
    <PopupForm
      trigger={<></>}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={formTitle}
    >
      <div className="flex flex-row-reverse gap-4">
        {!printOnly && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="القيمة بالدولار"
                  {...field}
                  type="number"
                  placeholder="Ex: 8"
                />
              )}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount.message}</p>
            )}

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

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    className="text-foreground"
                    {...field}
                    format="DD/MM/YYYY"
                  />
                )}
              />
            </LocalizationProvider>

            <Controller
              name="details"
              control={control}
              render={({ field }) => (
                <FormInput
                  label="التفاصيل"
                  {...field}
                  type="text"
                  placeholder=""
                />
              )}
            />

            <Button
              loading={paymentMutation.isPending}
              type="submit"
              disabled={isSubmitting || paymentMutation.isPending}
              className="w-full"
            >
              {paymentMutation.isPending ? "جاري الحفظ..." : "تأكيد الدفع"}
            </Button>
          </form>
        )}

        {/* ================= PRINT ================= */}
        <div ref={printRef} className="sr-only p-4 text-sm" dir="rtl">
          <div className="text-center font-bold">
            <h1>Daher.Net</h1>
            <span>{getCurrentDateTime()}</span>
          </div>

          <div className="mt-2 font-bold">
            <div>الاسم: {customer?.Name}</div>
            <div>الرقم: {customer?.Contact}</div>
          </div>

          <div className="mt-2">نوع الدفع: {type}</div>
          <div className="mt-2">التفاصيل: {details || "—"}</div>

          <div className="mt-4 border-t pt-2 font-extrabold">
            المبلغ: {amount} $
          </div>
        </div>
      </div>
    </PopupForm>
  );
};

export default CustomerPaymentForm;
