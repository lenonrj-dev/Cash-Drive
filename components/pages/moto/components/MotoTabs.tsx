/* frontend/components/pages/moto/components/MotoTabs.tsx */
"use client";

import React from "react";

type TabKey = "registro" | "consumo" | "manutenção" | "historico";

export default function MotoTabs({
  value,
  onChange
}: {
  value: TabKey;
  onChange: (v: TabKey) => void;
}) {
  return (
    <div className="flex w-full items-center gap-2 overflow-x-auto rounded-full border border-zinc-200/80 bg-white p-1 shadow-sm">
      <TabButton active={value === "registro"} onClick={() => onChange("registro")}>
        Registro do dia
      </TabButton>
      <TabButton active={value === "consumo"} onClick={() => onChange("consumo")}>
        Consumo
      </TabButton>
      <TabButton active={value === "manutenção"} onClick={() => onChange("manutenção")}>
        Manutenção
      </TabButton>
      <TabButton active={value === "historico"} onClick={() => onChange("historico")}>
        Histórico
      </TabButton>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-9 shrink-0 whitespace-nowrap rounded-full px-3 text-sm font-semibold transition focus:outline-none",
        active ? "bg-teal-600 text-white" : "text-zinc-700 hover:bg-zinc-50"
      ].join(" ")}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
