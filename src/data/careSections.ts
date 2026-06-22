import type {ModuleSectionConfig} from "../sections/StudioModuleSection";

// Video 4: Care (M3). Every timing below is anchored to the word-level
// transcripts in transcripts/m3-*.words.csv. VO starts at 0 within each
// section; durations include a clean silent tail.
//
// Identity: Care = Control = Smoky Plum (#6A5A60) + Agave (#7C918A), with dusty
// rose / peach used sparingly. theme: "care" applies .theme-care. Cards are
// opaque (no live backdrop-filter) — the Convert/Video-2 playback-flicker fix.
//
// BUILT NOW (recording-free): M3-SR cold open, M3-SDD closer, M3-SAB-SCC.
// SCAFFOLD (await Mark's ScreenStudio clips): SS, ST, SU, SV, SW, SX, SY, SZ, SAA.

// ===========================================================================
// M3-SR — cold open. Scattered tools collapse into one source of truth.
// VO m3-sr-sv 0–36.0 (cold open only; the SS–SV walkthrough re-uses the rest
// of this VO). Audio trimmed at 37.0 + clean tail. The website care-scatter ->
// care-panel story, fully motion-designed (no recording).
// ===========================================================================
export const m3Sr: ModuleSectionConfig = {
  id: "M3-SR",
  moduleNumber: "01",
  title: "One Source of Truth",
  tagline: "Every enquiry, conversation and booking — together in one place.",
  product: "Care",
  theme: "care",
  plate: "plates/studio-ai/couple-planning-table.png",
  audio: "audio/care/m3-sr-cold-tail.m4a",
  duration: 37.5,
  // Module title card like Convert's cold open (M2-SK "Speed to Lead", 3.2s) for
  // series consistency — the scatter beat plays underneath and is revealed as it
  // fades. (The closer SDD stays chapter-less, matching Convert's M2-SQ closer.)
  chapterUntil: 3.2,
  clips: [],
  beats: [
    {
      type: "care-scatter-collapse",
      from: 0,
      until: 37.5,
      events: [
        {id: "intro", at: 0.4}, // "Every wedding venue starts the same way."
        // The six scattered tools, word-timed to "Email here, WhatsApp there,
        // Facebook... Instagram... notes in a spreadsheet, bookings in a diary."
        {id: "email", at: 10.02},
        {id: "whatsapp", at: 11.04},
        {id: "facebook", at: 12.44},
        {id: "instagram", at: 14.58},
        {id: "spreadsheet", at: 16.62},
        {id: "diary", at: 18.26},
        {id: "chaos", at: 20.84}, // "nobody knows where everything lives"
        {id: "collapse", at: 25.04}, // "Care brings it all together"
        {id: "s1", at: 27.34}, // "One system"
        {id: "s2", at: 28.6}, // "one team"
        {id: "s3", at: 29.62}, // "one source of truth"
        {id: "resolve", at: 31.52}, // "For the first time, you can see exactly..."
      ],
    },
  ],
};

