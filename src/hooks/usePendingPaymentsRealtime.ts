import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { io, type Socket } from "socket.io-client";
import { subscribePendingPayments, type PendingPayment } from "@/lib/pendingPaymentsRealtime";
const PAYMENTS_SOCKET_URL =
  import.meta.env.VITE_INVOICE_SOCKET_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "https://paynet-1.onrender.com";

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
  const previousIdsRef = useRef<Set<string> | null>(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    requestNotificationPermission();
    previousIdsRef.current = null;

    const socket: Socket = io(PAYMENTS_SOCKET_URL);

    const unsubscribe = subscribePendingPayments(socket, queryClient, (nextPayments) => {
      const nextIds = new Set(nextPayments.map((payment) => payment._id));

      const newPayment = nextPayments.find(
        (payment) => payment._id && !previousIdsRef.current?.has(payment._id),
      );

      if (newPayment && previousIdsRef.current !== null) {
        notifyForNewPayment(newPayment);
      }

      previousIdsRef.current = nextIds;
    });

    return () => {
      unsubscribe();
      socket.disconnect();
    };
  }, [enabled, queryClient]);
}
