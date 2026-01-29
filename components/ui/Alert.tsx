/* frontend/components/ui/Alert.tsx */
import React from "react";

export default function Alert({
  variant = "error",
  message
}: {
  variant?: "error" | "info" | "success";
  message: string;
}) {
  const styles =
    variant === "success"
      ? "border-emerald-200/70 bg-emerald-50 text-emerald-700"
      : variant === "info"
      ? "border-blue-200/70 bg-blue-50 text-blue-700"
      : "border-red-200/70 bg-red-50 text-red-700";

  return <div className={`rounded-xl border p-3 text-sm ${styles}`}>{message}</div>;
}
