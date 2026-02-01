/* frontend/components/pages/moto/components/MotoHistory.tsx */
"use client";

import React, { useMemo, useState } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import Button from "../../../ui/Button";

import {
  calcDistanceKm,
  calcExpectedFuelUsed,
  calcRealFuelUsed,
  sumRefuels,
  type MotoDailyLog,
  type MotoProfile
} from "../../../../services/motoService";

export default function MotoHistory({
  profile,
  logs,
  onRemoveLog
}: {
  profile: MotoProfile;
  logs: MotoDailyLog[];
  onRemoveLog: (id: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | "hasReal">("all");

  const visible = useMemo(() => {
    if (filter === "all") return logs;
    return logs.filter((l) => typeof l.fuelEndLiters === "number");
  }, [logs, filter]);

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Histórico</p>
            <h3 className="mt-2 text-base font-bold text-zinc-900">Seus registros</h3>
            <p className="mt-1 text-sm text-zinc-600">
              Veja e compare dias rapidamente. Você pode filtrar para mostrar somente os registros com consumo real.
            </p>
          </div>
          <Badge>{logs.length}</Badge>
        </div>

        <div className="mt-4 flex w-full items-center gap-2 overflow-x-auto rounded-full border border-zinc-200/80 bg-white p-1 shadow-sm">
          <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>Todos</FilterButton>
          <FilterButton active={filter === "hasReal"} onClick={() => setFilter("hasReal")}>Com consumo real</FilterButton>
        </div>
      </Card>

      {visible.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm font-semibold text-zinc-900">Sem itens</p>
          <p className="mt-1 text-sm text-zinc-600">Não há registros para este filtro.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {visible.slice(0, 30).map((l) => {
            const distance = calcDistanceKm(l.odometerStart, l.odometerEnd);
            const added = sumRefuels(l.refuels);
            const expected = calcExpectedFuelUsed(distance, profile.kmPerLiter || 0);
            const real = calcRealFuelUsed(l.fuelStartLiters, added, l.fuelEndLiters);
            const realKpl = typeof real === "number" && real > 0 ? distance / real : null;

            return (
              <Card key={l.id} className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-zinc-900">{l.dateISO}</p>
                    <p className="mt-1 text-sm text-zinc-600">
                      {distance} km • Abastecido {added.toFixed(1)} L
                    </p>
                    {l.notes ? <p className="mt-2 text-sm text-zinc-700">{l.notes}</p> : null}
                  </div>

                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <Badge>{l.odometerStart} → {l.odometerEnd}</Badge>
                    {realKpl ? <Badge>{realKpl.toFixed(1)} km/l</Badge> : <Badge>Sem real</Badge>}
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Esperado</p>
                    <p className="mt-2 text-lg font-bold text-zinc-900">{expected.toFixed(2)} L</p>
                    <p className="mt-1 text-xs text-zinc-500">Baseado em {profile.kmPerLiter} km/l.</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Real</p>
                    <p className="mt-2 text-lg font-bold text-zinc-900">
                      {typeof real === "number" ? `${real.toFixed(2)} L` : "—"}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {typeof realKpl === "number" ? `${realKpl.toFixed(1)} km/l` : "Informe litros finais no registro"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Abastecimentos</p>
                    <p className="mt-2 text-lg font-bold text-zinc-900">{l.refuels.length}</p>
                    <p className="mt-1 text-xs text-zinc-500">Somatório: {added.toFixed(1)} L</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button size="sm" variant="secondary" onClick={() => onRemoveLog(l.id)}>
                    Remover
                  </Button>
                </div>
              </Card>
            );
          })}

          {visible.length > 30 ? (
            <div className="text-center">
              <p className="text-xs text-zinc-500">Mostrando 30 de {visible.length} registros.</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition focus:outline-none",
        active ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
      ].join(" ")}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
