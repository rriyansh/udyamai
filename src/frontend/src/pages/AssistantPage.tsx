import { Button } from "@/components/Button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { AIExplanation } from "@/components/ui/AIExplanation";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import { ListenButton } from "@/components/ui/ListenButton";
import { VoiceInput } from "@/components/ui/VoiceInput";
import { useAiService } from "@/lib/ai-service";
import { useAnalysisStore } from "@/lib/analysis-store";
import type { ChatMessage, ChatRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type VoiceLanguage, normalizeIndianNumber } from "@/lib/voice-service";
import { RefreshCw, Send, Sparkles } from "lucide-react";
import { useRef, useState } from "react";

const SUGGESTIONS = [
  "Is this business suitable for my village?",
  "Why is competition high?",
  "How can I reduce risk?",
  "Explain my market opportunity.",
  "What does margin mean?",
];

interface UiMessage {
  id: string;
  role: ChatRole;
  content: string;
  source?: "backend" | "demo";
  retryable?: boolean;
  question?: string;
}

/** Detects whether a reply references an important financial value. */
function mentionsFinance(content: string): boolean {
  return /(?:₹|rs\.?|inr|lakh|margin|cost|price|profit|capital)/i.test(content);
}

export default function AssistantPage() {
  const { ask, backendAvailable } = useAiService();
  const current = useAnalysisStore((s) => s.current);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [lang, setLang] = useState<string>("en-IN");
  const idRef = useRef(0);

  const nextId = () => `msg-${++idRef.current}`;

  const send = async (text: string, retryId?: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const normalized = normalizeIndianNumber(trimmed);

    let history: ChatMessage[];
    let userMessage: UiMessage | null = null;

    if (retryId) {
      // Retrying a demo reply: keep the conversation up to and including
      // the user message that produced it (the message before the reply).
      const idx = messages.findIndex((m) => m.id === retryId);
      history = messages
        .slice(0, idx)
        .map((m) => ({ role: m.role, content: m.content }));
    } else {
      userMessage = { id: nextId(), role: "user", content: normalized };
      history = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));
    }

    setPending(true);
    if (userMessage) setMessages((prev) => [...prev, userMessage!]);

    const result = await ask(
      { analysisId: current?.id ?? "", message: normalized, history },
      current,
    );

    const assistantMessage: UiMessage = {
      id: nextId(),
      role: "assistant",
      content: result.reply,
      source: result.source,
      retryable: result.source === "demo",
      question: normalized,
    };

    setMessages((prev) =>
      retryId
        ? prev.map((m) => (m.id === retryId ? assistantMessage : m))
        : [...prev, assistantMessage],
    );
    setPending(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void send(input);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
            <Sparkles className="size-4" />
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ask UdyamAI
          </h1>
        </div>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Ask questions about your current analysis. UdyamAI explains and
          recommends — it never invents loan amounts, scheme eligibility,
          competitor numbers, or market values.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <LanguageSelector
          value={lang}
          onChange={setLang}
          label="Voice language"
          className="w-full sm:w-56"
        />
        <span className="text-xs text-muted-foreground">
          {backendAvailable ? "Connected to backend" : "Demo mode"}
        </span>
      </div>

      {!current ? (
        <Card data-ocid="empty_state">
          <CardHeader>
            <CardTitle>No analysis yet</CardTitle>
            <CardDescription>
              Run a new analysis first so UdyamAI can answer questions about
              your specific market context.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          <AIExplanation
            title="About your analysis"
            content={`I can answer questions about your ${current.input.category} analysis in ${current.input.village}, ${current.input.district}, ${current.input.state} at a ${current.radius} radius. Ask me about demand, competition, risk, or what a term means.`}
          />

          <div className="space-y-3" data-ocid="chat_thread">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
                data-ocid={`chat_message.${message.id}`}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    message.role === "user"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground",
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        {message.source === "demo" ? (
                          <span className="mb-1.5 inline-flex items-center rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning">
                            Demo data
                          </span>
                        ) : null}
                        <p className="whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                        {message.retryable ? (
                          <button
                            type="button"
                            onClick={() =>
                              message.question &&
                              void send(message.question, message.id)
                            }
                            disabled={pending}
                            className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                            data-ocid="retry_button"
                          >
                            <RefreshCw className="size-3" />
                            Retry with backend
                          </button>
                        ) : null}
                      </div>
                      <ListenButton
                        text={message.content}
                        lang={lang as VoiceLanguage}
                        label={
                          mentionsFinance(message.content)
                            ? "Read and confirm aloud"
                            : "Read aloud"
                        }
                        className="mt-0.5 shrink-0"
                      />
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap break-words">
                      {message.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {pending ? (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground animate-pulse-soft">
                  Thinking…
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => void send(suggestion)}
                disabled={pending}
                className="rounded-full border border-border bg-muted/40 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-smooth hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                data-ocid="suggestion_chip"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <VoiceInput
              value={input}
              onChange={setInput}
              lang={lang as VoiceLanguage}
              placeholder="Ask about your analysis…"
              className="w-full"
            />
            <Button
              type="submit"
              disabled={!input.trim() || pending}
              className="w-full sm:w-auto"
              data-ocid="send_message_button"
            >
              <Send className="size-4" />
              Send
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
