/* frontend/app/(app)/suporte/page.tsx */

import type { Metadata } from "next";
import SupportView from "../../../components/pages/support/SupportView";

export const metadata: Metadata = {
  title: "Suporte | Rota Fin",
  description:
    "Central de suporte do Rota Fin: fale com o time, envie mensagens, veja artigos e resolva dúvidas sobre lançamentos, metas, contas e planos.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <SupportView />;
}
