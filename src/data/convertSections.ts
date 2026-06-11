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

// M2-SN conversation experience: the Kirby Manor SMS demo plays in a phone
// bezel on the right while word-timed callouts carry the argument on the
// left; the booking payoff hands over to the tour-diary beat.
// Clip sources are pre-cropped cuts of "Kirby Manor Chatbot SMS demo video.mp4".
export const m2Sn: ModuleSectionConfig = {
  id: "M2-SN",
  moduleNumber: "02",
  title: "The Conversation",
  tagline: "Questions answered instantly, day or night.",
  product: "Convert",
  theme: "convert",
  plate: "plates/venuebot-after-hours.png",
  audio: "audio/convert/m2-sn-tail.m4a",
  duration: 73,
  chapterUntil: 2.6,
  clips: [
    // Greeting + "can you handle 80 guests?" typed and sent (VO: "the
    // opportunity to ask questions" 0-6.1)
    {src: "proof/convert/m2sn-ask-v2.mp4", at: 2.6, until: 10.6, zoom: 1, mode: "phone"},
    // The capacity answer lands as the VO says "answered instantly" (11.5)
    {src: "proof/convert/m2sn-instant-v2.mp4", at: 10.6, until: 19.0, zoom: 1, mode: "phone"},
    // Topic montage matching "whether they're asking about..." (19.1-30.1)
    {src: "proof/convert/m2sn-rooms-v2.mp4", at: 19.0, until: 25.4, zoom: 1, mode: "phone"},
    {src: "proof/convert/m2sn-price-v2.mp4", at: 25.4, until: 29.4, zoom: 1, mode: "phone"},
    {src: "proof/convert/m2sn-dog-v2.mp4", at: 29.4, until: 34.6, zoom: 1, mode: "phone"},
    // "How do I get to see the venue?" -> tour offer (35.4-40.5)
    {src: "proof/convert/m2sn-tour-v2.mp4", at: 34.6, until: 39.0, zoom: 1, mode: "phone"},
    // Saturday availability checked against the diary
    {src: "proof/convert/m2sn-booked-v2.mp4", at: 39.0, until: 42.6, zoom: 1, mode: "phone"},
    // 10:00 AM sent and confirmed as the VO lands "It books one." (42.9)
    {src: "proof/convert/m2sn-confirmed-v2.mp4", at: 42.6, until: 47.2, zoom: 1, mode: "phone"},
  ],
  beats: [
    {
      // "ask questions, just as they would with a member of your team...
      // answered instantly, day or night" (0-18.2)
      type: "side-callouts",
      from: 2.6,
      until: 18.8,
      events: [
        {id: "ask", at: 2.96, label: "Ask anything.", variant: "line"},
        {id: "team", at: 4.58, label: "Just as they would with your team.", variant: "italic"},
        {id: "hours", at: 9.4, label: "No waiting for office hours", variant: "caps"},
        {id: "instant", at: 11.52, label: "Answered instantly.", variant: "line"},
        {id: "daynight", at: 14.2, label: "Day or night.", variant: "italic"},
      ],
    },
    {
      // "guest numbers, accommodation, availability, pricing, or whether the
      // family dog can be part of the day" (19.1-30.1)
      type: "side-callouts",
      from: 19.0,
      until: 30.8,
      events: [
        {id: "topics", at: 19.12, label: "Whatever they're asking", variant: "caps"},
        {id: "guests", at: 20.64, label: "Guest numbers", variant: "chip"},
        {id: "rooms", at: 21.82, label: "Accommodation", variant: "chip"},
        {id: "avail", at: 23.86, label: "Availability", variant: "chip"},
        {id: "price", at: 25.78, label: "Pricing", variant: "chip"},
        {id: "dog", at: 28.3, label: "The family dog", variant: "chip"},
      ],
    },
    {
      // "The conversation keeps moving... VenueBot doesn't just suggest a
      // tour. It books one." (31.9-44.1)
      type: "side-callouts",
      from: 31.0,
      until: 47.0,
      events: [
        {id: "moving", at: 31.9, label: "The conversation keeps moving.", variant: "italic"},
        {id: "suggest", at: 39.14, label: "Doesn't just suggest a tour.", variant: "line"},
        {id: "books", at: 42.86, label: "It books one.", variant: "big"},
      ],
    },
    {
      // "Convert integrates directly with... the moment a couple chooses a
      // time, the tour is in your diary." (47.1-62.2)
      type: "tour-diary",
      from: 47.2,
      until: 63.2,
      events: [
        {id: "slot", at: 56.96}, // "the tour is in your diary"
        {id: "confirm", at: 58.54}, // "The couple gets a confirmation"
        {id: "notify", at: 60.46}, // "Your team gets a notification"
      ],
    },
  ],
  chipGroups: [
    {
      // "Google Calendar, Outlook, HubSpot, and your existing wedding
      // operational systems"
      from: 48.6,
      until: 54.8,
      chips: [
        {label: "Google Calendar", at: 49.12},
        {label: "Outlook", at: 50.34},
        {label: "HubSpot", at: 51.06},
        {label: "Operational systems", at: 52.22},
      ],
    },
  ],
  stamps: [
    {
      // "No back and forth. No double bookings. No couples slipping
      // through..." (63.6-70.1)
      from: 63.2,
      until: 72.4,
      mode: "full",
      lines: [
        {text: "No back and forth.", at: 63.58, variant: "serif"},
        {text: "No double bookings.", at: 65.22, variant: "serif"},
        {text: "No couples slipping through.", at: 66.76, variant: "serif-italic"},
      ],
    },
  ],
};
