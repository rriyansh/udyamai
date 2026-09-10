import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DEMO_ANALYSES, categoryName } from "@/lib/demo-data";
import type { Analysis, AnalysisStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CalendarDays, FolderOpen, RefreshCw, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const statusLabels: Record<AnalysisStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  draft: "Draft",
};

const statusStyles: Record<AnalysisStatus, string> = {
  completed: "bg-success/15 text-success",
  "in-progress": "bg-primary/15 text-primary",
  draft: "bg-muted text-muted-foreground",
};

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function AnalysisCard({
  analysis,
  onOpen,
}: {
  analysis: Analysis;
  onOpen: () => void;
}) {
  return (
    <Card
      className="group cursor-pointer transition-smooth hover:shadow-elevated focus-within:ring-2 focus-within:ring-ring"
      data-ocid="analysis_card"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold tracking-tight text-foreground">
              {analysis.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {categoryName(analysis.category)}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold",
              statusStyles[analysis.status],
            )}
          >
            {statusLabels[analysis.status]}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" />
            {formatDate(analysis.createdAt)}
          </div>
          <div className="flex items-center gap-3">
            <RiskBadge risk={analysis.risk} />
            <span className="font-display text-lg font-bold tracking-tight text-gradient">
              {analysis.score}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-4 w-full"
          onClick={onOpen}
          data-ocid="analysis_open_button"
        >
          View details
        </Button>
      </CardContent>
    </Card>
  );
}

function AnalysisDetail({
  analysis,
  onClose,
}: {
  analysis: Analysis;
  onClose: () => void;
}) {
  return (
    <Modal
      open
      onClose={onClose}
      title={analysis.title}
      description={`${categoryName(analysis.category)} · ${formatDate(analysis.createdAt)}`}
      footer={
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="analysis_detail_close_button"
        >
          Close
        </Button>
      }
    >
      <div className="space-y-5">
        <ScoreCard
          score={analysis.score}
          label="Feasibility Score"
          risk={analysis.risk}
          size="md"
        />
        <div>
          <h4 className="text-sm font-semibold text-foreground">Summary</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {analysis.summary}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <dt className="text-xs font-medium text-muted-foreground">
              Status
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {statusLabels[analysis.status]}
            </dd>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-3">
            <dt className="text-xs font-medium text-muted-foreground">
              Category
            </dt>
            <dd className="mt-1 text-sm font-semibold text-foreground">
              {categoryName(analysis.category)}
            </dd>
          </div>
        </dl>
      </div>
    </Modal>
  );
}

export default function MyAnalysesPage() {
  const [analyses, setAnalyses] = useState<Analysis[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Analysis | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(() => {
    setError(null);
    setAnalyses(null);
    // Simulate a realistic async fetch of the user's saved analyses.
    window.setTimeout(() => {
      setAnalyses(DEMO_ANALYSES);
    }, 700);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!analyses) return [];
    const q = query.trim().toLowerCase();
    if (!q) return analyses;
    return analyses.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        categoryName(a.category).toLowerCase().includes(q),
    );
  }, [analyses, query]);

  const isLoading = analyses === null && error === null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          My Analyses
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Review the history of your business analyses and revisit past
          recommendations.
        </p>
      </header>

      {isLoading ? (
        <div
          className="grid gap-4 sm:grid-cols-2"
          data-ocid="loading_state"
          aria-busy="true"
          aria-label="Loading analyses"
        >
          {Array.from({ length: 4 }, (_, i) => `skeleton-${i}`).map((id) => (
            <Card key={id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="mt-4 h-9 w-full rounded-full" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <EmptyState
          title="Couldn't load your analyses"
          description={error}
          icon={<RefreshCw className="size-6" />}
          actionLabel="Try again"
          onAction={load}
          data-ocid="error_state"
        />
      ) : analyses && analyses.length === 0 ? (
        <EmptyState
          title="No analyses yet"
          description="Run your first business analysis to see it here with a feasibility score and recommendations."
          icon={<FolderOpen className="size-6" />}
          data-ocid="empty_state"
        />
      ) : (
        <>
          <div className="relative mb-5">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search analyses"
              aria-label="Search analyses"
              className="h-11 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm text-foreground outline-none transition-smooth placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="analysis_search_input"
            />
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No matching analyses"
              description={`Nothing matched "${query}". Try a different search term.`}
              icon={<Search className="size-6" />}
              data-ocid="empty_state"
            />
          ) : (
            <div
              className="grid gap-4 sm:grid-cols-2"
              data-ocid="analysis_list"
            >
              {filtered.map((analysis) => (
                <AnalysisCard
                  key={analysis.id}
                  analysis={analysis}
                  onOpen={() => setSelected(analysis)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {selected ? (
        <AnalysisDetail analysis={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
