/* frontend/app/(public)/faq/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Duvidas frequentes sobre planos, modo leitura e seguranca."
};

export default function Page() {
  return (
    <PublicShell>
      <PageHeader title="FAQ" subtitle="Duvidas frequentes sobre planos, modo leitura, lancamentos e seguranca." />

      <div className="mt-6 grid grid-cols-1 gap-4">
        {[
          {
            title: "Posso usar sem pagar?",
            text: "Sim. Apos criar conta, voce pode visualizar o dashboard em modo leitura. Para registrar lancamentos, metas, contas e usar o assistente, e necessario ativar um plano."
          },
          {
            title: "Por que precisa de cartao no trial?",
            text: "Para iniciar o trial de 15 dias e automatizar a cobranca apos o periodo, quando aplicavel."
          },
          {
            title: "Me cobram no mesmo dia?",
            text: "Nao. A cobranca inicia somente apos o termino do trial (15 dias)."
          },
          {
            title: "Meus dados estao seguros?",
            text: "O projeto segue boas praticas: autenticacao segura, HTTPS, autorizacao por usuario e logs minimos."
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
