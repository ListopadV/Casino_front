'use client'

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

type Subscriber = () => void;
const subscribers = new Set<Subscriber>();
let rafId: number | null = null;

function onScrollOrResize() {
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    subscribers.forEach(fn => fn());
  });
}

if (typeof window !== "undefined") {
  // единоразовые подписки
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
}

// --- хук подписки на общий апдейт ---
function useParallaxBus(callback: Subscriber) {
  useEffect(() => {
    subscribers.add(callback);
    // первый вызов — сразу
    callback();
    return () => {
      subscribers.delete(callback);
    };
  }, [callback]);
}

export type ParallaxBackgroundProps = {
  src: StaticImageData;
  alt?: string;
  speed?: number;   // 0..1 (позитив — двигается навстречу скроллу)
  blur?: number;    // px
  className?: string;
  children?: React.ReactNode;
  /** Вместо translate относительно центра вьюпорта — глобальный режим для «стыковки» */
  seamless?: boolean;
  /** Минимальная высота секции (например, "100vh") */
  minHeight?: string | number;
};

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  src,
  alt = "Background",
  speed = 0.3,
  blur = 0,
  className = "",
  children,
  seamless = true,
  minHeight = "100vh",
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [transform, setTransform] = useState("translate3d(0,0,0)");

  // IO: считаем только рядом с вьюпортом
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "200px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const update = useMemo(() => {
    return () => {
      if (typeof window === "undefined") return;
      const el = rootRef.current;
      if (!el || !visible) return;

      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        setTransform("translate3d(0,0,0)");
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const viewportCenter = vh / 2;
      const sectionTop = window.scrollY + rect.top;
      const sectionCenter = sectionTop + rect.height / 2;

      // бесшовная формула (globally continuous)
      let offset: number;
      if (seamless) {
        const y = window.scrollY;
        offset = (y + viewportCenter - sectionCenter) * speed;
      } else {
        // локальная формула (как у тебя было, от центра вьюпорта)
        const elementCenter = rect.top + rect.height / 2;
        offset = (elementCenter - viewportCenter) * speed;
      }

      // лёгкая адаптация для маленьких экранов
      if (vh < 700) offset *= 0.6;

      setTransform(`translate3d(0, ${-offset}px, 0)`);
    };
  }, [visible, speed, seamless]);

  useParallaxBus(update);

  // overscan для blur, чтобы не светились края
  const top = blur > 0 ? "-15%" : "-10%";
  const height = blur > 0 ? "130%" : "120%";

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        minHeight,
        // полезно для изоляции слоёв и ускорения растеризации
        contain: "paint",
      }}
    >
      {/* задний слой — фон с параллаксом */}
      <div
        className="absolute left-0 right-0 z-0"
        style={{
          top,
          height,
          transform,
          willChange: "transform",
          backfaceVisibility: "hidden",
          perspective: "1000px",
          WebkitBackfaceVisibility: "hidden",
          filter: blur ? `blur(${blur}px)` : undefined,
          pointerEvents: "none",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", transform: "translateZ(0)" }}
          priority
        />
      </div>

      {/* передний слой — ваш контент */}
      {children && <div className="absolute inset-0 z-10">{children}</div>}
    </div>
  );
};

export default ParallaxBackground;
