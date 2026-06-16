# Handover: Video 4 — Care (M3)

Paste-ready opening prompt is at the bottom. Read this top to bottom before writing code.
Videos 1 (Intro), 2 (Studio AI), 3 (Convert) are **complete, consistent, and signed off**;
finals live in `out/FINAL/`. Care is the last video.

---

## 1. Where things stand
- Care VO is recorded, transcribed (`transcripts/m3-*`), ~6.5 min total. **No screen recordings
  exist yet** — Mark is creating the ScreenStudio walkthrough content to drop in later.
- The reusable framework (`StudioModuleSection` + `ConvertBeats` bespoke beats) and the full
  Convert build are the model. Care is built the same way: editorial sections now, recording-led
  sections slotted in when Mark's captures arrive.
- **The re-created website (`/Users/markkirby/Projects/venuebot-website`) is the design source of
  truth** and its Care page (`src/styles/care.css`, `care-hero.css`) is an almost 1:1 visual
  vocabulary for this video — see §5. `WEBSITE_CONTINUITY_AUDIT.md` records the shared design system
  already applied to Videos 1–3 (tight Playfair tracking, warm `--ink`, opaque-frosted cards / no
  live `backdrop-filter`, ringed dots + rose→agave rails). **Care must match that system.**

## 2. Non-negotiables (carried from Videos 1–3)
- VenueBot is **SWAS — Software With A Service**. Never "SaaS".
- **Never mention the underlying white-labelled platform (HighLevel)** on screen or in copy.
- **Care identity = Control = Smoky Plum (`#6A5A60`)**, leaning agave + plum, with dusty rose / peach
  used *sparingly* for warmth (mirror `care.css`). Use a `theme-care` accent the way Convert used
  `theme-convert` (dusty rose/peach). Care logo: `public/brand/venuebot-care-logo.png`.
- Word-level transcripts are the timing anchor for every visual.
- **Demo-data hygiene is CRITICAL for Care** — it's a CRM, so recordings will show dashboards,
  inboxes, and contact records that may contain REAL couples' names / emails / phone numbers.
  Everything on screen must be the demo venue **Kirby Manor (Sevenoaks, Kent)** or patched. Tell
  Mark to record against demo data; audit every captured frame at full res (Video 2 caught leaked
  "Titchwell Manor"/"Eric Snaith").
- **Cards: opaque frosted panels, NOT live `backdrop-filter`** (the playback-flicker fix from
  Convert/Video 2 — opaque base + `backdrop-filter: none`). Don't reintroduce live blur over the
  drifting plate/motes.

## 3. Framework reuse (same as Convert)
- `src/sections/StudioModuleSection.tsx` — config-driven section (chapter open → screen card with
  clip sequencing → word-timed chips → editorial stamps → closing line). Optional fields already
  exist: `product`, `theme`, `plate`, `beats`, clip `mode:"phone"`, `chapterUntil:0` (suppress
  chapter open on end cards).
- `src/sections/ConvertBeats.tsx` — bespoke animated beats registry (`after-hours-clock`,
  `nurture-timeline`, `side-callouts`, `tour-diary`, `channel-grid`). **Add Care beats here** (or a
  parallel `CareBeats.tsx`) and extend the `SectionBeat["type"]` union in `StudioModuleSection.tsx`.
- `src/data/convertSections.ts` — worked examples; copy structure to **`src/data/careSections.ts`**.
- `src/sections/ConvertFull.tsx` — master Series pattern; copy to **`CareFull.tsx`**.
- Register comps in `src/Root.tsx` (`Care-M3-SR` etc., `Care-Full` master).
- `scripts/qa-sections.py` already audits `convertSections.ts`; extend it to read `careSections.ts`
  and add Care comps' regex (it currently matches `m\dS\w+` config names — `m3S*` will match).
- Theme CSS goes at the END of `src/styles.css` (a `theme-care` block + Care beat styles), same as
  `theme-convert`.

## 4. The build plan — section map (VO files → sections)

