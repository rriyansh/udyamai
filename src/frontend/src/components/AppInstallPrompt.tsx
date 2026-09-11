import { Button } from "@/components/Button";
import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

/**
 * First-visit PWA invitation. Browsers require the actual install dialog to
 * be opened from a user action, so this presents a branded button when the
 * browser says installation is available.
 */
export function AppInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(sessionStorage.getItem("udyamai-install-dismissed") === "true");
    const onInstallReady = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    const onInstalled = () => setDeferredPrompt(null);
    window.addEventListener("beforeinstallprompt", onInstallReady);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onInstallReady);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (dismissed) return null;

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
  };

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto flex max-w-lg items-center gap-3 rounded-2xl border border-border bg-card p-3 shadow-elevated"
      aria-label="Install UdyamAI app"
      data-ocid="app_install_prompt"
    >
      <img
        src="/assets/images/udyamai-logo.jpg"
        alt=""
        className="size-11 shrink-0 rounded-xl border border-border object-contain"
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">Install UdyamAI</p>
        <p className="text-xs text-muted-foreground">
          {deferredPrompt
            ? "Get quick access from your home screen."
            : "Scan the QR with your phone to get the download link."}
        </p>
      </div>
      {deferredPrompt ? (
        <Button type="button" onClick={() => void install()} className="shrink-0 px-3">
          <Download className="size-4" aria-hidden />
          Install
        </Button>
      ) : null}
      <a
        href="https://bucket.appilix.com/app-apk-6915f91e10c640ffa896ad27138d86e9-1789088791.apk"
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-smooth hover:opacity-90"
        data-ocid="direct_download_button"
      >
        <Download className="size-4" aria-hidden />
        Download UdyamAI
      </a>
      <button
        type="button"
        onClick={() => {
          sessionStorage.setItem("udyamai-install-dismissed", "true");
          setDismissed(true);
        }}
        className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Dismiss install prompt"
      >
        <X className="size-4" aria-hidden />
      </button>
    </aside>
  );
}
