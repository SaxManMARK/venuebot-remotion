# Video 3: Convert — Build Status

Last updated: 2026-06-11. Build started. Full plan and rules: `VIDEO3_CONVERT_HANDOFF.md`.

## Section status

| Section | Comp | VO (transcripts slug) | Length | Status |
|---|---|---|---|---|
| M2-SK cold open + M2-SL speed-to-lead + M2-SM 50-day journey | `Convert-M2-SK` | `m2-sk-sm` | 81s | **Built, self-QA'd, awaiting Mark's review** |
| M2-SN conversation experience | – | `m2-sn` | 70.1s | Not started. Screen-proof section: **waiting on Mark to confirm whether recordings exist** (Drive `Convert/Screen Shot Vids/` was empty 2026-06-11) |
| M2-SO AI everywhere + M2-SP outcome | – | `m2-so-sp` | 59.3s | Not started. M2-SO needs the four-up recordings question answered; M2-SP (30–50% stat) is editorial and buildable |
| M2-SQ end card + T2 Care teaser | – | `m2-sq-t2` | 27.8s | Not started, fully editorial, buildable now. Care logo needed for T2 (ask Mark) |

## What M2-SK contains (all transcript-anchored, fully editorial, no recordings)

- Chapter open: "Convert · Module 01 — Speed to Lead", dusty-rose theme (`theme-convert`), after-hours plate (`plates/venuebot-after-hours.png`).
- Stamp beats: "Not always the best venue / The one that responds first / THE FIRST RESPONSE WINS THE TOUR"; Convert wordmark lands on its own line on the spoken "VenueBot Convert" (17.1s); "reality is very different"; "Follow up once. Maybe twice."; £10,000–£20,000 display stat.
- **After-hours clock beat** (26.5–47.2s): Saturday 22:14 enquiry notification (Emma & James · September 2027), six word-timed chips (Evenings → Away from the office), the clock racing to 04:09 with a "still waiting" bar, then the Convert payoff: snap back to 22:14, "Replied · 22:14, Seconds later" peach card.
- **Nurture timeline beat** (60.4–78.6s): "Every enquiry, nurtured for 50+ days" stat, Day 1 → Day 50+ rail drawing on, channel-coloured nodes, Email/SMS/WhatsApp legend pills landing on their spoken words, "Not repetitive reminders." → "Timely, relevant conversations." crossfade.
- Closing line: "Momentum, moving towards a tour." (76.28s).

## Architecture added for Convert

- `src/sections/StudioModuleSection.tsx` gained optional config fields (all default to Studio AI values, Video 2 untouched): `product` (kicker/header), `theme` (accent class, `theme-convert`), `plate` (background), `beats` (bespoke animated beats).
- `src/sections/ConvertBeats.tsx` — beat components registry: `after-hours-clock`, `nurture-timeline`. Beats read word-timed anchors from `events` in the config, so every timing stays in `src/data/convertSections.ts`.
- `src/data/convertSections.ts` — Convert section configs.
- `scripts/qa-sections.py` now audits both data files and treats beat windows as screen coverage.
- Convert CSS lives at the end of `src/styles.css` (theme overrides + beat styles), same glass language as the 2026 polish pass.
- Audio: `public/audio/convert/m2-sk-sm-tail.m4a` (trimmed at 78.8s, clean silence verified, padded to 81s).

## Open questions for Mark

1. Do ScreenStudio recordings exist for M2-SN (WhatsApp conversation + diary booking) and M2-SO (website/Facebook/Instagram/WhatsApp four-up)? Drive folders were empty; the tracker's Drive links may be unsynced. If not, they need capturing (or M2-SN can be built as an animated chat-thread beat in the same style as the clock, pending Mark's preference).
2. A Care logo lockup is needed for the T2 teaser and Video 4.
3. Care (M3) is walkthrough-heavy and has no recordings at all; recording should start in parallel (see handoff §6).
