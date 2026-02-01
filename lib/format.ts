/* frontend/lib/format.ts */
import { formatDateShort as formatDateShortSafe, toInputDate as toInputDateSafe } from "./date";
export function formatCurrencyBRL(cents: number) {
  const value = Number.isFinite(cents) ? cents / 100 : 0;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2
  }).format(value);
}

export function parseCurrencyToCents(input: string) {
  const raw = input.replace(/[^0-9,.-]/g, "").trim();
  if (!raw) return 0;
  let normalized = raw;
  if (raw.includes(",") && raw.includes(".")) {
    normalized = raw.replace(/\./g, "").replace(",", ".");
  } else {
    normalized = raw.replace(",", ".");
  }
  const value = Number(normalized);
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 100);
}

export function formatDateShort(value?: string | null) {
  return formatDateShortSafe(value);
}

export function toInputDate(value?: string | null) {
  return toInputDateSafe(value);
}
