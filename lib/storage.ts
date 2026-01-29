/* frontend/lib/storage.ts */
import { STORAGE_KEYS, type ThemeMode } from "./constants";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEYS.token);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.token, token);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.token);
}

export function getThemeMode(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const raw = window.localStorage.getItem(STORAGE_KEYS.theme) as ThemeMode | null;
  return raw === "light" || raw === "dark" || raw === "system" ? raw : "system";
}

export function setThemeMode(mode: ThemeMode): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.theme, mode);
}
