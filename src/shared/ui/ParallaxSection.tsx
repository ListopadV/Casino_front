import Image, { StaticImageData } from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

/** ===== общий rAF-бас на всё приложение (1 цикл на все секции) ===== */
type Subscriber = () => void;
const subscribers = new Set<Subscriber>();
let rafId: number | null = null;

function pump() {
  if (rafId != null) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    subscribers.forEach((fn) => fn());
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("scroll", pump, { passive: true });
  window.addEventListener("resize", pump);
}

function useParallaxBus(cb: Subscriber) {
  useEffect(() => {
    subscribers.add(cb);
    cb(); // первый расчёт сразу
    return () => {
      subscribers.delete(cb);
    };
  }, [cb]);
}

export type ParallaxSectionProps = {
  /** Обязателен: фон секции */
  src: StaticImageData;
  alt?: string;
  /** Параллакс-скорость: 0 — как fixed; 0.15–0.35 — лёгкий параллакс; можно отрицательные */
  speed?: number;
  /** Blur в px */
  blur?: number;
  /** Затемнение поверх фона (например, "rgba(0,0,0,0.60)"). null/"" — без затемнения */
  overlay?: string | null;
  /** Минимальная высота секции */
  minHeight?: string | number;
  /** Классы корневой секции */
  className?: string;
  /** Классы контейнера для children */
  contentClassName?: string;
  children?: React.ReactNode;
  /**
   * НОВЫЙ ПРОП: Управляет отображением градиента внизу.   */
  withBottomFade?: boolean;
};

const ParallaxSection = React.forwardRef<HTMLElement, ParallaxSectionProps>(
  (
    {
      src,
      alt = "",
      speed = 0,
      blur = 0,
      overlay = "rgba(0,0,0,0.60)",
      minHeight = "20vh",
      className = "",
      contentClassName = "",
      // НОВЫЙ ПРОП:
      withBottomFade = false,
      children,
    },
    ref
  ) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);
    const [transform, setTransform] = useState<string>("translate3d(0,0,0)");
    const [noMotion, setNoMotion] = useState(false);

    function attachRef(node: HTMLElement | null) {
      rootRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref && "current" in ref) ref.current = node;
    }

    useEffect(() => {
      const el = rootRef.current;
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => setVisible(entry.isIntersecting),
        { root: null, threshold: 0, rootMargin: "200px 0px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }, []);

    useEffect(() => {
      if (typeof window === "undefined") return;
      setNoMotion(
        window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false
      );
    }, []);

    const update = useMemo(() => {
      return () => {
        const el = rootRef.current;
        if (!el || !visible) return;
        if (noMotion || speed === 0) {
          setTransform("translate3d(0,0,0)");
          return;
        }
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const viewportCenter = vh / 2;
        const elementCenter = rect.top + rect.height / 2;
        const offset = (elementCenter - viewportCenter) * speed;
        const k = vh < 700 ? 0.6 : 1;
        setTransform(`translate3d(0, ${-offset * k}px, 0)`);
      };
    }, [visible, speed, noMotion]);

    useParallaxBus(update);

    // ИЗМЕНЕНО: Значения overscan могут быть скорректированы для лучшего эффекта
    const overscanTop = speed !== 0 ? "-20%" : "0";
    const overscanHeight = speed !== 0 ? "140%" : "100%";


    return (
      <section
        ref={attachRef}
        className={`relative overflow-hidden ${className}`} // ИЗМЕНЕНО: Добавлен overflow-hidden
        style={{ minHeight, contain: "paint" }}
      >
        <div
          className="absolute inset-0 z-0 pointer-events-none" // ИЗМЕНЕНО: Убрана лишняя вложенность и sticky
          style={{
            transform,
            willChange: "transform",
            backfaceVisibility: "hidden",
          }}
        >
            <div
                className="absolute left-0 right-0" // ИЗМЕНЕНО: Этот блок теперь отвечает только за изображение
                style={{
                top: overscanTop,
                height: overscanHeight,
                filter: blur ? `blur(${blur}px)` : undefined,
                }}
            >
                <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                priority
                style={{ objectFit: "cover", transform: "translateZ(0)" }}
                />
            </div>
        </div>

        {/* ИЗМЕНЕНО: Слой затемнения вынесен наружу и позиционируется абсолютно */}
        {overlay ? (
            <div className="absolute inset-0 z-1 pointer-events-none" style={{ background: overlay }} />
        ) : null}


        {/*
          УСЛОВНЫЙ РЕНДЕР: Этот блок с градиентом теперь будет отображаться
          только если withBottomFade равен true.
        */}
        {withBottomFade && (
            <div
                className="absolute bottom-0 left-0 right-0 z-1" // ИЗМЕНЕНО: Убедитесь, что z-index корректен
                style={{
                    height: '30rem',
                    background: 'linear-gradient(to top, #080808 25%, transparent 90%)',
                    pointerEvents: 'none',
                }}
            />
        )}

        {/* Контент  */}
        <div
          className={`relative z-10 ${contentClassName}`} // ИЗМЕНЕНО: Убедитесь, что z-index контента выше overlay
        >
          {children}
        </div>
      </section>
    );
  }
);

ParallaxSection.displayName = "ParallaxSection";
export default ParallaxSection;