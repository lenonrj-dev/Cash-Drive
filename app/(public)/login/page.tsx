import PublicShell from "../../../components/layout/PublicShell";
import LoginView from "../../../components/pages/auth/LoginView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Acesse sua conta no Rota Fin."
};

export default function Page() {
  return (
    <PublicShell>
      <LoginView />
    </PublicShell>
  );
}
