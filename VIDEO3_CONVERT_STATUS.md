# Video 3: Convert — Build Status

Last updated: 2026-06-11 (evening). **All four sections built and self-QA'd; full draft render in `out/convert-full-draft.mp4` awaiting Mark's review.** Plan and rules: `VIDEO3_CONVERT_HANDOFF.md`. Nurture cadence source: `NURTURE_SEQUENCE_V3.md`.

## Watch it

- **`Convert-Full`** — the complete film, ~4m07s: Speed to Lead → The Conversation → Every Channel → end card + Care teaser. Watch as MP4 (`out/convert-full-draft.mp4`); per-section comps play fine in Studio.
- Individual sections: `Convert-M2-SK`, `-M2-SN`, `-M2-SO`, `-M2-SQ`.

## Section summary (all transcript-anchored)

| Section | Comp | Length | What's in it |
|---|---|---|---|
| 01 Speed to Lead (SK/SL/SM) | Convert-M2-SK | 81s | Convert wordmark on spoken brand name; after-hours clock beat (22:14 enquiry, racing clock, instant-reply payoff); £10–20k display stat; nurture timeline on the **real V3 cadence** (Day-0 trio, D3–D14 pre-tour, D18–D50 recovery, stage labels, channel-true colours) |
| 02 The Conversation (SN) | Convert-M2-SN | 73s | The Kirby Manor SMS demo in a right-side phone bezel (8 versioned clips, exchange-synced: accommodation/pricing/dog land on their spoken words; "Perfect! 10:00" holds through "It books one."); left-column word-timed callouts; tour-diary beat (Saturday slot drop + couple/team cards); integration chips |
| 03 Every Channel (SO/SP) | Convert-M2-SO | 62s | Four-up channel mockup grid (Website/Facebook/Instagram/WhatsApp) landing word-timed; "Trained on your venue / Around the clock"; 30–50% display stat; "replied first" close |
| 04 End card + T2 (SQ) | Convert-M2-SQ | 31s | Convert lockup + Respond first / Follow up consistently / Win more bookings; Studio AI ↔ Convert recap; **Care teaser with the new Care logo** (public/brand/venuebot-care-logo.png) |

## Architecture added for Convert (framework remains Video 2-compatible)

- `StudioModuleSection` config: optional `product` / `theme` / `plate` / `beats`, and `mode: "phone"` on clips (right-side bezel, source pre-cropped above the input bar to hide the recording cursor). `chapterUntil: 0` suppresses the chapter open for end cards.
- `src/sections/ConvertBeats.tsx` — beat registry: `after-hours-clock`, `nurture-timeline` (cadence data inside mirrors NURTURE_SEQUENCE_V3.md), `side-callouts` (word-timed left-column copy/chips via event labels), `tour-diary`, `channel-grid`.
- All beat timings live in `src/data/convertSections.ts` as `events` (word times); beat components read them by id.
- Convert CSS at the end of `src/styles.css` (`theme-convert` + beat styles).
- `scripts/qa-sections.py`: audits both data files; beats count as coverage; clip regex handles `fit`/`mode` fields.

## Audio facts

- `m2-sk-sm` trimmed at 78.8s (clean), `m2-sn` at 70.6s (clean), **`m2-so-sp` at 58.45s — the source has a real re-take artifact ("No missed. No missed.") at 58.6–59.3, never extend past the trim**, `m2-sq-t2` at 27.95s (clean). All padded `.m4a` in `public/audio/convert/`.

## QA performed per section (Video 2 standard)

tsc + qa-sections clean → full-res still crops of every text moment → half-scale render → contact sheet → silence map vs transcript → mlx-whisper word-sync of rendered audio (all anchors within 0.05s).

## Source material (do not alter)

- `Kirby Manor Chatbot SMS demo video.mp4` (repo root, untracked by design): Mark's SMS walkthrough, the source for the M2-SN proof clips. Bubble timeline: A1 5.4, A2 9.8, A3 17.9, Q4 28.2, A4 31.2, Q5 41.6, A5 43.1, Q6 48.2, A6 49.4, Q7 55.5, A7 57.9, 10:00 sent 65.4, "Perfect!" 67.5.
- VO mp3s in Drive `Convert/Vox/`.

## Known open items

- "10:00 AM.?" typo in the demo's typed message: accepted as authentic user typing (Mark's call if he wants a re-record; clips are versioned drop-ins).
- If Mark later records real captures for M2-SO's four channels, the channel-grid beat swaps for clips without touching the rest.
- Care (Video 4) is out of scope until Video 3 is approved; Care recordings still need capturing.
