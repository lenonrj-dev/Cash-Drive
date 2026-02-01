/* frontend/components/pages/billing/CheckoutButton.tsx */
"use client";

import React, { useState } from "react";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import { createCheckout } from "../../../services/billingService";
import type { BillingCycle } from "../../../lib/pricing";

export default function CheckoutButton({
  planId,
  trialDays,
  cycle,
}: {
  planId: string;
  trialDays: number;
  cycle: BillingCycle;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setError(null);
    try {
      const url = await createCheckout(planId);
      window.location.href = url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível iniciar o checkout";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <Button className="w-full" disabled={busy} onClick={onClick}>
        {busy ? "Abrindo checkout..." : `Começar ${trialDays} dias grátis`}
      </Button>
      <p className="mt-2 text-xs text-zinc-500">
        Você não será cobrado hoje. A cobrança {cycle === "annual" ? "anual" : "mensal"} inicia após {trialDays} dias.
      </p>
      {error ? (
        <div className="mt-2">
          <Alert message={error} />
        </div>
      ) : null}
    </div>
  );
}
