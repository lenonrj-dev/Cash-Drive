/* frontend/components/pages/settings/sections/ContactSection.tsx */
"use client";

import React from "react";
import Link from "next/link";
import Card from "../../../../ui/Card";
import Button from "../../../../ui/Button";
import Badge from "../../../../ui/Badge";
import SectionTitle from "../../components/SectionTitle";
import Field from "../../components/fields/Field";

export default function ContactSection({
  contact,
  setContact,
  onSave
}: {
  contact: { phone: string; whatsapp: string; emailBackup: string };
  setContact: React.Dispatch<React.SetStateAction<{ phone: string; whatsapp: string; emailBackup: string }>>;
  onSave: () => void;
}) {
  return (
    <section id="contato" className="scroll-mt-24">
      <Card>
        <SectionTitle
          kicker="Comunicação"
          title="Contato"
          description="Atualize número principal, WhatsApp e e-mail de recuperação."
          right={
            <Button size="sm" variant="secondary" onClick={onSave} aria-label="Salvar contato">
              Salvar
            </Button>
          }
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            label="Telefone"
            hint="Usado para verificação e suporte"
            value={contact.phone}
            onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel"
          />

          <Field
            label="WhatsApp"
            hint="Fase 2: lançamentos por chat"
            value={contact.whatsapp}
            onChange={(v) => setContact((c) => ({ ...c, whatsapp: v }))}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoComplete="tel"
          />

          <Field
            label="E-mail de recuperação"
            hint="Para recuperar acesso e alertas críticos"
            value={contact.emailBackup}
            onChange={(v) => setContact((c) => ({ ...c, emailBackup: v }))}
            placeholder="email@exemplo.com"
            inputMode="email"
            autoComplete="email"
          />

          <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-900">WhatsApp</p>
                <p className="mt-1 text-sm text-zinc-600">Em breve: vincular número, receber lançamentos e confirmar por chat.</p>
              </div>
              <Badge>Fase 2</Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button disabled variant="secondary">
                Conectar WhatsApp
              </Button>
              <Link href="/suporte" className="inline-flex">
                <Button size="sm" variant="ghost">
                  Falar com suporte
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Importante: mudanças de telefone podem exigir confirmação por código (quando habilitado).
        </p>
      </Card>
    </section>
  );
}
