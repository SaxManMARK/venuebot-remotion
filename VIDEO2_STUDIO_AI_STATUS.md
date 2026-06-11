# Video 2: Studio AI — Build Status

Last updated: 2026-06-11 (edit iteration). Everything below is committed and pushed to `main`.

## Edit iteration status

Mark approved the first cut and is reviewing via rendered MP4s (per-section files in `out/`, ~3 min renders each — NOT Studio preview, which is unreliable for media-heavy timelines on this machine). Rounds 1-2 applied: the "2026 polish pass" (frosted-glass card system, non-headline Inter 900 -> 560-680, agave kickers, serif-italic six-tools lead-in, lighter chips, HeadlineReveal true-centering). More edit batches expected before Video 2 sign-off; Convert (M2) and Care (M3) follow. Permissions: `.claude/settings.local.json` carries a broad allowlist + acceptEdits so iteration doesn't prompt.

## Watch it

Start Studio (`npm run studio`) and open:

- **`StudioAI-Full`** — the complete film, ~13m25s: splash → M1-SC overview → modules 01–06 → Studio AI end card → Convert teaser.
- Individual sections for focused review: `StudioAI-M1-SC`, `-SD`, `-SE`, `-SF`, `-SG`, `-SH`, `-SI`.

**Playback rules (learned the hard way):**
- The **full film (`StudioAI-Full`) does not play reliably in Studio in any browser** — 20+ media tracks streamed through the dev server exceeds what a browser will sustain. Watch the full film as an MP4 render (`out/studio-ai-full-draft.mp4`, or re-render with the command at the bottom).
- **Per-section comps play fine in Studio** — use them for scrubbing and giving notes.
- Mark's main Chrome profile additionally strangles media loading generally (suspected Coupert/Privacy Shield extension); a clean-profile instance (`open -na "Google Chrome" --args --user-data-dir=/tmp/chrome-review`) sidesteps it. Incognito does NOT (same process).

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

## QA pass (2026-06-10, pre-review)

A full half-scale render of the film was reviewed end to end before handover:

- **Word-sync verified in the final render** at four points (transcribed the rendered audio and matched it to the on-screen overlay): "Added once / Used everywhere", the purpose chips, the 30–50% stat, the end-card line.
- **All ~220 contact-sheet frames reviewed**; nine issues found and fixed — freezes landing on a blank page-transition, the macOS Finder dialog, or zoomed-out desktop views (SF audit/build/questions, SG research, SH exec, SI recs/control), two clips short for their crossfade tails, and a 0.2s coverage gap that blinked the screen card.
- **Silence map checked**: no dead air at any section join; only the splash, the SC tail, and natural VO pauses exceed 2.8s.
- **`scripts/qa-sections.py`** now audits the configs automatically (clip coverage/overlaps/lengths vs slots, chips inside windows and over live footage, stamps inside duration). Run it after any retiming.

Remaining judgement calls for Mark: the M1-SI discover-modal beat uses the app's own dark modal backdrop (~14–29s in); a faint browser tab-strip edge survives on a few wide shots (zoom kept moderate to protect content); SC→SD handoff has no breathing beat between the six-module slide and the chapter card.

For a shareable MP4: `npx remotion render src/index.ts StudioAI-Full out/studio-ai-full.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --concurrency=1` (long render).
