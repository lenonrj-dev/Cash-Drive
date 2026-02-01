/* frontend/components/pages/support/components/SupportSidePanel.tsx */
"use client";

import React, { useMemo, useState } from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";

import SupportTopics from "./SupportTopics";
import SupportFaq from "./SupportFaq";
import SupportPolicies from "./SupportPolicies";

type PanelKey = "help" | "faq" | "status" | "policies";

export default function SupportSidePanel() {
  const [panel, setPanel] = useState<PanelKey>("help");

  const title = useMemo(() => {
    if (panel === "help") return "Ajuda";
    if (panel === "faq") return "FAQ";
    if (panel === "status") return "Status";
    return "Políticas";
  }, [panel]);

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Painel</p>
            <h2 className="mt-2 text-base font-bold text-zinc-900">{title}</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Navegue entre os conteúdos do suporte sem deixar a página enorme.
            </p>
          </div>
          <Badge>Dinâmico</Badge>
        </div>

        <div className="mt-4 flex w-full items-center gap-2 overflow-x-auto rounded-full border border-zinc-200/80 bg-white p-1 shadow-sm">
          <TabButton active={panel === "help"} onClick={() => setPanel("help")}>
            Ajuda
          </TabButton>
          <TabButton active={panel === "faq"} onClick={() => setPanel("faq")}>
            FAQ
          </TabButton>
          <TabButton active={panel === "status"} onClick={() => setPanel("status")}>
            Status
          </TabButton>
          <TabButton active={panel === "policies"} onClick={() => setPanel("policies")}>
            Políticas
          </TabButton>
        </div>
      </Card>

      {panel === "help" ? <SupportTopics /> : null}
      {panel === "faq" ? <SupportFaq /> : null}
      {panel === "status" ? <SupportStatus /> : null}
      {panel === "policies" ? <SupportPolicies /> : null}
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
    >
      {children}
    </button>
  );
}

function SupportStatus() {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Status</p>
          <h3 className="mt-2 text-base font-bold text-zinc-900">Boas práticas</h3>
          <p className="mt-1 text-sm text-zinc-600">
            Para resolver mais rápido, descreva o cenário e envie prints. Evite compartilhar senhas.
          </p>
        </div>
        <Badge>Seguro</Badge>
      </div>

      <ul className="mt-4 space-y-2 text-sm text-zinc-700">
        <li className="flex gap-2">
          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
          <span>Informe a tela (ex.: Metas, Lançamentos, Contas) e a ação realizada.</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
          <span>Inclua horário aproximado e o que você esperava que acontecesse.</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
          <span>Se tiver erro, envie o texto exato ou um print com detalhes.</span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-teal-400" />
          <span>Para problemas de plano, informe a tela afetada e o e-mail do usuário.</span>
        </li>
      </ul>

      <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
        <p className="text-sm font-semibold text-zinc-900">Checklist rápido</p>
        <p className="mt-1 text-sm text-zinc-600">
          Antes de enviar, confira se o valor est? correto, se a data do lançamento est? no mês esperado e se você est?
          na conta certa.
        </p>
      </div>
    </Card>
  );
}
