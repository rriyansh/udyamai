import { Button } from "@/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card";
import { InputField } from "@/components/ui/InputField";
import {
  type LanguageOption,
  LanguageSelector,
} from "@/components/ui/LanguageSelector";
import { useToast } from "@/components/ui/Toast";
import { Switch } from "@/components/ui/switch";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useSettingsStore } from "@/lib/settings-store";
import { useTheme } from "@/lib/theme";
import type { ThemeMode } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Accessibility,
  Bell,
  ChevronRight,
  Globe,
  Info,
  Languages,
  Lock,
  Mic,
  Moon,
  Palette,
  RotateCcw,
  Sun,
  User,
  Volume2,
} from "lucide-react";
import { useState } from "react";

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "hinglish", label: "Hinglish" },
];

const SPEED_OPTIONS = [
  { value: "slow", label: "Slow", rate: 0.8 },
  { value: "normal", label: "Normal", rate: 1 },
  { value: "fast", label: "Fast", rate: 1.2 },
];

const VOICE_OPTIONS = [
  { value: "natural", label: "Natural" },
  { value: "friendly", label: "Friendly" },
];

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "system", label: "System", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
];

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card data-ocid="settings_section">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
            {icon}
          </span>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5">{children}</CardContent>
    </Card>
  );
}

function ToggleRow({
  title,
  description,
  checked,
  onCheckedChange,
  ocid,
}: {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label={title}
        data-ocid={ocid}
      />
    </div>
  );
}

