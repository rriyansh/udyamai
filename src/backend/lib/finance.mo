import Types "../types/finance";
import Float "mo:core/Float";
import List "mo:core/List";

module {
  // Rounds a positive Float to the nearest Nat.
  func round(x : Float) : Nat {
    Float.floor(x + 0.5).toInt().toNat();
  };

  // Monthly interest rate as a fraction from an annual percentage.
  func monthlyRate(interestRatePercent : Nat) : Float {
    interestRatePercent.toFloat() / 100.0 / 12.0;
  };

  // Wraps a computed value as a #Calculated estimate.
  func estimate(value : Nat) : Types.Estimate {
    { value; provenance = #Calculated; confidence = #High };
  };

  // Computes the financing structure (feasible project cost, beneficiary
  // contribution, maximum loan, loan amount) from inputs and scheme rules.
  public func computeFinancing(input : Types.FinanceInput, rule : Types.SchemeRule) : Types.Financing {
    // Feasible project cost: what own capital supports at the margin, capped
    // by the proposed cost and the scheme's maximum project cost.
    let byMargin = round(input.ownCapital.toFloat() * 100.0 / input.marginPercent.toFloat());
    let proposed = if (byMargin < input.proposedProjectCost) { byMargin } else { input.proposedProjectCost };
    let feasible = if (proposed < rule.maxProjectCost) { proposed } else { rule.maxProjectCost };

    // Scheme-specific loan percentage (never a universal 10/90 split).
    let maximumLoan = round(feasible.toFloat() * rule.loanPercent.toFloat() / 100.0);
    let loanAmount = if (input.loanRequirement < maximumLoan) { input.loanRequirement } else { maximumLoan };
    let beneficiaryContribution = if (feasible >= loanAmount) { feasible - loanAmount } else { 0 };

    {
      feasibleProjectCost = estimate(feasible);
      beneficiaryContribution = estimate(beneficiaryContribution);
      maximumLoan = estimate(maximumLoan);
      loanAmount = estimate(loanAmount);
      scheme = rule;
    };
  };

  // Computes EMI, total interest, total repayment, and the full repayment
  // schedule using deterministic amortization.
  public func computeAmortization(loanAmount : Nat, interestRatePercent : Nat, tenureMonths : Nat, moratoriumMonths : Nat) : Types.Amortization {
    let r = monthlyRate(interestRatePercent);
    let n = tenureMonths.toFloat();

    // Interest accrued during the moratorium (simple interest on the loan).
    let accrued = loanAmount.toFloat() * r * moratoriumMonths.toFloat();
    let principalForEmi = loanAmount.toFloat() + accrued;

    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    let emiFloat = if (tenureMonths == 0) {
      0.0;
    } else if (r > 0.0) {
      let factor = Float.pow(1.0 + r, n);
      principalForEmi * r * factor / (factor - 1.0);
    } else {
      principalForEmi / n;
    };
    let emi = round(emiFloat);

    // Build the schedule.
    var schedule = List.empty<Types.RepaymentRow>();
    var balance = loanAmount.toFloat();
    var totalInterest = 0.0;

    // Moratorium months: no payment, interest accrues on the loan.
    var m = 1;
    while (m <= moratoriumMonths) {
      let interest = loanAmount.toFloat() * r;
      let closing = balance + interest;
      schedule.add({
        month = m;
        openingBalance = round(balance);
        principal = 0;
        interest = round(interest);
        emi = 0;
        closingBalance = round(closing);
      });
      balance := closing;
      totalInterest += interest;
      m += 1;
    };

    // Repayment months: standard reducing-balance EMI.
    var k = 1;
    while (k <= tenureMonths) {
      let month = moratoriumMonths + k;
      let interest = balance * r;
      let principal = if (emiFloat >= interest) { emiFloat - interest } else { 0.0 };
      let principalCapped = if (principal > balance) { balance } else { principal };
      let closing = balance - principalCapped;
      schedule.add({
        month;
        openingBalance = round(balance);
        principal = round(principalCapped);
        interest = round(interest);
        emi;
        closingBalance = round(closing);
      });
      balance := closing;
      totalInterest += interest;
      k += 1;
    };

    let totalInterestNat = round(totalInterest);
    let totalRepayment = loanAmount + totalInterestNat;

    {
      emi = estimate(emi);
      totalInterest = estimate(totalInterestNat);
      totalRepayment = estimate(totalRepayment);
      schedule = schedule.toArray();
      principalInterest = {
        totalPrincipal = loanAmount;
        totalInterest = totalInterestNat;
        totalRepayment;
      };
    };
  };

  // Computes moratorium handling: interest accrued during moratorium and the
  // shifted repayment start month.
  public func computeMoratorium(loanAmount : Nat, interestRatePercent : Nat, moratoriumMonths : Nat) : Types.Moratorium {
    let r = monthlyRate(interestRatePercent);
    let accrued = round(loanAmount.toFloat() * r * moratoriumMonths.toFloat());
    {
      moratoriumMonths;
      interestAccruedDuringMoratorium = estimate(accrued);
      repaymentStartMonth = moratoriumMonths + 1;
      explanation = "During the approved moratorium period you may not have to start regular repayment immediately. Interest still accrues on the loan during this time and is added to the amount you repay. Regular EMIs begin from month " # (moratoriumMonths + 1).toText() # ".";
    };
  };

  // Computes the monthly operating cost from the nine operating cost inputs.
  public func computeMonthlyOperatingCost(costs : Types.OperatingCosts) : Types.Estimate {
    let total = costs.rent + costs.salary + costs.rawMaterial + costs.electricity + costs.transport + costs.packaging + costs.marketing + costs.maintenance + costs.other;
    estimate(total);
  };

  // Computes the working capital requirement split into initial, monthly, and
  // emergency/buffer components.
  public func computeWorkingCapital(input : Types.WorkingCapitalInput) : Types.WorkingCapital {
    let buffer = round(input.monthlyRequirement.toFloat() * input.emergencyBufferPercent.toFloat() / 100.0);
    let total = input.initialRequirement + input.monthlyRequirement + buffer;
    {
      initialRequirement = estimate(input.initialRequirement);
      monthlyRequirement = estimate(input.monthlyRequirement);
      emergencyBuffer = estimate(buffer);
      totalRequirement = estimate(total);
    };
  };

  // Computes break-even sales and break-even units (where applicable).
  public func computeBreakEven(fixedCosts : Nat, variableCostPerUnit : Nat, pricePerUnit : Nat) : Types.BreakEven {
    if (pricePerUnit > variableCostPerUnit) {
      let contribution = pricePerUnit - variableCostPerUnit;
      // ceil(fixedCosts / contribution)
      let units = (fixedCosts + contribution - 1) / contribution;
      let sales = units * pricePerUnit;
      {
        breakEvenSales = estimate(sales);
        breakEvenUnits = ?estimate(units);
        explanation = "You need to sell " # units.toText() # " units at ₹" # pricePerUnit.toText() # " each to cover your fixed costs of ₹" # fixedCosts.toText() # ". Every unit sold above this adds to your profit.";
        assumptions = [
          "Fixed costs are ₹" # fixedCosts.toText() # " per month.",
          "Variable cost per unit is ₹" # variableCostPerUnit.toText() # ".",
          "Selling price per unit is ₹" # pricePerUnit.toText() # ".",
        ];
      };
    } else {
      {
        breakEvenSales = estimate(0);
        breakEvenUnits = null;
        explanation = "Break-even cannot be calculated because the selling price per unit is not greater than the variable cost per unit. Provide a price above the variable cost to see break-even.";
        assumptions = ["Selling price per unit must exceed variable cost per unit."];
      };
    };
  };

  // Computes the total cash requirement combining project cost and working
  // capital. The workingCapitalTotal already includes the emergency buffer,
  // so it is not added again here (that would double-count it).
  public func computeCashRequirement(feasibleProjectCost : Nat, workingCapitalTotal : Nat, buffer : Nat) : Types.CashRequirement {
    let total = feasibleProjectCost + workingCapitalTotal;
    {
      projectCost = estimate(feasibleProjectCost);
      workingCapital = estimate(workingCapitalTotal);
      buffer = estimate(buffer);
      total = estimate(total);
    };
  };

  // Computes the complete deterministic financial plan.
  public func computeFinancialPlan(input : Types.FinanceInput, rule : Types.SchemeRule) : Types.FinancialPlan {
    let financing = computeFinancing(input, rule);
    let loanAmount = financing.loanAmount.value;
    let amortization = computeAmortization(loanAmount, input.interestRatePercent, input.tenureMonths, input.moratoriumMonths);
    let moratorium = computeMoratorium(loanAmount, input.interestRatePercent, input.moratoriumMonths);
    let monthlyOperatingCost = computeMonthlyOperatingCost(input.operatingCosts);
    let workingCapital = computeWorkingCapital(input.workingCapital);
    // Break-even uses the real selling price and variable cost per unit from
    // the finance inputs so the plan reports meaningful values.
    let breakEven = computeBreakEven(monthlyOperatingCost.value, input.variableCostPerUnit, input.pricePerUnit);
    // workingCapital.totalRequirement already includes the emergency buffer,
    // so it must not be added again here.
    let cashRequirement = computeCashRequirement(financing.feasibleProjectCost.value, workingCapital.totalRequirement.value, workingCapital.emergencyBuffer.value);
    {
      financing;
      amortization;
      moratorium;
      monthlyOperatingCost;
      workingCapital;
      breakEven;
      cashRequirement;
    };
  };
};
