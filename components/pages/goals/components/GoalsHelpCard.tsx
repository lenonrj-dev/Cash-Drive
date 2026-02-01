/* frontend/components/pages/goals/components/GoalsHelpCard.tsx */
"use client";

import Link from "next/link";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";

export default function GoalsHelpCard() {
  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Guia rápido</p>
          <h3 className="mt-2 text-base font-bold text-zinc-900">Metas práticas para a rotina de motoboy</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Você não precisa de planilha gigante: defina um alvo simples, revise no fim do dia e conecte suas despesas
            para enxergar o resultado real.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Badge>Alvo do dia</Badge>
            <Badge>Alvo líquido</Badge>
            <Badge>Revisão rápida</Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/lancamentos" className="inline-flex">
            <Button size="sm" variant="secondary">
              Registrar ganhos
            </Button>
          </Link>
          <Link href="/contas" className="inline-flex">
            <Button size="sm" variant="secondary">
              Ver contas
            </Button>
          </Link>
          <Link href="/moto" className="inline-flex">
            <Button size="sm" variant="ghost">
              Controle da moto
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-3">
        <Step
          title="1) Comece com meta do dia"
          desc="Defina um valor alcançável. Se estiver em dia de baixa demanda, reduza o alvo e foque no líquido."
        />
        <Step
          title="2) Pense no líquido (não só no bruto)"
          desc="Combustível, taxas e manutenção mudam seu resultado. Anote despesas para não se enganar." 
        />
        <Step
          title="3) Revise no fim do dia"
          desc="Olhe o que funcionou e ajuste a meta semanal. A rua muda: seu plano também." 
        />
      </div>

      <div className="mt-5 rounded-2xl border border-zinc-200/70 bg-white/70 p-5">
        <p className="text-sm font-semibold text-zinc-900">Sugestão de uso (5 minutos)</p>
        <ol className="mt-2 list-decimal space-y-2 pl-5 text-sm text-zinc-700">
          <li>Crie uma <span className="font-semibold">Meta do dia</span> com prazo para hoje.</li>
          <li>Registre ganhos e gastos principais (combustível, alimentação, taxas).</li>
          <li>Se necessário, edite a meta no meio do dia para manter o foco.</li>
          <li>No final, revise e crie/ajuste uma <span className="font-semibold">Meta da semana</span>.</li>
        </ol>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link href="/suporte" className="inline-flex">
            <Button size="sm">Falar com suporte</Button>
          </Link>
          <Link href="/notificacoes" className="inline-flex">
            <Button size="sm" variant="ghost">
              Ver avisos
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
      <p className="text-sm font-semibold text-zinc-900">{title}</p>
      <p className="mt-1 text-sm text-zinc-600">{desc}</p>
    </div>
  );
}
