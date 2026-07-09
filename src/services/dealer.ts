import apiClient from "@/lib/axios";

type DealerPayment = {
  Amount?: number | string;
  amount?: number | string;
  Date?: string;
  date?: string;
  dealer?: string;
  subscriberName?: string;
  subscriber?: {
    Name?: string;
    dealer?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

function normalizeDealerName(value: unknown) {
  return String(value || "").trim();
}

export default async function addPaymentDealer(data: {
  amount: number;
  date: string; // "2025-01-18"
  details: string;
  subscriberID: string;
  total: number;
  dealer?: string;
}) {
  try {
    const response = await apiClient.post("/api/dealer/addPayment", data);
    return response.data;
  } catch (error) {
    console.error("Error adding payment:", error);
    return { success: false, error };
  }
}

export async function getPaymentDealer(dealer?: string) {
  try {
    const response = await apiClient.get("/api/dealer/getPayments", {
      params: dealer ? { dealer } : undefined,
    });
    const paymentsPayload = response.data?.Payments ?? response.data?.payments ?? [];
    const data: DealerPayment[] = Array.isArray(paymentsPayload)
      ? paymentsPayload
      : Object.values(paymentsPayload);
    const dealerName = normalizeDealerName(dealer);

    return data
      .map((payment) => {
        const paymentDealer = normalizeDealerName(
          payment.dealer || payment.subscriber?.dealer,
        );

        return {
          ...payment,
          Amount: payment.Amount ?? payment.amount ?? 0,
          Date: payment.Date ?? payment.date ?? "",
          dealer: paymentDealer,
          subscriberName: payment.subscriberName || payment.subscriber?.Name || "",
        };
      })
      .filter((payment) =>
        dealerName ? normalizeDealerName(payment.dealer) === dealerName : true,
      );
  } catch (error) {
    console.error("Error adding payment:", error);
    return [];
  }
}
