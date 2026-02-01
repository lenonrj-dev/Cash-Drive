/* frontend/components/pages/transactions/components/TransactionsSummary.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import { formatDateShort } from "../../../../lib/format";
import type { Transaction } from "../../../../types/api";

export default function TransactionsSummary({
  loading,
  incomeLabel,
  expenseLabel,
  balanceLabel,
  count,
  last
}: {
  loading: boolean;
  incomeLabel: string;
  expenseLabel: string;
  balanceLabel: string;
  count: number;
  last: Transaction | null;
}) {
  return (
    <section aria-label="Resumo de lançamentos" className="grid gap-4 lg:grid-cols-3">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Resumo</p>
            <h2 className="mt-2 text-sm font-semibold text-zinc-900">Saldo do período</h2>
            <p className="mt-1 text-2xl font-bold text-zinc-900">{loading ? "—" : balanceLabel}</p>
            <p className="mt-1 text-xs text-zinc-500">Entradas menos saídas no intervalo selecionado.</p>
          </div>
          <Badge>{loading ? "..." : `${count}`}</Badge>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Entradas</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">{loading ? "—" : incomeLabel}</p>
            <p className="mt-1 text-xs text-zinc-500">Tudo o que entrou (pix, corridas, entregas).</p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white text-zinc-600">
            <ArrowUpIcon />
          </span>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Saídas</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">{loading ? "—" : expenseLabel}</p>
            <p className="mt-1 text-xs text-zinc-500">Combustível, manutenção, taxas e alimentação.</p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200/70 bg-white text-zinc-600">
            <ArrowDownIcon />
          </span>
        </div>
      </Card>

      <Card className="p-5 lg:col-span-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-zinc-900">Último lançamento</h3>
            <p className="mt-1 text-sm text-zinc-600">
              {last ? (
                <>
                  <span className="font-semibold text-zinc-900">{last.type === "INCOME" ? "Entrada" : "Saída"}</span>
                  {" • "}
                  <span className="text-zinc-700">{last.note || last.category || "Sem descrição"}</span>
                  {" • "}
                  <span className="text-zinc-500">{formatDateShort(last.date)}</span>
                </>
              ) : (
                "Sem registros ainda."
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{last ? (last.type === "INCOME" ? "Entrada" : "Saída") : "Sem dados"}</Badge>
            <Badge>{last ? "Atualizado" : "Aguardando"}</Badge>
          </div>
        </div>
      </Card>
    </section>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 5v14" />
      <path d="M19 12l-7 7-7-7" />
    </svg>
  );
}
