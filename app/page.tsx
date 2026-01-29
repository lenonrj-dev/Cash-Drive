/* frontend/app/page.tsx */
import Link from "next/link";
import PublicShell from "../components/layout/PublicShell";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import { routes } from "../lib/routes";

export default function Page() {
  return (
    <PublicShell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Card className="p-8">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Mobile-first</Badge>
              <Badge>Modo claro/escuro</Badge>
              <Badge>15 dias gratis</Badge>
            </div>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-zinc-900">
              Controle seu dinheiro na rua, com um painel premium.
            </h1>
            <p className="mt-3 text-base text-zinc-600">
              Cash Drive e o painel financeiro para motoristas e entregadores: entradas, saidas,
              metas, contas e notificacoes — com modo leitura gratis e acoes liberadas com plano.
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Link href={routes.auth.cadastro}>
                <Button size="lg">Criar conta</Button>
              </Link>
              <Link href={routes.auth.login}>
                <Button size="lg" variant="secondary">
                  Entrar
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Voce pode visualizar o dashboard apos criar conta. Para registrar acoes, ative um plano.
            </p>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-zinc-900">O que voce controla</h2>
            <ul className="mt-4 space-y-3 text-sm text-zinc-600">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                Saldo, entradas e saidas por periodo
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                Metas com &quot;faltam R$ X&quot;
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                Contas com vencimento e status
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                Notificacoes e parabenizacoes
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                Assistente Cash (no app + WhatsApp)
              </li>
            </ul>

            <div className="mt-6">
              <Link href={routes.public.pricing}>
                <Button variant="secondary" className="w-full">
                  Ver planos
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </PublicShell>
  );
}
