import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import type {FC} from "react";
import {seconds} from "../data/video";
import {reveal} from "./StudioAI";
import type {SectionBeat} from "./StudioModuleSection";

// Video 4: Care (M3) bespoke beats. Mirrors the website Care vocabulary
// (care.css / care-hero.css): scattered sources collapsing into one calm
// control panel, smoky-plum / agave register, opaque editorial cards.

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const eventFrame = (beat: SectionBeat, id: string) =>
  seconds(beat.events?.find((e) => e.id === id)?.at ?? beat.from);

const beatOpacity = (frame: number, beat: SectionBeat) =>
  interpolate(
    frame,
    [seconds(beat.from), seconds(beat.from + 0.55), seconds(beat.until - 0.6), seconds(beat.until)],
    [0, 1, 1, 0],
    clamp,
  );

/* ---------- Source glyphs (monochrome, plum — matches website care-src) ---- */
const fbPath =
  "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z";
const igPath =
  "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z";
const waPath =
  "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 2.8-26.4-1.9-2.3-5.6-3.7-11.6-6.4z";

const SourceGlyph: FC<{id: string}> = ({id}) => {
  if (id === "facebook") return <svg viewBox="0 0 320 512"><path d={fbPath} fill="currentColor" /></svg>;
  if (id === "instagram") return <svg viewBox="0 0 448 512"><path d={igPath} fill="currentColor" /></svg>;
  if (id === "whatsapp") return <svg viewBox="0 0 448 512"><path d={waPath} fill="currentColor" /></svg>;
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (id === "mail")
    return (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" {...stroke} />
        <path d="m3 7 9 6 9-6" {...stroke} />
      </svg>
    );
  if (id === "sheet")
    return (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" {...stroke} />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" {...stroke} />
      </svg>
    );
  // diary / calendar
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="17" rx="2" {...stroke} />
      <path d="M16 2v4M8 2v4M3 10h18" {...stroke} />
    </svg>
  );
};

/* ===================================================================
 * M3-SR — scattered sources collapse into one source of truth.
 * Website story: care-scatter (rotated source cards) -> care-panel.
 * =================================================================== */
const sources = [
  {id: "email", glyph: "mail", name: "Email", note: "Three different inboxes"},
  {id: "whatsapp", glyph: "whatsapp", name: "WhatsApp", note: "On a personal phone"},
  {id: "facebook", glyph: "facebook", name: "Facebook", note: "Messages & comments"},
  {id: "instagram", glyph: "instagram", name: "Instagram", note: "DMs on another phone"},
  {id: "spreadsheet", glyph: "sheet", name: "Spreadsheet", note: "Notes & enquiries"},
  {id: "diary", glyph: "diary", name: "Diary", note: "Bookings by hand"},
];

// Loose centred cluster (stage coords, relative to centre) so the collapse reads.
const scatter = [
  {x: -610, y: -150, r: -5},
  {x: -120, y: -220, r: 4},
  {x: 470, y: -160, r: -3},
  {x: -470, y: 150, r: 3},
  {x: 70, y: 220, r: -4},
  {x: 560, y: 130, r: 5},
];

const ctrlTiles = [
  {label: "Lead sources", value: "Every channel"},
  {label: "Conversion", value: "Tracked live"},
  {label: "Tour bookings", value: "In the diary"},
  {label: "Revenue pipeline", value: "Always current"},
];

