/* frontend/components/pages/dashboard/DashboardView.tsx */
"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "./ReadOnlyBanner";
import KPICards from "./KPICards";
import SectionCard from "../../ui/SectionCard";
import Alert from "../../ui/Alert";
import Skeleton from "../../ui/Skeleton";

import { getDashboardSummary, getDashboardRecentActivity } from "../../../services/dashboardService";
import type { DashboardSummary } from "../../../services/dashboardService";

import DashboardHighlights from "./components/DashboardHighlights";
import DashboardRecentActivity from "./components/DashboardRecentActivity";
import DashboardNextSteps from "./components/DashboardNextSteps";

import type { Transaction } from "../../../types/api";
import { formatCurrencyBRL } from "../../../lib/format";

export default function DashboardView() {
  const billing = useContext(BillingContext);
  const canWrite = useMemo(() => Boolean(billing?.canWrite), [billing?.canWrite]);

  const [summary, setSummary] = useState<DashboardSummary>({
    balance: 0,
    income: 0,
    expense: 0,
    goalsMissing: 0,
    billsMissing: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [recent, setRecent] = useState<Transaction[]>([]);
  const [recentLoading, setRecentLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getDashboardSummary();
        if (!alive) return;
        setSummary(res);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Não foi possível carregar";
        setError(message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      setRecentLoading(true);
      try {
        // Sem filtros no dashboard: puxa os itens mais recentes
        const res = await getDashboardRecentActivity();
        if (!alive) return;
        setRecent(Array.isArray(res?.items) ? res.items : []);
      } catch {
        if (!alive) return;
        setRecent([]);
      } finally {
        if (alive) setRecentLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar ações."} /> : null}

      {error ? <Alert message={error} /> : null}

      <KPICards summary={summary} loading={loading} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <DashboardHighlights loading={loading} summary={summary} />

          <SectionCard title="Resumo do período" subtitle="Últimos 30 dias com metas e contas em aberto.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                <p className="text-xs font-semibold text-zinc-500">Metas</p>
                {loading ? (
                  <Skeleton className="mt-2 h-6 w-28" />
                ) : (
                  <p className="mt-2 text-lg font-bold text-zinc-900">Faltam {formatCurrencyBRL(summary?.goalsMissing ?? 0)}</p>
                )}
                <p className="mt-1 text-xs text-zinc-500">Comparado com entradas</p>
              </div>
              <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                <p className="text-xs font-semibold text-zinc-500">Contas</p>
                {loading ? (
                  <Skeleton className="mt-2 h-6 w-28" />
                ) : (
                  <p className="mt-2 text-lg font-bold text-zinc-900">Faltam {formatCurrencyBRL(summary?.billsMissing ?? 0)}</p>
                )}
                <p className="mt-1 text-xs text-zinc-500">Até 30 dias</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-gradient-to-r from-teal-50 via-white to-white p-4 text-sm text-zinc-600">
              {loading ? (
                "Carregando recomendações..."
              ) : (
                <>
                  {summary.expense > summary.income ? (
                    <>
                      Suas <span className="font-semibold">saídas</span> estão acima das entradas. Revise lançamentos e use categorias para reduzir vazamentos.
                    </>
                  ) : (
                    <>
                      Bom ritmo! Mantenha o registro diário e use metas semanais para acelerar. Seu saldo atual: <span className="font-semibold">{formatCurrencyBRL(summary.balance)}</span>.
                    </>
                  )}
                </>
              )}
            </div>
          </SectionCard>

          <DashboardRecentActivity loading={recentLoading} items={recent} />
        </div>

        <div className="lg:col-span-4">
          <DashboardNextSteps canWrite={canWrite} loading={loading} summary={summary} />
        </div>
      </div>
    </div>
  );
}
