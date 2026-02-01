/* frontend/components/pages/bills/components/BillsList.tsx */
"use client";

import React, { useMemo } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import type { Bill, BillInput } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

type StatusFilter = "all" | Bill["status"];

type SortKey = "due_asc" | "due_desc" | "amount_desc" | "amount_asc" | "name_asc";

type RecurringFilter = "all" | "recurring" | "oneoff";

function statusLabel(status: Bill["status"]) {
  if (status === "paid") return "Paga";
  if (status === "late") return "Atrasada";
  return "Aberta";
}

function statusStyles(status: Bill["status"]) {
  if (status === "paid") return "border-transparent bg-teal-600 text-white";
  if (status === "late") return "border-transparent bg-rose-600 text-white";
  return "";
}

function daysUntil(iso: string) {
  const now = new Date();
  const d = new Date(iso);
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function dueHint(status: Bill["status"], iso: string) {
  if (status === "paid") return "Concluída";
  const d = daysUntil(iso);
  if (d === 0) return "Vence hoje";
  if (d === 1) return "Vence amanhã";
  if (d > 1) return `Vence em ${d} dias`;
  return `Venceu há ${Math.abs(d)} dias`;
}

function dueStyles(status: Bill["status"], iso: string) {
  if (status === "paid") return "border-zinc-200/70 bg-white text-zinc-700";
  const d = daysUntil(iso);
  if (d < 0) return "border-transparent bg-rose-50 text-rose-700";
  if (d <= 7) return "border-transparent bg-amber-50 text-amber-800";
  return "border-zinc-200/70 bg-white text-zinc-700";
}

export default function BillsList({
  items,
  onEdit,
  onDelete,
  onQuickStatus,
  canWrite,
  activeFilters
}: {
  items: Bill[];
  onEdit: (bill: Bill) => void;
  onDelete: (bill: Bill) => void;
  onQuickStatus: (bill: Bill, nextStatus: BillInput["status"]) => void;
  canWrite: boolean;
  activeFilters: { query: string; status: StatusFilter; sort: SortKey; recurring: RecurringFilter };
}) {
  const meta = useMemo(() => {
    const hasFilter =
      Boolean(activeFilters.query.trim()) ||
      activeFilters.status !== "all" ||
      activeFilters.sort !== "due_asc" ||
      activeFilters.recurring !== "all";

    return {
      hasFilter,
      count: items.length
    };
  }, [items.length, activeFilters]);

  return (
    <section aria-label="Lista de contas">
      <Card className="p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-zinc-900">Minhas contas</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Acompanhe vencimentos e status. {meta.hasFilter ? "Filtros aplicados." : "Sem filtros."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{meta.count} item(ns)</Badge>
            <Badge>Agenda financeira</Badge>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {items.length === 0 ? (
            <EmptyState />
          ) : (
            items.map((b) => (
              <article
                key={b.id}
                className={[
                  "rounded-2xl border p-4 transition",
                  b.status === "late" ? "border-rose-200/70 bg-rose-50/40" : "border-zinc-200/70 bg-white/70"
                ].join(" ")}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold text-zinc-900">{b.name}</p>
                      {b.recurring ? <Badge className="border-transparent bg-zinc-900 text-white">Recorrente</Badge> : null}
                    </div>

                    <p className="mt-1 text-sm text-zinc-600">
                      Vencimento: <span className="font-semibold text-zinc-900">{formatDateShort(b.dueDate)}</span>
                      <span className="mx-2 text-zinc-300">•</span>
                      <span className="font-semibold">{dueHint(b.status, b.dueDate)}</span>
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                    <Badge className={statusStyles(b.status)}>{statusLabel(b.status)}</Badge>
                    <Badge className={dueStyles(b.status, b.dueDate)}>{formatCurrencyBRL(b.amountCents)}</Badge>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <Button size="sm" variant="secondary" disabled={!canWrite} onClick={() => onEdit(b)} aria-label="Editar conta">
                    Editar
                  </Button>

                  {b.status !== "paid" ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={!canWrite}
                      onClick={() => onQuickStatus(b, "paid")}
                      aria-label="Marcar como paga"
                    >
                      Marcar como paga
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={!canWrite}
                      onClick={() => onQuickStatus(b, "open")}
                      aria-label="Reabrir conta"
                    >
                      Reabrir
                    </Button>
                  )}

                  <Button size="sm" variant="ghost" disabled={!canWrite} onClick={() => onDelete(b)} aria-label="Excluir conta">
                    Excluir
                  </Button>
                </div>

                <div className="mt-3 rounded-2xl border border-zinc-200/70 bg-white/80 p-3">
                  <p className="text-xs text-zinc-600">
                    Dica: use status "Paga" para manter sua previsão do mês fiel e evitar contar a mesma despesa duas vezes.
                  </p>
                </div>
              </article>
            ))
          )}
        </div>
      </Card>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 text-center">
      <p className="text-sm font-semibold text-zinc-900">Nenhuma conta cadastrada</p>
      <p className="mt-1 text-sm text-zinc-600">
        Comece adicionando suas contas do mês. Você pode marcar como recorrente e acompanhar vencimentos.
      </p>
    </div>
  );
}
