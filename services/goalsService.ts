/* frontend/services/goalsService.ts */
import { api } from "./http";
import type { ApiResponse, Goal, GoalInput } from "../types/api";

export function listGoals(): Promise<ApiResponse<Goal[]>> {
  return api<Goal[]>("/goals", { method: "GET" });
}

export function createGoal(payload: GoalInput) {
  return api<Goal>("/goals", { method: "POST", body: payload });
}

export function updateGoal(id: string, payload: Partial<GoalInput>) {
  return api<Goal>(`/goals/${id}`, { method: "PATCH", body: payload });
}

export function deleteGoal(id: string) {
  return api<{ id: string }>(`/goals/${id}`, { method: "DELETE" });
}
