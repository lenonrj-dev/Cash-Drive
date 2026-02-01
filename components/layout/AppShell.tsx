/* frontend/components/layout/AppShell.tsx */
"use client";

import React, { useContext, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "../../providers/AuthProvider";
import { BillingContext } from "../../providers/BillingProvider";
import { routes } from "../../lib/routes";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import EnvWarning from "../common/EnvWarning";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useContext(AuthContext);
  const billing = useContext(BillingContext);

  const isReady = useMemo(() => !auth?.isLoading, [auth?.isLoading]);

  if (isReady && !auth?.isAuthed) {
    router.replace(routes.auth.login);
    return null;
  }

  return (
    <div className="min-h-dvh bg-gradient-to-br from-white via-white to-teal-50/70 text-zinc-900">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-xl focus:bg-teal-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Pular para o conteúdo
      </a>

      <Sidebar currentPath={pathname || ""} />

      <div className="flex min-h-dvh flex-col lg:pl-[260px]">
        <Header title={resolveTitle(pathname || "")} status={billing?.status || "none"} canWrite={Boolean(billing?.canWrite)} />

        <main id="conteudo" className="flex-1 px-4 pb-28 pt-6 sm:px-6 lg:px-10 2xl:px-14 lg:pb-10">
          <EnvWarning className="mb-4" />
          {children}
        </main>

        <MobileNav currentPath={pathname || ""} />
      </div>
    </div>
  );
}

function resolveTitle(path: string) {
  if (path.startsWith(routes.app.dashboard)) return "Dashboard";
  if (path.startsWith(routes.app.lancamentos)) return "Lançamentos";
  if (path.startsWith(routes.app.metas)) return "Metas";
  if (path.startsWith(routes.app.contas)) return "Contas";
  if (path.startsWith(routes.app.notificacoes)) return "Notificações";
  if (path.startsWith(routes.app.assistente)) return "Assistente Cash";
  if (path.startsWith(routes.app.configuracoes)) return "Configurações";
  if (path.startsWith(routes.app.planos)) return "Planos";
  return "Cash Drive";
}
