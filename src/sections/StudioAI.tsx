import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  Video,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type {CSSProperties} from "react";
import {PremiumBackground} from "../components/Background";
import {VenueBotSplash} from "../components/VenueBotSplash";
import {introSplashDurationFrames, seconds} from "../data/video";
import {studioAiScenes} from "../data/studioAi";
import {font, palette} from "../theme";

const scene = studioAiScenes.m1Sc;
const contentStart = introSplashDurationFrames;
const studioAiPlates = {
  opening: "plates/studio-ai/cinematic-manor-lake.png",
  couplePlanning: "plates/studio-ai/couple-planning-table.png",
  // NOTE: laptop-planning-context.png is the M1-SC storyboard/reference sheet, not a photo —
  // using it as a background bled its text into the film. Point at a real photographic plate.
  planningContext: "plates/studio-ai/couple-planning-table.png",
} as const;

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const reveal = (frame: number, start: number, duration = seconds(0.8)) =>
  interpolate(frame, [start, start + duration], [0, 1], {
    ...clamp,
    easing: ease,
  });

const sceneOpacity = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, start + seconds(1), end - seconds(1), end], [0, 1, 1, 0], clamp);

export const drift = (frame: number, offset = 0, amount = 8) => Math.sin((frame + offset) / 78) * amount;

