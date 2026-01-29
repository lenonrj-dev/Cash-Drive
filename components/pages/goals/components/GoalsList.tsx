/* frontend/components/pages/goals/components/GoalsList.tsx */
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import type { Goal } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

export default function GoalsList({
  items,
  onEdit,
  onDelete,
  canWrite
}: {
  items: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  canWrite: boolean;
}) {
  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Minhas metas</h2>
        <span className="text-xs text-zinc-500">Atualizado hoje</span>
      </div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-zinc-600">Nenhuma meta cadastrada.</p>
        ) : (
          items.map((g) => (
            <div
              key={g.id}
              className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-zinc-900">{g.name}</p>
                  <p className="mt-1 text-sm text-zinc-600">
                    Alvo: <span className="font-semibold">{formatCurrencyBRL(g.targetCents)}</span>
                  </p>
                  {g.deadline ? (
                    <p className="mt-1 text-xs text-zinc-500">
                      Deadline: {formatDateShort(g.deadline)}
                    </p>
                  ) : null}
                </div>
                <Badge>Em andamento</Badge>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Button size="sm" variant="secondary" disabled={!canWrite} onClick={() => onEdit(g)}>
                  Editar
                </Button>
                <Button size="sm" variant="ghost" disabled={!canWrite} onClick={() => onDelete(g)}>
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
