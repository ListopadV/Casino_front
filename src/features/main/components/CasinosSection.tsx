'use client'

import casinosBg from "@/assets/online-casino-bg.png";
import ParallaxSection from "@/shared/ui/ParallaxSection";
import React from "react";
import { CasinosContent } from "./CasinosContent";

type Props = { speed?: number; blur?: number; overlay?: string };

export const CasinosSection = React.forwardRef<HTMLElement, Props>(function CasinosSection(
  { speed = 0.8, blur = 0, overlay = "rgba(0,0,0,0.55)" },
  ref
) {
  return (
    <ParallaxSection
      ref={ref}
      src={casinosBg}
      speed={speed}
      blur={blur}
      // ИЗМЕНЕНО: height заменен на minHeight
      minHeight={'500px'} 
      withBottomFade={false} 
      overlay={overlay}
      className="text-white"
      contentClassName="py-24 px-4 sm:px-6 lg:px-8"
    >
      <CasinosContent />
    </ParallaxSection>
  );
});