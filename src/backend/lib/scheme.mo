import Int "mo:core/Int";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Types "../types/scheme";

module {
  // Lists all schemes in the database.
  public func listSchemes(schemes : List.List<Types.Scheme>) : [Types.Scheme] {
    schemes.toArray();
  };

  // Returns a single scheme by id.
  public func getScheme(schemes : List.List<Types.Scheme>, id : Nat) : ?Types.Scheme {
    schemes.find(func s = s.id == id);
  };

  // Case-insensitive membership test for a routing rule's tag list.
  func containsLower(haystack : [Text], needle : Text) : Bool {
    let n = needle.toLower();
    haystack.any(func h = h.toLower() == n);
  };

  // First loan product offered under a scheme, if any.
  func findProduct(loanProducts : List.List<Types.LoanProduct>, schemeId : Nat) : ?Types.LoanProduct {
    loanProducts.find(func p = p.schemeId == schemeId);
  };

  // Builds the user-facing match. Scheme-specific values are only surfaced when
  // verified in the database (present on the scheme or its loan product).
  func buildMatch(
    input : Types.SchemeRoutingInput,
    scheme : Types.Scheme,
    product : ?Types.LoanProduct,
  ) : Types.SchemeMatch {
    let margin = switch (scheme.marginRequirement) {
      case (?m) ?m;
      case null switch (product) {
        case (?p) p.marginRequirement;
        case null null;
      };
    };
    let loanPct = switch (scheme.loanPercentage) {
      case (?l) ?l;
      case null switch (product) {
        case (?p) p.loanPercentage;
        case null null;
      };
    };
    let interest = switch (scheme.interestRate) {
      case (?i) ?i;
      case null switch (product) {
        case (?p) p.interestRate;
        case null null;
      };
    };
    let tenure = switch (scheme.tenureMonths) {
      case (?t) ?t;
      case null switch (product) {
        case (?p) p.tenureMonths;
        case null null;
      };
    };
    let moratorium = switch (scheme.moratoriumMonths) {
      case (?m) ?m;
      case null switch (product) {
        case (?p) p.moratoriumMonths;
        case null null;
      };
    };

    // Deterministic backend calculations from the verified margin/loan percentages.
    let contribution = switch (margin) {
      case (?m) ?(input.projectCost * m / 100);
      case null null;
    };
    let loan = switch (loanPct) {
      case (?l) ?(input.projectCost * l / 100);
      case null null;
    };

    {
      scheme;
      whyMayFit = "Your business category '" # input.businessCategory
        # "' and beneficiary category '" # input.beneficiaryCategory
        # "' match this scheme's eligibility, and your project cost of ₹"
        # input.projectCost.toText()
        # " falls within the scheme's project cost range.";
      projectCostLimit = scheme.projectCostRange;
      contribution;
      loan;
      interestRate = interest;
      tenureMonths = tenure;
      moratoriumMonths = moratorium;
      requiredDocuments = scheme.documents;
      officialVerificationNote = "This is a potentially applicable scheme. Please verify current terms, interest rates, and eligibility with the official source: "
        # scheme.officialSource
        # ". Last verified: "
        # scheme.lastVerifiedDate.toText()
        # ".";
    };
  };

  // Deterministically routes potentially applicable schemes from the input and
  // the scheme database. No LLM involvement in routing.
  public func routeSchemes(
    input : Types.SchemeRoutingInput,
    schemes : List.List<Types.Scheme>,
    rules : List.List<Types.SchemeRule>,
    loanProducts : List.List<Types.LoanProduct>,
  ) : Types.SchemeRoutingResult {
    let matches = schemes.toArray()
      .filter(func scheme = scheme.status == #Active)
      .filter(func scheme =
        input.projectCost >= scheme.projectCostRange.min
        and (scheme.projectCostRange.max == 0 or input.projectCost <= scheme.projectCostRange.max)
      )
      .filter(func scheme = switch (rules.find(func r = r.schemeId == scheme.id)) {
        case (?rule) {
          containsLower(rule.businessCategories, input.businessCategory)
          and containsLower(rule.locations, input.location)
          and containsLower(rule.beneficiaryCategories, input.beneficiaryCategory)
        };
        case null { false };
      })
      .map(func scheme = buildMatch(input, scheme, findProduct(loanProducts, scheme.id)));
    { heading = "Potentially applicable"; matches };
  };
};
