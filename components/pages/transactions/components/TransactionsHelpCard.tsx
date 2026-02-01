/* frontend/components/pages/transactions/components/TransactionsHelpCard.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

export default function TransactionsHelpCard() {
  return (
    <Card className="p-6" aria-label="Ajuda de lançamentos">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Ajuda</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Como registrar do jeito certo</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Lançamentos bem feitos deixam seu saldo real, facilitam metas e evitam "furo" no fim do mês.
          </p>
        </div>
        <Badge>Guia rápido</Badge>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Entradas</p>
          <p className="mt-1 text-sm text-zinc-600">
            Ganhos de app, pix de cliente, bônus e repasses. Use descrições curtas para achar depois.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li className="flex gap-2"><Dot /> <span>"iFood repasse"</span></li>
            <li className="flex gap-2"><Dot /> <span>"Pix cliente"</span></li>
            <li className="flex gap-2"><Dot /> <span>"Bônus semana"</span></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Saídas</p>
          <p className="mt-1 text-sm text-zinc-600">
            Combustível, manutenção, taxas do app, alimentação e despesas da moto.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li className="flex gap-2"><Dot /> <span>"Gasolina"</span></li>
            <li className="flex gap-2"><Dot /> <span>"Troca óleo"</span></li>
            <li className="flex gap-2"><Dot /> <span>"Taxas"</span></li>
          </ul>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Padrão que facilita</p>
          <p className="mt-1 text-sm text-zinc-600">
            Use "Categoria" para agrupar e "Descrição" para o detalhe. Ex.: Categoria = Combustível; Descrição = Gasolina.
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-700">
            <li className="flex gap-2"><Dot /> <span>Controle de custos por tipo</span></li>
            <li className="flex gap-2"><Dot /> <span>Busca mais rápida</span></li>
            <li className="flex gap-2"><Dot /> <span>Metas mais reais</span></li>
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-teal-200/70 bg-teal-50/80 p-4">
        <p className="text-sm font-semibold text-teal-800">Dica premium</p>
        <p className="mt-1 text-sm text-teal-800/90">
          Registre seus custos do dia (combustível + taxa + alimentação) antes de encerrar. Isso melhora o controle do seu lucro real.
        </p>
      </div>
    </Card>
  );
}

function Dot() {
  return <span className="mt-2 inline-block h-2 w-2 rounded-full bg-teal-500" />;
}
