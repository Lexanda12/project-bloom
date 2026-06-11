# CLAUDE.md — Project Bloom
## Agent Briefing Document
**Read this file completely before touching any file in this project.**
**Every decision you make is evaluated against the standards defined here.**

---

## 1. What This Is

**Project Bloom** is a mobile-first progressive web app that guides Nigerian women aged 25–60 from breast health awareness to confirmed clinic attendance. It is built by Clarit Studio (clarit.studio) for Eniola Alex as both a social impact initiative and a portfolio demonstration of healthcare product design and engineering.

**The one-sentence mission:**
> Close the gap between breast health intention and screening action for Nigerian women by building navigational confidence — the belief that she can move through an unfamiliar system and come out intact, regardless of what she finds.

**The keystone insight that drives every product decision:**
Nigerian women with full awareness, accessible logistics, and social permission still don't go for screening. The gap between intention and action is almost always a confidence problem — specifically navigational confidence. This product exists to close that gap. Everything else is secondary.

**Who this is built for:**
- **Primary — Adaeze:** 34 years old, peri-urban (Ibadan, Enugu, Oshogbo), secondary school to some university, WhatsApp-native, data-conscious, rations airtime, has thought about screening, has not gone
- **Secondary — Ngozi:** 52 years old, lower literacy, entry-level Android, may share the link via WhatsApp to a friend

**The Grandmother Test (non-negotiable standard):**
> If a 55-year-old woman in Ibadan with a primary school education opens this on her phone and cannot immediately understand what to do next — the design has failed.

Every screen, every component, every copy decision is evaluated against this standard before it passes review.

---

## 2. Project Status

| Phase | Status |
|---|---|
| Phase 0 — Office Hours | ✅ Complete |
| Phase 1 — Discovery | ✅ Complete |
| Phase 2 — Design | ✅ Complete — DESIGN.md locked |
| Phase 3 — PRD | 🔄 In progress |
| Phase 4 — Prompt Packs | ⏳ Pending |
| Phase 5 — Build | ⏳ Pending |

---

## 3. V1 Scope — What Is In and What Is Out

This is a pilot. Three screens. One complete journey. Nothing outside this list gets built in V1.

### ✅ V1 IN SCOPE

| Route | Description |
|---|---|
| `/` | Landing page — named fear, relational trust, single CTA |
| `/expect` | What to expect — step-by-step screening walkthrough, static content |
| `/facilities` | Find a facility — state-filtered list, Roche pathway connected |
| `/referral/[id]` | Referral summary — saveable offline, shareable via WhatsApp |
| `/about` | What Project Bloom is, who supports it, clinical governance statement |
| WhatsApp loop | Two-message follow-up: 24hr nudge + 7-day attendance self-report |

### ❌ V2 — DO NOT BUILD IN V1

```
/learn         Awareness and education module
/assess        Guided self-assessment (three clinical pathways)
/act           Personalized action plan and motivation layer
/dashboard     Impact measurement dashboard (admin)
/admin         Content management and governance tooling
Pidgin English localization
Push notifications
User accounts and authentication
Social sharing features beyond WhatsApp
```

**If a task requires building anything on the V2 list — stop. Flag it. Do not proceed.**
The pilot proves the core mechanism works. V2 is built on proven ground.

---

## 4. Tech Stack

### Frontend
```
Framework:     Next.js 14+ (App Router)
Language:      TypeScript (strict mode — no any, no ts-ignore without comment)
Styling:       Tailwind CSS v3 + CSS custom properties from DESIGN.md
Components:    Custom only — no shadcn, no headlessui, no third-party component libraries
               (Every component must pass the Grandmother Test and be built to spec)
PWA:           next-pwa or custom service worker
Fonts:         DM Serif Display + Inter (Google Fonts, self-hosted for offline)
```

### Backend / Database
```
Platform:      Supabase
Database:      PostgreSQL via Supabase
Auth:          Anonymous sessions only for V1 — no user accounts
Storage:       Supabase Storage (referral summary image export)
Realtime:      Not used in V1
```

### Integrations
```
WhatsApp/SMS:  Africa's Talking (primary — Nigerian market optimized)
               Twilio (fallback)
Maps/Location: No maps in V1 — state-filtered static directory only
               Google Maps API deferred to V2
PDF/Image:     Web Share API + canvas-to-image fallback for referral save
```

### Hosting
```
Frontend:      Vercel
Environment:   .env.local (development), Vercel environment variables (production)
Domain:        TBD — managed by Clarit Studio
```

