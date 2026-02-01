/* frontend/components/layout/MobileNav.tsx */
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { appNavItems, primaryNavItems } from "../../lib/appNavigation";

export default function MobileNav({ currentPath }: { currentPath: string }) {
  const primary = useMemo(() => primaryNavItems(), []);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setVisible(true);
    lastActiveRef.current = (document.activeElement as HTMLElement) || null;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      setTimeout(() => lastActiveRef.current?.focus?.(), 0);
    };
  }, [open]);

  function closeSheet() {
    setVisible(false);
    setTimeout(() => setOpen(false), 200);
  }

  const isActive = (href: string) => currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <>
      <nav
        className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/70 bg-white/90 backdrop-blur lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex items-center justify-around px-2 py-2">
          {primary.map((it) => {
            const active = isActive(it.href);
            const Icon = it.icon;
            return (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  "flex min-w-[68px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-semibold transition",
                  active ? "bg-teal-50 text-teal-700" : "text-zinc-600 hover:bg-zinc-100"
                ].join(" ")}
              >
                <Icon />
                <span>{it.label}</span>
              </Link>
            );
          })}

          <button
            type="button"
            aria-label="Abrir menu completo"
            onClick={() => setOpen(true)}
            className={[
              "flex min-w-[68px] flex-col items-center gap-1 rounded-xl px-3 py-2 text-[11px] font-semibold transition",
              open ? "bg-teal-50 text-teal-700" : "text-zinc-600 hover:bg-zinc-100"
            ].join(" ")}
          >
            <MenuIcon />
            <span>Menu</span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={closeSheet}
            className={["absolute inset-0 bg-zinc-900/40 backdrop-blur-[2px] transition-opacity duration-200", visible ? "opacity-100" : "opacity-0"].join(" ")}
          />

          <div className="absolute inset-x-0 bottom-0">
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Menu completo"
              className={[
                "mx-auto w-full rounded-t-3xl border border-zinc-200/70 bg-white shadow-2xl transition-transform duration-200",
                visible ? "translate-y-0" : "translate-y-6"
              ].join(" ")}
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Menu</p>
                  <h2 className="mt-1 text-base font-bold text-zinc-900">Tudo em um so lugar</h2>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeSheet}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  aria-label="Fechar"
                >
                  <XIcon />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-4 pb-4">
                <div className="grid gap-2">
                  {appNavItems.map((it) => {
                    const active = isActive(it.href);
                    const Icon = it.icon;
                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        onClick={closeSheet}
                        className={[
                          "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                          active
                            ? "border-teal-200 bg-teal-50 text-teal-700"
                            : "border-zinc-200/70 bg-white text-zinc-700 hover:bg-zinc-50"
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "inline-flex h-9 w-9 items-center justify-center rounded-full border",
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
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
