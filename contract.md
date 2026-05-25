# ContractHub — Product Requirements Document

**Version:** 1.0  
**Date:** May 2026  
**Status:** Ready for Development  
**Color System:** White `#FFFFFF` · Dark Blue `#0D1B2A` · Accent Blue `#1B4FD8`

---

## 1. Vision & Positioning

### 1.1 One-line pitch

The contract template library built for freelancers and small teams — not enterprise legal departments.

### 1.2 Competitive landscape (researched May 2026)

| Competitor | Model | Fatal weakness |
|---|---|---|
| **PandaDoc** | $19–$49/user/month | Essentials caps you at 5 templates; Business plan costs a 10-person team $490/month; API charges $5/doc |
| **DocuSign CLM** | Enterprise, custom pricing | 2–3 month implementation, envelope limits, built for 50+ person legal teams |
| **LegalZoom** | Freemium → upsell | Most useful templates paywalled; pushes users into subscription legal plans |
| **Docracy** | Community / open-source | Anyone can upload — quality wildly inconsistent, some templates legally outdated |
| **Legitt AI** | Free + AI tier | 500+ templates but account required before you can see anything; heavy onboarding friction |
| **Ironclad / ContractWorks / Gatekeeper** | Enterprise CLM | Wrong product entirely for solo and small-team users |

### 1.3 The gap

Every tool in this market is either (a) too cheap and low-quality, (b) too expensive and enterprise-bloated, or (c) a free-to-browse site that forces account creation before showing you anything useful. No one owns the middle ground: **a curated, niche-organized, lawyer-reviewed template library that works on any device, lets you fill and download without an account, and charges a fair flat monthly rate that doesn't compound per seat**.

### 1.4 Our answer

ContractHub is a micro SaaS offering 200+ professionally drafted contract templates organized by profession and use case. Users browse, preview, fill smart fields, and download a ready-to-sign PDF or DOCX in under two minutes — no account, no per-seat fee, no enterprise sales call. The paid tier adds AI clause customization, e-signature, and team template management at a flat rate.

### 1.5 Design philosophy

- **White and dark blue only.** Background `#FFFFFF`, surfaces `#F5F7FA`, primary text `#0D1B2A`, secondary text `#4A5E78`, accent `#1B4FD8`, accent hover `#1540B8`, accent tint `#EBF0FD`.
- **Minimalistic, document-first.** The UI should feel like a premium legal tool — clean, trustworthy, professional. No gradients, no illustrations, no decorative elements.
- **Instant value.** A user who lands on a template page should be able to read the full template, understand what it covers, and start filling fields before they even consider signing up.

---

## 2. Target Users

| Segment | Core pain | Template categories they need |
|---|---|---|
| Freelancer / independent contractor | Sending contracts that look professional and hold up | NDA, service agreement, SOW, invoice terms |
| Consultant / coach | Needs engagement letters and IP ownership clarity | Consulting agreement, coaching contract, retainer |
| Real estate agent | Regulatory compliance + speed | Buyer/seller rep, referral, listing agreement |
| Small agency (2–10 people) | Brand consistency across all client contracts | MSA, SOW, project change order |
| Startup founder | Covering all the early-stage legal basics cheaply | Co-founder agreement, advisor agreement, SAFE note |
| HR at SMB | Onboarding docs without a legal team | Employment contract, NDA, offer letter |
| Landlord / property manager | Lease agreements that are jurisdiction-aware | Residential lease, commercial lease, sublease |
| Healthcare private practice | HIPAA-compliant patient agreements | Patient consent, BAA, independent contractor (clinical) |
| Creator / influencer | Brand deal protection | Sponsorship agreement, content licensing, UGC contract |

---

## 3. Feature Scope

### 3.1 Phase 1 — Core MVP (weeks 1–6)

#### 3.1.1 Template library — browse & preview without account

- Landing page and category pages render with full template text visible — no blur, no "sign up to see"
- Search bar: full-text search across template names, descriptions, and clause tags
- Filter sidebar: by category, industry, document type, jurisdiction (US / UK / CA / AU), page count
- Each template page includes:
  - Template title, description, "what's covered" bullet list
  - Estimated fill time (e.g. "~4 minutes")
  - Jurisdiction badge (which states/countries it is appropriate for)
  - "Last reviewed by attorney" date
  - Full readable preview (HTML render of the template)
  - "Fill this template" CTA — no account required

#### 3.1.2 Smart field editor (no account required)

- Variable fields displayed as highlighted inline inputs inside the rendered template
- Fields: party names · dates · dollar amounts · jurisdiction · notice addresses · payment terms · scope descriptions
- Conditional sections: checkboxes toggle optional clauses (e.g. "Include non-compete?" → clause appears/disappears inline)
- Auto-formatting: currency fields format to `$X,XXX.XX`, dates format to long form
- Real-time preview updates as user fills fields
- All field values stored in browser `sessionStorage` only — cleared on tab close
- Mobile-friendly: field inputs stack below the document preview on small screens

#### 3.1.3 Download — no account required

- **Download PDF** — generates a filled, print-ready PDF with correct fonts, margins, page numbers, and footer ("Generated by ContractHub — not legal advice")
- **Download DOCX** — generates an editable Word document, fields filled, styling preserved
- Downloads are rate-limited: 3 free downloads per IP per 24 hours (enforced server-side via Redis)
- After 3 downloads: soft prompt to create a free account for unlimited downloads — never a hard block

#### 3.1.4 Template categories — 200 at launch

**Freelance & Services (30 templates)**
- General freelance contract · Web design agreement · Graphic design contract · Photography contract · Videography agreement · Copywriting contract · SEO services agreement · Social media management contract · App development contract · IT services agreement · Virtual assistant contract · Translation services agreement · Music production contract · Podcast production agreement · Event planning contract · Catering agreement · Interior design contract · Architecture services agreement · Bookkeeping services contract · Accounting services agreement · PR agency agreement · Brand strategy contract · UX research contract · Data analysis agreement · Cybersecurity consulting contract · Cloud services agreement · E-commerce development contract · Mobile app design contract · Video editing agreement · Illustration contract

**Consulting & Coaching (20 templates)**
- General consulting agreement · Business consulting contract · Management consulting agreement · IT consulting contract · Marketing consulting agreement · Executive coaching contract · Life coaching agreement · Career coaching contract · Fitness coaching agreement · Nutrition coaching contract · Leadership coaching agreement · Sales coaching contract · Startup advisor agreement · Advisory board agreement · Fractional CMO agreement · Fractional CTO agreement · Fractional CFO agreement · Strategic retainer agreement · Project-based consulting contract · Board consulting agreement

**Non-Disclosure & Confidentiality (15 templates)**
- Mutual NDA · One-way NDA · Employee NDA · Contractor NDA · Investor NDA · Technical NDA · Sales NDA · Partnership NDA · Software development NDA · Healthcare NDA · Research NDA · Academic NDA · Vendor NDA · M&A NDA · Marketing agency NDA

**Employment & HR (25 templates)**
- Full-time employment contract · Part-time employment contract · Fixed-term employment contract · At-will employment agreement · Offer letter (US) · Offer letter (UK) · Remote work agreement · Independent contractor agreement · Internship agreement · Volunteer agreement · Non-compete agreement · Non-solicitation agreement · Employee IP assignment · Separation agreement · Severance agreement · Commission-based employment contract · Sales rep agreement · Staffing agency agreement · PEO services agreement · Executive employment agreement · Chief of Staff agreement · Board member agreement · Employee handbook acknowledgment · Performance improvement plan · Warning letter

**Real Estate (20 templates)**
- Residential lease agreement · Commercial lease agreement · Month-to-month lease · Sublease agreement · Roommate agreement · Lease renewal agreement · Buyer representation agreement · Seller representation agreement · Listing agreement (exclusive right to sell) · Buyer's agent agreement · Referral agreement (real estate) · Property management agreement · Vacation rental agreement · Short-term rental agreement (Airbnb-style) · Land lease agreement · Commercial sublease · Lease termination letter · Notice to vacate · Rent increase notice · Security deposit refund letter

