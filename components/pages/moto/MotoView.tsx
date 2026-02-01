/* frontend/components/pages/moto/MotoView.tsx */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

import MotoHeader from "./components/MotoHeader";
import MotoTabs from "./components/MotoTabs";
import MotoDailyLog from "./components/MotoDailyLog";
import MotoConsumption from "./components/MotoConsumption";
import MotoMaintenance from "./components/MotoMaintenance";
import MotoHistory from "./components/MotoHistory";

import {
  addMotoLog,
  calcDistanceKm,
  getMotoProfile,
  listMotoLogs,
  removeMotoLog,
  saveMotoProfile,
  sumRefuels,
  type MotoDailyLog as MotoDailyLogType,
  type MotoProfile
} from "../../../services/motoService";

type TabKey = "registro" | "consumo" | "manutenção" | "historico";

export default function MotoView() {
  const [tab, setTab] = useState<TabKey>("registro");
  const [profile, setProfile] = useState<MotoProfile>({ kmPerLiter: 30 });
  const [logs, setLogs] = useState<MotoDailyLogType[]>([]);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [profileData, logsData] = await Promise.all([getMotoProfile(), listMotoLogs()]);
      if (!alive) return;
      setProfile(profileData);
      setLogs(logsData);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const lastLog = useMemo(() => logs[0] || null, [logs]);

  const todayStats = useMemo(() => {
    if (!lastLog) return null;
    const distance = calcDistanceKm(lastLog.odometerStart, lastLog.odometerEnd);
    const added = sumRefuels(lastLog.refuels);
    return { distance, added };
  }, [lastLog]);

  async function handleSaveProfile(next: MotoProfile) {
    setProfile(next);
    await saveMotoProfile(next);
  }

  async function handleAddLog(log: MotoDailyLogType) {
    await addMotoLog(log);
    const updated = await listMotoLogs();
    setLogs(updated);
  }

  async function handleRemoveLog(id: string) {
    await removeMotoLog(id);
    const updated = await listMotoLogs();
    setLogs(updated);
  }

  return (
    <div className="w-full space-y-4">
      <MotoHeader />

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Card className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Moto</p>
                <h1 className="mt-2 text-lg font-bold text-zinc-900">Controle de consumo</h1>
                <p className="mt-1 text-sm text-zinc-600">
                  Registre o dia, compare consumo real vs. esperado e acompanhe alertas de troca de óleo.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge>{profile.kmPerLiter ? `${profile.kmPerLiter} km/l` : "Sem média"}</Badge>
                {typeof profile.pricePerLiter === "number" ? (
                  <Badge>{profile.pricePerLiter.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} / L</Badge>
                ) : null}
              </div>
            </div>

            <div className="mt-4">
              <MotoTabs value={tab} onChange={setTab} />
            </div>
          </Card>

          <div className="mt-4">
            {tab === "registro" ? (
              <MotoDailyLog
                profile={profile}
                onSaveProfile={handleSaveProfile}
                onAddLog={handleAddLog}
                logs={logs}
                onRemoveLog={handleRemoveLog}
              />
            ) : null}

            {tab === "consumo" ? (
              <MotoConsumption profile={profile} logs={logs} onSaveProfile={handleSaveProfile} />
            ) : null}

            {tab === "manutenção" ? (
              <MotoMaintenance profile={profile} logs={logs} onSaveProfile={handleSaveProfile} />
            ) : null}

            {tab === "historico" ? (
              <MotoHistory profile={profile} logs={logs} onRemoveLog={handleRemoveLog} />
            ) : null}
          </div>
        </div>

        <div className="lg:col-span-4">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Resumo</p>
                <h2 className="mt-2 text-base font-bold text-zinc-900">Hoje</h2>
                <p className="mt-1 text-sm text-zinc-600">Visão rápida do último registro salvo.</p>
              </div>
              <Badge>Ativo</Badge>
            </div>

            {!todayStats ? (
              <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                <p className="text-sm font-semibold text-zinc-900">Sem registros</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Crie seu primeiro registro do dia para acompanhar km, consumo e manutenção.
                </p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Distância</p>
                  <p className="mt-2 text-2xl font-bold text-zinc-900">{todayStats.distance} km</p>
                  <p className="mt-1 text-sm text-zinc-600">Do último registro.</p>
                </div>

                <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Abastecido</p>
                  <p className="mt-2 text-2xl font-bold text-zinc-900">{todayStats.added.toFixed(1)} L</p>
                  <p className="mt-1 text-sm text-zinc-600">Somando abastecimentos do dia.</p>
                </div>
              </div>
            )}
          </Card>

          <Card className="mt-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Dica</p>
                <h3 className="mt-2 text-base font-bold text-zinc-900">Medição mais precisa</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Para consumo real, informe também os litros no tanque ao final do dia (estimativa). Assim o painel calcula km/l real.
                </p>
              </div>
              <Badge>Pro</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
