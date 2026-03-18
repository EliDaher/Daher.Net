import apiClient, { invoiceClient } from "@/lib/axios";
import axios from "axios";

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export default async function getPendingInvoices() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await invoiceClient.get("/api/admin/pending");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to get pending invoices"));
  }
}

export async function getDoneInvoices() {
  try {
    const response = await invoiceClient.get("/api/admin/user/allconfirmed");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to get confirmed invoices"));
  }
}

export async function getPayments() {
  try {
    const response = await invoiceClient.get("/api/saveBalance/all-admin");
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to get payments"));
  }
}

export async function confirmInvoice(id: string) {
  try {
    const response = await invoiceClient.patch(`/api/admin/confirm/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to confirm invoice"));
  }
}

export async function confirmPayment(id: string, email: string, amount: number) {
  try {
    const response = await invoiceClient.post("/api/admin/confirm-payment", {
      id,
      email,
      amount,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to confirm payment"));
  }
}

export async function rejectInvoice({
  payment,
  reason,
}: {
  payment: { id: string; email: string; amount: number };
  reason: string;
}) {
  try {
    const response = await invoiceClient.post(`/api/admin/reject/${payment.id}`, {
      email: payment.email,
      amount: payment.amount,
      reason,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to reject invoice"));
  }
}

export async function startPayment(id: string) {
  try {
    const response = await invoiceClient.patch(`/api/admin/start/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to start payment"));
  }
}

export async function getDoneInvoicesByDate(fromDate: string, toDate: string) {
  try {
    const response = await invoiceClient.get("/api/admin/payments/bydate", {
      params: {
        fromDate,
        toDate,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to get payments by date"));
  }
}

export async function searchInvoice(searchTerm: string) {
  try {
    const response = await apiClient.post("/api/invoices/searchInvoices", {
      searchValue: searchTerm,
    });
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to search invoices"));
  }
}

export async function deletePayment(id: string) {
  try {
    const response = await invoiceClient.delete(`/api/admin/delete/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to delete payment"));
  }
}
