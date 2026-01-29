/* frontend/providers/BillingProvider.tsx */
"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { BillingStatus } from "../types/common";
import * as billingService from "../services/billingService";
import { AuthContext } from "./AuthProvider";

type BillingContextValue = {
  status: BillingStatus;
  canWrite: boolean;
  isLoading: boolean;
  reason?: string;
  trialEnd?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  refresh: () => Promise<void>;
};

export const BillingContext = createContext<BillingContextValue | null>(null);

export default function BillingProvider({ children }: { children: React.ReactNode }) {
  const auth = React.useContext(AuthContext);
  const isAuthed = Boolean(auth?.token);

  const [status, setStatus] = useState<BillingStatus>("none");
  const [trialEnd, setTrialEnd] = useState<string | null>(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!isAuthed) {
      setStatus("none");
      setTrialEnd(null);
      setCurrentPeriodEnd(null);
      setCancelAtPeriodEnd(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const res = await billingService.getStatus();
    if (res.ok) {
      setStatus(res.data.status);
      setTrialEnd(res.data.trialEnd ?? null);
      setCurrentPeriodEnd(res.data.currentPeriodEnd ?? null);
      setCancelAtPeriodEnd(Boolean(res.data.cancelAtPeriodEnd));
    } else {
      setStatus("none");
      setTrialEnd(null);
      setCurrentPeriodEnd(null);
      setCancelAtPeriodEnd(false);
    }
    setIsLoading(false);
  }, [isAuthed]);

  useEffect(() => {
    refresh();
  }, [refresh, auth?.token]);

  const canWrite = status === "trialing" || status === "active";

  const reason =
    !isAuthed
      ? "Faca login para continuar."
      : canWrite
      ? undefined
      : "Ative um plano para desbloquear acoes (lancamentos, metas, contas e assistente).";

  const value = useMemo(
    () => ({
      status,
      canWrite,
      isLoading,
      reason,
      trialEnd,
      currentPeriodEnd,
      cancelAtPeriodEnd,
      refresh
    }),
    [status, canWrite, isLoading, reason, trialEnd, currentPeriodEnd, cancelAtPeriodEnd, refresh]
  );

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}