**Startup & Equity (20 templates)**
- Co-founder agreement · Founders' agreement (3+ founders) · Advisor agreement (FAST template-inspired) · SAFE note (post-money, YC-style) · Convertible note · Stock option grant · Vesting agreement · Shareholder agreement · IP assignment agreement · Invention assignment agreement · Contractor IP agreement · Seed investment term sheet · Series A term sheet outline · Board consent template · Written consent in lieu of meeting · Non-disclosure (investor) · Angel investment agreement · Revenue share agreement · Joint venture agreement · Strategic partnership agreement

**Creator & Influencer (15 templates)**
- Sponsorship agreement · Brand ambassador agreement · Influencer marketing contract · Content licensing agreement · UGC (user-generated content) agreement · Music licensing agreement · Photography licensing agreement · Video licensing agreement · Podcast sponsorship agreement · Newsletter sponsorship contract · Affiliate agreement · Co-marketing agreement · Content collaboration agreement · Ghost-writing agreement · Book proposal agreement

**Healthcare (15 templates)**
- Independent contractor agreement (clinical) · Locum tenens agreement · Patient consent form · HIPAA business associate agreement (BAA) · Medical practice consulting agreement · Telemedicine consent form · Mental health therapy consent · Group practice associate agreement · Medical director agreement · Clinical trial participant agreement · Home health aide contract · Physical therapy services agreement · Dental practice associate agreement · Veterinary associate agreement · Medical records release form

**Vendor & Procurement (20 templates)**
- Master service agreement (MSA) · Statement of work (SOW) · Change order template · Software license agreement · SaaS subscription agreement · Maintenance and support agreement · Service level agreement (SLA) · Data processing agreement (DPA/GDPR) · Reseller agreement · Distribution agreement · Supply agreement · Manufacturing agreement · White-label agreement · Procurement contract · Vendor onboarding agreement · Escrow agreement · Payment terms addendum · Late payment policy · Terms of service (B2B SaaS) · Privacy policy template

**Miscellaneous Legal (20 templates)**
- General partnership agreement · Limited partnership agreement · LLC operating agreement (single member) · LLC operating agreement (multi-member) · Hold harmless / indemnification agreement · Release of liability · Settlement agreement · Letter of intent (LOI) · Memorandum of understanding (MOU) · Loan agreement · Promissory note · Personal guarantee · Power of attorney (general) · Power of attorney (limited) · Last will and testament (simple) · Living will / advance directive · Trademark license agreement · Copyright assignment · Website terms and conditions · Cookie policy

---

### 3.2 Phase 2 — Growth (weeks 7–12)

#### 3.2.1 Free accounts — saved templates & fillable drafts

- Sign up with Google or email (magic link, no passwords)
- Unlimited downloads on free account
- Save up to 10 filled drafts (auto-saved to account, accessible across devices)
- Draft versioning: last 5 saves per draft
- Shareable draft link: `contracthub.io/draft/[slug]` — send to counterparty for review before signing
- Bookmark templates: save favorites to a personal library

#### 3.2.2 AI clause customization (Pro feature)

- "Customize with AI" button appears below each template section
- User describes their situation: "I want the payment terms to say net-30 with a 5% late fee after 15 days"
- Claude API generates the updated clause in the correct legal style, inserted inline
- User can accept, regenerate, or revert to original
- AI also offers: "Flag risky clauses" — scans the template and highlights clauses that commonly cause disputes, with plain-English explanations of the risk
- "Explain this clause" — click any clause to get a plain-English summary (no legalese)

#### 3.2.3 E-signature (Pro feature)

- Send filled contract to counterparty via email for signature
- Counterparty signs in-browser — no account required on their end
- Sequential or parallel signing order
- Audit trail: timestamp, IP address, email, and document hash recorded per signature
- Signed PDF auto-generated and emailed to all parties
- Signature status dashboard: pending / viewed / signed / declined
- Reminders: auto-send reminder email after 48 hours if not signed

#### 3.2.4 Team workspace (Team plan)

- Admin creates workspace, invites members by email
- Shared template library: admin uploads custom company-specific templates (e.g. bespoke MSA)
- Lock clauses: admin can lock specific sections (e.g. liability cap, governing law) so members can't change them
- Brand kit: company name, logo, and color applied to all downloaded contracts
- Centralized contract repository: all signed contracts stored and searchable
- Role-based access: Admin · Legal approver · Member · View-only

---

### 3.3 Phase 3 — Monetization (weeks 13–20)

#### 3.3.1 Pricing tiers

| Feature | Free (no account) | Free (account) | Pro ($12/mo flat) | Team ($29/mo flat, up to 15 members) |
|---|---|---|---|---|
| Browse all 200+ templates | ✓ | ✓ | ✓ | ✓ |
| Fill smart fields | ✓ | ✓ | ✓ | ✓ |
| Downloads (PDF + DOCX) | 3/day | Unlimited | Unlimited | Unlimited |
| Saved drafts | — | 10 | Unlimited | Unlimited |
| Draft history | — | Last 5 | Unlimited | Unlimited |
| AI clause customization | — | — | Unlimited | Unlimited |
| AI risk flagging | — | — | ✓ | ✓ |
| "Explain this clause" | — | — | ✓ | ✓ |
| E-signature | — | — | Unlimited sends | Unlimited sends |
| Team workspace | — | — | — | ✓ |
| Custom company templates | — | — | — | ✓ (up to 50) |
| Locked clauses | — | — | — | ✓ |
| Contract repository | — | — | — | ✓ |
| Brand kit on downloads | — | — | Logo + name | Logo + full branding |
| Remove ContractHub footer | — | — | ✓ | ✓ |
| Priority support | — | — | Email | Chat + email |

**Key pricing advantage over PandaDoc:**
- PandaDoc Business: $490/month for 10 users
- ContractHub Team: $29/month flat for up to 15 members
- That is **16× cheaper** for the same team size — lead with this number on the pricing page

#### 3.3.2 Upgrade triggers (non-intrusive)

- 4th download attempt in a day → "Create a free account for unlimited downloads"
- Saving an 11th draft → "Upgrade to Pro for unlimited saved drafts"
- Clicking "Customize with AI" on free account → "Pro feature — upgrade for $12/month"
- Inviting a 16th team member → upgrade prompt
- No other upsell interruptions anywhere in the core flow

---

## 4. SEO Architecture

### 4.1 URL structure

```
contracthub.io/                                              → Homepage
contracthub.io/templates/                                    → Full library browse
contracthub.io/templates/[category]/                         → Category page
contracthub.io/templates/[category]/[slug]/                  → Individual template page (canonical)

Category examples:
contracthub.io/templates/freelance/
contracthub.io/templates/nda/
contracthub.io/templates/employment/
contracthub.io/templates/real-estate/
contracthub.io/templates/startup/
contracthub.io/templates/consulting/
contracthub.io/templates/healthcare/
contracthub.io/templates/creator/
contracthub.io/templates/vendor/

Template page examples:
contracthub.io/templates/freelance/web-design-contract/
contracthub.io/templates/nda/mutual-nda/
contracthub.io/templates/startup/co-founder-agreement/
contracthub.io/templates/real-estate/residential-lease-agreement/

Jurisdiction variants:
contracthub.io/templates/real-estate/residential-lease-agreement/california/
contracthub.io/templates/real-estate/residential-lease-agreement/texas/
contracthub.io/templates/real-estate/residential-lease-agreement/uk/

Blog / content hub:
contracthub.io/blog/
contracthub.io/blog/how-to-write-a-freelance-contract/
contracthub.io/blog/nda-vs-confidentiality-agreement/
contracthub.io/blog/independent-contractor-vs-employee/

Guides:
contracthub.io/guides/contract-basics-for-freelancers/
contracthub.io/guides/how-to-send-a-contract-for-signature/
contracthub.io/guides/what-is-an-msa/
```

