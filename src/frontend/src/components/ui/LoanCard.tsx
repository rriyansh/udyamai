import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { formatINR } from "@/lib/demo-data";
import type { Loan } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Landmark, ShieldCheck } from "lucide-react";

interface LoanCardProps {
  loan: Loan;
  onSelect?: (loan: Loan) => void;
  className?: string;
}

export function LoanCard({ loan, onSelect, className }: LoanCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col p-5 transition-smooth hover:shadow-elevated",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Landmark className="size-5" />
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {loan.matchScore}% match
        </span>
      </div>
      <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
        {loan.name}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{loan.provider}</p>
      <p className="mt-3 font-display text-2xl font-bold tracking-tight text-gradient">
        {formatINR(loan.amount)}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Interest</p>
          <p className="font-medium text-foreground">{loan.interestRate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Tenure</p>
          <p className="font-medium text-foreground">
            {loan.tenureMonths} months
          </p>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <ShieldCheck className="size-3.5" />
        {loan.collateralRequired
          ? "Collateral required"
          : "No collateral required"}
      </p>
      {onSelect ? (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-4 w-full"
          onClick={() => onSelect(loan)}
          data-ocid="loan_select_button"
        >
          View offer
        </Button>
      ) : null}
    </Card>
  );
}
