/* frontend/components/pages/support/components/SupportFaq.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import { SUPPORT_FAQ } from "../supportData";

export default function SupportFaq() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">FAQ</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Dúvidas frequentes</h2>
          <p className="mt-1 text-sm text-zinc-600">Respostas diretas para você resolver sem travar o fluxo.</p>
        </div>
        <Badge>Guia rápido</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {SUPPORT_FAQ.map((it) => (
          <details
            key={it.q}
            className="group rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-zinc-900 focus:outline-none">
              <span className="min-w-0">{it.q}</span>
              <span className="shrink-0 text-zinc-400 transition group-open:rotate-180">
                <ChevronIcon />
              </span>
            </summary>
            <p className="mt-3 text-sm text-zinc-600">{it.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-3 text-xs text-zinc-500">
        Dica: se for um bug visual, envie um print e informe o navegador (Chrome/Edge) e o dispositivo.
      </p>
    </Card>
  );
}

function ChevronIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}
