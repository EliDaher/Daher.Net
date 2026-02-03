import { invoiceClient } from "@/lib/axios";

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
    return res.data
    alert("تم حذف المستخدم")

  }catch(err){
    console.error("خطأ في الحذف", err);

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
  
