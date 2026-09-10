import { ANALYSIS_STAGES } from "@/lib/analysis-store";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface AnalysisProgressProps {
  stage: number;
  stages?: readonly string[];
  className?: string;
}

/**
 * Ten-stage animated analysis progress sequence. Shows an indeterminate
 * gradient sweep while running and marks each stage as it completes.
 */
export function AnalysisProgress({
  stage,
  stages = ANALYSIS_STAGES,
  className,
}: AnalysisProgressProps) {
  const running = stage < stages.length;
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="progress-track h-2 w-full" data-ocid="analysis_progress">
        {running ? (
          <div className="progress-indeterminate" aria-hidden="true" />
        ) : (
          <div className="h-full w-full rounded-full bg-gradient-primary" />
        )}
      </div>
      <ol className="flex flex-wrap gap-2" aria-label="Analysis stages">
        {stages.map((name, index) => {
          const done = index < stage;
          const active = index === stage && running;
          return (
            <li
              key={name}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-smooth",
                done
                  ? "border-success/30 bg-success/10 text-success"
                  : active
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-border bg-muted/40 text-muted-foreground",
              )}
              data-ocid={`analysis_stage.${index + 1}`}
            >
              {done ? (
                <Check className="size-3" />
              ) : (
                <span
                  className={cn(
                    "progress-stage-dot size-1.5 rounded-full bg-current",
                    active && "active",
                  )}
                />
              )}
              {name}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
