---
name: sonder-labz-site
description: Use for every visual, layout, component, motion, content-editing and auth decision on the Sonder Labz agency website and admin dashboard (fullstack Next.js, Tailwind CSS, shadcn/ui). Covers tokens, glass cards, light/dark mode, mobile-first layout, smooth scroll, custom scrollbar, logo usage, login-only admin, dashboard patterns and pre-ship checklists. Read fully before writing any UI or auth code.
---

# skill.md — Sonder Labz design and engineering skill

> Lives in `docs/` at the project root. Companion docs: `/docs/prompt.md` (how the agent works) and `/docs/prd.md` (what is built). All three live in `docs/`; reference them as `/docs/prompt.md`, `/docs/prd.md`, `/docs/skill.md`.

You are the design lead and senior engineer for **Sonder Labz**, a software agency that builds **web, mobile and desktop applications**. The site must feel precise, calm and premium: it is built by people who care about details, and it should show that without shouting.

---

## 1. Mindset

- **Minimal, not empty.** Few elements, each doing a job. Generous space, strong type, quiet surfaces.
- **One memorable thing.** Spend boldness in one place: the hero's device trio (section 9). Everything else stays disciplined.
- **Mobile first.** Most prospects open links on a phone. Design at 360px, then enlarge.
- **Content first.** What we build, real work, who we are and how to reach us must be one scroll away.
- **Real content only.** No lorem ipsum, invented clients, fake testimonials or made-up statistics. Placeholders look like placeholders and are flagged "Needs content" in the dashboard.
- **Everything editable.** If a visitor can read it, an admin can change it from `/admin`.
- **Avoid generated-page tells.** Do not default to any of these:
  - cream background + high-contrast serif + terracotta accent;
  - near-black background + single acid-green or vermilion accent;
  - broadsheet layout with hairlines and zero radius;
  - identical rounded cards with the same soft grey shadow, content chopped into a grid of sameness;
  - a tracked-out ALL-CAPS eyebrow above every heading;
  - `A · B · C` meta strings, `WORD — fragment` labels, `→` on every link or button;
  - one coloured or italic word inside a headline;
  - numbered `01 / 02 / 03` markers on content that is not a sequence;
  - fade-and-slide-up on every section, hover lift on every card;
  - gradient washes as decoration.

Glass cards are requested for this brand. Use them with intent: they sit over a soft ambient backdrop, vary in strength by importance, and are **not** applied to every block.

---

## 2. Stack and libraries

| Concern | Choice |
|---|---|
| Framework | Next.js (latest stable), App Router, TypeScript strict, `pnpm` |
| Styling | Tailwind CSS (v4 CSS-first config), CSS-variable tokens |
| Components | shadcn/ui (generated into `src/components/ui`), wrapped by Sonder Labz components |
| Icons | `lucide-react` (shadcn default), one family, 20–24px |
| Theme | `next-themes` (class strategy) |
| Motion | `motion` (`motion/react`), used under the budget in section 10 |
| Smooth scroll | `lenis` (public site only) |
| Forms | `react-hook-form` + `zod` + shadcn `Form` |
| Toasts | `sonner` |
| Database | PostgreSQL (Neon) + Drizzle ORM |
| Passwords | `@node-rs/argon2` |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` |

Do not add GSAP, 3D libraries, UI kits beyond shadcn, or state managers unless there is a written reason. Server state lives on the server; local UI state uses React state.

Setup order: create app → init shadcn → add components (`button input textarea label form card sheet dialog dropdown-menu tabs select switch badge separator skeleton table sonner tooltip`) → tokens → fonts → providers.

---

## 3. Design tokens

Define tokens once as CSS variables, map them into Tailwind and shadcn. **Never hard-code hex values in components.**

### 3.1 Palette ("Orbit")

| Token | Light | Dark | Use |
|---|---|---|---|
| `ink` | `#0D1020` | `#0D1020` | Deep tinted dark: dark background, primary text on light |
| `fog` | `#F4F5F9` | — | Light page background |
| `iris` | `#5B4BFF` | `#8F85FF` | Primary actions, links, focus ring (lightened in dark for contrast) |
| `lume` | `#3DE0C5` | `#3DE0C5` | The signal accent: logo dot, glow, small highlights. **Never for small text on light** |
| `slate` | `#5A6078` | `#A3A8BD` | Secondary text |
| `line` | `rgb(13 16 32 / 0.08)` | `rgb(255 255 255 / 0.10)` | Hairline borders |

