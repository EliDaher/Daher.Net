import { invoiceClient } from "@/lib/axios";
import axios from "axios";
import exp from "constants";
import { toast } from "sonner";
import { T } from "vitest/dist/chunks/reporters.d.C-cu31ET.js";

export default async function getPOSUsers() {
  try {
    const res = await invoiceClient.get("/api/admin/all-user");

    return res.data;
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

export async function getPOSBalanceReport() {
  try {
    const res = await invoiceClient.get(
      "/api/admin/getPOSBalanceReport",
    );

    console.log(res.data)
    return res.data;
  } catch (error) {
    console.error("Error getting invoices:", error);
    throw new Error("Error getting invoices");
  }
}

export async function getPOSDebt() {
  try {
    const res = await invoiceClient.get("/api/admin/daen");
    return res.data;
  } catch (error) {
    console.error("Error getting invoices:", error);
    return { success: false, error };
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