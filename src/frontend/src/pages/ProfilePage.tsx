import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { InputField } from "@/components/ui/InputField";
import { useToast } from "@/components/ui/Toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BUSINESS_CATEGORIES,
  DEMO_PROFILE,
  categoryName,
  formatINR,
} from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import type { BusinessCategoryId, OnboardingProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Banknote,
  Check,
  Landmark,
  MapPin,
  Pencil,
  RefreshCw,
  Sprout,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type ProfileDraft = Omit<OnboardingProfile, "businessCategory"> & {
  businessCategory: BusinessCategoryId;
};

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-semibold text-foreground">
        {value}
      </dd>
    </div>
  );
}

function FinancialRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd
        className={cn(
          "text-right font-display text-sm font-bold tracking-tight",
          highlight ? "text-gradient" : "text-foreground",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div
      className="space-y-4"
      data-ocid="loading_state"
      aria-busy="true"
      aria-label="Loading profile"
    >
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="size-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </Card>
      <Card className="p-6">
        <Skeleton className="h-4 w-1/3" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </Card>
      <Card className="p-6">
        <Skeleton className="h-4 w-1/3" />
        <div className="mt-4 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  const storedProfile = useOnboardingStore((s) => s.profile);
  const setProfile = useOnboardingStore((s) => s.setProfile);
  const { toast } = useToast();

  const [profile, setProfileState] = useState<OnboardingProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [draft, setDraft] = useState<ProfileDraft | null>(null);

  const load = useCallback(() => {
    setError(null);
    setProfileState(null);
    // Simulate a realistic async fetch of the user's saved profile.
    window.setTimeout(() => {
      setProfileState(storedProfile ?? DEMO_PROFILE);
    }, 600);
  }, [storedProfile]);

  useEffect(() => {
    load();
  }, [load]);

  const startEdit = useCallback(() => {
    if (!profile) return;
    setDraft({ ...profile });
    setEditing(true);
  }, [profile]);

  const cancelEdit = useCallback(() => {
    setDraft(null);
    setEditing(false);
  }, []);

  const updateDraft = useCallback((patch: Partial<ProfileDraft>) => {
    setDraft((current) => (current ? { ...current, ...patch } : current));
  }, []);

  const handleSave = useCallback(() => {
    if (!draft) return;
    setSaving(true);
    // Persist the edited profile to the onboarding store.
    setProfile(draft);
    setProfileState(draft);
    setDraft(null);
    setEditing(false);
    // Simulate a short save latency before confirming.
    window.setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile saved",
        description: "Your business profile has been updated.",
        variant: "success",
      });
    }, 400);
  }, [draft, setProfile, toast]);

  const isLoading = profile === null && error === null;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Profile
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            Your business profile and personal details.
          </p>
        </div>
        {!isLoading && !error && profile && !editing ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={startEdit}
            data-ocid="profile_edit_button"
          >
            <Pencil className="size-4" />
            Edit
          </Button>
        ) : null}
      </header>

      {isLoading ? (
        <ProfileSkeleton />
      ) : error ? (
        <EmptyState
          title="Couldn't load your profile"
          description={error}
          icon={<RefreshCw className="size-6" />}
          actionLabel="Try again"
          onAction={load}
          data-ocid="error_state"
        />
      ) : !profile ? (
        <EmptyState
          title="No profile yet"
          description="Complete onboarding to build your business profile."
          icon={<User className="size-6" />}
          data-ocid="empty_state"
        />
      ) : editing && draft ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
          data-ocid="profile_form"
        >
          <Card>
            <CardHeader>
              <CardTitle>Personal details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputField
                label="Full name"
                value={draft.name}
                onChange={(e) => updateDraft({ name: e.target.value })}
                icon={<User className="size-4" />}
                required
                data-ocid="profile_name_input"
              />
              <div>
                <label
                  htmlFor="profile-category"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Business category
                </label>
                <Select
                  value={draft.businessCategory}
                  onValueChange={(value) =>
                    updateDraft({
                      businessCategory: value as BusinessCategoryId,
                    })
                  }
                >
                  <SelectTrigger
                    id="profile-category"
                    className="w-full rounded-full border-input bg-background px-4"
                    data-ocid="profile_category_select"
                  >
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_CATEGORIES.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputField
                label="Village"
                value={draft.village}
                onChange={(e) => updateDraft({ village: e.target.value })}
                icon={<MapPin className="size-4" />}
                required
                data-ocid="profile_village_input"
              />
              <InputField
                label="Block"
                value={draft.block}
                onChange={(e) => updateDraft({ block: e.target.value })}
                required
                data-ocid="profile_block_input"
              />
              <InputField
                label="District"
                value={draft.district}
                onChange={(e) => updateDraft({ district: e.target.value })}
                required
                data-ocid="profile_district_input"
              />
              <InputField
                label="State"
                value={draft.state}
                onChange={(e) => updateDraft({ state: e.target.value })}
                required
                data-ocid="profile_state_input"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InputField
                label="Margin capital (₹)"
                type="number"
                min={0}
                value={draft.marginCapital}
                onChange={(e) =>
                  updateDraft({ marginCapital: Number(e.target.value) })
                }
                icon={<Banknote className="size-4" />}
                data-ocid="profile_margin_capital_input"
              />
              <InputField
                label="Land assets (acres)"
                type="number"
                min={0}
                value={draft.landAssets}
                onChange={(e) =>
                  updateDraft({ landAssets: Number(e.target.value) })
                }
                data-ocid="profile_land_assets_input"
              />
              <InputField
                label="Experience (years)"
                type="number"
                min={0}
                value={draft.experienceYears}
                onChange={(e) =>
                  updateDraft({ experienceYears: Number(e.target.value) })
                }
                data-ocid="profile_experience_input"
              />
              <InputField
                label="Expected investment (₹)"
                type="number"
                min={0}
                value={draft.expectedInvestment}
                onChange={(e) =>
                  updateDraft({ expectedInvestment: Number(e.target.value) })
                }
                icon={<Landmark className="size-4" />}
                data-ocid="profile_expected_investment_input"
              />
              <InputField
                label="Expected monthly sales (₹)"
                type="number"
                min={0}
                value={draft.expectedMonthlySales}
                onChange={(e) =>
                  updateDraft({ expectedMonthlySales: Number(e.target.value) })
                }
                data-ocid="profile_expected_sales_input"
              />
              <InputField
                label="Expected loan requirement (₹)"
                type="number"
                min={0}
                value={draft.expectedLoanRequirement}
                onChange={(e) =>
                  updateDraft({
                    expectedLoanRequirement: Number(e.target.value),
                  })
                }
                icon={<Banknote className="size-4" />}
                data-ocid="profile_loan_requirement_input"
              />
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={cancelEdit}
              disabled={saving}
              data-ocid="profile_cancel_button"
            >
              <X className="size-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving || !draft.name.trim()}
              data-ocid="profile_save_button"
            >
              {saving ? (
                <RefreshCw className="size-4 animate-spin" />
              ) : (
                <Check className="size-4" />
              )}
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-4" data-ocid="profile_view">
          <Card className="overflow-hidden">
            <div className="bg-gradient-primary px-6 py-8">
              <div className="flex items-center gap-4">
                <span
                  className="flex size-16 shrink-0 items-center justify-center rounded-full bg-background/20 font-display text-xl font-bold text-primary-foreground ring-2 ring-background/40"
                  aria-hidden="true"
                >
                  {initials(profile.name)}
                </span>
                <div className="min-w-0">
                  <h2 className="truncate font-display text-xl font-bold tracking-tight text-primary-foreground sm:text-2xl">
                    {profile.name}
                  </h2>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-primary-foreground/90">
                    <Sprout className="size-4 shrink-0" />
                    {categoryName(profile.businessCategory)}
                  </p>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" />
                <span className="min-w-0">
                  {profile.village}, {profile.block}, {profile.district},{" "}
                  {profile.state}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                <DetailRow
                  label="Business category"
                  value={categoryName(profile.businessCategory)}
                />
                <DetailRow
                  label="Land assets"
                  value={`${profile.landAssets} acre${profile.landAssets === 1 ? "" : "s"}`}
                />
                <DetailRow
                  label="Experience"
                  value={`${profile.experienceYears} year${profile.experienceYears === 1 ? "" : "s"}`}
                />
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Financial details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="divide-y divide-border">
                <FinancialRow
                  label="Margin capital"
                  value={formatINR(profile.marginCapital)}
                />
                <FinancialRow
                  label="Expected investment"
                  value={formatINR(profile.expectedInvestment)}
                />
                <FinancialRow
                  label="Expected monthly sales"
                  value={formatINR(profile.expectedMonthlySales)}
                />
                <FinancialRow
                  label="Expected loan requirement"
                  value={formatINR(profile.expectedLoanRequirement)}
                  highlight
                />
              </dl>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
