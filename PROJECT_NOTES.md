# VenueBot Explainer Build Notes

## Timing Workflow

Timing cues for the Intro are now held in `src/data/introCuePoints.ts`.

For simple timing feedback, use the format in `CUE_WORKFLOW.md`: either exact timestamps (`00:15.2`) or phrase-based notes (`when the voice says "outside office hours"`).

I can align from the script and cue sheet. Automatic word-level transcription is available through `npm run transcribe` once `OPENAI_API_KEY` is set in the terminal.

## Current Structure

The video is now organised as four viewer-facing sections:

1. Intro
2. Studio AI
3. Convert
4. Care

The original production IDs stay in use internally. The Intro is built from `M1-SA` and `M1-SB`, while Studio AI begins at `M1-SC`.

## Visual Direction

The design target is premium calm: product-launch polish, spacious pacing, warm premium depth, soft lighting, cinematic stat reveals, and refined UI framing.

VenueBot remains the verbal brand. The presentation can borrow visual cues from modern product launches, but the words must describe the model as SWAS.

## Implemented

- `VenueBotIntro`: first working composition for the Intro.
- `StudioAI`, `Convert`, and `Care`: premium chapter-card compositions ready to be expanded.
- `VenueBotMaster`: currently points to the Intro while the remaining sections are built.
- Reusable brand background, logo mark, stat card, chapter card, and cue-driven intro scenes.
- `remotion-animated@2.2.0`: added for cleaner declarative entrance/reveal animations.
- `remotion-bits@0.2.0`: added for ready-made Remotion animation components, utilities, particles, 3D scenes, and reusable bits.
- Animated polish now covers notification cards, stat reveals, venue cards, journey steps, module pillars, product tiles, final chips, and the final logo reveal.
- `VenueBotSplash`: four-second porcelain-background splash using the green/agave VenueBot logo, with a restrained matte fragment exit.
- Intro punch pass: larger editorial typography, stronger stat moments, brighter brand contrast, scene-level camera drift, matte impact fragments, and frame-driven funnel motion. This moves the intro away from a flat slide-deck feel and closer to a premium product-film rhythm.
- Palette and image-plate pass: the intro now uses more of the VenueBot palette across agave, rose, peach, plum, porcelain, and soft cream. Flat placeholder blocks have been upgraded into layered designed plates for the dusk venue, laptop browsing image, venue shortlist cards, phone waiting state, notification accents, module pillars, and product tiles.
- Modern colour reset: removed the antique/sepia feel by reducing grain, dark brown vignette, espresso shadows, bronze accents, and warm haze. The base now leans into fresher agave light, cleaner rose accents, plum contrast, and brighter porcelain highlights.
- Premium scene system: added `src/components/PremiumSceneSystem.tsx` with reusable components for cinematic plates, problem statements, statistic reveals, shortlist cards, solution intro, product feature sections, editorial overlays, product screen wrappers, and CTA closing.
- Image-led visual reset: replaced the weak hand-drawn intro graphics with generated cinematic plates and Remotion overlays. The first implementation uses plates for luxury venue/couple research, after-hours coordinator context, couple shortlist decision-making, and abstract product proof.

## Source Assets Copied Into Remotion Public Folder

- `remotion/public/audio/intro-m1-sa-v2.mp3`
- `remotion/public/audio/intro-m1-sb-v2.mp3`
- `remotion/public/audio/intro-m1-sa.mp3`
- `remotion/public/audio/intro-m1-sb.mp3`
- `remotion/public/brand/venuebot-logo-white.png`
- `remotion/public/brand/venuebot-logo-agave.png`
- `remotion/public/plates/venuebot-cinematic-intro.png`
- `remotion/public/plates/venuebot-after-hours.png`
- `remotion/public/plates/venuebot-couple-shortlist.png`
- `remotion/public/plates/venuebot-product-proof.png`

The originals remain untouched in the production folders.

## Local Preview

```bash
cd remotion
npm install
npm run studio
```

Remotion Studio runs locally at `http://localhost:3000` when started from the terminal.

The Codex sandbox can type-check and bundle the project, but cannot currently launch the headless Chrome renderer because macOS blocks that browser process inside the sandbox. Run stills/renders from a normal terminal if needed.

## Current Review Note

The latest motion pass keeps the V2 SA/SB cue timing intact, adds a four-second green-logo splash before the voiceover, and adds more product-launch movement. Review in Remotion Studio from a normal terminal session and check whether the splash exit feels classy enough before the first scene begins.

Remotion Bits is installed and the CLI works. `npx remotion-bits find "fracture reassemble" --limit 3` found `bit-fracture-reassemble`, which may be useful for a more sophisticated logo breakup/reassemble treatment.

If Studio appears blank or disconnected, clear the stale local preview process from a normal Terminal and restart:

```bash
cd "/Users/markkirby/Library/CloudStorage/GoogleDrive-mark@goengage.co.uk/Shared drives/GoEngage - Work AI/Marketing/Explainer Video/remotion"
lsof -tiTCP:3000 -sTCP:LISTEN | xargs kill -9
npm run studio
```
