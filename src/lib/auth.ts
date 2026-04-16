export interface DaherUser {
  id: string;
  password: string;
  role: string;
  username: string;
}

const DAHER_USER_KEY = "DaherUser";
const TOKEN_KEY = "token";
const LEGACY_TOKEN_KEY = "auth_token";

export const SESSION_LAST_ACTIVITY_KEY = "session:lastActivityAt";
export const SESSION_LOGOUT_AT_KEY = "session:logoutAt";

export function getStoredUser(): DaherUser | null {
  const userStr = localStorage.getItem(DAHER_USER_KEY);

  if (!userStr) {
    return null;
  }

  try {
    return JSON.parse(userStr) as DaherUser;
  } catch {
    return null;
  }
}

export function clearStoredUser() {
  localStorage.removeItem(DAHER_USER_KEY);
}

export function clearAuthStorage() {
  localStorage.removeItem(DAHER_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(LEGACY_TOKEN_KEY);
  localStorage.removeItem(SESSION_LAST_ACTIVITY_KEY);
}

export function logoutClientSession(options?: { broadcast?: boolean }) {
  clearAuthStorage();

  if (options?.broadcast) {
    localStorage.setItem(SESSION_LOGOUT_AT_KEY, String(Date.now()));
  }
}
