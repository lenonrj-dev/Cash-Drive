/* frontend/components/pages/settings/components/SettingsNotice.tsx */
"use client";

import React from "react";
import type { Notice } from "../SettingsView";

export default function SettingsNotice({ notice }: { notice: Notice }) {
  if (!notice) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "mt-4 rounded-2xl border p-4 text-sm",
        notice.type === "success"
          ? "border-teal-200/70 bg-teal-50/60 text-zinc-900"
          : notice.type === "error"
            ? "border-rose-200/70 bg-rose-50/70 text-zinc-900"
            : "border-zinc-200/70 bg-white/70 text-zinc-900"
      ].join(" ")}
    >
      <p className="font-semibold">{notice.message}</p>
      <p className="mt-1 text-xs text-zinc-600">Dica: se você ainda não conectou WhatsApp, isso fica disponível na Fase 2.</p>
    </div>
  );
}
