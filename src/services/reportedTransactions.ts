import axios from "axios";
import apiClient from "@/lib/axios";

export interface ReportedTransaction {
  id: string;
  number: string;
  company: string;
  note?: string;
  status?: "active" | "done";
  updatedAt?: string;
  completedAt?: string;
  completedBy?: string;
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

export interface ReportHistoryEntry {
  id: string;
  action: "created" | "edited" | "done" | "reopened";
  user: string;
  at: string;
  changes: Record<string, { before: string; after: string }>;
}
export async function updateReportedTransaction(data: {
  id: string;
  number?: string;
  company?: string;
  note?: string;
  status?: "active" | "done";
  updatedBy?: string;
}) {
  try {
    const { id, ...body } = data;
    const response = await apiClient.patch(
      `/api/reported-transactions/${id}`,
      body,
    );
    return response.data.data as ReportedTransaction;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to update report"));
  }
}
export async function getReportedTransactionHistory(id: string) {
  try {
    const response = await apiClient.get(
      `/api/reported-transactions/${id}/history`,
    );
    return response.data.data as ReportHistoryEntry[];
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to load history"));
  }
}
