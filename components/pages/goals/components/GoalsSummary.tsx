/* frontend/components/pages/goals/components/GoalsSummary.tsx */
"use client";

import React, { useMemo } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";
import type { Goal } from "../../../../types/api";

type Kind = "daily" | "weekly" | "monthly" | "custom";

function parseKind(name: string): Kind {
  const n = String(name || "").trim();
  if (n.startsWith("[Diaria]") || n.startsWith("[Diária]")) return "daily";
  if (n.startsWith("[Semanal]")) return "weekly";
  if (n.startsWith("[Mensal]")) return "monthly";
  return "custom";
}

function daysDiffFromToday(iso: string) {
  const now = new Date();
  const a = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const bDate = new Date(iso);
  const b = new Date(bDate.getFullYear(), bDate.getMonth(), bDate.getDate()).getTime();
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function GoalsSummary({
  items,
  filteredCount,
  loading
}: {
  items: Goal[];
  filteredCount: number;
  loading: boolean;
}) {
  const stats = useMemo(() => {
    const byKind: Record<Kind, { count: number; sum: number }> = {
      daily: { count: 0, sum: 0 },
      weekly: { count: 0, sum: 0 },
      monthly: { count: 0, sum: 0 },
      custom: { count: 0, sum: 0 }
    };

    let dueToday = 0;
    let dueSoon = 0;
    let overdue = 0;

    let nextDeadline: { name: string; deadline: string } | null = null;

    for (const g of items) {
      const k = parseKind(g.name);
      byKind[k].count += 1;
      byKind[k].sum += g.targetCents || 0;

      if (g.deadline) {
        const d = daysDiffFromToday(g.deadline);
        if (d === 0) dueToday += 1;
        if (d > 0 && d <= 7) dueSoon += 1;
        if (d < 0) overdue += 1;

        if (!nextDeadline) nextDeadline = { name: g.name, deadline: g.deadline };
        else if (new Date(g.deadline).getTime() < new Date(nextDeadline.deadline).getTime()) {
          nextDeadline = { name: g.name, deadline: g.deadline };
        }
      }
    }

    return { byKind, dueToday, dueSoon, overdue, nextDeadline };
  }, [items]);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Visão geral</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">
              {loading ? "—" : stats.byKind.daily.count + stats.byKind.weekly.count + stats.byKind.monthly.count + stats.byKind.custom.count}
            </p>
            <p className="mt-1 text-sm text-zinc-600">metas cadastradas (filtradas: {filteredCount}).</p>
          </div>
          <Badge>{loading ? "Carregando" : "Atual"}</Badge>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <MiniStat label="Diárias" value={stats.byKind.daily.count} />
          <MiniStat label="Semanais" value={stats.byKind.weekly.count} />
          <MiniStat label="Mensais" value={stats.byKind.monthly.count} />
          <MiniStat label="Personalizadas" value={stats.byKind.custom.count} />
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Prazos</p>
        <div className="mt-4 grid grid-cols-3 gap-3">
          <PillStat label="Hoje" value={stats.dueToday} tone="teal" />
          <PillStat label="7 dias" value={stats.dueSoon} tone="zinc" />
          <PillStat label="Atrasadas" value={stats.overdue} tone="amber" />
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Próxima meta</p>
          {stats.nextDeadline ? (
            <p className="mt-1 text-sm text-zinc-600">
              {stats.nextDeadline.name} • <span className="font-semibold">{formatDateShort(stats.nextDeadline.deadline)}</span>
            </p>
          ) : (
            <p className="mt-1 text-sm text-zinc-600">Defina um prazo para enxergar prioridades do dia.</p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Totais por período</p>

        <div className="mt-4 space-y-3">
          <TotalRow label="Metas diárias" value={stats.byKind.daily.sum} />
          <TotalRow label="Metas semanais" value={stats.byKind.weekly.sum} />
          <TotalRow label="Metas mensais" value={stats.byKind.monthly.sum} />
          <TotalRow label="Personalizadas" value={stats.byKind.custom.sum} />
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Dica: se você trabalha por demanda, comece pelo alvo do dia (líquido) e ajuste semanalmente.
        </p>
      </Card>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{label}</p>
      <p className="mt-1 text-lg font-bold text-zinc-900">{value}</p>
    </div>
  );
}

function PillStat({
  label,
  value,
  tone
}: {
  label: string;
  value: number;
  tone: "teal" | "zinc" | "amber";
}) {
  const cls =
    tone === "teal"
      ? "border-teal-200/70 bg-teal-50/70 text-teal-700"
      : tone === "amber"
        ? "border-amber-200/70 bg-amber-50/70 text-amber-700"
        : "border-zinc-200/70 bg-white/70 text-zinc-700";

  return (
    <div className={["rounded-2xl border p-3", cls].join(" ")}
      aria-label={`${label}: ${value}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</p>
      <p className="mt-1 text-lg font-bold text-zinc-900">{value}</p>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
      <p className="text-sm font-semibold text-zinc-900">{label}</p>
      <p className="text-sm font-bold text-zinc-900">{formatCurrencyBRL(value)}</p>
    </div>
  );
}
