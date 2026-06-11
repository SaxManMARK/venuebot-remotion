# Handover: Intro (Video 1) design-system retrofit

**Goal:** bring the Intro film up to the approved Video 2 design system — visual updates only.
Do NOT change the Intro's narrative, timings, cue points, or audio. The VO timing anchor stays
`transcripts/m1-sa-sb-v3.*` and `src/data/introCuePoints.ts`.

## What the Intro is

- Comp `VenueBotIntro` (`src/Root.tsx`), component `src/sections/Intro.tsx`, scene system in
  `src/components/PremiumSceneSystem.tsx`, cues in `src/data/introCuePoints.ts`, audio
  `public/audio/intro-m1-sa-sb-v3.mp3`. It pre-dates the design system and has its own
  card/text styling (it does NOT use `StudioModuleSection`).

## The design system to apply (all worked examples in Video 2)

Reference implementations: `src/styles.css` (the "2026 polish pass" layer near the end +
`.studio-sd-chips` + `.studio-spotlight`), `src/sections/StudioModuleSection.tsx`,
`src/sections/StudioAI.tsx` (`HeadlineReveal`).

1. **Typography**: non-headline Inter drops from 900/920 to 540–680. Kickers ~650 with wider
   tracking; card labels 650–660; captions 500–560. Serif headlines (Playfair) unchanged.
   No peach/yellow text on light surfaces (legibility) — kickers in dusty rose `#c08e7c`,
   agave, or plum tones.
2. **Cards** (stat cards, venue shortlist cards, opportunity cards): frosted glass —
   `rgba(255,253,250,~0.8)` gradients, `backdrop-filter: blur(20px) saturate(1.1)`, 1px
   hairline border `rgba(81,67,76,0.11)`, radius 22–24px, layered soft shadows, inset top
   highlight. No opaque cream slabs, no hard accent bars.
3. **Pills/chips**: if the Intro has pill-style labels, restyle to the approved chip: dark
   frosted plum `rgba(56,45,52,0.72)`, porcelain text 540 weight, ONE peach entrance sheen
   (no looping effects — Mark explicitly rejected cycling), gentle breathing glow. Copy the
   `ChipRow` treatment from `StudioModuleSection.tsx`.
4. **Entrances**: rise + de-blur + slight perspective tilt (see journey/tool cards in
   `StudioAI.tsx`); springy, not floaty.
5. **Centring**: any word-by-word reveal must not leave trailing margin on the last word
   (see `HeadlineReveal`); editorial text blocks max-width ~1560px, centred wraps, never
   touching screen edges.

## Rules (hard-won in Video 2 — follow exactly)

- Mark's standing permission applies: proceed + commit + push without asking; nothing
  destructive to source files; never force-push/hard-reset.
- Verify every text/layout change with **full-resolution still crops**, not thumbnails.
- Renders/stills: `--browser-executable="/Applications/Google Chrome.app/Contents/MacOS/
  Google Chrome"`, `--concurrency=1`.
- Review flow: per-section/Studio for notes (`npm run studio`, `VenueBotIntro` comp), full
  film via rendered MP4 (`out/intro-retrofit-v1.mp4`, version filenames on re-renders).
- **Parallel sessions**: Mark runs multiple threads on this one checkout. `git pull` first,
  read the latest commits before assuming state, expect your uncommitted files may get swept
  into another thread's commit — commit small and often. Check `VIDEO3_CONVERT_STATUS.md`
  isn't mid-flight on shared files (`styles.css` is shared!) before editing it — coordinate
  by committing promptly.
- The Intro's venue assets (`public/venues/ravenwood-hall.png` etc.) are approved production
  assets — restyle their card *frames*, never replace the imagery. `laptop-planning-context.png`
  is a storyboard sheet, not a photo plate (never use as background).
- VenueBot is SWAS, never SaaS. No platform mentions.

## Definition of done

Every scene of the Intro reads as the same product family as Video 2 side by side: same glass,
same type weights, same motion language. Render `out/intro-retrofit-v1.mp4` for Mark's
review; iterate on his timecoded notes; approved render becomes the Video 1 master.

---

## Paste this as the first message of the new thread

> In `/Users/markkirby/Projects/venuebot-remotion` (git pull first — parallel sessions are
> active on this checkout): apply the approved Video 2 design system to the Intro video
> (Video 1). Read `INTRO_RETROFIT_HANDOFF.md` in the repo root first — it defines exact
> scope (visual retrofit only, no timing/narrative changes), the design system with worked
> examples, and the workflow rules. Then start Remotion Studio, open `VenueBotIntro`,
> audit each scene against the design system, and work scene by scene with full-res still
> verification. Commit and push as you go.
