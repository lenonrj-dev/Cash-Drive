/* frontend/lib/date.ts */

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

export function isDateOnly(value?: string | null) {
  if (!value) return false;
  return DATE_ONLY.test(value);
}

export function dateInputToISO(dateStr: string) {
  if (!dateStr) return new Date().toISOString();
  if (DATE_ONLY.test(dateStr)) {
    const [year, month, day] = dateStr.split("-").map(Number);
    return new Date(Date.UTC(year, month - 1, day, 12, 0, 0)).toISOString();
  }
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return new Date().toISOString();
  return d.toISOString();
}

export function todayInputDate() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function toInputDate(value?: string | null) {
  if (!value) return "";
  if (DATE_ONLY.test(value)) return value;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateShort(value?: string | null) {
  if (!value) return "-";
  if (DATE_ONLY.test(value)) {
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "-";
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}
