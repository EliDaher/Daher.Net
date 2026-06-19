import { invoiceClient } from "@/lib/axios";
import { toast } from "sonner";

export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type POSUserRow = {
  _id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  balance?: number | string;
  number?: string;
  [key: string]: unknown;
};

export type POSDebtRow = {
  _id: string;
  destination?: string;
  name?: string;
  email?: string;
  number?: string;
  operator?: string;
  amount?: number | string;
  date?: string;
  [key: string]: unknown;
};

export type POSBalanceReportRow = {
  _id?: string;
  name?: string;
  email?: string;
  confirmedDeposits?: number | string;
  expensesPaid?: number | string;
  netBalance?: number | string;
  balance?: number | string;
  expensesInProgress?: number | string;
  totalDeposits?: number | string;
  finalBalance?: number | string;
  unconfirmedDeposits?: number | string;
  expensesUnpaid?: number | string;
  totalExpenses?: number | string;
  [key: string]: unknown;
};

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
      : Array.isArray(body.users)
        ? body.users
        : Array.isArray(body.debts)
          ? body.debts
          : Array.isArray(body.report)
            ? body.report
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

export default async function getPOSUsers(
  params: PaginationParams = {},
): Promise<PaginatedResponse<POSUserRow>> {
  try {
    const res = await invoiceClient.get("/api/admin/all-user", { params });

    return normalizePaginatedResponse<POSUserRow>(res.data, params);
  } catch (error) {
    console.error("Error getting invoices:", error);
    throw new Error("Error getting invoices");
  }
}

export  async function deleteUser({id}) {
  try{
    console.log(id)
    const confirmed = window.confirm("هل انت متاكد من حذف المستخدم");
    if (!confirmed) return;
    const res = await invoiceClient.delete(`/api/admin/deleteuser/${id}`)
    toast.success("تم حذف المستخدم")
    return res.data

  }catch(err){
    console.error("خطأ في الحذف", err);
    toast.error("حدث خطأ أثناء حذف المستخدم");
    return { success: false, error: err };
  }
  
}

export async function getPOSBalanceReport(
  params: PaginationParams = {},
): Promise<PaginatedResponse<POSBalanceReportRow>> {
  try {
    const res = await invoiceClient.get("/api/admin/getPOSBalanceReport", {
      params,
    });

    return normalizePaginatedResponse<POSBalanceReportRow>(res.data, params);
  } catch (error) {
    console.error("Error getting invoices:", error);
    throw new Error("Error getting invoices");
  }
}

export async function getPOSDebt(
  params: PaginationParams = {},
): Promise<PaginatedResponse<POSDebtRow>> {
  try {
    const res = await invoiceClient.get("/api/admin/daen", { params });
    return normalizePaginatedResponse<POSDebtRow>(res.data, params);
  } catch (error) {
    console.error("Error getting invoices:", error);
    throw new Error("Error getting POS debts");
  }
}

export async function addPOSPayment({ id, amount }) {
  try {
    const res = await invoiceClient.put(`/api/admin/addbatch/${id}`, {
      amount,
    });
    return res.data;
  } catch (error) {
    console.error("Error getting invoices:", error);
    return { success: false, error };
  }
}

export async function endPOSDebt({ id, email, amount }) {
  try {
    const res = await invoiceClient.post(`/api/admin/confirm-daen`, {
      id,
      email,
      amount,
    });
    return res.data;
  } catch (error) {
    console.error("Error getting invoices:", error);
    return { success: false, error };
  }
}

export async function addPOSUser({ formData, email }) {
  try {
    const res = await invoiceClient.post(`/api/point/add-point`, {
      formData,
      email,
    });
    return res.data;
  } catch (error) {
    console.error("Error getting invoices:", error);
    return { success: false, error };
  }
}
export async function sendInvoice({ formData }) {
  try {
    const {
      landline,
      selectedCompany,
      selectedSpeed,
      amountToPay,
      paymentType,
      email,
    } = formData;

    console.log({
        landline,
        company: selectedCompany,
        speed: selectedSpeed,
        amount: Number(amountToPay),
        email: email,
        paymentType,
        
    })

    const res = await invoiceClient.post(
      "https://paynet-1.onrender.com/api/payment/adminPayInternet",
      {
        landline,
        company: selectedCompany,
        speed: selectedSpeed,
        amount: Number(amountToPay),
        email: email,
        paymentType,
      },
    );

    return res.data;
  } catch (error) {
    console.error("Error sending invoice:", error);
    throw new Error("Error sending invoice");

  }
}

export async function AddNewUser(formData) {
  try {
    const res = await invoiceClient.post('/api/user', formData);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Error adding user");
  }
}

export async function productName(){
  try {
    const res = await invoiceClient.get('/api/productonline/get-product-online/name');
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching products");
  }
}

export async function productNameDetails(id:string) {
  try {
    const res = await invoiceClient.get(`/api/productonline/get-product-online/name/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching products");
  }
}

export async function updateProduct(product) {
  const res = await invoiceClient.put(
    `/api/productonline/update/${product._id}`,
    product
  );

  return res.data;
}

export async function addProduct(formData:object , id:string) {
try{
    const res = await invoiceClient.post(
    `/api/productonline/add-card/${id}`
    , formData
  )
  return res.data
}
catch(err){
  console.log(err)
}
  
}

export async function deleteProductOnline(id:string) {
  try{
    const res =await invoiceClient.delete(
      `/api/productOnline/delete/${id}`
    )
    return res.data

  }
  catch(err){
    console.log(err)
  }
  
}

export async function addType(formData:object) {
  try{
    const res = await invoiceClient.post('/api/productOnline/addType' , formData)
    return res.data
  }
  catch(err){
    console.log(err)
  }
  
}
