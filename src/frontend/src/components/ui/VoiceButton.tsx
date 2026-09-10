import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { type VoiceLanguage, createVoiceService } from "@/lib/voice-service";
import { Mic, MicOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VoiceButtonProps {
  onResult: (transcript: string) => void;
  onListeningChange?: (listening: boolean) => void;
  disabled?: boolean;
  label?: string;
  lang?: VoiceLanguage;
  className?: string;
}

/**
 * Speech-to-text button using the browser Web Speech API behind a
 * Sarvam-compatible abstraction. Supports English, Hindi, and Hinglish.
 */
export function VoiceButton({
  onResult,
  onListeningChange,
  disabled = false,
  label = "Speak",
  lang = "en-IN",
  className,
}: VoiceButtonProps) {
  const [listening, setListening] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const service = createVoiceService();
    if (!service.supported) {
      setUnsupported(true);
      return;
    }
    return () => stopRef.current?.();
  }, []);

  const toggle = () => {
    if (listening) {
      stopRef.current?.();
      setListening(false);
      onListeningChange?.(false);
      return;
    }
    const service = createVoiceService();
    setListening(true);
    onListeningChange?.(true);
    stopRef.current = service.listen({
      lang,
      onResult: (transcript) => {
        onResult(transcript);
        setListening(false);
        onListeningChange?.(false);
      },
      onEnd: () => {
        setListening(false);
        onListeningChange?.(false);
      },
      onError: () => {
        setListening(false);
        onListeningChange?.(false);
      },
    });
  };

  if (unsupported) {
    return (
      <Button
        type="button"
        variant="secondary"
        disabled
        className={className}
        aria-label="Voice input not supported in this browser"
      >
        <MicOff className="size-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant={listening ? "primary" : "secondary"}
      onClick={toggle}
      disabled={disabled}
      className={cn(listening && "animate-pulse-soft", className)}
      aria-label={listening ? "Stop listening" : label}
      data-ocid="voice_button"
    >
      <Mic className={cn("size-4", listening && "text-primary-foreground")} />
      {listening ? "Listening…" : label}
    </Button>
  );
}
