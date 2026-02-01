/* frontend/lib/billing.ts */
import type { BillingStatus } from "../types/common";

export const DEFAULT_BILLING_STATUS = {
  status: "none" as BillingStatus,
  trialEnd: null,
  currentPeriodEnd: null,
  cancelAtPeriodEnd: false,
  trialDaysRemaining: null
};

export function isBillingActive(status?: BillingStatus | null) {
  return status === "trialing" || status === "active";
}
