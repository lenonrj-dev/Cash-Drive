/* frontend/components/pages/settings/components/SettingsSidebar.tsx */
"use client";

import React from "react";
import Card from "../../../ui/Card";
import Badge from "../../../ui/Badge";
import type { SettingsSectionKey } from "../SettingsView";

export default function SettingsSidebar({
  initials,
  avatarPreview,
  displayName,
  active,
  onSelect
}: {
  initials: string;
  avatarPreview: string | null;
  displayName: string;
  active: SettingsSectionKey;
  onSelect: (key: SettingsSectionKey) => void;
}) {
  const items: Array<{ key: SettingsSectionKey; label: string; desc: string }> = [
    { key: "perfil", label: "Perfil", desc: "Nome, avatar e fuso horário" },
    { key: "contato", label: "Contato", desc: "Telefone e WhatsApp" },
    { key: "preferencias", label: "Preferências", desc: "Moeda, datas e atalhos" },
    { key: "notificacoes", label: "Notificações", desc: "Alertas e frequência" },
    { key: "seguranca", label: "Segurança", desc: "Senha e sessões" },
    { key: "dados", label: "Dados e privacidade", desc: "Exportação e privacidade" },
    { key: "risco", label: "Zona de risco", desc: "Ações avançadas" }
  ];

  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="relative inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200/70 bg-white text-sm font-bold text-teal-700">
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarPreview}
              alt="Prévia do avatar"
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            initials
          )}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-900">{displayName || "Nome do perfil"}</p>
          <p className="mt-0.5 text-xs text-zinc-600">Escolha uma seção para editar</p>
        </div>
      </div>

      <nav aria-label="Seções de configurações" className="mt-4 space-y-2">
        {items.map((it) => {
          const isActive = active === it.key;
          return (
            <button
              key={it.key}
              type="button"
              onClick={() => onSelect(it.key)}
              aria-current={isActive ? "page" : undefined}
              className={[
                "w-full rounded-2xl border px-4 py-3 text-left shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                isActive
                  ? "border-teal-200/70 bg-teal-50/60"
                  : "border-zinc-200/70 bg-white/70 hover:bg-white"
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-zinc-900">{it.label}</p>
                  <p className="mt-1 text-xs text-zinc-600">{it.desc}</p>
                </div>
                {isActive ? <Badge>Ativo</Badge> : null}
              </div>
            </button>
          );
        })}
      </nav>

      <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
        <p className="text-sm font-semibold text-zinc-900">Tema</p>
        <p className="mt-1 text-sm text-zinc-600">O tema claro fica fixo para manter a interface sempre leve.</p>
        <div className="mt-3 flex items-center gap-2">
          <Badge>Claro</Badge>
          <span className="text-xs font-semibold text-zinc-500">Padrão do painel</span>
        </div>
      </div>
    </Card>
  );
}
