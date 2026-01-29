/* frontend/types/common.ts */
export type ID = string;

export type BillingStatus =
  | "none"
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "expired";

export type TransactionType = "INCOME" | "EXPENSE";

export type BillStatus = "open" | "paid" | "late";
