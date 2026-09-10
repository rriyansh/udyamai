import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function ProgressSteps({
  steps,
  currentStep,
  className,
}: ProgressStepsProps) {
  return (
    <ol className={cn("flex items-center", className)}>
      {steps.map((step, index) => {
        const isComplete = index < currentStep;
        const isCurrent = index === currentStep;
        return (
          <li
            key={step}
            className={cn(
              "flex items-center",
              index < steps.length - 1 && "flex-1",
            )}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-smooth",
                  isComplete &&
                    "border-primary bg-gradient-primary text-primary-foreground",
                  isCurrent &&
                    "border-primary bg-background text-primary ring-2 ring-ring/30",
                  !isComplete &&
                    !isCurrent &&
                    "border-border bg-muted text-muted-foreground",
                )}
                aria-current={isCurrent ? "step" : undefined}
              >
                {isComplete ? <Check className="size-4" /> : index + 1}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isCurrent ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 ? (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1 rounded-full transition-smooth",
                  index < currentStep ? "bg-primary" : "bg-border",
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
