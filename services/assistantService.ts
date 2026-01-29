/* frontend/services/assistantService.ts */
import { api } from "./http";
import type { AssistantParseResponse, TransactionInput, Transaction } from "../types/api";

export async function parseAssistant(text: string): Promise<AssistantParseResponse> {
  const res = await api<AssistantParseResponse>("/assistant/parse", {
    method: "POST",
    body: JSON.stringify({ text }),
  });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}

export async function confirmAssistant(transaction: TransactionInput): Promise<Transaction> {
  const res = await api<Transaction>("/assistant/confirm", {
    method: "POST",
    body: JSON.stringify({ transaction }),
  });
  if (!res.ok) throw new Error(res.error.message);
  return res.data;
}
