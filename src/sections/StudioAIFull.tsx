import {AbsoluteFill, Series} from "remotion";
import {seconds} from "../data/video";
import {studioAiScenes} from "../data/studioAi";
import {m1Se, m1Sf, m1Sg, m1Sh, m1Si} from "../data/studioAiSections";
import {palette} from "../theme";
import {StudioAI} from "./StudioAI";
import {StudioAIVenueIntelligence} from "./StudioAIVenueIntelligence";
import {StudioModuleSection} from "./StudioModuleSection";

// Video 2: Studio AI - the full continuous film.
// Splash + M1-SC overview, then modules 01-06, ending on the M1-SJ end card
// and the T1 hand-off into Convert. Roughly 13.5 minutes.
export const studioAiFullDuration =
  studioAiScenes.m1Sc.duration +
  studioAiScenes.m1Sd.duration +
  seconds(m1Se.duration) +
  seconds(m1Sf.duration) +
  seconds(m1Sg.duration) +
  seconds(m1Sh.duration) +
  seconds(m1Si.duration);

export const StudioAIFull = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.porcelain}}>
      <Series>
        <Series.Sequence durationInFrames={studioAiScenes.m1Sc.duration}>
          <StudioAI />
        </Series.Sequence>
        <Series.Sequence durationInFrames={studioAiScenes.m1Sd.duration}>
          <StudioAIVenueIntelligence />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m1Se.duration)}>
          <StudioModuleSection config={m1Se} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m1Sf.duration)}>
          <StudioModuleSection config={m1Sf} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m1Sg.duration)}>
          <StudioModuleSection config={m1Sg} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m1Sh.duration)}>
          <StudioModuleSection config={m1Sh} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={seconds(m1Si.duration)}>
          <StudioModuleSection config={m1Si} />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
