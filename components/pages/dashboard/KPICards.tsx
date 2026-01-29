/* frontend/components/pages/dashboard/KPICards.tsx */
import KpiCard from "../../ui/KpiCard";
import { formatCurrencyBRL } from "../../../lib/format";

export default function KPICards({
  summary,
  loading
}: {
  summary?: { balance: number; income: number; expense: number; goalsMissing: number } | null;
  loading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <KpiCard
        title="Saldo"
        value={formatCurrencyBRL(summary?.balance ?? 0)}
        subtitle="Atualizado agora"
        accent="teal"
        loading={loading}
      />
      <KpiCard
        title="Entradas"
        value={formatCurrencyBRL(summary?.income ?? 0)}
        subtitle="Ultimos 30 dias"
        accent="sky"
        loading={loading}
      />
      <KpiCard
        title="Saidas"
        value={formatCurrencyBRL(summary?.expense ?? 0)}
        subtitle="Ultimos 30 dias"
        accent="amber"
        loading={loading}
      />
      <KpiCard
        title="Metas pendentes"
        value={formatCurrencyBRL(summary?.goalsMissing ?? 0)}
        subtitle="Comparado com entrada"
        accent="violet"
        loading={loading}
      />
    </div>
  );
}
