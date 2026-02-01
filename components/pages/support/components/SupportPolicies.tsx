/* frontend/components/pages/support/components/SupportPolicies.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";

export default function SupportPolicies() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Políticas</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Privacidade e segurança</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Atendimento profissional com foco em proteção de dados. Envie apenas o necessário.
          </p>
        </div>
        <Badge>LGPD</Badge>
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">O que não enviar</p>
          <p className="mt-1 text-sm text-zinc-600">
            Senhas, códigos de verificação, dados completos de cartão ou informações sensíveis desnecessárias.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">O que ajuda muito</p>
          <p className="mt-1 text-sm text-zinc-600">
            Prints, valores e datas aproximadas, nome da tela e o passo a passo para reproduzir.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Conteúdo de ajuda</p>
          <p className="mt-1 text-sm text-zinc-600">
            Para páginas públicas de políticas e termos, acesse as páginas do site.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/privacidade" className="inline-flex">
              <Button size="sm" variant="secondary">
                Privacidade
              </Button>
            </Link>
            <Link href="/termos" className="inline-flex">
              <Button size="sm" variant="ghost">
                Termos
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        Se você suspeitar de acesso indevido, altere sua senha e nos avise imediatamente.
      </p>
    </Card>
  );
}
