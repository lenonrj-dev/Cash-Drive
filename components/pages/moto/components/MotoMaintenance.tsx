/* frontend/components/pages/moto/components/MotoMaintenance.tsx */
"use client";

import React, { useMemo, useState } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";

import {
  oilSeverity,
  saveMotoProfile,
  todayISO,
  type MotoDailyLog,
  type MotoProfile
} from "../../../../services/motoService";

export default function MotoMaintenance({
  profile,
  logs,
  onSaveProfile
}: {
  profile: MotoProfile;
  logs: MotoDailyLog[];
  onSaveProfile: (next: MotoProfile) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const lastOdo = useMemo(() => {
    const last = logs[0];
    return last?.odometerEnd || null;
  }, [logs]);

  const [oilLastOdometer, setOilLastOdometer] = useState<string>(
    typeof profile.oilLastOdometer === "number" ? String(profile.oilLastOdometer) : ""
  );
  const [oilLastDate, setOilLastDate] = useState<string>(profile.oilLastDate || "");

  const currentOdo = useMemo(() => {
    if (typeof lastOdo === "number") return lastOdo;
    return null;
  }, [lastOdo]);

  const kmSinceOil = useMemo(() => {
    const last = Number(oilLastOdometer);
    if (!last || !currentOdo) return null;
    const delta = currentOdo - last;
    return delta >= 0 ? delta : null;
  }, [oilLastOdometer, currentOdo]);

  const severity = useMemo(() => {
    if (typeof kmSinceOil !== "number") return null;
    return oilSeverity(kmSinceOil);
  }, [kmSinceOil]);

  function saveOilInfo() {
    setError(null);
    setSuccess(null);

    const last = Number(oilLastOdometer);
    if (!last || last <= 0) {
      setError("Informe a quilometragem da última troca de óleo.");
      return;
    }

    const next: MotoProfile = {
      ...profile,
      oilLastOdometer: last,
      oilLastDate: oilLastDate || undefined
    };

    onSaveProfile(next);
    saveMotoProfile(next);
    setSuccess("Dados de manutenção atualizados.");
  }

  function registerOilChangeNow() {
    setError(null);
    setSuccess(null);

    if (!currentOdo) {
      setError("Sem km atual. Salve um registro do dia para usar o km final como referência.");
      return;
    }

    const next: MotoProfile = {
      ...profile,
      oilLastOdometer: currentOdo,
      oilLastDate: todayISO()
    };

    onSaveProfile(next);
    saveMotoProfile(next);
    setOilLastOdometer(String(currentOdo));
    setOilLastDate(todayISO());
    setSuccess("Troca registrada. Alertas reiniciados a partir do km atual.");
  }

  const statusLabel = useMemo(() => {
    if (!severity) return null;
    if (severity === "ok") return "Ok";
    if (severity === "leve") return "Aviso leve";
    if (severity === "moderado") return "Aviso moderado";
    return "Alerta crítico";
  }, [severity]);

  const statusClasses = useMemo(() => {
    if (!severity) return "border-zinc-200/70 bg-white";
    if (severity === "ok") return "border-emerald-200/70 bg-emerald-50/60";
    if (severity === "leve") return "border-amber-200/70 bg-amber-50/60";
    if (severity === "moderado") return "border-orange-200/70 bg-orange-50/60";
    return "border-rose-200/70 bg-rose-50/60";
  }, [severity]);

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Manutenção</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Troca de óleo</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Alertas por quilometragem: 5.000 km (leve), 7.000 km (moderado), 10.000 km (crítico). Use como referência e confirme no manual.
            </p>
          </div>
          <Badge>Óleo</Badge>
        </div>

        <div className={"mt-4 rounded-2xl border p-4 " + statusClasses}>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-zinc-900">Status atual</p>
              <p className="mt-1 text-sm text-zinc-600">
                {typeof kmSinceOil === "number"
                  ? `Você rodou ${kmSinceOil} km desde a última troca (km atual: ${currentOdo}).`
                  : "Defina o km da última troca para o painel calcular os alertas."}
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Se você usa a moto em trânsito pesado e uso intenso, o intervalo pode reduzir. Verifique nível semanalmente.
              </p>
            </div>

            {statusLabel ? (
              <span className="inline-flex shrink-0 rounded-full border border-transparent bg-white/70 px-3 py-1 text-xs font-semibold text-zinc-700">
                {statusLabel}
              </span>
            ) : null}
          </div>

          {severity && severity !== "ok" ? (
            <div className="mt-3 rounded-2xl border border-white/40 bg-white/60 p-3">
              <p className="text-sm font-semibold text-zinc-900">Recomendação</p>
              <p className="mt-1 text-sm text-zinc-700">
                {severity === "leve"
                  ? "Aviso leve: programe a troca e monitore nível/ruídos."
                  : severity === "moderado"
                  ? "Aviso moderado: revise o óleo e planeje trocar em breve." 
                  : "Alerta crítico: priorize a troca o quanto antes para proteger o motor."}
              </p>
            </div>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Km da última troca</span>
            <input
              inputMode="numeric"
              value={oilLastOdometer}
              onChange={(e) => setOilLastOdometer(e.target.value)}
              placeholder="Ex.: 52000"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="Quilometragem da última troca de óleo"
            />
            {typeof lastOdo === "number" ? (
              <p className="mt-2 text-xs text-zinc-500">Km atual sugerido (último registro): {lastOdo}</p>
            ) : (
              <p className="mt-2 text-xs text-zinc-500">Salve um registro do dia para o painel sugerir o km atual.</p>
            )}
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Data da última troca (opcional)</span>
            <input
              type="date"
              value={oilLastDate}
              onChange={(e) => setOilLastDate(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              aria-label="Data da última troca de óleo"
            />
            <p className="mt-2 text-xs text-zinc-500">Útil para lembrar de trocas anuais quando roda pouco.</p>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={saveOilInfo}>Salvar manutenção</Button>
          <Button size="sm" variant="secondary" onClick={registerOilChangeNow}>Registrar troca agora</Button>
        </div>

        {error ? (
          <div className="mt-3"><Alert message={error} /></div>
        ) : null}
        {success ? (
          <div className="mt-3"><Alert message={success} /></div>
        ) : null}
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Checklist rápido</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Rotina do motoboy</h3>
            <p className="mt-1 text-sm text-zinc-600">Pequenas rotinas que costumam ajudar no consumo e na segurança.</p>
          </div>
          <Badge>Dia a dia</Badge>
        </div>

        <ul className="mt-4 space-y-2 text-sm text-zinc-700">
          <li className="flex gap-2"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-400" />Calibragem dos pneus (frequente) e corrente com tensão correta.</li>
          <li className="flex gap-2"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-400" />Verificar nível do óleo e vazamentos visíveis.</li>
          <li className="flex gap-2"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-400" />Freios e iluminação (principalmente à noite).</li>
          <li className="flex gap-2"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-400" />Se o consumo aumentar de forma repentina, revise filtro/vela e procure um mecânico.</li>
        </ul>
      </Card>
    </div>
  );
}
