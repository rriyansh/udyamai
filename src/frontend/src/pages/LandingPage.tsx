import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { DEMO_PROFILE } from "@/lib/demo-data";
import { useOnboardingStore } from "@/lib/onboarding-store";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock3,
  Landmark,
  PiggyBank,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const VALUE_LINES = [
  "Understand your market.",
  "Plan your money.",
  "Find suitable financing.",
];

const BENEFITS = [
  {
    icon: TrendingUp,
    title: "Understand your market",
    description:
      "See real demand, competition, and pricing for your business idea in your local area.",
  },
  {
    icon: PiggyBank,
    title: "Plan your money",
    description:
      "Map your capital, costs, and profit so you know exactly what your business needs.",
  },
  {
    icon: Landmark,
    title: "Find suitable financing",
    description:
      "Get matched to government schemes and loans that fit your situation.",
  },
];

function CosmicMark({ size = "lg" }: { size?: "lg" | "sm" }) {
  const dims = size === "lg" ? "size-16" : "size-9";
  const icon = size === "lg" ? "size-8" : "size-4";
  return (
    <span
      className={`relative inline-flex ${dims} items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-card`}
    >
      <span
        aria-hidden
        className="absolute -inset-2 rounded-3xl bg-gradient-primary opacity-30 blur-xl"
      />
      <Sparkles className={`relative ${icon}`} aria-hidden />
    </span>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const loadDemo = useOnboardingStore((s) => s.loadDemo);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setIntroDone(true);
      return;
    }
    const timer = window.setTimeout(() => setIntroDone(true), 3400);
    return () => window.clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate({ to: "/onboarding" });
  };

  const handleTryDemo = () => {
    loadDemo(DEMO_PROFILE);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-dvh bg-background">
      <AnimatePresence>
        {!introDone ? (
          <motion.div
            key="intro"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-background px-6"
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            data-ocid="intro_overlay"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <CosmicMark size="lg" />
            </motion.div>
            <div className="flex flex-col items-center gap-1 text-center">
              {VALUE_LINES.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.7 + i * 0.35,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
                >
                  {line}
                </motion.p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* Hero */}
        <section
          className="flex min-h-dvh flex-col justify-center py-16"
          data-ocid="hero_section"
        >
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3">
                <CosmicMark size="sm" />
                <span className="font-display text-2xl font-bold tracking-tight text-foreground">
                  UdyamAI
                </span>
              </div>

              <h1 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Your Local Business,{" "}
                <span className="text-gradient">Made Simple.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                UdyamAI turns your business idea into a clear plan — showing you
                the market, your money, and the financing that fits. Built for
                rural entrepreneurs, in your language.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock3 className="size-4 text-primary" aria-hidden />
                Takes about 3 minutes
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  size="lg"
                  onClick={handleGetStarted}
                  data-ocid="get_started_button"
                >
                  Get Started
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleTryDemo}
                  data-ocid="try_demo_button"
                >
                  Try Demo
                </Button>
              </div>
            </motion.div>

            {/* Abstract cosmic graphic */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
              aria-hidden
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex size-40 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elevated">
                  <Sparkles className="size-14" />
                  <span className="absolute -inset-6 rounded-full bg-gradient-primary opacity-25 blur-2xl" />
                </div>
              </div>
              {Array.from({ length: 12 }, (_, i) => `ray-${i}`).map((id, i) => {
                const angle = (i / 12) * 360;
                return (
                  <span
                    key={id}
                    className="absolute left-1/2 top-1/2 h-px w-40 origin-left bg-gradient-to-r from-primary/50 to-transparent"
                    style={{
                      transform: `rotate(${angle}deg) translateX(20px)`,
                    }}
                  />
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="pb-24" data-ocid="benefits_section">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything you need to start right
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three clear steps take you from idea to a confident, funded plan.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Card className="h-full p-6 transition-smooth hover:shadow-elevated">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 text-sm text-muted-foreground sm:flex-row sm:px-8">
          <span className="font-display font-semibold text-foreground">
            UdyamAI
          </span>
          <span>
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                window.location.hostname,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              caffeine.ai
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
