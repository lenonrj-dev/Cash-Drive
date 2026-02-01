/* frontend/components/pages/billing/components/PlansComparison.tsx */
"use client";

import React, { useMemo } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import type { PlanDisplay } from "../planPricing";

export default function PlansComparison({ plans }: { plans: PlanDisplay[] }) {
  const rows = useMemo(() => {
    const set = new Set<string>();
    for (const p of plans) {
      for (const b of p.benefits || []) set.add(b);
    }
    return Array.from(set);
  }, [plans]);

  if (!plans.length) return null;

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Comparação</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">O que muda entre os planos</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Veja rapidamente quais recursos cada plano libera no painel.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Transparente</Badge>
          <Badge>Sem letras miúdas</Badge>
        </div>
      </div>

      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-200/70 bg-white">
        <table className="min-w-[720px] w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-zinc-700">Recurso</th>
              {plans.map((p) => (
                <th key={p.id} className="px-4 py-3 text-left font-semibold text-zinc-700">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-900">{p.name}</span>
                    {p.highlight ? <Badge className="border-transparent bg-teal-600 text-white">Recomendado</Badge> : null}
                  </div>
                  <span className="mt-1 block text-xs font-medium text-zinc-500">{p.displayPriceLabel}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r} className="border-t border-zinc-200/70">
                <td className="px-4 py-3 font-medium text-zinc-800">{r}</td>
                {plans.map((p) => (
                  <td key={`${p.id}_${r}`} className="px-4 py-3">
                    {p.benefits?.includes(r) ? (
                      <span className="inline-flex items-center gap-2 text-teal-700">
                        <CheckIcon />
                        <span className="font-semibold">Inclui</span>
                      </span>
                    ) : (
                      <span className="text-zinc-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        Observação: alguns recursos podem ser liberados por fase conforme o plano e evolução do produto.
      </p>
    </Card>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
