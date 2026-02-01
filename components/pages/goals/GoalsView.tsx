/* frontend/components/pages/goals/GoalsView.tsx */
"use client";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BillingContext } from "../../../providers/BillingProvider";
import ReadOnlyBanner from "../dashboard/ReadOnlyBanner";
import GoalsToolbar from "./components/GoalsToolbar";
import GoalsSummary from "./components/GoalsSummary";
import GoalsFilters from "./components/GoalsFilters";
import GoalsList from "./components/GoalsList";
import GoalFormModal from "./components/GoalFormModal";
import GoalsHelpCard from "./components/GoalsHelpCard";
import Alert from "../../ui/Alert";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import { listGoals, createGoal, updateGoal, deleteGoal } from "../../../services/goalsService";
import { dateInputToISO } from "../../../lib/date";
import type { Goal, GoalInput } from "../../../types/api";

export type GoalKindFilter = "all" | "daily" | "weekly" | "monthly" | "custom";

type SortKey = "deadline_asc" | "deadline_desc" | "amount_desc" | "amount_asc" | "name_asc";

type PresetKind = Exclude<GoalKindFilter, "all">;

function parseKindFromName(name: string): PresetKind {
  const n = String(name || "").trim();
  if (n.startsWith("[Diaria]") || n.startsWith("[Diária]")) return "daily";
  if (n.startsWith("[Semanal]")) return "weekly";
  if (n.startsWith("[Mensal]")) return "monthly";
  return "custom";
}

function normalizeNameForSearch(name: string) {
  return String(name || "").toLowerCase();
}

function hasDeadline(g: Goal) {
  return Boolean(g.deadline);
}

function deadlineTime(g: Goal) {
  if (!g.deadline) return Infinity;
  return new Date(dateInputToISO(g.deadline)).getTime();
}

export default function GoalsView() {
  const billing = useContext(BillingContext);
  const canWrite = Boolean(billing?.canWrite);

  const [items, setItems] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);
  const [preset, setPreset] = useState<PresetKind>("daily");
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<GoalKindFilter>("all");
  const [sort, setSort] = useState<SortKey>("deadline_asc");
  const [hideNoDeadline, setHideNoDeadline] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await listGoals();
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

    if (kind !== "all") {
      next = next.filter((g) => parseKindFromName(g.name) === kind);
    }

    if (hideNoDeadline) {
      next = next.filter((g) => Boolean(g.deadline));
    }

    if (q) {
      next = next.filter((g) => normalizeNameForSearch(g.name).includes(q));
    }

    const byName = (a: Goal, b: Goal) => String(a.name || "").localeCompare(String(b.name || ""), "pt-BR");
    const byAmount = (a: Goal, b: Goal) => (a.targetCents || 0) - (b.targetCents || 0);

    const sorted = [...next];

    if (sort === "deadline_asc") {
      sorted.sort((a, b) => deadlineTime(a) - deadlineTime(b));
    }

    if (sort === "deadline_desc") {
      sorted.sort((a, b) => deadlineTime(b) - deadlineTime(a));
    }

    if (sort === "amount_asc") sorted.sort(byAmount);
    if (sort === "amount_desc") sorted.sort((a, b) => byAmount(b, a));
    if (sort === "name_asc") sorted.sort(byName);

    return sorted;
  }, [items, query, kind, sort, hideNoDeadline]);

  const openNew = (k: PresetKind) => {
    if (!canWrite) return;
    setEditing(null);
    setFormError(null);
    setPreset(k);
    setModalOpen(true);
  };

  const onEdit = (goal: Goal) => {
    if (!canWrite) return;
    setEditing(goal);
    setFormError(null);
    setPreset(parseKindFromName(goal.name));
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
      const message = err instanceof Error ? err.message : "Não foi possível excluir";
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
      const message = err instanceof Error ? err.message : "Não foi possível salvar";
      setFormError(message);
    } finally {
      setSaving(false);
    }
  };

  const onQuickDeadline = async (goal: Goal, nextDeadlineISO: string | null) => {
    if (!canWrite) return;
    setError(null);
    try {
      await updateGoal(goal.id, {
        name: goal.name,
        targetCents: goal.targetCents,
        deadline: nextDeadlineISO
      });
      load();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível atualizar";
      setError(message);
    }
  };

  function clearFilters() {
    setQuery("");
    setKind("all");
    setSort("deadline_asc");
    setHideNoDeadline(false);
  }

  return (
    <div className="space-y-4">
      {!canWrite ? <ReadOnlyBanner message={billing?.reason || "Ative um plano para liberar ações."} /> : null}

      <GoalsToolbar
        canWrite={canWrite}
        onOpenDaily={() => openNew("daily")}
        onOpenWeekly={() => openNew("weekly")}
        onOpenMonthly={() => openNew("monthly")}
        onOpenCustom={() => openNew("custom")}
        onToggleHelp={() => setShowHelp((v) => !v)}
        helpOpen={showHelp}
      />

      {showHelp ? <GoalsHelpCard /> : null}

      <GoalsSummary items={items} filteredCount={filtered.length} loading={loading} />

      <GoalsFilters
        query={query}
        kind={kind}
        sort={sort}
        hideNoDeadline={hideNoDeadline}
        onQueryChange={setQuery}
        onKindChange={setKind}
        onSortChange={setSort}
        onHideNoDeadlineChange={setHideNoDeadline}
        onClear={clearFilters}
      />

      {loading ? (
        <Card className="p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Carregando metas...</p>
              <p className="mt-1 text-sm text-zinc-600">Preparando seu planejamento de rua.</p>
            </div>
            <Button variant="secondary" disabled>
              Aguarde
            </Button>
          </div>
        </Card>
      ) : null}

      {error ? <Alert message={error} /> : null}

      <GoalsList
        items={filtered}
        onEdit={onEdit}
        onDelete={onDelete}
        onQuickDeadline={onQuickDeadline}
        canWrite={canWrite}
        activeFilters={{ query, kind, sort, hideNoDeadline }}
      />

      <GoalFormModal
        open={modalOpen}
        initial={editing}
        presetKind={preset}
        onClose={() => setModalOpen(false)}
        onSave={onSave}
        saving={saving}
        error={formError}
        disabled={!canWrite}
      />
    </div>
  );
}
