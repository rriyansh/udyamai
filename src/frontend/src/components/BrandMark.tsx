import { Sparkles } from "lucide-react";
import { useState } from "react";

export function BrandMark({ className = "size-9" }: { className?: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <span
      className={`relative inline-flex ${className} items-center justify-center overflow-hidden rounded-2xl border border-border bg-white shadow-card`}
    >
      {!imageFailed ? (
        <img
          src="/assets/images/udyamai-logo.jpg"
          alt="UdyamAI logo"
          className="relative size-full object-contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="flex size-full items-center justify-center bg-gradient-primary text-primary-foreground">
          <Sparkles className="relative size-1/2" aria-hidden />
        </span>
      )}
    </span>
  );
}
