import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: ModalProps) {
  const panelRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
          }
        }}
        aria-hidden="true"
      />
      <dialog
        ref={panelRef}
        open
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={cn(
          "relative z-10 m-0 w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-elevated outline-none animate-fade-in",
          className,
        )}
        data-ocid="modal"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="modal-title"
              className="font-display text-lg font-semibold tracking-tight"
            >
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close dialog"
            className="size-8 shrink-0 rounded-full"
            data-ocid="modal_close_button"
          >
            <X className="size-4" />
          </Button>
        </div>
        <div className="mt-5">{children}</div>
        {footer ? (
          <div className="mt-6 flex items-center justify-end gap-2">
            {footer}
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
