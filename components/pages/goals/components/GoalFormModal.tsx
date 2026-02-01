/* frontend/components/pages/goals/components/GoalFormModal.tsx */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../../ui/Modal";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";
import type { Goal, GoalInput } from "../../../../types/api";
import { parseCurrencyToCents, toInputDate } from "../../../../lib/format";
import { dateInputToISO, todayInputDate } from "../../../../lib/date";

type PresetKind = "daily" | "weekly" | "monthly" | "custom";

function stripPrefix(raw: string) {
  const n = String(raw || "").trim();
  return n
    .replace(/^\[(Diaria|Diária)\]\s*/i, "")
    .replace(/^\[Semanal\]\s*/i, "")
    .replace(/^\[Mensal\]\s*/i, "")
    .trim();
}

function prefixFor(kind: PresetKind) {
  if (kind === "daily") return "[Diaria] ";
  if (kind === "weekly") return "[Semanal] ";
  if (kind === "monthly") return "[Mensal] ";
  return "";
}

function parseKindFromName(name: string): PresetKind {
  const n = String(name || "").trim();
  if (n.startsWith("[Diaria]") || n.startsWith("[Diária]")) return "daily";
  if (n.startsWith("[Semanal]")) return "weekly";
  if (n.startsWith("[Mensal]")) return "monthly";
  return "custom";
}

function startOfTodayISO() {
  return todayInputDate();
}

function endOfWeekISO() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = d.getDay();
  const diffToSunday = (7 - day) % 7;
  d.setDate(d.getDate() + diffToSunday);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayStr}`;
}

function endOfMonthISO() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayStr}`;
}

function defaultDeadlineFor(kind: PresetKind) {
  if (kind === "daily") return startOfTodayISO();
  if (kind === "weekly") return endOfWeekISO();
  if (kind === "monthly") return endOfMonthISO();
  return null;
}

function centsToBRLString(cents: number) {
  const n = (Number(cents || 0) / 100).toFixed(2);
  return n.replace(".", ",");
}

export default function GoalFormModal({
  open,
  initial,
  presetKind,
  onClose,
  onSave,
  saving,
  error,
  disabled
}: {
  open: boolean;
  initial?: Goal | null;
  presetKind: PresetKind;
  onClose: () => void;
  onSave: (payload: GoalInput) => void;
  saving: boolean;
  error?: string | null;
  disabled?: boolean;
}) {
  const [kind, setKind] = useState<PresetKind>(presetKind);
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  // calculadora do motoboy
  const [avgPerDelivery, setAvgPerDelivery] = useState("");
  const [deliveries, setDeliveries] = useState("12");
  const [estimatedCosts, setEstimatedCosts] = useState("0");

  useEffect(() => {
    if (!open) return;

    if (initial) {
      const inferred = parseKindFromName(initial.name);
      setKind(inferred);
      setName(stripPrefix(initial.name));
      setTarget(centsToBRLString(initial.targetCents || 0));
      setDeadline(initial.deadline ? toInputDate(initial.deadline) : "");
    } else {
      setKind(presetKind);
      setName("");
      setTarget("");
      const d = defaultDeadlineFor(presetKind);
      setDeadline(d ? toInputDate(d) : "");
    }

    setAvgPerDelivery("");
    setDeliveries("12");
    setEstimatedCosts("0");
  }, [open, initial, presetKind]);

  useEffect(() => {
    if (!open) return;
    if (initial) return;
    const d = defaultDeadlineFor(kind);
    if (kind === "custom") return;
    setDeadline(d ? toInputDate(d) : "");
  }, [kind, open, initial]);

  const canSave = Boolean(name.trim()) && Boolean(target.trim());

  const computedHint = useMemo(() => {
    const avg = parseCurrencyToCents(avgPerDelivery);
    const qtd = Math.max(0, Number(deliveries || 0));
    const costs = parseCurrencyToCents(estimatedCosts);
    if (!avg || !qtd) return null;
    const gross = avg * qtd;
    const net = Math.max(0, gross - (costs || 0));
    return { gross, net };
  }, [avgPerDelivery, deliveries, estimatedCosts]);

  function applyCalculator() {
    if (!computedHint) return;
    setTarget(centsToBRLString(computedHint.net));
  }

  function handleSubmit() {
    const cents = parseCurrencyToCents(target);
    if (!cents || !name.trim()) return;

    const clean = stripPrefix(name);
    const finalName = `${prefixFor(kind)}${clean}`.trim();

    const deadlineISO = deadline ? dateInputToISO(deadline) : null;

    onSave({
      name: finalName,
      targetCents: cents,
      deadline: deadlineISO
    });
  }

  const title = initial ? "Editar meta" : "Nova meta";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description="Defina um alvo claro para o dia/semana/mês e acompanhe sua evolução."
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={!canSave || saving || disabled}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {error ? <Alert message={error} /> : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-zinc-800">
            Tipo de meta
            <select
              className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
              value={kind}
              onChange={(e) => setKind(e.target.value as PresetKind)}
              disabled={disabled}
            >
              <option value="daily">Diária</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
              <option value="custom">Personalizada</option>
            </select>
          </label>

          <Input
            label="Prazo (opcional)"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            disabled={disabled}
          />
        </div>

        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} />

        <Input
          label="Valor alvo (R$)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="150,00"
          disabled={disabled}
        />

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Calculadora rápida (motoboy)</p>
          <p className="mt-1 text-sm text-zinc-600">
            Estime o alvo com base em entregas. Use custos do dia para pensar no líquido.
          </p>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <Input
              label="Média por entrega (R$)"
              value={avgPerDelivery}
              onChange={(e) => setAvgPerDelivery(e.target.value)}
              placeholder="10,00"
              disabled={disabled}
            />
            <Input
              label="Entregas (estimativa)"
              value={deliveries}
              onChange={(e) => setDeliveries(e.target.value)}
              placeholder="12"
              disabled={disabled}
            />
            <Input
              label="Custos do dia (R$)"
              value={estimatedCosts}
              onChange={(e) => setEstimatedCosts(e.target.value)}
              placeholder="25,00"
              disabled={disabled}
            />
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-zinc-500">
              {computedHint ? (
                <>
                  Estimativa bruto: <span className="font-semibold text-zinc-700">R$ {(computedHint.gross / 100).toFixed(2).replace(".", ",")}</span> •
                  líquido: <span className="font-semibold text-zinc-700">R$ {(computedHint.net / 100).toFixed(2).replace(".", ",")}</span>
                </>
              ) : (
                "Preencha média e entregas para ver a estimativa."
              )}
            </div>

            <Button variant="secondary" size="sm" onClick={applyCalculator} disabled={disabled || !computedHint}>
              Preencher alvo
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">Boas práticas</p>
          <ul className="mt-2 space-y-2 text-sm text-zinc-700">
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-2 w-2 rounded-full bg-teal-500" />
              <span>Crie metas curtas (dia/semana) e revise o mês com base no que você realmente consegue rodar.</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-2 inline-block h-2 w-2 rounded-full bg-teal-500" />
              <span>Considere custos: combustível, manutenção, taxas e alimentação impactam seu resultado.</span>
            </li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}
