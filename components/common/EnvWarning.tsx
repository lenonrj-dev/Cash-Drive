/* frontend/components/common/EnvWarning.tsx */
"use client";

import React from "react";
import Alert from "../ui/Alert";

export default function EnvWarning({ className = "" }: { className?: string }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const shouldShow =
    process.env.NODE_ENV === "production" && (!apiUrl || apiUrl.trim().length === 0);

  if (!shouldShow) return null;

  return (
    <div className={className}>
      <Alert
        variant="info"
        message="Aviso: NEXT_PUBLIC_API_URL não configurado. Conecte a API para liberar o app."
      />
    </div>
  );
}
