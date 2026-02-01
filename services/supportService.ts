/* frontend/services/supportService.ts */
import { api } from "./http";

export type SupportPriority = "baixa" | "normal" | "alta";

export type SupportTicketPayload = {
  message: string;
  subject?: string;
  topic?: string;
  priority?: SupportPriority;
  page?: string;
  user?: {
    name?: string;
    email?: string;
  };
  meta?: {
    userAgent?: string;
    locale?: string;
    timezone?: string;
  };
};

export type SupportTicketResponse = {
  ok: boolean;
  ticketId?: string;
  protocol?: string;
  createdAt?: string;
  received?: {
    topic: string;
    priority: SupportPriority;
  };
  error?: string;
};

export type SupportTicketItem = {
  id: string;
  protocol?: string;
  subject?: string;
  topic?: string;
  status: "open" | "pending" | "solved";
  priority: SupportPriority;
  lastMessageAt: string;
  createdAt: string;
};

export type SupportMessage = {
  id: string;
  from: "user" | "agent" | "system";
  text: string;
  createdAt: string;
};

const BASE = "/app/support";

export async function createSupportTicket(payload: SupportTicketPayload): Promise<SupportTicketResponse> {
  const message = (payload?.message || "").trim();
  if (message.length < 2) {
    return { ok: false, error: "Mensagem inválida." };
  }

  const res = await api<{ ticketId: string; protocol: string; createdAt: string; received: { topic: string; priority: SupportPriority } }>(
    `${BASE}/tickets`,
    {
      method: "POST",
      body: JSON.stringify(payload)
    }
  );

  if (!res.ok) {
    return { ok: false, error: res.error.message };
  }

  return {
    ok: true,
    ticketId: res.data?.ticketId,
    protocol: res.data?.protocol,
    createdAt: res.data?.createdAt,
    received: res.data?.received
  };
}

export async function listSupportTickets(): Promise<{ items: SupportTicketItem[] }> {
  const res = await api<any>(`${BASE}/tickets`, { method: "GET" });
  if (!res.ok) return { items: [] };
  const data = res.data;
  if (Array.isArray(data)) return { items: data };
  if (Array.isArray(data?.items)) return { items: data.items };
  return { items: [] };
}

export async function getSupportTicket(id: string) {
  const res = await api<any>(`${BASE}/tickets/${id}`, { method: "GET" });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function listSupportMessages(id: string): Promise<{ items: SupportMessage[] }> {
  const res = await api<{ items: SupportMessage[] }>(`${BASE}/tickets/${id}/messages`, { method: "GET" });
  if (!res.ok) return { items: [] };
  return res.data ?? { items: [] };
}

export async function sendSupportMessage(id: string, message: string) {
  const res = await api<SupportMessage>(`${BASE}/tickets/${id}/messages`, {
    method: "POST",
    body: JSON.stringify({ message })
  });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
