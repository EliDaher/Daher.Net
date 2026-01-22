import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function InvoiceForm({ initialItems = [] }) {
  const [addProduct, setAddProduct] = useState(true);
  const [items, setItems] = useState(initialItems);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: "", price: 0, stock: 1 }]);
  };

  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Items to submit:", items);
    // هنا يمكنك إرسال البيانات إلى الـ backend
    setAddProduct(false); // إغلاق الفورم بعد الإرسال
  };

  return (
    <div>

      {addProduct && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4 p-4 border rounded">
          <h3 className="text-lg font-bold mb-2">ادخل بيانات العناصر</h3>

          {items.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-4 gap-2 items-center border-b py-2"
            >
              <input
                type="text"
                placeholder="اسم المنتج"
                value={item.name}
                onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                className="border p-1 rounded col-span-1"
              />
              <input
                type="number"
                placeholder="السعر"
                value={item.price}
                onChange={(e) =>
                  handleItemChange(idx, "price", Number(e.target.value))
                }
                className="border p-1 rounded col-span-1"
              />
              <input
                type="number"
                placeholder="الكمية"
                value={item.stock}
                onChange={(e) =>
                  handleItemChange(idx, "stock", Number(e.target.value))
                }
                className="border p-1 rounded col-span-1"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => handleRemoveItem(idx)}
              >
                حذف
              </Button>
            </div>
          ))}

          <div className="flex justify-between mt-2">
            <Button type="button" onClick={handleAddItem}>
              إضافة عنصر جديد
            </Button>
            <Button type="submit" variant="accent">
              حفظ العناصر
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
