/* frontend/components/pages/moto/components/MotoHeader.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

export default function MotoHeader() {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Sessão</p>
          <h2 className="mt-2 text-xl font-bold text-zinc-900">Moto</h2>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Controle diário de quilometragem, abastecimentos e consumo real vs. consumo esperado. Ideal para motoboys e rotinas de entrega que precisam
            entender custos e saúde da moto.
          </p>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Dica: os alertas de troca de óleo variam por modelo e tipo de uso — use como referência e sempre confira o manual.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge>Consumo</Badge>
          <Badge>Manutenção</Badge>
          <Badge>Histórico</Badge>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">O que você registra</p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">Km + abastecimentos</p>
          <p className="mt-1 text-sm text-zinc-600">Km inicial/final e litros colocados no dia.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">O que você vê</p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">Real vs. esperado</p>
          <p className="mt-1 text-sm text-zinc-600">Economia, gasto acima do normal e custo estimado.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">O que você previne</p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">Troca de óleo</p>
          <p className="mt-1 text-sm text-zinc-600">Avisos em 5k (leve), 7k (moderado) e 10k (crítico).</p>
        </div>
      </div>
    </Card>
  );
}
