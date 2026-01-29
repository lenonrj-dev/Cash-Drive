/* frontend/components/layout/PublicShell.tsx */
import Link from "next/link";
import { routes } from "../../lib/routes";
import Button from "../ui/Button";
import EnvWarning from "../common/EnvWarning";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-white via-white to-teal-50/60 text-zinc-900">
      <header className="sticky top-0 z-20 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
        <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-10 2xl:px-14">
          <Link href={routes.public.home} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-sm font-bold text-white">
              CD
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Cash Drive</p>
              <p className="text-xs text-zinc-500">Controle financeiro premium</p>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href={routes.public.pricing}
              className="rounded-full px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
            >
              Planos
            </Link>
            <Link href={routes.auth.login}>
              <Button size="sm" variant="secondary">
                Entrar
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="w-full px-4 py-10 sm:px-6 lg:px-10 2xl:px-14">
        <EnvWarning className="mb-4" />
        {children}
      </main>

      <footer className="border-t border-zinc-200/70 py-10">
        <div className="w-full px-4 text-sm text-zinc-500 sm:px-6 lg:px-10 2xl:px-14">
          <p>© {new Date().getFullYear()} Cash Drive. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
