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
import type {CSSProperties} from "react";
import {seconds} from "../data/video";
import {font, palette} from "../theme";
import {HeadlineReveal, LightMotes, drift, reveal} from "./StudioAI";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export type ModuleClip = {
  src: string;
  at: number;
  until: number;
  /** Crops the macOS desktop out of wide shots. 1 = modal/zoomed source. */
  zoom: number;
};

export type ChipGroup = {
  from: number;
  until: number;
  chips: {label: string; at: number}[];
};

export type StampLine = {
  text: string;
  at: number;
  /** Typographic voice for editorial variety. */
  variant?: "serif" | "serif-italic" | "caps" | "thin-caps";
};

export type Stamp = {
  from: number;
  until: number;
  lines: StampLine[];
  /** "dim" floats lines over a porcelain wash on the recording; "full" hides the recording. */
  mode?: "dim" | "full";
};

export type ModuleSectionConfig = {
  id: string;
  moduleNumber: string;
  title: string;
  tagline: string;
  audio: string;
  /** Total section length in seconds (VO + clean tail). */
  duration: number;
  /** When the chapter overlay finishes fading and the recording owns the frame. */
  chapterUntil: number;
  clips: ModuleClip[];
  chipGroups?: ChipGroup[];
  stamps?: Stamp[];
  closing?: {text: string; at: number};
};

const crossfade = 0.45;

const lineStyle: Record<NonNullable<StampLine["variant"]>, CSSProperties> = {
  serif: {fontFamily: font.title, fontWeight: 800},
  "serif-italic": {fontFamily: font.title, fontWeight: 700, fontStyle: "italic"},
  caps: {fontFamily: font.body, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: "0.62em"},
  "thin-caps": {fontFamily: font.body, fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.3em", fontSize: "0.56em"},
};

const ChipRow = ({group}: {group: ChipGroup}) => {
  const frame = useCurrentFrame();
  const rowOpacity = interpolate(
    frame,
    [seconds(group.from), seconds(group.from + 0.3), seconds(group.until - 0.4), seconds(group.until)],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <div className="studio-sd-chips" style={{opacity: rowOpacity}}>
      {group.chips.map((chip) => {
        const pop = reveal(frame, seconds(chip.at), seconds(0.42));

        return (
          <span
            key={chip.label}
            style={{
              opacity: pop,
              transform: `translateY(${(1 - pop) * 26}px) scale(${0.92 + pop * 0.08})`,
            }}
          >
            {chip.label}
          </span>
        );
      })}
    </div>
  );
};

const StampOverlay = ({stamp}: {stamp: Stamp}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [seconds(stamp.from), seconds(stamp.from + 0.5), seconds(stamp.until - 0.6), seconds(stamp.until)],
    [0, 1, 1, 0],
    clamp,
  );

  return (
    <div className="studio-sd-stamp" style={{opacity}}>
      {stamp.lines.map((line) => {
        const pop = reveal(frame, seconds(line.at), seconds(0.5));

        return (
          <strong
            key={line.text}
            style={{
              ...lineStyle[line.variant ?? "serif"],
              opacity: pop,
              transform: `translateY(${(1 - pop) * 30}px)`,
            }}
          >
            {line.text}
          </strong>
        );
      })}
    </div>
  );
};

const ModuleChapter = ({config}: {config: ModuleSectionConfig}) => {
  const frame = useCurrentFrame();
  const fadeStart = config.chapterUntil - 0.9;
  const opacity = interpolate(frame, [seconds(fadeStart), seconds(config.chapterUntil)], [1, 0], clamp);
  const rule = reveal(frame, seconds(0.4), seconds(0.9));

  return (
    <AbsoluteFill className="studio-sd-chapter" style={{opacity}}>
      <span className="studio-sd-chapter-kicker" style={{opacity: reveal(frame, seconds(0.2))}}>
        Studio AI · Module {config.moduleNumber}
      </span>
      <h1 style={{fontFamily: font.title}}>
        <HeadlineReveal from={seconds(0.55)}>{config.title}</HeadlineReveal>
      </h1>
      <div className="studio-sd-chapter-rule" style={{transform: `scaleX(${rule})`}} />
      <p style={{opacity: reveal(frame, seconds(1.3))}}>{config.tagline}</p>
    </AbsoluteFill>
  );
};

export const StudioModuleSection = ({config}: {config: ModuleSectionConfig}) => {
  const frame = useCurrentFrame();

  // The screen card bows out during editorial typographic beats (gaps in clip coverage).
  // Merge contiguous clips into coverage intervals, then fade at each interval's edges.
  const intervals: {start: number; end: number}[] = [];
  for (const clip of [...config.clips].sort((a, b) => a.at - b.at)) {
    const last = intervals[intervals.length - 1];
    if (last && clip.at - last.end < 0.02) {
      last.end = Math.max(last.end, clip.until);
    } else {
      intervals.push({start: clip.at, end: clip.until});
    }
  }
  const screenOpacity = Math.max(
    0,
    ...intervals.map((iv) =>
      interpolate(
        frame,
        [seconds(iv.start), seconds(iv.start + 0.45), seconds(iv.end - 0.45), seconds(iv.end)],
        [iv.start === 0 ? 1 : 0, 1, 1, iv.end >= config.duration - 0.05 ? 1 : 0],
        clamp,
      ),
    ),
  );

  const closingOpacity = config.closing
    ? interpolate(frame, [seconds(config.closing.at), seconds(config.closing.at + 0.5)], [0, 1], clamp)
    : 0;

  return (
    <AbsoluteFill style={{backgroundColor: palette.porcelain}}>
      <Audio src={staticFile(config.audio)} />

      <AbsoluteFill className="studio-sd-stage">
        <Img
          alt="Premium wedding venue atmosphere"
          className="studio-sd-plate"
          src={staticFile("plates/studio-ai/couple-planning-table.png")}
          style={{
            transform: `translate3d(${drift(frame, 12, 6)}px, ${drift(frame, 40, 4)}px, 0) scale(1.07)`,
          }}
        />
        <div className="studio-sd-grade" />
        <LightMotes />

        <div className="studio-sd-header" style={{opacity: reveal(frame, seconds(config.chapterUntil))}}>
          <span>Studio AI</span>
          <strong>
            {config.moduleNumber} — {config.title}
          </strong>
        </div>

        <div className="studio-sd-screen" style={{opacity: screenOpacity}}>
          {config.clips.map((clip, index) => {
            const fadeIn =
              clip.at === 0
                ? 1
                : interpolate(frame, [seconds(clip.at), seconds(clip.at + crossfade)], [0, 1], clamp);
            const next = config.clips[index + 1];
            const holdTail = next && Math.abs(next.at - clip.until) < 0.01 ? crossfade : 0;

            return (
              <Sequence
                from={seconds(clip.at)}
                durationInFrames={seconds(clip.until - clip.at + holdTail)}
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

        {(config.chipGroups ?? []).map((group, index) => (
          <ChipRow group={group} key={index} />
        ))}

        {(config.stamps ?? []).map((stamp, index) => (
          <StampOverlay key={index} stamp={stamp} />
        ))}

        {config.closing ? (
          <div className="studio-sd-closing" style={{opacity: closingOpacity}}>
            <HeadlineReveal from={seconds(config.closing.at + 0.15)}>{config.closing.text}</HeadlineReveal>
          </div>
        ) : null}

        <ModuleChapter config={config} />

        <div className="studio-ai-scene-code" style={{opacity: 0.8}}>
          {config.id}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
