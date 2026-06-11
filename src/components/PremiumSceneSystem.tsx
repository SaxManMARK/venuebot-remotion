import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import {font} from "../theme";
import {seconds} from "../data/video";
import {HeadlineReveal} from "../sections/StudioAI";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (frame: number, start: number, duration = seconds(0.9)) =>
  interpolate(frame, [start, start + duration], [0, 1], {...clamp, easing: ease});

const drift = (frame: number, offset = 0, amount = 12) => Math.sin((frame + offset) / 58) * amount;

type SceneTone = "warm" | "fresh" | "plum" | "product" | "night";

type PlateAsset = {
  src: string;
  alt: string;
};

type TimedSceneProps = {
  start: number;
  duration?: number;
  headline: string;
  subtitle?: string;
  asset?: PlateAsset;
  variant?: SceneTone;
};

type Callout = {
  label: string;
  value?: string;
  detail?: string;
  meta?: string[];
};

export const VideoShell = ({
  children,
  variant = "fresh",
}: {
  children: React.ReactNode;
  variant?: SceneTone;
}) => (
  <AbsoluteFill className={`premium-scene-shell premium-scene-shell-${variant}`}>
    <div className="premium-shell-light premium-shell-light-a" />
    <div className="premium-shell-light premium-shell-light-b" />
    <div className="premium-shell-lines" />
    {children}
  </AbsoluteFill>
);

export const CinematicPlate = ({
  asset,
  start,
  variant = "fresh",
}: {
  asset: PlateAsset;
  start: number;
  variant?: SceneTone;
}) => {
  const frame = useCurrentFrame();
  const intro = reveal(frame, start, seconds(1.15));
  const push = interpolate(frame, [start, start + seconds(9)], [1.02, 1.095], clamp);

  return (
    <div className={`cinematic-plate cinematic-plate-${variant}`} style={{opacity: intro}}>
      <Img
        alt={asset.alt}
        className="cinematic-plate-image"
        src={staticFile(asset.src)}
        style={{
          transform: `translate3d(${drift(frame, 4, 10)}px, ${drift(frame, 33, 7)}px, 0) scale(${push})`,
        }}
      />
      <div className="cinematic-plate-grade" />
      <div className="cinematic-plate-glass" />
    </div>
  );
};

