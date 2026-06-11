import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {seconds} from "../data/video";
import {font, palette} from "../theme";
import {HeadlineReveal, LightMotes, drift, reveal} from "./StudioAI";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

// Recording-led timeline. `at` is when each pre-trimmed proof clip takes over,
// chosen so the on-screen product matches the voiceover beat (see transcripts/m1-sd.cue.md).
// `zoom` crops the macOS desktop out of the wide shots so the product fills the editorial frame.
const clips = [
  {src: "proof/studio-ai/m1-sd-nav.mp4", at: 0, until: 7.6, zoom: 1.32}, // dashboard -> Venue Intelligence nav
  {src: "proof/studio-ai/m1-sd-steps.mp4", at: 7.6, until: 12.2, zoom: 1.32}, // "what your venue is... who it's for"
  {src: "proof/studio-ai/m1-sd-about.mp4", at: 12.2, until: 18.2, zoom: 1}, // spaces / packages / pricing / story
  {src: "proof/studio-ai/m1-sd-customer.mp4", at: 18.2, until: 26.4, zoom: 1}, // ideal couple, priorities, preferences
  {src: "proof/studio-ai/m1-sd-steps.mp4", at: 26.4, until: 30.6, zoom: 1.32}, // approved profile: added once
  {src: "proof/studio-ai/m1-sd-pricing.mp4", at: 30.6, until: 36.8, zoom: 1}, // content / nurture / recommendations
  {src: "proof/studio-ai/m1-sd-overview.mp4", at: 36.8, until: 42, zoom: 1.32}, // pull back: tailored to your venue
];

const crossfade = 0.45;

// Word-timed keyword chips (VO-relative seconds from transcripts/m1-sd.words.csv).
const aboutChips = [
  {label: "Your spaces", at: 13.7},
  {label: "Your packages", at: 14.7},
  {label: "Your pricing", at: 15.78},
  {label: "Your story", at: 16.86},
];

const customerChips = [
  {label: "Their priorities", at: 21.42},
  {label: "Their preferences", at: 22.68},
  {label: "Their buying journey", at: 24.34},
];

const ChipRow = ({
  chips,
  from,
  until,
}: {
  chips: {label: string; at: number}[];
  from: number;
  until: number;
}) => {
  const frame = useCurrentFrame();
  const rowOpacity = interpolate(
    frame,
    [seconds(from), seconds(from + 0.3), seconds(until - 0.4), seconds(until)],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <div className="studio-sd-chips" style={{opacity: rowOpacity}}>
      {chips.map((chip, index) => {
        const pop = reveal(frame, seconds(chip.at), seconds(0.42));
        // One warm peach sheen sweeps through as the pill lands, then settles.
        const sweep = interpolate(
          frame,
          [seconds(chip.at + 0.18), seconds(chip.at + 1.15)],
          [-35, 135],
          clamp,
        );
        const breathe = 0.5 + Math.sin((frame + index * 19) / 17) * 0.5;

        return (
          <span
            key={chip.label}
            style={{
              opacity: pop,
              transform: `translateY(${(1 - pop) * 26}px) scale(${0.92 + pop * 0.08 + breathe * 0.008})`,
              backgroundImage: `linear-gradient(105deg, transparent ${sweep - 10}%, rgba(255, 230, 180, 0.26) ${sweep}%, transparent ${sweep + 10}%)`,
              boxShadow: `0 18px ${40 + breathe * 10}px rgba(47, 31, 41, ${0.32 + breathe * 0.1}), inset 0 1px 0 rgba(255, 255, 255, 0.14)`,
            }}
          >
            {chip.label}
          </span>
        );
      })}
    </div>
  );
};

