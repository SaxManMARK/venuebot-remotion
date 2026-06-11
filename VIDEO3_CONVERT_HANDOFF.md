# Handover: Video 3 (Convert) & Video 4 (Care)

**Paste-ready opening for the new thread is at the bottom of this file.**

This document lets a fresh Claude thread continue the VenueBot explainer series with full
continuity from Video 2 (Studio AI), which is approved and complete. Read this top to bottom
before writing any code.

---

## 1. Context — where the project stands

- The series is four videos: 1 Intro (built, pre-dates the current design system), **2 Studio AI
  (APPROVED — the reference standard)**, 3 Convert, 4 Care.
- Video 2 lives in this repo as `StudioAI-Full` (~13.5 min master) plus per-section comps
  (`StudioAI-M1-SC` … `-M1-SI`). Mark approved every section individually on 2026-06-11.
  Final approved render: `out/studio-ai-full-v2.mp4`.
- Mark reviews **live in Remotion Studio per-section** (`npm run studio`, port 3000) and gives
  timecoded notes in batches. Full-film watching is done via rendered MP4s (Studio cannot
  stream the master comp reliably). If Studio won't play media at all, reboot the Mac —
  known machine quirk.
- Mark has granted standing permission to proceed without asking (see
  `.claude/settings.local.json`) **except anything destructive to source files**. Commit and
  push to `main` after every accepted change. Never force-push or hard-reset.

## 2. Non-negotiables (carried from Videos 1–2)

- VenueBot is **SWAS — Software With A Service**. Never "SaaS".
- Never mention the underlying white-labelled platform (HighLevel) on screen or in copy.
  The recorded VO for nurture-export says "VenueBot Care CRM, HubSpot, ActiveCampaign,
  MailChimp" — recorded VO always wins over the tracker's script text.
- **The word-level transcripts are the timing anchor for every visual.** Transcripts for all
  M2/M3 VO files already exist in `transcripts/` (slug = lowercased VO id).
- Brand: Agave `#7C918A`, Dusty Rose `#D5A798`, Smoky Plum `#6A5A60`, Peach `#FFE6B4`,
  Porcelain `#F4F0ED`. Playfair Display headings, Inter body. Identities: Studio AI =
  Knowledge (agave), **Convert = Engagement (dusty rose + peach)**, **Care = Control (smoky
  plum)** — use these as each video's accent tone the way Studio AI used agave.
- Look: warm, premium, editorial, hospitality-led. No dark-tech, no neon, no generic SaaS.
- Demo-data hygiene: the demo venue is **Kirby Manor (Sevenoaks, Kent)**. Watch recordings
  for leaked real-client text (Video 2 caught "Titchwell Manor" / "Eric Snaith") — patch with
  background-matched drawbox on static frames, or reframe.

## 3. Repo map (everything consolidated, nothing stray)

| Path | What |
|---|---|
| `src/sections/StudioModuleSection.tsx` | **The reusable section framework** — build M2/M3 sections as configs for this, extending it where needed. Features: chapter open, editorial screen card with clip sequencing + crossfades, per-clip `zoom`/`origin`/`fit`, word-timed chip rows, editorial stamps (5 type variants, `display` stat size, logo and image lines), spotlights (dim + glow ring on a screen region), closing line. |
| `src/data/studioAiSections.ts` | Video 2 section configs — **the worked examples of every pattern**. Copy the structure for `src/data/convertSections.ts`. |
| `src/sections/StudioAIFull.tsx` | Master-comp pattern (Series of sections). |
| `src/sections/StudioAI.tsx` | M1-SC bespoke build; exports shared `HeadlineReveal`, `LightMotes`, `reveal`, `drift`. Also the model for **slide-led editorial sections** — Convert has several (see §5). |
| `src/styles.css` | Design system. The authoritative layer is the final "2026 polish pass" block + chip/spotlight styles at the end. Non-headline Inter stays 540–680 weight. |
| `public/audio/<video>/`, `public/proof/<video>/`, `public/brand/`, `public/plates/` | Assets by type. Use `convert/` and `care/` subfolders for new sections. Convert logo: `public/brand/venuebot-convert-logo.png`. |
| `transcripts/` | Word-level timings for ALL VO files, including M2/M3. `.words.csv` for exact word times, `.cue.md` for human reading. |
| `scripts/qa-sections.py` | Automated config audit — run after every timing change. Extend its section regex (`m1S\w+`) to match new config names. |
| `scripts/transcribe-local.py` | Local re-transcription if new VO arrives (`.venv-whisper/bin/python`, no API key). |
| `PRODUCTION_TRACKER.md` | Repo snapshot of the production sheet: section IDs, visual plans, VO scripts. |
| `VIDEO2_STUDIO_AI_STATUS.md` | Video 2 status + QA history. |

