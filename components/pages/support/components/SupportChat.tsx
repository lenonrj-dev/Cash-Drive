/* frontend/components/pages/support/components/SupportChat.tsx */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Button from "../../../ui/Button";
import Badge from "../../../ui/Badge";
import Alert from "../../../ui/Alert";

import {
  createSupportTicket,
  listSupportTickets,
  listSupportMessages,
  sendSupportMessage,
  type SupportTicketItem,
  type SupportMessage
} from "../../../../services/supportService";
import { SUPPORT_TOPICS } from "../supportData";

export default function SupportChat({ userName, userEmail }: { userName: string; userEmail: string }) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const stickToBottom = useRef(true);

  const [topic, setTopic] = useState(SUPPORT_TOPICS[0]?.key || "geral");
  const [priority, setPriority] = useState<"baixa" | "normal" | "alta">("normal");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [tickets, setTickets] = useState<SupportTicketItem[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const topicLabel = useMemo(() => {
    const t = SUPPORT_TOPICS.find((x) => x.key === topic);
    return t?.label || "Geral";
  }, [topic]);

  useEffect(() => {
    let mounted = true;
    async function loadTickets() {
      setLoadingTickets(true);
      const res = await listSupportTickets();
      if (!mounted) return;
      setTickets(res.items || []);
      setSelectedId(res.items?.[0]?.id || null);
      setLoadingTickets(false);
    }
    loadTickets();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedId) {
      setMessages([]);
      return;
    }
    const id = selectedId;
    let mounted = true;
    async function loadMessages() {
      setLoadingMessages(true);
      const res = await listSupportMessages(id);
      if (!mounted) return;
      setMessages(res.items || []);
      setLoadingMessages(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
    loadMessages();
    return () => {
      mounted = false;
    };
  }, [selectedId]);

  useEffect(() => {
    if (!selectedId || typeof window === "undefined") return;
    const base = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!base) return;

    const es = new EventSource(`${base}/app/support/tickets/${encodeURIComponent(selectedId)}/stream`, {
      withCredentials: true,
    } as any);

    const onMessage = (evt: MessageEvent) => {
      try {
        const msg = JSON.parse(evt.data);
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
      } catch {
        // ignore
      }
    };

    es.addEventListener("message:new", onMessage as any);
    es.addEventListener("ticket:update", () => {
      listSupportTickets().then((res) => setTickets(res.items || []));
    });

    es.onerror = () => {
      es.close();
    };

    return () => {
      es.close();
    };
  }, [selectedId]);

  useEffect(() => {
    if (stickToBottom.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  function onScroll() {
    const el = listRef.current;
    if (!el) return;
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    stickToBottom.current = nearBottom;
  }

  async function createTicket() {
    const msg = text.trim();
    if (!msg || sending) return;

    setSending(true);
    setError(null);

    try {
      const res = await createSupportTicket({
        message: msg,
        subject: subject.trim() || undefined,
        topic,
        priority,
        page: typeof window !== "undefined" ? window.location.pathname : "/suporte",
        user: { name: userName, email: userEmail },
        meta: {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          locale: typeof navigator !== "undefined" ? navigator.language : "pt-BR",
          timezone:
            typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "America/Sao_Paulo",
        },
      });

      if (!res?.ok || !res.ticketId) {
        throw new Error(res?.error || "Não foi possível criar o ticket.");
      }

      setText("");
      setSubject("");
      const list = await listSupportTickets();
      setTickets(list.items || []);
      setSelectedId(res.ticketId);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Não foi possível criar o ticket.";
      setError(message);
    } finally {
      setSending(false);
    }
  }

  async function sendMessage() {
    if (!selectedId) return;
    const msg = text.trim();
    if (!msg || sending) return;
    setSending(true);
    setError(null);
    try {
      const newMsg = await sendSupportMessage(selectedId, msg);
      setMessages((prev) => [...prev, newMsg]);
      setText("");
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    } catch (e) {
      const message = e instanceof Error ? e.message : "Não foi possível enviar sua mensagem.";
      setError(message);
    } finally {
      setSending(false);
    }
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Suporte</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Central de conversas</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Abra um ticket e acompanhe as respostas do time em um chat contínuo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge>Tempo médio: 2h</Badge>
          <Badge>Canal oficial</Badge>
        </div>
      </div>

      {error ? (
        <div className="mt-4">
          <Alert message={error} />
        </div>
      ) : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-[280px_1fr]">
        <div className="space-y-3">
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Seus tickets</div>
            {loadingTickets ? (
              <div className="mt-3 text-sm text-zinc-500">Carregando...</div>
            ) : tickets.length === 0 ? (
              <div className="mt-3 text-sm text-zinc-500">Nenhum ticket ainda.</div>
            ) : (
              <ul className="mt-3 space-y-2">
                {tickets.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(t.id)}
                      className={[
                        "w-full rounded-xl border px-3 py-2 text-left text-sm transition",
                        selectedId === t.id
                          ? "border-teal-300 bg-teal-50/70"
                          : "border-zinc-200/70 bg-white hover:bg-zinc-50",
                      ].join(" ")}
                      aria-label={`Abrir ticket ${t.protocol || t.id}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-zinc-900">{t.subject || "Suporte"}</span>
                        <span className="text-[11px] text-zinc-500">{t.status}</span>
                      </div>
                      <div className="mt-1 text-[11px] text-zinc-500">
                        {t.protocol || t.id}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Atalhos</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {SUPPORT_TOPICS.slice(0, 4).map((t) => (
                <Link key={t.key} href={t.ctaHref || "/dashboard"} className="inline-flex">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    aria-label={t.label}
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-teal-400" />
                    {t.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          {!selectedId ? (
            <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 text-center">
              <p className="text-sm font-semibold text-zinc-900">Abra o primeiro ticket</p>
              <p className="mt-1 text-sm text-zinc-600">
                Envie uma mensagem para iniciar a conversa com o suporte.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                ref={listRef}
                onScroll={onScroll}
                className="h-[360px] overflow-y-auto rounded-2xl border border-zinc-200/70 bg-white p-3"
                aria-live="polite"
              >
                {loadingMessages ? (
                  <div className="text-sm text-zinc-500">Carregando mensagens...</div>
                ) : messages.length === 0 ? (
                  <div className="rounded-2xl border border-zinc-200/70 bg-white p-5 text-center">
                    <p className="text-sm font-semibold text-zinc-900">Sem mensagens ainda.</p>
                    <p className="mt-1 text-sm text-zinc-600">Escreva a primeira mensagem para o suporte.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((m) => (
                      <div key={m.id} className={m.from === "user" ? "flex justify-end" : "flex justify-start"}>
                        <div
                          className={[
                            "max-w-[92%] rounded-2xl border p-3 text-sm shadow-sm",
                            m.from === "user"
                              ? "border-teal-200/70 bg-teal-50/60 text-zinc-900"
                              : m.from === "system"
                                ? "border-zinc-200/70 bg-zinc-50 text-zinc-700"
                                : "border-zinc-200/70 bg-white text-zinc-900",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-zinc-500">
                              {m.from === "user" ? "Você" : m.from === "system" ? "Sistema" : "Suporte"}
                            </span>
                            <span className="text-xs text-zinc-400">{formatTime(m.createdAt)}</span>
                          </div>
                          <p className="mt-2 whitespace-pre-wrap text-zinc-800">{m.text}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className="text-sm font-semibold text-zinc-900">Sua mensagem</label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Descreva o problema/dúvida. Ex.: Ao criar um lançamento, o valor não aparece no saldo..."
                    className="mt-2 h-28 w-full resize-none rounded-2xl border border-zinc-200/70 bg-white/90 p-3 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    aria-label="Mensagem para o suporte"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        selectedId ? sendMessage() : createTicket();
                      }
                    }}
                  />
                  <p className="mt-2 text-xs text-zinc-500">
                    Não envie senhas. Para anexos e prints, mencione que você tem um print e descreva o que ele mostra.
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-semibold text-zinc-900">Assunto</label>
                    <input
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Ex.: Dúvida de cobrança"
                      className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/70 bg-white/90 px-3 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-label="Assunto do ticket"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-900">Categoria</label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/70 bg-white/90 px-3 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-label="Selecionar assunto"
                    >
                      {SUPPORT_TOPICS.map((t) => (
                        <option key={t.key} value={t.key}>
                          {t.label}
                        </option>
                      ))}
                      <option value="geral">Geral</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-zinc-900">Prioridade</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/70 bg-white/90 px-3 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                      aria-label="Selecionar prioridade"
                    >
                      <option value="baixa">Baixa</option>
                      <option value="normal">Normal</option>
                      <option value="alta">Alta</option>
                    </select>
                    <p className="mt-2 text-xs text-zinc-500">Use "Alta" para travas críticas no painel.</p>
                  </div>

                  <div className="pt-1">
                    <Button
                      size="sm"
                      onClick={selectedId ? sendMessage : createTicket}
                      disabled={sending || text.trim().length < 2}
                      aria-label="Enviar mensagem"
                    >
                      {sending ? "Enviando..." : selectedId ? "Enviar" : "Abrir ticket"}
                    </Button>
                    <div className="mt-2">
                      <span className="text-xs font-semibold text-zinc-500">
                        {selectedId ? `Ticket: ${topicLabel}` : "Preencha a mensagem para abrir"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function formatTime(iso: string) {
  if (!iso) return "";
  const safe = iso.replace("T", " ").slice(0, 16);
  return safe;
}
