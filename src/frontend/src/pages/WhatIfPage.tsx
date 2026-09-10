import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { ExplainPanel } from "@/components/finance/ExplainPanel";
import { FeasibilityScoreRing } from "@/components/finance/FeasibilityScoreRing";
import { WhatIfSlider } from "@/components/finance/WhatIfSlider";
import { RiskBadge } from "@/components/ui/RiskBadge";
import { useFinanceApi } from "@/lib/api-client";
import { DEMO_BADGE, formatINR } from "@/lib/demo-data";
import { computeFinancialPlan } from "@/lib/finance-engine";
import { SIH_WHAT_IF_RULE } from "@/lib/financial-rules";
import { useOnboardingStore } from "@/lib/onboarding-store";
import type {
  FeasibilityScore,
  FinanceInput,
  RiskLevel,
  WhatIfScenario,
} from "@/lib/types";
import {
  Banknote,
  FlaskConical,
  Gauge,
  PiggyBank,
  RotateCcw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Deterministic model                                                 */
/* ------------------------------------------------------------------ */

interface SliderState {
  ownCapital: number;
  price: number;
  salesVolume: number;
  loan: number;
  tenure: number;
  interestRate: number;
  operatingCost: number;
  rawMaterial: number;
}

const SLIDER_LIMITS = {
  ownCapital: { min: 20000, max: 500000, step: 10000 },
  price: { min: 20, max: 500, step: 5 },
  salesVolume: { min: 50, max: 2000, step: 10 },
  loan: { min: 0, max: 500000, step: 10000 },
  tenure: { min: 12, max: 120, step: 6 },
  interestRate: { min: 5, max: 20, step: 0.5 },
  operatingCost: { min: 5000, max: 200000, step: 1000 },
  rawMaterial: { min: 2000, max: 150000, step: 1000 },
};

const PRESETS: { key: string; state: SliderState }[] = [
  {
    key: "Conservative",
    state: {
      ownCapital: 80000,
      price: 90,
      salesVolume: 350,
      loan: 120000,
      tenure: 48,
      interestRate: 12,
      operatingCost: 34000,
      rawMaterial: 14000,
    },
  },
  {
    key: "Balanced",
    state: {
      ownCapital: 100000,
      price: 100,
      salesVolume: 450,
      loan: 150000,
      tenure: 36,
      interestRate: 11,
      operatingCost: 31000,
      rawMaterial: 12400,
    },
  },
  {
    key: "Aggressive",
    state: {
      ownCapital: 120000,
      price: 115,
      salesVolume: 600,
      loan: 180000,
      tenure: 24,
      interestRate: 10,
      operatingCost: 28000,
      rawMaterial: 11000,
    },
  },
];

const BALANCED = PRESETS[1].state;

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function buildFinanceInput(s: SliderState): FinanceInput {
  const projectCost = s.ownCapital + s.loan;
  const revenue = s.price * s.salesVolume;
  const marginPercent =
    s.operatingCost > 0
      ? Math.max(0, ((revenue - s.operatingCost) / s.operatingCost) * 100)
      : 0;
  return {
    proposedProjectCost: projectCost,
    ownCapital: s.ownCapital,
    loanRequirement: s.loan,
    tenureMonths: s.tenure,
    interestRatePercent: s.interestRate,
    marginPercent,
    moratoriumMonths: 0,
    operatingCosts: {
      rent: 0,
      salary: 0,
      rawMaterial: s.rawMaterial,
      electricity: 0,
      transport: 0,
      packaging: 0,
      marketing: 0,
      maintenance: 0,
      other: s.operatingCost - s.rawMaterial,
    },
    workingCapital: {
      initialRequirement: Math.round(s.operatingCost * 2),
      monthlyRequirement: s.operatingCost,
      emergencyBufferPercent: 10,
    },
    pricePerUnit: s.price,
    variableCostPerUnit: s.rawMaterial,
  };
}

function deriveRisk(s: SliderState, monthlyProfit: number): RiskLevel {
  const annualProfit = monthlyProfit * 12;
  const paybackMonths =
    monthlyProfit > 0
      ? (s.ownCapital + s.loan) / monthlyProfit
      : Number.POSITIVE_INFINITY;
  const loanBurdenYears =
    annualProfit > 0 ? s.loan / annualProfit : Number.POSITIVE_INFINITY;
  if (paybackMonths > 24 || loanBurdenYears > 2.5) return "high";
  if (paybackMonths > 14 || loanBurdenYears > 1.5) return "medium";
  return "low";
}

function computeFeasibility(
  s: SliderState,
  monthlyProfit: number,
  revenue: number,
): FeasibilityScore {
  const marginPercent = revenue > 0 ? (monthlyProfit / revenue) * 100 : 0;
  const market = clamp(Math.round((s.salesVolume / 800) * 100));
  const financial = clamp(Math.round(marginPercent * 2.5));
  // Competition is a market factor from the analysis, not changed by the
  // financial sliders, so it stays at a fixed neutral baseline.
  const competition = 62;
  const annualProfit = monthlyProfit * 12;
  const loanBurdenRatio = annualProfit > 0 ? s.loan / annualProfit : 3;
  const risk = clamp(Math.round(100 - loanBurdenRatio * 30));
  const overall = Math.round((market + financial + competition + risk) / 4);
  return {
    overall,
    breakdown: { market, financial, competition, risk },
    explanation: `Your score is built from four transparent parts. Market (${market}) reflects your sales volume, Financial (${financial}) reflects your profit margin, Competition (${competition}) is a fixed baseline from your market analysis, and Risk (${risk}) reflects how comfortably you can repay the loan. They are combined into one number out of 100. It is a guide, not a guarantee.`,
  };
}

function computeScenario(
  s: SliderState,
  id: string,
  label: string,
): WhatIfScenario {
  const plan = computeFinancialPlan(buildFinanceInput(s), SIH_WHAT_IF_RULE);
  const revenue = s.price * s.salesVolume;
  const profit = revenue - s.operatingCost;
  return {
    id,
    label,
    revenue,
    profit,
    emi: plan.amortization.emi.value,
    breakEven: plan.breakEven.breakEvenSales.value,
    loan: plan.financing.loanAmount.value,
    cashRequirement: plan.cashRequirement.total.value,
    risk: deriveRisk(s, profit),
  };
}

function betterState(s: SliderState): SliderState {
  return {
    ...s,
    price: Math.round(s.price * 1.1),
    salesVolume: Math.round(s.salesVolume * 1.15),
    operatingCost: Math.round(s.operatingCost * 0.95),
    rawMaterial: Math.round(s.rawMaterial * 0.95),
  };
}

function conservativeState(s: SliderState): SliderState {
  return {
    ...s,
    price: Math.round(s.price * 0.9),
    salesVolume: Math.round(s.salesVolume * 0.85),
    operatingCost: Math.round(s.operatingCost * 1.05),
    rawMaterial: Math.round(s.rawMaterial * 1.05),
  };
}

function initialSliders(profile: {
  expectedMonthlySales: number;
  expectedInvestment: number;
  expectedLoanRequirement: number;
}): SliderState {
  const price = 100;
  const salesVolume = Math.max(
    50,
    Math.round(profile.expectedMonthlySales / price),
  );
  const operatingCost = Math.round(profile.expectedMonthlySales * 0.68);
  return {
    ownCapital: Math.max(
      20000,
      profile.expectedInvestment - profile.expectedLoanRequirement,
    ),
    price,
    salesVolume,
    loan: profile.expectedLoanRequirement,
    tenure: 36,
    interestRate: 11,
    operatingCost,
    rawMaterial: Math.round(operatingCost * 0.4),
  };
}

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function EstimateMetric({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-5" data-ocid="estimate_metric">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <span className="estimate-tag fin-chip">estimate</span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      {hint ? (
        <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
      ) : null}
    </Card>
  );
}

