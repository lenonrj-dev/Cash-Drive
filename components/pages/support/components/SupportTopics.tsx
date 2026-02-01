/* frontend/components/pages/support/components/SupportTopics.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import { SUPPORT_TOPICS } from "../supportData";

export default function SupportTopics() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Ajuda</p>
          <h2 className="mt-2 text-base font-bold text-zinc-900">Assuntos comuns</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Use os atalhos para resolver rápido, ou mande mensagem no chat com o assunto selecionado.
          </p>
        </div>
        <Badge>Atalhos</Badge>
      </div>

      <div className="mt-4 space-y-3">
        {SUPPORT_TOPICS.map((t) => (
          <div key={t.key} className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-zinc-900">{t.label}</p>
                <p className="mt-1 text-sm text-zinc-600">{t.description}</p>
              </div>
              {t.tag ? <Badge>{t.tag}</Badge> : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {t.ctaHref ? (
                <Link href={t.ctaHref} className="inline-flex">
                  <Button size="sm" variant="secondary">
                    {t.ctaLabel || "Abrir"}
                  </Button>
                </Link>
              ) : null}

              <Link href="/configuracoes" className="inline-flex">
                <Button size="sm" variant="ghost">
                  Ver configurações
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
