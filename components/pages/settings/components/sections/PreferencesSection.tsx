/* frontend/components/pages/settings/sections/PreferencesSection.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../../ui/Card";
import Button from "../../../../ui/Button";
import Badge from "../../../../ui/Badge";
import SectionTitle from "../../components/SectionTitle";
import SelectField from "../../components/fields/SelectField";
import SwitchRow from "../../components/fields/SwitchRow";

export default function PreferencesSection({
  preferences,
  setPreferences,
  onSave
}: {
  preferences: {
    currency: string;
    dateFormat: string;
    startOfWeek: string;
    maskAmounts: boolean;
    confirmSensitiveActions: boolean;
    compactCards: boolean;
  };
  setPreferences: React.Dispatch<
    React.SetStateAction<{
      currency: string;
      dateFormat: string;
      startOfWeek: string;
      maskAmounts: boolean;
      confirmSensitiveActions: boolean;
      compactCards: boolean;
    }>
  >;
  onSave: () => void;
}) {
  return (
    <section id="preferencias" className="scroll-mt-24">
      <Card>
        <SectionTitle
          kicker="Painel"
          title="Preferências"
          description="Defina como os valores e lembretes aparecem no seu dia a dia."
          right={
            <Button size="sm" variant="secondary" onClick={onSave} aria-label="Salvar preferências">
              Salvar
            </Button>
          }
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <SelectField
            label="Moeda"
            hint="Padrão do painel"
            value={preferences.currency}
            onChange={(v) => setPreferences((p) => ({ ...p, currency: v }))}
            options={[
              { value: "BRL", label: "Real (BRL)" },
              { value: "USD", label: "Dólar (USD)" },
              { value: "EUR", label: "Euro (EUR)" }
            ]}
          />

          <SelectField
            label="Formato de data"
            hint="Exibição nas telas e relatórios"
            value={preferences.dateFormat}
            onChange={(v) => setPreferences((p) => ({ ...p, dateFormat: v }))}
            options={[
              { value: "DD/MM/AAAA", label: "DD/MM/AAAA" },
              { value: "AAAA-MM-DD", label: "AAAA-MM-DD" }
            ]}
          />

          <SelectField
            label="Início da semana"
            hint="Para metas e resumos"
            value={preferences.startOfWeek}
            onChange={(v) => setPreferences((p) => ({ ...p, startOfWeek: v }))}
            options={[
              { value: "Segunda-feira", label: "Segunda-feira" },
              { value: "Domingo", label: "Domingo" }
            ]}
          />

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900">Integrações</p>
                <p className="mt-1 text-sm text-zinc-600">Em breve: integrações para importar transações e automatizar relatórios.</p>
              </div>
              <Badge>Em breve</Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <Button disabled variant="secondary" size="sm">
                Conectar banco
              </Button>
              <Button disabled variant="secondary" size="sm">
                Conectar Pix
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          <SwitchRow
            label="Mascarar valores no painel"
            description="Oculta saldo e totais até você clicar para revelar."
            checked={preferences.maskAmounts}
            onChange={(v) => setPreferences((p) => ({ ...p, maskAmounts: v }))}
          />

          <SwitchRow
            label="Confirmar ações sensíveis"
            description="Pede confirmação ao excluir lançamentos, contas ou metas."
            checked={preferences.confirmSensitiveActions}
            onChange={(v) => setPreferences((p) => ({ ...p, confirmSensitiveActions: v }))}
          />

          <SwitchRow
            label="Cards compactos"
            description="Mostra mais informações na tela com menos espaçamento."
            checked={preferences.compactCards}
            onChange={(v) => setPreferences((p) => ({ ...p, compactCards: v }))}
          />

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <p className="text-sm font-semibold text-zinc-900">Atalhos</p>
            <p className="mt-1 text-sm text-zinc-600">Acesse rápido relatórios e central.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link href="/notificacoes" className="inline-flex">
                <Button size="sm" variant="ghost">
                  Central de notificações
                </Button>
              </Link>
              <Link href="/transacoes" className="inline-flex">
                <Button size="sm" variant="ghost">
                  Lançamentos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
