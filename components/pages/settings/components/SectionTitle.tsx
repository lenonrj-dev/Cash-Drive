/* frontend/components/pages/settings/components/SectionTitle.tsx */
"use client";

import React from "react";

export default function SectionTitle({
  kicker,
  title,
  description,
  right
}: {
  kicker: string;
  title: string;
  description: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">{kicker}</p>
        <h2 className="mt-2 text-base font-bold text-zinc-900">{title}</h2>
        <p className="mt-1 text-sm text-zinc-600">{description}</p>
      </div>
      {right ? <div className="flex items-center gap-2">{right}</div> : null}
    </div>
  );
}
