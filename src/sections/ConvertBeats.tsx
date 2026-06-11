import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";
import type {FC} from "react";
import {seconds} from "../data/video";
import {reveal} from "./StudioAI";
import type {SectionBeat} from "./StudioModuleSection";

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

/** M2-SL: a Saturday 22:14 enquiry, hours racing by unanswered, then Convert
 *  replying in seconds. Anchored on the "notify" / "hours" / "reply" events. */
const AfterHoursClock: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const notifyF = eventFrame(beat, "notify");
  const hoursF = eventFrame(beat, "hours");
  const replyF = eventFrame(beat, "reply");

  const answered = frame >= replyF;
  // 22:14 races to 08:02 next morning while "every hour that passes..." plays.
  const raced = interpolate(frame, [hoursF, replyF - seconds(1.2)], [0, 588], clamp);
  const totalMinutes = 22 * 60 + 14 + (answered ? 0 : Math.round(raced));
  const hh = String(Math.floor(totalMinutes / 60) % 24).padStart(2, "0");
  const mm = String(totalMinutes % 60).padStart(2, "0");

  const cardPop = reveal(frame, seconds(beat.from + 0.1), seconds(0.7));
  const notifyPop = reveal(frame, notifyF, seconds(0.55));
  const replyPop = reveal(frame, replyF, seconds(0.5));
  const waiting = interpolate(frame, [hoursF, replyF - seconds(1.2)], [0, 1], clamp);
  const collapse = answered ? reveal(frame, replyF, seconds(0.45)) : 0;

  return (
    <AbsoluteFill className="convert-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div
        className="convert-clock-card"
        style={{
          opacity: cardPop,
          transform: `translateX(-50%) translateY(${(1 - cardPop) * 30}px)`,
        }}
      >
        <span className="convert-clock-kicker">{answered ? "With Convert" : "Saturday · after hours"}</span>
        <strong className="convert-clock-time">
          {hh}:{mm}
        </strong>
        <div className="convert-wait">
          <div className="convert-wait-track">
            <div
              className="convert-wait-bar"
              style={{
                transform: `scaleX(${waiting * (1 - collapse)})`,
                opacity: waiting > 0.01 ? 1 : 0,
              }}
            />
          </div>
          <em>
            {answered
              ? "Answered in seconds."
              : waiting > 0.02
                ? "The couple is still waiting."
                : "The office is closed."}
          </em>
        </div>
      </div>

      <div
        className="convert-side-card convert-notify"
        style={{
          opacity: notifyPop,
          transform: `translateY(${(1 - notifyPop) * 26}px)`,
        }}
      >
        <span>New enquiry</span>
        <strong>Emma &amp; James · September 2027</strong>
        <em>22:14</em>
      </div>

      <div
        className="convert-side-card convert-reply"
        style={{
          opacity: replyPop,
          transform: `translateY(${(1 - replyPop) * 26}px)`,
        }}
      >
        <span>Convert</span>
        <strong>Replied · 22:14</strong>
        <em>Seconds later</em>
      </div>
    </AbsoluteFill>
  );
};

/** M2-SM: the 50-day nurture journey. The rail draws on as the VO says
 *  "more than 50 days"; channel pills land on "email, SMS and WhatsApp".
 *  Touchpoints are the real no-tour cadence from NURTURE_SEQUENCE_V3.md:
 *  the Day-0 trio (E1.1/E1.2/E1.3), pre-tour nurture D3-D14, recovery D18-D50. */
type Channel = "email" | "sms" | "whatsapp";

const touchpoints: {day: number; channel: Channel; dy?: number; label?: string}[] = [
  {day: 0, channel: "email", dy: -17, label: "Hours"},
  {day: 0, channel: "sms", dy: 0},
  {day: 0, channel: "email", dy: 17},
  {day: 3, channel: "email", label: "Day 3"},
  {day: 5, channel: "email"},
  {day: 7, channel: "sms", label: "Day 7"},
  {day: 9, channel: "email"},
  {day: 12, channel: "whatsapp", label: "Day 12"},
  {day: 14, channel: "email"},
  {day: 18, channel: "email", label: "Day 18"},
  {day: 25, channel: "sms", label: "Day 25"},
  {day: 35, channel: "email", label: "Day 35"},
  {day: 50, channel: "email", label: "Day 50"},
];

const stages = [
  {from: 0, to: 0, label: "Enquiry response"},
  {from: 3, to: 14, label: "Pre-tour nurture"},
  {from: 18, to: 50, label: "Recovery"},
];

// Square-root day scale: the dense early cadence gets room, Day 50 stays the horizon.
const dayPos = (day: number) => Math.sqrt(day / 50);

const channelOrder = ["email", "sms", "whatsapp"] as const;
const channelLabel = {email: "Email", sms: "SMS", whatsapp: "WhatsApp"};
const channelColor = {email: "#6A5A60", sms: "#C08E7C", whatsapp: "#7C918A"};

