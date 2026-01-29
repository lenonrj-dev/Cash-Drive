/* frontend/components/pages/auth/LoginView.tsx */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { routes } from "../../../lib/routes";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import PlansAside from "./PlansAside";

export default function LoginView() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disabled = useMemo(() => !email.trim() || password.length < 6, [email, password]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!auth) return;

    setIsSubmitting(true);
    const res = await auth.login(email.trim(), password);
    setIsSubmitting(false);

    if (!res.ok) {
      setFormError(res.error || "Nao foi possivel entrar.");
      return;
    }

    router.push(routes.app.dashboard);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Card className="p-6">
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Acesso</p>
            <h1 className="mt-2 text-2xl font-bold text-zinc-900">Entrar</h1>
            <p className="mt-1 text-sm text-zinc-600">
              Acesse seu painel e acompanhe seu financeiro em tempo real.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint="Minimo de 6 caracteres."
            />

            {formError ? (
              <div className="rounded-xl border border-red-200/70 bg-red-50 p-3 text-sm text-red-700">
                {formError}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={routes.auth.esqueciSenha}
                className="text-sm font-semibold text-zinc-600 hover:underline"
              >
                Esqueci minha senha
              </Link>

              <Button type="submit" disabled={disabled || isSubmitting}>
                {isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </div>

            <div className="pt-2 text-sm text-zinc-600">
              Nao tem conta?{" "}
              <Link className="font-semibold text-zinc-900 hover:underline" href={routes.auth.cadastro}>
                Criar conta
              </Link>
            </div>
          </form>
        </Card>
      </div>

      <aside className="lg:col-span-5">
        <PlansAside />
      </aside>
    </div>
  );
}
