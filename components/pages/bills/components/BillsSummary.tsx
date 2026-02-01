/* frontend/components/pages/bills/components/BillsSummary.tsx */
"use client";

import React, { useMemo } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import type { Bill } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

function sumCents(list: Bill[]) {
  return list.reduce((acc, b) => acc + (b.amountCents || 0), 0);
}

function daysUntil(iso: string) {
  const now = new Date();
  const d = new Date(iso);
  const diff = d.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function BillsSummary({
  items,
  filteredCount,
  loading
}: {
  items: Bill[];
  filteredCount: number;
  loading: boolean;
}) {
  const summary = useMemo(() => {
    const open = items.filter((b) => b.status === "open");
    const late = items.filter((b) => b.status === "late");
    const paid = items.filter((b) => b.status === "paid");

    const unpaid = [...open, ...late];

    const dueSoon = unpaid
      .filter((b) => {
        const d = daysUntil(b.dueDate);
        return d >= 0 && d <= 7;
      })
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    const nextDue = unpaid
      .slice()
      .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())[0];

    return {
      counts: {
        total: items.length,
        filtered: filteredCount,
        open: open.length,
        late: late.length,
        paid: paid.length,
        dueSoon: dueSoon.length
      },
      totals: {
        openCents: sumCents(open),
        lateCents: sumCents(late),
        paidCents: sumCents(paid),
        unpaidCents: sumCents(unpaid)
      },
      dueSoon,
      nextDue
    };
  }, [items, filteredCount]);

  return (
    <section aria-label="Resumo de contas" className="space-y-3">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MiniCard
          title="Em aberto"
          value={loading ? "—" : formatCurrencyBRL(summary.totals.openCents)}
          hint={loading ? "" : `${summary.counts.open} conta(s)`}
          badge={"Abertas"}
        />

        <MiniCard
          title="Atrasadas"
          value={loading ? "—" : formatCurrencyBRL(summary.totals.lateCents)}
          hint={loading ? "" : `${summary.counts.late} conta(s)`}
          badge={"Atraso"}
          accent="danger"
        />

        <MiniCard
          title="Vencendo (7 dias)"
          value={loading ? "—" : String(summary.counts.dueSoon)}
          hint={loading ? "" : summary.nextDue ? `Próxima: ${formatDateShort(summary.nextDue.dueDate)}` : "Sem próximas"}
          badge={"Prioridade"}
          accent="warn"
        />

        <MiniCard
          title="Pagas"
          value={loading ? "—" : formatCurrencyBRL(summary.totals.paidCents)}
          hint={loading ? "" : `${summary.counts.paid} conta(s)`}
          badge={"Concluídas"}
        />
      </div>

      <Card className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Visão rápida</p>
            <p className="mt-1 text-sm text-zinc-600">
              Você está vendo <span className="font-semibold text-zinc-900">{summary.counts.filtered}</span> de{" "}
              <span className="font-semibold text-zinc-900">{summary.counts.total}</span> contas.
              {summary.nextDue ? " " : null}
              {summary.nextDue ? (
                <span>
                  Próximo vencimento: <span className="font-semibold text-zinc-900">{formatDateShort(summary.nextDue.dueDate)}</span>.
                </span>
              ) : null}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge>Filtro ativo: {summary.counts.filtered !== summary.counts.total ? "Sim" : "Não"}</Badge>
            <Badge>Total em aberto: {loading ? "—" : formatCurrencyBRL(summary.totals.unpaidCents)}</Badge>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Como isso ajuda no seu saldo?</p>
          <p className="mt-1 text-sm text-zinc-600">
            Manter as contas registradas melhora a previsão do mês: você enxerga o que falta pagar, o que já foi
            quitado e o que está atrasado — evitando surpresas e ajudando a bater metas.
          </p>
        </div>
      </Card>
    </section>
  );
}

function MiniCard({
  title,
  value,
  hint,
  badge,
  accent
}: {
  title: string;
  value: string;
  hint: string;
  badge: string;
  accent?: "danger" | "warn";
}) {
  const styles =
    accent === "danger"
      ? "border-rose-200/70 bg-rose-50/60"
      : accent === "warn"
        ? "border-amber-200/70 bg-amber-50/60"
        : "border-zinc-200/70 bg-white";

  const badgeStyles =
    accent === "danger"
      ? "border-transparent bg-rose-600 text-white"
      : accent === "warn"
        ? "border-transparent bg-amber-600 text-white"
        : "";

  return (
    <Card className={["p-5", styles].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-zinc-900">{value}</p>
          {hint ? <p className="mt-1 text-xs text-zinc-600">{hint}</p> : null}
        </div>
        <Badge className={badgeStyles}>{badge}</Badge>
      </div>
    </Card>
  );
}
