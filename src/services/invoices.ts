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

export type PosPayment = {
  _id: string;
  destination?: string;
  name?: string;
  number?: string;
  operator?: string;
  amount?: number;
  noticeNumber?: string;
  date?: string;
  isConfirmed?: boolean;
  createdAt?: string;
  [key: string]: unknown;
};

export type DoneInternetPayment = {
  _id: string;
  landline?: string;
  company?: string;
  speed?: string;
  email?: string;
  amount?: number;
  status?: string;
  paymentMethod?: string;
  note?: string;
  createdAt?: string;
  [key: string]: unknown;
};

export type PaginationParams = {
  page?: number;
  limit?: number;
  [key: string]: string | number | boolean | undefined;
};

export type GetPaymentsParams = PaginationParams;

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedPaymentsResponse = PaginatedResponse<PosPayment>;

export type GetDoneInvoicesByDateParams = PaginationParams & {
  fromDate: string;
  toDate: string;
};

export type PaginatedDoneInvoicesResponse = PaginatedResponse<DoneInternetPayment>;

function toPositiveNumber(value: unknown, fallback: number) {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
}

function normalizePaginatedResponse<T>(
  payload: unknown,
  params: PaginationParams = {},
): PaginatedResponse<T> {
  const response = (payload ?? {}) as Record<string, any>;
  const nestedData = response.data as unknown;
  const body = (
    nestedData && !Array.isArray(nestedData) ? nestedData : response
  ) as Record<string, any>;
  const pagination = (body.pagination ?? response.pagination ?? body.meta ?? response.meta ?? {}) as Record<
    string,
    any
  >;

  const dataSource = Array.isArray(nestedData)
    ? nestedData
    : Array.isArray(body.data)
      ? body.data
      : Array.isArray(body.payments)
        ? body.payments
        : Array.isArray(payload)
          ? payload
          : [];

  const page = toPositiveNumber(
    body.page ?? pagination.page ?? response.page ?? params.page,
    params.page ?? 1,
  );
  const limit = toPositiveNumber(
    body.limit ?? pagination.limit ?? response.limit ?? params.limit,
    (params.limit ?? dataSource.length) || 10,
  );
  const total = toPositiveNumber(
    body.total ??
      pagination.total ??
      body.count ??
      pagination.count ??
      response.total ??
      dataSource.length,
    dataSource.length,
  );
  const totalPages = toPositiveNumber(
    body.totalPages ?? pagination.totalPages ?? pagination.pages ?? response.totalPages,
    Math.max(1, Math.ceil(total / limit)),
  );

  return {
    data: dataSource as T[],
    page,
    limit,
    total,
    totalPages,
  };
}

export async function getPayments(
  params: GetPaymentsParams = {},
): Promise<PaginatedPaymentsResponse> {
  try {
    const response = await invoiceClient.get("/api/saveBalance/all-admin", {
      params,
    });
    return normalizePaginatedResponse<PosPayment>(response.data, params);
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

export async function getDoneInvoicesByDate({
  fromDate,
  toDate,
  page,
  limit,
}: GetDoneInvoicesByDateParams): Promise<PaginatedDoneInvoicesResponse> {
  try {
    const response = await invoiceClient.get("/api/admin/payments/bydate", {
      params: {
        fromDate,
        toDate,
        page,
        limit,
      },
    });
    return normalizePaginatedResponse<DoneInternetPayment>(response.data, {
      fromDate,
      toDate,
      page,
      limit,
    });
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
