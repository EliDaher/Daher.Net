import React, { useState } from "react";
import PopupForm from "../ui/custom/PopupForm";
import FormInput from "../ui/custom/FormInput";
import { Button } from "../ui/button";
import axios from "axios";
import { useAddProduct } from "@/hooks/useProducts";

export default function ProductOnline({ isOpen, setIsOpen, productId }) {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    price: "",
    priceOnweb: "",
    min: "",
    multiplier: "",
    url: "",
    btntext: "",
    btnbg: "",
    hoverbtn: "",
    spanbg: "",
    bgdown: "",
    image: "",
    border: "",
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const {mutate , isPending , isError} = useAddProduct();
const handleSubmit = (e) => {
  e.preventDefault();

  mutate(
    { id: productId, formData },
    {
      onSuccess: () => {
        alert("تمت إضافة البطاقة");
        setIsOpen(false);
      },
    }
  );
};

  return (
    <PopupForm
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={<Button className="w-full">اضافة بطاقة</Button>}
    >
      <form onSubmit={handleSubmit}  className="space-y-3">

        <FormInput
          label="اسم المنتج"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <FormInput
          label="العنوان"
          type="text"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <FormInput
          label="الوصف"
          type="text"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <FormInput
          label="السعر"
          type="number"
          value={formData.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />

        <FormInput
          label="السعر على الويب"
          type="number"
          value={formData.priceOnweb}
          onChange={(e) => handleChange("priceOnweb", e.target.value)}
        />

        <FormInput
          label="الحد الأدنى"
          type="number"
          value={formData.min}
          onChange={(e) => handleChange("min", e.target.value)}
        />

        <FormInput
          label="المضاعف"
          type="number"
          value={formData.multiplier}
          onChange={(e) => handleChange("multiplier", e.target.value)}
        />

        <FormInput
          label="الرابط"
          type="text"
          value={formData.url}
          onChange={(e) => handleChange("url", e.target.value)}
        />
        <FormInput
          label="اسم الزر"
          type="text"
          value={formData.btntext}
          onChange={(e) => handleChange("btntext", e.target.value)}
        />
        <FormInput
          label="خلفية الزر"
          type="text"
          value={formData.btnbg}
          onChange={(e) => handleChange("btnbg", e.target.value)}
        />
        <FormInput
          label="hover الزر"
          type="text"
          value={formData.hoverbtn}
          onChange={(e) => handleChange("hoverbtn", e.target.value)}
        />
        <FormInput
          label="spanbg الزر"
          type="text"
          value={formData.spanbg}
          onChange={(e) => handleChange("spanbg", e.target.value)}
        />
        <FormInput
          label="bgdown الزر"
          type="text"
          value={formData.bgdown}
          onChange={(e) => handleChange("bgdown", e.target.value)}
        />
        <FormInput
          label="border الزر"
          type="border"
          value={formData.border}
          onChange={(e) => handleChange("border", e.target.value)}
        />

        
        <FormInput
          label="رابط الصورة"
          type="text"
          value={formData.image}
          onChange={(e) => handleChange("image", e.target.value)}
        />
        

        <Button type="submit" className="w-full">
          حفظ
        </Button>

      </form>
    </PopupForm>
  );
}