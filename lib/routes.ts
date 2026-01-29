/* frontend/lib/routes.ts */
export const routes = {
  public: {
    home: "/",
    pricing: "/pricing",
    faq: "/faq",
    termos: "/termos",
    privacidade: "/privacidade",
  },
  auth: {
    login: "/login",
    cadastro: "/cadastro",
    esqueciSenha: "/esqueci-senha",
  },
  app: {
    dashboard: "/dashboard",
    lancamentos: "/lancamentos",
    metas: "/metas",
    contas: "/contas",
    notificacoes: "/notificacoes",
    assistente: "/assistente",
    configuracoes: "/configuracoes",
    planos: "/planos",
    bloqueado: "/bloqueado",
  },
} as const;
