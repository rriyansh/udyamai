import type { SchemeRule } from "@/lib/types";

export interface SihFinancialRule {
  id: string;
  name: string;
  sourceLabel: "SIH PS-26091 Financial Rules";
  rule: SchemeRule;
}

/**
 * Challenge-specific financial assumptions for SIH PS-26091.
 * These are deliberately separate from GovernmentScheme records such as PMEGP.
 * They must never be presented as official government scheme terms.
 */
export const SIH_FINANCIAL_RULES: SihFinancialRule[] = [
  {
    id: "micro-enterprise",
    name: "Micro enterprise model",
    sourceLabel: "SIH PS-26091 Financial Rules",
    rule: {
      name: "SIH PS-26091 / Micro enterprise model",
      minProjectCost: 100000,
      maxProjectCost: 1000000,
      loanPercent: 75,
      beneficiaryContributionPercent: 10,
      interestRatePercent: 11,
      tenureMonths: 60,
      moratoriumMonths: 6,
    },
  },
  {
    id: "small-enterprise",
    name: "Small enterprise model",
    sourceLabel: "SIH PS-26091 Financial Rules",
    rule: {
      name: "SIH PS-26091 / Small enterprise model",
      minProjectCost: 1000000,
      maxProjectCost: 2500000,
      loanPercent: 70,
      beneficiaryContributionPercent: 15,
      interestRatePercent: 10,
      tenureMonths: 84,
      moratoriumMonths: 12,
    },
  },
  {
    id: "agri-business",
    name: "Agri business model",
    sourceLabel: "SIH PS-26091 Financial Rules",
    rule: {
      name: "SIH PS-26091 / Agri business model",
      minProjectCost: 50000,
      maxProjectCost: 500000,
      loanPercent: 80,
      beneficiaryContributionPercent: 10,
      interestRatePercent: 9,
      tenureMonths: 60,
      moratoriumMonths: 6,
    },
  },
];

export const SIH_WHAT_IF_RULE: SchemeRule = {
  name: "SIH PS-26091 / What-if scenario model",
  minProjectCost: 0,
  maxProjectCost: 10000000,
  loanPercent: 100,
  beneficiaryContributionPercent: 0,
  interestRatePercent: 0,
  tenureMonths: 0,
  moratoriumMonths: 0,
};
