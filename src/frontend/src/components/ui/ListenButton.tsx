import { useSettingsStore } from "@/lib/settings-store";
import { cn } from "@/lib/utils";
import { type VoiceLanguage, createVoiceService } from "@/lib/voice-service";
import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ListenButtonProps {
  text: string;
  label?: string;
  className?: string;
  /** Voice language for TTS. Overrides the app settings language when provided. */
  lang?: VoiceLanguage;
}

/** Maps the app language setting to a Web Speech API voice language. */
function toVoiceLanguage(language: string): VoiceLanguage {
  if (language === "hi") return "hi-IN";
  if (language === "hinglish") return "hinglish";
  return "en-IN";
}

/**
 * Compact, unobtrusive text-to-speech button. Reads the provided text
 * aloud using the browser Web Speech API.
 */
export function ListenButton({
  text,
  label = "Listen",
  className,
  lang,
}: ListenButtonProps) {
  const { settings } = useSettingsStore();
  const [speaking, setSpeaking] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const serviceRef = useRef<ReturnType<typeof createVoiceService> | null>(null);

  useEffect(() => {
    const service = createVoiceService();
    serviceRef.current = service;
    if (!service.supported) setUnsupported(true);
    return () => service.stop();
  }, []);

  const toggle = () => {
    const service = serviceRef.current;
    if (!service || !service.supported) return;
    if (speaking) {
      service.stop();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      service.speak(text, {
        rate: settings.voice.rate,
        pitch: settings.voice.pitch,
        lang: lang ?? toVoiceLanguage(settings.language),
        onEnd: () => setSpeaking(false),
      });
    }
  };

  if (unsupported) {
    return (
      <button
        type="button"
        disabled
        className={cn("listen-btn size-8", className)}
        aria-label="Text-to-speech not supported in this browser"
      >
        <VolumeX className="size-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn("listen-btn size-8", speaking && "listening", className)}
      aria-label={speaking ? "Stop reading aloud" : label}
      data-ocid="listen_button"
    >
      <Volume2 className="size-4" />
    </button>
  );
}
