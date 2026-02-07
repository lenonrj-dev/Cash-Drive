/* frontend/components/pages/auth/LoginView.tsx */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useMemo, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { routes } from "../../../lib/routes";

const Icons = {
  Eye: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  ),
  EyeOff: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    </svg>
  ),
  Flag: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" aria-hidden="true" {...props}>
      <circle cx="16" cy="16" r="16" fill="#009B3A" />
      <path d="M16 4 L28 16 L16 28 L4 16 Z" fill="#FFDF00" />
      <circle cx="16" cy="16" r="5.4" fill="#002776" />
      <path
        d="M10.3 15.4c2.1-1.2 4.3-1.7 6.6-1.5 2.1.2 4.1.9 6 2.1"
        fill="none"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
};

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  showPasswordToggle?: boolean;
};

function Field({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  value,
  onChange,
  hint,
  showPasswordToggle
}: FieldProps) {
  const [show, setShow] = useState(false);
  const resolvedType = showPasswordToggle ? (show ? "text" : "password") : type;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-900">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          type={resolvedType}
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

        {showPasswordToggle ? (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-zinc-500 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label={show ? "Ocultar senha" : "Mostrar senha"}
          >
            {show ? <Icons.EyeOff className="h-5 w-5" /> : <Icons.Eye className="h-5 w-5" />}
          </button>
        ) : null}
      </div>

      {hint ? <p className="text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
}

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
      setFormError(res.error || "Não foi possível entrar.");
      return;
    }

    router.push(routes.app.dashboard);
  }

  const contactHref = (routes as any)?.public?.contato || "/contato";

  return (
    <div className="relative w-full overflow-hidden bg-white mt-25">
      <div className="relative min-h-[100svh] w-full bg-white px-4 py-8 sm:py-10">
        <div className="relative z-10 mx-auto w-full max-w-[1100px] overflow-hidden rounded-[2.25rem] bg-white shadow-[0_30px_80px_-50px_rgba(0,0,0,0.28)] ring-1 ring-zinc-200/60">
          <div className="flex min-h-[680px] flex-col lg:flex-row">
            {/* Left / Hero */}
            <section className="relative w-full lg:w-1/2">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-teal-50/60 to-teal-100/40" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-transparent" />

              <div className="relative flex h-full flex-col justify-between p-8 sm:p-12">
                <div className="flex-1 py-2 sm:py-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Rota Fin</p>

                  <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-[2.6rem] sm:leading-[1.08]">
                    Rápido, eficiente e <br className="hidden sm:block" /> produtivo
                  </h1>

                  <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-600">
                    Acesse seu painel e acompanhe seu financeiro em tempo real, com uma experiência premium e sem distrações.
                  </p>

                  <div className="mt-8 grid max-w-md grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm text-zinc-700 shadow-sm backdrop-blur">
                      <p className="font-semibold text-zinc-900">Acesso rápido</p>
                      <p className="mt-1 text-xs text-zinc-500">Entre e continue de onde parou.</p>
                    </div>
                    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 text-sm text-zinc-700 shadow-sm backdrop-blur">
                      <p className="font-semibold text-zinc-900">Seguro</p>
                      <p className="mt-1 text-xs text-zinc-500">Sessões e permissões por token.</p>
                    </div>
                  </div>
                </div>

                <footer className="flex items-center justify-between gap-4 pt-8">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-2 text-sm font-semibold text-zinc-700 shadow-sm backdrop-blur transition hover:bg-white"
                    aria-label="Selecionar idioma"
                  >
                    <Icons.Flag className="h-5 w-5" />
                    <span>Português</span>
                  </button>

                  <nav className="hidden items-center gap-6 text-xs text-zinc-400 sm:flex">
                    <Link href={routes.public.termos} className="transition hover:text-teal-700">
                      Termos
                    </Link>
                    <Link href={contactHref} className="transition hover:text-teal-700">
                      Contato
                    </Link>
                  </nav>
                </footer>
              </div>
            </section>

            {/* Right / Form */}
            <section className="w-full bg-white lg:w-1/2">
              <div className="flex h-full items-center justify-center p-6 sm:p-10">
                <div className="w-full max-w-md">
                  <div className="rounded-[1.75rem] border border-zinc-200/70 bg-white/90 p-6 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.25)] backdrop-blur sm:p-8">
                    <header className="mb-8">
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900">Entrar</h2>
                      <p className="mt-2 text-sm text-zinc-500">
                        Bem-vindo de volta. Insira seus dados para continuar.
                      </p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-4">
                      <Field
                        id="email"
                        label="E-mail"
                        type="email"
                        autoComplete="email"
                        placeholder="nome@exemplo.com"
                        value={email}
                        onChange={setEmail}
                      />

                      <Field
                        id="password"
                        label="Senha"
                        type="password"
                        autoComplete="current-password"
                        placeholder="No mínimo 6 caracteres"
                        value={password}
                        onChange={setPassword}
                        hint="Mínimo de 6 caracteres."
                        showPasswordToggle
                      />

                      {formError ? (
                        <div className="rounded-2xl border border-red-200/70 bg-red-50 p-3 text-sm text-red-700">
                          {formError}
                        </div>
                      ) : null}

                      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                        <Link
                          href={routes.auth.esqueciSenha}
                          className="text-sm font-semibold text-zinc-600 transition hover:text-zinc-900 hover:underline"
                        >
                          Esqueci minha senha
                        </Link>

                        <button
                          type="submit"
                          disabled={disabled || isSubmitting}
                          className={[
                            "inline-flex items-center justify-center rounded-2xl px-5 py-3.5 text-sm font-bold text-white",
                            "bg-teal-600 shadow-[0_14px_40px_-20px_rgba(13,148,136,0.45)]",
                            "transition active:scale-[0.99] hover:bg-teal-700",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                            "disabled:cursor-not-allowed disabled:opacity-60"
                          ].join(" ")}
                        >
                          {isSubmitting ? "Entrando..." : "Entrar"}
                        </button>
                      </div>

                      <p className="pt-2 text-center text-sm text-zinc-600">
                        Não tem conta?{" "}
                        <Link
                          className="font-semibold text-teal-600 transition hover:text-teal-700 hover:underline"
                          href={routes.auth.cadastro}
                        >
                          Criar conta
                        </Link>
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
