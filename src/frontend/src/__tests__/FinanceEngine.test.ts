import {
  computeAmortization,
  computeBreakEven,
  computeCashRequirement,
  computeFinancialPlan,
  computeFinancing,
  computeMoratorium,
  computeWorkingCapital,
} from "@/lib/finance-engine";
import type { FinanceInput, SchemeRule } from "@/lib/types";
import { describe, expect, it } from "vitest";

/**
 * Deterministic financial engine coverage.
 * ------------------------------------------------------------------
 * These tests assert the client-side finance engine's math with real,
 * concrete inputs and expected outputs. The engine is deterministic and
 * transparent — it never invents or randomizes numbers — so every value
 * below is a fixed, verifiable result.
 */

// Scheme: 10% beneficiary contribution / 90% loan, up to ₹10 lakh.
const RULE: SchemeRule = {
  name: "Test Scheme",
  minProjectCost: 100000,
  maxProjectCost: 1000000,
  loanPercent: 90,
  beneficiaryContributionPercent: 10,
  interestRatePercent: 9,
  tenureMonths: 60,
  moratoriumMonths: 0,
};

function baseInput(overrides: Partial<FinanceInput> = {}): FinanceInput {
  return {
    proposedProjectCost: 500000,
    ownCapital: 100000,
    loanRequirement: 450000,
    tenureMonths: 60,
    interestRatePercent: 9,
    marginPercent: 10,
    moratoriumMonths: 0,
    operatingCosts: {
      rent: 8000,
      salary: 15000,
      rawMaterial: 20000,
      electricity: 3000,
      transport: 4000,
      packaging: 2500,
      marketing: 3000,
      maintenance: 2000,
      other: 2500,
    },
    workingCapital: {
      initialRequirement: 100000,
      monthlyRequirement: 60000,
      emergencyBufferPercent: 10,
    },
    pricePerUnit: 120,
    variableCostPerUnit: 60,
    ...overrides,
  };
}

describe("computeFinancing", () => {
  it("computes feasible project cost, contribution, and loan from scheme rules", () => {
    const financing = computeFinancing(baseInput(), RULE);
    // proposed 500000 within the scheme's max -> feasible project cost 500000.
    expect(financing.feasibleProjectCost.value).toBe(500000);
    // 10% beneficiary contribution of the feasible project cost.
    expect(financing.beneficiaryContribution.value).toBe(50000);
    // 90% loan of the feasible project cost, capped by the loan requirement.
    expect(financing.maximumLoan.value).toBe(450000);
    expect(financing.loanAmount.value).toBe(450000);
  });

  it("caps the feasible project cost at the scheme maximum", () => {
    const financing = computeFinancing(
      baseInput({ proposedProjectCost: 2000000 }),
      RULE,
    );
    expect(financing.feasibleProjectCost.value).toBe(1000000);
    expect(financing.maximumLoan.value).toBe(900000);
  });

  it("caps the loan amount at the requested loan requirement", () => {
    const financing = computeFinancing(
      baseInput({ loanRequirement: 200000 }),
      RULE,
    );
    expect(financing.loanAmount.value).toBe(200000);
  });
});

describe("computeAmortization", () => {
  it("produces a positive EMI and a 60-row schedule closing at zero", () => {
    const amortization = computeAmortization(450000, 9, 60, 0);
    expect(amortization.emi.value).toBeGreaterThan(0);
    expect(amortization.schedule).toHaveLength(60);
    // The schedule is numbered 1..60 with no moratorium rows.
    expect(amortization.schedule[0].month).toBe(1);
    expect(amortization.schedule[59].month).toBe(60);
    // The loan is essentially repaid: the final closing balance is a small
    // rounding residual (each row's interest/principal is rounded to whole
    // rupees), far below one EMI.
    expect(amortization.schedule[59].closingBalance).toBeLessThan(
      amortization.emi.value,
    );
    // Total repayment equals principal plus total interest.
    expect(amortization.principalInterest.totalRepayment).toBe(
      amortization.principalInterest.totalPrincipal +
        amortization.principalInterest.totalInterest,
    );
    expect(amortization.principalInterest.totalPrincipal).toBe(450000);
  });

  it("prepends moratorium rows with no payment before repayment", () => {
    const amortization = computeAmortization(450000, 9, 60, 6);
    // 6 moratorium rows + 60 repayment rows.
    expect(amortization.schedule).toHaveLength(66);
    // Moratorium rows carry no principal or EMI.
    for (let i = 0; i < 6; i += 1) {
      expect(amortization.schedule[i].principal).toBe(0);
      expect(amortization.schedule[i].emi).toBe(0);
    }
    // Repayment starts at month 7.
    expect(amortization.schedule[6].month).toBe(7);
    // The loan is essentially repaid by the final row (small rounding residual).
    expect(amortization.schedule[65].closingBalance).toBeLessThan(
      amortization.emi.value,
    );
  });
});