// ===========================================================================
// M3-SAB-SCC — "only the beginning" + White Glove + no limits. One continuous
// VO (m3-sab-scc, 76.3s) carrying three beats, the way Convert's m2Sk carried
// SK/SL/SM. Fully editorial.
// ===========================================================================
export const m3Sab: ModuleSectionConfig = {
  id: "M3-SAB-SCC",
  moduleNumber: "06",
  title: "Built Around You",
  tagline: "Always improving, fully managed, built around the tools you already use.",
  product: "Care",
  theme: "care",
  plate: "plates/studio-ai/couple-planning-table.png",
  audio: "audio/care/m3-sab-scc-tail.m4a",
  duration: 76.3,
  chapterUntil: 1.5, // "And this is only the beginning." (0–1.2) over the chapter
  clips: [],
  beats: [
    {
      // M3-SAB: weekly release cadence -> smarter / faster / more productive.
      type: "evolving-cadence",
      from: 0,
      until: 24.0,
      events: [
        {id: "kicker", at: 1.7}, // "Every week, new AI capabilities..."
        {id: "r1", at: 6.2}, // "New automations"
        {id: "r2", at: 7.7}, // "new integrations"
        {id: "r3", at: 9.4}, // "new ways to save time"
        {id: "arc", at: 13.8}, // "The system you install today won't be the same..."
        {id: "smarter", at: 20.0},
        {id: "faster", at: 21.0},
        {id: "productive", at: 22.5},
      ],
    },
    {
      // M3-SBB: White Glove — we build/customise/install/maintain/improve it.
      type: "white-glove",
      from: 24.0,
      until: 47.2,
      events: [
        {id: "kicker", at: 25.4}, // "And unlike most software..."
        {id: "build", at: 30.0},
        {id: "customise", at: 31.0},
        {id: "install", at: 32.5},
        {id: "maintain", at: 33.8},
        {id: "improve", at: 35.3},
        {id: "glove", at: 38.6}, // "This is White Glove"
        {id: "withyou", at: 39.4}, // "done with you"
        {id: "foryou", at: 40.6}, // "done for you"
        {id: "you", at: 42.3}, // "You focus on creating unforgettable weddings"
        {id: "we", at: 45.4}, // "we'll handle the technology"
      ],
    },
    {
      // M3-SCC: no limits — unlimited everything + 99% integrations.
      type: "no-limits",
      from: 47.2,
      until: 73.4,
      events: [
        {id: "grow", at: 47.8}, // "As your venue grows, the platform grows with you"
        {id: "users", at: 52.2}, // "Unlimited users"
        {id: "records", at: 53.8}, // "unlimited records"
        {id: "convos", at: 55.7}, // "unlimited conversations"
        {id: "nopenalty", at: 57.7}, // "no hidden growth penalties"
        {id: "noceiling", at: 59.9}, // "no artificial ceilings"
        {id: "integrate", at: 64.6}, // "integration to 99% of the tools you already use"
        {id: "fits", at: 67.9}, // "VenueBot fits around the systems you already have"
      ],
    },
  ],
  // "The system does the work." (73.7–75.6)
  closing: {text: "The system does the work.", at: 73.7},
};

// ===========================================================================
// M3-SDD — series closer. Three-product lockup -> VenueBot + tagline.
// VO m3-sdd (24.0s). Editorial.
// ===========================================================================
export const m3Sdd: ModuleSectionConfig = {
  id: "M3-SDD",
  moduleNumber: "Series",
  title: "Three Modules, One Platform",
  tagline: "Stop losing enquiries, start booking more tours.",
  product: "VenueBot",
  theme: "care",
  plate: "plates/studio-ai/couple-planning-table.png",
  audio: "audio/care/m3-sdd-tail.m4a",
  duration: 24.0,
  chapterUntil: 0, // closer: straight into the lockup, no chapter card
  clips: [],
  beats: [
    {
      type: "three-product-lockup",
      from: 0,
      until: 24.0,
      events: [
        {id: "studio", at: 0.0}, // "Studio AI brings more couples to your venue"
        {id: "convert", at: 3.0}, // "Convert turns more enquiries into tours"
        {id: "care", at: 6.18}, // "Care gives your entire team one place..."
        {id: "summary", at: 11.02}, // "Three modules, one platform, one goal"
        {id: "bookings", at: 14.3}, // "more bookings"
        {id: "brand", at: 17.36}, // "VenueBot."
        {id: "tag", at: 19.44}, // "Stop losing enquiries, start booking more tours."
      ],
    },
  ],
};

// ===========================================================================
// SCAFFOLD SECTIONS — awaiting Mark's ScreenStudio recordings. Audio is cut so
// pacing previews; clips: [] with the VO word-time anchors noted for each clip
// slot. Capture against Kirby Manor demo data only (real-PII risk on a CRM).
// Do NOT finalise clip at/until until the captures exist. Editorial chapter
// framing is pre-written; stamps/spotlights/chips get added with the footage.
// ===========================================================================

