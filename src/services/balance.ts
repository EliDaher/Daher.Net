import apiClient from "@/lib/axios";

export type BillCategoryTotals = {
  internetTotal: number;
  elecTotal: number;
  waterTotal: number;
  phoneTotal: number;
  otherTotal: number;
};

export type BillCategoryTotalsFilters = {
  date?: string;
  employee?: string;
  category?: string;
};

export type BillTransactionCategory = "elecTotal" | "phoneTotal";
export type BillTransactionInvoiceGroup = "shopNumbers" | "otherNumbers";

export const BILL_TRANSACTION_INVOICE_GROUP_LABELS: Record<
  BillTransactionInvoiceGroup,
  string
> = {
  shopNumbers: "من ارقام المحل",
  otherNumbers: "ليس من ارقام المحل",
};

export type BillTransaction = {
  id: string;
  invoiceId?: string;
  employee: string;
  date: string;
  createdAt: string;
  reviewed: boolean;
  reviewedAt?: string;
  category: BillTransactionCategory;
  customerName: string;
  customerNumber: string;
  customerDetails: string;
  invoiceNumber: string;
  invoiceValue: number;
  invoiceGroup?: BillTransactionInvoiceGroup;
  invoiceGroupLabel?: string;
};

export type BillTransactionFilters = {
  date?: string;
  fromDate?: string;
  toDate?: string;
  employee?: string;
  reviewed?: string;
  category?: BillTransactionCategory;
  allDates?: boolean;
};

export type BillTransactionsResponse = {
  data: BillTransaction[];
  [key: string]: unknown;
};

export type UpdateBillTransactionReviewedPayload = {
  id: string;
  date: string;
  reviewed: boolean;
  category?: BillTransactionCategory;
};

export type ElectricityTransaction = BillTransaction & { category: "elecTotal" };
export type ElectricityTransactionFilters = BillTransactionFilters;
export type ElectricityTransactionsResponse = BillTransactionsResponse;
export type UpdateElectricityTransactionReviewedPayload =
  UpdateBillTransactionReviewedPayload;

export type AddBillInvoicePayload = {
  amount: number;
  employee: string;
  details: any[];
  categoryTotals: BillCategoryTotals;
};

export function getBillTransactionInvoiceGroup(
  transaction: Pick<BillTransaction, "invoiceNumber">,
): BillTransactionInvoiceGroup {
  return String(transaction.invoiceNumber || "").trim()
    ? "shopNumbers"
    : "otherNumbers";
}

export function withBillTransactionInvoiceGroup(
  transaction: BillTransaction,
): BillTransaction {
  const invoiceGroup = getBillTransactionInvoiceGroup(transaction);

  return {
    ...transaction,
    invoiceGroup,
    invoiceGroupLabel: BILL_TRANSACTION_INVOICE_GROUP_LABELS[invoiceGroup],
  };
}

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

export async function getBillTransactions({
  date,
  fromDate,
  toDate,
  employee = "all",
  reviewed = "all",
  category = "elecTotal",
  allDates,
}: BillTransactionFilters = {}) {
  try {
    const response = await apiClient.get("/api/balance/electricityTransactions", {
      params: { date, fromDate, toDate, employee, reviewed, category, allDates },
    });

    return response.data;
  } catch (err) {
    console.error("Ø®Ø·Ø£ ÙÙŠ Ø¬Ù„Ø¨ Ø­Ø±ÙƒØ§Øª Ø§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¡:", err);
    throw err;
  }
}

export async function getElectricityTransactions(
  filters: ElectricityTransactionFilters = {},
) {
  return getBillTransactions({
    ...filters,
    category: "elecTotal",
  });
}

function parseDateInput(date: string) {
  const [year, month, day] = date.split("-").map(Number);

  return new Date(year, month - 1, day);
}

function formatDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getDatesInRange(fromDate: string, toDate: string) {
  const dates: string[] = [];
  const currentDate = parseDateInput(fromDate);
  const lastDate = parseDateInput(toDate);

  while (currentDate <= lastDate) {
    dates.push(formatDateInput(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

function normalizeBillTransactionsResponse(
  response: unknown,
): BillTransactionsResponse {
  if (Array.isArray(response)) {
    return { data: response };
  }

  const payload = (response ?? {}) as Partial<BillTransactionsResponse>;

  return {
    ...payload,
    data: Array.isArray(payload.data) ? payload.data : [],
  };
}

function transactionMatchesCategory(
  transaction: BillTransaction,
  category: BillTransactionCategory,
) {
  if (transaction.category === category) {
    return true;
  }

  const details = String(transaction.customerDetails || "").toLowerCase();

  if (category === "phoneTotal") {
    return (
      details.includes("ارضي") ||
      details.includes("أرضي") ||
      details.includes("ارض")
    );
  }

  return details.includes("كهرب");
}

export async function getBillTransactionsByDateRange({
  fromDate,
  toDate,
  employee = "all",
  reviewed = "all",
  category = "elecTotal",
  allDates = false,
}: Pick<BillTransactionFilters, "fromDate" | "toDate"> &
  Pick<BillTransactionFilters, "employee" | "reviewed" | "category" | "allDates">) {
  if (allDates) {
    const response = await getBillTransactions({
      employee,
      reviewed,
      category,
      allDates: true,
    });
    const data = normalizeBillTransactionsResponse(response).data
      .filter((transaction) => transactionMatchesCategory(transaction, category))
      .map((transaction) =>
        withBillTransactionInvoiceGroup({ ...transaction, category }),
      );

    return {
      data: data.sort((first, second) => {
        const firstDate = new Date(first.createdAt || first.date).getTime();
        const secondDate = new Date(second.createdAt || second.date).getTime();

        return secondDate - firstDate;
      }),
    };
  }

  if (!fromDate || !toDate) {
    return { data: [] };
  }

  const dates = getDatesInRange(fromDate, toDate);
  const responses = await Promise.all(
    dates.map((date) =>
      getBillTransactions({
        date,
        employee,
        reviewed,
        category,
      }),
    ),
  );
  const data = responses
    .flatMap((response) => normalizeBillTransactionsResponse(response).data)
    .filter((transaction) => transactionMatchesCategory(transaction, category))
    .map((transaction) =>
      withBillTransactionInvoiceGroup({ ...transaction, category }),
    );

  return {
    data: data.sort((first, second) => {
      const firstDate = new Date(first.createdAt || first.date).getTime();
      const secondDate = new Date(second.createdAt || second.date).getTime();

      return secondDate - firstDate;
    }),
  };
}

export async function getElectricityTransactionsByDateRange(
  filters: Required<Pick<ElectricityTransactionFilters, "fromDate" | "toDate">> &
    Pick<ElectricityTransactionFilters, "employee" | "reviewed">,
) {
  return getBillTransactionsByDateRange({
    ...filters,
    category: "elecTotal",
  });
}

export async function updateBillTransactionReviewed({
  id,
  date,
  reviewed,
  category = "elecTotal",
}: UpdateBillTransactionReviewedPayload) {
  try {
    const response = await apiClient.patch(
      `/api/balance/electricityTransactions/${id}`,
      { date, reviewed, category },
    );

    return response.data;
  } catch (err) {
    console.error("Ø®Ø·Ø£ ÙÙŠ ØªØ­Ø¯ÙŠØ« Ø­Ø§Ù„Ø© Ø­Ø±ÙƒØ© Ø§Ù„ÙƒÙ‡Ø±Ø¨Ø§Ø¡:", err);
    throw err;
  }
}

export async function updateElectricityTransactionReviewed(
  payload: UpdateElectricityTransactionReviewedPayload,
) {
  return updateBillTransactionReviewed({
    ...payload,
    category: "elecTotal",
  });
}
