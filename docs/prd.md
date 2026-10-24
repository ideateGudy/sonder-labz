# prd.md — Sonder Labz website and admin dashboard

> Lives in `docs/` at the project root. Companion docs: `/docs/prompt.md` (how to run the build) and `/docs/skill.md` (design system and code patterns).

## 1. Overview

**Sonder Labz** is a software development agency that builds **web, mobile and desktop applications**. This project is the agency's public website plus a private dashboard where the team edits the site's content without touching code.

- **Type:** fullstack Next.js (App Router, TypeScript), one codebase, one deployment.
- **Lead developer:** dev.ideategudy.tech (https://dev.ideategudy.tech). More team members will be added.
- **Primary job of the public site:** help a prospective client understand what Sonder Labz builds, see real work, meet the team, and start a conversation.
- **Primary job of the dashboard:** let authorised team members update text, projects, team and settings, and read incoming messages.

## 2. Goals and non-goals

### Goals
1. A fast, premium, mobile-first site that makes the agency look credible within five seconds.
2. Every visible piece of content editable from `/admin`.
3. A simple, safe login-only admin (no public registration).
4. Light and dark themes, both fully designed.
5. Easy to extend: new sections, projects and team members need no code changes.

### Non-goals (MVP)
- Public user accounts, client portals or billing.
- Blog or CMS-style long-form publishing (Phase 2 candidate).
- Multi-language support.
- Online payments or booking.
- Analytics dashboards inside the admin (use an external analytics tool if wanted).

## 3. Users

| User | Needs |
|---|---|
| **Prospective client** (mostly on a phone) | Quickly see what the agency does, view real projects, trust the team, send a message. |
| **Admin / team member** | Log in, edit copy, add projects and team members, read messages, change their password. |
| **Developer** | Clone, configure env, run migrations and seed, deploy. |

## 4. Scope

### 4.1 Public pages

| Route | Purpose | Content source |
|---|---|---|
| `/` | Home: hero, what we build, featured work, how we work, team preview, contact call to action | DB |
| `/services` | Web, mobile and desktop application services, each with its own detail | DB |
| `/work` | All published projects, filterable by platform (web, mobile, desktop) | DB |
| `/work/[slug]` | Project detail: summary, role, platform, stack, outcome, links, images | DB |
| `/about` | Who we are, approach, full team list | DB |
| `/contact` | Contact form, email, optional phone/WhatsApp, socials | DB + form |
| `/privacy`, `/terms` | Legal pages (editable text) | DB |
| `/not-found`, `/error` | Branded error states | Static |

### 4.2 Admin pages (all behind login)

| Route | Purpose |
|---|---|
| `/admin/login` | Email and password login. **The only auth entry point.** |
| `/admin` | Overview: unread messages, drafts needing content, quick links |
| `/admin/content` | Edit text for every section (hero, services intro, about, process, contact, footer, SEO) |
| `/admin/projects` | List, create, edit, reorder, publish/unpublish, delete projects |
| `/admin/team` | List, create, edit, reorder, show/hide team members |
| `/admin/services` | Edit the three service lines and their details |
| `/admin/messages` | Inbox of contact form submissions; mark read, archive, delete |
| `/admin/media` | Upload and manage images used by projects and team |
| `/admin/settings` | Site name, contact details, social links, default SEO, theme defaults |
| `/admin/account` | Change own password; sign out of all sessions |

### 4.3 Explicitly absent
- `/register`, `/signup`, `/admin/register`, or any action or API route that creates an account from the public internet. Admin users are created by `pnpm seed:admin` (and a `pnpm admin:create` CLI for later additions) run by a developer with server access.
- Password reset by email is **Phase 2**. In MVP a developer can reset via CLI (`pnpm admin:reset`).

## 5. Functional requirements

Each requirement has an ID. "Done" means all listed acceptance criteria pass.

### FR-1 Branding and theme
- A logo is designed by the build agent per `/docs/skill.md` section 5 and saved to `public/brand/`; it is used for header, footer, favicon and OG image.
- Light and dark themes, default to system, toggle in header, choice persisted.
- **Acceptance:** toggling theme changes every page with no flash of wrong theme on reload; all text meets 4.5:1 contrast in both themes.

### FR-2 Navigation and layout
- Sticky glass header with logo, links (Services, Work, About, Contact), theme toggle and a "Start a project" button.
- Mobile: menu button opens a full-height sheet (focus-trapped, ESC closes). Footer with links, contact and socials.
- **Acceptance:** header usable at 360px; keyboard-only navigation works; skip-to-content link present.

### FR-3 Home
- Hero with headline, one-sentence description, two actions ("Start a project", "See our work").
- "What we build" showing Web, Mobile and Desktop.
- Featured projects (up to 4, chosen in the dashboard).
- "How we work" as a real sequence (only because it is a sequence).
- Team preview and a closing contact call to action.
- **Acceptance:** all text comes from the database; unpublished content never appears; Lighthouse mobile performance ≥ 90.

### FR-4 Services
- Three service lines (Web, Mobile, Desktop), each with title, summary, what is included, and typical tech (editable lists).
- **Acceptance:** adding or editing a service in the dashboard changes `/services` and the Home summary after save.

### FR-5 Work
- Project fields: title, slug, one-line summary, description, platform(s), role, stack tags, cover image, gallery images, live URL, repo URL (optional), status (draft/published), featured flag, sort order, published date.
- Filter by platform on `/work`.
- **Acceptance:** draft projects return 404 publicly; slug is unique and URL-safe; images have alt text.

### FR-6 Team
- Member fields: name, role, short bio, photo, links (website, GitHub, LinkedIn, X), visible flag, sort order.
- Seed with the lead developer: **dev.ideategudy.tech**, role "Lead developer", link `https://dev.ideategudy.tech`. Name, bio and photo are placeholders until edited.
- **Acceptance:** adding a new member in the dashboard shows them on `/about` and the Home preview without code changes.

### FR-7 Contact
- Form: name, email, message, optional project type (Web, Mobile, Desktop, Not sure), honeypot field.
- Saved to the database and visible in `/admin/messages`. Rate limited per IP.
- Success state tells the sender what happens next; errors say how to fix.
- **Acceptance:** invalid input is rejected server-side with field-level messages; spam honeypot submissions are silently dropped; submitting twice quickly does not create duplicates.
- **Phase 2:** email notification to the team address.

### FR-8 Admin authentication
- Email and password login only. Passwords hashed with Argon2id (or bcrypt cost ≥ 12 if Argon2 is unavailable on the host).
- Session stored as an opaque random token in an `httpOnly`, `secure`, `sameSite=lax` cookie; only its hash is stored in the database, so sessions can be revoked.
- All `/admin/*` routes and all admin Server Actions require a valid session (checked in `proxy`/middleware **and** again in each action, since the proxy alone is not sufficient).
- Login rate limiting and generic error message ("Email or password is incorrect").
- **Acceptance:** unauthenticated requests to any `/admin/*` route redirect to `/admin/login`; there is no route or action that creates users; sign-out invalidates the session on the server.

### FR-9 Content editing
- Section editors use forms with validation, a "Save changes" action, unsaved-changes warning, and a live preview link ("View on site").
- Content is stored as typed blocks per section (see data model) and validated with `zod`.
- Saving revalidates the affected public pages.
- **Acceptance:** after saving, the public page shows the new text within seconds without redeploying; invalid content cannot be saved; every editable field has a length limit.

### FR-10 Media
- Upload images (JPEG, PNG, WebP, AVIF; max 5 MB each), stored in object storage or the configured provider; metadata in the database.
- Alt text required on upload.
- **Acceptance:** non-image and oversized files are rejected; images render through `next/image` with correct sizes.

### FR-11 SEO and sharing
- Per-page title and description (editable), canonical URLs, Open Graph and Twitter images, `sitemap.xml`, `robots.txt`, JSON-LD `Organization`.
- **Acceptance:** Lighthouse SEO ≥ 95; social previews show the logo and page title.

### FR-12 Smooth scroll and scrollbar
- Smooth scrolling on the public site and a custom, slim scrollbar in light and dark.
- Both disabled or neutralised under `prefers-reduced-motion`; the dashboard uses native scrolling with the same custom scrollbar styling.
- **Acceptance:** no scroll-jacking; anchor links and keyboard scrolling behave normally.

## 6. Content model

All table and field names are suggestions; keep them consistent once chosen.

| Table | Key fields |
|---|---|
| `admin_users` | id, email (unique), password_hash, name, created_at, last_login_at |
| `sessions` | id, user_id, token_hash, expires_at, created_at, user_agent, ip_hash |
| `site_settings` | key (pk), value (jsonb) — site name, contact email, phone/WhatsApp, socials, default SEO |
| `content_blocks` | section_key (pk), data (jsonb), updated_at, updated_by — hero, services_intro, process, about, cta, footer, legal pages |
| `services` | id, slug, title, summary, details (jsonb), platform (`web`/`mobile`/`desktop`), sort_order |
| `projects` | id, slug (unique), title, summary, description, platforms (text[]), role, stack (text[]), cover_media_id, status, featured, sort_order, live_url, repo_url, published_at |
| `project_media` | project_id, media_id, sort_order |
| `team_members` | id, name, role, bio, photo_media_id, links (jsonb), visible, sort_order |
| `media` | id, url, width, height, alt, mime, size, created_at |
| `messages` | id, name, email, project_type, body, status (`new`/`read`/`archived`), created_at, ip_hash |
| `rate_limits` | key, count, window_start (or use a provider-backed store) |

**Seed defaults** (all editable afterwards):
- One `content_blocks` row per section with plain, honest starter copy and a "Needs content" flag where real facts are missing.
- Three services: Web applications, Mobile applications, Desktop applications.
- One team member: dev.ideategudy.tech, Lead developer.
- One admin user created from `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables at seed time (password is never stored in plaintext or committed).

## 7. Information architecture

```
Home
├── Services
├── Work
│   └── Project detail
├── About (team)
├── Contact
└── Legal (Privacy, Terms)

Admin (login required)
├── Overview
├── Content
├── Services
├── Projects
├── Team
├── Media
├── Messages
├── Settings
└── Account
```

## 8. Technical architecture

- **Framework:** Next.js (latest stable), App Router, React Server Components, TypeScript strict.
- **Styling:** Tailwind CSS, shadcn/ui, CSS variable tokens (`/docs/skill.md` section 3).
- **Server logic:** Server Actions for mutations, Route Handlers only where an HTTP endpoint is needed (uploads, health check), `proxy`/middleware for route gating.
- **Database:** PostgreSQL (Neon recommended) with a typed ORM and migrations (Drizzle recommended).
- **Auth:** custom session auth as in FR-8 (no third-party provider needed for a login-only, small admin).
- **Validation:** `zod` for all inputs.
- **Caching:** tagged fetch/cache helpers; `revalidateTag` after admin mutations.
- **Hosting:** any Next.js-capable host (Vercel recommended). Env vars documented in `.env.example`.
- **Folder layout:**

```
/
├── docs/
│   ├── prompt.md
│   ├── prd.md
│   └── skill.md
├── public/brand/            # logo files
├── src/
│   ├── app/
│   │   ├── (site)/          # public pages
│   │   ├── admin/           # dashboard (login + protected)
│   │   └── api/             # uploads, health only
│   ├── components/
│   │   ├── ui/              # shadcn primitives
│   │   ├── brand/           # Logo, ThemeToggle
│   │   ├── site/            # Header, Footer, sections
│   │   └── admin/           # dashboard shell, forms
│   ├── features/            # projects, team, content, messages
│   ├── lib/                 # db, auth, content helpers, utils
│   └── styles/globals.css
├── scripts/                 # seed:admin, admin:create, admin:reset
└── .env.example
```

## 9. Security requirements

- No public account creation of any kind.
- Argon2id/bcrypt password hashing; constant-time comparison; generic login errors.
- Session cookies `httpOnly`, `secure`, `sameSite=lax`; rotate on login; expire (e.g. 7 days sliding) and revocable.
- CSRF protection via Server Actions' built-in origin checks plus `sameSite`; custom Route Handlers verify origin.
- Authorisation check in **every** admin Server Action and Route Handler, not only in the proxy.
- Input validation with `zod`; output escaped by React; rich text, if ever added, sanitised.
- Rate limits on login and contact form.
- Security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`).
- Upload validation by MIME sniffing and size; never serve user uploads from a path that can execute code.
- Secrets only in environment variables; `.env*` ignored by git; no secrets in client bundles.
- Dependency audit in CI.

