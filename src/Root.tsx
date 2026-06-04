import {Composition} from "remotion";
import {Intro} from "./sections/Intro";
import {ChapterCard} from "./sections/ChapterCard";
import {
  chapterCardDurationFrames,
  introDurationFrames,
  videoFps,
  videoHeight,
  videoWidth,
} from "./data/video";
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
        component={ChapterCard}
        durationInFrames={chapterCardDurationFrames}
        fps={videoFps}
        width={videoWidth}
        height={videoHeight}
        defaultProps={{
          sectionNumber: "2",
          title: "Studio AI",
          description: "The intelligence layer that learns the venue, audits the marketing, and helps create content modern couples respond to.",
          tone: "intelligence",
        }}
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
