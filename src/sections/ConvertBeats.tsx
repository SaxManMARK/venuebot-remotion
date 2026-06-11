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
 *  your venue... around the clock". */
const channels = [
  {id: "website", name: "Website · Live chat", color: "#6A5A60", q: "Is 14 June 2027 available?", a: "It is! Shall I pencil it in?"},
  {id: "facebook", name: "Facebook · Messenger", color: "#7587A3", q: "How many guests can you host?", a: "120 by day, 170 by evening."},
  {id: "instagram", name: "Instagram · DM", color: "#D5A798", q: "Can we see the Walled Garden?", a: "Of course. Book a tour below."},
  {id: "whatsapp", name: "WhatsApp", color: "#7C918A", q: "Can our dog join the ceremony?", a: "Absolutely. Dogs are welcome."},
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
                <i style={{backgroundColor: channel.color}} />
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
