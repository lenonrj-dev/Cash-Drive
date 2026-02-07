/* frontend/components/pages/transactions/components/TransactionFormModal.tsx */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Modal from "../../../ui/Modal";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";
import Badge from "../../../ui/Badge";
import type { Transaction, TransactionInput } from "../../../../types/api";
import { parseCurrencyToCents, toInputDate } from "../../../../lib/format";
import { dateInputToISO, todayInputDate } from "../../../../lib/date";

function centsToBRLString(cents: number) {
  const n = (Number(cents || 0) / 100).toFixed(2);
  return n.replace(".", ",");
}

const QUICK_CATS = [
  { label: "Combustível", cat: "Combustível", note: "Gasolina" },
  { label: "Taxas", cat: "Taxas", note: "Taxa do app" },
  { label: "Alimentação", cat: "Alimentação", note: "Lanche" },
  { label: "Manutenção", cat: "Manutenção", note: "Peça/serviço" },
  { label: "Entrega", cat: "Entregas", note: "Repasse" }
];

export default function TransactionFormModal({
  open,
  initial,
  defaultType,
  onClose,
  onSave,
  saving,
  error,
  disabled
}: {
  open: boolean;
  initial?: Transaction | null;
  defaultType: TransactionInput["type"];
  onClose: () => void;
  onSave: (payload: TransactionInput) => void;
  saving: boolean;
  error?: string | null;
  disabled?: boolean;
}) {
  const [type, setType] = useState<TransactionInput["type"]>(defaultType);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const [addAnother, setAddAnother] = useState(false);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setType(initial.type ?? "EXPENSE");
      setAmount(centsToBRLString(initial.amountCents || 0));
      setCategory(initial.category ?? "");
      setNote(initial.note ?? "");
      setDate(initial.date ? toInputDate(initial.date) : todayInputDate());
    } else {
      setType(defaultType ?? "EXPENSE");
      setAmount("");
      setCategory("");
      setNote("");
      setDate(todayInputDate());
    }
    setAddAnother(false);
  }, [open, initial, defaultType]);

  const canSave = Boolean(amount.trim()) && Boolean(date);

  const amountCents = useMemo(() => parseCurrencyToCents(amount), [amount]);

  function applyQuickCat(label: string) {
    const found = QUICK_CATS.find((x) => x.label === label);
    if (!found) return;
    setCategory(found.cat);
    if (!note.trim()) setNote(found.note);
    if (found.label === "Entrega") setType("INCOME");
    else setType("EXPENSE");
  }

  function handleSubmit() {
    const cents = amountCents;
    if (!cents || !date) return;

    const payload: TransactionInput = {
      type,
      amountCents: cents,
      category: category.trim() ? category.trim() : null,
      note: note.trim() ? note.trim() : null,
      date: dateInputToISO(date)
    };

    onSave(payload);

    if (addAnother && !initial) {
      // mantem tipo e data, zera valores
      setAmount("");
      setCategory("");
      setNote("");
    }
  }

  const title = initial ? "Editar lançamento" : "Novo lançamento";
  const subtitle = initial
    ? "Ajuste os dados e confirme para atualizar."
    : "Registre rápido e siga para o próximo.";

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={subtitle}
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

        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{type === "INCOME" ? "Entrada" : "Saída"}</Badge>
            <Badge>{amountCents ? `R$ ${(amountCents / 100).toFixed(2).replace(".", ",")}` : "Sem valor"}</Badge>
          </div>

          {!initial ? (
            <label className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300"
                checked={addAnother}
                onChange={(e) => setAddAnother(e.target.checked)}
                disabled={disabled}
              />
              Salvar e adicionar outro
            </label>
          ) : null}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-zinc-800">
            Tipo
            <select
              className="mt-1 h-11 w-full rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              value={type}
              onChange={(e) => setType(e.target.value as TransactionInput["type"])}
              disabled={disabled}
            >
              <option value="INCOME">Entrada</option>
              <option value="EXPENSE">Saída</option>
            </select>
          </label>

          <Input
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={disabled}
          />
        </div>

        {!initial ? (
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Atalhos rápidos</p>
            <p className="mt-1 text-sm text-zinc-600">
              Selecione um padrão para preencher categoria e sugerir descrição.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {QUICK_CATS.map((x) => (
                <button
                  key={x.label}
                  type="button"
                  onClick={() => applyQuickCat(x.label)}
                  className="rounded-full border border-zinc-200/80 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  {x.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <Input
          label="Valor (R$)"
          placeholder="120,00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={disabled}
        />

        <Input
          label="Categoria"
          placeholder="Combustível, Alimentação..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={disabled}
        />

        <Input
          label="Descrição"
          placeholder="Ex.: Gasolina"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={disabled}
        />

        <div className="rounded-2xl border border-teal-200/70 bg-teal-50/70 p-4">
          <p className="text-sm font-semibold text-teal-800">Dica</p>
          <p className="mt-1 text-sm text-teal-800/90">
            Para ver lucro real, registre tudo que sai (taxas, combustível e manutenção). Assim suas metas ficam mais precisas.
          </p>
        </div>
      </div>
    </Modal>
  );
}