// Operating picture: SS dashboards + ST inbox + SU contacts (from m3-sr-sv,
// 37.0–108.8 before the Whisper "no leaving…" tail) + SV calendars (the opening
// of m3-sw-sx, appended via audioMore — editorial, continuity from Convert).
// Section-local time = original m3-sr-sv time − 37.0; calendars at 72.6.
export const m3SsSv: ModuleSectionConfig = {
  id: "M3-SS-SV",
  moduleNumber: "02",
  title: "The Operating Picture",
  tagline: "Live dashboards, one shared timeline, the whole team in sync.",
  product: "Care",
  theme: "care",
  plate: "plates/studio-ai/couple-planning-table.png",
  audio: "audio/care/m3-ss-sv-tail.m4a",
  // Calendars (the old SV) belongs to the operating picture, so its VO (the
  // opening of m3-sw-sx, 0–21.5) is appended here — keeping "Pipeline &
  // Automation" starting at the pipeline content, not 21s early.
  audioMore: [{src: "audio/care/m3-calendars-tail.m4a", at: 72.6}],
  duration: 94.5,
  chapterUntil: 2.6,
  clips: [
    // SS — live dashboards (lead sources / conversion / tours / revenue).
    {src: "proof/care/care-ss-dash.mp4", at: 2.6, until: 17.9, zoom: 1, fit: "contain"},
    // ST + SU — unified record: conversation timeline, channels, team assignment.
    {src: "proof/care/care-stsu.mp4", at: 17.9, until: 64.0, zoom: 1, fit: "contain"},
  ],
  chipGroups: [
    {
      // "Live dashboards showing lead sources, conversion rates, tour bookings,
      // marketing performance, revenue pipelines" (39.7–45.5 → 2.7–8.5)
      from: 2.6,
      until: 9.2,
      chips: [
        {label: "Lead sources", at: 2.8},
        {label: "Conversion", at: 3.95},
        {label: "Tour bookings", at: 5.05},
        {label: "Marketing", at: 6.15},
        {label: "Revenue pipeline", at: 7.55},
      ],
    },
    {
      // "Email, SMS, WhatsApp, Facebook, Instagram, phone call transcripts,
      // website chatbot conversations" (63.0–70.5 → 26.0–33.5)
      from: 25.8,
      until: 34.2,
      chips: [
        {label: "Email", at: 26.0},
        {label: "SMS", at: 26.8},
        {label: "WhatsApp", at: 28.1},
        {label: "Facebook", at: 29.0},
        {label: "Instagram", at: 29.8},
        {label: "Phone transcripts", at: 30.6},
        {label: "Web chat", at: 32.0},
      ],
    },
    {
      // "Your wedding coordinators, sales team, owners, event managers"
      // (88.1–92.4 → 51.1–55.4)
      from: 50.6,
      until: 56.2,
      chips: [
        {label: "Coordinators", at: 51.1},
        {label: "Sales team", at: 52.4},
        {label: "Owners", at: 53.7},
        {label: "Event managers", at: 54.6},
      ],
    },
  ],
  stamps: [
    {
      // "No manual reports, no spreadsheet gymnastics, just the numbers that
      // matter, updated automatically" (46.6–53.2 → 9.6–16.2) — over the dashboard.
      from: 9.6,
      until: 17.9,
      mode: "full",
      lines: [
        {text: "No manual reports.", at: 9.9, variant: "serif"},
        {text: "No spreadsheet gymnastics.", at: 12.0, variant: "serif"},
        {text: "Just the numbers that matter.", at: 13.9, variant: "serif-italic"},
      ],
    },
    {
      // "No private inboxes. No duplicated records. No losing years of knowledge
      // when a team member leaves." (101.0–108.7 → 64.0–71.7)
      from: 64.0,
      until: 72.4,
      mode: "full",
      lines: [
        {text: "No private inboxes.", at: 64.3, variant: "serif"},
        {text: "No duplicated records.", at: 65.9, variant: "serif"},
        {text: "No losing years of knowledge.", at: 68.6, variant: "serif-italic"},
      ],
    },
    {
      // Calendars (SV) — editorial, no recording (continuity from Convert).
      // Calendars VO via audioMore at 72.6: "Calendars sync directly with
      // Google and Microsoft. Two-way, in real-time. Tours, meetings, venue
      // events, blocked dates, staff availability." (section 72.6–83.5)
      from: 72.6,
      until: 82.2,
      mode: "full",
      lines: [
        {text: "Calendars sync with Google & Microsoft.", at: 73.0, variant: "serif"},
        {text: "Two-way. In real time.", at: 74.4, variant: "serif-italic"},
        {text: "Tours, meetings, events, availability.", at: 79.2, variant: "serif"},
      ],
    },
    {
      // "And when VenueBot books a tour, it appears instantly... No double
      // entry, no diary clashes, no manual updates." (section 84.7–93.4)
      from: 82.2,
      until: 94.4,
      mode: "full",
      lines: [
        {text: "Book a tour — it's already in the diary.", at: 85.2, variant: "serif"},
        {text: "No double entry.", at: 90.0, variant: "serif"},
        {text: "No diary clashes. No manual updates.", at: 91.6, variant: "serif-italic"},
      ],
    },
  ],
};

