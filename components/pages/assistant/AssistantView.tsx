/* frontend/components/pages/assistant/AssistantView.tsx */
"use client";

import React, { useContext } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "../dashboard/ReadOnlyBanner";
import ChatShell from "./components/ChatShell";

export default function AssistantView() {
  const billing = useContext(BillingContext);
  const canWrite = Boolean(billing?.canWrite);

  return (
    <div className="space-y-4">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar acoes."} /> : null}
      <ChatShell canWrite={canWrite} />
    </div>
  );
}
