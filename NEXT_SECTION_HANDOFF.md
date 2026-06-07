# VenueBot Film Handoff

Last updated: 2026-06-07

This file is the handoff for starting the next VenueBot film section in a fresh Codex task. Read this before planning or implementing Studio AI, Convert, or Care.

## Recommendation

Start the next section in a separate Codex task/thread. The intro work contains several resets, old scripts, design experiments, and asset decisions. A fresh task should use this file and the current repo state as the source of truth, not the old chat history.

## Current Project

Local Remotion project:

`/Users/markkirby/Projects/venuebot-remotion`

Active preview composition:

`VenueBotIntro`

Useful local URL when Studio is running:

`http://localhost:3001/?/VenueBotIntro`

Main files:

- `src/sections/Intro.tsx`
- `src/components/PremiumSceneSystem.tsx`
- `src/components/VenueBotSplash.tsx`
- `src/data/introCuePoints.ts`
- `src/data/video.ts`
- `src/theme.ts`
- `src/styles.css`

GitHub remote:

`git@github.com:SaxManMARK/venuebot-remotion.git`

Current note: the local repo exists, but pushing previously failed because GitHub SSH auth was not configured for this environment.

## Film Structure

The full VenueBot film is now four separate videos:

1. Intro / Market Reality Film
2. Studio AI
3. Convert
4. Care

The intro is Video 1. It is a positioning film, not a product walkthrough. Studio AI should be started as Video 2 in a fresh task.

## Intro Source Of Truth

The approved intro voiceover is:

`public/audio/intro-m1-sa-sb-v3.mp3`

The old M1-SA, M1-SB, V2 SA, and V2 SB recordings are no longer the source of truth for the intro.

Word-level transcription has been run for V3:

- `transcripts/m1-sa-sb-v3.transcript.json`
- `transcripts/m1-sa-sb-v3.cue.md`
- `transcripts/m1-sa-sb-v3.words.csv`

Cue timing lives in:

`src/data/introCuePoints.ts`

The current intro includes a 4-second VenueBot splash before the V3 voiceover begins. Cue points use `withSplash()` so screen timing accounts for that splash.

## Approved V3 Narrative

The V3 intro narrative is:

Problem -> Recognition -> Opportunity -> VenueBot Philosophy -> Knowledge / Engagement / Control -> Outcome

Approved closing framework:

- Studio AI -> Knowledge
- Convert -> Engagement
- Care -> Control

Outcome:

- More bookings.
- More confidence.

The film should make venue owners feel recognised, not criticised. It should establish that VenueBot understands why venues lose bookings before showing software in later videos.

## Creative Direction

The visual benchmark is:

Luxury hospitality brand + premium editorial design + documentary storytelling.

Lead with wedding venue emotion. Support with commercial insight. Prove with product only when the specific video section needs proof.

Avoid:

- Generic SaaS animation
- Dashboard-led visuals
- Chatbot imagery
- Robot or AI cliches
- Startup-style neon graphics
- Cartoon icons
- Stock business imagery
- Generic floating cards
- Software-first design

Prefer:

- Cinematic wedding venue imagery
- Couples researching venues
- Venue owner / coordinator reality
- Warm golden-hour and early-dusk lighting
- Editorial typography
- Hospitality textures
- Refined motion overlays
- Product screens only in the dedicated product films

Use VenueBot's language and positioning accurately. VenueBot is SWAS: Software With A Service. Do not describe it as SaaS.

## Brand System

Approved palette:

- Agave Green: `#7C918A`
- Dusty Rose: `#D5A798`
- Smoky Plum: `#6A5A60`
- Peach: `#FFE6B4`
- Urban Gray: `#8C8D8E`
- Porcelain White: `#F4F0ED`

Typography:

- Headings: Playfair Display
- Body / labels: Inter

Scene 12 / framework visual language:

- Studio AI / Knowledge = Agave Green, understanding, editorial strategy table, venue uniqueness
- Convert / Engagement = Dusty Rose and Peach, relationship momentum, enquiry journey, tours booked
- Care / Control = Smoky Plum, operational calm, follow-up visibility, confidence

The framework should feel like a premium hospitality brand explaining its operating philosophy, not a software company explaining features.

## Canonical Venue Asset Library

The three shortlist venues are approved production assets, not examples.

