import apiClient from "@/lib/axios";
import axios from "axios";

export interface PosLimitRecord {
  posKey: string;
  minBalance: number;
  updatedAt: string;
  updatedBy: string;
}

const INVALID_KEY_CHARS = /[.#$/\[\]]/g;

export function buildPosKey({
  email,
  id,
}: {
  email?: string | null;
  id?: string | null;
}) {
  const base = (email || id || "").trim().toLowerCase();
  return base.replace(INVALID_KEY_CHARS, "_");
}

function getErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export async function getPOSLimits() {
  try {
    const response = await apiClient.get("/api/pos-limits");
    const limits = Array.isArray(response.data?.limits) ? response.data.limits : [];

    return limits as PosLimitRecord[];
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to get POS limits"));
  }
}

export async function upsertPOSLimit({
  posKey,
  minBalance,
  updatedBy,
}: {
  posKey: string;
  minBalance: number;
  updatedBy: string;
}) {
  try {
    const response = await apiClient.put(`/api/pos-limits/${encodeURIComponent(posKey)}`, {
      minBalance,
      updatedBy,
    });

    return response.data as { success: true; data: PosLimitRecord };
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to update POS limit"));
  }
}
