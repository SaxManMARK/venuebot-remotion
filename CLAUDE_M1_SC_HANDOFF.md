# Claude Handoff: VenueBot Video 2, Studio AI, M1-SC

Production workspace:

`/Users/markkirby/Projects/venuebot-remotion`

This local project is the source of truth. Do not edit the Google Drive Remotion folder unless Mark explicitly asks. Google Drive and Dropbox asset folders are reference/raw asset sources only.

## Current Objective

Continue polishing VenueBot Video 2: Studio AI, section `M1-SC` only.

Do not build `M1-SD` or later.

## Non-Negotiables

- VenueBot is SWAS: Software With A Service. Do not call it SaaS.
- Do not mention the underlying white-labelled platform.
- Keep the approved VenueBot splash.
- Use the Studio AI logo beneath VenueBot only for the Studio AI splash.
- Voiceover/transcription timings are the timing anchor.
- Product reveal must happen on "Studio AI analyses..." at `00:31.0` into the voiceover, which is `00:35.0` on the full standalone timeline after the 4-second splash.
- The Screen Studio proof source starts from `00:10` inside the recording. The production build now uses a pre-trimmed 3-second clip made from that source point to avoid Remotion Studio hangs.
- M1-SC story order: Knowledge -> Research -> Modern couple behaviour -> Venue understanding -> Studio AI -> Product proof.
- Visual direction: warm, premium, editorial, hospitality-led, wedding-specific. Avoid dark tech, generic SaaS, and presentation-deck energy.

## Important Files

- Main component: `src/sections/StudioAI.tsx`
- Timing/data: `src/data/studioAi.ts`
- Composition registration: `src/Root.tsx`
- Shared splash: `src/components/VenueBotSplash.tsx`
- Main styling: `src/styles.css`
- M1-SC transcript/cues:
  - `transcripts/m1-sc.transcript.json`
  - `transcripts/m1-sc.cue.md`
  - `transcripts/m1-sc.words.csv`
  - `transcripts/m1-sc.manual-cue.md`

## Current Composition

Composition IDs:

- `StudioAI`
- `StudioAI-M1-SC`

Current duration is transcript-aligned:

- 4-second splash
- 53.4 seconds Studio AI content
- Total standalone duration: 57.4 seconds

Audio asset:

`public/audio/studio-ai/m1-sc-transcript-tail.m4a`

This file is derived from `public/audio/studio-ai/m1-sc.mp3` and includes a clean silent tail after the last transcript word. Do not use ffprobe guesses as the authority; use the OpenAI transcript/cue files.

## Key Voiceover Cues

Voiceover starts after the 4-second splash.

- `00:00.0-00:11.6` voiceover / `00:04.0-00:15.6` full timeline: knowledge/research foundation.
- Source/logo sequence starts around `00:13.4` voiceover / `00:17.4` full timeline.
- `120+` sources should appear only around three seconds before the source/logo sequence, not over the early intro messaging.
- Product reveal starts on `Studio AI analyses...` at `00:31.0` voiceover / `00:35.0` full timeline.
- Final spoken word `weddings` ends at `00:50.18` voiceover / `00:54.18` full timeline.
- Audio/timeline now runs to `00:53.40` voiceover / `00:57.40` full timeline for a clean tail.

## Current Visual Structure

1. Splash:
   - Approved VenueBot splash.
   - Studio AI logo appears beneath VenueBot using `public/brand/venuebot-studio-ai-logo.png`.

2. Intelligence Layer:
   - Top-right white VenueBot Studio AI logo:
     - `public/brand/venuebot-studio-ai-logo-white.png`
     - Size: `37.5vw`.
   - Old "Knowledge before action" box has been removed.
   - Four bottom cards:
     - `120` / `published sources`
     - `Customer` / `behaviour data`
     - `Conversion` / `best practice`
     - `Customer` / `journey research`
   - Cards use a stronger 3D entrance, stagger, glow pulse, and sweep.

3. Research Foundation:
   - `120+` and source/logo board.
   - Source logos include Bridebook, Hitched, Google, Salesforce, HubSpot, Harvard Business Review, and VenueBot benchmark research.

4. Modern Couple Behaviour:
   - Separate slide focused on journey cards:
     - Discover
     - Shortlist
     - Compare
     - Decide
     - Enquire

