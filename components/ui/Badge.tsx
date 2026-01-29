/* frontend/components/ui/Badge.tsx */
export default function Badge({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        "border-teal-200/70 bg-teal-50 text-teal-700",
        "",
        className
      ].join(" ")}
    >
      {children}
    </span>
  );
}
