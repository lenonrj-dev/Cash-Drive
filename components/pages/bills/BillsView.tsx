/* frontend/components/pages/bills/BillsView.tsx */
"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "../dashboard/ReadOnlyBanner";
import BillsToolbar from "./components/BillsToolbar";
import BillsList from "./components/BillsList";
import BillFormModal from "./components/BillFormModal";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import { listBills, createBill, updateBill, deleteBill } from "../../../services/billsService";
import type { Bill, BillInput } from "../../../types/api";

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

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listBills();
    if (res.ok) setItems(res.data);
    else setError(res.error.message);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
    const res = await deleteBill(bill.id);
    if (!res.ok) {
      setError(res.error.message);
      return;
    }
    load();
  };

  const onSave = async (payload: BillInput) => {
    setFormError(null);
    setSaving(true);
    const res = editing ? await updateBill(editing.id, payload) : await createBill(payload);
    setSaving(false);
    if (!res.ok) {
      setFormError(res.error.message);
      return;
    }
    setModalOpen(false);
    setEditing(null);
    load();
  };

  return (
    <div className="space-y-4">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar acoes."} /> : null}

      <BillsToolbar onOpenNew={openNew} canWrite={canWrite} />

      {loading ? (
        <Card>
          <p className="text-sm text-zinc-600">Carregando contas...</p>
        </Card>
      ) : null}

      {error ? <Alert message={error} /> : null}

      <BillsList items={items} onEdit={onEdit} onDelete={onDelete} canWrite={canWrite} />

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
