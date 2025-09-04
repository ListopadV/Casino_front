import { useEffect, useState } from "react";

/**
 * Активна секция, попавшая в центральную «полосу» вьюпорта.
 * refs — массив рефов секций в порядке расположения.
 */
export function useActiveSection(refs: React.RefObject<HTMLElement>[]) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const targets = refs.map((r) => r.current).filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const elToIndex = new Map<HTMLElement, number>();
    targets.forEach((el, idx) => elToIndex.set(el, idx));

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = elToIndex.get(entry.target as HTMLElement);
            if (typeof idx === "number") setActive(idx);
          }
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px", // центральная полоса
        threshold: 0,
      }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [refs]);

  return active;
}
