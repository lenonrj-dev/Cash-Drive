/* frontend/components/pages/dashboard/QuickActions.tsx */
import Link from "next/link";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { routes } from "../../../lib/routes";

export default function QuickActions({ canWrite }: { canWrite: boolean }) {
  return (
    <Card className="h-full">
      <h2 className="text-sm font-semibold text-zinc-900">Acoes rapidas</h2>
      <p className="mt-1 text-sm text-zinc-600">
        {canWrite ? "Registre movimentacoes em segundos." : "Acoes desabilitadas no modo leitura."}
      </p>

      <div className="mt-5 space-y-2">
        <Link href={routes.app.lancamentos} className="block">
          <Button className="w-full" disabled={!canWrite}>
            Novo lancamento
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

        {!canWrite ? (
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3 text-xs text-zinc-600">
            Para desbloquear, ative um plano em <span className="font-semibold">Planos</span>.
          </div>
        ) : null}
      </div>
    </Card>
  );
}
