/* frontend/components/pages/common/PaywallCard.tsx */
import Link from "next/link";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { routes } from "../../../lib/routes";

export default function PaywallCard({ title }: { title?: string }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Modo leitura</p>
          <h1 className="mt-2 text-2xl font-bold text-zinc-900">
            {title || "Recurso indisponível"}
          </h1>
          <p className="mt-2 text-sm text-zinc-600">
            Você está em modo leitura. Para registrar lançamentos, metas, contas e usar o assistente,
            ative um plano com trial de 15 dias.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Link href={routes.app.planos}>
            <Button>Ativar plano</Button>
          </Link>
          <Link href={routes.app.dashboard}>
            <Button variant="secondary">Voltar ao painel</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
