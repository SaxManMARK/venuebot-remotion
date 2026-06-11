import type {ModuleSectionConfig} from "../sections/StudioModuleSection";

// Video 3: Convert (M2). Every timing below is anchored to the word-level
// transcripts in transcripts/<slug>.words.csv. VO starts at 0 within each
// section; durations include a clean silent tail.

// M2-SK cold open + M2-SL speed-to-lead + M2-SM 50-day journey share one VO
// (m2-sk-sm, last word ends 78.14s). Fully editorial: no recordings exist for
// these scenes, so the visuals are stamps, chips and two bespoke beats.
export const m2Sk: ModuleSectionConfig = {
  id: "M2-SK",
  moduleNumber: "01",
  title: "Speed to Lead",
  tagline: "Because the venue that responds first wins the tour.",
  product: "Convert",
  theme: "convert",
  plate: "plates/venuebot-after-hours.png",
  audio: "audio/convert/m2-sk-sm-tail.m4a",
  duration: 81,
  chapterUntil: 3.2, // "But couples don't always choose..." starts at 3.4
  clips: [],
  beats: [
    {
      // "Convert. Enquiries arrive during evenings..." through "removes that
      // delay completely" (26.52-45.7): the 22:14 enquiry, hours racing by,
      // then the instant reply.
      type: "after-hours-clock",
      from: 26.52,
      until: 47.2,
      events: [
        {id: "notify", at: 27.34}, // "Enquiries arrive"
        {id: "hours", at: 36.9}, // "Every hour that passes"
        {id: "reply", at: 43.24}, // "Convert removes that delay"
      ],
    },
    {
      // "Convert continues nurturing every enquiry for more than 50 days,
      // across email, SMS and WhatsApp" (60.6-78.1): the journey rail.
      type: "nurture-timeline",
      from: 60.4,
      until: 78.6,
      events: [
        {id: "draw", at: 61.22}, // "Convert continues nurturing"
        {id: "stat", at: 64.8}, // "50 days"
        {id: "email", at: 66.44},
        {id: "sms", at: 67.48},
        {id: "whatsapp", at: 68.66},
        {id: "line1", at: 69.94}, // "Not with repetitive reminders"
        {id: "line2", at: 73.1}, // "but with timely, relevant conversations"
      ],
    },
  ],
  chipGroups: [
    {
      // "during evenings, weekends, holidays, while your team is conducting
      // tours, serving events or simply away from the office"
      from: 27.9,
      until: 36.6,
      chips: [
        {label: "Evenings", at: 28.4},
        {label: "Weekends", at: 29.34},
        {label: "Holidays", at: 30.2},
        {label: "During tours", at: 31.94},
        {label: "Serving events", at: 33.24},
        {label: "Away from the office", at: 35.0},
      ],
    },
  ],
  stamps: [
    {
      // "But couples don't always choose the best venue... responds first.
      // And in today's market, the first response usually wins the tour." (3.4-14.7)
      from: 3.2,
      until: 15.2,
      mode: "full",
      lines: [
        {text: "Not always the best venue.", at: 4.1, variant: "serif"},
        {text: "The one that responds first.", at: 6.8, variant: "serif-italic"},
        {text: "The first response wins the tour.", at: 12.4, variant: "caps"},
      ],
    },
    {
      // "That's why we built VenueBot Convert." (15.6-18.3); the wordmark
      // lands on its own line as the brand name is spoken.
      from: 15.2,
      until: 20.4,
      mode: "full",
      lines: [
        {text: "That's why we built", at: 15.7, variant: "serif-italic"},
        {text: "VenueBot Convert", at: 17.1, image: "brand/venuebot-convert-logo.png", imageWidth: 832},
      ],
    },
    {
      // "Most venues believe they're responding quickly. The reality is very
      // different." (20.6-25.3)
      from: 20.4,
      until: 26.5,
      mode: "full",
      lines: [
        {text: "Most venues believe they're quick.", at: 21.0, variant: "serif"},
        {text: "The reality is very different.", at: 23.6, variant: "serif-italic"},
      ],
    },
    {
      // "Most venues follow up once, maybe twice. Then the enquiry goes
      // quiet." (47.6-53.0)
      from: 47.2,
      until: 53.8,
      mode: "full",
      lines: [
        {text: "Follow up once. Maybe twice.", at: 48.4, variant: "serif"},
        {text: "Then the enquiry goes quiet.", at: 51.4, variant: "serif-italic"},
      ],
    },
    {
      // "But couples don't make a £10,000 to £20,000 venue decision
      // overnight." (54.0-59.4)
      from: 53.8,
      until: 60.4,
      mode: "full",
      lines: [
        {text: "£10,000–£20,000", at: 55.9, variant: "display"},
        {text: "That decision isn't made overnight", at: 58.2, variant: "caps"},
      ],
    },
  ],
  // "designed to keep momentum moving towards a tour" (76.0-78.1)
  closing: {text: "Momentum, moving towards a tour.", at: 76.28},
};
