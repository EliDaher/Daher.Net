import { updateCustomer } from "@/services/wifi";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

/* ================= TYPES ================= */

export interface Customer {
  id?: string;
  _id?: string;
  Name?: string;
  UserName?: string;
  Password?: string;
  Balance?: number;
  SubscriptionSpeed?: string;
  MonthlyFee?: number;
  Contact?: string;
  sender?: string;
  location?: string;
  address?: string;
  createdAt?: string | Date;

  // حقول إضافية ديناميكية
  [key: string]: any;
}

interface DetailsInputsProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
}

/* ================= COMPONENT ================= */

export default function DetailsInputs({
  customer,
  setCustomer,
}: DetailsInputsProps) {
  const queryClient = useQueryClient();

  // النسخة الأصلية (مرة واحدة)
  const originalCustomerRef = useRef<Customer | null>(null);

  const [isChanged, setIsChanged] = useState<boolean>(false);

  /* حفظ النسخة الأصلية عند التحميل فقط */
  useEffect(() => {
    if (customer && !originalCustomerRef.current) {
      originalCustomerRef.current = customer;
    }
  }, [customer]);

  /* ================= HANDLERS ================= */

  const handleChange = (key: keyof Customer, value: any) => {
    setCustomer((prev) => {
      const updated: Customer = { ...prev, [key]: value };

      setIsChanged(
        JSON.stringify(updated) !== JSON.stringify(originalCustomerRef.current),
      );

      return updated;
    });
  };

  const handleSave = async (): Promise<void> => {
    try {
      const customerId = customer.id || customer._id;
      if (!customerId) return;

      await updateCustomer(customerId, customer);

      // تحديث النسخة الأصلية بعد الحفظ
      originalCustomerRef.current = customer;
      setIsChanged(false);

      queryClient.invalidateQueries({ queryKey: ["customers-table"] });

      toast.success("تم حفظ التعديلات!");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء حفظ التعديلات");
    }
  };

  /* ================= UTILS ================= */

  const convertLabel = (key: keyof Customer): string => {
    const labels: Record<string, string> = {
      Name: "الاسم",
      UserName: "اسم المستخدم",
      Password: "كلمة السر",
      Balance: "الرصيد",
      SubscriptionSpeed: "السرعة",
      MonthlyFee: "قيمة الاشتراك",
      Contact: "الهاتف",
      sender: "المرسل",
      location: "الموقع",
      createdAt: "تاريخ الإنشاء",
      address: "IP الراوتر",
    };

    return labels[key as string] || (key as string);
  };

  if (!customer) return null;

  /* ================= RENDER ================= */

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
      {Object.entries(customer).map(([key, value]) =>
        key === "id" ||
        key === "_id" ||
        key === "items" ||
        key === "payments" ? null : key === "createdAt" ? (
          <div key={key} className="flex gap-2 relative group mb-4 items-end">
            <label className="block font-bold w-36">
              {convertLabel(key as keyof Customer)}:
            </label>
            <input
              type="text"
              value={new Date(value as any).toLocaleString("en-GB")}
              disabled
              className="bg-transparent border-b-2 border-transparent w-full"
            />
          </div>
        ) : (
          <div key={key} className="flex gap-2 relative group mb-4 items-end">
            <label className="block font-bold w-36">
              {convertLabel(key as keyof Customer)}:
            </label>
            <input
              type="text"
              disabled={key === "address"}
              value={value ?? ""}
              onChange={(e) =>
                handleChange(key as keyof Customer, e.target.value)
              }
              className="bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"
            />
            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"></span>
          </div>
        ),
      )}

      {isChanged && (
        <div className="col-span-full flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="w-full px-6 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all"
          >
            حفظ التعديلات
          </button>
        </div>
      )}
    </div>
  );
}