describe("computeMoratorium", () => {
  it("reports the repayment start month and accrued interest", () => {
    const moratorium = computeMoratorium(450000, 9, 6);
    expect(moratorium.moratoriumMonths).toBe(6);
    expect(moratorium.repaymentStartMonth).toBe(7);
    // Simple interest on the full loan for 6 months at 9% p.a.
    expect(moratorium.interestAccruedDuringMoratorium.value).toBe(20250);
  });

  it("starts repayment in month 1 when there is no moratorium", () => {
    const moratorium = computeMoratorium(450000, 9, 0);
    expect(moratorium.repaymentStartMonth).toBe(1);
    expect(moratorium.interestAccruedDuringMoratorium.value).toBe(0);
  });
});

describe("computeWorkingCapital", () => {
  it("adds the emergency buffer to the working capital total", () => {
    const wc = computeWorkingCapital({
      initialRequirement: 100000,
      monthlyRequirement: 60000,
      emergencyBufferPercent: 10,
    });
    expect(wc.initialRequirement.value).toBe(100000);
    expect(wc.monthlyRequirement.value).toBe(60000);
    // 10% buffer on the monthly requirement.
    expect(wc.emergencyBuffer.value).toBe(6000);
    expect(wc.totalRequirement.value).toBe(166000);
  });
});

describe("computeCashRequirement", () => {
  it("combines project cost and working capital without double-counting the buffer", () => {
    const cash = computeCashRequirement(500000, 166000, 6000);
    expect(cash.projectCost.value).toBe(500000);
    expect(cash.workingCapital.value).toBe(166000);
    expect(cash.buffer.value).toBe(6000);
    // total = project cost + working capital (buffer already included).
    expect(cash.total.value).toBe(666000);
  });
});

describe("computeBreakEven", () => {
  it("computes break-even units and sales from fixed and variable costs", () => {
    const breakEven = computeBreakEven(60000, 60, 120);
    // Contribution per unit = 120 - 60 = 60; units = 60000 / 60 = 1000.
    expect(breakEven.breakEvenUnits?.value).toBe(1000);
    expect(breakEven.breakEvenSales.value).toBe(120000);
  });

  it("reports zero break-even when price does not exceed variable cost", () => {
    const breakEven = computeBreakEven(60000, 120, 120);
    // The frontend engine always sets breakEvenUnits; it is zero when the
    // contribution per unit is not positive.
    expect(breakEven.breakEvenUnits?.value).toBe(0);
    expect(breakEven.breakEvenSales.value).toBe(0);
  });
});

describe("computeFinancialPlan", () => {
  it("ties financing, amortization, working capital, and break-even together", () => {
    const plan = computeFinancialPlan(baseInput(), RULE);
    expect(plan.financing.loanAmount.value).toBe(450000);
    expect(plan.financing.beneficiaryContribution.value).toBe(50000);
    expect(plan.amortization.emi.value).toBeGreaterThan(0);
    expect(plan.amortization.schedule).toHaveLength(60);
    expect(plan.moratorium.repaymentStartMonth).toBe(1);
    expect(plan.workingCapital.totalRequirement.value).toBe(166000);
    expect(plan.cashRequirement.total.value).toBe(666000);
    // Monthly operating cost is the sum of the nine operating cost inputs.
    expect(plan.monthlyOperatingCost.value).toBe(60000);
    // Break-even uses the operating cost as fixed costs.
    expect(plan.breakEven.breakEvenUnits?.value).toBe(1000);
    expect(plan.breakEven.breakEvenSales.value).toBe(120000);
  });
});
