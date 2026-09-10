import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  description,
  children,
  action,
  className,
}: ChartCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight">
            {title}
          </h3>
          {description ? (
            <p className="mt-0.5 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="min-w-0">{children}</div>
    </Card>
  );
}
