export const videoWidth = 1920;
export const videoHeight = 1080;
export const videoFps = 30;

export const seconds = (value: number) => Math.round(value * videoFps);
export const introSplashDurationFrames = seconds(4);
export const chapterCardDurationFrames = seconds(8);

export const introScenes = [
  {
    id: "M1-SA-SB-V3",
    title: "Intro positioning film",
    audio: "audio/intro-m1-sa-sb-v3.mp3",
    start: introSplashDurationFrames,
    duration: seconds(152.2),
  },
] as const;

export const introDurationFrames = introScenes.reduce(
  (max, scene) => Math.max(max, scene.start + scene.duration),
  0,
);

export const introStats = [
  {
    value: "81%",
    label: "of couples felt frustrated by venue response times",
    cue: "saStat81",
  },
  {
    value: "Nearly 70%",
    label: "make their decision after visiting three venues or fewer",
    cue: "saVenueCards",
  },
  {
    value: "Almost 70%",
    label: "of wedding enquiries happen outside normal office hours",
    cue: "saStat68",
  },
];

export const videoSections = [
  {
    number: 1,
    id: "Intro",
    sourceIds: ["M1-SA-SB-V3"],
    role: "V3 positioning film: problem, recognition, VenueBot philosophy, Knowledge, Engagement, Control.",
  },
  {
    number: 2,
    id: "StudioAI",
    sourceIds: ["M1-SC", "M1-SD", "M1-SE", "M1-SF", "M1-SG", "M1-SH", "M1-SI"],
    role: "Polished product reveal and intelligent analysis walkthrough.",
  },
  {
    number: 3,
    id: "Convert",
    sourceIds: ["M2-SK", "M2-SL", "M2-SM", "M2-SN", "M2-SO", "M2-SP", "M2-SQ"],
    role: "Speed, response, nurture journey, and booking flow.",
  },
  {
    number: 4,
    id: "Care",
    sourceIds: ["M3-SR", "M3-SS", "M3-ST", "M3-SU", "M3-SV", "M3-SW", "M3-SX", "M3-SY", "M3-SZ", "M3-SAA", "M3-SAB", "M3-SBB", "M3-SCC", "M3-SDD"],
    role: "CRM, inbox, pipeline, follow-up, and operational control.",
  },
] as const;
