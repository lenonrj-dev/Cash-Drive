/* frontend/lib/constants.ts */
export const APP_NAME = "Rota Fin";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:4000";

export const STORAGE_KEYS = {
  token: "token",
  theme: "rotafin:theme",
} as const;

export type ThemeMode = "light" | "dark" | "system";
