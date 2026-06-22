import {Composition} from "remotion";
import {Intro} from "./sections/Intro";
import {ChapterCard} from "./sections/ChapterCard";
import {StudioAI} from "./sections/StudioAI";
import {StudioAIVenueIntelligence} from "./sections/StudioAIVenueIntelligence";
import {StudioModuleSection} from "./sections/StudioModuleSection";
import {StudioAIFull, studioAiFullDuration} from "./sections/StudioAIFull";
import {ConvertFull, convertFullDuration} from "./sections/ConvertFull";
import {CareFull, careFullDuration} from "./sections/CareFull";
import {m1Se, m1Sf, m1Sg, m1Sh, m1Si} from "./data/studioAiSections";
import {m2Sk, m2Sn, m2So, m2Sq} from "./data/convertSections";
import {m3Sr, m3SsSv, m3SwSx, m3SySz, m3Saa, m3Sab, m3Sdd} from "./data/careSections";
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
        id="Convert-Full"
        component={ConvertFull}
        durationInFrames={convertFullDuration}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="Convert-M2-SK"
        component={StudioModuleSection}
        durationInFrames={seconds(m2Sk.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m2Sk}}
      />
      <Composition
        id="Convert-M2-SN"
        component={StudioModuleSection}
        durationInFrames={seconds(m2Sn.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m2Sn}}
      />
      <Composition
        id="Convert-M2-SO"
        component={StudioModuleSection}
        durationInFrames={seconds(m2So.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m2So}}
      />
      <Composition
        id="Convert-M2-SQ"
        component={StudioModuleSection}
        durationInFrames={seconds(m2Sq.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m2Sq}}
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
        id="Care-Full"
        component={CareFull}
        durationInFrames={careFullDuration}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
      />
      <Composition
        id="Care-M3-SR"
        component={StudioModuleSection}
        durationInFrames={seconds(m3Sr.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m3Sr}}
      />
      <Composition
        id="Care-M3-SS-SV"
        component={StudioModuleSection}
        durationInFrames={seconds(m3SsSv.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m3SsSv}}
      />
      <Composition
        id="Care-M3-SW-SX"
        component={StudioModuleSection}
        durationInFrames={seconds(m3SwSx.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m3SwSx}}
      />
      <Composition
        id="Care-M3-SY-SZ"
        component={StudioModuleSection}
        durationInFrames={seconds(m3SySz.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m3SySz}}
      />
      <Composition
        id="Care-M3-SAA"
        component={StudioModuleSection}
        durationInFrames={seconds(m3Saa.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m3Saa}}
      />
      <Composition
        id="Care-M3-SAB-SCC"
        component={StudioModuleSection}
        durationInFrames={seconds(m3Sab.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m3Sab}}
      />
      <Composition
        id="Care-M3-SDD"
        component={StudioModuleSection}
        durationInFrames={seconds(m3Sdd.duration)}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{config: m3Sdd}}
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
