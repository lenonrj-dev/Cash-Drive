/* frontend/components/pages/settings/components/fields/Field.tsx */
"use client";

import React, { useMemo } from "react";

export default function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  inputMode,
  autoComplete
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  const id = useMemo(
    () => `f_${label.toLowerCase().replace(/\s+/g, "_")}_${Math.random().toString(16).slice(2)}`,
    [label]
  );

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-zinc-900">
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      />
    </div>
  );
}