// Full-frame editorial chapter open, then the recording carries the section.
const ModuleChapter = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [seconds(3.4), seconds(4.3)], [1, 0], clamp);
  const rule = reveal(frame, seconds(0.4), seconds(0.9));

  return (
    <AbsoluteFill className="studio-sd-chapter" style={{opacity}}>
      <span className="studio-sd-chapter-kicker" style={{opacity: reveal(frame, seconds(0.2))}}>
        Studio AI · Module 01
      </span>
      <h1 style={{fontFamily: font.title}}>
        <HeadlineReveal from={seconds(0.55)}>Venue Intelligence</HeadlineReveal>
      </h1>
      <div className="studio-sd-chapter-rule" style={{transform: `scaleX(${rule})`}} />
      <p style={{opacity: reveal(frame, seconds(1.3))}}>
        A digital blueprint of your venue — and the couples it's for.
      </p>
    </AbsoluteFill>
  );
};

export const StudioAIVenueIntelligence = () => {
  const frame = useCurrentFrame();

  // "Added once, used everywhere." lands as an editorial stamp over the approved profile.
  const stampOnce = reveal(frame, seconds(26.9), seconds(0.5));
  const stampEverywhere = reveal(frame, seconds(28.2), seconds(0.5));
  const stampOpacity = interpolate(
    frame,
    [seconds(26.6), seconds(27.1), seconds(30.0), seconds(30.6)],
    [0, 1, 1, 0],
    clamp,
  );

  const closingOpacity = interpolate(frame, [seconds(36.9), seconds(37.4)], [0, 1], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: palette.porcelain}}>
      <Audio src={staticFile("audio/studio-ai/m1-sd-transcript-tail.m4a")} />

      <AbsoluteFill className="studio-sd-stage">
        <Img
          alt="Couple planning their wedding"
          className="studio-sd-plate"
          src={staticFile("plates/studio-ai/couple-planning-table.png")}
          style={{
            transform: `translate3d(${drift(frame, 12, 6)}px, ${drift(frame, 40, 4)}px, 0) scale(1.07)`,
          }}
        />
        <div className="studio-sd-grade" />
        <LightMotes />

        <div className="studio-sd-header" style={{opacity: reveal(frame, seconds(4.1))}}>
          <span>Studio AI</span>
          <strong>01 — Venue Intelligence</strong>
        </div>

        <div className="studio-sd-screen">
          {clips.map((clip, index) => {
            const fadeIn =
              index === 0
                ? 1
                : interpolate(
                    frame,
                    [seconds(clip.at), seconds(clip.at + crossfade)],
                    [0, 1],
                    clamp,
                  );

            return (
              <Sequence
                from={seconds(clip.at)}
                durationInFrames={seconds(clip.until - clip.at + (index < clips.length - 1 ? crossfade : 0))}
                key={`${clip.src}-${clip.at}`}
              >
                <OffthreadVideo
                  muted
                  src={staticFile(clip.src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: fadeIn,
                    transform: `scale(${clip.zoom})`,
                    transformOrigin: "50% 46%",
                  }}
                />
              </Sequence>
            );
          })}
          <div className="studio-sd-screen-ring" />
        </div>

        <ChipRow chips={aboutChips} from={13.4} until={18.4} />
        <ChipRow chips={customerChips} from={21.1} until={26.4} />

        <div className="studio-sd-stamp" style={{opacity: stampOpacity}}>
          <strong style={{fontFamily: font.title, opacity: stampOnce, transform: `translateY(${(1 - stampOnce) * 30}px)`}}>
            Added once.
          </strong>
          <strong style={{fontFamily: font.title, opacity: stampEverywhere, transform: `translateY(${(1 - stampEverywhere) * 30}px)`}}>
            Used everywhere.
          </strong>
        </div>

        <div className="studio-sd-closing" style={{opacity: closingOpacity}}>
          <HeadlineReveal from={seconds(37.2)}>
            Tailored to your venue — and the couples you want more of.
          </HeadlineReveal>
        </div>

        <ModuleChapter />

        <div className="studio-ai-scene-code" style={{opacity: 0.8}}>
          M1-SD
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
