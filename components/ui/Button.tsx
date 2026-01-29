/* frontend/components/ui/Button.tsx */
"use client";

import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-teal-600 text-white hover:bg-teal-500 focus-visible:ring-teal-400/70",
  secondary:
    "bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-zinc-300/70",
  ghost:
    "bg-transparent text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-300/70"
};

const sizes: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base"
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition",
        "shadow-[0_10px_20px_-14px_rgba(15,23,42,0.3)]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        variants[variant],
        sizes[size],
        className
      ].join(" ")}
    />
  );
}
