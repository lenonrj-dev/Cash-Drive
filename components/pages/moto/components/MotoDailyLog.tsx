/* frontend/components/pages/moto/components/MotoDailyLog.tsx */
"use client";

import React, { useMemo, useState } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";

import {
  calcDistanceKm,
  calcExpectedFuelUsed,
  calcRealFuelUsed,
  formatCurrencyBRL,
  sumRefuels,
  todayISO,
  type MotoDailyLog,
  type MotoFuelEntry,
  type MotoProfile
} from "../../../../services/motoService";

export default function MotoDailyLog({
  profile,
  onSaveProfile,
  onAddLog,
  logs,
  onRemoveLog
}: {
  profile: MotoProfile;
  onSaveProfile: (next: MotoProfile) => void;
  onAddLog: (log: MotoDailyLog) => void;
  logs: MotoDailyLog[];
  onRemoveLog: (id: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [dateISO, setDateISO] = useState(todayISO());
  const [odometerStart, setOdometerStart] = useState<string>("");
  const [odometerEnd, setOdometerEnd] = useState<string>("");

  const [fuelStartLiters, setFuelStartLiters] = useState<string>("");
  const [fuelEndLiters, setFuelEndLiters] = useState<string>("");

  const [kmPerLiter, setKmPerLiter] = useState<string>(String(profile.kmPerLiter ?? 30));
  const [pricePerLiter, setPricePerLiter] = useState<string>(
    typeof profile.pricePerLiter === "number" ? String(profile.pricePerLiter) : ""
  );

  const [refuels, setRefuels] = useState<MotoFuelEntry[]>([]);
  const [refuelLiters, setRefuelLiters] = useState<string>("");
  const [refuelNote, setRefuelNote] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const numeric = useMemo(() => {
    const os = Number(odometerStart);
    const oe = Number(odometerEnd);
    const fs = Number(fuelStartLiters);
    const fe = fuelEndLiters === "" ? undefined : Number(fuelEndLiters);
    const kpl = Number(kmPerLiter);
    const ppl = pricePerLiter === "" ? undefined : Number(pricePerLiter);

    const distance = calcDistanceKm(os, oe);
    const added = sumRefuels(refuels);
    const expectedFuel = calcExpectedFuelUsed(distance, kpl);
    const realFuel = calcRealFuelUsed(fs, added, typeof fe === "number" ? fe : undefined);

    const realKmPerLiter = realFuel && realFuel > 0 ? distance / realFuel : null;
    const expectedCost = typeof ppl === "number" ? expectedFuel * ppl : null;
    const realCost = typeof ppl === "number" && typeof realFuel === "number" ? realFuel * ppl : null;
    const costDelta = typeof expectedCost === "number" && typeof realCost === "number" ? expectedCost - realCost : null;

    return {
      os,
      oe,
      fs,
      fe,
      kpl,
      ppl,
      distance,
      added,
      expectedFuel,
      realFuel,
      realKmPerLiter,
      expectedCost,
      realCost,
      costDelta
    };
  }, [odometerStart, odometerEnd, fuelStartLiters, fuelEndLiters, kmPerLiter, pricePerLiter, refuels]);

  function addRefuel() {
    setError(null);
    setSuccess(null);

    const liters = Number(refuelLiters);
    if (!liters || liters <= 0) {
      setError("Informe quantos litros você colocou.");
      return;
    }

    const entry: MotoFuelEntry = {
      id: `refuel_${Date.now()}`,
      liters,
      note: refuelNote.trim() ? refuelNote.trim() : undefined
    };

    setRefuels((prev) => [entry, ...prev].slice(0, 8));
    setRefuelLiters("");
    setRefuelNote("");
  }

  function removeRefuel(id: string) {
    setRefuels((prev) => prev.filter((r) => r.id !== id));
  }

  function saveProfile() {
    setError(null);
    setSuccess(null);

    const kpl = Number(kmPerLiter);
    if (!kpl || kpl <= 0) {
      setError("Informe a média da moto em km/l (ex.: 30).");
      return;
    }

    const ppl = pricePerLiter === "" ? undefined : Number(pricePerLiter);
    onSaveProfile({
      ...profile,
      kmPerLiter: kpl,
      pricePerLiter: typeof ppl === "number" && !Number.isNaN(ppl) ? ppl : undefined
    });

    setSuccess("Preferências de consumo atualizadas.");
  }

  function saveLog() {
    setError(null);
    setSuccess(null);

    if (!dateISO) {
      setError("Selecione a data do registro.");
      return;
    }

    if (!numeric.os || numeric.os <= 0) {
      setError("Informe o km inicial (odômetro)." );
      return;
    }

    if (!numeric.oe || numeric.oe <= 0) {
      setError("Informe o km final (odômetro)." );
      return;
    }

    if (numeric.oe <= numeric.os) {
      setError("O km final precisa ser maior que o km inicial.");
      return;
    }

    if (Number.isNaN(numeric.fs) || numeric.fs < 0) {
      setError("Informe quantos litros havia no início do dia (pode ser estimado)." );
      return;
    }

    const log: MotoDailyLog = {
      id: `moto_${Date.now()}`,
      dateISO,
      odometerStart: numeric.os,
      odometerEnd: numeric.oe,
      fuelStartLiters: numeric.fs,
      fuelEndLiters: typeof numeric.fe === "number" && !Number.isNaN(numeric.fe) ? numeric.fe : undefined,
      refuels,
      notes: notes.trim() ? notes.trim() : undefined
    };

    onAddLog(log);
    setSuccess("Registro do dia salvo.");
  }

  const lastLogs = useMemo(() => logs.slice(0, 3), [logs]);

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Preferências</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Média e custo</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Defina a média da moto (km/l) e, se quiser, o preço por litro para estimar custos.
            </p>
          </div>
          <Badge>Config</Badge>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Média (km por litro)</span>
            <input
              inputMode="decimal"
              value={kmPerLiter}
              onChange={(e) => setKmPerLiter(e.target.value)}
              placeholder="Ex.: 30"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Média de consumo em km por litro"
            />
            <p className="mt-2 text-xs text-zinc-500">Se você não souber, comece com uma estimativa e ajuste com o histórico.</p>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Preço por litro (opcional)</span>
            <input
              inputMode="decimal"
              value={pricePerLiter}
              onChange={(e) => setPricePerLiter(e.target.value)}
              placeholder="Ex.: 5,89"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Preço da gasolina por litro"
            />
            <p className="mt-2 text-xs text-zinc-500">Ajuda a prever gasto do dia e comparar economia.</p>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button onClick={saveProfile} size="sm">Salvar preferências</Button>
          <span className="text-xs text-zinc-500">As preferências ficam salvas neste navegador por enquanto.</span>
        </div>

        {error ? (
          <div className="mt-3"><Alert message={error} /></div>
        ) : null}
        {success ? (
          <div className="mt-3"><Alert message={success} /></div>
        ) : null}
      </Card>

      <Card className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Registro do dia</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Km + abastecimentos</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Informe km inicial/final e quanto tinha no tanque. Se puder, informe também quanto sobrou no final para medir o consumo real.
            </p>
          </div>
          <Badge>Diário</Badge>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Data</span>
            <input
              type="date"
              value={dateISO}
              onChange={(e) => setDateISO(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Data do registro"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Observações (opcional)</span>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex.: trânsito forte, chuva, rota longa..."
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Observações do dia"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Km inicial (odômetro)</span>
            <input
              inputMode="numeric"
              value={odometerStart}
              onChange={(e) => setOdometerStart(e.target.value)}
              placeholder="Ex.: 51230"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Quilometragem inicial do dia"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Km final (odômetro)</span>
            <input
              inputMode="numeric"
              value={odometerEnd}
              onChange={(e) => setOdometerEnd(e.target.value)}
              placeholder="Ex.: 51310"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Quilometragem final do dia"
            />
          </label>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Litros no tanque (início)</span>
            <input
              inputMode="decimal"
              value={fuelStartLiters}
              onChange={(e) => setFuelStartLiters(e.target.value)}
              placeholder="Ex.: 3"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Litros no tanque no início do dia"
            />
            <p className="mt-2 text-xs text-zinc-500">Pode ser estimado (meio tanque, 1/4, etc.).</p>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Litros no tanque (final) (opcional)</span>
            <input
              inputMode="decimal"
              value={fuelEndLiters}
              onChange={(e) => setFuelEndLiters(e.target.value)}
              placeholder="Ex.: 1"
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Litros no tanque ao final do dia"
            />
            <p className="mt-2 text-xs text-zinc-500">Isso permite calcular consumo real (km/l) com mais precisão.</p>
          </label>
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Abastecimentos no meio do dia</p>
              <p className="mt-1 text-sm text-zinc-600">Adicione quantos abastecimentos precisar. O painel soma os litros.</p>
            </div>
            <Badge>{numeric.added.toFixed(1)} L</Badge>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <label className="block sm:col-span-1">
              <span className="text-sm font-semibold text-zinc-900">Litros abastecidos</span>
              <input
                inputMode="decimal"
                value={refuelLiters}
                onChange={(e) => setRefuelLiters(e.target.value)}
                placeholder="Ex.: 4"
                className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                aria-label="Litros abastecidos"
              />
            </label>

            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold text-zinc-900">Nota (opcional)</span>
              <input
                value={refuelNote}
                onChange={(e) => setRefuelNote(e.target.value)}
                placeholder="Ex.: posto X, corrida longa, promoção..."
                className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
                aria-label="Nota do abastecimento"
              />
            </label>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button size="sm" variant="secondary" onClick={addRefuel}>Adicionar abastecimento</Button>
            <span className="text-xs text-zinc-500">Dica: abastecer volumes maiores melhora a precisão do consumo.</span>
          </div>

          {refuels.length > 0 ? (
            <div className="mt-4 space-y-2">
              {refuels.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200/70 bg-white px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900">{r.liters.toFixed(1)} L</p>
                    {r.note ? <p className="mt-0.5 truncate text-xs text-zinc-500">{r.note}</p> : null}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeRefuel(r.id)}
                    className="inline-flex h-9 items-center justify-center rounded-full border border-zinc-200/80 bg-white px-3 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    aria-label="Remover abastecimento"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Rodou</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">{numeric.distance} km</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Esperado</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">{numeric.expectedFuel.toFixed(2)} L</p>
            <p className="mt-1 text-xs text-zinc-500">Baseado em {numeric.kpl || 0} km/l</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Real</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">
              {typeof numeric.realFuel === "number" ? `${numeric.realFuel.toFixed(2)} L` : "—"}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {typeof numeric.realKmPerLiter === "number" ? `${numeric.realKmPerLiter.toFixed(1)} km/l` : "Informe litros finais para medir"}
            </p>
          </div>
        </div>

        {typeof numeric.expectedCost === "number" || typeof numeric.realCost === "number" ? (
          <div className="mt-3 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Custo estimado</p>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className="text-zinc-700">
                Esperado: <span className="font-semibold text-zinc-900">{formatCurrencyBRL(numeric.expectedCost || 0)}</span>
              </span>
              <span className="text-zinc-700">
                Real: <span className="font-semibold text-zinc-900">{formatCurrencyBRL(numeric.realCost || 0)}</span>
              </span>
              {typeof numeric.costDelta === "number" ? (
                <span className={numeric.costDelta >= 0 ? "text-teal-700" : "text-rose-700"}>
                  Diferença: <span className="font-semibold">{formatCurrencyBRL(numeric.costDelta)}</span>
                </span>
              ) : null}
            </div>
            <p className="mt-2 text-xs text-zinc-500">
              Se a diferença estiver negativa com frequência, pode ser rota mais pesada, pneu murcho, filtro/vela, ou média (km/l) desatualizada.
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button onClick={saveLog}>Salvar registro do dia</Button>
          <button
            type="button"
            onClick={() => {
              setOdometerStart("");
              setOdometerEnd("");
              setFuelStartLiters("");
              setFuelEndLiters("");
              setRefuels([]);
              setNotes("");
              setError(null);
              setSuccess(null);
            }}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
            aria-label="Limpar formulário"
          >
            Limpar
          </button>
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
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Últimos registros</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Resumo rápido</h3>
            <p className="mt-1 text-sm text-zinc-600">Acompanhe os últimos dias sem precisar rolar a página inteira.</p>
          </div>
          <Badge>{logs.length}</Badge>
        </div>

        {lastLogs.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Nenhum registro ainda</p>
            <p className="mt-1 text-sm text-zinc-600">Salve seu primeiro dia para começar o histórico.</p>
          </div>
        ) : (
          <div className="mt-4 space-y-2">
            {lastLogs.map((l) => {
              const distance = calcDistanceKm(l.odometerStart, l.odometerEnd);
              const added = sumRefuels(l.refuels);
              return (
                <div
                  key={l.id}
                  className="flex flex-col gap-3 rounded-2xl border border-zinc-200/70 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-zinc-900">{l.dateISO}</p>
                    <p className="mt-1 text-sm text-zinc-600">
                      {distance} km • Abastecido {added.toFixed(1)} L
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveLog(l.id)}
                    className="inline-flex h-10 items-center justify-center rounded-full border border-zinc-200/80 bg-white px-4 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
                    aria-label="Remover registro"
                  >
                    Remover
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
