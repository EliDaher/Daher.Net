import axios from "axios";
import apiClient from "@/lib/axios";

interface BalancePayload {
  amount: number;
  reason?: string;
  company: string;
  number?: string;
  companyId: string;
  port: string;
  paidAmount?: number;
  paymentNote?: string;
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

export default async function decreaseBalance({
  amount,
  reason,
  company,
  number,
  companyId,
  port,
}: BalancePayload) {
  try {
    const response = await apiClient.post("/api/company/decreaseBalance", {
      amount,
      reason,
      company,
      number,
      companyId,
      port,
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to decrease balance"));
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
}: BalancePayload) {
  try {
    const response = await apiClient.post("/api/company/increaseBalance", {
      amount,
      reason: reason || "اضافة رصيد",
      company,
      number: number || "0",
      companyId,
      port,
      paidAmount,
      paymentNote,
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to increase balance"));
  }
}

export async function addCompany({
  name,
  initialBalance,
  balanceLimit,
}: {
  name: string;
  initialBalance: number;
  balanceLimit: number;
}) {
  try {
    const response = await apiClient.post("/api/company/", {
      name,
      initialBalance,
      balanceLimit,
    });

    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to add company"));
  }
}

export async function getAllCompanies() {
  try {
    const response = await apiClient.get("/api/company/");
    return Object.values(response.data.companies);
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to get companies"));
  }
}

export async function getCompaniesLogs({
  fromDate,
  toDate,
}: {
  fromDate: string;
  toDate: string;
}) {
  try {
    const response = await apiClient.get("/api/company/logs", {
      params: { fromDate, toDate },
    });
    return Object.values(response.data.logs);
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to get company logs"));
  }
}
