/* frontend/app/(public)/faq/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Rota Fin",
  description: "Dúvidas frequentes sobre planos, modo de visualização, segurança, dados e cancelamento na Rota Fin.",
  robots: { index: true, follow: true }
};

const SUPPORT_EMAIL = "suporte@rotafin.com";

type FaqItem = {
  q: string;
  a: string;
  category: "Planos" | "Conta" | "Dados" | "Segurança" | "Privacidade" | "Assistente";
};

const FAQ: FaqItem[] = [
  {
    category: "Planos",
    q: "Posso usar a Rota Fin sem pagar?",
    a: "Sim. Você pode acessar a dashboard em modo de visualização. Para salvar lançamentos, metas, contas e usar recursos premium, é necessário ativar um plano (Básico ou Pro)."
  },
  {
    category: "Planos",
    q: "Qual a diferença entre os planos Básico e Pro?",
    a: "Os planos variam por recursos e limites liberados dentro da dashboard. Os detalhes de cada plano (Básico/Pro) e as condições mensal/anual ficam sempre disponíveis na página de planos e no fluxo de assinatura."
  },
  {
    category: "Planos",
    q: "Preciso cadastrar cartão para usar o modo de visualização?",
    a: "Não. O modo de visualização serve para conhecer a experiência da Rota Fin. Para assinar um plano, o pagamento é processado no checkout." 
  },
  {
    category: "Planos",
    q: "Como funciona o cancelamento da assinatura?",
    a: "Você pode cancelar a qualquer momento. O cancelamento é processado de forma imediata pelo provedor de pagamento (Stripe), de acordo com o status da sua assinatura."
  },
  {
    category: "Planos",
    q: "A Rota Fin oferece reembolso?",
    a: "Não oferecemos reembolso de valores já cobrados, salvo quando exigido por lei. Antes de contratar, recomendamos usar o modo de visualização e revisar os detalhes do plano escolhido."
  },
  {
    category: "Conta",
    q: "Quais dados eu preciso para criar uma conta?",
    a: "Solicitamos nome, e-mail, telefone (quando informado) e senha. Sua senha é armazenada de forma protegida (hash) e não é salva em texto puro."
  },
  {
    category: "Conta",
    q: "Qual é a idade mínima para usar a Rota Fin?",
    a: "A Rota Fin não é direcionada a menores. O uso é destinado a pessoas com 19 anos ou mais, ou legalmente emancipadas, conforme permitido pela legislação aplicável."
  },
  {
    category: "Dados",
    q: "Que tipo de informação posso registrar na dashboard?",
    a: "Você pode registrar contas, metas e lançamentos financeiros, além de informações de manutenção de moto (por exemplo, troca de óleo e registros relacionados)."
  },
  {
    category: "Dados",
    q: "Posso lançar informações que envolvam terceiros?",
    a: "A Rota Fin é uma ferramenta de organização pessoal. Se você registrar dados que se relacionem a terceiros, você é responsável por garantir que possui autorização e base legal adequadas. Não temos como verificar se o nome do cadastro corresponde ao usuário real."
  },
  {
    category: "Dados",
    q: "Por quanto tempo meus dados ficam guardados?",
    a: "Você pode apagar informações que salvou (quando disponível) e solicitar exclusão da conta. Além disso, aplicamos uma política interna de retenção: dados de metas e registros associados podem ser mantidos por até 6 meses e, após esse prazo, podem ser eliminados ou anonimizados, conforme aplicável."
  },
  {
    category: "Segurança",
    q: "Meus dados estão seguros?",
    a: "Adotamos boas práticas de segurança, como HTTPS (criptografia em trânsito), senhas com hash (ex.: bcrypt), controle de acesso e monitoramento de eventos. Ainda assim, nenhum sistema é totalmente livre de riscos."
  },
  {
    category: "Privacidade",
    q: "Vocês usam cookies e rastreamento?",
    a: "Utilizamos cookies essenciais, de analytics e de anúncios (ads) para operar o site, medir desempenho e apoiar campanhas. Você pode gerenciar preferências no seu navegador e, quando aplicável, por meio de banner/central de cookies."
  },
  {
    category: "Privacidade",
    q: "Vocês coletam geolocalização ou dados sensíveis?",
    a: "Não. Não coletamos geolocalização e não tratamos dados sensíveis de forma intencional."
  },
  {
    category: "Assistente",
    q: "Como funciona o assistente da Rota Fin?",
    a: "O assistente processa apenas as informações que você compartilha na conversa, para ajudar com dúvidas ou cálculos. Recomendamos não inserir dados desnecessários e sempre revisar os resultados."
  },
  {
    category: "Assistente",
    q: "O que fazer se eu encontrar um problema ou suspeitar de fraude?",
    a: "Entre em contato pelo suporte o quanto antes para investigação e orientação. Podemos aplicar medidas como bloqueios e validações adicionais para proteger sua conta e a plataforma."
  }
];

const CATEGORY_ORDER: Array<FaqItem["category"]> = ["Planos", "Conta", "Dados", "Segurança", "Privacidade", "Assistente"];

function groupByCategory(items: FaqItem[]) {
  const map = new Map<FaqItem["category"], FaqItem[]>();
  items.forEach((it) => {
    const arr = map.get(it.category) ?? [];
    arr.push(it);
    map.set(it.category, arr);
  });
  return map;
}

export default function Page() {
  const grouped = groupByCategory(FAQ);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a
      }
    }))
  };

  return (
    <PublicShell>
      <PageHeader
        title="FAQ"
        subtitle="Respostas rápidas sobre planos, modo de visualização, dados, segurança e cancelamento na Rota Fin."
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mt-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <p className="text-sm font-semibold text-zinc-900">Modo de visualização</p>
            <p className="mt-1 text-sm text-zinc-600">
              Conheça a experiência da dashboard. Para salvar dados e liberar recursos premium, ative um plano.
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold text-zinc-900">Cancelamento</p>
            <p className="mt-1 text-sm text-zinc-600">
              Você pode cancelar a assinatura a qualquer momento. O cancelamento é processado imediatamente no provedor
              de pagamento.
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm font-semibold text-zinc-900">Segurança</p>
            <p className="mt-1 text-sm text-zinc-600">
              Usamos HTTPS, hash de senha e controles de acesso. Se notar algo suspeito, fale com o suporte.
            </p>
          </Card>
        </div>

        <Card className="p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Perguntas frequentes</p>
              <p className="mt-1 text-sm text-zinc-600">
                Se não encontrar o que precisa, fale com a gente em{" "}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                >
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              Falar com o suporte
            </a>
          </div>

          <div className="mt-6 space-y-8">
            {CATEGORY_ORDER.map((cat) => {
              const items = grouped.get(cat);
              if (!items?.length) return null;

              return (
                <section key={cat} aria-label={`Seção: ${cat}`} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-zinc-900">{cat}</h2>
                    <span className="h-px flex-1 bg-zinc-100" aria-hidden />
                  </div>

                  <div className="divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white">
                    {items.map((it) => (
                      <details key={it.q} className="group p-0">
                        <summary
                          className="cursor-pointer list-none select-none px-4 py-3 text-sm font-semibold text-zinc-900 outline-none transition hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded-2xl"
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="min-w-0">{it.q}</span>
                            <span
                              aria-hidden
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition group-open:rotate-45"
                            >
                              +
                            </span>
                          </span>
                        </summary>
                        <div className="px-4 pb-4 text-sm leading-relaxed text-zinc-600">
                          <p className="mt-1">{it.a}</p>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Precisa de ajuda agora?</p>
              <p className="mt-1 text-sm text-zinc-600">
                Fale com nosso suporte e descreva o que aconteceu. Quanto mais detalhes, mais rápido a gente resolve.
              </p>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
            >
              Enviar e-mail
            </a>
          </div>
        </Card>
      </div>
    </PublicShell>
  );
}
