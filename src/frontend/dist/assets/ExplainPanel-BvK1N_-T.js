import { j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
import { C as CircleHelp } from "./circle-help-DThjCgsP.js";
function ExplainPanel({
  title = "What does this mean?",
  children,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("explain", className), "data-ocid": "explain_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "explain-title", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "size-4 shrink-0", "aria-hidden": true }),
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm leading-relaxed", children })
  ] });
}
export {
  ExplainPanel as E
};
