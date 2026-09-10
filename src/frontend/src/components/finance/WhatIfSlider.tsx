import { cn } from "@/lib/utils";
import { useId } from "react";

interface WhatIfSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  className?: string;
}

/**
 * A labeled range slider for the What-if Lab. Outputs are always labelled
 * as estimates by the caller. Uses the Phase 3 `.slider` styling with the
 * gradient thumb.
 */
export function WhatIfSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  className,
}: WhatIfSliderProps) {
  const display = format ? format(value) : String(value);
  const inputId = useId();
  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      data-ocid="whatif_slider"
    >
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <span className="fin-stat text-sm font-semibold text-primary">
          {display}
        </span>
      </div>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider"
        aria-label={label}
        data-ocid="whatif_slider_input"
      />
    </div>
  );
}
