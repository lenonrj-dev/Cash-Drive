/* frontend/components/pages/settings/sections/SecuritySection.tsx */
"use client";

import React from "react";
import Card from "../../../../ui/Card";
import Button from "../../../../ui/Button";
import SectionTitle from "../../components/SectionTitle";
import PasswordField from "../../components/fields/PasswordField";
import SwitchRow from "../../components/fields/SwitchRow";
import KeyValue from "../../components/fields/KeyValue";
import type { NoticeType } from "../../SettingsView";

export default function SecuritySection({
  security,
  setSecurity,
  onSave,
  onSavePassword,
  onToast
}: {
  security: { currentPassword: string; newPassword: string; confirmPassword: string; twoFactor: boolean };
  setSecurity: React.Dispatch<
    React.SetStateAction<{ currentPassword: string; newPassword: string; confirmPassword: string; twoFactor: boolean }>
  >;
  onSave: () => void;
  onSavePassword: () => void;
  onToast: (type: NoticeType, message: string) => void;
}) {
  return (
    <section id="seguranca" className="scroll-mt-24">
      <Card>
        <SectionTitle
          kicker="Proteção"
          title="Segurança"
          description="Controle senha, sessões e camadas extras de proteção."
          right={
            <Button size="sm" variant="secondary" onClick={onSave} aria-label="Salvar segurança">
              Salvar
            </Button>
          }
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Alterar senha</p>
            <p className="mt-1 text-sm text-zinc-600">Use uma senha forte e exclusiva.</p>

            <div className="mt-3 space-y-3">
              <PasswordField
                label="Senha atual"
                value={security.currentPassword}
                onChange={(v) => setSecurity((s) => ({ ...s, currentPassword: v }))}
                autoComplete="current-password"
              />
              <PasswordField
                label="Nova senha"
                value={security.newPassword}
                onChange={(v) => setSecurity((s) => ({ ...s, newPassword: v }))}
                autoComplete="new-password"
              />
              <PasswordField
                label="Confirmar nova senha"
                value={security.confirmPassword}
                onChange={(v) => setSecurity((s) => ({ ...s, confirmPassword: v }))}
                autoComplete="new-password"
              />
            </div>

            <div className="mt-3">
              <Button size="sm" variant="secondary" onClick={onSavePassword} aria-label="Atualizar senha">
                Atualizar senha
              </Button>
            </div>

            <p className="mt-3 text-xs text-zinc-500">Mínimo recomendado: 8+ caracteres.</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Sessões</p>
            <p className="mt-1 text-sm text-zinc-600">Gerencie acessos ativos do painel.</p>

            <div className="mt-3 space-y-3">
              <KeyValue label="Dispositivo atual" value="Este navegador" />
              <KeyValue label="Local" value="Brasil" />
              <KeyValue label="Último acesso" value="Agora" />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onToast("success", "Sessões encerradas (modo demo).")}
                aria-label="Encerrar outras sessões"
              >
                Encerrar outras sessões
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onToast("info", "Recurso em breve.")}
                aria-label="Ver sessões"
              >
                Ver sessões
              </Button>
            </div>

            <div className="mt-4">
              <SwitchRow
                label="Autenticação em 2 etapas"
                description="Fase 2: validação extra para ações sensíveis."
                checked={security.twoFactor}
                onChange={(v) => setSecurity((s) => ({ ...s, twoFactor: v }))}
                badge="Fase 2"
              />
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
