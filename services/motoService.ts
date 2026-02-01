/* frontend/services/motoService.ts */
import { api } from "./http";
import { todayInputDate } from "../lib/date";

export type MotoFuelEntry = {
  id: string;
  liters: number;
  note?: string;
};

export type MotoDailyLog = {
  id: string;
  dateISO: string; // YYYY-MM-DD
  odometerStart: number;
  odometerEnd: number;
  fuelStartLiters: number;
  fuelEndLiters?: number;
  refuels: MotoFuelEntry[];
  notes?: string;
};

export type MotoProfile = {
  kmPerLiter: number; // ex.: 32 (km/l)
  pricePerLiter?: number;
  tankCapacityLiters?: number;
  oilLastOdometer?: number;
  oilLastDate?: string;
};

const PROFILE_KEY = "driveux_moto_profile_v1";
const LOGS_KEY = "driveux_moto_logs_v1";

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function isBrowser() {
  return typeof window !== "undefined";
}

function readLocalProfile(): MotoProfile {
  if (!isBrowser()) return { kmPerLiter: 30 };
  const raw = window.localStorage.getItem(PROFILE_KEY);
  const parsed = safeParse<MotoProfile>(raw);
  if (!parsed || typeof parsed.kmPerLiter !== "number" || Number.isNaN(parsed.kmPerLiter)) {
    return { kmPerLiter: 30 };
  }
  return parsed;
}

function saveLocalProfile(next: MotoProfile) {
  if (!isBrowser()) return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
}

function readLocalLogs(): MotoDailyLog[] {
  if (!isBrowser()) return [];
  const raw = window.localStorage.getItem(LOGS_KEY);
  const parsed = safeParse<MotoDailyLog[]>(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function saveLocalLogs(next: MotoDailyLog[]) {
  if (!isBrowser()) return;
  window.localStorage.setItem(LOGS_KEY, JSON.stringify(next));
}

export async function getMotoProfile(): Promise<MotoProfile> {
  const res = await api<MotoProfile>("/moto/config", { method: "GET" });
  if (!res.ok) return readLocalProfile();
  const data = res.data;
  const profile = {
    kmPerLiter: data?.kmPerLiter ?? 30,
    pricePerLiter: data?.pricePerLiter ?? undefined,
    tankCapacityLiters: data?.tankCapacityLiters ?? undefined,
    oilLastOdometer: data?.oilLastOdometer ?? undefined,
    oilLastDate: data?.oilLastDate ?? undefined
  };
  saveLocalProfile(profile);
  return profile;
}

export async function saveMotoProfile(next: MotoProfile) {
  const res = await api<MotoProfile>("/moto/config", {
    method: "PUT",
    body: JSON.stringify(next)
  });
  if (!res.ok) {
    saveLocalProfile(next);
    return next;
  }
  const profile = res.data || next;
  saveLocalProfile(profile);
  return profile;
}

export async function listMotoLogs(): Promise<MotoDailyLog[]> {
  const res = await api<any>("/moto/logs", { method: "GET" });
  if (!res.ok) return readLocalLogs();
  const data = res.data;
  const items = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];
  saveLocalLogs(items);
  return items;
}

export async function addMotoLog(log: MotoDailyLog) {
  const res = await api<MotoDailyLog>("/moto/logs", {
    method: "POST",
    body: JSON.stringify(log)
  });
  if (!res.ok) {
    const prev = readLocalLogs();
    const next = [log, ...prev].slice(0, 180);
    saveLocalLogs(next);
    return log;
  }
  const created = res.data;
  const prev = readLocalLogs();
  const next = [created, ...prev].slice(0, 180);
  saveLocalLogs(next);
  return created;
}

export async function removeMotoLog(id: string) {
  const res = await api<{ id: string }>(`/moto/logs/${id}`, { method: "DELETE" });
  const prev = readLocalLogs();
  saveLocalLogs(prev.filter((x) => x.id !== id));
  if (!res.ok) return { id };
  return res.data;
}

export function sumRefuels(refuels: MotoFuelEntry[]) {
  return (refuels || []).reduce((acc, r) => acc + (Number(r?.liters) || 0), 0);
}

export function calcDistanceKm(odometerStart: number, odometerEnd: number) {
  const d = (Number(odometerEnd) || 0) - (Number(odometerStart) || 0);
  return d > 0 ? d : 0;
}

export function calcExpectedFuelUsed(distanceKm: number, kmPerLiter: number) {
  const kpl = Number(kmPerLiter) || 0;
  if (distanceKm <= 0 || kpl <= 0) return 0;
  return distanceKm / kpl;
}

export function calcRealFuelUsed(
  fuelStartLiters: number,
  fuelAddedLiters: number,
  fuelEndLiters?: number
) {
  const start = Number(fuelStartLiters) || 0;
  const added = Number(fuelAddedLiters) || 0;
  if (typeof fuelEndLiters !== "number" || Number.isNaN(fuelEndLiters)) return null;
  const end = Number(fuelEndLiters) || 0;
  const used = start + added - end;
  return used > 0 ? used : 0;
}

export function formatCurrencyBRL(value: number) {
  try {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  } catch {
    return `R$ ${value.toFixed(2)}`;
  }
}

export function todayISO() {
  return todayInputDate();
}

export function oilSeverity(kmSinceOil: number) {
  if (kmSinceOil >= 10000) return "critico";
  if (kmSinceOil >= 7000) return "moderado";
  if (kmSinceOil >= 5000) return "leve";
  return "ok";
}
