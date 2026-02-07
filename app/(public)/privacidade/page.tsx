/* frontend/app/(public)/privacidade/page.tsx */
import PublicShell from "../../../components/layout/PublicShell";
import Card from "../../../components/ui/Card";
import PageHeader from "../../../components/pages/common/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Rota Fin",
  description:
    "Conheça como a Rota Fin coleta, usa, compartilha e protege dados pessoais, além de seus direitos conforme a LGPD.",
  robots: { index: true, follow: true }
};

const COMPANY = {
  name: "Rota Fin",
  location: "Volta Redonda - Rio de Janeiro, Brasil",
  supportEmail: "suporte@rotafin.com",
  dpoEmail: "contato@rotafin.com",
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
    { id: "visao-geral", label: "Visão geral" },
    { id: "quem-somos", label: "Quem somos" },
    { id: "dados-coletados", label: "Quais dados coletamos" },
    { id: "finalidades", label: "Como usamos seus dados" },
    { id: "bases-legais", label: "Bases legais (LGPD)" },
    { id: "cookies", label: "Cookies e tecnologias" },
    { id: "compartilhamento", label: "Compartilhamento e terceiros" },
    { id: "transferencia", label: "Transferência internacional" },
    { id: "retencao", label: "Retenção e exclusão" },
    { id: "seguranca", label: "Segurança" },
    { id: "direitos", label: "Seus direitos" },
    { id: "criancas", label: "Crianças e adolescentes" },
    { id: "alteracoes", label: "Atualizações" },
    { id: "contato", label: "Contato" }
  ];

  return (
    <PublicShell>
      <PageHeader
        title="Política de Privacidade"
        subtitle="Transparência sobre dados, consentimento, cookies e como protegemos suas informações na Rota Fin."
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
                LGPD
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
              Quer exercer seus direitos? Envie uma solicitação para{" "}
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
              <Section id="visao-geral" title="1) Visão geral">
                <p>
                  Esta Política descreve como a <span className="font-semibold text-zinc-900">{COMPANY.name}</span>
                  {" "}coleta, utiliza, compartilha e protege dados pessoais em seus sites, aplicações e funcionalidades
                  ("Serviço"). Também explica seus direitos e escolhas conforme a Lei Geral de Proteção de Dados
                  ("LGPD", Lei nº 13.709/2018).
                </p>
                <p>
                  Ao usar o Serviço, você declara estar ciente das práticas aqui descritas. Se você não concordar com
                  esta Política, recomendamos que não utilize o Serviço.
                </p>
              </Section>

              <Section id="quem-somos" title="2) Quem somos">
                <BulletList
                  items={[
                    <>
                      <span className="font-semibold text-zinc-900">Controladora:</span> {COMPANY.name}
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Localização comercial:</span> {COMPANY.location}
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Contato:</span>{" "}
                      <a
                        className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                        href={`mailto:${COMPANY.supportEmail}`}
                      >
                        {COMPANY.supportEmail}
                      </a>
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Encarregado (DPO):</span>{" "}
                      <a
                        className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                        href={`mailto:${COMPANY.dpoEmail}`}
                      >
                        {COMPANY.dpoEmail}
                      </a>
                    </>
                  ]}
                />
              </Section>

              <Section id="dados-coletados" title="3) Quais dados coletamos">
                <p>
                  Coletamos apenas os dados necessários para operar a conta, entregar funcionalidades e manter o Serviço
                  seguro.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <p className="text-sm font-semibold text-zinc-900">Dados de cadastro e autenticação</p>
                    <BulletList
                      items={[
                        "Nome",
                        "E-mail",
                        "Telefone (quando informado)",
                        "Senha (armazenada de forma protegida, com hash)",
                        "Identificadores e registros de autenticação (ex.: data/hora de login)"
                      ]}
                    />
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <p className="text-sm font-semibold text-zinc-900">Dados inseridos por você na dashboard</p>
                    <BulletList
                      items={[
                        "Contas, metas e lançamentos financeiros",
                        "Informações de manutenção de moto (ex.: trocas de óleo e registros relacionados)",
                        "Preferências e configurações do usuário",
                        "Mensagens enviadas ao suporte e ao assistente (somente o que você compartilha)"
                      ]}
                    />
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-4 md:col-span-2">
                    <p className="text-sm font-semibold text-zinc-900">Dados técnicos e de uso</p>
                    <p className="mt-2 text-sm text-zinc-600">
                      Para segurança e operação do Serviço, podemos registrar informações técnicas básicas, como endereço
                      IP, data/hora de acesso, tipo de dispositivo/navegador, logs de erro e eventos de segurança.
                      Não coletamos geolocalização e não tratamos dados pessoais sensíveis de forma intencional.
                    </p>
                  </div>
                </div>
              </Section>

              <Section id="finalidades" title="4) Como usamos seus dados">
                <BulletList
                  items={[
                    "Criar e gerenciar sua conta e autenticar acessos",
                    "Entregar funcionalidades do produto (metas, contas, lançamentos e manutenção de moto)",
                    "Prestar suporte e atendimento (incluindo solicitações dentro da dashboard)",
                    "Manter segurança, prevenção a fraudes e auditoria do Serviço",
                    "Processar cobrança, faturamento e gestão de assinaturas",
                    "Melhorar o produto por métricas e análises (analytics)",
                    "Enviar comunicações relacionadas ao serviço e à assinatura",
                    "Enviar comunicações de marketing (e-mail/WhatsApp) e executar remarketing, quando aplicável"
                  ]}
                />
              </Section>

              <Section id="bases-legais" title="5) Bases legais (LGPD)">
                <p>
                  Tratamos seus dados pessoais com fundamento nas bases legais previstas na LGPD, de acordo com a
                  finalidade:
                </p>
                <BulletList
                  items={[
                    <>
                      <span className="font-semibold text-zinc-900">Execução de contrato</span> (art. 7º, V): para criar
                      conta, autenticar e disponibilizar funcionalidades.
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Cumprimento de obrigação legal/regulatória</span>
                      {" "}(art. 7º, II): quando aplicável a registros mínimos e comprovações vinculadas à assinatura.
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Legítimo interesse</span> (art. 7º, IX): segurança,
                      prevenção a fraudes, melhoria do Serviço e comunicações operacionais.
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Consentimento</span> (art. 7º, I): para determinados
                      cookies/ads, marketing e preferências, quando exigido.
                    </>
                  ]}
                />
              </Section>

              <Section id="cookies" title="6) Cookies e tecnologias semelhantes">
                <p>
                  Usamos cookies e tecnologias similares para operar o site, lembrar preferências, medir desempenho e
                  apoiar campanhas (ads). Quando aplicável, você poderá gerenciar preferências por meio de banner/central
                  de cookies e também pelas configurações do seu navegador.
                </p>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <p className="text-sm font-semibold text-zinc-900">Essenciais</p>
                    <p className="mt-2 text-sm text-zinc-600">
                      Necessários para funcionamento, segurança, sessão, preferências e experiência.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <p className="text-sm font-semibold text-zinc-900">Analytics</p>
                    <p className="mt-2 text-sm text-zinc-600">
                      Ajudam a entender uso do site/app e melhorar performance (ex.: métricas agregadas).
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-200 bg-white p-4">
                    <p className="text-sm font-semibold text-zinc-900">Publicidade (Ads)</p>
                    <p className="mt-2 text-sm text-zinc-600">
                      Podem ser usados para medir campanhas, remarketing e personalização de anúncios.
                    </p>
                  </div>
                </div>

                <p className="mt-4">
                  Observação: desativar cookies essenciais pode impactar funcionalidades do site e da autenticação.
                </p>
              </Section>

              <Section id="compartilhamento" title="7) Compartilhamento com terceiros">
                <p>
                  Podemos compartilhar dados pessoais com prestadores de serviço que nos ajudam a operar o Serviço. Esses
                  terceiros atuam como operadores e seguem instruções contratuais, usando os dados apenas para as
                  finalidades compatíveis.
                </p>

                <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-4">
                  <p className="text-sm font-semibold text-zinc-900">Categorias de terceiros que podemos utilizar</p>
                  <BulletList
                    items={[
                      "Hospedagem e entrega do front-end (ex.: Vercel)",
                      "Infraestrutura e hospedagem do servidor, banco de dados Postgres e cache Redis (ex.: Hostinger e/ou provedores equivalentes)",
                      "Processamento de pagamentos e assinaturas (Stripe)",
                      "Envio de e-mails transacionais e notificações (Nodemailer via provedor SMTP configurado)",
                      "Métricas e analytics (ex.: Google e analytics da Vercel)",
                      "Publicidade e mensuração de campanhas (ex.: Meta)",
                      "Ferramentas de segurança, logs e monitoramento"
                    ]}
                  />
                </div>

                <p className="mt-4">
                  Não vendemos dados pessoais. Podemos compartilhar informações quando necessário para cumprir obrigações
                  legais, responder a ordens de autoridades competentes ou proteger direitos e segurança.
                </p>
              </Section>

              <Section id="transferencia" title="8) Transferência internacional de dados">
                <p>
                  Embora o Serviço seja direcionado ao Brasil, alguns fornecedores de tecnologia podem estar sediados no
                  exterior e/ou processar dados em servidores fora do país. Nesses casos, pode ocorrer transferência
                  internacional de dados, sempre buscando medidas de proteção adequadas (ex.: cláusulas contratuais,
                  padrões de segurança e controles de acesso).
                </p>
                <p>
                  Em especial, serviços de hospedagem e analytics podem operar em múltiplas regiões. Quando possível,
                  adotamos configurações e práticas para reduzir a exposição e manter o tratamento alinhado à LGPD.
                </p>
              </Section>

              <Section id="retencao" title="9) Retenção e exclusão">
                <p>
                  Mantemos dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta
                  Política.
                </p>
                <BulletList
                  items={[
                    "Você pode apagar dados que salvou na dashboard (quando disponível) e também solicitar exclusão da conta.",
                    "Dados operacionais de metas e registros associados podem ser mantidos por até 6 meses e, após esse prazo, podem ser eliminados ou anonimizados, conforme política interna de retenção.",
                    "Registros mínimos de segurança (ex.: logs) podem ser mantidos por período razoável para prevenção a fraudes e auditoria.",
                    "Informações relacionadas à assinatura (ex.: status, identificadores de transação e comprovantes) podem ser retidas pelo tempo necessário para cumprir obrigações e garantir suporte ao usuário."
                  ]}
                />
                <p>
                  Se você solicitar a exclusão, alguns dados podem permanecer bloqueados/guardados quando houver base legal
                  que justifique a retenção (por exemplo, obrigação legal, prevenção a fraudes e exercício regular de
                  direitos).
                </p>
              </Section>

              <Section id="seguranca" title="10) Segurança">
                <p>
                  Adotamos medidas técnicas e organizacionais para proteger dados pessoais contra acessos não autorizados,
                  perda, alteração ou divulgação indevida.
                </p>
                <BulletList
                  items={[
                    "Criptografia em trânsito (HTTPS)",
                    "Senhas armazenadas com técnicas de hash (ex.: bcrypt)",
                    "Controles de acesso e privilégios mínimos",
                    "Monitoramento de eventos de segurança e prevenção a fraudes",
                    "Backups e procedimentos internos voltados à continuidade do serviço"
                  ]}
                />
                <p>
                  Apesar dos esforços, nenhum sistema é totalmente livre de riscos. Caso identifiquemos incidentes relevantes
                  de segurança, adotaremos medidas apropriadas e, quando aplicável, comunicaremos conforme a legislação.
                </p>
              </Section>

              <Section id="direitos" title="11) Seus direitos">
                <p>
                  Nos termos da LGPD, você pode solicitar, a qualquer momento e conforme aplicável:
                </p>
                <BulletList
                  items={[
                    "Confirmação da existência de tratamento",
                    "Acesso aos dados",
                    "Correção de dados incompletos, inexatos ou desatualizados",
                    "Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade",
                    "Portabilidade (quando aplicável)",
                    "Eliminação de dados tratados com consentimento (quando aplicável)",
                    "Informações sobre compartilhamento",
                    "Revogação do consentimento e informações sobre consequências",
                    "Oposição ao tratamento em hipóteses de legítimo interesse, quando cabível"
                  ]}
                />
                <p>
                  Para exercer seus direitos, fale com nosso suporte em{" "}
                  <a
                    className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                    href={`mailto:${COMPANY.supportEmail}`}
                  >
                    {COMPANY.supportEmail}
                  </a>
                  {" "}ou utilize o canal de suporte dentro da dashboard.
                </p>
              </Section>

              <Section id="criancas" title="12) Crianças e adolescentes">
                <p>
                  O Serviço é voltado ao público em geral, mas não é intencionalmente direcionado a menores de idade, dado o
                  seu objetivo de organização financeira. Se você for menor de 18 anos, recomendamos utilizar o Serviço
                  apenas quando legalmente permitido (por exemplo, emancipação) e, quando aplicável, com ciência e
                  responsabilidade de seus responsáveis.
                </p>
              </Section>

              <Section id="alteracoes" title="13) Atualizações desta Política">
                <p>
                  Podemos atualizar esta Política para refletir mudanças no Serviço, requisitos legais ou melhorias de
                  segurança. Quando houver alterações relevantes, iremos indicar a nova data de atualização nesta página e
                  poderemos comunicar dentro do Serviço.
                </p>
              </Section>

              <Section id="contato" title="14) Contato">
                <p>
                  Se você tiver dúvidas sobre esta Política, sobre como tratamos dados pessoais ou quiser exercer seus
                  direitos, entre em contato:
                </p>
                <BulletList
                  items={[
                    <>
                      <span className="font-semibold text-zinc-900">Suporte:</span>{" "}
                      <a
                        className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                        href={`mailto:${COMPANY.supportEmail}`}
                      >
                        {COMPANY.supportEmail}
                      </a>
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Encarregado (DPO):</span>{" "}
                      <a
                        className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                        href={`mailto:${COMPANY.dpoEmail}`}
                      >
                        {COMPANY.dpoEmail}
                      </a>
                    </>,
                    <>
                      <span className="font-semibold text-zinc-900">Termos de uso:</span>{" "}
                      <a
                        className="font-semibold text-teal-700 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 rounded"
                        href={COMPANY.termsPath}
                      >
                        {COMPANY.termsPath}
                      </a>
                    </>
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
                  Coletamos dados de cadastro e dados que você registra na dashboard para entregar o serviço, com
                  segurança, cobrança e melhorias. Você pode solicitar acesso, correção e exclusão quando aplicável.
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
