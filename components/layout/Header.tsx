/* frontend/components/layout/Header.tsx */
"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { routes } from "../../lib/routes";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import { listNotifications, markNotificationRead } from "../../services/notificationsService";
import type { AppNotification } from "../../types/api";
import { formatDateShort } from "../../lib/format";

export default function Header({
  title,
  status,
  canWrite
}: {
  title: string;
  status: string;
  canWrite: boolean;
}) {
  const auth = useContext(AuthContext);
  const userName = useMemo(
    () => auth?.user?.name?.split(" ")[0] || "Motorista",
    [auth?.user?.name]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await listNotifications();
        if (!alive) return;
        const items = Array.isArray(res?.items) ? res.items : [];
        setUnreadCount(items.filter((n) => !n.read).length);
      } catch {
        // silencioso: não travar o header por causa disso
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/80 backdrop-blur">
      <div className="flex flex-col gap-3 px-4 py-4 lg:flex-row lg:items-center lg:justify-between lg:px-10 2xl:px-14">
        <div>
          <p className="text-sm font-semibold text-teal-600">Bem-vindo, {userName}</p>
          <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
        </div>

        <div className="flex flex-1 items-center gap-3 lg:justify-end">
          <div className="relative hidden w-full max-w-xs lg:block">
            <input
              aria-label="Buscar"
              placeholder="Buscar no painel"
              className="h-11 w-full rounded-full border border-zinc-200/80 bg-white/90 px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon />
            </span>
          </div>

          <button
            type="button"
            aria-label="Abrir notificações"
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-600 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
          >
            <BellIcon />
            {unreadCount > 0 ? <NotificationsDot /> : null}
          </button>

          <Badge>{labelStatus(status)}</Badge>

          {!canWrite ? (
            <Link href={routes.app.planos}>
              <Button size="sm">Ativar plano</Button>
            </Link>
          ) : null}

          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-2 py-1 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 lg:flex"
            aria-label="Perfil"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-xs font-bold text-white">
              {userName.slice(0, 2).toUpperCase()}
            </span>
            {userName}
          </button>

          <Button size="sm" variant="ghost" onClick={() => auth?.logout()} aria-label="Sair da conta">
            Sair
          </Button>
        </div>
      </div>

      <NotificationsModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        canWrite={canWrite}
        onUnreadCountChange={(count) => setUnreadCount(count)}
      />
    </header>
  );
}

