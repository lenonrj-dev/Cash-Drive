/* frontend/app/(public)/termos/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | Rota Fin",
  description:
    "Termos de Uso da Rota Fin: regras de acesso, planos, cancelamento, responsabilidades, condutas proibidas e disposições legais.",
  robots: { index: true, follow: true }
};

const COMPANY = {
  name: "Rota Fin",
  supportEmail: "suporte@rotafin.com",
  privacyPath: "/privacidade",
  termsPath: "/termos"
};

const LAST_UPDATED = "7 de fevereiro de 2026";

type TocItem = { id: string; label: string };

function Section({
  id,
  title,
  children
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <h2 id={`${id}-title`} className="text-base font-bold text-zinc-900">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-600">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-2 space-y-2">
      {items.map((it, idx) => (
        <li key={idx} className="flex gap-3">
          <span aria-hidden className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-teal-500" />
          <span className="min-w-0">{it}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  const toc: TocItem[] = [
    { id: "aceite", label: "Aceite e definições" },
    { id: "servico", label: "Sobre o serviço" },
    { id: "conta", label: "Conta e acesso" },
    { id: "planos", label: "Planos e funcionalidades" },
    { id: "modo-visualizacao", label: "Modo de visualização" },
    { id: "pagamentos", label: "Pagamentos, cobrança e cancelamento" },
    { id: "sem-reembolso", label: "Reembolsos" },
    { id: "conduta", label: "Uso permitido e condutas proibidas" },
    { id: "banimento", label: "Medidas de segurança e banimento" },
    { id: "conteudo", label: "Dados e conteúdo do usuário" },
    { id: "privacidade", label: "Privacidade e LGPD" },
    { id: "limitacoes", label: "Limitações e responsabilidade" },
    { id: "mudancas", label: "Mudanças no serviço e nos termos" },
    { id: "contato", label: "Contato" }
  ];

  return (
    <PublicShell>
      <PageHeader
        title="Termos de Uso"
        subtitle="Regras de uso da Rota Fin, acesso ao produto, planos, pagamentos, cancelamento, segurança e responsabilidades."
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-zinc-900">Navegação</p>
                <p className="mt-1 text-xs text-zinc-500">Última atualização: {LAST_UPDATED}</p>
              </div>
              <span className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-2 py-1 text-[11px] font-semibold text-teal-700">
                Termos
              </span>
            </div>

            <nav aria-label="Sumário" className="mt-4">
              <ul className="space-y-1.5 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block rounded-lg px-2 py-1.5 text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Card>

          <Card className="mt-4 p-4">
            <p className="text-xs font-semibold text-zinc-900">Atalho</p>
            <p className="mt-1 text-xs text-zinc-600">
              Dúvidas ou solicitações? Fale com o suporte em{" "}
              <a
                className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                href={`mailto:${COMPANY.supportEmail}`}
              >
                {COMPANY.supportEmail}
              </a>
              .
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <article className="space-y-8">
              <Section id="aceite" title="1) Aceite e definições">
                <p>
                  Estes Termos de Uso ("Termos") regem o acesso e uso do site, dashboard e funcionalidades da{" "}
                  <span className="font-semibold text-zinc-900">{COMPANY.name}</span> ("Serviço"). Ao acessar ou usar o
                  Serviço, você declara que leu, compreendeu e concorda com estes Termos.
                </p>
                <p>
                  Se você não concordar com qualquer parte destes Termos, não utilize o Serviço.
                </p>
                <BulletList
                  items={[
                    <>
                      <span className="font-semibold text-zinc-900">Usuário:</span> pessoa que acessa ou utiliza o
                      Serviço.
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Conta:</span> cadastro individual para uso do
                      Serviço.
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Planos:</span> modalidades pagas (Básico e Pro) com
                      opção mensal ou anual, conforme disponibilizado no Serviço.
                    </>
                  ]}
                />
              </Section>

              <Section id="servico" title="2) Sobre o serviço">
                <p>
                  A Rota Fin é uma dashboard de organização e acompanhamento financeiro, com recursos como contas,
                  lançamentos, metas e registros relacionados à manutenção de moto (por exemplo, trocas de óleo e
                  anotações). O Serviço pode ser atualizado continuamente para melhorias de desempenho, segurança,
                  experiência do usuário e novos recursos.
                </p>
              </Section>

              <Section id="conta" title="3) Conta e acesso">
                <BulletList
                  items={[
                    "Para utilizar funcionalidades do Serviço, pode ser necessário criar uma Conta com dados de cadastro (nome, e-mail, telefone quando informado) e senha.",
                    "Você é responsável por manter a confidencialidade das credenciais e por toda atividade que ocorrer na sua Conta.",
                    "Você se compromete a fornecer informações verdadeiras e manter seus dados atualizados, na medida do possível.",
                    "Podemos adotar medidas de verificação e segurança sempre que necessário para proteger a Conta e o Serviço."
                  ]}
                />
              </Section>

              <Section id="planos" title="4) Planos e funcionalidades">
                <p>
                  O Serviço pode oferecer recursos em diferentes níveis de acesso. Atualmente, podem existir dois planos
                  pagos: <span className="font-semibold text-zinc-900">Básico</span> e{" "}
                  <span className="font-semibold text-zinc-900">Pro</span>, cada um com opção mensal ou anual, conforme
                  apresentado no Serviço.
                </p>
                <p>
                  As funcionalidades incluídas em cada plano, preços e condições são exibidas na página de planos e/ou no
                  fluxo de assinatura. Podemos atualizar recursos e benefícios para manter o produto evoluindo.
                </p>
              </Section>

              <Section id="modo-visualizacao" title="5) Modo de visualização (sem salvamento de dados)">
                <p>
                  A Rota Fin pode disponibilizar um modo de visualização ("modo leitura"), destinado a apresentar a
                  experiência da dashboard. Nesse modo, pode haver limitações de ações e, em especial, recursos de
                  salvamento e persistência de informações podem ficar indisponíveis.
                </p>
                <p>
                  O modo de visualização não é um "teste grátis" com cobrança posterior. Ele existe para que o usuário
                  conheça o Serviço antes de assinar um plano pago.
                </p>
              </Section>

              <Section id="pagamentos" title="6) Pagamentos, cobrança e cancelamento">
                <p>
                  Assinaturas e cobranças são processadas por provedores de pagamento (por exemplo, Stripe). Ao assinar um
                  plano, você concorda em pagar os valores, tributos e encargos aplicáveis, conforme exibidos no fluxo de
                  contratação.
                </p>
                <BulletList
                  items={[
                    "A cobrança ocorre de acordo com a periodicidade escolhida (mensal/anual) e as regras exibidas no momento da assinatura.",
                    "O cancelamento pode ser realizado a qualquer momento. Quando solicitado, o cancelamento é processado de forma imediata conforme configuração do provedor de pagamento.",
                    "O acesso a recursos pagos pode ser alterado após o cancelamento, conforme estado da assinatura e regras do provedor.",
                    "Em caso de falha de pagamento, podemos suspender ou limitar o acesso a funcionalidades até a regularização."
                  ]}
                />
              </Section>

              <Section id="sem-reembolso" title="7) Reembolsos">
                <p>
                  A Rota Fin <span className="font-semibold text-zinc-900">não oferece reembolso</span> de valores já
                  cobrados, salvo quando exigido por lei ou determinação de autoridade competente. Antes de contratar,
                  verifique as informações do plano e utilize o modo de visualização para conhecer o Serviço.
                </p>
              </Section>

              <Section id="conduta" title="8) Uso permitido e condutas proibidas">
                <p>
                  Você concorda em utilizar o Serviço de forma lícita e responsável. É proibido:
                </p>
                <BulletList
                  items={[
                    "Praticar atos que violem leis, regulamentos, direitos de terceiros ou estes Termos.",
                    "Tentar acessar áreas, contas, sistemas ou dados sem autorização (incluindo tentativas de invasão, engenharia reversa, exploração de vulnerabilidades ou automatizações abusivas).",
                    "Usar o Serviço para spam, abuso, assédio, fraude ou qualquer atividade maliciosa.",
                    "Interferir no funcionamento do Serviço, contornar limitações técnicas, ou degradar performance e segurança.",
                    "Fornecer conteúdo ilegal, ofensivo ou que infrinja direitos autorais/marcas de terceiros."
                  ]}
                />
                <p>
                  Sobre dados de terceiros: o Serviço é voltado ao uso pessoal, mas entendemos que alguns usuários podem
                  registrar informações que se relacionem a terceiros (por exemplo, metas e lançamentos). Nesses casos,
                  você declara que possui base legal e autorização adequada para inserir tais dados, e assume
                  responsabilidade por isso.
                </p>
                <p>
                  Não realizamos verificação de identidade para confirmar se o nome cadastrado corresponde ao usuário
                  real. Por isso, o usuário é responsável por garantir que o uso e os dados inseridos respeitam a lei e
                  direitos de terceiros.
                </p>
              </Section>

              <Section id="banimento" title="9) Medidas de segurança e banimento">
                <p>
                  Para proteger o Serviço e os usuários, podemos aplicar medidas técnicas e administrativas diante de
                  abuso, fraude ou tentativa de invasão.
                </p>
                <BulletList
                  items={[
                    "Bloqueio de acessos, limitação de funcionalidades e suspensão da Conta",
                    "Banimento por endereço IP e/ou identificadores de dispositivo, quando tecnicamente aplicável",
                    "Preservação de logs e evidências para auditoria e segurança",
                    "Adoção de medidas cabíveis, incluindo comunicação a autoridades e ações legais, quando necessário"
                  ]}
                />
              </Section>

              <Section id="conteudo" title="10) Dados e conteúdo do usuário">
                <p>
                  Você mantém a titularidade e responsabilidade pelos dados e conteúdo que inserir no Serviço (por
                  exemplo, lançamentos, metas, contas e registros de manutenção). Você concede à Rota Fin uma licença
                  limitada para hospedar, processar e exibir esses dados exclusivamente para operar e melhorar o Serviço,
                  conforme estes Termos e a nossa Política de Privacidade.
                </p>
                <p>
                  Você é responsável pela veracidade e legalidade dos dados inseridos. Podemos remover ou limitar o acesso
                  a conteúdo em caso de violação destes Termos ou quando exigido por lei.
                </p>
              </Section>

              <Section id="privacidade" title="11) Privacidade e LGPD">
                <p>
                  O tratamento de dados pessoais relacionado ao Serviço é regido pela nossa Política de Privacidade. Para
                  saber como coletamos, usamos, compartilhamos e protegemos dados, consulte:
                </p>
                <p>
                  <a
                    href={COMPANY.privacyPath}
                    className="inline-flex items-center rounded-lg bg-zinc-50 px-3 py-2 text-sm font-semibold text-teal-700 ring-1 ring-zinc-200 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  >
                    Acessar Política de Privacidade
                  </a>
                </p>
              </Section>

              <Section id="limitacoes" title="12) Limitações e responsabilidade">
                <p>
                  O Serviço é fornecido "como está" e "conforme disponível". Embora adotemos boas práticas de segurança e
                  confiabilidade, não garantimos que o Serviço funcionará sem interrupções, falhas ou indisponibilidades.
                </p>
                <BulletList
                  items={[
                    "A Rota Fin não se responsabiliza por decisões financeiras tomadas com base nas informações registradas no Serviço. O Serviço é uma ferramenta de organização e acompanhamento.",
                    "Você é responsável por revisar as informações inseridas e validar resultados, inclusive quando utilizar o assistente para cálculos ou dúvidas.",
                    "Na extensão máxima permitida por lei, não nos responsabilizamos por lucros cessantes, perdas indiretas, danos incidentais ou consequenciais relacionados ao uso do Serviço.",
                    "Podemos limitar ou suspender funcionalidades por manutenção, segurança ou exigência legal."
                  ]}
                />
              </Section>

              <Section id="mudancas" title="13) Mudanças no serviço e nos termos">
                <p>
                  Podemos modificar o Serviço e estes Termos para refletir melhorias, ajustes técnicos, requisitos legais ou
                  mudanças operacionais. Quando houver alterações relevantes, atualizaremos a data de atualização nesta
                  página e poderemos informar no próprio Serviço.
                </p>
                <p>
                  O uso continuado do Serviço após a publicação de alterações significa que você concorda com os Termos
                  revisados.
                </p>
              </Section>

              <Section id="contato" title="14) Contato">
                <p>
                  Se você tiver dúvidas, solicitações, ou quiser reportar abuso e segurança, fale conosco:
                </p>
                <BulletList
                  items={[
                    <>
                      <span className="font-semibold text-zinc-900">E-mail:</span>{" "}
                      <a
                        className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                        href={`mailto:${COMPANY.supportEmail}`}
                      >
                        {COMPANY.supportEmail}
                      </a>
                    </>,
                    "Você também pode usar o canal de suporte dentro da dashboard."
                  ]}
                />
              </Section>
            </article>
          </Card>

          <Card className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Resumo rápido</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Você pode usar a Rota Fin no modo de visualização, ou assinar os planos Básico/Pro (mensal/anual).
                  Cancelamento é imediato via provedor de pagamento e não oferecemos reembolso, salvo exigência legal.
                </p>
              </div>
              <a
                href={`mailto:${COMPANY.supportEmail}`}
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              >
                Falar com o suporte
              </a>
            </div>
          </Card>
        </div>
      </div>
    </PublicShell>
  );
}
