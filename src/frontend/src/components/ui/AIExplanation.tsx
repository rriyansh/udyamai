import { Card } from "@/components/Card";
import { ListenButton } from "@/components/ui/ListenButton";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface AIExplanationProps {
  title?: string;
  content: string;
  icon?: ReactNode;
  className?: string;
}

export function AIExplanation({
  title = "AI Insight",
  content,
  icon,
  className,
}: AIExplanationProps) {
  return (
    <Card className={cn("border-accent/30 bg-accent/5 p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
            {icon ?? <Sparkles className="size-4" />}
          </span>
          <h4 className="font-display text-sm font-semibold tracking-tight">
            {title}
          </h4>
        </div>
        <ListenButton text={content} label="Read aloud" />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-foreground/90">
        {content}
      </p>
    </Card>
  );
}