## 4. The production workflow that got Video 2 approved (follow it exactly)

1. **Map the VO**: read `transcripts/<slug>.cue.md` segments; pull exact word times from
   `.words.csv`. Plan beats: which moments are recording-led, which are editorial
   typographic stamps, which need chips.
2. **Cut proof clips** with the venv ffmpeg (`.venv-whisper/bin/ffmpeg`): pre-trimmed 30fps
   re-encodes into `public/proof/<video>/` (`-an -r 30 -c:v libx264 -crf 18 -preset medium
   -movflags +faststart`, `tpad=stop_mode=clone` to extend freezes). **Never seek long source
   files at runtime** — Studio hangs.
3. **Write the section config**, every `at`/`from` a transcript word time.
4. **Register the comp** in `src/Root.tsx`; `npx tsc --noEmit`; run `scripts/qa-sections.py`.
5. **Verify with stills** before presenting: `npx remotion still ... --browser-executable=
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"`.

### Hard-won rules — violating these cost real review rounds
- **Verify on-screen text at FULL resolution** (crop the still with ffmpeg and read it).
  480px thumbnails hid a clipped word for three rounds.
- **Version clip filenames on every recut** (`-v2`, `-v3`): replacing a file under the same
  name leaves Mark's browser playing stale video. Delete orphaned versions after.
- **Spotlights/fixed overlays only over static freeze frames.** ScreenStudio recordings zoom
  in/out mid-take; a fixed glow over moving footage drifts. Sample candidate freeze frames
  first (motion blur lives in the zoom transitions).
- **Crop browser chrome**: via `zoom`/`origin` when content allows, or pre-crop in ffmpeg
  (`crop=1664:912:0:168` removed full chrome on 1664×1080 sources) + `fit: "contain"` when a
  full-width statement can't survive zooming.
- Renders/stills need system Chrome (`--browser-executable`) and `--concurrency=1` on this Mac.
- Audio: pad VO to section duration with `apad=whole_dur=N` → `.m4a`. Three M1 VOs had
  Whisper-hallucinated tails (trimmed with `atrim`); check new transcripts for nonsense tails
  before trusting their durations.

### Mark's review-taste profile (saves rounds)
"2026 not 1990s." Frosted glass, hairline borders, light Inter below H1. Hates button-like
pills and looping effects (chips got ONE peach entrance sheen — he rejected cycling). Loves:
word-timed chips, typographic stamp beats, spotlights on the exact statement the VO mentions,
wordmarks landing on their own line timed to the spoken brand name. He'll ask for elements to
be bigger/centred/more visible — check optical centring and contrast before presenting.

## 5. Video 3: Convert — the actual build plan

VO is recorded, transcribed, and ready. **Total ≈ 4 minutes.** Structure (from
`PRODUCTION_TRACKER.md` + transcripts):

