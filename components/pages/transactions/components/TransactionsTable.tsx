/* frontend/components/pages/transactions/components/TransactionsTable.tsx */
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import type { Transaction } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

export default function TransactionsTable({
  items,
  onEdit,
  onDelete,
  canWrite
}: {
  items: Transaction[];
  onEdit: (item: Transaction) => void;
  onDelete: (item: Transaction) => void;
  canWrite: boolean;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Movimentacoes</h2>
        <span className="text-xs text-zinc-500">Ultimos registros</span>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200/70">
        <div className="grid min-w-[720px] grid-cols-12 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          <div className="col-span-2">Tipo</div>
          <div className="col-span-4">Descricao</div>
          <div className="col-span-2 text-right">Valor</div>
          <div className="col-span-2 text-right">Data</div>
          <div className="col-span-2 text-right">Acoes</div>
        </div>

        {items.length === 0 ? (
          <div className="px-4 py-6 text-sm text-zinc-600">Nenhum lancamento encontrado.</div>
        ) : (
          <div className="min-w-[720px] divide-y divide-zinc-200/70">
            {items.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-12 items-center px-4 py-3 text-sm transition hover:bg-zinc-50"
              >
                <div className="col-span-2 font-semibold">
                  {r.type === "INCOME" ? "Entrada" : "Saida"}
                </div>
                <div className="col-span-4 text-zinc-700">
                  {r.note || r.category || "-"}
                </div>
                <div className="col-span-2 text-right font-semibold">{formatCurrencyBRL(r.amountCents)}</div>
                <div className="col-span-2 text-right text-zinc-500">
                  {formatDateShort(r.date)}
                </div>
                <div className="col-span-2 flex justify-end gap-2">
                  <Button size="sm" variant="secondary" disabled={!canWrite} onClick={() => onEdit(r)}>
                    Editar
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
    </Card>
  );
}
