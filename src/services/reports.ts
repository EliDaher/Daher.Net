import apiClient from "@/lib/axios";

export default async function monthlyRevenue() {
  try {
    const response = await apiClient.get(`/api/reports/monthly-revenue`);
    const data = await response.data.data
    return data;
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    return { success: false, error };
  }
}

export async function getInquiryLogs() {
  try {
    const response = await apiClient.get(`/api/reports/InquiryLogs`);
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("Error fetching monthly revenue:", error);
    return { success: false, error };
  }
}
