import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { AnalysisProgress } from "@/components/ui/AnalysisProgress";
import { EstimateBadge } from "@/components/ui/EstimateBadge";
import { InputField } from "@/components/ui/InputField";
import { MapCard } from "@/components/ui/MapCard";
import { RiskChip } from "@/components/ui/RiskChip";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { useToast } from "@/components/ui/Toast";
import { ANALYSIS_STAGES, useAnalysisStore } from "@/lib/analysis-store";
import { useAnalysisApi } from "@/lib/api-client";
import {
  BUSINESS_CATEGORIES,
  DEMO_BADGE,
  categoryName,
  formatINR,
} from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import type {
  AnalysisInput,
  BusinessCategoryId,
  Confidence,
  Estimate,
  HyperLocalAnalysis,
  Provenance,
  Radius,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  IndianRupee,
  Loader2,
  MapPin,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

interface FormState {
  village: string;
  block: string;
  district: string;
  state: string;
  category: BusinessCategoryId | "";
  capital: string;
}

interface FormErrors {
  village?: string;
  block?: string;
  district?: string;
  state?: string;
  category?: string;
  capital?: string;
}

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

function toInput(form: FormState): AnalysisInput {
  return {
    village: form.village.trim(),
    block: form.block.trim(),
    district: form.district.trim(),
    state: form.state.trim(),
    category: form.category as string,
    capital: toNumber(form.capital),
  };
}

function locationLabel(input: AnalysisInput): string {
  return `${input.village}, ${input.block} · ${input.district}, ${input.state}`;
}

function SectionCard({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("p-6", className)}>
      <CardHeader className="p-0">
        <CardTitle>{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent className="mt-5 p-0">{children}</CardContent>
    </Card>
  );
}

function EstimateRow({
  label,
  estimate,
  format = (v: number) => formatINR(v),
}: {
  label: string;
  estimate: Estimate;
  format?: (value: number) => string;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-border bg-muted/20 p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        {format(estimate.value)}
      </span>
      <EstimateBadge estimate={estimate} />
    </div>
  );
}

function ListBlock({
  title,
  items,
  provenance = "Estimated",
  confidence = "Medium",
}: {
  title: string;
  items: string[];
  provenance?: Provenance;
  confidence?: Confidence;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h4 className="text-sm font-semibold text-foreground">{title}</h4>
        <EstimateBadge estimate={{ value: 0, provenance, confidence }} />
      </div>
      <ul className="mt-2 space-y-1.5">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-foreground/90"
            data-ocid={`list_item.${index + 1}`}
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MarketReachSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  const market = analysis.result.market;
  return (
    <SectionCard
      title="Market reach"
      description="Estimated reach, customer base, and how you can reach buyers."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <EstimateRow
          label="Estimated market reach"
          estimate={market.estimatedReach}
          format={(v) => `${v.toLocaleString("en-IN")} people`}
        />
        <EstimateRow
          label="Potential customer base"
          estimate={market.potentialCustomerBase}
          format={(v) => `${v.toLocaleString("en-IN")} households`}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <ListBlock title="Nearby markets" items={market.nearbyMarkets} />
        <ListBlock
          title="Distribution channels"
          items={market.distributionChannels}
        />
      </div>

      <div className="mt-5 rounded-xl border border-border bg-muted/20 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-sm font-semibold text-foreground">
            Accessibility
          </h4>
          <EstimateBadge
            estimate={{
              value: 0,
              provenance: "Estimated",
              confidence: "Medium",
            }}
          />
        </div>
        <p className="mt-1 text-sm text-foreground/90">
          {market.accessibility}
        </p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <ListBlock
          title="Underserved opportunities"
          items={market.underservedOpportunities}
        />
        <div className="space-y-5">
          <ListBlock
            title="Demand indicators"
            items={market.demandIndicators}
          />
          <ListBlock
            title="Supply indicators"
            items={market.supplyIndicators}
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">
          Competition level
        </span>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
            market.competitionLevel === "High"
              ? "risk-high"
              : market.competitionLevel === "Moderate"
                ? "risk-medium"
                : "risk-low",
          )}
        >
          {market.competitionLevel}
        </span>
        <EstimateBadge
          estimate={{ value: 0, provenance: "Observed", confidence: "Medium" }}
        />
      </div>
    </SectionCard>
  );
}

function PricingSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  const pricing = analysis.result.pricing;
  return (
    <SectionCard
      title="Pricing & costs"
      description="Competitor price range and your estimated cost structure."
    >
      <div className="rounded-xl border border-border bg-muted/20 p-4">
        <h4 className="text-sm font-semibold text-foreground">
          Competitor price range
        </h4>
        <div className="mt-2 flex flex-wrap items-baseline gap-3">
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            {formatINR(pricing.competitorPriceRange.min)}
          </span>
          <span className="text-muted-foreground">to</span>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            {formatINR(pricing.competitorPriceRange.max)}
          </span>
          <span className="text-xs text-muted-foreground">
            avg {formatINR(pricing.competitorPriceRange.avg)}
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <EstimateRow
          label="Production cost"
          estimate={pricing.productionCost}
        />
        <EstimateRow label="Transport cost" estimate={pricing.transportCost} />
        <EstimateRow label="Packaging cost" estimate={pricing.packagingCost} />
        <EstimateRow label="Operating cost" estimate={pricing.operatingCost} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-muted/20 p-3">
          <span className="text-xs text-muted-foreground">
            Recommended price range
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              {formatINR(pricing.recommendedPriceRange.min)}
            </span>
            <span className="text-muted-foreground">to</span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              {formatINR(pricing.recommendedPriceRange.max)}
            </span>
          </div>
        </div>
        <EstimateRow
          label="Estimated margin"
          estimate={pricing.estimatedMargin}
        />
      </div>
    </SectionCard>
  );
}

function SwotSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  const swot = analysis.result.swot;
  const quadrants = [
    { title: "Strengths", items: swot.strengths, tone: "text-success" },
    { title: "Weaknesses", items: swot.weaknesses, tone: "text-destructive" },
    {
      title: "Opportunities",
      items: swot.opportunities,
      tone: "text-primary",
    },
    { title: "Threats", items: swot.threats, tone: "text-warning" },
  ];
  return (
    <SectionCard
      title="SWOT"
      description="Strengths, weaknesses, opportunities, and threats for this business."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {quadrants.map((q) => (
          <div
            key={q.title}
            className="rounded-xl border border-border bg-muted/20 p-4"
          >
            <h4 className={cn("text-sm font-semibold", q.tone)}>{q.title}</h4>
            <ul className="mt-2 space-y-1.5">
              {q.items.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-foreground/90"
                  data-ocid={`swot_item.${index + 1}`}
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function RiskSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  return (
    <SectionCard
      title="Risk assessment"
      description="Six risk categories with a level, WHY, and WHAT TO DO."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {analysis.result.risk.categories.map((category) => (
          <RiskChip key={category.category} category={category} />
        ))}
      </div>
    </SectionCard>
  );
}

export default function NewAnalysisPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const profile = useOnboardingStore((s) => s.profile);
  const { runAnalysis, backendAvailable } = useAnalysisApi();

  const input = useAnalysisStore((s) => s.input);
  const radius = useAnalysisStore((s) => s.radius);
  const running = useAnalysisStore((s) => s.running);
  const stage = useAnalysisStore((s) => s.stage);
  const current = useAnalysisStore((s) => s.current);
  const source = useAnalysisStore((s) => s.source);
  const setRadius = useAnalysisStore((s) => s.setRadius);
  const setInput = useAnalysisStore((s) => s.setInput);
  const start = useAnalysisStore((s) => s.start);
  const advanceStage = useAnalysisStore((s) => s.advanceStage);
  const complete = useAnalysisStore((s) => s.complete);
  const reset = useAnalysisStore((s) => s.reset);

  const [form, setForm] = useState<FormState>(() => ({
    village: profile?.village ?? "",
    block: profile?.block ?? "",
    district: profile?.district ?? "",
    state: profile?.state ?? "",
    category: profile?.businessCategory ?? "",
    capital: profile?.expectedInvestment
      ? String(profile.expectedInvestment)
      : "",
  }));
  const [errors, setErrors] = useState<FormErrors>({});

  const phase: "form" | "analyzing" | "result" = running
    ? "analyzing"
    : current
      ? "result"
      : "form";

  // Drive the animated progress sequence, then run the analysis.
  useEffect(() => {
    if (!running) return;
    if (stage < ANALYSIS_STAGES.length) {
      const timer = window.setTimeout(() => advanceStage(), 520);
      return () => window.clearTimeout(timer);
    }
    if (!input) return;
    let cancelled = false;
    void runAnalysis(input, radius).then((result) => {
      if (cancelled) return;
      complete(result.analysis, result.source);
      toast({
        title: "Analysis complete",
        description:
          result.source === "demo"
            ? "Showing clearly-labelled DEMO DATA"
            : "Hyper-local analysis ready",
        variant: "success",
      });
    });
    return () => {
      cancelled = true;
    };
  }, [
    running,
    stage,
    input,
    radius,
    advanceStage,
    complete,
    runAnalysis,
    toast,
  ]);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!values.village.trim()) next.village = "Enter your village";
    if (!values.block.trim()) next.block = "Enter your block";
    if (!values.district.trim()) next.district = "Enter your district";
    if (!values.state.trim()) next.state = "Enter your state";
    if (!values.category) next.category = "Select a business category";
    if (!values.capital || toNumber(values.capital) <= 0)
      next.capital = "Enter a positive capital amount";
    return next;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(form);
    if (
      Object.keys(nextErrors).some((k) => nextErrors[k as keyof FormErrors])
    ) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setInput(toInput(form));
    start();
  };

  const handleRadiusChange = (nextRadius: Radius) => {
    setRadius(nextRadius);
    if (phase === "result" && input) {
      // Re-run the analysis so the map and competitor set update.
      start();
    }
  };

  const handleStartAnother = () => {
    reset();
    setForm({
      village: profile?.village ?? "",
      block: profile?.block ?? "",
      district: profile?.district ?? "",
      state: profile?.state ?? "",
      category: profile?.businessCategory ?? "",
      capital: profile?.expectedInvestment
        ? String(profile.expectedInvestment)
        : "",
    });
    setErrors({});
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          New Analysis
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Run a hyper-local market analysis for your village, block, district,
          and state. UdyamAI estimates reach, demand, competition, pricing, and
          risk at a 5 km or 10 km radius.
        </p>
      </header>

      {phase === "form" ? (
        <form onSubmit={handleSubmit} noValidate>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Your location & business</CardTitle>
              <CardDescription>
                Tell us where you are and what you plan to build. We prefill
                from your profile where available.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField
                  id="village"
                  label="Village"
                  placeholder="Rampur"
                  value={form.village}
                  onChange={(e) => setField("village", e.target.value)}
                  error={errors.village}
                  icon={<MapPin className="size-4" />}
                  data-ocid="village_input"
                />
                <InputField
                  id="block"
                  label="Block"
                  placeholder="Khairagarh"
                  value={form.block}
                  onChange={(e) => setField("block", e.target.value)}
                  error={errors.block}
                  icon={<MapPin className="size-4" />}
                  data-ocid="block_input"
                />
                <InputField
                  id="district"
                  label="District"
                  placeholder="Rajpur"
                  value={form.district}
                  onChange={(e) => setField("district", e.target.value)}
                  error={errors.district}
                  icon={<MapPin className="size-4" />}
                  data-ocid="district_input"
                />
                <InputField
                  id="state"
                  label="State"
                  placeholder="Madhya Pradesh"
                  value={form.state}
                  onChange={(e) => setField("state", e.target.value)}
                  error={errors.state}
                  icon={<MapPin className="size-4" />}
                  data-ocid="state_input"
                />
              </div>

              <fieldset>
                <legend className="mb-3 text-sm font-medium text-foreground">
                  Business category
                </legend>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {BUSINESS_CATEGORIES.map((cat) => {
                    const selected = form.category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setField("category", cat.id)}
                        aria-pressed={selected}
                        className={cn(
                          "flex min-w-0 flex-col items-start gap-1 rounded-xl border p-3 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                          selected
                            ? "border-primary bg-primary/10 ring-1 ring-primary"
                            : "border-border bg-background hover:bg-accent",
                        )}
                        data-ocid="category_option"
                      >
                        <span className="text-lg" aria-hidden="true">
                          {cat.icon}
                        </span>
                        <span className="text-xs font-medium leading-tight text-foreground">
                          {cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
                {errors.category ? (
                  <p
                    className="mt-2 text-xs font-medium text-destructive"
                    data-ocid="input_error"
                  >
                    {errors.category}
                  </p>
                ) : null}
              </fieldset>

              <InputField
                id="capital"
                label="Capital you plan to invest"
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="250000"
                value={form.capital}
                onChange={(e) => setField("capital", e.target.value)}
                error={errors.capital}
                hint="Total capital you plan to invest"
                icon={<IndianRupee className="size-4" />}
                data-ocid="capital_input"
              />

              <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Analysis radius
                  </p>
                  <p className="text-xs text-muted-foreground">
                    How far around your village to scan for market and
                    competitors.
                  </p>
                </div>
                <fieldset
                  className="flex items-center rounded-full border border-border bg-background p-0.5"
                  aria-label="Analysis radius"
                  data-ocid="radius_toggle"
                >
                  {(["5km", "10km"] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRadius(r)}
                      aria-pressed={radius === r}
                      className={cn(
                        "rounded-full px-4 py-1.5 text-sm font-semibold transition-smooth",
                        radius === r
                          ? "bg-gradient-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      data-ocid={`radius_toggle.${r}`}
                    >
                      {r}
                    </button>
                  ))}
                </fieldset>
              </div>
            </CardContent>
            <div className="flex flex-col gap-3 p-6 pt-0 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">
                {backendAvailable
                  ? "Connected to backend"
                  : "Backend unavailable — results will be clearly-labelled DEMO DATA"}
              </p>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                data-ocid="start_analysis_button"
              >
                <Sparkles className="size-4" />
                Start analysis
              </Button>
            </div>
          </Card>
        </form>
      ) : null}

      {phase === "analyzing" ? (
        <Card data-ocid="loading_state">
          <CardContent className="flex flex-col items-center gap-6 py-12 text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Loader2 className="size-8 animate-spin" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Analysing your market…
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {ANALYSIS_STAGES[Math.min(stage, ANALYSIS_STAGES.length - 1)]}
              </p>
            </div>
            <AnalysisProgress stage={stage} className="w-full max-w-2xl" />
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              data-ocid="cancel_analysis_button"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {phase === "result" && current ? (
        <div className="space-y-6">
          <Card data-ocid="success_state">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                {source === "demo" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
                    <Sparkles className="size-3.5" />
                    {DEMO_BADGE}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-success">
                    Live data
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {current.radius} radius
                </span>
              </div>
              <CardTitle className="mt-3">
                {categoryName(current.input.category as BusinessCategoryId)}{" "}
                Market Analysis
              </CardTitle>
              <CardDescription>
                {locationLabel(current.input)} · Capital{" "}
                {formatINR(current.input.capital)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ScoreCard
                  score={current.result.scores.demand.score}
                  label="Demand"
                  explanation={current.result.scores.demand.explanation}
                  reasoning={current.result.scores.demand.reasoning}
                  provenance={current.result.scores.demand.provenance}
                  confidence={current.result.scores.demand.confidence}
                  size="sm"
                />
                <ScoreCard
                  score={current.result.scores.supplyGap.score}
                  label="Supply Gap"
                  explanation={current.result.scores.supplyGap.explanation}
                  reasoning={current.result.scores.supplyGap.reasoning}
                  provenance={current.result.scores.supplyGap.provenance}
                  confidence={current.result.scores.supplyGap.confidence}
                  size="sm"
                />
                <ScoreCard
                  score={current.result.scores.competition.score}
                  label="Competition"
                  explanation={current.result.scores.competition.explanation}
                  reasoning={current.result.scores.competition.reasoning}
                  provenance={current.result.scores.competition.provenance}
                  confidence={current.result.scores.competition.confidence}
                  size="sm"
                />
                <ScoreCard
                  score={current.result.scores.opportunity.score}
                  label="Opportunity"
                  explanation={current.result.scores.opportunity.explanation}
                  reasoning={current.result.scores.opportunity.reasoning}
                  provenance={current.result.scores.opportunity.provenance}
                  confidence={current.result.scores.opportunity.confidence}
                  size="sm"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => navigate({ to: "/assistant" })}
                  data-ocid="ask_assistant_button"
                >
                  <Sparkles className="size-4" />
                  Ask UdyamAI about this
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleStartAnother}
                  data-ocid="start_another_button"
                >
                  <ArrowRight className="size-4" />
                  Start another analysis
                </Button>
              </div>
            </CardContent>
          </Card>

          <MapCard
            title="Competitor map"
            location={locationLabel(current.input)}
            mapData={current.result.map}
            radius={radius}
            onRadiusChange={handleRadiusChange}
          />

          <MarketReachSection analysis={current} />
          <PricingSection analysis={current} />
          <SwotSection analysis={current} />
          <RiskSection analysis={current} />

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-muted/20 p-6 text-center">
            <TrendingUp className="size-6 text-primary" />
            <p className="max-w-xl text-sm text-muted-foreground">
              {source === "demo"
                ? "This report uses clearly-labelled DEMO DATA for illustration. Real-world data is never faked — connect the backend for live market intelligence."
                : "This report uses live data from the backend."}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
