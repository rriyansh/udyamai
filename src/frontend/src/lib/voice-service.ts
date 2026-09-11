/**
 * Voice service — Web Speech API behind a Sarvam-compatible abstraction.
 * ------------------------------------------------------------------
 * Provides speech-to-text (STT) and text-to-speech (TTS) for English,
 * Hindi, and Hinglish using the browser Web Speech API. Also exposes an
 * Indian number normalizer that converts spoken/written forms such as
 * 'one lakh', '1 lakh', '₹1,00,000', '100000', 'ek lakh', and 'एक lakh'
 * into the standard ₹1,00,000 format via Intl.NumberFormat('en-IN').
 */

/** Indian languages supported by the browser's speech recognition/TTS APIs. */
export type VoiceLanguage =
  | "as-IN"
  | "bn-IN"
  | "brx-IN"
  | "doi-IN"
  | "gu-IN"
  | "hi-IN"
  | "kn-IN"
  | "ks-IN"
  | "kok-IN"
  | "mai-IN"
  | "ml-IN"
  | "mni-IN"
  | "mr-IN"
  | "ne-IN"
  | "or-IN"
  | "pa-IN"
  | "sa-IN"
  | "sat-IN"
  | "sd-IN"
  | "ta-IN"
  | "te-IN"
  | "ur-IN"
  | "en-IN"
  | "hinglish";

export interface VoiceService {
  supported: boolean;
  speak: (text: string, options?: SpeakOptions) => void;
  stop: () => void;
  listen: (options: ListenOptions) => () => void;
}

export interface SpeakOptions {
  rate?: number;
  pitch?: number;
  lang?: VoiceLanguage;
  onEnd?: () => void;
}

export interface ListenOptions {
  lang?: VoiceLanguage;
  onResult: (transcript: string) => void;
  onEnd?: () => void;
  onError?: () => void;
}

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult:
    | ((event: {
        results: ArrayLike<ArrayLike<{ transcript: string }>>;
      }) => void)
    | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | undefined {
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}

function langCode(lang: VoiceLanguage): string {
  return lang === "hinglish" ? "hi-IN" : lang;
}

export function createVoiceService(): VoiceService {
  const ttsSupported =
    typeof window !== "undefined" && "speechSynthesis" in window;
  const sttSupported = typeof window !== "undefined" && !!getRecognitionCtor();

  return {
    supported: ttsSupported || sttSupported,

    speak(text, options) {
      if (!ttsSupported) {
        options?.onEnd?.();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = options?.rate ?? 1;
      utterance.pitch = options?.pitch ?? 1;
      utterance.lang = langCode(options?.lang ?? "en-IN");
      utterance.onend = () => options?.onEnd?.();
      utterance.onerror = () => options?.onEnd?.();
      window.speechSynthesis.speak(utterance);
    },

    stop() {
      if (ttsSupported) window.speechSynthesis.cancel();
    },

    listen(options) {
      const Ctor = getRecognitionCtor();
      if (!Ctor) {
        options.onError?.();
        return () => undefined;
      }
      const recognition = new Ctor();
      recognition.lang = langCode(options.lang ?? "en-IN");
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;
      recognition.onresult = (event) => {
        const result = event.results[0]?.[0];
        if (result) options.onResult(result.transcript);
      };
      recognition.onend = () => options.onEnd?.();
      recognition.onerror = () => {
        options.onError?.();
        options.onEnd?.();
      };
      try {
        recognition.start();
      } catch {
        options.onError?.();
      }
      return () => {
        try {
          recognition.abort();
        } catch {
          /* already stopped */
        }
      };
    },
  };
}

/* ---- Indian number normalization --------------------------------- */

const LAKH_WORDS = ["lakh", "lakhs", "lac", "lacs", "लाख", "लाखों"];

const HUNDRED_THOUSAND_WORDS = [
  "one lakh",
  "1 lakh",
  "1lakh",
  "ek lakh",
  "एक लाख",
  "एक lakh",
  "100000",
  "1,00,000",
  "₹1,00,000",
];

/**
 * Normalizes a spoken or written Indian amount into the standard
 * ₹1,00,000 format. Handles 'one lakh', '1 lakh', '₹1,00,000',
 * '100000', 'ek lakh', and 'एक lakh'.
 */
export function normalizeIndianNumber(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return "";

  const inr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  // Match a numeric lakh amount: "2 lakh", "2.5 lakh", "2 लाख"
  const lakhMatch = trimmed.match(
    /([\d,]+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|लाख|लाखों)/i,
  );
  if (lakhMatch) {
    const amount = Number(lakhMatch[1].replace(/,/g, ""));
    if (Number.isFinite(amount)) {
      return inr.format(amount * 100000);
    }
  }

  // Match a bare lakh word meaning one lakh
  if (
    LAKH_WORDS.some((w) => trimmed.toLowerCase() === w.toLowerCase()) ||
    HUNDRED_THOUSAND_WORDS.some(
      (w) => trimmed.toLowerCase() === w.toLowerCase(),
    )
  ) {
    return inr.format(100000);
  }

  // Match a plain number (with or without Indian grouping)
  const numberMatch = trimmed.match(/^[\d,]+(?:\.\d+)?$/);
  if (numberMatch) {
    const amount = Number(trimmed.replace(/,/g, ""));
    if (Number.isFinite(amount)) {
      return inr.format(amount);
    }
  }

  // Match a currency-prefixed number like ₹1,00,000 or Rs 100000
  const currencyMatch = trimmed.match(/(?:₹|rs\.?|inr)\s*([\d,]+(?:\.\d+)?)/i);
  if (currencyMatch) {
    const amount = Number(currencyMatch[1].replace(/,/g, ""));
    if (Number.isFinite(amount)) {
      return inr.format(amount);
    }
  }

  return trimmed;
}
