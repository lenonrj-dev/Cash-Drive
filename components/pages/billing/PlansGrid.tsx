/* frontend/components/pages/billing/PlansGrid.tsx */
"use client";

import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import CheckoutButton from "./CheckoutButton";
import type { BillingPlan } from "../../../types/api";

export default function PlansGrid({ plans }: { plans: BillingPlan[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {plans.map((p) => (
        <Card
          key={p.id}
          className={p.highlight ? "border-teal-200/70 bg-teal-50/60" : ""}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold text-zinc-900">{p.name}</p>
              <p className="mt-1 text-sm text-zinc-600">{p.priceLabel}</p>
            </div>
            {p.highlight ? (
              <Badge className="border-transparent bg-teal-600 text-white">
                Recomendado
              </Badge>
            ) : null}
          </div>

          <ul className="mt-4 space-y-2 text-sm text-zinc-700">
            {p.benefits.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <CheckoutButton planId={p.id} trialDays={p.trialDays} />
          </div>
        </Card>
      ))}
    </div>
  );
}
