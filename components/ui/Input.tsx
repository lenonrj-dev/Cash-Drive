/* frontend/components/ui/Input.tsx */
"use client";

import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export default function Input({ label, hint, error, className = "", ...props }: Props) {
  return (
    <label className="block">
      {label ? (
        <span className="mb-1 block text-sm font-semibold text-zinc-800">
          {label}
        </span>
      ) : null}

      <input
        {...props}
        className={[
          "h-11 w-full rounded-xl border px-3 text-sm outline-none transition",
          "border-zinc-200/80 bg-white text-zinc-900 placeholder:text-zinc-400",
          "focus:border-teal-500 focus:ring-2 focus:ring-teal-200",
          "",
          "",
          error ? "border-red-500 focus:border-red-600 focus:ring-red-200" : "",
          className
        ].join(" ")}
      />

      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-zinc-500">{hint}</span>
      ) : null}
    </label>
  );
}
