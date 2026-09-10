import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { formatINR } from "@/lib/demo-data";
import type { Scheme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BadgePercent, Building2 } from "lucide-react";

interface SchemeCardProps {
  scheme: Scheme;
  onSelect?: (scheme: Scheme) => void;
  className?: string;
}

export function SchemeCard({ scheme, onSelect, className }: SchemeCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col p-5 transition-smooth hover:shadow-elevated",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
          <BadgePercent className="size-5" />
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          {scheme.matchScore}% match
        </span>
      </div>
      <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
        {scheme.name}
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Building2 className="size-3.5" />
        {scheme.provider}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">
        {scheme.description}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Benefit</p>
          <p className="font-medium text-foreground">{scheme.benefit}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Max support</p>
          <p className="font-medium text-foreground">
            {formatINR(scheme.maxAmount)}
          </p>
        </div>
      </div>
      {onSelect ? (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          className="mt-4 w-full"
          onClick={() => onSelect(scheme)}
          data-ocid="scheme_select_button"
        >
          View details
        </Button>
      ) : null}
    </Card>
  );
}
