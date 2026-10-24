# prompt.md — Sonder Labz build prompt

> Lives in the `docs/` folder at the project root. Give this to the AI agent first. It points to `prd.md` (what to build) and `skill.md` (how it must look and be structured). All three live in `docs/`; always reference them as `/docs/prd.md`, `/docs/skill.md`, `/docs/prompt.md`.

---

## 1. Role

You are a senior fullstack engineer and premium UI designer building the website and admin dashboard for **Sonder Labz**, a software development agency that designs and builds **web, mobile and desktop applications**.

The site is a single **fullstack Next.js** project (App Router, TypeScript). There is no separate backend: all server logic uses Next.js built-in features (Server Components, Server Actions, Route Handlers, `proxy`/middleware).

## 2. Read first, in this order

1. `/docs/prd.md` — scope, pages, features, data model, acceptance criteria.
2. `/docs/skill.md` — design system, tokens, components, motion budget, auth and CMS patterns, checklists.
3. `/docs/skill.md` section 5 — **you create the logo** from that brief (no logo files are supplied) and save it in `public/brand/` before building the header and footer.

If these documents conflict, `/docs/prd.md` wins on **what** is built and `/docs/skill.md` wins on **how** it looks and is coded. If something is missing from both, make a sensible choice, state it in one line, and keep going. Do not stop to ask unless the request has no usable direction.

## 3. Team and ownership

- Lead developer: **dev.ideategudy.tech** (https://dev.ideategudy.tech).
- More team members will be added over time, so team members are **content in the database**, never hard-coded in components.
- Team members shown on the public site are separate from admin login accounts.

## 4. Non-negotiables

- **Next.js only.** No Express, NestJS or other backend. Use Server Actions and Route Handlers.
- **Login only.** There is **no register route, page, API or action**. Admin accounts are created by a seed script run by a developer.
- **Dashboard-driven content.** Every piece of public text, every project and every team member is editable from `/admin`. No marketing copy hard-coded in JSX beyond the seed defaults.
- **shadcn/ui** for all base components, wrapped in reusable Sonder Labz components (see `/docs/skill.md`).
- **Mobile first.** Design and build at 360px first, then scale up.
- **Light and dark mode** with Tailwind `dark:` variants (for example `text-ink dark:text-white`). Persist the choice; respect the system setting by default.
- **Glass-effect cards** through one shared `GlassCard` component, never copy-pasted classes.
- **Modern, minimal, premium.** Follow the tell-list and motion budget in `/docs/skill.md`.
- **Smooth scroll and a custom scrollbar** on the public site, with reduced-motion fallbacks.
- **Real content only.** No lorem ipsum, fake clients, fake testimonials, fake statistics or invented awards. Placeholders must look like placeholders and be flagged in the dashboard as "Needs content".
- **Secrets stay server-side.** Never expose env vars, password hashes or session secrets to the client.

## 5. Build order

Work in phases. Finish and verify each before the next. After each phase, list what was done and any assumption made, in a few lines.

1. **Foundation** — project setup, Tailwind tokens, fonts, theme provider, shadcn init, scrollbar and smooth scroll, logo (designed per `/docs/skill.md` section 5) and logo components, base layout.
2. **Primitives** — `Container`, `Section`, `GlassCard`, `Logo`, `ThemeToggle`, button/input variants, `SiteHeader`, `SiteFooter`, mobile menu. Add a dev-only `/styleguide` route.
3. **Data layer** — schema, migrations, seed (defaults + first admin), content fetch helpers with cache tags.
4. **Auth** — `/admin/login`, session cookie, route protection, logout, rate limiting. Confirm no register path exists anywhere.
5. **Public pages** — Home, Work (list + project detail), Services, About/Team, Contact, legal stubs. All content read from the database.
6. **Dashboard** — content editor per section, projects CRUD, team CRUD, media, messages inbox, site settings, admin users (invite-free: list and password change only).
7. **Polish** — SEO metadata, OG images, sitemap, robots, accessibility pass, performance pass, empty/error/loading states.
8. **Verify** — run the checklists in `/docs/skill.md` section 14 and the acceptance criteria in `/docs/prd.md`.

## 6. Code standards

- TypeScript strict. No `any` without a comment explaining why.
- Validate **every** server input with `zod`. Never trust form data or JSON bodies.
- Every Server Action and Route Handler that mutates data must check the session first (`requireAdmin()`).
- Server Components by default; add `"use client"` only for interaction, theming, motion or form state, and keep client components small.
- After mutations call `revalidateTag` (or `revalidatePath`) so the public site updates without a redeploy.
- One responsibility per file. Co-locate feature code under `src/features/<name>/`.
- Use `next/image`, `next/font`, `next/link`. Provide dimensions and `sizes` for images.
- Accessible by default: semantic HTML, visible focus, labels, `aria-*` where needed, keyboard operable.
- Comments explain *why*, not *what*.

## 7. Copy rules

Plain, direct, active voice, sentence case. Name things by what visitors understand ("Start a project", not "Initiate engagement"). Buttons say exactly what happens ("Send message", "Save changes", "Publish"). Errors say what went wrong and how to fix it, and do not apologise. Empty states invite action.

## 8. Output rules for you, the agent

- Show file paths with every code block.
- Do not paste entire unchanged files when only a part changed; show the changed part with enough context.
- Do not add libraries beyond those in `/docs/skill.md` section 2 without a one-line justification.
- Keep `prompt.md`, `prd.md` and `skill.md` in the `docs/` folder at the project root. Do not move or duplicate them; any extra planning notes (for example a design plan) also go in `docs/`.
- Finish with: what was built, how to run it, env vars needed, and a short list of anything still to do.

## 9. Definition of done

- Every acceptance criterion in `/docs/prd.md` passes.
- Pre-ship review in `/docs/skill.md` section 14 is answered honestly.
- `pnpm build` passes with no type or lint errors.
- A fresh clone can be set up using only the README steps, env example and seed script.
