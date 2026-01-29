/* frontend/services/authService.ts */
import { api } from "./http";
import type { AuthLoginResponse, MeResponse, ApiResponse } from "../types/api";

export function login(email: string, password: string) {
  return api<AuthLoginResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
    auth: false,
  });
}

export function signup(payload: {
  name: string;
  email: string;
  password: string;
  phone?: string | null;
  acceptedTerms: boolean;
}) {
  return api<AuthLoginResponse>("/auth/signup", {
    method: "POST",
    body: payload,
    auth: false,
  });
}

export function me(): Promise<ApiResponse<MeResponse>> {
  return api<MeResponse>("/auth/me", { method: "GET" });
}
