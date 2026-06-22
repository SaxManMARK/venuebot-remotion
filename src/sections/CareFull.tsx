import {AbsoluteFill, Series} from "remotion";
import {seconds} from "../data/video";
import {m3Sr, m3SsSv, m3SwSx, m3SySz, m3Saa, m3Sab, m3Sdd} from "../data/careSections";
import {palette} from "../theme";
import {StudioModuleSection} from "./StudioModuleSection";

// Video 4: Care (M3) — the full continuous film, in running order. The
// recording-free sections (SR cold open, SAB/SBB/SCC "built around you", SDD
// closer) are finished motion design; the recording-led middle (SS-SV, SW-SX,
// SY-SZ, SAA) runs the full VO under a holding slate until Mark's ScreenStudio
// captures are dropped in (placeholder: true on those configs).
const sequence = [m3Sr, m3SsSv, m3SwSx, m3SySz, m3Saa, m3Sab, m3Sdd];

export const careFullDuration = sequence.reduce((total, s) => total + seconds(s.duration), 0);

export const CareFull = () => {
  return (
    <AbsoluteFill style={{backgroundColor: palette.porcelain}}>
      <Series>
        {sequence.map((config) => (
          <Series.Sequence durationInFrames={seconds(config.duration)} key={config.id}>
            <StudioModuleSection config={config} />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
