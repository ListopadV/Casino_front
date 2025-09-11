"use client";

import ParallaxSection from '@/shared/ui/ParallaxSection';
import React, { useEffect, useRef, useState } from 'react';
import { HeroContent } from './HeroContent';

import heroBg from '@/assets/hero-background.jpg';

type Props = { topOffset?: number; speed?: number; blur?: number; overlay?: string };

const HeroSection = React.forwardRef<HTMLElement, Props>(function HeroSection(
  { speed = 0.3, blur = 0, overlay = "rgba(0,0,0,0.55)" },
  ref
) {
  const [visible, setVisible] = useState(false);
  const localRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = localRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <ParallaxSection
      ref={(node) => {
        localRef.current = node as any;
        if (typeof ref === "function") ref(node as any);
        else if (ref && "current" in (ref as any)) (ref as any).current = node;
      }}
      src={heroBg}
      speed={speed}
      blur={blur}
      overlay={overlay}
      minHeight={'20vh'}
      className="text-white"
    >
      <HeroContent isVisible={visible} />
    </ParallaxSection>
  );
});

export default HeroSection;
