import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, u as useNavigate, r as reactExports, S as Sparkles } from "./index-CeuI7PIL.js";
import { C as Card, B as Button } from "./Card-DVJtgs4C.js";
import { L as ListenButton, V as VoiceButton, a as VoiceInput } from "./VoiceInput-9fGo8xCv.js";
import { M as Modal } from "./Modal-Bsxsao5R.js";
import { C as Check } from "./check-Bx1IrKTM.js";
import { W as WhyButton } from "./WhyButton-Dlwr2uVe.js";
import { B as BUSINESS_CATEGORIES } from "./demo-data-CVHFmdt3.js";
import { u as useOnboardingStore } from "./onboarding-store-Z7WltxWC.js";
import { M as Mic } from "./mic-D-MBcTKN.js";
import { A as ArrowRight } from "./arrow-right-B67F64zG.js";
import "./circle-help-DThjCgsP.js";
import "./chevron-down-HMfNLb45.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M10 8h.01", key: "1r9ogq" }],
  ["path", { d: "M12 12h.01", key: "1mp3jc" }],
  ["path", { d: "M14 8h.01", key: "1primd" }],
  ["path", { d: "M16 12h.01", key: "1l6xoz" }],
  ["path", { d: "M18 8h.01", key: "emo2bl" }],
  ["path", { d: "M6 8h.01", key: "x9i8wu" }],
  ["path", { d: "M7 16h10", key: "wp8him" }],
  ["path", { d: "M8 12h.01", key: "czm47f" }],
  ["rect", { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }]
];
const Keyboard = createLucideIcon("keyboard", __iconNode);
function ProgressSteps({
  steps,
  currentStep,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: cn("flex items-center", className), children: steps.map((step, index) => {
    const isComplete = index < currentStep;
    const isCurrent = index === currentStep;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        className: cn(
          "flex items-center",
          index < steps.length - 1 && "flex-1"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "flex size-8 items-center justify-center rounded-full border text-xs font-semibold transition-smooth",
                  isComplete && "border-primary bg-gradient-primary text-primary-foreground",
                  isCurrent && "border-primary bg-background text-primary ring-2 ring-ring/30",
                  !isComplete && !isCurrent && "border-border bg-muted text-muted-foreground"
                ),
                "aria-current": isCurrent ? "step" : void 0,
                children: isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }) : index + 1
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "hidden text-xs font-medium sm:block",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                ),
                children: step
              }
            )
          ] }),
          index < steps.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "mx-2 h-0.5 flex-1 rounded-full transition-smooth",
                index < currentStep ? "bg-primary" : "bg-border"
              )
            }
          ) : null
        ]
      },
      step
    );
  }) });
}
const HELP = {
  margin: {
    title: "What does 'margin capital' mean?",
    content: "Margin capital is the money you can put in yourself to start the business. It is your own contribution — savings, family support, or assets you can sell. Many schemes expect you to bring a small share and lend you the rest."
  },
  "project-cost": {
    title: "What does 'project cost' mean?",
    content: "Project cost is the total money needed to set up the business — buying equipment, animals, raw material, and covering initial running costs. It is the full amount your plan requires, before any loan or subsidy."
  },
  "concessional-loan": {
    title: "What is a 'concessional loan'?",
    content: "A concessional loan is a loan given at a lower interest rate than normal, often with easier terms. Government-backed schemes offer these to help small businesses grow without heavy interest pressure."
  },
  emi: {
    title: "What is an 'EMI'?",
    content: "EMI stands for Equated Monthly Instalment. It is the fixed amount you pay the bank every month until the loan is fully repaid. It includes both the loan amount and the interest, spread evenly over the tenure."
  },
  moratorium: {
    title: "What is a 'moratorium'?",
    content: "A moratorium is a grace period at the start of a loan when you do not have to pay the EMI. It gives a new business time to start earning before repayments begin. Interest may still accrue during this period."
  },
  "working-capital": {
    title: "What is 'working capital'?",
    content: "Working capital is the money you need for day-to-day running — buying raw material, paying wages, and covering bills before customers pay you. It keeps the business moving between sales."
  },
  "break-even": {
    title: "What does 'break-even' mean?",
    content: "Break-even is the point where your income exactly covers your costs — no profit, no loss. Reaching break-even means your business is paying for itself. Everything after that is profit."
  },
  interest: {
    title: "What is 'interest'?",
    content: "Interest is the extra money you pay the bank for borrowing. It is calculated as a percentage of the loan amount each year. Lower interest means you repay less over the life of the loan."
  },
  subsidy: {
    title: "What is a 'subsidy'?",
    content: "A subsidy is money the government gives to reduce your cost. It can lower the price of equipment, cut your loan amount, or support part of your project cost — so you need to borrow less."
  },
  collateral: {
    title: "What is 'collateral'?",
    content: "Collateral is an asset — like land, a house, or gold — that you offer as a guarantee for a loan. If you cannot repay, the bank can use it. Many small-business loans are collateral-free."
  }
};
const STEPS = [
  {
    key: "name",
    label: "Name",
    question: "What is your name?",
    description: "We will use this to personalise your plan.",
    kind: "text",
    placeholder: "e.g. Meena Devi"
  },
  {
    key: "village",
    label: "Village",
    question: "Which village do you live in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Rampur"
  },
  {
    key: "block",
    label: "Block",
    question: "Which block is your village in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Khairagarh"
  },
  {
    key: "district",
    label: "District",
    question: "Which district is this in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Rajpur"
  },
  {
    key: "state",
    label: "State",
    question: "Which state are you in?",
    description: "Start typing and choose from the suggestions.",
    kind: "location",
    placeholder: "e.g. Madhya Pradesh"
  },
  {
    key: "margin",
    label: "Margin",
    question: "How much margin capital can you put in?",
    description: "The money you can invest yourself to start.",
    kind: "number",
    prefix: "₹",
    placeholder: "e.g. 100000",
    help: [HELP.margin, HELP.subsidy]
  },
  {
    key: "category",
    label: "Category",
    question: "What business do you want to start?",
    description: "Pick the category that best fits your idea.",
    kind: "category"
  },
  {
    key: "land",
    label: "Land",
    question: "Do you have land or assets to use?",
    description: "Optional — tell us what you already have.",
    kind: "number",
    prefix: "acres",
    placeholder: "e.g. 2",
    optional: true
  },
  {
    key: "experience",
    label: "Experience",
    question: "How many years of experience do you have?",
    description: "In this business or a related one.",
    kind: "number",
    placeholder: "e.g. 4"
  },
  {
    key: "investment",
    label: "Investment",
    question: "What is your expected total investment?",
    description: "The full project cost to set up the business.",
    kind: "number",
    prefix: "₹",
    placeholder: "e.g. 250000",
    help: [HELP["project-cost"]]
  },
  {
    key: "sales",
    label: "Sales",
    question: "What monthly sales do you expect?",
    description: "Your expected income each month once running.",
    kind: "number",
    prefix: "₹",
    placeholder: "e.g. 45000",
    help: [HELP["working-capital"], HELP["break-even"]]
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
      HELP.collateral
    ]
  }
];
const LOCATIONS = [
  {
    village: "Rampur",
    block: "Khairagarh",
    district: "Rajpur",
    state: "Madhya Pradesh"
  },
  {
    village: "Rampur",
    block: "Bilha",
    district: "Bilaspur",
    state: "Chhattisgarh"
  },
  {
    village: "Rampur",
    block: "Sadar",
    district: "Sambhal",
    state: "Uttar Pradesh"
  },
  {
    village: "Khairagarh",
    block: "Khairagarh",
    district: "Rajpur",
    state: "Madhya Pradesh"
  },
  {
    village: "Bilaspur",
    block: "Bilha",
    district: "Bilaspur",
    state: "Chhattisgarh"
  },
  {
    village: "Gwalior",
    block: "Gird",
    district: "Gwalior",
    state: "Madhya Pradesh"
  },
  {
    village: "Indore",
    block: "Sanwer",
    district: "Indore",
    state: "Madhya Pradesh"
  },
  {
    village: "Bhopal",
    block: "Berasia",
    district: "Bhopal",
    state: "Madhya Pradesh"
  },
  {
    village: "Jabalpur",
    block: "Sihora",
    district: "Jabalpur",
    state: "Madhya Pradesh"
  },
  {
    village: "Ujjain",
    block: "Tarana",
    district: "Ujjain",
    state: "Madhya Pradesh"
  },
  {
    village: "Sagar",
    block: "Kesli",
    district: "Sagar",
    state: "Madhya Pradesh"
  },
  {
    village: "Rewa",
    block: "Teonthar",
    district: "Rewa",
    state: "Madhya Pradesh"
  },
  {
    village: "Satna",
    block: "Nagod",
    district: "Satna",
    state: "Madhya Pradesh"
  },
  {
    village: "Chhindwara",
    block: "Amarwara",
    district: "Chhindwara",
    state: "Madhya Pradesh"
  },
  {
    village: "Dewas",
    block: "Kannod",
    district: "Dewas",
    state: "Madhya Pradesh"
  },
  {
    village: "Varanasi",
    block: "Pindra",
    district: "Varanasi",
    state: "Uttar Pradesh"
  },
  {
    village: "Lucknow",
    block: "Malihabad",
    district: "Lucknow",
    state: "Uttar Pradesh"
  },
  {
    village: "Kanpur",
    block: "Bilhaur",
    district: "Kanpur Nagar",
    state: "Uttar Pradesh"
  },
  {
    village: "Agra",
    block: "Etmadpur",
    district: "Agra",
    state: "Uttar Pradesh"
  },
  {
    village: "Prayagraj",
    block: "Koraon",
    district: "Prayagraj",
    state: "Uttar Pradesh"
  },
  { village: "Jaipur", block: "Amer", district: "Jaipur", state: "Rajasthan" },
  {
    village: "Jodhpur",
    block: "Luni",
    district: "Jodhpur",
    state: "Rajasthan"
  },
  {
    village: "Udaipur",
    block: "Girwa",
    district: "Udaipur",
    state: "Rajasthan"
  },
  { village: "Kota", block: "Ladpura", district: "Kota", state: "Rajasthan" },
  { village: "Pune", block: "Haveli", district: "Pune", state: "Maharashtra" },
  {
    village: "Nagpur",
    block: "Hingna",
    district: "Nagpur",
    state: "Maharashtra"
  },
  {
    village: "Nashik",
    block: "Niphad",
    district: "Nashik",
    state: "Maharashtra"
  },
  {
    village: "Aurangabad",
    block: "Paithan",
    district: "Chhatrapati Sambhajinagar",
    state: "Maharashtra"
  },
  { village: "Patna", block: "Danapur", district: "Patna", state: "Bihar" },
  { village: "Gaya", block: "Bodh Gaya", district: "Gaya", state: "Bihar" },
  {
    village: "Muzaffarpur",
    block: "Musahari",
    district: "Muzaffarpur",
    state: "Bihar"
  },
  {
    village: "Coimbatore",
    block: "Sulur",
    district: "Coimbatore",
    state: "Tamil Nadu"
  },
  {
    village: "Madurai",
    block: "Melur",
    district: "Madurai",
    state: "Tamil Nadu"
  },
  {
    village: "Hyderabad",
    block: "Shamshabad",
    district: "Rangareddy",
    state: "Telangana"
  },
  {
    village: "Warangal",
    block: "Hanamkonda",
    district: "Warangal",
    state: "Telangana"
  },
  { village: "Guwahati", block: "Sonapur", district: "Kamrup", state: "Assam" },
  {
    village: "Bhubaneswar",
    block: "Khordha",
    district: "Khordha",
    state: "Odisha"
  },
  { village: "Cuttack", block: "Barang", district: "Cuttack", state: "Odisha" },
  {
    village: "Kolkata",
    block: "Baruipur",
    district: "South 24 Parganas",
    state: "West Bengal"
  },
  {
    village: "Ahmedabad",
    block: "Daskroi",
    district: "Ahmedabad",
    state: "Gujarat"
  },
  { village: "Surat", block: "Choryasi", district: "Surat", state: "Gujarat" }
];
function uniqueValues(entries, field, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const entry of entries) {
    const value = entry[field];
    if (value.toLowerCase().includes(q) && !seen.has(value)) {
      seen.add(value);
      out.push(value);
    }
  }
  return out.slice(0, 6);
}
function matchesFor(entries, field, value) {
  const v = value.trim().toLowerCase();
  return entries.filter((e) => e[field].toLowerCase() === v);
}
function parseNumber(text) {
  const digits = text.replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}
