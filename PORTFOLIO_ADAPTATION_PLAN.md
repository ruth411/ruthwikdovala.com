# Portfolio Adaptation Plan (Inspired by toukoum.fr + Your Personal Touch)

This plan explains how to evolve **ruthwikdovala.com** toward the clean, animated, single-page storytelling feel of **toukoum.fr**, while preserving your own identity (research + drone/ML focus).

## 1) What to borrow from the reference style

From a quick pass of the reference site, the strongest patterns to adopt are:

- **Focused hero message** with one clear identity statement.
- **Single-page section flow** (About → Projects → Skills → Fun/Personal → Contact) rather than heavy page switching.
- **Highly visual, card-based blocks** with compact text and obvious hierarchy.
- **Playful but minimal interactions** (subtle motion, strong CTA buttons).

## 2) What should stay uniquely yours

Keep your differentiators front and center:

- Your **AI/ML + drone autonomy** niche.
- Your **publication-backed work** (IEEE links) as proof of depth.
- Your **academic + applied** project blend.
- A personal mini-section (mountain biking, books, etc.) to humanize the portfolio.

## 3) Architecture shift (recommended)

### Current structure
You currently use route-per-page navigation (`/`, `/projects`, `/skills`, `/contact`) with a shared shell. This is good, but less story-driven than the reference style.

### Proposed structure
Move toward a **single-page landing experience**:

- Keep routing support, but make `/` a complete one-page narrative with section anchors:
  - `#about`
  - `#projects`
  - `#skills`
  - `#fun`
  - `#contact`
- Optionally keep `/projects` and `/skills` as “full detail” pages for recruiters who want depth.

## 4) UI system changes (low risk, high impact)

Your current theme token setup is strong; extend rather than replace it.

- Keep CSS variable token model in `src/styles/globals.css`.
- Add a bolder accent pair (primary + highlight) for stronger visual personality.
- Increase vertical rhythm:
  - section spacing (`py-20` style sections)
  - larger hero typography
  - consistent max widths for text blocks
- Introduce one new reusable component pattern:
  - `SectionHeader` (eyebrow + title + subtitle)
  - `PillButton` (for CTA / section links)

## 5) Section-by-section implementation plan

## Phase 1 — Hero + navigation polish

- Update top nav labels to match anchor flow (About, Projects, Skills, Fun, Contact).
- Add one strong hero line, one supporting line, and 2 CTAs:
  - “View Projects”
  - “Download Resume”
- Keep theme toggle, but style it more integrated with hero brand.

**Files:**
- `src/pages/App.tsx`
- `src/pages/Home.tsx`

## Phase 2 — Convert home page into full one-page narrative

In `Home.tsx`, render sections in this order:

1. **About** (intro + profile photo)
2. **Featured Projects** (top 3 cards + “View all projects” link)
3. **Skills Snapshot** (top stacks by category)
4. **Fun / Beyond Code** (mountain biking + reading + quick personal facts)
5. **Contact CTA** (short block + email button)

**Files:**
- `src/pages/Home.tsx`
- optional shared components under `src/components/*`

## Phase 3 — Project cards redesign

- Keep your project data source in `Projects.tsx`, but split to:
  - `featuredProjects` for home
  - full `projects` list for detailed page
- Card style:
  - stronger title hierarchy
  - concise 1-line impact statement
  - 3-5 tags max per card in preview mode
  - publication badge for IEEE entries

**Files:**
- `src/pages/Projects.tsx`
- optional shared `ProjectCard.tsx`

## Phase 4 — Skills visualization upgrade

- Keep category cards, but convert from dense chip lists to:
  - “Core stack” first row
  - “Also use” collapsed/secondary row
- Add small proficiency signal (e.g., “Daily”, “Comfortable”, “Exploring”) rather than percentages.

**Files:**
- `src/pages/Skills.tsx`

## Phase 5 — Contact experience

- Keep current `mailto:` approach (simple, no backend), but:
  - simplify form fields
  - add clear response expectation text (“I usually reply within 24–48 hours”)
  - add 1 alternate link (LinkedIn or GitHub)

**Files:**
- `src/pages/Contact.tsx`

## 6) Motion/interaction guidelines

Use motion consistently but minimally:

- Hero: fade+slide once on load.
- Sections: stagger card reveal on scroll.
- Buttons/cards: tiny hover lift + border glow.
- Keep durations short (0.2s–0.5s); avoid heavy parallax.

You already use Framer Motion in `Home.tsx`, so expand from that baseline.

## 7) Content rewrite checklist

For each section:

- **Headline:** outcome-oriented and short.
- **Body copy:** 1–2 lines max.
- **Evidence:** links, metrics, publication badges.
- **CTA:** one clear next action.

Suggested hero copy direction:
- “I build AI systems for autonomous and data-driven decision making.”
- Supporting line with your drone + ML research focus.

## 8) Suggested 2-week execution plan

### Week 1
1. Create section-based home scaffold.
2. Refactor nav to anchor links.
3. Ship hero + featured projects + contact CTA.

### Week 2
1. Refine skills + fun section.
2. Improve animations and visual consistency.
3. Final pass for mobile spacing/typography and performance.

## 9) Quality bar before launch

- Mobile first pass at 360px, 390px, 768px, 1024px.
- Lighthouse checks (performance, accessibility, SEO).
- Link validation for resume, external project/publication links.
- Ensure dark/light mode contrast remains accessible.

## 10) Optional stretch ideas (your signature touch)

- Add a tiny “Research timeline” strip (year → work → outcome).
- Add “Now” card (what you’re currently learning/building).
- Add “Ask me about…” chips (drones, CV, model evaluation, MLOps).

---

If you want, the next step I can do is implement **Phase 1 + Phase 2** directly in your codebase (single-page narrative + refreshed hero/navigation), then iterate with screenshots.