| VO file (slug) | Dur | Sections | Recording? | Build now? |
|---|---|---|---|---|
| `m3-sr-sv` | 109.2s (trim ~108.8, see §7) | **M3-SR cold open** (0–~37s) + SS dashboards + ST inbox + SU contacts + SV calendars | SR editorial; SS–SV ScreenStudio | **SR yes**; SS–SV scaffold, await clips |
| `m3-sw-sx` | 77.6s | M3-SW Opportunities (kanban) + M3-SX Automations | ScreenStudio | await clips |
| `m3-sy-sz` | 63.0s (filename has trailing space!) | M3-SY Marketing suite + M3-SZ Reputation | ScreenStudio | await clips |
| `m3-saa` | 41.8s | M3-SAA Ask AI | ScreenStudio (mobile) | await clips |
| `m3-sab-scc` | 76.1s | **M3-SAB** evolving (0–24s) + **M3-SBB** white-glove (24.8–46.7) + **M3-SCC** no-limits (47.8–end) | SAB/SCC editorial; SBB footage-or-editorial | **SAB, SCC yes; SBB editorial fallback** |
| `m3-sdd` | 23.7s | **M3-SDD** final close | editorial (logo lockup) | **yes** |

**BUILD NOW (recording-free, do these in order):**
1. **M3-SR cold open** — "a few enquiries, a few spreadsheets, a shared inbox… email here, WhatsApp
   there, Facebook… notes in a spreadsheet, bookings in a diary… nobody knows where everything
   lives. Care brings it all together. One system, one team, one source of truth." → a bespoke
   **scattered-sources-collapse-into-one-platform** beat. This is the website's `care-scatter` →
   `care-panel` exactly (see §5). Strongest opener; fully motion-design.
2. **M3-SDD final close** (23.7s) — "Studio AI brings more couples… Convert turns enquiries into
   tours… Care gives your team one place… Three modules, one platform, one goal, more bookings.
   VenueBot. Stop losing enquiries, start booking more tours." → all-three-product logo lockup
   (`venuebot-studio-ai-logo.png`, `venuebot-convert-logo.png`, `venuebot-care-logo.png`) +
   tagline. Series closer.
3. **M3-SAB** evolving + **M3-SCC** no-limits — editorial: feature-shipping cadence; "unlimited
   users/records/conversations", "99% of tools you already use" integrations grid.
4. **M3-SBB white-glove** — "we build it, customise it, install it, maintain it, improve it… done
   with you, done for you." Build editorially (word-timed chips of the five verbs + stamps) as the
   default; Mark may supply team/install footage to drop in.

**AWAIT RECORDINGS (scaffold configs with clip slots, time when captures arrive):** M3-SS, ST, SU,
SV, SW, SX, SY, SZ, SAA. The editorial framing (chapter cards, stamps, chip rows) can be pre-written;
just don't finalise clip `at`/`until` until the recordings exist.

## 5. Website Care vocabulary → Care video beats (mine `care.css` / `care-hero.css`)
- `care-scatter` (rotated source cards: Email/WhatsApp/Facebook/Instagram/spreadsheet/diary) →
  **M3-SR** chaos state.
- `care-panel` / `care-op` / `care-tilegrid` (one calm control panel) → **M3-SR** resolution.
- `care-pipe` (pipeline rail, stage dots: done/active) → **M3-SW** Opportunities framing.
- `care-convo` / `care-ctx` (conversation context, channel chips, state pills) → **M3-ST** Inbox.
- `care-report` + `care-cue*` (sparkline / progress ring / bars / step dots) → **M3-SS** dashboards,
  **M3-SZ** reputation.
- `care-activity` (weekly stream) → dashboards / activity.
- `care-followups` / `care-reminder` (overdue/scheduled left-accent cards) → follow-up beats.
- `care-mkt-stack` / `care-suite` (one connected suite) → **M3-SY** marketing.
- `care-control` / `care-cue-chip` / `care-owner-chip` (human-in-control cue) → **M3-SAA** / control.
- `care-hero.css` dark cinematic (cool agave/plum register, Cormorant headline + accent) → optional
  dark open for **M3-SR** / close for **M3-SDD** (Tier-3 dark-hero idea is still deferred series-wide;
  check with Mark before introducing the dark register here).

