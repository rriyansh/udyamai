import { c as createLucideIcon, b as useToast, r as reactExports, j as jsxRuntimeExports, B as BadgePercent, S as Sparkles, d as FileText, C as CircleCheck } from "./index-CeuI7PIL.js";
import { C as Card, B as Button } from "./Card-DVJtgs4C.js";
import { E as ExplainPanel } from "./ExplainPanel-BvK1N_-T.js";
import { E as EmptyState } from "./EmptyState-C6jqOqL3.js";
import { M as Modal } from "./Modal-Bsxsao5R.js";
import { a as useRouteSchemes, B as Building2 } from "./useQueries-CxLdcEDA.js";
import { B as BUSINESS_CATEGORIES, f as formatINR } from "./demo-data-CVHFmdt3.js";
import { L as Landmark } from "./landmark-BbPb-8At.js";
import { S as Search } from "./search-BZc2ozNO.js";
import { C as CalendarClock } from "./calendar-clock-DKMvRbVq.js";
import "./circle-help-DThjCgsP.js";
import "./api-client-DE3CIaVf.js";
import "./analysis-engine-DtVfTxoQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode);
const FALLBACK_SCHEMES = [
  {
    id: 1,
    category: "food-processing",
    name: "PM Formalisation of Micro Food Processing Enterprises",
    eligibility: "Individual micro food processing units",
    beneficiaryType: "Individual",
    projectCostRange: { min: 1e5, max: 1e6 },
    loanPercentage: 65,
    interestRate: 7,
    tenureMonths: 60,
    moratoriumMonths: 6,
    marginRequirement: 35,
    documents: ["Aadhaar card", "Bank account details", "Project report"],
    officialSource: "Ministry of Food Processing Industries",
    lastVerifiedDate: 1725e9,
    status: "Active"
  },
  {
    id: 2,
    category: "dairy",
    name: "National Livestock Mission",
    eligibility: "Dairy farmers and producer groups",
    beneficiaryType: "Individual",
    projectCostRange: { min: 5e4, max: 5e5 },
    loanPercentage: 75,
    interestRate: 6,
    tenureMonths: 60,
    moratoriumMonths: 12,
    marginRequirement: 25,
    documents: ["Aadhaar card", "Bank account details", "Land records"],
    officialSource: "Department of Animal Husbandry & Dairying",
    lastVerifiedDate: 1724e9,
    status: "Active"
  },
  {
    id: 3,
    category: "general",
    name: "PMEGP (Prime Minister's Employment Generation Programme)",
    eligibility: "New micro enterprises in rural areas",
    beneficiaryType: "Individual",
    projectCostRange: { min: 1e5, max: 25e5 },
    loanPercentage: 75,
    interestRate: 8,
    tenureMonths: 84,
    moratoriumMonths: 6,
    marginRequirement: 25,
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Project report",
      "Educational qualification"
    ],
    officialSource: "Khadi and Village Industries Commission (KVIC)",
    lastVerifiedDate: 1723e9,
    status: "Active"
  },
  {
    id: 4,
    category: "fisheries",
    name: "Pradhan Mantri Matsya Sampada Yojana",
    eligibility: "Fish farmers and aquaculture units",
    beneficiaryType: "Individual",
    projectCostRange: { min: 1e5, max: 2e6 },
    loanPercentage: 60,
    interestRate: 7,
    tenureMonths: 60,
    moratoriumMonths: 12,
    marginRequirement: 40,
    documents: ["Aadhaar card", "Bank account details", "Pond or land records"],
    officialSource: "Department of Fisheries",
    lastVerifiedDate: 1722e9,
    status: "Active"
  },
  {
    id: 5,
    category: "poultry",
    name: "Poultry Venture Capital Fund",
    eligibility: "Poultry farmers and entrepreneurs",
    beneficiaryType: "Individual",
    projectCostRange: { min: 5e4, max: 1e6 },
    loanPercentage: 75,
    interestRate: 7,
    tenureMonths: 60,
    moratoriumMonths: 6,
    marginRequirement: 25,
    documents: ["Aadhaar card", "Bank account details", "Project report"],
    officialSource: "Department of Animal Husbandry & Dairying",
    lastVerifiedDate: 1721e9,
    status: "Active"
  }
];
const BENEFICIARY_CATEGORIES = [
  "Individual",
  "Women",
  "SC/ST",
  "Farmer Producer Organisation",
  "Self Help Group"
];
const DEFAULT_INPUT = {
  projectCost: 0,
  businessCategory: "dairy",
  beneficiaryCategory: "Individual",
  contribution: 0,
  location: ""
};
function toMatch(s, input) {
  const loan = s.loanPercentage !== void 0 ? Math.round(input.projectCost * (s.loanPercentage / 100)) : void 0;
  const contribution = s.marginRequirement !== void 0 ? Math.round(input.projectCost * (s.marginRequirement / 100)) : void 0;
  return {
    scheme: {
      id: s.id,
      name: s.name,
      eligibility: s.eligibility,
      beneficiaryType: s.beneficiaryType,
      projectCostRange: s.projectCostRange,
      loanPercentage: s.loanPercentage,
      interestRate: s.interestRate,
      tenureMonths: s.tenureMonths,
      moratoriumMonths: s.moratoriumMonths,
      marginRequirement: s.marginRequirement,
      documents: s.documents,
      officialSource: s.officialSource,
      lastVerifiedDate: s.lastVerifiedDate,
      status: s.status
    },
    whyMayFit: `Your ${input.businessCategory} business fits this scheme's project cost range of ${formatINR(
      s.projectCostRange.min
    )} to ${formatINR(s.projectCostRange.max)}.`,
    projectCostLimit: s.projectCostRange,
    contribution,
    loan,
    interestRate: s.interestRate,
    tenureMonths: s.tenureMonths,
    moratoriumMonths: s.moratoriumMonths,
    requiredDocuments: s.documents,
    officialVerificationNote: `Verify current terms and documents on the official ${s.officialSource} portal before applying.`
  };
}
function routeClientSide(input) {
  const category = input.businessCategory.toLowerCase();
  const matches = FALLBACK_SCHEMES.filter((s) => {
    const inCategory = s.category === category || s.category === "general";
    const inRange = input.projectCost >= s.projectCostRange.min && input.projectCost <= s.projectCostRange.max;
    return inCategory && inRange;
  }).map((s) => toMatch(s, input));
  return { heading: "Potentially applicable schemes", matches };
}
function formatVerifiedDate(ts) {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "Not available";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function statusLabel(status) {
  return status === "Active" ? "Active" : status === "Inactive" ? "Inactive" : "Under review";
}
const EXPLANATIONS = [
  {
    term: "Margin",
    text: "Margin is the part of the project cost you pay from your own money. The rest is covered by the loan. A higher margin means you need to arrange more of your own funds."
  },
  {
    term: "Project cost",
    text: "Project cost is the total money needed to set up your business — buying equipment, building, raw material, and other one-time expenses."
  },
  {
    term: "Loan",
    text: "A loan is money a bank or scheme gives you that you must pay back over time, with interest. The scheme may cover part of your project cost as a loan."
  },
  {
    term: "Interest",
    text: "Interest is the extra money you pay for borrowing a loan. It is usually shown as a percentage per year. Lower interest means you pay back less extra money."
  },
  {
    term: "Moratorium",
    text: "Moratorium is a waiting period after the loan is given when you do not have to pay the monthly instalment. Interest still adds up during this time."
  },
  {
    term: "Subsidy",
    text: "A subsidy is money the government gives to reduce your cost. It is not a loan — you do not have to pay it back. It lowers how much you need to arrange yourself."
  },
  {
    term: "Collateral",
    text: "Collateral is a valuable asset, like land or property, that you keep as a guarantee for a loan. If you cannot repay, the lender can use it to recover the money."
  }
];
const inputClass = "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";
function SchemesPage() {
  var _a;
  const { toast } = useToast();
  const [query, setQuery] = reactExports.useState("");
  const [selected, setSelected] = reactExports.useState(null);
  const [input, setInput] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    businessCategory: "dairy",
    projectCost: "250000",
    location: "",
    beneficiaryCategory: "Individual",
    contribution: "100000"
  });
  const routeQuery = useRouteSchemes(input ?? DEFAULT_INPUT);
  const result = reactExports.useMemo(() => {
    var _a2;
    if (!input) return null;
    return ((_a2 = routeQuery.data) == null ? void 0 : _a2.data) ?? routeClientSide(input);
  }, [input, routeQuery.data]);
  const source = ((_a = routeQuery.data) == null ? void 0 : _a.source) ?? "demo";
  const filtered = reactExports.useMemo(() => {
    if (!result) return [];
    const q = query.trim().toLowerCase();
    if (!q) return result.matches;
    return result.matches.filter(
      (m) => m.scheme.name.toLowerCase().includes(q) || m.scheme.officialSource.toLowerCase().includes(q) || m.whyMayFit.toLowerCase().includes(q)
    );
  }, [result, query]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      businessCategory: form.businessCategory,
      projectCost: Number(form.projectCost) || 0,
      location: form.location.trim(),
      beneficiaryCategory: form.beneficiaryCategory,
      contribution: Number(form.contribution) || 0
    });
  };
  const handleReset = () => {
    setInput(null);
    setQuery("");
    setSelected(null);
  };
  const handleSelect = (match) => {
    setSelected(match);
  };
  const handleApply = () => {
    if (!selected) return;
    toast({
      title: "Application link ready",
      description: `${selected.scheme.name} — open the official portal to apply.`,
      variant: "info"
    });
    setSelected(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "flex flex-col gap-4", "data-ocid": "schemes_header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgePercent, { className: "size-5", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: "Government Schemes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "Schemes that may fit your business — always confirm on the official portal" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-6 p-5 sm:p-6", "data-ocid": "scheme_routing_form", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-4", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold tracking-tight", children: "Find schemes for your business" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter your business details to see schemes that may apply." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "scheme-category",
              className: "text-sm font-medium text-foreground",
              children: "Business category"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "scheme-category",
              value: form.businessCategory,
              onChange: (e) => setForm((f) => ({ ...f, businessCategory: e.target.value })),
              className: inputClass,
              "data-ocid": "scheme_category_select",
              children: BUSINESS_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c.id, children: c.name }, c.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "scheme-cost",
              className: "text-sm font-medium text-foreground",
              children: "Project cost (₹)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "scheme-cost",
              type: "number",
              min: 0,
              step: 1e3,
              value: form.projectCost,
              onChange: (e) => setForm((f) => ({ ...f, projectCost: e.target.value })),
              placeholder: "e.g. 250000",
              className: inputClass,
              "data-ocid": "scheme_cost_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "scheme-location",
              className: "text-sm font-medium text-foreground",
              children: "Location (village / district)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "scheme-location",
              type: "text",
              value: form.location,
              onChange: (e) => setForm((f) => ({ ...f, location: e.target.value })),
              placeholder: "e.g. Rampur, Rajpur",
              className: inputClass,
              "data-ocid": "scheme_location_input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "scheme-beneficiary",
              className: "text-sm font-medium text-foreground",
              children: "Beneficiary category"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "scheme-beneficiary",
              value: form.beneficiaryCategory,
              onChange: (e) => setForm((f) => ({
                ...f,
                beneficiaryCategory: e.target.value
              })),
              className: inputClass,
              "data-ocid": "scheme_beneficiary_select",
              children: BENEFICIARY_CATEGORIES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: b, children: b }, b))
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "scheme-contribution",
              className: "text-sm font-medium text-foreground",
              children: "Your contribution (₹)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "scheme-contribution",
              type: "number",
              min: 0,
              step: 1e3,
              value: form.contribution,
              onChange: (e) => setForm((f) => ({ ...f, contribution: e.target.value })),
              placeholder: "e.g. 100000",
              className: inputClass,
              "data-ocid": "scheme_contribution_input"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            "data-ocid": "scheme_find_button",
            className: "min-w-40",
            children: "Find schemes"
          }
        ),
        input ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            onClick: handleReset,
            "data-ocid": "scheme_reset_button",
            children: "Reset"
          }
        ) : null
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "scheme-search", className: "sr-only", children: "Search schemes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground",
            "aria-hidden": true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "scheme-search",
            type: "search",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Search by name, provider, or reason…",
            className: "h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "data-ocid": "scheme_search_input"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: !input ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Enter your business details",
        description: "Fill in the form above and press 'Find schemes' to see government schemes that may apply to your business.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-6" }),
        "data-ocid": "schemes_empty_state"
      }
    ) : routeQuery.isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
        "data-ocid": "schemes_loading_state",
        "aria-busy": "true",
        "aria-label": "Loading schemes",
        children: Array.from({ length: 6 }, (_, i) => `scheme-skeleton-${i}`).map(
          (id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "animate-pulse-soft rounded-2xl border border-border bg-card p-5",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 animate-pulse-soft rounded-full bg-muted" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-16 animate-pulse-soft rounded-full bg-muted" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-5 w-3/4 animate-pulse-soft rounded-lg bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-3 w-1/2 animate-pulse-soft rounded bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-3 w-full animate-pulse-soft rounded bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-3 w-5/6 animate-pulse-soft rounded bg-muted" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 animate-pulse-soft rounded-xl bg-muted/60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 animate-pulse-soft rounded-xl bg-muted/60" })
                ] })
              ]
            },
            id
          )
        )
      }
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No schemes found",
        description: query ? `No schemes match "${query}". Try a different search term or clear the filter.` : "No schemes matched your business details. Try a different category or project cost.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-6" }),
        actionLabel: query ? "Clear search" : "Reset details",
        onAction: query ? () => setQuery("") : handleReset,
        "data-ocid": "schemes_empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5", "aria-hidden": true }),
          "Potentially applicable"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: source === "backend" ? "Live scheme data" : "Demo estimate — verify on the official portal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
          "data-ocid": "schemes_list",
          children: filtered.map((match, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            SchemeMatchCard,
            {
              match,
              index: i,
              onSelect: handleSelect
            },
            match.scheme.id
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col gap-3 p-5 sm:flex-row sm:items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-5", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground", children: "Potentially applicable, not guaranteed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: "These schemes may fit your business, but final eligibility is decided by the official scheme authority. Always confirm current terms and documents on the official portal before applying." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold tracking-tight text-foreground", children: "What does this mean?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Plain-language explanations of the terms used on this page." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid gap-4 sm:grid-cols-2", children: EXPLANATIONS.map((ex) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExplainPanel, { title: ex.term, children: ex.text }, ex.term)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: selected !== null,
        onClose: () => setSelected(null),
        title: (selected == null ? void 0 : selected.scheme.name) ?? "",
        description: selected == null ? void 0 : selected.scheme.officialSource,
        footer: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => setSelected(null),
              "data-ocid": "scheme_modal_cancel_button",
              children: "Close"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: handleApply,
              "data-ocid": "scheme_apply_button",
              children: "Apply"
            }
          )
        ] }),
        children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(SchemeDetail, { match: selected }) : null
      }
    )
  ] });
}
function SchemeMatchCard({
  match,
  index,
  onSelect
}) {
  const { scheme } = match;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex flex-col p-5 transition-smooth hover:shadow-elevated", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BadgePercent, { className: "size-5", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary", children: "Potentially applicable" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-display text-base font-semibold tracking-tight", children: scheme.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "size-3.5", "aria-hidden": true }),
      scheme.officialSource
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-foreground/85", children: match.whyMayFit }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Project cost limit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
          formatINR(match.projectCostLimit.min),
          " –",
          " ",
          formatINR(match.projectCostLimit.max)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Loan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: match.loan !== void 0 ? formatINR(match.loan) : "Not specified" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        variant: "secondary",
        size: "sm",
        className: "mt-4 w-full",
        onClick: () => onSelect(match),
        "data-ocid": `scheme_item.${index + 1}.select_button`,
        children: "View details"
      }
    )
  ] });
}
function SchemeDetail({ match }) {
  const { scheme } = match;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary", children: "Potentially applicable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground", children: statusLabel(scheme.status) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/85", children: match.whyMayFit }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Project cost limit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-medium text-foreground", children: [
          formatINR(match.projectCostLimit.min),
          " –",
          " ",
          formatINR(match.projectCostLimit.max)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Contribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: match.contribution !== void 0 ? formatINR(match.contribution) : "Not specified" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Loan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: match.loan !== void 0 ? formatINR(match.loan) : "Not specified" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Interest" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: match.interestRate !== void 0 ? `${match.interestRate}% p.a.` : "Not specified" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tenure" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: match.tenureMonths !== void 0 ? `${match.tenureMonths} months` : "Not specified" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Moratorium" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground", children: match.moratoriumMonths !== void 0 ? `${match.moratoriumMonths} months` : "Not specified" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5", "aria-hidden": true }),
        "Required documents"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1.5", children: match.requiredDocuments.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "li",
        {
          className: "flex items-start gap-2 text-sm text-foreground",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleCheck,
              {
                className: "mt-0.5 size-3.5 shrink-0 text-success",
                "aria-hidden": true
              }
            ),
            doc
          ]
        },
        doc
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-3.5", "aria-hidden": true }),
        "Eligibility"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-foreground", children: scheme.eligibility })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarClock, { className: "size-3.5", "aria-hidden": true }),
      "Last verified: ",
      formatVerifiedDate(scheme.lastVerifiedDate)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-start gap-2 rounded-xl bg-success/10 p-3 text-xs text-success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mt-0.5 size-3.5 shrink-0", "aria-hidden": true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: match.officialVerificationNote })
    ] })
  ] });
}
export {
  SchemesPage as default
};