### Key Libraries
```
Database ORM:       Supabase JS client (@supabase/supabase-js)
WhatsApp:           Africa's Talking Node.js SDK
Offline/PWA:        Workbox (via next-pwa) or custom service worker
Referral image:     html2canvas (referral summary → saveable image)
Analytics:          Custom — no third-party analytics in V1 (privacy requirement)
```

---

## 5. File and Folder Structure

```
project-bloom/
├── CLAUDE.md                    ← You are here
├── DESIGN.md                    ← Visual language authority document
├── .env.local                   ← Never commit. Never read aloud.
├── .env.example                 ← Committed. All keys present, no values.
│
├── app/                         ← Next.js App Router
│   ├── layout.tsx               ← Root layout — fonts, metadata, PWA manifest link
│   ├── page.tsx                 ← / landing
│   ├── expect/
│   │   └── page.tsx             ← /expect
│   ├── facilities/
│   │   └── page.tsx             ← /facilities
│   ├── referral/
│   │   └── [id]/
│   │       └── page.tsx         ← /referral/[id]
│   ├── about/
│   │   └── page.tsx             ← /about
│   └── api/
│       ├── referral/
│       │   └── route.ts         ← POST /api/referral — create referral record
│       ├── journey/
│       │   └── route.ts         ← POST /api/journey — log stage progression
│       └── whatsapp/
│           └── route.ts         ← POST /api/whatsapp — trigger follow-up messages
│
├── components/
│   ├── ui/
│   │   ├── PrimaryCTA.tsx       ← The most important component. One per screen.
│   │   ├── StepCard.tsx         ← Used in /expect
│   │   ├── FacilityCard.tsx     ← Used in /facilities
│   │   ├── ReferralCard.tsx     ← Used in /referral/[id]
│   │   ├── JourneyThread.tsx    ← Signature navigation element
│   │   ├── WhatsAppCTA.tsx      ← WhatsApp green button — brand recognition
│   │   └── ProgressiveImage.tsx ← Image with offline fallback
│   └── layout/
│       ├── TopNav.tsx
│       └── PageWrapper.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts            ← Browser client
│   │   └── server.ts            ← Server client (API routes)
│   ├── whatsapp/
│   │   └── africastalking.ts    ← Africa's Talking wrapper
│   ├── journey/
│   │   └── tracker.ts           ← Stage progression logic
│   ├── referral/
│   │   └── generator.ts         ← Referral ID generation and summary assembly
│   └── offline/
│       └── storage.ts           ← localStorage journey state helpers
│
├── hooks/
│   ├── useJourneyState.ts       ← Read/write journey progress from localStorage
│   ├── useFacilities.ts         ← State-filtered facility list
│   └── useReferral.ts           ← Referral generation and save
│
├── data/
│   └── facilities.ts            ← Static facility directory — seeded from Supabase
│                                   Cached on build. Fallback for offline.
│
├── styles/
│   └── globals.css              ← Tailwind directives + CSS custom properties
│
├── public/
│   ├── manifest.json            ← PWA manifest
│   ├── sw.js                    ← Service worker (generated or custom)
│   ├── fonts/                   ← Self-hosted DM Serif Display + Inter
│   └── icons/                   ← PWA icons, favicon
│
├── types/
│   ├── journey.ts               ← Journey stage types
│   ├── facility.ts              ← Facility data types
│   └── referral.ts              ← Referral record types
│
└── supabase/
    ├── schema.sql               ← Full database schema
    └── seed.sql                 ← Facility directory seed data
```

---

## 6. Database Schema

### `journey_sessions`
Tracks anonymous user progress through the five-stage funnel. No PII stored.

```sql
CREATE TABLE journey_sessions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    TEXT NOT NULL UNIQUE,     -- anonymous, generated client-side
  stage         TEXT NOT NULL,            -- 'reached' | 'assessed' | 'referred' | 'booked' | 'attended'
  state_code    TEXT,                     -- Nigerian state (e.g. 'OY', 'LA', 'KN')
  lga           TEXT,                     -- Local government area if available
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);
```

### `referrals`
One record per referral summary generated.

