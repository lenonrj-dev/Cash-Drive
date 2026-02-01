/* frontend/services/goalsService.ts */
import { api } from "./http";
import type { Goal, GoalInput } from "../types/api";

export async function listGoals(): Promise<{ items: Goal[] }> {
  const res = await api<any>("/goals", { method: "GET" });
  if (!res.ok) return { items: [] };
  const data = res.data;
  if (Array.isArray(data)) return { items: data };
  if (Array.isArray(data?.items)) return { items: data.items };
  return { items: [] };
}

export async function createGoal(payload: GoalInput): Promise<Goal> {
  const res = await api<Goal>("/goals", { method: "POST", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function updateGoal(id: string, payload: Partial<GoalInput>): Promise<Goal> {
  const res = await api<Goal>(`/goals/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function deleteGoal(id: string): Promise<{ id: string }> {
  const res = await api<{ id: string }>(`/goals/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
