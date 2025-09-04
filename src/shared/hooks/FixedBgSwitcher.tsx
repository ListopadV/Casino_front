import Image, { StaticImageData } from "next/image";
import { useEffect, useState } from "react";

export type BgItem = { src: StaticImageData; blur?: number };

export default function FixedBgSwitcher({
  items,
  activeIndex,
  overlay = "rgba(0,0,0,0.6)",
}: {
  items: BgItem[];
  activeIndex: number;
  overlay?: string;
}) {
  const [noMotion, setNoMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setNoMotion(
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      );
    }
  }, []);

  return (
    <>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        aria-hidden
        style={{ contain: "paint" }}
      >
        {items.map((it, i) => (
          <Image
            key={i}
            src={it.src}
            alt=""
            fill
            sizes="100vw"
            priority={i === activeIndex}
            style={{
              objectFit: "cover",
              transform: "translateZ(0)",
              filter: it.blur ? `blur(${it.blur}px)` : undefined,
              opacity: i === activeIndex ? 1 : 0,
              transition: noMotion ? "none" : "opacity 400ms ease",
              willChange: "opacity",
              backfaceVisibility: "hidden",
            }}
          />
        ))}
      </div>
      <div className="fixed inset-0 -z-10 pointer-events-none" style={{ background: overlay }} />
    </>
  );
}
