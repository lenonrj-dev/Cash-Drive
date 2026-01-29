/* frontend/components/pages/settings/SettingsView.tsx */
"use client";

import React from "react";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";

export default function SettingsView() {
  return (
    <div className="space-y-4">
      <Card>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Preferencias</p>
        <h1 className="mt-2 text-lg font-bold text-zinc-900">Configuracoes</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Preferencias do app, tema e conexao com WhatsApp.
        </p>
      </Card>

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-900">Tema</p>
            <p className="mt-1 text-sm text-zinc-600">
              O tema claro fica fixo para manter a interface sempre leve.
            </p>
          </div>

          <Badge>Claro</Badge>
        </div>

        <div className="mt-4 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-zinc-900">WhatsApp</p>
              <p className="mt-1 text-sm text-zinc-600">
                Em breve: vincular numero, receber lancamentos e confirmar por chat.
              </p>
            </div>
            <Badge>Fase 2</Badge>
          </div>

          <div className="mt-3">
            <Button disabled variant="secondary">
              Conectar WhatsApp
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
