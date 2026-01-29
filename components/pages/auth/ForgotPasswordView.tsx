/* frontend/components/pages/auth/ForgotPasswordView.tsx */
"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { routes } from "../../../lib/routes";

export default function ForgotPasswordView() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const disabled = useMemo(() => !email.trim(), [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto w-full max-w-xl">
      <Card className="p-6">
        <header className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Recuperacao</p>
          <h1 className="mt-2 text-2xl font-bold text-zinc-900">Recuperar senha</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Informe seu email para receber instrucoes de redefinicao.
          </p>
        </header>

        {sent ? (
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm text-zinc-600">
            Se o email existir, enviaremos as instrucoes. Voce ja pode voltar ao login.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Button type="submit" disabled={disabled} className="w-full">
              Enviar instrucoes
            </Button>
          </form>
        )}

        <div className="mt-4 text-sm text-zinc-600">
          <Link className="font-semibold text-zinc-900 hover:underline" href={routes.auth.login}>
            Voltar para o login
          </Link>
        </div>
      </Card>
    </div>
  );
}
