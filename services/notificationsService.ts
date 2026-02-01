/* frontend/services/notificationsService.ts */
import { api } from "./http";
import type { AppNotification } from "../types/api";

export async function listNotifications(): Promise<{ items: AppNotification[] }> {
  const res = await api<any>("/notifications", { method: "GET" });
  if (!res.ok) return { items: [] };
  const data = res.data;
  if (Array.isArray(data)) return { items: data };
  if (Array.isArray(data?.items)) return { items: data.items };
  return { items: [] };
}

export async function markNotificationRead(id: string): Promise<AppNotification> {
  const res = await api<AppNotification>(`/notifications/${id}/read`, { method: "PATCH" });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function markAllNotificationsRead(): Promise<{ ok: boolean }> {
  const res = await api<{ ok: boolean }>("/notifications/read-all", { method: "POST" });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
