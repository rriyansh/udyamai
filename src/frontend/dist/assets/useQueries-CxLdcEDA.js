import { c as createLucideIcon } from "./index-CeuI7PIL.js";
import { a as useFinanceApi, b as useQuery } from "./api-client-DE3CIaVf.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode);
function useFinancialPlan(input, rule) {
  const api = useFinanceApi();
  return useQuery({
    queryKey: ["financialPlan", input, rule],
    queryFn: async () => {
      const result = await api.computeFinancialPlan(input, rule);
      return result;
    },
    enabled: !!api.backendAvailable
  });
}
function useRouteSchemes(input) {
  const api = useFinanceApi();
  return useQuery({
    queryKey: ["routeSchemes", input],
    queryFn: async () => {
      const result = await api.routeSchemes(input);
      return result;
    },
    enabled: !!api.backendAvailable
  });
}
export {
  Building2 as B,
  useRouteSchemes as a,
  useFinancialPlan as u
};
