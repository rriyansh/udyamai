import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { ChevronDown, HelpCircle } from "lucide-react";
import { type ReactNode, useState } from "react";

interface WhyButtonProps {
  label?: string;
  children: ReactNode;
  className?: string;
}

export function WhyButton({
  label = "Why?",
  children,
  className,
}: WhyButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        className="w-fit gap-1.5 text-muted-foreground"
        aria-expanded={open}
        data-ocid="why_button"
      >
        <HelpCircle className="size-4" />
        {label}
        <ChevronDown
          className={cn("size-3.5 transition-smooth", open && "rotate-180")}
        />
      </Button>
      {open ? (
        <div className="rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground/90">
          {children}
        </div>
      ) : null}
    </div>
  );
}
