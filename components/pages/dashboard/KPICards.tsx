/* frontend/components/pages/dashboard/KPICards.tsx */
import KpiCard from "../../ui/KpiCard";
import { formatCurrencyBRL } from "../../../lib/format";

export default function KPICards({
  summary,
  loading
}: {
  summary?: {
    balance: number;
    income: number;
    expense: number;
    goalsMissing: number;
    billsMissing: number;
  } | null;
  loading: boolean;
}) {
  const pending = (summary?.goalsMissing ?? 0) + (summary?.billsMissing ?? 0);

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores principais">
      <KpiCard
        title="Saldo"
        value={formatCurrencyBRL(summary?.balance ?? 0)}
        subtitle="Visão atual"
        accent="teal"
        loading={loading}
      />
      <KpiCard
        title="Entradas"
        value={formatCurrencyBRL(summary?.income ?? 0)}
        subtitle="Últimos 30 dias"
        accent="sky"
        loading={loading}
      />
      <KpiCard
        title="Saídas"
        value={formatCurrencyBRL(summary?.expense ?? 0)}
        subtitle="Últimos 30 dias"
        accent="amber"
        loading={loading}
      />
      <KpiCard
        title="Pendências"
        value={formatCurrencyBRL(pending)}
        subtitle="Metas + contas"
        accent="violet"
        loading={loading}
      />
    </section>
  );
}
