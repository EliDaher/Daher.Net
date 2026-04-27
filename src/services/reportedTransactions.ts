import axios from "axios";
import apiClient from "@/lib/axios";

export interface ReportedTransaction {
  id: string;
  number: string;
  company: string;
  note?: string;
  createdAt: string;
  createdBy?: string;
}

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export async function getReportedTransactions() {
  try {
    const response = await apiClient.get("/api/reported-transactions");
    return response.data.data as ReportedTransaction[];
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Failed to get reported transactions"),
    );
  }
}

export async function createReportedTransaction(data: {
  number: string;
  company: string;
  note?: string;
  createdBy?: string;
}) {
  try {
    const response = await apiClient.post("/api/reported-transactions", data);
    return response.data.data as ReportedTransaction;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Failed to create reported transaction"),
    );
  }
}

export async function deleteReportedTransaction(id: string) {
  try {
    const response = await apiClient.delete(`/api/reported-transactions/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(error, "Failed to delete reported transaction"),
    );
  }
}
