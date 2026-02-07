/* frontend/components/pages/auth/ForgotPasswordView.tsx */
"use client";

import Link from "next/link";
import React, { useMemo, useState } from "react";
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

        <div className="relative z-10 mx-auto w-full max-w-[980px] overflow-hidden rounded-[2.25rem] bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-zinc-200/60">
          <div className="flex min-h-[640px] flex-col lg:flex-row">
            <section className="relative w-full lg:w-1/2">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-teal-50/60 to-teal-100/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
                <div className="flex-1 py-2 sm:py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">
                    Recuperação
                  </p>
                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-[2.4rem] sm:leading-[1.1]">
                    Recupere seu <br className="hidden sm:block" /> acesso com segurança
                  </h1>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600">
                    Informe seu e-mail para receber instruções. Se o endereço existir, você será
                    orientado(a) no próximo passo.
                  </p>
                </div>

                <footer className="pt-8">
                  <Link
                    href={routes.auth.login}
                    className="text-sm font-semibold text-zinc-700 transition hover:text-teal-700 hover:underline"
                  >
                    Voltar para o login
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
                        Recuperar senha
                      </h2>
                      <p className="mt-2 text-sm text-zinc-500">
                        Enviaremos instruções para redefinir sua senha.
                      </p>
                    </header>

                    {sent ? (
                      <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm text-zinc-600">
                        Se o e-mail existir, enviaremos as instruções. Você já pode voltar ao login.
                      </div>
                    ) : (
                      <form onSubmit={onSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-semibold text-zinc-900">
                            E-mail
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="nome@exemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className={[
                              "w-full rounded-2xl border border-zinc-200 bg-zinc-50/70 px-4 py-3.5 text-sm text-zinc-900",
                              "placeholder:text-zinc-400 outline-none transition",
                              "focus:border-teal-500 focus:bg-white focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                            ].join(" ")}
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={disabled}
                          className={[
                            "inline-flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-bold text-white",
                            "bg-teal-600 shadow-[0_14px_40px_-20px_rgba(13,148,136,0.45)]",
                            "transition active:scale-[0.99] hover:bg-teal-700",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                            "disabled:cursor-not-allowed disabled:opacity-60"
                          ].join(" ")}
                        >
                          Enviar instruções
                        </button>
                      </form>
                    )}

                    <div className="mt-5 text-center text-sm text-zinc-600">
                      <Link
                        className="font-semibold text-teal-600 transition hover:text-teal-700 hover:underline"
                        href={routes.auth.login}
                      >
                        Voltar para o login
                      </Link>
                    </div>
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
