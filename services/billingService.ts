/* frontend/services/billingService.ts */
import { api } from "./http";
import type { BillingPlansResponse, BillingStatusResponse, BillingPlan } from "../types/api";
import type { BillingCycle } from "../lib/pricing";

const DEFAULT_STATUS: BillingStatusResponse = {
  status: "none",
  trialEnd: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  trialDaysRemaining: null,
};

export async function getPlans(cycle?: BillingCycle): Promise<{ plans: BillingPlan[] }> {
  const query = cycle ? `?cycle=${cycle}` : "";
  const res = await api<BillingPlansResponse>(`/billing/plans${query}`, { method: "GET" });
  if (!res.ok) return { plans: [] };
  return { plans: Array.isArray(res.data?.plans) ? res.data.plans : [] };
}

export async function getBillingStatus(): Promise<BillingStatusResponse> {
  const res = await api<BillingStatusResponse>("/billing/status", { method: "GET" });
  if (!res.ok) return DEFAULT_STATUS;
  return {
    status: res.data?.status ?? "none",
    trialEnd: res.data?.trialEnd ?? null,
    currentPeriodEnd: res.data?.currentPeriodEnd ?? null,
    cancelAtPeriodEnd: Boolean(res.data?.cancelAtPeriodEnd),
    trialDaysRemaining: typeof res.data?.trialDaysRemaining === "number" ? res.data.trialDaysRemaining : null,
  };
}

export async function createCheckout(planId: string): Promise<string> {
  const res = await api<{ url: string }>("/billing/checkout", {
    method: "POST",
    body: JSON.stringify({ planId }),
  });
  if (!res.ok) throw new Error(res.error.message);
  if (!res.data?.url) throw new Error("Checkout indisponível");
  return res.data.url;
}

export async function openBillingPortal(): Promise<string> {
  const res = await api<{ url: string }>("/billing/portal", { method: "POST" });
  if (!res.ok) throw new Error(res.error.message);
  if (!res.data?.url) throw new Error("Portal indisponível");
  return res.data.url;
}