function NumberField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  onVoice
}) {
  const inputId = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: inputId, className: "text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-0 flex-1", children: [
        prefix ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground", children: prefix }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: inputId,
            type: "number",
            inputMode: "numeric",
            value,
            onChange: (e) => onChange(e.target.value),
            placeholder,
            className: cn(
              "h-11 w-full rounded-full border border-input bg-background text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30",
              prefix ? "pl-10" : "px-4"
            ),
            "data-ocid": "number_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        VoiceButton,
        {
          onResult: onVoice,
          label: "",
          className: "size-11 shrink-0 rounded-full p-0",
          "aria-label": "Dictate number"
        }
      )
    ] })
  ] });
}
function OnboardingPage() {
  const navigate = useNavigate();
  const setProfile = useOnboardingStore((s) => s.setProfile);
  const [stepIndex, setStepIndex] = reactExports.useState(0);
  const [inputMode, setInputMode] = reactExports.useState("type");
  const [draft, setDraft] = reactExports.useState({});
  const [error, setError] = reactExports.useState(null);
  const [confirm, setConfirm] = reactExports.useState(null);
  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const stepLabels = reactExports.useMemo(() => STEPS.map((s) => s.label), []);
  const getValue = (key) => {
    const v = draft[key];
    return v === void 0 || v === null ? "" : String(v);
  };
  const setValue = (key, value) => {
    setDraft((d) => ({ ...d, [key]: value }));
  };
  const suggestions = reactExports.useMemo(() => {
    if (step.kind !== "location") return [];
    const raw = draft[step.key];
    const value = raw === void 0 || raw === null ? "" : String(raw);
    return uniqueValues(LOCATIONS, step.key, value);
  }, [step, draft]);
  const handleSelectSuggestion = (value) => {
    setValue(step.key, value);
    const matches = matchesFor(
      LOCATIONS,
      step.key,
      value
    );
    if (matches.length === 1) {
      setConfirm({ type: "single", entry: matches[0] });
    } else if (matches.length > 1) {
      setConfirm({ type: "multiple", matches });
    }
  };
  const confirmLocation = (entry) => {
    setValue("village", entry.village);
    setValue("block", entry.block);
    setValue("district", entry.district);
    setValue("state", entry.state);
    setConfirm(null);
  };
  const validate = () => {
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
      if (!value || parseNumber(value) <= 0) {
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
      const profile = {
        name: getValue("name").trim(),
        village: getValue("village").trim(),
        block: getValue("block").trim(),
        district: getValue("district").trim(),
        state: getValue("state").trim(),
        marginCapital: parseNumber(getValue("margin")),
        businessCategory: getValue("category"),
        landAssets: parseNumber(getValue("land")),
        experienceYears: parseNumber(getValue("experience")),
        expectedInvestment: parseNumber(getValue("investment")),
        expectedMonthlySales: parseNumber(getValue("sales")),
        expectedLoanRequirement: parseNumber(getValue("loan"))
      };
      setProfile(profile);
      navigate({ to: "/dashboard" });
      return;
    }
    setStepIndex((i) => i + 1);
  };
  const handleBack = () => {
    setError(null);
    setStepIndex((i) => Math.max(0, i - 1));
  };
  const handleVoiceResult = (transcript) => {
    setValue(step.key, transcript);
  };
  const renderInput = () => {
    if (step.kind === "category") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
          "aria-label": "Business category",
          children: BUSINESS_CATEGORIES.map((cat) => {
            const selected = getValue("category") === cat.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "aria-pressed": selected,
                onClick: () => {
                  setValue("category", cat.id);
                  setError(null);
                },
                className: cn(
                  "flex items-start gap-3 rounded-2xl border p-4 text-left transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  selected ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border bg-card hover:border-primary/40"
                ),
                "data-ocid": `category_option.${cat.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-lg", children: cat.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold text-foreground", children: cat.name }),
                      selected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 shrink-0 text-primary" }) : null
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs leading-relaxed text-muted-foreground", children: cat.description })
                  ] })
                ]
              },
              cat.id
            );
          })
        }
      );
    }
    if (step.kind === "number") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberField,
        {
          label: step.question,
          value: getValue(step.key),
          onChange: (v) => setValue(step.key, v),
          placeholder: step.placeholder,
          prefix: step.prefix,
          onVoice: (t) => setValue(step.key, String(parseNumber(t)))
        }
      );
    }
    if (step.kind === "location") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VoiceInput,
          {
            value: getValue(step.key),
            onChange: (v) => setValue(step.key, v),
            label: step.question,
            placeholder: step.placeholder,
            className: "w-full"
          }
        ),
        suggestions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "ul",
          {
            className: "absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card shadow-elevated",
            "data-ocid": "location_suggestions",
            children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleSelectSuggestion(s),
                className: "flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-foreground transition-smooth hover:bg-accent focus-visible:bg-accent focus-visible:outline-none",
                "data-ocid": `location_suggestion.${s}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 shrink-0 text-primary" }),
                  s
                ]
              }
            ) }, s))
          }
        ) : null
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      VoiceInput,
      {
        value: getValue(step.key),
        onChange: (v) => setValue(step.key, v),
        label: step.question,
        placeholder: step.placeholder,
        className: "w-full"
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-2xl items-center justify-between px-5 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex size-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4", "aria-hidden": true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold tracking-tight text-foreground", children: "UdyamAI" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-muted-foreground", children: [
        "Step ",
        stepIndex + 1,
        " of ",
        STEPS.length
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-2xl px-5 py-8 sm:py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProgressSteps,
        {
          steps: stepLabels,
          currentStep: stepIndex,
          className: "mb-8",
          "data-ocid": "onboarding_progress"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "mb-6 flex items-center justify-center gap-1 rounded-full border border-border bg-card p-1",
          role: "tablist",
          "aria-label": "Input mode",
          "data-ocid": "input_mode_toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": inputMode === "type",
                onClick: () => setInputMode("type"),
                className: cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  inputMode === "type" ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                ),
                "data-ocid": "input_mode_type",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Keyboard, { className: "size-4", "aria-hidden": true }),
                  "Type with me"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                role: "tab",
                "aria-selected": inputMode === "talk",
                onClick: () => setInputMode("talk"),
                className: cn(
                  "flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  inputMode === "talk" ? "bg-gradient-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                ),
                "data-ocid": "input_mode_talk",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mic, { className: "size-4", "aria-hidden": true }),
                  "Talk to me"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 sm:p-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl", children: step.question }),
            step.description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: step.description }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ListenButton,
            {
              text: `${step.question} ${step.description ?? ""}`,
              label: "",
              className: "size-9 shrink-0 rounded-full p-0"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: inputMode === "talk" && step.kind !== "category" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Tap the mic and speak your answer." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            VoiceButton,
            {
              onResult: handleVoiceResult,
              label: "Speak your answer",
              className: "h-14 px-6 text-base"
            }
          ),
          getValue(step.key) ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            "“",
            getValue(step.key),
            "”"
          ] }) : null
        ] }) : renderInput() }),
        step.help && step.help.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-col gap-3 border-t border-border pt-5", children: step.help.map((topic) => /* @__PURE__ */ jsxRuntimeExports.jsx(WhyButton, { label: topic.title, children: topic.content }, topic.title)) }) : null,
        error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "mt-4 text-sm font-medium text-destructive",
            "data-ocid": "onboarding_error",
            children: error
          }
        ) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: handleBack,
              disabled: stepIndex === 0,
              "data-ocid": "onboarding_back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4", "aria-hidden": true }),
                "Back"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              onClick: handleNext,
              "data-ocid": "onboarding_next_button",
              children: [
                isLast ? "Finish" : "Next",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4", "aria-hidden": true })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: confirm !== null,
        onClose: () => setConfirm(null),
        title: "Confirm your location",
        description: "Please confirm the location you selected.",
        footer: (confirm == null ? void 0 : confirm.type) === "single" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: () => setConfirm(null),
              "data-ocid": "location_cancel_button",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: () => confirmLocation(confirm.entry),
              "data-ocid": "location_confirm_button",
              children: "Confirm"
            }
          )
        ] }) : void 0,
        children: (confirm == null ? void 0 : confirm.type) === "single" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Village:" }),
            " ",
            confirm.entry.village
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Block:" }),
            " ",
            confirm.entry.block
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "District:" }),
            " ",
            confirm.entry.district
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "State:" }),
            " ",
            confirm.entry.state
          ] })
        ] }) : (confirm == null ? void 0 : confirm.type) === "multiple" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We found a few matching locations. Please choose the right one:" }),
          confirm.matches.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => confirmLocation(entry),
              className: "flex items-center justify-between gap-2 rounded-xl border border-border bg-background px-4 py-3 text-left text-sm text-foreground transition-smooth hover:border-primary/40 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "data-ocid": "location_match_option",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  entry.village,
                  ", ",
                  entry.block,
                  ", ",
                  entry.district,
                  ",",
                  " ",
                  entry.state
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ArrowRight,
                  {
                    className: "size-4 shrink-0 text-primary",
                    "aria-hidden": true
                  }
                )
              ]
            },
            `${entry.village}-${entry.block}-${entry.district}-${entry.state}`
          ))
        ] }) : null
      }
    )
  ] });
}
export {
  OnboardingPage as default
};