const NurtureTimeline: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const drawF = eventFrame(beat, "draw");
  const statF = eventFrame(beat, "stat");
  const line1F = eventFrame(beat, "line1");
  const line2F = eventFrame(beat, "line2");

  const draw = interpolate(frame, [drawF, drawF + seconds(4.2)], [0, 1], clamp);
  const statPop = reveal(frame, statF, seconds(0.6));
  const kickerPop = reveal(frame, seconds(beat.from + 0.4), seconds(0.6));
  const line1On = reveal(frame, line1F, seconds(0.5)) * (1 - reveal(frame, line2F - seconds(0.25), seconds(0.4)));
  const line2On = reveal(frame, line2F, seconds(0.5));

  return (
    <AbsoluteFill className="convert-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div className="convert-tl-stat-wrap">
        <span style={{opacity: kickerPop, transform: `translateY(${(1 - kickerPop) * 18}px)`}}>
          Every enquiry, nurtured for
        </span>
        <strong style={{opacity: statPop, transform: `translateY(${(1 - statPop) * 26}px)`}}>50+ days</strong>
      </div>

      <div className="convert-tl-rail">
        <div className="convert-tl-track">
          <div className="convert-tl-line" style={{transform: `scaleX(${draw})`}} />
        </div>
        {stages.map((stage) => {
          const a = dayPos(stage.from);
          const b = dayPos(stage.to);
          const on = interpolate(draw, [Math.min(b * 0.92 + 0.06, 0.98), Math.min(b * 0.92 + 0.12, 1)], [0, 1], clamp);
          return (
            <div className="convert-tl-stage" key={stage.label} style={{left: `${a * 100}%`, opacity: on}}>
              <span>{stage.label}</span>
              {b > a ? <i style={{width: `${(b - a) * 1320}px`}} /> : null}
            </div>
          );
        })}
        {touchpoints.map((tp, index) => {
          const pos = dayPos(tp.day);
          // Reveal window compressed so the Day 50 node still lands before draw hits 1.
          const on = interpolate(draw, [pos * 0.92, pos * 0.92 + 0.06], [0, 1], clamp);
          const lit = frame >= eventFrame(beat, tp.channel);
          return (
            <div
              className="convert-tl-node"
              key={index}
              style={{
                left: `${pos * 100}%`,
                top: -9 + (tp.dy ?? 0),
                opacity: on,
                transform: `translateX(-50%) scale(${0.7 + on * 0.3})`,
                backgroundColor: lit ? channelColor[tp.channel] : "rgba(81, 67, 76, 0.28)",
              }}
            />
          );
        })}
        {touchpoints
          .filter((tp) => tp.label)
          .map((tp) => {
            const pos = dayPos(tp.day);
            const on = interpolate(draw, [pos * 0.92, pos * 0.92 + 0.06], [0, 1], clamp);
            return (
              <em className="convert-tl-daylabel" key={tp.label} style={{left: `${pos * 100}%`, opacity: on}}>
                {tp.label}
              </em>
            );
          })}
      </div>

      <div className="convert-tl-legend">
        {channelOrder.map((channel) => {
          const pop = reveal(frame, eventFrame(beat, channel), seconds(0.45));
          return (
            <span key={channel} style={{opacity: pop, transform: `translateY(${(1 - pop) * 22}px)`}}>
              <i style={{backgroundColor: channelColor[channel]}} />
              {channelLabel[channel]}
            </span>
          );
        })}
      </div>

      <div className="convert-tl-line-copy">
        <strong style={{opacity: line1On}}>Not repetitive reminders.</strong>
        <strong style={{opacity: line2On}}>Timely, relevant conversations.</strong>
      </div>
    </AbsoluteFill>
  );
};

/** M2-SN: word-timed editorial copy stacked in the left column while the
 *  phone demo plays on the right. Variants: line / italic / caps / big / chip. */
const SideCallouts: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="convert-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div className="convert-callouts">
        {(beat.events ?? [])
          .filter((event) => event.label)
          .map((event) => {
            const pop = reveal(frame, seconds(event.at), seconds(0.5));
            const cls = `convert-callout-${event.variant ?? "line"}`;
            return (
              <strong
                className={cls}
                key={event.id}
                style={{opacity: pop, transform: `translateY(${(1 - pop) * 26}px)`}}
              >
                {event.label}
              </strong>
            );
          })}
      </div>
    </AbsoluteFill>
  );
};

