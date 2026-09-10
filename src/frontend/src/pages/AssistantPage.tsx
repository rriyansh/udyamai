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
import { CHAT_ROLES, DEFAULT_ROLE_ID, getChatRole } from "@/lib/chat-roles";
import type { ChatMessage, ChatPersonaId, ChatRole } from "@/lib/types";
import { cn } from "@/lib/utils";
import { type VoiceLanguage, normalizeIndianNumber } from "@/lib/voice-service";
import { Radio, RefreshCw, Send } from "lucide-react";
import { useRef, useState } from "react";

interface UiMessage {
  id: string;
  role: ChatRole;
  content: string;
  source?: "backend" | "openai" | "stream" | "demo";
  retryable?: boolean;
  question?: string;
  streaming?: boolean;
}

/** Detects whether a reply references an important financial value. */
function mentionsFinance(content: string): boolean {
  return /(?:₹|rs\.?|inr|lakh|margin|cost|price|profit|capital)/i.test(content);
}

/** Maps a reply source to its on-screen provenance badge. */
function sourceBadge(
  source: UiMessage["source"],
): { label: string; className: string } | null {
  switch (source) {
    case "demo":
      return {
        label: "Demo data",
        className: "bg-warning/15 text-warning",
      };
    case "stream":
      return {
        label: "Live AI",
        className: "bg-success/15 text-success",
      };
    case "openai":
      return {
        label: "OpenAI explanation",
        className: "bg-primary/15 text-primary",
      };
    case "backend":
      return {
        label: "Backend",
        className: "bg-primary/15 text-primary",
      };
    default:
      return null;
  }
}

function RoleSelector({
  value,
  onChange,
}: {
  value: ChatPersonaId;
  onChange: (id: ChatPersonaId) => void;
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1"
      role="tablist"
      aria-label="Assistant role"
      data-ocid="role_selector"
    >
      {CHAT_ROLES.map((role) => {
        const Icon = role.icon;
        const selected = role.id === value;
        return (
          <button
            key={role.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(role.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
            data-ocid={`role_${role.id}`}
          >
            <Icon className="size-3.5" aria-hidden />
            {role.label}
          </button>
        );
      })}
    </div>
  );
}

export default function AssistantPage() {
  const { askStream, backendAvailable } = useAiService();
  const current = useAnalysisStore((s) => s.current);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [lang, setLang] = useState<string>("en-IN");
  const [activeRole, setActiveRole] = useState<ChatPersonaId>(DEFAULT_ROLE_ID);
  const idRef = useRef(0);

  const role = getChatRole(activeRole);
  const nextId = () => `msg-${++idRef.current}`;

  const send = async (text: string, retryId?: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const normalized = normalizeIndianNumber(trimmed);

    let history: ChatMessage[];
    let userMessage: UiMessage | null = null;

    if (retryId) {
      // Retrying a reply: keep the conversation up to and including
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

    // A provisional assistant bubble we stream live tokens into.
    const replyId = retryId ?? nextId();
    const placeholder: UiMessage = {
      id: replyId,
      role: "assistant",
      content: "",
      source: "stream",
      streaming: true,
      question: normalized,
    };
    setMessages((prev) =>
      retryId
        ? prev.map((m) => (m.id === retryId ? placeholder : m))
        : [...prev, placeholder],
    );

    const result = await askStream(
      {
        analysisId: current?.id ?? "",
        message: normalized,
        history,
        persona: activeRole,
      },
      current,
      (token) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === replyId ? { ...m, content: m.content + token } : m,
          ),
        );
      },
    );

    setMessages((prev) =>
      prev.map((m) =>
        m.id === replyId
          ? {
              ...m,
              content: result.reply,
              source: result.source,
              retryable: result.source === "demo",
              streaming: false,
            }
          : m,
      ),
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
            <Radio className="size-4" />
          </span>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            Ask UdyamAI
          </h1>
        </div>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Chat in real time with the UdyamAI advisor that matches what you are
          working on. It explains your own analysis — it never invents loan
          amounts, scheme eligibility, competitor numbers, or market values.
        </p>
      </header>

      <div className="mb-4 space-y-3">
        <RoleSelector value={activeRole} onChange={setActiveRole} />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">
              {role.label}
              <span className="ml-2 font-normal text-muted-foreground">
                {role.tagline}
              </span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {role.description}
            </p>
          </div>
          <LanguageSelector
            value={lang}
            onChange={setLang}
            label="Voice language"
            className="w-full shrink-0 sm:w-48"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {backendAvailable
            ? "Connected to backend"
            : "Grounded on your analysis (offline mode)"}
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
            title={`Chatting with ${role.label}`}
            content={`I can answer questions about your ${current.input.category} analysis in ${current.input.village}, ${current.input.district}, ${current.input.state} at a ${current.radius} radius, from the ${role.label} point of view.`}
          />

          <div className="space-y-3" data-ocid="chat_thread">
            {messages.map((message) => {
              const badge = sourceBadge(message.source);
              return (
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
                          {badge ? (
                            <span
                              className={cn(
                                "mb-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                                badge.className,
                              )}
                            >
                              {badge.label}
                            </span>
                          ) : null}
                          {message.streaming && !message.content ? (
                            <p className="text-muted-foreground animate-pulse-soft">
                              Thinking…
                            </p>
                          ) : (
                            <p className="whitespace-pre-wrap break-words">
                              {message.content}
                              {message.streaming ? (
                                <span
                                  aria-hidden
                                  className="ml-0.5 inline-block h-4 w-[2px] animate-pulse-soft bg-primary align-text-bottom"
                                />
                              ) : null}
                            </p>
                          )}
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
                        {message.content ? (
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
                        ) : null}
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            {role.starters.map((suggestion) => (
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
              placeholder={`Ask the ${role.label}\u2026`}
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
