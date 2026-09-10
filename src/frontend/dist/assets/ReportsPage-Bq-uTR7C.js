import { b as useToast, r as reactExports, j as jsxRuntimeExports, d as FileText, a as cn, T as TrendingUp } from "./index-CeuI7PIL.js";
import { C as Card, B as Button } from "./Card-DVJtgs4C.js";
import { E as EmptyState } from "./EmptyState-C6jqOqL3.js";
import { M as Modal } from "./Modal-Bsxsao5R.js";
import { R as ReportCard } from "./ReportCard-DiNlG9TV.js";
import { R as RiskBadge } from "./RiskBadge-BYdnakte.js";
import { S as Skeleton } from "./skeleton-BewGAZNP.js";
import { g as DEMO_REPORTS, b as DEMO_ANALYSES, d as DEMO_MARKET, h as DEMO_SCHEMES, f as formatINR, e as DEMO_FINANCE } from "./demo-data-CVHFmdt3.js";
import { R as RefreshCw } from "./refresh-cw-CF1KA8lM.js";
import { S as Search } from "./search-BZc2ozNO.js";
const typeLabels = {
  analysis: "Analysis",
  finance: "Finance",
  market: "Market",
  scheme: "Schemes",
  "what-if": "What-if"
};
const typeFilters = [
  { value: "all", label: "All" },
  { value: "analysis", label: "Analysis" },
  { value: "finance", label: "Finance" },
  { value: "market", label: "Market" },
  { value: "scheme", label: "Schemes" }
];
function formatDate(timestamp) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}
function DetailRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-3.5 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-xs font-medium text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right text-sm font-semibold text-foreground", children: value })
  ] });
}
function ReportDetail({
  report,
  onClose
}) {
  const analysis = DEMO_ANALYSES.find((a) => a.id === report.sourceId);
  const market = DEMO_MARKET.find((m) => m.id === report.sourceId);
  const scheme = DEMO_SCHEMES.find((s) => s.id === report.sourceId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open: true,
      onClose,
      title: report.title,
      description: `${typeLabels[report.type]} report · ${formatDate(report.createdAt)}`,
      footer: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: onClose,
          "data-ocid": "report_detail_close_button",
          children: "Close"
        }
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm leading-relaxed text-muted-foreground", children: report.summary })
        ] }),
        report.type === "analysis" && analysis ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-3xl font-bold tracking-tight text-gradient", children: analysis.score }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { risk: analysis.risk })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Category", value: analysis.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Status", value: analysis.status })
          ] })
        ] }) : null,
        report.type === "finance" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Monthly Revenue",
              value: formatINR(DEMO_FINANCE.monthlyRevenue)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Monthly Expenses",
              value: formatINR(DEMO_FINANCE.monthlyExpenses)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Monthly Profit",
              value: formatINR(DEMO_FINANCE.monthlyProfit)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Profit Margin",
              value: `${DEMO_FINANCE.profitMargin}%`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Break-even",
              value: `${DEMO_FINANCE.breakEvenMonths} months`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Cash Reserve",
              value: formatINR(DEMO_FINANCE.cashReserve)
            }
          )
        ] }) : null,
        report.type === "market" && market ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4 text-primary" }),
            market.seasonality
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Demand", value: `${market.demand}/100` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                label: "Competition",
                value: `${market.competition}/100`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Growth", value: `${market.growth}%` })
          ] })
        ] }) : null,
        report.type === "scheme" && scheme ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground", children: scheme.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: scheme.provider })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Benefit", value: scheme.benefit }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DetailRow,
              {
                label: "Max Amount",
                value: formatINR(scheme.maxAmount)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Interest", value: scheme.interestRate }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DetailRow, { label: "Match", value: `${scheme.matchScore}%` })
          ] })
        ] }) : null,
        report.type === "what-if" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: "This what-if scenario report is not yet available. Run a scenario in the What-if Lab to generate it." }) : null
      ] })
    }
  );
}
function ReportsPage() {
  const { toast } = useToast();
  const [reports, setReports] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const [typeFilter, setTypeFilter] = reactExports.useState("all");
  const load = reactExports.useCallback(() => {
    setError(null);
    setReports(null);
    window.setTimeout(() => {
      setReports(DEMO_REPORTS);
    }, 700);
  }, []);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  const filtered = reactExports.useMemo(() => {
    if (!reports) return [];
    const q = query.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesType = typeFilter === "all" || r.type === typeFilter;
      const matchesQuery = !q || r.title.toLowerCase().includes(q) || typeLabels[r.type].toLowerCase().includes(q);
      return matchesType && matchesQuery;
    });
  }, [reports, query, typeFilter]);
  const handleDownload = reactExports.useCallback(
    (report) => {
      toast({
        title: "Report ready",
        description: `${report.title} has been queued for download.`,
        variant: "success"
      });
    },
    [toast]
  );
  const isLoading = reports === null && error === null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground sm:text-base", children: "Access and download your analysis, finance, market, and scheme reports." })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "loading_state", "aria-busy": "true", children: Array.from({ length: 4 }, (_, i) => `skeleton-${i}`).map((id) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "flex items-center gap-4 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-11 shrink-0 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-20 rounded-full" })
    ] }, id)) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Couldn't load your reports",
        description: error,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-6" }),
        actionLabel: "Try again",
        onAction: load,
        "data-ocid": "error_state"
      }
    ) : reports && reports.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No reports yet",
        description: "Your saved analysis, finance, market, and scheme reports will appear here.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-6" }),
        "data-ocid": "empty_state"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            value: query,
            onChange: (e) => setQuery(e.target.value),
            placeholder: "Search reports",
            "aria-label": "Search reports",
            className: "h-11 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm text-foreground outline-none transition-smooth placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring",
            "data-ocid": "report_search_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "mb-5 flex gap-2 overflow-x-auto pb-1",
          role: "tablist",
          "aria-label": "Filter reports by type",
          "data-ocid": "report_filter_tabs",
          children: typeFilters.map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              role: "tab",
              "aria-selected": typeFilter === filter.value,
              onClick: () => setTypeFilter(filter.value),
              className: cn(
                "shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                typeFilter === filter.value ? "border-transparent bg-gradient-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              ),
              "data-ocid": `report_filter_tab_${filter.value}`,
              children: filter.label
            },
            filter.value
          ))
        }
      ),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          title: "No matching reports",
          description: "Nothing matched your search. Try a different term or filter.",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-6" }),
          "data-ocid": "empty_state"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", "data-ocid": "report_list", children: filtered.map((report) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ReportCard,
        {
          report,
          onOpen: setSelected,
          onDownload: handleDownload
        },
        report.id
      )) })
    ] }),
    selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(ReportDetail, { report: selected, onClose: () => setSelected(null) }) : null
  ] });
}
export {
  ReportsPage as default
};
