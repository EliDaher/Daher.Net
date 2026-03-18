export interface DaherUser {
  id: string;
  password: string;
  role: string;
  username: string;
}

const DAHER_USER_KEY = "DaherUser";

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
