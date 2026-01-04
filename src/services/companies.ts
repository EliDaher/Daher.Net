import apiClient from "@/lib/axios";

export default async function decreaseBalance({
  amount,
  reason,
  company,
  number,
  companyId,
  port,
}) {
  try {
    const response = await apiClient.post("/api/company/decreaseBalance", {
      amount,
      reason,
      company,
      number,
      companyId,
      port,
    });
    console.log(response.data)

    return response.data;
  } catch (err) {
    console.error("خطا في انقاص الرصيد:", err);
    throw new Error(err);
  }
}

export async function increaseBalance({
  amount,
  reason,
  company,
  number,
  companyId,
  port,
  paidAmount,
  paymentNote,
}) {
  try {
    const response = await apiClient.post("/api/company/increaseBalance", {
      amount,
      reason : reason || "اضافة رصيد",
      company,
      number: number || "0",
      companyId,
      port,
      paidAmount,
      paymentNote,
    });

    return response.data;
  } catch (err) {
    console.error("خطا في انقاص الرصيد:", err);
    throw new Error(err);
  }
}

export async function addCompany({ name, initialBalance, balanceLimit }) {
  try {
    const response = await apiClient.post("/api/company/", {
      name,
      initialBalance,
      balanceLimit,
    });

    return response.data;
  } catch (err) {
    console.error("خطأ في اضافة الشركة:", err);
    throw new Error(err);
  }
}

export async function getAllCompanies() {
  try {
    const response = await apiClient.get("/api/company/");

    return Object.values(response.data.companies);
  } catch (err) {
    console.error("خطأ في جلب الشركات:", err);
    throw new Error(err);
  }
}
