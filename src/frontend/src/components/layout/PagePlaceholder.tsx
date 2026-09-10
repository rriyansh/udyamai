import { EmptyState } from "@/components/ui/EmptyState";
import { Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface PagePlaceholderProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export function PagePlaceholder({
  title,
  description,
  icon,
}: PagePlaceholderProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
      </div>
      <EmptyState
        title={`${title} is being prepared`}
        description="This section is part of the UdyamAI experience and will be available in an upcoming update."
        icon={icon ?? <Sparkles className="size-6" />}
      />
    </div>
  );
}
