/* frontend/services/billsService.ts */
import { api } from "./http";
import type { ApiResponse, Bill, BillInput } from "../types/api";

export function listBills(): Promise<ApiResponse<Bill[]>> {
  return api<Bill[]>("/bills", { method: "GET" });
}

export function createBill(payload: BillInput) {
  return api<Bill>("/bills", { method: "POST", body: payload });
}

export function updateBill(id: string, payload: Partial<BillInput>) {
  return api<Bill>(`/bills/${id}`, { method: "PATCH", body: payload });
}

export function deleteBill(id: string) {
  return api<{ id: string }>(`/bills/${id}`, { method: "DELETE" });
}
