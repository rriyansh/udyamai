import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import ListEntity "mo:caffeineai-oql/ListEntity";
import Entity "mo:caffeineai-oql/Entity";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import FloatValue "mo:caffeineai-oql/FloatValue";
import List "mo:core/List";
import Types "types/analysis";
import AnalysisApi "mixins/analysis-api";
import ApiDocMixin "mixins/api-doc";
import FinanceApi "mixins/finance-api";
import SchemeApi "mixins/scheme-api";
import SchemeTypes "types/scheme";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let analyses : List.List<Types.Analysis>;
  let state : { var nextId : Nat };

  include AnalysisApi(analyses, state);

  let schemes : List.List<SchemeTypes.Scheme>;
  let schemeRules : List.List<SchemeTypes.SchemeRule>;
  let loanProducts : List.List<SchemeTypes.LoanProduct>;

  include FinanceApi();
  include SchemeApi(schemes, schemeRules, loanProducts);

  include Expose({
    entities = [
      analyses.toEntityManual("analysis", "Analysis", "id")
        .sample({
          id = 0;
          input = {
            village = "";
            block = "";
            district = "";
            state = "";
            category = "";
            capital = 0;
          };
          radius = #R5km;
          result = {
            market = {
              estimatedReach = { value = 0; provenance = #Estimated; confidence = #Low };
              potentialCustomerBase = { value = 0; provenance = #Estimated; confidence = #Low };
              nearbyMarkets = [];
              distributionChannels = [];
              accessibility = "";
              underservedOpportunities = [];
              demandIndicators = [];
              supplyIndicators = [];
              competitionLevel = "";
            };
            map = {
              userLocation = { lat = 0.0; lng = 0.0 };
              competitors = [];
              competitorDensity = 0.0;
              nearestCompetitors = [];
              averageDistance = 0.0;
              businessClusters = [];
              underservedZones = [];
              reliableDataAvailable = false;
            };
            scores = {
              demand = { score = 0; explanation = ""; reasoning = "" };
              supplyGap = { score = 0; explanation = ""; reasoning = "" };
              competition = { score = 0; explanation = ""; reasoning = "" };
              opportunity = { score = 0; explanation = ""; reasoning = "" };
            };
            pricing = {
              competitorPriceRange = { min = 0; max = 0; avg = 0 };
              productionCost = { value = 0; provenance = #Estimated; confidence = #Low };
              transportCost = { value = 0; provenance = #Estimated; confidence = #Low };
              packagingCost = { value = 0; provenance = #Estimated; confidence = #Low };
              operatingCost = { value = 0; provenance = #Estimated; confidence = #Low };
              recommendedPriceRange = { min = 0; max = 0 };
              estimatedMargin = { value = 0; provenance = #Estimated; confidence = #Low };
            };
            swot = { strengths = []; weaknesses = []; opportunities = []; threats = [] };
            risk = { categories = [] };
          };
          createdAt = 0;
        })
        .payload("id", func a = a.id)
        .payload("village", func a = a.input.village)
        .payload("block", func a = a.input.block)
        .payload("district", func a = a.input.district)
        .payload("state", func a = a.input.state)
        .payload("category", func a = a.input.category)
        .payload("capital", func a = a.input.capital)
        .payload("radius", func a = switch (a.radius) { case (#R5km) "5km"; case (#R10km) "10km" })
        .payload("createdAt", func a = a.createdAt)
        .payload("demandScore", func a = a.result.scores.demand.score)
        .payload("competitionLevel", func a = a.result.market.competitionLevel)
        .controllerOnly()
        .build(),
      schemes.toEntityManual("scheme", "Scheme", "id")
        .sample({
          id = 0;
          name = "";
          eligibility = "";
          projectCostRange = { min = 0; max = 0 };
          beneficiaryType = "";
          marginRequirement = null;
          loanPercentage = null;
          interestRate = null;
          tenureMonths = null;
          moratoriumMonths = null;
          documents = [];
          officialSource = "";
          lastVerifiedDate = 0;
          status = #Active;
        })
        .payload("id", func s = s.id)
        .payload("name", func s = s.name)
        .payload("eligibility", func s = s.eligibility)
        .payload("minProjectCost", func s = s.projectCostRange.min)
        .payload("maxProjectCost", func s = s.projectCostRange.max)
        .payload("beneficiaryType", func s = s.beneficiaryType)
        .payload("marginRequirement", func s = s.marginRequirement ?? 0)
        .payload("loanPercentage", func s = s.loanPercentage ?? 0)
        .payload("interestRate", func s = s.interestRate ?? 0.0)
        .payload("tenureMonths", func s = s.tenureMonths ?? 0)
        .payload("moratoriumMonths", func s = s.moratoriumMonths ?? 0)
        .payload("documents", func s = s.documents.values().join(", "))
        .payload("officialSource", func s = s.officialSource)
        .payload("lastVerifiedDate", func s = s.lastVerifiedDate)
        .payload("status", func s = switch (s.status) { case (#Active) "active"; case (#Inactive) "inactive"; case (#UnderReview) "underReview" })
        .controllerOnly()
        .build(),
      schemeRules.toEntityManual("schemeRule", "SchemeRule", "schemeId")
        .sample({
          schemeId = 0;
          businessCategories = [];
          locations = [];
          beneficiaryCategories = [];
        })
        .payload("schemeId", func r = r.schemeId)
        .payload("businessCategories", func r = r.businessCategories.values().join(", "))
        .payload("locations", func r = r.locations.values().join(", "))
        .payload("beneficiaryCategories", func r = r.beneficiaryCategories.values().join(", "))
        .controllerOnly()
        .build(),
      loanProducts.toEntityManual("loanProduct", "LoanProduct", "id")
        .sample({
          id = 0;
          schemeId = 0;
          name = "";
          interestRate = null;
          tenureMonths = null;
          moratoriumMonths = null;
          loanPercentage = null;
          marginRequirement = null;
        })
        .payload("id", func p = p.id)
        .payload("schemeId", func p = p.schemeId)
        .payload("name", func p = p.name)
        .payload("interestRate", func p = p.interestRate ?? 0.0)
        .payload("tenureMonths", func p = p.tenureMonths ?? 0)
        .payload("moratoriumMonths", func p = p.moratoriumMonths ?? 0)
        .payload("loanPercentage", func p = p.loanPercentage ?? 0)
        .payload("marginRequirement", func p = p.marginRequirement ?? 0)
        .controllerOnly()
        .build(),
    ];
  });

  include ApiDocMixin();
};
