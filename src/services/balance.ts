import apiClient from "@/lib/axios";

export type BillCategoryTotals = {
  internetTotal: number;
  elecTotal: number;
  waterTotal: number;
  phoneTotal: number;
};

export type BillCategoryTotalsFilters = {
  date?: string;
  employee?: string;
  category?: string;
};

export type ElectricityTransaction = {
  id: string;
  invoiceId?: string;
  employee: string;
  date: string;
  createdAt: string;
  reviewed: boolean;
  reviewedAt?: string;
  category: "elecTotal";
  customerName: string;
  customerNumber: string;
  customerDetails: string;
  invoiceNumber: string;
  invoiceValue: number;
};

export type ElectricityTransactionFilters = {
  date?: string;
  employee?: string;
  reviewed?: string;
};

export type UpdateElectricityTransactionReviewedPayload = {
  id: string;
  date: string;
  reviewed: boolean;
};

export type AddBillInvoicePayload = {
  amount: number;
  employee: string;
  details: any[];
  categoryTotals: BillCategoryTotals;
};

export default async function getTodyBalance(date?: string) {
  try {
    const response = await apiClient.get("/api/balance/getTotalDayBalance", {
      params: date ? { date } : {},
    });

    return response.data;
  } catch (err) {
    console.error("خطأ في جلب الرصيد اليومي:", err);
  }
}

export async function getBalanceByDate(date?: string) {
  try {
    const response = await apiClient.get("/api/balance/getTotalBalance", {
      params: date ? { date } : {},
    });

    return response.data.BalanceTable;
  } catch (err) {
    console.error("خطأ في جلب الرصيد اليومي:", err);
  }
}

export async function getEmployeeBalanceTable(username: string, date?: string) {
  try {
    const response = await apiClient.get("/api/balance/getEmployeeBalanceTable", {
      params: { username, date },
    });

    return response.data;
  } catch (err) {
    console.error("خطأ في جلب الرصيد اليومي:", err);
  }
}

export async function getDailyBalance() {
  try {
    const response = await apiClient.get("/api/balance/getDailyBalance");

    console.log(response)
    return response.data;
  } catch (err) {
    console.error("خطأ في جلب الرصيد اليومي:", err);
  }
}

export async function addMofadale(mofData) {
  try {
    const response = await apiClient.post("/api/balance/addMofadale", mofData);

    console.log(response)
    return response.data;
  } catch (err) {
    console.error("خطأ في جلب الرصيد اليومي:", err);
  }
}

export async function addBillInvoice(payload: AddBillInvoicePayload) {
  try {
    const response = await apiClient.post("/api/balance/addBillInvoice", payload);

    return response.data;
  } catch (err) {
    console.error("خطأ في حفظ الفواتير المصنفة:", err);
    throw err;
  }
}

export async function getBillCategoryTotals({
  date,
  employee = "all",
  category = "all",
}: BillCategoryTotalsFilters = {}) {
  try {
    const response = await apiClient.get("/api/balance/getBillCategoryTotals", {
      params: { date, employee, category },
    });

    return response.data;
  } catch (err) {
    console.error("خطأ في جلب إجماليات الفواتير المصنفة:", err);
    throw err;
  }
}

export async function getElectricityTransactions({
  date,
  employee = "all",
  reviewed = "all",
}: ElectricityTransactionFilters = {}) {
  try {
    const response = await apiClient.get("/api/balance/electricityTransactions", {
      params: { date, employee, reviewed },
    });

    return response.data;
  } catch (err) {
    console.error("Ø®Ø·Ø£ ÙÙŠ Ø¬Ù„Ø¨ Ø­Ø±ÙƒØ§Øª Ø§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¡:", err);
    throw err;
  }
}

export async function updateElectricityTransactionReviewed({
  id,
  date,
  reviewed,
}: UpdateElectricityTransactionReviewedPayload) {
  try {
    const response = await apiClient.patch(
      `/api/balance/electricityTransactions/${id}`,
      { date, reviewed },
    );

    return response.data;
  } catch (err) {
    console.error("Ø®Ø·Ø£ ÙÙŠ ØªØ­Ø¯ÙŠØ« Ø­Ø§Ù„Ø© Ø­Ø±ÙƒØ© Ø§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¡:", err);
    throw err;
  }
}
