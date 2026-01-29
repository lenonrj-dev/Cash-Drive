/* frontend/components/pages/transactions/components/TransactionFormModal.tsx */
"use client";

import React, { useEffect, useState } from "react";
import Modal from "../../../ui/Modal";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";
import type { Transaction, TransactionInput } from "../../../../types/api";
import { parseCurrencyToCents, toInputDate } from "../../../../lib/format";

export default function TransactionFormModal({
  open,
  initial,
  onClose,
  onSave,
  saving,
  error,
  disabled
}: {
  open: boolean;
  initial?: Transaction | null;
  onClose: () => void;
  onSave: (payload: TransactionInput) => void;
  saving: boolean;
  error?: string | null;
  disabled?: boolean;
}) {
  const [type, setType] = useState<TransactionInput["type"]>("EXPENSE");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!open) return;
    setType(initial?.type ?? "EXPENSE");
    setAmount(initial ? String(initial.amountCents / 100) : "");
    setCategory(initial?.category ?? "");
    setNote(initial?.note ?? "");
    setDate(initial?.date ? toInputDate(initial.date) : toInputDate(new Date().toISOString()));
  }, [open, initial]);

  const canSave = Boolean(amount.trim()) && Boolean(date);

  function handleSubmit() {
    const cents = parseCurrencyToCents(amount);
    if (!cents || !date) return;
    const payload: TransactionInput = {
      type,
      amountCents: cents,
      category: category.trim() ? category.trim() : null,
      note: note.trim() ? note.trim() : null,
      date: new Date(date).toISOString()
    };
    onSave(payload);
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Editar lancamento" : "Novo lancamento"}
      description="Preencha os dados e confirme para salvar."
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

        <label className="block text-sm font-semibold text-zinc-800">
          Tipo
          <select
            className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-200"
            value={type}
            onChange={(e) => setType(e.target.value as TransactionInput["type"])}
            disabled={disabled}
          >
            <option value="INCOME">Entrada</option>
            <option value="EXPENSE">Saida</option>
          </select>
        </label>

        <Input
          label="Valor (R$)"
          placeholder="120,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={disabled}
        />

        <Input
          label="Categoria"
          placeholder="Combustivel, Alimentacao..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={disabled}
        />

        <Input
          label="Descricao"
          placeholder="Ex.: Gasolina"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={disabled}
        />

        <Input label="Data" type="date" value={date} onChange={(e) => setDate(e.target.value)} disabled={disabled} />
      </div>
    </Modal>
  );
}
