# Website ↔ Explainer-Video Continuity Audit

Date: 2026-06-15. Source of truth: `/Users/markkirby/Projects/venuebot-website`
(Next.js + GSAP; `src/styles/tokens.css`, `components.css`, per-product `*-hero.css`,
`convert.css`, `care.css`; motion in `src/components/*` + `PageMotion`).

Purpose: identify what the re-created website does, where the videos diverge, and the
specific tweaks that would make the four-video series feel like the same brand surface.
**Audit only — nothing applied until Mark picks the scope.**

---

## 1. What the website's design language actually is

**Type (3 families):**
- **Playfair Display** — editorial headings/quotes. Weight 700, **letter-spacing −0.045em**,
  **line-height 0.98** (h1 `clamp(54–88px)`, h2 `clamp(40–68px)`, h3 34px −0.035em). This tight
  tracking is the site's signature headline texture.
- **Cormorant** (light **300**, italic accents in **Dusty Rose**) — the *dark cinematic* product
  hero headlines only (`--font-cormorant`, e.g. `.ch-headline`). The videos don't use this font.
- **Inter** — body 17px / lead 19px, eyebrows 12px·800·0.18em·uppercase, buttons 14px·800.

**Colour (palette identical to the videos, plus these additions the videos lack):**
- `--ink #2e2a2b` — warm near-black for **body/caption text** (body copy is `rgba(46,42,43,0.78)`).
  The videos use plum `#6A5A60` for most non-headline text → the site reads crisper.
- `--cream #fffaf7` — card base. Videos use a warmer `#FFF6E4`.
- `--line rgba(106,90,96,0.18)` — hairline borders (videos use ~`rgba(81,67,76,0.11)`).
- **`#385941`** — a deep agave-green for primary buttons, text-links, emphasis, calc results.
  No video equivalent.
- Soft tints: `--soft-agave .14`, `--soft-rose .18`, `--soft-peach .45`.

**Depth:** one airy standard shadow `--shadow: 0 24px 60px rgba(46,42,43,0.08)` (ink-based, 8%).
Videos use heavier plum-based shadows (`rgba(81,67,76,0.15–0.16)`).

**Radius scale:** tiles 14–16px · cards 20–24px · big visuals/heroes 28px · final-CTA 32px ·
buttons 6–10px · pills 999px.

**Eyebrow/kicker:** uniformly **agave**, 12px·800·0.18em·uppercase — same on every page
regardless of product accent. Videos use a terracotta `#b1572e` chapter kicker + rose header.

**Two-register structure:** each product page opens on a **dark cinematic hero** (`#0e0b0a`, warm
radial atmosphere, Cormorant-300 headline + rose italic, glass cards with warm halos, glowing
amber nodes `#ffd9a8`), then a **bottom curve** transitions into **light editorial** body sections.
Our videos are light-register throughout.

**Product metaphors (already shared with the videos):**
- Convert hero = channel row → **convergence** → **conversation thread** with rail/nodes → **tour badge**.
  (We independently built channel-grid + phone thread + tour-diary — same story.)
- Care = scattered sources → one **control panel** → conversation context → **pipeline rail** with
  stage dots → follow-up reminders → reporting signals → activity stream. (Gold for Video 4.)
- Studio AI hero = knowledge **input → core → output** engine with breathing nodes.

**Motion vocabulary (GSAP):**
- Reveals: opacity + **22px** fade-up, **0.68s**, **power2.out**, stagger **0.055–0.12s**, fire once.
- Pops (dots/circles/chips): **back.out(1.6–2.5)**, 0.35–0.5s.
- Line/rail draws: **scaleX/scaleY**, 0.95–1.3s, power1/2.inOut.
- Breathing loops (after settle): **sine.inOut**, glow via box-shadow, warm tones for engagement,
  cool tones for knowledge/control; long repeatDelays (2–5.4s) so it's calm, not busy.
- Counters: count-up 1.4s power2.out. CSS UI transitions: 180–220ms ease.

---

## 2. Where the videos diverge today

| # | Aspect | Website | Videos now | Continuity gap |
|---|---|---|---|---|
| A | Headline tracking | Playfair −0.045em / lh 0.98 | Playfair default tracking | **High** — most visible "same brand" lever |
| B | Body/caption colour | ink `#2e2a2b` / 78% | plum `#6A5A60` | **High** — site reads crisper |
| C | Shadows | airy ink 8% | heavier plum 15% | Medium |
| D | Cream base | `#fffaf7` | `#FFF6E4` | Medium |
| E | Hairline border | `rgba(106,90,96,0.18)` | `rgba(81,67,76,0.11)` | Low |
| F | Eyebrow/kicker | agave, uniform | terracotta/rose | Medium — **decision** (unify vs per-product) |
| G | Deep-green action | `#385941` | none | Low (end cards/CTAs only) |
| H | Motion constants | power2.out / back.out / sine.inOut, 22px, set staggers | hand-tuned beziers | Medium — align constants |
| I | Two-register (dark hero → light) | yes | light only | **Decision** — biggest creative lever |
| J | Dot/rail styling | ringed dots, rose→agave gradient rail | per-beat ad hoc | Low — unify kit |

