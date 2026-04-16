import axios from "axios";
import apiClient from "@/lib/axios";

type CreatePosProfitLogPayload = {
  invoiceId: string;
  amount: number;
  company?: string;
  email?: string;
  number?: string;
  operator?: string;
  source: "pending_transactions";
  operationState?: string;
};

export type PosProfitLogRecord = {
  id: string;
  invoiceId: string;
  amount: number;
  profitRate: number;
  profitAmount: number;
  company?: string;
  email?: string;
  number?: string;
  operator?: string;
  source: "pending_transactions";
  operationState?: string;
  createdAt: string;
  dateKey: string;
};

type PosProfitLogsResponse = {
  logs: PosProfitLogRecord[];
  summary: {
    totalProfitAmount: number;
    totalAmount: number;
    count: number;
  };
};

type GetPosProfitLogsParams = {
  fromDate?: string;
  toDate?: string;
  limit?: number;
};

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export async function createPosProfitLog(payload: CreatePosProfitLogPayload) {
  try {
    const response = await apiClient.post("/api/profit-logs/pos", payload);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to create POS profit log"));
  }
}

export async function getPosProfitLogs(params: GetPosProfitLogsParams = {}) {
  try {
    const response = await apiClient.get("/api/profit-logs/pos", { params });
    return (response.data?.data || {
      logs: [],
      summary: { totalProfitAmount: 0, totalAmount: 0, count: 0 },
    }) as PosProfitLogsResponse;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to fetch POS profit logs"));
  }
}
