# Chris B Hustling — Design System

## Concept
The whole identity reads like a **passbook/ledger stamped "restored"** — official, tangible, a little vintage-bank, ascending. Blue-collar origin, white-collar outcome. NOT a SaaS dashboard, NOT a real-estate glam site, NOT the generic "AI template" (cream + terracotta serif) or (black + neon green) look.

Every major section is a **ledger page**: thin rule at top with a stamp-style monospace eyebrow (e.g. `FILE NO. 04 — CREDIT`), content below, hairline divider at the bottom.

## Signature motif — the ascending brass line
One reusable SVG, three meanings:
1. **Hero** — a credit-score-style ascending line chart.
2. **Services** — the same line transformed into the roofline of a house silhouette.
3. **Wealth Building / Why Choose Us** — the same line as a compounding bar chart.
On scroll into view, the line **draws itself left-to-right once** (like a pen signing a ledger). Respect `prefers-reduced-motion` → render the line already drawn.

## Palette (CSS variables)
- `--ink #161A22` — near-black navy, primary background (warmth from ink undertone)
- `--paper #F1ECE1` — aged ledger-paper cream, ONLY for inset card surfaces / stamped sections, never dominant background
- `--brass #B8934A` — brass/gold accent; the ascending-line motif + CTAs
- `--brass-lite #D8B673` — lighter brass for hovers/highlights
- `--brick #8C4A38` — muted Pittsburgh rowhouse brick red; eyebrows/tags ONLY
- `--ledger-line #3A4150` — faint ruled-line color on dark backgrounds
- `--ink-70 rgba(241,236,225,0.70)` — body copy on dark
- `--ink-45 rgba(241,236,225,0.45)` — muted labels on dark

## Typography
- **Display:** Fraunces — high-contrast serif, weight 500–600, tight tracking. "Official document" authority.
- **Body:** Inter — plain, legible, working-class-honest.
- **Data/stamp:** Space Mono — numbers, dates, case IDs, addresses, phone, stamped labels ONLY. Uppercase, letter-spaced.

## Components
- **Ledger eyebrow:** Space Mono, uppercase, ~0.72rem, letter-spacing 0.18em, brass or brick, preceded by a short brass tick rule.
- **CTA (primary):** brass text/border, on hover the brass underline extends — NO shadow, NO scale bounce.
- **CTA (solid):** brass fill on ink, ink text.
- **Service entry:** numbered file row (`FILE 01 — REAL ESTATE`) + Fraunces title + one-line body + text "Read More →". No icon soup, no cream cards.
- **Rental insert:** paper-cream card with brass border, styled like a paper insert tucked into the ledger — visually distinct from core services.
- **Section divider:** 1px `--ledger-line` hairline, full width.

## Layout
- Mobile-first stacked ledger sections. Max content width ~1200px, generous vertical rhythm.
- Dark ink is the dominant ground throughout. Paper cream appears only in the rental insert and any "stamped" call-out.
- Visible keyboard focus: brass outline on all links/buttons.

## Explicitly avoid
- Cream background as base; auto-rotating hero sliders; rounded stock-photo cards; gradient buttons; icon-in-circle grids; stock "handshake"/"keys" photography; neon green; the original clip-art logo.

## Motion
- One orchestrated moment per section: the brass line draws itself once on scroll-in. Staggered text reveals on hero load. No scroll-jacking, no parallax. `prefers-reduced-motion` fallbacks everywhere.
