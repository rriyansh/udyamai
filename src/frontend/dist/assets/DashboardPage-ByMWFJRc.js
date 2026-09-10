import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, b as useToast, r as reactExports, S as Sparkles, L as Link, T as TrendingUp, W as Wallet, B as BadgePercent, F as FolderOpen, d as FileText } from "./index-CeuI7PIL.js";
import { C as Card, B as Button, a as CardContent, b as CardHeader, c as CardTitle, d as CardDescription, e as CardFooter } from "./Card-DVJtgs4C.js";
import { E as EmptyState } from "./EmptyState-C6jqOqL3.js";
import { R as ReportCard } from "./ReportCard-DiNlG9TV.js";
import { R as RiskBadge } from "./RiskBadge-BYdnakte.js";
import { S as ScoreCard } from "./ScoreCard-Cgag5e6a.js";
import { S as Skeleton } from "./skeleton-BewGAZNP.js";
import { u as useAnalysisStore } from "./analysis-store-Dq7fPPtV.js";
import { D as DEMO_PROFILE, c as categoryName, a as DEMO_BADGE, b as DEMO_ANALYSES, d as DEMO_MARKET, e as DEMO_FINANCE, f as formatINR, g as DEMO_REPORTS } from "./demo-data-CVHFmdt3.js";
import { u as useOnboardingStore } from "./onboarding-store-Z7WltxWC.js";
import { A as ArrowRight } from "./arrow-right-B67F64zG.js";
import { L as Landmark } from "./landmark-BbPb-8At.js";
import { M as MapPin } from "./map-pin-C-AVKAEB.js";
import { C as CalendarClock } from "./calendar-clock-DKMvRbVq.js";
import { P as PiggyBank } from "./piggy-bank-DEiq_pp5.js";
import { B as Banknote } from "./banknote-CBLbyqp1.js";
import { R as Route, U as Users } from "./users-vPOE66yH.js";
import "./WhyButton-Dlwr2uVe.js";
import "./circle-help-DThjCgsP.js";
import "./chevron-down-HMfNLb45.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
];
const ArrowDownRight = createLucideIcon("arrow-down-right", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode$3);
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
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M19.07 4.93A10 10 0 0 0 6.99 3.34", key: "z3du51" }],
  ["path", { d: "M4 6h.01", key: "oypzma" }],
  ["path", { d: "M2.29 9.62A10 10 0 1 0 21.31 8.35", key: "qzzz0" }],
  ["path", { d: "M16.24 7.76A6 6 0 1 0 8.23 16.67", key: "1yjesh" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M17.99 11.66A6 6 0 0 1 15.77 16.67", key: "1u2y91" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "m13.41 10.59 5.66-5.66", key: "mhq4k0" }]
];
const Radar = createLucideIcon("radar", __iconNode);
function ChartCard({
  title,
  description,
  children,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: cn("p-6", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold tracking-tight", children: title }),
        description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: description }) : null
      ] }),
      action ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0", children: action }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children })
  ] });
}
function MetricCard({
  label,
  value,
  icon,
  trend,
  hint,
  className
}) {
  const positive = (trend ?? 0) >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn("p-5 transition-smooth hover:shadow-elevated", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: label }),
          icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent-foreground", children: icon }) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-display text-3xl font-bold tracking-tight text-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
          trend !== void 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold",
                positive ? "text-success" : "text-destructive"
              ),
              children: [
                positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "size-3.5" }),
                Math.abs(trend),
                "%"
              ]
            }
          ) : null,
          hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: hint }) : null
        ] })
      ]
    }
  );
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", "data-ocid": "dashboard_loading_state", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-56" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: Array.from({ length: 6 }, (_, i) => `skeleton-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-2xl" }, id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 lg:grid-cols-2", children: Array.from({ length: 2 }, (_, i) => `skeleton-lg-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-56 rounded-2xl" }, id)) })
  ] });
}
const riskChipStyles = {
  low: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive"
};
function HyperLocalSummaryCard({
  analysis,
  source
}) {
  const { input, radius, result } = analysis;
  const category = categoryName(input.category);
  const location = `${input.village}, ${input.block}, ${input.district}, ${input.state}`;
  const reach = result.market.estimatedReach;
  const demand = result.scores.demand.score;
  const opportunity = result.scores.opportunity.score;
  const topRisks = result.risk.categories.slice(0, 3);
  const isDemo = source === "demo";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", "data-ocid": "hyperlocal_summary_card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: "Hyper-Local Analysis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Latest market intelligence for your area" })
        ] })
      ] }),
      isDemo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-foreground",
          "data-ocid": "hyperlocal_demo_badge",
          children: DEMO_BADGE
        }
      ) : null
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold tracking-tight", children: category })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Location" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold tracking-tight", children: location })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Radius" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold tracking-tight", children: radius })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Market Reach",
            value: reach.value.toLocaleString("en-IN"),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
            hint: `${reach.provenance} · ${reach.confidence} confidence`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Demand Score",
            value: `${demand}%`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }),
            hint: "Local demand index"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Opportunity",
            value: `${opportunity}%`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "size-4" }),
            hint: "Viability signal"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Top Risks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: topRisks.map((risk) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
              riskChipStyles[risk.level]
            ),
            "data-ocid": "hyperlocal_risk_chip",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-current" }),
              risk.category
            ]
          },
          risk.category
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "flex flex-wrap gap-2 border-t border-border bg-muted/20 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "secondary",
          size: "sm",
          "data-ocid": "hyperlocal_market_link",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/market", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
            "View Market"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "hyperlocal_assistant_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/assistant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
        "Ask UdyamAI"
      ] }) })
    ] })
  ] });
}
function DashboardPage() {
  const { profile, completed, isDemo } = useOnboardingStore();
  const current = useAnalysisStore((s) => s.current);
  const analysisSource = useAnalysisStore((s) => s.source);
  const { toast } = useToast();
  const [status, setStatus] = reactExports.useState("loading");
  reactExports.useEffect(() => {
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
  const handleOpenReport = (report) => {
    toast({
      title: "Opening report",
      description: report.title,
      variant: "info"
    });
  };
  const handleDownloadReport = (report) => {
    toast({
      title: "Report ready",
      description: `${report.title} is being prepared for download.`,
      variant: "success"
    });
  };
  if (status === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {});
  }
  if (status === "error") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", "data-ocid": "dashboard_error_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Couldn't load your dashboard",
        description: "Something went wrong while fetching your business overview. Please try again.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-6" }),
        actionLabel: "Retry",
        onAction: () => setStatus("loading")
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-2xl font-bold tracking-tight sm:text-3xl", children: [
            "Welcome back, ",
            displayName
          ] }),
          usingDemo ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-flex items-center rounded-full bg-accent/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-accent-foreground",
              "data-ocid": "demo_badge",
              children: DEMO_BADGE
            }
          ) : null
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Here's how your ",
          category.toLowerCase(),
          " business is shaping up today."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "sm", "data-ocid": "new_analysis_button", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/new", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
        "New Analysis"
      ] }) })
    ] }),
    current ? /* @__PURE__ */ jsxRuntimeExports.jsx(HyperLocalSummaryCard, { analysis: current, source: analysisSource }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-gradient-primary text-primary-foreground",
        "data-ocid": "hyperlocal_cta_card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "size-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold tracking-tight", children: "Run a Hyper-Local Analysis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-primary-foreground/90", children: "Get market reach, demand, competition, and risk insights for your village at 5 km and 10 km radii." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "secondary",
              className: "shrink-0",
              "data-ocid": "hyperlocal_cta_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/new", children: [
                "Start analysis",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
              ] })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "grid gap-4 lg:grid-cols-3",
        "aria-label": "Business summary",
        "data-ocid": "business_summary_section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "lg:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Business Summary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your registered business profile at a glance." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Business Category" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-lg font-semibold tracking-tight", children: category })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Location" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-display text-lg font-semibold tracking-tight", children: location })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "size-5" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-widest text-muted-foreground", children: "Experience" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate font-display text-lg font-semibold tracking-tight", children: [
                    activeProfile.experienceYears,
                    " years"
                  ] })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Feasibility Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Estimated viability — not a final assessment." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "flex flex-1 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScoreCard,
              {
                score: (latestAnalysis == null ? void 0 : latestAnalysis.score) ?? 0,
                label: "Estimated Score",
                risk: latestAnalysis == null ? void 0 : latestAnalysis.risk,
                size: "md",
                className: "w-full border-0 shadow-none"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Placeholder estimate based on your profile. Run a full analysis for a detailed score." }) })
          ] })
        ]
      }
    ),
    latestAnalysis ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-ocid": "latest_analysis_card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Latest Analysis" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Your most recent viability assessment." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold tracking-tight", children: latestAnalysis.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { risk: latestAnalysis.risk })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: latestAnalysis.summary })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          asChild: true,
          variant: "secondary",
          size: "sm",
          "data-ocid": "view_analysis_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/analyses", children: [
            "View all analyses",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
          ] })
        }
      ) })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Market opportunity", "data-ocid": "market_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Market Opportunity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", "data-ocid": "market_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/market", children: [
          "Explore",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Demand",
            value: `${primaryMarket.demand}%`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }),
            hint: "Local demand index"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Competition",
            value: `${primaryMarket.competition}%`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-4" }),
            hint: "Nearby suppliers"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Growth",
            value: `${primaryMarket.growth}%`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }),
            trend: primaryMarket.growth,
            hint: "Yearly growth"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChartCard,
        {
          title: "Demand vs Competition",
          description: "Across your target categories",
          className: "mt-4",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", "data-ocid": "market_chart", children: DEMO_MARKET.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: categoryName(m.category) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                "Demand ",
                m.demand,
                "% · Competition ",
                m.competition,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-2.5 gap-1 overflow-hidden rounded-full bg-muted", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full bg-primary",
                  style: { width: `${m.demand}%` },
                  role: "img",
                  "aria-label": `${categoryName(m.category)} demand ${m.demand} percent`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full bg-accent",
                  style: { width: `${m.competition}%` },
                  role: "img",
                  "aria-label": `${categoryName(m.category)} competition ${m.competition} percent`
                }
              )
            ] })
          ] }, m.id)) })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Finance snapshot", "data-ocid": "finance_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Finance Snapshot" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", "data-ocid": "finance_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/finance", children: [
          "Details",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Monthly Profit",
            value: formatINR(DEMO_FINANCE.monthlyProfit),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "size-4" }),
            trend: DEMO_FINANCE.profitMargin,
            hint: "Profit margin"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Break-even",
            value: `${DEMO_FINANCE.breakEvenMonths} mo`,
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "size-4" }),
            hint: "To recover capital"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Cash Reserve",
            value: formatINR(DEMO_FINANCE.cashReserve),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PiggyBank, { className: "size-4" }),
            hint: "Available buffer"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Loan Requirement",
            value: formatINR(DEMO_FINANCE.loanRequirement),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "size-4" }),
            hint: "Estimated need"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Repayment Capacity",
            value: formatINR(DEMO_FINANCE.repaymentCapacity),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgePercent, { className: "size-4" }),
            hint: "Per month"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MetricCard,
          {
            label: "Monthly Revenue",
            value: formatINR(DEMO_FINANCE.monthlyRevenue),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }),
            hint: "Expected sales"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "bg-gradient-primary text-primary-foreground",
        "data-ocid": "next_step_card",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "size-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold tracking-tight", children: "Next Recommended Step" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-primary-foreground/90", children: "Run a fresh viability analysis to get an updated score and discover schemes matched to your profile." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "secondary",
              className: "shrink-0",
              "data-ocid": "next_step_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/new", children: [
                "Start analysis",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
              ] })
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Recent analyses", "data-ocid": "recent_analyses_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Recent Analyses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", "data-ocid": "analyses_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/analyses", children: [
          "View all",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] }) })
      ] }),
      DEMO_ANALYSES.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No analyses yet",
          description: "Run your first viability analysis to see recommendations here.",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "size-6" }),
          actionLabel: "New analysis",
          onAction: () => void 0
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", "data-ocid": "recent_analyses_list", children: DEMO_ANALYSES.map((analysis) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-4 transition-smooth hover:shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-sm font-semibold tracking-tight", children: analysis.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: categoryName(analysis.category) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-primary", children: analysis.score }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { risk: analysis.risk })
        ] })
      ] }) }) }, analysis.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Saved reports", "data-ocid": "saved_reports_section", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-bold tracking-tight", children: "Saved Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", "data-ocid": "reports_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/reports", children: [
          "View all",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
        ] }) })
      ] }),
      DEMO_REPORTS.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No saved reports",
          description: "Reports you generate will appear here for quick access.",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-6" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", "data-ocid": "saved_reports_list", children: DEMO_REPORTS.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReportCard,
        {
          report,
          onOpen: handleOpenReport,
          onDownload: handleDownloadReport
        }
      ) }, report.id)) })
    ] })
  ] });
}
export {
  DashboardPage as default
};