export const CinematicIntro = ({
  start,
  headline,
  subtitle,
  asset,
  variant = "warm",
}: TimedSceneProps) => {
  const frame = useCurrentFrame();
  const hint = reveal(frame, start + seconds(1.35), seconds(0.85));

  return (
    <VideoShell variant={variant}>
      {asset ? <CinematicPlate asset={asset} start={start} variant={variant} /> : null}
      <div className="cinematic-intro-copy">
        <h1 style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.55)}>{headline}</HeadlineReveal>
        </h1>
        {subtitle ? (
          <p
            style={{
              fontFamily: font.title,
              opacity: hint,
              filter: `blur(${(1 - hint) * 8}px)`,
              transform: `translateY(${(1 - hint) * 18}px)`,
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      <div
        className="soft-ui-hint"
        style={{
          opacity: hint,
          filter: `blur(${(1 - hint) * 10}px)`,
          transform: `perspective(900px) translate3d(${drift(frame, 12, 8)}px, ${drift(frame, 41, 6) + (1 - hint) * 30}px, 0) rotateX(${(1 - hint) * 12}deg)`,
        }}
      >
        <span />
        <strong>New wedding enquiry</strong>
        <small>Saturday 12 July 2027</small>
        <em>120 guests · £12,000-£15,000 budget</em>
      </div>
    </VideoShell>
  );
};

// The decision fork: one shared path that splits toward two outcomes. The warm
// route lands on the venue's booking; the muted route drifts to a competitor.
// Both paths draw on (dash-offset), a courier dot rides each draw tip, and the
// outcome chips land with the usual rise + de-blur + tilt.
const forkCurves = {
  booking: {p0: [70, 380], c1: [320, 380], c2: [400, 150], p1: [688, 132]},
  competitor: {p0: [70, 380], c1: [320, 380], c2: [400, 610], p1: [688, 628]},
} as const;

const forkPoint = (curve: (typeof forkCurves)[keyof typeof forkCurves], t: number) => {
  const u = 1 - t;
  const x = u * u * u * curve.p0[0] + 3 * u * u * t * curve.c1[0] + 3 * u * t * t * curve.c2[0] + t * t * t * curve.p1[0];
  const y = u * u * u * curve.p0[1] + 3 * u * u * t * curve.c1[1] + 3 * u * t * t * curve.c2[1] + t * t * t * curve.p1[1];
  return {x, y};
};

const forkPath = (curve: (typeof forkCurves)[keyof typeof forkCurves]) =>
  `M ${curve.p0[0]} ${curve.p0[1]} C ${curve.c1[0]} ${curve.c1[1]}, ${curve.c2[0]} ${curve.c2[1]}, ${curve.p1[0]} ${curve.p1[1]}`;

const ForkDecision = ({start, labels}: {start: number; labels: [string, string]}) => {
  const frame = useCurrentFrame();
  const node = reveal(frame, start + seconds(0.55), seconds(0.6));
  const drawA = reveal(frame, start + seconds(0.95), seconds(1.35));
  const drawB = reveal(frame, start + seconds(2.75), seconds(1.35));
  const chipA = reveal(frame, start + seconds(2.0), seconds(0.55));
  const chipB = reveal(frame, start + seconds(3.8), seconds(0.55));
  const dotA = forkPoint(forkCurves.booking, drawA);
  const dotB = forkPoint(forkCurves.competitor, drawB);

  return (
    <div className="fork-decision">
      <svg viewBox="0 0 860 760" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fork-warm" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#7c918a" />
            <stop offset="0.62" stopColor="#d5a798" />
            <stop offset="1" stopColor="#ffe6b4" />
          </linearGradient>
          <linearGradient id="fork-cool" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(140, 141, 142, 0.66)" />
            <stop offset="1" stopColor="rgba(106, 90, 96, 0.4)" />
          </linearGradient>
        </defs>
        <path
          d={forkPath(forkCurves.booking)}
          stroke="rgba(255, 230, 180, 0.22)"
          strokeWidth={16}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawA}
          style={{filter: "blur(7px)"}}
        />
        <path
          d={forkPath(forkCurves.booking)}
          stroke="url(#fork-warm)"
          strokeWidth={5}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawA}
        />
        <path
          d={forkPath(forkCurves.competitor)}
          stroke="url(#fork-cool)"
          strokeWidth={4}
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawB}
        />
        {/* The shared moment both outcomes grow from */}
        <circle
          cx={70}
          cy={380}
          r={26}
          stroke="rgba(255, 246, 228, 0.5)"
          strokeWidth={1.6}
          style={{opacity: node, transform: `scale(${0.7 + node * 0.3})`, transformOrigin: "70px 380px"}}
        />
        <circle cx={70} cy={380} r={9} fill="#ffe6b4" style={{opacity: node}} />
        {/* Courier dots riding each draw tip */}
        {drawA > 0.02 ? (
          <circle cx={dotA.x} cy={dotA.y} r={10} fill="#ffe6b4" style={{opacity: 0.55 + drawA * 0.45}} />
        ) : null}
        {drawB > 0.02 ? (
          <circle cx={dotB.x} cy={dotB.y} r={7} fill="rgba(140, 141, 142, 0.85)" />
        ) : null}
        {/* Outcome nodes */}
        <circle
          cx={688}
          cy={132}
          r={20}
          stroke="rgba(255, 230, 180, 0.85)"
          strokeWidth={2}
          fill="rgba(255, 230, 180, 0.16)"
          style={{opacity: chipA}}
        />
        <circle
          cx={688}
          cy={628}
          r={16}
          stroke="rgba(140, 141, 142, 0.6)"
          strokeWidth={1.6}
          style={{opacity: chipB}}
        />
      </svg>
      <div
        className="fork-chip fork-chip-booking"
        style={{
          opacity: chipA,
          filter: `blur(${(1 - chipA) * 10}px)`,
          transform: `perspective(900px) translateY(${(1 - chipA) * 24 + drift(frame, 8, 4)}px) rotateX(${(1 - chipA) * 14}deg)`,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <circle cx={12} cy={12} r={9} />
          <path d="M8 12.2l2.7 2.8L16 9.4" />
        </svg>
        <span>{labels[0]}</span>
      </div>
      <div
        className="fork-chip fork-chip-competitor"
        style={{
          opacity: chipB,
          filter: `blur(${(1 - chipB) * 10}px)`,
          transform: `perspective(900px) translateY(${(1 - chipB) * 24 + drift(frame, 36, 4)}px) rotateX(${(1 - chipB) * 14}deg)`,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 5h5v14h-5" />
          <path d="M4 12h11" />
          <path d="M11 8l4 4-4 4" />
        </svg>
        <span>{labels[1]}</span>
      </div>
    </div>
  );
};

export const ProblemStatement = ({
  start,
  headline,
  subtitle,
  asset,
  variant = "plum",
  callouts = [],
  visual,
}: TimedSceneProps & {callouts?: Callout[]; visual?: "fork"}) => {
  const frame = useCurrentFrame();
  const copy = reveal(frame, start + seconds(0.25), seconds(0.8));
  const isJourney = callouts.length >= 4;
  const journeyProgress = reveal(frame, start + seconds(0.55), seconds(4.4));

  return (
    <VideoShell variant={variant}>
      {asset ? <CinematicPlate asset={asset} start={start} variant={variant} /> : null}
      <div className="problem-copy">
        <h2 style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.25)}>{headline}</HeadlineReveal>
        </h2>
        {subtitle ? (
          <p style={{fontFamily: font.title, opacity: copy, filter: `blur(${(1 - copy) * 8}px)`}}>{subtitle}</p>
        ) : null}
      </div>
      {visual === "fork" ? (
        <ForkDecision start={start} labels={[callouts[0]?.label ?? "", callouts[1]?.label ?? ""]} />
      ) : isJourney ? (
        <div className="opportunity-journey">
          <i className="opportunity-journey-line" style={{transform: `scaleX(${journeyProgress})`}} />
          <b className="opportunity-orb" style={{left: `${8 + journeyProgress * 84}%`}} />
          {callouts.map((callout, index) => {
            const show = reveal(frame, start + seconds(0.65 + index * 0.32), seconds(0.62));
            return (
              <div
                className="opportunity-journey-card"
                key={callout.label}
                style={{
                  opacity: show,
                  filter: `blur(${(1 - show) * 10}px)`,
                  transform: `perspective(900px) translateY(${(1 - show) * 26}px) rotateX(${(1 - show) * 14}deg)`,
                }}
              >
                <span>{callout.label}</span>
                {callout.value ? <strong>{callout.value}</strong> : null}
                {callout.detail ? <small>{callout.detail}</small> : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="problem-callouts">
          {callouts.map((callout, index) => {
            const show = reveal(frame, start + seconds(0.65 + index * 0.35), seconds(0.6));
            const isOpportunity = callout.detail || callout.meta?.length;
            return (
              <div
                className={`problem-callout ${isOpportunity ? "opportunity-card" : ""}`}
                key={callout.label}
                style={{
                  opacity: show,
                  filter: `blur(${(1 - show) * 10}px)`,
                  transform: `perspective(900px) translateY(${(1 - show) * 24}px) rotateX(${(1 - show) * 14}deg)`,
                }}
              >
                {isOpportunity ? (
                  <>
                    <span>{callout.label}</span>
                    {callout.value ? <strong>{callout.value}</strong> : null}
                    {callout.detail ? <small>{callout.detail}</small> : null}
                    {callout.meta?.length ? (
                      <div className="opportunity-meta">
                        {callout.meta.map((item) => (
                          <em key={item}>{item}</em>
                        ))}
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {callout.value ? <strong>{callout.value}</strong> : null}
                    <span>{callout.label}</span>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </VideoShell>
  );
};

export const StatisticReveal = ({
  start,
  value,
  qualifier,
  label,
  source,
  asset,
  variant = "fresh",
}: {
  start: number;
  value: string;
  qualifier?: string;
  label: string;
  source?: string;
  asset?: PlateAsset;
  variant?: SceneTone;
}) => {
  const frame = useCurrentFrame();
  const stat = reveal(frame, start + seconds(0.35), seconds(0.8));
  const copy = reveal(frame, start + seconds(0.75), seconds(0.7));

  return (
    <VideoShell variant={variant}>
      {asset ? <CinematicPlate asset={asset} start={start} variant={variant} /> : null}
      <div className="stat-reveal">
        <div className="stat-reveal-rings" style={{opacity: stat, transform: `scale(${0.78 + stat * 0.22})`}}>
          <span />
          <span />
          <span />
        </div>
        {qualifier ? (
          <em
            style={{
              fontFamily: font.title,
              opacity: stat,
              filter: `blur(${(1 - stat) * 10}px)`,
              transform: `translateY(${(1 - stat) * 18}px)`,
            }}
          >
            {qualifier}
          </em>
        ) : null}
        <strong
          style={{
            fontFamily: font.title,
            opacity: stat,
            filter: `blur(${(1 - stat) * 14}px)`,
            transform: `scale(${0.82 + stat * 0.18})`,
          }}
        >
          {value}
        </strong>
        <p
          style={{
            fontFamily: font.title,
            opacity: copy,
            filter: `blur(${(1 - copy) * 8}px)`,
            transform: `translateY(${(1 - copy) * 20}px)`,
          }}
        >
          {label}
        </p>
        {source ? <small style={{opacity: copy}}>{source}</small> : null}
      </div>
    </VideoShell>
  );
};

export const ShortlistCards = ({
  start,
  asset,
}: {
  start: number;
  asset?: PlateAsset;
}) => {
  const frame = useCurrentFrame();
  const cards = [
    {
      title: "Ravenwood Hall",
      type: "Luxury Country House",
      distance: "45 mins away",
      status: "Awaiting response",
      tone: "country",
      image: "venues/ravenwood-hall.png",
      active: false,
    },
    {
      title: "Willow Creek Barn",
      type: "Rustic Barn Venue",
      distance: "30 mins away",
      status: "Viewing booked",
      badge: "First choice",
      note: "Tour confirmed",
      tone: "barn",
      image: "venues/willow-creek-barn.png",
      active: true,
    },
    {
      title: "Oakridge Manor",
      type: "Historic Manor",
      distance: "60 mins away",
      status: "Response delayed",
      tone: "manor",
      image: "venues/oakridge-manor.png",
      active: false,
    },
  ];
  const shortlistFocus = reveal(frame, start + seconds(2.4), seconds(1.2));
  const fieldFade = reveal(frame, start + seconds(1.55), seconds(1.35));
  const orbMove = reveal(frame, start + seconds(2.1), seconds(1.35));
  const venuePool = [
    "Rosefield Estate",
    "Ashbourne Barn",
    "Ravenwood Hall",
    "Hawthorn House",
    "Meadowmere Hall",
    "The Orchard Rooms",
    "Larkspur Manor",
    "Bramblewick Barn",
    "Kingsley Court",
    "Foxglove Farm",
    "The Glasshouse",
    "Cedar Lake House",
    "Millstone Barn",
    "Everleigh Hall",
    "The Walled Garden",
    "Northgate Manor",
    "Fieldstone Lodge",
    "Willow Creek Barn",
    "Oakridge Manor",
    "Fernbank House",
    "Aster Barn",
  ];
  const backgroundVenues = Array.from({length: 20}, (_, index) => ({
    label: venuePool[index],
    reason: [
      "Response delayed",
      "No brochure sent",
      "Question unanswered",
      "No tour offered",
      "Follow-up missed",
    ][index % 5],
    x: [5, 14, 24, 34, 45, 56, 67, 78, 88, 10, 21, 31, 42, 53, 64, 74, 84, 17, 48, 80][index],
    y: [18, 12, 22, 14, 24, 13, 22, 15, 25, 42, 36, 47, 38, 50, 39, 48, 40, 65, 68, 63][index],
    rotation: [-5, 4, -2, 5, -4, 3, -3, 4, -5, 3, -4, 5, -2, 4, -5, 3, -3, 5, -4, 3][index],
  }));

  return (
    <VideoShell variant="warm">
      {asset ? <CinematicPlate asset={asset} start={start} variant="warm" /> : null}
      <div className="shortlist-race-heading">
        <span style={{opacity: 1 - fieldFade}}>20 venues considered</span>
        <span style={{opacity: fieldFade}}>3 venues remain</span>
      </div>
      <div className="shortlist-race-field">
        {backgroundVenues.map((venue, index) => {
          const show = reveal(frame, start + seconds(0.12 + index * 0.035), seconds(0.45));
          const keep = ["Ravenwood Hall", "Willow Creek Barn", "Oakridge Manor"].includes(venue.label);
          const exit = keep ? 0 : fieldFade;

          return (
            <div
              className={`shortlist-race-tile ${keep ? "is-survivor" : ""}`}
              key={venue.label}
              style={{
                left: `${venue.x}%`,
                top: `${venue.y}%`,
                opacity: show * (keep ? 0.22 - fieldFade * 0.14 : 0.5 - exit * 0.42),
                filter: `blur(${(1 - show) * 8}px)`,
                transform: `translate(-50%, -50%) translateY(${exit * 42}px) scale(${1 - exit * 0.22}) rotate(${venue.rotation}deg)`,
              }}
            >
              <strong>{venue.label}</strong>
              {!keep ? <small>{venue.reason}</small> : null}
            </div>
          );
        })}
      </div>
      <div className="shortlist-momentum">
        <i style={{transform: `scaleX(${orbMove})`}} />
        <b style={{left: `${18 + orbMove * 64}%`}} />
        <span>Enquiry</span>
        <span>Response</span>
        <span>Viewing booked</span>
      </div>
      <div className="luxury-shortlist">
        {cards.map((card, index) => {
          const show = reveal(frame, start + seconds(0.28 + index * 0.24), seconds(0.65));
          const losing = !card.active;
          const focusOpacity = card.active ? 1 : 1 - shortlistFocus * 0.45;
          const focusX = losing ? (index === 0 ? -42 : 42) * shortlistFocus : 0;
          const lift = card.active ? -28 - shortlistFocus * 28 : shortlistFocus * 18;
          const scale = card.active ? 1.03 + shortlistFocus * 0.06 : 0.96 - shortlistFocus * 0.04;
          return (
            <div
              className={`luxury-shortlist-card luxury-shortlist-${card.tone} ${card.active ? "is-active" : "is-receding"}`}
              key={card.title}
              style={{
                opacity: show * focusOpacity,
                // Yield to the .is-receding class filter once the entrance settles.
                filter: show < 1 ? `blur(${(1 - show) * 10}px)` : undefined,
                transform: `perspective(1200px) translateX(${focusX}px) translateY(${(1 - show) * 48 + lift + drift(frame, index * 22, 3)}px) rotateX(${(1 - show) * 12}deg) scale(${scale})`,
              }}
            >
              <div className="luxury-shortlist-thumb">
                <Img alt={card.title} src={staticFile(card.image)} />
              </div>
              <div className="luxury-shortlist-meta">
                <span>{card.type}</span>
                <strong>{card.title}</strong>
                <small>{card.distance}</small>
              </div>
              <div className="luxury-shortlist-status">
                <small>{card.status}</small>
                {card.note ? <b>{card.note}</b> : null}
              </div>
              {card.badge ? <em>{card.badge}</em> : null}
            </div>
          );
        })}
      </div>
    </VideoShell>
  );
};

export const SolutionIntro = ({
  start,
  headline,
  subtitle,
}: TimedSceneProps) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start + seconds(0.2), seconds(0.95));

  return (
    <VideoShell variant="product">
      <div className="solution-intro">
        <Img alt="VenueBot" src={staticFile("brand/venuebot-logo-white.png")} style={{opacity: show}} />
        <h2 style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.2)}>{headline}</HeadlineReveal>
        </h2>
        {subtitle ? (
          <p style={{fontFamily: font.title, opacity: show, filter: `blur(${(1 - show) * 8}px)`}}>{subtitle}</p>
        ) : null}
      </div>
    </VideoShell>
  );
};

export const ProductScreenWrapper = ({
  start,
  title,
  callouts = [],
  asset,
}: {
  start: number;
  title: string;
  callouts?: Callout[];
  asset?: PlateAsset;
}) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start + seconds(0.2), seconds(0.8));

  return (
    <div className="product-screen-wrapper" style={{opacity: show, transform: `translateY(${(1 - show) * 34}px)`}}>
      {asset ? <Img alt={asset.alt} src={staticFile(asset.src)} /> : <div className="product-screen-placeholder" />}
      <div className="product-screen-topbar">
        <span />
        <span />
        <span />
        <strong>{title}</strong>
      </div>
      <div className="product-screen-callouts">
        {callouts.map((callout, index) => (
          <div className="product-callout" key={callout.label} style={{transform: `translateY(${drift(frame, index * 14, 5)}px)`}}>
            {callout.value ? <strong>{callout.value}</strong> : null}
            <span>{callout.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const featureCopy = {
  studio: {
    title: "Studio AI",
    promise: "Generate more enquiries",
    callouts: [{label: "Website score"}, {label: "Competitor analysis"}, {label: "Brand voice"}],
  },
  convert: {
    title: "Convert",
    promise: "Convert more couples",
    callouts: [{label: "Instant response"}, {label: "WhatsApp nurture"}, {label: "Tour booked"}],
  },
  care: {
    title: "Care",
    promise: "Manage everything in one place",
    callouts: [{label: "Inbox"}, {label: "Pipeline"}, {label: "Calendar"}],
  },
};

export const StudioAISection = ({start, asset}: {start: number; asset?: PlateAsset}) => (
  <FeatureSection start={start} asset={asset} variant="studio" />
);

export const ConvertSection = ({start, asset}: {start: number; asset?: PlateAsset}) => (
  <FeatureSection start={start} asset={asset} variant="convert" />
);

export const CareSection = ({start, asset}: {start: number; asset?: PlateAsset}) => (
  <FeatureSection start={start} asset={asset} variant="care" />
);

const FeatureSection = ({
  start,
  asset,
  variant,
}: {
  start: number;
  asset?: PlateAsset;
  variant: keyof typeof featureCopy;
}) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start + seconds(0.1), seconds(0.85));
  const copy = featureCopy[variant];

  return (
    <VideoShell variant="product">
      <div className="feature-section">
        <div className="feature-copy" style={{opacity: show, transform: `translateY(${(1 - show) * 24}px)`}}>
          <span>{copy.promise}</span>
          <h2 style={{fontFamily: font.title}}>{copy.title}</h2>
        </div>
        <ProductScreenWrapper asset={asset} callouts={copy.callouts} start={start + seconds(0.35)} title={copy.title} />
      </div>
    </VideoShell>
  );
};

const capabilityWorlds = [
  {
    meaning: "Knowledge",
    capability: "Studio AI",
    opener: "Before you can improve anything, you need to understand:",
    tone: "knowledge",
    items: ["your venue", "your positioning", "your customer", "your content performance", "your competitors"],
  },
  {
    meaning: "Engagement",
    capability: "Convert",
    opener: "Once you know that, you need to communicate it:",
    tone: "engagement",
    items: ["respond", "nurture", "answer questions", "build confidence", "book tours"],
  },
  {
    meaning: "Control",
    capability: "Care",
    opener: "Once enquiries become opportunities, you need to manage them:",
    tone: "control",
    items: ["visibility", "accountability", "reporting", "follow-up", "operations"],
  },
] as const;

export const CapabilityPillarSystem = ({start}: {start: number}) => {
  const frame = useCurrentFrame();
  const intro = reveal(frame, start, seconds(1));
  const connector = reveal(frame, start + seconds(1.1), seconds(1.4));
  const worldOffsets = [10.48, 25.74, 39.32];
  const unify = reveal(frame, start + seconds(53.8), seconds(1.4));
  const outcome = reveal(frame, start + seconds(57.76), seconds(1.2));
  // The strapline has done its job once the first world focuses - and the
  // focused pillar's kicker lifts into its line, so it must clear the stage.
  const strapFade = reveal(frame, start + seconds(worldOffsets[0] - 0.6), seconds(0.7));

  return (
    <AbsoluteFill className="capability-system">
      <div className="capability-atmosphere">
        <div className="capability-sky">
          <span />
          <span />
          <span />
        </div>
        <div className="capability-lake" />
      </div>
      <div className="capability-paper-grain" />
      <div className="capability-venue-arc capability-venue-arc-left" />
      <div className="capability-venue-arc capability-venue-arc-right" />
      <div
        className="capability-connector"
        style={{
          opacity: connector * (1 - outcome),
          transform: `translateX(-50%) scaleX(${0.12 + connector * 0.88})`,
        }}
      />
      <div
        className="capability-header"
        style={{opacity: intro * (1 - outcome), transform: `translate(-50%, ${(1 - intro) * 26}px)`}}
      >
        <span>The VenueBot framework</span>
        <h2 style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.1)}>Three Products. One Purpose.</HeadlineReveal>
        </h2>
        <p style={{opacity: 1 - strapFade}}>Knowledge → Engagement → Control</p>
      </div>

      <div className="capability-pillars" style={{opacity: 1 - outcome * 0.94}}>
        {capabilityWorlds.map((world, index) => {
          const worldStart = start + seconds(worldOffsets[index]);
          const card = reveal(frame, start + seconds(1.2 + index * 0.55), seconds(0.9));
          const focus = reveal(frame, worldStart, seconds(1));
          const isQuiet = frame > worldStart + seconds(5.8) && index < 2;

          return (
            <div
              className={`capability-pillar capability-pillar-${world.tone} ${isQuiet ? "is-quiet" : ""}`}
              key={world.meaning}
              style={{
                opacity: card * (1 - outcome * 0.94),
                // Yield to the .is-quiet class filter once the entrance settles.
                filter: card < 1 ? `blur(${(1 - card) * 10}px)` : undefined,
                transform: `perspective(1100px) translateY(${(1 - card) * 48 - focus * 18}px) rotateX(${(1 - card) * 12}deg) scale(${0.96 + focus * 0.035 + unify * 0.015})`,
              }}
            >
              <div className="capability-copy">
                <em>{world.capability} →</em>
                <strong>{world.meaning}</strong>
                <p>{world.opener}</p>
                <div className="capability-list">
                  {world.items.map((item, itemIndex) => {
                    const itemReveal = reveal(frame, worldStart + seconds(0.7 + itemIndex * 0.26), seconds(0.55));

                    return (
                      <span
                        key={item}
                        style={{
                          opacity: itemReveal,
                          filter: `blur(${(1 - itemReveal) * 6}px)`,
                          transform: `translateX(${(1 - itemReveal) * -18}px)`,
                        }}
                      >
                        {item}
                      </span>
                    );
                  })}
                </div>
                <div
                  className={`capability-metaphor capability-metaphor-${world.tone}`}
                  style={{opacity: focus, transform: `translateY(${(1 - focus) * 18}px)`}}
                >
                  {world.tone === "knowledge" ? (
                    <>
                      <span className="metaphor-sheet metaphor-sheet-one" />
                      <span className="metaphor-sheet metaphor-sheet-two" />
                      <span className="metaphor-focus-ring" style={{transform: `scale(${0.82 + focus * 0.18})`}} />
                      <i className="metaphor-understanding-line" style={{transform: `scaleX(${focus})`}} />
                      <b className="metaphor-insight-mark" />
                    </>
                  ) : null}
                  {world.tone === "engagement" ? (
                    <>
                      <span className="metaphor-person metaphor-person-left" />
                      <span className="metaphor-person metaphor-person-right" />
                      <i className="metaphor-connection-line" style={{transform: `scaleX(${focus})`}} />
                      <b className="metaphor-connection-centre" />
                      <em className="metaphor-warmth" />
                    </>
                  ) : null}
                  {world.tone === "control" ? (
                    <>
                      <span className="metaphor-order-card metaphor-order-card-one" />
                      <span className="metaphor-order-card metaphor-order-card-two" />
                      <span className="metaphor-order-card metaphor-order-card-three" />
                      <i className="metaphor-confidence-seal" style={{transform: `scale(${0.82 + focus * 0.18})`}} />
                      <b className="metaphor-confidence-line" style={{transform: `scaleX(${focus})`}} />
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="capability-outcome"
        style={{transform: `translate(-50%, calc(-50% + ${(1 - outcome) * 24}px))`}}
      >
        {["More Bookings.", "More Confidence."].map((line, index) => {
          const lineReveal = reveal(frame, start + seconds(57.76 + index * 0.24), seconds(1.1));

          return (
            <span
              key={line}
              style={{
                opacity: lineReveal,
                filter: `blur(${(1 - lineReveal) * 12}px)`,
                transform: `translateY(${(1 - lineReveal) * 22}px)`,
              }}
            >
              {line}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const TopTipOverlay = ({children}: {children: React.ReactNode}) => (
  <div className="editorial-overlay top-tip-overlay">
    <strong>Top Tip</strong>
    <span>{children}</span>
  </div>
);

export const DidYouKnowOverlay = ({children}: {children: React.ReactNode}) => (
  <div className="editorial-overlay did-you-know-overlay">
    <strong>Did You Know?</strong>
    <span>{children}</span>
  </div>
);

export const CTAClosingScene = ({
  start,
  headline,
  subtitle,
}: {
  start: number;
  headline: string;
  subtitle: string;
}) => {
  const frame = useCurrentFrame();
  const show = reveal(frame, start + seconds(0.15), seconds(0.9));

  return (
    <VideoShell variant="product">
      <div className="cta-closing" style={{opacity: show, transform: `scale(${0.94 + show * 0.06})`}}>
        <Img alt="VenueBot" src={staticFile("brand/venuebot-logo-white.png")} />
        <h2 style={{fontFamily: font.title}}>
          <HeadlineReveal from={start + seconds(0.35)}>{headline}</HeadlineReveal>
        </h2>
        <p>{subtitle}</p>
      </div>
    </VideoShell>
  );
};
