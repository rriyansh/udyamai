import { c as createLucideIcon, j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m5 8 6 6", key: "1wu5hv" }],
  ["path", { d: "m4 14 6-6 2-3", key: "1k1g8d" }],
  ["path", { d: "M2 5h12", key: "or177f" }],
  ["path", { d: "M7 2h1", key: "1t2jsx" }],
  ["path", { d: "m22 22-5-10-5 10", key: "don7ne" }],
  ["path", { d: "M14 18h6", key: "1m8k6r" }]
];
const Languages = createLucideIcon("languages", __iconNode);
const VOICE_LANGUAGE_OPTIONS = [
  { value: "en-IN", label: "English" },
  { value: "hi-IN", label: "Hindi" },
  { value: "hinglish", label: "Hinglish" }
];
function LanguageSelector({
  value,
  onChange,
  options = VOICE_LANGUAGE_OPTIONS,
  label = "Language",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col gap-1.5", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: "language-select",
        className: "text-sm font-medium text-foreground",
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "select",
        {
          id: "language-select",
          value,
          onChange: (e) => onChange(e.target.value),
          className: "h-11 w-full appearance-none rounded-full border border-input bg-background pl-10 pr-10 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
          "data-ocid": "language_selector",
          children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: option.value, children: option.label }, option.value))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground", children: "▾" })
    ] })
  ] });
}
export {
  LanguageSelector as L,
  Languages as a
};