| VO file (transcripts slug) | Covers | Length | Visual plan (tracker) |
|---|---|---|---|
| `m2-sk-sm` | M2-SK cold open → M2-SL speed-to-lead → M2-SM 50-day journey | 78.1s | Jitter-style: Convert title card; out-of-hours clock with 22:14 enquiry; 50-day timeline with channel icons |
| `m2-sn` | M2-SN conversation experience | 70.1s | WhatsApp thread playing out + diary booking moment |
| `m2-so-sp` | M2-SO AI everywhere → M2-SP outcome | 59.3s | Four-up split (website/FB/IG/WhatsApp); 30–50% stat card |
| `m2-sq-t2` | M2-SQ end card → T2 transition to Care | 27.8s | Convert logo lockup; Care teaser |

**Critical asset status:** `Convert/Screen Shot Vids/` and `Convert/Assets/` in Drive are
**EMPTY** (checked 2026-06-11). The production tracker has Drive links in some M2 rows that
may not be synced. Consequences:
- M2-SK, SL, SM, SP, SQ, T2 are **editorial/motion-design sections** — buildable now with the
  framework's stamps/chips plus bespoke animated beats (clock, timeline). Model them on the
  M1-SC slide-led style and the stamp system. Use dusty rose/peach as the accent.
- M2-SN (WhatsApp conversation) and M2-SO (four-up split) are screen-proof sections — **ask
  Mark on day one** whether recordings exist behind the tracker's Drive links or need
  capturing. Build the editorial sections first while waiting; don't block.
- End card: `public/brand/venuebot-convert-logo.png` (already in repo). A Care logo will be
  needed for T2/Video 4 — ask Mark.

**Suggested comp naming:** `Convert-M2-SK` etc., `Convert-Full` master, configs in
`src/data/convertSections.ts`, chapter kicker "Convert · Module 0N" mirroring Studio AI.

## 6. Video 4: Care — known constraints (don't start it, but plan around it)

`m3-*` transcripts all exist (≈ 6.5 min total VO). **No recordings at all in Drive** — Care is
walkthrough-heavy (dashboards, unified inbox, contacts, calendars, pipeline, automations,
marketing suite, reputation, Ask AI), so **Mark must record ScreenStudio captures before Care
can be built recording-led**. Raise this at the START of the Convert thread so recording
happens in parallel. M3-SBB also calls for team/install footage (stock or real) — flag it.

## 7. After Convert+Care: remaining series work

- **Intro retrofit**: apply the Video 2 design system (glass cards, Inter weights, plum chips,
  spotlights, centred HeadlineReveal) to `src/sections/Intro.tsx`. Logged in memory.
- **T1 placement check**: Studio AI's master ends with the T1 "Convert closes it" teaser —
  when assembling the full four-video film, confirm joins between videos feel continuous.
- Master assembly of all four videos if Mark wants a single film.

## 8. Verification standard before presenting anything to Mark

tsc clean → `qa-sections.py` clean → full-res still crops of every text moment → for new
sections, a half-scale QA render reviewed via contact sheets + silence map + 2–3 word-sync
spot checks (transcribe rendered audio with mlx-whisper, match against the frame). Video 2's
QA found nine real issues this way before Mark ever saw it.

---

## Paste this as the first message of the new thread

> Continuing the VenueBot explainer series in `/Users/markkirby/Projects/venuebot-remotion`
> (source of truth, all committed to `main`). Video 2 (Studio AI) is approved and done.
> We're now building **Video 3: Convert (M2)**. Before doing anything, read
> `VIDEO3_CONVERT_HANDOFF.md` in the repo root — it has full context, the build plan, the
> design system, the workflow rules, and Mark's review preferences. Also skim
> `PRODUCTION_TRACKER.md` (M2 rows), `src/data/studioAiSections.ts` (worked examples), and
> the project memory. Then: (1) start Remotion Studio, (2) confirm with me which M2
> recordings exist for the conversation (M2-SN) and four-up (M2-SO) sections, and (3) begin
> building the editorial sections (M2-SK/SL/SM) recording-free, transcript-anchored, in the
> approved Video 2 style with the Convert dusty-rose/peach accent.
