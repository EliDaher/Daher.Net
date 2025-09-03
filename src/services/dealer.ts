import apiClient from "@/lib/axios";
import { subscribe } from "diagnostics_channel";


export default async function addPaymentDealer(data: {
  amount: number;
  date: string; // "2025-01-18"
  details: string;
  subscriberID: string;
  total: number;
  dealer?: string;
}) {
  try {
    const response = await apiClient.post("/api/dealer/addPayment", data);
    return response.data;
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error };
  }
}

export async function getPaymentDealer() {
  try {
    const response = await apiClient.get("/api/dealer/getPayments");
    const data: any = Object.values(response.data.Payments)
    const DataWithNmae = data.map(d => ({
        ...d,
        subscriberName: d.subscriber?.Name
      })
    ) 
    return DataWithNmae;
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error };
  }
}