Rules:
- Text contrast ≥ 4.5:1 (3:1 for large text and UI boundaries) in **both** themes. Check `iris` text on fog and on ink before using it small.
- 60/30/10 balance: backgrounds and surfaces / text and ink / iris with a trace of lume.
- Status colours are separate semantic tokens (`success`, `warning`, `danger`) and used only for status.
- Tinted darks, never pure `#000`.

### 3.2 Typography

- **Display:** *Bricolage Grotesque* (variable, weights 500–700) for headings.
- **Body/UI:** *Onest* (400/500/600).
- Load with `next/font/google`, Latin subset, `display: "swap"`, exposed as CSS variables.
- Fluid scale (use `clamp`): h1 `clamp(2.25rem, 1.2rem + 4.4vw, 4.75rem)`, h2 `clamp(1.75rem, 1.1rem + 2.2vw, 3rem)`, h3 `1.25–1.5rem`, body `1rem–1.0625rem`, small `0.875rem`.
- Headlines: line-height 1.05–1.15, slight negative tracking (`-0.02em`) only at display sizes. Body line-height 1.6. Line length ≤ 70 characters.
- Sentence case everywhere. No ALL-CAPS labels. Hierarchy comes from size, weight and space.
- Tabular figures for numbers that align (`tabular-nums`).

### 3.3 Space, shape and depth

- 4px base scale. Section padding `py-16 md:py-24 lg:py-32`. Container max width 1200px, side padding `px-5 md:px-8`.
- **Two radii only:** `--radius-sm: 12px` (inputs, buttons, chips) and `--radius-lg: 24px` (cards, panels, media). Do not round everything equally.
- Depth comes from tone, 1px borders, backdrop blur and spacing. One elevated shadow level, reserved for floating layers (menus, dialogs, sticky header).

### 3.4 `src/styles/globals.css` (starting point)

```css
@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
  --ink: #0d1020;
  --fog: #f4f5f9;
  --iris: #5b4bff;
  --lume: #3de0c5;

  --background: var(--fog);
  --foreground: var(--ink);
  --muted-foreground: #5a6078;
  --primary: var(--iris);
  --primary-foreground: #ffffff;
  --ring: var(--iris);
  --border: rgb(13 16 32 / 0.08);
  --input: rgb(13 16 32 / 0.14);

  --glass-bg: rgb(255 255 255 / 0.62);
  --glass-bg-strong: rgb(255 255 255 / 0.82);
  --glass-border: rgb(255 255 255 / 0.7);
  --glass-shadow: 0 8px 30px rgb(13 16 32 / 0.08);

  --radius-sm: 0.75rem;
  --radius-lg: 1.5rem;
}

.dark {
  --background: var(--ink);
  --foreground: #f4f5f9;
  --muted-foreground: #a3a8bd;
  --primary: #8f85ff;
  --primary-foreground: #0d1020;
  --ring: #8f85ff;
  --border: rgb(255 255 255 / 0.1);
  --input: rgb(255 255 255 / 0.16);

  --glass-bg: rgb(255 255 255 / 0.06);
  --glass-bg-strong: rgb(255 255 255 / 0.1);
  --glass-border: rgb(255 255 255 / 0.12);
  --glass-shadow: 0 8px 30px rgb(0 0 0 / 0.35);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-ink: var(--ink);
  --color-fog: var(--fog);
  --color-iris: var(--iris);
  --color-lume: var(--lume);
  --radius-sm: var(--radius-sm);
  --radius-lg: var(--radius-lg);
  --font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-onest), ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  * { @apply border-border; }
  body {
    @apply bg-background text-foreground font-sans antialiased;
    text-rendering: optimizeLegibility;
  }
  h1, h2, h3 { @apply font-display tracking-tight text-balance; }
  :focus-visible { outline: 2px solid var(--ring); outline-offset: 3px; }
}
```

Usage examples that must work: `text-ink dark:text-white`, `bg-fog dark:bg-ink`, `text-muted-foreground`.

---

## 4. Glass system

Glass needs something behind it. Provide a **static ambient backdrop** (no animation) on the public layout and the admin shell, then place glass above it.

