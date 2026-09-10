import { PocketIc } from "@dfinity/pic";
// `@icp-sdk/core` is a dependency of the frontend package, not of the app root,
// so it is not resolvable as a bare specifier from this lane directory. Import
// the frontend's installed copy directly.
import { Principal } from "../../src/frontend/node_modules/@icp-sdk/core/lib/esm/principal/index.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

// Distinct, non-anonymous principals. The authorization mixin registers the
// first caller to call `_initialize_access_control` as admin and every later
// caller as a user, so each test gets its own canister to keep that one-time
// assignment independent.
const ADMIN = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");
const ALICE = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
const BOB = Principal.fromText("r7inp-6aaaa-aaaaa-aaabq-cai");

let pic: PocketIc | undefined;

async function freshActor(): Promise<_SERVICE> {
  const { actor } = await pic!.setupCanister<_SERVICE>({ idlFactory, wasm: BACKEND_WASM });
  return actor;
}

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
});

afterAll(async () => {
  await pic?.tearDown();
});

describe("UdyamAI backend authorization exports", () => {
  it("answers an empty-state read instead of trapping", async () => {
    const actor = await freshActor();
    // A fresh canister has no caller role assigned yet; the anonymous caller
    // reads as guest rather than trapping.
    await expect(actor.getCallerUserRole()).resolves.toBeDefined();
    await expect(actor.isCallerAdmin()).resolves.toBe(false);
  });

  it("round-trips a caller role through the real canister", async () => {
    const actor = await freshActor();
    // Register the caller first (first registration becomes admin), then assign
    // a role to it and read it back.
    actor.setPrincipal(ADMIN);
    await actor._initialize_access_control();
    await expect(actor.assignCallerUserRole(ADMIN, { user: null })).resolves.toBeNull();
    expect(await actor.getCallerUserRole()).toEqual({ user: null });
  });

  it("does not show one caller's role to another", async () => {
    const actor = await freshActor();
    // Register two distinct callers; the first becomes admin, the second a user.
    actor.setPrincipal(ALICE);
    await actor._initialize_access_control();
    actor.setPrincipal(BOB);
    await actor._initialize_access_control();
    // A non-admin caller must not see the admin role.
    actor.setPrincipal(BOB);
    expect(await actor.getCallerUserRole()).not.toEqual({ admin: null });
  });

  it("exposes the schema and execute endpoints", async () => {
    const actor = await freshActor();
    await expect(actor.schema()).resolves.toBeTypeOf("string");
    // A well-formed OQL query (with a `start` field) parses and reaches the
    // executor — it fails on the unknown entity, not on the JSON parse stage,
    // which proves the endpoint is reachable and the query is well-formed.
    // The app configures no OQL entities (`Expose({ entities = [] })`), so any
    // start entity is unknown.
    await expect(actor.execute('{"start":"customer"}')).rejects.toThrow(/unknown entity/);
  });

  it("exposes the internet identity sign-in endpoints without trapping", async () => {
    const actor = await freshActor();
    await expect(actor._internet_identity_sign_in_start()).resolves.toBeInstanceOf(Uint8Array);
    await expect(actor._internet_identity_sign_in_finish()).resolves.toBeDefined();
  });

  it("initializes access control without trapping", async () => {
    const actor = await freshActor();
    await expect(actor._initialize_access_control()).resolves.toBeNull();
  });
});