## 6. Workflow that got Videos 2–3 approved (follow exactly)
Map VO from `transcripts/<slug>.cue.md` + `.words.csv` → cut pre-trimmed 30fps proof clips with the
venv ffmpeg into `public/proof/care/` (audio into `public/audio/care/`, `apad` to section duration)
→ write the section config (every `at`/`from` a transcript word time) → register comp in `Root.tsx`
→ `npx tsc --noEmit` → `python3 scripts/qa-sections.py` → full-res still crops of every text moment
→ half-scale render + contact sheet + silence map + mlx-whisper word-sync of the render.
Permissions: `.claude/settings.json` allows `npx tsc --noEmit`, `.venv-whisper/bin/ffprobe *`,
`python3 scripts/qa-sections.py`; broad allowlist + acceptEdits in `.claude/settings.local.json`.
Commit + push after each accepted change; **pull first** (Mark runs parallel sessions on this
checkout). Renders need system Chrome (`--browser-executable=…Google Chrome`) + `--concurrency=1`.

## 7. Audio facts / gotchas
- **`m3-sr-sv` has a Whisper hallucination tail** ("no leaving, no leaving…" repeated at ~1:48.7).
  Real speech ends ~108.8s — trim there. **Always tail-audit with `silencedetect noise=-40dB:d=0.15`
  on the source and trim from measured speech end, never from Whisper word-ends** (this rule cost a
  review round on Convert; Whisper also hallucinates over silent tails).
- **`Vox M3-SY-SZ .mp3` has a trailing space in the filename** — quote it.
- Section audio = trim source at measured speech end, `apad=whole_dur=N` to the section length,
  encode `.m4a`. Version any recut file (`-v2`) and delete orphans.

## 8. Open questions for Mark (ask day one)
1. ScreenStudio recordings for M3-SS…M3-SAA — when? Capture against **Kirby Manor demo data only**
   (CRM = real-PII risk). Confirm resolution/aspect so clips crop cleanly (Convert used
   `crop=…`+`fit:"contain"` for chrome).
2. **M3-SBB white-glove**: supply team/install footage, or build editorially? (Editorial fallback is
   ready in the plan.)
3. Any dark cinematic open/close for Care (the deferred series-wide Tier-3 dark-hero), or keep the
   light editorial register like Convert? Recommend matching Convert (light) unless Mark wants the
   dark hero piloted.

---

## Paste this as the first message of the new thread

> Continuing the VenueBot explainer series in `/Users/markkirby/Projects/venuebot-remotion` (all on
> `main`). Videos 1–3 (Intro, Studio AI, Convert) are complete, consistent, and final in
> `out/FINAL/`. We're now building **Video 4: Care (M3)**. Read `VIDEO4_CARE_HANDOFF.md` first — it
> has the section map, what's buildable now vs awaiting my ScreenStudio recordings, the website Care
> visual vocabulary to mirror, the framework reuse, and the workflow/audio rules. Also skim
> `src/data/convertSections.ts` + `src/sections/ConvertBeats.tsx` (worked examples), the website Care
> styles at `/Users/markkirby/Projects/venuebot-website/src/styles/care.css` + `care-hero.css`, and
> the project memory. Then: (1) start Remotion Studio, (2) build the recording-free sections in
> order — **M3-SR cold open** (scattered-tools-collapse-into-one-platform, the `care-scatter`→
> `care-panel` story), then **M3-SDD** final close (three-product logo lockup), then **M3-SAB /
> M3-SCC** (evolving / no-limits), then **M3-SBB** editorially — all in the approved design system
> with the Care smoky-plum accent and opaque (non-`backdrop-filter`) cards, and (3) scaffold the
> recording-led sections (SS–SAA) as configs awaiting my clips. I'll be recording the screen content
> in parallel.