```sql
CREATE TABLE referrals (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id      TEXT NOT NULL,          -- FK to journey_sessions.session_id
  facility_id     TEXT NOT NULL,          -- FK to facilities.id
  generated_at    TIMESTAMPTZ DEFAULT now(),
  whatsapp_sent   BOOLEAN DEFAULT false,
  nudge_sent_at   TIMESTAMPTZ,            -- 24hr follow-up sent timestamp
  checkin_sent_at TIMESTAMPTZ,            -- 7-day check-in sent timestamp
  attended        BOOLEAN,                -- null = no response, true = YES, false = NO
  attended_at     TIMESTAMPTZ,
  phone_hash      TEXT                    -- SHA-256 hash of phone number — never plaintext
);
```

### `facilities`
Static directory. Seeded from Supabase. Cached at build time.

```sql
CREATE TABLE facilities (
  id            TEXT PRIMARY KEY,         -- e.g. 'UCH-IBD-001'
  name          TEXT NOT NULL,
  state_code    TEXT NOT NULL,            -- 'OY', 'LA', 'KN', 'EN', etc.
  lga           TEXT,
  address       TEXT NOT NULL,
  phone         TEXT NOT NULL,
  opening_hours TEXT,
  roche_pathway BOOLEAN DEFAULT false,
  pathway_notes TEXT,
  active        BOOLEAN DEFAULT true,
  updated_at    TIMESTAMPTZ DEFAULT now()
);
```

### `content_versions`
Tracks clinical content versioning. Ensures stale cached content can be invalidated.

```sql
CREATE TABLE content_versions (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_key   TEXT NOT NULL UNIQUE,     -- e.g. 'expect-steps', 'facility-what-to-say'
  version       INTEGER NOT NULL DEFAULT 1,
  updated_at    TIMESTAMPTZ DEFAULT now(),
  updated_by    TEXT                      -- governance lead identifier
);
```

---

## 7. Journey Stage Definitions

These five stages are the spine of the impact measurement framework. Every analytics event maps to one of them.

```typescript
type JourneyStage =
  | 'reached'    // Opened app + completed awareness (landing page engaged)
  | 'assessed'   // Completed self-assessment — V2 only
  | 'referred'   // Generated referral summary with facility selection
  | 'booked'     // Confirmed appointment (self-reported or assisted)
  | 'attended'   // Confirmed clinic attendance (self-reported via WhatsApp)
```

**V1 active stages:** `reached` → `referred` → `attended`
`assessed` and `booked` are logged as no-ops in V1, populated in V2.

**Stage progression rules:**
- Stages are append-only. You cannot go backwards.
- Each stage transition is logged to `journey_sessions` AND to localStorage simultaneously.
- If Supabase write fails, localStorage write still succeeds. Sync on reconnection.
- Never block the user on a failed stage write. Silent failure + queue.

---

## 8. Offline Architecture

**Strategy:** Progressive offline — core content cached, journey state preserved.

### What is cached on first load (cache-first)
```
/ landing page
/expect — full step content (static)
/about
All fonts (self-hosted)
All static assets (icons, manifest)
Facility data for selected state (written to cache after state selection)
```

### What uses network-first with local fallback
```
/facilities — live facility list (fallback: cached state data)
/referral/[id] — generated at referral creation, then cached immediately
```

### What is online-only (acceptable)
```
WhatsApp follow-up triggers
Supabase stage progression writes (queued offline, sync on reconnect)
Full facility directory (all states)
```

### localStorage keys and schema

```typescript
// Journey state — written on every meaningful interaction, not just on submit
const STORAGE_KEYS = {
  SESSION_ID:       'bloom_session_id',      // UUID — generated on first visit
  CURRENT_STAGE:    'bloom_stage',           // JourneyStage
  SELECTED_STATE:   'bloom_state',           // e.g. 'OY'
  SELECTED_FACILITY:'bloom_facility_id',     // facility ID
  REFERRAL_ID:      'bloom_referral_id',     // UUID from referrals table
  REFERRAL_DATE:    'bloom_referral_date',   // ISO timestamp
  LAST_SCREEN:      'bloom_last_screen',     // e.g. '/expect'
  PENDING_SYNC:     'bloom_pending_sync',    // JSON array of queued stage events
}
```

**Re-entry experience (non-negotiable):**
On every page load, check `bloom_last_screen` and `bloom_stage`. If a journey is in progress, surface a re-entry prompt:
> *"Welcome back. You were in the middle of finding a clinic."*

Never say "Start over." Never lose progress.

### Service Worker Behavior

```
Cache name:         bloom-v1
Cache strategy:     StaleWhileRevalidate for content, CacheFirst for assets
Content version:    Check content_versions table on reconnect
                    If version mismatch → invalidate content cache → re-fetch
                    User never sees stale clinical content after a cache refresh
Offline fallback:   /offline.html — warm, on-brand, explains what's available offline
```

