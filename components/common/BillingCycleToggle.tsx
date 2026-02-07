/* frontend/components/common/BillingCycleToggle.tsx */
"use client";

import type { BillingCycle } from "../../lib/pricing";

type BillingCycleToggleProps = {
  cycle: BillingCycle;
  onChange: (cycle: BillingCycle) => void;
  variant?: "landing" | "app";
  annualBadge?: string;
  className?: string;
};

export default function BillingCycleToggle({
  cycle,
  onChange,
  variant = "app",
  annualBadge,
  className = ""
}: BillingCycleToggleProps) {
  const isAnnual = cycle === "annual";
  const activeClass =
    variant === "landing"
      ? "bg-teal-600 text-white shadow-md"
      : "bg-teal-600 text-white shadow-md";
  const ringClass = "focus-visible:ring-teal-500";

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <div
        role="radiogroup"
        aria-label="Ciclo de cobrança"
        className="inline-flex items-center rounded-full bg-zinc-100 p-1 text-xs font-semibold text-zinc-600"
      >
        <button
          type="button"
          role="radio"
          aria-checked={!isAnnual}
          className={`px-3 py-1.5 rounded-full transition ${!isAnnual ? activeClass : "text-zinc-600"} ${ringClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
          onClick={() => onChange("monthly")}
        >
          Mensal
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={isAnnual}
          className={`px-3 py-1.5 rounded-full transition ${isAnnual ? activeClass : "text-zinc-600"} ${ringClass} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
          onClick={() => onChange("annual")}
        >
          Anual
        </button>
      </div>

      {annualBadge && isAnnual ? (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            variant === "landing"
              ? "bg-teal-50 text-teal-700"
              : "bg-teal-50 text-teal-700"
          }`}
        >
          {annualBadge}
        </span>
      ) : null}
    </div>
  );
}
