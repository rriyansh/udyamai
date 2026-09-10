import { c as createLucideIcon, j as jsxRuntimeExports, a as cn } from "./index-CeuI7PIL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
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
function EstimateBadge({ estimate, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn("flex flex-wrap items-center gap-1.5", className),
      "data-ocid": "estimate_badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
              provenanceClass[estimate.provenance]
            ),
            children: provenanceLabel[estimate.provenance]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: cn(
              "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold",
              confidenceClass[estimate.confidence]
            ),
            children: [
              estimate.confidence,
              " confidence"
            ]
          }
        )
      ]
    }
  );
}
export {
  EstimateBadge as E,
  TriangleAlert as T
};
