/* frontend/components/pages/transactions/components/TransactionsToolbar.tsx */
"use client";

import Button from "../../../ui/Button";
import Card from "../../../ui/Card";
import Input from "../../../ui/Input";

export default function TransactionsToolbar({
  search,
  onSearch,
  onOpenNew,
  onToggleFilters,
  canWrite
}: {
  search: string;
  onSearch: (value: string) => void;
  onOpenNew: () => void;
  onToggleFilters: () => void;
  canWrite: boolean;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Lancamentos</p>
          <h2 className="mt-2 text-lg font-bold text-zinc-900">Movimentacoes recentes</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Filtre por periodo, tipo ou descricao.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">
          <div className="w-full sm:max-w-xs">
            <Input
              label="Buscar"
              placeholder="Ex.: gasolina, iFood, Uber..."
              value={search}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" onClick={onToggleFilters}>
              Filtros
            </Button>
            <Button disabled={!canWrite} onClick={onOpenNew}>
              Novo lancamento
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