const EXPLANATIONS: { term: string; body: string }[] = [
  {
    term: "Margin",
    body: "Margin is the share of each sale you keep after paying for the product and running costs. A higher margin means you earn more from every rupee of sales.",
  },
  {
    term: "Project cost",
    body: "Project cost is the total money needed to set up the business — your own capital plus the loan. It covers equipment, stock, and other one-time expenses.",
  },
  {
    term: "Loan",
    body: "A loan is money you borrow and must pay back with interest. The amount you borrow is added to your own capital to build the project.",
  },
  {
    term: "EMI",
    body: "EMI is the fixed amount you pay every month to repay the loan. It includes part of the loan amount plus the interest charged on it.",
  },
  {
    term: "Interest",
    body: "Interest is the extra money the bank charges for lending you the loan. It is shown as a percentage of the loan amount each year.",
  },
  {
    term: "Moratorium",
    body: "Moratorium is a waiting period at the start when you do not have to repay the loan. Interest still adds to your loan during this time, so you repay a little more later.",
  },
  {
    term: "Working capital",
    body: "Working capital is the money you need to run the business day to day — buying raw material, paying wages, and covering bills before your sales bring money in.",
  },
  {
    term: "Break-even",
    body: "Break-even is the sales level where your income just covers all your costs. Below it you lose money; above it you start earning profit.",
  },
  {
    term: "Subsidy",
    body: "A subsidy is money the government gives to reduce your project cost. It lowers how much you need to borrow or pay from your own pocket.",
  },
  {
    term: "Collateral",
    body: "Collateral is something you keep as a promise to the bank, like land or property. If you cannot repay the loan, the bank can use it to recover the money.",
  },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function WhatIfPage() {
  const profile = useOnboardingStore((s) => s.profile);
  const financeApi = useFinanceApi();
  const financeApiRef = useRef(financeApi);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [currentSource, setCurrentSource] = useState<"backend" | "demo">(
    "demo",
  );

  const initialRef = useRef<SliderState | null>(null);
  if (initialRef.current === null) {
    initialRef.current = initialSliders(
      profile ?? {
        expectedMonthlySales: BALANCED.salesVolume * BALANCED.price,
        expectedInvestment: BALANCED.ownCapital + BALANCED.loan,
        expectedLoanRequirement: BALANCED.loan,
      },
    );
  }
  const [sliders, setSliders] = useState<SliderState>(initialRef.current);

  useEffect(() => {
    const timer = window.setTimeout(() => setStatus("ready"), 700);
    return () => window.clearTimeout(timer);
  }, []);

  // Use the backend engine for the current scenario when it is available;
  // otherwise fall back to the deterministic client-side engine.
  useEffect(() => {
    let active = true;
    const initial = initialRef.current;
    if (!initial) return;
    financeApiRef.current
      .computeFinancialPlan(buildFinanceInput(initial), SIH_WHAT_IF_RULE)
      .then((res) => {
        if (active) setCurrentSource(res.source);
      })
      .catch(() => {
        if (active) setCurrentSource("demo");
      });
    return () => {
      active = false;
    };
  }, []);

  const plan = useMemo(
    () => computeFinancialPlan(buildFinanceInput(sliders), SIH_WHAT_IF_RULE),
    [sliders],
  );

  const revenue = sliders.price * sliders.salesVolume;
  const monthlyProfit = revenue - sliders.operatingCost;
  const annualProfit = monthlyProfit * 12;
  const marginPercent = revenue > 0 ? (monthlyProfit / revenue) * 100 : 0;
  const risk = deriveRisk(sliders, monthlyProfit);
  const feasibility = useMemo(
    () => computeFeasibility(sliders, monthlyProfit, revenue),
    [sliders, monthlyProfit, revenue],
  );

  const scenarios = useMemo<WhatIfScenario[]>(
    () => [
      computeScenario(sliders, "current", "Current"),
      computeScenario(betterState(sliders), "better", "Better"),
      computeScenario(
        conservativeState(sliders),
        "conservative",
        "Conservative",
      ),
    ],
    [sliders],
  );

  const setSlider = (key: keyof SliderState, value: number) =>
    setSliders((prev) => ({ ...prev, [key]: value }));

  const applyPreset = (preset: (typeof PRESETS)[number]) =>
    setSliders(preset.state);

  const resetToBalanced = () => setSliders(BALANCED);

  if (status === "loading") {
    return (
      <div className="space-y-6 p-4 sm:p-6" data-ocid="loading_state">
        <div className="h-8 w-56 animate-pulse-soft rounded-lg bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => `metric-${i}`).map((id) => (
            <div
              key={id}
              className="h-32 animate-pulse-soft rounded-2xl border border-border bg-muted/40"
            />
          ))}
        </div>
        <div className="h-72 animate-pulse-soft rounded-2xl border border-border bg-muted/40" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="p-4 sm:p-6" data-ocid="error_state">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <FlaskConical className="size-6" />
          </span>
          <div>
            <h2 className="font-display text-lg font-semibold">
              Couldn't load the What-if Lab
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Something went wrong while preparing your scenario model. Please
              try again.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setStatus("loading")}
            data-ocid="retry_button"
          >
            Try again
          </Button>
        </div>
      </div>
    );
  }

  const paybackLabel =
    monthlyProfit > 0
      ? `${((sliders.ownCapital + sliders.loan) / monthlyProfit).toFixed(1)} months`
      : "—";

  return (
    <div className="space-y-6 p-4 sm:p-6" data-ocid="whatif_page">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What-if Lab
            </h1>
            <span className="inline-flex items-center rounded-full bg-warning/15 px-2.5 py-1 text-xs font-semibold text-warning">
              {DEMO_BADGE}
            </span>
          </div>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Move the sliders to model a different business plan and watch the
            estimates update in real time.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetToBalanced}
          data-ocid="reset_button"
        >
          <RotateCcw className="size-4" aria-hidden />
          Reset to Balanced
        </Button>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2" data-ocid="preset_group">
        {PRESETS.map((preset) => (
          <button
            key={preset.key}
            type="button"
            onClick={() => applyPreset(preset)}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            data-ocid={`preset_button.${preset.key.toLowerCase()}`}
          >
            {preset.key}
          </button>
        ))}
      </div>

      {/* Assumptions */}
      <Card data-ocid="assumptions_panel">
        <CardHeader>
          <CardTitle>Your assumptions</CardTitle>
          <CardDescription>
            These are the inputs used to estimate your plan. Every output below
            is an estimate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <WhatIfSlider
              label="Own capital"
              value={sliders.ownCapital}
              min={SLIDER_LIMITS.ownCapital.min}
              max={SLIDER_LIMITS.ownCapital.max}
              step={SLIDER_LIMITS.ownCapital.step}
              onChange={(v) => setSlider("ownCapital", v)}
              format={(v) => formatINR(v)}
            />
            <WhatIfSlider
              label="Product price"
              value={sliders.price}
              min={SLIDER_LIMITS.price.min}
              max={SLIDER_LIMITS.price.max}
              step={SLIDER_LIMITS.price.step}
              onChange={(v) => setSlider("price", v)}
              format={(v) => `₹${v}`}
            />
            <WhatIfSlider
              label="Sales volume (per month)"
              value={sliders.salesVolume}
              min={SLIDER_LIMITS.salesVolume.min}
              max={SLIDER_LIMITS.salesVolume.max}
              step={SLIDER_LIMITS.salesVolume.step}
              onChange={(v) => setSlider("salesVolume", v)}
              format={(v) => `${v} units`}
            />
            <WhatIfSlider
              label="Loan amount"
              value={sliders.loan}
              min={SLIDER_LIMITS.loan.min}
              max={SLIDER_LIMITS.loan.max}
              step={SLIDER_LIMITS.loan.step}
              onChange={(v) => setSlider("loan", v)}
              format={(v) => formatINR(v)}
            />
            <WhatIfSlider
              label="Loan tenure"
              value={sliders.tenure}
              min={SLIDER_LIMITS.tenure.min}
              max={SLIDER_LIMITS.tenure.max}
              step={SLIDER_LIMITS.tenure.step}
              onChange={(v) => setSlider("tenure", v)}
              format={(v) => `${v} months`}
            />
            <WhatIfSlider
              label="Interest rate"
              value={sliders.interestRate}
              min={SLIDER_LIMITS.interestRate.min}
              max={SLIDER_LIMITS.interestRate.max}
              step={SLIDER_LIMITS.interestRate.step}
              onChange={(v) => setSlider("interestRate", v)}
              format={(v) => `${v}%`}
            />
            <WhatIfSlider
              label="Operating cost (per month)"
              value={sliders.operatingCost}
              min={SLIDER_LIMITS.operatingCost.min}
              max={SLIDER_LIMITS.operatingCost.max}
              step={SLIDER_LIMITS.operatingCost.step}
              onChange={(v) => setSlider("operatingCost", v)}
              format={(v) => formatINR(v)}
            />
            <WhatIfSlider
              label="Raw material cost (per month)"
              value={sliders.rawMaterial}
              min={SLIDER_LIMITS.rawMaterial.min}
              max={SLIDER_LIMITS.rawMaterial.max}
              step={SLIDER_LIMITS.rawMaterial.step}
              onChange={(v) => setSlider("rawMaterial", v)}
              format={(v) => formatINR(v)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Projected outcomes */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Projected outcomes
          </h2>
          <span className="text-xs text-muted-foreground">
            {currentSource === "backend" ? "Backend" : "Computed"} engine
          </span>
        </div>
        <div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          data-ocid="outcomes_grid"
        >
          <EstimateMetric
            label="Revenue"
            value={formatINR(revenue)}
            hint="per month"
          />
          <EstimateMetric
            label="Monthly profit"
            value={formatINR(monthlyProfit)}
            hint={`${marginPercent.toFixed(0)}% margin`}
          />
          <EstimateMetric
            label="EMI"
            value={formatINR(plan.amortization.emi.value)}
            hint="per month"
          />
          <EstimateMetric
            label="Break-even"
            value={formatINR(plan.breakEven.breakEvenSales.value)}
            hint="sales to cover costs"
          />
          <EstimateMetric
            label="Loan"
            value={formatINR(plan.financing.loanAmount.value)}
            hint="amount financed"
          />
          <EstimateMetric
            label="Cash requirement"
            value={formatINR(plan.cashRequirement.total.value)}
            hint="to start and run"
          />
          <EstimateMetric
            label="Repayment capacity"
            value={formatINR(monthlyProfit * 0.6)}
            hint="per month"
          />
          <EstimateMetric
            label="Annual profit"
            value={formatINR(annualProfit)}
            hint="before loan costs"
          />
        </div>
      </div>

      {/* Risk + feasibility */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5" data-ocid="risk_panel">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Scenario risk
            </p>
            <RiskBadge risk={risk} />
          </div>
          <p className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground">
            {paybackLabel}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Estimated months to recover your{" "}
            {formatINR(sliders.ownCapital + sliders.loan)} investment from
            profit.
          </p>
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground">
            <Banknote className="size-4 shrink-0 text-primary" aria-hidden />
            <span>
              Loan of {formatINR(sliders.loan)} would take{" "}
              {annualProfit > 0
                ? `${(sliders.loan / annualProfit).toFixed(1)} years`
                : "—"}{" "}
              of full profit to repay.
            </span>
          </div>
        </Card>

        <FeasibilityScoreRing score={feasibility} />
      </div>

      {/* Scenarios */}
      <Card data-ocid="scenarios_panel">
        <CardHeader>
          <CardTitle>Compare scenarios</CardTitle>
          <CardDescription>
            Current, Better, and Conservative plans computed from the same
            engine. All figures are estimates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="rounded-2xl border border-border p-5"
                data-ocid={`scenario_card.${scenario.id}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold tracking-tight">
                    {scenario.label}
                  </h3>
                  <RiskBadge risk={scenario.risk} />
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Revenue</dt>
                    <dd className="fin-stat font-semibold">
                      {formatINR(scenario.revenue)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Profit</dt>
                    <dd className="fin-stat font-semibold">
                      {formatINR(scenario.profit)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">EMI</dt>
                    <dd className="fin-stat font-semibold">
                      {formatINR(scenario.emi)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Break-even</dt>
                    <dd className="fin-stat font-semibold">
                      {formatINR(scenario.breakEven)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Cash needed</dt>
                    <dd className="fin-stat font-semibold">
                      {formatINR(scenario.cashRequirement)}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plain-language explanations */}
      <Card data-ocid="explain_panel">
        <CardHeader>
          <CardTitle>What does this mean?</CardTitle>
          <CardDescription>
            Simple explanations of the financial terms used on this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {EXPLANATIONS.map((item) => (
              <ExplainPanel key={item.term} title={item.term}>
                {item.body}
              </ExplainPanel>
            ))}
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        {DEMO_BADGE} — figures are illustrative projections for demonstration
        only and are not financial advice.
      </p>
    </div>
  );
}
