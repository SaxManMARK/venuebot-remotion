import type {ModuleSectionConfig} from "../sections/StudioModuleSection";

// Every timing below is anchored to the word-level transcripts in transcripts/<slug>.words.csv.
// VO starts at 0 within each section; durations include a clean silent tail.

export const m1Se: ModuleSectionConfig = {
  id: "M1-SE",
  moduleNumber: "02",
  title: "Brand Voice",
  tagline: "Every piece of content, unmistakably yours.",
  audio: "audio/studio-ai/m1-se-transcript-tail.m4a",
  duration: 41,
  chapterUntil: 3.4, // "Because every venue is unique" starts at 2.5
  clips: [
    // Approved voice card + personality traits while "Studio AI learns the personality" (5.0-7.0)
    {src: "proof/studio-ai/m1-se-top.mp4", at: 0, until: 7.6, zoom: 1.32},
    // Own/avoid vocabulary on "the words you use, the words you avoid" (7.8-10.0)
    {src: "proof/studio-ai/m1-se-vocab.mp4", at: 7.6, until: 10.6, zoom: 1},
    // Tone by Channel cards on "the tone you want across..." (10.7-15.2)
    {src: "proof/studio-ai/m1-se-tone.mp4", at: 10.6, until: 16.2, zoom: 1},
    // (16.2-24.2: full-frame typographic beat - four style voices)
    // Channel previews (website hero + Instagram caption, frozen as a reading moment)
    // on "every piece of content... unmistakably yours" (24.9-32.3)
    {src: "proof/studio-ai/m1-se-previews.mp4", at: 24.2, until: 33.2, zoom: 1},
    // Pull back to the full voice profile for the close
    {src: "proof/studio-ai/m1-se-overview.mp4", at: 33.2, until: 41, zoom: 1.32},
  ],
  chipGroups: [
    {
      from: 11.6,
      until: 16.0,
      chips: [
        {label: "Website", at: 11.88},
        {label: "Brochures", at: 12.74},
        {label: "Emails", at: 13.76},
        {label: "Social", at: 14.44},
      ],
    },
    {
      from: 30.5,
      until: 33.2,
      chips: [{label: "Unmistakably yours.", at: 30.76}],
    },
  ],
  stamps: [
    {
      // "Historic charm, effortless luxury, relaxed and rustic, modern and minimalist" (16.36-22.88)
      // Each phrase lands in its own typographic voice.
      from: 16.0,
      until: 24.2,
      mode: "full",
      lines: [
        {text: "Historic charm.", at: 16.36, variant: "serif"},
        {text: "Effortless luxury.", at: 18.2, variant: "serif-italic"},
        {text: "Relaxed & rustic.", at: 19.7, variant: "caps"},
        {text: "Modern & minimalist.", at: 21.42, variant: "thin-caps"},
      ],
    },
    {
      // "Not generic, not robotic" (34.4-36.2)
      from: 34.0,
      until: 37.6,
      lines: [
        {text: "Not generic.", at: 34.4, variant: "serif"},
        {text: "Not robotic.", at: 35.66, variant: "serif"},
      ],
    },
  ],
  closing: {text: "Because couples can tell the difference.", at: 37.4},
};

// M1-SF spans two VO recordings: part A (S01-S05, trimmed at 65.9s where real
// content ends) plays at 0; part B (S06-Close, 98s) plays at 68. Part-B word
// timings below are VO-relative + 68.
const sfB = 68;

