import { api } from "./http";

export type DashboardSummary = {
  balance: number;
  income: number;
  expense: number;
  goalsMissing: number;
  billsMissing: number;
};

const DEFAULT_SUMMARY: DashboardSummary = {
  balance: 0,
  income: 0,
  expense: 0,
  goalsMissing: 0,
  billsMissing: 0,
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const res = await api<DashboardSummary>("/dashboard/summary", { method: "GET" });
  if (!res.ok) return DEFAULT_SUMMARY;
  return {
    balance: res.data?.balance ?? 0,
    income: res.data?.income ?? 0,
    expense: res.data?.expense ?? 0,
    goalsMissing: res.data?.goalsMissing ?? 0,
    billsMissing: res.data?.billsMissing ?? 0,
  };
}
