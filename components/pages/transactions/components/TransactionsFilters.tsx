/* frontend/components/pages/transactions/components/TransactionsFilters.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import type { TransactionType } from "../../../../types/common";

type QuickRange = "today" | "week" | "month" | "custom";

export default function TransactionsFilters({
  range,
  from,
  to,
  type,
  onRange,
  onFrom,
  onTo,
  onType,
  onClear
}: {
  range: QuickRange;
  from: string;
  to: string;
  type: TransactionType | "";
  onRange: (v: QuickRange) => void;
  onFrom: (v: string) => void;
  onTo: (v: string) => void;
  onType: (v: TransactionType | "") => void;
  onClear: () => void;
}) {
  return (
    <Card className="p-5" aria-label="Filtros de lançamentos">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">Filtros</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Use atalhos de período e filtre por tipo. Deixe o intervalo em "Personalizado" para definir datas.
            </p>
          </div>
          <Button variant="secondary" onClick={onClear} aria-label="Limpar filtros">
            Limpar
          </Button>
        </div>

        <div className="flex w-full items-center gap-2 overflow-x-auto rounded-full border border-zinc-200/80 bg-white p-1 shadow-sm">
          <Pill active={range === "today"} onClick={() => onRange("today")}>Hoje</Pill>
          <Pill active={range === "week"} onClick={() => onRange("week")}>Semana</Pill>
          <Pill active={range === "month"} onClick={() => onRange("month")}>Mês</Pill>
          <Pill active={range === "custom"} onClick={() => onRange("custom")}>Personalizado</Pill>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-zinc-500">De</span>
            <input
              type="date"
              className="h-10 rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              value={from}
              onChange={(e) => onFrom(e.target.value)}
              disabled={range !== "custom"}
              aria-label="Data inicial"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-zinc-500">Até</span>
            <input
              type="date"
              className="h-10 rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              value={to}
              onChange={(e) => onTo(e.target.value)}
              disabled={range !== "custom"}
              aria-label="Data final"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-zinc-500">Tipo</span>
            <select
              className="h-10 rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              value={type}
              onChange={(e) => onType(e.target.value as TransactionType | "")}
              aria-label="Filtrar por tipo"
            >
              <option value="">Todos</option>
              <option value="INCOME">Entrada</option>
              <option value="EXPENSE">Saída</option>
            </select>
          </label>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Dica rápida</p>
          <p className="mt-1 text-sm text-zinc-600">
            Para motoboy: registre combustível e taxas como <span className="font-semibold">Saída</span> e ganhos de apps como <span className="font-semibold">Entrada</span>.
            Assim o saldo do período fica real.
          </p>
        </div>
      </div>
    </Card>
  );
}

function Pill({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition focus:outline-none",
        active ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
      ].join(" ")}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
