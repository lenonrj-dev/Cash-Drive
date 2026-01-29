/* frontend/services/notificationsService.ts */
import { api } from "./http";
import type { AppNotification } from "../types/api";

export async function listNotifications(): Promise<{ items: AppNotification[] }> {
  const res = await api<AppNotification[]>("/notifications", { method: "GET" });
  if (!res.ok) return { items: [] };
  return { items: Array.isArray(res.data) ? res.data : [] };
}

export async function markNotificationRead(id: string): Promise<AppNotification> {
  const res = await api<AppNotification>(`/notifications/${id}/read`, { method: "PATCH" });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
