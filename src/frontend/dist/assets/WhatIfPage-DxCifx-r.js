import { r as reactExports, j as jsxRuntimeExports, h as FlaskConical } from "./index-CeuI7PIL.js";
import { B as Button, C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./Card-DVJtgs4C.js";
import { E as ExplainPanel } from "./ExplainPanel-BvK1N_-T.js";
import { W as WhatIfSlider, F as FeasibilityScoreRing } from "./WhatIfSlider-B7BytOLP.js";
import { R as RiskBadge } from "./RiskBadge-BYdnakte.js";
import { a as useFinanceApi, c as computeFinancialPlan } from "./api-client-DE3CIaVf.js";
import { a as DEMO_BADGE, f as formatINR } from "./demo-data-CVHFmdt3.js";
import { u as useOnboardingStore } from "./onboarding-store-Z7WltxWC.js";
import { R as RotateCcw } from "./rotate-ccw-CEBWXVsu.js";
import { B as Banknote } from "./banknote-CBLbyqp1.js";
import "./circle-help-DThjCgsP.js";
import "./WhyButton-Dlwr2uVe.js";
import "./chevron-down-HMfNLb45.js";
import "./analysis-engine-DtVfTxoQ.js";
const SLIDER_LIMITS = {
  ownCapital: { min: 2e4, max: 5e5, step: 1e4 },
  price: { min: 20, max: 500, step: 5 },
  salesVolume: { min: 50, max: 2e3, step: 10 },
  loan: { min: 0, max: 5e5, step: 1e4 },
  tenure: { min: 12, max: 120, step: 6 },
  interestRate: { min: 5, max: 20, step: 0.5 },
  operatingCost: { min: 5e3, max: 2e5, step: 1e3 },
  rawMaterial: { min: 2e3, max: 15e4, step: 1e3 }
};
const PRESETS = [
  {
    key: "Conservative",
    state: {
      ownCapital: 8e4,
      price: 90,
      salesVolume: 350,
      loan: 12e4,
      tenure: 48,
      interestRate: 12,
      operatingCost: 34e3,
      rawMaterial: 14e3
    }
  },
  {
    key: "Balanced",
    state: {
      ownCapital: 1e5,
      price: 100,
      salesVolume: 450,
      loan: 15e4,
      tenure: 36,
      interestRate: 11,
      operatingCost: 31e3,
      rawMaterial: 12400
    }
  },
  {
    key: "Aggressive",
    state: {
      ownCapital: 12e4,
      price: 115,
      salesVolume: 600,
      loan: 18e4,
      tenure: 24,
      interestRate: 10,
      operatingCost: 28e3,
      rawMaterial: 11e3
    }
  }
];
const BALANCED = PRESETS[1].state;
const DEFAULT_SCHEME_RULE = {
  name: "What-if model",
  minProjectCost: 0,
  maxProjectCost: 1e7,
  loanPercent: 100,
  beneficiaryContributionPercent: 0,
  interestRatePercent: 0,
  tenureMonths: 0,
  moratoriumMonths: 0
};
function clamp(value) {
  return Math.max(0, Math.min(100, value));
}
function buildFinanceInput(s) {
  const projectCost = s.ownCapital + s.loan;
  const revenue = s.price * s.salesVolume;
  const marginPercent = s.operatingCost > 0 ? Math.max(0, (revenue - s.operatingCost) / s.operatingCost * 100) : 0;
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
      other: s.operatingCost - s.rawMaterial
    },
    workingCapital: {
      initialRequirement: Math.round(s.operatingCost * 2),
      monthlyRequirement: s.operatingCost,
      emergencyBufferPercent: 10
    },
    pricePerUnit: s.price,
    variableCostPerUnit: s.rawMaterial
  };
}
function deriveRisk(s, monthlyProfit) {
  const annualProfit = monthlyProfit * 12;
  const paybackMonths = monthlyProfit > 0 ? (s.ownCapital + s.loan) / monthlyProfit : Number.POSITIVE_INFINITY;
  const loanBurdenYears = annualProfit > 0 ? s.loan / annualProfit : Number.POSITIVE_INFINITY;
  if (paybackMonths > 24 || loanBurdenYears > 2.5) return "high";
  if (paybackMonths > 14 || loanBurdenYears > 1.5) return "medium";
  return "low";
}
function computeFeasibility(s, monthlyProfit, revenue) {
  const marginPercent = revenue > 0 ? monthlyProfit / revenue * 100 : 0;
  const market = clamp(Math.round(s.salesVolume / 800 * 100));
  const financial = clamp(Math.round(marginPercent * 2.5));
  const competition = 62;
  const annualProfit = monthlyProfit * 12;
  const loanBurdenRatio = annualProfit > 0 ? s.loan / annualProfit : 3;
  const risk = clamp(Math.round(100 - loanBurdenRatio * 30));
  const overall = Math.round((market + financial + competition + risk) / 4);
  return {
    overall,
    breakdown: { market, financial, competition, risk },
    explanation: `Your score is built from four transparent parts. Market (${market}) reflects your sales volume, Financial (${financial}) reflects your profit margin, Competition (${competition}) is a fixed baseline from your market analysis, and Risk (${risk}) reflects how comfortably you can repay the loan. They are combined into one number out of 100. It is a guide, not a guarantee.`
  };
}
function computeScenario(s, id, label) {
  const plan = computeFinancialPlan(buildFinanceInput(s), DEFAULT_SCHEME_RULE);
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
    risk: deriveRisk(s, profit)
  };
}
function betterState(s) {
  return {
    ...s,
    price: Math.round(s.price * 1.1),
    salesVolume: Math.round(s.salesVolume * 1.15),
    operatingCost: Math.round(s.operatingCost * 0.95),
    rawMaterial: Math.round(s.rawMaterial * 0.95)
  };
}
function conservativeState(s) {
  return {
    ...s,
    price: Math.round(s.price * 0.9),
    salesVolume: Math.round(s.salesVolume * 0.85),
    operatingCost: Math.round(s.operatingCost * 1.05),
    rawMaterial: Math.round(s.rawMaterial * 1.05)
  };
}
function initialSliders(profile) {
  const price = 100;
  const salesVolume = Math.max(
    50,
    Math.round(profile.expectedMonthlySales / price)
  );
  const operatingCost = Math.round(profile.expectedMonthlySales * 0.68);
  return {
    ownCapital: Math.max(
      2e4,
      profile.expectedInvestment - profile.expectedLoanRequirement
    ),
    price,
    salesVolume,
    loan: profile.expectedLoanRequirement,
    tenure: 36,
    interestRate: 11,
    operatingCost,
    rawMaterial: Math.round(operatingCost * 0.4)
  };
}
function EstimateMetric({
  label,
  value,
  hint
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", "data-ocid": "estimate_metric", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "estimate-tag fin-chip", children: "estimate" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground", children: value }),
    hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: hint }) : null
  ] });
}
const EXPLANATIONS = [
  {
    term: "Margin",
    body: "Margin is the share of each sale you keep after paying for the product and running costs. A higher margin means you earn more from every rupee of sales."
  },
  {
    term: "Project cost",
    body: "Project cost is the total money needed to set up the business — your own capital plus the loan. It covers equipment, stock, and other one-time expenses."
  },
  {
    term: "Loan",
    body: "A loan is money you borrow and must pay back with interest. The amount you borrow is added to your own capital to build the project."
  },
  {
    term: "EMI",
    body: "EMI is the fixed amount you pay every month to repay the loan. It includes part of the loan amount plus the interest charged on it."
  },
  {
    term: "Interest",
    body: "Interest is the extra money the bank charges for lending you the loan. It is shown as a percentage of the loan amount each year."
  },
  {
    term: "Moratorium",
    body: "Moratorium is a waiting period at the start when you do not have to repay the loan. Interest still adds to your loan during this time, so you repay a little more later."
  },
  {
    term: "Working capital",
    body: "Working capital is the money you need to run the business day to day — buying raw material, paying wages, and covering bills before your sales bring money in."
  },
  {
    term: "Break-even",
    body: "Break-even is the sales level where your income just covers all your costs. Below it you lose money; above it you start earning profit."
  },
  {
    term: "Subsidy",
    body: "A subsidy is money the government gives to reduce your project cost. It lowers how much you need to borrow or pay from your own pocket."
  },
  {
    term: "Collateral",
    body: "Collateral is something you keep as a promise to the bank, like land or property. If you cannot repay the loan, the bank can use it to recover the money."
  }
];
function WhatIfPage() {
  const profile = useOnboardingStore((s) => s.profile);
  const financeApi = useFinanceApi();
  const financeApiRef = reactExports.useRef(financeApi);
  const [status, setStatus] = reactExports.useState(
    "loading"
  );
  const [currentSource, setCurrentSource] = reactExports.useState(
    "demo"
  );
  const initialRef = reactExports.useRef(null);
  if (initialRef.current === null) {
    initialRef.current = initialSliders(
      profile ?? {
        expectedMonthlySales: BALANCED.salesVolume * BALANCED.price,
        expectedInvestment: BALANCED.ownCapital + BALANCED.loan,
        expectedLoanRequirement: BALANCED.loan
      }
    );
  }
  const [sliders, setSliders] = reactExports.useState(initialRef.current);
  reactExports.useEffect(() => {
    const timer = window.setTimeout(() => setStatus("ready"), 700);
    return () => window.clearTimeout(timer);
  }, []);
  reactExports.useEffect(() => {
    let active = true;
    const initial = initialRef.current;
    if (!initial) return;
    financeApiRef.current.computeFinancialPlan(buildFinanceInput(initial), DEFAULT_SCHEME_RULE).then((res) => {
      if (active) setCurrentSource(res.source);
    }).catch(() => {
      if (active) setCurrentSource("demo");
    });
    return () => {
      active = false;
    };
  }, []);
  const plan = reactExports.useMemo(
    () => computeFinancialPlan(buildFinanceInput(sliders), DEFAULT_SCHEME_RULE),
    [sliders]
  );
  const revenue = sliders.price * sliders.salesVolume;
  const monthlyProfit = revenue - sliders.operatingCost;
  const annualProfit = monthlyProfit * 12;
  const marginPercent = revenue > 0 ? monthlyProfit / revenue * 100 : 0;
  const risk = deriveRisk(sliders, monthlyProfit);
  const feasibility = reactExports.useMemo(
    () => computeFeasibility(sliders, monthlyProfit, revenue),
    [sliders, monthlyProfit, revenue]
  );
  const scenarios = reactExports.useMemo(
    () => [
      computeScenario(sliders, "current", "Current"),
      computeScenario(betterState(sliders), "better", "Better"),
      computeScenario(
        conservativeState(sliders),
        "conservative",
        "Conservative"
      )
    ],
    [sliders]
  );
  const setSlider = (key, value) => setSliders((prev) => ({ ...prev, [key]: value }));
  const applyPreset = (preset) => setSliders(preset.state);
  const resetToBalanced = () => setSliders(BALANCED);
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-4 sm:p-6", "data-ocid": "loading_state", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-56 animate-pulse-soft rounded-lg bg-muted" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: Array.from({ length: 4 }, (_, i) => `metric-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "h-32 animate-pulse-soft rounded-2xl border border-border bg-muted/40"
        },
        id
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 animate-pulse-soft rounded-2xl border border-border bg-muted/40" })
    ] });
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-6", "data-ocid": "error_state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FlaskConical, { className: "size-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "Couldn't load the What-if Lab" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Something went wrong while preparing your scenario model. Please try again." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => setStatus("loading"),
          "data-ocid": "retry_button",
          children: "Try again"
        }
      )
    ] }) });
  }
  const paybackLabel = monthlyProfit > 0 ? `${((sliders.ownCapital + sliders.loan) / monthlyProfit).toFixed(1)} months` : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 p-4 sm:p-6", "data-ocid": "whatif_page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: "What-if Lab" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-full bg-warning/15 px-2.5 py-1 text-xs font-semibold text-warning", children: DEMO_BADGE })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-xl text-sm text-muted-foreground", children: "Move the sliders to model a different business plan and watch the estimates update in real time." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: resetToBalanced,
          "data-ocid": "reset_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4", "aria-hidden": true }),
            "Reset to Balanced"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", "data-ocid": "preset_group", children: PRESETS.map((preset) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => applyPreset(preset),
        className: "rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-smooth hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "data-ocid": `preset_button.${preset.key.toLowerCase()}`,
        children: preset.key
      },
      preset.key
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "assumptions_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your assumptions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "These are the inputs used to estimate your plan. Every output below is an estimate." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Own capital",
            value: sliders.ownCapital,
            min: SLIDER_LIMITS.ownCapital.min,
            max: SLIDER_LIMITS.ownCapital.max,
            step: SLIDER_LIMITS.ownCapital.step,
            onChange: (v) => setSlider("ownCapital", v),
            format: (v) => formatINR(v)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Product price",
            value: sliders.price,
            min: SLIDER_LIMITS.price.min,
            max: SLIDER_LIMITS.price.max,
            step: SLIDER_LIMITS.price.step,
            onChange: (v) => setSlider("price", v),
            format: (v) => `₹${v}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Sales volume (per month)",
            value: sliders.salesVolume,
            min: SLIDER_LIMITS.salesVolume.min,
            max: SLIDER_LIMITS.salesVolume.max,
            step: SLIDER_LIMITS.salesVolume.step,
            onChange: (v) => setSlider("salesVolume", v),
            format: (v) => `${v} units`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Loan amount",
            value: sliders.loan,
            min: SLIDER_LIMITS.loan.min,
            max: SLIDER_LIMITS.loan.max,
            step: SLIDER_LIMITS.loan.step,
            onChange: (v) => setSlider("loan", v),
            format: (v) => formatINR(v)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Loan tenure",
            value: sliders.tenure,
            min: SLIDER_LIMITS.tenure.min,
            max: SLIDER_LIMITS.tenure.max,
            step: SLIDER_LIMITS.tenure.step,
            onChange: (v) => setSlider("tenure", v),
            format: (v) => `${v} months`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Interest rate",
            value: sliders.interestRate,
            min: SLIDER_LIMITS.interestRate.min,
            max: SLIDER_LIMITS.interestRate.max,
            step: SLIDER_LIMITS.interestRate.step,
            onChange: (v) => setSlider("interestRate", v),
            format: (v) => `${v}%`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Operating cost (per month)",
            value: sliders.operatingCost,
            min: SLIDER_LIMITS.operatingCost.min,
            max: SLIDER_LIMITS.operatingCost.max,
            step: SLIDER_LIMITS.operatingCost.step,
            onChange: (v) => setSlider("operatingCost", v),
            format: (v) => formatINR(v)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          WhatIfSlider,
          {
            label: "Raw material cost (per month)",
            value: sliders.rawMaterial,
            min: SLIDER_LIMITS.rawMaterial.min,
            max: SLIDER_LIMITS.rawMaterial.max,
            step: SLIDER_LIMITS.rawMaterial.step,
            onChange: (v) => setSlider("rawMaterial", v),
            format: (v) => formatINR(v)
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold tracking-tight", children: "Projected outcomes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          currentSource === "backend" ? "Backend" : "Computed",
          " engine"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
          "data-ocid": "outcomes_grid",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "Revenue",
                value: formatINR(revenue),
                hint: "per month"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "Monthly profit",
                value: formatINR(monthlyProfit),
                hint: `${marginPercent.toFixed(0)}% margin`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "EMI",
                value: formatINR(plan.amortization.emi.value),
                hint: "per month"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "Break-even",
                value: formatINR(plan.breakEven.breakEvenSales.value),
                hint: "sales to cover costs"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "Loan",
                value: formatINR(plan.financing.loanAmount.value),
                hint: "amount financed"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "Cash requirement",
                value: formatINR(plan.cashRequirement.total.value),
                hint: "to start and run"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "Repayment capacity",
                value: formatINR(monthlyProfit * 0.6),
                hint: "per month"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateMetric,
              {
                label: "Annual profit",
                value: formatINR(annualProfit),
                hint: "before loan costs"
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", "data-ocid": "risk_panel", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Scenario risk" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { risk })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground", children: paybackLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Estimated months to recover your",
          " ",
          formatINR(sliders.ownCapital + sliders.loan),
          " investment from profit."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-xl bg-muted/40 p-3 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "size-4 shrink-0 text-primary", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Loan of ",
            formatINR(sliders.loan),
            " would take",
            " ",
            annualProfit > 0 ? `${(sliders.loan / annualProfit).toFixed(1)} years` : "—",
            " ",
            "of full profit to repay."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeasibilityScoreRing, { score: feasibility })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "scenarios_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Compare scenarios" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Current, Better, and Conservative plans computed from the same engine. All figures are estimates." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: scenarios.map((scenario) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-border p-5",
          "data-ocid": `scenario_card.${scenario.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-tight", children: scenario.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { risk: scenario.risk })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Revenue" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "fin-stat font-semibold", children: formatINR(scenario.revenue) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Profit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "fin-stat font-semibold", children: formatINR(scenario.profit) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "EMI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "fin-stat font-semibold", children: formatINR(scenario.emi) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Break-even" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "fin-stat font-semibold", children: formatINR(scenario.breakEven) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "Cash needed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "fin-stat font-semibold", children: formatINR(scenario.cashRequirement) })
              ] })
            ] })
          ]
        },
        scenario.id
      )) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "explain_panel", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "What does this mean?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Simple explanations of the financial terms used on this page." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2", children: EXPLANATIONS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExplainPanel, { title: item.term, children: item.body }, item.term)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
      DEMO_BADGE,
      " — figures are illustrative projections for demonstration only and are not financial advice."
    ] })
  ] });
}
export {
  WhatIfPage as default
};
