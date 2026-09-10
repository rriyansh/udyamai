import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { ChartCard } from "@/components/ui/ChartCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { MetricCard } from "@/components/ui/MetricCard";
import { ReportCard } from "@/components/ui/ReportCard";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { useToast } from "@/components/ui/Toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useAnalysisStore } from "@/lib/analysis-store";
import {
  DEMO_ANALYSES,
  DEMO_BADGE,
  DEMO_FINANCE,
  DEMO_MARKET,
  DEMO_PROFILE,
  DEMO_REPORTS,
  categoryName,
  formatINR,
} from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import type {
  Analysis,
  BusinessCategoryId,
  HyperLocalAnalysis,
  Report,
  RiskLevel,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgePercent,
  Banknote,
  CalendarClock,
  Compass,
  FileText,
  FolderOpen,
  Landmark,
  Lightbulb,
  MapPin,
  MessageCircle,
  PiggyBank,
  Radar,
  Route,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

type PageStatus = "loading" | "ready" | "error";

function DashboardSkeleton() {
  return (
    <div className="space-y-6" data-ocid="dashboard_loading_state">
      <div className="space-y-2">
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((id) => (
          <Skeleton key={id} className="h-32 rounded-2xl" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }, (_, i) => `skeleton-lg-${i}`).map((id) => (
          <Skeleton key={id} className="h-56 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

const riskChipStyles: Record<RiskLevel, string> = {
  low: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive",
};

function HyperLocalSummaryCard({
  analysis,
  source,
}: {
  analysis: HyperLocalAnalysis;
  source: "backend" | "demo" | null;
}) {
  const { input, radius, result } = analysis;
  const category = categoryName(input.category as BusinessCategoryId);
  const location = `${input.village}, ${input.block}, ${input.district}, ${input.state}`;
  const reach = result.market.estimatedReach;
  const demand = result.scores.demand.score;
  const opportunity = result.scores.opportunity.score;
  const topRisks = result.risk.categories.slice(0, 3);
  const isDemo = source === "demo";

  return (
    <Card className="overflow-hidden" data-ocid="hyperlocal_summary_card">
      <CardHeader className="border-b border-border bg-muted/30">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
              <Radar className="size-5" />
            </span>
            <div>
              <CardTitle className="text-lg">Hyper-Local Analysis</CardTitle>
              <CardDescription>
                Latest market intelligence for your area
              </CardDescription>
            </div>
          </div>
          {isDemo ? (
            <span
              className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-foreground"
              data-ocid="hyperlocal_demo_badge"
            >
              {DEMO_BADGE}
            </span>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-5 p-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
              <Landmark className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Category
              </p>
              <p className="font-display text-sm font-semibold tracking-tight">
                {category}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
              <MapPin className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Location
              </p>
              <p className="font-display text-sm font-semibold tracking-tight">
                {location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground">
              <Route className="size-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Radius
              </p>
              <p className="font-display text-sm font-semibold tracking-tight">
                {radius}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Market Reach"
            value={reach.value.toLocaleString("en-IN")}
            icon={<Users className="size-4" />}
            hint={`${reach.provenance} · ${reach.confidence} confidence`}
          />
          <MetricCard
            label="Demand Score"
            value={`${demand}%`}
            icon={<TrendingUp className="size-4" />}
            hint="Local demand index"
          />
          <MetricCard
            label="Opportunity"
            value={`${opportunity}%`}
            icon={<Compass className="size-4" />}
            hint="Viability signal"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Top Risks
          </p>
          <div className="flex flex-wrap gap-2">
            {topRisks.map((risk) => (
              <span
                key={risk.category}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
                  riskChipStyles[risk.level],
                )}
                data-ocid="hyperlocal_risk_chip"
              >
                <span className="size-1.5 rounded-full bg-current" />
                {risk.category}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 border-t border-border bg-muted/20 p-4">
        <Button
          asChild
          variant="secondary"
          size="sm"
          data-ocid="hyperlocal_market_link"
        >
          <Link to="/market">
            <MapPin className="size-4" />
            View Market
          </Link>
        </Button>
        <Button asChild size="sm" data-ocid="hyperlocal_assistant_link">
          <Link to="/assistant">
            <MessageCircle className="size-4" />
            Ask UdyamAI
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function DashboardPage() {
  const { profile, completed, isDemo } = useOnboardingStore();
  const current = useAnalysisStore((s) => s.current);
  const analysisSource = useAnalysisStore((s) => s.source);
  const { toast } = useToast();
  const [status, setStatus] = useState<PageStatus>("loading");

  useEffect(() => {
    const timer = window.setTimeout(() => setStatus("ready"), 600);
    return () => window.clearTimeout(timer);
  }, []);

  const usingDemo = isDemo || !completed || !profile;
  const activeProfile = profile ?? DEMO_PROFILE;
  const displayName = activeProfile.name;
  const category = categoryName(activeProfile.businessCategory);
  const location = `${activeProfile.village}, ${activeProfile.district}, ${activeProfile.state}`;

  const latestAnalysis = DEMO_ANALYSES[0];
  const primaryMarket = DEMO_MARKET[0];

  const handleOpenReport = (report: Report) => {
    toast({
      title: "Opening report",
      description: report.title,
      variant: "info",
    });
  };

  const handleDownloadReport = (report: Report) => {
    toast({
      title: "Report ready",
      description: `${report.title} is being prepared for download.`,
      variant: "success",
    });
  };

  if (status === "loading") {
    return <DashboardSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="space-y-6" data-ocid="dashboard_error_state">
        <EmptyState
          title="Couldn't load your dashboard"
          description="Something went wrong while fetching your business overview. Please try again."
          icon={<Sparkles className="size-6" />}
          actionLabel="Retry"
          onAction={() => setStatus("loading")}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Greeting */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, {displayName}
            </h1>
            {usingDemo ? (
              <span
                className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-foreground"
                data-ocid="demo_badge"
              >
                {DEMO_BADGE}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Here's how your {category.toLowerCase()} business is shaping up
            today.
          </p>
        </div>
        <Button asChild size="sm" data-ocid="new_analysis_button">
          <Link to="/new">
            <Sparkles className="size-4" />
            New Analysis
          </Link>
        </Button>
      </header>

      {/* Hyper-local analysis */}
      {current ? (
        <HyperLocalSummaryCard analysis={current} source={analysisSource} />
      ) : (
        <Card
          className="bg-gradient-primary text-primary-foreground"
          data-ocid="hyperlocal_cta_card"
        >
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Radar className="size-5" />
              </span>
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight">
                  Run a Hyper-Local Analysis
                </h2>
                <p className="mt-1 text-sm text-primary-foreground/90">
                  Get market reach, demand, competition, and risk insights for
                  your village at 5 km and 10 km radii.
                </p>
              </div>
            </div>
            <Button
              asChild
              variant="secondary"
              className="shrink-0"
              data-ocid="hyperlocal_cta_button"
            >
              <Link to="/new">
                Start analysis
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Business summary + score */}
      <section
        className="grid gap-4 lg:grid-cols-3"
        aria-label="Business summary"
        data-ocid="business_summary_section"
      >
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Business Summary</CardTitle>
            <CardDescription>
              Your registered business profile at a glance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                <Landmark className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Business Category
                </p>
                <p className="truncate font-display text-lg font-semibold tracking-tight">
                  {category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                <MapPin className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Location
                </p>
                <p className="truncate font-display text-lg font-semibold tracking-tight">
                  {location}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                <CalendarClock className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Experience
                </p>
                <p className="truncate font-display text-lg font-semibold tracking-tight">
                  {activeProfile.experienceYears} years
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Feasibility Score</CardTitle>
            <CardDescription>
              Estimated viability — not a final assessment.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <ScoreCard
              score={latestAnalysis?.score ?? 0}
              label="Estimated Score"
              risk={latestAnalysis?.risk}
              size="md"
              className="w-full border-0 shadow-none"
            />
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Placeholder estimate based on your profile. Run a full analysis
              for a detailed score.
            </p>
          </CardFooter>
        </Card>
      </section>

      {/* Latest analysis */}
      {latestAnalysis ? (
        <Card data-ocid="latest_analysis_card">
          <CardHeader>
            <CardTitle>Latest Analysis</CardTitle>
            <CardDescription>
              Your most recent viability assessment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {latestAnalysis.title}
              </h3>
              <RiskBadge risk={latestAnalysis.risk} />
            </div>
            <p className="text-sm text-muted-foreground">
              {latestAnalysis.summary}
            </p>
          </CardContent>
          <CardFooter>
            <Button
              asChild
              variant="secondary"
              size="sm"
              data-ocid="view_analysis_button"
            >
              <Link to="/analyses">
                View all analyses
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {/* Market opportunity */}
      <section aria-label="Market opportunity" data-ocid="market_section">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Market Opportunity
          </h2>
          <Button asChild variant="ghost" size="sm" data-ocid="market_link">
            <Link to="/market">
              Explore
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Demand"
            value={`${primaryMarket.demand}%`}
            icon={<TrendingUp className="size-4" />}
            hint="Local demand index"
          />
          <MetricCard
            label="Competition"
            value={`${primaryMarket.competition}%`}
            icon={<Landmark className="size-4" />}
            hint="Nearby suppliers"
          />
          <MetricCard
            label="Growth"
            value={`${primaryMarket.growth}%`}
            icon={<TrendingUp className="size-4" />}
            trend={primaryMarket.growth}
            hint="Yearly growth"
          />
        </div>
        <ChartCard
          title="Demand vs Competition"
          description="Across your target categories"
          className="mt-4"
        >
          <ul className="space-y-4" data-ocid="market_chart">
            {DEMO_MARKET.map((m) => (
              <li key={m.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">
                    {categoryName(m.category)}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Demand {m.demand}% · Competition {m.competition}%
                  </span>
                </div>
                <div className="flex h-2.5 gap-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${m.demand}%` }}
                    role="img"
                    aria-label={`${categoryName(m.category)} demand ${m.demand} percent`}
                  />
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${m.competition}%` }}
                    role="img"
                    aria-label={`${categoryName(m.category)} competition ${m.competition} percent`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </ChartCard>
      </section>

      {/* Finance snapshot */}
      <section aria-label="Finance snapshot" data-ocid="finance_section">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Finance Snapshot
          </h2>
          <Button asChild variant="ghost" size="sm" data-ocid="finance_link">
            <Link to="/finance">
              Details
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MetricCard
            label="Monthly Profit"
            value={formatINR(DEMO_FINANCE.monthlyProfit)}
            icon={<Wallet className="size-4" />}
            trend={DEMO_FINANCE.profitMargin}
            hint="Profit margin"
          />
          <MetricCard
            label="Break-even"
            value={`${DEMO_FINANCE.breakEvenMonths} mo`}
            icon={<CalendarClock className="size-4" />}
            hint="To recover capital"
          />
          <MetricCard
            label="Cash Reserve"
            value={formatINR(DEMO_FINANCE.cashReserve)}
            icon={<PiggyBank className="size-4" />}
            hint="Available buffer"
          />
          <MetricCard
            label="Loan Requirement"
            value={formatINR(DEMO_FINANCE.loanRequirement)}
            icon={<Banknote className="size-4" />}
            hint="Estimated need"
          />
          <MetricCard
            label="Repayment Capacity"
            value={formatINR(DEMO_FINANCE.repaymentCapacity)}
            icon={<BadgePercent className="size-4" />}
            hint="Per month"
          />
          <MetricCard
            label="Monthly Revenue"
            value={formatINR(DEMO_FINANCE.monthlyRevenue)}
            icon={<TrendingUp className="size-4" />}
            hint="Expected sales"
          />
        </div>
      </section>

      {/* Next recommended step */}
      <Card
        className="bg-gradient-primary text-primary-foreground"
        data-ocid="next_step_card"
      >
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Lightbulb className="size-5" />
            </span>
            <div>
              <h2 className="font-display text-lg font-bold tracking-tight">
                Next Recommended Step
              </h2>
              <p className="mt-1 text-sm text-primary-foreground/90">
                Run a fresh viability analysis to get an updated score and
                discover schemes matched to your profile.
              </p>
            </div>
          </div>
          <Button
            asChild
            variant="secondary"
            className="shrink-0"
            data-ocid="next_step_button"
          >
            <Link to="/new">
              Start analysis
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent analyses */}
      <section aria-label="Recent analyses" data-ocid="recent_analyses_section">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Recent Analyses
          </h2>
          <Button asChild variant="ghost" size="sm" data-ocid="analyses_link">
            <Link to="/analyses">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        {DEMO_ANALYSES.length === 0 ? (
          <EmptyState
            title="No analyses yet"
            description="Run your first viability analysis to see recommendations here."
            icon={<FolderOpen className="size-6" />}
            actionLabel="New analysis"
            onAction={() => undefined}
          />
        ) : (
          <ul className="space-y-3" data-ocid="recent_analyses_list">
            {DEMO_ANALYSES.map((analysis: Analysis) => (
              <li key={analysis.id}>
                <Card className="p-4 transition-smooth hover:shadow-elevated">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-sm font-semibold tracking-tight">
                        {analysis.title}
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {categoryName(analysis.category)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="font-display text-lg font-bold text-primary">
                        {analysis.score}
                      </span>
                      <RiskBadge risk={analysis.risk} />
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Saved reports */}
      <section aria-label="Saved reports" data-ocid="saved_reports_section">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Saved Reports
          </h2>
          <Button asChild variant="ghost" size="sm" data-ocid="reports_link">
            <Link to="/reports">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        {DEMO_REPORTS.length === 0 ? (
          <EmptyState
            title="No saved reports"
            description="Reports you generate will appear here for quick access."
            icon={<FileText className="size-6" />}
          />
        ) : (
          <ul className="space-y-3" data-ocid="saved_reports_list">
            {DEMO_REPORTS.map((report: Report) => (
              <li key={report.id}>
                <ReportCard
                  report={report}
                  onOpen={handleOpenReport}
                  onDownload={handleDownloadReport}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
