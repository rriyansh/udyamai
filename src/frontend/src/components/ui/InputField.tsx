import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
}

export function InputField({
  label,
  error,
  hint,
  icon,
  id,
  className,
  ...props
}: InputFieldProps) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
            icon && "pl-10",
            error &&
              "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
          )}
          aria-invalid={error ? true : undefined}
          data-ocid="input_field"
          {...props}
        />
      </div>
      {error ? (
        <p
          className="text-xs font-medium text-destructive"
          data-ocid="input_error"
        >
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}
