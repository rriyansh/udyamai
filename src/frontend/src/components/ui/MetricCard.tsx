import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  icon?: ReactNode;
  trend?: number;
  hint?: string;
  className?: string;
}

export function MetricCard({
  label,
  value,
  icon,
  trend,
  hint,
  className,
}: MetricCardProps) {
  const positive = (trend ?? 0) >= 0;
  return (
    <Card
      className={cn("p-5 transition-smooth hover:shadow-elevated", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        {icon ? (
          <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {trend !== undefined ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-semibold",
              positive ? "text-success" : "text-destructive",
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3.5" />
            ) : (
              <ArrowDownRight className="size-3.5" />
            )}
            {Math.abs(trend)}%
          </span>
        ) : null}
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    </Card>
  );
}
