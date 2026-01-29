/* frontend/components/pages/goals/components/GoalsToolbar.tsx */
"use client";

import Button from "../../../ui/Button";
import Card from "../../../ui/Card";

export default function GoalsToolbar({
  onOpenNew,
  canWrite
}: {
  onOpenNew: () => void;
  canWrite: boolean;
}) {
  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Metas</p>
          <h2 className="mt-2 text-lg font-bold text-zinc-900">Planeje seus objetivos</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Crie metas e acompanhe o quanto falta para alcancar.
          </p>
        </div>
        <Button disabled={!canWrite} onClick={onOpenNew}>
          Criar meta
        </Button>
      </div>
    </Card>
  );
}