const CareScatterCollapse: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const introPop = reveal(frame, eventFrame(beat, "intro"), seconds(0.8));
  const emailF = eventFrame(beat, "email");
  const chaosF = eventFrame(beat, "chaos");
  const collapseF = eventFrame(beat, "collapse");
  const resolveF = eventFrame(beat, "resolve");

  const collapse = reveal(frame, collapseF, seconds(1.4)); // 0 scattered -> 1 collapsed
  const chaos = interpolate(frame, [chaosF, chaosF + seconds(1.0)], [0, 1], clamp) * (1 - collapse);
  const introOut = reveal(frame, emailF - seconds(0.4), seconds(0.5));

  return (
    <AbsoluteFill className="care-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div className="care-sr-kicker" style={{opacity: introPop * (1 - introOut)}}>
        Every wedding venue starts the same way.
      </div>

      {sources.map((s, i) => {
        const pop = reveal(frame, eventFrame(beat, s.id), seconds(0.5));
        const pos = scatter[i];
        const jx = Math.sin((frame + i * 23) / 7) * 6 * chaos;
        const jy = Math.cos((frame + i * 31) / 8) * 5 * chaos;
        const x = pos.x * (1 - collapse) + jx;
        const y = pos.y * (1 - collapse) + jy;
        const sc = (0.9 + pop * 0.1) * (1 - collapse * 0.55);
        return (
          <div
            className="care-src-card"
            key={s.id}
            style={{
              opacity: pop * (1 - collapse),
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${pos.r * (1 - collapse)}deg) scale(${sc})`,
            }}
          >
            <div className="care-src-ic">
              <SourceGlyph id={s.glyph} />
            </div>
            <strong>{s.name}</strong>
            <span>{s.note}</span>
          </div>
        );
      })}

      <div
        className="care-ctrl"
        style={{
          opacity: collapse,
          transform: `translate(-50%, -50%) translateY(${(1 - collapse) * 44}px) scale(${0.95 + collapse * 0.05})`,
        }}
      >
        <div className="care-ctrl-head">
          <span className="care-ctrl-badge">VenueBot Care</span>
          <span className="care-ctrl-meta">Kirby Manor · one platform</span>
        </div>
        <div className="care-ctrl-lines">
          {[
            ["s1", "One system"],
            ["s2", "One team"],
            ["s3", "One source of truth"],
          ].map(([id, label]) => {
            const p = reveal(frame, eventFrame(beat, id), seconds(0.45));
            return (
              <em key={id} style={{opacity: p, transform: `translateY(${(1 - p) * 14}px)`}}>
                {label}
              </em>
            );
          })}
        </div>
        <div className="care-ctrl-tiles">
          {ctrlTiles.map((t, i) => {
            const p = reveal(frame, resolveF + seconds(i * 0.12), seconds(0.5));
            return (
              <div className="care-ctrl-tile" key={t.label} style={{opacity: p, transform: `translateY(${(1 - p) * 16}px)`}}>
                <span>{t.label}</span>
                <strong>{t.value}</strong>
              </div>
            );
          })}
        </div>
      </div>

      <div className="care-sr-resolve" style={{opacity: reveal(frame, resolveF + seconds(0.2), seconds(0.6)) * (1 - reveal(frame, seconds(beat.until - 1.1), seconds(0.5)))}}>
        See everything across the entire venue.
      </div>
    </AbsoluteFill>
  );
};

/* ===================================================================
 * M3-SDD — series closer: three-product lockup -> VenueBot + tagline.
 * =================================================================== */
const products = [
  {id: "studio", logo: "brand/venuebot-studio-ai-logo.png", line: "Brings more couples to your venue."},
  {id: "convert", logo: "brand/venuebot-convert-logo.png", line: "Turns more enquiries into tours."},
  {id: "care", logo: "brand/venuebot-care-logo.png", line: "Gives your team one place to run it all."},
];

const ThreeProductLockup: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const brandF = eventFrame(beat, "brand");
  const close = reveal(frame, brandF - seconds(0.3), seconds(1.0)); // product row -> master brand
  const summaryOp = reveal(frame, eventFrame(beat, "summary"), seconds(0.5)) * (1 - close);
  const bookingsPop = reveal(frame, eventFrame(beat, "bookings"), seconds(0.5));
  const brandPop = reveal(frame, brandF, seconds(0.7));
  const tagPop = reveal(frame, eventFrame(beat, "tag"), seconds(0.6));

  return (
    <AbsoluteFill className="care-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div
        className="care-lockup"
        style={{opacity: 1 - close, transform: `translate(-50%, -50%) translateY(${close * -46}px) scale(${1 - close * 0.06})`}}
      >
        {products.map((p) => {
          const pop = reveal(frame, eventFrame(beat, p.id), seconds(0.6));
          return (
            <div className="care-lockup-col" key={p.id} style={{opacity: pop, transform: `translateY(${(1 - pop) * 30}px)`}}>
              <Img alt="" className="care-lockup-logo" src={staticFile(p.logo)} />
              <span>{p.line}</span>
            </div>
          );
        })}
      </div>

      <div className="care-lockup-summary" style={{opacity: summaryOp}}>
        <em>Three modules. One platform. One goal —</em>
        <strong style={{transform: `scale(${0.9 + bookingsPop * 0.1})`, opacity: bookingsPop}}>more bookings.</strong>
      </div>

      <div
        className="care-master"
        style={{opacity: brandPop, transform: `translate(-50%, -50%) translateY(${(1 - brandPop) * 30}px)`}}
      >
        <Img alt="VenueBot" className="care-master-logo" src={staticFile("brand/venuebot-logo-agave.png")} />
        <div className="care-master-tag" style={{opacity: tagPop, transform: `translateY(${(1 - tagPop) * 18}px)`}}>
          <span>Stop losing enquiries.</span>
          <strong>Start booking more tours.</strong>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ===================================================================
 * M3-SAB — "only the beginning": weekly release cadence -> smarter/faster.
 * =================================================================== */
const releases = [
  {id: "r1", label: "New automations"},
  {id: "r2", label: "New integrations"},
  {id: "r3", label: "New ways to save time"},
];
const gains = [
  {id: "smarter", label: "Smarter"},
  {id: "faster", label: "Faster"},
  {id: "productive", label: "More productive"},
];

const EvolvingCadence: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const kickerPop = reveal(frame, eventFrame(beat, "kicker"), seconds(0.7));
  const arc = reveal(frame, eventFrame(beat, "arc"), seconds(0.9));

  return (
    <AbsoluteFill className="care-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div className="care-evolve">
        <div className="care-evolve-head">
          <span className="care-evolve-badge">Product updates</span>
          <em>Every week</em>
        </div>
        <div className="care-evolve-kicker" style={{opacity: kickerPop}}>
          This is only the beginning.
        </div>
        <ul className="care-evolve-feed">
          {releases.map((r) => {
            const p = reveal(frame, eventFrame(beat, r.id), seconds(0.5));
            return (
              <li key={r.id} style={{opacity: p, transform: `translateX(${(1 - p) * -26}px)`}}>
                <i />
                {r.label}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="care-evolve-arc" style={{opacity: arc}}>
        <div className="care-evolve-arc-row">
          <span>Install today</span>
          <div className="care-evolve-track">
            <div style={{transform: `scaleX(${arc})`}} />
          </div>
          <span>Six months from now</span>
        </div>
        <div className="care-evolve-gains">
          {gains.map((g) => {
            const p = reveal(frame, eventFrame(beat, g.id), seconds(0.45));
            return (
              <strong key={g.id} style={{opacity: p, transform: `translateY(${(1 - p) * 16}px)`}}>
                {g.label}
              </strong>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ===================================================================
 * M3-SBB — White Glove: five verbs -> done with you / done for you.
 * =================================================================== */
const verbs = [
  {id: "build", label: "Build"},
  {id: "customise", label: "Customise"},
  {id: "install", label: "Install"},
  {id: "maintain", label: "Maintain"},
  {id: "improve", label: "Improve"},
];

const WhiteGlove: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const gloveF = eventFrame(beat, "glove");
  const close = reveal(frame, gloveF - seconds(0.3), seconds(0.9));
  const kickerPop = reveal(frame, eventFrame(beat, "kicker"), seconds(0.7));
  const glovePop = reveal(frame, gloveF, seconds(0.7));
  const wy = reveal(frame, eventFrame(beat, "withyou"), seconds(0.5));
  const fy = reveal(frame, eventFrame(beat, "foryou"), seconds(0.5));
  const youPop = reveal(frame, eventFrame(beat, "you"), seconds(0.6));
  const wePop = reveal(frame, eventFrame(beat, "we"), seconds(0.6));

  return (
    <AbsoluteFill className="care-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div className="care-glove-kicker" style={{opacity: (1 - close) * kickerPop}}>
        You don't build any of this yourself.
      </div>
      <div className="care-glove-verbs" style={{opacity: 1 - close, transform: `translate(-50%, -50%) translateY(${close * -34}px)`}}>
        {verbs.map((v) => {
          const p = reveal(frame, eventFrame(beat, v.id), seconds(0.45));
          return (
            <span key={v.id} style={{opacity: p, transform: `translateY(${(1 - p) * 24}px) scale(${0.9 + p * 0.1})`}}>
              {v.label}
            </span>
          );
        })}
      </div>

      <div
        className="care-glove-result"
        style={{opacity: glovePop, transform: `translate(-50%, -50%) translateY(${(1 - glovePop) * 28}px)`}}
      >
        <span className="care-glove-eyebrow">White Glove</span>
        <div className="care-glove-pills">
          <strong style={{opacity: wy}}>Done with you</strong>
          <strong style={{opacity: fy}}>Done for you</strong>
        </div>
        <div className="care-glove-split">
          <em style={{opacity: youPop}}>You create unforgettable weddings.</em>
          <em style={{opacity: wePop}}>We handle the technology.</em>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ===================================================================
 * M3-SCC — no limits: unlimited + 99% integrations.
 * =================================================================== */
const limits = [
  {id: "users", label: "users"},
  {id: "records", label: "records"},
  {id: "convos", label: "conversations"},
];
const integrations = ["Google", "Outlook", "Stripe", "Xero", "Mailchimp", "Zapier", "QuickBooks", "Slack"];

const NoLimits: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const growPop = reveal(frame, eventFrame(beat, "grow"), seconds(0.6));
  const integF = eventFrame(beat, "integrate");
  const close = reveal(frame, integF - seconds(0.3), seconds(0.9)); // unlimited block -> integrations
  const np = reveal(frame, eventFrame(beat, "nopenalty"), seconds(0.5));
  const nc = reveal(frame, eventFrame(beat, "noceiling"), seconds(0.5));
  const integPop = reveal(frame, integF, seconds(0.7));
  const fitsPop = reveal(frame, eventFrame(beat, "fits"), seconds(0.6));
  const ninetynine = Math.round(interpolate(frame, [integF, integF + seconds(1.0)], [0, 99], clamp));

  return (
    <AbsoluteFill className="care-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div
        className="care-limits"
        style={{opacity: 1 - close, transform: `translate(-50%, -50%) translateY(${close * -34}px)`}}
      >
        <div className="care-limits-kicker" style={{opacity: growPop}}>
          As your venue grows, the platform grows with you.
        </div>
        <div className="care-limits-row">
          {limits.map((l) => {
            const p = reveal(frame, eventFrame(beat, l.id), seconds(0.5));
            return (
              <div className="care-limit-card" key={l.id} style={{opacity: p, transform: `translateY(${(1 - p) * 26}px) scale(${0.93 + p * 0.07})`}}>
                <strong>∞</strong>
                <span>Unlimited {l.label}</span>
              </div>
            );
          })}
        </div>
        <div className="care-limits-nos">
          <em style={{opacity: np}}>No growth penalties</em>
          <em style={{opacity: nc}}>No artificial ceilings</em>
        </div>
      </div>

      <div
        className="care-integ"
        style={{opacity: integPop, transform: `translate(-50%, -50%) translateY(${(1 - integPop) * 32}px)`}}
      >
        <div className="care-integ-stat">
          <strong>
            {ninetynine}
            <i>%</i>
          </strong>
          <span>of the tools you already use</span>
        </div>
        <div className="care-integ-grid">
          {integrations.map((t, i) => {
            const p = reveal(frame, integF + seconds(0.3 + i * 0.08), seconds(0.45));
            return (
              <span key={t} style={{opacity: p, transform: `translateY(${(1 - p) * 14}px)`}}>
                {t}
              </span>
            );
          })}
        </div>
        <em className="care-integ-fits" style={{opacity: fitsPop}}>
          VenueBot fits around the systems you already have.
        </em>
      </div>
    </AbsoluteFill>
  );
};

export const careBeatRenderers: Record<string, FC<{beat: SectionBeat}>> = {
  "care-scatter-collapse": CareScatterCollapse,
  "three-product-lockup": ThreeProductLockup,
  "evolving-cadence": EvolvingCadence,
  "white-glove": WhiteGlove,
  "no-limits": NoLimits,
};
