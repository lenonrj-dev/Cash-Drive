/* frontend/components/pages/goals/components/GoalsFilters.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import type { GoalKindFilter } from "../GoalsView";

type SortKey = "deadline_asc" | "deadline_desc" | "amount_desc" | "amount_asc" | "name_asc";

export default function GoalsFilters({
  query,
  kind,
  sort,
  hideNoDeadline,
  onQueryChange,
  onKindChange,
  onSortChange,
  onHideNoDeadlineChange,
  onClear
}: {
  query: string;
  kind: GoalKindFilter;
  sort: SortKey;
  hideNoDeadline: boolean;
  onQueryChange: (v: string) => void;
  onKindChange: (v: GoalKindFilter) => void;
  onSortChange: (v: SortKey) => void;
  onHideNoDeadlineChange: (v: boolean) => void;
  onClear: () => void;
}) {
  const hasActive = Boolean(query.trim()) || kind !== "all" || sort !== "deadline_asc" || hideNoDeadline;

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-900">Filtrar e organizar</p>
          <p className="mt-1 text-sm text-zinc-600">
            Encontre metas rápido (nome), foque por período e priorize pelo prazo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" size="sm" onClick={onClear} disabled={!hasActive}>
            Limpar
          </Button>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <label className="block text-sm font-semibold text-zinc-800">
            Buscar
            <input
              aria-label="Buscar meta"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Ex.: meta do dia, aluguel, manutenção..."
              className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            />
          </label>
        </div>

        <div className="lg:col-span-3">
          <label className="block text-sm font-semibold text-zinc-800">
            Período
            <select
              aria-label="Filtrar por período"
              value={kind}
              onChange={(e) => onKindChange(e.target.value as GoalKindFilter)}
              className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              <option value="all">Todas</option>
              <option value="daily">Diárias</option>
              <option value="weekly">Semanais</option>
              <option value="monthly">Mensais</option>
              <option value="custom">Personalizadas</option>
            </select>
          </label>
        </div>

        <div className="lg:col-span-4">
          <label className="block text-sm font-semibold text-zinc-800">
            Ordenar
            <select
              aria-label="Ordenar metas"
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            >
              <option value="deadline_asc">Prazo (mais próximo)</option>
              <option value="deadline_desc">Prazo (mais distante)</option>
              <option value="amount_desc">Valor (maior)</option>
              <option value="amount_asc">Valor (menor)</option>
              <option value="name_asc">Nome (A–Z)</option>
            </select>
          </label>
        </div>

        <div className="lg:col-span-12">
          <label className="flex items-center gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-zinc-300"
              checked={hideNoDeadline}
              onChange={(e) => onHideNoDeadlineChange(e.target.checked)}
            />
            Ocultar metas sem prazo
          </label>
        </div>
      </div>
    </Card>
  );
}
