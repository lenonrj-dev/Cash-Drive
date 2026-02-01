/* frontend/components/pages/billing/planPricing.ts */
import type { BillingPlan } from "../../../types/api";
import { formatCurrencyBRL, parseCurrencyToCents } from "../../../lib/format";
import {
  PRICING,
  formatCycleSuffix,
  getAnnualSavingsCents,
  getAnnualSavingsPercent,
  type BillingCycle
} from "../../../lib/pricing";

export type PlanDisplay = BillingPlan & {
  displayPriceLabel: string;
  displayCycle: BillingCycle;
  checkoutPlanId: string;
  annualSavingsCents?: number;
  annualSavingsPercent?: number;
};

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function resolveCycleFromPlan(plan: BillingPlan): BillingCycle | null {
  if (plan.interval === "monthly" || plan.interval === "annual") return plan.interval;
  const label = (plan.priceLabel || "").toLowerCase();
  if (label.includes("/ano") || label.includes("anual")) return "annual";
  if (label.includes("/mês") || label.includes("/mes") || label.includes("mensal")) return "monthly";
  return null;
}

function parseCents(label?: string | null) {
  if (!label) return null;
  const cents = parseCurrencyToCents(label);
  return cents > 0 ? cents : null;
}

function getFallbackCents(plan: BillingPlan, cycle: BillingCycle) {
  const key = normalizeName(plan.name);
  if (key.includes("basico") || key.includes("basic")) {
    return cycle === "annual" ? PRICING.basic.annualCents : PRICING.basic.monthlyCents;
  }
  if (key.includes("pro")) {
    return cycle === "annual" ? PRICING.pro.annualCents : PRICING.pro.monthlyCents;
  }
  return null;
}

function getCycleCents(plan: BillingPlan, cycle: BillingCycle) {
  if (cycle === "monthly") {
    return (
      plan.priceMonthlyCents ??
      parseCents(plan.priceMonthlyLabel) ??
      (resolveCycleFromPlan(plan) === "monthly" ? parseCents(plan.priceLabel) : null) ??
      getFallbackCents(plan, cycle) ??
      parseCents(plan.priceLabel)
    );
  }
  return (
    plan.priceAnnualCents ??
    parseCents(plan.priceAnnualLabel) ??
    (resolveCycleFromPlan(plan) === "annual" ? parseCents(plan.priceLabel) : null) ??
    getFallbackCents(plan, cycle)
  );
}

function getCheckoutId(plan: BillingPlan, cycle: BillingCycle) {
  if (cycle === "annual") {
    return plan.priceAnnualId || (plan.interval === "annual" ? plan.id : plan.id);
  }
  return plan.priceMonthlyId || (plan.interval === "monthly" ? plan.id : plan.id);
}

function buildDisplayPlan(plan: BillingPlan, cycle: BillingCycle): PlanDisplay {
  const monthlyCents = getCycleCents(plan, "monthly");
  const annualCents = getCycleCents(plan, "annual");
  const priceCents = getCycleCents(plan, cycle);
  const displayPriceLabel = priceCents
    ? `${formatCurrencyBRL(priceCents)}${formatCycleSuffix(cycle)}`
    : plan.priceLabel;

  return {
    ...plan,
    displayPriceLabel,
    displayCycle: cycle,
    checkoutPlanId: getCheckoutId(plan, cycle),
    annualSavingsCents:
      monthlyCents && annualCents ? getAnnualSavingsCents(monthlyCents, annualCents) : undefined,
    annualSavingsPercent:
      monthlyCents && annualCents ? getAnnualSavingsPercent(monthlyCents, annualCents) : undefined,
  };
}

export function mapPlansToCycle(plans: BillingPlan[], cycle: BillingCycle) {
  if (!plans.length) return [];

  const hasExplicitCycle = plans.some((plan) => resolveCycleFromPlan(plan) !== null);
  let sourcePlans = plans;

  if (hasExplicitCycle) {
    const filtered = plans.filter((plan) => resolveCycleFromPlan(plan) === cycle);
    if (filtered.length) sourcePlans = filtered;
  } else {
    const byName = new Map<string, BillingPlan[]>();
    for (const plan of plans) {
      const key = normalizeName(plan.name);
      if (!byName.has(key)) byName.set(key, []);
      byName.get(key)?.push(plan);
    }

    sourcePlans = Array.from(byName.values()).map((group) => {
      const match = group.find((plan) => resolveCycleFromPlan(plan) === cycle);
      return match || group[0];
    });
  }

  return sourcePlans.map((plan) => buildDisplayPlan(plan, cycle));
}
