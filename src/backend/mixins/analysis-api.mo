import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/analysis";
import Common "../types/common";
import AnalysisLib "../lib/analysis";

mixin (analyses : List.List<Types.Analysis>, state : { var nextId : Nat }) {
  // Runs a complete analysis and stores the result.
  public shared ({ caller }) func runAnalysis(input : Types.AnalysisInput, radius : Types.Radius) : async Types.AnalysisResult {
    ignore caller;
    let result = AnalysisLib.runAnalysis(input, radius);
    let id = state.nextId;
    state.nextId += 1;
    analyses.add({
      id;
      input;
      radius;
      result;
      createdAt = Time.now() : Common.Timestamp;
    });
    result;
  };

  // Returns a stored analysis by id.
  public query func getAnalysis(id : Nat) : async ?Types.Analysis {
    AnalysisLib.getAnalysis(analyses, id);
  };

  // Lists all stored analyses.
  public query func listAnalyses() : async [Types.Analysis] {
    AnalysisLib.listAnalyses(analyses);
  };

  // Answers an Ask UdyamAI question in the context of an analysis.
  public shared ({ caller }) func chat(request : Types.ChatRequest) : async Types.ChatResponse {
    ignore caller;
    await* AnalysisLib.chat<system>(analyses, request);
  };
};
