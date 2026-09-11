import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { EstimateBadge } from "@/components/ui/EstimateBadge";
import { MapCard } from "@/components/ui/MapCard";
import { RiskChip } from "@/components/ui/RiskChip";
import { ScoreCard } from "@/components/ui/ScoreCard";
import { generateDemoAnalysis } from "@/lib/analysis-engine";
import { useAnalysisStore } from "@/lib/analysis-store";
import { DEMO_BADGE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import type {
  AnalysisInput,
  Estimate,
  HyperLocalAnalysis,
  OnboardingProfile,
  Radius,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Boxes,
  Gauge,
  MapPin,
  Package,
  RefreshCw,
  Route,
  Sparkles,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { useState } from "react";

function buildInput(profile: OnboardingProfile | null): AnalysisInput {
  return {
    village: profile?.village ?? "Rampur",
    block: profile?.block ?? "Khairagarh",
    district: profile?.district ?? "Rajpur",
    state: profile?.state ?? "Madhya Pradesh",
    category: profile?.businessCategory ?? "dairy",
    capital: profile?.marginCapital ?? 100000,
  };
}

function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatPeople(value: number): string {
  return `${value.toLocaleString("en-IN")} people`;
}

/* ------------------------------------------------------------------ */
/* Market reach                                                         */
/* ------------------------------------------------------------------ */

function ReachStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p className="mt-1.5 font-display text-xl font-bold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}

function ListBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </h4>
      <ul className="mt-2 space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-foreground/90"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MarketReachSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  const { market } = analysis.result;
  return (
    <Card data-ocid="market_reach_section">
      <CardHeader>
        <CardTitle>Market reach</CardTitle>
        <CardDescription>
          Estimated reach and customer base within the selected radius.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ReachStat
            label="Estimated reach"
            value={formatPeople(market.estimatedReach.value)}
            icon={<Route className="size-4" />}
          />
          <ReachStat
            label="Potential customers"
            value={market.potentialCustomerBase.value.toLocaleString("en-IN")}
            icon={<Users className="size-4" />}
          />
          <ReachStat
            label="Competition level"
            value={market.competitionLevel}
            icon={<Gauge className="size-4" />}
          />
          <ReachStat
            label="Accessibility"
            value={market.accessibility}
            icon={<MapPin className="size-4" />}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <EstimateBadge estimate={market.estimatedReach} />
          <EstimateBadge estimate={market.potentialCustomerBase} />
        </div>

        <p className="text-sm leading-relaxed text-foreground/90">
          {market.accessibility}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ListBlock title="Nearby markets" items={market.nearbyMarkets} />
          <ListBlock
            title="Distribution channels"
            items={market.distributionChannels}
          />
          <ListBlock
            title="Underserved opportunities"
            items={market.underservedOpportunities}
          />
          <ListBlock
            title="Demand indicators"
            items={market.demandIndicators}
          />
          <ListBlock
            title="Supply indicators"
            items={market.supplyIndicators}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Pricing                                                              */
/* ------------------------------------------------------------------ */

function PricingRow({
  label,
  value,
  estimate,
  icon,
}: {
  label: string;
  value: string;
  estimate?: Estimate;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {estimate ? (
            <div className="mt-1">
              <EstimateBadge estimate={estimate} />
            </div>
          ) : null}
        </div>
      </div>
      <p className="shrink-0 font-display text-base font-bold tracking-tight text-foreground">
        {value}
      </p>
    </div>
  );
}

function PricingSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  const { pricing } = analysis.result;
  return (
    <Card data-ocid="pricing_section">
      <CardHeader>
        <CardTitle>Pricing &amp; costs</CardTitle>
        <CardDescription>
          Competitor price range and estimated cost structure for your business.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">Competitor min</p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              {formatINR(pricing.competitorPriceRange.min)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">Competitor avg</p>
            <p className="mt-1 font-display text-xl font-bold text-primary">
              {formatINR(pricing.competitorPriceRange.avg)}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">Competitor max</p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              {formatINR(pricing.competitorPriceRange.max)}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <EstimateBadge
            estimate={{
              value: 0,
              provenance: "Observed",
              confidence: "Medium",
            }}
          />
        </div>

        <div className="space-y-3">
          <PricingRow
            label="Production / service cost"
            value={formatINR(pricing.productionCost.value)}
            estimate={pricing.productionCost}
            icon={<Boxes className="size-4" />}
          />
          <PricingRow
            label="Transport cost"
            value={formatINR(pricing.transportCost.value)}
            estimate={pricing.transportCost}
            icon={<Truck className="size-4" />}
          />
          <PricingRow
            label="Packaging cost"
            value={formatINR(pricing.packagingCost.value)}
            estimate={pricing.packagingCost}
            icon={<Package className="size-4" />}
          />
          <PricingRow
            label="Operating cost"
            value={formatINR(pricing.operatingCost.value)}
            estimate={pricing.operatingCost}
            icon={<Wallet className="size-4" />}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-primary/30 bg-primary/10 p-4">
            <p className="text-xs font-medium text-primary">
              Recommended price range
            </p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              {formatINR(pricing.recommendedPriceRange.min)} –{" "}
              {formatINR(pricing.recommendedPriceRange.max)}
            </p>
          </div>
          <div className="rounded-xl border border-success/30 bg-success/10 p-4">
            <p className="text-xs font-medium text-success">Estimated margin</p>
            <p className="mt-1 font-display text-xl font-bold text-foreground">
              {formatINR(pricing.estimatedMargin.value)}
            </p>
            <div className="mt-2">
              <EstimateBadge estimate={pricing.estimatedMargin} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* SWOT                                                                 */
/* ------------------------------------------------------------------ */

function SwotQuadrant({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-4">
      <h4 className={cn("font-display text-sm font-bold tracking-tight", tone)}>
        {title}
      </h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm leading-relaxed text-foreground/90"
          >
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-current opacity-60" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function SwotSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  const { swot } = analysis.result;
  return (
    <Card data-ocid="swot_section">
      <CardHeader>
        <CardTitle>SWOT analysis</CardTitle>
        <CardDescription>
          Strengths, weaknesses, opportunities, and threats for your business in
          this market.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <SwotQuadrant
          title="Strengths"
          items={swot.strengths}
          tone="text-success"
        />
        <SwotQuadrant
          title="Weaknesses"
          items={swot.weaknesses}
          tone="text-warning"
        />
        <SwotQuadrant
          title="Opportunities"
          items={swot.opportunities}
          tone="text-primary"
        />
        <SwotQuadrant
          title="Threats"
          items={swot.threats}
          tone="text-destructive"
        />
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Risk engine                                                          */
/* ------------------------------------------------------------------ */

function RiskSection({ analysis }: { analysis: HyperLocalAnalysis }) {
  const { risk } = analysis.result;
  return (
    <Card data-ocid="risk_section">
      <CardHeader>
        <CardTitle>Risk engine</CardTitle>
        <CardDescription>
          Six risk categories scored Low / Medium / High with a WHY and WHAT TO
          DO for each.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {risk.categories.map((category) => (
          <RiskChip key={category.category} category={category} />
        ))}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

export default function MarketPage() {
  const storeCurrent = useAnalysisStore((s) => s.current);
  const storeRadius = useAnalysisStore((s) => s.radius);
  const setStoreRadius = useAnalysisStore((s) => s.setRadius);
  const profile = useOnboardingStore((s) => s.profile);

  const [analysis, setAnalysis] = useState<HyperLocalAnalysis>(
    () =>
      storeCurrent ?? generateDemoAnalysis(buildInput(profile), storeRadius),
  );

  const handleRadiusChange = (radius: Radius) => {
    setStoreRadius(radius);
    setAnalysis((prev) => ({
      ...generateDemoAnalysis(prev.input, radius),
      id: prev.id,
      createdAt: prev.createdAt,
    }));
  };

  const { result } = analysis;
  const { scores, map } = result;
  const location = `${analysis.input.village}, ${analysis.input.block} · ${analysis.input.district}, ${analysis.input.state}`;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
              <Sparkles className="size-3.5" />
              {DEMO_BADGE}
            </span>
          </div>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Market Intelligence
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Hyper-local analysis for your business near {location}.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          data-ocid="market_refresh_button"
        >
          <RefreshCw className="size-4" />
          Refresh
        </Button>
      </header>

      {/* Score cards */}
      <section
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Market score cards"
        data-ocid="score_cards"
      >
        <ScoreCard
          score={scores.demand.score}
          label="Demand"
          explanation={scores.demand.explanation}
          reasoning={scores.demand.reasoning}
          provenance={scores.demand.provenance}
          confidence={scores.demand.confidence}
        />
        <ScoreCard
          score={scores.supplyGap.score}
          label="Supply Gap"
          explanation={scores.supplyGap.explanation}
          reasoning={scores.supplyGap.reasoning}
          provenance={scores.supplyGap.provenance}
          confidence={scores.supplyGap.confidence}
        />
        <ScoreCard
          score={scores.competition.score}
          label="Competition"
          explanation={scores.competition.explanation}
          reasoning={scores.competition.reasoning}
          provenance={scores.competition.provenance}
          confidence={scores.competition.confidence}
        />
        <ScoreCard
          score={scores.opportunity.score}
          label="Opportunity"
          explanation={scores.opportunity.explanation}
          reasoning={scores.opportunity.reasoning}
          provenance={scores.opportunity.provenance}
          confidence={scores.opportunity.confidence}
        />
      </section>

      {/* Map */}
      <section aria-label="Competitor map" data-ocid="map_section">
        <MapCard
          title="Competitor map"
          location={location}
          mapData={map}
          radius={analysis.radius}
          onRadiusChange={handleRadiusChange}
          businessKeyword={analysis.input.category}
        />
      </section>

      {/* Market reach */}
      <MarketReachSection analysis={analysis} />

      {/* Pricing */}
      <PricingSection analysis={analysis} />

      {/* SWOT */}
      <SwotSection analysis={analysis} />

      {/* Risk */}
      <RiskSection analysis={analysis} />
    </div>
  );
}
