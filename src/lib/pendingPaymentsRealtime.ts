import type { QueryClient } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";

export interface PendingPayment {
  _id: string;
  amount?: number | string;
  company?: string;
}

const QUERY_KEY = ["pending-table"];

export function subscribePendingPayments(
  socket: Pick<Socket, "on" | "off">,
  queryClient: QueryClient,
  onSnapshot: (payments: PendingPayment[]) => void,
) {
  let disposed = false;
  let revision = 0;
  const refresh = async () => {
    const current = ++revision;
    const filters = { queryKey: QUERY_KEY };
    await queryClient.cancelQueries(filters);
    if (disposed || current !== revision) return;
    await queryClient.invalidateQueries(filters);
    if (disposed || current !== revision) return;
    const payments = queryClient.getQueryData<PendingPayment[]>(QUERY_KEY);
    if (Array.isArray(payments)) onSnapshot(payments);
  };

  // Socket carries only a change signal. The existing authenticated HTTP query
  // remains the source of payment details, including after reconnecting.
  socket.on("connect", refresh);
  socket.on("pendingPaymentsChanged", refresh);
  socket.on("pendingPaymentsUpdate", refresh);
  return () => {
    disposed = true;
    socket.off("connect", refresh);
    socket.off("pendingPaymentsChanged", refresh);
    socket.off("pendingPaymentsUpdate", refresh);
  };
}
