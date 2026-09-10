import { c as createLucideIcon, b as useToast, r as reactExports, j as jsxRuntimeExports, U as User, X, a as cn } from "./index-CeuI7PIL.js";
import { B as Button, C as Card, b as CardHeader, c as CardTitle, a as CardContent } from "./Card-DVJtgs4C.js";
import { E as EmptyState } from "./EmptyState-C6jqOqL3.js";
import { I as InputField } from "./InputField-BHILbPy-.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-P1Pe1sjd.js";
import { S as Skeleton } from "./skeleton-BewGAZNP.js";
import { D as DEMO_PROFILE, B as BUSINESS_CATEGORIES, c as categoryName, f as formatINR } from "./demo-data-CVHFmdt3.js";
import { u as useOnboardingStore } from "./onboarding-store-Z7WltxWC.js";
import { R as RefreshCw } from "./refresh-cw-CF1KA8lM.js";
import { M as MapPin } from "./map-pin-C-AVKAEB.js";
import { B as Banknote } from "./banknote-CBLbyqp1.js";
import { L as Landmark } from "./landmark-BbPb-8At.js";
import { C as Check } from "./check-Bx1IrKTM.js";
import "./index-CBs9nea4.js";
import "./chevron-down-HMfNLb45.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 20h10", key: "e6iznv" }],
  ["path", { d: "M10 20c5.5-2.5.8-6.4 3-10", key: "161w41" }],
  [
    "path",
    {
      d: "M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z",
      key: "9gtqwd"
    }
  ],
  [
    "path",
    {
      d: "M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z",
      key: "bkxnd2"
    }
  ]
];
const Sprout = createLucideIcon("sprout", __iconNode);
function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => {
    var _a;
    return ((_a = part[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("");
}
function DetailRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right text-sm font-semibold text-foreground", children: value })
  ] });
}
function FinancialRow({
  label,
  value,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 py-2.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-sm text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "dd",
      {
        className: cn(
          "text-right font-display text-sm font-bold tracking-tight",
          highlight ? "text-gradient" : "text-foreground"
        ),
        children: value
      }
    )
  ] });
}
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "space-y-4",
      "data-ocid": "loading_state",
      "aria-busy": "true",
      "aria-label": "Loading profile",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-16 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-1/2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
          ] })
        ] })
      ]
    }
  );
}
function ProfilePage() {
  const storedProfile = useOnboardingStore((s) => s.profile);
  const setProfile = useOnboardingStore((s) => s.setProfile);
  const { toast } = useToast();
  const [profile, setProfileState] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [editing, setEditing] = reactExports.useState(false);
  const [saving, setSaving] = reactExports.useState(false);
  const [draft, setDraft] = reactExports.useState(null);
  const load = reactExports.useCallback(() => {
    setError(null);
    setProfileState(null);
    window.setTimeout(() => {
      setProfileState(storedProfile ?? DEMO_PROFILE);
    }, 600);
  }, [storedProfile]);
  reactExports.useEffect(() => {
    load();
  }, [load]);
  const startEdit = reactExports.useCallback(() => {
    if (!profile) return;
    setDraft({ ...profile });
    setEditing(true);
  }, [profile]);
  const cancelEdit = reactExports.useCallback(() => {
    setDraft(null);
    setEditing(false);
  }, []);
  const updateDraft = reactExports.useCallback((patch) => {
    setDraft((current) => current ? { ...current, ...patch } : current);
  }, []);
  const handleSave = reactExports.useCallback(() => {
    if (!draft) return;
    setSaving(true);
    setProfile(draft);
    setProfileState(draft);
    setDraft(null);
    setEditing(false);
    window.setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile saved",
        description: "Your business profile has been updated.",
        variant: "success"
      });
    }, 400);
  }, [draft, setProfile, toast]);
  const isLoading = profile === null && error === null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-6 flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground sm:text-base", children: "Your business profile and personal details." })
      ] }),
      !isLoading && !error && profile && !editing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          size: "sm",
          onClick: startEdit,
          "data-ocid": "profile_edit_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4" }),
            "Edit"
          ]
        }
      ) : null
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {}) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "Couldn't load your profile",
        description: error,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-6" }),
        actionLabel: "Try again",
        onAction: load,
        "data-ocid": "error_state"
      }
    ) : !profile ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        title: "No profile yet",
        description: "Complete onboarding to build your business profile.",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-6" }),
        "data-ocid": "empty_state"
      }
    ) : editing && draft ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          handleSave();
        },
        className: "space-y-4",
        "data-ocid": "profile_form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Personal details" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Full name",
                  value: draft.name,
                  onChange: (e) => updateDraft({ name: e.target.value }),
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-4" }),
                  required: true,
                  "data-ocid": "profile_name_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "profile-category",
                    className: "mb-1.5 block text-sm font-medium text-foreground",
                    children: "Business category"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: draft.businessCategory,
                    onValueChange: (value) => updateDraft({
                      businessCategory: value
                    }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          id: "profile-category",
                          className: "w-full rounded-full border-input bg-background px-4",
                          "data-ocid": "profile_category_select",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select a category" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BUSINESS_CATEGORIES.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: category.id, children: [
                        category.icon,
                        " ",
                        category.name
                      ] }, category.id)) })
                    ]
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Location" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Village",
                  value: draft.village,
                  onChange: (e) => updateDraft({ village: e.target.value }),
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4" }),
                  required: true,
                  "data-ocid": "profile_village_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Block",
                  value: draft.block,
                  onChange: (e) => updateDraft({ block: e.target.value }),
                  required: true,
                  "data-ocid": "profile_block_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "District",
                  value: draft.district,
                  onChange: (e) => updateDraft({ district: e.target.value }),
                  required: true,
                  "data-ocid": "profile_district_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "State",
                  value: draft.state,
                  onChange: (e) => updateDraft({ state: e.target.value }),
                  required: true,
                  "data-ocid": "profile_state_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Financial details" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Margin capital (₹)",
                  type: "number",
                  min: 0,
                  value: draft.marginCapital,
                  onChange: (e) => updateDraft({ marginCapital: Number(e.target.value) }),
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "size-4" }),
                  "data-ocid": "profile_margin_capital_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Land assets (acres)",
                  type: "number",
                  min: 0,
                  value: draft.landAssets,
                  onChange: (e) => updateDraft({ landAssets: Number(e.target.value) }),
                  "data-ocid": "profile_land_assets_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Experience (years)",
                  type: "number",
                  min: 0,
                  value: draft.experienceYears,
                  onChange: (e) => updateDraft({ experienceYears: Number(e.target.value) }),
                  "data-ocid": "profile_experience_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Expected investment (₹)",
                  type: "number",
                  min: 0,
                  value: draft.expectedInvestment,
                  onChange: (e) => updateDraft({ expectedInvestment: Number(e.target.value) }),
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Landmark, { className: "size-4" }),
                  "data-ocid": "profile_expected_investment_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Expected monthly sales (₹)",
                  type: "number",
                  min: 0,
                  value: draft.expectedMonthlySales,
                  onChange: (e) => updateDraft({ expectedMonthlySales: Number(e.target.value) }),
                  "data-ocid": "profile_expected_sales_input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                InputField,
                {
                  label: "Expected loan requirement (₹)",
                  type: "number",
                  min: 0,
                  value: draft.expectedLoanRequirement,
                  onChange: (e) => updateDraft({
                    expectedLoanRequirement: Number(e.target.value)
                  }),
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Banknote, { className: "size-4" }),
                  "data-ocid": "profile_loan_requirement_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: cancelEdit,
                disabled: saving,
                "data-ocid": "profile_cancel_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
                  "Cancel"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: saving || !draft.name.trim(),
                "data-ocid": "profile_save_button",
                children: [
                  saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4" }),
                  saving ? "Saving…" : "Save changes"
                ]
              }
            )
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", "data-ocid": "profile_view", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-gradient-primary px-6 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "flex size-16 shrink-0 items-center justify-center rounded-full bg-background/20 font-display text-xl font-bold text-primary-foreground ring-2 ring-background/40",
              "aria-hidden": "true",
              children: initials(profile.name)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "truncate font-display text-xl font-bold tracking-tight text-primary-foreground sm:text-2xl", children: profile.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 flex items-center gap-1.5 text-sm text-primary-foreground/90", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sprout, { className: "size-4 shrink-0" }),
              categoryName(profile.businessCategory)
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "size-4 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "min-w-0", children: [
            profile.village,
            ", ",
            profile.block,
            ", ",
            profile.district,
            ",",
            " ",
            profile.state
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Business details" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Business category",
              value: categoryName(profile.businessCategory)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Land assets",
              value: `${profile.landAssets} acre${profile.landAssets === 1 ? "" : "s"}`
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DetailRow,
            {
              label: "Experience",
              value: `${profile.experienceYears} year${profile.experienceYears === 1 ? "" : "s"}`
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Financial details" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "divide-y divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FinancialRow,
            {
              label: "Margin capital",
              value: formatINR(profile.marginCapital)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FinancialRow,
            {
              label: "Expected investment",
              value: formatINR(profile.expectedInvestment)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FinancialRow,
            {
              label: "Expected monthly sales",
              value: formatINR(profile.expectedMonthlySales)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            FinancialRow,
            {
              label: "Expected loan requirement",
              value: formatINR(profile.expectedLoanRequirement),
              highlight: true
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}
export {
  ProfilePage as default
};
