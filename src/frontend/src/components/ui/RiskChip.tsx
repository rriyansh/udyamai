import type { RiskCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, MinusCircle } from "lucide-react";

interface RiskChipProps {
  category: RiskCategory;
  className?: string;
}

const levelClass: Record<RiskCategory["level"], string> = {
  low: "risk-low",
  medium: "risk-medium",
  high: "risk-high",
};

const levelIcon: Record<RiskCategory["level"], typeof CheckCircle2> = {
  low: CheckCircle2,
  medium: MinusCircle,
  high: AlertTriangle,
};

const levelLabel: Record<RiskCategory["level"], string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

/**
 * A single risk category chip with its level, WHY, and WHAT TO DO.
 */
export function RiskChip({ category, className }: RiskChipProps) {
  const Icon = levelIcon[category.level];
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-border bg-card p-4",
        className,
      )}
      data-ocid="risk_chip"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-foreground">
          {category.category}
        </span>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
            levelClass[category.level],
          )}
        >
          <Icon className="size-3.5" />
          {levelLabel[category.level]}
        </span>
      </div>
      <div className="space-y-2 text-sm">
        <p className="text-foreground/90">
          <span className="font-medium text-foreground">Why: </span>
          {category.why}
        </p>
        <p className="text-foreground/90">
          <span className="font-medium text-foreground">What to do: </span>
          {category.whatToDo}
        </p>
      </div>
    </div>
  );
}
