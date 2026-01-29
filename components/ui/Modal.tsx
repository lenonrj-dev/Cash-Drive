/* frontend/components/ui/Modal.tsx */
import React from "react";

export default function Modal({
  open,
  title,
  description,
  onClose,
  children,
  footer
}: {
  open: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-200/70 px-4">
      <div className="w-full max-w-lg rounded-[22px] border border-zinc-200/70 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.6)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            {title ? <h3 className="text-lg font-bold text-zinc-900">{title}</h3> : null}
            {description ? (
              <p className="mt-1 text-sm text-zinc-500">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
          >
            Fechar
          </button>
        </div>

        <div className="mt-4">{children}</div>

        {footer ? <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">{footer}</div> : null}
      </div>
    </div>
  );
}
