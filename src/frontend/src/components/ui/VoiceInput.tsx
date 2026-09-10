import { VoiceButton } from "@/components/ui/VoiceButton";
import { cn } from "@/lib/utils";
import type { VoiceLanguage } from "@/lib/voice-service";
import { Mic } from "lucide-react";
import { useId } from "react";

interface VoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  lang?: VoiceLanguage;
  className?: string;
}

export function VoiceInput({
  value,
  onChange,
  label,
  placeholder = "Type or speak…",
  lang = "en-IN",
  className,
}: VoiceInputProps) {
  const inputId = useId();
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-foreground"
        >
          {label}
        </label>
      ) : null}
      <div className="flex items-center gap-2">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-11 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          data-ocid="voice_input"
        />
        <VoiceButton
          onResult={(transcript) => onChange(transcript)}
          label=""
          lang={lang}
          className="size-11 shrink-0 rounded-full p-0"
          aria-label="Dictate input"
        />
      </div>
    </div>
  );
}
