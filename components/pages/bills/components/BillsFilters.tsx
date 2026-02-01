/* frontend/components/pages/bills/components/BillsFilters.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Badge from "../../../ui/Badge";

type StatusFilter = "all" | "open" | "paid" | "late";

type SortKey = "due_asc" | "due_desc" | "amount_desc" | "amount_asc" | "name_asc";

type RecurringFilter = "all" | "recurring" | "oneoff";

export default function BillsFilters({
  query,
  status,
  sort,
  recurring,
  onQueryChange,
  onStatusChange,
  onSortChange,
  onRecurringChange,
  onClear
}: {
  query: string;
  status: StatusFilter;
  sort: SortKey;
  recurring: RecurringFilter;
  onQueryChange: (v: string) => void;
  onStatusChange: (v: StatusFilter) => void;
  onSortChange: (v: SortKey) => void;
  onRecurringChange: (v: RecurringFilter) => void;
  onClear: () => void;
}) {
  const isFiltered = Boolean(query.trim()) || status !== "all" || sort !== "due_asc" || recurring !== "all";

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Filtros e busca</p>
            <p className="mt-1 text-sm text-zinc-600">
              Encontre contas rapidamente por nome, status, recorrência e prioridade de vencimento.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Ativo: {isFiltered ? "Sim" : "Não"}</Badge>
            <Button type="button" variant="secondary" onClick={onClear} disabled={!isFiltered} aria-label="Limpar filtros">
              Limpar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-zinc-800">
              Buscar por nome
              <div className="mt-1 relative">
                <input
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder="Ex: Internet, aluguel, energia"
                  aria-label="Buscar contas pelo nome"
                  className="h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 pr-10 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                  <SearchIcon />
                </span>
              </div>
            </label>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-zinc-800">
              Ordenar
              <select
                className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                value={sort}
                onChange={(e) => onSortChange(e.target.value as SortKey)}
                aria-label="Ordenar contas"
              >
                <option value="due_asc">Vencimento: mais próximo</option>
                <option value="due_desc">Vencimento: mais distante</option>
                <option value="amount_desc">Valor: maior primeiro</option>
                <option value="amount_asc">Valor: menor primeiro</option>
                <option value="name_asc">Nome: A-Z</option>
              </select>
            </label>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-sm font-semibold text-zinc-800">
              Recorrência
              <select
                className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
                value={recurring}
                onChange={(e) => onRecurringChange(e.target.value as RecurringFilter)}
                aria-label="Filtrar por recorrência"
              >
                <option value="all">Todas</option>
                <option value="recurring">Somente recorrentes</option>
                <option value="oneoff">Somente pontuais</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 overflow-x-auto rounded-full border border-zinc-200/80 bg-white p-1 shadow-sm">
          <Pill active={status === "all"} onClick={() => onStatusChange("all")}>Todas</Pill>
          <Pill active={status === "open"} onClick={() => onStatusChange("open")}>Em aberto</Pill>
          <Pill active={status === "late"} onClick={() => onStatusChange("late")}>Atrasadas</Pill>
          <Pill active={status === "paid"} onClick={() => onStatusChange("paid")}>Pagas</Pill>
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
      aria-pressed={active}
      className={[
        "h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition focus:outline-none",
        active ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}
