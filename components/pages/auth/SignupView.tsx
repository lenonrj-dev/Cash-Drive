/* frontend/components/pages/auth/SignupView.tsx */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { routes } from "../../../lib/routes";

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
};

function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
  hint
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-900">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={[
          "w-full rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 py-3.5 text-sm text-zinc-900",
          "placeholder:text-zinc-400 outline-none transition",
          "focus:border-teal-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        ].join(" ")}
      />
      {hint ? <p className="text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}

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
      setFormError(res.error || "Não foi possível criar sua conta.");
      return;
    }

    router.push(routes.app.dashboard);
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="relative min-h-[100svh] w-full bg-teal-50 px-4 py-8 sm:py-10">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-teal-200/70 blur-[80px] opacity-50 animate-pulse"
          style={{ animationDuration: "6s" }}
        />
        <div
          className="pointer-events-none absolute -right-28 -top-24 h-[26rem] w-[26rem] rounded-full bg-emerald-200/70 blur-[80px] opacity-45 animate-pulse"
          style={{ animationDuration: "7s" }}
        />
        <div
          className="pointer-events-none absolute bottom-[-8rem] right-[10%] h-[30rem] w-[30rem] rounded-full bg-teal-200/80 blur-[90px] opacity-45 animate-pulse"
          style={{ animationDuration: "8s" }}
        />

        <div className="relative z-10 mx-auto w-full max-w-[1100px] overflow-hidden rounded-[2.25rem] bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-zinc-200/60">
          <div className="flex min-h-[680px] flex-col lg:flex-row">
            <section className="relative w-full lg:w-1/2">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-teal-50/60 to-teal-100/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
                <div className="flex-1 py-2 sm:py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
                    Cadastro
                  </p>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-[2.6rem] sm:leading-[1.08]">
                    Crie sua conta <br className="hidden sm:block" /> em poucos passos
                  </h1>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600">
                    Comece em modo leitura e libere ações ao ativar um plano com trial de 15 dias.
                  </p>

                  <div className="mt-8 rounded-3xl border border-zinc-200/70 bg-white/70 p-5 text-sm text-zinc-600 shadow-sm backdrop-blur">
                    <h2 className="text-base font-bold text-zinc-900">Como funciona o acesso</h2>
                    <ul className="mt-3 space-y-2">
                      <li>• Você entra e consegue ver o painel em modo leitura.</li>
                      <li>• Para registrar lançamentos/metas/contas, ative um plano.</li>
                      <li>• O trial é de 15 dias e exige cadastro do cartão.</li>
                    </ul>
                    <div className="mt-5">
                      <Link
                        href={routes.public.pricing}
                        className="inline-flex w-full items-center justify-center rounded-2xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700 transition hover:bg-teal-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                      >
                        Ver planos e benefícios
                      </Link>
                    </div>
                  </div>
                </div>

                <footer className="flex items-center justify-between gap-4 pt-8">
                  <Link
                    href={routes.public.termos}
                    className="text-sm font-semibold text-zinc-700 transition hover:text-teal-700 hover:underline"
                  >
                    Termos
                  </Link>
                  <Link
                    href={routes.public.privacidade}
                    className="text-sm font-semibold text-zinc-700 transition hover:text-teal-700 hover:underline"
                  >
                    Privacidade
                  </Link>
                </footer>
              </div>
            </section>

            <section className="w-full bg-white lg:w-1/2">
              <div className="flex h-full items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-md">
                  <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/80 p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8">
                    <header className="mb-8">
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                        Criar conta
                      </h2>
                      <p className="mt-2 text-sm text-zinc-500">
                        Preencha os dados abaixo para começar.
                      </p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-4">
                      <Field
                        id="name"
                        label="Nome"
                        placeholder="Seu nome"
                        value={name}
                        onChange={setName}
                        autoComplete="name"
                      />

                      <Field
                        id="email"
                        label="E-mail"
                        type="email"
                        placeholder="nome@exemplo.com"
                        value={email}
                        onChange={setEmail}
                        autoComplete="email"
                      />

                      <Field
                        id="phone"
                        label="Telefone (opcional)"
                        placeholder="(00) 00000-0000"
                        value={phone}
                        onChange={setPhone}
                        autoComplete="tel"
                      />

                      <Field
                        id="password"
                        label="Senha"
                        type="password"
                        placeholder="No mínimo 6 caracteres"
                        value={password}
                        onChange={setPassword}
                        autoComplete="new-password"
                        hint="Mínimo de 6 caracteres."
                      />

                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm text-zinc-700">
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-zinc-300 text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                          checked={accepted}
                          onChange={(e) => setAccepted(e.target.checked)}
                        />
                        <span>
                          Eu li e aceito os{" "}
                          <Link href={routes.public.termos} className="font-semibold text-teal-700 underline hover:text-teal-800">
                            Termos
                          </Link>{" "}
                          e a{" "}
                          <Link href={routes.public.privacidade} className="font-semibold text-teal-700 underline hover:text-teal-800">
                            Política de Privacidade
                          </Link>
                          .
                        </span>
                      </label>

                      {formError ? (
                        <div className="rounded-2xl border border-red-200/70 bg-red-50 p-3 text-sm text-red-700">
                          {formError}
                        </div>
                      ) : null}

                      <button
                        type="submit"
                        disabled={disabled || isSubmitting}
                        className={[
                          "mt-1 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-bold text-white",
                          "bg-teal-600 shadow-[0_14px_40px_-20px_rgba(13,148,136,0.45)]",
                          "transition active:scale-[0.99] hover:bg-teal-700",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                          "disabled:cursor-not-allowed disabled:opacity-60"
                        ].join(" ")}
                      >
                        {isSubmitting ? "Criando..." : "Criar conta"}
                      </button>

                      <p className="pt-2 text-center text-sm text-zinc-600">
                        Já tem conta?{" "}
                        <Link
                          className="font-semibold text-teal-600 transition hover:text-teal-700 hover:underline"
                          href={routes.auth.login}
                        >
                          Entrar
                        </Link>
                      </p>

                      <p className="text-center text-xs text-zinc-500">
                        Depois, ative seu plano em{" "}
                        <Link
                          className="font-semibold text-zinc-800 hover:underline"
                          href={routes.app.planos}
                        >
                          Planos
                        </Link>
                        .
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="pb-[max(24px,env(safe-area-inset-bottom))]" />
      </div>
    </div>
  );
}
