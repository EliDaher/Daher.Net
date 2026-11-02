import { afterEach, describe, expect, it, vi } from "vitest";
import { QueryClient, QueryObserver } from "@tanstack/react-query";
import type { Socket } from "socket.io-client";
import { subscribePendingPayments, type PendingPayment } from "./pendingPaymentsRealtime";

const cleanups: Array<() => void> = [];
afterEach(() => { cleanups.splice(0).reverse().forEach(cleanup => cleanup()); });

function fixture() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: Infinity } } });
  let rows: PendingPayment[] = [{ _id: "initial" }];
  const load = vi.fn(async () => [...rows]);
  const observer = new QueryObserver(client, { queryKey: ["pending-table"], queryFn: load });
  const unobserve = observer.subscribe(() => undefined);
  const handlers = new Map<string, (...args: unknown[]) => Promise<void>>();
  const socket = {
    on: vi.fn((event, handler) => { handlers.set(event, handler); }),
    off: vi.fn((event, handler) => { if (handlers.get(event) === handler) handlers.delete(event); }),
  };
  const received = vi.fn();
  const unsubscribe = subscribePendingPayments(socket as unknown as Socket, client, received);
  cleanups.push(() => client.clear(), unobserve, unsubscribe);
  return { client, handlers, socket, received, unsubscribe, load, observer, setRows: (next: PendingPayment[]) => { rows = next; } };
}

describe("public payment change signals", () => {
  it("fetches protected details on connection and public changes without using socket payloads", async () => {
    const f = fixture();
    await f.handlers.get("connect")!();
    expect(f.received).toHaveBeenLastCalledWith([{ _id: "initial" }]);
    f.setRows([{ _id: "new-number" }]);
    await f.handlers.get("pendingPaymentsChanged")!([{ _id: "untrusted-payload" }]);
    expect(f.client.getQueryData(["pending-table"])).toEqual([{ _id: "new-number" }]);
    expect(f.received).toHaveBeenLastCalledWith([{ _id: "new-number" }]);
    f.setRows([]);
    await f.handlers.get("pendingPaymentsUpdate")!([{ _id: "old-number" }]);
    expect(f.client.getQueryData(["pending-table"])).toEqual([]);
    expect(f.socket.on).toHaveBeenCalledTimes(3);
  });

  it("resynchronizes changes missed while disconnected", async () => {
    const f = fixture();
    await f.handlers.get("connect")!();
    f.setRows([{ _id: "changed-offline" }]);
    await f.handlers.get("connect")!();
    expect(f.received).toHaveBeenLastCalledWith([{ _id: "changed-offline" }]);
  });

  it("discards an older pending HTTP snapshot when another change arrives", async () => {
    const f = fixture();
    await f.handlers.get("connect")!();
    let resolveOld: (value: PendingPayment[]) => void;
    f.load.mockImplementationOnce(() => new Promise(resolve => { resolveOld = resolve; }));
    const first = f.handlers.get("pendingPaymentsChanged")!();
    await vi.waitFor(() => expect(f.load).toHaveBeenCalledTimes(3));
    f.setRows([{ _id: "latest" }]);
    await f.handlers.get("pendingPaymentsChanged")!();
    resolveOld!([{ _id: "stale" }]);
    await first;
    expect(f.client.getQueryData(["pending-table"])).toEqual([{ _id: "latest" }]);
    expect(f.received).toHaveBeenLastCalledWith([{ _id: "latest" }]);
  });

  it("removes listeners and prevents a queued refresh after unmount", async () => {
    const f = fixture();
    const pending = f.handlers.get("pendingPaymentsChanged")!();
    f.unsubscribe();
    await pending;
    expect(f.handlers.size).toBe(0);
    expect(f.received).not.toHaveBeenCalled();
    expect(f.socket.off).toHaveBeenCalledTimes(3);
  });
});
