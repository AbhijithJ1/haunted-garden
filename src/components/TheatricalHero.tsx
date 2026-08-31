import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { soundEngine } from '../audio/soundEngine';

export const TheatricalHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
  });

  // Typography 3D Depth
  const titleY = useTransform(smoothProgress, [0, 0.5, 1], [0, -40, -180]);
  const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.96, 0.85]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.6, 0.95], [1, 0.9, 0]);

  // Blood Drop Physics
  const dropScaleY = useTransform(smoothProgress, [0, 0.2, 0.4], [0.1, 2.0, 1.0]);
  const dropScaleX = useTransform(smoothProgress, [0, 0.2, 0.4], [0.8, 0.5, 1.0]);
  const dropY = useTransform(smoothProgress, [0.1, 0.4, 0.85], [0, 140, 720]);
  const dropOpacity = useTransform(smoothProgress, [0.05, 0.2, 0.75, 0.82], [0, 1, 1, 0]);

  // Liquid Ripple
  const rippleScale = useTransform(smoothProgress, [0.65, 0.98], [0.2, 6.0]);
  const rippleOpacity = useTransform(smoothProgress, [0.65, 0.78, 0.98], [0, 0.9, 0]);

  const mouseX = (mousePos.x - 0.5) * 14;
  const mouseY = (mousePos.y - 0.5) * 10;

  const scrollToFirstArchive = () => {
    const el = document.getElementById('work-wrapper');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[160vh] w-full bg-[#020204] text-[#E8E6DF] select-none"
    >
      {/* Sticky Fullscreen 3D Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 sm:px-12 pt-24 pb-10 perspective-[1200px] transform-gpu preserve-3d">
        
        {/* Living Atmospheric Backdrop with Ambient Video & Vignette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <iframe
            src="https://www.youtube-nocookie.com/embed/k10ETZ41q5o?autoplay=1&mute=1&controls=0&loop=1&playlist=k10ETZ41q5o&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            title="Ambient Backdrop"
            allow="autoplay; encrypted-media"
            className="w-full h-full object-cover scale-135 opacity-25 brightness-75 contrast-150 filter grayscale"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,3,5,0.4)_0%,rgba(2,2,4,0.98)_80%)]" />
          <div className="absolute inset-0 film-grain opacity-40" />
        </div>

        {/* WebTactics Center Label */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] text-white/40 tracking-editorial uppercase border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
            <span className="text-white/80 font-bold">CINEDREAD // SPATIAL ARCHIVE OF HORROR CINEMA</span>
          </div>
          <span className="text-white/40">EST. MMXXVI</span>
        </div>

        {/* Center Stage: Monumental Title + Blood Drop Key */}
        <motion.div
          style={{
            y: titleY,
            scale: titleScale,
            opacity: titleOpacity,
            transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
          }}
          className="relative z-20 my-auto flex flex-col items-center justify-center text-center max-w-5xl will-change-transform space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 font-mono text-[9px] text-red-400 uppercase tracking-widest backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>SIX ICONIC REALMS • ONE CONTINUOUS DESCENT</span>
          </div>

          {/* Monumental CINEDREAD Display */}
          <div className="relative inline-block">
            <h1 className="font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight text-white leading-[0.82] uppercase drop-shadow-[0_30px_70px_rgba(0,0,0,0.98)]">
              CINEDREAD
            </h1>

            {/* Viscous Blood Droplet forming from the letter 'R' */}
            <div className="absolute left-[54%] bottom-[-12px] pointer-events-none z-30">
              <motion.div
                style={{
                  y: dropY,
                  scaleY: dropScaleY,
                  scaleX: dropScaleX,
                  opacity: dropOpacity,
                }}
                className="w-3.5 h-6 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#DC2626] via-[#991B1B] to-[#450A0A] shadow-[0_0_18px_rgba(220,38,38,0.9)] will-change-transform"
              />
            </div>
          </div>

          <p className="font-cinzel italic text-base sm:text-2xl text-white/90 max-w-2xl leading-relaxed">
            "Some films do not end when the screen turns black. The image itself is the contagion."
          </p>
        </motion.div>

        {/* Phase 3: Liquid Impact Shockwave */}
        <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
          <motion.div
            style={{
              scale: rippleScale,
              opacity: rippleOpacity,
            }}
            className="w-32 h-32 rounded-full border border-red-600/80 shadow-[0_0_50px_rgba(220,38,38,0.6)] will-change-transform"
          />
        </div>

        {/* WebTactics 2-Column Hero Bottom Bar */}
        <div className="relative z-30 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-end gap-6 border-t border-white/[0.08] pt-4">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold">
              DIRECTORIAL DOSSIER // 01 — 06
            </span>
            <p className="font-grotesk text-xs sm:text-sm text-white/60 font-light max-w-md leading-relaxed">
              An interactive 3D spatial archive exploring the architectural fear mechanisms of cinema's most terrifying masterworks.
            </p>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6">
            <button
              onClick={scrollToFirstArchive}
              className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-white text-[#020204] hover:bg-red-600 hover:text-white px-7 py-3 font-mono text-[10px] tracking-editorial uppercase transition-all duration-300 shadow-2xl flex items-center gap-2.5 font-bold"
            >
              <span>EXPLORE HORROR REALMS</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </button>

            <div className="flex items-center gap-3 text-white/40 font-mono text-[9px] tracking-widest uppercase">
              <div className="w-8 h-[1px] bg-red-600" />
              <span>SCROLL TO TRAVEL</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
