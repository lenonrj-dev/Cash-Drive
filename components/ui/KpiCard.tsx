/* frontend/components/ui/KpiCard.tsx */
import Card from "./Card";

export default function KpiCard({
  title,
  value,
  subtitle,
  accent = "teal",
  loading
}: {
  title: string;
  value: string;
  subtitle?: string;
  accent?: "teal" | "violet" | "amber" | "sky";
  loading?: boolean;
}) {
  const accentMap: Record<string, string> = {
    teal: "bg-teal-50 text-teal-700",
    violet: "bg-violet-50 text-violet-700",
    amber: "bg-amber-50 text-amber-700",
    sky: "bg-emerald-50 text-emerald-700"
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-zinc-500">{title}</p>
          {loading ? (
            <div className="mt-2 h-6 w-24 animate-pulse rounded-lg bg-zinc-100" />
          ) : (
            <p className="mt-2 text-2xl font-bold text-zinc-900">{value}</p>
          )}
          {subtitle ? (
            <p className="mt-1 text-xs text-zinc-500">{subtitle}</p>
          ) : null}
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${accentMap[accent]}`}>Hoje</span>
      </div>
    </Card>
  );
}
