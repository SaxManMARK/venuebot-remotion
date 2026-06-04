import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {PremiumBackground} from "../components/Background";
import {BrandMark} from "../components/BrandMark";
import {font, palette} from "../theme";

type ChapterCardProps = {
  sectionNumber: string;
  title: string;
  description: string;
  tone: "intelligence" | "conversion" | "control";
};

const toneLabel: Record<ChapterCardProps["tone"], string> = {
  intelligence: "Analysis and creation",
  conversion: "Response and booking",
  control: "Pipeline and operations",
};

export const ChapterCard = ({
  sectionNumber,
  title,
  description,
  tone,
}: ChapterCardProps) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 24, 210, 240], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [0, 42], [28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{backgroundColor: "#14201e", color: palette.cream}}>
      <PremiumBackground />
      <AbsoluteFill className={`chapter-card chapter-card-${tone}`} style={{opacity}}>
        <BrandMark variant="white" className="chapter-logo" />
        <div className="chapter-orbit" />
        <div className="chapter-content" style={{transform: `translateY(${y}px)`}}>
          <div className="chapter-kicker">Section {sectionNumber}</div>
          <h1 style={{fontFamily: font.title}}>{title}</h1>
          <p>{description}</p>
          <span>{toneLabel[tone]}</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
