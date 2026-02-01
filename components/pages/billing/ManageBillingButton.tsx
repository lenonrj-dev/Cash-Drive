/* frontend/components/pages/billing/ManageBillingButton.tsx */
"use client";

import React, { useState } from "react";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import { openBillingPortal } from "../../../services/billingService";

export default function ManageBillingButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setError(null);
    try {
      const url = await openBillingPortal();
      window.location.href = url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível abrir o portal";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button variant="secondary" disabled={busy} onClick={onClick}>
        {busy ? "Abrindo..." : "Gerenciar assinatura"}
      </Button>
      {error ? <Alert message={error} /> : null}
    </div>
  );
}
