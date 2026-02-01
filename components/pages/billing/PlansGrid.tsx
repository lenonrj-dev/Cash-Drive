/* frontend/components/pages/billing/PlansGrid.tsx */
"use client";

import type { PlanDisplay } from "./planPricing";
import PlanCard from "./components/PlanCard";

export default function PlansGrid({ plans }: { plans: PlanDisplay[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {plans.map((p) => (
        <PlanCard key={p.id} plan={p} />
      ))}
    </div>
  );
}
