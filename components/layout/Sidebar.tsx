/* frontend/components/layout/Sidebar.tsx */
import Link from "next/link";
import AccessBadge from "./AccessBadge";
import { appNavItems } from "../../lib/appNavigation";

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
          {appNavItems.map((it) => {
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
