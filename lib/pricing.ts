/* frontend/lib/pricing.ts */
import { formatCurrencyBRL } from "./format";

export type BillingCycle = "monthly" | "annual";

export const PRICING = {
  basic: { monthlyCents: 990, annualCents: 10000 },
  pro: { monthlyCents: 1490, annualCents: 14990 },
};

export function formatCycleSuffix(cycle: BillingCycle) {
  return cycle === "annual" ? "/ano" : "/mês";
}

export function formatPrice(cents: number, cycle: BillingCycle) {
  return `${formatCurrencyBRL(cents)}${formatCycleSuffix(cycle)}`;
}

export function getAnnualSavingsCents(monthlyCents: number, annualCents: number) {
  return Math.max(monthlyCents * 12 - annualCents, 0);
}

export function getAnnualSavingsPercent(monthlyCents: number, annualCents: number) {
  const yearly = monthlyCents * 12;
  if (!yearly) return 0;
  return Math.max(0, Math.round(((yearly - annualCents) / yearly) * 100));
}

export function formatAnnualSavings(monthlyCents: number, annualCents: number) {
  const savings = getAnnualSavingsCents(monthlyCents, annualCents);
  return `Economize ${formatCurrencyBRL(savings)}/ano`;
}
