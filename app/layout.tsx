/* frontend/app/layout.tsx */
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppProviders from "../providers/AppProviders";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: { default: "Cash Drive", template: "%s | Cash Drive" },
  description:
    "Cash Drive - painel financeiro para motoristas e entregadores. Controle de entradas, saídas, metas e contas.",
  applicationName: "Cash Drive",
  icons: { icon: "/favicon.ico" }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${jakarta.className} min-h-dvh bg-white text-zinc-950 antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
