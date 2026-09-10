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
import { FinancialMetricCard } from "@/components/finance/FinancialMetricCard";
import { PrincipalInterestChart } from "@/components/finance/PrincipalInterestChart";
import { RepaymentScheduleTable } from "@/components/finance/RepaymentScheduleTable";
import { WhatIfSlider } from "@/components/finance/WhatIfSlider";
import { EmptyState } from "@/components/ui/EmptyState";
import { EstimateBadge } from "@/components/ui/EstimateBadge";
import { InputField } from "@/components/ui/InputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useFinancialPlan } from "@/hooks/useQueries";
import { formatINR } from "@/lib/demo-data";
import { computeFinancialPlan } from "@/lib/finance-engine";
import type {
  FeasibilityScore,
  FinanceInput,
  FinancialPlan,
  OperatingCosts,
  SchemeRule,
} from "@/lib/types";
import {
  AlertTriangle,
  Banknote,
  Building2,
  Calculator,
  Gauge,
  IndianRupee,
  Landmark,
  PiggyBank,
  Receipt,
  RefreshCw,
  Scale,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/* Scheme financing-term presets (deterministic, scheme-specific)     */
/* ------------------------------------------------------------------ */

const SCHEME_RULES: SchemeRule[] = [
  {
    name: "Micro Enterprise",
    minProjectCost: 100000,
    maxProjectCost: 1000000,
    loanPercent: 75,
    beneficiaryContributionPercent: 10,
    interestRatePercent: 11,
    tenureMonths: 60,
    moratoriumMonths: 6,
  },
  {
    name: "Small Enterprise",
    minProjectCost: 1000000,
    maxProjectCost: 2500000,
    loanPercent: 70,
    beneficiaryContributionPercent: 15,
    interestRatePercent: 10,
    tenureMonths: 84,
    moratoriumMonths: 12,
  },
  {
    name: "Agri Business",
    minProjectCost: 50000,
    maxProjectCost: 500000,
    loanPercent: 80,
    beneficiaryContributionPercent: 10,
    interestRatePercent: 9,
    tenureMonths: 60,
    moratoriumMonths: 6,
  },
];

const DEFAULT_INPUT: FinanceInput = {
  proposedProjectCost: 1500000,
  ownCapital: 450000,
  loanRequirement: 1050000,
  tenureMonths: 60,
  interestRatePercent: 11,
  marginPercent: 25,
  moratoriumMonths: 6,
  operatingCosts: {
    rent: 8000,
    salary: 15000,
    rawMaterial: 20000,
    electricity: 3000,
    transport: 4000,
    packaging: 2500,
    marketing: 3000,
    maintenance: 2000,
    other: 2500,
  },
  workingCapital: {
    initialRequirement: 100000,
    monthlyRequirement: 60000,
    emergencyBufferPercent: 10,
  },
  pricePerUnit: 120,
  variableCostPerUnit: 60,
};

const OPERATING_COST_FIELDS: Array<{
  key: keyof OperatingCosts;
  label: string;
}> = [
  { key: "rent", label: "Rent" },
  { key: "salary", label: "Salary" },
  { key: "rawMaterial", label: "Raw material" },
  { key: "electricity", label: "Electricity" },
  { key: "transport", label: "Transport" },
  { key: "packaging", label: "Packaging" },
  { key: "marketing", label: "Marketing" },
  { key: "maintenance", label: "Maintenance" },
  { key: "other", label: "Other" },
];

/* ------------------------------------------------------------------ */
/* Deterministic feasibility score                                     */
/* ------------------------------------------------------------------ */

function clamp(v: number): number {
  return Math.max(0, Math.min(100, Math.round(v)));
}

function computeFeasibility(
  plan: FinancialPlan,
  input: FinanceInput,
): FeasibilityScore {
  const loan = plan.financing.loanAmount.value;
  const projectCost = plan.financing.feasibleProjectCost.value;
  const ownContribution = plan.financing.beneficiaryContribution.value;
  const emi = plan.amortization.emi.value;
  const monthlyOp = plan.monthlyOperatingCost.value;
  const margin = input.marginPercent;

  const loanShare = projectCost > 0 ? loan / projectCost : 0;
  const emiBurden = monthlyOp > 0 ? emi / monthlyOp : 0;
  const ownShare = projectCost > 0 ? ownContribution / projectCost : 0;

  // Financial: how affordable the loan is — lower loan share and EMI burden
  // relative to operating cost score higher.
  const financial = clamp(
    100 -
      loanShare * 40 -
      Math.min(emiBurden, 1.5) * 30 +
      Math.min(margin, 40) * 0.5,
  );

  // Market: margin as a transparent proxy for pricing power.
  const market = clamp(40 + margin * 1.2);

  // Competition: a higher margin suggests less price pressure from rivals.
  const competition = clamp(100 - margin * 1.5);

  // Risk: higher own contribution lowers risk; a heavy EMI burden or thin
  // margin raises it.
  const risk = clamp(
    100 - ownShare * 60 - (emiBurden > 0.5 ? 20 : 0) + (margin < 15 ? 15 : 0),
  );

  const overall = clamp((market + financial + competition + risk) / 4);

  return {
    overall,
    breakdown: { market, financial, competition, risk },
    explanation:
      "This score is built from four transparent parts using fixed rules: Financial (how affordable the loan is), Market (your margin as a sign of pricing power), Competition (how much price pressure you face), and Risk (how much of the project you fund yourself). It is a guide, not a guarantee.",
  };
}

/* ------------------------------------------------------------------ */
/* Loading skeleton                                                    */
/* ------------------------------------------------------------------ */

function FinanceSkeleton() {
  return (
    <div className="space-y-6" data-ocid="loading_state">
      <div className="h-8 w-56 animate-pulse-soft rounded-lg bg-muted" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => `metric-${i}`).map((id) => (
          <Skeleton key={id} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-72 rounded-2xl" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-80 rounded-2xl" />
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function FinancePage() {
  const [input, setInput] = useState<FinanceInput>(DEFAULT_INPUT);
  const [rule, setRule] = useState<SchemeRule>(SCHEME_RULES[0]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  // Resolve the initial loading state on mount so the page renders its content
  // on first load instead of staying stuck on the skeleton.
  useEffect(() => {
    setStatus("ready");
  }, []);

  const { data: planResult } = useFinancialPlan(input, rule);

  const plan = useMemo(
    () => planResult?.data ?? computeFinancialPlan(input, rule),
    [planResult, input, rule],
  );
  const source = planResult?.source ?? "demo";

  const feasibility = useMemo(
    () => computeFeasibility(plan, input),
    [plan, input],
  );

  const setNumber = (key: keyof FinanceInput, value: number) =>
    setInput((prev) => ({ ...prev, [key]: value }));

  const setOperatingCost = (key: keyof OperatingCosts, value: number) =>
    setInput((prev) => ({
      ...prev,
      operatingCosts: { ...prev.operatingCosts, [key]: value },
    }));

  const setWorkingCapital = (
    key: keyof FinanceInput["workingCapital"],
    value: number,
  ) =>
    setInput((prev) => ({
      ...prev,
      workingCapital: { ...prev.workingCapital, [key]: value },
    }));

  const totalOperatingCost = useMemo(() => {
    const op = input.operatingCosts;
    return (
      op.rent +
      op.salary +
      op.rawMaterial +
      op.electricity +
      op.transport +
      op.packaging +
      op.marketing +
      op.maintenance +
      op.other
    );
  }, [input.operatingCosts]);

  if (status === "loading") {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <FinanceSkeleton />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        <EmptyState
          title="Couldn't load your financial plan"
          description="Something went wrong while preparing your plan. Please try again."
          icon={<AlertTriangle className="size-6" />}
          actionLabel="Retry"
          onAction={() => setStatus("loading")}
        />
      </div>
    );
  }

  const {
    financing,
    amortization,
    moratorium,
    workingCapital,
    monthlyOperatingCost,
    breakEven,
  } = plan;

  const emi = amortization.emi.value;
  const principal = amortization.principalInterest.totalPrincipal;
  const interest = amortization.principalInterest.totalInterest;
  const totalRepayment = amortization.principalInterest.totalRepayment;

  const recommendation = {
    feasibility,
    opportunity: `Your margin of ${input.marginPercent}% and a feasible project cost of ${formatINR(
      financing.feasibleProjectCost.value,
    )} point to a workable business.`,
    risk:
      emi > 0 &&
      monthlyOperatingCost.value > 0 &&
      emi / monthlyOperatingCost.value > 0.5
        ? "Your monthly EMI is more than half your operating cost, so cash flow may be tight."
        : "Your monthly EMI is within a comfortable share of your operating cost.",
    investment: financing.feasibleProjectCost.value,
    projectCost: financing.feasibleProjectCost.value,
    ownContribution: financing.beneficiaryContribution.value,
    loan: financing.loanAmount.value,
    potentialScheme: rule.name,
    emi,
    workingCapital: workingCapital.totalRequirement.value,
    nextAction:
      "Confirm your own contribution and approach the scheme office with your project cost and loan requirement to start the application.",
  };

  return (
    <div
      className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6"
      data-ocid="finance_page"
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Financial Plan
            </h1>
            <span className="inline-flex items-center rounded-full bg-warning/15 px-2.5 py-1 text-xs font-semibold text-warning">
              {source === "backend" ? "Live" : "Estimated"}
            </span>
          </div>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Your project cost, loan, EMI, and break-even — worked out from the
            numbers you enter below.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            setStatus("loading");
            window.setTimeout(() => setStatus("ready"), 400);
          }}
          data-ocid="refresh_button"
        >
          <RefreshCw className="size-4" aria-hidden />
          Recalculate
        </Button>
      </div>

      {/* Inputs */}
      <Card className="mt-6" data-ocid="inputs_panel">
        <CardHeader>
          <CardTitle>Your plan inputs</CardTitle>
          <CardDescription>
            Enter your project details. All figures are worked out from these
            numbers using fixed rules.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-foreground">
              Scheme financing terms
            </p>
            <Select
              value={rule.name}
              onValueChange={(name) => {
                const next = SCHEME_RULES.find((r) => r.name === name);
                if (next) setRule(next);
              }}
            >
              <SelectTrigger
                className="w-full"
                aria-label="Scheme financing terms"
                data-ocid="scheme_rule_select"
              >
                <SelectValue placeholder="Select a scheme" />
              </SelectTrigger>
              <SelectContent>
                {SCHEME_RULES.map((r) => (
                  <SelectItem key={r.name} value={r.name}>
                    {r.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {rule.name}: up to {rule.loanPercent}% loan,{" "}
              {rule.interestRatePercent}% interest, {rule.tenureMonths} months,{" "}
              {rule.moratoriumMonths} month moratorium.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InputField
              label="Proposed project cost (₹)"
              type="number"
              value={input.proposedProjectCost}
              onChange={(e) =>
                setNumber("proposedProjectCost", Number(e.target.value))
              }
              icon={<Building2 className="size-4" />}
              data-ocid="project_cost_input"
            />
            <InputField
              label="Own capital (₹)"
              type="number"
              value={input.ownCapital}
              onChange={(e) => setNumber("ownCapital", Number(e.target.value))}
              icon={<Wallet className="size-4" />}
              data-ocid="own_capital_input"
            />
            <InputField
              label="Loan requirement (₹)"
              type="number"
              value={input.loanRequirement}
              onChange={(e) =>
                setNumber("loanRequirement", Number(e.target.value))
              }
              icon={<Landmark className="size-4" />}
              data-ocid="loan_requirement_input"
            />
            <InputField
              label="Interest rate (%)"
              type="number"
              value={input.interestRatePercent}
              onChange={(e) =>
                setNumber("interestRatePercent", Number(e.target.value))
              }
              icon={<Calculator className="size-4" />}
              data-ocid="interest_rate_input"
            />
            <InputField
              label="Tenure (months)"
              type="number"
              value={input.tenureMonths}
              onChange={(e) =>
                setNumber("tenureMonths", Number(e.target.value))
              }
              icon={<Receipt className="size-4" />}
              data-ocid="tenure_input"
            />
            <InputField
              label="Moratorium (months)"
              type="number"
              value={input.moratoriumMonths}
              onChange={(e) =>
                setNumber("moratoriumMonths", Number(e.target.value))
              }
              icon={<Gauge className="size-4" />}
              data-ocid="moratorium_input"
            />
            <InputField
              label="Selling price per unit (₹)"
              type="number"
              value={input.pricePerUnit}
              onChange={(e) =>
                setNumber("pricePerUnit", Number(e.target.value))
              }
              icon={<TrendingUp className="size-4" />}
              data-ocid="price_per_unit_input"
            />
            <InputField
              label="Variable cost per unit (₹)"
              type="number"
              value={input.variableCostPerUnit}
              onChange={(e) =>
                setNumber("variableCostPerUnit", Number(e.target.value))
              }
              icon={<Receipt className="size-4" />}
              data-ocid="variable_cost_per_unit_input"
            />
          </div>

          <WhatIfSlider
            label="Margin (%)"
            value={input.marginPercent}
            min={5}
            max={60}
            step={1}
            onChange={(v) => setNumber("marginPercent", v)}
            format={(v) => `${v}%`}
          />
        </CardContent>
      </Card>

      {/* Finance Overview */}
      <section className="mt-8" aria-labelledby="overview-heading">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2
              id="overview-heading"
              className="font-display text-lg font-semibold tracking-tight"
            >
              Finance overview
            </h2>
            <p className="text-sm text-muted-foreground">
              Your project at a glance, from the numbers above.
            </p>
          </div>
          <EstimateBadge estimate={monthlyOperatingCost} />
        </div>
        <div
          className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3"
          data-ocid="overview_grid"
        >
          <FinancialMetricCard
            label="Project cost"
            value={formatINR(financing.feasibleProjectCost.value)}
            category="capital"
            icon={<Building2 className="size-4" />}
            hint="feasible"
          />
          <FinancialMetricCard
            label="Own contribution"
            value={formatINR(financing.beneficiaryContribution.value)}
            category="money"
            icon={<Wallet className="size-4" />}
            hint="your share"
          />
          <FinancialMetricCard
            label="Loan"
            value={formatINR(financing.loanAmount.value)}
            category="loan"
            icon={<Landmark className="size-4" />}
            hint="from scheme"
          />
          <FinancialMetricCard
            label="EMI"
            value={formatINR(emi)}
            category="loan"
            icon={<Receipt className="size-4" />}
            hint="per month"
          />
          <FinancialMetricCard
            label="Interest"
            value={formatINR(interest)}
            category="interest"
            icon={<Calculator className="size-4" />}
            hint="total"
          />
          <FinancialMetricCard
            label="Total repayment"
            value={formatINR(totalRepayment)}
            category="interest"
            icon={<Banknote className="size-4" />}
            hint="loan + interest"
          />
          <FinancialMetricCard
            label="Operating cost"
            value={formatINR(monthlyOperatingCost.value)}
            category="operating"
            icon={<Receipt className="size-4" />}
            hint="per month"
          />
          <FinancialMetricCard
            label="Working capital"
            value={formatINR(workingCapital.totalRequirement.value)}
            category="capital"
            icon={<PiggyBank className="size-4" />}
            hint="total needed"
          />
          <FinancialMetricCard
            label="Break-even"
            value={formatINR(breakEven.breakEvenSales.value)}
            category="breakeven"
            icon={<Scale className="size-4" />}
            hint="sales to cover costs"
          />
        </div>
      </section>

      {/* EMI section */}
      <section className="mt-8" aria-labelledby="emi-heading">
        <h2
          id="emi-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Your monthly EMI
        </h2>
        <p className="text-sm text-muted-foreground">
          The fixed amount you pay each month to repay the loan.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FinancialMetricCard
            label="Monthly EMI"
            value={formatINR(emi)}
            category="loan"
            icon={<Receipt className="size-4" />}
          />
          <FinancialMetricCard
            label="Principal"
            value={formatINR(principal)}
            category="loan"
            icon={<Banknote className="size-4" />}
            hint="loan amount repaid"
          />
          <FinancialMetricCard
            label="Interest"
            value={formatINR(interest)}
            category="interest"
            icon={<Calculator className="size-4" />}
            hint="cost of borrowing"
          />
          <FinancialMetricCard
            label="Total repayment"
            value={formatINR(totalRepayment)}
            category="interest"
            icon={<IndianRupee className="size-4" />}
            hint="over the tenure"
          />
        </div>
      </section>

      {/* Repayment schedule + chart */}
      <section className="mt-8" aria-labelledby="schedule-heading">
        <h2
          id="schedule-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Repayment schedule
        </h2>
        <p className="text-sm text-muted-foreground">
          How each month's payment splits into principal and interest.
        </p>
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <Card className="p-5" data-ocid="schedule_panel">
            <RepaymentScheduleTable schedule={amortization.schedule} />
          </Card>
          <Card className="p-5" data-ocid="chart_panel">
            <PrincipalInterestChart
              schedule={amortization.schedule}
              principalInterest={amortization.principalInterest}
            />
          </Card>
        </div>
      </section>

      {/* Moratorium */}
      <section className="mt-8" aria-labelledby="moratorium-heading">
        <h2
          id="moratorium-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Moratorium (waiting period)
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card className="p-5" data-ocid="moratorium_panel">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs text-muted-foreground">
                  Repayment starts
                </p>
                <p className="fin-stat mt-1 text-xl font-bold text-foreground">
                  Month {moratorium.repaymentStartMonth}
                </p>
              </div>
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs text-muted-foreground">
                  Interest during moratorium
                </p>
                <p className="fin-stat mt-1 text-xl font-bold fin-interest">
                  {formatINR(moratorium.interestAccruedDuringMoratorium.value)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              {moratorium.explanation}
            </p>
          </Card>
          <ExplainPanel>
            During the moratorium you do not pay the loan, but interest keeps
            adding to the amount you owe. So the total you repay later is a
            little higher. This is normal and is already included in your EMI.
          </ExplainPanel>
        </div>
      </section>

      {/* Operating cost */}
      <section className="mt-8" aria-labelledby="operating-heading">
        <h2
          id="operating-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Operating cost
        </h2>
        <p className="text-sm text-muted-foreground">
          Your monthly running costs. Total: {formatINR(totalOperatingCost)}.
        </p>
        <Card className="mt-4 p-5" data-ocid="operating_panel">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OPERATING_COST_FIELDS.map((field) => (
              <InputField
                key={field.key}
                label={field.label}
                type="number"
                value={input.operatingCosts[field.key]}
                onChange={(e) =>
                  setOperatingCost(field.key, Number(e.target.value))
                }
                data-ocid={`operating_${field.key}_input`}
              />
            ))}
          </div>
        </Card>
      </section>

      {/* Working capital */}
      <section className="mt-8" aria-labelledby="working-capital-heading">
        <h2
          id="working-capital-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Working capital
        </h2>
        <p className="text-sm text-muted-foreground">
          The money you need to keep the business running day to day.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card className="p-5" data-ocid="working_capital_panel">
            <div className="grid gap-4 sm:grid-cols-3">
              <InputField
                label="Initial (₹)"
                type="number"
                value={input.workingCapital.initialRequirement}
                onChange={(e) =>
                  setWorkingCapital(
                    "initialRequirement",
                    Number(e.target.value),
                  )
                }
                data-ocid="wc_initial_input"
              />
              <InputField
                label="Monthly (₹)"
                type="number"
                value={input.workingCapital.monthlyRequirement}
                onChange={(e) =>
                  setWorkingCapital(
                    "monthlyRequirement",
                    Number(e.target.value),
                  )
                }
                data-ocid="wc_monthly_input"
              />
              <InputField
                label="Buffer (%)"
                type="number"
                value={input.workingCapital.emergencyBufferPercent}
                onChange={(e) =>
                  setWorkingCapital(
                    "emergencyBufferPercent",
                    Number(e.target.value),
                  )
                }
                data-ocid="wc_buffer_input"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl border border-border p-3">
                <p className="text-xs text-muted-foreground">Initial</p>
                <p className="fin-stat mt-1 text-sm font-semibold">
                  {formatINR(workingCapital.initialRequirement.value)}
                </p>
              </div>
              <div className="rounded-xl border border-border p-3">
                <p className="text-xs text-muted-foreground">Monthly</p>
                <p className="fin-stat mt-1 text-sm font-semibold">
                  {formatINR(workingCapital.monthlyRequirement.value)}
                </p>
              </div>
              <div className="rounded-xl border border-border p-3">
                <p className="text-xs text-muted-foreground">Buffer</p>
                <p className="fin-stat mt-1 text-sm font-semibold">
                  {formatINR(workingCapital.emergencyBuffer.value)}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">Total requirement</p>
              <p className="fin-stat text-lg font-bold text-foreground">
                {formatINR(workingCapital.totalRequirement.value)}
              </p>
            </div>
          </Card>
          <ExplainPanel>
            Working capital is the money you need to buy stock, pay salaries,
            and cover daily costs before your sales bring money in. The buffer
            is an extra amount kept aside for emergencies, like a bad month or a
            sudden repair.
          </ExplainPanel>
        </div>
      </section>

      {/* Break-even */}
      <section className="mt-8" aria-labelledby="breakeven-heading">
        <h2
          id="breakeven-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Break-even
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <Card className="p-5" data-ocid="breakeven_panel">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border p-4">
                <p className="text-xs text-muted-foreground">
                  Break-even sales
                </p>
                <p className="fin-stat mt-1 text-xl font-bold fin-breakeven">
                  {formatINR(breakEven.breakEvenSales.value)}
                </p>
              </div>
              {breakEven.breakEvenUnits ? (
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">
                    Break-even units
                  </p>
                  <p className="fin-stat mt-1 text-xl font-bold text-foreground">
                    {Math.round(breakEven.breakEvenUnits.value)}
                  </p>
                </div>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/85">
              {breakEven.explanation}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Assumptions
              </p>
              {breakEven.assumptions.map((a) => (
                <p key={a} className="text-sm text-muted-foreground">
                  • {a}
                </p>
              ))}
            </div>
          </Card>
          <ExplainPanel>
            Break-even is the sales level where your income just covers all your
            costs — you neither make a profit nor a loss. Sell more than this
            and you start earning profit. It helps you know how much you must
            sell each month to stay safe.
          </ExplainPanel>
        </div>
      </section>

      {/* Feasibility score */}
      <section className="mt-8" aria-labelledby="feasibility-heading">
        <h2
          id="feasibility-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Feasibility score
        </h2>
        <div className="mt-4">
          <FeasibilityScoreRing score={feasibility} />
        </div>
      </section>

      {/* Final recommendation */}
      <section className="mt-8" aria-labelledby="recommendation-heading">
        <h2
          id="recommendation-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Final recommendation
        </h2>
        <Card className="mt-4 p-6" data-ocid="recommendation_panel">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Feasibility</p>
              <p className="fin-stat mt-1 text-xl font-bold text-gradient">
                {feasibility.overall}/100
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Opportunity</p>
              <p className="mt-1 text-sm text-foreground/85">
                {recommendation.opportunity}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Risk</p>
              <p className="mt-1 text-sm text-foreground/85">
                {recommendation.risk}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Investment</p>
              <p className="fin-stat mt-1 text-lg font-bold">
                {formatINR(recommendation.investment)}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Project cost</p>
              <p className="fin-stat mt-1 text-lg font-bold">
                {formatINR(recommendation.projectCost)}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Own contribution</p>
              <p className="fin-stat mt-1 text-lg font-bold">
                {formatINR(recommendation.ownContribution)}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Loan</p>
              <p className="fin-stat mt-1 text-lg font-bold">
                {formatINR(recommendation.loan)}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Potential scheme</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {recommendation.potentialScheme}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">EMI</p>
              <p className="fin-stat mt-1 text-lg font-bold">
                {formatINR(recommendation.emi)}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs text-muted-foreground">Working capital</p>
              <p className="fin-stat mt-1 text-lg font-bold">
                {formatINR(recommendation.workingCapital)}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 sm:col-span-2">
              <p className="text-xs text-muted-foreground">Next action</p>
              <p className="mt-1 text-sm text-foreground/85">
                {recommendation.nextAction}
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* What does this mean? */}
      <section className="mt-8" aria-labelledby="explain-heading">
        <h2
          id="explain-heading"
          className="font-display text-lg font-semibold tracking-tight"
        >
          What does this mean?
        </h2>
        <div className="mt-4 space-y-4">
          <ExplainPanel title="Margin">
            Margin is the share of each sale you keep after paying for raw
            material, rent, salaries, and other costs. A higher margin means you
            keep more from every rupee you earn.
          </ExplainPanel>
          <ExplainPanel title="Project cost">
            Project cost is the total money needed to set up your business —
            buying machines, stock, and getting things ready. It is the full
            amount your plan is built around.
          </ExplainPanel>
          <ExplainPanel title="Loan">
            A loan is money a bank or scheme gives you that you must pay back
            with interest. You do not own this money — it is borrowed, and your
            EMI pays it back over time.
          </ExplainPanel>
          <ExplainPanel title="EMI">
            EMI (Equated Monthly Instalment) is the fixed amount you pay every
            month to repay your loan. It includes both the loan amount and the
            interest.
          </ExplainPanel>
          <ExplainPanel title="Interest">
            Interest is the extra money you pay for borrowing. It is the cost of
            the loan — the bank or scheme charges it for letting you use their
            money.
          </ExplainPanel>
          <ExplainPanel title="Moratorium">
            Moratorium is a waiting period at the start when you do not have to
            pay the loan. But interest still adds up during this time, so the
            total you repay later is a little higher.
          </ExplainPanel>
          <ExplainPanel title="Working capital">
            Working capital is the money you need to run the business day to day
            — buying stock, paying salaries, and covering daily costs before
            your sales bring money in.
          </ExplainPanel>
          <ExplainPanel title="Break-even">
            Break-even is the sales level where your income just covers all your
            costs. Above this level you start making profit; below it you are
            losing money.
          </ExplainPanel>
          <ExplainPanel title="Subsidy">
            A subsidy is money the government gives to help reduce your project
            cost. It is not a loan — you do not have to pay it back. It lowers
            how much you need to borrow or fund yourself.
          </ExplainPanel>
          <ExplainPanel title="Collateral">
            Collateral is something valuable you keep as a guarantee for a loan,
            like land or property. If you cannot repay, the lender can use it to
            recover the money.
          </ExplainPanel>
        </div>
      </section>

      <p className="mt-8 text-xs text-muted-foreground">
        {source === "backend"
          ? "Figures come from the live backend engine."
          : "Figures are estimates worked out from your inputs using fixed rules."}{" "}
        They are a guide, not a guarantee, and are not financial advice.
      </p>
    </div>
  );
}
