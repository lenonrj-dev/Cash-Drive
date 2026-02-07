/* frontend/components/pages/notifications/NotificationsView.tsx */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import { listNotifications, markNotificationRead, markAllNotificationsRead } from "../../../services/notificationsService";
import type { AppNotification } from "../../../types/api";
import { formatDateShort } from "../../../lib/format";

const SAVED_KEY = "rotafin:savedNotifications";

export default function NotificationsView() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | "unread" | "saved">("all");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(SAVED_KEY) : null;
      const parsed = raw ? JSON.parse(raw) : [];
      setSavedIds(Array.isArray(parsed) ? parsed : []);
    } catch {
      setSavedIds([]);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await listNotifications();
        if (!alive) return;
        setItems(Array.isArray(res?.items) ? res.items : []);
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
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const savedSet = useMemo(() => new Set(savedIds), [savedIds]);
  const unreadCount = useMemo(() => items.filter((n) => !n.read).length, [items]);
  const savedCount = useMemo(() => items.filter((n) => savedSet.has(n.id)).length, [items, savedSet]);

  const visibleItems = useMemo(() => {
    if (tab === "unread") return items.filter((n) => !n.read);
    if (tab === "saved") return items.filter((n) => savedSet.has(n.id));
    return items;
  }, [items, tab, savedSet]);

  async function markRead(id: string) {
    try {
      await markNotificationRead(id);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      setToast("Notificação marcada como lida.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível atualizar a notificação.";
      setError(message);
    }
  }

  async function markAllRead() {
    const targets = items.filter((n) => !n.read);
    if (targets.length === 0) {
      setToast("Tudo certo: não há notificações não lidas.");
      return;
    }

    try {
      setError(null);
      await markAllNotificationsRead();
      setItems((prev) => prev.map((n) => ({ ...n, read: true })));
      setToast("Todas as notificações foram marcadas como lidas.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível marcar todas como lidas.";
      setError(message);
    }
  }

  function persistSaved(next: string[]) {
    setSavedIds(next);
    try {
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }

  function toggleSave(id: string) {
    const has = savedSet.has(id);
    const next = has ? savedIds.filter((x) => x !== id) : [id, ...savedIds];
    persistSaved(next);
    setToast(has ? "Notificação removida dos salvos." : "Notificação salva.");
  }

  async function copyNotification(n: AppNotification) {
    const text = `${n.title}\n\n${n.body}\n\n${formatDateShort(n.createdAt)}`;
    try {
      await navigator.clipboard.writeText(text);
      setToast("Notificação copiada.");
    } catch {
      setToast("Não foi possível copiar agora.");
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Central</p>
            <h1 className="mt-2 text-lg font-bold text-zinc-900">Notificações</h1>
            <p className="mt-1 text-sm text-zinc-600">
              Alertas de metas, contas, vencimentos e parabenizações — com ações rápidas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            <div className="inline-flex rounded-full border border-zinc-200/80 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setTab("all")}
                className={[
                  "h-9 rounded-full px-3 text-sm font-semibold transition focus:outline-none",
                  tab === "all" ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
                ].join(" ")}
                aria-label="Ver todas"
              >
                Todas
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{items.length}</span>
              </button>
              <button
                type="button"
                onClick={() => setTab("unread")}
                className={[
                  "h-9 rounded-full px-3 text-sm font-semibold transition focus:outline-none",
                  tab === "unread" ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
                ].join(" ")}
                aria-label="Ver não lidas"
              >
                Não lidas
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{unreadCount}</span>
              </button>
              <button
                type="button"
                onClick={() => setTab("saved")}
                className={[
                  "h-9 rounded-full px-3 text-sm font-semibold transition focus:outline-none",
                  tab === "saved" ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
                ].join(" ")}
                aria-label="Ver salvas"
              >
                Salvas
                <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">{savedCount}</span>
              </button>
            </div>

            <Button size="sm" variant="secondary" onClick={markAllRead} disabled={loading || items.length === 0}>
              Marcar tudo como lido
            </Button>

            <Link href="/suporte">
              <Button size="sm" variant="ghost">
                Falar com suporte
              </Button>
            </Link>
          </div>
        </div>

        {toast ? (
          <div className="mt-4 rounded-2xl border border-teal-200/70 bg-teal-50/60 px-4 py-3 text-sm font-semibold text-teal-700">
            {toast}
          </div>
        ) : null}
      </Card>

      {error ? <Alert message={error} /> : null}

      <Card>
        {loading ? (
          <p className="text-sm text-zinc-600">Carregando...</p>
        ) : visibleItems.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm font-semibold text-zinc-900">Nenhuma notificação por aqui.</p>
            <p className="mt-1 text-sm text-zinc-600">
              Ajuste os filtros acima ou volte mais tarde — novos alertas aparecerão automaticamente.
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <Link href="/metas">
                <Button size="sm" variant="secondary">
                  Ver metas
                </Button>
              </Link>
              <Link href="/contas">
                <Button size="sm" variant="secondary">
                  Ver contas
                </Button>
              </Link>
              <Link href="/suporte">
                <Button size="sm">Suporte</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleItems.map((n) => {
              const isSaved = savedSet.has(n.id);

              return (
                <div
                  key={n.id}
                  className={[
                    "rounded-2xl border p-4 transition",
                    n.read ? "border-zinc-200/70 bg-white/70" : "border-teal-200/70 bg-teal-50/60"
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-zinc-900">{n.title}</p>
                      <p className="mt-1 text-sm text-zinc-600">{n.body}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <p className="text-xs text-zinc-500">{formatDateShort(n.createdAt)}</p>
                        {n.tag ? <Badge>{n.tag}</Badge> : null}
                        {isSaved ? <Badge>Salva</Badge> : null}
                        {!n.read ? <Badge>Nova</Badge> : null}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {!n.read ? (
                        <Button size="sm" variant="secondary" onClick={() => markRead(n.id)}>
                          Marcar como lida
                        </Button>
                      ) : (
                        <span className="text-xs font-semibold text-zinc-500">Lida</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleSave(n.id)}
                      className={[
                        "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                        isSaved
                          ? "border-teal-200/70 bg-teal-50 text-teal-700 hover:bg-teal-100/60"
                          : "border-zinc-200/80 bg-white text-zinc-700 hover:bg-zinc-50"
                      ].join(" ")}
                      aria-label={isSaved ? "Remover dos salvos" : "Salvar notificação"}
                    >
                      <BookmarkIcon />
                      {isSaved ? "Salva" : "Salvar"}
                    </button>

                    <button
                      type="button"
                      onClick={() => copyNotification(n)}
                      className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-label="Copiar notificação"
                    >
                      <CopyIcon />
                      Copiar
                    </button>

                    <Link
                      href={`/suporte?ref=notificacoes&id=${encodeURIComponent(n.id)}`}
                      className="inline-flex"
                    >
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        aria-label="Entrar em contato com suporte"
                      >
                        <LifeBuoyIcon />
                        Suporte
                      </button>
                    </Link>

                    <Link href="/notificacoes" className="inline-flex">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                        aria-label="Abrir central de notificações"
                      >
                        <ExternalIcon />
                        Abrir central
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

function BookmarkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
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
