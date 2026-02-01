/* frontend/components/pages/settings/sections/ProfileSection.tsx */
"use client";

import React, { useRef } from "react";
import Card from "../../../../ui/Card";
import Button from "../../../../ui/Button";
import SectionTitle from "../../components/SectionTitle";
import Field from "../../components/fields/Field";
import SelectField from "../../components/fields/SelectField";

export default function ProfileSection({
  profile,
  setProfile,
  initials,
  avatarPreview,
  onPickAvatar,
  onRemoveAvatar,
  onSave
}: {
  profile: { displayName: string; company: string; role: string; timezone: string };
  setProfile: React.Dispatch<
    React.SetStateAction<{ displayName: string; company: string; role: string; timezone: string }>
  >;
  initials: string;
  avatarPreview: string | null;
  onPickAvatar: (file: File) => void;
  onRemoveAvatar: () => void;
  onSave: () => void;
}) {
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  function pick() {
    avatarInputRef.current?.click();
  }

  function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    onPickAvatar(file);
  }

  function remove() {
    if (avatarInputRef.current) avatarInputRef.current.value = "";
    onRemoveAvatar();
  }

  return (
    <section id="perfil" className="scroll-mt-24">
      <Card>
        <SectionTitle
          kicker="Conta"
          title="Perfil"
          description="Atualize nome, cargo, fuso horário e avatar de exibição."
          right={
            <Button size="sm" variant="secondary" onClick={onSave} aria-label="Salvar alterações do perfil">
              Salvar
            </Button>
          }
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            label="Nome exibido"
            hint="Como seu nome aparece no painel"
            value={profile.displayName}
            onChange={(v) => setProfile((p) => ({ ...p, displayName: v }))}
            placeholder="Ex.: Thainara"
            autoComplete="name"
          />

          <Field
            label="Cargo"
            hint="Opcional"
            value={profile.role}
            onChange={(v) => setProfile((p) => ({ ...p, role: v }))}
            placeholder="Ex.: Financeiro"
          />

          <Field
            label="Empresa"
            hint="Opcional"
            value={profile.company}
            onChange={(v) => setProfile((p) => ({ ...p, company: v }))}
            placeholder="Ex.: Cash Drive"
          />

          <SelectField
            label="Fuso horário"
            hint="Ajusta datas e resumos"
            value={profile.timezone}
            onChange={(v) => setProfile((p) => ({ ...p, timezone: v }))}
            options={[
              { value: "America/Sao_Paulo", label: "Brasil (São Paulo)" },
              { value: "America/Manaus", label: "Brasil (Manaus)" },
              { value: "America/Fortaleza", label: "Brasil (Fortaleza)" },
              { value: "UTC", label: "UTC" }
            ]}
          />
        </div>

        <div className="mt-5 rounded-2xl border border-zinc-200/70 bg-white/70 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-zinc-900">Avatar</p>
              <p className="mt-1 text-sm text-zinc-600">Envie uma imagem quadrada (PNG/JPG). Isso aparece no cabeçalho.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                className="sr-only"
                aria-label="Selecionar avatar"
              />

              <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-zinc-200/70 bg-white text-xs font-bold text-teal-700">
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

              <Button size="sm" variant="secondary" onClick={pick} aria-label="Trocar avatar">
                Trocar avatar
              </Button>
              <Button size="sm" variant="ghost" onClick={remove} aria-label="Remover avatar" disabled={!avatarPreview}>
                Remover
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
