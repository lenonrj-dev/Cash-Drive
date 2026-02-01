/* frontend/app/(public)/faq/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Dúvidas frequentes sobre planos, modo leitura e segurança."
};

export default function Page() {
  return (
    <PublicShell>
      <PageHeader title="FAQ" subtitle="Dúvidas frequentes sobre planos, modo leitura, lançamentos e segurança." />

      <div className="mt-6 grid grid-cols-1 gap-4">
        {[
          {
            title: "Posso usar sem pagar?",
            text: "Sim. Após criar conta, você pode visualizar o painel em modo leitura. Para registrar lançamentos, metas, contas e usar o assistente, é necessário ativar um plano."
          },
          {
            title: "Por que precisa de cartão no trial?",
            text: "Para iniciar o trial de 15 dias e automatizar a cobrança após o período, quando aplicável."
          },
          {
            title: "Me cobram no mesmo dia?",
            text: "Não. A cobrança inicia somente após o término do trial (15 dias)."
          },
          {
            title: "Meus dados estão seguros?",
            text: "O projeto segue boas práticas: autenticação segura, HTTPS, autorização por usuário e logs mínimos."
          }
        ].map((item) => (
          <Card key={item.title}>
            <p className="text-sm font-semibold text-zinc-900">{item.title}</p>
            <p className="mt-1 text-sm text-zinc-600">{item.text}</p>
          </Card>
        ))}
      </div>
    </PublicShell>
  );
}
