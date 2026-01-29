/* frontend/components/pages/transactions/TransactionsView.tsx */
"use client";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "../dashboard/ReadOnlyBanner";
import TransactionsToolbar from "./components/TransactionsToolbar";
import TransactionsTable from "./components/TransactionsTable";
import TransactionFormModal from "./components/TransactionFormModal";
import Alert from "../../ui/Alert";
import {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../../../services/transactionsService";
import type { Transaction, TransactionInput } from "../../../types/api";
import type { TransactionType } from "../../../types/common";

export default function TransactionsView() {
  const billing = useContext(BillingContext);
  const canWrite = Boolean(billing?.canWrite);

  const [items, setItems] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [type, setType] = useState<TransactionType | "">("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    const res = await listTransactions({
      search: search.trim() ? search.trim() : undefined,
      from: from ? new Date(from).toISOString() : undefined,
      to: to ? new Date(to).toISOString() : undefined,
      type: type || undefined
    });

    if (res.ok) {
      setItems(res.data);
    } else {
      setError(res.error.message);
    }
    setLoading(false);
  }, [search, from, to, type]);

  useEffect(() => {
    const t = setTimeout(() => {
      load();
    }, 300);
    return () => clearTimeout(t);
  }, [load]);

  const openNew = () => {
    if (!canWrite) return;
    setEditing(null);
    setFormError(null);
    setModalOpen(true);
  };

  const onEdit = (item: Transaction) => {
    if (!canWrite) return;
    setEditing(item);
    setFormError(null);
    setModalOpen(true);
  };

  const onDelete = async (item: Transaction) => {
    if (!canWrite) return;
    const ok = window.confirm("Deseja excluir este lancamento?");
    if (!ok) return;

    const res = await deleteTransaction(item.id);
    if (!res.ok) {
      setError(res.error.message);
      return;
    }
    load();
  };

  const onSave = async (payload: TransactionInput) => {
    setFormError(null);
    setSaving(true);
    const res = editing
      ? await updateTransaction(editing.id, payload)
      : await createTransaction(payload);
    setSaving(false);

    if (!res.ok) {
      setFormError(res.error.message);
      return;
    }

    setModalOpen(false);
    setEditing(null);
    load();
  };

  const tableItems = useMemo(() => items, [items]);

  return (
    <div className="space-y-4">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar acoes."} /> : null}

      <TransactionsToolbar
        search={search}
        onSearch={setSearch}
        onOpenNew={openNew}
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
        canWrite={canWrite}
      />

      {filtersOpen ? (
        <div className="rounded-[20px] border border-zinc-200/70 bg-white/80 p-4 text-sm shadow-sm">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-zinc-500">De</span>
              <input
                type="date"
                className="h-10 rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 shadow-sm"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-zinc-500">Ate</span>
              <input
                type="date"
                className="h-10 rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 shadow-sm"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-zinc-500">Tipo</span>
              <select
                className="h-10 rounded-xl border border-zinc-200/80 bg-white px-3 text-sm text-zinc-900 shadow-sm"
                value={type}
                onChange={(e) => setType(e.target.value as TransactionType | "")}
              >
                <option value="">Todos</option>
                <option value="INCOME">Entrada</option>
                <option value="EXPENSE">Saida</option>
              </select>
            </label>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-[20px] border border-zinc-200/70 bg-white/80 p-6 text-sm text-zinc-600 shadow-sm">
          Carregando lancamentos...
        </div>
      ) : null}

      {error ? <Alert message={error} /> : null}

      <TransactionsTable items={tableItems} onEdit={onEdit} onDelete={onDelete} canWrite={canWrite} />

      <TransactionFormModal
        open={modalOpen}
        initial={editing}
        onClose={() => setModalOpen(false)}
        onSave={onSave}
        saving={saving}
        error={formError}
        disabled={!canWrite}
      />
    </div>
  );
}
