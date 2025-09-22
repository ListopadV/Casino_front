import linksBg from "@/assets/Footer-bg.png";
import ParallaxSection from "@/shared/ui/ParallaxSection";
import React, { useCallback, useEffect, useState } from "react";
import { LinksContent } from "./LinksContent";

type Props = { speed?: number; blur?: number; overlay?: string; minHeight?: string | number };

const LinkSection = React.forwardRef<HTMLElement, Props>(function LinkSection(
  { speed = 0.3, blur = 10, overlay = "rgba(185, 28, 28, 0.70)", minHeight = "500px" },
  ref
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [height, setHeight] = useState<string>('500px');

  const getHeight = useCallback(() => {
    const width = window.innerWidth;

    if (width < 640) {
      return "300px"; // Для экранов меньше чем 640px (мобильные устройства)
    } else if (width >= 640 && width < 768) {
      return "300px"; // Для экранов от 640px до 767px (маленькие планшеты)
    } else if (width >= 768 && width < 1024) {
      return "4000px"; // Для экранов от 768px до 1023px (планшеты)
    } else if (width >= 1024 && width < 1280) {
      return "500px"; // Для экранов от 1024px до 1279px (ноутбуки и большие планшеты)
    } else if (width >= 1280 && width < 1536) {
      return "500px"; // Для экранов от 1280px до 1535px (стандартные десктопы)
    } else {
      return "500px"; // Для экранов больше 1536px (большие десктопы)
    }
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      setHeight(getHeight());
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [getHeight]); 

  return (
    <ParallaxSection
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      src={linksBg}
      speed={speed}
      blur={blur}
      overlay={overlay}
      minHeight={minHeight}
      className="text-white"
    >
      <LinksContent />
    </ParallaxSection>
  );
});


export default LinkSection;
