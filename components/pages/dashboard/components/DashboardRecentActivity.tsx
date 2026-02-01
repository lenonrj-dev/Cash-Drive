/* frontend/components/pages/dashboard/components/DashboardRecentActivity.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import { routes } from "../../../../lib/routes";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

type Item = {
  id: string;
  type: "INCOME" | "EXPENSE";
  amountCents: number;
  date: string;
  note?: string | null;
  category?: string | null;
};

export default function DashboardRecentActivity({
  loading,
  items
}: {
  loading: boolean;
  items: Item[];
}) {
  return (
    <Card className="p-6" aria-label="Atividade recente">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Atividade</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Últimos lançamentos</h2>
          <p className="mt-1 text-sm text-zinc-600">Um recorte rápido do que entrou e do que saiu.</p>
        </div>
        <Badge>{loading ? "…" : items.length}</Badge>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/70">
        <div className="grid grid-cols-12 bg-zinc-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          <div className="col-span-3">Tipo</div>
          <div className="col-span-5">Descrição</div>
          <div className="col-span-2 text-right">Valor</div>
          <div className="col-span-2 text-right">Data</div>
        </div>

        {loading ? (
          <div className="px-4 py-6 text-sm text-zinc-600">Carregando atividade...</div>
        ) : items.length === 0 ? (
          <div className="px-4 py-6 text-sm text-zinc-600">Sem lançamentos recentes.</div>
        ) : (
          <div className="divide-y divide-zinc-200/70">
            {items.slice(0, 6).map((r) => (
              <div key={r.id} className="grid grid-cols-12 items-center px-4 py-3 text-sm">
                <div className="col-span-3">
                  <span
                    className={[
                      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                      r.type === "INCOME" ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-800"
                    ].join(" ")}
                  >
                    {r.type === "INCOME" ? "Entrada" : "Saída"}
                  </span>
                </div>
                <div className="col-span-5 min-w-0">
                  <p className="truncate font-semibold text-zinc-900">{r.note || r.category || "-"}</p>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">{r.category ? `Categoria: ${r.category}` : "Sem categoria"}</p>
                </div>
                <div className="col-span-2 text-right font-semibold text-zinc-900">{formatCurrencyBRL(r.amountCents)}</div>
                <div className="col-span-2 text-right text-zinc-500">{formatDateShort(r.date)}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link href={routes.app.lancamentos} className="sm:flex-1">
          <Button className="w-full" variant="secondary">
            Abrir lançamentos
          </Button>
        </Link>
        <Link href={routes.app.lancamentos} className="sm:flex-1">
          <Button className="w-full" variant="ghost">
            Criar novo
          </Button>
        </Link>
      </div>
    </Card>
  );
}
