import { j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
import { B as Button } from "./Card-DVJtgs4C.js";
function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center",
        className
      ),
      "data-ocid": "empty_state",
      children: [
        icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-14 items-center justify-center rounded-full bg-accent/15 text-accent-foreground", children: icon }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold tracking-tight", children: title }),
        description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-sm text-muted-foreground", children: description }) : null,
        actionLabel && onAction ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            onClick: onAction,
            className: "mt-2",
            "data-ocid": "empty_state_action",
            children: actionLabel
          }
        ) : null
      ]
    }
  );
}
export {
  EmptyState as E
};
