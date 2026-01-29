/* frontend/services/http.ts */
import { API_URL } from "../lib/constants";
import { getToken } from "../lib/storage";
import type { ApiResponse } from "../types/api";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";
type RequestOptions = {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  auth?: boolean;
  signal?: AbortSignal;
};

function buildHeaders(opts?: RequestOptions): HeadersInit {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(opts?.headers || {})
  };
  if (opts?.auth !== false) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function api<T>(path: string, opts?: RequestOptions): Promise<ApiResponse<T>> {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  try {
    const res = await fetch(url, {
      method: opts?.method || "GET",
      headers: buildHeaders(opts),
      body: opts?.body === undefined ? undefined : JSON.stringify(opts.body),
      signal: opts?.signal,
      cache: "no-store"
    });

    const isJson = res.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await res.json() : null;

    if (!res.ok) {
      const message = payload?.error?.message || payload?.message || `Erro HTTP ${res.status}`;
      return { ok: false, error: { message, details: payload?.error?.details } };
    }

    return (payload ?? { ok: true, data: null }) as ApiResponse<T>;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Falha de rede/servidor indisponivel";
    return { ok: false, error: { message } };
  }
}
