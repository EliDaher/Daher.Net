import { updateCustomer } from "@/services/wifi";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function DetailsInputs({ customer, setCustomer }) {
  const [originalCustomer, setOriginalCustomer] = useState(customer);
  const [isChanged, setIsChanged] = useState(false);
  const queryClient = useQueryClient();

  const handleChange = (key, newValue) => {
    setCustomer((prev) => {
      const updated = { ...prev, [key]: newValue };
      setIsChanged(JSON.stringify(updated) !== JSON.stringify(originalCustomer));
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      const res = await updateCustomer(customer.id, customer);
      setOriginalCustomer(customer);
      queryClient.invalidateQueries({ queryKey: ["customers-table"] });
      setIsChanged(false);
      alert("تم حفظ التعديلات!");
    } catch (error) {
      console.log(error)
      alert("حدث خطأ أثناء حفظ التعديلات");
    }
  };

  const convertLabel = (key) => {
    const labels = {
      Name: "الاسم",
      UserName: "اسم المستخدم",
      Password: "كلمة السر",
      Balance: "الرصيد",
      SubscriptionSpeed: "السرعة",
      MonthlyFee: "قيمة الاشتراك",
      Contact: "الهاتف",
      sender: "المرسل",
      location: "الموقع",
      createdAt: 'تاريخ الانشاء',
      address: "IP الراوتر",
    };
    return labels[key] || key;
  };

  // لتحديث النسخة الأصلية عند تحميل البيانات من جديد
  useEffect(() => {
    setOriginalCustomer(customer);
  }, [customer]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 w-full">
      {Object.entries(customer).map(([key, value]) =>
        key == "id" ? (
          <></>
        ) : key == "createdAt" ? (
          <div key={key} className="flex gap-2 relative group mb-4 items-end">
            <label className="block font-bold w-36">{convertLabel(key)}:</label>
            <input
              type="text"
              value={new Date(value as any).toLocaleString("en-GB")}
              className="bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"
            />
            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"></span>
          </div>
        ) : (
          <div key={key} className="flex gap-2 relative group mb-4 items-end">
            <label className="block font-bold w-36">{convertLabel(key)}:</label>
            <input
              disabled={['address'].includes(key)}
              type="text"
              value={value as any}
              onChange={(e) => handleChange(key, e.target.value)}
              className="bg-transparent border-b-2 border-transparent focus:border-primary-500 outline-none transition-all w-full"
            />
            <span className="absolute bottom-0 right-0 w-full h-[2px] bg-primary-500 scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-300"></span>
          </div>
        ),
      )}

      {isChanged && (
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-accent-500 text-white rounded hover:bg-accent-600 transition-all"
        >
          حفظ التعديلات
        </button>
      )}
    </div>
  );
}
