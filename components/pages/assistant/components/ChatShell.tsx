/* frontend/components/pages/assistant/components/ChatShell.tsx */
"use client";

import React, { useMemo, useState } from "react";
import Card from "../../../ui/Card";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";
import { parseAssistant, confirmAssistant } from "../../../../services/assistantService";
import type { TransactionInput } from "../../../../types/api";
import { formatCurrencyBRL, formatDateShort } from "../../../../lib/format";

type Msg = { id: string; role: "user" | "assistant"; text: string };

export default function ChatShell({ canWrite }: { canWrite: boolean }) {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      role: "assistant",
      text: "Oi! Me diga algo como: 'Entrada 120 Uber hoje' ou 'Saida 50 gasolina ontem'."
    }
  ]);
  const [text, setText] = useState("");
  const [pending, setPending] = useState<TransactionInput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => text.trim().length > 0 && canWrite && !loading, [text, canWrite, loading]);

  async function send() {
    if (!canSend) return;
    setError(null);

    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", text: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setText("");

    setLoading(true);
    try {
      const res = await parseAssistant(userMsg.text);
      setPending(res.transaction);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: `Proposta: ${formatProposal(res.transaction)}. Confirma?`
        }
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel interpretar";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Nao consegui interpretar. Tente novamente com valor e tipo."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function confirm() {
    if (!pending) return;
    setError(null);
    setLoading(true);
    try {
      await confirmAssistant(pending);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: "Lancamento confirmado e salvo!"
        }
      ]);
      setPending(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel confirmar";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function cancel() {
    setPending(null);
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        text: "Tudo bem, cancelado."
      }
    ]);
  }

  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Assistente</p>
        <h2 className="mt-2 text-lg font-bold text-zinc-900">Assistente Cash</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Registre lancamentos por texto. Sempre confirma antes de salvar.
        </p>
      </Card>

      {error ? <Alert message={error} /> : null}

      <Card className="p-0">
        <div className="max-h-[55dvh] space-y-3 overflow-auto p-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={[
                "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                m.role === "user"
                  ? "ml-auto bg-teal-600 text-white"
                  : "bg-zinc-100 text-zinc-900"
              ].join(" ")}
            >
              {m.text}
            </div>
          ))}
        </div>

        {pending ? (
          <div className="border-t border-zinc-200/70 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-zinc-700">Confirmar proposta?</div>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={loading} onClick={cancel}>
                  Cancelar
                </Button>
                <Button disabled={loading} onClick={confirm}>
                  {loading ? "Salvando..." : "Confirmar"}
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        <div className="border-t border-zinc-200/70 p-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                label="Mensagem"
                placeholder="Ex.: Entrada 120 Uber hoje"
                value={text}
                onChange={(e) => setText(e.target.value)}
                disabled={!canWrite || loading}
              />
            </div>
            <div className="pt-6">
              <Button disabled={!canSend} onClick={send}>
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </div>
          {!canWrite ? (
            <p className="mt-2 text-xs text-zinc-500">
              Modo leitura: ative um plano para usar o assistente.
            </p>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

function formatProposal(tx: TransactionInput) {
  const type = tx.type === "INCOME" ? "Entrada" : "Saida";
  const date = formatDateShort(tx.date);
  const category = tx.category ? `, ${tx.category}` : "";
  return `${type} ${formatCurrencyBRL(tx.amountCents)}${category} em ${date}`;
}