/** M2-SN: "the moment a couple chooses a time, the tour is in your diary."
 *  A week strip; the Saturday 10:00 tour card drops in on the "slot" event,
 *  then confirmation/notification cards land for couple and team. */
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TourDiary: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const slotF = eventFrame(beat, "slot");
  const confirmF = eventFrame(beat, "confirm");
  const notifyF = eventFrame(beat, "notify");

  const cardPop = reveal(frame, seconds(beat.from + 0.1), seconds(0.7));
  const slotPop = reveal(frame, slotF, seconds(0.55));
  const confirmPop = reveal(frame, confirmF, seconds(0.5));
  const notifyPop = reveal(frame, notifyF, seconds(0.5));

  return (
    <AbsoluteFill className="convert-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div
        className="convert-diary-card"
        style={{opacity: cardPop, transform: `translateX(-50%) translateY(${(1 - cardPop) * 30}px)`}}
      >
        <span className="convert-clock-kicker">Your venue tour diary</span>
        <div className="convert-diary-week">
          {weekDays.map((day) => (
            <div className={`convert-diary-day${day === "Sat" ? " is-tour" : ""}`} key={day}>
              <em>{day}</em>
              {day === "Sat" ? (
                <div
                  className="convert-diary-slot"
                  style={{opacity: slotPop, transform: `translateY(${(1 - slotPop) * 22}px)`}}
                >
                  <strong>Venue tour</strong>
                  <span>Emma &amp; James</span>
                  <span>10:00</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        className="convert-side-card convert-notify"
        style={{opacity: confirmPop, transform: `translateY(${(1 - confirmPop) * 26}px)`}}
      >
        <span>To the couple</span>
        <strong>Tour confirmed · Saturday 10:00</strong>
        <em>Confirmation sent automatically</em>
      </div>

      <div
        className="convert-side-card convert-reply"
        style={{opacity: notifyPop, transform: `translateY(${(1 - notifyPop) * 26}px)`}}
      >
        <span>To your team</span>
        <strong>New tour booked</strong>
        <em>Diary updated · notification sent</em>
      </div>
    </AbsoluteFill>
  );
};

/** M2-SO: the same AI on every channel. Four stylised chat surfaces land
 *  word-timed as each channel is named, then caption lines carry "trained on
 *  your venue... around the clock". Channel marks are Font Awesome brand
 *  glyphs (CC BY 4.0) on bold brand-colour discs. */
const fbPath =
  "M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z";
const igPath =
  "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z";
const waPath =
  "M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 2.8-26.4-1.9-2.3-5.6-3.7-11.6-6.4z";
const globePath =
  "M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-49.9-141.6h-108z";

const ChannelIcon: FC<{id: string}> = ({id}) => {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 448 512" width="32" height="32">
        <path d={igPath} fill="#ffffff" />
      </svg>
    );
  }
  const glyph = {website: {d: globePath, box: "0 0 496 512"}, facebook: {d: fbPath, box: "0 0 320 512"}, whatsapp: {d: waPath, box: "0 0 448 512"}}[id];
  if (!glyph) return null;
  return (
    <svg viewBox={glyph.box} width="32" height="32">
      <path d={glyph.d} fill="#ffffff" />
    </svg>
  );
};

const channels = [
  {id: "website", name: "Website · Live chat", color: "#6A5A60", q: "Is 14 June 2027 available?", a: "It is! Shall I pencil it in?"},
  {id: "facebook", name: "Facebook · Messenger", color: "#1877F2", q: "How many guests can you host?", a: "120 by day, 170 by evening."},
  {id: "instagram", name: "Instagram · DM", color: "#D6249F", q: "Can we see the Walled Garden?", a: "Of course. Book a tour below."},
  {id: "whatsapp", name: "WhatsApp", color: "#25D366", q: "Can our dog join the ceremony?", a: "Absolutely. Dogs are welcome."},
];

const ChannelGrid: FC<{beat: SectionBeat}> = ({beat}) => {
  const frame = useCurrentFrame();
  const line1F = eventFrame(beat, "line1");
  const line2F = eventFrame(beat, "line2");
  const line1On = reveal(frame, line1F, seconds(0.5)) * (1 - reveal(frame, line2F - seconds(0.3), seconds(0.4)));
  const line2On = reveal(frame, line2F, seconds(0.5));

  return (
    <AbsoluteFill className="convert-beat" style={{opacity: beatOpacity(frame, beat)}}>
      <div className="convert-grid">
        {channels.map((channel) => {
          const pop = reveal(frame, eventFrame(beat, channel.id), seconds(0.55));
          return (
            <div
              className="convert-grid-card"
              key={channel.id}
              style={{opacity: pop, transform: `translateY(${(1 - pop) * 34}px) scale(${0.97 + pop * 0.03})`}}
            >
              <header>
                <i
                  style={
                    channel.id === "instagram"
                      ? {background: "radial-gradient(circle at 28% 110%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285aeb 90%)"}
                      : {backgroundColor: channel.color}
                  }
                >
                  <ChannelIcon id={channel.id} />
                </i>
                <span>{channel.name}</span>
              </header>
              <div className="convert-grid-q">{channel.q}</div>
              <div className="convert-grid-a" style={{borderColor: channel.color}}>
                {channel.a}
              </div>
            </div>
          );
        })}
      </div>
      <div className="convert-grid-copy">
        <strong style={{opacity: line1On}}>Trained on your venue.</strong>
        <strong style={{opacity: line2On}}>Around the clock.</strong>
      </div>
    </AbsoluteFill>
  );
};

export const beatRenderers: Record<SectionBeat["type"], FC<{beat: SectionBeat}>> = {
  "after-hours-clock": AfterHoursClock,
  "nurture-timeline": NurtureTimeline,
  "side-callouts": SideCallouts,
  "tour-diary": TourDiary,
  "channel-grid": ChannelGrid,
};
