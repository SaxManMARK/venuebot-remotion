import {introSplashDurationFrames, seconds} from "./video";

export const studioAiScenes = {
  m1Sc: {
    id: "M1-SC",
    title: "Studio AI overview",
    audio: "audio/studio-ai/m1-sc-transcript-tail.m4a",
    proof: "proof/studio-ai/m1-sc-dashboard-venue-intelligence.mp4",
    proofClip: "proof/studio-ai/m1-sc-dashboard-venue-intelligence-proof-10s-3s.mp4",
    sourceStart: seconds(10),
    contentDuration: seconds(53.4),
    duration: introSplashDurationFrames + seconds(53.4),
  },
  m1Sd: {
    id: "M1-SD",
    title: "Venue Intelligence",
    audio: "audio/studio-ai/m1-sd-transcript-tail.m4a",
    // 42s = 40.28s transcript + clean silent tail (apad), matching the M1-SC approach.
    contentDuration: seconds(42),
    duration: seconds(42),
  },
} as const;
