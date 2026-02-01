/* frontend/components/pages/bills/components/BillsHelpCard.tsx */
"use client";

import Link from "next/link";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Badge from "../../../ui/Badge";

export default function BillsHelpCard() {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Guia rápido</p>
          <h2 className="mt-2 text-lg font-bold text-zinc-900">Como usar a sessão de Contas</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Esta área foi feita para você prever o mês: registre contas pendentes (fixas e variáveis), acompanhe
            vencimentos e compare com suas entradas.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>Previsão</Badge>
            <Badge>Controle</Badge>
            <Badge>Metas</Badge>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Link href="/suporte" className="inline-flex" aria-label="Abrir suporte">
            <Button variant="secondary">Falar com suporte</Button>
          </Link>
          <Link href="/metas" className="inline-flex" aria-label="Abrir metas">
            <Button variant="ghost">Ver metas</Button>
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <TipCard
          title="1) Cadastre contas do mês"
          text="Adicione aluguel, internet, cartão, boletos e qualquer vencimento importante. Se for mensal, marque como recorrente."
        />
        <TipCard
          title="2) Priorize vencimentos"
          text="Use os filtros para ver 'vencendo em 7 dias' e trate atrasos primeiro. Isso evita juros e melhora seu saldo real."
        />
        <TipCard
          title="3) Marque como paga"
          text="Quando quitar, mude o status para 'Paga'. Assim você enxerga o que falta e evita duplicidade na previsão."
        />
      </div>

      <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
        <p className="text-sm font-semibold text-zinc-900">Dica de uso</p>
        <p className="mt-1 text-sm text-zinc-600">
          Se você usa esta sessão junto com Lançamentos e Metas, consegue ter uma leitura mais fiel do seu mês:
          entradas - contas pendentes = margem para metas.
        </p>
      </div>
    </Card>
  );
}

function TipCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 text-sm text-zinc-600">{text}</p>
    </div>
  );
}
