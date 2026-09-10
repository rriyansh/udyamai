import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FolderOpen, a as cn } from "./index-CeuI7PIL.js";
import { C as Card, a as CardContent, B as Button } from "./Card-DVJtgs4C.js";
import { E as EmptyState } from "./EmptyState-C6jqOqL3.js";
import { M as Modal } from "./Modal-Bsxsao5R.js";
import { R as RiskBadge } from "./RiskBadge-BYdnakte.js";
import { S as ScoreCard } from "./ScoreCard-Cgag5e6a.js";
import { S as Skeleton } from "./skeleton-BewGAZNP.js";
import { b as DEMO_ANALYSES, c as categoryName } from "./demo-data-CVHFmdt3.js";
import { R as RefreshCw } from "./refresh-cw-CF1KA8lM.js";
import { S as Search } from "./search-BZc2ozNO.js";
import "./WhyButton-Dlwr2uVe.js";
import "./circle-help-DThjCgsP.js";
import "./chevron-down-HMfNLb45.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
const statusLabels = {
  completed: "Completed",
  "in-progress": "In progress",
  draft: "Draft"
};
const statusStyles = {
  completed: "bg-success/15 text-success",
  "in-progress": "bg-primary/15 text-primary",
  draft: "bg-muted text-muted-foreground"
};
function formatDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function AnalysisCard({
  analysis,
  onOpen
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "group cursor-pointer transition-smooth hover:shadow-elevated focus-within:ring-2 focus-within:ring-ring",
      "data-ocid": "analysis_card",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-base font-semibold tracking-tight text-foreground", children: analysis.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-muted-foreground", children: categoryName(analysis.category) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                statusStyles[analysis.status]
              ),
              children: statusLabels[analysis.status]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5" }),
            formatDate(analysis.createdAt)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { risk: analysis.risk }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold tracking-tight text-gradient", children: analysis.score })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "sm",
            className: "mt-4 w-full",
            onClick: onOpen,
            "data-ocid": "analysis_open_button",
            children: "View details"
          }
        )
      ] })
    }
  );
}
function AnalysisDetail({
  analysis,
  onClose
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: true,
      onClose,
      title: analysis.title,
      description: `${categoryName(analysis.category)} · ${formatDate(analysis.createdAt)}`,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "analysis_detail_close_button",
          children: "Close"
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScoreCard,
          {
            score: analysis.score,
            label: "Feasibility Score",
            risk: analysis.risk,
            size: "md"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: analysis.summary })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-medium text-muted-foreground", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-sm font-semibold text-foreground", children: statusLabels[analysis.status] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-medium text-muted-foreground", children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "mt-1 text-sm font-semibold text-foreground", children: categoryName(analysis.category) })
          ] })
        ] })
      ] })
    }
  );
}
function MyAnalysesPage() {
  const [analyses, setAnalyses] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const load = reactExports.useCallback(() => {
    setError(null);
    setAnalyses(null);
    window.setTimeout(() => {
      setAnalyses(DEMO_ANALYSES);
    }, 700);
  }, []);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  const filtered = reactExports.useMemo(() => {
    if (!analyses) return [];
    const q = query.trim().toLowerCase();
    if (!q) return analyses;
    return analyses.filter(
      (a) => a.title.toLowerCase().includes(q) || categoryName(a.category).toLowerCase().includes(q)
    );
  }, [analyses, query]);
  const isLoading = analyses === null && error === null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: "My Analyses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground sm:text-base", children: "Review the history of your business analyses and revisit past recommendations." })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid gap-4 sm:grid-cols-2",
        "data-ocid": "loading_state",
        "aria-busy": "true",
        "aria-label": "Loading analyses",
        children: Array.from({ length: 4 }, (_, i) => `skeleton-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "mt-4 h-9 w-full rounded-full" })
        ] }, id))
      }
    ) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Couldn't load your analyses",
        description: error,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-6" }),
        actionLabel: "Try again",
        onAction: load,
        "data-ocid": "error_state"
      }
    ) : analyses && analyses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No analyses yet",
        description: "Run your first business analysis to see it here with a feasibility score and recommendations.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "size-6" }),
        "data-ocid": "empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Search analyses",
            "aria-label": "Search analyses",
            className: "h-11 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm text-foreground outline-none transition-smooth placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "analysis_search_input"
          }
        )
      ] }),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No matching analyses",
          description: `Nothing matched "${query}". Try a different search term.`,
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-6" }),
          "data-ocid": "empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid gap-4 sm:grid-cols-2",
          "data-ocid": "analysis_list",
          children: filtered.map((analysis) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            AnalysisCard,
            {
              analysis,
              onOpen: () => setSelected(analysis)
            },
            analysis.id
          ))
        }
      )
    ] }),
    selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisDetail, { analysis: selected, onClose: () => setSelected(null) }) : null
  ] });
}
export {
  MyAnalysesPage as default
};
