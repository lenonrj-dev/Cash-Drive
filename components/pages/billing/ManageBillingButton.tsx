/* frontend/components/pages/billing/ManageBillingButton.tsx */
"use client";

import React, { useState } from "react";
import Button from "../../ui/Button";
import Alert from "../../ui/Alert";
import { openPortal } from "../../../services/billingService";

export default function ManageBillingButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setBusy(true);
    setError(null);
    const res = await openPortal();
    setBusy(false);

    if (!res.ok) {
      setError(res.error.message);
      return;
    }

    if (res.data.url) {
      window.location.href = res.data.url;
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
