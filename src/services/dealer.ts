import apiClient from "@/lib/axios";


export default async function addPaymentDealer(data: {
  amount: number;
  date: string; // "2025-01-18"
  details: string;
  subscriberID: string;
  total: number;
  dealer?: string;
}) {
  try {
    console.log(data)
    const response = await apiClient.post("/api/dealer/addPayment", data);
    return response.data; // { message, paymentID, newTotal }
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error };
  }
}