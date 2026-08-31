import React, { useEffect, useState } from 'react';

export const AnamorphicLetterbox: React.FC = () => {
  const [isScrollingFast, setIsScrollingFast] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeoutId: number | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const speed = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (speed > 25) {
        setIsScrollingFast(true);
        if (timeoutId) window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => setIsScrollingFast(false), 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9990]">
      {/* Top Bar */}
      <div
        className={`fixed top-0 left-0 right-0 bg-black transition-all duration-500 ease-out border-b border-white/[0.04] ${
          isScrollingFast ? 'h-5 sm:h-7' : 'h-0'
        }`}
      />
      {/* Bottom Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black transition-all duration-500 ease-out border-t border-white/[0.04] ${
          isScrollingFast ? 'h-5 sm:h-7' : 'h-0'
        }`}
      />
    </div>
  );
};
