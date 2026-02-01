/* frontend/components/pages/billing/components/PlansFAQ.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

export default function PlansFAQ() {
  const items = [
    {
      q: "Como funciona o teste grátis?",
      a: "Você ativa um plano e usa por 15 dias. O acesso libera recursos do painel para você testar no dia a dia."
    },
    {
      q: "O cartão é cobrado no início?",
      a: "O cartão é solicitado para iniciar o trial e validar a assinatura. A cobrança segue as regras do seu plano e do ciclo definido no checkout."
    },
    {
      q: "Posso cancelar quando quiser?",
      a: "Sim. Você pode cancelar a qualquer momento. Mesmo sem plano ativo, você continua podendo visualizar seus dados no painel."
    },
    {
      q: "O que libera quando o plano fica ativo?",
      a: "Ações do painel como execução de notificações, metas, contas, automações e recursos premium que exigem plano ativo."
    },
    {
      q: "E se eu precisar de ajuda na ativação?",
      a: "Fale com o suporte e informe o e-mail/usuário do painel. Nós acompanhamos o status e orientamos o melhor caminho."
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Dúvidas</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Perguntas frequentes</h2>
          <p className="mt-1 text-sm text-zinc-600">Respostas rápidas para você ativar com confiança.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Transparente</Badge>
          <Badge>Sem enrolação</Badge>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <details
            key={it.q}
            className="group rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-zinc-900 focus:outline-none">
              <span className="min-w-0">{it.q}</span>
              <span className="shrink-0 text-zinc-400 transition group-open:rotate-180">
                <ChevronIcon />
              </span>
            </summary>
            <p className="mt-3 text-sm text-zinc-600">{it.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        Dica: se você estiver no app, confira também o card de status da assinatura para ver o que está ativo.
      </p>
    </Card>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
