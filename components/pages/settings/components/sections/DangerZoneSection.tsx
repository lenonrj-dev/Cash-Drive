/* frontend/components/pages/settings/sections/DangerZoneSection.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../../ui/Card";
import Button from "../../../../ui/Button";
import Badge from "../../../../ui/Badge";
import SectionTitle from "../../components/SectionTitle";
import type { Notice } from "../../SettingsView";

type NoticeType = NonNullable<Notice>["type"];

export default function DangerZoneSection({
  onToast
}: {
  onToast: (type: NoticeType, message: string) => void;
}) {
  return (
    <section id="risco" className="scroll-mt-24">
      <Card>
        <SectionTitle
          kicker="Atenção"
          title="Zona de risco"
          description="Ações avançadas que podem afetar seus dados."
          right={<Badge>Requer confirmação</Badge>}
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-rose-200/70 bg-rose-50/60 p-4">
            <p className="text-sm font-semibold text-zinc-900">Excluir dados financeiros</p>
            <p className="mt-1 text-sm text-zinc-700">
              Remove lançamentos, metas e contas. Recomendado apenas em caso de recomeço.
            </p>
            <div className="mt-3">
              <Button disabled variant="secondary" size="sm" aria-label="Excluir dados financeiros">
                Excluir dados (em breve)
              </Button>
            </div>
            <p className="mt-3 text-xs text-zinc-700">Recurso avançado (Fase 2) com confirmação.</p>
          </div>

          <div className="rounded-2xl border border-rose-200/70 bg-rose-50/60 p-4">
            <p className="text-sm font-semibold text-zinc-900">Encerrar conta</p>
            <p className="mt-1 text-sm text-zinc-700">
              Desativa o acesso e inicia o processo de remoção de dados conforme política.
            </p>
            <div className="mt-3">
              <Button disabled variant="secondary" size="sm" aria-label="Encerrar conta">
                Encerrar conta (em breve)
              </Button>
            </div>
            <p className="mt-3 text-xs text-zinc-700">Para segurança, isso fica disponível com suporte.</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Precisa de ajuda?</p>
              <p className="mt-1 text-sm text-zinc-600">
                Se algo estiver fora do normal, fale com o suporte para uma revisão do painel.
              </p>
            </div>
            <Link href="/suporte" className="inline-flex">
              <Button size="sm">Falar com suporte</Button>
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToast("info", "Suporte acionado (modo demo).")}
              aria-label="Acionar suporte"
            >
              Abrir ticket
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
