/* frontend/components/pages/billing/components/PlansSupportCard.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Badge from "../../../ui/Badge";

export default function PlansSupportCard({ variant }: { variant: "public" | "inApp" }) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Suporte</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Precisa de ajuda para ativar?</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Se o checkout falhar ou você tiver dúvidas sobre o plano certo, fale com a gente.
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>Resposta rápida</Badge>
            <Badge>{variant === "public" ? "Onboarding" : "Reativação"}</Badge>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link href="/suporte" className="inline-flex">
            <Button size="sm">Falar com suporte</Button>
          </Link>
          <Link href="/notificacoes" className="inline-flex">
            <Button size="sm" variant="secondary">
              Ver central
            </Button>
          </Link>
          <Link href="/dashboard" className="inline-flex">
            <Button size="sm" variant="ghost">
              Ir para o painel
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Problemas com cartão?</p>
          <p className="mt-1 text-sm text-zinc-600">
            Verifique limite, cartão habilitado para compras online e dados do titular.
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Plano não liberou recursos?</p>
          <p className="mt-1 text-sm text-zinc-600">
            Às vezes leva alguns minutos. Se continuar, acione o suporte e resolvemos rapidamente.
          </p>
        </div>
      </div>
    </Card>
  );
}
