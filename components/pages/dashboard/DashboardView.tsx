/* frontend/components/pages/dashboard/DashboardView.tsx */
"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "./ReadOnlyBanner";
import KPICards from "./KPICards";
import QuickActions from "./QuickActions";
import SectionCard from "../../ui/SectionCard";
import Alert from "../../ui/Alert";
import Skeleton from "../../ui/Skeleton";
import { getDashboardSummary } from "../../../services/dashboardService";
import { formatCurrencyBRL } from "../../../lib/format";
import type { DashboardSummary } from "../../../services/dashboardService";

export default function DashboardView() {
  const billing = useContext(BillingContext);
  const canWrite = useMemo(() => Boolean(billing?.canWrite), [billing?.canWrite]);

  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      const res = await getDashboardSummary();
      if (!alive) return;
      if (res.ok) {
        setSummary(res.data);
      } else {
        setError(res.error.message);
      }
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar acoes."} /> : null}

      {error ? <Alert message={error} /> : null}

      <KPICards summary={summary} loading={loading} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <SectionCard
          title="Resumo do periodo"
          subtitle="Ultimos 30 dias com metas e contas em aberto."
          className="lg:col-span-8"
        >
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
              <p className="text-xs font-semibold text-zinc-500">Metas</p>
              {loading ? (
                <Skeleton className="mt-2 h-6 w-28" />
              ) : (
                <p className="mt-2 text-lg font-bold text-zinc-900">
                  Faltam {formatCurrencyBRL(summary?.goalsMissing ?? 0)}
                </p>
              )}
              <p className="mt-1 text-xs text-zinc-500">Comparado com entradas</p>
            </div>
            <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
              <p className="text-xs font-semibold text-zinc-500">Contas</p>
              {loading ? (
                <Skeleton className="mt-2 h-6 w-28" />
              ) : (
                <p className="mt-2 text-lg font-bold text-zinc-900">
                  Faltam {formatCurrencyBRL(summary?.billsMissing ?? 0)}
                </p>
              )}
              <p className="mt-1 text-xs text-zinc-500">Ate 30 dias</p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-gradient-to-r from-teal-50 via-white to-white p-4 text-sm text-zinc-600">
            Fique atento aos vencimentos. Use o assistente para registrar despesas rapidamente.
          </div>
        </SectionCard>

        <div className="lg:col-span-4">
          <QuickActions canWrite={canWrite} />
        </div>
      </div>
    </div>
  );
}
