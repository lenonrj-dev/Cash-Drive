/* frontend/components/ui/Card.tsx */
import React from "react";

export default function Card({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-[20px] border border-zinc-200/70 bg-white/90 p-5 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.25)]",
        "backdrop-blur",
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}