### 4.2 On-page SEO per template page

Each template page must include:
- H1: `[Template Name] — Free [PDF/DOCX] Template (2026)`
- Meta description ≤ 155 chars: includes template name, "free download," and primary use case
- Schema.org `Article` or `HowTo` with `dateModified` (attorney review date)
- Schema.org `FAQPage` with 5 niche questions (e.g. "What should a web design contract include?")
- "What's included" section (H2): scannable bullet list of covered clauses
- "When to use this" section (H2): 2–3 sentence plain-English explanation
- "Jurisdiction notes" section: which US states / countries it is appropriate for
- "Attorney review note" with reviewer name and date — builds trust + EEAT
- Internal links to 3 related templates
- Word count target per template page: 800–1,200 words

### 4.3 Technical SEO

- SSR / SSG via Next.js — all template pages pre-rendered at build time
- LCP target: < 1.5s — no external scripts on template pages before LCP fires
- Core Web Vitals: CLS < 0.05, INP < 100ms
- No paywalled content — Googlebot can read the full template text
- `robots.txt` explicitly set — allow all, disallow `/api/` and `/dashboard/`
- Self-referencing canonical on all pages; jurisdiction variants use `rel="canonical"` to base template
- Sitemap.xml auto-generated at build — 200+ template pages + category pages + blog
- `hreflang` for en-US / en-GB / en-CA / en-AU from launch
- Open Graph image per template (auto-generated: dark blue card, template name, category badge)

---

## 5. Design System

### 5.1 Color tokens

```css
/* Light mode */
--color-bg:            #FFFFFF;
--color-surface:       #F5F7FA;
--color-surface-2:     #EDF0F7;   /* Sidebar, filter panel */
--color-border:        #D8DFED;
--color-border-strong: #B0BCCE;
--color-text-primary:  #0D1B2A;
--color-text-secondary:#4A5E78;
--color-text-muted:    #7C92A8;
--color-accent:        #1B4FD8;
--color-accent-hover:  #1540B8;
--color-accent-light:  #EBF0FD;
--color-success:       #0F6B3F;
--color-warning:       #92610A;
--color-error:         #B91C1C;

/* Dark mode (prefers-color-scheme: dark) */
--color-bg:            #080F1A;
--color-surface:       #0D1B2A;
--color-surface-2:     #112238;
--color-border:        #1E3050;
--color-border-strong: #2A4470;
--color-text-primary:  #EDF2FF;
--color-text-secondary:#8AAAC8;
--color-text-muted:    #5A7A96;
--color-accent:        #4B7FE8;
--color-accent-hover:  #6495ED;
--color-accent-light:  #112248;
```

### 5.2 Typography

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Contract body text uses a serif for document authenticity */
--font-document: 'Georgia', 'Times New Roman', serif;

--text-xs:    11px / 1.5;
--text-sm:    13px / 1.6;
--text-base:  15px / 1.7;
--text-lg:    18px / 1.6;
--text-xl:    22px / 1.4;
--text-2xl:   28px / 1.3;
--text-3xl:   36px / 1.2;
--text-4xl:   48px / 1.1;

font-weight: 400 (body), 500 (UI labels, buttons), 600 (headings), 700 (hero only);
```

### 5.3 Document preview styling

The rendered contract template in the browser must look like a real legal document:

```css
.document-preview {
  font-family: var(--font-document);
  font-size: 14px;
  line-height: 1.9;
  color: var(--color-text-primary);
  max-width: 760px;
  margin: 0 auto;
  padding: 56px 64px;
  background: #FFFFFF;
  border: 0.5px solid var(--color-border);
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(13, 27, 42, 0.06);
}

.document-preview h1 { /* Contract title */
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 2rem;
}

.document-preview .section-heading {
  font-size: 14px;
  font-weight: 700;
  text-decoration: underline;
  margin: 1.5rem 0 0.5rem;
}

.document-preview .smart-field {
  background: var(--color-accent-light);
  border-bottom: 2px solid var(--color-accent);
  padding: 0 4px;
  border-radius: 2px 2px 0 0;
  cursor: pointer;
  min-width: 60px;
  display: inline-block;
}

