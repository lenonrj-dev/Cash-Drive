/* frontend/app/(app)/moto/page.tsx */

import type { Metadata } from "next";
import MotoView from "../../../components/pages/moto/MotoView";

export const metadata: Metadata = {
  title: "Moto | Controle de consumo e manutenção",
  description:
    "Registre km inicial e final, abastecimentos do dia, consumo real vs. esperado e alertas de troca de óleo por quilometragem.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/moto" }
};

export default function Page() {
  return <MotoView />;
}
