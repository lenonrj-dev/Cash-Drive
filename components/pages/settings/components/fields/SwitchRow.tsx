/* frontend/components/pages/settings/components/controls/SwitchRow.tsx */
"use client";

import React from "react";
import Badge from "../../../../ui/Badge";

export default function SwitchRow({
  label,
  description,
  checked,
  onChange,
  badge
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  badge?: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-zinc-900">{label}</p>
            {badge ? <Badge>{badge}</Badge> : null}
          </div>
          <p className="mt-1 text-sm text-zinc-600">{description}</p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={checked}
          onClick={() => onChange(!checked)}
          className={[
            "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
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
    </div>
  );
}
