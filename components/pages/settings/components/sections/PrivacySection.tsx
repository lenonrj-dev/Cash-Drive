/* frontend/components/pages/settings/sections/PrivacySection.tsx */
"use client";

import React from "react";
import Card from "../../../../ui/Card";
import Button from "../../../../ui/Button";
import SectionTitle from "../../components/SectionTitle";
import SelectField from "../../components/fields/SelectField";
import SwitchInline from "../../components/fields/SwitchInline";
import type { NoticeType } from "../../SettingsView";

export default function PrivacySection({
  privacy,
  setPrivacy,
  onSave,
  onToast
}: {
  privacy: { autoLogoutMinutes: string; hideBalanceOnOpen: boolean; exportIncludeTags: boolean };
  setPrivacy: React.Dispatch<
    React.SetStateAction<{ autoLogoutMinutes: string; hideBalanceOnOpen: boolean; exportIncludeTags: boolean }>
  >;
  onSave: () => void;
  onToast: (type: NoticeType, message: string) => void;
}) {
  return (
    <section id="dados" className="scroll-mt-24">
      <Card>
        <SectionTitle
          kicker="Controle"
          title="Dados e privacidade"
          description="Exportação, retenção e ajustes de privacidade do painel."
          right={
            <Button size="sm" variant="secondary" onClick={onSave} aria-label="Salvar dados e privacidade">
              Salvar
            </Button>
          }
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Privacidade na tela</p>
            <p className="mt-1 text-sm text-zinc-600">Proteja informações em locais públicos.</p>

            <div className="mt-3 space-y-3">
              <SwitchInline
                label="Ocultar saldo ao abrir"
                checked={privacy.hideBalanceOnOpen}
                onChange={(v) => setPrivacy((p) => ({ ...p, hideBalanceOnOpen: v }))}
              />

              <SelectField
                label="Logout automático"
                hint="Inatividade"
                value={privacy.autoLogoutMinutes}
                onChange={(v) => setPrivacy((p) => ({ ...p, autoLogoutMinutes: v }))}
                options={[
                  { value: "15", label: "15 minutos" },
                  { value: "30", label: "30 minutos" },
                  { value: "60", label: "60 minutos" },
                  { value: "0", label: "Desativado" }
                ]}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Exportar dados</p>
            <p className="mt-1 text-sm text-zinc-600">Baixe lançamentos e metas para auditoria.</p>

            <div className="mt-3 space-y-3">
              <SwitchInline
                label="Incluir tags na exportação"
                checked={privacy.exportIncludeTags}
                onChange={(v) => setPrivacy((p) => ({ ...p, exportIncludeTags: v }))}
              />

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onToast("success", "Exportação gerada (modo demo).")}
                  aria-label="Exportar CSV"
                >
                  Exportar CSV
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onToast("info", "Relatório PDF em breve.")}
                  aria-label="Exportar PDF"
                >
                  Exportar PDF
                </Button>
              </div>
            </div>

            <p className="mt-3 text-xs text-zinc-500">Os arquivos são gerados no servidor quando ativado.</p>
          </div>

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 sm:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Limpeza local</p>
                <p className="mt-1 text-sm text-zinc-600">
                  Se algo ficar fora de sincronia, você pode limpar preferências locais do navegador.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onToast("success", "Preferências locais limpas (modo demo).")}
                  aria-label="Limpar preferências locais"
                >
                  Limpar preferências
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onToast("info", "Logs detalhados em breve.")}
                  aria-label="Ver logs"
                >
                  Ver logs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
