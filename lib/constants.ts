/* frontend/lib/constants.ts */
export const APP_NAME = "Cash Drive";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

export const STORAGE_KEYS = {
  token: "token",
  theme: "cashdrive:theme",
} as const;

export type ThemeMode = "light" | "dark" | "system";
