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

  type SchemeStatus = {
    #Active;
    #Inactive;
    #UnderReview;
  };

  type ProjectCostRange = {
    min : Nat;
    max : Nat;
  };

  type Scheme = {
    id : Nat;
    name : Text;
    eligibility : Text;
    projectCostRange : ProjectCostRange;
    beneficiaryType : Text;
    marginRequirement : ?Nat;
    loanPercentage : ?Nat;
    interestRate : ?Float;
    tenureMonths : ?Nat;
    moratoriumMonths : ?Nat;
    documents : [Text];
    officialSource : Text;
    lastVerifiedDate : Int;
    status : SchemeStatus;
  };

  type SchemeRule = {
    schemeId : Nat;
    businessCategories : [Text];
    locations : [Text];
    beneficiaryCategories : [Text];
  };

  type LoanProduct = {
    id : Nat;
    schemeId : Nat;
    name : Text;
    interestRate : ?Float;
    tenureMonths : ?Nat;
    moratoriumMonths : ?Nat;
    loanPercentage : ?Nat;
    marginRequirement : ?Nat;
  };

  type OldActor = {
    accessControlState : AccessControlState;
    analyses : List.List<Analysis>;
    state : { var nextId : Nat };
  };

  type NewActor = {
    accessControlState : AccessControlState;
    analyses : List.List<Analysis>;
    state : { var nextId : Nat };
    schemes : List.List<Scheme>;
    schemeRules : List.List<SchemeRule>;
    loanProducts : List.List<LoanProduct>;
  };

  public func migration(old : OldActor) : NewActor {
    // Last verified date (nanoseconds since Unix epoch) for the seeded schemes.
    let verified : Int = 1788307200000000000;

    let schemes : List.List<Scheme> = List.empty();
    schemes.add({
      id = 1;
      name = "PMEGP (Prime Minister's Employment Generation Programme)";
      eligibility = "New micro enterprises in manufacturing and service sectors; individuals or groups; minimum 8th standard education for projects above ₹10 lakh.";
      projectCostRange = { min = 500000; max = 2500000 };
      beneficiaryType = "General / Special category (SC/ST/OBC/Women/Minority/Ex-serviceman/PH)";
      marginRequirement = ?10;
      loanPercentage = ?90;
      interestRate = ?6.0;
      tenureMonths = ?84;
      moratoriumMonths = ?6;
      documents = ["Project report", "Identity proof", "Address proof", "Educational qualification", "Caste certificate (if applicable)", "Bank account details"];
      officialSource = "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp";
      lastVerifiedDate = verified;
      status = #Active;
    });
    schemes.add({
      id = 2;
      name = "Pradhan Mantri MUDRA Yojana (Tarun)";
      eligibility = "Non-farm income generating activities in manufacturing, trading, and service sectors; loan between ₹5 lakh and ₹10 lakh; collateral-free.";
      projectCostRange = { min = 500000; max = 1000000 };
      beneficiaryType = "All individuals, including women and SC/ST";
      marginRequirement = null;
      loanPercentage = ?100;
      interestRate = null;
      tenureMonths = ?60;
      moratoriumMonths = null;
      documents = ["Identity proof", "Address proof", "Business plan", "Bank account details"];
      officialSource = "https://www.mudra.org.in/";
      lastVerifiedDate = verified;
      status = #Active;
    });
    schemes.add({
      id = 3;
      name = "CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises)";
      eligibility = "Collateral-free credit facility to micro and small enterprises; new and existing businesses; guarantee cover up to ₹5 crore.";
      projectCostRange = { min = 0; max = 0 };
      beneficiaryType = "Micro and Small Enterprises";
      marginRequirement = null;
      loanPercentage = null;
      interestRate = null;
      tenureMonths = null;
      moratoriumMonths = null;
      documents = ["Business registration", "Project details", "Bank loan application"];
      officialSource = "https://www.cgtmse.in/";
      lastVerifiedDate = verified;
      status = #Active;
    });
    schemes.add({
      id = 4;
      name = "Stand-Up India";
      eligibility = "SC/ST and women entrepreneurs; greenfield enterprise in manufacturing, services, or trading; loan between ₹10 lakh and ₹1 crore.";
      projectCostRange = { min = 1000000; max = 10000000 };
      beneficiaryType = "SC/ST and Women";
      marginRequirement = ?10;
      loanPercentage = ?90;
      interestRate = null;
      tenureMonths = ?84;
      moratoriumMonths = ?18;
      documents = ["Identity proof", "Caste certificate (SC/ST)", "Business plan", "Project report", "Bank account details"];
      officialSource = "https://www.standupmitra.in/";
      lastVerifiedDate = verified;
      status = #Active;
    });
    schemes.add({
      id = 5;
      name = "PMFME (Pradhan Mantri Formalisation of Micro Food Processing Enterprises)";
      eligibility = "Micro food processing enterprises; individuals, FPOs, SHGs, and cooperatives; capital subsidy of 35% (up to ₹10 lakh).";
      projectCostRange = { min = 0; max = 10000000 };
      beneficiaryType = "Micro food processing enterprises";
      marginRequirement = null;
      loanPercentage = null;
      interestRate = null;
      tenureMonths = null;
      moratoriumMonths = null;
      documents = ["Identity proof", "Food business registration (FSSAI)", "Project report", "Bank account details"];
      officialSource = "https://pmfme.mofpi.gov.in/";
      lastVerifiedDate = verified;
      status = #Active;
    });

    let schemeRules : List.List<SchemeRule> = List.empty();
    schemeRules.add({
      schemeId = 1;
      businessCategories = ["manufacturing", "service", "trading"];
      locations = ["all"];
      beneficiaryCategories = ["general", "sc", "st", "obc", "women", "minority", "ex-serviceman", "ph"];
    });
    schemeRules.add({
      schemeId = 2;
      businessCategories = ["manufacturing", "trading", "service"];
      locations = ["all"];
      beneficiaryCategories = ["general", "sc", "st", "obc", "women", "minority"];
    });
    schemeRules.add({
      schemeId = 3;
      businessCategories = ["manufacturing", "service", "trading"];
      locations = ["all"];
      beneficiaryCategories = ["general", "sc", "st", "obc", "women", "minority"];
    });
    schemeRules.add({
      schemeId = 4;
      businessCategories = ["manufacturing", "service", "trading"];
      locations = ["all"];
      beneficiaryCategories = ["sc", "st", "women"];
    });
    schemeRules.add({
      schemeId = 5;
      businessCategories = ["food processing", "food", "agro processing"];
      locations = ["all"];
      beneficiaryCategories = ["general", "sc", "st", "obc", "women", "minority"];
    });

    let loanProducts : List.List<LoanProduct> = List.empty();
    loanProducts.add({
      id = 1;
      schemeId = 1;
      name = "PMEGP Term Loan";
      interestRate = ?6.0;
      tenureMonths = ?84;
      moratoriumMonths = ?6;
      loanPercentage = ?90;
      marginRequirement = ?10;
    });
    loanProducts.add({
      id = 2;
      schemeId = 2;
      name = "MUDRA Tarun";
      interestRate = null;
      tenureMonths = ?60;
      moratoriumMonths = null;
      loanPercentage = ?100;
      marginRequirement = null;
    });
    loanProducts.add({
      id = 3;
      schemeId = 4;
      name = "Stand-Up India Term Loan";
      interestRate = null;
      tenureMonths = ?84;
      moratoriumMonths = ?18;
      loanPercentage = ?90;
      marginRequirement = ?10;
    });

    {
      accessControlState = old.accessControlState;
      analyses = old.analyses;
      state = old.state;
      schemes;
      schemeRules;
      loanProducts;
    };
  };
};
