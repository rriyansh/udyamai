module {
  // Provenance label attached to every financial estimate.
  public type Provenance = {
    #Estimated;
    #Observed;
    #Calculated;
    #UserProvided;
  };

  // Confidence badge attached to every estimate.
  public type Confidence = {
    #High;
    #Medium;
    #Low;
  };

  // A single estimate with its provenance label and confidence badge.
  public type Estimate = {
    value : Nat;
    provenance : Provenance;
    confidence : Confidence;
  };

  // The nine operating cost inputs.
  public type OperatingCosts = {
    rent : Nat;
    salary : Nat;
    rawMaterial : Nat;
    electricity : Nat;
    transport : Nat;
    packaging : Nat;
    marketing : Nat;
    maintenance : Nat;
    other : Nat;
  };

  // Working capital inputs.
  public type WorkingCapitalInput = {
    initialRequirement : Nat;
    monthlyRequirement : Nat;
    emergencyBufferPercent : Nat;
  };

  // Scheme-specific financing rule. Never a universal 10/90 split — each
  // scheme carries its own contribution and loan percentages.
  public type SchemeRule = {
    name : Text;
    beneficiaryContributionPercent : Nat;
    loanPercent : Nat;
    minProjectCost : Nat;
    maxProjectCost : Nat;
    interestRatePercent : Nat;
    tenureMonths : Nat;
    moratoriumMonths : Nat;
  };

  // Financial planning inputs.
  public type FinanceInput = {
    ownCapital : Nat;
    marginPercent : Nat;
    proposedProjectCost : Nat;
    loanRequirement : Nat;
    interestRatePercent : Nat;
    tenureMonths : Nat;
    moratoriumMonths : Nat;
    operatingCosts : OperatingCosts;
    workingCapital : WorkingCapitalInput;
    pricePerUnit : Nat;
    variableCostPerUnit : Nat;
  };

  // Financing structure derived from scheme-specific rules.
  public type Financing = {
    feasibleProjectCost : Estimate;
    beneficiaryContribution : Estimate;
    maximumLoan : Estimate;
    loanAmount : Estimate;
    scheme : SchemeRule;
  };

  // One row of the repayment schedule.
  public type RepaymentRow = {
    month : Nat;
    openingBalance : Nat;
    principal : Nat;
    interest : Nat;
    emi : Nat;
    closingBalance : Nat;
  };

  // Principal vs interest totals.
  public type PrincipalInterest = {
    totalPrincipal : Nat;
    totalInterest : Nat;
    totalRepayment : Nat;
  };

  // Amortization output: EMI, interest, repayment, and full schedule.
  public type Amortization = {
    emi : Estimate;
    totalInterest : Estimate;
    totalRepayment : Estimate;
    schedule : [RepaymentRow];
    principalInterest : PrincipalInterest;
  };

  // Moratorium handling: interest accrual and shifted repayment start.
  public type Moratorium = {
    moratoriumMonths : Nat;
    interestAccruedDuringMoratorium : Estimate;
    repaymentStartMonth : Nat;
    explanation : Text;
  };

  // Working capital requirement split into initial, monthly, and buffer.
  public type WorkingCapital = {
    initialRequirement : Estimate;
    monthlyRequirement : Estimate;
    emergencyBuffer : Estimate;
    totalRequirement : Estimate;
  };

  // Break-even output with explanation and assumptions.
  public type BreakEven = {
    breakEvenSales : Estimate;
    breakEvenUnits : ?Estimate;
    explanation : Text;
    assumptions : [Text];
  };

  // Total cash requirement combining project cost, working capital, buffer.
  public type CashRequirement = {
    projectCost : Estimate;
    workingCapital : Estimate;
    buffer : Estimate;
    total : Estimate;
  };

  // Full deterministic financial plan result.
  public type FinancialPlan = {
    financing : Financing;
    amortization : Amortization;
    moratorium : Moratorium;
    monthlyOperatingCost : Estimate;
    workingCapital : WorkingCapital;
    breakEven : BreakEven;
    cashRequirement : CashRequirement;
  };
};
