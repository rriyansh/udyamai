import { c as createLucideIcon, j as jsxRuntimeExports, S as Sparkles, a as cn, r as reactExports } from "./index-CeuI7PIL.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, B as Button } from "./Card-DVJtgs4C.js";
import { L as ListenButton, a as VoiceInput, n as normalizeIndianNumber } from "./VoiceInput-9fGo8xCv.js";
import { L as LanguageSelector } from "./LanguageSelector-DJL1AIrd.js";
import { u as useAnalysisApi } from "./api-client-DE3CIaVf.js";
import { u as useAnalysisStore } from "./analysis-store-Dq7fPPtV.js";
import { R as RefreshCw } from "./refresh-cw-CF1KA8lM.js";
import "./mic-D-MBcTKN.js";
import "./analysis-engine-DtVfTxoQ.js";
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
function AIExplanation({
  title = "AI Insight",
  content,
  icon,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: cn("border-accent/30 bg-accent/5 p-5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-8 items-center justify-center rounded-full bg-accent/20 text-accent-foreground", children: icon ?? /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-display text-sm font-semibold tracking-tight", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ListenButton, { text: content, label: "Read aloud" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-foreground/90", children: content })
  ] });
}
function useAiService() {
  const { chat, backendAvailable } = useAnalysisApi();
  async function ask(request, analysis) {
    return chat(request, analysis);
  }
  return { ask, backendAvailable };
}
const SUGGESTIONS = [
  "Is this business suitable for my village?",
  "Why is competition high?",
  "How can I reduce risk?",
  "Explain my market opportunity.",
  "What does margin mean?"
];
function mentionsFinance(content) {
  return /(?:₹|rs\.?|inr|lakh|margin|cost|price|profit|capital)/i.test(content);
}
function AssistantPage() {
  const { ask, backendAvailable } = useAiService();
  const current = useAnalysisStore((s) => s.current);
  const [messages, setMessages] = reactExports.useState([]);
  const [input, setInput] = reactExports.useState("");
  const [pending, setPending] = reactExports.useState(false);
  const [lang, setLang] = reactExports.useState("en-IN");
  const idRef = reactExports.useRef(0);
  const nextId = () => `msg-${++idRef.current}`;
  const send = async (text, retryId) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const normalized = normalizeIndianNumber(trimmed);
    let history;
    let userMessage = null;
    if (retryId) {
      const idx = messages.findIndex((m) => m.id === retryId);
      history = messages.slice(0, idx).map((m) => ({ role: m.role, content: m.content }));
    } else {
      userMessage = { id: nextId(), role: "user", content: normalized };
      history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));
    }
    setPending(true);
    if (userMessage) setMessages((prev) => [...prev, userMessage]);
    const result = await ask(
      { analysisId: (current == null ? void 0 : current.id) ?? "", message: normalized, history },
      current
    );
    const assistantMessage = {
      id: nextId(),
      role: "assistant",
      content: result.reply,
      source: result.source,
      retryable: result.source === "demo",
      question: normalized
    };
    setMessages(
      (prev) => retryId ? prev.map((m) => m.id === retryId ? assistantMessage : m) : [...prev, assistantMessage]
    );
    setPending(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    void send(input);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 items-center justify-center rounded-full bg-accent/20 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight md:text-4xl", children: "Ask UdyamAI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "Ask questions about your current analysis. UdyamAI explains and recommends — it never invents loan amounts, scheme eligibility, competitor numbers, or market values." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        LanguageSelector,
        {
          value: lang,
          onChange: setLang,
          label: "Voice language",
          className: "w-full sm:w-56"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: backendAvailable ? "Connected to backend" : "Demo mode" })
    ] }),
    !current ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "No analysis yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Run a new analysis first so UdyamAI can answer questions about your specific market context." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AIExplanation,
        {
          title: "About your analysis",
          content: `I can answer questions about your ${current.input.category} analysis in ${current.input.village}, ${current.input.district}, ${current.input.state} at a ${current.radius} radius. Ask me about demand, competition, risk, or what a term means.`
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", "data-ocid": "chat_thread", children: [
        messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            ),
            "data-ocid": `chat_message.${message.id}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  message.role === "user" ? "bg-gradient-primary text-primary-foreground" : "border border-border bg-card text-foreground"
                ),
                children: message.role === "assistant" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                    message.source === "demo" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 inline-flex items-center rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning", children: "Demo data" }) : null,
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words", children: message.content }),
                    message.retryable ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => message.question && void send(message.question, message.id),
                        disabled: pending,
                        className: "mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
                        "data-ocid": "retry_button",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3" }),
                          "Retry with backend"
                        ]
                      }
                    ) : null
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ListenButton,
                    {
                      text: message.content,
                      lang,
                      label: mentionsFinance(message.content) ? "Read and confirm aloud" : "Read aloud",
                      className: "mt-0.5 shrink-0"
                    }
                  )
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-wrap break-words", children: message.content })
              }
            )
          },
          message.id
        )),
        pending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground animate-pulse-soft", children: "Thinking…" }) }) : null
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: SUGGESTIONS.map((suggestion) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => void send(suggestion),
          disabled: pending,
          className: "rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground disabled:opacity-50",
          "data-ocid": "suggestion_chip",
          children: suggestion
        },
        suggestion
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VoiceInput,
          {
            value: input,
            onChange: setInput,
            lang,
            placeholder: "Ask about your analysis…",
            className: "w-full"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            disabled: !input.trim() || pending,
            className: "w-full sm:w-auto",
            "data-ocid": "send_message_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
              "Send"
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  AssistantPage as default
};
