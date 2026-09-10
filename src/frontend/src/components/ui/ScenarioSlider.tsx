import { cn } from "@/lib/utils";
import { useId } from "react";

interface ScenarioSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  format?: (value: number) => string;
  className?: string;
}

export function ScenarioSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  className,
}: ScenarioSliderProps) {
  const display = format ? format(value) : String(value);
  const inputId = useId();
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
        <span className="font-display text-sm font-semibold text-primary">
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
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-primary"
        aria-label={label}
        data-ocid="scenario_slider"
      />
    </div>
  );
}
