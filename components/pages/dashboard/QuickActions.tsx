/* frontend/components/pages/dashboard/QuickActions.tsx */
import Link from "next/link";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { routes } from "../../../lib/routes";

export default function QuickActions({ canWrite }: { canWrite: boolean }) {
  return (
    <Card className="h-full" aria-label="Ações rápidas">
      <h2 className="text-sm font-semibold text-zinc-900">Ações rápidas</h2>
      <p className="mt-1 text-sm text-zinc-600">
        {canWrite ? "Registre movimentações em segundos." : "Ações desabilitadas no modo leitura."}
      </p>

      <div className="mt-5 space-y-2">
        <Link href={routes.app.lancamentos} className="block">
          <Button className="w-full" disabled={!canWrite}>
            Novo lançamento
          </Button>
        </Link>
        <Link href={routes.app.metas} className="block">
          <Button className="w-full" variant="secondary" disabled={!canWrite}>
            Criar meta
          </Button>
        </Link>
        <Link href={routes.app.contas} className="block">
          <Button className="w-full" variant="secondary" disabled={!canWrite}>
            Adicionar conta
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Link href={(routes as any)?.app?.moto ?? "/moto"} className="block">
            <Button className="w-full" variant="ghost">
              Moto
            </Button>
          </Link>
          <Link href={(routes as any)?.app?.suporte ?? "/suporte"} className="block">
            <Button className="w-full" variant="ghost">
              Suporte
            </Button>
          </Link>
        </div>

        {!canWrite ? (
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3 text-xs text-zinc-600">
            Para desbloquear, ative um plano em <span className="font-semibold">Planos</span>.
          </div>
        ) : null}
      </div>
    </Card>
  );
}
