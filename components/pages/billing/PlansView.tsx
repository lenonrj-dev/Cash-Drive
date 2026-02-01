/* frontend/components/pages/billing/PlansView.tsx */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PageHeader from "../common/PageHeader";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Skeleton from "../../ui/Skeleton";
import BillingCycleToggle from "../../common/BillingCycleToggle";

import { getPlans } from "../../../services/billingService";
import type { BillingPlan } from "../../../types/api";
import { formatCurrencyBRL } from "../../../lib/format";
import {
  PRICING,
  type BillingCycle,
  getAnnualSavingsCents,
} from "../../../lib/pricing";

import PlansGrid from "./PlansGrid";
import BillingStatusCard from "./BillingStatusCard";

import PlansInfoStrip from "./components/PlansInfoStrip";
import PlansComparison from "./components/PlansComparison";
import PlansSupportCard from "./components/PlansSupportCard";
import PlansFAQ from "./components/PlansFAQ";
import { mapPlansToCycle } from "./planPricing";

export default function PlansView({ variant }: { variant: "public" | "inApp" }) {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const res = await getPlans(cycle);
        if (!alive) return;
        setPlans(Array.isArray(res?.plans) ? res.plans : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [cycle]);

  const displayPlans = useMemo(() => mapPlansToCycle(plans, cycle), [plans, cycle]);
  const hasPlans = useMemo(() => displayPlans.length > 0, [displayPlans]);
  const annualBadge = useMemo(() => {
    const maxSavings = Math.max(
      getAnnualSavingsCents(PRICING.basic.monthlyCents, PRICING.basic.annualCents),
      getAnnualSavingsCents(PRICING.pro.monthlyCents, PRICING.pro.annualCents)
    );
    return `Economize até ${formatCurrencyBRL(maxSavings)}/ano`;
  }, []);

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="Planos"
        subtitle={
          variant === "public"
            ? "Comece com 15 dias grátis. Cartão obrigatório para iniciar o trial."
            : "Gerencie sua assinatura, reative quando precisar e mantenha seus recursos liberados."
        }
        right={
          <div className="flex flex-wrap items-center gap-2">
            <Badge>15 dias grátis</Badge>
            <Badge>Cartão obrigatório</Badge>
          </div>
        }
      />

      <PlansInfoStrip variant={variant} />

      {variant === "inApp" ? <BillingStatusCard /> : null}

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Skeleton className="h-44" />
            <Skeleton className="h-44" />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
        </div>
      ) : !hasPlans ? (
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Planos indisponíveis no momento.</p>
              <p className="mt-1 text-sm text-zinc-600">
                Tente novamente mais tarde ou fale com o suporte para liberar um acesso temporário.
              </p>
            </div>

            <Link href="/suporte" className="inline-flex">
              <Button size="sm">Falar com suporte</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Escolha o plano ideal</p>
              <p className="mt-1 text-sm text-zinc-600">
                Ative para liberar ações no painel (notificações, metas, contas e automações).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge>Pagamento seguro</Badge>
              <Badge>Cancelamento a qualquer momento</Badge>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200/70 bg-white p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Escolha o ciclo de cobrança</p>
                <p className="text-xs text-zinc-500">
                  {cycle === "annual"
                    ? "Cobrança anual com desconto. Ideal para quem quer previsibilidade."
                    : "Sem fidelidade no mensal. Você pode ajustar quando quiser."}
                </p>
              </div>
              <BillingCycleToggle cycle={cycle} onChange={setCycle} annualBadge={annualBadge} />
            </div>
          </div>

          <PlansGrid plans={displayPlans} />

          <PlansComparison plans={displayPlans} />

          <PlansSupportCard variant={variant} />

          <PlansFAQ />

          <Card className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Precisa de ajuda para decidir?</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Diga qual seu volume de lançamentos e o objetivo (metas, contas, alertas). Nós sugerimos o melhor plano.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Link href="/suporte" className="inline-flex">
                  <Button size="sm" variant="secondary">
                    Pedir recomendação
                  </Button>
                </Link>
                <Link href="/dashboard" className="inline-flex">
                  <Button size="sm" variant="ghost">
                    Voltar ao painel
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
