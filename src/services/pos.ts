import { invoiceClient } from "@/lib/axios";


export default async function getPOSUsers() {
    try {
        const res = await invoiceClient.get("/api/admin/all-user");
        return res.data;
    } catch (error) {
        console.error("Error getting invoices:", error);
        return { success: false, error };
    }
}

export async function getPOSDebt() {
    try {
        const res = await invoiceClient.get("/api/admin/daen");
        console.log(res.data)
        return res.data;
    } catch (error) {
        console.error("Error getting invoices:", error);
        return { success: false, error };
    }
}

export async function addPOSPayment({id, amount}) {
    try {
        const res = await invoiceClient.put(`/api/admin/addbatch/${id}`,{
            amount
        });
        return res.data;
    } catch (error) {
        console.error("Error getting invoices:", error);
        return { success: false, error };
    }
}

export async function endPOSDebt({id, email, amount}) {
    try {
        const res = await invoiceClient.post(`/api/admin/confirm-daen`,{
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

export async function addPOSUser({formData, email}) {
    try {
        const res = await invoiceClient.post(`/api/point/add-point`,{
            formData,
            email,
        });
        return res.data;
    } catch (error) {
        console.error("Error getting invoices:", error);
        return { success: false, error };
    }
}
export async function sendInvoice({ formData, email }) {
  try {
    const {
      landline,
      selectedCompany,
      selectedSpeed,
      amountToPay,
      paymentType,
    } = formData;

    const res = await invoiceClient.post(
      "https://paynet-1.onrender.com/api/payment/internet-full",
      {
        landline,
        company: selectedCompany,
        speed: selectedSpeed,
        amount: Number(amountToPay),
        email,
        paymentType,
      },
    );

    return res.data;
  } catch (error) {
    console.error("Error sending invoice:", error);

    return {
      success: false,
      message:
        error?.response?.data?.message ||
        "Failed to send invoice, please try again",
      status: error?.response?.status,
    };
  }
}
