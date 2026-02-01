/* frontend/services/transactionsService.ts */
import { api } from "./http";
import type { Transaction, TransactionInput } from "../types/api";
import type { TransactionType } from "../types/common";

type ListFilters = {
  from?: string;
  to?: string;
  type?: TransactionType;
  search?: string;
};

function buildQuery(filters?: ListFilters) {
  if (!filters) return "";
  const params = new URLSearchParams();
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.type) params.set("type", filters.type);
  if (filters.search) params.set("search", filters.search);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function listTransactions(filters?: ListFilters): Promise<{ items: Transaction[] }> {
  const res = await api<any>(`/transactions${buildQuery(filters)}`, { method: "GET" });
  if (!res.ok) return { items: [] };
  const data = res.data;
  if (Array.isArray(data)) return { items: data };
  if (Array.isArray(data?.items)) return { items: data.items };
  return { items: [] };
}

export async function createTransaction(payload: TransactionInput): Promise<Transaction> {
  const idempotencyKey =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const res = await api<Transaction>("/transactions", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Idempotency-Key": idempotencyKey
    }
  });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function updateTransaction(
  id: string,
  payload: Partial<TransactionInput>
): Promise<Transaction> {
  const res = await api<Transaction>(`/transactions/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function deleteTransaction(id: string): Promise<{ id: string }> {
  const res = await api<{ id: string }>(`/transactions/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
