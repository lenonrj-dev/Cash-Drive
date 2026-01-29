/* frontend/components/pages/auth/SignupView.tsx */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { routes } from "../../../lib/routes";
import Card from "../../ui/Card";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function SignupView() {
  const router = useRouter();
  const auth = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const disabled = useMemo(() => {
    if (!name.trim()) return true;
    if (!email.trim()) return true;
    if (password.length < 6) return true;
    if (!accepted) return true;
    return false;
  }, [name, email, password, accepted]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!auth) return;

    setIsSubmitting(true);
    const res = await auth.signup({
      name: name.trim(),
      email: email.trim(),
      password,
      phone: phone.trim() ? phone.trim() : null,
      acceptedTerms: accepted
    });
    setIsSubmitting(false);

    if (!res.ok) {
      setFormError(res.error || "Nao foi possivel criar sua conta.");
      return;
    }

    router.push(routes.app.dashboard);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Card className="p-6">
          <header className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Cadastro</p>
            <h1 className="mt-2 text-2xl font-bold text-zinc-900">Criar conta</h1>
            <p className="mt-1 text-sm text-zinc-600">
              Crie sua conta e acesse o painel. Para liberar acoes, ative um plano com trial de 15 dias.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              label="Nome"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              label="Telefone (opcional)"
              placeholder="(00) 00000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
            />
            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hint="Minimo de 6 caracteres."
              autoComplete="new-password"
            />

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm text-zinc-700">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-zinc-300"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              />
              <span>
                Eu li e aceito os{" "}
                <Link href={routes.public.termos} className="font-semibold underline">
                  Termos
                </Link>{" "}
                e a{" "}
                <Link href={routes.public.privacidade} className="font-semibold underline">
                  Politica de Privacidade
                </Link>
                .
              </span>
            </label>

            {formError ? (
              <div className="rounded-xl border border-red-200/70 bg-red-50 p-3 text-sm text-red-700">
                {formError}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={routes.auth.login}
                className="text-sm font-semibold text-zinc-600 hover:underline"
              >
                Ja tenho conta
              </Link>

              <Button type="submit" disabled={disabled || isSubmitting}>
                {isSubmitting ? "Criando..." : "Criar conta"}
              </Button>
            </div>

            <div className="pt-1 text-sm text-zinc-600">
              Depois, ative seu plano em{" "}
              <Link className="font-semibold text-zinc-900 hover:underline" href={routes.app.planos}>
                Planos
              </Link>
              .
            </div>
          </form>
        </Card>
      </div>

      <aside className="lg:col-span-5">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-zinc-900">Como funciona o acesso</h2>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600">
            <li>• Voce entra e consegue ver o painel em modo leitura.</li>
            <li>• Para registrar lancamentos/metas/contas, e necessario ativar um plano.</li>
            <li>• O trial e de 15 dias e exige cadastro do cartao.</li>
          </ul>

          <div className="mt-5">
            <Link href={routes.public.pricing}>
              <Button variant="secondary" className="w-full">
                Ver planos e beneficios
              </Button>
            </Link>
          </div>
        </Card>
      </aside>
    </div>
  );
}
