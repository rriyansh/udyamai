import List "mo:core/List";
import Types "../types/scheme";
import SchemeLib "../lib/scheme";

mixin (
  schemes : List.List<Types.Scheme>,
  rules : List.List<Types.SchemeRule>,
  loanProducts : List.List<Types.LoanProduct>,
) {
  // Lists all schemes in the database.
  public query func listSchemes() : async [Types.Scheme] {
    SchemeLib.listSchemes(schemes);
  };

  // Returns a single scheme by id.
  public query func getScheme(id : Nat) : async ?Types.Scheme {
    SchemeLib.getScheme(schemes, id);
  };

  // Routes potentially applicable schemes deterministically.
  public query func routeSchemes(input : Types.SchemeRoutingInput) : async Types.SchemeRoutingResult {
    SchemeLib.routeSchemes(input, schemes, rules, loanProducts);
  };
};
