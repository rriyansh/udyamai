import { j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
function InputField({
  label,
  error,
  hint,
  icon,
  id,
  className,
  ...props
}) {
  const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-1.5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      icon ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground", children: icon }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          id: inputId,
          className: cn(
            "h-11 w-full rounded-full border border-input bg-background px-4 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
            icon && "pl-10",
            error && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30"
          ),
          "aria-invalid": error ? true : void 0,
          "data-ocid": "input_field",
          ...props
        }
      )
    ] }),
    error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs font-medium text-destructive",
        "data-ocid": "input_error",
        children: error
      }
    ) : hint ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint }) : null
  ] });
}
export {
  InputField as I
};
