import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { DataTable } from "@/components/dashboard/DataTable";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function InvoiceForm({ initialItems = [], products = []}) {
  const [addProduct, setAddProduct] = useState(true);
  const [items, setItems] = useState([]);
  useEffect(()=>{
    setItems(initialItems.map(item => ({ ...item })));
  }, [initialItems])
  
  const id = useParams().id;

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };
  


  const handleRemoveItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };


  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "price", label: "Price", sortable: true },
    { key: "category", label: "Category" },
    { key: "stock", label: "Stock" },
    { key: "description", label: "Description" },

  ];
  const apiBase = "https://paynet-1.onrender.com";
  const saveProductsToBill = async () => {
    try {
      
      await axios.put(`https://paynet-1.onrender.com/api/invoice/add-bill-items/${id}`, { items, initialItems  });
      toast.success('تم حفظ العناصر بنجاح');
      setAddProduct(false); // إغلاق الفورم بعد الإرسال

    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'حدث خطأ أثناء الحفظ');
    }
  };
  return (
    <div>

      {addProduct && (
        <form onSubmit={saveProductsToBill} className="mt-4 space-y-4 p-4 border rounded">
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

            <Button type="submit" variant="accent">
              حفظ العناصر
            </Button>
          </div>
        </form>
      )}
      <div>
        {products && (
          <div>
            <h3 className="text-lg font-bold mb-2 mt-4">المنتجات المتاحة</h3>
            <DataTable
              title="Products"
              description="All available products"
              columns={columns}
              data={products}
              renderRowActions={(product) => (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setItems(prev => {
                        const existingIndex = prev.findIndex(
                          item => item._id === product._id
                        );

                        // إذا موجود → زِد الكمية
                        if (existingIndex !== -1) {
                          const newItems = [...prev];
                          newItems[existingIndex].stock += 1;
                          return newItems;
                        }

                        // إذا غير موجود → أضفه جديد
                        return [
                          ...prev,
                          {
                            _id: product._id,
                            name: product.name,
                            price: product.price,
                            stock: 1
                          }
                        ];
                      });
                    }}

                    size="sm"
                  >
                    أضف إلى الفاتورة
                  </Button>
                </div>
              )}
            />



          </div>
        )}
      </div>
    </div>
  );
}
