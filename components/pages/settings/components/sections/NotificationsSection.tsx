/* frontend/components/pages/settings/sections/NotificationsSection.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../../ui/Card";
import Button from "../../../../ui/Button";
import SectionTitle from "../../components/SectionTitle";
import SwitchRow from "../../components/fields/SwitchRow";
import SwitchInline from "../../components/fields/SwitchInline";
import RadioRow from "../../components/fields/RadioRow";

export default function NotificationsSection({
  notifications,
  setNotifications,
  onSave
}: {
  notifications: {
    email: boolean;
    whatsapp: boolean;
    inApp: boolean;
    goals: boolean;
    bills: boolean;
    weeklySummary: boolean;
  };
  setNotifications: React.Dispatch<
    React.SetStateAction<{
      email: boolean;
      whatsapp: boolean;
      inApp: boolean;
      goals: boolean;
      bills: boolean;
      weeklySummary: boolean;
    }>
  >;
  onSave: () => void;
}) {
  return (
    <section id="notificacoes" className="scroll-mt-24">
      <Card>
        <SectionTitle
          kicker="Alertas"
          title="Notificações"
          description="Escolha quais alertas você quer receber e por onde."
          right={
            <div className="flex items-center gap-2">
              <Link href="/notificacoes" className="inline-flex">
                <Button size="sm" variant="ghost">
                  Ver central
                </Button>
              </Link>
              <Button size="sm" variant="secondary" onClick={onSave} aria-label="Salvar notificações">
                Salvar
              </Button>
            </div>
          }
        />

        <div className="mt-4 grid gap-3">
          <SwitchRow
            label="Notificações no app"
            description="Mostra alertas dentro do painel (recomendado)."
            checked={notifications.inApp}
            onChange={(v) => setNotifications((n) => ({ ...n, inApp: v }))}
          />
          <SwitchRow
            label="E-mail"
            description="Receba alertas críticos e resumo semanal."
            checked={notifications.email}
            onChange={(v) => setNotifications((n) => ({ ...n, email: v }))}
          />
          <SwitchRow
            label="WhatsApp"
            description="Fase 2: alertas e confirmações por chat."
            checked={notifications.whatsapp}
            onChange={(v) => setNotifications((n) => ({ ...n, whatsapp: v }))}
            badge="Fase 2"
          />

          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
              <p className="text-sm font-semibold text-zinc-900">Alertas por categoria</p>
              <p className="mt-1 text-sm text-zinc-600">Personalize por metas e contas.</p>
              <div className="mt-3 space-y-3">
                <SwitchInline
                  label="Metas"
                  checked={notifications.goals}
                  onChange={(v) => setNotifications((n) => ({ ...n, goals: v }))}
                />
                <SwitchInline
                  label="Contas e vencimentos"
                  checked={notifications.bills}
                  onChange={(v) => setNotifications((n) => ({ ...n, bills: v }))}
                />
                <SwitchInline
                  label="Resumo semanal"
                  checked={notifications.weeklySummary}
                  onChange={(v) => setNotifications((n) => ({ ...n, weeklySummary: v }))}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
              <p className="text-sm font-semibold text-zinc-900">Frequência</p>
              <p className="mt-1 text-sm text-zinc-600">Evite excesso de alertas.</p>
              <div className="mt-3">
                <div className="grid gap-2">
                  <RadioRow name="freq" defaultChecked label="Imediato" />
                  <RadioRow name="freq" label="Diário (às 18h)" />
                  <RadioRow name="freq" label="Semanal (segunda)" />
                </div>
                <p className="mt-3 text-xs text-zinc-500">Configuração visual (modo demo).</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
