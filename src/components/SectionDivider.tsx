import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

interface SectionDividerProps {
  label?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-8 select-none">
      <div className="relative flex items-center justify-between">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 h-px bg-white/[0.08] origin-left"
        />
        {label && (
          <span className="font-mono text-[9px] text-white/30 tracking-cinematic uppercase px-4 whitespace-nowrap">
            {label}
          </span>
        )}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 h-px bg-white/[0.08] origin-right"
        />
      </div>
    </div>
  );
};
