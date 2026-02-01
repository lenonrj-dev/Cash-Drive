/* frontend/components/pages/settings/components/controls/RadioRow.tsx */
"use client";

import React, { useMemo } from "react";

export default function RadioRow({
  name,
  label,
  defaultChecked
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  const id = useMemo(
    () => `r_${name}_${label.toLowerCase().replace(/\s+/g, "_")}_${Math.random().toString(16).slice(2)}`,
    [name, label]
  );

  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-3 rounded-2xl border border-zinc-200/70 bg-white px-4 py-3 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 focus-within:ring-2 focus-within:ring-teal-200"
    >
      <input id={id} name={name} type="radio" defaultChecked={defaultChecked} className="h-4 w-4 accent-teal-600" />
      {label}
    </label>
  );
}
