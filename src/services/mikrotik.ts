import axios from "axios";

export const MIKROTIK_BASE_URL_KEY = "mikrotik.rest.baseUrl";
export const MIKROTIK_USERNAME_KEY = "mikrotik.rest.username";
export const MIKROTIK_PASSWORD_KEY = "mikrotik.rest.password";

export const DEFAULT_MIKROTIK_REST_BASE_URL =
  "http://191.44.71.168:1177/rest";
export const MIKROTIK_USERNAME = "nader";
export const MIKROTIK_PASSWORD = "966248984";

export type MikrotikCredentials = {
  baseUrl: string;
  username: string;
  password: string;
};

export type MikrotikActiveConnection = {
  ".id": string;
  name: string;
  address?: string;
  "caller-id"?: string;
  uptime?: string;
  [key: string]: string | undefined;
};

export type MikrotikPppSecret = {
  ".id": string;
  name: string;
  disabled?: string;
  [key: string]: string | undefined;
};

export type DisablePppUserResult = {
  username: string;
  ok: boolean;
  message?: string;
};

const trimTrailingSlashes = (value: string) => value.replace(/\/+$/, "");

const normalizeBaseUrl = (value?: string) =>
  trimTrailingSlashes(value?.trim() || DEFAULT_MIKROTIK_REST_BASE_URL);

export const getStoredMikrotikCredentials = (): MikrotikCredentials => ({
  baseUrl: normalizeBaseUrl(localStorage.getItem(MIKROTIK_BASE_URL_KEY) || ""),
  username: MIKROTIK_USERNAME,
  password: MIKROTIK_PASSWORD,
});

export const saveMikrotikCredentials = (credentials: MikrotikCredentials) => {
  localStorage.setItem(
    MIKROTIK_BASE_URL_KEY,
    normalizeBaseUrl(credentials.baseUrl),
  );
  localStorage.removeItem(MIKROTIK_USERNAME_KEY);
  localStorage.removeItem(MIKROTIK_PASSWORD_KEY);
};

const createMikrotikClient = (credentials: MikrotikCredentials) => {
  const username = MIKROTIK_USERNAME;
  const password = MIKROTIK_PASSWORD;

  if (!username || !password) {
    throw new Error("Enter MikroTik REST username and password first.");
  }

  return axios.create({
    baseURL: normalizeBaseUrl(credentials.baseUrl),
    timeout: 18000,
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      "Content-Type": "application/json",
    },
  });
};

export const getMikrotikErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      return "MikroTik authentication failed. Check the username and password.";
    }

    if (error.response?.data?.message) {
      return `MikroTik error: ${error.response.data.message}`;
    }

    if (error.code === "ECONNABORTED") {
      return "MikroTik request timed out. Check the router address and network.";
    }

    if (!error.response) {
      return "Could not reach MikroTik REST. Check CORS, mixed-content blocking, router address, and network access.";
    }

    return error.message || "MikroTik REST request failed.";
  }

  return error instanceof Error ? error.message : "MikroTik REST request failed.";
};

export const testMikrotikConnection = async (
  credentials: MikrotikCredentials,
) => {
  const client = createMikrotikClient(credentials);
  const response = await client.get("/system/resource");
  return response.data;
};

export const getActivePppConnections = async (
  credentials: MikrotikCredentials,
): Promise<MikrotikActiveConnection[]> => {
  const client = createMikrotikClient(credentials);
  const response = await client.get<MikrotikActiveConnection[]>("/ppp/active");
  return Array.isArray(response.data) ? response.data : [];
};

export const disablePppUsers = async (
  credentials: MikrotikCredentials,
  usernames: string[],
): Promise<DisablePppUserResult[]> => {
  const client = createMikrotikClient(credentials);

  const results = await Promise.all(
    usernames.map(async (username) => {
      const normalizedUsername = username.trim();

      try {
        const secretResponse = await client.get<MikrotikPppSecret[]>(
          "/ppp/secret",
          {
            params: { name: normalizedUsername },
          },
        );
        const secret = Array.isArray(secretResponse.data)
          ? secretResponse.data.find(
              (item) =>
                item.name?.trim().toLowerCase() ===
                normalizedUsername.toLowerCase(),
            )
          : null;

        if (!secret?.[".id"]) {
          return {
            username: normalizedUsername,
            ok: false,
            message: "User not found in /ppp/secret.",
          };
        }

        await client.patch(`/ppp/secret/${encodeURIComponent(secret[".id"])}`, {
          disabled: "true",
        });

        const activeResponse = await client.get<MikrotikActiveConnection[]>(
          "/ppp/active",
          {
            params: { name: normalizedUsername },
          },
        );
        const activeConnections = Array.isArray(activeResponse.data)
          ? activeResponse.data
          : [];

        await Promise.all(
          activeConnections
            .filter((connection) => Boolean(connection[".id"]))
            .map((connection) =>
              client.delete(
                `/ppp/active/${encodeURIComponent(connection[".id"])}`,
              ),
            ),
        );

        return {
          username: normalizedUsername,
          ok: true,
        };
      } catch (error) {
        return {
          username: normalizedUsername,
          ok: false,
          message: getMikrotikErrorMessage(error),
        };
      }
    }),
  );

  return results;
};