### 4.1 Ambient backdrop

```tsx
// src/components/brand/AmbientBackdrop.tsx
export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-iris/20 blur-3xl dark:bg-iris/25" />
      <div className="absolute top-[55%] -right-40 h-[32rem] w-[32rem] rounded-full bg-lume/15 blur-3xl dark:bg-lume/10" />
    </div>
  );
}
```

Keep blur radii large but element count at two. Do not animate blurred elements.

### 4.2 `GlassCard` (the only way to make glass)

```tsx
// src/components/ui/glass-card.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glass = cva(
  [
    "relative rounded-[var(--radius-lg)] border",
    "border-[color:var(--glass-border)] bg-[color:var(--glass-bg)]",
    "shadow-[var(--glass-shadow)]",
    "backdrop-blur-xl backdrop-saturate-150",
    // graceful fallback when backdrop-filter is unsupported
    "supports-[not(backdrop-filter:blur(1px))]:bg-white/90 dark:supports-[not(backdrop-filter:blur(1px))]:bg-ink/90",
  ],
  {
    variants: {
      tone: {
        default: "",
        strong: "bg-[color:var(--glass-bg-strong)]",
        flat: "shadow-none backdrop-blur-md",
      },
      padding: { none: "", sm: "p-4", md: "p-5 md:p-6", lg: "p-6 md:p-8" },
      interactive: {
        true: "transition-colors duration-200 hover:bg-[color:var(--glass-bg-strong)] focus-within:ring-2 ring-ring",
        false: "",
      },
    },
    defaultVariants: { tone: "default", padding: "md", interactive: false },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glass> {
  as?: React.ElementType;
}

export function GlassCard({ as: Tag = "div", className, tone, padding, interactive, ...props }: GlassCardProps) {
  return <Tag className={cn(glass({ tone, padding, interactive }), className)} {...props} />;
}
```

Rules:
- Use `strong` for forms and anything with dense text; `default` for light content; `flat` for nested glass.
- **No glass inside glass inside glass.** Maximum two levels.
- Text on glass must meet contrast over the *worst* part of the backdrop. Test in both themes.
- On low-end phones, limit simultaneous blurred layers to ~4 in the viewport. The dashboard's data tables sit on solid `bg-background`/`bg-card`, not glass.

---

## 5. Logo

**The agent creates the logo.** No logo files are supplied. Design it as part of Phase 1 from this brief, then save the final files in `public/brand/`:

| File | Use |
|---|---|
| `logo-mark.svg` | Mark for light backgrounds |
| `logo-mark-dark.svg` | Mark for dark backgrounds |
| `logo.svg` | Mark + wordmark lockup (static, for docs and email) |
| `icon.svg` | App icon / favicon tile → copy to `src/app/icon.svg` |

### 5.1 Brief
- **Name:** Sonder Labz. "Sonder" is the realisation that every passer-by has a life as vivid as your own; "Labz" is the craft of building. The brand should feel human and precise.
- **Concept direction (pick one and justify it in a line):** a single-stroke or geometric "S" monogram; or two overlapping shapes suggesting separate lives meeting. Optional single accent detail (a small dot) in `lume`.
- **Style:** minimal, geometric, confident, built from simple paths. No gradients inside the mark (a gradient is allowed only on the app-icon tile), no 3D, no clip-art, no generic code brackets or circuit patterns, no robot/lightbulb clichés.
- **Colour:** mark follows the text colour (`currentColor`) with `lume` as the only accent; app-icon tile may use `iris`. Both themes must work.
- **Technical:** pure SVG paths on a 48×48 viewBox (wordmark may be live text in the display font, Bricolage Grotesque); readable at 16px (favicon) and 20px minimum in the UI; no embedded raster, no external fonts in the standalone SVGs (use a fallback stack).
- **Deliverables:** the four files above plus the inline `Logo` / `LogoMark` components below, with the final path data replacing the placeholder.
- **Review:** render the mark on `fog` and `ink` backgrounds and at 16px, 32px and 96px; check it is not mistaken for another well-known brand.

### 5.2 Inline component

Use the inline component in the UI so the mark follows the theme and the loaded display font. The path below is a **placeholder**; replace it with the final mark.

