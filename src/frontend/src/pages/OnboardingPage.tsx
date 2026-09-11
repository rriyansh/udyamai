import { BrandMark } from "@/components/BrandMark";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { AIExplanation } from "@/components/ui/AIExplanation";
import { ListenButton } from "@/components/ui/ListenButton";
import { Modal } from "@/components/ui/Modal";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { VoiceButton } from "@/components/ui/VoiceButton";
import { VoiceInput } from "@/components/ui/VoiceInput";
import { VOICE_LANGUAGE_OPTIONS } from "@/components/ui/LanguageSelector";
import { WhyButton } from "@/components/ui/WhyButton";
import { estimateCategoryOutlook } from "@/lib/analysis-engine";
import { BUSINESS_CATEGORIES } from "@/lib/demo-data";
import {
  getCurrentLocation,
  hasGoogleMapsKey,
  loadGoogleMaps,
  reverseGeocode,
  reverseGeocodeViaProxy,
} from "@/lib/map-service";
import { useOnboardingStore } from "@/lib/onboarding-store";
import type {
  BusinessCategoryId,
  OnboardingDraft,
  OnboardingProfile,
} from "@/lib/types";
import { cn } from "@/lib/utils";
import { createVoiceService, type VoiceLanguage } from "@/lib/voice-service";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Keyboard,
  MapPin,
  Mic,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/* Step configuration                                                  */
/* ------------------------------------------------------------------ */

type StepKey =
  | "name"
  | "village"
  | "block"
  | "district"
  | "state"
  | "margin"
  | "category"
  | "landAvailability"
  | "landAreaSqFt"
  | "experience"
  | "investment"
  | "sales"
  | "loan";

type StepKind = "text" | "number" | "category" | "location" | "choice";

const VOICE_COPY: Partial<Record<
  VoiceLanguage,
  Partial<Record<StepKey, { question: string; description?: string }>>
>> = {
  "en-IN": {},
  "hi-IN": {
    name: {
      question: "आपका नाम क्या है?",
      description: "हम आपका प्लान आपके नाम से बनाएंगे।",
    },
    village: {
      question: "आप किस गांव में रहते हैं?",
      description: "सुझावों में से सही जगह चुनें।",
    },
    category: {
      question: "आप कौन सा व्यवसाय शुरू करना चाहते हैं?",
      description: "अपने विचार के सबसे करीब विकल्प चुनें।",
    },
  },
  hinglish: {
    name: {
      question: "Aapka naam kya hai?",
      description: "Hum aapke naam se plan banayenge.",
    },
    village: {
      question: "Aap kis gaon mein rehte hain?",
      description: "Suggestions mein se sahi jagah choose karein.",
    },
    category: {
      question: "Aap kaunsa business start karna chahte hain?",
      description: "Apne idea ke sabse kareeb option choose karein.",
    },
  },
};

interface HelpTopic {
  title: string;
  content: string;
}

interface StepConfig {
  key: StepKey;
  label: string;
  question: string;
  description?: string;
  kind: StepKind;
  placeholder?: string;
  prefix?: string;
  optional?: boolean;
  help?: HelpTopic[];
}