---

## 3. Proposed changes, tiered

### Tier 1 — Token alignment (safe, additive, high payoff). *Recommended.*
1. **Headline tracking**: add `letter-spacing:-0.045em; line-height:1.0` to video Playfair
   headlines (HeadlineReveal, chapter h1, stamp serifs). (A)
2. **Body/caption ink**: introduce `--ink #2e2a2b`; move non-headline Inter (kickers' bodies,
   captions, card sublines, chip labels on light) to ink/`rgba(46,42,43,0.78)`. Headlines stay plum. (B)
3. **Cream + line + shadow**: align `cream→#fffaf7`, `--line→rgba(106,90,96,0.18)`, and add the
   airy ink-based shadow as the default card depth (keep a heavier shadow only on the screen-card
   over busy plates, for separation). (C,D,E)
4. **Deep-green action** `#385941` for end-card CTAs / emphasis where videos have actions. (G)

### Tier 2 — Motion + component kit (medium effort, strong payoff). *Recommended.*
5. Align the shared `reveal`/spring constants to the site curves: 22px fade-up, power2.out
   (`cubic-bezier(0.22,1,0.36,1)`), back.out for pops, sine.inOut for breathing; standard stagger
   0.055–0.12s. (H)
6. Unify dot/rail kit: ringed dots `box-shadow:0 0 0 4px rgba(accent,0.14)`, rose→agave gradient
   rails, uppercase 11px·700·0.12em "when" labels — apply to nurture-timeline, tour-diary,
   channel-grid so they match `cv-cadence` / `care-pipe`. (J)

### Tier 3 — Two-register / dark cinematic hero (creative, needs sign-off). *Decision.*
7. Give each video the site's "open dark → breathe to light" rhythm: a dark `#0e0b0a` Cormorant-300
   chapter open (and/or end card) using each product's web hero metaphor, with the bottom-curve
   transition into the existing light sections. Adds the Cormorant font to the video project.
   Biggest single continuity lever, but a real change to the approved Studio AI/Convert look. (I)

---

## 4. Cross-cutting cautions
- **Chips**: the videos' dark frosted-plum chips were a *deliberate, Mark-approved* choice (he
  rejected pill-style). The site uses soft-tint pills. **Recommend keeping the video chips** rather
  than matching the site here — flag, don't auto-change.
- **Parallel Intro work**: another session is mid-revision on Video 1 (`Intro.tsx`, commits
  `3133bbb`→`66e2c90`). Apply system-level changes via `theme.ts` + a shared continuity CSS block
  (benefits all three videos, low collision); coordinate before touching `Intro.tsx` directly.
- **Re-render + QA**: any approved change re-runs the full Video-2-standard QA on affected sections
  (tsc, qa-sections, full-res still crops, half-scale render, contact sheet) before presenting.

## 4b. APPLIED 2026-06-15 (Mark approved "best improvement, least risk")
Applied via the system layer (`theme.ts`-level token in `styles.css :root` + a
"Website continuity pass" block at the end of `styles.css`; one shared inline
constant in `StudioModuleSection.tsx`). **No `Intro.tsx` edit** — the in-flight
Video 1 inherits the shared changes automatically.
- **A** Playfair tracking −0.038…−0.045em on framework headline surfaces
  (chapter h1, stamp serif lines, closing) + all Convert headline beats + the
  shared `display` stat constant. caps/thin-caps keep their inline positive tracking.
- **B** Warmed shared `--ink` #14201e→#2e2a2b; new `--ink-soft`; applied to Convert
  caption surfaces (callout caps, diary labels, grid headers). Video 2 plum captions
  left as-is (kept blast radius small).
- **C/E** Airier ink-based `--shadow-web` + `--line-web` on Convert glass cards;
  screen-card + phone bezel keep their heavier shadows for plate separation.
- **J** Ringed dots + rose→agave gradient rail on the timeline (matches `cv-cadence`).
Verified: tsc + qa-sections clean; full-res stills across chapter cards, display
stats, timeline, channel grid, clock, and the two bespoke M1 scenes — no clipping,
no Video 2 regression.

**HELD/DEFERRED:** cream swap (1D), global easing constants (2H), deep-green CTA
(1G), and the dark cinematic hero / Cormorant two-register open (Tier 3 — wants its
own pilot on Convert). Per-product kicker accents kept (not unified to agave).
Follow-up: the M1-SC/M1-SD bespoke scene headlines were not tracked in this pass
(framework + Convert only) — a small follow-up if uniformity is wanted.

## 5. Video 4 (Care) forward-note
Care (M3) is the next build (after recordings). Mine `care.css` + `care-hero.css` directly: the
control panel, **pipeline rail** (`care-pipe` stage dots is a ready-made section beat), follow-up
reminders, reporting **sparkline/ring/bars** (`care-cue*`), activity stream, marketing suite, and
the dark Care hero (agave/plum, cool register). Building Care from these gives instant site↔video
continuity for the final product.
