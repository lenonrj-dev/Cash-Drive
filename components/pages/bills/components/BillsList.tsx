/* frontend/components/pages/bills/components/BillsList.tsx */
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import type { Bill } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

function statusLabel(status: Bill["status"]) {
  if (status === "paid") return "Paga";
  if (status === "late") return "Atrasada";
  return "Aberta";
}

export default function BillsList({
  items,
  onEdit,
  onDelete,
  canWrite
}: {
  items: Bill[];
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
  canWrite: boolean;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Minhas contas</h2>
        <span className="text-xs text-zinc-500">Agenda financeira</span>
      </div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-600">Nenhuma conta cadastrada.</p>
        ) : (
          items.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-zinc-900">{b.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    {formatCurrencyBRL(b.amountCents)} - Vence {formatDateShort(b.dueDate)}
                  </p>
                </div>
                <Badge>{statusLabel(b.status)}</Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" disabled={!canWrite} onClick={() => onEdit(b)}>
                  Editar
                </Button>
                <Button size="sm" variant="ghost" disabled={!canWrite} onClick={() => onDelete(b)}>
                  Excluir
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
