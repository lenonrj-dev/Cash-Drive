/* frontend/components/pages/dashboard/ReadOnlyBanner.tsx */
import Link from "next/link";
import { routes } from "../../../lib/routes";
import Card from "../../ui/Card";
import Button from "../../ui/Button";

export default function ReadOnlyBanner({ message }: { message: string }) {
  return (
    <Card className="border-teal-200/70 bg-teal-50/70">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-teal-700">Modo leitura</p>
          <p className="mt-1 text-sm text-teal-700/80">{message}</p>
        </div>

        <Link href={routes.app.planos}>
          <Button>Ativar plano</Button>
        </Link>
      </div>
    </Card>
  );
}
