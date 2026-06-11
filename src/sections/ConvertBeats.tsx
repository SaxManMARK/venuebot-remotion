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
 *  "more than 50 days"; channel pills land on "email, SMS and WhatsApp". */
const timelineDays = [1, 3, 6, 10, 15, 21, 28, 36, 50];
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
        {timelineDays.map((day, index) => {
          const pos = (day - 1) / 49;
          const channel = channelOrder[index % 3];
          // Reveal window compressed so the Day 50 node still lands before draw hits 1.
          const on = interpolate(draw, [pos * 0.92, pos * 0.92 + 0.06], [0, 1], clamp);
          const lit = frame >= eventFrame(beat, channel);
          return (
            <div
              className="convert-tl-node"
              key={day}
              style={{
                left: `${pos * 100}%`,
                opacity: on,
                transform: `translateX(-50%) scale(${0.7 + on * 0.3})`,
                backgroundColor: lit ? channelColor[channel] : "rgba(81, 67, 76, 0.28)",
              }}
            />
          );
        })}
        <em className="convert-tl-daylabel" style={{left: "0%", opacity: interpolate(draw, [0, 0.06], [0, 1], clamp)}}>
          Day 1
        </em>
        <em className="convert-tl-daylabel" style={{left: "100%", opacity: interpolate(draw, [0.96, 1], [0, 1], clamp)}}>
          Day 50+
        </em>
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

export const beatRenderers: Record<SectionBeat["type"], FC<{beat: SectionBeat}>> = {
  "after-hours-clock": AfterHoursClock,
  "nurture-timeline": NurtureTimeline,
};