```tsx
// src/components/brand/Logo.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("size-8", className)}>
      {/* PLACEHOLDER: replace with the final mark paths */}
      <path
        d="M31.37 9.83 A9 9 0 1 0 24 24 A9 9 0 1 1 16.63 38.16"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="40" cy="33" r="2.8" className="fill-lume" />
    </svg>
  );
}

export function Logo({ className, showWordmark = true }: { className?: string; showWordmark?: boolean }) {
  return (
    <Link href="/" aria-label="Sonder Labz home" className={cn("inline-flex items-center gap-2.5 text-ink dark:text-white", className)}>
      <LogoMark />
      {showWordmark && <span className="font-display text-lg font-semibold tracking-tight">Sonder Labz</span>}
    </Link>
  );
}
```

### 5.3 Usage rules
Minimum mark size 20px; clear space around the mark of at least twice the accent detail's diameter; never stretch, rotate, add shadows, recolour the accent, or place on busy imagery. Open Graph image: `ink` background, the dark mark and the page title in the display font.

---

## 6. Theme (light and dark)

```tsx
// src/components/providers.tsx
"use client";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  );
}
```

- `<html lang="en" suppressHydrationWarning>` in the root layout.
- `ThemeToggle`: a client component with three states (system, light, dark) in a dropdown; label via `aria-label`, no text-only icons. Render a neutral placeholder until mounted to avoid hydration mismatch.
- Every component specifies dark variants where colours differ: `text-ink dark:text-white`, `bg-white/60 dark:bg-white/5`, `border-black/5 dark:border-white/10`. Prefer token classes (`bg-background`, `text-muted-foreground`) so most components need no `dark:` at all.
- Images with transparency or dark art provide both variants; never rely on `filter: invert`.

---

## 7. Custom scrollbar and smooth scroll

### 7.1 Scrollbar (add to `globals.css`)

Standard properties where supported, WebKit pseudo-elements as the fallback (Chrome ignores the pseudo-elements when `scrollbar-color` is set, so keep them separate).

```css
@supports (scrollbar-color: auto) {
  html, .scroll-area {
    scrollbar-width: thin;
    scrollbar-color: color-mix(in oklab, var(--primary) 60%, transparent) transparent;
  }
}

@supports not (scrollbar-color: auto) {
  ::-webkit-scrollbar { width: 12px; height: 12px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: color-mix(in oklab, var(--primary) 60%, transparent);
    border: 3px solid transparent;
    background-clip: content-box;
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
    background-clip: content-box;
  }
}
```

Keep the thumb visible and large enough to grab (≥ 8px effective). Use the `.scroll-area` class on scrollable panels (sidebar, tables, code blocks).

### 7.2 Smooth scroll (public site only)

```tsx
// src/components/site/SmoothScroll.tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 3), anchors: true });
    let id = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      id = requestAnimationFrame(raf);
    });
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);
  return null;
}
```

```css
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-stopped { overflow: hidden; }
@media (prefers-reduced-motion: no-preference) { html:not(.lenis) { scroll-behavior: smooth; } }
```

Rules:
- Mount `<SmoothScroll />` in the `(site)` layout only; the admin uses native scroll.
- Never change scroll direction or speed beyond easing; never pin forms or critical actions.
- Stop Lenis while the mobile menu or any dialog is open (use `lenis.stop()` / `start()` or let the dialog lock scroll).
- Scroll-margin for anchor targets: `scroll-mt-24` to clear the sticky header.
- Respect keyboard scrolling, find-in-page and touch momentum: if any break, disable Lenis on touch devices (`syncTouch: false` is the default).

---

## 8. Reusable component library

All base components come from shadcn/ui. **Page code imports only Sonder Labz wrappers**, so a style change happens in one place.

