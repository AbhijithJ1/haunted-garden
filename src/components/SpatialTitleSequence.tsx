import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { DecryptedText } from './DecryptedText';

interface SpatialTitleSequenceProps {
  onEnterArchive?: () => void;
}

export const SpatialTitleSequence: React.FC<SpatialTitleSequenceProps> = ({ onEnterArchive }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Physical Blood Drop Fall Physics
  const dropY = useTransform(scrollYProgress, [0, 0.45, 0.7], [0, 260, 600]);
  const dropOpacity = useTransform(scrollYProgress, [0, 0.05, 0.6, 0.75], [0, 1, 1, 0]);
  const dropScale = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.6, 1.2, 0.8]);

  // Downward Void Camera Ingestion
  const titleScale = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.92, 0.8]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6, 0.85], [1, 0.8, 0]);
  const shockwaveScale = useTransform(scrollYProgress, [0.55, 0.85], [0, 4]);
  const shockwaveOpacity = useTransform(scrollYProgress, [0.55, 0.65, 0.85], [0, 0.6, 0]);

  return (
    <section
      ref={containerRef}
      id="hero-title-sequence"
      className="relative min-h-[140vh] w-full bg-black text-white select-none overflow-hidden"
    >
      {/* Sticky 100vh Hero Stage */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 overflow-hidden">
        
        {/* Subtle Spatial Horizon Line */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,4,6,0.5)_0%,rgba(0,0,0,1)_75%)] pointer-events-none" />

        {/* Minimal Subtitle Tag */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="relative z-20 font-mono text-[10px] text-red-500 tracking-[0.45em] uppercase text-center mb-8 font-bold"
        >
          <DecryptedText
            text="A 12-WORLD CINEMATIC HORROR SHOWCASE"
            speed={30}
            maxIterations={12}
            animateOn="both"
          />
        </motion.div>

        {/* Monumental CINEDREAD Stage with Falling Blood Droplet */}
        <motion.div
          style={{ scale: titleScale, opacity: titleOpacity }}
          className="relative z-20 flex flex-col items-center justify-center text-center max-w-6xl space-y-6 will-change-transform transform-gpu"
        >
          <h1 className="relative font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight leading-[0.82] uppercase text-white">
            <span>CINEDR</span>
            <span className="relative inline-block text-red-600">
              E
              {/* The Physical Blood Droplet */}
              <motion.span
                style={{
                  y: dropY,
                  opacity: dropOpacity,
                  scale: dropScale,
                }}
                className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-3 h-4 bg-red-600 rounded-full shadow-[0_0_12px_rgba(220,38,38,0.8)] pointer-events-none will-change-transform transform-gpu"
              />
            </span>
            <span>AD</span>
          </h1>

          <p className="font-cinzel italic text-base sm:text-2xl text-white/80 max-w-2xl leading-relaxed pt-4">
            "Some films do not end when the screen turns black. The image itself is the contagion."
          </p>
        </motion.div>

        {/* Optical Portal Shockwave on Droplet Impact */}
        <motion.div
          style={{
            scale: shockwaveScale,
            opacity: shockwaveOpacity,
          }}
          className="absolute z-10 w-64 h-64 rounded-full border border-red-600/60 pointer-events-none will-change-transform transform-gpu"
        />

        {/* Scroll down prompt */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute bottom-10 z-20 flex flex-col items-center gap-2 font-mono text-[9px] text-white/40 tracking-[0.3em] uppercase"
        >
          <span>SCROLL TO ENTER THE SHOWCASE</span>
          <span className="w-1 h-3 bg-red-600/80 rounded-full animate-bounce" />
        </motion.div>

      </div>
    </section>
  );
};
