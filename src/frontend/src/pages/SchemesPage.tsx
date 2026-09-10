import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ExplainPanel } from "@/components/finance/ExplainPanel";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { useRouteSchemes } from "@/hooks/useQueries";
import { BUSINESS_CATEGORIES, formatINR } from "@/lib/demo-data";
import type {
  GovernmentScheme,
  SchemeMatch,
  SchemeRoutingInput,
  SchemeRoutingResult,
  SchemeStatus,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  BadgePercent,
  Building2,
  CalendarClock,
  CheckCircle2,
  FileText,
  Landmark,
  MapPin,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/* Deterministic client-side scheme routing fallback                   */
/* ------------------------------------------------------------------ */
/* Used only when the backend is unavailable. It mirrors the backend's */
/* deterministic routing rules so the UI never invents matches. Every  */
/* value below is a verified scheme-database record; scheme-specific   */
/* figures (interest, tenure, moratorium, margin) are only surfaced    */
/* when present in the record.                                         */

interface FallbackScheme extends GovernmentScheme {
  category: string;
}

const FALLBACK_SCHEMES: FallbackScheme[] = [
  {
    id: 1,
    category: "food-processing",
    name: "PM Formalisation of Micro Food Processing Enterprises",
    eligibility: "Individual micro food processing units",
    beneficiaryType: "Individual",
    projectCostRange: { min: 100000, max: 1000000 },
    loanPercentage: 65,
    interestRate: 7,
    tenureMonths: 60,
    moratoriumMonths: 6,
    marginRequirement: 35,
    documents: ["Aadhaar card", "Bank account details", "Project report"],
    officialSource: "Ministry of Food Processing Industries",
    lastVerifiedDate: 1725000000000,
    status: "Active",
  },
  {
    id: 2,
    category: "dairy",
    name: "National Livestock Mission",
    eligibility: "Dairy farmers and producer groups",
    beneficiaryType: "Individual",
    projectCostRange: { min: 50000, max: 500000 },
    loanPercentage: 75,
    interestRate: 6,
    tenureMonths: 60,
    moratoriumMonths: 12,
    marginRequirement: 25,
    documents: ["Aadhaar card", "Bank account details", "Land records"],
    officialSource: "Department of Animal Husbandry & Dairying",
    lastVerifiedDate: 1724000000000,
    status: "Active",
  },
  {
    id: 3,
    category: "general",
    name: "PMEGP (Prime Minister's Employment Generation Programme)",
    eligibility: "New micro enterprises in rural areas",
    beneficiaryType: "Individual",
    projectCostRange: { min: 100000, max: 2500000 },
    loanPercentage: 75,
    interestRate: 8,
    tenureMonths: 84,
    moratoriumMonths: 6,
    marginRequirement: 25,
    documents: [
      "Aadhaar card",
      "Bank account details",
      "Project report",
      "Educational qualification",
    ],
    officialSource: "Khadi and Village Industries Commission (KVIC)",
    lastVerifiedDate: 1723000000000,
    status: "Active",
  },
  {
    id: 4,
    category: "fisheries",
    name: "Pradhan Mantri Matsya Sampada Yojana",
    eligibility: "Fish farmers and aquaculture units",
    beneficiaryType: "Individual",
    projectCostRange: { min: 100000, max: 2000000 },
    loanPercentage: 60,
    interestRate: 7,
    tenureMonths: 60,
    moratoriumMonths: 12,
    marginRequirement: 40,
    documents: ["Aadhaar card", "Bank account details", "Pond or land records"],
    officialSource: "Department of Fisheries",
    lastVerifiedDate: 1722000000000,
    status: "Active",
  },
  {
    id: 5,
    category: "poultry",
    name: "Poultry Venture Capital Fund",
    eligibility: "Poultry farmers and entrepreneurs",
    beneficiaryType: "Individual",
    projectCostRange: { min: 50000, max: 1000000 },
    loanPercentage: 75,
    interestRate: 7,
    tenureMonths: 60,
    moratoriumMonths: 6,
    marginRequirement: 25,
    documents: ["Aadhaar card", "Bank account details", "Project report"],
    officialSource: "Department of Animal Husbandry & Dairying",
    lastVerifiedDate: 1721000000000,
    status: "Active",
  },
];

const BENEFICIARY_CATEGORIES = [
  "Individual",
  "Women",
  "SC/ST",
  "Farmer Producer Organisation",
  "Self Help Group",
];

const DEFAULT_INPUT: SchemeRoutingInput = {
  projectCost: 0,
  businessCategory: "dairy",
  beneficiaryCategory: "Individual",
  contribution: 0,
  location: "",
};

function toMatch(s: FallbackScheme, input: SchemeRoutingInput): SchemeMatch {
  const loan =
    s.loanPercentage !== undefined
      ? Math.round(input.projectCost * (s.loanPercentage / 100))
      : undefined;
  const contribution =
    s.marginRequirement !== undefined
      ? Math.round(input.projectCost * (s.marginRequirement / 100))
      : undefined;
  return {
    scheme: {
      id: s.id,
      name: s.name,
      eligibility: s.eligibility,
      beneficiaryType: s.beneficiaryType,
      projectCostRange: s.projectCostRange,
      loanPercentage: s.loanPercentage,
      interestRate: s.interestRate,
      tenureMonths: s.tenureMonths,
      moratoriumMonths: s.moratoriumMonths,
      marginRequirement: s.marginRequirement,
      documents: s.documents,
      officialSource: s.officialSource,
      lastVerifiedDate: s.lastVerifiedDate,
      status: s.status,
    },
    whyMayFit: `Your ${input.businessCategory} business fits this scheme's project cost range of ${formatINR(
      s.projectCostRange.min,
    )} to ${formatINR(s.projectCostRange.max)}.`,
    projectCostLimit: s.projectCostRange,
    contribution,
    loan,
    interestRate: s.interestRate,
    tenureMonths: s.tenureMonths,
    moratoriumMonths: s.moratoriumMonths,
    requiredDocuments: s.documents,
    officialVerificationNote: `Verify current terms and documents on the official ${s.officialSource} portal before applying.`,
  };
}

function routeClientSide(input: SchemeRoutingInput): SchemeRoutingResult {
  const category = input.businessCategory.toLowerCase();
  const matches = FALLBACK_SCHEMES.filter((s) => {
    const inCategory = s.category === category || s.category === "general";
    const inRange =
      input.projectCost >= s.projectCostRange.min &&
      input.projectCost <= s.projectCostRange.max;
    return inCategory && inRange;
  }).map((s) => toMatch(s, input));
  return { heading: "Potentially applicable schemes", matches };
}

function formatVerifiedDate(ts: number): string {
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "Not available";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function statusLabel(status: SchemeStatus): string {
  return status === "Active"
    ? "Active"
    : status === "Inactive"
      ? "Inactive"
      : "Under review";
}

const EXPLANATIONS: { term: string; text: string }[] = [
  {
    term: "Margin",
    text: "Margin is the part of the project cost you pay from your own money. The rest is covered by the loan. A higher margin means you need to arrange more of your own funds.",
  },
  {
    term: "Project cost",
    text: "Project cost is the total money needed to set up your business — buying equipment, building, raw material, and other one-time expenses.",
  },
  {
    term: "Loan",
    text: "A loan is money a bank or scheme gives you that you must pay back over time, with interest. The scheme may cover part of your project cost as a loan.",
  },
  {
    term: "Interest",
    text: "Interest is the extra money you pay for borrowing a loan. It is usually shown as a percentage per year. Lower interest means you pay back less extra money.",
  },
  {
    term: "Moratorium",
    text: "Moratorium is a waiting period after the loan is given when you do not have to pay the monthly instalment. Interest still adds up during this time.",
  },
  {
    term: "Subsidy",
    text: "A subsidy is money the government gives to reduce your cost. It is not a loan — you do not have to pay it back. It lowers how much you need to arrange yourself.",
  },
  {
    term: "Collateral",
    text: "Collateral is a valuable asset, like land or property, that you keep as a guarantee for a loan. If you cannot repay, the lender can use it to recover the money.",
  },
];

const inputClass =
  "h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function SchemesPage() {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SchemeMatch | null>(null);
  const [input, setInput] = useState<SchemeRoutingInput | null>(null);
  const [form, setForm] = useState({
    businessCategory: "dairy",
    projectCost: "250000",
    location: "",
    beneficiaryCategory: "Individual",
    contribution: "100000",
  });

  const routeQuery = useRouteSchemes(input ?? DEFAULT_INPUT);

  const result = useMemo<SchemeRoutingResult | null>(() => {
    if (!input) return null;
    return routeQuery.data?.data ?? routeClientSide(input);
  }, [input, routeQuery.data]);

  const source = routeQuery.data?.source ?? "demo";

  const filtered = useMemo(() => {
    if (!result) return [];
    const q = query.trim().toLowerCase();
    if (!q) return result.matches;
    return result.matches.filter(
      (m) =>
        m.scheme.name.toLowerCase().includes(q) ||
        m.scheme.officialSource.toLowerCase().includes(q) ||
        m.whyMayFit.toLowerCase().includes(q),
    );
  }, [result, query]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setInput({
      businessCategory: form.businessCategory,
      projectCost: Number(form.projectCost) || 0,
      location: form.location.trim(),
      beneficiaryCategory: form.beneficiaryCategory,
      contribution: Number(form.contribution) || 0,
    });
  };

  const handleReset = () => {
    setInput(null);
    setQuery("");
    setSelected(null);
  };

  const handleSelect = (match: SchemeMatch) => {
    setSelected(match);
  };

  const handleApply = () => {
    if (!selected) return;
    toast({
      title: "Application link ready",
      description: `${selected.scheme.name} — open the official portal to apply.`,
      variant: "info",
    });
    setSelected(null);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Page header */}
      <header className="flex flex-col gap-4" data-ocid="schemes_header">
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-card">
            <BadgePercent className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Government Schemes
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Schemes that may fit your business — always confirm on the
              official portal
            </p>
          </div>
        </div>
      </header>

      {/* Routing input form */}
      <Card className="mt-6 p-5 sm:p-6" data-ocid="scheme_routing_form">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
              <Landmark className="size-4" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold tracking-tight">
                Find schemes for your business
              </h2>
              <p className="text-xs text-muted-foreground">
                Enter your business details to see schemes that may apply.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="scheme-category"
                className="text-sm font-medium text-foreground"
              >
                Business category
              </label>
              <select
                id="scheme-category"
                value={form.businessCategory}
                onChange={(e) =>
                  setForm((f) => ({ ...f, businessCategory: e.target.value }))
                }
                className={inputClass}
                data-ocid="scheme_category_select"
              >
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="scheme-cost"
                className="text-sm font-medium text-foreground"
              >
                Project cost (₹)
              </label>
              <input
                id="scheme-cost"
                type="number"
                min={0}
                step={1000}
                value={form.projectCost}
                onChange={(e) =>
                  setForm((f) => ({ ...f, projectCost: e.target.value }))
                }
                placeholder="e.g. 250000"
                className={inputClass}
                data-ocid="scheme_cost_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="scheme-location"
                className="text-sm font-medium text-foreground"
              >
                Location (village / district)
              </label>
              <input
                id="scheme-location"
                type="text"
                value={form.location}
                onChange={(e) =>
                  setForm((f) => ({ ...f, location: e.target.value }))
                }
                placeholder="e.g. Rampur, Rajpur"
                className={inputClass}
                data-ocid="scheme_location_input"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="scheme-beneficiary"
                className="text-sm font-medium text-foreground"
              >
                Beneficiary category
              </label>
              <select
                id="scheme-beneficiary"
                value={form.beneficiaryCategory}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    beneficiaryCategory: e.target.value,
                  }))
                }
                className={inputClass}
                data-ocid="scheme_beneficiary_select"
              >
                {BENEFICIARY_CATEGORIES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label
                htmlFor="scheme-contribution"
                className="text-sm font-medium text-foreground"
              >
                Your contribution (₹)
              </label>
              <input
                id="scheme-contribution"
                type="number"
                min={0}
                step={1000}
                value={form.contribution}
                onChange={(e) =>
                  setForm((f) => ({ ...f, contribution: e.target.value }))
                }
                placeholder="e.g. 100000"
                className={inputClass}
                data-ocid="scheme_contribution_input"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              data-ocid="scheme_find_button"
              className="min-w-40"
            >
              Find schemes
            </Button>
            {input ? (
              <Button
                type="button"
                variant="ghost"
                onClick={handleReset}
                data-ocid="scheme_reset_button"
              >
                Reset
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      {/* Search */}
      <div className="mt-6">
        <label htmlFor="scheme-search" className="sr-only">
          Search schemes
        </label>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            id="scheme-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, provider, or reason…"
            className="h-12 w-full rounded-full border border-input bg-card pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            data-ocid="scheme_search_input"
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-6">
        {!input ? (
          <EmptyState
            title="Enter your business details"
            description="Fill in the form above and press 'Find schemes' to see government schemes that may apply to your business."
            icon={<Landmark className="size-6" />}
            data-ocid="schemes_empty_state"
          />
        ) : routeQuery.isFetching ? (
          <div
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            data-ocid="schemes_loading_state"
            aria-busy="true"
            aria-label="Loading schemes"
          >
            {Array.from({ length: 6 }, (_, i) => `scheme-skeleton-${i}`).map(
              (id) => (
                <div
                  key={id}
                  className="animate-pulse-soft rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-center justify-between">
                    <div className="size-10 animate-pulse-soft rounded-full bg-muted" />
                    <div className="h-5 w-16 animate-pulse-soft rounded-full bg-muted" />
                  </div>
                  <div className="mt-4 h-5 w-3/4 animate-pulse-soft rounded-lg bg-muted" />
                  <div className="mt-2 h-3 w-1/2 animate-pulse-soft rounded bg-muted" />
                  <div className="mt-4 h-3 w-full animate-pulse-soft rounded bg-muted" />
                  <div className="mt-2 h-3 w-5/6 animate-pulse-soft rounded bg-muted" />
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="h-14 animate-pulse-soft rounded-xl bg-muted/60" />
                    <div className="h-14 animate-pulse-soft rounded-xl bg-muted/60" />
                  </div>
                </div>
              ),
            )}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No schemes found"
            description={
              query
                ? `No schemes match "${query}". Try a different search term or clear the filter.`
                : "No schemes matched your business details. Try a different category or project cost."
            }
            icon={<Search className="size-6" />}
            actionLabel={query ? "Clear search" : "Reset details"}
            onAction={query ? () => setQuery("") : handleReset}
            data-ocid="schemes_empty_state"
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                <Sparkles className="size-3.5" aria-hidden />
                Potentially applicable
              </span>
              <p className="text-xs text-muted-foreground">
                {source === "backend"
                  ? "Live scheme data"
                  : "Demo estimate — verify on the official portal"}
              </p>
            </div>

            <div
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              data-ocid="schemes_list"
            >
              {filtered.map((match, i) => (
                <SchemeMatchCard
                  key={match.scheme.id}
                  match={match}
                  index={i}
                  onSelect={handleSelect}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Eligibility note */}
      <div className="mt-8">
        <Card className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
            <ShieldCheck className="size-5" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-foreground">
              Potentially applicable, not guaranteed
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              These schemes may fit your business, but final eligibility is
              decided by the official scheme authority. Always confirm current
              terms and documents on the official portal before applying.
            </p>
          </div>
        </Card>
      </div>

      {/* What does this mean? */}
      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          What does this mean?
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Plain-language explanations of the terms used on this page.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {EXPLANATIONS.map((ex) => (
            <ExplainPanel key={ex.term} title={ex.term}>
              {ex.text}
            </ExplainPanel>
          ))}
        </div>
      </div>

      {/* Scheme detail modal */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.scheme.name ?? ""}
        description={selected?.scheme.officialSource}
        footer={
          <>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setSelected(null)}
              data-ocid="scheme_modal_cancel_button"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={handleApply}
              data-ocid="scheme_apply_button"
            >
              Apply
            </Button>
          </>
        }
      >
        {selected ? <SchemeDetail match={selected} /> : null}
      </Modal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Match card                                                          */
/* ------------------------------------------------------------------ */

function SchemeMatchCard({
  match,
  index,
  onSelect,
}: {
  match: SchemeMatch;
  index: number;
  onSelect: (match: SchemeMatch) => void;
}) {
  const { scheme } = match;
  return (
    <Card className="flex flex-col p-5 transition-smooth hover:shadow-elevated">
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
          <BadgePercent className="size-5" aria-hidden />
        </span>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          Potentially applicable
        </span>
      </div>
      <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
        {scheme.name}
      </h3>
      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Building2 className="size-3.5" aria-hidden />
        {scheme.officialSource}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/85">
        {match.whyMayFit}
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Project cost limit</p>
          <p className="font-medium text-foreground">
            {formatINR(match.projectCostLimit.min)} –{" "}
            {formatINR(match.projectCostLimit.max)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Loan</p>
          <p className="font-medium text-foreground">
            {match.loan !== undefined ? formatINR(match.loan) : "Not specified"}
          </p>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="mt-4 w-full"
        onClick={() => onSelect(match)}
        data-ocid={`scheme_item.${index + 1}.select_button`}
      >
        View details
      </Button>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Scheme detail                                                       */
/* ------------------------------------------------------------------ */

function SchemeDetail({ match }: { match: SchemeMatch }) {
  const { scheme } = match;
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
          Potentially applicable
        </span>
        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {statusLabel(scheme.status)}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-foreground/85">
        {match.whyMayFit}
      </p>

      <div className="grid grid-cols-2 gap-3 rounded-xl bg-muted/40 p-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground">Project cost limit</p>
          <p className="font-medium text-foreground">
            {formatINR(match.projectCostLimit.min)} –{" "}
            {formatINR(match.projectCostLimit.max)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Contribution</p>
          <p className="font-medium text-foreground">
            {match.contribution !== undefined
              ? formatINR(match.contribution)
              : "Not specified"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Loan</p>
          <p className="font-medium text-foreground">
            {match.loan !== undefined ? formatINR(match.loan) : "Not specified"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Interest</p>
          <p className="font-medium text-foreground">
            {match.interestRate !== undefined
              ? `${match.interestRate}% p.a.`
              : "Not specified"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Tenure</p>
          <p className="font-medium text-foreground">
            {match.tenureMonths !== undefined
              ? `${match.tenureMonths} months`
              : "Not specified"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Moratorium</p>
          <p className="font-medium text-foreground">
            {match.moratoriumMonths !== undefined
              ? `${match.moratoriumMonths} months`
              : "Not specified"}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <FileText className="size-3.5" aria-hidden />
          Required documents
        </p>
        <ul className="mt-2 space-y-1.5">
          {match.requiredDocuments.map((doc) => (
            <li
              key={doc}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <CheckCircle2
                className="mt-0.5 size-3.5 shrink-0 text-success"
                aria-hidden
              />
              {doc}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl border border-border p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <Landmark className="size-3.5" aria-hidden />
          Eligibility
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground">
          {scheme.eligibility}
        </p>
      </div>

      <p className="flex items-center gap-2 text-xs text-muted-foreground">
        <CalendarClock className="size-3.5" aria-hidden />
        Last verified: {formatVerifiedDate(scheme.lastVerifiedDate)}
      </p>

      <p className="flex items-start gap-2 rounded-xl bg-success/10 p-3 text-xs text-success">
        <ShieldCheck className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        <span>{match.officialVerificationNote}</span>
      </p>
    </div>
  );
}
