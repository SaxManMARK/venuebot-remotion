import {introSplashDurationFrames, seconds} from "./video";

const withSplash = (frame: number) => frame + introSplashDurationFrames;

export const introCuePoints = {
  // V3 source of truth: Vox M1-SA-SB v3.mp3
  // Timings are rebuilt from word-level transcription of the 152.2s V3 voiceover.
  saMoreEnquiries: withSplash(seconds(0)),
  saMomentsMatter: withSplash(seconds(6.28)),
  saLeakingOpportunities: withSplash(seconds(12.06)),
  saStat81: withSplash(seconds(17.18)),
  saVenueCards: withSplash(seconds(22.16)),
  saStat68: withSplash(seconds(27.04)),
  saJourneyMoments: withSplash(seconds(37.06)),
  saCompetitorRisk: withSplash(seconds(52.08)),
  saConversionGap: withSplash(seconds(58.98)),
  saMissedFollowUps: withSplash(seconds(64.96)),
  saBuiltVenueBot: withSplash(seconds(73.66)),
  saOut: withSplash(seconds(76.98)),

  sbNotChatbot: withSplash(seconds(76.98)),
  sbSystem: withSplash(seconds(81.08)),
  sbModules: withSplash(seconds(86.08)),
  sbStudioAi: withSplash(seconds(96.56)),
  sbConvert: withSplash(seconds(111.82)),
  sbCare: withSplash(seconds(125.4)),
  sbFinalReveal: withSplash(seconds(143.84)),
  sbOut: withSplash(seconds(152.2)),
} as const;

export const introCueNotes = [
  {
    time: "00:00.0",
    cue: "saMoreEnquiries",
    dialogue: "Every wedding venue wants more enquiries.",
    screen: "Warm golden-hour venue scene with couple research atmosphere.",
  },
  {
    time: "00:06.3",
    cue: "saMomentsMatter",
    dialogue: "They're won—or lost—in the moments after a couple gets in touch.",
    screen: "The moments after the enquiry matter most.",
  },
  {
    time: "00:12.1",
    cue: "saLeakingOpportunities",
    dialogue: "The challenge is that most venues are leaking opportunities every single day.",
    screen: "Common leakage moments, framed without blaming the venue.",
  },
  {
    time: "00:17.2",
    cue: "saStat81",
    dialogue: "81% of couples say they've felt frustrated by venue response times.",
    screen: "Large 81% stat moment.",
  },
  {
    time: "00:22.2",
    cue: "saVenueCards",
    dialogue: "Nearly 70% make their decision after visiting three venues or fewer.",
    screen: "Shortlist forms quickly; three venues or fewer.",
  },
  {
    time: "00:27.0",
    cue: "saStat68",
    dialogue: "Almost 70% of wedding enquiries happen outside normal office hours.",
    screen: "Outside-hours enquiry reality.",
  },
  {
    time: "00:37.1",
    cue: "saJourneyMoments",
    dialogue: "Couples are choosing venues faster than ever, while many venues are still struggling to respond consistently.",
    screen: "Recognition moment, then the website, brochure, tour, question and reply journey appears.",
  },
  {
    time: "00:52.1",
    cue: "saCompetitorRisk",
    dialogue: "Every one of those moments either moves them closer to booking your venue, or closer to booking somebody else's.",
    screen: "Booking versus competitor fork.",
  },
  {
    time: "00:59.0",
    cue: "saConversionGap",
    dialogue: "Most venues don't have an enquiry problem. They have a conversion problem.",
    screen: "Not an enquiry problem. A conversion problem.",
  },
  {
    time: "01:05.0",
    cue: "saMissedFollowUps",
    dialogue: "Opportunities are missed. Follow-ups don't happen. Teams get busy. And couples quietly disappear.",
    screen: "Missed follow-up sequence.",
  },
  {
    time: "01:13.7",
    cue: "saBuiltVenueBot",
    dialogue: "That's exactly why we built VenueBot.",
    screen: "Transition into VenueBot overview.",
  },
  {
    time: "01:17.0",
    cue: "sbNotChatbot",
    dialogue: "VenueBot isn't a chatbot. And it isn't just another CRM.",
    screen: "Not a chatbot. Not just a CRM.",
  },
  {
    time: "01:21.1",
    cue: "sbSystem",
    dialogue: "It's a complete enquiry-to-booking system built specifically for wedding venues.",
    screen: "System positioning line.",
  },
  {
    time: "01:26.1",
    cue: "sbModules",
    dialogue: "Everything is organised around three connected pillars. Knowledge. Engagement. Control.",
    screen: "Knowledge, Engagement and Control framework.",
  },
  {
    time: "01:36.6",
    cue: "sbStudioAi",
    dialogue: "Studio AI gives you the knowledge to understand what makes your venue unique.",
    screen: "Knowledge world: venue uniqueness and opportunity.",
  },
  {
    time: "01:51.8",
    cue: "sbConvert",
    dialogue: "Convert helps you engage every enquiry consistently.",
    screen: "Engagement world: response, nurture and tour momentum.",
  },
  {
    time: "02:05.4",
    cue: "sbCare",
    dialogue: "Care gives your team complete control of the venue journey.",
    screen: "Control world: calm operational visibility.",
  },
  {
    time: "02:23.8",
    cue: "sbFinalReveal",
    dialogue: "Knowledge. Engagement. Control. More bookings. More confidence.",
    screen: "Final framework and outcome reveal.",
  },
] as const;
