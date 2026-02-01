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

function isJsonContentType(res: Response) {
  const ct = res.headers.get("content-type") || "";
  return ct.toLowerCase().includes("application/json");
}

export async function api<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const base = getBaseUrl();
  if (!base) {
    return { ok: false, error: { message: "NEXT_PUBLIC_API_URL não configurado" } };
  }

  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(init?.headers || {});
  const method = (init?.method || "GET").toUpperCase();

  const body = init?.body as unknown;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

  // Sempre: evita interstitial do ngrok em usuários novos
  if (!headers.has("ngrok-skip-browser-warning")) headers.set("ngrok-skip-browser-warning", "1");

  // Sempre: preferimos JSON
  if (!headers.has("Accept")) headers.set("Accept", "application/json");

  // Só define Content-Type quando faz sentido (evita preflight extra em GET/HEAD)
  const methodAllowsBody = !["GET", "HEAD"].includes(method);
  if (methodAllowsBody && !isFormData) {
    if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
  } else {
    if (headers.has("Content-Type")) headers.delete("Content-Type");
  }

  // Auth opcional via token (mantém comportamento atual)
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  let res: Response;
  try {
    res = await fetch(url, {
      ...init,
      method,
      headers,
      credentials: "include",
    });
  } catch (e) {
    return {
      ok: false,
      error: {
        message: "Falha de rede ao conectar com o backend",
        details: e,
      },
    };
  }

  const text = await res.text();

  // Se o ngrok interstitial aparecer, normalmente vem como HTML
  if (text && !isJsonContentType(res)) {
    return {
      ok: false,
      error: {
        message:
          "Resposta não-JSON do backend (possível página de aviso/interstitial do ngrok). Verifique se o header ngrok-skip-browser-warning está chegando no request.",
        details: {
          status: res.status,
          contentType: res.headers.get("content-type"),
          sample: text.slice(0, 300),
        },
      },
    };
  }

  const json = text ? safeJson(text) : null;

  if (!res.ok) {
    return {
      ok: false,
      error: {
        message: json?.error?.message || json?.message || "Falha na requisição",
        details: json?.error?.details ?? json ?? text,
      },
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
