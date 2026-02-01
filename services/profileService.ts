/* frontend/services/profileService.ts */
import { api } from "./http";

export type UserSettings = {
  profile?: {
    displayName?: string;
    company?: string;
    role?: string;
    timezone?: string;
  };
  contact?: {
    phone?: string | null;
    whatsapp?: string | null;
    emailBackup?: string | null;
  };
  preferences?: {
    currency?: string;
    dateFormat?: string;
    startOfWeek?: string;
    maskAmounts?: boolean;
    confirmSensitiveActions?: boolean;
    compactCards?: boolean;
  };
  notifications?: {
    email?: boolean;
    whatsapp?: boolean;
    inApp?: boolean;
    goals?: boolean;
    bills?: boolean;
    weeklySummary?: boolean;
  };
  privacy?: {
    autoLogoutMinutes?: string;
    hideBalanceOnOpen?: boolean;
    exportIncludeTags?: boolean;
  };
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  settings?: UserSettings;
};

export async function getProfile(): Promise<UserProfile | null> {
  const res = await api<UserProfile>("/me", { method: "GET" });
  if (!res.ok) return null;
  return res.data || null;
}

export async function updateProfile(payload: Partial<UserProfile> & { settings?: UserSettings }): Promise<UserProfile> {
  const res = await api<UserProfile>("/me", { method: "PUT", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function updateAvatar(avatarUrl: string): Promise<{ avatarUrl: string | null }> {
  const res = await api<{ avatarUrl: string | null }>("/me/avatar", {
    method: "POST",
    body: JSON.stringify({ avatarUrl }),
  });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
