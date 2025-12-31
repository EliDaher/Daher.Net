import apiClient from "@/lib/axios";


export default async function addPendingExchange(data: {
    sypAmount: number,
    usdAmount: number,
    details: string,

}) {
    try {
        const response = await apiClient.post("/api/exchange/addPending", data);
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error };
    }
}

export async function deletePendingExchange(data: {
    id: string
}) {
    try {
        const response = await apiClient.delete("/api/exchange/deletePending", {data});
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error };
    }
}

export async function getPendingExchange() {
    try {
        const response = await apiClient.get("/api/exchange/getPending");
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error };
    }
}

export async function addDoneExchange(data: {
    sypAmount: number,
    usdAmount: number,
    details: string,
    finalSYP: number,
    finalUSD: number

}) {
    try {
        const response = await apiClient.post("/api/exchange/addDone", data);
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error };
    }
}

export async function deleteDoneExchange(data: {
    id: string
}) {
    try {
        const response = await apiClient.delete("/api/exchange/deleteDone", {data});
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error };
    }
}

export async function getDoneExchange() {
    try {
        const response = await apiClient.get("/api/exchange/getDone");
        return response.data;
    } catch (error) {
        console.error("Error adding payment:", error);
        return { success: false, error };
    }
}