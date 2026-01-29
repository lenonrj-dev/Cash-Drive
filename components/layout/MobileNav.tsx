/* frontend/components/layout/MobileNav.tsx */
import Link from "next/link";
import { routes } from "../../lib/routes";

const items = [
  { href: routes.app.dashboard, label: "Dashboard", icon: DashboardIcon },
  { href: routes.app.lancamentos, label: "Lancamentos", icon: SwapIcon },
  { href: routes.app.metas, label: "Metas", icon: TargetIcon },
  { href: routes.app.planos, label: "Planos", icon: CardIcon }
];

export default function MobileNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/70 bg-white/90 backdrop-blur lg:hidden">
      <div className="mx-auto flex items-center justify-around px-4 py-2">
        {items.map((it) => {
          const active = currentPath === it.href || currentPath.startsWith(`${it.href}/`);
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={[
                "flex flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs font-semibold transition",
                active
                  ? "bg-teal-50 text-teal-700"
                  : "text-zinc-600 hover:bg-zinc-100"
              ].join(" ")}
            >
              <Icon />
              <span>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
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

function CardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
