import type {
  Amortization,
  BreakEven,
  CashRequirement,
  Estimate,
  FinanceInput,
  FinancialPlan,
  Financing,
  Moratorium,
  PrincipalInterest,
  RepaymentRow,
  SchemeRule,
  WorkingCapital,
  WorkingCapitalInput,
} from "@/lib/types";

/**
 * Deterministic client-side financial planning engine.
 * ------------------------------------------------------------------
 * This mirrors the backend canister's financial calculations so the UI
 * can render real figures even when the backend is unavailable. Every
 * formula here is deterministic and transparent — it never invents or
 * randomizes numbers. All money values are whole rupees.
 */

const CALCULATED: Estimate = {
  value: 0,
  provenance: "Calculated",
  confidence: "High",
};

function estimate(value: number): Estimate {
  return {
    value: Math.round(value),
    provenance: "Calculated",
    confidence: "High",
  };
}

function round(value: number): number {
  return Math.round(value);
}

function monthlyRate(interestRatePercent: number): number {
  return interestRatePercent / 100 / 12;
}

/**
 * Standard amortizing-loan EMI:
 *   EMI = P * r * (1+r)^n / ((1+r)^n - 1)
 * where P is the principal, r the monthly rate, n the number of months.
 */
function computeEmi(
  principal: number,
  interestRatePercent: number,
  tenureMonths: number,
): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  const r = monthlyRate(interestRatePercent);
  if (r === 0) return round(principal / tenureMonths);
  const factor = (1 + r) ** tenureMonths;
  return round((principal * r * factor) / (factor - 1));
}

export function computeAmortization(
  loanAmount: number,
  interestRatePercent: number,
  tenureMonths: number,
  moratoriumMonths: number,
): Amortization {
  const r = monthlyRate(interestRatePercent);
  // Interest accrues on the full loan during the moratorium and is added
  // to the principal before the repayment schedule begins.
  const moratoriumInterest = round(loanAmount * r * moratoriumMonths);
  const effectivePrincipal = loanAmount + moratoriumInterest;
  const emi = computeEmi(effectivePrincipal, interestRatePercent, tenureMonths);

  // Build the schedule to match the backend exactly: moratorium rows first
  // (no payment, interest accrues on the loan), then repayment rows numbered
  // moratorium+1 .. moratorium+tenure.
  const schedule: RepaymentRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;

  // Moratorium months: no payment, interest accrues on the original loan.
  for (let m = 1; m <= moratoriumMonths; m += 1) {
    const interest = round(loanAmount * r);
    const closing = balance + interest;
    schedule.push({
      month: m,
      openingBalance: balance,
      principal: 0,
      interest,
      emi: 0,
      closingBalance: closing,
    });
    balance = closing;
    totalInterest += interest;
  }

  // Repayment months: standard reducing-balance EMI.
  for (let k = 1; k <= tenureMonths; k += 1) {
    const month = moratoriumMonths + k;
    const interest = round(balance * r);
    const principal = Math.min(emi - interest, balance);
    const closing = balance - principal;
    schedule.push({
      month,
      openingBalance: balance,
      principal,
      interest,
      emi: principal + interest,
      closingBalance: closing,
    });
    balance = closing;
    totalInterest += interest;
  }

  const principalInterest: PrincipalInterest = {
    totalPrincipal: loanAmount,
    totalInterest,
    totalRepayment: loanAmount + totalInterest,
  };

  return {
    emi: estimate(emi),
    totalRepayment: estimate(principalInterest.totalRepayment),
    totalInterest: estimate(principalInterest.totalInterest),
    schedule,
    principalInterest,
  };
}

export function computeMoratorium(
  loanAmount: number,
  interestRatePercent: number,
  moratoriumMonths: number,
): Moratorium {
  const r = monthlyRate(interestRatePercent);
  const interestAccrued = round(loanAmount * r * moratoriumMonths);
  return {
    moratoriumMonths,
    repaymentStartMonth: moratoriumMonths + 1,
    interestAccruedDuringMoratorium: estimate(interestAccrued),
    explanation:
      moratoriumMonths > 0
        ? `You do not pay the loan during the first ${moratoriumMonths} month${
            moratoriumMonths === 1 ? "" : "s"
          }. Repayment starts from month ${moratoriumMonths + 1}. Interest keeps adding to your loan during this period, so the amount you repay later is a little higher.`
        : "There is no waiting period — repayment starts from the first month after the loan is given.",
  };
}

