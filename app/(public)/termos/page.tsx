/* frontend/app/(public)/termos/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos",
  description: "Termos de uso e regras do Cash Drive."
};

export default function Page() {
  return (
    <PublicShell>
      <PageHeader title="Termos de Uso" subtitle="Regras de uso do Cash Drive, trial, assinatura e responsabilidades." />

      <Card className="mt-6">
        <div className="space-y-4 text-sm text-zinc-600">
          <div>
            <p className="text-sm font-semibold text-zinc-900">1) Uso do servico</p>
            <p>O Cash Drive oferece funcionalidades de controle financeiro para uso pessoal.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">2) Trial e cobrança</p>
            <p>Ao iniciar o trial de 15 dias, o cartão e obrigatorio. A cobrança inicia após o período do trial.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">3) Acesso</p>
            <p>Sem plano ativo/trial, o app pode permanecer em modo leitura com ações bloqueadas.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">4) Limitacoes</p>
            <p>Recursos podem sofrer ajustes conforme evolucao do produto.</p>
          </div>
        </div>
      </Card>
    </PublicShell>
  );
}
