/* frontend/components/pages/dashboard/components/DashboardHero.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

export default function DashboardHero({
  userName,
  canWrite
}: {
  userName: string;
  canWrite: boolean;
}) {
  return (
    <Card className="border-zinc-200/70 bg-white/80 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Visão geral</p>
          <h1 className="mt-2 text-xl font-bold text-zinc-900 sm:text-2xl">Bem-vindo, {userName}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600">
            Este painel resume seu dinheiro real: entradas, saídas, metas e contas. Registre tudo (principalmente gastos de rua)
            para ter uma visão fiel do seu resultado.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge>Resumo 30 dias</Badge>
            <Badge>Metas e vencimentos</Badge>
            <Badge>{canWrite ? "Modo completo" : "Modo leitura"}</Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-teal-200/70 bg-teal-50/70 p-4 text-sm text-teal-800">
          <p className="font-semibold">Dica rápida</p>
          <p className="mt-1">
            Use <span className="font-semibold">Lançamentos</span> para registrar gasolina, taxas e manutenção.
            Isso deixa suas <span className="font-semibold">Metas</span> muito mais precisas.
          </p>
        </div>
      </div>
    </Card>
  );
}
