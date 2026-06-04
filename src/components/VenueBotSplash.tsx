import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from "remotion";
import {Animated, Ease, Fade, Move, Scale} from "remotion-animated";
import {seconds} from "../data/video";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const logoWidth = 760;
const logoHeight = 228;

const logoShards = Array.from({length: 44}).map((_, index) => {
  const columns = 11;
  const rows = 4;
  const column = index % columns;
  const row = Math.floor(index / columns);
  const width = logoWidth / columns;
  const height = logoHeight / rows;
  const angle = Math.atan2(row - (rows - 1) / 2, column - (columns - 1) / 2);
  const distance = 150 + ((column + row) % 5) * 32;
  const direction = column < (columns - 1) / 2 ? -1 : 1;

  return {
    angle,
    delay: ((column + row * 2) % 8) * 1.2,
    distance,
    dx: Math.cos(angle) * distance,
    dy: Math.sin(angle) * distance - 34,
    dz: -70 - ((column + row) % 5) * 28,
    height: height + 1,
    rotateX: -24 + ((row * 13 + column * 7) % 48),
    rotateY: direction * (28 + ((row + column) % 5) * 9),
    rotateZ: -16 + ((column * 5 + row * 9) % 32),
    rotation: -10 + ((column * 3 + row * 11) % 20),
    width: width + 1,
    x: column * width,
    y: row * height,
  };
});

const fragments = Array.from({length: 56}).map((_, index) => {
  const angle = (Math.PI * 2 * index) / 56;

  return {
    angle,
    delay: (index % 12) * 1.5,
    distance: 340 + (index % 9) * 42,
    height: 7 + (index % 4) * 3,
    rotation: -28 + (index % 9) * 7,
    width: 18 + (index % 5) * 8,
  };
});

export const VenueBotSplash = () => {
  const frame = useCurrentFrame();
  const exitStart = seconds(3.05);
  const exitEnd = seconds(4);
  const logoOpacity = interpolate(frame, [0, seconds(0.45), exitStart - seconds(0.08), exitStart + seconds(0.16)], [0, 1, 1, 0], clamp);
  const logoLift = interpolate(frame, [seconds(0.25), seconds(1.35), exitStart, exitEnd], [24, 0, 0, -28], clamp);
  const logoScale = interpolate(frame, [seconds(0.25), seconds(1.3), exitStart, exitEnd], [0.92, 1, 1, 1.03], clamp);
  const washOpacity = interpolate(frame, [seconds(3.45), exitEnd], [1, 0], clamp);
  const sweep = interpolate(frame, [seconds(0.18), seconds(1.75)], [-520, 620], clamp);
  const panelScale = interpolate(frame, [seconds(0.15), seconds(1.35), exitStart, exitEnd], [0.92, 1, 1, 1.06], clamp);
  const panelOpacity = interpolate(frame, [0, seconds(0.65), exitStart, exitEnd], [0, 0.88, 0.88, 0], clamp);
  const shardFieldOpacity = interpolate(frame, [exitStart - seconds(0.08), exitStart + seconds(0.1), exitEnd - seconds(0.08), exitEnd], [0, 1, 1, 0], clamp);

  return (
    <AbsoluteFill className="venuebot-splash" style={{opacity: washOpacity}}>
      <div className="splash-paper-texture" />
      <div className="splash-depth-panel" style={{opacity: panelOpacity, transform: `scale(${panelScale})`}} />
      <div className="splash-thread-lines">
        {Array.from({length: 6}).map((_, index) => (
          <span key={index} style={{transform: `translateY(${(index - 2.5) * 58}px)`}} />
        ))}
      </div>
      <div className="splash-light-sweep" style={{transform: `translateX(${sweep}px) rotate(-12deg)`}} />
      <div
        className="splash-logo-position"
        style={{opacity: logoOpacity, transform: `translateY(${logoLift}px) scale(${logoScale})`}}
      >
        <Animated
          className="splash-logo-wrap"
          animations={[
            Fade({initial: 0, to: 1, start: seconds(0.25), duration: 18, ease: Ease.QuinticOut}),
            Move({initialY: 46, y: 0, start: seconds(0.25), duration: 30, ease: Ease.QuinticOut}),
            Scale({initial: 0.86, by: 1, start: seconds(0.25), duration: 32, ease: Ease.QuinticOut}),
          ]}
          style={{opacity: 0}}
        >
          <Img className="splash-logo" src={staticFile("brand/venuebot-logo-agave.png")} />
        </Animated>
      </div>
      <div
        className="splash-logo-shard-field"
        style={{opacity: shardFieldOpacity, transform: `translate(-50%, -50%) translateY(${logoLift}px) scale(${logoScale})`}}
      >
        {logoShards.map((shard, index) => {
          const progress = interpolate(frame, [exitStart + shard.delay, exitEnd], [0, 1], clamp);
          const opacity = interpolate(progress, [0, 0.16, 0.86, 1], [1, 1, 0.82, 0], clamp);
          const blur = interpolate(progress, [0, 0.7, 1], [0, 0, 1.4], clamp);
          const transform = [
            `translate3d(${shard.dx * progress}px, ${shard.dy * progress}px, ${shard.dz * progress}px)`,
            `rotateX(${shard.rotateX * progress}deg)`,
            `rotateY(${shard.rotateY * progress}deg)`,
            `rotateZ(${shard.rotateZ * progress}deg)`,
            `scale(${1 - progress * 0.04})`,
          ].join(" ");

          return (
            <span
              className="splash-logo-shard"
              key={index}
              style={{
                filter: `blur(${blur}px) drop-shadow(0 22px 38px rgba(31, 23, 20, 0.12))`,
                height: shard.height,
                left: shard.x,
                opacity,
                top: shard.y,
                transform,
                width: shard.width,
              }}
            >
              <Img
                className="splash-logo-shard-image"
                src={staticFile("brand/venuebot-logo-agave.png")}
                style={{
                  height: logoHeight,
                  left: -shard.x,
                  top: -shard.y,
                  width: logoWidth,
                }}
              />
            </span>
          );
        })}
      </div>
      <div className="splash-fragment-field">
        {fragments.map((fragment, index) => {
          const progress = interpolate(frame, [exitStart + fragment.delay, exitEnd], [0, 1], clamp);
          const opacity = interpolate(progress, [0, 0.16, 0.92, 1], [0, 1, 0.85, 0], clamp);
          const x = Math.cos(fragment.angle) * fragment.distance * progress;
          const y = Math.sin(fragment.angle) * fragment.distance * progress - progress * 42;
          const rotate = fragment.rotation + progress * 80;

          return (
            <span
              className={`splash-fragment splash-fragment-${index % 4}`}
              key={index}
              style={{
                height: fragment.height,
                opacity,
                transform: `translate(${x}px, ${y}px) rotate(${rotate}deg) scale(${1 - progress * 0.12})`,
                width: fragment.width,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
