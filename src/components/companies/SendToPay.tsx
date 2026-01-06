import PopupForm from "../ui/custom/PopupForm";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendInvoice } from "@/services/pos";
import FormInput from "../ui/custom/FormInput";

type SendToPayForm = {
  landline: string;
  selectedCompany: string;
  selectedSpeed: string;
  amountToPay: number;
  paymentType: string;
  email: string;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function SendToPay({ isOpen, setIsOpen }: Props) {
    const daherUser = JSON.parse(localStorage.getItem("DaherUser"));
    const queryClient = useQueryClient();

  const optionsForSpeed = [
    "512 Mbps - 14000",
    "1 Mbps - 18500",
    "2 Mbps - 24000",
    "4 Mbps - 38000",
    "8 Mbps - 64000",
    "16 Mbps - 83000",
    "البرونزية - 17500",
    "العائلية - 22000",
    "الذهبية - 29000",
    "5 GB - 1800",
    "10 GB - 3300",
    "20 GB - 5700",
    "30 GB - 7600",
    "50 GB - 11500",
    "75 GB - 13500",
    "100 GB - 19000",
    "200 GB - 35000",
  ];

  const optionsForCompanies = [
    "ناس",
    "برونت",
    "اينت",
    "رنت",
    "الكم",
    "ليما",
    "سوا",
    "اية",
    "يارا",
    "بطاقات",
    "هايبر",
    "ويف",
    "امنية",
    "فيو",
    "ليزر",
    "متس",
    "سما",
    "زاد",
    "دنيا",
    "هاي فاي",
    "تكامل",
    "لاين",
    "الجمعية",
  ];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<SendToPayForm>({
    defaultValues: {
      landline: "",
      selectedCompany: "",
      selectedSpeed: "",
      amountToPay: 0,
      paymentType: "cash",
      email: daherUser.username + "Ddaheradmin",
    },
  });

  const sendToPayMutation = useMutation({
    mutationFn: (data: SendToPayForm) =>
      sendInvoice({
        formData: data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-table"] });
      reset();
      setIsOpen(false);
    },
    onError: () => {
      alert("حدث خطأ أثناء إرسال الطلب");
    },
  });

  const onSubmit = (data: SendToPayForm) => {
    sendToPayMutation.mutate(data);
  };

  return (
    <PopupForm
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="إرسال رقم للتسديد"
      trigger={
        <Button className="absolute bottom-8 right-8 z-50">
          إرسال رقم للتسديد
        </Button>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* رقم الهاتف / الخط */}
        <FormInput
          id="landline"
          label="رقم الهاتف / الخط"
          {...register("landline", {
            required: "الرقم مطلوب",
          })}
          error={errors.landline?.message}
        />

        {/* الشركة */}
        <Controller
          name="selectedCompany"
          control={control}
          rules={{ required: "يرجى اختيار الشركة" }}
          render={({ field }) => (
            <div dir="rtl" className="flex flex-col">
              <label className="mb-1 mr-3 font-medium">الشركة</label>
              <select
                {...field}
                className="border border-gray-300 p-2 bg-background rounded"
              >
                <option value="">اختر الشركة</option>
                {optionsForCompanies.map((company) => (
                  <option key={company} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              {errors.selectedCompany && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.selectedCompany.message}
                </span>
              )}
            </div>
          )}
        />

        {/* السرعة */}
        <Controller
          name="selectedSpeed"
          control={control}
          rules={{ required: "يرجى اختيار السرعة" }}
          render={({ field }) => (
            <div dir="rtl" className="flex flex-col">
              <label className="mb-1 mr-3 font-medium">السرعة</label>
              <select
                {...field}
                className="border border-gray-300 p-2 bg-background rounded"
              >
                <option value="">اختر السرعة</option>
                {optionsForSpeed.map((speed) => (
                  <option key={speed} value={speed}>
                    {speed}
                  </option>
                ))}
              </select>
              {errors.selectedSpeed && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.selectedSpeed.message}
                </span>
              )}
            </div>
          )}
        />

        {/* المبلغ */}
        <FormInput
          id="amountToPay"
          label="المبلغ المطلوب"
          type="number"
          {...register("amountToPay", {
            valueAsNumber: true,
            required: "المبلغ مطلوب",
            min: { value: 1, message: "المبلغ غير صالح" },
          })}
          error={errors.amountToPay?.message}
        />

        {/* زر الإرسال */}
        <Button
          type="submit"
          className="w-full mt-4"
          disabled={sendToPayMutation.isPending}
        >
          {sendToPayMutation.isPending ? "جاري الإرسال..." : "إرسال للتسديد"}
        </Button>
      </form>
    </PopupForm>
  );
}
