# Design Brief

## Direction

UdyamAI — a premium, approachable business decision platform for rural and semi-urban entrepreneurs: bright brand green, near-black typography, warm off-white surfaces, and restrained gradients that make financial decisions feel clear and trustworthy. The system supports hyper-local market intelligence, deterministic financial planning, government scheme guidance, and plain-language explanations.

## Tone

Clear, grounded, and quietly confident — a modern Indian fintech experience that communicates "smart, trustworthy, practical" without feeling like a generic dashboard.

## Differentiation

A "grounded intelligence" signature: warm off-white surfaces in light and near-black green-tinted surfaces in dark, with a single bright green→lime gradient used only on primary actions, key numbers, and hero accents — never as full-page decoration.

## Color Palette

| Token      | Light OKLCH   | Dark OKLCH    | Role                              |
| ---------- | ------------- | ------------- | --------------------------------- |
| background | 0.99 0.006 285 | 0.145 0.02 285 | app canvas (soft violet-white / navy) |
| foreground | 0.16 0.03 285 | 0.95 0.01 285 | primary text                       |
| card       | 1 0.004 285   | 0.18 0.022 285 | elevated surfaces                  |
| primary    | 0.42 0.19 285 | 0.68 0.17 290 | deep indigo/violet CTA             |
| accent     | 0.62 0.13 300 | 0.7 0.13 300  | soft violet highlights             |
| muted      | 0.955 0.01 285 | 0.23 0.025 285 | secondary surfaces                 |
| muted-foreground | 0.5 0.03 285 | 0.58 0.02 285 | secondary text             |
| border     | 0.9 0.012 285 | 0.28 0.025 285 | hairline dividers                  |
| destructive | 0.55 0.22 25 | 0.6 0.2 25   | destructive actions                |
| success    | 0.55 0.18 150 | 0.6 0.18 150 | positive states                    |
| warning    | 0.7 0.15 85   | 0.75 0.15 85  | caution states                     |

## Phase 2 Semantic Tokens

| Token            | Light OKLCH   | Dark OKLCH    | Role                              |
| ---------------- | ------------- | ------------- | --------------------------------- |
| provenance-estimated | 0.66 0.08 300 | 0.62 0.09 300 | Estimated label tint (violet) |
| provenance-observed  | 0.66 0.08 265 | 0.62 0.09 265 | Observed label tint (indigo)  |
| provenance-calculated| 0.66 0.08 235 | 0.62 0.09 235 | Calculated label tint (blue)  |
| provenance-user      | 0.66 0.05 285 | 0.62 0.06 285 | User Provided label (neutral) |
| confidence-high  | 0.55 0.18 150 | 0.6 0.18 150 | High confidence badge         |
| confidence-medium| 0.7 0.15 85   | 0.75 0.15 85  | Medium confidence badge       |
| confidence-low   | 0.55 0.22 25  | 0.6 0.2 25   | Low confidence badge          |
| risk-low         | 0.55 0.18 150 | 0.6 0.18 150 | Low risk chip                  |
| risk-medium      | 0.7 0.15 85   | 0.75 0.15 85  | Medium risk chip               |
| risk-high        | 0.55 0.22 25  | 0.6 0.2 25   | High risk chip                 |
| score-ring-fill  | 0.42 0.19 285 | 0.68 0.17 290 | Score ring primary fill        |
| score-ring-strong| 0.55 0.18 150 | 0.6 0.18 150 | Strong score (green)           |
| score-ring-moderate| 0.7 0.15 85 | 0.75 0.15 85  | Moderate score (amber)         |
| score-ring-weak  | 0.55 0.22 25  | 0.6 0.2 25   | Weak score (red)               |
| map-dense        | 0.42 0.19 285 | 0.68 0.17 290 | Competitor density high        |
| map-moderate     | 0.62 0.13 300 | 0.7 0.13 300  | Competitor density medium      |
| map-sparse       | 0.7 0.15 85   | 0.75 0.15 85  | Competitor density low         |
| map-underserved  | 0.55 0.18 150 | 0.6 0.18 150 | Underserved zone               |
| map-marker       | 0.55 0.19 305 | 0.62 0.19 305 | Competitor marker              |

## Phase 3 Financial Semantic Tokens

| Token            | Light OKLCH   | Dark OKLCH    | Role                              |
| ---------------- | ------------- | ------------- | --------------------------------- |
| fin-money        | 0.55 0.18 150 | 0.6 0.18 150  | Money / positive (green)          |
| fin-loan         | 0.5 0.16 275  | 0.62 0.16 275 | Loan / EMI (indigo)               |
| fin-interest     | 0.62 0.16 60  | 0.72 0.16 60  | Interest / cost (amber)           |
| fin-capital      | 0.55 0.12 185 | 0.6 0.12 185  | Working capital (teal)            |
| fin-breakeven    | 0.55 0.16 305 | 0.62 0.16 305 | Break-even (violet)               |
| fin-operating    | 0.5 0.05 285  | 0.62 0.06 285 | Operating cost (neutral)          |
| feas-market      | 0.55 0.18 150 | 0.6 0.18 150  | Feasibility: market               |
| feas-financial   | 0.5 0.16 275  | 0.62 0.16 275 | Feasibility: financial            |
| feas-competition | 0.7 0.15 85   | 0.75 0.15 85  | Feasibility: competition          |
| feas-risk        | 0.55 0.22 25  | 0.6 0.2 25    | Feasibility: risk                 |
| estimate         | 0.66 0.08 300 | 0.62 0.09 300 | What-if estimate label (violet)   |
| explain-bg       | 0.95 0.02 285 | 0.2 0.03 285  | "What does this mean?" panel      |
| explain-border   | 0.42 0.19 285 | 0.68 0.17 290 | Explanation panel border          |
| explain-fg       | 0.3 0.04 285  | 0.9 0.02 285  | Explanation panel text            |

