import Types "../types/finance";
import FinanceLib "../lib/finance";

mixin () {
  // Computes the complete deterministic financial plan from inputs and a
  // scheme-specific rule.
  public query func computeFinancialPlan(input : Types.FinanceInput, rule : Types.SchemeRule) : async Types.FinancialPlan {
    FinanceLib.computeFinancialPlan(input, rule);
  };

  // Computes just the financing structure (feasible project cost, beneficiary
  // contribution, maximum loan, loan amount).
  public query func computeFinancing(input : Types.FinanceInput, rule : Types.SchemeRule) : async Types.Financing {
    FinanceLib.computeFinancing(input, rule);
  };

  // Computes the amortization schedule (EMI, interest, repayment, schedule).
  public query func computeAmortization(loanAmount : Nat, interestRatePercent : Nat, tenureMonths : Nat, moratoriumMonths : Nat) : async Types.Amortization {
    FinanceLib.computeAmortization(loanAmount, interestRatePercent, tenureMonths, moratoriumMonths);
  };

  // Computes moratorium handling (interest accrual and shifted repayment).
  public query func computeMoratorium(loanAmount : Nat, interestRatePercent : Nat, moratoriumMonths : Nat) : async Types.Moratorium {
    FinanceLib.computeMoratorium(loanAmount, interestRatePercent, moratoriumMonths);
  };

  // Computes the working capital requirement split.
  public query func computeWorkingCapital(input : Types.WorkingCapitalInput) : async Types.WorkingCapital {
    FinanceLib.computeWorkingCapital(input);
  };

  // Computes break-even sales and units.
  public query func computeBreakEven(fixedCosts : Nat, variableCostPerUnit : Nat, pricePerUnit : Nat) : async Types.BreakEven {
    FinanceLib.computeBreakEven(fixedCosts, variableCostPerUnit, pricePerUnit);
  };

  // Computes the total cash requirement.
  public query func computeCashRequirement(feasibleProjectCost : Nat, workingCapitalTotal : Nat, buffer : Nat) : async Types.CashRequirement {
    FinanceLib.computeCashRequirement(feasibleProjectCost, workingCapitalTotal, buffer);
  };
};
