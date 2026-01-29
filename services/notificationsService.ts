/* frontend/services/notificationsService.ts */
import { api } from "./http";
import type { ApiResponse, AppNotification } from "../types/api";

export function listNotifications(): Promise<ApiResponse<AppNotification[]>> {
  return api<AppNotification[]>("/notifications", { method: "GET" });
}

export function markNotificationRead(id: string) {
  return api<AppNotification>(`/notifications/${id}/read`, { method: "PATCH" });
}
