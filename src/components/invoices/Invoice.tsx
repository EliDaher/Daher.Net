import React ,{useState} from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import { a } from "node_modules/framer-motion/dist/types.d-B50aGbjN";
export default function Invoice({ items, setItems }) {
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  


  const updateQuantity = (id, quantity) => {
    setItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const updatePrice = (id, price) => {
    setItems(prev =>
      prev.map(item =>
        item._id === id
          ? { ...item, price: Math.max(0, price) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item._id !== id));
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const invoice = async () => {
    setLoading(true);
    console.log({items , total , customerName , customerPhone});
    try {
      const res = await axios.post("http://localhost:5000/api/invoice/create-invoice", {
        items: items,
        total: total,
        customerName: customerName,
        customerPhone: customerPhone
      });
      alert("تم إنشاء الفاتورة بنجاح!");

    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "حدث خطأ أثناء إنشاء الفاتورة");
    }finally {
      setLoading(false);  
    };
  };
    
  return (
    <div className="border rounded-xl p-4 bg-white shadow-md space-y-4">
      <h2 className="text-xl font-bold">🧾 الفاتورة</h2>

      {items.length === 0 && (
        <p className="text-gray-500 text-sm">لا يوجد منتجات في الفاتورة</p>
      )}
      <div>
        <input
         className="border rounded px-2 py-1 text-sm w-full"
         value={customerName}
         onChange={e => setCustomerName(e.target.value)}

         type="text"
         placeholder=" . . . اسم الزبون" />
        <input
         className="border rounded px-2 py-1 text-sm w-full my-2"
         value={customerPhone}
         onChange={e => setCustomerPhone(e.target.value)}

         type="number"
         placeholder=" . . . رقم الزبون" />
      </div>

      {items.map(item => (
        <div
          key={item._id}
          className="grid grid-cols-5 gap-3 items-center"
        >
          <span className="col-span-2 font-medium">{item.name}</span>

          <input
            type="number"
            value={item.price}
            onChange={e => updatePrice(item._id, Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          />

          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={e => updateQuantity(item._id, Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          />

          <Button
            size="sm"
            variant="destructive"
            onClick={() => removeItem(item._id)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <div className="flex justify-between border-t pt-3 font-bold">
        <span>الإجمالي:</span>
        <span className="text-green-600">{total.toFixed(2)} $</span>
      </div>
<button
  onClick={invoice}
  disabled={loading}
  className={`
    w-full font-bold px-4 py-2 rounded mt-4 text-white
    ${loading
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-blue-500 hover:bg-blue-600'}
  `}
>
  {loading ? 'جاري إنشاء الفاتورة...' : 'إنشاء فاتورة'}
</button>
    </div>
  );
}