| Component | Location | Purpose |
|---|---|---|
| `Container` | `components/site/container.tsx` | Max width + side padding |
| `Section` | `components/site/section.tsx` | Vertical rhythm, optional `id`, heading and intro slots |
| `SectionHeading` | same | Heading + supporting text, left aligned by default |
| `GlassCard` | `components/ui/glass-card.tsx` | The only glass surface |
| `Button` | shadcn, extended | Variants: `primary`, `secondary`, `ghost`, `danger`; min height 44px |
| `Logo`, `LogoMark` | `components/brand/` | Brand |
| `ThemeToggle` | `components/brand/` | System/light/dark |
| `SiteHeader`, `MobileMenu`, `SiteFooter` | `components/site/` | Navigation |
| `ServiceRow` | `components/site/` | Typographic row per service |
| `ProjectFeature`, `ProjectRow` | `components/site/` | Featured work + compact list |
| `TeamMember` | `components/site/` | Portrait-led, name and role |
| `ProcessSteps` | `components/site/` | Real sequence only |
| `ContactForm` | `features/contact/` | Form with server action |
| `FormField` | `components/ui/form-field.tsx` | Label, control, hint, error |
| `AdminShell`, `AdminNav` | `components/admin/` | Dashboard layout |
| `PageHeader` | `components/admin/` | Title, description, primary action |
| `DataTable` | `components/admin/` | Solid surface, sortable, responsive (stacks on mobile) |
| `ConfirmDialog` | `components/admin/` | Destructive confirmations |
| `EmptyState` | `components/ui/` | Message + one action |
| `StatusBadge` | `components/admin/` | draft, published, new, read, needs content |
| `ImageUpload` | `components/admin/` | Upload + preview + required alt text |
| `SaveBar` | `components/admin/` | Sticky "Save changes" with dirty state |

Button copy states exactly what happens: "Start a project", "Send message", "Save changes", "Publish project", "Delete project". Never "Submit".

