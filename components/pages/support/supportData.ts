/* frontend/components/pages/support/supportData.ts */

export type SupportTopic = {
  key: string;
  label: string;
  description: string;
  tag?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    key: "lancamentos",
    label: "Lançamentos",
    description: "Importação, categorização e ajustes de entradas/saídas.",
    ctaLabel: "Abrir lançamentos",
    ctaHref: "/lancamentos"
  },
  {
    key: "metas",
    label: "Metas",
    description: "Progresso, alertas e regras de metas mensais.",
    ctaLabel: "Abrir metas",
    ctaHref: "/metas"
  },
  {
    key: "contas",
    label: "Contas e vencimentos",
    description: "Contas a pagar/receber, lembretes e notificações.",
    ctaLabel: "Abrir contas",
    ctaHref: "/contas"
  },
  {
    key: "notificacoes",
    label: "Notificações",
    description: "Central, preferências e alertas do painel.",
    ctaLabel: "Ver central",
    ctaHref: "/notificacoes"
  },
  {
    key: "planos",
    label: "Planos e cobrança",
    description: "Trial, assinatura, faturas e reativação.",
    tag: "Premium",
    ctaLabel: "Ver planos",
    ctaHref: "/planos"
  },
  {
    key: "acesso",
    label: "Acesso e login",
    description: "Recuperação de senha, sessões e segurança da conta.",
    ctaLabel: "Configurações",
    ctaHref: "/configuracoes"
  }
];

export const SUPPORT_FAQ: Array<{ q: string; a: string }> = [
  {
    q: "Como o suporte funciona?",
    a: "Você envia uma mensagem aqui e recebe um protocolo. O time responde com orientações e próximos passos."
  },
  {
    q: "Posso anexar arquivos?",
    a: "Sim. Para acelerar, envie prints, datas e o nome da tela onde aconteceu (ex.: Lançamentos, Metas)."
  },
  {
    q: "O que devo informar para uma análise mais rápida?",
    a: "Inclua o que você tentou fazer, o que esperava acontecer, o que aconteceu e (se tiver) horário aproximado do erro."
  },
  {
    q: "O plano não liberou recursos, e agora?",
    a: "Às vezes leva alguns minutos. Se continuar, envie o e-mail do usuário e a tela afetada."
  },
  {
    q: "É possível integrar bancos e importar transações automaticamente?",
    a: "Sim, é possível. Normalmente isso envolve autorização do usuário e um conector (Open Finance) no backend."
  }
];

export const SUPPORT_RESPONSE_SLA = {
  primary: "Resposta em poucas horas (horário comercial)",
  secondary: "Casos críticos podem ter prioridade"
};
