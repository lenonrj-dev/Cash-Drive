/* frontend/components/pages/settings/components/fields/PasswordField.tsx */
"use client";

import React, { useMemo } from "react";

export default function PasswordField({
  label,
  value,
  onChange,
  autoComplete
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}) {
  const id = useMemo(
    () => `p_${label.toLowerCase().replace(/\s+/g, "_")}_${Math.random().toString(16).slice(2)}`,
    [label]
  );

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-zinc-800">
        {label}
      </label>
      <input
        id={id}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="mt-2 h-11 w-full rounded-2xl border border-zinc-200/80 bg-white px-4 text-sm text-zinc-900 placeholder:text-zinc-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200"
      />
    </div>
  );
}
