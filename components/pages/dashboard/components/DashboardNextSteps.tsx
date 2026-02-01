/* frontend/components/pages/dashboard/components/DashboardNextSteps.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Badge from "../../../ui/Badge";
import { routes } from "../../../../lib/routes";
import { formatCurrencyBRL } from "../../../../lib/format";

export default function DashboardNextSteps({
  canWrite,
  loading,
  summary
}: {
  canWrite: boolean;
  loading: boolean;
  summary: {
    goalsMissing: number;
    billsMissing: number;
  };
}) {
  return (
    <Card className="h-full p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Plano de ação</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Próximos passos</h2>
          <p className="mt-1 text-sm text-zinc-600">Atalhos inteligentes para manter tudo em dia.</p>
        </div>
        <Badge>{canWrite ? "Ativo" : "Leitura"}</Badge>
      </div>

      <div className="mt-4 space-y-2">
        <Link href={routes.app.lancamentos} className="block">
          <Button className="w-full" disabled={!canWrite}>
            Registrar lançamento rápido
          </Button>
        </Link>
        <Link href={routes.app.metas} className="block">
          <Button className="w-full" variant="secondary" disabled={!canWrite}>
            Ajustar metas do período
          </Button>
        </Link>
        <Link href={routes.app.contas} className="block">
          <Button className="w-full" variant="secondary" disabled={!canWrite}>
            Organizar vencimentos
          </Button>
        </Link>
      </div>

      <div className="mt-4 grid gap-3">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-xs font-semibold text-zinc-500">Meta pendente</p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">
            {loading ? "Carregando..." : `Faltam ${formatCurrencyBRL(summary?.goalsMissing ?? 0)}`}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Use metas diária/semanal para ganhar ritmo.</p>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-xs font-semibold text-zinc-500">Contas pendentes</p>
          <p className="mt-2 text-sm font-semibold text-zinc-900">
            {loading ? "Carregando..." : `Faltam ${formatCurrencyBRL(summary?.billsMissing ?? 0)}`}
          </p>
          <p className="mt-1 text-xs text-zinc-500">Revise vencimentos antes de fechar a semana.</p>
        </div>
      </div>

      {!canWrite ? (
        <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-xs text-zinc-600">
          Para desbloquear ações, ative um plano em <span className="font-semibold">Planos</span>.
        </div>
      ) : null}

      <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-zinc-50 p-4">
        <p className="text-sm font-semibold text-zinc-900">Precisa de ajuda?</p>
        <p className="mt-1 text-sm text-zinc-600">Abra um chamado e acompanhe tudo pela central.</p>
        <div className="mt-3">
          <Link href={(routes as any)?.app?.suporte ?? "/suporte"}>
            <Button size="sm" variant="ghost" className="w-full">Ir para suporte</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
