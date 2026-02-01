/* frontend/components/pages/settings/SettingsView.tsx */
"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Card from "../../ui/Card";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import { AuthContext } from "../../../providers/AuthProvider";
import { routes } from "../../../lib/routes";
import { getProfile, updateProfile } from "../../../services/profileService";

import SettingsSidebar from "./components/SettingsSidebar";
import SettingsNotice from "./components/SettingsNotice";

import ProfileSection from "./components/sections/ProfileSection";
import ContactSection from "./components/sections/ContactSection";
import PreferencesSection from "./components/sections/PreferencesSection";
import NotificationsSection from "./components/sections/NotificationsSection";
import SecuritySection from "./components/sections/SecuritySection";
import PrivacySection from "./components/sections/PrivacySection";
import DangerZoneSection from "./components/sections/DangerZoneSection";

export type NoticeType = "success" | "info" | "error";
export type Notice = { type: NoticeType; message: string } | null;
export type SettingsSectionKey =
  | "perfil"
  | "contato"
  | "preferencias"
  | "notificacoes"
  | "seguranca"
  | "dados"
  | "risco";

const SECTION_LABEL: Record<SettingsSectionKey, string> = {
  perfil: "Perfil",
  contato: "Contato",
  preferencias: "Preferências",
  notificacoes: "Notificações",
  seguranca: "Segurança",
  dados: "Dados e privacidade",
  risco: "Zona de risco"
};

