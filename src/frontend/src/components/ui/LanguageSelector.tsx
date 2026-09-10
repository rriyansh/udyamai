import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

export interface LanguageOption {
  value: string;
  label: string;
}

export const VOICE_LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "en-IN", label: "English" },
  { value: "hi-IN", label: "Hindi" },
  { value: "hinglish", label: "Hinglish" },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options?: LanguageOption[];
  label?: string;
  className?: string;
}

export function LanguageSelector({
  value,
  onChange,
  options = VOICE_LANGUAGE_OPTIONS,
  label = "Language",
  className,
}: LanguageSelectorProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor="language-select"
        className="text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <div className="relative">
        <Languages className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <select
          id="language-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 w-full appearance-none rounded-full border border-input bg-background pl-10 pr-10 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          data-ocid="language_selector"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
          ▾
        </span>
      </div>
    </div>
  );
}