// M3-SW Opportunities (kanban) + M3-SX Automations. Audio is m3-sw-sx trimmed
// to the pipeline content (orig 22.0→end), so the chapter heads "Every venue
// has its own sales process…". Calendars (the orig 0–21 opening) now lives in
// the Operating Picture section above. Section-local time = orig m3-sw-sx − 22.0.
export const m3SwSx: ModuleSectionConfig = {
  id: "M3-SW-SX",
  moduleNumber: "03",
  title: "Pipeline & Automation",
  tagline: "Every opportunity in view, every follow-up handled automatically.",
  product: "Care",
  theme: "care",
  plate: "plates/studio-ai/couple-planning-table.png",
  audio: "audio/care/m3-sw-sx-pipe-tail.m4a",
  duration: 56.0,
  chapterUntil: 2.6, // "Every venue has its own sales process…" (0.5–5.0)
  clips: [
    // SW — Opportunities kanban (pipeline stages, cards moving through).
    {src: "proof/care/care-sw.mp4", at: 2.6, until: 28.0, zoom: 1, fit: "contain"},
    // SX — automation workflow canvas (nurture sequence branches).
    {src: "proof/care/care-sx.mp4", at: 28.0, until: 49.6, zoom: 1, fit: "contain"},
  ],
  chipGroups: [
    {
      // Automations list: "Enquiry responses, brochure delivery, tour
      // confirmations, follow-up reminders, thank you messages, database
      // reactivation campaigns" (orig 54.8–65.0 → 32.8–43.0)
      from: 32.5,
      until: 43.6,
      chips: [
        {label: "Enquiry responses", at: 32.8},
        {label: "Brochure delivery", at: 34.7},
        {label: "Tour confirmations", at: 36.3},
        {label: "Follow-up reminders", at: 38.1},
        {label: "Thank-you messages", at: 39.6},
        {label: "Reactivation", at: 41.0},
      ],
    },
  ],
  stamps: [
    {
      // "Built once, running every day, without anyone touching them."
      // (orig 73.0–77.1 → 51.0–55.1)
      from: 49.6,
      until: 56.0,
      mode: "full",
      lines: [
        {text: "Built once.", at: 51.0, variant: "serif"},
        {text: "Running every day.", at: 52.6, variant: "serif"},
        {text: "Without anyone touching them.", at: 54.0, variant: "serif-italic"},
      ],
    },
  ],
};

