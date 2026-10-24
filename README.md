# Sonder Labz — Agency Website & Admin Dashboard

Website and content management dashboard for **Sonder Labz**, a software development agency that designs and builds **web, mobile, and desktop applications**.

- **Lead Developer**: [dev.ideategudy.tech](https://dev.ideategudy.tech)
- **Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Drizzle ORM, PostgreSQL (Neon), Lenis, Motion.

---

## Features

1. **Brand & Design System**:
   - Custom geometric "S" logo suite in `public/brand/` (`logo-mark.svg`, `logo-mark-dark.svg`, `logo.svg`, `icon.svg`).
   - "Orbit" color palette tokens (`ink`, `fog`, `iris`, `lume`, `slate`, `line`).
   - Shared `GlassCard` primitive with static ambient backdrop spots.
   - Typography pairing: **Bricolage Grotesque** (display headings) and **Onest** (body & UI).
   - Theme toggle (System / Light / Dark) with no hydration flash.
   - Smooth scrolling via Lenis with custom slim scrollbar and reduced-motion fallback.

2. **Public Pages**:
   - `/` — Hero with interactive **Device Trio** (Web, Mobile, Desktop frames), What We Build rows, Featured Work, Process sequence, Team preview, and CTA.
   - `/services` — Detailed breakdown for Web, Mobile, and Desktop applications with deliverables and typical engineering stacks.
   - `/work` — Filterable portfolio showcase by platform (`web`, `mobile`, `desktop`).
   - `/work/[slug]` — Deep-dive case studies with architectural details, roles, tech tags, and links.
   - `/about` — Agency origin, guiding principles, and team list led by `dev.ideategudy.tech`.
   - `/contact` — Accessible inquiry form with Zod validation, honeypot anti-spam, and rate-limiting.
   - `/privacy` & `/terms` — Editable legal pages.
   - `/styleguide` — Dev-only component playground.

3. **Login-Only Admin Dashboard (`/admin`)**:
   - **No public registration route or action exists.**
   - Password hashing with **Argon2id** and dummy hash constant-time verification.
   - Token-based revocable session stored in an `httpOnly`, `secure`, `sameSite=lax` cookie.
   - Double-barrier security: optimistic `proxy.ts` gating plus `requireAdmin()` session enforcement in every layout, page, and Server Action.
   - Real-time content editor for all copy blocks with live preview links.
   - Manage projects, team members, contact submissions inbox, and system parameters.

---

## Setup & Running Locally

### 1. Prerequisites
- Node.js 20+
- `pnpm` (v12.x or v10.x+)

### 2. Environment Variables
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Configure your PostgreSQL database connection:
```env
DATABASE_URL="postgresql://user:password@endpoint.neon.tech/sonderlabz?sslmode=require"
ADMIN_EMAIL="admin@sonderlabz.com"
ADMIN_PASSWORD="YourSecurePasswordHere"
ADMIN_NAME="Dev Ideategudy"
```

### 3. Database Schema & Admin Seed
Push tables to your database and seed initial content and the first admin user:

```bash
# Push tables via Drizzle
pnpm db:push

# Seed default content blocks, 3 services, team member, and first admin
pnpm seed:admin
```

### 4. Admin Management CLI
Add additional admins or reset passwords securely from the terminal:

```bash
# Create an additional admin user
pnpm admin:create

# Reset an admin password
pnpm admin:reset
```

### 5. Start Development Server
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public site, [http://localhost:3000/styleguide](http://localhost:3000/styleguide) for the component styleguide, or [http://localhost:3000/admin](http://localhost:3000/admin) to log in.

### 6. Production Build
```bash
pnpm build
pnpm start
```
