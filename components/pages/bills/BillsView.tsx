/* frontend/components/pages/bills/BillsView.tsx */
"use client";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "../dashboard/ReadOnlyBanner";
import BillsToolbar from "./components/BillsToolbar";
import BillsSummary from "./components/BillsSummary";
import BillsFilters from "./components/BillsFilters";
import BillsList from "./components/BillsList";
import BillFormModal from "./components/BillFormModal";
import BillsHelpCard from "./components/BillsHelpCard";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { listBills, createBill, updateBill, deleteBill } from "../../../services/billsService";
import type { Bill, BillInput } from "../../../types/api";

type StatusFilter = "all" | Bill["status"];

type SortKey = "due_asc" | "due_desc" | "amount_desc" | "amount_asc" | "name_asc";

type RecurringFilter = "all" | "recurring" | "oneoff";

export default function BillsView() {
  const billing = useContext(BillingContext);
  const canWrite = Boolean(billing?.canWrite);

  const [items, setItems] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Bill | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("due_asc");
  const [recurring, setRecurring] = useState<RecurringFilter>("all");
  const [showHelp, setShowHelp] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listBills();
      setItems(Array.isArray(res?.items) ? res.items : []);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível carregar";
      setError(message);
      setItems([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let next = items;

    if (status !== "all") {
      next = next.filter((b) => b.status === status);
    }

    if (recurring !== "all") {
      next = next.filter((b) => (recurring === "recurring" ? Boolean(b.recurring) : !b.recurring));
    }

    if (q) {
      next = next.filter((b) => String(b.name || "").toLowerCase().includes(q));
    }

    const byDate = (a: Bill, b: Bill) => {
      const da = new Date(a.dueDate).getTime();
      const db = new Date(b.dueDate).getTime();
      return da - db;
    };

    const byAmount = (a: Bill, b: Bill) => (a.amountCents || 0) - (b.amountCents || 0);

    const byName = (a: Bill, b: Bill) => String(a.name || "").localeCompare(String(b.name || ""), "pt-BR");

    const sorted = [...next];

    if (sort === "due_asc") sorted.sort(byDate);
    if (sort === "due_desc") sorted.sort((a, b) => byDate(b, a));
    if (sort === "amount_asc") sorted.sort(byAmount);
    if (sort === "amount_desc") sorted.sort((a, b) => byAmount(b, a));
    if (sort === "name_asc") sorted.sort(byName);

    return sorted;
  }, [items, query, status, sort, recurring]);

  const openNew = () => {
    if (!canWrite) return;
    setEditing(null);
    setFormError(null);
    setModalOpen(true);
  };

  const onEdit = (bill: Bill) => {
    if (!canWrite) return;
    setEditing(bill);
    setFormError(null);
    setModalOpen(true);
  };

  const onDelete = async (bill: Bill) => {
    if (!canWrite) return;
    const ok = window.confirm("Deseja excluir esta conta?");
    if (!ok) return;
    try {
      await deleteBill(bill.id);
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível excluir";
      setError(message);
    }
  };

  const onQuickStatus = async (bill: Bill, nextStatus: BillInput["status"]) => {
    if (!canWrite) return;
    setError(null);
    try {
      await updateBill(bill.id, {
        name: bill.name,
        amountCents: bill.amountCents,
        dueDate: bill.dueDate,
        recurring: Boolean(bill.recurring),
        status: nextStatus
      });
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível atualizar";
      setError(message);
    }
  };

  const onSave = async (payload: BillInput) => {
    setFormError(null);
    setSaving(true);
    try {
      if (editing) await updateBill(editing.id, payload);
      else await createBill(payload);
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

  function clearFilters() {
    setQuery("");
    setStatus("all");
    setSort("due_asc");
    setRecurring("all");
  }

  return (
    <div className="space-y-4">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar ações."} /> : null}

      <BillsToolbar
        onOpenNew={openNew}
        canWrite={canWrite}
        onToggleHelp={() => setShowHelp((v) => !v)}
        helpOpen={showHelp}
      />

      {showHelp ? <BillsHelpCard /> : null}

      <BillsSummary items={items} filteredCount={filtered.length} loading={loading} />

      <BillsFilters
        query={query}
        status={status}
        sort={sort}
        recurring={recurring}
        onQueryChange={setQuery}
        onStatusChange={setStatus}
        onSortChange={setSort}
        onRecurringChange={setRecurring}
        onClear={clearFilters}
      />

      {loading ? (
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Carregando contas...</p>
              <p className="mt-1 text-sm text-zinc-600">Buscando sua agenda financeira.</p>
            </div>
            <Button variant="secondary" disabled>
              Aguarde
            </Button>
          </div>
        </Card>
      ) : null}

      {error ? <Alert message={error} /> : null}

      <BillsList
        items={filtered}
        onEdit={onEdit}
        onDelete={onDelete}
        onQuickStatus={onQuickStatus}
        canWrite={canWrite}
        activeFilters={{ query, status, sort, recurring }}
      />

      <BillFormModal
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
