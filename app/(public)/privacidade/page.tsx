/* frontend/app/(public)/privacidade/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Política de privacidade e uso de dados."
};

export default function Page() {
  return (
    <PublicShell>
      <PageHeader
        title="Política de Privacidade"
        subtitle="Transparência sobre dados, consentimento e uso de informações."
      />

      <Card className="mt-6">
        <div className="space-y-4 text-sm text-zinc-600">
          <div>
            <p className="text-sm font-semibold text-zinc-900">1) Dados coletados</p>
            <p>Cadastro (nome, e-mail) e, opcionalmente, telefone. Dados de uso do app para funcionamento.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">2) Finalidade</p>
            <p>Controle financeiro, autenticação, assinaturas e melhoria da experiência.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">3) WhatsApp e assistente</p>
            <p>Quando habilitado, haverá consentimento explícito e logs mínimos para auditoria e segurança.</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-zinc-900">4) Segurança</p>
            <p>Boas práticas de proteção: criptografia em trânsito (HTTPS) e controle de acesso.</p>
          </div>
        </div>
      </Card>
    </PublicShell>
  );
}
