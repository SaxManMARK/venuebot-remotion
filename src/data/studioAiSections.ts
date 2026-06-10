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
