export interface StaffUser {
  id: string;
  name: string;
  role: "RECEPTIONIST" | "ADMIN";
  username: string;
}

const AUTH_KEY = "gymqoo_staff_session";

// Default credentials for Gymqoo receptionist staff
export const DEFAULT_STAFF = {
  username: "admin",
  password: "admin",
  name: "Resepsionis Gymqoo",
  role: "ADMIN" as const,
};

export function getStaffSession(): StaffUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setStaffSession(user: StaffUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

export function clearStaffSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_KEY);
}

export function verifyCredentials(usernameInput: string, passwordInput: string): { success: boolean; user?: StaffUser; error?: string } {
  const userClean = usernameInput.trim().toLowerCase();
  const passClean = passwordInput.trim();

  // Allow 'admin' or 'admin@gymqoo.com' with password 'admin' or 'gymqoo123'
  if (
    (userClean === "admin" || userClean === "admin@gymqoo.com" || userClean === "resepsionis") &&
    (passClean === "admin" || passClean === "gymqoo123")
  ) {
    const staff: StaffUser = {
      id: "staff-1",
      name: "Staf Resepsionis Gymqoo",
      role: "ADMIN",
      username: userClean,
    };
    return { success: true, user: staff };
  }

  return { success: false, error: "Username atau password salah. Silakan coba lagi." };
}
