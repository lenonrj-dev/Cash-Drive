/* frontend/components/pages/bills/components/BillsToolbar.tsx */
"use client";

import Link from "next/link";
import Button from "../../../ui/Button";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

export default function BillsToolbar({
  onOpenNew,
  canWrite,
  onToggleHelp,
  helpOpen
}: {
  onOpenNew: () => void;
  canWrite: boolean;
  onToggleHelp: () => void;
  helpOpen: boolean;
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Contas</p>
          <h1 className="mt-2 text-xl font-bold text-zinc-900">Controle de vencimentos</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Cadastre contas do mês (fixas ou pontuais), acompanhe vencimentos e compare com suas entradas para
            manter o saldo sempre sob controle.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>Agenda financeira</Badge>
            <Badge>Recorrência</Badge>
            <Badge>Status</Badge>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button type="button" variant="secondary" onClick={onToggleHelp} aria-label="Abrir guia rápido">
            {helpOpen ? "Ocultar guia" : "Guia rápido"}
          </Button>

          <Link href="/suporte" className="inline-flex" aria-label="Abrir suporte">
            <Button type="button" variant="ghost">
              Ajuda
            </Button>
          </Link>

          <Button type="button" disabled={!canWrite} onClick={onOpenNew} aria-label="Adicionar conta">
            Adicionar conta
          </Button>
        </div>
      </div>

      {!canWrite ? (
        <div className="mt-4 rounded-2xl border border-amber-200/60 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">Modo leitura</p>
          <p className="mt-1 text-sm text-amber-800">
            Seu plano ainda não permite editar. Você pode visualizar, mas para adicionar/editar contas, ative um plano.
          </p>
        </div>
      ) : null}
    </Card>
  );
}
