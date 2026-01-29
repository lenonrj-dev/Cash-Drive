/* frontend/components/pages/bills/components/BillsToolbar.tsx */
"use client";

import Button from "../../../ui/Button";
import Card from "../../../ui/Card";

export default function BillsToolbar({
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Contas</p>
          <h2 className="mt-2 text-lg font-bold text-zinc-900">Controle vencimentos</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Organize vencimentos, recorrencia e status de pagamento.
          </p>
        </div>
        <Button disabled={!canWrite} onClick={onOpenNew}>
          Adicionar conta
        </Button>
      </div>
    </Card>
  );
}
