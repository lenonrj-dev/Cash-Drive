/* frontend/components/pages/bills/components/BillFormModal.tsx */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../../ui/Modal";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";
import type { Bill, BillInput } from "../../../../types/api";
import { parseCurrencyToCents, toInputDate } from "../../../../lib/format";
import { dateInputToISO } from "../../../../lib/date";

function centsToBRInput(cents: number) {
  const value = (cents || 0) / 100;
  const fixed = value.toFixed(2);
  return fixed.replace(".", ",");
}

export default function BillFormModal({
  open,
  initial,
  onClose,
  onSave,
  saving,
  error,
  disabled
}: {
  open: boolean;
  initial?: Bill | null;
  onClose: () => void;
  onSave: (payload: BillInput) => void;
  saving: boolean;
  error?: string | null;
  disabled?: boolean;
}) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [status, setStatus] = useState<BillInput["status"]>("open");

  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? "");
    setAmount(initial ? centsToBRInput(initial.amountCents) : "");
    setDueDate(initial?.dueDate ? toInputDate(initial.dueDate) : "");
    setRecurring(initial?.recurring ?? false);
    setStatus(initial?.status ?? "open");
  }, [open, initial]);

  const canSave = Boolean(name.trim()) && Boolean(amount.trim()) && Boolean(dueDate);

  const previewCents = useMemo(() => {
    const cents = parseCurrencyToCents(amount);
    return cents || 0;
  }, [amount]);

  function handleSubmit() {
    const cents = parseCurrencyToCents(amount);
    if (!cents || !name.trim() || !dueDate) return;
    onSave({
      name: name.trim(),
      amountCents: cents,
      dueDate: dateInputToISO(dueDate),
      recurring,
      status
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Editar conta" : "Nova conta"}
      description="Registre valor, vencimento, recorrência e status para manter sua previsão do mês fiel."
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
      <div className="space-y-3">
        {error ? <Alert message={error} /> : null}

        <Input
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={disabled}
          placeholder="Ex: Internet, Aluguel, Energia"
        />

        <Input
          label="Valor (R$)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="99,90"
          disabled={disabled}
        />

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-3">
          <p className="text-xs text-zinc-600">
            Prévia: <span className="font-semibold text-zinc-900">R$ {(previewCents / 100).toFixed(2).replace(".", ",")}</span>
            <span className="mx-2 text-zinc-300">•</span>
            Use vírgula para centavos (ex: 120,50).
          </p>
        </div>

        <Input
          label="Vencimento"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          disabled={disabled}
        />

        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-300"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            disabled={disabled}
            aria-label="Conta recorrente"
          />
          Conta recorrente (mensal)
        </label>

        <label className="block text-sm font-semibold text-zinc-800">
          Status
          <select
            className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            value={status}
            onChange={(e) => setStatus(e.target.value as BillInput["status"])}
            disabled={disabled}
            aria-label="Status da conta"
          >
            <option value="open">Aberta</option>
            <option value="paid">Paga</option>
            <option value="late">Atrasada</option>
          </select>
        </label>

        <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <p className="text-sm font-semibold text-zinc-900">SEO técnico (conteúdo útil)</p>
          <p className="mt-1 text-sm text-zinc-600">
            Registrar contas melhora seu controle de caixa: você identifica vencimentos antes do prazo, evita juros e
            consegue comparar com suas entradas para bater metas com previsibilidade.
          </p>
        </div>
      </div>
    </Modal>
  );
}
