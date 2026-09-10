import { Card } from "@/components/Card";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { WhyButton } from "@/components/ui/WhyButton";
import type { Confidence, Provenance, RiskLevel } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  score: number;
  label?: string;
  risk?: RiskLevel;
  size?: "sm" | "md" | "lg";
  /** Plain-language explanation shown under the score. */
  explanation?: string;
  /** Expanded reasoning revealed by the 'Why?' button. */
  reasoning?: string;
  /** Provenance label for the score (Estimated / Observed / Calculated / User Provided). */
  provenance?: Provenance;
  /** Confidence badge for the score (High / Medium / Low). */
  confidence?: Confidence;
  className?: string;
}

const provenanceClass: Record<Provenance, string> = {
  Estimated: "prov-estimated",
  Observed: "prov-observed",
  Calculated: "prov-calculated",
  UserProvided: "prov-user",
};

const confidenceClass: Record<Confidence, string> = {
  High: "conf-high",
  Medium: "conf-medium",
  Low: "conf-low",
};

const provenanceLabel: Record<Provenance, string> = {
  Estimated: "Estimated",
  Observed: "Observed",
  Calculated: "Calculated",
  UserProvided: "User Provided",
};

const sizeMap = {
  sm: { ring: "size-24", text: "text-2xl" },
  md: { ring: "size-32", text: "text-4xl" },
  lg: { ring: "size-40", text: "text-5xl" },
};

export function ScoreCard({
  score,
  label = "Overall Score",
  risk,
  size = "md",
  explanation,
  reasoning,
  provenance,
  confidence,
  className,
}: ScoreCardProps) {
  const clamped = Math.max(0, Math.min(100, score));
  const { ring, text } = sizeMap[size];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - clamped / 100);

  return (
    <Card className={cn("flex flex-col items-center gap-4 p-6", className)}>
      <div className="relative">
        <svg
          viewBox="0 0 100 100"
          className={cn(ring, "-rotate-90")}
          role="img"
          aria-label={`${label}: ${clamped} out of 100`}
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
          <span
            className={cn(
              "font-display font-bold tracking-tight text-gradient",
              text,
            )}
          >
            {clamped}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {risk ? <RiskBadge risk={risk} /> : null}
        {provenance && confidence ? (
          <div
            className="mt-1 flex flex-wrap items-center justify-center gap-1.5"
            data-ocid="score_provenance"
          >
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                provenanceClass[provenance],
              )}
            >
              {provenanceLabel[provenance]}
            </span>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                confidenceClass[confidence],
              )}
            >
              {confidence} confidence
            </span>
          </div>
        ) : null}
      </div>
      {explanation ? (
        <p className="text-center text-sm leading-relaxed text-foreground/90">
          {explanation}
        </p>
      ) : null}
      {reasoning ? <WhyButton className="w-full">{reasoning}</WhyButton> : null}
    </Card>
  );
}
