import { j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
const riskStyles = {
  low: "bg-success/15 text-success",
  medium: "bg-warning/15 text-warning",
  high: "bg-destructive/15 text-destructive"
};
const riskLabels = {
  low: "Low Risk",
  medium: "Medium Risk",
  high: "High Risk"
};
function RiskBadge({ risk, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        riskStyles[risk],
        className
      ),
      "data-ocid": "risk_badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 rounded-full bg-current" }),
        riskLabels[risk]
      ]
    }
  );
}
export {
  RiskBadge as R
};
