import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {Animated, Ease, Fade, Move, Scale} from "remotion-animated";
import {PremiumBackground} from "../components/Background";
import {
  CTAClosingScene,
  CapabilityPillarSystem,
  CinematicIntro,
  ProblemStatement,
  ShortlistCards,
  SolutionIntro,
  StatisticReveal,
} from "../components/PremiumSceneSystem";
import {VenueBotSplash} from "../components/VenueBotSplash";
import {introCuePoints} from "../data/introCuePoints";
import {introScenes, seconds} from "../data/video";
import {font, palette} from "../theme";

const ease = Easing.out(Easing.cubic);

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const plates = {
  intro: {
    src: "plates/venuebot-cinematic-intro.png",
    alt: "Couple researching wedding venues in a luxury venue setting",
  },
  afterHours: {
    src: "plates/venuebot-after-hours.png",
    alt: "Wedding venue office after hours with laptop and phone",
  },
  shortlist: {
    src: "plates/venuebot-couple-shortlist.png",
    alt: "Couple comparing wedding venue options on a device",
  },
  product: {
    src: "plates/venuebot-product-proof.png",
    alt: "Abstract VenueBot product interface",
  },
};

const fade = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {...clamp, easing: ease});

const cameraPush = (frame: number, start: number, end: number, strength = 1) => {
  const progress = interpolate(frame, [start, end], [0, 1], clamp);
  const scale = 1 + progress * 0.06 * strength;
  const y = progress * -26 * strength;

  return `translateY(${y}px) scale(${scale})`;
};

const sceneOpacity = (frame: number, start: number, end: number) => {
  const fadeFrames = Math.min(seconds(1.2), Math.max(1, Math.floor((end - start) / 3)));

  return interpolate(frame, [start, start + fadeFrames, end - fadeFrames, end], [0, 1, 1, 0], clamp);
};

const revealAnimations = (start: number, y = 34, scale = 0.94) => [
  Fade({initial: 0, to: 1, start, duration: 14, ease: Ease.QuinticOut}),
  Move({initialY: y, y: 0, start, duration: 24, ease: Ease.QuinticOut}),
  Scale({initial: scale, by: 1, start, duration: 24, ease: Ease.QuinticOut}),
];

const Title = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h1 className={`intro-title ${className}`} style={{fontFamily: font.body}}>
    {children}
  </h1>
);

const SceneFlash = ({at, className = ""}: {at: number; className?: string}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at - seconds(0.08), at + seconds(0.12), at + seconds(0.72)], [0, 0.52, 0], clamp);
  const scale = interpolate(frame, [at - seconds(0.08), at + seconds(0.72)], [0.72, 1.32], clamp);

  return <div className={`impact-flash ${className}`} style={{opacity, transform: `translate(-50%, -50%) scale(${scale})`}} />;
};

const SceneEnergy = ({variant = "default"}: {variant?: "default" | "warm" | "night" | "product"}) => {
  const frame = useCurrentFrame();
  const offset = variant === "warm" ? 18 : variant === "night" ? 54 : variant === "product" ? 86 : 0;
  const driftX = Math.sin((frame + offset) / 92) * 18;
  const driftY = Math.cos((frame + offset) / 118) * 14;
  const scale = 1.02 + Math.sin((frame + offset) / 150) * 0.018;
  const vignetteOpacity = 0.86 + Math.sin((frame + offset) / 140) * 0.08;

  return (
    <>
      <div
        className={`scene-energy scene-energy-${variant}`}
        style={{transform: `translate3d(${driftX}px, ${driftY}px, 0) rotate(-2deg) scale(${scale})`}}
      />
      <div className="scene-diagonal-sheen" style={{transform: `translateX(${driftX * 1.7}px) rotate(-18deg)`}} />
      <div className="scene-vignette" style={{opacity: vignetteOpacity}} />
    </>
  );
};

const ModulePillar = ({
  title,
  subtitle,
  delay,
}: {
  title: string;
  subtitle: string;
  delay: number;
}) => {
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="module-pillar-slot">
      <Animated
        className={`module-pillar module-pillar-${slug}`}
        animations={revealAnimations(delay, 48, 0.92)}
        style={{opacity: 0}}
      >
        <div className="module-orb" />
        <h3 style={{fontFamily: font.title}}>{title}</h3>
        <p>{subtitle}</p>
      </Animated>
    </div>
  );
};

