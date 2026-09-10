import { Card } from "@/components/Card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type FinancialCategory =
  | "money"
  | "loan"
  | "interest"
  | "capital"
  | "breakeven"
  | "operating";

const categoryClass: Record<FinancialCategory, string> = {
  money: "fin-money",
  loan: "fin-loan",
  interest: "fin-interest",
  capital: "fin-capital",
  breakeven: "fin-breakeven",
  operating: "fin-operating",
};

const categoryLabel: Record<FinancialCategory, string> = {
  money: "Money",
  loan: "Loan",
  interest: "Interest",
  capital: "Capital",
  breakeven: "Break-even",
  operating: "Operating",
};

interface FinancialMetricCardProps {
  label: string;
  value: string;
  category: FinancialCategory;
  icon?: ReactNode;
  hint?: string;
  className?: string;
}

/**
 * A metric card for the financial overview. Shows a large mono tabular
 * number with a small colored category chip using the Phase 3 financial
 * color grammar (green money, indigo loan, amber interest, teal capital,
 * violet break-even, neutral operating).
 */
export function FinancialMetricCard({
  label,
  value,
  category,
  icon,
  hint,
  className,
}: FinancialMetricCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col gap-3 p-5 transition-smooth hover:shadow-elevated",
        className,
      )}
      data-ocid="financial_metric_card"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        {icon ? (
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="fin-stat text-2xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      <div className="flex items-center gap-2">
        <span
          className={cn("fin-chip", categoryClass[category], "bg-current/10")}
        >
          {categoryLabel[category]}
        </span>
        {hint ? (
          <span className="text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </div>
    </Card>
  );
}
