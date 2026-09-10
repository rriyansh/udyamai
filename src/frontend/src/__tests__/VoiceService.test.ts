import {
  type VoiceLanguage,
  createVoiceService,
  normalizeIndianNumber,
} from "@/lib/voice-service";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("normalizeIndianNumber", () => {
  it("normalizes 'one lakh' to the standard ₹1,00,000 format", () => {
    expect(normalizeIndianNumber("one lakh")).toBe("₹1,00,000");
  });

  it("normalizes '1 lakh' to ₹1,00,000", () => {
    expect(normalizeIndianNumber("1 lakh")).toBe("₹1,00,000");
  });

  it("normalizes '₹1,00,000' to ₹1,00,000", () => {
    expect(normalizeIndianNumber("₹1,00,000")).toBe("₹1,00,000");
  });

  it("normalizes '100000' to ₹1,00,000", () => {
    expect(normalizeIndianNumber("100000")).toBe("₹1,00,000");
  });

  it("normalizes 'ek lakh' to ₹1,00,000", () => {
    expect(normalizeIndianNumber("ek lakh")).toBe("₹1,00,000");
  });

  it("normalizes 'एक lakh' to ₹1,00,000", () => {
    expect(normalizeIndianNumber("एक lakh")).toBe("₹1,00,000");
  });

  it("normalizes a numeric lakh amount like '2.5 lakh'", () => {
    expect(normalizeIndianNumber("2.5 lakh")).toBe("₹2,50,000");
  });

  it("leaves non-numeric prose unchanged", () => {
    expect(normalizeIndianNumber("Is this business suitable?")).toBe(
      "Is this business suitable?",
    );
  });

  it("returns an empty string for blank input", () => {
    expect(normalizeIndianNumber("   ")).toBe("");
  });
});

describe("createVoiceService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reports unsupported when neither TTS nor STT is available", () => {
    // jsdom has no speechSynthesis and no SpeechRecognition by default.
    const service = createVoiceService();
    expect(service.supported).toBe(false);
  });

  it("speaks via the Web Speech API when speechSynthesis is present", () => {
    const speak = vi.fn();
    const cancel = vi.fn();
    const Utterance = vi.fn().mockImplementation(() => ({}));
    Object.defineProperty(window, "speechSynthesis", {
      value: { speak, cancel },
      configurable: true,
    });
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      value: Utterance,
      configurable: true,
    });

    const service = createVoiceService();
    expect(service.supported).toBe(true);
    service.speak("hello", { lang: "en-IN" });
    expect(cancel).toHaveBeenCalled();
    expect(Utterance).toHaveBeenCalledWith("hello");
    expect(speak).toHaveBeenCalledTimes(1);
  });

  it("maps the Hinglish language to the Hindi recognition code", () => {
    const start = vi.fn();
    const Ctor = vi.fn().mockImplementation(function (this: {
      lang: string;
      interimResults: boolean;
      maxAlternatives: number;
      continuous: boolean;
      start: () => void;
      stop: () => void;
      abort: () => void;
      onresult: unknown;
      onend: unknown;
      onerror: unknown;
    }) {
      this.lang = "";
      this.interimResults = false;
      this.maxAlternatives = 1;
      this.continuous = false;
      this.start = start;
      this.stop = vi.fn();
      this.abort = vi.fn();
      this.onresult = null;
      this.onend = null;
      this.onerror = null;
    });
    Object.defineProperty(window, "webkitSpeechRecognition", {
      value: Ctor,
      configurable: true,
    });

    const service = createVoiceService();
    const stop = service.listen({
      lang: "hinglish" as VoiceLanguage,
      onResult: vi.fn(),
    });
    expect(Ctor).toHaveBeenCalledTimes(1);
    expect(Ctor.mock.instances[0].lang).toBe("hi-IN");
    stop();
  });
});
