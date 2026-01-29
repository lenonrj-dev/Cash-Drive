/* frontend/components/pages/notifications/NotificationsView.tsx */
"use client";

import React, { useEffect, useState } from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import { listNotifications, markNotificationRead } from "../../../services/notificationsService";
import type { AppNotification } from "../../../types/api";
import { formatDateShort } from "../../../lib/format";

export default function NotificationsView() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      const res = await listNotifications();
      if (!alive) return;
      setItems(res.items);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  async function markRead(id: string) {
    try {
      await markNotificationRead(id);
      setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel atualizar";
      setError(message);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Central</p>
        <h1 className="mt-2 text-lg font-bold text-zinc-900">Notificacoes</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Alertas de metas, contas e parabens.
        </p>
      </Card>

      {error ? <Alert message={error} /> : null}

      <Card>
        {loading ? (
          <p className="text-sm text-zinc-600">Carregando...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-zinc-600">Nenhuma notificacao.</p>
        ) : (
          <div className="space-y-3">
            {items.map((n) => (
              <div
                key={n.id}
                className={[
                  "rounded-2xl border p-4 transition",
                  n.read
                    ? "border-zinc-200/70 bg-white/70"
                    : "border-teal-200/70 bg-teal-50/60"
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-zinc-900">{n.title}</p>
                    <p className="mt-1 text-sm text-zinc-600">{n.body}</p>
                    <p className="mt-2 text-xs text-zinc-500">
                      {formatDateShort(n.createdAt)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {n.tag ? <Badge>{n.tag}</Badge> : null}
                    {!n.read ? (
                      <Button size="sm" variant="secondary" onClick={() => markRead(n.id)}>
                        Marcar como lida
                      </Button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