// Deterministic financial-planning and scheme-routing coverage against the real
// canister. These assert the backend's own math with concrete inputs and fixed,
// verifiable outputs — never fake or randomized numbers. The backend is the
// source of truth for the financial engine, so this is the strongest evidence
// that the deterministic calculations are correct.
describe("UdyamAI backend deterministic financial engine", () => {
  // Scheme: 10% beneficiary contribution / 90% loan, up to ₹10 lakh.
  const RULE = {
    name: "Test Scheme",
    minProjectCost: 100000n,
    maxProjectCost: 1000000n,
    loanPercent: 90n,
    beneficiaryContributionPercent: 10n,
    interestRatePercent: 9n,
    tenureMonths: 60n,
    moratoriumMonths: 0n,
  };

  const FINANCE_INPUT = {
    proposedProjectCost: 500000n,
    ownCapital: 100000n,
    loanRequirement: 450000n,
    tenureMonths: 60n,
    interestRatePercent: 9n,
    marginPercent: 10n,
    moratoriumMonths: 0n,
    operatingCosts: {
      rent: 8000n,
      salary: 15000n,
      rawMaterial: 20000n,
      electricity: 3000n,
      transport: 4000n,
      packaging: 2500n,
      marketing: 3000n,
      maintenance: 2000n,
      other: 2500n,
    },
    workingCapital: {
      initialRequirement: 100000n,
      monthlyRequirement: 60000n,
      emergencyBufferPercent: 10n,
    },
    pricePerUnit: 120n,
    variableCostPerUnit: 60n,
  };

  it("computes financing deterministically from scheme-specific rules", async () => {
    const actor = await freshActor();
    const financing = await actor.computeFinancing(FINANCE_INPUT, RULE);
    // ownCapital 100000 at 10% margin supports a 1000000 project, but the
    // proposed 500000 is lower, so the feasible project cost is 500000.
    expect(financing.feasibleProjectCost.value).toBe(500000n);
    // 90% loan of the feasible project cost, capped by the loan requirement.
    expect(financing.maximumLoan.value).toBe(450000n);
    expect(financing.loanAmount.value).toBe(450000n);
    // Beneficiary contribution = feasible project cost - loan amount.
    expect(financing.beneficiaryContribution.value).toBe(50000n);
  });

  it("caps the feasible project cost at the scheme maximum", async () => {
    const actor = await freshActor();
    const financing = await actor.computeFinancing(
      { ...FINANCE_INPUT, proposedProjectCost: 2000000n },
      RULE,
    );
    expect(financing.feasibleProjectCost.value).toBe(1000000n);
    expect(financing.maximumLoan.value).toBe(900000n);
  });

  it("computes moratorium interest and the shifted repayment start", async () => {
    const actor = await freshActor();
    const moratorium = await actor.computeMoratorium(450000n, 9n, 6n);
    expect(moratorium.moratoriumMonths).toBe(6n);
    expect(moratorium.repaymentStartMonth).toBe(7n);
    // Simple interest on the full loan for 6 months at 9% p.a.
    expect(moratorium.interestAccruedDuringMoratorium.value).toBe(20250n);
  });

  it("computes working capital with the emergency buffer", async () => {
    const actor = await freshActor();
    const wc = await actor.computeWorkingCapital({
      initialRequirement: 100000n,
      monthlyRequirement: 60000n,
      emergencyBufferPercent: 10n,
    });
    expect(wc.initialRequirement.value).toBe(100000n);
    expect(wc.monthlyRequirement.value).toBe(60000n);
    expect(wc.emergencyBuffer.value).toBe(6000n);
    expect(wc.totalRequirement.value).toBe(166000n);
  });

  it("computes break-even units and sales from fixed and variable costs", async () => {
    const actor = await freshActor();
    const breakEven = await actor.computeBreakEven(60000n, 60n, 120n);
    // Contribution per unit = 120 - 60 = 60; units = ceil(60000 / 60) = 1000.
    expect(breakEven.breakEvenUnits).toEqual([{ value: 1000n, provenance: { Calculated: null }, confidence: { High: null } }]);
    expect(breakEven.breakEvenSales.value).toBe(120000n);
  });

  it("computes the total cash requirement without double-counting the buffer", async () => {
    const actor = await freshActor();
    const cash = await actor.computeCashRequirement(500000n, 166000n, 6000n);
    expect(cash.projectCost.value).toBe(500000n);
    expect(cash.workingCapital.value).toBe(166000n);
    expect(cash.buffer.value).toBe(6000n);
    // total = project cost + working capital (buffer already included).
    expect(cash.total.value).toBe(666000n);
  });

  it("produces a full amortization schedule that repays the loan", async () => {
    const actor = await freshActor();
    const amortization = await actor.computeAmortization(450000n, 9n, 60n, 0n);
    expect(amortization.emi.value).toBeGreaterThan(0n);
    expect(amortization.schedule).toHaveLength(60);
    expect(amortization.schedule[0].month).toBe(1n);
    expect(amortization.schedule[59].month).toBe(60n);
    // The loan principal is fully repaid (small rounding residual remains).
    expect(amortization.schedule[59].closingBalance).toBeLessThan(
      amortization.emi.value,
    );
    expect(amortization.principalInterest.totalPrincipal).toBe(450000n);
    expect(amortization.principalInterest.totalRepayment).toBe(
      amortization.principalInterest.totalPrincipal +
        amortization.principalInterest.totalInterest,
    );
  });

  it("ties financing, amortization, working capital, and break-even into one plan", async () => {
    const actor = await freshActor();
    const plan = await actor.computeFinancialPlan(FINANCE_INPUT, RULE);
    expect(plan.financing.loanAmount.value).toBe(450000n);
    expect(plan.financing.beneficiaryContribution.value).toBe(50000n);
    expect(plan.amortization.emi.value).toBeGreaterThan(0n);
    expect(plan.amortization.schedule).toHaveLength(60);
    expect(plan.moratorium.repaymentStartMonth).toBe(1n);
    expect(plan.workingCapital.totalRequirement.value).toBe(166000n);
    expect(plan.cashRequirement.total.value).toBe(666000n);
    // Monthly operating cost is the sum of the nine operating cost inputs.
    expect(plan.monthlyOperatingCost.value).toBe(60000n);
    // Break-even uses the operating cost as fixed costs.
    expect(plan.breakEven.breakEvenUnits).toEqual([
      { value: 1000n, provenance: { Calculated: null }, confidence: { High: null } },
    ]);
    expect(plan.breakEven.breakEvenSales.value).toBe(120000n);
  });
});

