import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/analysis";
import { fromEnv } "mo:caffeineai-inference-client/Config";
import ChatApi "mo:caffeineai-inference-client/Apis/ChatApi";
import ChatCompletionRequest "mo:caffeineai-inference-client/Models/ChatCompletionRequest";
import ChatCompletionRequestMessageOneOf2 "mo:caffeineai-inference-client/Models/ChatCompletionRequestMessageOneOf2";

module {
  func estimate(value : Nat, provenance : Types.Provenance, confidence : Types.Confidence) : Types.Estimate {
    { value; provenance; confidence };
  };

  func radiusFactor(radius : Types.Radius) : Float {
    switch (radius) {
      case (#R5km) 1.0;
      case (#R10km) 2.2;
    };
  };

  func radiusText(radius : Types.Radius) : Text {
    switch (radius) {
      case (#R5km) "5 km";
      case (#R10km) "10 km";
    };
  };

  func toNat(f : Float) : Nat {
    if (f < 0.0) { 0 } else { f.toInt().toNat() };
  };

  func clampScore(f : Float) : Nat {
    if (f < 0.0) { 0 } else if (f > 100.0) { 100 } else { f.toInt().toNat() };
  };

  func riskLevel(score : Float) : Types.RiskLevel {
    if (score >= 66.0) { #High } else if (score >= 33.0) { #Medium } else { #Low };
  };

  func nearbyMarketsFor(category : Text) : [Text] {
    ["Local mandi / haat", "Block-level market", "District wholesale market", "Weekly village market"];
  };

  func channelsFor(category : Text) : [Text] {
    ["Direct to consumer", "Local retailer", "Wholesale to mandi", "Online / aggregator"];
  };

  func underservedFor(category : Text) : [Text] {
    ["Limited organised " # category # " supply in the area", "Untapped weekly market demand", "Gap in quality-assured local supply"];
  };

  func demandFor(category : Text) : [Text] {
    ["Growing local consumption", "Nearby town demand", "Seasonal festival demand"];
  };

  func supplyFor(category : Text) : [Text] {
    ["Few organised suppliers", "Dependence on distant supply", "Limited cold-chain presence"];
  };

  func buildMarket(input : Types.AnalysisInput, radius : Types.Radius) : Types.MarketReach {
    let factor = radiusFactor(radius);
    let reach = toNat(input.capital.toFloat() * 6.0 * factor);
    let customerBase = toNat(reach.toFloat() / 4.0);
    {
      estimatedReach = estimate(reach, #Calculated, #Medium);
      potentialCustomerBase = estimate(customerBase, #Calculated, #Medium);
      nearbyMarkets = nearbyMarketsFor(input.category);
      distributionChannels = channelsFor(input.category);
      accessibility = "Accessible via " # input.village # " with road links to " # input.block # " block and " # input.district # " district in " # input.state;
      underservedOpportunities = underservedFor(input.category);
      demandIndicators = demandFor(input.category);
      supplyIndicators = supplyFor(input.category);
      competitionLevel = "Moderate";
    };
  };

  func buildMap(input : Types.AnalysisInput, radius : Types.Radius) : Types.MapData {
    {
      userLocation = { lat = 0.0; lng = 0.0 };
      competitors = [];
      competitorDensity = 0.0;
      nearestCompetitors = [];
      averageDistance = 0.0;
      businessClusters = ["Village centre", "Block market cluster"];
      underservedZones = ["Outer " # radiusText(radius) # " ring", "Areas beyond the main market"];
      reliableDataAvailable = false;
    };
  };

  func buildScores(input : Types.AnalysisInput, radius : Types.Radius) : Types.Scores {
    let factor = radiusFactor(radius);
    let cap = input.capital.toFloat();
    let demand = clampScore(55.0 + (cap / 200000.0) * 15.0 + (factor - 1.0) * 8.0);
    let supplyGap = clampScore(48.0 + (cap / 200000.0) * 10.0 + (factor - 1.0) * 6.0);
    let competition = clampScore(42.0 + (cap / 200000.0) * 8.0 + (factor - 1.0) * 5.0);
    let opportunity = clampScore(52.0 + (cap / 200000.0) * 12.0 + (factor - 1.0) * 10.0);
    {
      demand = {
        score = demand;
        explanation = "Local demand for " # input.category # " is estimated to be solid, supported by nearby town and weekly market consumption.";
        reasoning = "Demand is derived from the capital invested, the selected radius, and typical rural consumption patterns for " # input.category # ".";
      };
      supplyGap = {
        score = supplyGap;
        explanation = "Organised supply of " # input.category # " in the area appears limited, leaving room for a new entrant.";
        reasoning = "Supply gap reflects the low number of organised suppliers and dependence on distant supply in the region.";
      };
      competition = {
        score = competition;
        explanation = "Competition is moderate, with a few local players but no dominant organised competitor.";
        reasoning = "Competition is estimated from the category, radius, and typical density of similar businesses in rural markets.";
      };
      opportunity = {
        score = opportunity;
        explanation = "There is a meaningful opportunity to serve underserved demand and expand into the district market.";
        reasoning = "Opportunity combines the demand score, supply gap, and the wider reach of the selected radius.";
      };
    };
  };

  func buildPricing(input : Types.AnalysisInput, radius : Types.Radius) : Types.Pricing {
    let cap = input.capital.toFloat();
    let production = toNat(cap * 0.35);
    let transport = toNat(cap * 0.10);
    let packaging = toNat(cap * 0.08);
    let operating = toNat(cap * 0.12);
    let total = (production + transport + packaging + operating).toFloat();
    let minPrice = toNat(total * 1.15);
    let maxPrice = toNat(total * 1.45);
    let avgPrice = (minPrice + maxPrice) / 2;
    let margin = toNat((maxPrice.toFloat() - total) / maxPrice.toFloat() * 100.0);
    {
      competitorPriceRange = { min = minPrice; max = maxPrice; avg = avgPrice };
      productionCost = estimate(production, #Calculated, #Medium);
      transportCost = estimate(transport, #Estimated, #Medium);
      packagingCost = estimate(packaging, #Estimated, #Medium);
      operatingCost = estimate(operating, #Estimated, #Low);
      recommendedPriceRange = { min = minPrice; max = maxPrice };
      estimatedMargin = estimate(margin, #Calculated, #Medium);
    };
  };

  func buildSwot(input : Types.AnalysisInput, radius : Types.Radius) : Types.SWOT {
    {
      strengths = [
        "Local demand for " # input.category,
        "Low initial competition in the area",
        "Direct access to raw materials",
        "Short transport distance to market"
      ];
      weaknesses = [
        "Limited cold-chain infrastructure",
        "Dependence on seasonal demand",
        "Single-buyer risk in wholesale",
        "Capital constraints at " # input.village
      ];
      opportunities = [
        "Expand into " # input.district # " district market",
        "Add value-added " # input.category # " products",
        "Leverage weekly market demand",
        "Build a direct-to-consumer channel"
      ];
      threats = [
        "Supply-chain bottlenecks",
        "Raw-material price volatility",
        "Competition from distant suppliers",
        "Weak transport connectivity in monsoon"
      ];
    };
  };

  func buildRisk(input : Types.AnalysisInput, radius : Types.Radius) : Types.RiskAssessment {
    let cap = input.capital.toFloat();
    let factor = radiusFactor(radius);
    {
      categories = [
        {
          category = "Financial";
          level = riskLevel(70.0 - (cap / 200000.0) * 20.0);
          why = "Higher capital reduces financial strain, but cash-flow gaps remain a risk for a new rural business.";
          whatToDo = "Maintain a working-capital buffer and track monthly cash flow closely.";
        },
        {
          category = "Market";
          level = riskLevel(55.0 + (factor - 1.0) * 10.0);
          why = "Demand is solid but depends on local and seasonal consumption patterns.";
          whatToDo = "Diversify sales across retail, wholesale, and direct channels.";
        },
        {
          category = "Supply";
          level = riskLevel(60.0);
          why = "Raw-material availability and cold-chain gaps can disrupt supply.";
          whatToDo = "Build relationships with multiple suppliers and plan for storage.";
        },
        {
          category = "Seasonality";
          level = riskLevel(58.0);
          why = "Demand for " # input.category # " varies with seasons and festivals.";
          whatToDo = "Plan production and inventory around seasonal demand peaks.";
        },
        {
          category = "Operational";
          level = riskLevel(50.0);
          why = "Day-to-day operations depend on transport and local infrastructure.";
          whatToDo = "Set up reliable transport and maintenance routines.";
        },
        {
          category = "Customer Concentration";
          level = riskLevel(62.0);
          why = "Heavy reliance on a single wholesale buyer increases risk.";
          whatToDo = "Develop multiple buyers and a direct-to-consumer channel.";
        }
      ];
    };
  };

  public func runAnalysis(input : Types.AnalysisInput, radius : Types.Radius) : Types.AnalysisResult {
    {
      market = buildMarket(input, radius);
      map = buildMap(input, radius);
      scores = buildScores(input, radius);
      pricing = buildPricing(input, radius);
      swot = buildSwot(input, radius);
      risk = buildRisk(input, radius);
    };
  };

  public func getAnalysis(analyses : List.List<Types.Analysis>, id : Nat) : ?Types.Analysis {
    analyses.find(func a = a.id == id);
  };

  public func listAnalyses(analyses : List.List<Types.Analysis>) : [Types.Analysis] {
    analyses.toArray();
  };

  func roleText(role : { #user; #assistant }) : Text {
    switch (role) {
      case (#user) "user";
      case (#assistant) "assistant";
    };
  };

  func buildContext(a : Types.Analysis) : Text {
    let input = a.input;
    "Business: " # input.category # " in " # input.village # ", " # input.block # " block, " # input.district # " district, " # input.state # ". "
    # "Capital: Rs " # input.capital.toText() # ". "
    # "Radius: " # radiusText(a.radius) # ". "
    # "Estimated reach: " # a.result.market.estimatedReach.value.toText() # ". "
    # "Potential customer base: " # a.result.market.potentialCustomerBase.value.toText() # ". "
    # "Competition level: " # a.result.market.competitionLevel # ". "
    # "Demand score: " # a.result.scores.demand.score.toText() # ". "
    # "Supply gap score: " # a.result.scores.supplyGap.score.toText() # ". "
    # "Competition score: " # a.result.scores.competition.score.toText() # ". "
    # "Opportunity score: " # a.result.scores.opportunity.score.toText() # ". "
    # "Recommended price range: Rs " # a.result.pricing.recommendedPriceRange.min.toText() # " to Rs " # a.result.pricing.recommendedPriceRange.max.toText() # ".";
  };

  func buildChatPrompt(context : Text, request : Types.ChatRequest) : Text {
    let history = request.history.map(func m = roleText(m.role) # ": " # m.content).values().join("\n");
    "You are UdyamAI, a helpful assistant for a rural Indian entrepreneur. "
    # "Answer the user's question using ONLY the analysis context provided below. "
    # "You are strictly an explanation and recommendation layer. "
    # "You must NEVER invent loan amounts, scheme eligibility, competitor numbers, financial calculations, or factual market values. "
    # "If the user asks for a number or fact you do not have in the context, clearly say you do not have that data rather than guessing. "
    # "Keep answers clear, practical, and in simple language.\n\n"
    # "ANALYSIS CONTEXT:\n" # context # "\n\n"
    # "CONVERSATION HISTORY:\n" # history # "\n\n"
    # "USER QUESTION:\n" # request.message;
  };

  func runInference<system>(prompt : Text) : async* Text {
    let config = fromEnv<system>();
    let userMessage = ChatCompletionRequestMessageOneOf2.JSON.init({
      content = #string(prompt);
      role = #user;
    });
    let req = ChatCompletionRequest.JSON.init({
      messages = [#user(userMessage)];
      model = "router";
    });
    let resp = await* ChatApi.createChatCompletion(config, req);
    if (resp.choices.size() == 0) {
      Runtime.trap("Inference returned no choices");
    };
    resp.choices[0].message.content ?? Runtime.trap("Inference returned no text content");
  };

  public func chat<system>(analyses : List.List<Types.Analysis>, request : Types.ChatRequest) : async* Types.ChatResponse {
    let context = switch (analyses.find(func a = a.id == request.analysisId)) {
      case (?a) { buildContext(a) };
      case null { "No analysis found for this context. Please run an analysis first." };
    };
    let prompt = buildChatPrompt(context, request);
    let reply = await* runInference<system>(prompt);
    { reply };
  };
};