export default function SettingsView() {
  const auth = useContext(AuthContext);

  const userName = useMemo(() => auth?.user?.name || "Usuário", [auth?.user?.name]);
  const initials = useMemo(() => {
    const parts = (userName || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }, [userName]);

  const [notice, setNotice] = useState<Notice>(null);
  const [active, setActive] = useState<SettingsSectionKey>("perfil");

  const [profile, setProfile] = useState({
    displayName: userName,
    company: "",
    role: "",
    timezone: "America/Sao_Paulo"
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [contact, setContact] = useState({
    phone: "",
    whatsapp: "",
    emailBackup: ""
  });

  const [preferences, setPreferences] = useState({
    currency: "BRL",
    dateFormat: "DD/MM/AAAA",
    startOfWeek: "Segunda-feira",
    maskAmounts: false,
    confirmSensitiveActions: true,
    compactCards: false
  });

  const [notifications, setNotifications] = useState({
    email: true,
    whatsapp: false,
    inApp: true,
    goals: true,
    bills: true,
    weeklySummary: true
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false
  });

  const [privacy, setPrivacy] = useState({
    autoLogoutMinutes: "30",
    hideBalanceOnOpen: false,
    exportIncludeTags: true
  });

  useEffect(() => {
    let alive = true;
    (async () => {
      const data = await getProfile();
      if (!alive || !data) return;

      setProfile((prev) => ({
        ...prev,
        displayName: data.settings?.profile?.displayName ?? data.name ?? prev.displayName,
        company: data.settings?.profile?.company ?? prev.company,
        role: data.settings?.profile?.role ?? prev.role,
        timezone: data.settings?.profile?.timezone ?? prev.timezone
      }));

      setContact((prev) => ({
        ...prev,
        phone: data.phone ?? data.settings?.contact?.phone ?? prev.phone,
        whatsapp: data.settings?.contact?.whatsapp ?? prev.whatsapp,
        emailBackup: data.settings?.contact?.emailBackup ?? prev.emailBackup
      }));

      setPreferences((prev) => ({ ...prev, ...(data.settings?.preferences ?? {}) }));
      setNotifications((prev) => ({ ...prev, ...(data.settings?.notifications ?? {}) }));
      setPrivacy((prev) => ({ ...prev, ...(data.settings?.privacy ?? {}) }));

      if (data.avatarUrl) setAvatarPreview(data.avatarUrl);
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(null), 4500);
    return () => window.clearTimeout(t);
  }, [notice]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [active]);

  function toast(type: NoticeType, message: string) {
    setNotice({ type, message });
  }

  async function fileToDataUrl(file: File) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
      reader.readAsDataURL(file);
    });
  }

  async function saveProfileSection() {
    try {
      let avatarUrl = avatarPreview ?? null;
      if (avatarFile) avatarUrl = await fileToDataUrl(avatarFile);

      const res = await updateProfile({
        name: profile.displayName?.trim() || userName,
        avatarUrl,
        settings: { profile: { ...profile, displayName: profile.displayName?.trim() || userName } }
      });

      setAvatarFile(null);
      setAvatarPreview(res.avatarUrl ?? null);
      setProfile((prev) => ({ ...prev, displayName: res.name || prev.displayName }));
      toast("success", "Perfil atualizado.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar o perfil.";
      toast("error", message);
    }
  }

  async function saveContactSection() {
    try {
      await updateProfile({
        phone: contact.phone || null,
        settings: { contact: { ...contact } }
      });
      toast("success", "Contato atualizado.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar o contato.";
      toast("error", message);
    }
  }

  async function savePreferencesSection() {
    try {
      await updateProfile({ settings: { preferences: { ...preferences } } });
      toast("success", "Preferências atualizadas.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar as preferências.";
      toast("error", message);
    }
  }

  async function saveNotificationsSection() {
    try {
      await updateProfile({ settings: { notifications: { ...notifications } } });
      toast("success", "Notificações atualizadas.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar as notificações.";
      toast("error", message);
    }
  }

  async function savePrivacySection() {
    try {
      await updateProfile({ settings: { privacy: { ...privacy } } });
      toast("success", "Preferências de privacidade atualizadas.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível salvar os dados de privacidade.";
      toast("error", message);
    }
  }

  function savePassword() {
    if (!security.currentPassword || !security.newPassword || !security.confirmPassword) {
      toast("error", "Preencha todos os campos de senha.");
      return;
    }
    if (security.newPassword.length < 8) {
      toast("error", "A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (security.newPassword !== security.confirmPassword) {
      toast("error", "As senhas não conferem.");
      return;
    }

    setSecurity((prev) => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
    toast("success", "Senha atualizada (modo demo).");
  }

  function setAvatarFromFile(file: File) {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    toast("info", "Avatar selecionado. Clique em Salvar para aplicar.");
  }

  function removeAvatar() {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    setAvatarFile(null);
    toast("info", "Avatar removido. Clique em Salvar para aplicar.");
  }

  function renderActiveSection() {
    if (active === "perfil") {
      return (
        <ProfileSection
          profile={profile}
          setProfile={setProfile}
          initials={initials}
          avatarPreview={avatarPreview}
          onPickAvatar={setAvatarFromFile}
          onRemoveAvatar={removeAvatar}
          onSave={saveProfileSection}
        />
      );
    }

    if (active === "contato") {
      return <ContactSection contact={contact} setContact={setContact} onSave={saveContactSection} />;
    }

    if (active === "preferencias") {
      return (
        <PreferencesSection
          preferences={preferences}
          setPreferences={setPreferences}
          onSave={savePreferencesSection}
        />
      );
    }

    if (active === "notificacoes") {
      return (
        <NotificationsSection
          notifications={notifications}
          setNotifications={setNotifications}
          onSave={saveNotificationsSection}
        />
      );
    }

    if (active === "seguranca") {
      return (
        <SecuritySection
          security={security}
          setSecurity={setSecurity}
          onSave={() => toast("info", "Configurações de segurança salvas.")}
          onSavePassword={savePassword}
          onToast={toast}
        />
      );
    }

    if (active === "dados") {
      return (
        <PrivacySection
          privacy={privacy}
          setPrivacy={setPrivacy}
          onSave={savePrivacySection}
          onToast={toast}
        />
      );
    }

    return <DangerZoneSection onToast={toast} />;
  }

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">Preferências</p>
            <h1 className="mt-2 text-lg font-bold text-zinc-900">Configurações</h1>
            <p className="mt-1 text-sm text-zinc-600">
              Gerencie perfil, contato, segurança, notificações e preferências do seu painel financeiro.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Badge>{SECTION_LABEL[active]}</Badge>
            <Link href={routes.app.planos} className="inline-flex">
              <Button size="sm">Ver planos</Button>
            </Link>
          </div>
        </div>

        <SettingsNotice notice={notice} />
      </Card>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SettingsSidebar
            initials={initials}
            avatarPreview={avatarPreview}
            displayName={profile.displayName}
            active={active}
            onSelect={setActive}
          />
        </div>

        <div className="lg:col-span-8">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
