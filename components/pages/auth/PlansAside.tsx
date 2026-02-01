/* frontend/components/pages/auth/PlansAside.tsx */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import { getPlans } from "../../../services/billingService";
import type { BillingPlan } from "../../../types/api";
import Link from "next/link";
import { routes } from "../../../lib/routes";
import Skeleton from "../../ui/Skeleton";
import BillingCycleToggle from "../../common/BillingCycleToggle";
import { formatCurrencyBRL } from "../../../lib/format";
import {
  PRICING,
  type BillingCycle,
  getAnnualSavingsCents
} from "../../../lib/pricing";
import { mapPlansToCycle } from "../billing/planPricing";

export default function PlansAside() {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const res = await getPlans(cycle);
      if (!alive) return;
      setPlans(res.plans);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [cycle]);

  const displayPlans = useMemo(() => mapPlansToCycle(plans, cycle), [plans, cycle]);
  const primary = useMemo(
    () => displayPlans.find((p) => p.highlight) || displayPlans[0],
    [displayPlans]
  );
  const annualBadge = useMemo(() => {
    const maxSavings = Math.max(
      getAnnualSavingsCents(PRICING.basic.monthlyCents, PRICING.basic.annualCents),
      getAnnualSavingsCents(PRICING.pro.monthlyCents, PRICING.pro.annualCents)
    );
    return `Economize até ${formatCurrencyBRL(maxSavings)}/ano`;
  }, []);

  return (
    <Card className="p-6">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Planos</p>
          <h2 className="mt-2 text-lg font-bold text-zinc-900">Teste grátis por 15 dias</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Você não será cobrado hoje. O cartão é necessário para iniciar o trial.
          </p>
        </div>
        <Badge>15 dias</Badge>
      </header>

      <div className="mt-4">
        <BillingCycleToggle cycle={cycle} onChange={setCycle} annualBadge={annualBadge} />
      </div>

      <div className="mt-5 space-y-3">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        ) : displayPlans.length ? (
          displayPlans.map((p) => (
            <div
              key={p.id}
              className={[
                "rounded-2xl border p-4",
                p.highlight
                  ? "border-teal-200/70 bg-teal-50/60"
                  : "border-zinc-200/70 bg-white/70"
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{p.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">{p.displayPriceLabel}</p>
                </div>
                {p.highlight ? (
                  <Badge className="border-transparent bg-teal-600 text-white">Recomendado</Badge>
                ) : null}
              </div>

              <ul className="mt-3 space-y-1 text-sm text-zinc-600">
                {p.benefits.slice(0, 4).map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm text-zinc-600">
            Planos indisponíveis no momento. Você ainda pode entrar/criar conta e ver o painel em modo leitura.
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Link href={routes.public.pricing} className="w-full">
          <Button variant="secondary" className="w-full">
            Ver detalhes dos planos
          </Button>
        </Link>

        {primary ? (
          <p className="text-xs text-zinc-500">
            Sugestão: <span className="font-semibold">{primary.name}</span> ({primary.displayPriceLabel})
          </p>
        ) : null}
      </div>
    </Card>
  );
}
