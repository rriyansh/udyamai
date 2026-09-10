import { cn } from "@/lib/utils";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ToastVariant = "default" | "success" | "error" | "info";

interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (options: {
    title: string;
    description?: string;
    variant?: ToastVariant;
  }) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

let toastCounter = 0;

const variantIcons: Record<ToastVariant, ReactNode> = {
  default: <Info className="size-4 text-primary" />,
  success: <CheckCircle2 className="size-4 text-success" />,
  error: <XCircle className="size-4 text-destructive" />,
  info: <Info className="size-4 text-primary" />,
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (options: {
      title: string;
      description?: string;
      variant?: ToastVariant;
    }) => {
      const id = ++toastCounter;
      const item: ToastItem = {
        id,
        title: options.title,
        description: options.description,
        variant: options.variant ?? "default",
      };
      setToasts((current) => [...current, item]);
      window.setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ toast }), [toast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4"
        aria-live="polite"
        data-ocid="toast_viewport"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-elevated animate-fade-in"
            data-ocid="toast"
          >
            <span className="mt-0.5 shrink-0">{variantIcons[t.variant]}</span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">{t.title}</p>
              {t.description ? (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {t.description}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded-full p-1 text-muted-foreground transition-smooth hover:bg-muted hover:text-foreground"
              aria-label="Dismiss notification"
              data-ocid="toast_dismiss_button"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

export function Toast({ className }: { className?: string }) {
  return <div className={cn("hidden", className)} aria-hidden="true" />;
}
