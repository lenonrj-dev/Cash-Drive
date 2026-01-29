/* frontend/lib/storage.ts */
import { STORAGE_KEYS, type ThemeMode } from "./constants";

const LEGACY_TOKEN_KEY = "cashdrive:token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = window.localStorage.getItem(STORAGE_KEYS.token);
  if (token) return token;
  const legacy = window.localStorage.getItem(LEGACY_TOKEN_KEY);
  if (legacy) {
    window.localStorage.setItem(STORAGE_KEYS.token, legacy);
    window.localStorage.removeItem(LEGACY_TOKEN_KEY);
    return legacy;
  }
  return null;
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEYS.token, token);
  window.localStorage.removeItem(LEGACY_TOKEN_KEY);
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEYS.token);
  window.localStorage.removeItem(LEGACY_TOKEN_KEY);
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
