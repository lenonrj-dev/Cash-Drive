/* frontend/components/pages/bills/components/BillFormModal.tsx */
"use client";

import React, { useEffect, useState } from "react";
import Modal from "../../../ui/Modal";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";
import type { Bill, BillInput } from "../../../../types/api";
import { parseCurrencyToCents, toInputDate } from "../../../../lib/format";

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
    setAmount(initial ? String(initial.amountCents / 100) : "");
    setDueDate(initial?.dueDate ? toInputDate(initial.dueDate) : "");
    setRecurring(initial?.recurring ?? false);
    setStatus(initial?.status ?? "open");
  }, [open, initial]);

  const canSave = Boolean(name.trim()) && Boolean(amount.trim()) && Boolean(dueDate);

  function handleSubmit() {
    const cents = parseCurrencyToCents(amount);
    if (!cents || !name.trim() || !dueDate) return;
    onSave({
      name: name.trim(),
      amountCents: cents,
      dueDate: new Date(dueDate).toISOString(),
      recurring,
      status
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Editar conta" : "Nova conta"}
      description="Registre valor, vencimento e status da conta."
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

        <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} />
        <Input
          label="Valor (R$)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="99,90"
          disabled={disabled}
        />
        <Input label="Vencimento" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} disabled={disabled} />

        <label className="flex items-center gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-zinc-300"
            checked={recurring}
            onChange={(e) => setRecurring(e.target.checked)}
            disabled={disabled}
          />
          Conta recorrente
        </label>

        <label className="block text-sm font-semibold text-zinc-800">
          Status
          <select
            className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            value={status}
            onChange={(e) => setStatus(e.target.value as BillInput["status"])}
            disabled={disabled}
          >
            <option value="open">Aberta</option>
            <option value="paid">Paga</option>
            <option value="late">Atrasada</option>
          </select>
        </label>
      </div>
    </Modal>
  );
}
