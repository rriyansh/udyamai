import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center",
        className,
      )}
      data-ocid="empty_state"
    >
      {icon ? (
        <span className="flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
          {icon}
        </span>
      ) : null}
      <h3 className="font-display text-lg font-semibold tracking-tight">
        {title}
      </h3>
      {description ? (
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
      {actionLabel && onAction ? (
        <Button
          type="button"
          onClick={onAction}
          className="mt-2"
          data-ocid="empty_state_action"
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}
