import { Card } from "@/components/Card";
import { WhyButton } from "@/components/ui/WhyButton";
import type { FeasibilityScore } from "@/lib/types";
import { cn } from "@/lib/utils";

interface FeasibilityScoreRingProps {
  score: FeasibilityScore;
  className?: string;
}

const breakdownItems = [
  { key: "market", label: "Market", className: "feas-market" },
  { key: "financial", label: "Financial", className: "feas-financial" },
  { key: "competition", label: "Competition", className: "feas-competition" },
  { key: "risk", label: "Risk", className: "feas-risk" },
] as const;

/**
 * A circular feasibility score ring (0-100) with a colored breakdown into
 * market, financial, competition, and risk, plus a transparent "How
 * calculated?" explanation based on deterministic rules.
 */
export function FeasibilityScoreRing({
  score,
  className,
}: FeasibilityScoreRingProps) {
  const clamped = Math.max(0, Math.min(100, score.overall));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - clamped / 100);

  return (
    <Card className={cn("p-6", className)} data-ocid="feasibility_score_ring">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
        <div className="relative shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="size-40 -rotate-90"
            role="img"
            aria-label={`Feasibility score: ${clamped} out of 100`}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              className="stroke-muted"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="stroke-primary transition-smooth"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="fin-stat block text-4xl font-bold text-gradient">
                {clamped}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                / 100
              </span>
            </div>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            Feasibility score
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-foreground/85">
            {score.explanation}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {breakdownItems.map((item) => (
              <div
                key={item.key}
                className="rounded-xl border border-border p-3"
                data-ocid={`feasibility_${item.key}`}
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p
                  className={cn(
                    "fin-stat mt-1 text-xl font-bold",
                    item.className,
                  )}
                >
                  {score.breakdown[item.key]}
                </p>
              </div>
            ))}
          </div>
          <WhyButton className="mt-4" label="How calculated?">
            The score is built from four transparent parts: Market (demand and
            supply gap), Financial (profit and repayment capacity), Competition
            (how many rivals are nearby), and Risk (how likely the business is
            to face problems). Each part is scored from your analysis using
            fixed rules, then combined into one number out of 100. It is a
            guide, not a guarantee.
          </WhyButton>
        </div>
      </div>
    </Card>
  );
}
