import apiClient from "@/lib/axios";

export type GetEmployeersOperationsParams = {
  fromDate?: string;
  toDate?: string;
  executorName?: string;
};

type PortsOperation = Record<string, unknown>;

type PortsOperationsResponse = {
  success?: boolean;
  count?: number;
  operations?: PortsOperation[];
  message?: string;
};

const PORTS_OPERATIONS_ENDPOINTS = [
  "/api/ports/",
];

function cleanParams(params: GetEmployeersOperationsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );
}

export async function getEmployeersOerations(
  params: GetEmployeersOperationsParams = {},
) {
  const query = cleanParams(params);
  let lastError: unknown;

  for (const endpoint of PORTS_OPERATIONS_ENDPOINTS) {
    try {
      const response = await apiClient.get<PortsOperationsResponse>(endpoint, {
        params: query,
      });

      return response.data?.operations ?? [];
    } catch (error: any) {
      lastError = error;

      // Try the alternate endpoint only when this one is missing.
      if (error?.response?.status === 404) {
        continue;
      }

      throw error;
    }
  }

  throw lastError;
}

// Alias with corrected spelling for future usage.
export const getEmployeersOperations = getEmployeersOerations;