function NotificationsModal({
  open,
  onClose,
  canWrite,
  onUnreadCountChange
}: {
  open: boolean;
  onClose: () => void;
  canWrite: boolean;
  onUnreadCountChange: (count: number) => void;
}) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastActiveRef = useRef<HTMLElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"unread" | "all">("unread");

  const unread = useMemo(() => items.filter((n) => !n.read), [items]);
  const visible = tab === "unread" ? unread : items;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    onUnreadCountChange(unread.length);
  }, [unread.length, onUnreadCountChange]);

  useEffect(() => {
    if (!open) return;

    lastActiveRef.current = (document.activeElement as HTMLElement) || null;

    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;

    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    setTimeout(() => closeBtnRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
      setTimeout(() => lastActiveRef.current?.focus?.(), 0);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await listNotifications();
        if (!alive) return;
        const list = Array.isArray(res?.items) ? res.items : [];
        setItems(list);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Não foi possível carregar as notificações.";
        setError(message);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [open]);

  async function markRead(id: string) {
    if (!canWrite) return;
    try {
      await markNotificationRead(id);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível atualizar a notificação.";
      setError(message);
    }
  }

  async function markAllRead() {
    if (!canWrite) return;
    const targets = items.filter((n) => !n.read).map((n) => n.id);
    if (targets.length === 0) return;

    try {
      setError(null);
      for (const id of targets) {
        await markNotificationRead(id);
      }
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível marcar todas como lidas.";
      setError(message);
    }
  }

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] isolate">
      <button
        type="button"
        aria-label="Fechar notificações"
        className="absolute inset-0 bg-zinc-900/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 w-[min(92vw,520px)]">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Central de notificações"
          className="flex h-full flex-col border-l border-zinc-200/70 bg-white shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3 border-b border-zinc-200/70 px-5 py-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Central</p>
              <h2 className="mt-1 truncate text-lg font-bold text-zinc-900">Notificações</h2>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-200/80 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Fechar"
            >
              <XIcon />
            </button>
          </div>

          <div className="px-5 pt-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex w-full items-center justify-between gap-3">
                <div className="flex w-full items-center gap-2 overflow-x-auto rounded-full border border-zinc-200/80 bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    onClick={() => setTab("unread")}
                    className={[
                      "h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition focus:outline-none",
                      tab === "unread" ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
                    ].join(" ")}
                    aria-label="Ver não lidas"
                  >
                    Não lidas
                    <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{unread.length}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTab("all")}
                    className={[
                      "h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition focus:outline-none",
                      tab === "all" ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
                    ].join(" ")}
                    aria-label="Ver todas"
                  >
                    Todas
                    <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{items.length}</span>
                  </button>
                </div>

                <div className="hidden items-center gap-2 lg:flex">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={markAllRead}
                    disabled={!canWrite || items.length === 0}
                  >
                    Marcar tudo como lido
                  </Button>

                  <Link href="/notificacoes" onClick={onClose}>
                    <Button size="sm" variant="ghost">
                      Ver central
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:hidden">
                <Button size="sm" variant="secondary" onClick={markAllRead} disabled={!canWrite || items.length === 0}>
                  Marcar tudo como lido
                </Button>

                <Link href="/notificacoes" onClick={onClose}>
                  <Button size="sm" variant="ghost">
                    Ver central
                  </Button>
                </Link>
              </div>
            </div>

            {!canWrite ? (
              <div className="mt-3">
                <Alert message="Seu plano ainda não está ativo. Você pode visualizar as notificações, mas não consegue executar ações." />
              </div>
            ) : null}

            {error ? (
              <div className="mt-3">
                <Alert message={error} />
              </div>
            ) : null}
          </div>

          <div className="mt-4 flex-1 overflow-y-auto px-5 pb-5">
            {loading ? (
              <div className="space-y-3">
                <div className="h-20 rounded-2xl border border-zinc-200/70 bg-zinc-50" />
                <div className="h-20 rounded-2xl border border-zinc-200/70 bg-zinc-50" />
                <div className="h-20 rounded-2xl border border-zinc-200/70 bg-zinc-50" />
              </div>
            ) : visible.length === 0 ? (
              <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 text-center">
                <p className="text-sm font-semibold text-zinc-900">Sem notificações aqui.</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Quando houver alertas de metas, contas ou novidades, eles aparecerão neste painel.
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Link href="/suporte" onClick={onClose}>
                    <Button size="sm" variant="secondary">
                      Falar com suporte
                    </Button>
                  </Link>
                  <Link href="/notificacoes" onClick={onClose}>
                    <Button size="sm">Abrir central</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {visible.slice(0, 12).map((n) => (
                  <div
                    key={n.id}
                    className={[
                      "rounded-2xl border p-4 transition",
                      n.read ? "border-zinc-200/70 bg-white" : "border-teal-200/70 bg-teal-50/60"
                    ].join(" ")}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-zinc-900">{n.title}</p>
                        <p className="mt-1 text-sm text-zinc-600">{n.body}</p>
                        <p className="mt-2 text-xs text-zinc-500">{formatDateShort(n.createdAt)}</p>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-2">
                        {n.tag ? <Badge>{n.tag}</Badge> : null}

                        {!n.read ? (
                          <Button size="sm" variant="secondary" onClick={() => markRead(n.id)} disabled={!canWrite}>
                            Marcar como lida
                          </Button>
                        ) : (
                          <span className="text-xs font-semibold text-zinc-500">Lida</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Link href="/suporte" onClick={onClose} className="inline-flex">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
                          aria-label="Falar com suporte"
                        >
                          <LifeBuoyIcon />
                          Suporte
                        </button>
                      </Link>

                      <Link href="/notificacoes" onClick={onClose} className="inline-flex">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
                          aria-label="Abrir central de notificações"
                        >
                          <ExternalIcon />
                          Abrir na central
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}

                {visible.length > 12 ? (
                  <div className="pt-1 text-center">
                    <Link href="/notificacoes" onClick={onClose}>
                      <Button size="sm" variant="ghost">
                        Ver todas na central
                      </Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="border-t border-zinc-200/70 bg-white px-5 py-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-zinc-500">
                Dica: mantenha seu plano ativo para executar ações e receber alertas completos.
              </p>
              <Link href={routes.app.planos} onClick={onClose} className="shrink-0">
                <Button size="sm">Ver planos</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function labelStatus(status: string) {
  if (status === "trialing") return "Trial ativo";
  if (status === "active") return "Plano ativo";
  if (status === "past_due") return "Pagamento pendente";
  if (status === "canceled") return "Cancelado";
  if (status === "expired") return "Expirado";
  return "Sem plano";
}

function NotificationsDot() {
  return <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-teal-500" />;
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
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

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
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

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 3h7v7" />
      <path d="M10 14L21 3" />
      <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
