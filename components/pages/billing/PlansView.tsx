/* frontend/components/pages/billing/PlansView.tsx */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import PageHeader from "../common/PageHeader";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import { getPlans } from "../../../services/billingService";
import type { BillingPlan } from "../../../types/api";
import PlansGrid from "./PlansGrid";
import BillingStatusCard from "./BillingStatusCard";
import Skeleton from "../../ui/Skeleton";

export default function PlansView({ variant }: { variant: "public" | "inApp" }) {
  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const res = await getPlans();
      if (!alive) return;
      setPlans(res.plans);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const hasPlans = useMemo(() => plans.length > 0, [plans]);

  return (
    <div className="w-full space-y-6">
      <PageHeader
        title="Planos"
        subtitle={
          variant === "public"
            ? "Comece com 15 dias gratis. Cartao obrigatorio para iniciar o trial."
            : "Gerencie sua assinatura e reative quando precisar."
        }
        right={
          <div className="flex flex-wrap items-center gap-2">
            <Badge>15 dias gratis</Badge>
            <Badge>Cartao obrigatorio</Badge>
          </div>
        }
      />

      {variant === "inApp" ? <BillingStatusCard /> : null}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-44" />
          <Skeleton className="h-44" />
        </div>
      ) : !hasPlans ? (
        <Card className="p-6">
          <p className="text-sm text-zinc-600">Planos indisponiveis no momento.</p>
        </Card>
      ) : (
        <PlansGrid plans={plans} />
      )}
    </div>
  );
}
