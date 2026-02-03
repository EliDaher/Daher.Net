import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddUserProps {
  onSubmit?: (userData: any) => void;
}

export default function AddUser({ onSubmit }: AddUserProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    number: "",
    card: {
      cardInternet: true,
      cardSyriatel: true,
      cardPlay: true,
      cardapplication: true,
      cardPronet: false,
      cardHifi: false,
    },
    role: "user",
    balance: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleCardChange = (cardKey: string, checked: boolean) => {
    setFormData({
      ...formData,
      card: {
        ...formData.card,
        [cardKey]: checked,
      },
    });
  };

  const handleRoleChange = (value: string) => {
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
    // Reset form or handle submission
    setFormData({
      email: "",
      password: "",
      name: "",
      number: "",
      card: {
        cardInternet: true,
        cardSyriatel: true,
        cardPlay: true,
        cardapplication: true,
        cardPronet: false,
        cardHifi: false,
      },
      role: "user",
      balance: 0,
    });
  };

  return (
    <div dir="rtl" className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">إضافة مستخدم جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            id="email"
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="password">كلمة المرور</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="name">الاسم</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="number">الرقم</Label>
          <Input
            id="number"
            name="number"
            type="text"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>البطاقات</Label>
          <div className="space-y-2">
            {Object.entries(formData.card).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => handleCardChange(key, checked as boolean)}
                />
                <Label htmlFor={key}>{key.replace("card", "")}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="role">الدور</Label>
          <Select value={formData.role} onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="اختر الدور" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">مستخدم</SelectItem>
              <SelectItem value="admin">مدير</SelectItem>
              {/* أضف المزيد حسب الحاجة */}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="balance">الرصيد</Label>
          <Input
            id="balance"
            name="balance"
            type="number"
            value={formData.balance}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          إضافة المستخدم
        </Button>
      </form>
    </div>
  );
}
