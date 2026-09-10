import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { ReportCard } from "@/components/ui/ReportCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { useToast } from "@/components/ui/Toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DEMO_ANALYSES,
  DEMO_FINANCE,
  DEMO_MARKET,
  DEMO_REPORTS,
  DEMO_SCHEMES,
  formatINR,
} from "@/lib/demo-data";
import type { Report, ReportType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { FileText, RefreshCw, Search, TrendingUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

const typeLabels: Record<ReportType, string> = {
  analysis: "Analysis",
  finance: "Finance",
  market: "Market",
  scheme: "Schemes",
  "what-if": "What-if",
};

const typeFilters: { value: ReportType | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "analysis", label: "Analysis" },
  { value: "finance", label: "Finance" },
  { value: "market", label: "Market" },
  { value: "scheme", label: "Schemes" },
];

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-3.5 py-2.5">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-semibold text-foreground">
        {value}
      </dd>
    </div>
  );
}

function ReportDetail({
  report,
  onClose,
}: {
  report: Report;
  onClose: () => void;
}) {
  const analysis = DEMO_ANALYSES.find((a) => a.id === report.sourceId);
  const market = DEMO_MARKET.find((m) => m.id === report.sourceId);
  const scheme = DEMO_SCHEMES.find((s) => s.id === report.sourceId);

  return (
    <Modal
      open
      onClose={onClose}
      title={report.title}
      description={`${typeLabels[report.type]} report · ${formatDate(report.createdAt)}`}
      footer={
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          data-ocid="report_detail_close_button"
        >
          Close
        </Button>
      }
    >
      <div className="space-y-5">
        <div>
          <h4 className="text-sm font-semibold text-foreground">Summary</h4>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            {report.summary}
          </p>
        </div>

        {report.type === "analysis" && analysis ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-3xl font-bold tracking-tight text-gradient">
                {analysis.score}
              </span>
              <RiskBadge risk={analysis.risk} />
            </div>
            <dl className="grid grid-cols-2 gap-3">
              <DetailRow label="Category" value={analysis.category} />
              <DetailRow label="Status" value={analysis.status} />
            </dl>
          </div>
        ) : null}

        {report.type === "finance" ? (
          <dl className="grid grid-cols-2 gap-3">
            <DetailRow
              label="Monthly Revenue"
              value={formatINR(DEMO_FINANCE.monthlyRevenue)}
            />
            <DetailRow
              label="Monthly Expenses"
              value={formatINR(DEMO_FINANCE.monthlyExpenses)}
            />
            <DetailRow
              label="Monthly Profit"
              value={formatINR(DEMO_FINANCE.monthlyProfit)}
            />
            <DetailRow
              label="Profit Margin"
              value={`${DEMO_FINANCE.profitMargin}%`}
            />
            <DetailRow
              label="Break-even"
              value={`${DEMO_FINANCE.breakEvenMonths} months`}
            />
            <DetailRow
              label="Cash Reserve"
              value={formatINR(DEMO_FINANCE.cashReserve)}
            />
          </dl>
        ) : null}

        {report.type === "market" && market ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="size-4 text-primary" />
              {market.seasonality}
            </div>
            <dl className="grid grid-cols-3 gap-3">
              <DetailRow label="Demand" value={`${market.demand}/100`} />
              <DetailRow
                label="Competition"
                value={`${market.competition}/100`}
              />
              <DetailRow label="Growth" value={`${market.growth}%`} />
            </dl>
          </div>
        ) : null}

        {report.type === "scheme" && scheme ? (
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {scheme.name}
              </h4>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {scheme.provider}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-3">
              <DetailRow label="Benefit" value={scheme.benefit} />
              <DetailRow
                label="Max Amount"
                value={formatINR(scheme.maxAmount)}
              />
              <DetailRow label="Interest" value={scheme.interestRate} />
              <DetailRow label="Match" value={`${scheme.matchScore}%`} />
            </dl>
          </div>
        ) : null}

        {report.type === "what-if" ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            This what-if scenario report is not yet available. Run a scenario in
            the What-if Lab to generate it.
          </p>
        ) : null}
      </div>
    </Modal>
  );
}

export default function ReportsPage() {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Report | null>(null);
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ReportType | "all">("all");

  const load = useCallback(() => {
    setError(null);
    setReports(null);
    // Simulate a realistic async fetch of the user's saved reports.
    window.setTimeout(() => {
      setReports(DEMO_REPORTS);
    }, 700);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!reports) return [];
    const q = query.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesType = typeFilter === "all" || r.type === typeFilter;
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        typeLabels[r.type].toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [reports, query, typeFilter]);

  const handleDownload = useCallback(
    (report: Report) => {
      toast({
        title: "Report ready",
        description: `${report.title} has been queued for download.`,
        variant: "success",
      });
    },
    [toast],
  );

  const isLoading = reports === null && error === null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Reports
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Access and download your analysis, finance, market, and scheme
          reports.
        </p>
      </header>

      {isLoading ? (
        <div className="space-y-3" data-ocid="loading_state" aria-busy="true">
          {Array.from({ length: 4 }, (_, i) => `skeleton-${i}`).map((id) => (
            <Card key={id} className="flex items-center gap-4 p-4">
              <Skeleton className="size-11 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-9 w-20 rounded-full" />
            </Card>
          ))}
        </div>
      ) : error ? (
        <EmptyState
          title="Couldn't load your reports"
          description={error}
          icon={<RefreshCw className="size-6" />}
          actionLabel="Try again"
          onAction={load}
          data-ocid="error_state"
        />
      ) : reports && reports.length === 0 ? (
        <EmptyState
          title="No reports yet"
          description="Your saved analysis, finance, market, and scheme reports will appear here."
          icon={<FileText className="size-6" />}
          data-ocid="empty_state"
        />
      ) : (
        <>
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search reports"
              aria-label="Search reports"
              className="h-11 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm text-foreground outline-none transition-smooth placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="report_search_input"
            />
          </div>

          <div
            className="mb-5 flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label="Filter reports by type"
            data-ocid="report_filter_tabs"
          >
            {typeFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={typeFilter === filter.value}
                onClick={() => setTypeFilter(filter.value)}
                className={cn(
                  "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  typeFilter === filter.value
                    ? "border-transparent bg-gradient-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                data-ocid={`report_filter_tab_${filter.value}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No matching reports"
              description="Nothing matched your search. Try a different term or filter."
              icon={<Search className="size-6" />}
              data-ocid="empty_state"
            />
          ) : (
            <div className="space-y-3" data-ocid="report_list">
              {filtered.map((report) => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onOpen={setSelected}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          )}
        </>
      )}

      {selected ? (
        <ReportDetail report={selected} onClose={() => setSelected(null)} />
      ) : null}
    </div>
  );
}
