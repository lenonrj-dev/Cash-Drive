/* frontend/providers/BillingProvider.tsx */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import type { BillingStatus } from "../types/common";
import type { BillingPlan } from "../types/api";
import * as billingService from "../services/billingService";
import { AuthContext } from "./AuthProvider";
import { DEFAULT_BILLING_STATUS, isBillingActive } from "../lib/billing";

type BillingContextValue = {
  plans: BillingPlan[];
  status: BillingStatus;
  canWrite: boolean;
  isLoading: boolean;
  reason?: string;
  trialEnd?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  trialDaysRemaining?: number | null;
  refresh: () => Promise<void>;
};

export const BillingContext = createContext<BillingContextValue | null>(null);

export default function BillingProvider({ children }: { children: React.ReactNode }) {
  const auth = React.useContext(AuthContext);
  const isAuthed = Boolean(auth?.token);

  const [plans, setPlans] = useState<BillingPlan[]>([]);
  const [status, setStatus] = useState<BillingStatus>("none");
  const [trialEnd, setTrialEnd] = useState<string | null>(null);
  const [currentPeriodEnd, setCurrentPeriodEnd] = useState<string | null>(null);
  const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(false);
  const [trialDaysRemaining, setTrialDaysRemaining] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    const [plansResult, statusResult] = await Promise.all([
      billingService.getPlans(),
      isAuthed ? billingService.getBillingStatus() : Promise.resolve(DEFAULT_BILLING_STATUS),
    ]);

    setPlans(plansResult.plans);
    setStatus(statusResult.status ?? "none");
    setTrialEnd(statusResult.trialEnd ?? null);
    setCurrentPeriodEnd(statusResult.currentPeriodEnd ?? null);
    setCancelAtPeriodEnd(Boolean(statusResult.cancelAtPeriodEnd));
    setTrialDaysRemaining(typeof statusResult.trialDaysRemaining === "number" ? statusResult.trialDaysRemaining : null);
    setIsLoading(false);
  }, [isAuthed]);

  useEffect(() => {
    refresh();
  }, [refresh, auth?.token]);

  const canWrite = isBillingActive(status);

  const reason =
    !isAuthed
      ? "Faça login para continuar."
      : canWrite
      ? undefined
      : "Ative um plano para desbloquear ações (lançamentos, metas, contas e assistente).";

  const value = useMemo(
    () => ({
      status,
      plans,
      canWrite,
      isLoading,
      reason,
      trialEnd,
      currentPeriodEnd,
      cancelAtPeriodEnd,
      trialDaysRemaining,
      refresh
    }),
    [
      status,
      plans,
      canWrite,
      isLoading,
      reason,
      trialEnd,
      currentPeriodEnd,
      cancelAtPeriodEnd,
      trialDaysRemaining,
      refresh
    ]
  );

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}
