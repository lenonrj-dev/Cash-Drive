import PublicShell from "../../../components/layout/PublicShell";
import SignupView from "../../../components/pages/auth/SignupView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro",
  description: "Crie sua conta e comece no modo leitura."
};

export default function Page() {
  return (
    <PublicShell>
      <SignupView />
    </PublicShell>
  );
}