// M3-SY Marketing suite + M3-SZ Reputation. VO m3-sy-sz (63.0s).
export const m3SySz: ModuleSectionConfig = {
  id: "M3-SY-SZ",
  moduleNumber: "04",
  title: "Marketing & Reputation",
  tagline: "One connected suite — campaigns, reviews and reputation in one place.",
  product: "Care",
  theme: "care",
  plate: "plates/studio-ai/couple-planning-table.png",
  audio: "audio/care/m3-sy-sz-tail.m4a",
  duration: 63.3,
  chapterUntil: 2.6,
  clips: [
    // SY — marketing suite (email/templates, one connected toolset).
    {src: "proof/care/care-sy.mp4", at: 2.6, until: 28.0, zoom: 1, fit: "contain"},
    // SZ — Reputation Manager (ratings overview, review responses, intervention).
    {src: "proof/care/care-sz.mp4", at: 28.0, until: 56.0, zoom: 1, fit: "contain"},
  ],
  chipGroups: [
    {
      // "Email campaigns, SMS broadcasts, landing pages, forms, website pages,
      // social media publishing, blog content." (6.7–16.9)
      from: 6.5,
      until: 17.4,
      chips: [
        {label: "Email campaigns", at: 6.7},
        {label: "SMS broadcasts", at: 8.7},
        {label: "Landing pages", at: 10.7},
        {label: "Forms", at: 12.0},
        {label: "Website pages", at: 12.9},
        {label: "Social publishing", at: 14.5},
        {label: "Blog content", at: 16.2},
      ],
    },
    {
      // "Everything works from the same data, the same contacts, the same
      // conversations." (22.8–27.7)
      from: 23.7,
      until: 28.0,
      chips: [
        {label: "Same data", at: 24.2},
        {label: "Same contacts", at: 25.4},
        {label: "Same conversations", at: 26.7},
      ],
    },
  ],
  stamps: [
    {
      // "Protect the experience. Protect the rating. Protect the reputation
      // you've worked years to build." (56.0–62.5)
      from: 56.0,
      until: 63.3,
      mode: "full",
      lines: [
        {text: "Protect the experience.", at: 56.4, variant: "serif"},
        {text: "Protect the rating.", at: 58.1, variant: "serif"},
        {text: "Protect the reputation.", at: 59.5, variant: "serif-italic"},
      ],
    },
  ],
};

// M3-SAA Ask AI (mobile). VO m3-saa (41.8s).
export const m3Saa: ModuleSectionConfig = {
  id: "M3-SAA",
  moduleNumber: "05",
  title: "Ask AI",
  tagline: "Ask anything about your venue and get an answer in seconds.",
  product: "Care",
  theme: "care",
  plate: "plates/studio-ai/couple-planning-table.png",
  audio: "audio/care/m3-saa-tail.m4a",
  duration: 42.2,
  chapterUntil: 2.6,
  clips: [
    // SAA — Ask AI: the prompt bar + report generation/charts. Capped at 20.5s
    // (the recording's later lead-name tables are PII; covered by stamps below).
    {src: "proof/care/care-saa.mp4", at: 2.6, until: 21.5, zoom: 1, fit: "contain"},
  ],
  stamps: [
    {
      // The spoken example asks float over the Ask-AI screen (10.7–22.1).
      from: 10.4,
      until: 21.5,
      mode: "dim",
      lines: [
        {text: "“Show me every enquiry from the last 30 days.”", at: 10.8, variant: "serif-italic"},
        {text: "“Create a landing page for our wedding showcase.”", at: 14.7, variant: "serif-italic"},
        {text: "“Send John & Sarah the autumn brochure.”", at: 18.3, variant: "serif-italic"},
      ],
    },
    {
      // "It can even answer the questions you'd normally need a report for.
      // Which marketing source generated the most bookings this month?" (22.4–30.0)
      from: 21.5,
      until: 30.4,
      mode: "full",
      lines: [
        {text: "Even the questions you'd need a report for.", at: 22.4, variant: "serif-italic"},
        {text: "“Which source generated the most bookings?”", at: 25.9, variant: "serif"},
      ],
    },
    {
      // "No reports to build, no menus to navigate, no hunting through screens..."
      // (30.5–36.8)
      from: 30.4,
      until: 37.8,
      mode: "full",
      lines: [
        {text: "No reports to build.", at: 30.8, variant: "serif"},
        {text: "No menus to navigate.", at: 32.6, variant: "serif"},
        {text: "No hunting through screens.", at: 34.4, variant: "serif-italic"},
      ],
    },
  ],
  // "You ask. The system does the work." (38.5–41.4)
  closing: {text: "You ask. The system does the work.", at: 38.6},
};
