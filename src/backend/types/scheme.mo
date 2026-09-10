import Common "../types/common";

module {
  // Lifecycle status of a scheme in the database.
  public type SchemeStatus = {
    #Active;
    #Inactive;
    #UnderReview;
  };

  // A bounded project cost range. max = 0 means no upper bound.
  public type ProjectCostRange = {
    min : Nat;
    max : Nat;
  };

  // A government scheme record (government_schemes).
  public type Scheme = {
    id : Nat;
    name : Text;
    eligibility : Text;
    projectCostRange : ProjectCostRange;
    beneficiaryType : Text;
    // Scheme-specific values are optional and only surfaced when verified.
    marginRequirement : ?Nat; // percentage
    loanPercentage : ?Nat; // percentage
    interestRate : ?Float; // annual percentage
    tenureMonths : ?Nat;
    moratoriumMonths : ?Nat;
    documents : [Text];
    officialSource : Text;
    lastVerifiedDate : Common.Timestamp;
    status : SchemeStatus;
  };

  // A deterministic routing rule (scheme_rules).
  public type SchemeRule = {
    schemeId : Nat;
    businessCategories : [Text];
    locations : [Text];
    beneficiaryCategories : [Text];
  };

  // A loan product offered under a scheme (loan_products).
  public type LoanProduct = {
    id : Nat;
    schemeId : Nat;
    name : Text;
    interestRate : ?Float;
    tenureMonths : ?Nat;
    moratoriumMonths : ?Nat;
    loanPercentage : ?Nat;
    marginRequirement : ?Nat;
  };

  // Inputs used to route potentially applicable schemes.
  public type SchemeRoutingInput = {
    businessCategory : Text;
    projectCost : Nat;
    location : Text;
    beneficiaryCategory : Text;
    contribution : Nat;
  };

  // A single matched scheme with the details shown to the user.
  public type SchemeMatch = {
    scheme : Scheme;
    whyMayFit : Text;
    projectCostLimit : ProjectCostRange;
    contribution : ?Nat;
    loan : ?Nat;
    interestRate : ?Float;
    tenureMonths : ?Nat;
    moratoriumMonths : ?Nat;
    requiredDocuments : [Text];
    officialVerificationNote : Text;
  };

  // Deterministic routing result. Never claims guaranteed eligibility.
  public type SchemeRoutingResult = {
    heading : Text; // always "Potentially applicable"
    matches : [SchemeMatch];
  };
};
