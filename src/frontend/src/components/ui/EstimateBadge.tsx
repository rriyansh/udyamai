import type { Confidence, Estimate, Provenance } from "@/lib/types";
import { cn } from "@/lib/utils";

interface EstimateBadgeProps {
  estimate: Estimate;
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

/**
 * Displays an estimate's provenance label and confidence badge.
 */
export function EstimateBadge({ estimate, className }: EstimateBadgeProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      data-ocid="estimate_badge"
    >
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
          provenanceClass[estimate.provenance],
        )}
      >
        {provenanceLabel[estimate.provenance]}
      </span>
      <span
        className={cn(
          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
          confidenceClass[estimate.confidence],
        )}
      >
        {estimate.confidence} confidence
      </span>
    </div>
  );
}
