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
