/* frontend/components/pages/billing/BillingStatusCard.tsx */
"use client";

import React, { useContext } from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";
import ManageBillingButton from "./ManageBillingButton";
import Link from "next/link";
import Button from "../../ui/Button";
import { routes } from "../../../lib/routes";
import { BillingContext } from "../../../providers/BillingProvider";
import { formatDateShort } from "../../../lib/format";

export default function BillingStatusCard() {
  const billing = useContext(BillingContext);

  const status = billing?.status || "none";
  const canWrite = Boolean(billing?.canWrite);
  const trialDaysRemaining = billing?.trialDaysRemaining;

  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Assinatura</p>
          <h3 className="mt-2 text-lg font-bold text-zinc-900">Status da assinatura</h3>
          <p className="mt-1 text-sm text-zinc-600">
            {canWrite ? "Ações liberadas no app." : "Modo leitura - ative um plano para desbloquear."}
          </p>
        </div>
        <Badge>{label(status)}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-zinc-600 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200/70 bg-white/70 px-3 py-2">
          <span className="font-semibold">Trial:</span> {formatDateShort(billing?.trialEnd)}{typeof trialDaysRemaining === "number" ? ` (${trialDaysRemaining}d)` : ""}
        </div>
        <div className="rounded-xl border border-zinc-200/70 bg-white/70 px-3 py-2">
          <span className="font-semibold">Período:</span> {formatDateShort(billing?.currentPeriodEnd)}
        </div>
        <div className="rounded-xl border border-zinc-200/70 bg-white/70 px-3 py-2">
          <span className="font-semibold">Cancela no fim:</span> {billing?.cancelAtPeriodEnd ? "Sim" : "Não"}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        {canWrite ? (
          <ManageBillingButton />
        ) : (
          <Link href={routes.app.planos}>
            <Button>Ativar plano</Button>
          </Link>
        )}

        <p className="text-xs text-zinc-500">
          Status atualizado via Stripe + webhook no backend.
        </p>
      </div>
    </Card>
  );
}

function label(s: string) {
  if (s === "trialing") return "Trial ativo";
  if (s === "active") return "Ativo";
  if (s === "past_due") return "Pendente";
  if (s === "canceled") return "Cancelado";
  if (s === "expired") return "Expirado";
  return "Sem plano";
}