Button example (extend shadcn's `buttonVariants`):

```tsx
primary:   "bg-primary text-primary-foreground hover:bg-primary/90",
secondary: "border border-input bg-transparent hover:bg-foreground/5",
ghost:     "hover:bg-foreground/5",
danger:    "bg-red-600 text-white hover:bg-red-700 dark:bg-red-500",
```

Sizes: `h-11 px-5` default, `h-12 px-6` large; tap feedback via `active:scale-[0.98]` (CSS, no JS).

---

## 9. Public site layout and direction

### 9.1 Global
- **Header:** slim, sticky, glass (`backdrop-blur`, solid fallback). Logo left; links (Services, Work, About, Contact), theme toggle and "Start a project" right. Condenses slightly on scroll (padding only). Mobile: menu button opens a full-height sheet (focus trap, ESC, scroll lock) with large tap targets and the primary action at the bottom within thumb reach.
- **Footer:** solid, quiet. Logo, short line from settings, link groups, contact, socials, legal links. Content comes from the database.
- Alignment: **left-aligned** headings and body for readability; centre only short closing calls to action.

### 9.2 Home (top to bottom)
1. **Hero (the one memorable thing).** Left: headline and one supporting sentence, two actions ("Start a project", "See our work"). Right on desktop / below on mobile: the **device trio**, three overlapping glass frames built in CSS: a browser window (web), a phone (mobile) and a desktop app window (desktop), each showing abstract UI blocks, not fake product screenshots. No stat counters, no gradient blob, no stock photos.
2. **What we build.** Three typographic rows (Web, Mobile, Desktop): large platform name, one-sentence description, a list of what is included. Rows share a baseline and divider, not three identical cards.
3. **Featured work.** One large `ProjectFeature` (image, title, one-line summary, platforms, link) plus a compact list of up to three more. Hidden if no projects are published.
4. **How we work.** A genuine sequence (so numbering is allowed here): short steps from first call to launch and support. Text from the dashboard.
5. **Team.** Portrait-led, generous space, name and role only; links to `/about`.
6. **Closing call to action.** A single `strong` GlassCard: one sentence, one button.

Inner pages reuse tokens and components. `/work` is a filter bar (platform) + project rows. `/work/[slug]` is a case page: summary, role, platform, stack tags, outcome text, gallery.

### 9.3 Copy
Plain, direct, active voice, sentence case, no filler ("Welcome to our website" is filler). Name things by what visitors understand ("Start a project", "See our work"). Errors say what went wrong and how to fix it and do not apologise: "Enter an email like name@company.com." Empty states invite action. Never invent facts about Sonder Labz.

---

## 10. Motion

### 10.1 Budget (non-user-triggered motion is rationed)
1. **One hero sequence** on first load of Home (≤ 1.2s): headline lines then device trio settle into place.
2. **One scroll-linked signature:** as the hero scrolls out, the three device frames drift slightly apart (transform only, ≤ 3 motion values, pinned to hero height).
3. Everything else is **user-triggered feedback**: menu open/close, dialogs, accordions, button press, form success, toasts, hover/focus states.

Not allowed: fade-up on every section, hover lift on every card, looping animations, parallax beyond the hero signature, auto-playing carousels, cursor effects, scroll-jacking.

### 10.2 Rules
- Animate **transform and opacity only** (`clip-path` sparingly). Never animate width, height, top, left, blur radius or box-shadow on scroll.
- Durations: micro 120–200ms, UI 200–350ms, reveals 400–700ms. Easing `[0.22, 1, 0.36, 1]`; interactive springs `{ type: "spring", stiffness: 260, damping: 30 }`.
- Reduced motion: `MotionConfig reducedMotion="user"` plus `useReducedMotion()` to render the static end state of the hero and signature.
- Motion components are small `"use client"` wrappers. Critical text is in server HTML and visible without JS.
- Dashboard: no decorative motion at all, only feedback (toasts, dialogs, skeletons).

Signature sketch:

```tsx
// src/components/site/DeviceTrio.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

export function DeviceTrio() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -40]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -24]);
  return (
    <div ref={ref} className="relative mx-auto aspect-[4/3] w-full max-w-xl">
      <motion.div style={{ x: xLeft }} className="absolute left-0 top-6 w-[62%]">{/* browser frame (web) */}</motion.div>
      <motion.div style={{ y: yMid }} className="absolute left-[38%] top-0 w-[26%]">{/* phone frame (mobile) */}</motion.div>
      <motion.div style={{ x: xRight }} className="absolute right-0 bottom-0 w-[54%]">{/* desktop window (desktop) */}</motion.div>
    </div>
  );
}
```

Frames are `GlassCard`s with abstract bars and blocks drawn with divs; decorative, `aria-hidden`.

---

## 11. Admin dashboard (content editing)

### 11.1 Principles
- **Clarity over style.** Glass is used only for the shell (sidebar, header) over the ambient backdrop. Forms and tables sit on solid surfaces for legibility.
- Mobile first: sidebar becomes a sheet; tables become stacked rows; the primary action stays reachable.
- Every editable field shows its label, hint and character limit. Validation errors appear inline and say how to fix.
- Unsaved-changes guard on every editor. "Save changes" becomes "Saved" with a toast; destructive actions use `ConfirmDialog` that names the item.
- Same word, same action, everywhere: the button says "Publish project", the toast says "Project published".
- Show **"Needs content"** badges where seed placeholders have not yet been replaced.

### 11.2 Shell
`/admin/layout.tsx` calls `requireAdmin()` (redirects to `/admin/login` if no valid session) and renders `AdminShell`: left nav (Overview, Content, Services, Projects, Team, Media, Messages, Settings), top bar with theme toggle, "View site" link and account menu (Account, Sign out). `/admin/login` is outside the protected layout (route group `(auth)`), and has no link to any registration page because none exists.

### 11.3 Content model in code
Each editable section has a `zod` schema and typed defaults, registered in one map:

```ts
// src/features/content/schemas.ts
import { z } from "zod";

export const contentSchemas = {
  hero: z.object({
    headline: z.string().min(3).max(90),
    description: z.string().min(10).max(220),
    primaryCta: z.string().min(2).max(30),
    secondaryCta: z.string().min(2).max(30),
  }),
  process: z.object({
    heading: z.string().max(80),
    steps: z.array(z.object({ title: z.string().max(40), body: z.string().max(240) })).min(2).max(8),
  }),
  cta: z.object({ heading: z.string().max(90), body: z.string().max(200), button: z.string().max(30) }),
  // about, footer, privacy, terms, seo ...
} as const;

export type SectionKey = keyof typeof contentSchemas;
export type SectionData<K extends SectionKey> = z.infer<(typeof contentSchemas)[K]>;
```

Reading (cached, tagged):

```ts
// src/features/content/queries.ts
import "server-only";
import { unstable_cache } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import { contentSchemas, type SectionKey, type SectionData } from "./schemas";
import { defaults } from "./defaults";

export const getContent = <K extends SectionKey>(key: K) =>
  unstable_cache(
    async (): Promise<SectionData<K>> => {
      const [row] = await db.select().from(contentBlocks).where(eq(contentBlocks.sectionKey, key));
      const parsed = contentSchemas[key].safeParse(row?.data);
      return (parsed.success ? parsed.data : defaults[key]) as SectionData<K>;
    },
    ["content", key],
    { tags: [`content:${key}`] }
  )();
```

Writing (Server Action, always authorised and validated):

```ts
// src/features/content/actions.ts
"use server";
import { revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import { contentSchemas, type SectionKey } from "./schemas";

export async function saveContent(key: SectionKey, input: unknown) {
  const user = await requireAdmin();                       // 1. authorise
  const parsed = contentSchemas[key].safeParse(input);     // 2. validate
  if (!parsed.success) return { ok: false as const, errors: parsed.error.flatten().fieldErrors };

  await db
    .insert(contentBlocks)
    .values({ sectionKey: key, data: parsed.data, updatedBy: user.id })
    .onConflictDoUpdate({ target: contentBlocks.sectionKey, set: { data: parsed.data, updatedBy: user.id, updatedAt: new Date() } });

  revalidateTag(`content:${key}`); // 3. refresh public pages
  return { ok: true as const };
}
```

Version note: in newer Next.js releases `revalidateTag` takes a cache-life profile as a second argument (for example `revalidateTag(tag, "max")`) and `updateTag(tag)` gives read-your-writes inside Server Actions; and `"use cache"` with `cacheTag` may replace `unstable_cache`. **Check the installed version's docs and use the current API**, keeping the same pattern: tag on read, invalidate on write.

Projects, team and services follow the same shape: `schema.ts` (zod), `queries.ts` (cached, tagged `projects`, `project:<slug>`, `team`, `services`), `actions.ts` (authorise → validate → write → invalidate). Reordering uses explicit "Move up / Move down" buttons for MVP (accessible); drag-and-drop is optional later.

### 11.4 Dashboard UX details
- Overview: unread messages count, items marked "Needs content", last edited sections.
- Projects: table with title, platforms, status, featured, updated; row actions in a dropdown; "New project" primary action. Editor has tabs: Details, Media, Links, SEO.
- Team: list with photo, name, role, visible toggle, order controls.
- Messages: list (name, project type, date, status); detail view; mark read, archive, delete; copy email button.
- Media: grid with alt text editing; deleting an image in use is blocked with a clear message.
- Settings: site name, contact email, phone/WhatsApp, social links, default SEO.
- Account: change password (current + new), sign out everywhere.

---

## 12. Authentication: login only

**There is no register route, page, API or Server Action. Do not create one, and do not create a "sign up" link, invite page or open signup endpoint.** Accounts are created only by developer scripts:

- `pnpm seed:admin` reads `ADMIN_EMAIL`, `ADMIN_PASSWORD` (and optional `ADMIN_NAME`) from the environment and creates the first admin if none exists.
- `pnpm admin:create` (interactive) adds another admin from a trusted machine.
- `pnpm admin:reset` resets a password from a trusted machine.

### 12.1 Sessions

Opaque random token in an `httpOnly` cookie; only its hash is stored, so sessions can be revoked.

```ts
// src/lib/auth/session.ts
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { sessions, adminUsers } from "@/lib/db/schema";

const COOKIE = "sl_session";
const TTL_MS = 1000 * 60 * 60 * 24 * 7;
const hash = (t: string) => createHash("sha256").update(t).digest("hex");

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + TTL_MS);
  await db.insert(sessions).values({ userId, tokenHash: hash(token), expiresAt });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export const getSession = cache(async () => {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const [row] = await db
    .select({ id: sessions.id, expiresAt: sessions.expiresAt, user: adminUsers })
    .from(sessions)
    .innerJoin(adminUsers, eq(adminUsers.id, sessions.userId))
    .where(eq(sessions.tokenHash, hash(token)));
  if (!row || row.expiresAt < new Date()) return null;
  return row;
});

/** Call at the top of every admin layout, page, Server Action and Route Handler. */
export async function requireAdmin() {
  const s = await getSession();
  if (!s) redirect("/admin/login");
  return s.user;
}

export async function destroySession() {
  const token = (await cookies()).get(COOKIE)?.value;
  if (token) await db.delete(sessions).where(eq(sessions.tokenHash, hash(token)));
  (await cookies()).delete(COOKIE);
}
```

### 12.2 Login action

```ts
// src/app/admin/(auth)/login/actions.ts
"use server";
import { verify } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { createSession } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });
// Verified against this hash when the email is unknown, so timing does not reveal valid emails.
const DUMMY_HASH = process.env.DUMMY_PASSWORD_HASH!;

export async function login(_: unknown, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Enter a valid email and password." };

  const limited = await checkRateLimit("login", parsed.data.email); // per IP + email
  if (!limited.ok) return { error: "Too many attempts. Try again in a few minutes." };

  const [user] = await db.select().from(adminUsers).where(eq(adminUsers.email, parsed.data.email.toLowerCase()));
  const ok = await verify(user?.passwordHash ?? DUMMY_HASH, parsed.data.password);
  if (!user || !ok) return { error: "Email or password is incorrect." };

  await createSession(user.id);
  redirect("/admin");
}
```

### 12.3 Route gating

`proxy.ts` (named `middleware.ts` in older Next.js versions) does an **optimistic** check only: no session cookie → redirect `/admin/*` (except `/admin/login`) to the login page. It is a convenience, **not** security. Real authorisation is `requireAdmin()` in the admin layout and in **every** Server Action and Route Handler. Add a tiny test that fails if any file under `src/app` matches `register|signup|sign-up`.

### 12.4 Hardening
- Argon2id for hashing; never log passwords or tokens.
- Rotate the session on login; delete all sessions on password change.
- Generic login error text; rate limit login and contact.
- Security headers via `next.config`: CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `frame-ancestors 'none'` for `/admin`.
- Upload route validates auth, MIME, size and extension before storing.

---

## 13. Accessibility, performance and quality

### 13.1 Accessibility (non-negotiable)
- Keyboard: everything reachable and operable; visible focus ring; skip-to-content link; dialogs and sheets trap focus and restore it.
- Contrast ≥ 4.5:1 (3:1 large text and UI boundaries) in light **and** dark, over glass at every scroll position.
- `prefers-reduced-motion` respected (provider, Lenis off, static hero).
- Touch targets ≥ 44px; no hover-only functionality.
- Headings in order; landmarks (`header`, `main`, `nav`, `footer`); meaningful `alt` text (required in the media uploader), empty `alt` for decoration.
- Forms: labels above fields, 16px+ inputs (prevents iOS zoom), errors linked with `aria-describedby`, focus moves to the first error.
- No horizontal scroll at 360px.

### 13.2 Performance
- Public first-load JS ≤ 150 KB gzipped; motion and Lenis code-split into small client wrappers.
- Hero asset is the LCP element; everything else lazy. Use `next/image` with `sizes`, AVIF/WebP, blur placeholders for large photos.
- Fonts through `next/font` with fallback metrics; CLS ≈ 0.
- Blur budget: ≤ 4 simultaneously visible backdrop-blur layers on mobile; prefer solid surfaces for long text and tables.
- Scroll-linked work uses transforms/opacity only and ≤ 3 motion values.
- Verify at 4× CPU slowdown and Slow 4G.

### 13.3 Security quick list
No public sign-up; auth checked in every action; `zod` on every input; secrets server-only; upload validation; rate limits; headers; dependency audit.

---

## 14. Pre-ship review (answer each before declaring done)

1. Does the design plan make choices specific to Sonder Labz, or could it be any agency? Revise if generic.
2. Is there exactly one hero sequence, one scroll signature, and nothing else autonomous?
3. Do all colours, fonts, radii and spacings come from tokens? Any hard-coded hex in components?
4. Is glass created only through `GlassCard`, never nested more than twice, and readable in both themes?
5. Is every service, project, team member and line of public text editable from `/admin`?
6. Does a search for `register`, `signup` or `sign-up` in `src/app` and `src/features` return nothing? Does every admin action call `requireAdmin()`?
7. Is any text unreadable at any scroll position, in dark mode, or with reduced motion?
8. Is every placeholder visibly a placeholder and flagged "Needs content"? No invented clients, numbers or quotes?
9. Does everything work at 360px, 768px and 1280px, with keyboard only, and with JS slow?
10. Lighthouse mobile ≥ 90 performance, ≥ 95 accessibility and SEO; axe clean; `pnpm build` passes.
11. What single decorative element can be removed? Remove it.
