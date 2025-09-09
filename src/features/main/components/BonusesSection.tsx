import bonusesBg from "@/assets/bonuses-background.jpg";
import ParallaxSection from "@/shared/ui/ParallaxSection";
import React, { useCallback, useEffect, useState } from "react";
import { BonusesContent } from "./BonusesContent";
import { useWindowSize } from "@/shared/hooks/useWindowSize";

type Props = { speed?: number; blur?: number, overlay?: string};

const BonusesSection = React.forwardRef<HTMLElement, Props>(function BonusesSection(
  { speed = 0.5, blur = 6, overlay = "rgba(0,0,0,0.30)" },
  ref
) {
    // Изменено: теперь это minHeight, чтобы блок мог расширяться.
    // Важно: ParallaxSection должен применять это как CSS-свойство min-height.
    const [minHeight, setMinHeight] = useState<string>("100vh"); 
    const { width } = useWindowSize();

  const getMinHeight = useCallback(() => { // Изменено название функции
    if (width < 640) {
      return "1500px"; // Для экранов меньше чем 640px
    } else if (width >= 640 && width < 768) {
      return "900px"; // Для экранов от 640px до 767px
    } else if (width >= 768 && width < 1024) {
      return "1000px"; // Для экранов от 768px до 1023px
    } else if (width >= 1024 && width < 1280) {
      return "600px"; // Для экранов от 1024px до 1279px
    } else if (width >= 1280 && width < 1536) {
      return "700px"; // Для экранов от 1280px до 1535px
    } else {
      return "750px"; // Для экранов больше 1536px
    }
  }, [width]); // Добавил width в зависимости useCallback, чтобы пересчет происходил при изменении ширины

  useEffect(() => {
    const updateMinHeight = () => { // Изменено название функции
      setMinHeight(getMinHeight());
    };
    updateMinHeight();
    window.addEventListener("resize", updateMinHeight);
    return () => window.removeEventListener("resize", updateMinHeight);
  }, [getMinHeight]);

  return (
    <ParallaxSection
      ref={ref as any}
      src={bonusesBg}
      speed={speed}
      blur={blur}
      overlay={overlay}
      // Новый пропс для затемнения нижней части страницы.
      withBottomFade={false} 
      minHeight={minHeight} 
      className="text-white"
    >
      <BonusesContent />
    </ParallaxSection>
  );
});

export default BonusesSection;