## 10. Non-functional requirements

| Area | Target |
|---|---|
| Performance | Lighthouse mobile ≥ 90; LCP ≤ 2.5s on Slow 4G; public first-load JS ≤ 150 KB gzipped |
| Accessibility | WCAG 2.2 AA; axe clean; Lighthouse accessibility ≥ 95 |
| Responsiveness | No horizontal scroll from 360px up; touch targets ≥ 44px |
| Browser support | Last 2 versions of Chrome, Safari, Firefox, Edge; iOS Safari 16+ |
| SEO | Server-rendered content; Lighthouse SEO ≥ 95 |
| Reliability | Graceful states for empty data, DB errors and failed uploads |
| Maintainability | Lint and type checks pass; no dead code; documented env and scripts |

## 11. Content guidance

Real copy only. Starter text must be honest and generic enough not to invent facts. Anything unknown (client names, years in business, counts, testimonials) is left empty and shown in the dashboard as "Needs content". Public pages hide empty optional sections instead of showing placeholders.

Suggested starter lines (editable): hero headline "We build web, mobile and desktop software", supporting line "Sonder Labz designs and develops applications for businesses and founders."

## 12. Milestones (MVP first)

| Milestone | Contents |
|---|---|
| **M1 — Foundation** | Setup, tokens, theme, scroll, logo, layout, primitives, styleguide |
| **M2 — Data and auth** | Schema, seed, login, session, route protection |
| **M3 — Public site** | Home, Services, Work, About, Contact, legal, SEO basics |
| **M4 — Dashboard** | Content, services, projects, team, media, messages, settings, account |
| **M5 — Polish and launch** | Accessibility, performance, security headers, error states, deploy |
| **Phase 2** | Email notifications, password reset by email, blog/case studies, analytics view, localisation |

## 13. Acceptance summary (launch checklist)

- [ ] Every FR above passes its acceptance criteria.
- [ ] No route, page or action can create an admin account from the public internet.
- [ ] Every public text, project and team member is editable from `/admin`.
- [ ] Light and dark themes verified on every page.
- [ ] Reduced-motion and keyboard paths verified.
- [ ] Lighthouse and axe targets met on Home, Work and Contact.
- [ ] `.env.example`, README, migrations and seed scripts work from a fresh clone.
- [ ] Legal pages and contact details reviewed by the team.

## 14. Open questions

1. Final team member display name and bio for dev.ideategudy.tech.
2. Contact email, phone/WhatsApp and social links.
3. Hosting provider and domain for the agency site.
4. Image storage provider for uploads.
5. Which projects are public and approved for display.
6. Whether a blog or case-study section is wanted in Phase 2.