Asset board source:

`/Users/markkirby/Library/CloudStorage/Dropbox/GoEngage/Marketing/Graphics/AI Venue images/8e33a768-a368-4454-a79f-7802034a09ce.png`

Cropped production assets now live at:

- `public/venues/ravenwood-hall.png`
- `public/venues/willow-creek-barn.png`
- `public/venues/oakridge-manor.png`

Use these identities consistently:

- Ravenwood Hall / Luxury Country House / Agave Green
- Willow Creek Barn / Rustic Barn Venue / Dusty Rose
- Oakridge Manor / Historic Manor / Smoky Plum

Do not generate replacement venue imagery for these three. Do not use abstract image blocks or CSS-drawn venue placeholders where these venues appear.

The shortlist scene represents:

20 venues considered -> 3 venues remain -> the responsive venue gets the tour.

Core message:

Couples start with many options, quickly narrow to three, and fast, confident response helps a venue stay on the shortlist.

## Opportunity Card System

All opportunity cards should feel like wedding opportunities, not CRM notifications.

Reference feel:

- Apple Wallet
- Luxury hotel reservations
- Premium airline boarding passes
- Michelin restaurant bookings
- High-end hospitality confirmations

Avoid:

- CRM notifications
- Mobile push alerts
- Harsh black UI
- Dashboard widgets
- Generic software cards

Approved card language examples:

- New wedding enquiry: Saturday 12 July 2027, 120 guests, £12,000-£15,000 budget
- Brochure downloaded: Interest confirmed, follow-up recommended
- Question received: Availability and pricing, response required
- Viewing booked: Thursday 3pm, tour confirmed, couple ready to visit
- Follow-up sent: Momentum maintained, confidence building

Visual principle:

Every enquiry is a wedding. Every wedding is valuable. Every moment matters.

## Product Proof For Later Videos

Real Screen Studio recordings exist for:

- Venue Intelligence
- Brand Voice
- Nurture Sequences
- Brochure Analyser
- Website Analyser
- Competitor Analysis

For Video 2, Studio AI should use these recordings as product proof. Avoid rebuilding abstract product screens if a real recording can support the claim.

Rule for product films:

Every strategic claim in the voiceover should be supported by real product proof within roughly 5 seconds.

For Video 1, product screens should not be shown. For Video 2 onwards, product proof is expected.

## Technical Notes

Installed Remotion-related packages include:

- `remotion`
- `remotion-animated`
- `remotion-bits`
- `culori`

Useful commands:

```bash
cd "/Users/markkirby/Projects/venuebot-remotion"
npm run studio
npm run render:intro
npm run transcribe:intro-v3
npx tsc --noEmit
npx remotion bundle src/index.ts /tmp/venuebot-remotion-bundle-check
```

Rendering note:

Codex can type-check and bundle the project, but the sandbox has failed to launch Chromium for still or MP4 renders. To create MP4s, run from a normal macOS Terminal:

```bash
cd "/Users/markkirby/Projects/venuebot-remotion"
npm run render:intro
```

If Chrome launch fails, try:

```bash
cd "/Users/markkirby/Projects/venuebot-remotion"
npx remotion render src/index.ts VenueBotIntro out/venuebot-intro.mp4 --browser-executable="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

## Current Repo State To Check

Before starting new work, run:

```bash
git status --short --branch
```

At the time this handoff was written, there were uncommitted changes for:

- `src/components/PremiumSceneSystem.tsx`
- `src/styles.css`
- `public/venues/`

These changes are related to the approved venue asset cards and should not be discarded.

## Studio AI Next Section Guidance

Studio AI is Video 2.

Recommended next-task opening:

"We are starting Video 2: Studio AI. Read `NEXT_SECTION_HANDOFF.md`, then inspect the existing Remotion project. Do not alter the intro unless required. Build a plan for Studio AI using real Screen Studio recordings as product proof. The visual style must inherit the premium hospitality/editorial system from Video 1, but this video can show product screens because it is a dedicated product film."

Studio AI should communicate:

- Knowledge
- Understanding the venue
- Positioning
- Customer insight
- Content performance
- Competitor benchmarking
- Conversion gaps

It should not feel like a generic SaaS feature demo.

Use the real recordings as proof inside a hospitality/editorial frame. The product is the proof, not the whole visual language.