export const m1Sf: ModuleSectionConfig = {
  id: "M1-SF",
  moduleNumber: "03",
  title: "Nurture Sequences",
  tagline: "Because the conversation should never stop.",
  audio: "audio/studio-ai/m1-sf-a-tail.m4a",
  audioMore: [{src: "audio/studio-ai/m1-sf-b-tail.m4a", at: sfB}],
  duration: 168,
  chapterUntil: 3.2,
  clips: [
    // -- Part A: the problem, the research, build vs audit, configuration --
    // (0-17.6: editorial problem beat, no screen)
    // "We analysed wedding industry research..." (18.0-28.0) over the 60+ sources banner
    {src: "proof/studio-ai/m1-sf-research.mp4", at: 17.8, until: 29.8, zoom: 1.42},
    // "Already have a nurture sequence? Audit it." (30.0-37.8)
    {src: "proof/studio-ai/m1-sf-audit.mp4", at: 29.8, until: 38.8, zoom: 1},
    // "Starting from scratch... automatically" (39.2-45.2)
    {src: "proof/studio-ai/m1-sf-build.mp4", at: 38.8, until: 46.0, zoom: 1},
    // "We already know your venue, ideal couple, pricing, brand voice" (46.8-54.7)
    {src: "proof/studio-ai/m1-sf-readiness.mp4", at: 46.0, until: 55.5, zoom: 1},
    // "Do you collect wedding dates?..." (55.9-65.8)
    {src: "proof/studio-ai/m1-sf-questions.mp4", at: 55.5, until: 68, zoom: 1},
    // -- Part B: generation, the sequence, strategy, export, close --
    // "Then Studio AI gets to work" (B 0-4.5)
    {src: "proof/studio-ai/m1-sf-generating.mp4", at: sfB + 0.2, until: sfB + 5.5, zoom: 1},
    // "Not a generic template... complete nurture journey" (B 6.9-14.7)
    {src: "proof/studio-ai/m1-sf-reveal.mp4", at: sfB + 5.5, until: sfB + 16.2, zoom: 1.15},
    // "Every message has a purpose..." (B 16.2-26.9)
    {src: "proof/studio-ai/m1-sf-purpose.mp4", at: sfB + 16.2, until: sfB + 27.5, zoom: 1},
    // "The happy path guides couples..." (B 28.1-36.8)
    {src: "proof/studio-ai/m1-sf-happypath.mp4", at: sfB + 27.5, until: sfB + 38, zoom: 1.5},
    // "Recovery paths... without becoming pushy" (B 38.1-52.6)
    {src: "proof/studio-ai/m1-sf-recovery.mp4", at: sfB + 38, until: sfB + 53.5, zoom: 1},
    // "Every email, SMS and WhatsApp message includes the strategy" (B 54.3-65.2)
    {src: "proof/studio-ai/m1-sf-strategy.mp4", at: sfB + 53.5, until: sfB + 65.5, zoom: 1},
    // "Never blindly trusting AI" (B 65.7-71.6)
    {src: "proof/studio-ai/m1-sf-whyexists.mp4", at: sfB + 65.5, until: sfB + 73.5, zoom: 1},
    // "Personalisation fields are mapped automatically... export" (B 73.9-86.3)
    {src: "proof/studio-ai/m1-sf-fields.mp4", at: sfB + 73.5, until: sfB + 87, zoom: 1},
    // (B 87-100: editorial closing stamp, no screen)
  ],
  chipGroups: [
    {
      // "Do you collect wedding dates? Do you offer virtual tours?..."
      from: 57.0,
      until: 67.0,
      chips: [
        {label: "Wedding dates?", at: 57.58},
        {label: "Virtual tours?", at: 59.5},
        {label: "Which channels?", at: 61.54},
        {label: "An intro call?", at: 65.26},
      ],
    },
    {
      // "Acknowledge, orient, reassure, prompt action, reactivate, rescue"
      from: sfB + 18.4,
      until: sfB + 27.2,
      chips: [
        {label: "Acknowledge", at: sfB + 18.76},
        {label: "Orient", at: sfB + 19.5},
        {label: "Reassure", at: sfB + 20.44},
        {label: "Prompt action", at: sfB + 21.64},
        {label: "Reactivate", at: sfB + 23.04},
        {label: "Rescue", at: sfB + 24.38},
      ],
    },
    {
      // "from enquiry, to tour booking, to venue visit... choosing your venue"
      from: sfB + 30.2,
      until: sfB + 37.8,
      chips: [
        {label: "Enquiry", at: sfB + 30.56},
        {label: "Tour booked", at: sfB + 32.04},
        {label: "Venue visit", at: sfB + 33.64},
        {label: "Your venue chosen", at: sfB + 35.84},
      ],
    },
    {
      // "...export your sequence into the VenueBot Care CRM, HubSpot, ActiveCampaign, MailChimp"
      from: sfB + 79.6,
      until: sfB + 87,
      chips: [
        {label: "VenueBot Care", at: sfB + 80.08},
        {label: "HubSpot", at: sfB + 83.56},
        {label: "ActiveCampaign", at: sfB + 84.36},
        {label: "MailChimp", at: sfB + 85.62},
      ],
    },
  ],
  stamps: [
    {
      // "They lose bookings because the conversation stops." (5.4-5.9)
      from: 3.2,
      until: 7.2,
      lines: [{text: "The conversation stops.", at: 5.0, variant: "serif"}],
    },
    {
      // "An enquiry arrives, a brochure gets sent, then nothing." (8.6-16.5)
      from: 7.4,
      until: 17.6,
      mode: "full",
      lines: [
        {text: "An enquiry arrives.", at: 8.5, variant: "serif"},
        {text: "A brochure gets sent.", at: 9.6, variant: "serif"},
        {text: "Then… nothing.", at: 11.3, variant: "serif-italic"},
        {text: "For days. Sometimes weeks.", at: 14.6, variant: "caps"},
      ],
    },
    {
      // "...aren't always the most beautiful. They're usually the ones that stay in touch."
      from: sfB + 87.6,
      until: sfB + 99.4,
      mode: "full",
      lines: [
        {text: "Not always the most beautiful.", at: sfB + 92.4, variant: "serif-italic"},
        {text: "The ones that stay in touch.", at: sfB + 95.8, variant: "serif"},
      ],
    },
  ],
};

