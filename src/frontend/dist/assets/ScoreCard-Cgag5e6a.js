import { j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
import { C as Card } from "./Card-DVJtgs4C.js";
import { R as RiskBadge } from "./RiskBadge-BYdnakte.js";
import { W as WhyButton } from "./WhyButton-Dlwr2uVe.js";
const provenanceClass = {
  Estimated: "prov-estimated",
  Observed: "prov-observed",
  Calculated: "prov-calculated",
  UserProvided: "prov-user"
};
const confidenceClass = {
  High: "conf-high",
  Medium: "conf-medium",
  Low: "conf-low"
};
const provenanceLabel = {
  Estimated: "Estimated",
  Observed: "Observed",
  Calculated: "Calculated",
  UserProvided: "User Provided"
};
const sizeMap = {
  sm: { ring: "size-24", text: "text-2xl" },
  md: { ring: "size-32", text: "text-4xl" },
  lg: { ring: "size-40", text: "text-5xl" }
};
function ScoreCard({
  score,
  label = "Overall Score",
  risk,
  size = "md",
  explanation,
  reasoning,
  provenance,
  confidence,
  className
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const { ring, text } = sizeMap[size];
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - clamped / 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: cn("flex flex-col items-center gap-4 p-6", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 100 100",
          className: cn(ring, "-rotate-90"),
          role: "img",
          "aria-label": `${label}: ${clamped} out of 100`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "50",
                cy: "50",
                r: "45",
                fill: "none",
                strokeWidth: "8",
                className: "stroke-muted"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: "50",
                cy: "50",
                r: "45",
                fill: "none",
                strokeWidth: "8",
                strokeLinecap: "round",
                strokeDasharray: circumference,
                strokeDashoffset: offset,
                className: "stroke-primary transition-smooth"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "font-display font-bold tracking-tight text-gradient",
            text
          ),
          children: clamped
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: label }),
      risk ? /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBadge, { risk }) : null,
      provenance && confidence ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mt-1 flex flex-wrap items-center justify-center gap-1.5",
          "data-ocid": "score_provenance",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  provenanceClass[provenance]
                ),
                children: provenanceLabel[provenance]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: cn(
                  "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
                  confidenceClass[confidence]
                ),
                children: [
                  confidence,
                  " confidence"
                ]
              }
            )
          ]
        }
      ) : null
    ] }),
    explanation ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-sm leading-relaxed text-foreground/90", children: explanation }) : null,
    reasoning ? /* @__PURE__ */ jsxRuntimeExports.jsx(WhyButton, { className: "w-full", children: reasoning }) : null
  ] });
}
export {
  ScoreCard as S
};
