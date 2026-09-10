import { c as createLucideIcon, j as jsxRuntimeExports, d as FileText, a as cn } from "./index-CeuI7PIL.js";
import { C as Card, B as Button } from "./Card-DVJtgs4C.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode);
const typeLabels = {
  analysis: "Analysis",
  finance: "Finance",
  market: "Market",
  scheme: "Schemes",
  "what-if": "What-if"
};
function ReportCard({
  report,
  onOpen,
  onDownload,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Card,
    {
      className: cn(
        "flex items-center gap-4 p-4 transition-smooth hover:shadow-elevated",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "truncate font-display text-sm font-semibold tracking-tight", children: report.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-muted px-2 py-0.5 font-medium", children: typeLabels[report.type] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: report.summary })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex shrink-0 items-center gap-1.5", children: [
          onDownload ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "icon",
              onClick: () => onDownload(report),
              "aria-label": `Download ${report.title}`,
              "data-ocid": "report_download_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" })
            }
          ) : null,
          onOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: () => onOpen(report),
              "data-ocid": "report_open_button",
              children: "Open"
            }
          ) : null
        ] })
      ]
    }
  );
}
export {
  ReportCard as R
};
