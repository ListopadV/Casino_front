// FixedViewportBackground.tsx
import Image, { StaticImageData } from "next/image";

type Props = {
  src: StaticImageData | string;
  alt?: string;
  blur?: number; // px
  className?: string;
};

export default function FixedViewportBackground({ src, alt="Background", blur=6, className="" }: Props) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 ${className}`}
      aria-hidden="true"
      style={{ contain: "paint" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority
        style={{
          objectFit: "cover",
          transform: "translateZ(0)",
          filter: blur ? `blur(${blur}px)` : undefined,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      />
    </div>
  );
}
