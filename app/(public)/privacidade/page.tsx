/* frontend/app/(public)/privacidade/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Politica de privacidade e uso de dados."
};

export default function Page() {
  return (
    <PublicShell>
      <PageHeader
        title="Politica de Privacidade"
        subtitle="Transparencia sobre dados, consentimento e uso de informacoes."
      />

      <Card className="mt-6">
        <div className="space-y-4 text-sm text-zinc-600">
          <div>
            <p className="text-sm font-semibold text-zinc-900">1) Dados coletados</p>
            <p>Cadastro (nome, email) e, opcionalmente, telefone. Dados de uso do app para funcionamento.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">2) Finalidade</p>
            <p>Controle financeiro, autenticacao, assinaturas e melhoria da experiencia.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">3) WhatsApp e assistente</p>
            <p>Quando habilitado, havera consentimento explicito e logs minimos para auditoria e seguranca.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">4) Seguranca</p>
            <p>Boas praticas de protecao: criptografia em transito (HTTPS) e controle de acesso.</p>
          </div>
        </div>
      </Card>
    </PublicShell>
  );
}
