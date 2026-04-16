import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, type Socket } from "socket.io-client";

interface PendingPayment {
  _id: string;
  amount?: number | string;
  company?: string;
}

const PENDING_PAYMENTS_QUERY_KEY = ["pending-table"];
const PAYMENTS_SOCKET_URL =
  import.meta.env.VITE_INVOICE_SOCKET_URL || "https://paynet-1.onrender.com";

function requestNotificationPermission() {
  if (!("Notification" in window) || Notification.permission !== "default") {
    return;
  }

  void Notification.requestPermission();
}

function notifyForNewPayment(payment: PendingPayment) {
  if (!("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  new Notification("طلب دفع جديد", {
    body: `المبلغ: ${payment.amount ?? "-"} - الشركة: ${payment.company ?? "-"}`,
    icon: "/favicon.ico",
  });

  void new Audio("/notification.mp3").play().catch(() => undefined);
}

export function usePendingPaymentsRealtime(enabled = true) {
  const queryClient = useQueryClient();
  const previousIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) {
      return;
    }

    requestNotificationPermission();

    const socket: Socket = io(PAYMENTS_SOCKET_URL);

    socket.on("pendingPaymentsUpdate", (updatedPayments: PendingPayment[]) => {
      const nextPayments = Array.isArray(updatedPayments) ? updatedPayments : [];
      const nextIds = new Set(nextPayments.map((payment) => payment._id));

      const newPayment = nextPayments.find(
        (payment) => payment._id && !previousIdsRef.current.has(payment._id),
      );

      if (newPayment && previousIdsRef.current.size > 0) {
        notifyForNewPayment(newPayment);
      }

      previousIdsRef.current = nextIds;
      queryClient.setQueryData(PENDING_PAYMENTS_QUERY_KEY, nextPayments);
    });

    return () => {
      socket.disconnect();
    };
  }, [enabled, queryClient]);
}
