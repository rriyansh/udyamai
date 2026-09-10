import { c as createLucideIcon, A as useSettingsStore, r as reactExports, j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
import { B as Button } from "./Card-DVJtgs4C.js";
import { M as Mic } from "./mic-D-MBcTKN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M18.89 13.23A7.12 7.12 0 0 0 19 12v-2", key: "80xlxr" }],
  ["path", { d: "M5 10v2a7 7 0 0 0 12 5", key: "p2k8kg" }],
  ["path", { d: "M15 9.34V5a3 3 0 0 0-5.68-1.33", key: "1gzdoj" }],
  ["path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12", key: "r2i35w" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
];
const MicOff = createLucideIcon("mic-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
function getRecognitionCtor() {
  const w = window;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition;
}
function langCode(lang) {
  return lang === "hinglish" ? "hi-IN" : lang;
}
function createVoiceService() {
  const ttsSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const sttSupported = typeof window !== "undefined" && !!getRecognitionCtor();
  return {
    supported: ttsSupported || sttSupported,
    speak(text, options) {
      var _a;
      if (!ttsSupported) {
        (_a = options == null ? void 0 : options.onEnd) == null ? void 0 : _a.call(options);
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = (options == null ? void 0 : options.rate) ?? 1;
      utterance.pitch = (options == null ? void 0 : options.pitch) ?? 1;
      utterance.lang = langCode((options == null ? void 0 : options.lang) ?? "en-IN");
      utterance.onend = () => {
        var _a2;
        return (_a2 = options == null ? void 0 : options.onEnd) == null ? void 0 : _a2.call(options);
      };
      utterance.onerror = () => {
        var _a2;
        return (_a2 = options == null ? void 0 : options.onEnd) == null ? void 0 : _a2.call(options);
      };
      window.speechSynthesis.speak(utterance);
    },
    stop() {
      if (ttsSupported) window.speechSynthesis.cancel();
    },
    listen(options) {
      var _a, _b;
      const Ctor = getRecognitionCtor();
      if (!Ctor) {
        (_a = options.onError) == null ? void 0 : _a.call(options);
        return () => void 0;
      }
      const recognition = new Ctor();
      recognition.lang = langCode(options.lang ?? "en-IN");
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;
      recognition.onresult = (event) => {
        var _a2;
        const result = (_a2 = event.results[0]) == null ? void 0 : _a2[0];
        if (result) options.onResult(result.transcript);
      };
      recognition.onend = () => {
        var _a2;
        return (_a2 = options.onEnd) == null ? void 0 : _a2.call(options);
      };
      recognition.onerror = () => {
        var _a2, _b2;
        (_a2 = options.onError) == null ? void 0 : _a2.call(options);
        (_b2 = options.onEnd) == null ? void 0 : _b2.call(options);
      };
      try {
        recognition.start();
      } catch {
        (_b = options.onError) == null ? void 0 : _b.call(options);
      }
      return () => {
        try {
          recognition.abort();
        } catch {
        }
      };
    }
  };
}
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
  "₹1,00,000"
];
function normalizeIndianNumber(input) {
  const trimmed = input.trim();
  if (!trimmed) return "";
  const inr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  });
  const lakhMatch = trimmed.match(
    /([\d,]+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|लाख|लाखों)/i
  );
  if (lakhMatch) {
    const amount = Number(lakhMatch[1].replace(/,/g, ""));
    if (Number.isFinite(amount)) {
      return inr.format(amount * 1e5);
    }
  }
  if (LAKH_WORDS.some((w) => trimmed.toLowerCase() === w.toLowerCase()) || HUNDRED_THOUSAND_WORDS.some(
    (w) => trimmed.toLowerCase() === w.toLowerCase()
  )) {
    return inr.format(1e5);
  }
  const numberMatch = trimmed.match(/^[\d,]+(?:\.\d+)?$/);
  if (numberMatch) {
    const amount = Number(trimmed.replace(/,/g, ""));
    if (Number.isFinite(amount)) {
      return inr.format(amount);
    }
  }
  const currencyMatch = trimmed.match(/(?:₹|rs\.?|inr)\s*([\d,]+(?:\.\d+)?)/i);
  if (currencyMatch) {
    const amount = Number(currencyMatch[1].replace(/,/g, ""));
    if (Number.isFinite(amount)) {
      return inr.format(amount);
    }
  }
  return trimmed;
}
function toVoiceLanguage(language) {
  if (language === "hi") return "hi-IN";
  if (language === "hinglish") return "hinglish";
  return "en-IN";
}
function ListenButton({
  text,
  label = "Listen",
  className,
  lang
}) {
  const { settings } = useSettingsStore();
  const [speaking, setSpeaking] = reactExports.useState(false);
  const [unsupported, setUnsupported] = reactExports.useState(false);
  const serviceRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
        onEnd: () => setSpeaking(false)
      });
    }
  };
  if (unsupported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        disabled: true,
        className: cn("listen-btn size-8", className),
        "aria-label": "Text-to-speech not supported in this browser",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { className: "size-4" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: toggle,
      className: cn("listen-btn size-8", speaking && "listening", className),
      "aria-label": speaking ? "Stop reading aloud" : label,
      "data-ocid": "listen_button",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { className: "size-4" })
    }
  );
}
function VoiceButton({
  onResult,
  onListeningChange,
  disabled = false,
  label = "Speak",
  lang = "en-IN",
  className
}) {
  const [listening, setListening] = reactExports.useState(false);
  const [unsupported, setUnsupported] = reactExports.useState(false);
  const stopRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const service = createVoiceService();
    if (!service.supported) {
      setUnsupported(true);
      return;
    }
    return () => {
      var _a;
      return (_a = stopRef.current) == null ? void 0 : _a.call(stopRef);
    };
  }, []);
  const toggle = () => {
    var _a;
    if (listening) {
      (_a = stopRef.current) == null ? void 0 : _a.call(stopRef);
      setListening(false);
      onListeningChange == null ? void 0 : onListeningChange(false);
      return;
    }
    const service = createVoiceService();
    setListening(true);
    onListeningChange == null ? void 0 : onListeningChange(true);
    stopRef.current = service.listen({
      lang,
      onResult: (transcript) => {
        onResult(transcript);
        setListening(false);
        onListeningChange == null ? void 0 : onListeningChange(false);
      },
      onEnd: () => {
        setListening(false);
        onListeningChange == null ? void 0 : onListeningChange(false);
      },
      onError: () => {
        setListening(false);
        onListeningChange == null ? void 0 : onListeningChange(false);
      }
    });
  };
  if (unsupported) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "secondary",
        disabled: true,
        className,
        "aria-label": "Voice input not supported in this browser",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MicOff, { className: "size-4" }),
          label
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      type: "button",
      variant: listening ? "primary" : "secondary",
      onClick: toggle,
      disabled,
      className: cn(listening && "animate-pulse-soft", className),
      "aria-label": listening ? "Stop listening" : label,
      "data-ocid": "voice_button",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: cn("size-4", listening && "text-primary-foreground") }),
        listening ? "Listening…" : label
      ]
    }
  );
}
function VoiceInput({
  value,
  onChange,
  label,
  placeholder = "Type or speak…",
  lang = "en-IN",
  className
}) {
  const inputId = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-1.5", className), children: [
    label ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: inputId,
        className: "text-sm font-medium text-foreground",
        children: label
      }
    ) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: inputId,
          type: "text",
          value,
          onChange: (e) => onChange(e.target.value),
          placeholder,
          className: "h-11 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          "data-ocid": "voice_input"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceButton,
        {
          onResult: (transcript) => onChange(transcript),
          label: "",
          lang,
          className: "size-11 shrink-0 rounded-full p-0",
          "aria-label": "Dictate input"
        }
      )
    ] })
  ] });
}
export {
  ListenButton as L,
  VoiceButton as V,
  VoiceInput as a,
  normalizeIndianNumber as n
};
