/* frontend/components/pages/billing/components/PlansInfoStrip.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

export default function PlansInfoStrip({ variant }: { variant: "public" | "inApp" }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card className="p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-teal-600">
            <SparkIcon />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Como funciona o trial</p>
            <p className="mt-1 text-sm text-zinc-600">
              Você libera recursos por 15 dias. O cartão é usado apenas para validar a assinatura.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge>15 dias grátis</Badge>
              <Badge>{variant === "public" ? "Ativação imediata" : "Reativação rápida"}</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-teal-600">
            <LockIcon />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Pagamento e segurança</p>
            <p className="mt-1 text-sm text-zinc-600">
              Seus dados ficam protegidos. Cobranças e notas ficam disponíveis no histórico.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge>Checkout seguro</Badge>
              <Badge>Histórico de faturas</Badge>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-teal-600">
            <ChartIcon />
          </span>
          <div>
            <p className="text-sm font-semibold text-zinc-900">Valor no dia a dia</p>
            <p className="mt-1 text-sm text-zinc-600">
              Receba alertas de metas e vencimentos, acompanhe entradas/saídas e mantenha seu controle em dia.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge>Metas</Badge>
              <Badge>Contas</Badge>
              <Badge>Notificações</Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z" />
      <path d="M5 21l1-3" />
      <path d="M19 21l-1-3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M7 14l3-3 3 2 5-6" />
    </svg>
  );
}
