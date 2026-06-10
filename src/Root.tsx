import {Composition} from "remotion";
import {Intro} from "./sections/Intro";
import {ChapterCard} from "./sections/ChapterCard";
import {StudioAI} from "./sections/StudioAI";
import {StudioAIVenueIntelligence} from "./sections/StudioAIVenueIntelligence";
import {StudioModuleSection} from "./sections/StudioModuleSection";
import {StudioAIFull, studioAiFullDuration} from "./sections/StudioAIFull";
import {m1Se, m1Sf, m1Sg, m1Sh, m1Si} from "./data/studioAiSections";
import {seconds} from "./data/video";
import {
  chapterCardDurationFrames,
  introDurationFrames,
  videoFps,
  videoHeight,
  videoWidth,
} from "./data/video";
import {studioAiScenes} from "./data/studioAi";
import "./styles.css";

export const Root = () => {
  return (
    <>
      <Composition
        id="VenueBotIntro"
        component={Intro}
        durationInFrames={introDurationFrames}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="VenueBotMaster"
        component={Intro}
        durationInFrames={introDurationFrames}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="StudioAI"
        component={StudioAI}
        durationInFrames={studioAiScenes.m1Sc.duration}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="StudioAI-M1-SC"
        component={StudioAI}
        durationInFrames={studioAiScenes.m1Sc.duration}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="StudioAI-Full"
        component={StudioAIFull}
        durationInFrames={studioAiFullDuration}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="StudioAI-M1-SD"
        component={StudioAIVenueIntelligence}
        durationInFrames={studioAiScenes.m1Sd.duration}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="StudioAI-M1-SE"
        component={StudioModuleSection}
        durationInFrames={seconds(m1Se.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m1Se}}
      />
      <Composition
        id="StudioAI-M1-SF"
        component={StudioModuleSection}
        durationInFrames={seconds(m1Sf.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m1Sf}}
      />
      <Composition
        id="StudioAI-M1-SG"
        component={StudioModuleSection}
        durationInFrames={seconds(m1Sg.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m1Sg}}
      />
      <Composition
        id="StudioAI-M1-SH"
        component={StudioModuleSection}
        durationInFrames={seconds(m1Sh.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m1Sh}}
      />
      <Composition
        id="StudioAI-M1-SI"
        component={StudioModuleSection}
        durationInFrames={seconds(m1Si.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m1Si}}
      />
      <Composition
        id="Convert"
        component={ChapterCard}
        durationInFrames={chapterCardDurationFrames}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{
          sectionNumber: "3",
          title: "Convert",
          description: "Instant response, consistent nurture, and booked tours across every enquiry channel.",
          tone: "conversion",
        }}
      />
      <Composition
        id="Care"
        component={ChapterCard}
        durationInFrames={chapterCardDurationFrames}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{
          sectionNumber: "4",
          title: "Care",
          description: "CRM, inbox, pipeline, follow-up, and operational control in one system.",
          tone: "control",
        }}
      />
    </>
  );
};