// M1-SG: part A (S01-S06, 95.2s) at 0; part B (S07-Close, trimmed at 73.5s
// before a Whisper hallucination tail) at 97.5.
const sgB = 97.5;

export const m1Sg: ModuleSectionConfig = {
  id: "M1-SG",
  moduleNumber: "04",
  title: "Brochure Analyser",
  tagline: "The first real piece of your venue couples take home.",
  audio: "audio/studio-ai/m1-sg-a-tail.m4a",
  audioMore: [{src: "audio/studio-ai/m1-sg-b-tail.m4a", at: sgB}],
  duration: 173.5,
  chapterUntil: 3.0,
  clips: [
    // (0-12.6: editorial open - sofa / partner / shortlist)
    // "Yet most brochures are never reviewed..." + "Studio AI changes that." (13.0-24.4)
    {src: "proof/studio-ai/m1-sg-landing.mp4", at: 12.6, until: 25.0, zoom: 1.15},
    // "We've analysed wedding buyer behaviour..." (25.6-38.3) - hold on the 45+ sources banner
    {src: "proof/studio-ai/m1-sg-research.mp4", at: 25.0, until: 39.5, zoom: 1.45},
    // "Simply upload your existing brochure..." (39.5-46.2)
    {src: "proof/studio-ai/m1-sg-upload.mp4", at: 39.5, until: 48.4, zoom: 1.15},
    // "extracts... scores... identifies... rewritten version" (48.8-64.0)
    {src: "proof/studio-ai/m1-sg-progress.mp4", at: 48.4, until: 64.6, zoom: 1.2},
    // "a complete performance score" (65.1-74.7)
    {src: "proof/studio-ai/m1-sg-score.mp4", at: 64.6, until: 75.8, zoom: 1.15},
    // "analysed across the factors..." + the eight categories (76.2-95.2)
    {src: "proof/studio-ai/m1-sg-categories.mp4", at: 75.8, until: sgB, zoom: 1},
    // Part B: "identifies what's missing..." (B 0-17.9) - Needs Work cards
    {src: "proof/studio-ai/m1-sg-weaknesses.mp4", at: sgB, until: sgB + 18.6, zoom: 1.42},
    // "improved version, side by side" + "nothing is hidden" (B 19.2-32.4)
    {src: "proof/studio-ai/m1-sg-sidebyside.mp4", at: sgB + 18.6, until: sgB + 33, zoom: 1},
    // "the goal isn't to replace your voice..." (B 33.5-43.7)
    {src: "proof/studio-ai/m1-sg-rewrite.mp4", at: sgB + 33, until: sgB + 45, zoom: 1},
    // "approve it... request a revision... download" (B 45.3-55.5)
    {src: "proof/studio-ai/m1-sg-approve.mp4", at: sgB + 45, until: sgB + 56.2, zoom: 1.42},
    // (B 56.2-76: editorial close)
  ],
  chipGroups: [
    {
      // "PDF, Word document or your current sales pack"
      from: 42.0,
      until: 48.2,
      chips: [
        {label: "PDF", at: 42.46},
        {label: "Word doc", at: 43.64},
        {label: "Sales pack", at: 45.5},
      ],
    },
    {
      // "extracts the content, scores it... identifies weaknesses... rewritten version"
      from: 49.8,
      until: 60.5,
      chips: [
        {label: "Extract", at: 50.22},
        {label: "Score", at: 52.04},
        {label: "Identify weaknesses", at: 55.02},
        {label: "Rewrite", at: 57.7},
      ],
    },
    {
      // The eight scoring categories, first four
      from: 81.0,
      until: 88.2,
      chips: [
        {label: "Emotional connection", at: 81.38},
        {label: "Differentiation", at: 83.52},
        {label: "Social proof", at: 85.0},
        {label: "CTA clarity", at: 86.92},
      ],
    },
    {
      // ...and the second four
      from: 88.2,
      until: 95.8,
      chips: [
        {label: "Pricing confidence", at: 88.36},
        {label: "Visual storytelling", at: 89.9},
        {label: "Practical info", at: 91.62},
        {label: "Ideal couple fit", at: 93.3},
      ],
    },
  ],
  stamps: [
    {
      // "...read on the sofa, share with their partner, compare against..." (6.3-12.0)
      from: 3.0,
      until: 12.6,
      mode: "full",
      lines: [
        {text: "Read on the sofa.", at: 5.9, variant: "serif"},
        {text: "Shared with their partner.", at: 7.7, variant: "serif"},
        {text: "Compared against every shortlist.", at: 10.2, variant: "serif-italic"},
      ],
    },
    {
      // "Studio AI changes that." (22.2-24.4)
      from: 22.0,
      until: 25.4,
      lines: [{text: "Studio AI changes that.", at: 22.5, variant: "serif"}],
    },
    {
      // "Nothing is hidden. Every change is transparent and reviewable." (B 27.5-32.4)
      from: sgB + 28.0,
      until: sgB + 33.0,
      lines: [
        {text: "Nothing hidden.", at: sgB + 28.5, variant: "serif"},
        {text: "Transparent. Reviewable.", at: sgB + 30.4, variant: "caps"},
      ],
    },
    {
      // Closing: "Great venues deserve great brochures... easier to say yes to."
      from: sgB + 56.2,
      until: sgB + 75.4,
      mode: "full",
      lines: [
        {text: "Great venues deserve great brochures.", at: sgB + 57.2, variant: "serif"},
        {text: "The clearest venue often wins.", at: sgB + 65.8, variant: "serif-italic"},
        {text: "Not because it's cheaper.", at: sgB + 70.0, variant: "caps"},
        {text: "Because it's easier to say yes to.", at: sgB + 71.7, variant: "serif"},
      ],
    },
  ],
};

