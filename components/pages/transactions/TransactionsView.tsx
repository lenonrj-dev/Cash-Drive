/* frontend/components/pages/transactions/TransactionsView.tsx */
"use client";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "../dashboard/ReadOnlyBanner";
import TransactionsToolbar from "./components/TransactionsToolbar";
import TransactionsSummary from "./components/TransactionsSummary";
import TransactionsFilters from "./components/TransactionsFilters";
import TransactionsHelpCard from "./components/TransactionsHelpCard";
import TransactionsTable from "./components/TransactionsTable";
import TransactionFormModal from "./components/TransactionFormModal";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import {
  listTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../../../services/transactionsService";
import type { Transaction, TransactionInput } from "../../../types/api";
import type { TransactionType } from "../../../types/common";
import { formatCurrencyBRL } from "../../../lib/format";
import { dateInputToISO, todayInputDate } from "../../../lib/date";

type QuickRange = "today" | "week" | "month" | "custom";

function startOfTodayInput() {
  return todayInputDate();
}

function startOfWeekInput() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const day = d.getDay();
  const diff = (day + 6) % 7;
  d.setDate(d.getDate() - diff);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayStr}`;
}

function startOfMonthInput() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const dayStr = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${dayStr}`;
}

function safeISOFromInputDate(v: string) {
  if (!v) return undefined;
  return v;
}

function normalize(q: string) {
  return String(q || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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
  const [range, setRange] = useState<QuickRange>("custom");
  const [showHelp, setShowHelp] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [pendingType, setPendingType] = useState<TransactionInput["type"]>("EXPENSE");

  // SEO técnico (sem Head/metadata aqui): landmarks, headings e copy mais claras.

  useEffect(() => {
    // default: mostrar o mês atual (boa UX para motoboy)
    if (from || to) return;
    setRange("month");
    setFrom(startOfMonthInput());
    setTo(startOfTodayInput());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (range === "custom") return;
    if (range === "today") {
      const d = startOfTodayInput();
      setFrom(d);
      setTo(d);
    }
    if (range === "week") {
      setFrom(startOfWeekInput());
      setTo(startOfTodayInput());
    }
    if (range === "month") {
      setFrom(startOfMonthInput());
      setTo(startOfTodayInput());
    }
  }, [range]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await listTransactions({
        search: search.trim() ? search.trim() : undefined,
        from: safeISOFromInputDate(from),
        to: safeISOFromInputDate(to),
        type: type || undefined
      });
      setItems(Array.isArray(res?.items) ? res.items : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível carregar";
      setError(message);
      setItems([]);
    }

    setLoading(false);
  }, [search, from, to, type]);

  useEffect(() => {
    const t = setTimeout(() => {
      load();
    }, 300);
    return () => clearTimeout(t);
  }, [load]);

  const openNew = (nextType?: TransactionInput["type"]) => {
    if (!canWrite) return;
    setEditing(null);
    setFormError(null);
    setPendingType(nextType ?? "EXPENSE");
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
    const ok = window.confirm("Deseja excluir este lançamento?");
    if (!ok) return;

    try {
      await deleteTransaction(item.id);
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível excluir";
      setError(message);
    }
  };

  const onQuickDuplicate = async (item: Transaction) => {
    if (!canWrite) return;
    setError(null);
    try {
      await createTransaction({
        type: item.type,
        amountCents: item.amountCents,
        category: item.category ?? null,
        note: item.note ?? null,
        date: dateInputToISO(todayInputDate())
      });
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível duplicar";
      setError(message);
    }
  };

  const onSave = async (payload: TransactionInput) => {
    setFormError(null);
    setSaving(true);
    try {
      if (editing) await updateTransaction(editing.id, payload);
      else await createTransaction(payload);
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar";
      setFormError(message);
    } finally {
      setSaving(false);
    }
  };

  const tableItems = useMemo(() => {
    // proteção extra: filtra client-side também (mantém semântico se backend ignorar search)
    const q = normalize(search);
    if (!q) return items;
    return items.filter((t) => {
      const base = normalize(`${t.note || ""} ${t.category || ""}`);
      return base.includes(q);
    });
  }, [items, search]);

  const stats = useMemo(() => {
    let income = 0;
    let expense = 0;

    for (const t of tableItems) {
      if (t.type === "INCOME") income += t.amountCents || 0;
      else expense += t.amountCents || 0;
    }

    const balance = income - expense;

    const last = tableItems[0] || null;

    return {
      income,
      expense,
      balance,
      count: tableItems.length,
      last
    };
  }, [tableItems]);

  function clearFilters() {
    setSearch("");
    setType("");
    setRange("month");
    setFrom(startOfMonthInput());
    setTo(startOfTodayInput());
  }

  return (
    <main className="space-y-4" aria-label="Lançamentos">
      {!canWrite ? (
        <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar ações."} />
      ) : null}

      <TransactionsToolbar
        search={search}
        onSearch={setSearch}
        onOpenNew={openNew}
        onToggleFilters={() => setFiltersOpen((prev) => !prev)}
        onToggleHelp={() => setShowHelp((v) => !v)}
        filtersOpen={filtersOpen}
        helpOpen={showHelp}
        canWrite={canWrite}
      />

      {showHelp ? <TransactionsHelpCard /> : null}

      <TransactionsSummary
        loading={loading}
        incomeLabel={formatCurrencyBRL(stats.income)}
        expenseLabel={formatCurrencyBRL(stats.expense)}
        balanceLabel={formatCurrencyBRL(stats.balance)}
        count={stats.count}
        last={stats.last}
      />

      {filtersOpen ? (
        <TransactionsFilters
          range={range}
          from={from}
          to={to}
          type={type}
          onRange={setRange}
          onFrom={setFrom}
          onTo={setTo}
          onType={setType}
          onClear={clearFilters}
        />
      ) : null}

      {loading ? (
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Carregando lançamentos...</p>
              <p className="mt-1 text-sm text-zinc-600">Buscando movimentações no período selecionado.</p>
            </div>
            <Button variant="secondary" disabled>
              Aguarde
            </Button>
          </div>
        </Card>
      ) : null}

      {error ? <Alert message={error} /> : null}

      <TransactionsTable
        items={tableItems}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onQuickDuplicate}
        canWrite={canWrite}
      />

      <TransactionFormModal
        open={modalOpen}
        initial={editing}
        defaultType={pendingType}
        onClose={() => setModalOpen(false)}
        onSave={onSave}
        saving={saving}
        error={formError}
        disabled={!canWrite}
      />
    </main>
  );
}
