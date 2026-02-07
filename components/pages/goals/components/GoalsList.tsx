/* frontend/components/pages/goals/components/GoalsList.tsx */
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import type { Goal } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";
import { dateInputToISO, todayInputDate } from "../../../../lib/date";
import type { GoalKindFilter } from "../GoalsView";

type SortKey = "deadline_asc" | "deadline_desc" | "amount_desc" | "amount_asc" | "name_asc";

type Kind = "daily" | "weekly" | "monthly" | "custom";

function parseKind(name: string): Kind {
  const n = String(name || "").trim();
  if (n.startsWith("[Diaria]") || n.startsWith("[Diária]")) return "daily";
  if (n.startsWith("[Semanal]")) return "weekly";
  if (n.startsWith("[Mensal]")) return "monthly";
  return "custom";
}

function kindLabel(kind: Kind) {
  if (kind === "daily") return "Diária";
  if (kind === "weekly") return "Semanal";
  if (kind === "monthly") return "Mensal";
  return "Personalizada";
}

function daysDiffFromToday(iso: string) {
  const now = new Date();
  const a = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const bDate = new Date(dateInputToISO(iso));
  const b = new Date(bDate.getFullYear(), bDate.getMonth(), bDate.getDate()).getTime();
  return Math.round((b - a) / (1000 * 60 * 60 * 24));
}

function deadlineTone(deadlineISO: string) {
  const d = daysDiffFromToday(deadlineISO);
  if (d < 0) return "late";
  if (d === 0) return "today";
  if (d <= 7) return "soon";
  return "ok";
}

function deadlineLabel(deadlineISO: string) {
  const d = daysDiffFromToday(deadlineISO);
  if (d < 0) return `Atrasada (${Math.abs(d)}d)`;
  if (d === 0) return "Vence hoje";
  if (d === 1) return "Vence amanhã";
  return `Vence em ${d} dias`;
}

export default function GoalsList({
  items,
  onEdit,
  onDelete,
  onQuickDeadline,
  canWrite,
  activeFilters
}: {
  items: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (goal: Goal) => void;
  onQuickDeadline: (goal: Goal, nextDeadlineISO: string | null) => void;
  canWrite: boolean;
  activeFilters: {
    query: string;
    kind: GoalKindFilter;
    sort: SortKey;
    hideNoDeadline: boolean;
  };
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Minhas metas</h3>
          <p className="mt-1 text-xs text-zinc-500">
            {items.length === 0 ? "Sem itens" : `Mostrando ${items.length} meta(s)`}
            {activeFilters.kind !== "all" || activeFilters.query.trim() || activeFilters.hideNoDeadline ? " • filtros ativos" : ""}
          </p>
        </div>
        <span className="text-xs text-zinc-500">Atualizado hoje</span>
      </div>

      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          items.map((g) => {
            const k = parseKind(g.name);
            const hasDeadline = Boolean(g.deadline);
            const tone = hasDeadline ? deadlineTone(g.deadline as string) : "ok";

            return (
              <div key={g.id} className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-zinc-900">{g.name}</p>
                      <KindBadge kind={k} />
                      {hasDeadline ? <DeadlineBadge tone={tone} label={deadlineLabel(g.deadline as string)} /> : <Badge>Sem prazo</Badge>}
                    </div>

                    <p className="mt-2 text-sm text-zinc-600">
                      Alvo: <span className="font-semibold text-zinc-900">{formatCurrencyBRL(g.targetCents)}</span>
                    </p>

                    {hasDeadline ? (
                      <p className="mt-1 text-xs text-zinc-500">Prazo: {formatDateShort(g.deadline as string)}</p>
                    ) : (
                      <p className="mt-1 text-xs text-zinc-500">Dica: defina um prazo para priorizar melhor na rua.</p>
                    )}
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Button size="sm" variant="secondary" disabled={!canWrite} onClick={() => onEdit(g)}>
                      Editar
                    </Button>
                    <Button size="sm" variant="ghost" disabled={!canWrite} onClick={() => onDelete(g)}>
                      Excluir
                    </Button>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs text-zinc-500">
                    Tipo: <span className="font-semibold text-zinc-700">{kindLabel(k)}</span>
                    {k !== "custom" ? " • recomendado para rotina" : ""}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onQuickDeadline(g, startOfTodayISO())}
                      disabled={!canWrite}
                      className="rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Definir prazo para hoje"
                    >
                      Prazo: hoje
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickDeadline(g, endOfWeekISO())}
                      disabled={!canWrite}
                      className="rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Definir prazo para o fim da semana"
                    >
                      Prazo: semana
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickDeadline(g, endOfMonthISO())}
                      disabled={!canWrite}
                      className="rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Definir prazo para o fim do mês"
                    >
                      Prazo: mês
                    </button>
                    <button
                      type="button"
                      onClick={() => onQuickDeadline(g, null)}
                      disabled={!canWrite}
                      className="rounded-full border border-zinc-200/80 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Remover prazo"
                    >
                      Remover prazo
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-200 bg-white/60 p-6">
      <p className="text-sm font-semibold text-zinc-900">Nenhuma meta cadastrada</p>
      <p className="mt-1 text-sm text-zinc-600">
        Comece com uma <span className="font-semibold">Meta do dia</span> para ter direção. Depois, crie uma meta da semana
        para acompanhar sua evolução.
      </p>
    </div>
  );
}

function KindBadge({ kind }: { kind: Kind }) {
  const cls =
    kind === "daily"
      ? "border-teal-200/70 bg-teal-50 text-teal-700"
      : kind === "weekly"
        ? "border-emerald-200/70 bg-emerald-50 text-emerald-700"
        : kind === "monthly"
          ? "border-teal-300/70 bg-teal-100 text-teal-800"
          : "border-zinc-200/70 bg-white text-zinc-700";

  return <Badge className={cls}>{kindLabel(kind)}</Badge>;
}

function DeadlineBadge({ tone, label }: { tone: "late" | "today" | "soon" | "ok"; label: string }) {
  const cls =
    tone === "late"
      ? "border-amber-200/70 bg-amber-50 text-amber-700"
      : tone === "today"
        ? "border-teal-200/70 bg-teal-50 text-teal-700"
        : tone === "soon"
          ? "border-zinc-200/70 bg-white text-zinc-700"
          : "border-zinc-200/70 bg-white text-zinc-700";

  return <Badge className={cls}>{label}</Badge>;
}

function startOfTodayISO() {
  return todayInputDate();
}

function endOfWeekISO() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = d.getDay();
  const diffToSunday = 7 - day;
  d.setDate(d.getDate() + diffToSunday);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayStr}`;
}

function endOfMonthISO() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayStr}`;
}