.document-preview .smart-field:focus-within {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.document-preview .optional-clause {
  opacity: 0.4;
  transition: opacity 0.2s;
}

.document-preview .optional-clause.active {
  opacity: 1;
}
```

### 5.4 Component specs

**Primary button** — Height: 40px · Padding: `0 20px` · Background: `--color-accent` · Color: white · Border-radius: `6px` · Font-weight: 500 · Font-size: 14px

**Secondary button** — Height: 40px · Padding: `0 20px` · Background: transparent · Border: `1.5px solid --color-border-strong` · Color: `--color-text-primary` · Border-radius: `6px`

**Template card** — Min-height: 180px · Background: `--color-surface` · Border: `0.5px solid --color-border` · Border-radius: `8px` · Padding: `20px` · Hover: border becomes `--color-accent`, shadow `0 4px 16px rgba(27,79,216,0.10)`

**Category badge** — Font-size: 11px · Font-weight: 500 · Background: `--color-surface-2` · Color: `--color-text-secondary` · Padding: `2px 8px` · Border-radius: `20px`

**Smart field (filled)** — Accent underline disappears, replaced by standard text, background clears

**Navbar** — Height: 56px · Background: `--color-bg` · Border-bottom: `0.5px solid --color-border` · Sticky

**Sidebar (filter panel)** — Width: 240px · Background: `--color-surface` · Border-right: `0.5px solid --color-border`

---

## 6. Technical Architecture Overview

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG for 200+ template pages, SSR for dashboard, Edge for API |
| Styling | Tailwind CSS v4 | Purged CSS, rapid dev |
| PDF generation | `pdf-lib` + `@react-pdf/renderer` | Server-side PDF rendering, no headless browser needed |
| DOCX generation | `docx` (npm) | Pure JS DOCX generation, styled output |
| Editor state | Zustand | Lightweight, persists field values to sessionStorage |
| Forms | React Hook Form + Zod | Schema validation shared across client and server |
| Auth | NextAuth v5 (magic link + Google) | No password complexity |
| Database | PostgreSQL 16 via Supabase | Relational, type-safe via Prisma |
| ORM | Prisma 5 | Auto-generated migrations, TypeScript types |
| File storage | Cloudflare R2 | Signed contracts, uploaded custom templates |
| Email | Resend | Magic links + e-signature notifications |
| AI | Anthropic API (`claude-sonnet-4-6`) | Clause customization + risk flagging |
| Payments | Stripe | Flat-rate subscriptions |
| Rate limiting | Upstash Redis | Download rate limiting for anonymous users |
| Hosting | Vercel (Edge Runtime for API) | Zero config, global CDN for static pages |
| Analytics | Plausible | Privacy-first, no GDPR consent banner needed |

---

## 7. Frontend Architecture

### 7.1 Folder structure

```
contracthub/
├── app/
│   ├── (marketing)/                      ← SSG pages, no auth
│   │   ├── page.tsx                      ← Homepage
│   │   ├── pricing/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx                  ← Blog index
│   │   │   └── [slug]/page.tsx           ← Blog post
│   │   ├── guides/
│   │   │   └── [slug]/page.tsx
│   │   └── templates/
│   │       ├── page.tsx                  ← Full library browse
│   │       ├── [category]/
│   │       │   ├── page.tsx              ← Category landing
│   │       │   └── [slug]/
│   │       │       ├── page.tsx          ← Template detail + editor
│   │       │       └── [jurisdiction]/
│   │       │           └── page.tsx      ← Jurisdiction variant
│   ├── (editor)/                         ← Client-side only
│   │   └── fill/[templateId]/page.tsx    ← Full-screen fill mode
│   ├── (dashboard)/                      ← Auth required
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx            ← Saved drafts overview
│   │   ├── drafts/[id]/page.tsx          ← Edit a saved draft
│   │   ├── signatures/page.tsx           ← E-signature inbox
│   │   ├── signatures/[id]/page.tsx      ← Signature request detail
│   │   ├── team/
│   │   │   ├── page.tsx
│   │   │   ├── members/page.tsx
│   │   │   ├── templates/page.tsx        ← Custom team templates
│   │   │   └── repository/page.tsx       ← Signed contract archive
│   │   └── settings/page.tsx
│   ├── sign/[token]/page.tsx             ← Public: counterparty signing page
│   ├── draft/[slug]/page.tsx             ← Public: shared draft preview
│   ├── api/                              ← Route handlers
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── templates/
│   │   │   └── [id]/route.ts
│   │   ├── drafts/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── download/route.ts             ← PDF + DOCX generation
│   │   ├── signatures/
│   │   │   ├── route.ts                  ← Create signature request
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       ├── sign/route.ts         ← Record signature
│   │   │       └── remind/route.ts       ← Send reminder
│   │   ├── ai/
│   │   │   ├── customize/route.ts        ← Clause AI rewrite
│   │   │   ├── explain/route.ts          ← Plain-English clause explanation
│   │   │   └── risk/route.ts             ← Risk flagging scan
│   │   ├── team/
│   │   │   ├── route.ts
│   │   │   ├── [id]/route.ts
│   │   │   ├── [id]/members/route.ts
│   │   │   └── [id]/invite/route.ts
│   │   └── webhooks/
│   │       └── stripe/route.ts
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── template/
│   │   ├── TemplateCard.tsx              ← Library grid card
│   │   ├── TemplateGrid.tsx              ← Responsive grid of cards
│   │   ├── CategorySidebar.tsx           ← Filter + category nav
│   │   ├── SearchBar.tsx                 ← Full-text search input
│   │   ├── DocumentPreview.tsx           ← Rendered contract HTML
│   │   ├── SmartField.tsx                ← Inline editable field in doc
│   │   ├── OptionalClause.tsx            ← Toggle-able clause section
│   │   ├── ClauseExplainer.tsx           ← AI clause explanation popover
│   │   ├── RiskFlag.tsx                  ← AI risk highlight + tooltip
│   │   └── JurisdictionBadge.tsx
│   ├── editor/
│   │   ├── EditorPanel.tsx               ← Right-side field panel (desktop)
│   │   ├── FieldGroup.tsx                ← Grouped inputs for a section
│   │   ├── DownloadBar.tsx               ← PDF / DOCX download CTAs
│   │   ├── AiCustomizeButton.tsx
│   │   ├── ShareDraftButton.tsx
│   │   └── MobileFieldDrawer.tsx         ← Bottom sheet on mobile
│   ├── signature/
│   │   ├── SendForSignatureModal.tsx
│   │   ├── SignaturePad.tsx              ← Canvas draw + type + upload
│   │   ├── SignerRow.tsx
│   │   ├── SignatureStatusBadge.tsx
│   │   └── AuditTrailViewer.tsx
│   ├── dashboard/
│   │   ├── DraftCard.tsx
│   │   ├── ContractRepositoryRow.tsx
│   │   ├── TeamMemberRow.tsx
│   │   └── UsageBar.tsx
│   ├── marketing/
│   │   ├── HeroSection.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── TrustBadges.tsx               ← "Attorney-reviewed" + "200+ templates"
│   │   ├── CompareTable.tsx              ← vs PandaDoc vs DocuSign
│   │   ├── FaqAccordion.tsx
│   │   └── TestimonialRow.tsx
│   └── ui/                               ← shadcn/ui base
│       ├── Button.tsx · Input.tsx · Checkbox.tsx
│       ├── Dialog.tsx · Popover.tsx · Tooltip.tsx
│       ├── Badge.tsx · Tabs.tsx · Switch.tsx
│       └── Toast.tsx
│
├── lib/
│   ├── documents/
│   │   ├── pdfRenderer.ts               ← Generate PDF from filled template
│   │   ├── docxRenderer.ts              ← Generate DOCX from filled template
│   │   ├── templateParser.ts            ← Parse template JSON → React components
│   │   └── fieldExtractor.ts            ← Extract all variable fields from template
│   ├── ai/
│   │   ├── customize.ts                 ← Claude: rewrite clause
│   │   ├── explain.ts                   ← Claude: explain clause in plain English
│   │   └── riskScan.ts                  ← Claude: flag risky clauses
│   ├── signature/
│   │   ├── generateToken.ts             ← Create secure signing token
│   │   ├── auditTrail.ts                ← Record signing event
│   │   └── signedPdf.ts                 ← Embed signatures into final PDF
│   ├── db/
│   │   ├── client.ts                    ← Prisma singleton
│   │   └── queries/
│   │       ├── templates.ts
│   │       ├── drafts.ts
│   │       ├── signatures.ts
│   │       ├── teams.ts
│   │       └── users.ts
│   ├── auth/
│   │   ├── config.ts
│   │   └── session.ts
│   ├── email/
│   │   └── resend.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── webhook.ts
│   └── utils.ts
│
├── store/
│   └── editorStore.ts                   ← Zustand: field values + UI state
│
├── hooks/
│   ├── useTemplateEditor.ts             ← Fill fields, toggle optional clauses
│   ├── useDraft.ts                      ← SWR: load/save draft
│   ├── useSignatureRequest.ts           ← SWR: signature status polling
│   ├── useDownload.ts                   ← Trigger PDF/DOCX download
│   └── useAiClause.ts                   ← AI clause customization state
│
├── schemas/
│   ├── draft.schema.ts
│   ├── signature.schema.ts
│   └── team.schema.ts
│
├── types/
│   ├── template.ts
│   ├── draft.ts
│   └── db.ts
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── content/
│   └── templates/                       ← Template definitions (JSON)
│       ├── freelance/
│       │   ├── web-design-contract.json
│       │   └── … (29 more)
│       ├── nda/
│       ├── employment/
│       └── … (all categories)
│
└── public/
    ├── og/                              ← Auto-generated OG images
    └── previews/                        ← Static template thumbnail images
```

### 7.2 Template JSON format

Each contract template is stored as a structured JSON file — not raw HTML. The renderer converts it to a React component tree, which then gets rendered to HTML for preview or to PDF/DOCX for download.

```typescript
// types/template.ts
interface TemplateField {
  id: string;                 // e.g. "client_name"
  label: string;              // e.g. "Client Full Name"
  type: 'text' | 'date' | 'currency' | 'email' | 'phone' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  required: boolean;
  defaultValue?: string;
  options?: string[];         // for type: 'select'
  group: string;              // Groups fields in the editor panel: "Parties", "Payment", etc.
}

interface TemplateClause {
  id: string;
  heading?: string;
  body: string;               // Template literal with {field_id} placeholders
  optional: boolean;          // If true, show toggle checkbox
  optionalLabel?: string;     // e.g. "Include non-compete clause?"
  enabledByDefault: boolean;
  riskLevel?: 'low' | 'medium' | 'high'; // Pre-tagged by attorney
}

interface ContractTemplate {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  whatsCovered: string[];
  whenToUse: string;
  jurisdictions: string[];    // e.g. ["US", "UK", "CA"]
  jurisdictionNotes?: Record<string, string>; // state/country-specific notes
  lastReviewedAt: string;     // ISO date
  reviewerName: string;
  estimatedFillMinutes: number;
  fields: TemplateField[];
  clauses: TemplateClause[];
  relatedTemplates: string[]; // slugs of 3 related templates
  faq: { question: string; answer: string }[];
  tags: string[];
}
```

### 7.3 Zustand editor store

```typescript
// store/editorStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface EditorStore {
  templateId: string | null;
  fieldValues: Record<string, string>;   // { field_id: value }
  enabledClauses: Record<string, boolean>;
  aiCustomizations: Record<string, string>; // { clause_id: custom_text }
  riskFlags: string[];                   // clause IDs flagged by AI
  activeField: string | null;
  isDirty: boolean;

  setField: (id: string, value: string) => void;
  toggleClause: (id: string, enabled: boolean) => void;
  applyAiCustomization: (clauseId: string, text: string) => void;
  revertClause: (clauseId: string) => void;
  setRiskFlags: (flags: string[]) => void;
  setActiveField: (id: string | null) => void;
  loadDraft: (values: Record<string, string>, clauses: Record<string, boolean>) => void;
  resetEditor: () => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      templateId: null,
      fieldValues: {},
      enabledClauses: {},
      aiCustomizations: {},
      riskFlags: [],
      activeField: null,
      isDirty: false,

      setField: (id, value) =>
        set((s) => ({ fieldValues: { ...s.fieldValues, [id]: value }, isDirty: true })),

      toggleClause: (id, enabled) =>
        set((s) => ({ enabledClauses: { ...s.enabledClauses, [id]: enabled }, isDirty: true })),

      applyAiCustomization: (clauseId, text) =>
        set((s) => ({ aiCustomizations: { ...s.aiCustomizations, [clauseId]: text }, isDirty: true })),

      revertClause: (clauseId) =>
        set((s) => {
          const { [clauseId]: _, ...rest } = s.aiCustomizations;
          return { aiCustomizations: rest };
        }),

      setRiskFlags: (flags) => set({ riskFlags: flags }),
      setActiveField: (id) => set({ activeField: id }),

      loadDraft: (values, clauses) =>
        set({ fieldValues: values, enabledClauses: clauses, isDirty: false }),

      resetEditor: () =>
        set({ fieldValues: {}, enabledClauses: {}, aiCustomizations: {}, riskFlags: [], isDirty: false }),
    }),
    {
      name: 'contracthub-editor',
      partialize: (s) => ({ templateId: s.templateId, fieldValues: s.fieldValues, enabledClauses: s.enabledClauses }),
    }
  )
);
```

### 7.4 Routing & rendering strategy

| Route | Strategy | Reason |
|---|---|---|
| `/` homepage | SSG | Static, rarely changes |
| `/templates/` | SSG | Full library index, rebuild on new template |
| `/templates/[category]/` | SSG | 9 categories pre-rendered |
| `/templates/[category]/[slug]/` | SSG | 200+ pages pre-rendered at build |
| `/templates/[category]/[slug]/[jurisdiction]/` | SSG | Jurisdiction variants |
| `/fill/[templateId]/` | CSR only | No SSR needed, state is local |
| `/sign/[token]/` | SSR | Fetch signing request server-side |
| `/draft/[slug]/` | SSR | Fetch draft server-side for sharing |
| `/dashboard/` and sub-routes | SSR | Auth-gated, user-specific data |
| `/api/*` | Edge Runtime | Fast, global |
| `/blog/[slug]/` | SSG + ISR (24h) | Content changes occasionally |

### 7.5 PDF generation pipeline

```typescript
// lib/documents/pdfRenderer.ts
import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib';

export async function generatePdf(
  template: ContractTemplate,
  fieldValues: Record<string, string>,
  enabledClauses: Record<string, boolean>,
  aiCustomizations: Record<string, string>,
  options: { brandName?: string; brandLogoUrl?: string }
): Promise<Uint8Array> {

  const pdfDoc = await PDFDocument.create();
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  let page = pdfDoc.addPage(PageSizes.Letter);
  const { width, height } = page.getSize();
  const margin = { top: 72, bottom: 72, left: 72, right: 72 };
  const lineHeight = 16;
  let y = height - margin.top;

  const write = (text: string, font = timesRoman, size = 11) => {
    const lines = wrapText(text, width - margin.left - margin.right, font, size);
    for (const line of lines) {
      if (y < margin.bottom + 20) {
        page = pdfDoc.addPage(PageSizes.Letter);
        y = height - margin.top;
        addPageNumber(page, pdfDoc.getPageCount(), timesRoman);
      }
      page.drawText(line, { x: margin.left, y, font, size, color: rgb(0.05, 0.1, 0.16) });
      y -= lineHeight;
    }
    y -= 4; // paragraph spacing
  };

  // Title
  write(template.title.toUpperCase(), timesRomanBold, 13);
  y -= 12;

  for (const clause of template.clauses) {
    const isEnabled = enabledClauses[clause.id] ?? clause.enabledByDefault;
    if (!isEnabled && clause.optional) continue;

    if (clause.heading) {
      y -= 8;
      write(clause.heading, timesRomanBold, 11);
    }

    const body = aiCustomizations[clause.id] ?? clause.body;
    const filled = interpolateFields(body, fieldValues);
    write(filled, timesRoman, 11);
  }

  // Footer on all pages
  addFooter(pdfDoc, options.brandName ?? 'ContractHub', timesRoman);

  return pdfDoc.save();
}
```

---

## 8. Backend Architecture

### 8.1 API endpoints specification

#### Templates

```
GET    /api/templates
  Auth: none
  Query: ?category=&search=&jurisdiction=&page=&limit=
  Returns: { templates: TemplateCard[], total: number, page: number }

GET    /api/templates/:id
  Auth: none
  Returns: ContractTemplate (full, including clauses and fields)
  Cache-Control: public, max-age=3600 (1 hour, templates rarely change)
```

#### Drafts

```
GET    /api/drafts
  Auth: required
  Returns: Draft[] for current user (or team if ?teamId=)

POST   /api/drafts
  Auth: optional
  Body: { templateId, fieldValues, enabledClauses, aiCustomizations?, name? }
  Returns: Draft (with shareSlug generated)

GET    /api/drafts/:id
  Auth: owner or team member
  Returns: Draft with full field values

PATCH  /api/drafts/:id
  Auth: owner only
  Body: Partial<DraftInput>
  Returns: Draft

DELETE /api/drafts/:id
  Auth: owner only
  Returns: { success: true }

GET    /api/draft-public/:slug
  Auth: none (public share link)
  Returns: Draft (read-only, no field values exposed if private flag set)
```

#### Downloads

```
POST   /api/download
  Auth: rate-limited by IP (3/day anon; unlimited with account)
  Body: { templateId, fieldValues, enabledClauses, aiCustomizations?, format: 'pdf'|'docx', brandOptions? }
  Action: Generates and streams file
  Returns: File stream (Content-Type: application/pdf or application/vnd.openxmlformats...)
  Headers: Content-Disposition: attachment; filename="[template-slug]-[date].[ext]"
```

#### E-Signatures

```
POST   /api/signatures
  Auth: required
  Body: { draftId, signers: [{ name, email, order }], message?, subject? }
  Action: Creates signature request, sends email to first signer
  Returns: SignatureRequest

GET    /api/signatures
  Auth: required
  Returns: SignatureRequest[] (sent and received)

GET    /api/signatures/:id
  Auth: owner or signer (via token)
  Returns: SignatureRequest with SignatureEvent[]

POST   /api/signatures/:id/sign
  Auth: signer token (from email link, no account needed)
  Body: { signerToken, signatureDataUrl, signedAt }
  Action: Records signature, advances to next signer or marks complete
  Returns: { success: true, nextSigner?: boolean, complete?: boolean }

POST   /api/signatures/:id/remind
  Auth: request owner only
  Action: Re-sends email to pending signer(s)
  Returns: { sent: true }

DELETE /api/signatures/:id
  Auth: owner only
  Action: Voids the request, notifies all parties
  Returns: { success: true }
```

#### AI endpoints

```
POST   /api/ai/customize
  Auth: Pro/Team plan required
  Rate limit: 30 calls/hour per user
  Body: { clauseId, clauseText, instruction, templateContext }
  Returns: { rewrittenClause: string }

POST   /api/ai/explain
  Auth: Pro/Team plan required
  Body: { clauseText }
  Returns: { explanation: string }  ← Plain-English, 2-4 sentences

POST   /api/ai/risk
  Auth: Pro/Team plan required
  Body: { templateId, clauses: { id, text }[] }
  Returns: { flags: { clauseId, riskLevel, explanation }[] }
```

#### Teams

```
POST   /api/team
  Auth: required (Team plan)
  Body: { name }
  Returns: Team

GET    /api/team/:id
  Auth: team member
  Returns: Team with members[]

PATCH  /api/team/:id
  Auth: admin
  Body: Partial<TeamSettings>
  Returns: Team

POST   /api/team/:id/invite
  Auth: admin
  Body: { email, role: 'ADMIN'|'MEMBER'|'VIEWER' }
  Returns: { sent: true }

DELETE /api/team/:id/members/:userId
  Auth: admin
  Returns: { success: true }

GET    /api/team/:id/templates
  Auth: team member
  Returns: CustomTemplate[]

POST   /api/team/:id/templates
  Auth: admin
  Body: { name, fileUrl, lockedClauses }
  Returns: CustomTemplate
```

### 8.2 AI clause customization (server-side)

```typescript
// lib/ai/customize.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function customizeClause(
  clauseText: string,
  instruction: string,
  templateContext: string
): Promise<string> {

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: `You are a contract drafting assistant. You rewrite contract clauses based on user instructions.
Rules:
- Maintain formal legal language and tone
- Keep clause length similar to original unless asked to expand/condense
- Do not add recommendations, warnings, or disclaimers to your output
- Output ONLY the rewritten clause text — no preamble, no explanation, no markdown
- Preserve any [FIELD_NAME] placeholders exactly as-is
Context: This is a clause from a ${templateContext} agreement.`,
    messages: [
      {
        role: 'user',
        content: `Original clause:\n${clauseText}\n\nInstruction: ${instruction}\n\nRewritten clause:`
      }
    ],
  });

  return message.content[0].type === 'text' ? message.content[0].text.trim() : clauseText;
}
```

```typescript
// lib/ai/riskScan.ts
export async function scanForRisks(
  clauses: { id: string; text: string }[]
): Promise<{ clauseId: string; riskLevel: 'low' | 'medium' | 'high'; explanation: string }[]> {

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2048,
    system: `You are a contract risk analyst. Analyze clauses and return ONLY valid JSON with no explanation or markdown.
Return format: [{"clauseId": string, "riskLevel": "low"|"medium"|"high", "explanation": string (max 30 words plain English)}]
Only include clauses with medium or high risk. Omit low-risk clauses unless all clauses are low risk.`,
    messages: [
      {
        role: 'user',
        content: JSON.stringify(clauses),
      }
    ],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '[]';
  try {
    return JSON.parse(text.replace(/```json|```/g, '').trim());
  } catch {
    return [];
  }
}
```

### 8.3 Middleware

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Auth guard for dashboard routes
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/sign-out')) {
    const token = await getToken({ req });
    if (!token) return NextResponse.redirect(new URL('/', req.url));
  }

  // 2. Plan guard for AI and e-signature endpoints
  if (pathname.startsWith('/api/ai/') || pathname.startsWith('/api/signatures')) {
    const token = await getToken({ req });
    if (!token) return new NextResponse('Unauthorized', { status: 401 });
    if (pathname.startsWith('/api/ai/') && !['PRO', 'TEAM'].includes(token.plan as string)) {
      return new NextResponse('Pro plan required', { status: 403 });
    }
  }

  // 3. Download rate limiting (anon users)
  if (pathname === '/api/download') {
    const token = await getToken({ req });
    if (!token) {
      const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown';
      const allowed = await checkDownloadRateLimit(ip); // Upstash Redis: 3/day
      if (!allowed) {
        return NextResponse.json(
          { error: 'Daily limit reached. Create a free account for unlimited downloads.' },
          { status: 429 }
        );
      }
    }
  }

  // 4. CORS for public API routes
  if (pathname.startsWith('/api/') && req.method === 'OPTIONS') {
    return new NextResponse(null, { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*', '/sign-out'],
};
```

### 8.4 E-signature flow

```
1. Owner fills template → clicks "Send for Signature"
2. Modal: enter signer name + email (can add multiple, set order)
3. POST /api/signatures:
   - Create SignatureRequest record
   - Generate unique signerToken per signer (stored hashed in DB)
   - Send email to first signer: "contracthub.io/sign/[signerToken]"

4. Signer opens link (no account needed):
   - Document rendered read-only with their fields highlighted
   - SignaturePad component: draw / type / upload image
   - Click "Sign" → POST /api/signatures/:id/sign with signature data
   - Server: record SignatureEvent, embed signature into PDF
   - If more signers: send email to next signer
   - If all signed: generate final PDF, store on R2, email all parties

5. Owner dashboard shows status: Pending → Viewed → Signed (per signer)

Audit trail per signature event:
  - signerEmail, signerName
  - signedAt (UTC timestamp)
  - ipAddress (from request headers)
  - userAgent
  - documentHash (SHA-256 of document at time of signing)
```

---

## 9. PostgreSQL Database Schema

**Database:** PostgreSQL 16 via Supabase  
**ORM:** Prisma 5  
**Connection:** Pooled via Supavisor for API routes; direct for migrations

### 9.1 Full Prisma schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}

// ─────────────────────────────────────────
// USERS & AUTH
// ─────────────────────────────────────────

model User {
  id               String    @id @default(cuid())
  email            String    @unique
  name             String?
  image            String?
  plan             Plan      @default(FREE)
  planExpiresAt    DateTime?
  stripeCustomerId String?   @unique
  downloadCount    Int       @default(0)   // lifetime download counter

  createdAt        DateTime  @default(now())
  updatedAt        DateTime  @updatedAt

  accounts         Account[]
  sessions         Session[]
  drafts           Draft[]
  signatureRequests SignatureRequest[]
  ownedTeams       Team[]         @relation("TeamOwner")
  teamMemberships  TeamMember[]
  subscription     Subscription?
  bookmarks        Bookmark[]

  @@index([email])
  @@map("users")
}

enum Plan {
  FREE
  PRO
  TEAM
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ─────────────────────────────────────────
// TEMPLATES (metadata only — content in JSON files)
// ─────────────────────────────────────────

model Template {
  id               String   @id @default(cuid())
  slug             String   @unique
  category         String
  title            String
  description      String   @db.Text
  jurisdictions    String[]
  lastReviewedAt   DateTime
  reviewerName     String
  tags             String[]
  viewCount        Int      @default(0)
  downloadCount    Int      @default(0)
  isPublished      Boolean  @default(true)

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  drafts           Draft[]
  bookmarks        Bookmark[]

  @@index([category])
  @@index([slug])
  @@index([tags])
  @@map("templates")
}

// ─────────────────────────────────────────
// DRAFTS
// ─────────────────────────────────────────

model Draft {
  id               String   @id @default(cuid())
  userId           String?                         // null = anonymous (no save)
  teamId           String?
  templateId       String
  name             String   @default("Untitled Draft")
  shareSlug        String?  @unique
  isSharePublic    Boolean  @default(false)

  fieldValues      Json                            // { field_id: value }
  enabledClauses   Json                            // { clause_id: boolean }
  aiCustomizations Json     @default("{}")         // { clause_id: custom_text }

  status           DraftStatus @default(DRAFT)

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  user             User?         @relation(fields: [userId], references: [id], onDelete: SetNull)
  team             Team?         @relation(fields: [teamId], references: [id], onDelete: SetNull)
  template         Template      @relation(fields: [templateId], references: [id])
  versions         DraftVersion[]
  signatureRequest SignatureRequest?

  @@index([userId])
  @@index([teamId])
  @@index([templateId])
  @@index([shareSlug])
  @@map("drafts")
}

enum DraftStatus {
  DRAFT
  SENT_FOR_SIGNATURE
  SIGNED
  VOIDED
}

model DraftVersion {
  id           String   @id @default(cuid())
  draftId      String
  fieldValues  Json
  enabledClauses Json
  aiCustomizations Json @default("{}")
  savedAt      DateTime @default(now())

  draft        Draft @relation(fields: [draftId], references: [id], onDelete: Cascade)

  @@index([draftId, savedAt])
  @@map("draft_versions")
}

// ─────────────────────────────────────────
// E-SIGNATURES
// ─────────────────────────────────────────

model SignatureRequest {
  id            String          @id @default(cuid())
  draftId       String          @unique
  requesterId   String
  subject       String?
  message       String?         @db.Text
  status        SignatureStatus @default(PENDING)
  documentHash  String          // SHA-256 of document at send time
  signedPdfUrl  String?         // R2 URL after all parties sign
  completedAt   DateTime?

  createdAt     DateTime        @default(now())
  updatedAt     DateTime        @updatedAt

  draft         Draft             @relation(fields: [draftId], references: [id])
  requester     User              @relation(fields: [requesterId], references: [id])
  signers       Signer[]
  events        SignatureEvent[]

  @@index([requesterId])
  @@index([status])
  @@map("signature_requests")
}

enum SignatureStatus {
  PENDING
  PARTIALLY_SIGNED
  COMPLETED
  VOIDED
  EXPIRED
}

model Signer {
  id                String        @id @default(cuid())
  signatureRequestId String
  name              String
  email             String
  order             Int           @default(1)   // signing order
  status            SignerStatus  @default(PENDING)
  tokenHash         String        @unique       // Hashed signing token (raw token sent via email)
  tokenExpiresAt    DateTime
  viewedAt          DateTime?
  signedAt          DateTime?
  signatureDataUrl  String?       @db.Text      // Base64 signature image (or R2 URL)
  ipAddress         String?
  userAgent         String?       @db.Text

  signatureRequest  SignatureRequest @relation(fields: [signatureRequestId], references: [id], onDelete: Cascade)

  @@index([signatureRequestId, order])
  @@index([tokenHash])
  @@map("signers")
}

enum SignerStatus {
  PENDING
  SENT
  VIEWED
  SIGNED
  DECLINED
}

model SignatureEvent {
  id                 String   @id @default(cuid())
  signatureRequestId String
  type               SignatureEventType
  signerEmail        String?
  metadata           Json?
  occurredAt         DateTime @default(now())

  signatureRequest   SignatureRequest @relation(fields: [signatureRequestId], references: [id], onDelete: Cascade)

  @@index([signatureRequestId, occurredAt])
  @@map("signature_events")
}

enum SignatureEventType {
  REQUEST_CREATED
  EMAIL_SENT
  DOCUMENT_VIEWED
  DOCUMENT_SIGNED
  DOCUMENT_DECLINED
  REMINDER_SENT
  REQUEST_VOIDED
  REQUEST_COMPLETED
}

// ─────────────────────────────────────────
// TEAMS
// ─────────────────────────────────────────

model Team {
  id               String   @id @default(cuid())
  ownerId          String
  name             String
  slug             String   @unique
  plan             Plan     @default(TEAM)

  brandName        String?
  brandLogoUrl     String?
  brandPrimaryColor String?

  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  owner            User              @relation("TeamOwner", fields: [ownerId], references: [id])
  members          TeamMember[]
  invites          TeamInvite[]
  drafts           Draft[]
  customTemplates  CustomTemplate[]

  @@index([ownerId])
  @@map("teams")
}

model TeamMember {
  id       String   @id @default(cuid())
  teamId   String
  userId   String
  role     TeamRole @default(MEMBER)
  joinedAt DateTime @default(now())

  team     Team @relation(fields: [teamId], references: [id], onDelete: Cascade)
  user     User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([teamId, userId])
  @@index([teamId])
  @@index([userId])
  @@map("team_members")
}

enum TeamRole {
  ADMIN
  MEMBER
  VIEWER
}

model TeamInvite {
  id         String    @id @default(cuid())
  teamId     String
  email      String
  role       TeamRole  @default(MEMBER)
  token      String    @unique @default(cuid())
  expiresAt  DateTime
  acceptedAt DateTime?

  team       Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@index([token])
  @@index([teamId])
  @@map("team_invites")
}

model CustomTemplate {
  id             String   @id @default(cuid())
  teamId         String
  name           String
  fileUrl        String   // R2 URL to uploaded DOCX/PDF
  lockedClauses  String[] @default([])  // clause headings that members cannot edit
  uploadedById   String
  createdAt      DateTime @default(now())

  team           Team @relation(fields: [teamId], references: [id], onDelete: Cascade)

  @@index([teamId])
  @@map("custom_templates")
}

// ─────────────────────────────────────────
// BOOKMARKS
// ─────────────────────────────────────────

model Bookmark {
  id         String   @id @default(cuid())
  userId     String
  templateId String
  createdAt  DateTime @default(now())

  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  template   Template @relation(fields: [templateId], references: [id], onDelete: Cascade)

  @@unique([userId, templateId])
  @@index([userId])
  @@map("bookmarks")
}

// ─────────────────────────────────────────
// BILLING
// ─────────────────────────────────────────

model Subscription {
  id                   String             @id @default(cuid())
  userId               String             @unique
  stripeSubscriptionId String             @unique
  stripePriceId        String
  status               SubscriptionStatus
  plan                 Plan
  currentPeriodStart   DateTime
  currentPeriodEnd     DateTime
  cancelAtPeriodEnd    Boolean            @default(false)
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  @@index([stripeSubscriptionId])
  @@map("subscriptions")
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELED
  TRIALING
  INCOMPLETE
}

// ─────────────────────────────────────────
// ANALYTICS (lightweight, privacy-first)
// ─────────────────────────────────────────

model TemplateView {
  id         String   @id @default(cuid())
  templateId String
  country    String?  // From Vercel geo headers
  referrer   String?
  viewedAt   DateTime @default(now())

  @@index([templateId, viewedAt])
  @@map("template_views")
}

model TemplateDownload {
  id         String         @id @default(cuid())
  templateId String
  userId     String?
  format     DownloadFormat
  country    String?
  downloadedAt DateTime     @default(now())

  @@index([templateId, downloadedAt])
  @@map("template_downloads")
}

enum DownloadFormat {
  PDF
  DOCX
}
```

### 9.2 Key indexes rationale

| Table | Index | Reason |
|---|---|---|
| `templates` | `category` | Browse by category — called on every category page load |
| `templates` | `slug` | Template detail page lookup |
| `templates` | `tags` | Tag-based search filtering |
| `drafts` | `userId` | Dashboard: all drafts for user |
| `drafts` | `shareSlug` | Public draft preview lookup |
| `draft_versions` | `(draftId, savedAt)` | Latest 5 versions in order |
| `signers` | `tokenHash` | Signing link authentication — called on every signing page open |
| `signers` | `(signatureRequestId, order)` | Find next signer in sequence |
| `signature_events` | `(signatureRequestId, occurredAt)` | Audit trail in chronological order |
| `team_members` | `(teamId, userId)` | Unique constraint + permission check |
| `template_views` | `(templateId, viewedAt)` | Popular templates dashboard |
| `template_downloads` | `(templateId, downloadedAt)` | Download analytics chart |

### 9.3 Environment variables

```bash
# .env.local

# PostgreSQL (Supabase)
DATABASE_URL="postgresql://postgres.[ref]:[pass]@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_DATABASE_URL="postgresql://postgres.[ref]:[pass]@db.[ref].supabase.co:5432/postgres"

# Auth (NextAuth)
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="ContractHub <noreply@contracthub.io>"

# AI (Anthropic)
ANTHROPIC_API_KEY="sk-ant-..."

# File Storage (Cloudflare R2)
R2_ACCOUNT_ID="..."
R2_ACCESS_KEY_ID="..."
R2_SECRET_ACCESS_KEY="..."
R2_BUCKET_NAME="contracthub-files"
R2_PUBLIC_URL="https://files.contracthub.io"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Payments (Stripe)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_TEAM_PRICE_ID="price_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
```

---

## 10. Zod Validation Schemas

```typescript
// schemas/draft.schema.ts
import { z } from 'zod';

export const CreateDraftSchema = z.object({
  templateId: z.string().min(1),
  name:        z.string().max(100).default('Untitled Draft'),
  fieldValues: z.record(z.string(), z.string()),
  enabledClauses: z.record(z.string(), z.boolean()),
  aiCustomizations: z.record(z.string(), z.string()).default({}),
});

export const UpdateDraftSchema = CreateDraftSchema.partial().omit({ templateId: true });

// schemas/signature.schema.ts
export const CreateSignatureRequestSchema = z.object({
  draftId: z.string().min(1),
  subject: z.string().max(200).optional(),
  message: z.string().max(1000).optional(),
  signers: z.array(z.object({
    name:  z.string().min(1).max(100),
    email: z.string().email(),
    order: z.number().int().min(1),
  })).min(1).max(10),
});

// schemas/team.schema.ts
export const CreateTeamSchema = z.object({
  name: z.string().min(2).max(80),
});

export const InviteMemberSchema = z.object({
  email: z.string().email(),
  role:  z.enum(['ADMIN', 'MEMBER', 'VIEWER']),
});

export const UpdateBrandKitSchema = z.object({
  brandName:         z.string().max(80).optional(),
  brandLogoUrl:      z.string().url().optional(),
  brandPrimaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/).optional(),
});

// schemas/download.schema.ts
export const DownloadSchema = z.object({
  templateId:       z.string().min(1),
  fieldValues:      z.record(z.string(), z.string()),
  enabledClauses:   z.record(z.string(), z.boolean()),
  aiCustomizations: z.record(z.string(), z.string()).default({}),
  format:           z.enum(['pdf', 'docx']),
  brandOptions: z.object({
    brandName:    z.string().max(80).optional(),
    brandLogoUrl: z.string().url().optional(),
  }).optional(),
});
```

---

## 11. Stripe Webhook Handler

```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';
import { prisma } from '@/lib/db/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig  = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId  = session.metadata?.userId;
      if (!userId) break;

      const sub  = await stripe.subscriptions.retrieve(session.subscription as string);
      const plan = getPlan(sub.items.data[0].price.id);

      await prisma.$transaction([
        prisma.user.update({ where: { id: userId }, data: { plan, stripeCustomerId: session.customer as string } }),
        prisma.subscription.upsert({
          where:  { userId },
          create: { userId, stripeSubscriptionId: sub.id, stripePriceId: sub.items.data[0].price.id, status: 'ACTIVE', plan, currentPeriodStart: new Date(sub.current_period_start * 1000), currentPeriodEnd: new Date(sub.current_period_end * 1000) },
          update: { stripeSubscriptionId: sub.id, status: 'ACTIVE', plan, currentPeriodStart: new Date(sub.current_period_start * 1000), currentPeriodEnd: new Date(sub.current_period_end * 1000) },
        }),
      ]);
      break;
    }

    case 'customer.subscription.updated': {
      const sub    = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      if (!userId) break;
      const plan = getPlan(sub.items.data[0].price.id);

      await prisma.$transaction([
        prisma.user.update({ where: { id: userId }, data: { plan } }),
        prisma.subscription.update({ where: { userId }, data: { status: mapStatus(sub.status), plan, cancelAtPeriodEnd: sub.cancel_at_period_end, currentPeriodStart: new Date(sub.current_period_start * 1000), currentPeriodEnd: new Date(sub.current_period_end * 1000) } }),
      ]);
      break;
    }

    case 'customer.subscription.deleted': {
      const sub    = event.data.object as Stripe.Subscription;
      const userId = sub.metadata?.userId;
      if (!userId) break;
      await prisma.$transaction([
        prisma.user.update({ where: { id: userId }, data: { plan: 'FREE' } }),
        prisma.subscription.update({ where: { userId }, data: { status: 'CANCELED' } }),
      ]);
      break;
    }
  }

  return new Response('ok', { status: 200 });
}

function getPlan(priceId: string): Plan {
  if (priceId === process.env.STRIPE_PRO_PRICE_ID)  return 'PRO';
  if (priceId === process.env.STRIPE_TEAM_PRICE_ID) return 'TEAM';
  return 'FREE';
}

function mapStatus(s: string): SubscriptionStatus {
  const map: Record<string, SubscriptionStatus> = {
    active: 'ACTIVE', past_due: 'PAST_DUE', canceled: 'CANCELED',
    trialing: 'TRIALING', incomplete: 'INCOMPLETE',
  };
  return map[s] ?? 'INCOMPLETE';
}
```

---

## 12. Launch Plan

### 12.1 Pre-launch (weeks 1–5)

- [ ] Build core library with 30 templates (3 per key niche), smart field editor, PDF + DOCX download
- [ ] Set up SEO metadata, Schema.org, and sitemap for all 30 template pages
- [ ] Have 3 templates reviewed by a licensed attorney — note reviewer name on each page (trust signal)
- [ ] Submit sitemap to Google Search Console on day 1
- [ ] Set up Plausible analytics (no cookie banner needed)
- [ ] Stripe billing in test mode, webhook handler deployed
- [ ] Write 4 SEO blog posts targeting "how to write a [type] contract" keywords

### 12.2 Soft launch (week 6)

- [ ] Post on Indie Hackers — show the free template library, explain the PandaDoc pricing gap
- [ ] Post in r/freelance, r/legaladvice, r/smallbusiness — share the free template, no spam
- [ ] List on Product Hunt (Tuesday 12:01am PST)
- [ ] Reach out to 10 freelancer communities on Slack/Discord — offer Pro free for 6 months in exchange for feedback
- [ ] Tweet thread: "I built a free contract template library — here are the 5 clauses every freelancer forgets"

### 12.3 Growth levers (weeks 7–20)

- [ ] Add jurisdiction-specific template variants for top 5 US states (CA, TX, NY, FL, WA) → 5× more SEO pages per template
- [ ] Launch "Attorney review" badge program — partner with 2–3 legal tech attorneys to review templates quarterly
- [ ] "Powered by ContractHub" link in free PDF footer → passive referral traffic
- [ ] Affiliate program: 25% recurring for referrals (target legal blogs, freelancer YouTubers)
- [ ] Add UK, Canadian, and Australian jurisdiction variants → international SEO
- [ ] Guest post on freelancer-focused blogs: "5 contract mistakes that cost freelancers thousands"

### 12.4 Revenue targets

| Month | MRR target | Milestone |
|---|---|---|
| 1 | $0 | Launch · 1,000 template downloads |
| 2 | $200 | First 15–20 Pro subscribers |
| 3 | $600 | First 3–5 Team workspaces |
| 6 | $2,500 | SEO traffic driving 5,000 visits/month |
| 12 | $10,000 | 200+ templates · 30+ niche SEO pages · established authority |

---

## 13. Non-Goals (explicitly out of scope)

- No full CLM (contract lifecycle management) — that's Ironclad's lane
- No CRM integration at launch — that's PandaDoc's lane
- No legal advice — every page carries a clear "not a substitute for legal advice" disclaimer
- No Canva-style freeform document editor — structured fields + clause toggles only
- No court filing or notarization — out of scope at this stage
- No mobile app (PWA is acceptable, native app is not)
- No blockchain / NFT contract gimmicks

---

## 14. Success Metrics

| Metric | Definition | Target (30 days post-launch) |
|---|---|---|
| Time to first download | Landing → PDF/DOCX in hand | < 2 minutes median |
| Fill completion rate | Template opened → downloaded | > 55% |
| Anonymous → account conversion | Anon users who create free account | > 15% |
| Free → Pro conversion | Free accounts → Pro within 30 days | > 4% |
| Organic template page traffic | Google sessions to `/templates/*` | > 1,000/month by month 2 |
| Template download count | Total downloads across all templates | > 500 in first month |
| NPS | Post-download 1-question survey | > 55 |
| Team workspace creation | Teams created by month 3 | > 10 |

---

*ContractHub PRD v1.0 — 14 sections · researched against PandaDoc, DocuSign, LegalZoom, Docracy, Legitt AI · Frontend · Backend · PostgreSQL · Stripe · Zod · E-signature · AI clause engine*