describe("UdyamAI backend deterministic scheme routing", () => {
  it("lists the seeded schemes without trapping", async () => {
    const actor = await freshActor();
    const schemes = await actor.listSchemes();
    // The canister ships a seeded government-scheme database.
    expect(schemes.length).toBeGreaterThan(0);
    // Every listed scheme is Active and carries its verified financing terms.
    for (const scheme of schemes) {
      expect(scheme.status).toEqual({ Active: null });
    }
    expect(schemes.some((s) => s.name.includes("PMEGP"))).toBe(true);
  });

  it("routes schemes deterministically and never claims guaranteed eligibility", async () => {
    const actor = await freshActor();
    // A manufacturing business in the "all" location for a general beneficiary
    // at ₹10 lakh matches PMEGP, MUDRA, and CGTMSE by their seeded rules.
    const result = await actor.routeSchemes({
      businessCategory: "manufacturing",
      projectCost: 1000000n,
      location: "all",
      beneficiaryCategory: "general",
      contribution: 100000n,
    });
    // The heading is always the honest "Potentially applicable" label, never a
    // guaranteed-eligibility claim.
    expect(result.heading).toBe("Potentially applicable");
    const names = result.matches.map((m) => m.scheme.name);
    expect(names).toContain("PMEGP (Prime Minister's Employment Generation Programme)");
    expect(names).toContain("Pradhan Mantri MUDRA Yojana (Tarun)");
    expect(names).toContain("CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises)");
    // Stand-Up India requires an SC/ST/women beneficiary, so it must not match
    // a general beneficiary — routing is deterministic, not a blanket match.
    expect(names).not.toContain("Stand-Up India");
  });

  it("returns no matches when no scheme rule fits the input", async () => {
    const actor = await freshActor();
    // A dairy business matches no seeded rule (rules cover manufacturing,
    // service, trading, and food processing), so the result is empty but the
    // honest heading is still returned.
    const result = await actor.routeSchemes({
      businessCategory: "dairy",
      projectCost: 250000n,
      location: "bihar",
      beneficiaryCategory: "general",
      contribution: 25000n,
    });
    expect(result.heading).toBe("Potentially applicable");
    expect(result.matches).toEqual([]);
  });
});
