/* frontend/components/layout/Sidebar.tsx */
import Link from "next/link";
import { routes } from "../../lib/routes";
import AccessBadge from "./AccessBadge";

const items = [
  { href: routes.app.dashboard, label: "Dashboard", icon: DashboardIcon },
  { href: routes.app.lancamentos, label: "Lançamentos", icon: SwapIcon },
  { href: routes.app.metas, label: "Metas", icon: TargetIcon },
  { href: routes.app.contas, label: "Contas", icon: WalletIcon },
  { href: routes.app.notificacoes, label: "Notificações", icon: BellIcon },
  { href: routes.app.assistente, label: "Assistente", icon: SparkIcon },
  { href: routes.app.planos, label: "Planos", icon: CardIcon },
  { href: (routes as any)?.app?.moto ?? "/moto", label: "Moto", icon: MotoIcon },
  { href: (routes as any)?.app?.suporte ?? "/suporte", label: "Suporte", icon: LifeBuoyIcon },
  { href: routes.app.configuracoes, label: "Configurações", icon: GearIcon }
];

export default function Sidebar({ currentPath }: { currentPath: string }) {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-[260px] lg:flex-col">
      <div className="flex h-full flex-col border-r border-zinc-200/70 bg-white/80 px-5 py-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-600 text-sm font-bold text-white">
              CD
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-zinc-900">Cash Drive</p>
              <p className="text-xs text-zinc-500">Painel premium</p>
            </div>
          </div>
          <AccessBadge />
        </div>

        <nav className="mt-6 flex-1 space-y-2">
          {items.map((it) => {
            const active = currentPath === it.href || currentPath.startsWith(`${it.href}/`);
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  "group flex items-center gap-3 rounded-full px-3 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-teal-50 text-teal-700 shadow-[0_10px_24px_-20px_rgba(13,148,136,0.6)]"
                    : "text-zinc-600 hover:bg-zinc-100"
                ].join(" ")}
              >
                <span
                  className={[
                    "inline-flex h-8 w-8 items-center justify-center rounded-full border",
                    active
                      ? "border-teal-200 bg-teal-100 text-teal-700"
                      : "border-zinc-200 bg-white text-zinc-500"
                  ].join(" ")}
                >
                  <Icon />
                </span>
                <span className="flex-1 truncate">{it.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="rounded-[18px] border border-teal-200/70 bg-teal-50/80 p-4 text-xs text-teal-700">
          <p className="text-xs font-semibold">Dica premium</p>
          <p className="mt-1">Ative um plano para liberar lançamentos, metas, contas e o assistente Cash.</p>
        </div>
      </div>
    </aside>
  );
}

function DashboardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

function SwapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M7 7h10" />
      <path d="M13 3l4 4-4 4" />
      <path d="M17 17H7" />
      <path d="M11 21l-4-4 4-4" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18" />
      <circle cx="17" cy="12" r="1" />
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

function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5z" />
    </svg>
  );
}

function CardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function MotoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6.5" cy="17" r="2.5" />
      <circle cx="17.5" cy="17" r="2.5" />
      <path d="M9 17h3l2.2-6.2a2 2 0 0 1 1.9-1.3H20" />
      <path d="M6.5 17h2.2l3.2-6.4a2 2 0 0 1 1.8-1.1h2.2" />
      <path d="M10 9h3" />
    </svg>
  );
}

function LifeBuoyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="3" />
      <path d="M7.05 7.05l3.18 3.18" />
      <path d="M16.95 16.95l-3.18-3.18" />
      <path d="M7.05 16.95l3.18-3.18" />
      <path d="M16.95 7.05l-3.18 3.18" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.8 1.8 0 00.36 2l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.8 1.8 0 00-2-.36 1.8 1.8 0 00-1 1.54V22a2 2 0 01-4 0v-.09a1.8 1.8 0 00-1-1.54 1.8 1.8 0 00-2 .36l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.8 1.8 0 00.36-2 1.8 1.8 0 00-1.54-1H2a2 2 0 010-4h.09a1.8 1.8 0 001.54-1 1.8 1.8 0 00-.36-2l-.06-.06a2 2 0 012.83-2.83l.06.06a1.8 1.8 0 002 .36 1.8 1.8 0 001-1.54V2a2 2 0 014 0v.09a1.8 1.8 0 001 1.54 1.8 1.8 0 002-.36l.06-.06a2 2 0 012.83 2.83l-.06.06a1.8 1.8 0 00-.36 2 1.8 1.8 0 001.54 1H22a2 2 0 010 4h-.09a1.8 1.8 0 00-1.54 1z" />
    </svg>
  );
}
