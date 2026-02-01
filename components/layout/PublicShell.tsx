/* frontend/components/layout/PublicShell.tsx */
import Link from "next/link";
import { routes } from "../../lib/routes";
import Button from "../ui/Button";
import EnvWarning from "../common/EnvWarning";
import Footer from "../landing/Footer";
import Navbar from "../landing/Navbar";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-br from-white via-white to-teal-50/60 text-zinc-900">
      <Navbar />

      <main className="w-full px-4 py-10 sm:px-6 lg:px-10 2xl:px-14">
        <EnvWarning className="mb-4" />
        {children}
      </main>

      <Footer />
    </div>
  );
}