const HELP: Record<string, HelpTopic> = {
  margin: {
    title: "What does 'margin capital' mean?",
    content:
      "Margin capital is the money you can put in yourself to start the business. It is your own contribution — savings, family support, or assets you can sell. Many schemes expect you to bring a small share and lend you the rest.",
  },
  "project-cost": {
    title: "What does 'project cost' mean?",
    content:
      "Project cost is the total money needed to set up the business — buying equipment, animals, raw material, and covering initial running costs. It is the full amount your plan requires, before any loan or subsidy.",
  },
  "concessional-loan": {
    title: "What is a 'concessional loan'?",
    content:
      "A concessional loan is a loan given at a lower interest rate than normal, often with easier terms. Government-backed schemes offer these to help small businesses grow without heavy interest pressure.",
  },
  emi: {
    title: "What is an 'EMI'?",
    content:
      "EMI stands for Equated Monthly Instalment. It is the fixed amount you pay the bank every month until the loan is fully repaid. It includes both the loan amount and the interest, spread evenly over the tenure.",
  },
  moratorium: {
    title: "What is a 'moratorium'?",
    content:
      "A moratorium is a grace period at the start of a loan when you do not have to pay the EMI. It gives a new business time to start earning before repayments begin. Interest may still accrue during this period.",
  },
  "working-capital": {
    title: "What is 'working capital'?",
    content:
      "Working capital is the money you need for day-to-day running — buying raw material, paying wages, and covering bills before customers pay you. It keeps the business moving between sales.",
  },
  "break-even": {
    title: "What does 'break-even' mean?",
    content:
      "Break-even is the point where your income exactly covers your costs — no profit, no loss. Reaching break-even means your business is paying for itself. Everything after that is profit.",
  },
  interest: {
    title: "What is 'interest'?",
    content:
      "Interest is the extra money you pay the bank for borrowing. It is calculated as a percentage of the loan amount each year. Lower interest means you repay less over the life of the loan.",
  },
  subsidy: {
    title: "What is a 'subsidy'?",
    content:
      "A subsidy is money the government gives to reduce your cost. It can lower the price of equipment, cut your loan amount, or support part of your project cost — so you need to borrow less.",
  },
  collateral: {
    title: "What is 'collateral'?",
    content:
      "Collateral is an asset — like land, a house, or gold — that you offer as a guarantee for a loan. If you cannot repay, the bank can use it. Many small-business loans are collateral-free.",
  },
};

