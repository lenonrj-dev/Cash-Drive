/* frontend/components/pages/settings/components/fields/SelectField.tsx */
"use client";

import React, { useMemo } from "react";

export default function SelectField({
  label,
  hint,
  value,
  onChange,
  options
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  const id = useMemo(
    () => `s_${label.toLowerCase().replace(/\s+/g, "_")}_${Math.random().toString(16).slice(2)}`,
    [label]
  );

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-zinc-900">
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
