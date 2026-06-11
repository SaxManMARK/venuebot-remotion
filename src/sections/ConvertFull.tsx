import {AbsoluteFill, Series} from "remotion";
import {seconds} from "../data/video";
import {m2Sk, m2Sn, m2So, m2Sq} from "../data/convertSections";
import {palette} from "../theme";
import {StudioModuleSection} from "./StudioModuleSection";

// Video 3: Convert - the full continuous film.
// Speed to Lead (SK/SL/SM), the SMS conversation (SN), every channel + the
// 30-50% outcome (SO/SP), then the end card and T2 hand-off into Care.
// Roughly 4 minutes.
export const convertFullDuration =
  seconds(m2Sk.duration) + seconds(m2Sn.duration) + seconds(m2So.duration) + seconds(m2Sq.duration);

export const ConvertFull = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.porcelain}}>
      <Series>
        <Series.Sequence durationInFrames={seconds(m2Sk.duration)}>
          <StudioModuleSection config={m2Sk} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m2Sn.duration)}>
          <StudioModuleSection config={m2Sn} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m2So.duration)}>
          <StudioModuleSection config={m2So} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m2Sq.duration)}>
          <StudioModuleSection config={m2Sq} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
