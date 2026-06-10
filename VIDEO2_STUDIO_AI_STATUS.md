# Video 2: Studio AI — Build Status

Last updated: 2026-06-10 (overnight build session). Everything below is committed and pushed to `main`.

## Watch it

Start Studio (`npm run studio`) and open:

- **`StudioAI-Full`** — the complete film, ~13m25s: splash → M1-SC overview → modules 01–06 → Studio AI end card → Convert teaser.
- Individual sections for focused review: `StudioAI-M1-SC`, `-SD`, `-SE`, `-SF`, `-SG`, `-SH`, `-SI`.

If audio/video won't play in Studio, fully quit and reopen Chrome first (⌘Q) — a wedged Chrome media process ate an evening once already.

## What was built (all sections recording-led, transcript-anchored)

| Section | Comp | Length | Highlights |
|---|---|---|---|
| M1-SC overview | StudioAI-M1-SC | 57.4s | Pre-existing build + single-row six-module slide, agave icon discs |
| 01 Venue Intelligence | StudioAI-M1-SD | 42s | Chapter open pattern, word-timed chips, "Added once. Used everywhere." stamp |
| 02 Brand Voice | StudioAI-M1-SE | 41s | Four-typographic-voices beat (Historic charm / Effortless luxury / Relaxed & rustic / Modern & minimalist), frozen channel-previews reading moment |
| 03 Nurture Sequences | StudioAI-M1-SF | 168s | Two-part VO; "An enquiry arrives / A brochure gets sent / Then… nothing." open; purpose-label chips; "the ones that stay in touch" close |
| 04 Brochure Analyser | StudioAI-M1-SG | 173.5s | Sofa/partner/shortlist open, eight category chips in two waves, original-vs-rewrite side-by-side, "easier to say yes to" close |
| 05 Website Analyser | StudioAI-M1-SH | 182s | Score-72 reveal, quick wins/medium/strategic chips, radar, giant 30–50% stat, Competitor Intel teaser |
| 06 Competitor Intel | StudioAI-M1-SI | 141s | Discovery modal, gap analysis (leading/competitive/falling behind), M1-SJ logo end card, T1 "Convert closes it" |

## Architecture (for future edits)

- `src/sections/StudioModuleSection.tsx` — the reusable framework: chapter open → editorial screen card playing pre-trimmed proof clips with crossfades → word-timed chip rows → editorial stamps (5 type variants incl. oversized `display`, optional logo) → closing line. Coverage gaps in clips automatically become full-frame editorial beats.
- `src/data/studioAiSections.ts` — one config per module; **every `at`/`from` time is VO-relative seconds taken from `transcripts/<slug>.words.csv`**. To retime anything, look up the word, change the number.
- `src/sections/StudioAIFull.tsx` — the master Series.
- Proof clips: `public/proof/studio-ai/m1-s[d-i]-*.mp4` — pre-trimmed 30fps re-encodes (never seek the long ScreenStudio sources at runtime; Studio hangs). `zoom` in config crops the macOS desktop out of wide shots. Recut recipes are in the session git history.
- Audio: `public/audio/studio-ai/m1-s*-tail.m4a`, apad-padded to each section duration. Three source VOs had Whisper-hallucinated tails and are trimmed (SF-A at 65.9s, SG-B at 73.5s, SH at 179.4s).

## Known rough edges / morning review list

1. **Watch the full film end to end with sound** — stills were verified throughout, but pacing of crossfades and chip timing deserve a real-time pass.
2. Some wide shots retain a faint browser tab-strip edge at the top (kept zoom moderate to avoid over-cropping content).
3. M1-SF "happy path" beat reuses wide stage footage at high zoom (1.5) — check legibility in motion.
4. The discover-competitors modal beat (M1-SI ~14–29s) has the app's own dark modal backdrop — looks intentional but check it feels on-brand.
5. SC→SD handoff: SC ends on the six-module slide, SD opens with its chapter card — consider whether a beat of breathing room is wanted.
6. No MP4 rendered (Mark reviews live in Studio). For a shareable file: `npx remotion render src/index.ts StudioAI-Full out/studio-ai-full.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1` (expect a long render).
