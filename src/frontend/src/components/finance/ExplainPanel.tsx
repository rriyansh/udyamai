import { cn } from "@/lib/utils";
import { HelpCircle } from "lucide-react";
import type { ReactNode } from "react";

interface ExplainPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

/**
 * A violet-bordered plain-language explanation panel ("What does this
 * mean?") that explains financial terms in simple English suitable for
 * rural/semi-urban users.
 */
export function ExplainPanel({
  title = "What does this mean?",
  children,
  className,
}: ExplainPanelProps) {
  return (
    <div className={cn("explain", className)} data-ocid="explain_panel">
      <p className="explain-title">
        <HelpCircle className="size-4 shrink-0" aria-hidden />
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
