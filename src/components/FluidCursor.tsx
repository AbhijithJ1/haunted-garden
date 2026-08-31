import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const FluidCursor: React.FC = () => {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 600, damping: 30 });
  const cursorY = useSpring(-100, { stiffness: 600, damping: 30 });
  const ringX = useSpring(-100, { stiffness: 220, damping: 24 });
  const ringY = useSpring(-100, { stiffness: 220, damping: 24 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setHasMoved(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest('[data-cursor-text], button, a');
      if (interactiveEl) {
        setIsHovered(true);
        const text = interactiveEl.getAttribute('data-cursor-text');
        setHoverText(text || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const handleMouseLeave = () => setHasMoved(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, ringX, ringY]);

  if (!hasMoved) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 64 : 40,
          height: isHovered ? 64 : 40,
        }}
        className={`fixed top-0 left-0 rounded-full border border-red-500/70 transition-all duration-200 mix-blend-exclusion flex items-center justify-center ${
          isHovered ? 'bg-white/95 border-transparent shadow-[0_0_24px_rgba(220,38,38,0.9)]' : 'bg-transparent'
        }`}
      >
        {hoverText && (
          <span className="font-mono text-[8px] font-bold text-black uppercase tracking-widest text-center px-1">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Inner Pin Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-red-500 mix-blend-exclusion transition-opacity duration-150 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  );
};