## Typography

- Display: Space Grotesk — headings, hero, large numbers, stat figures, score values
- Body: General Sans — paragraphs, UI labels, forms
- Mono: Geist Mono — data readouts, codes, timestamps, provenance tags
- Scale: hero `text-4xl md:text-6xl font-bold tracking-tight`, h2 `text-2xl md:text-4xl font-semibold tracking-tight`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base`

## Elevation & Depth

Layered surface hierarchy — flat background, slightly lifted cards with soft `shadow-card`, and a gentle elevated shadow for interactive/raised elements; depth comes from surface tint and hairline borders, not glow.

## Structural Zones

| Zone    | Background          | Border   | Notes                                    |
| ------- | ------------------- | -------- | ---------------------------------------- |
| Header  | bg-background/80 blur | border-b | sticky translucent nav, hairline divider |
| Content | bg-background       | —        | alternate bg-muted/30 for feature bands  |
| Cards   | bg-card             | border-border | rounded-2xl, shadow-card            |
| Footer  | bg-muted/40         | border-t | quiet, secondary text                    |

## Spacing & Rhythm

Mobile-first generous spacing: section gaps `py-16 md:py-24`, card padding `p-6 md:p-8`, micro-gaps `gap-3/4`, container `max-w-6xl px-4 md:px-6` — rhythm alternates tight label groups with airy hero blocks.

## Component Patterns

- Buttons: primary = `bg-gradient-primary text-primary-foreground rounded-full px-6 py-3`, hover lifts + darkens; secondary = `bg-secondary border-border`
- Cards: `rounded-2xl bg-card border shadow-card`, hover raises shadow to `shadow-elevated`
- Badges: `rounded-full bg-muted text-muted-foreground`, accent variant `bg-accent/15 text-accent-foreground`
- Provenance labels: `prov-estimated|observed|calculated|user` — `rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide` tinted chip
- Confidence badges: `conf-high|medium|low` — `rounded-full px-2 py-0.5 text-[10px] font-semibold` muted tint
- Risk chips: `risk-low|medium|high` — `rounded-full px-2.5 py-1 text-xs font-semibold` muted tint
- Score cards: `rounded-2xl bg-card border shadow-card p-5`, compact score ring (`.score-ring` + `.score-ring-strong|moderate|weak`) with `text-gradient` value
- Listen button: `.listen-btn` compact `h-8 w-8 rounded-full`, `.listening` = primary fill, never auto-reads
- Map legend: `.map-legend-swatch` dots + `.map-density-*` / `.map-marker` color labels
- Financial metric cards: `rounded-2xl bg-card border shadow-card p-5`, `.fin-stat` mono tabular value + `.fin-chip` colored category tag
- Financial colors: `.fin-money|loan|interest|capital|breakeven|operating` — used for values, chips, and chart segments
- Repayment table: `.repay-table` with uppercase mono headers, tabular `.num` cells, hairline row dividers
- What-if sliders: `.slider` with gradient thumb; outputs tagged `.estimate-tag` "estimate"
- Feasibility breakdown: `.feas-market|financial|competition|risk` colored segments under `.score-ring`
- Explanation: `.explain` panel with `.explain-title` "What does this mean?" — plain simple English

## Motion

- Entrance: `animate-fade-in` staggered 0.5s cubic-bezier on load; respects `prefers-reduced-motion`
- Hover: 0.3s `transition-smooth` lift + shadow raise on interactive cards/buttons
- Decorative: `animate-float` on hero accent orbs, `animate-pulse-soft` on live status dots
- Analysis progress: `.progress-track` + `.progress-indeterminate` `animate-progress-slide` 1.6s infinite (soft indeterminate sweep); `.progress-stage-dot` `.active`/`.done` transitions
- Score ring: `animate-ring-fill` 0.9s ease-out draws the gauge on mount
- Financial bars: `animate-bar-grow` 0.8s ease-out scales principal-vs-interest and feasibility bars in

## Constraints

- No rainbow gradients, no gaming/cyberpunk/crypto styling
- 3–5 core colors; violet gradient only on primary actions, numbers, and hero accents
- Space Grotesk display + General Sans body + Geist Mono data
- Token-only styling — no raw hex/rgb literals in components
- AA+ contrast in both light and dark; mobile-first and fully responsive
- Do not copy Zomato branding or layout
- Phase 2 stays within the violet/indigo cosmic palette — provenance/confidence/risk/map tints are muted, never neon
- Never fake real-world data; clearly label DEMO DATA when external APIs are unavailable
- Financial numbers come from deterministic backend code; What-if outputs always labeled "estimate"; simple English only (no Hindi/Hinglish financial explanations, no PDF export)

## Signature Detail

The luminous indigo→violet `text-gradient` applied to headline numbers and the primary CTA — one restrained glow that anchors the "cosmic intelligence" identity without ever going full-page. Phase 2 adds a second signature: the soft indeterminate progress sweep and muted provenance/confidence chips that make every estimate feel trustworthy and calm. Phase 3 adds a third: a calm financial color grammar (green money, indigo loan, amber interest, teal capital, violet break-even) that lets a repayment table and feasibility breakdown read at a glance, with a violet-bordered "What does this mean?" panel that explains every term in plain rural-friendly English.
