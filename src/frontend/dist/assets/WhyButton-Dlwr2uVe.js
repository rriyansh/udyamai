import { r as reactExports, j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
import { B as Button } from "./Card-DVJtgs4C.js";
import { C as CircleHelp } from "./circle-help-DThjCgsP.js";
import { C as ChevronDown } from "./chevron-down-HMfNLb45.js";
function WhyButton({
  label = "Why?",
  children,
  className
}) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-2", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        type: "button",
        variant: "ghost",
        size: "sm",
        onClick: () => setOpen((v) => !v),
        className: "w-fit gap-1.5 text-muted-foreground",
        "aria-expanded": open,
        "data-ocid": "why_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "size-4" }),
          label,
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ChevronDown,
            {
              className: cn("size-3.5 transition-smooth", open && "rotate-180")
            }
          )
        ]
      }
    ),
    open ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-foreground/90", children }) : null
  ] });
}
export {
  WhyButton as W
};
