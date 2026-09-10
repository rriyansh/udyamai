module {
  // Provenance label attached to every estimate.
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

  // Analysis input parameters captured from the New Analysis flow.
  public type AnalysisInput = {
    village : Text;
    block : Text;
    district : Text;
    state : Text;
    category : Text;
    capital : Nat;
  };

  // Analysis radius options.
  public type Radius = {
    #R5km;
    #R10km;
  };

  // A competitor business observed in the local market.
  public type Competitor = {
    id : Nat;
    name : Text;
    distanceKm : Float;
    priceRangeMin : Nat;
    priceRangeMax : Nat;
    priceRangeAvg : Nat;
    lat : Float;
    lng : Float;
  };

  // Market reach and customer-base estimates.
  public type MarketReach = {
    estimatedReach : Estimate;
    potentialCustomerBase : Estimate;
    nearbyMarkets : [Text];
    distributionChannels : [Text];
    accessibility : Text;
    underservedOpportunities : [Text];
    demandIndicators : [Text];
    supplyIndicators : [Text];
    competitionLevel : Text;
  };

  // Map data for the user/business location and competitor set.
  public type MapData = {
    userLocation : { lat : Float; lng : Float };
    competitors : [Competitor];
    competitorDensity : Float;
    nearestCompetitors : [Competitor];
    averageDistance : Float;
    businessClusters : [Text];
    underservedZones : [Text];
    reliableDataAvailable : Bool;
  };

  // One score card (Demand, Supply Gap, Competition, Opportunity).
  public type ScoreCard = {
    score : Nat;
    explanation : Text;
    reasoning : Text;
  };

  // The four score cards.
  public type Scores = {
    demand : ScoreCard;
    supplyGap : ScoreCard;
    competition : ScoreCard;
    opportunity : ScoreCard;
  };

  // Pricing breakdown.
  public type Pricing = {
    competitorPriceRange : { min : Nat; max : Nat; avg : Nat };
    productionCost : Estimate;
    transportCost : Estimate;
    packagingCost : Estimate;
    operatingCost : Estimate;
    recommendedPriceRange : { min : Nat; max : Nat };
    estimatedMargin : Estimate;
  };

  // SWOT analysis.
  public type SWOT = {
    strengths : [Text];
    weaknesses : [Text];
    opportunities : [Text];
    threats : [Text];
  };

  // Risk level for a risk category.
  public type RiskLevel = {
    #Low;
    #Medium;
    #High;
  };

  // One scored risk category with WHY and WHAT TO DO.
  public type RiskCategory = {
    category : Text;
    level : RiskLevel;
    why : Text;
    whatToDo : Text;
  };

  // Risk engine output across the six categories.
  public type RiskAssessment = {
    categories : [RiskCategory];
  };

  // Full derived analysis result.
  public type AnalysisResult = {
    market : MarketReach;
    map : MapData;
    scores : Scores;
    pricing : Pricing;
    swot : SWOT;
    risk : RiskAssessment;
  };

  // A stored analysis record.
  public type Analysis = {
    id : Nat;
    input : AnalysisInput;
    radius : Radius;
    result : AnalysisResult;
    createdAt : Int;
  };

  // A chat message in the Ask UdyamAI assistant conversation.
  public type ChatMessage = {
    role : { #user; #assistant };
    content : Text;
  };

  // Ask UdyamAI chat request bound to an analysis context.
  public type ChatRequest = {
    analysisId : Nat;
    message : Text;
    history : [ChatMessage];
  };

  // Ask UdyamAI chat response.
  public type ChatResponse = {
    reply : Text;
  };
};
