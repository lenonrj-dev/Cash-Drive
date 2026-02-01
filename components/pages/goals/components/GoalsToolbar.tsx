/* frontend/components/pages/goals/components/GoalsToolbar.tsx */
"use client";

import Link from "next/link";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Badge from "../../../ui/Badge";

export default function GoalsToolbar({
  canWrite,
  onOpenDaily,
  onOpenWeekly,
  onOpenMonthly,
  onOpenCustom,
  onToggleHelp,
  helpOpen
}: {
  canWrite: boolean;
  onOpenDaily: () => void;
  onOpenWeekly: () => void;
  onOpenMonthly: () => void;
  onOpenCustom: () => void;
  onToggleHelp: () => void;
  helpOpen: boolean;
}) {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Metas</p>
          <h2 className="mt-2 text-lg font-bold text-zinc-900">Metas de rua (dia, semana e mês)</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Planeje o quanto você quer fechar por período. Para motoboy, a rotina muda rápido — por isso,
            as metas aqui são simples, diretas e fáceis de ajustar.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>Diária</Badge>
            <Badge>Semanal</Badge>
            <Badge>Mensal</Badge>
            <button
              type="button"
              onClick={onToggleHelp}
              className={[
                "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-teal-200",
                helpOpen
                  ? "border-teal-200 bg-teal-50 text-teal-700"
                  : "border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50"
              ].join(" ")}
              aria-label={helpOpen ? "Fechar guia" : "Abrir guia"}
              aria-pressed={helpOpen}
            >
              <InfoIcon />
              {helpOpen ? "Fechar guia" : "Guia do motoboy"}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-end">
          <div className="flex flex-wrap items-center gap-2">
            <Button disabled={!canWrite} variant="secondary" onClick={onOpenDaily}>
              Meta do dia
            </Button>
            <Button disabled={!canWrite} variant="secondary" onClick={onOpenWeekly}>
              Meta da semana
            </Button>
            <Button disabled={!canWrite} variant="secondary" onClick={onOpenMonthly}>
              Meta do mês
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button disabled={!canWrite} onClick={onOpenCustom}>
              Criar meta
            </Button>
            <Link href="/suporte" className="inline-flex">
              <Button variant="ghost" size="sm">
                Ajuda
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <QuickHint
          title="Meta líquida (recomendado)"
          desc="Pense no que sobra após combustível, taxas e manutenção. Meta alta sem custo vira frustração."
        />
        <QuickHint
          title="Ajuste no meio do dia"
          desc="Se a rua mudou (chuva, baixa demanda), edite a meta e recalcule o que falta."
        />
        <QuickHint
          title="Compare com contas"
          desc="Use Contas para ver vencimentos e alinhar metas com o que precisa pagar no mês."
        />
      </div>
    </Card>
  );
}

function QuickHint({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 text-sm text-zinc-600">{desc}</p>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
