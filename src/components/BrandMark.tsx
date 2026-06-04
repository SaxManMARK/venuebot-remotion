import {Img, staticFile} from "remotion";

type BrandMarkProps = {
  variant?: "white" | "agave";
  className?: string;
};

export const BrandMark = ({variant = "white", className}: BrandMarkProps) => {
  const src =
    variant === "white"
      ? "brand/venuebot-logo-white.png"
      : "brand/venuebot-logo-agave.png";

  return <Img className={className ?? "brand-mark"} src={staticFile(src)} />;
};
