/* frontend/app/(app)/suporte/page.tsx */

import type { Metadata } from "next";
import SupportView from "../../../components/pages/support/SupportView";

export const metadata: Metadata = {
  title: "Suporte | Cash Drive",
  description:
    "Central de suporte do Cash Drive: fale com o time, envie mensagens, veja artigos e resolva dúvidas sobre lançamentos, metas, contas e planos.",
  robots: {
    index: false,
    follow: false
  }
};

export default function Page() {
  return <SupportView />;
}