const transform3dCardEntrance = (progress: number, index: number) => {
  const eased = Easing.bezier(0.16, 1, 0.3, 1)(progress);
  const x = interpolate(eased, [0, 1], [(index - 1.5) * 120, 0]);
  const y = interpolate(eased, [0, 1], [210, 0]);
  const z = interpolate(eased, [0, 1], [-520, 0]);
  const rotateX = interpolate(eased, [0, 1], [-48 + index * 8, 0]);
  const rotateY = interpolate(eased, [0, 1], [index % 2 === 0 ? -36 : 36, 0]);
  const rotateZ = interpolate(eased, [0, 1], [index % 2 === 0 ? -8 : 8, 0]);
  const scale = interpolate(eased, [0, 1], [0.68, 1]);

  return `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
};

const cardSweep = (frame: number, start: number) =>
  interpolate(frame, [start - seconds(0.15), start + seconds(0.75)], [-140, 140], clamp);

// Shared SVG path geometry so the base stroke and the traveling light pulse stay aligned.
const knowledgeThreadMain =
  "M 156 722 C 350 560, 520 610, 706 470 C 900 322, 1058 380, 1230 282 C 1430 166, 1546 236, 1744 150";
const knowledgeThreadSoft =
  "M 254 846 C 454 702, 612 742, 786 630 C 980 504, 1128 562, 1320 452 C 1516 338, 1602 390, 1728 298";
const intelligenceConnector =
  "M 650 674 C 850 566, 1000 606, 1180 468 C 1360 330, 1512 300, 1810 258";

// A repeating bead pattern (in pathLength=1 units) that flows along a path to read as a current of light.
const pulseDashLength = 0.235;
const travelingPulseOffset = (frame: number, period: number, phase = 0) =>
  -(((frame + phase) % period) / period) * pulseDashLength;

// Snappy spring entrance with a touch of overshoot, used to make cards land with energy.
const springPop = (fps: number, frame: number, startFrame: number) =>
  spring({
    fps,
    frame: frame - startFrame,
    config: {damping: 15, stiffness: 180, mass: 0.7},
  });

// Reuses the stat-card "spark" treatment: a glow pulse and a light sweep as a card lands.
const sparkStyle = (frame: number, progress: number, cardStart: number) => ({
  ["--card-pulse" as string]: `${interpolate(progress, [0, 0.7, 1], [0, 1, 0.14], clamp)}`,
  ["--card-sweep" as string]: `${cardSweep(frame, cardStart)}%`,
});

const sources = [
  {label: "Bridebook", logo: "logos/research-sources/bridebook.svg", note: "Couple planning", at: 14.5},
  {label: "Hitched", logo: "logos/research-sources/hitched.svg", note: "Venue search", at: 15.5},
  {label: "Google", logo: "logos/research-sources/google.svg", note: "Search intent", at: 15.8},
  {label: "Salesforce", logo: "logos/research-sources/salesforce-official.png", note: "Conversion data", at: 16.6},
  {label: "HubSpot", logo: "logos/research-sources/hubspot.png", note: "Nurture practice", at: 17.8},
  {label: "Harvard Business Review", logo: "logos/research-sources/harvard-business-review-official.png", note: "Decision science", at: 18.9},
  {label: "VenueBot", logo: "logos/research-sources/venuebot-logo.png", note: "Venue benchmarks", at: 20.3},
];

const intelligenceLayerCards = [
  ["120", "published sources"],
  ["Couple", "behaviour data"],
  ["Conversion", "best practice"],
  ["Venue", "journey research"],
];

const tools = [
  {label: "Venue Intelligence", icon: "venue"},
  {label: "Brand Voice", icon: "voice"},
  {label: "Nurture Sequences", icon: "nurture"},
  {label: "Brochure Analyser", icon: "document"},
  {label: "Website Analyser", icon: "screen"},
  {label: "Competitor Intelligence", icon: "market"},
];

const intelligenceAreas = [
  {label: "Venue Intelligence", icon: "venue"},
  {label: "Brand Voice", icon: "voice"},
  {label: "Nurture Journeys", icon: "nurture"},
  {label: "Content Performance", icon: "document"},
  {label: "Market Intelligence", icon: "market"},
];

// Ambient warm light motes — wandering golden-hour dust with a soft glow (the "fireflies"
// idea, recoloured warm and kept whisper-soft so it reads as premium atmosphere, not tech).
const lightMotes = Array.from({length: 26}).map((_, index) => ({
  left: (index * 47 + 9) % 100,
  top: (index * 29 + 13) % 100,
  size: 3 + (index % 4) * 2.4,
  driftX: 16 + (index % 5) * 7,
  driftY: 20 + (index % 4) * 8,
  speed: 84 + (index % 6) * 24,
  wanderX: (index % 3) - 1,
  phase: (index % 7) * 17,
  twinkle: (index % 5) * 12,
}));

export const LightMotes = () => {
  const frame = useCurrentFrame();

  return (
    <div className="studio-light-motes" aria-hidden="true">
      {lightMotes.map((mote, index) => {
        // Wander: two out-of-phase sinusoids per axis so paths feel organic, not orbital.
        const x =
          Math.sin((frame + mote.phase) / mote.speed) * mote.driftX +
          Math.sin((frame + mote.phase) / (mote.speed * 2.3)) * mote.driftX * 0.4 +
          mote.wanderX * (frame / mote.speed) * 0.6;
        const y =
          Math.cos((frame + mote.phase) / (mote.speed * 1.3)) * mote.driftY +
          Math.cos((frame + mote.phase) / (mote.speed * 0.7)) * mote.driftY * 0.3;
        const twinkle = 0.16 + (Math.sin((frame + mote.twinkle) / 23) * 0.5 + 0.5) * 0.56;
        const glow = 0.6 + (Math.sin((frame + mote.twinkle) / 19) * 0.5 + 0.5) * 0.8;

        return (
          <span
            key={index}
            style={{
              left: `${mote.left}%`,
              top: `${mote.top}%`,
              width: mote.size,
              height: mote.size,
              opacity: twinkle,
              boxShadow: `0 0 ${mote.size * 2.6}px ${mote.size * glow}px rgba(255, 222, 170, 0.6)`,
              transform: `translate(${x}px, ${y}px)`,
            }}
          />
        );
      })}
    </div>
  );
};

// Editorial headline reveal — words fade + un-blur + slide up, staggered. Frame-driven off the
// ambient (content-relative) frame with a `from` offset, matching the rest of this file.
export const HeadlineReveal = ({
  children,
  from,
  style,
}: {
  children: string;
  from: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const words = children.split(" ");
  const stagger = seconds(0.12);
  const duration = seconds(0.62);

  return (
    <span className="studio-rw" style={{display: "inline-block", ...style}}>
      {words.map((word, index) => {
        const wordStart = from + index * stagger;
        const progress = interpolate(frame, [wordStart, wordStart + duration], [0, 1], {
          ...clamp,
          easing: ease,
        });

        return (
          <span
            className="studio-rw"
            key={index}
            style={{
              display: "inline-block",
              marginRight: "0.26em",
              opacity: progress,
              filter: `blur(${(1 - progress) * 12}px)`,
              transform: `translateY(${(1 - progress) * 38}px)`,
              willChange: "transform, opacity, filter",
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

type IconName =
  | "behaviour"
  | "document"
  | "insight"
  | "market"
  | "nurture"
  | "screen"
  | "search"
  | "venue"
  | "voice";

const StudioIcon = ({name}: {name: IconName}) => {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
  };

  return (
    <svg className="studio-line-icon" viewBox="0 0 48 48" aria-hidden="true">
      {name === "venue" ? (
        <>
          <path {...common} d="M10 40V20l14-10 14 10v20" />
          <path {...common} d="M16 40V25h8v15" />
          <path {...common} d="M28 40V27h8v13" />
          <path {...common} d="M8 40h32" />
          <path {...common} d="M24 10v-4" />
        </>
      ) : null}
      {name === "voice" ? (
        <>
          <path {...common} d="M14 31c5 5 13 5 18 0" />
          <path {...common} d="M16 20c4-4 12-4 16 0" />
          <path {...common} d="M20 26c2-2 6-2 8 0" />
          <circle {...common} cx="24" cy="30" r="3" />
        </>
      ) : null}
      {name === "nurture" ? (
        <>
          <circle {...common} cx="15" cy="24" r="5" />
          <circle {...common} cx="33" cy="16" r="5" />
          <circle {...common} cx="33" cy="34" r="5" />
          <path {...common} d="M20 23l8-6" />
          <path {...common} d="M20 26l8 7" />
        </>
      ) : null}
      {name === "document" ? (
        <>
          <path {...common} d="M15 8h14l6 6v28H15z" />
          <path {...common} d="M29 8v7h7" />
          <path {...common} d="M20 22h14" />
          <path {...common} d="M20 29h14" />
          <path {...common} d="M20 36h9" />
        </>
      ) : null}
      {name === "screen" ? (
        <>
          <rect {...common} x="9" y="11" width="30" height="23" rx="3" />
          <path {...common} d="M18 40h12" />
          <path {...common} d="M24 34v6" />
          <path {...common} d="M15 18h18" />
          <path {...common} d="M15 24h9" />
        </>
      ) : null}
      {name === "market" ? (
        <>
          <path {...common} d="M12 38V26" />
          <path {...common} d="M22 38V19" />
          <path {...common} d="M32 38V12" />
          <path {...common} d="M9 38h30" />
          <path {...common} d="M10 18l8-6 8 4 11-9" />
        </>
      ) : null}
      {name === "search" ? (
        <>
          <circle {...common} cx="21" cy="21" r="10" />
          <path {...common} d="M29 29l9 9" />
          <path {...common} d="M17 21h8" />
        </>
      ) : null}
      {name === "behaviour" ? (
        <>
          <circle {...common} cx="18" cy="18" r="5" />
          <circle {...common} cx="31" cy="17" r="4" />
          <path {...common} d="M9 38c1-7 6-11 13-11s12 4 13 11" />
          <path {...common} d="M30 27c5 1 8 4 9 10" />
        </>
      ) : null}
      {name === "insight" ? (
        <>
          <path {...common} d="M16 25a9 9 0 1 1 16 0c-3 3-4 5-4 9h-8c0-4-1-6-4-9z" />
          <path {...common} d="M20 39h8" />
          <path {...common} d="M21 43h6" />
          <path {...common} d="M24 7V4" />
          <path {...common} d="M36 13l3-3" />
          <path {...common} d="M12 13l-3-3" />
        </>
      ) : null}
    </svg>
  );
};

const EditorialHeadline = ({
  kicker,
  title,
  body,
  start,
  className = "",
}: {
  kicker: string;
  title: string;
  body?: string;
  start: number;
  className?: string;
}) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start, seconds(0.9));

  return (
    <div
      className={`studio-copy ${className}`}
      style={{opacity: show, transform: `translateY(${(1 - show) * 34}px)`}}
    >
      <span>{kicker}</span>
      <h1 style={{fontFamily: font.title}}>{title}</h1>
      {body ? <p style={{fontFamily: font.title}}>{body}</p> : null}
    </div>
  );
};

const IntelligenceLayer = ({start}: {start: number}) => {
  const frame = useCurrentFrame();
  const show = sceneOpacity(frame, start, seconds(13.2));
  const line = reveal(frame, start + seconds(1.5), seconds(6.2));

  return (
    <div className="studio-intelligence-layer" style={{opacity: show}}>
      <Img
        alt="VenueBot Studio AI"
        className="studio-intelligence-logo"
        src={staticFile("brand/venuebot-studio-ai-logo-white.png")}
        style={{
          opacity: reveal(frame, start + seconds(0.4), seconds(0.9)),
          transform: `translateY(${(1 - reveal(frame, start + seconds(0.4), seconds(0.9))) * -18}px)`,
        }}
      />
      <div className="studio-intelligence-copy">
        <span>Studio AI</span>
        <h1 style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.9)}>The intelligence layer behind every booking.</HeadlineReveal>
        </h1>
        <p>Understanding what couples care about before you improve conversion.</p>
      </div>
      <div className="studio-intelligence-card-row">
        {intelligenceLayerCards.map(([lead, detail], index) => {
          const cardStart = start + seconds(1.75 + index * 0.45);
          const progress = reveal(frame, cardStart, seconds(1.05));
          const pulse = interpolate(progress, [0, 0.72, 1], [0, 1, 0.2], clamp);

          return (
            <div
              className="studio-intelligence-stat-card"
              key={`${lead}-${detail}`}
              style={{
                opacity: progress,
                transform: transform3dCardEntrance(progress, index),
                ["--card-sweep" as string]: `${cardSweep(frame, cardStart)}%`,
                ["--card-pulse" as string]: pulse,
              }}
            >
              <strong style={{fontFamily: font.title}}>{lead}</strong>
              <span>{detail}</span>
            </div>
          );
        })}
      </div>
      <svg className="studio-intelligence-line" viewBox="0 0 1920 1080" aria-hidden="true">
        <path
          d={intelligenceConnector}
          pathLength={1}
          style={{strokeDashoffset: 1 - line}}
        />
        <path
          className="studio-intelligence-pulse"
          d={intelligenceConnector}
          pathLength={1}
          style={{
            strokeDasharray: "0.035 0.2",
            strokeDashoffset: travelingPulseOffset(frame, seconds(1.2)),
            opacity: line * 0.9,
          }}
        />
        {[930, 1260, 1636].map((cx, index) => (
          <circle
            cx={cx}
            cy={[560, 420, 306][index]}
            key={cx}
            r={8}
            style={{opacity: reveal(frame, start + seconds(2.2 + index * 1.2), seconds(0.5))}}
          />
        ))}
      </svg>
    </div>
  );
};

const KnowledgeThread = ({start, proofStart}: {start: number; proofStart: number}) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start, seconds(1.4));
  const draw = interpolate(frame, [start, proofStart + seconds(8)], [1, 0], clamp);

  return (
    <svg className="studio-thread" viewBox="0 0 1920 1080" style={{opacity: show}} aria-hidden="true">
      <path
        d={knowledgeThreadMain}
        pathLength={1}
        style={{strokeDashoffset: draw}}
      />
      <path
        className="studio-thread-soft"
        d={knowledgeThreadSoft}
        pathLength={1}
        style={{strokeDashoffset: draw}}
      />
      <path
        className="studio-thread-pulse"
        d={knowledgeThreadMain}
        pathLength={1}
        style={{strokeDasharray: "0.03 0.2", strokeDashoffset: travelingPulseOffset(frame, seconds(1.1))}}
      />
      <path
        className="studio-thread-pulse studio-thread-pulse-soft"
        d={knowledgeThreadSoft}
        pathLength={1}
        style={{strokeDasharray: "0.03 0.26", strokeDashoffset: travelingPulseOffset(frame, seconds(1.5), 14)}}
      />
      {[206, 520, 810, 1214, 1512, 1718].map((cx, index) => (
        <circle
          cx={cx}
          cy={[682, 574, 386, 292, 224, 304][index]}
          key={cx}
          r={7}
          style={{opacity: reveal(frame, start + seconds(0.35 + index * 0.22), seconds(0.45))}}
        />
      ))}
    </svg>
  );
};

const ResearchFoundation = ({start}: {start: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const show = sceneOpacity(frame, start, seconds(23.2));
  const line = reveal(frame, seconds(13.4), seconds(3.2));
  const countProgress = interpolate(frame, [start + seconds(0.5), start + seconds(2.4)], [0, 1], {
    ...clamp,
    easing: ease,
  });
  const count = Math.round(countProgress * 120);
  const countLabel = count >= 120 ? "120+" : `${count}`;

  return (
    <div className="studio-research-scene" style={{opacity: show}}>
      <div className="studio-research-board">
        <div className="studio-research-number">
          <span>Research foundation</span>
          <strong>{countLabel}</strong>
          <em>wedding industry, behaviour, conversion and venue performance sources</em>
        </div>
        <div className="studio-research-line">
          <span style={{transform: `scaleX(${line})`}} />
        </div>
        <div className="studio-source-grid">
          {sources.map((source) => {
            const item = reveal(frame, seconds(source.at), seconds(0.52));
            const pop = spring({
              fps,
              frame: frame - seconds(source.at),
              config: {damping: 13, stiffness: 160, mass: 0.72},
            });
            const scale = interpolate(pop, [0, 1], [0.84, 1], clamp);

            return (
              <div
                className={`studio-source-card studio-spark studio-source-${source.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                key={source.label}
                style={{
                  opacity: item,
                  transform: `translateY(${(1 - item) * 24}px) scale(${scale})`,
                  ...sparkStyle(frame, item, seconds(source.at)),
                }}
              >
                <Img alt={source.label} src={staticFile(source.logo)} />
                <span>{source.note}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const UnderstandingSequence = ({start}: {start: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const show = sceneOpacity(frame, start, seconds(31.4));
  const journeyIcons: IconName[] = ["search", "venue", "document", "behaviour", "insight"];

  return (
    <div className="studio-understanding-sequence" style={{opacity: show}}>
      <div
        className="studio-understanding-photo"
        style={{
          opacity: reveal(frame, start + seconds(0.35), seconds(1.1)),
          transform: `translate3d(${drift(frame, 38, 4)}px, ${drift(frame, 61, 3)}px, 0)`,
        }}
      >
        <Img
          alt="Couple planning their wedding journey"
          src={staticFile(studioAiPlates.couplePlanning)}
          style={{transform: `translate3d(${drift(frame, 9, 7)}px, ${drift(frame, 23, 5)}px, 0) scale(1.06)`}}
        />
        <div />
      </div>
      <div className="studio-knowledge-title">
        <span>Modern couple behaviour</span>
        <strong style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.5)}>From first search to final decision.</HeadlineReveal>
        </strong>
        <p>We map the modern couple journey to understand what influences every step.</p>
      </div>
      <div className="studio-knowledge-path">
        {["Discover", "Shortlist", "Compare", "Decide", "Enquire"].map((step, index) => {
          const cardStart = start + seconds(0.3 + index * 0.42);
          const item = reveal(frame, cardStart, seconds(0.62));
          const pop = springPop(fps, frame, cardStart);
          const scale = interpolate(pop, [0, 1], [0.88, 1]);

          return (
            <div
              className={`studio-knowledge-node studio-spark ${index === 4 ? "is-proof" : ""}`}
              key={step}
              style={{
                opacity: item,
                transform: `translateY(${(1 - pop) * 30 + drift(frame, index * 13, 3)}px) scale(${scale})`,
                ...sparkStyle(frame, item, cardStart),
              }}
            >
              <StudioIcon name={journeyIcons[index]} />
              <em>{String(index + 1).padStart(2, "0")}</em>
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FiveAreasSequence = ({start}: {start: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const show = sceneOpacity(frame, start, seconds(35.8));

  return (
    <div className="studio-five-slide" style={{opacity: show}}>
      <Img
        alt="Studio AI planning context"
        className="studio-five-context-plate"
        src={staticFile(studioAiPlates.planningContext)}
        style={{transform: `translate3d(${drift(frame, 18, 4)}px, ${drift(frame, 52, 3)}px, 0) scale(1.05)`}}
      />
      <div className="studio-five-slide-copy">
        <span>Venue understanding</span>
        <strong style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.5)}>Five areas of intelligence.</HeadlineReveal>
        </strong>
        <p>Studio AI connects the signals that shape every couple journey.</p>
      </div>
      <div className="studio-five-grid">
        {intelligenceAreas.map((area, index) => {
          const cardStart = start + seconds(0.45 + index * 0.22);
          const item = reveal(frame, cardStart, seconds(0.55));
          const pop = springPop(fps, frame, cardStart);
          const scale = interpolate(pop, [0, 1], [0.9, 1]);

          return (
            <div
              className="studio-area-card studio-spark"
              key={area.label}
              style={{
                opacity: item,
                transform: `translateY(${(1 - pop) * 28}px) scale(${scale})`,
                ...sparkStyle(frame, item, cardStart),
              }}
            >
              <em><StudioIcon name={area.icon as IconName} /></em>
              <span>{area.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProductProof = ({start}: {start: number}) => {
  const frame = useCurrentFrame();
  const proofVideoStart = seconds(40.6);
  const proofVideoEnd = seconds(43.6);
  const videoIn = reveal(frame, proofVideoStart, seconds(0.45));
  const videoOut = interpolate(frame, [proofVideoEnd - seconds(0.35), proofVideoEnd], [1, 0], clamp);
  const show = sceneOpacity(frame, start, seconds(44.2));

  return (
    <div className="studio-proof-scene" style={{opacity: show}}>
      <Img
        alt="Studio AI planning context"
        className="studio-proof-context-plate"
        src={staticFile(studioAiPlates.planningContext)}
        style={{transform: `translate3d(${drift(frame, 12, 5)}px, ${drift(frame, 57, 4)}px, 0) scale(1.05)`}}
      />
      <Sequence from={proofVideoStart} durationInFrames={seconds(3)}>
        <div
          className="studio-proof-frame"
          style={{
            opacity: videoIn * videoOut,
            transform: `translate3d(${(1 - videoIn) * 66}px, ${(1 - videoIn) * 28}px, 0) scale(${0.94 + videoIn * 0.06})`,
          }}
        >
          <Video
            className="studio-proof-video"
            muted
            src={staticFile(scene.proofClip)}
          />
          <div className="studio-proof-topbar">
            <span />
            <span />
            <span />
            <strong>Venue Intelligence</strong>
          </div>
          <div className="studio-proof-callouts">
            {["Working", "Missing", "Next best action"].map((label, index) => (
              <div key={label} style={{opacity: reveal(frame, proofVideoStart + seconds(0.7 + index * 0.22), seconds(0.42))}}>
                <strong>{label}</strong>
                <span>{["strengths surfaced", "gaps identified", "journey improved"][index]}</span>
              </div>
            ))}
          </div>
        </div>
      </Sequence>
      <EditorialHeadline
        className="studio-copy-proof"
        kicker="Studio AI analyses"
        start={seconds(39)}
        title="The research becomes a working system."
      />
      <div className="studio-proof-panel">
        {[
          ["What it analyses", "Every stage of the couple journey"],
          ["What it improves", "First impression to booked tour"],
          ["What it gives back", "Clear priorities your team can act on"],
        ].map(([kicker, title], index) => {
          const cardStart = start + seconds(1.1 + index * 1.55);
          const item = reveal(frame, cardStart, seconds(0.65));
          const hide = interpolate(frame, [cardStart + seconds(1.28), cardStart + seconds(1.75)], [1, 0], clamp);

          return (
            <div
              className="studio-proof-card"
              key={kicker}
              style={{opacity: item * hide, transform: `translateY(${(1 - item) * 22}px)`}}
            >
              <span>{kicker}</span>
              <strong>{title}</strong>
            </div>
          );
        })}
      </div>
      <div className="studio-journey-mini">
        {["First impression", "First enquiry", "Booked tour"].map((step, index) => (
          <span
            key={step}
            style={{opacity: reveal(frame, seconds(37.9 + index * 0.42), seconds(0.45))}}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

const SixTools = ({start}: {start: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const show = sceneOpacity(frame, start, scene.contentDuration);

  return (
    <div className="studio-tools-scene" style={{opacity: show}}>
      <Img
        alt="Premium wedding venue atmosphere"
        src={staticFile(studioAiPlates.planningContext)}
        style={{transform: `translate3d(${drift(frame, 18, 5)}px, ${drift(frame, 41, 4)}px, 0) scale(1.06)`}}
      />
      <div className="studio-tools-grade" />
      <div className="studio-tools-copy">
        <span>Six AI-powered tools</span>
        <strong style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.5)}>One goal.</HeadlineReveal>
        </strong>
        <p>More venue tours. More bookings. More weddings.</p>
      </div>
      <div className="studio-tools-grid">
        {tools.map((tool, index) => {
          const cardStart = start + seconds(0.35 + index * 0.16);
          const item = reveal(frame, cardStart, seconds(0.5));
          const pop = springPop(fps, frame, cardStart);
          const scale = interpolate(pop, [0, 1], [0.92, 1]);

          return (
            <div
              className="studio-tool-card studio-spark"
              key={tool.label}
              style={{
                opacity: item,
                transform: `translateY(${(1 - pop) * 24}px) scale(${scale})`,
                ...sparkStyle(frame, item, cardStart),
              }}
            >
              <StudioIcon name={tool.icon as IconName} />
              <em>{String(index + 1).padStart(2, "0")}</em>
              <span>{tool.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const StudioAI = () => {
  const frame = useCurrentFrame();
  const contentFrame = frame - contentStart;

  return (
    <AbsoluteFill style={{backgroundColor: palette.porcelain, color: palette.cream}}>
      <PremiumBackground />
      <Sequence from={0} durationInFrames={contentStart}>
        <VenueBotSplash showStudioAi />
      </Sequence>
      <Sequence from={contentStart}>
        <Audio src={staticFile(scene.audio)} />
      </Sequence>
      <Sequence from={contentStart}>
        <AbsoluteFill className="studio-ai-stage">
          <div className="studio-ai-documentary-grade" />
          <Img
            alt="Premium wedding venue at dusk"
            className="studio-ai-hero-plate"
            src={staticFile(studioAiPlates.opening)}
            style={{
              transform: `translate3d(${drift(contentFrame, 8, 7)}px, ${drift(contentFrame, 31, 5)}px, 0) scale(${1.03 + contentFrame / scene.contentDuration * 0.045})`,
            }}
          />
          <div className="studio-ai-hero-grade" />
          <LightMotes />
          <KnowledgeThread proofStart={seconds(31)} start={seconds(0.7)} />

          <IntelligenceLayer start={seconds(0)} />
          <ResearchFoundation start={seconds(10.4)} />
          <UnderstandingSequence start={seconds(23.7)} />
          <FiveAreasSequence start={seconds(31.1)} />
          <ProductProof start={seconds(35)} />
          <SixTools start={seconds(43.6)} />

          <div className="studio-ai-scene-code" style={{opacity: contentFrame >= 0 ? 0.8 : 0}}>
            M1-SC
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
