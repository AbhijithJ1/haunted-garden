import { useEffect } from 'react';
import Lenis from 'lenis';

declare global {
  interface Window {
    cinedreadLenis?: Lenis;
  }
}

export const useCinematicScroll = () => {
  useEffect(() => {
    // Award-winning smooth momentum scroll configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 4), // Smooth quartic ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.cinedreadLenis = lenis;

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.cinedreadLenis;
    };
  }, []);
};
