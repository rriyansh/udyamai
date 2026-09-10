import type { RiskLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
}

const riskStyles: Record<RiskLevel, string> = {
  low: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive",
};

const riskLabels: Record<RiskLevel, string> = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk",
};

export function RiskBadge({ risk, className }: RiskBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        riskStyles[risk],
        className,
      )}
      data-ocid="risk_badge"
    >
      <span className="size-1.5 rounded-full bg-current" />
      {riskLabels[risk]}
    </span>
  );
}
