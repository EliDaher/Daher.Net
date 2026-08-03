import apiClient from "@/lib/axios";

export type MikrotikActiveConnection = {
  ".id": string;
  name: string;
  address?: string;
  "caller-id"?: string;
  uptime?: string;
  [key: string]: string | undefined;
};

export type DisablePppUserResult = {
  username: string;
  ok: boolean;
  message?: string;
};

type DisablePppUsersResponse = {
  success: boolean;
  requested_count: number;
  success_count: number;
  failed_count: number;
  results: DisablePppUserResult[];
};

const relayHeaders = () => ({
  "x-mikrotik-relay-key":
    import.meta.env.VITE_MIKROTIK_RELAY_KEY || "relay56315",
});

export const getMikrotikErrorMessage = (error: unknown) => {
  const axiosError = error as any;

  return (
    axiosError?.response?.data?.error ||
    axiosError?.response?.data?.message ||
    axiosError?.message ||
    "MikroTik backend relay request failed."
  );
};

export const testMikrotikConnection = async () => {
  const response = await apiClient.get("/api/mikrotik/test", {
    headers: relayHeaders(),
  });
  return response.data?.data;
};

export const getActivePppConnections = async (): Promise<
  MikrotikActiveConnection[]
> => {
  const response = await apiClient.get("/api/mikrotik/active", {
    headers: relayHeaders(),
  });
  return Array.isArray(response.data?.data) ? response.data.data : [];
};

export const disablePppUsers = async (
  usernames: string[],
): Promise<DisablePppUserResult[]> => {
  const response = await apiClient.post<DisablePppUsersResponse>(
    "/api/mikrotik/disable",
    { usernames },
    { headers: relayHeaders() },
  );

  return Array.isArray(response.data?.results) ? response.data.results : [];
};
