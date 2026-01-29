import { DashboardLayout } from "@/components/layout/DashboardLayout";
import React from "react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import FormInput from "@/components/ui/custom/FormInput";
import { Button } from "@/components/ui/button";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [priceCost, setPriceCost] = useState(0);
  const [priceWolesale, setPriceWolesale] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!name || !price || !imageUrl || !category || !stock || !priceCost || !priceWolesale) {
      setMessage({
        type: "error",
        text: "الرجاء تعبئة الاسم والسعر وإضافة رابط الصورة.",
      });
      return;
    }

    const productData = {
      name,
      price,
      category,
      description,
      imageUrl,
      stock,
      priceCost,
      priceWolesale,
    };

    try {
      setUploading(true);

      const apiBase = "https://paynet-1.onrender.com";

      const res = await axios.post(`${apiBase}/api/product/add`, productData);

      setMessage({ type: "success", text: "تم رفع المنتج بنجاح!" });

      // reset form
      setName("");
      setPrice(0);
      setCategory("");
      setDescription("");
      setImageUrl("");
      setStock(0);
      setPriceCost(0);
      setPriceWolesale(0);
    } catch (err) {
      console.error(err);
      const errMsg =
        err?.response?.data?.message || err.message || "حصل خطأ أثناء الرفع";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setUploading(false);
    }
  };

  return (
    <DashboardLayout>
      <div>
        <form action="" onSubmit={handleSubmit} className="flex flex-col">
          <FormInput 
            label="اسم المنتج" 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 mb-4"
          />
          <FormInput 
            label="سعر المنتج" 
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 mb-4"
          />
          <FormInput 
            label="سعر التكلفة" 
            type="number"
            value={priceCost}
            onChange={(e) => setPriceCost(e.target.value)}
            className="mt-2 mb-4"
          />
          <FormInput 
            label="سعر الجملة" 
            type="number"
            value={priceWolesale}
            onChange={(e) => setPriceWolesale(e.target.value)}
            className="mt-2 mb-4"
          />
          <FormInput 
            label="صنف المنتج" 
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-2 mb-4"
          />
          <FormInput 
            label="الكمية" 
            type="text"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="mt-2 mb-4"
          />
          <FormInput 
            label="الوصف" 
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 mb-4"
          />
          <FormInput 
            label="رابط الصورة" 
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-2 mb-4"
          />
          <Button
            type="submit"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Product"}
          </Button>
          {message && (
            <p
              className={`mt-4 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
