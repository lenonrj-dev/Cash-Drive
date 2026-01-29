import { api } from "./http";
import type { ApiResponse } from "../types/api";

export type DashboardSummary = {
  balance: number;
  income: number;
  expense: number;
  goalsMissing: number;
  billsMissing: number;
};

export function getDashboardSummary(): Promise<ApiResponse<DashboardSummary>> {
  return api<DashboardSummary>("/dashboard/summary", { method: "GET" });
}
