import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  type UserRole = {
    #admin;
    #user;
    #guest;
  };

  type AccessControlState = {
    var adminAssigned : Bool;
    userRoles : Map.Map<Principal, UserRole>;
  };

  type Provenance = {
    #Estimated;
    #Observed;
    #Calculated;
    #UserProvided;
  };

  type Confidence = {
    #High;
    #Medium;
    #Low;
  };

  type Estimate = {
    value : Nat;
    provenance : Provenance;
    confidence : Confidence;
  };

  type AnalysisInput = {
    village : Text;
    block : Text;
    district : Text;
    state : Text;
    category : Text;
    capital : Nat;
  };

  type Radius = {
    #R5km;
    #R10km;
  };

  type Competitor = {
    id : Nat;
    name : Text;
    distanceKm : Float;
    priceRangeMin : Nat;
    priceRangeMax : Nat;
    priceRangeAvg : Nat;
    lat : Float;
    lng : Float;
  };

  type MarketReach = {
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

  type MapData = {
    userLocation : { lat : Float; lng : Float };
    competitors : [Competitor];
    competitorDensity : Float;
    nearestCompetitors : [Competitor];
    averageDistance : Float;
    businessClusters : [Text];
    underservedZones : [Text];
    reliableDataAvailable : Bool;
  };

  type ScoreCard = {
    score : Nat;
    explanation : Text;
    reasoning : Text;
  };

  type Scores = {
    demand : ScoreCard;
    supplyGap : ScoreCard;
    competition : ScoreCard;
    opportunity : ScoreCard;
  };

  type Pricing = {
    competitorPriceRange : { min : Nat; max : Nat; avg : Nat };
    productionCost : Estimate;
    transportCost : Estimate;
    packagingCost : Estimate;
    operatingCost : Estimate;
    recommendedPriceRange : { min : Nat; max : Nat };
    estimatedMargin : Estimate;
  };

  type SWOT = {
    strengths : [Text];
    weaknesses : [Text];
    opportunities : [Text];
    threats : [Text];
  };

  type RiskLevel = {
    #Low;
    #Medium;
    #High;
  };

  type RiskCategory = {
    category : Text;
    level : RiskLevel;
    why : Text;
    whatToDo : Text;
  };

  type RiskAssessment = {
    categories : [RiskCategory];
  };

  type AnalysisResult = {
    market : MarketReach;
    map : MapData;
    scores : Scores;
    pricing : Pricing;
    swot : SWOT;
    risk : RiskAssessment;
  };

  type Analysis = {
    id : Nat;
    input : AnalysisInput;
    radius : Radius;
    result : AnalysisResult;
    createdAt : Int;
  };

  type OldActor = {
    accessControlState : AccessControlState;
  };

  type NewActor = {
    accessControlState : AccessControlState;
    analyses : List.List<Analysis>;
    state : { var nextId : Nat };
  };

  public func migration(old : OldActor) : NewActor {
    {
      accessControlState = old.accessControlState;
      analyses = List.empty();
      state = { var nextId = 0 };
    };
  };
};