const STEPS: StepConfig[] = [
  {
    key: "name",
    label: "Name",
    question: "What is your name?",
    description: "We will use this to personalise your plan.",
    kind: "text",
    placeholder: "e.g. Meena Devi",
  },
  {
    key: "village",
    label: "Village",
    question: "Which village do you live in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Rampur",
    optional: true,
  },
  {
    key: "block",
    label: "Block",
    question: "Which block is your village in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Khairagarh",
    optional: true,
  },
  {
    key: "district",
    label: "District",
    question: "Which district is this in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Rajpur",
  },
  {
    key: "state",
    label: "State",
    question: "Which state are you in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Madhya Pradesh",
  },
  {
    key: "margin",
    label: "Margin",
    question: "How much margin capital can you put in?",
    description: "The money you can invest yourself to start.",
    kind: "number",
    prefix: "₹",
    placeholder: "e.g. 100000",
    help: [HELP.margin, HELP.subsidy],
  },
  {
    key: "category",
    label: "Category",
    question: "What business do you want to start?",
    description: "Pick the category that best fits your idea.",
    kind: "category",
  },
  {
    key: "landAvailability",
    label: "Land",
    question: "Do you have land or assets to use?",
    description:
      "Choose yes or no. We will suggest options if you do not have land.",
    kind: "choice",
  },
  {
    key: "landAreaSqFt",
    label: "Space",
    question: "How many square feet of land or space do you have?",
    description: "Enter the usable area available for your business.",
    kind: "number",
    prefix: "sq. ft.",
    placeholder: "e.g. 200",
  },
  {
    key: "experience",
    label: "Experience",
    question: "How many years of experience do you have?",
    description: "In this business or a related one.",
    kind: "number",
    placeholder: "e.g. 4",
  },
  {
    key: "investment",
    label: "Investment",
    question: "What is your expected total investment?",
    description: "The full project cost to set up the business.",
    kind: "number",
    prefix: "₹",
    placeholder: "e.g. 250000",
    help: [HELP["project-cost"]],
  },
  {
    key: "sales",
    label: "Sales",
    question: "What monthly sales do you expect?",
    description: "Your expected income each month once running.",
    kind: "number",
    prefix: "₹",
    placeholder: "e.g. 45000",
    help: [HELP["working-capital"], HELP["break-even"]],
  },
  {
    key: "loan",
    label: "Loan",
    question: "How much loan do you need?",
    description: "The amount you want to borrow to cover the rest.",
    kind: "number",
    prefix: "₹",
    placeholder: "e.g. 150000",
    help: [
      HELP["concessional-loan"],
      HELP.emi,
      HELP.moratorium,
      HELP.interest,
      HELP.collateral,
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Location autocomplete data                                          */
/* ------------------------------------------------------------------ */

interface LocationEntry {
  village: string;
  block: string;
  district: string;
  state: string;
}

const LOCATIONS: LocationEntry[] = [
  {
    village: "Rampur",
    block: "Khairagarh",
    district: "Rajpur",
    state: "Madhya Pradesh",
  },
  {
    village: "Rampur",
    block: "Bilha",
    district: "Bilaspur",
    state: "Chhattisgarh",
  },
  {
    village: "Rampur",
    block: "Sadar",
    district: "Sambhal",
    state: "Uttar Pradesh",
  },
  {
    village: "Khairagarh",
    block: "Khairagarh",
    district: "Rajpur",
    state: "Madhya Pradesh",
  },
  {
    village: "Bilaspur",
    block: "Bilha",
    district: "Bilaspur",
    state: "Chhattisgarh",
  },
  {
    village: "Gwalior",
    block: "Gird",
    district: "Gwalior",
    state: "Madhya Pradesh",
  },
  {
    village: "Indore",
    block: "Sanwer",
    district: "Indore",
    state: "Madhya Pradesh",
  },
  {
    village: "Bhopal",
    block: "Berasia",
    district: "Bhopal",
    state: "Madhya Pradesh",
  },
  {
    village: "Jabalpur",
    block: "Sihora",
    district: "Jabalpur",
    state: "Madhya Pradesh",
  },
  {
    village: "Ujjain",
    block: "Tarana",
    district: "Ujjain",
    state: "Madhya Pradesh",
  },
  {
    village: "Sagar",
    block: "Kesli",
    district: "Sagar",
    state: "Madhya Pradesh",
  },
  {
    village: "Rewa",
    block: "Teonthar",
    district: "Rewa",
    state: "Madhya Pradesh",
  },
  {
    village: "Satna",
    block: "Nagod",
    district: "Satna",
    state: "Madhya Pradesh",
  },
  {
    village: "Chhindwara",
    block: "Amarwara",
    district: "Chhindwara",
    state: "Madhya Pradesh",
  },
  {
    village: "Dewas",
    block: "Kannod",
    district: "Dewas",
    state: "Madhya Pradesh",
  },
  {
    village: "Varanasi",
    block: "Pindra",
    district: "Varanasi",
    state: "Uttar Pradesh",
  },
  {
    village: "Lucknow",
    block: "Malihabad",
    district: "Lucknow",
    state: "Uttar Pradesh",
  },
  {
    village: "Kanpur",
    block: "Bilhaur",
    district: "Kanpur Nagar",
    state: "Uttar Pradesh",
  },
  {
    village: "Agra",
    block: "Etmadpur",
    district: "Agra",
    state: "Uttar Pradesh",
  },
  {
    village: "Prayagraj",
    block: "Koraon",
    district: "Prayagraj",
    state: "Uttar Pradesh",
  },
  { village: "Jaipur", block: "Amer", district: "Jaipur", state: "Rajasthan" },
  {
    village: "Jodhpur",
    block: "Luni",
    district: "Jodhpur",
    state: "Rajasthan",
  },
  {
    village: "Udaipur",
    block: "Girwa",
    district: "Udaipur",
    state: "Rajasthan",
  },
  { village: "Kota", block: "Ladpura", district: "Kota", state: "Rajasthan" },
  { village: "Pune", block: "Haveli", district: "Pune", state: "Maharashtra" },
  {
    village: "Nagpur",
    block: "Hingna",
    district: "Nagpur",
    state: "Maharashtra",
  },
  {
    village: "Nashik",
    block: "Niphad",
    district: "Nashik",
    state: "Maharashtra",
  },
  {
    village: "Aurangabad",
    block: "Paithan",
    district: "Chhatrapati Sambhajinagar",
    state: "Maharashtra",
  },
  { village: "Patna", block: "Danapur", district: "Patna", state: "Bihar" },
  { village: "Gaya", block: "Bodh Gaya", district: "Gaya", state: "Bihar" },
  {
    village: "Muzaffarpur",
    block: "Musahari",
    district: "Muzaffarpur",
    state: "Bihar",
  },
  {
    village: "Coimbatore",
    block: "Sulur",
    district: "Coimbatore",
    state: "Tamil Nadu",
  },
  {
    village: "Madurai",
    block: "Melur",
    district: "Madurai",
    state: "Tamil Nadu",
  },
  {
    village: "Hyderabad",
    block: "Shamshabad",
    district: "Rangareddy",
    state: "Telangana",
  },
  {
    village: "Warangal",
    block: "Hanamkonda",
    district: "Warangal",
    state: "Telangana",
  },
  { village: "Guwahati", block: "Sonapur", district: "Kamrup", state: "Assam" },
  {
    village: "Bhubaneswar",
    block: "Khordha",
    district: "Khordha",
    state: "Odisha",
  },
  { village: "Cuttack", block: "Barang", district: "Cuttack", state: "Odisha" },
  {
    village: "Kolkata",
    block: "Baruipur",
    district: "South 24 Parganas",
    state: "West Bengal",
  },
  {
    village: "Ahmedabad",
    block: "Daskroi",
    district: "Ahmedabad",
    state: "Gujarat",
  },
  { village: "Surat", block: "Choryasi", district: "Surat", state: "Gujarat" },
];

function uniqueValues(
  entries: LocationEntry[],
  field: keyof LocationEntry,
  query: string,
): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const entry of entries) {
    const value = entry[field];
    if (value.toLowerCase().includes(q) && !seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
  }
  return out.slice(0, 6);
}

function matchesFor(
  entries: LocationEntry[],
  field: keyof LocationEntry,
  value: string,
): LocationEntry[] {
  const v = value.trim().toLowerCase();
  return entries.filter((e) => e[field].toLowerCase() === v);
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function parseNumber(text: string): number {
  const digits = text.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function categoryFromSpeech(transcript: string) {
  const query = transcript.trim().toLowerCase();
  if (!query) return undefined;
  return BUSINESS_CATEGORIES.find(
    (category) =>
      category.name.toLowerCase().includes(query) ||
      query.includes(category.name.toLowerCase()),
  );
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  onVoice,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  onVoice: (transcript: string) => void;
}) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div className="relative min-w-0 flex-1">
          {prefix ? (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              {prefix}
            </span>
          ) : null}
          <input
            id={inputId}
            type="number"
            inputMode="numeric"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={cn(
              "h-11 w-full rounded-full border border-input bg-background text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
              prefix ? "pl-10" : "px-4",
            )}
            data-ocid="number_input"
          />
        </div>
        <VoiceButton
          onResult={onVoice}
          label=""
          className="size-11 shrink-0 rounded-full p-0"
          aria-label="Dictate number"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

type ConfirmState =
  | { type: "single"; entry: LocationEntry }
  | { type: "multiple"; matches: LocationEntry[] }
  | { type: "detected"; entry: LocationEntry }
  | null;

export default function OnboardingPage() {
  const navigate = useNavigate();
  const setProfile = useOnboardingStore((s) => s.setProfile);
  const savedDraft = useOnboardingStore((s) => s.draft);
  const savedStep = useOnboardingStore((s) => s.onboardingStep);
  const updateStoredDraft = useOnboardingStore((s) => s.updateDraft);
  const setStoredStep = useOnboardingStore((s) => s.setOnboardingStep);

  const [stepIndex, setStepIndex] = useState(savedStep);
  const [inputMode, setInputMode] = useState<"type" | "talk">("type");
  const [draft, setDraft] = useState<OnboardingDraft>(savedDraft);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [categoryQuery, setCategoryQuery] = useState("");
  const [dismissedLocationSuggestion, setDismissedLocationSuggestion] =
    useState("");
  const [activeSuggestionField, setActiveSuggestionField] =
    useState<StepKey | null>(null);
  const [voiceLanguage, setVoiceLanguage] = useState<VoiceLanguage>("en-IN");
  const [detecting, setDetecting] = useState(false);
  const [detectError, setDetectError] = useState<string | null>(null);

  const activeSteps = useMemo(
    () =>
      STEPS.filter(
        (candidate) =>
          candidate.key !== "landAreaSqFt" || draft.landAvailability === "yes",
      ),
    [draft.landAvailability],
  );
  const safeStepIndex = Math.min(stepIndex, activeSteps.length - 1);
  const step = activeSteps[safeStepIndex];
  const isLast = safeStepIndex === activeSteps.length - 1;
  const copy = VOICE_COPY[voiceLanguage]?.[step.key] ?? step;

  const stepLabels = useMemo(
    () => activeSteps.map((s) => s.label),
    [activeSteps],
  );

  const getValue = (key: StepKey): string => {
    const v = draft[key as keyof OnboardingProfile];
    return v === undefined || v === null ? "" : String(v);
  };

  const setValue = (key: StepKey, value: string) => {
    setDraft((d) => ({ ...d, [key]: value }));
    updateStoredDraft({ [key]: value });
  };

  const suggestions = useMemo(() => {
    if (step.kind !== "location") return [];
    // Never open a list merely because a previous step populated this field.
    // Suggestions appear only after the user starts typing in this exact field.
    if (activeSuggestionField !== step.key) return [];
    const raw = draft[step.key as keyof OnboardingProfile];
    const value = raw === undefined || raw === null ? "" : String(raw);
    if (`${step.key}:${value}` === dismissedLocationSuggestion) return [];
    return uniqueValues(LOCATIONS, step.key as keyof LocationEntry, value);
  }, [step, draft, dismissedLocationSuggestion, activeSuggestionField]);

  useEffect(() => {
    setActiveSuggestionField(null);
  }, [safeStepIndex]);

  useEffect(() => {
    if (inputMode !== "talk") return;
    const service = createVoiceService();
    const spokenPrompt = `${copy.question} ${copy.description ?? step.description ?? ""}`;
    service.speak(spokenPrompt, { lang: voiceLanguage });
    return () => service.stop();
  }, [inputMode, safeStepIndex, voiceLanguage, copy, step.description]);

  const handleSelectSuggestion = (value: string) => {
    setValue(step.key, value);
    setActiveSuggestionField(null);
    setDismissedLocationSuggestion(`${step.key}:${value}`);
    const matches = matchesFor(
      LOCATIONS,
      step.key as keyof LocationEntry,
      value,
    );
    if (matches.length === 1) {
      setConfirm({ type: "single", entry: matches[0] });
    } else if (matches.length > 1) {
      setConfirm({ type: "multiple", matches });
    }
  };

  const confirmLocation = (entry: LocationEntry) => {
    setValue("village", entry.village);
    setValue("block", entry.block);
    setValue("district", entry.district);
    setValue("state", entry.state);
    setActiveSuggestionField(null);
    setConfirm(null);
  };

  const handleDetectLocation = async () => {
    setDetecting(true);
    setDetectError(null);
    const result = await getCurrentLocation();
    if (!result.location) {
      setDetectError(result.error ?? "Location unavailable");
      setDetecting(false);
      return;
    }
    // Prefer the private server Maps key, then use an optional browser key.
    let address = await reverseGeocodeViaProxy(result.location);
    if (!address && hasGoogleMapsKey()) {
      const api = await loadGoogleMaps();
      address = api ? await reverseGeocode(api, result.location) : null;
    }
    setDetecting(false);
    if (!address?.village) {
      setDetectError(
        "We couldn't match your location to a village automatically. Please select it manually.",
      );
      return;
    }
    // Permission has been granted and the address is resolved: fill the
    // onboarding fields immediately, without requiring another confirmation.
    confirmLocation({
      village: address.village,
      block: address.block ?? "",
      district: address.district ?? "",
      state: address.state ?? "",
    });
  };

  const validate = (): boolean => {
    const key = step.key;
    if (step.optional) return true;
    const value = getValue(key);
    if (step.kind === "category") {
      if (!value) {
        setError("Please choose a business category to continue.");
        return false;
      }
      return true;
    }
    if (step.kind === "number") {
      const allowsZero = key === "experience";
      if (!value || (!allowsZero && parseNumber(value) <= 0)) {
        setError("Please enter a valid amount to continue.");
        return false;
      }
      return true;
    }
    if (!value.trim()) {
      setError("Please fill in this answer to continue.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError(null);
    if (!validate()) return;
    if (isLast) {
      const profile: OnboardingProfile = {
        name: getValue("name").trim(),
        village: getValue("village").trim(),
        block: getValue("block").trim(),
        district: getValue("district").trim(),
        state: getValue("state").trim(),
        marginCapital: parseNumber(getValue("margin")),
        businessCategory: getValue("category") as BusinessCategoryId,
        landAssets:
          draft.landAvailability === "yes"
            ? parseNumber(getValue("landAreaSqFt"))
            : 0,
        hasLand: draft.landAvailability === "yes",
        landAreaSqFt:
          draft.landAvailability === "yes"
            ? parseNumber(getValue("landAreaSqFt"))
            : 0,
        experienceYears: parseNumber(getValue("experience")),
        expectedInvestment: parseNumber(getValue("investment")),
        expectedMonthlySales: parseNumber(getValue("sales")),
        expectedLoanRequirement: parseNumber(getValue("loan")),
      };
      setProfile(profile);
      navigate({ to: "/dashboard" });
      return;
    }
    const nextStep = Math.min(stepIndex + 1, activeSteps.length - 1);
    setStepIndex(nextStep);
    setStoredStep(nextStep);
  };

  const handleBack = () => {
    setError(null);
    const previousStep = Math.max(0, stepIndex - 1);
    setStepIndex(previousStep);
    setStoredStep(previousStep);
  };

  const handleVoiceResult = (transcript: string) => {
    setValue(step.key, transcript);
  };

  const renderInput = () => {
    if (step.kind === "category") {
      const query = categoryQuery.trim().toLowerCase();
      const categories = query
        ? BUSINESS_CATEGORIES.filter(
            (cat) =>
              cat.name.toLowerCase().includes(query) ||
              cat.description.toLowerCase().includes(query),
          )
        : BUSINESS_CATEGORIES.slice(0, 8);
      return (
        <div className="space-y-4">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              type="search"
              value={categoryQuery}
              onChange={(event) => setCategoryQuery(event.target.value)}
              placeholder="Search 100+ business ideas, e.g. bakery, tailoring, solar"
              aria-label="Search business ideas"
              className="h-11 w-full rounded-full border border-input bg-background pl-11 pr-4 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              data-ocid="business_search_input"
            />
            {inputMode === "talk" ? (
              <VoiceButton
                onResult={(transcript) => {
                  setCategoryQuery(transcript);
                  const category = categoryFromSpeech(transcript);
                  if (category) {
                    setValue("category", category.id);
                    setError(null);
                  }
                }}
                label="Speak business idea"
                lang={voiceLanguage}
                className="mt-3 w-full"
              />
            ) : null}
          </div>
          <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            aria-label="Business category"
          >
            {categories.map((cat) => {
              const selected = getValue("category") === cat.id;
              const outlook = estimateCategoryOutlook(cat.id);
              const demandChipClass =
                outlook.demandLevel === "High"
                  ? "risk-low"
                  : outlook.demandLevel === "Medium"
                    ? "risk-medium"
                    : "risk-high";
              const competitionChipClass =
                outlook.competitionLevel === "Low"
                  ? "risk-low"
                  : outlook.competitionLevel === "Medium"
                    ? "risk-medium"
                    : "risk-high";
              return (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setValue("category", cat.id);
                    setError(null);
                  }}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-4 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    selected
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-border bg-card hover:border-primary/40",
                  )}
                  data-ocid={`category_option.${cat.id}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-lg">
                    {cat.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="font-display text-sm font-semibold text-foreground">
                        {cat.name}
                      </span>
                      {selected ? (
                        <Check className="size-4 shrink-0 text-primary" />
                      ) : null}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                      {cat.description}
                    </span>
                    <span className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          demandChipClass,
                        )}
                        data-ocid={`category_demand.${cat.id}`}
                      >
                        Demand: {outlook.demandLevel}
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          competitionChipClass,
                        )}
                        data-ocid={`category_competition.${cat.id}`}
                      >
                        Competition: {outlook.competitionLevel}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          {query && categories.length === 0 ? (
            <button
              type="button"
              onClick={() => {
                setValue("category", categoryQuery.trim());
                setError(null);
              }}
              className="w-full rounded-2xl border border-primary/30 bg-primary/5 px-4 py-3 text-left text-sm font-medium text-foreground transition-smooth hover:bg-primary/10"
              data-ocid="custom_business_category_button"
            >
              Use “{categoryQuery.trim()}” as my business idea
            </button>
          ) : null}
          {categories.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              No preset match found. You can add your own business idea above.
            </p>
          ) : null}
        </div>
      );
    }

    if (step.kind === "number") {
      return (
        <NumberField
          label={copy.question}
          value={getValue(step.key)}
          onChange={(v) => setValue(step.key, v)}
          placeholder={step.placeholder}
          prefix={step.prefix}
          onVoice={(t) => setValue(step.key, String(parseNumber(t)))}
        />
      );
    }

    if (step.kind === "choice") {
      const selected = getValue(step.key);
      return (
        <div className="grid gap-3 sm:grid-cols-2" aria-label={step.question}>
          {[
            { value: "yes", label: "Yes, I have land or space" },
            { value: "no", label: "No, I need a space" },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected === option.value}
              onClick={() => {
                setValue(step.key, option.value);
                if (option.value === "no") setValue("landAreaSqFt", "");
                setError(null);
              }}
              className={cn(
                "rounded-2xl border p-4 text-left text-sm font-semibold transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected === option.value
                  ? "border-primary bg-primary/5 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/40",
              )}
              data-ocid={`land_option.${option.value}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      );
    }

    if (step.kind === "location") {
      return (
        <div className="flex flex-col gap-1.5">
          {step.key === "village" || step.key === "block" ? (
            <div className="flex flex-col gap-2">
              {step.key === "village" ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => void handleDetectLocation()}
                    disabled={detecting}
                    className="w-full justify-center sm:w-auto"
                    data-ocid="detect_location_button"
                  >
                    <Compass className="size-4" aria-hidden />
                    {detecting
                      ? "Detecting your location\u2026"
                      : "Use my current location"}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    We’ll ask your browser for location permission before using it.
                  </p>
                  {detectError ? (
                    <p
                      className="text-xs text-muted-foreground"
                      data-ocid="detect_location_error"
                    >
                      {detectError}
                    </p>
                  ) : null}
                </>
              ) : null}
              <button
                type="button"
                onClick={() => {
                  setValue(step.key, "");
                  setActiveSuggestionField(null);
                  setDetectError(null);
                  setError(null);
                  const nextStep = Math.min(
                    stepIndex + 1,
                    activeSteps.length - 1,
                  );
                  setStepIndex(nextStep);
                  setStoredStep(nextStep);
                }}
                className="self-start text-sm font-medium text-primary underline-offset-4 hover:underline"
                data-ocid={`skip_${step.key}_button`}
              >
                Skip {step.key === "village" ? "village" : "block"} for now
              </button>
            </div>
          ) : null}
          <div className="relative">
            <VoiceInput
              value={getValue(step.key)}
              onChange={(v) => {
                setActiveSuggestionField(step.key);
                setValue(step.key, v);
              }}
              label={copy.question}
              placeholder={step.placeholder}
              lang={voiceLanguage}
              className="w-full"
            />
            {suggestions.length > 0 ? (
              <ul
                className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
                data-ocid="location_suggestions"
              >
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => handleSelectSuggestion(s)}
                      className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-foreground transition-smooth hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                      data-ocid={`location_suggestion.${s}`}
                    >
                      <MapPin className="size-4 shrink-0 text-primary" />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      );
    }

    // text
    return (
      <VoiceInput
        value={getValue(step.key)}
        onChange={(v) => setValue(step.key, v)}
        label={copy.question}
        placeholder={step.placeholder}
        lang={voiceLanguage}
        className="w-full"
      />
    );
  };

  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-2.5">
            <BrandMark />
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              UdyamAI
            </span>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            Step {stepIndex + 1} of {STEPS.length}
          </span>
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl px-5 py-8 sm:py-12">
        {/* Progress */}
        <ProgressSteps
          steps={stepLabels}
          currentStep={safeStepIndex}
          className="mb-8"
          data-ocid="onboarding_progress"
        />

        {/* Input mode toggle */}
        <div
          className="mb-6 flex items-center justify-center gap-1 rounded-full border border-border bg-card p-1"
          role="tablist"
          aria-label="Input mode"
          data-ocid="input_mode_toggle"
        >
          <button
            type="button"
            role="tab"
            aria-selected={inputMode === "type"}
            onClick={() => setInputMode("type")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              inputMode === "type"
                ? "bg-gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            data-ocid="input_mode_type"
          >
            <Keyboard className="size-4" aria-hidden />
            Type with me
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={inputMode === "talk"}
            onClick={() => setInputMode("talk")}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              inputMode === "talk"
                ? "bg-gradient-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
            data-ocid="input_mode_talk"
          >
            <Mic className="size-4" aria-hidden />
            Talk to me
          </button>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 sm:justify-end">
          <label
            htmlFor="onboarding-voice-language"
            className="text-sm font-medium text-foreground"
          >
            Voice language
          </label>
          <select
            id="onboarding-voice-language"
            value={voiceLanguage}
            onChange={(event) =>
              setVoiceLanguage(event.target.value as VoiceLanguage)
            }
            className="h-10 min-w-0 flex-1 rounded-full border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 sm:flex-none"
            data-ocid="onboarding_voice_language"
          >
            {VOICE_LANGUAGE_OPTIONS.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </div>

        <Card className="p-6 sm:p-8">
          {/* Question + listen */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {copy.question}
              </h2>
              {(copy.description ?? step.description) ? (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {copy.description ?? step.description}
                </p>
              ) : null}
            </div>
            <ListenButton
              text={`${copy.question} ${copy.description ?? step.description ?? ""}`}
              label=""
              lang={voiceLanguage}
              className="size-9 shrink-0 rounded-full p-0"
            />
          </div>

          <div className="mt-6">
            {inputMode === "talk" && step.kind !== "category" ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Tap the mic and speak your answer.
                </p>
                <VoiceButton
                  onResult={handleVoiceResult}
                  label="Speak your answer"
                  lang={voiceLanguage}
                  className="h-14 px-6 text-base"
                />
                {getValue(step.key) ? (
                  <p className="text-sm font-medium text-foreground">
                    “{getValue(step.key)}”
                  </p>
                ) : null}
              </div>
            ) : (
              renderInput()
            )}
          </div>

          {/* Help tooltips */}
          {step.help && step.help.length > 0 ? (
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-5">
              {step.help.map((topic) => (
                <WhyButton key={topic.title} label={topic.title}>
                  {topic.content}
                </WhyButton>
              ))}
            </div>
          ) : null}

          {error ? (
            <p
              className="mt-4 text-sm font-medium text-destructive"
              data-ocid="onboarding_error"
            >
              {error}
            </p>
          ) : null}

          {/* Actions */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={stepIndex === 0}
              data-ocid="onboarding_back_button"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              data-ocid="onboarding_next_button"
            >
              {isLast ? "Finish" : "Next"}
              <ArrowRight className="size-4" aria-hidden />
            </Button>
          </div>
        </Card>
      </main>

      {/* Location confirmation modal */}
      <Modal
        open={confirm !== null}
        onClose={() => setConfirm(null)}
        title={
          confirm?.type === "detected"
            ? "We detected your location"
            : "Confirm your location"
        }
        description={
          confirm?.type === "detected"
            ? "Review the auto-filled details below."
            : "Please confirm the location you selected."
        }
        footer={
          confirm?.type === "single" || confirm?.type === "detected" ? (
            <>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setConfirm(null)}
                data-ocid="location_cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => confirmLocation(confirm.entry)}
                data-ocid="location_confirm_button"
              >
                Confirm
              </Button>
            </>
          ) : undefined
        }
      >
        {confirm?.type === "single" || confirm?.type === "detected" ? (
          <div className="flex flex-col gap-2 text-sm">
            <p className="text-foreground">
              <span className="font-medium">Village:</span>{" "}
              {confirm.entry.village}
            </p>
            <p className="text-foreground">
              <span className="font-medium">Block:</span> {confirm.entry.block}
            </p>
            <p className="text-foreground">
              <span className="font-medium">District:</span>{" "}
              {confirm.entry.district}
            </p>
            <p className="text-foreground">
              <span className="font-medium">State:</span> {confirm.entry.state}
            </p>
          </div>
        ) : confirm?.type === "multiple" ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              We found a few matching locations. Please choose the right one:
            </p>
            {confirm.matches.map((entry) => (
              <button
                key={`${entry.village}-${entry.block}-${entry.district}-${entry.state}`}
                type="button"
                onClick={() => confirmLocation(entry)}
                className="flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm text-foreground transition-smooth hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                data-ocid="location_match_option"
              >
                <span>
                  {entry.village}, {entry.block}, {entry.district},{" "}
                  {entry.state}
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-primary"
                  aria-hidden
                />
              </button>
            ))}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
