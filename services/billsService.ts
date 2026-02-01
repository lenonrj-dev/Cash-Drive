/* frontend/services/billsService.ts */
import { api } from "./http";
import type { Bill, BillInput } from "../types/api";

export async function listBills(): Promise<{ items: Bill[] }> {
  const res = await api<any>("/bills", { method: "GET" });
  if (!res.ok) return { items: [] };
  const data = res.data;
  if (Array.isArray(data)) return { items: data };
  if (Array.isArray(data?.items)) return { items: data.items };
  return { items: [] };
}

export async function createBill(payload: BillInput): Promise<Bill> {
  const res = await api<Bill>("/bills", { method: "POST", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function updateBill(id: string, payload: Partial<BillInput>): Promise<Bill> {
  const res = await api<Bill>(`/bills/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function deleteBill(id: string): Promise<{ id: string }> {
  const res = await api<{ id: string }>(`/bills/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
