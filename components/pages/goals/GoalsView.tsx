/* frontend/components/pages/goals/GoalsView.tsx */
"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "../dashboard/ReadOnlyBanner";
import GoalsToolbar from "./components/GoalsToolbar";
import GoalsList from "./components/GoalsList";
import GoalFormModal from "./components/GoalFormModal";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import { listGoals, createGoal, updateGoal, deleteGoal } from "../../../services/goalsService";
import type { Goal, GoalInput } from "../../../types/api";

export default function GoalsView() {
  const billing = useContext(BillingContext);
  const canWrite = Boolean(billing?.canWrite);

  const [items, setItems] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listGoals();
      setItems(res.items);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel carregar";
      setError(message);
      setItems([]);
    }
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

  const onEdit = (goal: Goal) => {
    if (!canWrite) return;
    setEditing(goal);
    setFormError(null);
    setModalOpen(true);
  };

  const onDelete = async (goal: Goal) => {
    if (!canWrite) return;
    const ok = window.confirm("Deseja excluir esta meta?");
    if (!ok) return;
    try {
      await deleteGoal(goal.id);
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel excluir";
      setError(message);
    }
  };

  const onSave = async (payload: GoalInput) => {
    setFormError(null);
    setSaving(true);
    try {
      if (editing) await updateGoal(editing.id, payload);
      else await createGoal(payload);
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Nao foi possivel salvar";
      setFormError(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar acoes."} /> : null}

      <GoalsToolbar onOpenNew={openNew} canWrite={canWrite} />

      {loading ? (
        <Card>
          <p className="text-sm text-zinc-600">Carregando metas...</p>
        </Card>
      ) : null}

      {error ? <Alert message={error} /> : null}

      <GoalsList items={items} onEdit={onEdit} onDelete={onDelete} canWrite={canWrite} />

      <GoalFormModal
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
