/* frontend/components/pages/transactions/components/TransactionsTable.tsx */
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import type { Transaction } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

function typeLabel(t: Transaction["type"]) {
  return t === "INCOME" ? "Entrada" : "Saída";
}

function typePillClass(t: Transaction["type"]) {
  return t === "INCOME"
    ? "border-emerald-200/70 bg-emerald-50 text-emerald-700"
    : "border-rose-200/70 bg-rose-50 text-rose-700";
}

export default function TransactionsTable({
  items,
  onEdit,
  onDelete,
  onDuplicate,
  canWrite
}: {
  items: Transaction[];
  onEdit: (item: Transaction) => void;
  onDelete: (item: Transaction) => void;
  onDuplicate: (item: Transaction) => void;
  canWrite: boolean;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Movimentações</h2>
          <p className="mt-1 text-xs text-zinc-500">A lista abaixo reflete os filtros e o período selecionado.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{items.length} itens</Badge>
          <Badge>Atualizado</Badge>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200/70">
        <div className="grid min-w-[860px] grid-cols-12 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          <div className="col-span-2">Tipo</div>
          <div className="col-span-4">Descrição</div>
          <div className="col-span-2 text-right">Valor</div>
          <div className="col-span-2 text-right">Data</div>
          <div className="col-span-2 text-right">Ações</div>
        </div>

        {items.length === 0 ? (
          <div className="px-4 py-6 text-sm text-zinc-600">Nenhum lançamento encontrado.</div>
        ) : (
          <div className="min-w-[860px] divide-y divide-zinc-200/70">
            {items.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm transition hover:bg-zinc-50"
              >
                <div className="col-span-2">
                  <span
                    className={[
                      "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
                      typePillClass(r.type)
                    ].join(" ")}
                  >
                    {typeLabel(r.type)}
                  </span>
                </div>

                <div className="col-span-4 min-w-0">
                  <p className="truncate font-semibold text-zinc-900">{r.note || r.category || "Sem descrição"}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {r.category ? `Categoria: ${r.category}` : "Sem categoria"}
                  </p>
                </div>

                <div className="col-span-2 text-right font-semibold text-zinc-900">{formatCurrencyBRL(r.amountCents)}</div>

                <div className="col-span-2 text-right text-zinc-500">{formatDateShort(r.date)}</div>

                <div className="col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="secondary" disabled={!canWrite} onClick={() => onEdit(r)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="ghost" disabled={!canWrite} onClick={() => onDuplicate(r)}>
                    Duplicar
                  </Button>
                  <Button size="sm" variant="ghost" disabled={!canWrite} onClick={() => onDelete(r)}>
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm">
        <p className="font-semibold text-zinc-900">Atalho de uso (motoboy)</p>
        <p className="mt-1 text-zinc-600">
          Use <span className="font-semibold">Duplicar</span> para registrar gastos repetidos (ex.: gasolina) sem preencher tudo de novo.
        </p>
      </div>
    </Card>
  );
}
