/* frontend/components/pages/support/components/SupportHero.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import { SUPPORT_RESPONSE_SLA } from "../supportData";

export default function SupportHero({ firstName }: { firstName: string }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Central</p>
          <h1 className="mt-2 text-xl font-bold text-zinc-900">Suporte</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Olá, {firstName}. Envie uma mensagem, escolha o assunto e acompanhe o protocolo. Vamos te ajudar a manter o
            controle financeiro do painel sempre em dia.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge>{SUPPORT_RESPONSE_SLA.primary}</Badge>
            <Badge>{SUPPORT_RESPONSE_SLA.secondary}</Badge>
            <Badge>Atendimento profissional</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/dashboard" className="inline-flex">
            <Button size="sm" variant="secondary">
              Voltar ao painel
            </Button>
          </Link>
          <Link href="/planos" className="inline-flex">
            <Button size="sm">Ver planos</Button>
          </Link>
          <Link href="/notificacoes" className="inline-flex">
            <Button size="sm" variant="ghost">
              Central de alertas
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Resolução mais rápida</p>
          <p className="mt-1 text-sm text-zinc-600">Envie prints e descreva a etapa exata onde travou.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Acompanhamento</p>
          <p className="mt-1 text-sm text-zinc-600">Toda mensagem gera um protocolo para rastrear seu atendimento.</p>
        </div>
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Segurança</p>
          <p className="mt-1 text-sm text-zinc-600">Nunca compartilhe senhas. Solicite orientação com dados mínimos.</p>
        </div>
      </div>
    </Card>
  );
}
