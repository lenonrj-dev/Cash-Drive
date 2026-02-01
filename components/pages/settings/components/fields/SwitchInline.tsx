/* frontend/components/pages/settings/components/controls/SwitchInline.tsx */
"use client";

import React from "react";

export default function SwitchInline({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-sm font-semibold text-zinc-800">{label}</p>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={[
          "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border shadow-sm transition focus:outline-none focus:ring-2 focus:ring-teal-200",
          checked ? "border-teal-600 bg-teal-600" : "border-zinc-200 bg-white"
        ].join(" ")}
        aria-label={label}
      >
        <span
          className={[
            "inline-block h-6 w-6 transform rounded-full bg-white shadow transition",
            checked ? "translate-x-5" : "translate-x-0.5"
          ].join(" ")}
        />
      </button>
    </div>
  );
}
