/* frontend/services/billingService.ts */
import { api } from "./http";
import type { BillingPlansResponse, BillingStatusResponse, ApiResponse } from "../types/api";

export function getPlans(): Promise<ApiResponse<BillingPlansResponse>> {
  return api<BillingPlansResponse>("/billing/plans", { method: "GET", auth: false });
}

export function getStatus(): Promise<ApiResponse<BillingStatusResponse>> {
  return api<BillingStatusResponse>("/billing/status", { method: "GET" });
}

export function createCheckout(planId: string) {
  return api<{ url: string }>("/billing/checkout", { method: "POST", body: { planId } });
}

export function openPortal() {
  return api<{ url: string }>("/billing/portal", { method: "POST" });
}
