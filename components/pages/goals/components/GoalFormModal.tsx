/* frontend/components/pages/goals/components/GoalFormModal.tsx */
"use client";

import React, { useEffect, useState } from "react";
import Modal from "../../../ui/Modal";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import Alert from "../../../ui/Alert";
import type { Goal, GoalInput } from "../../../../types/api";
import { parseCurrencyToCents, toInputDate } from "../../../../lib/format";

export default function GoalFormModal({
  open,
  initial,
  onClose,
  onSave,
  saving,
  error,
  disabled
}: {
  open: boolean;
  initial?: Goal | null;
  onClose: () => void;
  onSave: (payload: GoalInput) => void;
  saving: boolean;
  error?: string | null;
  disabled?: boolean;
}) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initial?.name ?? "");
    setTarget(initial ? String(initial.targetCents / 100) : "");
    setDeadline(initial?.deadline ? toInputDate(initial.deadline) : "");
  }, [open, initial]);

  const canSave = Boolean(name.trim()) && Boolean(target.trim());

  function handleSubmit() {
    const cents = parseCurrencyToCents(target);
    if (!cents || !name.trim()) return;
    onSave({
      name: name.trim(),
      targetCents: cents,
      deadline: deadline ? new Date(deadline).toISOString() : null
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? "Editar meta" : "Nova meta"}
      description="Defina o alvo e opcionalmente a data limite."
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
          label="Valor alvo (R$)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          placeholder="800,00"
          disabled={disabled}
        />
        <Input
          label="Deadline (opcional)"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          disabled={disabled}
        />
      </div>
    </Modal>
  );
}