---

## 9. WhatsApp Follow-up Architecture

Two messages. Two triggers. One job: close the loop between referral generated and attendance confirmed.

### Message 1 — 24-Hour Nudge
```
Trigger:   24 hours after referral.generated_at
Condition: referral.attended IS NULL
Tone:      Companion checking in — not pressure

Copy:
"Hi. You saved a screening location yesterday.
Did you get a chance to call them?

Here's the number again if you need it: {facility.phone}

You've already done the hard part — you know what to expect. 💛"
```

### Message 2 — 7-Day Attendance Check
```
Trigger:   7 days after referral.generated_at
           (or 3 days after indicated appointment date if captured)
Condition: referral.attended IS NULL
Tone:      Warm, no judgment, one-tap response

Copy:
"How did it go? We're thinking of you. 🌸

Reply YES if you went, or NO if something came up — no judgment either way."

On YES reply:
  → Set referral.attended = true, referral.attended_at = now()
  → Reply: "That's wonderful. You did something important for yourself today. 🌸"
  → Log stage 'attended' to journey_sessions

On NO reply:
  → Set referral.attended = false
  → Reply: "That's okay. Whenever you're ready, we're here.
            Your clinic information is still saved for you."
  → Do NOT send further follow-up messages
  → Do NOT mark journey as failed — she may return
```

### WhatsApp Implementation Rules
```
Provider:      Africa's Talking (primary)
Phone storage: SHA-256 hash only — never plaintext in database
Opt-in:        Phone number collected only at referral generation
               Explicit consent copy: "We'll send you one reminder on WhatsApp"
               Consent checkbox — pre-unchecked — required before phone collection
Rate limit:    Maximum 2 messages per referral. Hard cap. No exceptions.
Escalation:    If Africa's Talking fails → Twilio fallback → log failure, do not retry
```

---

## 10. API Routes

### `POST /api/referral`
Create a referral record when a user selects a facility.

```typescript
// Request
{
  session_id:   string   // from localStorage
  facility_id:  string
  phone_hash?:  string   // optional — only if user opted in to WhatsApp
  state_code:   string
}

// Response
{
  referral_id:  string   // UUID — used in /referral/[id]
  facility:     Facility
}
```

### `POST /api/journey`
Log a stage progression event.

```typescript
// Request
{
  session_id:  string
  stage:       JourneyStage
  state_code?: string
  lga?:        string
}

// Response
{ success: boolean }
// Never returns error to client — silent failure by design
```

### `POST /api/whatsapp`
Internal route — called by scheduled job, not by client.

```typescript
// Request (internal only — validate with CRON_SECRET header)
{
  type:        'nudge' | 'checkin'
  referral_id: string
}

// Response
{ sent: boolean, provider: 'africastalking' | 'twilio' | 'failed' }
```

---

## 11. Design System — Implementation Rules

**Full specification in DESIGN.md. This section is implementation enforcement only.**

### CSS Custom Properties
All design tokens are defined in `styles/globals.css` as CSS custom properties.
Never hardcode a color hex in a component. Always use `var(--bloom-*)`.

```css
/* Required in globals.css — copy exactly from DESIGN.md */
:root {
  --bloom-bg: #faf8f5;
  --bloom-surface: #f2ede6;
  --bloom-surface-deep: #e8e0d5;
  --bloom-primary: #8b2d3a;
  --bloom-primary-light: #b84d5c;
  --bloom-primary-faint: #f5e8ea;
  --bloom-gold: #c4923a;
  --bloom-gold-faint: #fdf3e3;
  --bloom-text: #1a1208;
  --bloom-text-secondary: #5c4d3a;
  --bloom-text-muted: #9a8a76;
  --bloom-white: #ffffff;
  --bloom-success: #2d6a4f;
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --cta-height: 56px;
  --tap-target-min: 48px;
  --page-margin: 20px;
}
```

### The One-Action Rule
```
Every screen has ONE primary action.
One <button> with primary styling per screen.
No exceptions. No "but it's a small secondary action."
If two actions are needed → redesign as two screens.
Secondary paths → text link, centered, below primary CTA, minimum 24px gap.
```

### Component Constraints

**PrimaryCTA.tsx**
```typescript
// Props: label, onClick, icon? (trailing only)
// Height: var(--cta-height) = 56px
// Width: 100% always — never fixed width on mobile
// One instance per screen — enforced by design, not by code
// Label is the action verb: "See what to expect" not "Next" not "Continue"
```

