"use client";

import { useEffect, useState, useRef, useCallback } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
  threshold?: number;
}

interface ParallaxReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  transform: string;
  isVisible: boolean;
}

/**
 * Cross-browser compatible parallax hook that works on all devices including Mac/Safari
 * Replaces problematic bg-fixed with smooth transform-based parallax
 */
export const useParallax = (options: ParallaxOptions = {}): ParallaxReturn => {
  const {
    speed = 0.5,
    direction = 'up',
    disabled = false,
    threshold = 0.1
  } = options;

  const [transform, setTransform] = useState('translateY(0px)');
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | undefined>(undefined);

  // Detect if device has issues with fixed backgrounds (iOS/Safari)
  const [isMacOrIOS, setIsMacOrIOS] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMac = /macintosh|mac os x/i.test(userAgent);
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    const isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent);
    
    setIsMacOrIOS(isMac || isIOS || isSafari);
  }, []);

  // Intersection Observer for visibility
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold]);

  // Smooth scroll handler with RAF
  const handleScroll = useCallback(() => {
    if (disabled || !ref.current || !isVisible) return;

    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate if element is in viewport
    const isInViewport = elementTop < windowHeight && elementTop + elementHeight > 0;
    
    if (!isInViewport) return;

    // Calculate parallax offset
    const scrolled = window.pageYOffset;
    const rate = scrolled * speed;
    const yPos = direction === 'up' ? -rate : rate;

    setTransform(`translateY(${yPos}px)`);
  }, [disabled, isVisible, speed, direction]);

  // Throttled scroll listener using RAF
  const onScroll = useCallback(() => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    rafId.current = requestAnimationFrame(handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (disabled) return;

    // Initial calculation
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [disabled, onScroll, handleScroll]);

  return {
    ref,
    transform: disabled ? 'translateY(0px)' : transform,
    isVisible
  };
};

/**
 * Hook for smooth scrolling behavior across all browsers
 */
export const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset: number = 0) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    // Use native smooth scroll if supported, fallback to manual implementation
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Manual smooth scroll for older browsers
      const startPosition = window.pageYOffset;
      const distance = offsetPosition - startPosition;
      const duration = 1000;
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function
        const ease = percentage < 0.5 
          ? 2 * percentage * percentage 
          : 1 - Math.pow(-2 * percentage + 2, 2) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    }
  }, []);

  return { scrollToElement };
};

/**
 * Hook for detecting scroll direction and position
 */
export const useScrollInfo = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollDirection(currentScrollY > lastScrollY.current ? 'down' : 'up');
      setScrollY(currentScrollY);
      setIsScrolling(true);
      
      lastScrollY.current = currentScrollY;

      // Clear existing timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set scrolling to false after scroll ends
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return {
    scrollY,
    scrollDirection,
    isScrolling
  };
};
