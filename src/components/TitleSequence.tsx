import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';

export const TitleSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  // Pinned camera sequence for Title + Blood Fall + Archive Opening
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  // Title recedes into deep darkness
  const titleY = useTransform(smoothProgress, [0, 0.45, 0.85], [0, -80, -320]);
  const titleScale = useTransform(smoothProgress, [0, 0.45, 0.85], [1, 0.94, 0.78]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.4, 0.75], [1, 0.85, 0]);

  // Blood Drop Formation & Fall (The physical key awakening the archive)
  const dropScaleY = useTransform(smoothProgress, [0, 0.18, 0.35], [0.1, 1.8, 1.0]);
  const dropScaleX = useTransform(smoothProgress, [0, 0.18, 0.35], [0.8, 0.5, 1.0]);
  const dropY = useTransform(smoothProgress, [0.15, 0.32, 0.75], [0, 90, 700]);
  const dropOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.7, 0.76], [0, 1, 1, 0]);

  // Phase 3: Liquid Impact Ripple + Revealing Archive Opening
  const rippleScale = useTransform(smoothProgress, [0.68, 0.95], [0.2, 5.2]);
  const rippleOpacity = useTransform(smoothProgress, [0.68, 0.76, 0.95], [0, 0.9, 0]);
  const archivePromptOpacity = useTransform(smoothProgress, [0.72, 0.88, 1], [0, 1, 0]);
  const archivePromptY = useTransform(smoothProgress, [0.72, 0.88, 1], [20, 0, -30]);

  // Subtle Mouse Parallax
  const mouseX = (mousePos.x - 0.5) * 14;
  const mouseY = (mousePos.y - 0.5) * 10;

  return (
    <div
      ref={containerRef}
      id="hero-portal"
      className="relative h-[220vh] w-full bg-[#020204] text-[#E8E6DF] select-none"
    >
      {/* Sticky Fullscreen Chamber */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 sm:px-12 py-16 perspective-[1200px] transform-gpu preserve-3d">
        
        {/* Ambient Dark Void & Celluloid Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,3,5,0.4)_0%,rgba(2,2,4,0.98)_80%)] pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

        {/* Top Archive Identity Label */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] text-white/30 tracking-editorial uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>A SPATIAL ARCHIVE OF HORROR CINEMA</span>
          </div>
          <span>EST. MMXXVI</span>
        </div>

        {/* ============================================================
            MONUMENTAL TITLE & CORE MEANING (FIRST 10 SECONDS)
            ============================================================ */}
        <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center w-full max-w-5xl preserve-3d">
          
          <motion.div
            style={{
              y: titleY,
              scale: titleScale,
              opacity: titleOpacity,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            className="relative will-change-transform flex flex-col items-center"
          >
            {/* Monumental CINEDREAD Display Title */}
            <div className="relative inline-block">
              <h1 className="font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] tracking-tight-title text-white leading-[0.82] uppercase drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                CINEDREAD
              </h1>

              {/* Viscous Blood Droplet forming from the letter 'R' */}
              <div className="absolute left-[54%] bottom-[-10px] pointer-events-none">
                <motion.div
                  style={{
                    y: dropY,
                    scaleY: dropScaleY,
                    scaleX: dropScaleX,
                    opacity: dropOpacity,
                  }}
                  className="w-3.5 h-5 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#8B111B] to-[#450A0A] shadow-[0_0_14px_rgba(220,38,38,0.8)] will-change-transform"
                />
              </div>
            </div>

            {/* Clear, Chilling Purpose Statement */}
            <div className="mt-8 space-y-3 max-w-xl">
              <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block font-bold">
                ENTER THE ARCHIVE OF FEAR
              </span>
              <p className="font-cinzel italic text-base sm:text-xl text-white/90 leading-relaxed">
                Six worlds. One continuous descent.
              </p>
              <p className="font-grotesk text-xs sm:text-sm text-white/50 font-light leading-relaxed">
                You are about to physically travel through the defining worlds and psychological fears of horror cinema.
              </p>
            </div>
          </motion.div>

          {/* Phase 3: Liquid Impact Ripple & Archive Unlocked Reveal */}
          <div className="absolute top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center">
            {/* Ripple Shockwave */}
            <motion.div
              style={{
                scale: rippleScale,
                opacity: rippleOpacity,
              }}
              className="w-32 h-32 rounded-full border border-red-600/80 shadow-[0_0_40px_rgba(220,38,38,0.5)] will-change-transform"
            />

            {/* Archive Awakened Prompt */}
            <motion.div
              style={{
                opacity: archivePromptOpacity,
                y: archivePromptY,
              }}
              className="absolute font-mono text-[10px] text-red-400 tracking-editorial uppercase text-center space-y-1"
            >
              <span className="block font-bold">ARCHIVE UNLOCKED</span>
              <span className="text-white/60 text-[9px]">CASE 01 / 06 AHEAD</span>
            </motion.div>
          </div>
        </div>

        {/* Minimal Scroll Action Prompt */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[9px] text-white/30 uppercase tracking-editorial">
          <div className="flex items-center gap-2">
            <ArrowDown className="w-3 h-3 text-red-500 animate-bounce" />
            <span>SCROLL FORWARD TO TRAVEL THROUGH THE ARCHIVE</span>
          </div>

          <span className="hidden sm:inline">DISCOVERY • INVESTIGATION • IMMERSION</span>
        </div>
      </div>
    </div>
  );
};
