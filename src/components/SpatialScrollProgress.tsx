import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const SpatialScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const chapters = [1, 2, 3, 4, 5, 6];
      for (let i = chapters.length; i >= 1; i--) {
        const el = document.getElementById(`spatial-chapter-0${i}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveChapter(i);
            return;
          }
        }
      }
      setActiveChapter(0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToChapter = (chapterIdx: number) => {
    const el = document.getElementById(`spatial-chapter-0${chapterIdx}`);
    if (el) {
      if (window.cinedreadLenis) {
        window.cinedreadLenis.scrollTo(el, { duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-6 select-none pointer-events-auto">
      {/* Chapter Pips */}
      <div className="flex flex-col items-center gap-3">
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const isActive = activeChapter === num;
          return (
            <button
              key={num}
              onClick={() => scrollToChapter(num)}
              data-cursor-text={`0${num}`}
              className="group relative flex items-center justify-center p-1 cursor-pointer transition-all duration-300"
            >
              {/* Active Indicator Tooltip */}
              <span
                className={`absolute right-6 font-mono text-[8px] tracking-widest uppercase transition-all duration-300 ${
                  isActive ? 'opacity-100 text-red-500 translate-x-0 font-bold' : 'opacity-0 translate-x-2 pointer-events-none'
                }`}
              >
                0{num}
              </span>

              {/* Pip Dot */}
              <div
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive
                    ? 'bg-red-600 scale-125 shadow-[0_0_12px_rgba(220,38,38,1)]'
                    : 'bg-white/20 hover:bg-white/60 hover:scale-110'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Vertical Track Line */}
      <div className="relative w-[2px] h-36 bg-white/[0.08] rounded-full overflow-hidden">
        <motion.div
          style={{ scaleY, transformOrigin: 'top' }}
          className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-red-500 to-red-700 shadow-[0_0_8px_rgba(220,38,38,0.8)]"
        />
      </div>
    </div>
  );
};
