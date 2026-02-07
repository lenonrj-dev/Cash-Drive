/* frontend/components/pages/common/PageHeader.tsx */
export default function PageHeader({
  title,
  subtitle,
  right
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <header className="flex mt-20 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Rota Fin</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-900">{title}</h1>
        {subtitle ? (
          <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </header>
  );
}