**JourneyThread.tsx**
```typescript
// Props: stages: Stage[], currentStage: Stage
// Renders as vertical gold line with milestone dots
// Completed: filled gold circle
// Active: filled primary circle
// Upcoming: open circle, muted border
// Position: left margin, never competing with content
// Visible on /expect, /facilities, /referral/[id]
// Not visible on / or /about
```

**StepCard.tsx**
```typescript
// Props: stepNumber, title, body, isActive?
// Left border: 3px solid var(--bloom-primary)
// Step number: var(--bloom-gold), Inter 500, 13px, uppercase
// Title: Inter 600, 17px
// Body: Inter 400, 15px, line-height 1.7
// Maximum body copy: 4 sentences. If more is needed — split into two cards.
```

### Typography Enforcement
```
Display headlines:  font-family: var(--font-display)
Everything else:    font-family: var(--font-body)
Minimum body size:  15px (tailwind: text-[15px] or text-base)
Minimum caption:    12px — captions only
Never: text-xs (12px) for anything a user needs to read and act on
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
// Extend theme with bloom tokens
// Do NOT use arbitrary Tailwind values for colors — use CSS variables
// Correct:   className="bg-[var(--bloom-surface)]"
// Correct:   className="text-[var(--bloom-text)]"
// Wrong:     className="bg-[#f2ede6]"    ← hardcoded hex, breaks token system
```

---

## 12. Content Rules

These rules apply to every string the user reads. If a content decision isn't covered here, default to DESIGN.md content principles.

```
Never lead with fear.              Lead with agency.
Never use clinical jargon.         Use plain language always.
Never say "cancer" in a CTA.       Say "screening" or "check-up."
Never say "you should."            Say "you can" or "you're ready."
Never say "risk."                  Say "what to watch for" or "what to know."
Never use passive voice.           "The nurse will examine" not "You will be examined."
Reading level target:              Flesch-Kincaid Grade 6 for body copy.
CTA labels:                        Action verb + object. "Find a clinic" not "Next."
Error messages:                    Warm, not technical. "Something went wrong — try again"
                                   not "500 Internal Server Error."
Empty states:                      Never show a blank screen. Always show a warm fallback.
```

### Pathway Copy (Assessment — V2, but spec now)
```
Pathway 1 (Routine):   Never "everything is fine." → "Routine screening is recommended."
Pathway 2 (Prompt):    "It's a good idea to see someone in the next two weeks."
Pathway 3 (Urgent):    Direct phone number. Human on the other side. No chatbot.
                       Pathway 3 does not go live until human escalation exists.
```

---

## 13. Privacy and Data Rules

```
No PII stored without explicit opt-in.
Session IDs are UUIDs — generated client-side, not linked to identity.
Phone numbers:  SHA-256 hashed before storage. Plaintext never touches the database.
Analytics:      Custom only. No Google Analytics. No Mixpanel. No third-party trackers.
Consent:        WhatsApp opt-in checkbox — pre-unchecked. Required. Cannot be skipped.
Data retention: journey_sessions and referrals retain for 12 months then anonymized.
NDPR compliance: Nigeria Data Protection Regulation — data minimization principle applied.
```

---

## 14. Performance Requirements

```
Core Web Vitals targets (mobile, 4G):
  LCP:  < 2.5s
  FID:  < 100ms
  CLS:  < 0.1

Additional targets:
  First load JS bundle:  < 120kb gzipped
  Time to interactive:   < 3s on 3G (peri-urban median connection)
  Offline load:          < 1s for cached content
  Image optimization:    Next.js Image component always. No raw <img> tags.
  Fonts:                 Self-hosted. Preloaded. font-display: swap.
```

---

## 15. Error Handling Patterns

```typescript
// API routes — never expose internal errors to client
try {
  // operation
} catch (error) {
  console.error('[bloom-api]', error)  // server log only
  return Response.json({ success: false }, { status: 200 })
  // Always 200 to client — failure is silent, journey continues
}

// Stage progression — never block user on tracking failure
async function logStage(stage: JourneyStage) {
  try {
    await supabase.from('journey_sessions').upsert(...)
  } catch {
    queueForSync(stage)  // localStorage queue — sync on reconnect
    // User never knows this failed
  }
}

// WhatsApp — failure is logged, not surfaced
// If Africa's Talking fails → try Twilio → if Twilio fails → log, move on
// A failed WhatsApp message is not a failed user journey
```

---

