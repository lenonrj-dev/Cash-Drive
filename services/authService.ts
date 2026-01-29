/* frontend/services/authService.ts */
import { api } from "./http";
import type { AuthLoginResponse, MeResponse } from "../types/api";

export async function login(email: string, password: string): Promise<AuthLoginResponse> {
  const res = await api<AuthLoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  acceptedTerms: boolean;
}): Promise<AuthLoginResponse> {
  const res = await api<AuthLoginResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function me(): Promise<MeResponse | null> {
  const res = await api<MeResponse>("/auth/me", { method: "GET" });
  if (!res.ok) return null;
  return res.data;
}