export function computeWorkingCapital(
  input: WorkingCapitalInput,
): WorkingCapital {
  const buffer = round(
    input.monthlyRequirement * (input.emergencyBufferPercent / 100),
  );
  const total = input.initialRequirement + input.monthlyRequirement + buffer;
  return {
    initialRequirement: estimate(input.initialRequirement),
    monthlyRequirement: estimate(input.monthlyRequirement),
    emergencyBuffer: estimate(buffer),
    totalRequirement: estimate(total),
  };
}

export function computeCashRequirement(
  feasibleProjectCost: number,
  workingCapitalTotal: number,
  buffer: number,
): CashRequirement {
  // workingCapitalTotal already includes the emergency buffer (see
  // computeWorkingCapital), so adding buffer again would double-count it.
  const total = feasibleProjectCost + workingCapitalTotal;
  return {
    projectCost: estimate(feasibleProjectCost),
    workingCapital: estimate(workingCapitalTotal),
    buffer: estimate(buffer),
    total: estimate(total),
  };
}

export function computeBreakEven(
  fixedCosts: number,
  variableCostPerUnit: number,
  pricePerUnit: number,
): BreakEven {
  const contributionPerUnit = pricePerUnit - variableCostPerUnit;
  const units = contributionPerUnit > 0 ? fixedCosts / contributionPerUnit : 0;
  const sales = units * pricePerUnit;
  return {
    breakEvenSales: estimate(sales),
    breakEvenUnits: estimate(units),
    explanation:
      "Break-even is the sales level where your income just covers all your costs — you neither make a profit nor a loss. Above this, you start earning profit.",
    assumptions: [
      `Fixed costs of ${fixedCosts.toLocaleString("en-IN")} rupees per month`,
      `Variable cost of ${variableCostPerUnit.toLocaleString("en-IN")} rupees per unit`,
      `Selling price of ${pricePerUnit.toLocaleString("en-IN")} rupees per unit`,
    ],
  };
}

export function computeFinancing(
  input: FinanceInput,
  rule: SchemeRule,
): Financing {
  const feasibleProjectCost = Math.min(
    input.proposedProjectCost,
    rule.maxProjectCost,
  );
  const maximumLoan = round(feasibleProjectCost * (rule.loanPercent / 100));
  const loanAmount = Math.min(input.loanRequirement, maximumLoan);
  const beneficiaryContribution = round(
    feasibleProjectCost * (rule.beneficiaryContributionPercent / 100),
  );
  return {
    feasibleProjectCost: estimate(feasibleProjectCost),
    beneficiaryContribution: estimate(beneficiaryContribution),
    loanAmount: estimate(loanAmount),
    maximumLoan: estimate(maximumLoan),
    scheme: rule,
  };
}

export function computeFinancialPlan(
  input: FinanceInput,
  rule: SchemeRule,
): FinancialPlan {
  const financing = computeFinancing(input, rule);
  const loanAmount = financing.loanAmount.value;

  const amortization = computeAmortization(
    loanAmount,
    input.interestRatePercent,
    input.tenureMonths,
    input.moratoriumMonths,
  );
  const moratorium = computeMoratorium(
    loanAmount,
    input.interestRatePercent,
    input.moratoriumMonths,
  );
  const workingCapital = computeWorkingCapital(input.workingCapital);
  const cashRequirement = computeCashRequirement(
    financing.feasibleProjectCost.value,
    workingCapital.totalRequirement.value,
    workingCapital.emergencyBuffer.value,
  );

  const op = input.operatingCosts;
  const monthlyOperatingCost =
    op.rent +
    op.salary +
    op.rawMaterial +
    op.electricity +
    op.transport +
    op.packaging +
    op.marketing +
    op.maintenance +
    op.other;

  // Break-even uses the real selling price and variable cost per unit from
  // the finance inputs so the plan reports meaningful values. Fixed costs
  // are the total monthly operating cost, matching the backend engine.
  const breakEven = computeBreakEven(
    monthlyOperatingCost,
    input.variableCostPerUnit,
    input.pricePerUnit,
  );

  return {
    financing,
    amortization,
    moratorium,
    workingCapital,
    cashRequirement,
    monthlyOperatingCost: estimate(monthlyOperatingCost),
    breakEven,
  };
}

export { CALCULATED };