function SelectRow({
  label,
  value,
  onChange,
  options,
  ocid,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <label htmlFor={ocid} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative shrink-0">
        <select
          id={ocid}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-36 appearance-none rounded-full border border-input bg-background pl-4 pr-9 text-sm text-foreground outline-none transition-smooth focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
          data-ocid={ocid}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronRight className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted-foreground" />
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-1 h-px bg-border" />;
}

export default function SettingsPage() {
  const {
    settings,
    setTheme,
    setLanguage,
    updateVoice,
    updateNotifications,
    updatePrivacy,
    updateAccessibility,
    setAutoRead,
    reset,
  } = useSettingsStore();
  const { theme, setTheme: applyTheme } = useTheme();
  const { profile, updateProfile } = useOnboardingStore();
  const { toast } = useToast();

  const [account, setAccount] = useState({
    name: profile?.name ?? "",
    village: profile?.village ?? "",
    district: profile?.district ?? "",
    state: profile?.state ?? "",
  });

  const speed =
    SPEED_OPTIONS.find((s) => s.rate === settings.voice.rate)?.value ??
    "normal";
  const voice = settings.voice.voiceURI ?? "natural";

  const handleSpeed = (value: string) => {
    const option = SPEED_OPTIONS.find((s) => s.value === value);
    if (option) updateVoice({ rate: option.rate });
  };

  const handleVoice = (value: string) => {
    updateVoice({ voiceURI: value });
  };

  const saveAccount = () => {
    updateProfile({
      name: account.name,
      village: account.village,
      district: account.district,
      state: account.state,
    });
    toast({
      title: "Account updated",
      description: "Your profile details have been saved.",
      variant: "success",
    });
  };

  const handleTheme = (value: ThemeMode) => {
    setTheme(value);
    applyTheme(value);
  };

  const handleReset = () => {
    reset();
    applyTheme("system");
    toast({
      title: "Settings reset",
      description: "All settings have been restored to their defaults.",
      variant: "info",
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Customise how UdyamAI looks, sounds, and works for you.
        </p>
      </header>

      <div className="space-y-5">
        {/* Account */}
        <SectionCard
          icon={<User className="size-5" />}
          title="Account"
          description="Your basic profile information used across UdyamAI."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Full name"
              value={account.name}
              onChange={(e) =>
                setAccount((a) => ({ ...a, name: e.target.value }))
              }
              placeholder="Your name"
              data-ocid="account_name_input"
            />
            <InputField
              label="Village"
              value={account.village}
              onChange={(e) =>
                setAccount((a) => ({ ...a, village: e.target.value }))
              }
              placeholder="Your village"
              data-ocid="account_village_input"
            />
            <InputField
              label="District"
              value={account.district}
              onChange={(e) =>
                setAccount((a) => ({ ...a, district: e.target.value }))
              }
              placeholder="Your district"
              data-ocid="account_district_input"
            />
            <InputField
              label="State"
              value={account.state}
              onChange={(e) =>
                setAccount((a) => ({ ...a, state: e.target.value }))
              }
              placeholder="Your state"
              data-ocid="account_state_input"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              type="button"
              onClick={saveAccount}
              data-ocid="account_save_button"
            >
              Save changes
            </Button>
          </div>
        </SectionCard>

        {/* Language */}
        <SectionCard
          icon={<Languages className="size-5" />}
          title="Language"
          description="Choose the language UdyamAI uses across the app."
        >
          <LanguageSelector
            value={settings.language}
            onChange={setLanguage}
            options={LANGUAGE_OPTIONS}
            label="App language"
            className="py-1"
          />
        </SectionCard>

        {/* Voice & Listening */}
        <SectionCard
          icon={<Mic className="size-5" />}
          title="Voice & Listening"
          description="Control how UdyamAI speaks and listens to you."
        >
          <div className="flex flex-col gap-1.5 py-1">
            <LanguageSelector
              value={settings.language}
              onChange={setLanguage}
              options={LANGUAGE_OPTIONS}
              label="Voice language"
            />
          </div>
          <Divider />
          <SelectRow
            label="Speed"
            value={speed}
            onChange={handleSpeed}
            options={SPEED_OPTIONS}
            ocid="voice_speed_select"
          />
          <Divider />
          <SelectRow
            label="Voice"
            value={voice}
            onChange={handleVoice}
            options={VOICE_OPTIONS}
            ocid="voice_voice_select"
          />
          <Divider />
          <ToggleRow
            title="Auto-read important explanations"
            description="UdyamAI reads key explanations aloud automatically."
            checked={settings.autoRead}
            onCheckedChange={setAutoRead}
            ocid="voice_autoread_toggle"
          />
        </SectionCard>

        {/* Notifications */}
        <SectionCard
          icon={<Bell className="size-5" />}
          title="Notifications"
          description="Choose what updates you want to receive."
        >
          <ToggleRow
            title="Notifications"
            description="Master switch for all notifications."
            checked={settings.notifications.enabled}
            onCheckedChange={(v) => updateNotifications({ enabled: v })}
            ocid="notifications_enabled_toggle"
          />
          <Divider />
          <ToggleRow
            title="Email notifications"
            description="Receive updates by email."
            checked={settings.notifications.email}
            onCheckedChange={(v) => updateNotifications({ email: v })}
            ocid="notifications_email_toggle"
          />
          <Divider />
          <ToggleRow
            title="Push notifications"
            description="Receive instant alerts on this device."
            checked={settings.notifications.push}
            onCheckedChange={(v) => updateNotifications({ push: v })}
            ocid="notifications_push_toggle"
          />
        </SectionCard>

        {/* Privacy */}
        <SectionCard
          icon={<Lock className="size-5" />}
          title="Privacy"
          description="Control how your data is used and shared."
        >
          <ToggleRow
            title="Share data with partners"
            description="Allow UdyamAI to share your profile with trusted scheme partners."
            checked={settings.privacy.shareData}
            onCheckedChange={(v) => updatePrivacy({ shareData: v })}
            ocid="privacy_share_toggle"
          />
          <Divider />
          <ToggleRow
            title="Usage analytics"
            description="Help improve UdyamAI with anonymous usage data."
            checked={settings.privacy.analytics}
            onCheckedChange={(v) => updatePrivacy({ analytics: v })}
            ocid="privacy_analytics_toggle"
          />
        </SectionCard>

        {/* Accessibility */}
        <SectionCard
          icon={<Accessibility className="size-5" />}
          title="Accessibility"
          description="These settings apply across the whole app."
        >
          <ToggleRow
            title="Large text"
            description="Increase the text size throughout the app."
            checked={settings.accessibility.largeText}
            onCheckedChange={(v) => updateAccessibility({ largeText: v })}
            ocid="accessibility_large_text_toggle"
          />
          <Divider />
          <ToggleRow
            title="High contrast"
            description="Increase contrast for easier reading."
            checked={settings.accessibility.highContrast}
            onCheckedChange={(v) => updateAccessibility({ highContrast: v })}
            ocid="accessibility_high_contrast_toggle"
          />
          <Divider />
          <ToggleRow
            title="Reduced motion"
            description="Minimise animations and transitions."
            checked={settings.accessibility.reducedMotion}
            onCheckedChange={(v) => updateAccessibility({ reducedMotion: v })}
            ocid="accessibility_reduced_motion_toggle"
          />
        </SectionCard>

        {/* Theme */}
        <SectionCard
          icon={<Palette className="size-5" />}
          title="Theme"
          description="Choose how UdyamAI looks. Changes apply instantly."
        >
          <div className="grid grid-cols-3 gap-3">
            {THEME_OPTIONS.map((option) => {
              const active = theme === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleTheme(option.value)}
                  aria-pressed={active}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-2xl border p-4 text-sm font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background text-muted-foreground hover:bg-muted",
                  )}
                  data-ocid={`theme_${option.value}_button`}
                >
                  <option.icon className="size-5" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </SectionCard>

        {/* About */}
        <SectionCard
          icon={<Info className="size-5" />}
          title="About"
          description="About UdyamAI."
        >
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
              <span className="font-display text-lg font-bold">U</span>
            </span>
            <div>
              <p className="font-display text-base font-semibold tracking-tight text-foreground">
                UdyamAI
              </p>
              <p className="text-sm text-muted-foreground">
                AI-powered guidance for rural entrepreneurs.
              </p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <dt className="text-xs font-medium text-muted-foreground">
                Version
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                1.0.0
              </dd>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <dt className="text-xs font-medium text-muted-foreground">
                Language
              </dt>
              <dd className="mt-1 text-sm font-semibold text-foreground">
                {LANGUAGE_OPTIONS.find((l) => l.value === settings.language)
                  ?.label ?? "English"}
              </dd>
            </div>
          </dl>
        </SectionCard>

        {/* Reset */}
        <Card data-ocid="settings_reset_section">
          <CardContent className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                Reset settings
              </p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Restore all settings to their defaults.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              data-ocid="settings_reset_button"
            >
              <RotateCcw className="size-4" />
              Reset
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
