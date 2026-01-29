/* frontend/components/layout/AccessBadge.tsx */
"use client";

import React, { useContext } from "react";
import Badge from "../ui/Badge";
import { BillingContext } from "../../providers/BillingProvider";

export default function AccessBadge() {
  const billing = useContext(BillingContext);
  if (!billing) return null;

  if (billing.isLoading) return <Badge className="bg-zinc-100 text-zinc-700">Carregando</Badge>;
  if (billing.status === "trialing") return <Badge>Trial</Badge>;
  if (billing.status === "active") return <Badge className="bg-emerald-50 text-emerald-700">Ativo</Badge>;
  if (billing.status === "past_due") return <Badge className="bg-amber-50 text-amber-700">Pendente</Badge>;
  if (billing.status === "canceled") return <Badge className="bg-zinc-100 text-zinc-700">Cancelado</Badge>;
  if (billing.status === "expired") return <Badge className="bg-red-50 text-red-700">Expirado</Badge>;
  return <Badge className="bg-zinc-100 text-zinc-700">Sem plano</Badge>;
}