## 16. Security Rules

```
Environment variables:   All secrets in .env.local — never in code, never in comments
API routes:              CRON_SECRET header required for /api/whatsapp
                         Validate on every request — reject without it
Supabase RLS:            Row Level Security enabled on all tables
                         journey_sessions: insert-only from anon key
                         referrals: insert from anon, update only attended field
                         facilities: read-only from anon key
                         content_versions: read-only from anon key
Input validation:        Zod schemas on all API route inputs
SQL injection:           Supabase JS client parameterized queries — never raw SQL in routes
Phone numbers:           Hash with SHA-256 before any database operation
                         const hash = crypto.createHash('sha256').update(phone).digest('hex')
HTTPS:                   Enforced by Vercel — no HTTP allowed
CSP headers:             Set in next.config.js
```

---

## 17. Testing Standards

```
Unit tests:        Vitest — lib/ functions, hooks, utility logic
Component tests:   React Testing Library — all UI components
E2E tests:         Playwright — complete user journey (land → expect → facility → referral)
Accessibility:     axe-core integrated in component tests
Lighthouse CI:     Run on every PR — fail if performance score < 90 on mobile

Test coverage requirements:
  lib/journey/tracker.ts:    100% — this is the impact measurement spine
  lib/whatsapp/:             100% — message logic must be verified
  lib/offline/storage.ts:   100% — journey state must never be lost
  components/ui/:            80% minimum
```

---

## 18. Git and Deployment

```
Branch strategy:
  main          Production — auto-deploys to Vercel
  staging       Staging — preview deploys on Vercel
  feature/*     Feature branches — PR required to merge to staging

Commit format:
  feat(scope):  new feature
  fix(scope):   bug fix
  content:      copy or clinical content changes
  design:       visual/style changes — no logic
  chore:        tooling, dependencies

PR requirements:
  - Lighthouse CI passes (≥90 mobile performance)
  - No TypeScript errors
  - Tests pass
  - At least one screenshot of any UI change

Environment variables required:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY       ← server only, never NEXT_PUBLIC_
  AFRICASTALKING_API_KEY
  AFRICASTALKING_USERNAME
  TWILIO_ACCOUNT_SID              ← fallback
  TWILIO_AUTH_TOKEN               ← fallback
  TWILIO_WHATSAPP_NUMBER          ← fallback
  CRON_SECRET                     ← protects /api/whatsapp
```

---

## 19. The Product Values Statement

This is the ethical spine of the product. When a content, design, or engineering decision is unclear, read this and the answer will usually follow.

> *"We will never tell a woman what her body means.*
> *We will always tell her what to do next.*
> *And we will never send her toward urgent action without a human being ready to receive her on the other side."*

**What this means in practice:**
- The assessment never produces a verdict — only a recommended next action
- Every screen ends with a clear, achievable next step — never a dead end
- Pathway 3 (urgent escalation) does not go live until the human escalation infrastructure is confirmed and staffed
- Copy is reviewed by the clinical governance lead before any screen goes live
- The product speaks like a companion, not a system

---

## 20. People

| Role | Name | Responsibility |
|---|---|---|
| Product / Engineering | Eniola Alex | Overall product direction, all build decisions |
| Studio | Clarit Studio (clarit.studio) | Design and engineering |
| Clinical Governance Lead | TBC | Clinical content sign-off, pathway decisions |
| Clinical Partner | Roche Nigeria | Clinical pathway infrastructure, escalation line |

---

## 21. Quick Reference — Agent Checklist

Before completing any task, verify:

- [ ] Does this build only V1 in-scope features?
- [ ] Does every new screen have exactly one primary CTA?
- [ ] Are all color values using CSS custom properties (`var(--bloom-*)`) not hardcoded hex?
- [ ] Does the screen pass the Grandmother Test? (Can Ngozi identify next action in 5 seconds?)
- [ ] Is journey state written to localStorage on every meaningful interaction?
- [ ] Does the screen function with cached content if there is no network?
- [ ] Is any PII being stored without explicit opt-in? (It shouldn't be)
- [ ] Does any copy lead with fear, use "should," or use clinical jargon?
- [ ] Are all tap targets ≥48px?
- [ ] Is the JourneyThread component present on /expect, /facilities, and /referral/[id]?

If any answer is wrong — fix it before marking the task complete.

---

*CLAUDE.md v1.0 — Project Bloom — Clarit Studio*
*This document is the ground truth for every agent session on this project.*
*When in doubt, re-read Section 19.*