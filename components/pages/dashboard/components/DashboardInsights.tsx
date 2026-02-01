/* frontend/components/pages/dashboard/components/DashboardInsights.tsx */
"use client";

import React, { useMemo } from "react";
import SectionCard from "../../../ui/SectionCard";
import Badge from "../../../ui/Badge";
import Skeleton from "../../../ui/Skeleton";
import { formatCurrencyBRL } from "../../../../lib/format";

export default function DashboardInsights({
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
  const net = useMemo(() => (summary?.income ?? 0) - (summary?.expense ?? 0), [summary?.income, summary?.expense]);
  const netLabel = net >= 0 ? "Positivo" : "Negativo";

  const pace = useMemo(() => {
    // heurística simples para UX (sem backend): usa média diária aproximada de 30 dias
    const days = 30;
    const incomeDay = (summary?.income ?? 0) / days;
    const expenseDay = (summary?.expense ?? 0) / days;
    const netDay = incomeDay - expenseDay;
    return { incomeDay, expenseDay, netDay };
  }, [summary?.income, summary?.expense]);

  const risk = useMemo(() => {
    const bills = summary?.billsMissing ?? 0;
    if (bills <= 0) return { label: "Sem risco", tone: "ok" as const, hint: "Nenhum vencimento pendente no período." };
    if (bills < (summary?.income ?? 0) * 0.25)
      return { label: "Atenção", tone: "warn" as const, hint: "Há contas pendentes, mas parecem controladas." };
    return { label: "Crítico", tone: "bad" as const, hint: "Contas pendentes altas para o seu ritmo de entrada." };
  }, [summary?.billsMissing, summary?.income]);

  const riskBadge =
    risk.tone === "ok"
      ? "border-transparent bg-teal-600 text-white"
      : risk.tone === "warn"
        ? "border-transparent bg-amber-500 text-white"
        : "border-transparent bg-rose-600 text-white";

  return (
    <SectionCard
      title="Insights do período"
      subtitle="Leitura rápida do seu ritmo nos últimos 30 dias."
      className="h-full"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Líquido</p>
            <Badge className={net >= 0 ? "border-transparent bg-teal-600 text-white" : "border-transparent bg-rose-600 text-white"}>
              {netLabel}
            </Badge>
          </div>
          {loading ? (
            <Skeleton className="mt-2 h-6 w-36" />
          ) : (
            <p className="mt-2 text-lg font-bold text-zinc-900">{formatCurrencyBRL(net)}</p>
          )}
          <p className="mt-1 text-xs text-zinc-500">Entrada menos saída no período.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Risco de vencimentos</p>
            <Badge className={riskBadge}>{risk.label}</Badge>
          </div>
          {loading ? (
            <Skeleton className="mt-2 h-6 w-44" />
          ) : (
            <p className="mt-2 text-sm font-semibold text-zinc-900">{risk.hint}</p>
          )}
          <p className="mt-1 text-xs text-zinc-500">Baseado em contas pendentes vs entradas.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Ritmo (média/dia)</p>
          {loading ? (
            <Skeleton className="mt-2 h-6 w-40" />
          ) : (
            <p className="mt-2 text-sm font-semibold text-zinc-900">
              + {formatCurrencyBRL(pace.incomeDay)} • - {formatCurrencyBRL(pace.expenseDay)}
            </p>
          )}
          <p className="mt-1 text-xs text-zinc-500">Ajuda a entender seu ritmo na rua.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Próxima meta</p>
          {loading ? (
            <Skeleton className="mt-2 h-6 w-36" />
          ) : (
            <p className="mt-2 text-sm font-semibold text-zinc-900">
              Faltam {formatCurrencyBRL(summary?.goalsMissing ?? 0)}
            </p>
          )}
          <p className="mt-1 text-xs text-zinc-500">Comparado com suas entradas.</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-gradient-to-r from-teal-50 via-white to-white p-4 text-sm text-zinc-700">
        <p className="font-semibold text-zinc-900">Sugestão de rotina</p>
        <p className="mt-1">
          No fim do dia, registre <span className="font-semibold">taxas</span>, <span className="font-semibold">combustível</span> e
          <span className="font-semibold"> manutenção</span>. Assim o saldo e as metas refletem o seu lucro real.
        </p>
      </div>
    </SectionCard>
  );
}