5. Five Areas Of Intelligence:
   - Separate slide with larger feature cards:
     - Venue Intelligence
     - Brand Voice
     - Nurture Journeys
     - Content Performance
     - Market Intelligence

6. Product Proof:
   - Screen Studio proof is only a short 3-second proof beat.
   - Uses:
     - `public/proof/studio-ai/m1-sc-dashboard-venue-intelligence-proof-10s-3s.mp4`
   - This was created from `00:10` into:
     - `public/proof/studio-ai/m1-sc-dashboard-venue-intelligence.mp4`

7. Six Modules:
   - Two rows of three cards.
   - Bigger module cards with stronger presence.

## Assets Added For M1-SC

- `public/audio/studio-ai/m1-sc.mp3`
- `public/audio/studio-ai/m1-sc-transcript-tail.m4a`
- `public/brand/venuebot-studio-ai-logo.png`
- `public/brand/venuebot-studio-ai-logo-white.png`
- `public/logos/research-sources/*`
- `public/plates/studio-ai/cinematic-manor-lake.png`
- `public/plates/studio-ai/couple-planning-table.png`
- `public/plates/studio-ai/laptop-planning-context.png`
- `public/proof/studio-ai/m1-sc-dashboard-venue-intelligence.mp4`
- `public/proof/studio-ai/m1-sc-dashboard-venue-intelligence-proof-10s-3s.mp4`

## Validation Commands

Run from:

`/Users/markkirby/Projects/venuebot-remotion`

```bash
npx tsc --noEmit
git diff --check
npx remotion bundle src/index.ts /tmp/venuebot-remotion-m1sc-bundle-check
```

Preview locally:

```bash
npm run studio
```

The Codex sandbox has previously failed to render stills/MP4 because macOS blocks the headless Chromium process. Use normal macOS Terminal for Remotion Studio/renders.

## Recent Issues Fixed

- 43-second Studio hang:
  - Fixed by pre-trimming/re-encoding the 3-second proof clip instead of seeking into the long Screen Studio recording during playback.

- Final audio clipped:
  - Fixed by deriving `m1-sc-transcript-tail.m4a` from the transcript timing and adding a clean silent tail.
  - Do not shorten the composition below the transcript-aligned duration.

- Cards not visibly animating:
  - Increased card entrance depth, rotation, stagger, and added sweep/glow pulse.

## Session Update — 2026-06-09 (read this for current state)

All of the following is committed and pushed to `main` (repo `SaxManMARK/venuebot-remotion`; `main` is the default/trunk branch):

- "120+" research stat now counts up before the source logos appear.
- Traveling warm light pulses flow along the knowledge thread and intelligence connector.
- Card entrances use a spring-overshoot pop plus a light sweep/glow on landing (`.studio-spark`).
- Ambient warm "fireflies" light motes drift behind the editorial content (`LightMotes`).
- Editorial headlines reveal word-by-word — fade + un-blur + slide up — via `HeadlineReveal`. Reveal spans carry `.studio-rw` so they inherit the headline type, not the kicker styling.
- The six-module slide was rebuilt for legibility: solid tiles, terracotta top accent bar, bigger/bolder icons (thicker strokes) and labels, accent numbers, calmer background plate.
- Intelligence-layer cards reworded to "Couple / behaviour data" and "Venue / journey research".
- Fixed: `laptop-planning-context.png` is the M1-SC storyboard sheet (not a photo); `planningContext` now points at `couple-planning-table.png`.

Important: `remotion-bits` is intentionally NOT a dependency — its npm barrel pulls a broken `Scene3D` module that crashes `remotion bundle`. The two effects we wanted from it (word-blur reveal, fireflies) are hand-rolled in `src/sections/StudioAI.tsx`.

Tooling: `gh` is installed (`~/.local/bin/gh`) and authenticated. Mark reviews via Remotion Studio (hot-reload), not MP4s — start it with `npm run studio` and open `http://localhost:3000/StudioAI-M1-SC`. Renders need system Chrome + `--concurrency=1` (see the memory note `remotion-render-gotchas`).

Open follow-ups (optional, Mark's call): agave-green icon discs on the module slide; single-row-of-six module layout. Scope stays M1-SC only.

## Suggested Next Claude Task

Continue visual polish on M1-SC only. Use the transcript cues as timing anchors. Do not alter the splash or product reveal timing unless Mark explicitly requests it. Focus on making motion more captivating while keeping the look premium, warm, editorial, and hospitality-led.
