# Cue Point Workflow

Use cue points when a visual element needs to match a specific line in the voiceover.

The Intro cue points live in:

`src/data/introCuePoints.ts`

## Auto-Transcribe

Set an OpenAI API key in your terminal, then run:

```bash
cd "/Users/markkirby/Library/CloudStorage/GoogleDrive-mark@goengage.co.uk/Shared drives/GoEngage - Work AI/Marketing/Explainer Video/remotion"
export OPENAI_API_KEY="your_api_key_here"
npm run transcribe:intro-v2
```

If OpenAI returns `401 Unauthorized`, create a fresh API key and make sure the full key is copied into the terminal. Do not screenshot or paste the key anywhere.

That writes:

- `transcripts/m1-sa.cue.md` for human-readable segment and word cues
- `transcripts/m1-sa.words.csv` for spreadsheet-style review
- `transcripts/m1-sa.transcript.json` as the raw timestamped result

The script uses word timestamps, which are useful for matching text and stat cards to spoken phrases.

## Simple Feedback Format

Send notes like this:

```text
00:04.2 - "But that's not where..." should appear 0.5s later
00:15.2 - 81% comes in too early; move it to when "81%" is spoken
00:37.0 - draw the gap line after the word "gap", not before
```

You can also give phrase-based notes:

```text
When the voice says "outside office hours", show the 68% stat.
When the voice says "VenueBot was built", start the logo reveal.
```

I will translate those into named cue values in `introCuePoints.ts`.

## Current Intro Cue Sheet

Current production audio uses the V2 files. Full auto-transcribed cue sheets are:

- `transcripts/m1-sa-v2.cue.md`
- `transcripts/m1-sb-v2.cue.md`

| Time | Cue | Dialogue | Screen |
|---|---|---|---|
| 00:00.0 | saMoreEnquiries | Every wedding venue wants more enquiries. | Dusk venue scene with couple browsing |
| 00:04.7 | saMomentsMatter | But that's not where most bookings are won or lost. | Unanswered enquiry notifications |
| 00:12.4 | saLeakingOpportunities | Most venues are leaking opportunities every single day. | Leaking opportunities visual |
| 00:18.8 | saStat81 | 81% of couples felt frustrated by venue response times. | 81% stat moment |
| 00:24.2 | saVenueCards | Two thirds visit three venues or fewer. | Three venue cards |
| 00:27.5 | saStat68 | Almost 70% of enquiries happen outside office hours. | Evening clock and outside-hours stat |
| 00:34.4 | saJourneyMoments | Website, brochure, tour, question, reply. | Couple journey moments |
| 00:43.2 | saCompetitorRisk | Closer to booking or closer to your competitor. | Decision fork |
| 00:50.5 | saConversionGap | Enquiry problem versus conversion problem. | Traffic is not the problem. Conversion is. |
| 00:56.5 | saMissedFollowUps | Missed opportunities and follow-ups. | Missed follow-up sequence |
| 01:05.6 | saBuiltVenueBot | That's exactly why we built VenueBot. | Transition into VenueBot |
| 01:11.0 | sbNotChatbot | VenueBot isn't a chatbot or just another CRM. | Not a chatbot. Not just a CRM. |
| 01:16.2 | sbSystem | Complete enquiry-to-booking system. | System positioning |
| 01:21.7 | sbModules | Three connected modules. | Studio AI, Convert, Care |
| 01:31.3 | sbStudioAi | Studio AI helps generate more enquiries. | Studio AI montage |
| 01:44.3 | sbConvert | Convert turns enquiries into tours. | Conversation and tour booking flow |
| 01:58.7 | sbCare | Care runs the venue operation. | Dashboard, inbox, pipeline, calendar |
| 02:12.6 | sbFinalReveal | Generate, convert, manage. | VenueBot final reveal |
