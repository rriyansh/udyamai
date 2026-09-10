import { j as jsxRuntimeExports, a as cn, r as reactExports } from "./index-CeuI7PIL.js";
import { C as Card } from "./Card-DVJtgs4C.js";
import { W as WhyButton } from "./WhyButton-Dlwr2uVe.js";
const breakdownItems = [
  { key: "market", label: "Market", className: "feas-market" },
  { key: "financial", label: "Financial", className: "feas-financial" },
  { key: "competition", label: "Competition", className: "feas-competition" },
  { key: "risk", label: "Risk", className: "feas-risk" }
];
function FeasibilityScoreRing({
  score,
  className
}) {
  const clamped = Math.max(0, Math.min(100, score.overall));
  const circumference = 2 * Math.PI * 45;
  const offset = circumference * (1 - clamped / 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: cn("p-6", className), "data-ocid": "feasibility_score_ring", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 sm:flex-row sm:items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          viewBox: "0 0 100 100",
          className: "size-40 -rotate-90",
          role: "img",
          "aria-label": `Feasibility score: ${clamped} out of 100`,
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fin-stat block text-4xl font-bold text-gradient", children: clamped }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "/ 100" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold tracking-tight", children: "Feasibility score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm leading-relaxed text-foreground/85", children: score.explanation }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-3", children: breakdownItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-xl border border-border p-3",
          "data-ocid": `feasibility_${item.key}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: item.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "fin-stat mt-1 text-xl font-bold",
                  item.className
                ),
                children: score.breakdown[item.key]
              }
            )
          ]
        },
        item.key
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(WhyButton, { className: "mt-4", label: "How calculated?", children: "The score is built from four transparent parts: Market (demand and supply gap), Financial (profit and repayment capacity), Competition (how many rivals are nearby), and Risk (how likely the business is to face problems). Each part is scored from your analysis using fixed rules, then combined into one number out of 100. It is a guide, not a guarantee." })
    ] })
  ] }) });
}
function WhatIfSlider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  className
}) {
  const display = format ? format(value) : String(value);
  const inputId = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("flex flex-col gap-2", className),
      "data-ocid": "whatif_slider",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: inputId,
              className: "text-sm font-medium text-foreground",
              children: label
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "fin-stat text-sm font-semibold text-primary", children: display })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: inputId,
            type: "range",
            min,
            max,
            step,
            value,
            onChange: (e) => onChange(Number(e.target.value)),
            className: "slider",
            "aria-label": label,
            "data-ocid": "whatif_slider_input"
          }
        )
      ]
    }
  );
}
export {
  FeasibilityScoreRing as F,
  WhatIfSlider as W
};
