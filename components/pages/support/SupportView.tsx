/* frontend/components/pages/support/SupportView.tsx */
"use client";

import React, { useContext, useMemo } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Card from "../../ui/Card";
import Badge from "../../ui/Badge";

import SupportHero from "./components/SupportHero";
import SupportChat from "./components/SupportChat";
import SupportSidePanel from "./components/SupportSidePanel";

import { SUPPORT_FAQ } from "./supportData";

export default function SupportView() {
  const auth = useContext(AuthContext);

  const userName = useMemo(() => auth?.user?.name || "Usuário", [auth?.user?.name]);
  const userEmail = useMemo(() => (auth?.user as any)?.email || "", [auth?.user]);
  const firstName = useMemo(() => userName.split(" ")[0] || "Usuário", [userName]);

  const faqJsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: SUPPORT_FAQ.map((it) => ({
        "@type": "Question",
        name: it.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: it.a
        }
      }))
    };
  }, []);

  return (
    <div className="w-full space-y-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <SupportHero firstName={firstName} />

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SupportChat userName={userName} userEmail={userEmail} />
        </div>

        <div className="lg:col-span-5">
          <SupportSidePanel />

          <Card className="mt-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600">Dica</p>
                <h3 className="mt-2 text-base font-bold text-zinc-900">Atendimento mais rápido</h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Se o problema for visual, informe o navegador e envie um print. Se for dado/valor,
                  informe a data e o valor.
                </p>
              </div>
              <Badge>Alta precisão</Badge>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
