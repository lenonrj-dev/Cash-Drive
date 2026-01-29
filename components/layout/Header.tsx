/* frontend/components/layout/Header.tsx */
"use client";

import React, { useContext, useMemo } from "react";
import Link from "next/link";
import { AuthContext } from "../../providers/AuthProvider";
import { routes } from "../../lib/routes";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

export default function Header({
  title,
  status,
  canWrite
}: {
  title: string;
  status: string;
  canWrite: boolean;
}) {
  const auth = useContext(AuthContext);
  const userName = useMemo(() => auth?.user?.name?.split(" ")[0] || "Motorista", [auth?.user?.name]);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
      <div className="flex flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10 2xl:px-14">
        <div>
          <p className="text-sm font-semibold text-teal-600">Bem-vindo, {userName}</p>
          <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
        </div>

        <div className="flex flex-1 items-center gap-3 lg:justify-end">
          <div className="relative hidden w-full max-w-xs lg:block">
            <input
              aria-label="Buscar"
              placeholder="Buscar no painel"
              className="h-11 w-full rounded-full border border-zinc-200/80 bg-white/90 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon />
            </span>
          </div>

          <button
            type="button"
            aria-label="Notificacoes"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-50"
          >
            <BellIcon />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-teal-500" />
          </button>

          <Badge>{labelStatus(status)}</Badge>

          {!canWrite ? (
            <Link href={routes.app.planos}>
              <Button size="sm">Ativar plano</Button>
            </Link>
          ) : null}

          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-2 py-1 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 lg:flex"
            aria-label="Perfil"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              {userName.slice(0, 2).toUpperCase()}
            </span>
            {userName}
          </button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => auth?.logout()}
            aria-label="Sair da conta"
          >
            Sair
          </Button>
        </div>
      </div>
    </header>
  );
}

function labelStatus(status: string) {
  if (status === "trialing") return "Trial ativo";
  if (status === "active") return "Plano ativo";
  if (status === "past_due") return "Pagamento pendente";
  if (status === "canceled") return "Cancelado";
  if (status === "expired") return "Expirado";
  return "Sem plano";
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}