// M1-SH Website Analyser: single VO covering S01 through the close + the
// Competitor Intel teaser. Audio trimmed at 179.4s (hallucination tail).
export const m1Sh: ModuleSectionConfig = {
  id: "M1-SH",
  moduleNumber: "05",
  title: "Website Analyser",
  tagline: "A beautiful website isn't enough.",
  audio: "audio/studio-ai/m1-sh-transcript-tail.m4a",
  duration: 182,
  chapterUntil: 3.2,
  clips: [
    // Dashboard -> Website Analyser nav under "designed to guide couples towards taking action"
    {src: "proof/studio-ai/m1-sh-nav.mp4", at: 3.2, until: 10.7, zoom: 1.42},
    // "reviews your website against proven conversion principles" (10.7-21.5)
    {src: "proof/studio-ai/m1-sh-analyser.mp4", at: 10.7, until: 22.0, zoom: 1.42},
    // "Simply enter your website address." (22.0-24.2)
    {src: "proof/studio-ai/m1-sh-url.mp4", at: 22.0, until: 24.7, zoom: 1},
    // "analyses your content, UX, lead capture..." (24.7-34.7)
    {src: "proof/studio-ai/m1-sh-analyses.mp4", at: 24.7, until: 35.9, zoom: 1},
    // "complete website performance score" (35.9-50.7) - hold on the 72 wheel
    {src: "proof/studio-ai/m1-sh-scorehold.mp4", at: 35.9, until: 51.4, zoom: 1.42},
    // "The Executive Summary highlights strengths, weaknesses..." (51.8-61.7)
    {src: "proof/studio-ai/m1-sh-exec.mp4", at: 51.4, until: 63.0, zoom: 1},
    // "prioritised by impact: quick wins, medium effort, strategic investments" (63.4-74.8)
    {src: "proof/studio-ai/m1-sh-priorities.mp4", at: 63.0, until: 75.6, zoom: 1.2},
    // "Not every issue carries the same weight" (76.1-86.4)
    {src: "proof/studio-ai/m1-sh-weights.mp4", at: 75.6, until: 86.6, zoom: 1},
    // "the areas that matter most" - six categories (86.8-104.8)
    {src: "proof/studio-ai/m1-sh-areas.mp4", at: 86.6, until: 105.5, zoom: 1.45},
    // "a complete picture" - performance radar (106.0-112.6)
    {src: "proof/studio-ai/m1-sh-radar.mp4", at: 105.5, until: 112.6, zoom: 1.42},
    // "Every score is backed by detailed analysis" (112.6-122.2)
    {src: "proof/studio-ai/m1-sh-detail.mp4", at: 112.6, until: 123.2, zoom: 1},
    // "where VenueBot's conversion systems could further strengthen" (123.4-139.8)
    {src: "proof/studio-ai/m1-sh-venuebot.mp4", at: 123.2, until: 141.2, zoom: 1},
    // (141.2-157.5: editorial - conversion problem + 30-50% stat)
    // "once you can see those issues, you can start fixing them" (157.7-162.5)
    {src: "proof/studio-ai/m1-sh-fixing.mp4", at: 157.5, until: 163.5, zoom: 1.42},
    // (163.5-182: editorial close + Competitor Intel teaser)
  ],
  chipGroups: [
    {
      // "content, user experience, lead capture, pricing transparency, trust signals, technical performance"
      from: 26.2,
      until: 35.7,
      chips: [
        {label: "Content", at: 26.5},
        {label: "User experience", at: 27.74},
        {label: "Lead capture", at: 29.3},
        {label: "Pricing transparency", at: 30.0},
        {label: "Trust signals", at: 31.88},
        {label: "Technical", at: 33.5},
      ],
    },
    {
      // "quick wins, medium effort improvements and strategic investments"
      from: 66.5,
      until: 74.6,
      chips: [
        {label: "Quick wins", at: 66.92},
        {label: "Medium effort", at: 68.46},
        {label: "Strategic investments", at: 70.38},
      ],
    },
    {
      // "first impressions, mobile experience, pricing transparency, lead capture, trust..."
      from: 94.6,
      until: 105.2,
      chips: [
        {label: "First impressions", at: 95.06},
        {label: "Mobile experience", at: 96.06},
        {label: "Pricing transparency", at: 98.48},
        {label: "Lead capture", at: 100.2},
        {label: "Trust & credibility", at: 101.2},
        {label: "Enquiry journey", at: 103.5},
      ],
    },
    {
      // "what it found, why it matters, and exactly what should be improved"
      from: 117.6,
      until: 123.0,
      chips: [
        {label: "What it found", at: 118.02},
        {label: "Why it matters", at: 119.26},
        {label: "What to improve", at: 121.68},
      ],
    },
  ],
  stamps: [
    {
      // "not a generic SEO audit. A venue-specific conversion review" (39.8-46.2)
      from: 39.5,
      until: 47.0,
      lines: [
        {text: "Not a generic SEO audit.", at: 39.9, variant: "caps"},
        {text: "A conversion review for venues.", at: 43.8, variant: "serif"},
      ],
    },
    {
      // "Most venues don't have a traffic problem. They have a conversion problem." (143.4-147.6)
      from: 141.6,
      until: 148.0,
      mode: "full",
      lines: [
        {text: "Not a traffic problem.", at: 143.3, variant: "serif"},
        {text: "A conversion problem.", at: 145.6, variant: "serif-italic"},
      ],
    },
    {
      // "lose between 30 and 50% of potential enquiries" (148.0-156.4)
      from: 148.0,
      until: 157.3,
      mode: "full",
      lines: [
        {text: "30–50%", at: 150.6, variant: "display"},
        {text: "of enquiries lost before a couple ever gets in touch", at: 152.8, variant: "caps"},
      ],
    },
    {
      // "your website doesn't exist in isolation. Couples are comparing..." (163.8-170.7)
      from: 163.7,
      until: 172.0,
      mode: "full",
      lines: [
        {text: "Your website doesn't exist in isolation.", at: 164.4, variant: "serif"},
        {text: "Couples compare.", at: 168.0, variant: "serif-italic"},
      ],
    },
    {
      // "Next, competitor intel..." (172.2-179.3)
      from: 172.0,
      until: 181.6,
      mode: "full",
      lines: [
        {text: "Next: Competitor Intel.", at: 172.6, variant: "serif"},
        {text: "Where does your venue really stand?", at: 175.8, variant: "caps"},
      ],
    },
  ],
};
