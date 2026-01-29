/* frontend/services/transactionsService.ts */
import { api } from "./http";
import type { ApiResponse, Transaction, TransactionInput } from "../types/api";
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

export function listTransactions(filters?: ListFilters): Promise<ApiResponse<Transaction[]>> {
  return api<Transaction[]>(`/transactions${buildQuery(filters)}`, { method: "GET" });
}

export function createTransaction(payload: TransactionInput) {
  return api<Transaction>("/transactions", { method: "POST", body: payload });
}

export function updateTransaction(id: string, payload: Partial<TransactionInput>) {
  return api<Transaction>(`/transactions/${id}`, { method: "PATCH", body: payload });
}

export function deleteTransaction(id: string) {
  return api<{ id: string }>(`/transactions/${id}`, { method: "DELETE" });
}
