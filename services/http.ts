/* frontend/services/http.ts */
export type ApiError = {
  message: string;
  details?: unknown;
};

export type ApiResponse<T> =
  | { ok: true; data: T }
  | { ok: false; error: ApiError };

function getBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_URL;
  return base?.replace(/\/$/, "") || "";
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function api<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const base = getBaseUrl();
  if (!base) {
    return { ok: false, error: { message: "NEXT_PUBLIC_API_URL não configurado" } };
  }

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(init?.headers);
  const body = init?.body as unknown;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  if (!headers.has("Content-Type") && !isFormData) {
    headers.set("Content-Type", "application/json");
  }

  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...init,
    headers,
    credentials: "include"
  });

  const text = await res.text();
  const json = text ? safeJson(text) : null;

  if (!res.ok) {
    return {
      ok: false,
      error: {
        message: json?.error?.message || json?.message || "Falha na requisição",
        details: json?.error?.details
      }
    };
  }

  if (json?.ok === true) {
    return { ok: true, data: (json.data ?? {}) as T };
  }

  if (!json) {
    return { ok: true, data: {} as T };
  }

  return { ok: true, data: json as T };
}
