import {AbsoluteFill, interpolate, useCurrentFrame} from "remotion";

export const PremiumBackground = () => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 180, 720, 1800], [0.15, 0.34, 0.24, 0.38], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="premium-background">
      <div className="grain" />
      <div
        className="light light-one"
        style={{opacity: glow, transform: `translate3d(${frame * 0.02}px, ${frame * -0.01}px, 0)`}}
      />
      <div
        className="light light-two"
        style={{opacity: glow * 0.72, transform: `translate3d(${frame * -0.018}px, ${frame * 0.012}px, 0)`}}
      />
      <div className="ambient-ring" />
    </AbsoluteFill>
  );
};
