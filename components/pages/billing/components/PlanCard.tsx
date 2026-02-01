/* frontend/components/pages/billing/components/PlanCard.tsx */
"use client";

import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import CheckoutButton from "../CheckoutButton";
import type { PlanDisplay } from "../planPricing";
import { formatCurrencyBRL } from "../../../../lib/format";

export default function PlanCard({ plan }: { plan: PlanDisplay }) {
  const isHighlighted = !!plan.highlight;
  const showSavings = plan.displayCycle === "annual" && typeof plan.annualSavingsCents === "number";
  const isBestValue = !isHighlighted && /b[aá]sico/i.test(plan.name);

  return (
    <Card className={isHighlighted ? "border-teal-200/70 bg-teal-50/60" : ""}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-lg font-bold text-zinc-900">{plan.name}</p>
            {plan.trialDays ? <Badge className="bg-white/70">{plan.trialDays} dias grátis</Badge> : null}
            {showSavings ? (
              <Badge className="border-transparent bg-teal-100 text-teal-700">
                Economize {formatCurrencyBRL(plan.annualSavingsCents ?? 0)}/ano
              </Badge>
            ) : null}
            {isBestValue ? <Badge className="bg-white/70">Melhor custo-benefício</Badge> : null}
          </div>
          <p className="mt-1 text-sm text-zinc-600">{plan.displayPriceLabel}</p>
          <p className="mt-2 text-sm text-zinc-700">
            {isHighlighted
              ? "Melhor custo-benefício para liberar ações, automatizar alertas e manter tudo no controle."
              : "Plano ideal para acompanhar entradas, saídas e metas com clareza."}
          </p>
        </div>

        {isHighlighted ? <Badge className="border-transparent bg-teal-600 text-white">Mais popular</Badge> : null}
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        {plan.benefits.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-3">
        <CheckoutButton planId={plan.checkoutPlanId} trialDays={plan.trialDays} cycle={plan.displayCycle} />

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-teal-600">
              <ShieldIcon />
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-900">Sem surpresas</p>
              <p className="mt-1 text-sm text-zinc-600">
                Você pode cancelar quando quiser. O painel mantém seus dados e você continua podendo visualizar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
