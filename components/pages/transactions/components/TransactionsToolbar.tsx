/* frontend/components/pages/transactions/components/TransactionsToolbar.tsx */
"use client";

import React from "react";
import Button from "../../../ui/Button";
import Card from "../../../ui/Card";
import Input from "../../../ui/Input";

export default function TransactionsToolbar({
  search,
  onSearch,
  onOpenNew,
  onToggleFilters,
  onToggleHelp,
  filtersOpen,
  helpOpen,
  canWrite
}: {
  search: string;
  onSearch: (value: string) => void;
  onOpenNew: (type?: "INCOME" | "EXPENSE") => void;
  onToggleFilters: () => void;
  onToggleHelp: () => void;
  filtersOpen: boolean;
  helpOpen: boolean;
  canWrite: boolean;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Lançamentos</p>
          <h1 className="mt-2 text-lg font-bold text-zinc-900">Movimentações</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Registre entradas e saídas rapidamente. Use a busca e os filtros para achar qualquer gasto.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">
          <div className="w-full sm:max-w-xs">
            <Input
              label="Buscar"
              placeholder="Ex.: gasolina, taxa, iFood, Uber..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="secondary"
              onClick={onToggleHelp}
              aria-pressed={helpOpen}
              aria-label={helpOpen ? "Fechar ajuda" : "Abrir ajuda"}
            >
              Ajuda
            </Button>
            <Button
              variant="secondary"
              onClick={onToggleFilters}
              aria-pressed={filtersOpen}
              aria-label={filtersOpen ? "Fechar filtros" : "Abrir filtros"}
            >
              Filtros
            </Button>

            <div className="flex gap-2">
              <Button variant="secondary" disabled={!canWrite} onClick={() => onOpenNew("INCOME")}
                aria-label="Adicionar entrada">
                + Entrada
              </Button>
              <Button disabled={!canWrite} onClick={() => onOpenNew("EXPENSE")} aria-label="Adicionar saída">
                + Saída
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
