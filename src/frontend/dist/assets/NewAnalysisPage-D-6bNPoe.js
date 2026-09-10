import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, b as useToast, u as useNavigate, r as reactExports, S as Sparkles, T as TrendingUp } from "./index-CeuI7PIL.js";
import { C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent, B as Button } from "./Card-DVJtgs4C.js";
import { A as ANALYSIS_STAGES, u as useAnalysisStore } from "./analysis-store-Dq7fPPtV.js";
import { C as Check } from "./check-Bx1IrKTM.js";
import { E as EstimateBadge } from "./EstimateBadge-BwLRuXD6.js";
import { I as InputField } from "./InputField-BHILbPy-.js";
import { M as MapCard, R as RiskChip } from "./RiskChip-CCk-rSL3.js";
import { S as ScoreCard } from "./ScoreCard-Cgag5e6a.js";
import { u as useAnalysisApi } from "./api-client-DE3CIaVf.js";
import { B as BUSINESS_CATEGORIES, a as DEMO_BADGE, c as categoryName, f as formatINR } from "./demo-data-CVHFmdt3.js";
import { u as useOnboardingStore } from "./onboarding-store-Z7WltxWC.js";
import { M as MapPin } from "./map-pin-C-AVKAEB.js";
import { I as IndianRupee } from "./indian-rupee-DXDcMshY.js";
import { A as ArrowRight } from "./arrow-right-B67F64zG.js";
import "./RiskBadge-BYdnakte.js";
import "./WhyButton-Dlwr2uVe.js";
import "./circle-help-DThjCgsP.js";
import "./chevron-down-HMfNLb45.js";
import "./analysis-engine-DtVfTxoQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode);
function AnalysisProgress({
  stage,
  stages = ANALYSIS_STAGES,
  className
}) {
  const running = stage < stages.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-4", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-track h-2 w-full", "data-ocid": "analysis_progress", children: running ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "progress-indeterminate", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full w-full rounded-full bg-gradient-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "flex flex-wrap gap-2", "aria-label": "Analysis stages", children: stages.map((name, index) => {
      const done = index < stage;
      const active = index === stage && running;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: cn(
            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-smooth",
            done ? "border-success/30 bg-success/10 text-success" : active ? "border-primary/40 bg-primary/10 text-primary" : "border-border bg-muted/40 text-muted-foreground"
          ),
          "data-ocid": `analysis_stage.${index + 1}`,
          children: [
            done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "progress-stage-dot size-1.5 rounded-full bg-current",
                  active && "active"
                )
              }
            ),
            name
          ]
        },
        name
      );
    }) })
  ] });
}
function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}
function toInput(form) {
  return {
    village: form.village.trim(),
    block: form.block.trim(),
    district: form.district.trim(),
    state: form.state.trim(),
    category: form.category,
    capital: toNumber(form.capital)
  };
}
function locationLabel(input) {
  return `${input.village}, ${input.block} · ${input.district}, ${input.state}`;
}
function SectionCard({
  title,
  description,
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: cn("p-6", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: title }),
      description ? /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: description }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "mt-5 p-0", children })
  ] });
}
function EstimateRow({
  label,
  estimate,
  format = (v) => formatINR(v)
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 rounded-xl border border-border bg-muted/20 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold tracking-tight text-foreground", children: format(estimate.value) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateBadge, { estimate })
  ] });
}
function ListBlock({
  title,
  items,
  provenance = "Estimated",
  confidence = "Medium"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateBadge, { estimate: { value: 0, provenance, confidence } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-start gap-2 text-sm text-foreground/90",
        "data-ocid": `list_item.${index + 1}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
        ]
      },
      item
    )) })
  ] });
}
function MarketReachSection({ analysis }) {
  const market = analysis.result.market;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SectionCard,
    {
      title: "Market reach",
      description: "Estimated reach, customer base, and how you can reach buyers.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EstimateRow,
            {
              label: "Estimated market reach",
              estimate: market.estimatedReach,
              format: (v) => `${v.toLocaleString("en-IN")} people`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EstimateRow,
            {
              label: "Potential customer base",
              estimate: market.potentialCustomerBase,
              format: (v) => `${v.toLocaleString("en-IN")} households`
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { title: "Nearby markets", items: market.nearbyMarkets }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListBlock,
            {
              title: "Distribution channels",
              items: market.distributionChannels
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-xl border border-border bg-muted/20 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Accessibility" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              EstimateBadge,
              {
                estimate: {
                  value: 0,
                  provenance: "Estimated",
                  confidence: "Medium"
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground/90", children: market.accessibility })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid gap-5 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListBlock,
            {
              title: "Underserved opportunities",
              items: market.underservedOpportunities
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ListBlock,
              {
                title: "Demand indicators",
                items: market.demandIndicators
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ListBlock,
              {
                title: "Supply indicators",
                items: market.supplyIndicators
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-muted-foreground", children: "Competition level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                market.competitionLevel === "High" ? "risk-high" : market.competitionLevel === "Moderate" ? "risk-medium" : "risk-low"
              ),
              children: market.competitionLevel
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EstimateBadge,
            {
              estimate: { value: 0, provenance: "Observed", confidence: "Medium" }
            }
          )
        ] })
      ]
    }
  );
}
function PricingSection({ analysis }) {
  const pricing = analysis.result.pricing;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SectionCard,
    {
      title: "Pricing & costs",
      description: "Competitor price range and your estimated cost structure.",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Competitor price range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-baseline gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold tracking-tight text-foreground", children: formatINR(pricing.competitorPriceRange.min) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "to" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold tracking-tight text-foreground", children: formatINR(pricing.competitorPriceRange.max) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "avg ",
              formatINR(pricing.competitorPriceRange.avg)
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EstimateRow,
            {
              label: "Production cost",
              estimate: pricing.productionCost
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateRow, { label: "Transport cost", estimate: pricing.transportCost }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateRow, { label: "Packaging cost", estimate: pricing.packagingCost }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateRow, { label: "Operating cost", estimate: pricing.operatingCost })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Recommended price range" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-baseline gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold tracking-tight text-foreground", children: formatINR(pricing.recommendedPriceRange.min) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "to" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold tracking-tight text-foreground", children: formatINR(pricing.recommendedPriceRange.max) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            EstimateRow,
            {
              label: "Estimated margin",
              estimate: pricing.estimatedMargin
            }
          )
        ] })
      ]
    }
  );
}
function SwotSection({ analysis }) {
  const swot = analysis.result.swot;
  const quadrants = [
    { title: "Strengths", items: swot.strengths, tone: "text-success" },
    { title: "Weaknesses", items: swot.weaknesses, tone: "text-destructive" },
    {
      title: "Opportunities",
      items: swot.opportunities,
      tone: "text-primary"
    },
    { title: "Threats", items: swot.threats, tone: "text-warning" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SectionCard,
    {
      title: "SWOT",
      description: "Strengths, weaknesses, opportunities, and threats for this business.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: quadrants.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border bg-muted/20 p-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: cn("text-sm font-semibold", q.tone), children: q.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: q.items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2 text-sm text-foreground/90",
                "data-ocid": `swot_item.${index + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-current" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item })
                ]
              },
              item
            )) })
          ]
        },
        q.title
      )) })
    }
  );
}
function RiskSection({ analysis }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SectionCard,
    {
      title: "Risk assessment",
      description: "Six risk categories with a level, WHY, and WHAT TO DO.",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2", children: analysis.result.risk.categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(RiskChip, { category }, category.category)) })
    }
  );
}
function NewAnalysisPage() {
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
  const [form, setForm] = reactExports.useState(() => ({
    village: (profile == null ? void 0 : profile.village) ?? "",
    block: (profile == null ? void 0 : profile.block) ?? "",
    district: (profile == null ? void 0 : profile.district) ?? "",
    state: (profile == null ? void 0 : profile.state) ?? "",
    category: (profile == null ? void 0 : profile.businessCategory) ?? "",
    capital: (profile == null ? void 0 : profile.expectedInvestment) ? String(profile.expectedInvestment) : ""
  }));
  const [errors, setErrors] = reactExports.useState({});
  const phase = running ? "analyzing" : current ? "result" : "form";
  reactExports.useEffect(() => {
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
        description: result.source === "demo" ? "Showing clearly-labelled DEMO DATA" : "Hyper-local analysis ready",
        variant: "success"
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
    toast
  ]);
  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (key in errors) {
      setErrors((prev) => ({ ...prev, [key]: void 0 }));
    }
  };
  const validate = (values) => {
    const next = {};
    if (!values.village.trim()) next.village = "Enter your village";
    if (!values.block.trim()) next.block = "Enter your block";
    if (!values.district.trim()) next.district = "Enter your district";
    if (!values.state.trim()) next.state = "Enter your state";
    if (!values.category) next.category = "Select a business category";
    if (!values.capital || toNumber(values.capital) <= 0)
      next.capital = "Enter a positive capital amount";
    return next;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(form);
    if (Object.keys(nextErrors).some((k) => nextErrors[k])) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setInput(toInput(form));
    start();
  };
  const handleRadiusChange = (nextRadius) => {
    setRadius(nextRadius);
    if (phase === "result" && input) {
      start();
    }
  };
  const handleStartAnother = () => {
    reset();
    setForm({
      village: (profile == null ? void 0 : profile.village) ?? "",
      block: (profile == null ? void 0 : profile.block) ?? "",
      district: (profile == null ? void 0 : profile.district) ?? "",
      state: (profile == null ? void 0 : profile.state) ?? "",
      category: (profile == null ? void 0 : profile.businessCategory) ?? "",
      capital: (profile == null ? void 0 : profile.expectedInvestment) ? String(profile.expectedInvestment) : ""
    });
    setErrors({});
  };
  const handleCancel = () => {
    reset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold tracking-tight md:text-4xl", children: "New Analysis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: "Run a hyper-local market analysis for your village, block, district, and state. UdyamAI estimates reach, demand, competition, pricing, and risk at a 5 km or 10 km radius." })
    ] }),
    phase === "form" ? /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: handleSubmit, noValidate: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Your location & business" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Tell us where you are and what you plan to build. We prefill from your profile where available." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "village",
              label: "Village",
              placeholder: "Rampur",
              value: form.village,
              onChange: (e) => setField("village", e.target.value),
              error: errors.village,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
              "data-ocid": "village_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "block",
              label: "Block",
              placeholder: "Khairagarh",
              value: form.block,
              onChange: (e) => setField("block", e.target.value),
              error: errors.block,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
              "data-ocid": "block_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "district",
              label: "District",
              placeholder: "Rajpur",
              value: form.district,
              onChange: (e) => setField("district", e.target.value),
              error: errors.district,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
              "data-ocid": "district_input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputField,
            {
              id: "state",
              label: "State",
              placeholder: "Madhya Pradesh",
              value: form.state,
              onChange: (e) => setField("state", e.target.value),
              error: errors.state,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
              "data-ocid": "state_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "mb-3 text-sm font-medium text-foreground", children: "Business category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: BUSINESS_CATEGORIES.map((cat) => {
            const selected = form.category === cat.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setField("category", cat.id),
                "aria-pressed": selected,
                className: cn(
                  "flex min-w-0 flex-col items-start gap-1 rounded-xl border p-3 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border bg-background hover:bg-accent"
                ),
                "data-ocid": "category_option",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", "aria-hidden": "true", children: cat.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium leading-tight text-foreground", children: cat.name })
                ]
              },
              cat.id
            );
          }) }),
          errors.category ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-2 text-xs font-medium text-destructive",
              "data-ocid": "input_error",
              children: errors.category
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputField,
          {
            id: "capital",
            label: "Capital you plan to invest",
            type: "number",
            inputMode: "numeric",
            min: 0,
            placeholder: "250000",
            value: form.capital,
            onChange: (e) => setField("capital", e.target.value),
            error: errors.capital,
            hint: "Total capital you plan to invest",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "size-4" }),
            "data-ocid": "capital_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-xl border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Analysis radius" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "How far around your village to scan for market and competitors." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "fieldset",
            {
              className: "flex items-center rounded-full border border-border bg-background p-0.5",
              "aria-label": "Analysis radius",
              "data-ocid": "radius_toggle",
              children: ["5km", "10km"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setRadius(r),
                  "aria-pressed": radius === r,
                  className: cn(
                    "rounded-full px-4 py-1.5 text-sm font-semibold transition-smooth",
                    radius === r ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  ),
                  "data-ocid": `radius_toggle.${r}`,
                  children: r
                },
                r
              ))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 p-6 pt-0 sm:flex-row sm:items-center sm:justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: backendAvailable ? "Connected to backend" : "Backend unavailable — results will be clearly-labelled DEMO DATA" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            size: "lg",
            className: "w-full sm:w-auto",
            "data-ocid": "start_analysis_button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
              "Start analysis"
            ]
          }
        )
      ] })
    ] }) }) : null,
    phase === "analyzing" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "loading_state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center gap-6 py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold tracking-tight", children: "Analysing your market…" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: ANALYSIS_STAGES[Math.min(stage, ANALYSIS_STAGES.length - 1)] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisProgress, { stage, className: "w-full max-w-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "ghost",
          onClick: handleCancel,
          "data-ocid": "cancel_analysis_button",
          children: "Cancel"
        }
      )
    ] }) }) : null,
    phase === "result" && current ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "success_state", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            source === "demo" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }),
              DEMO_BADGE
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-success/15 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-success", children: "Live data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary", children: [
              current.radius,
              " radius"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "mt-3", children: [
            categoryName(current.input.category),
            " ",
            "Market Analysis"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
            locationLabel(current.input),
            " · Capital",
            " ",
            formatINR(current.input.capital)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScoreCard,
              {
                score: current.result.scores.demand.score,
                label: "Demand",
                explanation: current.result.scores.demand.explanation,
                reasoning: current.result.scores.demand.reasoning,
                provenance: current.result.scores.demand.provenance,
                confidence: current.result.scores.demand.confidence,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScoreCard,
              {
                score: current.result.scores.supplyGap.score,
                label: "Supply Gap",
                explanation: current.result.scores.supplyGap.explanation,
                reasoning: current.result.scores.supplyGap.reasoning,
                provenance: current.result.scores.supplyGap.provenance,
                confidence: current.result.scores.supplyGap.confidence,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScoreCard,
              {
                score: current.result.scores.competition.score,
                label: "Competition",
                explanation: current.result.scores.competition.explanation,
                reasoning: current.result.scores.competition.reasoning,
                provenance: current.result.scores.competition.provenance,
                confidence: current.result.scores.competition.confidence,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScoreCard,
              {
                score: current.result.scores.opportunity.score,
                label: "Opportunity",
                explanation: current.result.scores.opportunity.explanation,
                reasoning: current.result.scores.opportunity.reasoning,
                provenance: current.result.scores.opportunity.provenance,
                confidence: current.result.scores.opportunity.confidence,
                size: "sm"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                size: "lg",
                className: "w-full sm:w-auto",
                onClick: () => navigate({ to: "/assistant" }),
                "data-ocid": "ask_assistant_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
                  "Ask UdyamAI about this"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "lg",
                className: "w-full sm:w-auto",
                onClick: handleStartAnother,
                "data-ocid": "start_another_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" }),
                  "Start another analysis"
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MapCard,
        {
          title: "Competitor map",
          location: locationLabel(current.input),
          mapData: current.result.map,
          radius,
          onRadiusChange: handleRadiusChange
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarketReachSection, { analysis: current }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PricingSection, { analysis: current }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SwotSection, { analysis: current }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiskSection, { analysis: current }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2 rounded-2xl border border-border bg-muted/20 p-6 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-6 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl text-sm text-muted-foreground", children: source === "demo" ? "This report uses clearly-labelled DEMO DATA for illustration. Real-world data is never faked — connect the backend for live market intelligence." : "This report uses live data from the backend." })
      ] })
    ] }) : null
  ] });
}
export {
  NewAnalysisPage as default
};