const AnimatedTile = ({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) => (
  <Animated
    className={className}
    animations={revealAnimations(delay, 30, 0.95)}
    style={{opacity: 0}}
  >
    {children}
  </Animated>
);

const FinalChip = ({
  children,
  delay,
  variant = "muted",
}: {
  children: React.ReactNode;
  delay: number;
  variant?: "muted" | "bright";
}) => (
  <Animated
    className={`final-chip ${variant === "bright" ? "final-chip-bright" : ""}`}
    animations={[
      Fade({initial: 0, to: 1, start: delay, duration: 12, ease: Ease.QuinticOut}),
      Move({initialY: 26, y: 0, start: delay, duration: 22, ease: Ease.QuinticOut}),
      Scale({initial: 0.88, by: 1, start: delay, duration: 22, ease: Ease.QuinticOut}),
    ]}
    style={{opacity: 0}}
  >
    {children}
  </Animated>
);

const DissolveChip = ({
  children,
  delay,
  direction,
}: {
  children: React.ReactNode;
  delay: number;
  direction: -1 | 0 | 1;
}) => (
  <Animated
    className="final-chip"
    animations={[
      ...revealAnimations(delay, 24, 0.92),
      Fade({to: 0, start: delay + seconds(2.7), duration: 18, ease: Ease.QuinticOut}),
      Move({x: direction * 180, y: direction === 0 ? -120 : 34, start: delay + seconds(2.7), duration: 26, ease: Ease.QuinticOut}),
      Scale({by: 0.72, start: delay + seconds(2.7), duration: 26, ease: Ease.QuinticOut}),
    ]}
    style={{opacity: 0}}
  >
    {children}
  </Animated>
);

const AnimatedLogo = ({start, className}: {start: number; className: string}) => (
  <Animated
    className={className}
    animations={[
      Fade({initial: 0, to: 1, start, duration: 18, ease: Ease.QuinticOut}),
      Move({initialY: 44, y: 0, start, duration: 28, ease: Ease.QuinticOut}),
      Scale({initial: 0.88, by: 1, start, duration: 28, ease: Ease.QuinticOut}),
    ]}
    style={{opacity: 0}}
  >
    <Img src={staticFile("brand/venuebot-logo-white.png")} />
  </Animated>
);

const PulsedFinalLogo = ({start, scale}: {start: number; scale: number}) => (
  <Animated
    className="final-logo"
    animations={[
      Fade({initial: 0, to: 1, start, duration: 18, ease: Ease.QuinticOut}),
      Move({initialY: 48, y: 0, start, duration: 30, ease: Ease.QuinticOut}),
      Scale({initial: 0.86, by: 1, start, duration: 30, ease: Ease.QuinticOut}),
    ]}
    style={{opacity: 0}}
  >
    <Img src={staticFile("brand/venuebot-logo-white.png")} style={{transform: `scale(${scale})`}} />
  </Animated>
);

const AnimatedStat = ({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) => (
  <Animated
    className={className}
    animations={[
      Fade({initial: 0, to: 1, start: delay, duration: 10, ease: Ease.QuinticOut}),
      Move({initialY: 42, y: 0, start: delay, duration: 22, ease: Ease.QuinticOut}),
      Scale({initial: 0.82, by: 1, start: delay, duration: 26, ease: Ease.QuinticOut}),
    ]}
    style={{fontFamily: font.body, opacity: 0}}
  >
    {children}
  </Animated>
);

const AnimatedLine = ({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
}) => (
  <Animated
    className={className}
    animations={revealAnimations(delay, 24, 0.96)}
    style={{opacity: 0}}
  >
    {children}
  </Animated>
);

const AnimatedJourneyStep = ({
  step,
  index,
  delay,
}: {
  step: string;
  index: number;
  delay: number;
}) => (
  <Animated
    className="journey-step"
    animations={revealAnimations(delay, 34, 0.92)}
    style={{opacity: 0}}
  >
    <span>{index + 1}</span>
    <strong>{step}</strong>
  </Animated>
);

const AnimatedPath = ({
  children,
  className,
  delay,
}: {
  children: React.ReactNode;
  className: string;
  delay: number;
}) => (
  <Animated
    className={className}
    animations={revealAnimations(delay, 36, 0.94)}
    style={{opacity: 0}}
  >
    {children}
  </Animated>
);

const AnimatedMissedItem = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => (
  <Animated
    className="missed-item"
    animations={[
      Fade({initial: 0, to: 1, start: delay, duration: 12, ease: Ease.QuinticOut}),
      Move({initialX: -46, x: 0, start: delay, duration: 24, ease: Ease.QuinticOut}),
      Scale({initial: 0.97, by: 1, start: delay, duration: 24, ease: Ease.QuinticOut}),
    ]}
    style={{opacity: 0}}
  >
    {children}
  </Animated>
);

const AnimatedPromise = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => (
  <AnimatedLine className="section-promise" delay={delay}>
    {children}
  </AnimatedLine>
);

const AnimatedOfficeCard = ({delay}: {delay: number}) => (
  <Animated
    className="office-card"
    animations={revealAnimations(delay, 28, 0.95)}
    style={{opacity: 0}}
  >
    <span>Venue office</span>
    <strong>Closed</strong>
  </Animated>
);

const AnimatedNotCard = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => (
  <Animated
    className="not-card dimmed"
    animations={[
      Fade({initial: 0, to: 1, start: delay, duration: 12, ease: Ease.QuinticOut}),
      Move({initialY: 32, y: 0, start: delay, duration: 24, ease: Ease.QuinticOut}),
      Scale({initial: 0.94, by: 1, start: delay, duration: 24, ease: Ease.QuinticOut}),
      Fade({to: 0.38, start: delay + seconds(1.3), duration: 12, ease: Ease.QuinticOut}),
    ]}
    style={{opacity: 0}}
  >
    {children}
  </Animated>
);

const FlowDot = ({delay}: {delay: number}) => (
  <Animated
    animations={[
      Fade({initial: 0, to: 1, start: delay, duration: 8, ease: Ease.QuinticOut}),
      Move({initialY: 20, y: 0, start: delay, duration: 18, ease: Ease.QuinticOut}),
      Scale({initial: 0.5, by: 1, start: delay, duration: 18, ease: Ease.QuinticOut}),
    ]}
    style={{opacity: 0}}
  >
    <span />
  </Animated>
);

const ImpactBurst = ({at}: {at: number}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [at - seconds(0.2), at + seconds(0.25), at + seconds(1.1)], [0, 1, 0], clamp);
  const travel = interpolate(frame, [at, at + seconds(1.1)], [0, 1], clamp);

  return (
    <div className="impact-burst" style={{opacity}}>
      {Array.from({length: 26}).map((_, index) => {
        const angle = (Math.PI * 2 * index) / 26;
        const distance = 190 + (index % 7) * 34;
        const x = Math.cos(angle) * distance * travel;
        const y = Math.sin(angle) * distance * travel;

        return (
          <span
            className={`impact-fragment impact-fragment-${index % 4}`}
            key={index}
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${index * 13 + travel * 80}deg) scale(${1 - travel * 0.28})`,
            }}
          />
        );
      })}
    </div>
  );
};

const FunnelDrops = ({frame, start}: {frame: number; start: number}) => (
  <>
    {Array.from({length: 9}).map((_, index) => {
      const cycle = seconds(1.25);
      const stagger = index * 4;
      const raw = (frame - start - stagger) % cycle;
      const localFrame = raw < 0 ? raw + cycle : raw;
      const opacity = interpolate(localFrame, [0, seconds(0.18), seconds(0.78), cycle], [0, 1, 1, 0], clamp);
      const y = interpolate(localFrame, [0, cycle], [-92, 78], clamp);
      const scale = interpolate(localFrame, [0, seconds(0.28), cycle], [0.42, 1, 1.16], clamp);

      return (
        <span
          key={index}
          style={{
            opacity,
            transform: `translateY(${y}px) scale(${scale})`,
          }}
        />
      );
    })}
  </>
);

export const Intro = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const cue = introCuePoints;
  const logoPulse = spring({
    fps,
    frame: frame - cue.sbFinalReveal,
    config: {damping: 18, stiffness: 70, mass: 1},
  });

  const saSceneA = sceneOpacity(frame, cue.saMoreEnquiries, cue.saMomentsMatter + seconds(1));
  const saSceneB = sceneOpacity(frame, cue.saMomentsMatter, cue.saLeakingOpportunities + seconds(1));
  const saSceneC = sceneOpacity(frame, cue.saLeakingOpportunities, cue.saStat81 + seconds(1));
  const saSceneD = sceneOpacity(frame, cue.saStat81, cue.saVenueCards + seconds(1));
  const saSceneE = sceneOpacity(frame, cue.saVenueCards, cue.saStat68 + seconds(1));
  const saSceneF = sceneOpacity(frame, cue.saStat68, cue.saJourneyMoments + seconds(1));
  const saSceneG = sceneOpacity(frame, cue.saJourneyMoments, cue.saCompetitorRisk + seconds(1));
  const saSceneH = sceneOpacity(frame, cue.saCompetitorRisk, cue.saConversionGap + seconds(1));
  const saSceneI = sceneOpacity(frame, cue.saConversionGap, cue.saMissedFollowUps + seconds(1));
  const saSceneJ = sceneOpacity(frame, cue.saMissedFollowUps, cue.saBuiltVenueBot + seconds(1));
  const saSceneK = sceneOpacity(frame, cue.saBuiltVenueBot, cue.saOut);
  const sbSceneA = sceneOpacity(frame, cue.sbNotChatbot, cue.sbSystem + seconds(1));
  const sbSceneB = sceneOpacity(frame, cue.sbSystem, cue.sbModules + seconds(1));
  const sbSceneC = sceneOpacity(frame, cue.sbModules, cue.sbFinalReveal + seconds(1));
  const sbSceneG = sceneOpacity(frame, cue.sbFinalReveal, cue.sbOut);

  return (
    <AbsoluteFill style={{backgroundColor: palette.plum, color: palette.cream}}>
      <PremiumBackground />
      {introScenes.map((audioScene) => (
        <Sequence from={audioScene.start} durationInFrames={audioScene.duration} key={audioScene.id}>
          <Audio src={staticFile(audioScene.audio)} />
        </Sequence>
      ))}

      <AbsoluteFill className="intro-stage-v2">
        <VenueBotSplash />
        <ImpactBurst at={cue.saMomentsMatter} />
        <ImpactBurst at={cue.saLeakingOpportunities} />
        <ImpactBurst at={cue.saJourneyMoments} />
        <ImpactBurst at={cue.saConversionGap} />
        <ImpactBurst at={cue.sbModules} />
        <ImpactBurst at={cue.sbFinalReveal} />

        <section className="film-scene venue-scene" style={{opacity: saSceneA}}>
          <CinematicIntro
            asset={plates.intro}
            headline="Every wedding venue wants more enquiries."
            start={cue.saMoreEnquiries}
            subtitle="But that is not where most bookings are won or lost."
            variant="warm"
          />
        </section>

        <section className="film-scene notification-scene" style={{opacity: saSceneB}}>
          <ProblemStatement
            asset={plates.shortlist}
            callouts={[
              {label: "New wedding enquiry", value: "Saturday 12 July 2027", detail: "120 guests", meta: ["£12,000-£15,000 budget"]},
              {label: "Question received", value: "Availability & pricing", detail: "Response required"},
              {label: "Brochure downloaded", value: "Interest confirmed", detail: "Follow-up recommended"},
            ]}
            headline="Won or lost after a couple gets in touch."
            start={cue.saMomentsMatter}
            subtitle="The moments after the enquiry shape their confidence."
            variant="plum"
          />
        </section>

        <section className="film-scene leak-scene" style={{opacity: saSceneC}}>
          <ProblemStatement
            asset={plates.afterHours}
            callouts={[
              {label: "Viewing request", value: "Thursday 3pm", detail: "Tour not yet confirmed"},
              {label: "Follow-up due", value: "Couple still deciding", detail: "Momentum at risk"},
              {label: "Confidence fading", value: "Reply delayed", detail: "Another venue can win the moment"},
            ]}
            headline="Opportunities are leaking every day."
            start={cue.saLeakingOpportunities}
            subtitle="A common challenge for busy venue teams."
            variant="night"
          />
        </section>

        <section className="film-scene stat-feature" style={{opacity: saSceneD}}>
          <StatisticReveal
            asset={plates.afterHours}
            label="Couples say they have felt frustrated by venue response times."
            source="Wedding venue response research"
            start={cue.saStat81}
            value="81%"
            variant="fresh"
          />
        </section>

        <section className="film-scene cards-scene" style={{opacity: saSceneE}}>
          <ShortlistCards asset={plates.shortlist} start={cue.saVenueCards} />
          <div className="scene-bottom-caption">Nearly 70% decide after visiting 3 venues or fewer.</div>
        </section>

        <section className="film-scene clock-scene" style={{opacity: saSceneF}}>
          <StatisticReveal
            asset={plates.afterHours}
            label="Of enquiries happen outside normal office hours."
            source="VenueBot sector benchmark"
            start={cue.saStat68}
            value="Almost 70%"
            variant="night"
          />
        </section>

        <section className="film-scene journey-scene" style={{opacity: saSceneG}}>
          <ProblemStatement
            asset={plates.shortlist}
            callouts={[
              {label: "Venue website", value: "Discovery", detail: "First impression"},
              {label: "Brochure downloaded", value: "Interest", detail: "Intent confirmed"},
              {label: "Question answered", value: "Confidence", detail: "Doubt removed"},
              {label: "Viewing booked", value: "Momentum", detail: "Tour confirmed"},
              {label: "Wedding booked", value: "Decision", detail: "Opportunity won"},
            ]}
            headline="Every step is a decision point."
            start={cue.saJourneyMoments}
            subtitle="Couples move through the journey quickly, emotionally, and with options."
            variant="warm"
          />
        </section>

        <section className="film-scene fork-scene" style={{opacity: saSceneH}}>
          <ProblemStatement
            asset={plates.shortlist}
            callouts={[
              {label: "Closer to booking", value: "1"},
              {label: "Closer to a competitor", value: "2"},
            ]}
            headline="Closer to booking, or closer to somebody else."
            start={cue.saCompetitorRisk}
            subtitle="The follow-up experience becomes part of the venue experience."
            variant="plum"
          />
        </section>

        <section className="film-scene funnel-scene" style={{opacity: saSceneI}}>
          <ProblemStatement
            asset={plates.product}
            callouts={[
              {label: "Wedding interest", value: "Couples are arriving", detail: "Traffic is working"},
              {label: "Booking momentum", value: "Moments are leaking", detail: "Conversion needs attention"},
            ]}
            headline="Not an enquiry problem."
            start={cue.saConversionGap}
            subtitle="A conversion problem."
            variant="product"
          />
        </section>

        <section className="film-scene missed-scene" style={{opacity: saSceneJ}}>
          <ProblemStatement
            asset={plates.afterHours}
            callouts={[
              {label: "Follow-up unsent", value: "Couple still warm", detail: "Opportunity at risk"},
              {label: "Viewing not confirmed", value: "Decision window open", detail: "Momentum slipping"},
              {label: "Couple moves on", value: "Another venue replies", detail: "Booking lost quietly"},
            ]}
            headline="Couples quietly disappear."
            start={cue.saMissedFollowUps}
            subtitle="The venue rarely sees the moment the booking was lost."
            variant="night"
          />
        </section>

        <section className="film-scene built-scene" style={{opacity: saSceneK}}>
          <SolutionIntro
            headline="That is why we built VenueBot."
            start={cue.saBuiltVenueBot}
            subtitle="Built around the moments that decide bookings."
          />
        </section>

        <section className="film-scene not-scene" style={{opacity: sbSceneA}}>
          <ProblemStatement
            asset={plates.product}
            callouts={[
              {label: "Not a chatbot"},
              {label: "Not just a CRM"},
            ]}
            headline="VenueBot is not a chatbot."
            start={cue.sbNotChatbot}
            subtitle="And it is not just another CRM."
            variant="product"
          />
        </section>

        <section className="film-scene system-scene" style={{opacity: sbSceneB}}>
          <SolutionIntro
            headline="A complete enquiry-to-booking system."
            start={cue.sbSystem}
            subtitle="Built specifically for wedding venues."
          />
        </section>

        <section className="film-scene modules-scene" style={{opacity: sbSceneC}}>
          <CapabilityPillarSystem start={cue.sbModules} />
        </section>

        <section className="film-scene final-reveal" style={{opacity: sbSceneG}}>
          <CTAClosingScene
            headline="More Bookings. More Confidence."
            start={cue.sbFinalReveal}
            subtitle="That is VenueBot. And this is how it works."
          />
        </section>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
