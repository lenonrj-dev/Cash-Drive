/* frontend/components/pages/dashboard/components/DashboardHighlights.tsx */
"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import { routes } from "../../../../lib/routes";
import { formatCurrencyBRL } from "../../../../lib/format";

function clamp0(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, n);
}

function pct(a: number, b: number) {
  const aa = clamp0(a);
  const bb = clamp0(b);
  const d = aa + bb;
  if (!d) return 0;
  return Math.round((aa / d) * 100);
}

export default function DashboardHighlights({
  loading,
  summary
}: {
  loading: boolean;
  summary: {
    balance: number;
    income: number;
    expense: number;
    goalsMissing: number;
    billsMissing: number;
  };
}) {
  const health = useMemo(() => {
    const income = clamp0(summary?.income ?? 0);
    const expense = clamp0(summary?.expense ?? 0);
    const balance = Number(summary?.balance ?? 0);

    const savings = Math.max(0, income - expense);
    const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;

    let label = "Em equilíbrio";
    let tone = "bg-teal-600 text-white";

    if (income === 0 && expense === 0) {
      label = "Sem dados";
      tone = "bg-zinc-700 text-white";
    } else if (expense > income) {
      label = "Atenção";
      tone = "bg-amber-600 text-white";
    } else if (savingsRate >= 20) {
      label = "Saudável";
      tone = "bg-teal-600 text-white";
    }

    const inShare = pct(income, expense);
    const outShare = 100 - inShare;

    return {
      label,
      tone,
      savings,
      savingsRate,
      inShare,
      outShare,
      balance
    };
  }, [summary]);

  return (
    <Card className="p-6" aria-label="Resumo rápido do painel">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Resumo rápido</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Como está seu período</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Indicadores para decidir o próximo passo sem precisar rolar a tela.
          </p>
        </div>
        <span className={["inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", health.tone].join(" ")}>
          {health.label}
        </span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Economia</p>
            <Badge>{loading ? "…" : `${health.savingsRate}%`}</Badge>
          </div>
          <p className="mt-2 text-lg font-bold text-zinc-900">
            {loading ? "Carregando..." : formatCurrencyBRL(health.savings)}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Entradas menos saídas (30 dias).</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Distribuição</p>
            <Badge>{loading ? "…" : `${health.inShare}%/${health.outShare}%`}</Badge>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Entrada</span>
              <span>Saída</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full bg-teal-500"
                style={{ width: `${loading ? 50 : health.inShare}%` }}
              />
            </div>
          </div>
          <p className="mt-2 text-xs text-zinc-500">Comparativo simples do período.</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-gradient-to-r from-teal-50 via-white to-white p-4">
        <p className="text-sm font-semibold text-zinc-900">Atalho recomendado</p>
        <p className="mt-1 text-sm text-zinc-600">
          {loading
            ? "Carregando sugestão..."
            : (summary?.expense ?? 0) > (summary?.income ?? 0)
              ? "Suas saídas estão maiores que as entradas. Registre tudo e revise categorias para achar vazamentos."
              : "Mantenha o ritmo: registre lançamentos e acompanhe suas metas do dia/semana."}
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Link href={routes.app.lancamentos} className="sm:flex-1">
            <Button className="w-full">Ver lançamentos</Button>
          </Link>
          <Link href={routes.app.metas} className="sm:flex-1">
            <Button className="w-full" variant="secondary">
              Ver metas
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
