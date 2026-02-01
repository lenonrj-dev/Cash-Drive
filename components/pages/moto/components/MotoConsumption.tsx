/* frontend/components/pages/moto/components/MotoConsumption.tsx */
"use client";

import React, { useMemo, useState } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";

import {
  calcDistanceKm,
  calcExpectedFuelUsed,
  calcRealFuelUsed,
  formatCurrencyBRL,
  sumRefuels,
  type MotoDailyLog,
  type MotoProfile
} from "../../../../services/motoService";

export default function MotoConsumption({
  profile,
  logs,
  onSaveProfile
}: {
  profile: MotoProfile;
  logs: MotoDailyLog[];
  onSaveProfile: (next: MotoProfile) => void;
}) {
  const [kmPerLiter, setKmPerLiter] = useState<string>(String(profile.kmPerLiter ?? 30));
  const [pricePerLiter, setPricePerLiter] = useState<string>(
    typeof profile.pricePerLiter === "number" ? String(profile.pricePerLiter) : ""
  );

  const metrics = useMemo(() => {
    const slice = logs.slice(0, 14);

    let totalKm = 0;
    let totalExpectedLiters = 0;
    let totalRealLiters = 0;
    let realSamples = 0;

    for (const l of slice) {
      const distance = calcDistanceKm(l.odometerStart, l.odometerEnd);
      const expected = calcExpectedFuelUsed(distance, profile.kmPerLiter || 0);
      const added = sumRefuels(l.refuels);
      const real = calcRealFuelUsed(l.fuelStartLiters, added, l.fuelEndLiters);

      totalKm += distance;
      totalExpectedLiters += expected;

      if (typeof real === "number") {
        totalRealLiters += real;
        realSamples += 1;
      }
    }

    const expectedKmPerLiter = totalExpectedLiters > 0 ? totalKm / totalExpectedLiters : null;
    const realKmPerLiter = totalRealLiters > 0 ? totalKm / totalRealLiters : null;

    const ppl = typeof profile.pricePerLiter === "number" ? profile.pricePerLiter : null;
    const expectedCost = ppl ? totalExpectedLiters * ppl : null;
    const realCost = ppl ? totalRealLiters * ppl : null;

    return {
      totalKm,
      totalExpectedLiters,
      totalRealLiters,
      expectedKmPerLiter,
      realKmPerLiter,
      expectedCost,
      realCost,
      realSamples
    };
  }, [logs, profile.kmPerLiter, profile.pricePerLiter]);

  function savePrefs() {
    const kpl = Number(kmPerLiter);
    const ppl = pricePerLiter === "" ? undefined : Number(pricePerLiter);

    onSaveProfile({
      ...profile,
      kmPerLiter: kpl > 0 ? kpl : profile.kmPerLiter,
      pricePerLiter: typeof ppl === "number" && !Number.isNaN(ppl) && ppl > 0 ? ppl : undefined
    });
  }

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Consumo</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Entenda seus números</h3>
            <p className="mt-1 text-sm text-zinc-600">
              O painel compara o consumo esperado (pela sua média em km/l) com o consumo real (quando você informa litros no final do dia).
            </p>
          </div>
          <Badge>Insights</Badge>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Fórmula rápida</p>
            <p className="mt-1 text-sm text-zinc-600">Consumo (km/l) = km rodados ÷ litros consumidos.</p>
            <p className="mt-2 text-xs text-zinc-500">
              Para melhorar a precisão, registre sempre o litro no final do dia (estimado) ou complete o tanque e use o volume abastecido como consumo.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Quando o gasto sobe?</p>
            <p className="mt-1 text-sm text-zinc-600">
              Trânsito pesado, calibragem, corrente, filtro, vela, peso extra e rotas com subida podem aumentar consumo.
            </p>
            <p className="mt-2 text-xs text-zinc-500">Use as observações do registro para entender o contexto do dia.</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Preferências</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Ajustar média e custo</h3>
            <p className="mt-1 text-sm text-zinc-600">Atualize a média (km/l) para deixar as previsões mais realistas.</p>
          </div>
          <Badge>Config</Badge>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Média (km/l)</span>
            <input
              inputMode="decimal"
              value={kmPerLiter}
              onChange={(e) => setKmPerLiter(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Atualizar média de consumo"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-zinc-900">Preço por litro (opcional)</span>
            <input
              inputMode="decimal"
              value={pricePerLiter}
              onChange={(e) => setPricePerLiter(e.target.value)}
              className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
              aria-label="Atualizar preço por litro"
            />
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button size="sm" onClick={savePrefs}>Salvar</Button>
          <span className="text-xs text-zinc-500">Isso atualiza as previsões nas telas de registro e histórico.</span>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Últimos 14 dias</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Resumo do consumo</h3>
            <p className="mt-1 text-sm text-zinc-600">O painel usa seus registros para estimar consistência e economia.</p>
          </div>
          <Badge>{Math.min(logs.length, 14)}</Badge>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Km</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">{metrics.totalKm}</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Esperado</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">{metrics.totalExpectedLiters.toFixed(2)} L</p>
            <p className="mt-1 text-xs text-zinc-500">Média: {metrics.expectedKmPerLiter ? `${metrics.expectedKmPerLiter.toFixed(1)} km/l` : "—"}</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Real</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">
              {metrics.realSamples > 0 ? `${metrics.totalRealLiters.toFixed(2)} L` : "—"}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {metrics.realKmPerLiter ? `${metrics.realKmPerLiter.toFixed(1)} km/l` : "Adicione litros finais"}
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Custo</p>
            <p className="mt-2 text-2xl font-bold text-zinc-900">
              {typeof metrics.realCost === "number" ? formatCurrencyBRL(metrics.realCost) : "—"}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {typeof metrics.expectedCost === "number" ? `Esperado: ${formatCurrencyBRL(metrics.expectedCost)}` : "Defina preço por litro"}
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">O que o painel considera como “consumo real”</p>
          <p className="mt-1 text-sm text-zinc-600">
            Consumo real = litros no início + litros abastecidos no dia − litros no final. Sem o valor final, o painel só mostra o esperado.
          </p>
        </div>
      </Card>
    </div>
  );
}
