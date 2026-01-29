/* frontend/services/assistantService.ts */
import { api } from "./http";
import type { ApiResponse, AssistantParseResponse, TransactionInput, Transaction } from "../types/api";

export function parseAssistant(text: string): Promise<ApiResponse<AssistantParseResponse>> {
  return api<AssistantParseResponse>("/assistant/parse", { method: "POST", body: { text } });
}

export function confirmAssistant(transaction: TransactionInput): Promise<ApiResponse<Transaction>> {
  return api<Transaction>("/assistant/confirm", { method: "POST", body: { transaction } });
}
