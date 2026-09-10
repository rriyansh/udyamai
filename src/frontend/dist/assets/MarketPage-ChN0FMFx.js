import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, S as Sparkles, W as Wallet, a as cn } from "./index-CeuI7PIL.js";
import { B as Button, C as Card, b as CardHeader, c as CardTitle, d as CardDescription, a as CardContent } from "./Card-DVJtgs4C.js";
import { E as EstimateBadge } from "./EstimateBadge-BwLRuXD6.js";
import { M as MapCard, R as RiskChip } from "./RiskChip-CCk-rSL3.js";
import { S as ScoreCard } from "./ScoreCard-Cgag5e6a.js";
import { g as generateDemoAnalysis } from "./analysis-engine-DtVfTxoQ.js";
import { u as useAnalysisStore } from "./analysis-store-Dq7fPPtV.js";
import { a as DEMO_BADGE } from "./demo-data-CVHFmdt3.js";
import { u as useOnboardingStore } from "./onboarding-store-Z7WltxWC.js";
import { R as RefreshCw } from "./refresh-cw-CF1KA8lM.js";
import { R as Route, U as Users } from "./users-vPOE66yH.js";
import { G as Gauge } from "./gauge-DSKNVm9K.js";
import { M as MapPin } from "./map-pin-C-AVKAEB.js";
import "./RiskBadge-BYdnakte.js";
import "./WhyButton-Dlwr2uVe.js";
import "./circle-help-DThjCgsP.js";
import "./chevron-down-HMfNLb45.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z",
      key: "lc1i9w"
    }
  ],
  ["path", { d: "m7 16.5-4.74-2.85", key: "1o9zyk" }],
  ["path", { d: "m7 16.5 5-3", key: "va8pkn" }],
  ["path", { d: "M7 16.5v5.17", key: "jnp8gn" }],
  [
    "path",
    {
      d: "M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z",
      key: "8zsnat"
    }
  ],
  ["path", { d: "m17 16.5-5-3", key: "8arw3v" }],
  ["path", { d: "m17 16.5 4.74-2.85", key: "8rfmw" }],
  ["path", { d: "M17 16.5v5.17", key: "k6z78m" }],
  [
    "path",
    {
      d: "M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z",
      key: "1xygjf"
    }
  ],
  ["path", { d: "M12 8 7.26 5.15", key: "1vbdud" }],
  ["path", { d: "m12 8 4.74-2.85", key: "3rx089" }],
  ["path", { d: "M12 13.5V8", key: "1io7kd" }]
];
const Boxes = createLucideIcon("boxes", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",
      key: "1a0edw"
    }
  ],
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["polyline", { points: "3.29 7 12 12 20.71 7", key: "ousv84" }],
  ["path", { d: "m7.5 4.27 9 5.15", key: "1c824w" }]
];
const Package = createLucideIcon("package", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
function buildInput(profile) {
  return {
    village: (profile == null ? void 0 : profile.village) ?? "Rampur",
    block: (profile == null ? void 0 : profile.block) ?? "Khairagarh",
    district: (profile == null ? void 0 : profile.district) ?? "Rajpur",
    state: (profile == null ? void 0 : profile.state) ?? "Madhya Pradesh",
    category: (profile == null ? void 0 : profile.businessCategory) ?? "dairy",
    capital: (profile == null ? void 0 : profile.marginCapital) ?? 1e5
  };
}
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}
function formatPeople(value) {
  return `${value.toLocaleString("en-IN")} people`;
}
function ReachStat({
  label,
  value,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 font-display text-xl font-bold tracking-tight text-foreground", children: value })
  ] });
}
function ListBlock({
  title,
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-start gap-2 text-sm text-foreground/90",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }),
          item
        ]
      },
      item
    )) })
  ] });
}
function MarketReachSection({ analysis }) {
  const { market } = analysis.result;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "market_reach_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Market reach" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Estimated reach and customer base within the selected radius." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReachStat,
          {
            label: "Estimated reach",
            value: formatPeople(market.estimatedReach.value),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReachStat,
          {
            label: "Potential customers",
            value: market.potentialCustomerBase.value.toLocaleString("en-IN"),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReachStat,
          {
            label: "Competition level",
            value: market.competitionLevel,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReachStat,
          {
            label: "Accessibility",
            value: market.accessibility,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateBadge, { estimate: market.estimatedReach }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateBadge, { estimate: market.potentialCustomerBase })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90", children: market.accessibility }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListBlock, { title: "Nearby markets", items: market.nearbyMarkets }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ListBlock,
          {
            title: "Distribution channels",
            items: market.distributionChannels
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ListBlock,
          {
            title: "Underserved opportunities",
            items: market.underservedOpportunities
          }
        ),
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
    ] })
  ] });
}
function PricingRow({
  label,
  value,
  estimate,
  icon
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/20 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-foreground", children: icon }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
        estimate ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateBadge, { estimate }) }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "shrink-0 font-display text-base font-bold tracking-tight text-foreground", children: value })
  ] });
}
function PricingSection({ analysis }) {
  const { pricing } = analysis.result;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "pricing_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Pricing & costs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Competitor price range and estimated cost structure for your business." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Competitor min" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-xl font-bold text-foreground", children: formatINR(pricing.competitorPriceRange.min) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Competitor avg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-xl font-bold text-primary", children: formatINR(pricing.competitorPriceRange.avg) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Competitor max" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-xl font-bold text-foreground", children: formatINR(pricing.competitorPriceRange.max) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EstimateBadge,
        {
          estimate: {
            value: 0,
            provenance: "Observed",
            confidence: "Medium"
          }
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PricingRow,
          {
            label: "Production / service cost",
            value: formatINR(pricing.productionCost.value),
            estimate: pricing.productionCost,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PricingRow,
          {
            label: "Transport cost",
            value: formatINR(pricing.transportCost.value),
            estimate: pricing.transportCost,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PricingRow,
          {
            label: "Packaging cost",
            value: formatINR(pricing.packagingCost.value),
            estimate: pricing.packagingCost,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          PricingRow,
          {
            label: "Operating cost",
            value: formatINR(pricing.operatingCost.value),
            estimate: pricing.operatingCost,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-4" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-primary/30 bg-primary/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-primary", children: "Recommended price range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-display text-xl font-bold text-foreground", children: [
            formatINR(pricing.recommendedPriceRange.min),
            " –",
            " ",
            formatINR(pricing.recommendedPriceRange.max)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-success/30 bg-success/10 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-success", children: "Estimated margin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-display text-xl font-bold text-foreground", children: formatINR(pricing.estimatedMargin.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(EstimateBadge, { estimate: pricing.estimatedMargin }) })
        ] })
      ] })
    ] })
  ] });
}
function SwotQuadrant({
  title,
  items,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/20 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: cn("font-display text-sm font-bold tracking-tight", tone), children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-2", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: "flex items-start gap-2 text-sm leading-relaxed text-foreground/90",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-current opacity-60" }),
          item
        ]
      },
      item
    )) })
  ] });
}
function SwotSection({ analysis }) {
  const { swot } = analysis.result;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "swot_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "SWOT analysis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Strengths, weaknesses, opportunities, and threats for your business in this market." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "grid gap-4 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwotQuadrant,
        {
          title: "Strengths",
          items: swot.strengths,
          tone: "text-success"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwotQuadrant,
        {
          title: "Weaknesses",
          items: swot.weaknesses,
          tone: "text-warning"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwotQuadrant,
        {
          title: "Opportunities",
          items: swot.opportunities,
          tone: "text-primary"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwotQuadrant,
        {
          title: "Threats",
          items: swot.threats,
          tone: "text-destructive"
        }
      )
    ] })
  ] });
}
function RiskSection({ analysis }) {
  const { risk } = analysis.result;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "risk_section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Risk engine" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Six risk categories scored Low / Medium / High with a WHY and WHAT TO DO for each." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: risk.categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(RiskChip, { category }, category.category)) })
  ] });
}
function MarketPage() {
  const storeCurrent = useAnalysisStore((s) => s.current);
  const storeRadius = useAnalysisStore((s) => s.radius);
  const setStoreRadius = useAnalysisStore((s) => s.setRadius);
  const profile = useOnboardingStore((s) => s.profile);
  const [analysis, setAnalysis] = reactExports.useState(
    () => storeCurrent ?? generateDemoAnalysis(buildInput(profile), storeRadius)
  );
  const handleRadiusChange = (radius) => {
    setStoreRadius(radius);
    setAnalysis((prev) => ({
      ...generateDemoAnalysis(prev.input, radius),
      id: prev.id,
      createdAt: prev.createdAt
    }));
  };
  const { result } = analysis;
  const { scores, map } = result;
  const location = `${analysis.input.village}, ${analysis.input.block} · ${analysis.input.district}, ${analysis.input.state}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }),
          DEMO_BADGE
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl", children: "Market Intelligence" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 max-w-xl text-sm text-muted-foreground", children: [
          "Hyper-local analysis for your business near ",
          location,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: () => window.location.reload(),
          "data-ocid": "market_refresh_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
        "aria-label": "Market score cards",
        "data-ocid": "score_cards",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreCard,
            {
              score: scores.demand.score,
              label: "Demand",
              explanation: scores.demand.explanation,
              reasoning: scores.demand.reasoning,
              provenance: scores.demand.provenance,
              confidence: scores.demand.confidence
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreCard,
            {
              score: scores.supplyGap.score,
              label: "Supply Gap",
              explanation: scores.supplyGap.explanation,
              reasoning: scores.supplyGap.reasoning,
              provenance: scores.supplyGap.provenance,
              confidence: scores.supplyGap.confidence
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreCard,
            {
              score: scores.competition.score,
              label: "Competition",
              explanation: scores.competition.explanation,
              reasoning: scores.competition.reasoning,
              provenance: scores.competition.provenance,
              confidence: scores.competition.confidence
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScoreCard,
            {
              score: scores.opportunity.score,
              label: "Opportunity",
              explanation: scores.opportunity.explanation,
              reasoning: scores.opportunity.reasoning,
              provenance: scores.opportunity.provenance,
              confidence: scores.opportunity.confidence
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-label": "Competitor map", "data-ocid": "map_section", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      MapCard,
      {
        title: "Competitor map",
        location,
        mapData: map,
        radius: analysis.radius,
        onRadiusChange: handleRadiusChange
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MarketReachSection, { analysis }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PricingSection, { analysis }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SwotSection, { analysis }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RiskSection, { analysis })
  ] });
}
export {
  MarketPage as default
};
