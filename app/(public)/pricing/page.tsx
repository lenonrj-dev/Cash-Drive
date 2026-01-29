import PublicShell from "../../../components/layout/PublicShell";
import PlansView from "../../../components/pages/billing/PlansView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos",
  description: "Conheca os planos do Cash Drive e o trial de 15 dias."
};

export default function Page() {
  return (
    <PublicShell>
      <PlansView variant="public" />
    </PublicShell>
  );
}
