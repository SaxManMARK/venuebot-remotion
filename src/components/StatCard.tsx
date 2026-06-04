import {interpolate, spring, useCurrentFrame, useVideoConfig} from "remotion";
import {font} from "../theme";

type StatCardProps = {
  value: string;
  label: string;
  delay: number;
  index: number;
};

export const StatCard = ({value, label, delay, index}: StatCardProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const entrance = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 18,
      stiffness: 90,
      mass: 0.9,
    },
  });
  const opacity = interpolate(frame, [delay - 8, delay + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className={`stat-card stat-card-${index}`}
      style={{
        opacity,
        transform: `translateY(${(1 - entrance) * 42}px) scale(${0.94 + entrance * 0.06})`,
      }}
    >
      <div className="stat-value" style={{fontFamily: font.title}}>
        {value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};
