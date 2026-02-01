/* frontend/types/api.ts */
import type { BillingStatus, ID, TransactionType, BillStatus } from "./common";

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: { message: string; details?: unknown } };
export type ApiResponse<T> = ApiOk<T> | ApiErr;

export type MeResponse = { id: ID; name: string; email: string };

export type AuthLoginResponse = { token: string; user: MeResponse };

export type BillingStatusResponse = {
  status: BillingStatus;
  trialEnd?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  trialDaysRemaining?: number | null;
};

export type BillingPlan = {
  id: string; // priceId
  name: string;
  priceLabel: string;
  highlight?: boolean;
  benefits: string[];
  trialDays: number;
  interval?: "monthly" | "annual";
  priceMonthlyCents?: number;
  priceAnnualCents?: number;
  priceMonthlyId?: string;
  priceAnnualId?: string;
  priceMonthlyLabel?: string;
  priceAnnualLabel?: string;
};

export type BillingPlansResponse = { plans: BillingPlan[] };

export type Transaction = {
  id: ID;
  type: TransactionType;
  amountCents: number;
  category?: string | null;
  note?: string | null;
  date: string;
};

export type TransactionInput = {
  type: TransactionType;
  amountCents: number;
  category?: string | null;
  note?: string | null;
  date: string;
};

export type Goal = {
  id: ID;
  name: string;
  targetCents: number;
  deadline?: string | null;
};

export type GoalInput = {
  name: string;
  targetCents: number;
  deadline?: string | null;
};

export type Bill = {
  id: ID;
  name: string;
  amountCents: number;
  dueDate: string;
  recurring: boolean;
  status: BillStatus;
};

export type BillInput = {
  name: string;
  amountCents: number;
  dueDate: string;
  recurring?: boolean;
  status?: BillStatus;
};

export type AppNotification = {
  id: ID;
  title: string;
  body: string;
  tag?: string | null;
  read: boolean;
  createdAt: string;
};

export type AssistantParseResponse = {
  transaction: TransactionInput;
  requiresConfirmation: boolean;
};
