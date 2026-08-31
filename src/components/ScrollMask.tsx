import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Play } from 'lucide-react';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';

export type MaskMode = 'circle' | 'horizontal' | 'vertical' | 'diagonal' | 'diamond' | 'hexagonal';

interface ScrollMaskProps {
  onOpenTrailer?: (universe: UniverseInfo) => void;
}

export const ScrollMask: React.FC<ScrollMaskProps> = ({ onOpenTrailer }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<MaskMode>('circle');
  const [activeReelIndex, setActiveReelIndex] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    restDelta: 0.001,
  });

  // Calculate mask clip-paths based on scroll progress (0% -> 100%)
  const circleProgress = useTransform(smoothProgress, [0.05, 0.75], [14, 100]);
  const horizontalProgress = useTransform(smoothProgress, [0.05, 0.75], [42, 0]);
  const verticalProgress = useTransform(smoothProgress, [0.05, 0.75], [42, 0]);
  const diagonalProgress = useTransform(smoothProgress, [0.05, 0.75], [42, 0]);
  const diamondProgress = useTransform(smoothProgress, [0.05, 0.75], [32, 0]);
  const hexProgress = useTransform(smoothProgress, [0.05, 0.75], [32, 0]);

  // Image scale & text reveal
  const imageScale = useTransform(smoothProgress, [0, 0.8], [1.2, 1.0]);
  const textY = useTransform(smoothProgress, [0.1, 0.45], [30, 0]);
  const textOpacity = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);

  const currentReel = UNIVERSES_DATA[activeReelIndex] || UNIVERSES_DATA[0];

  const maskModes: { id: MaskMode; label: string }[] = [
    { id: 'circle', label: 'RADIAL IRIS' },
    { id: 'horizontal', label: 'HORIZONTAL' },
    { id: 'vertical', label: 'VERTICAL' },
    { id: 'diagonal', label: 'DIAGONAL' },
    { id: 'diamond', label: 'RHOMBUS' },
    { id: 'hexagonal', label: 'HEXAGONAL' },
  ];

  return (
    <section
      ref={containerRef}
      id="scroll-mask-section"
      className="relative h-[140vh] w-full bg-[#030305] text-white border-t border-white/[0.06]"
    >
      {/* Sticky Fullscreen Mask Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between px-6 sm:px-12 py-12">
        
        {/* Top Control Bar: Mode Selector */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
          <div>
            <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest block mb-1">
              01 // THE APERTURE MASK
            </span>
            <h3 className="font-cinzel font-bold text-xl sm:text-2xl text-white uppercase tracking-tight">
              CELLULOID REVEAL
            </h3>
          </div>

          {/* Mask Mode Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px]">
            {maskModes.map((mode) => {
              const isSelected = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setActiveMode(mode.id)}
                  className={`px-3 py-1 rounded-sm border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black font-bold border-white shadow-md'
                      : 'bg-black/60 text-white/50 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* The Masked Cinema Portal Stage */}
        <div className="relative z-10 my-auto max-w-6xl mx-auto w-full h-[52vh] sm:h-[58vh] rounded-2xl overflow-hidden bg-black border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
          
          {/* Base Background Texture */}
          <div className="absolute inset-0 bg-[#07070a] flex items-center justify-center pointer-events-none">
            <span className="font-cinzel text-5xl sm:text-8xl font-black text-white/[0.03] uppercase tracking-widest select-none">
              CINEDREAD
            </span>
          </div>

          {/* Dynamic Mask Container */}
          <motion.div
            style={{
              clipPath:
                activeMode === 'circle'
                  ? useTransform(circleProgress, (v) => `circle(${v}% at 50% 50%)`)
                  : activeMode === 'horizontal'
                  ? useTransform(horizontalProgress, (v) => `inset(${v}% 0% ${v}% 0% round 12px)`)
                  : activeMode === 'vertical'
                  ? useTransform(verticalProgress, (v) => `inset(0% ${v}% 0% ${v}% round 12px)`)
                  : activeMode === 'diagonal'
                  ? useTransform(diagonalProgress, (v) => `polygon(${v}% 0%, 100% 0%, ${100 - v}% 100%, 0% 100%)`)
                  : activeMode === 'diamond'
                  ? useTransform(diamondProgress, (v) => `polygon(50% ${v}%, ${100 - v}% 50%, 50% ${100 - v}%, ${v}% 50%)`)
                  : useTransform(hexProgress, (v) => `polygon(50% ${v}%, ${100 - v}% 25%, ${100 - v}% 75%, 50% ${100 - v}%, ${v}% 75%, ${v}% 25%)`),
            }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Imagery Revealed by Scroll */}
            <motion.div
              style={{ scale: imageScale }}
              className="relative w-full h-full"
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentReel.trailerYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentReel.trailerYoutubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
                title={currentReel.trailerTitle}
                allow="autoplay; encrypted-media"
                className="w-full h-full object-cover pointer-events-none scale-110 brightness-95 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

              {/* Reveal Info & Controls */}
              <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 z-20"
              >
                <div>
                  <span className="font-mono text-[9px] text-red-400 uppercase tracking-widest block mb-1">
                    REEL #{currentReel.index} • {currentReel.year} • {currentReel.director}
                  </span>
                  <h4 className="font-cinzel font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    {currentReel.title}
                  </h4>
                  <p className="font-cinzel italic text-xs text-white/80 mt-1 max-w-md">
                    "{currentReel.tagline}"
                  </p>
                </div>

                {onOpenTrailer && (
                  <button
                    onClick={() => onOpenTrailer(currentReel)}
                    className="px-5 py-2.5 bg-white text-black hover:bg-red-600 hover:text-white font-mono text-[10px] tracking-editorial uppercase transition-all duration-300 rounded-sm cursor-pointer shadow-xl flex items-center gap-2"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>PLAY THEATRICAL CUT</span>
                  </button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Film Switcher */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[10px] text-white/40 uppercase tracking-editorial">
          <div className="flex items-center gap-3">
            <span>SWITCH REEL:</span>
            {UNIVERSES_DATA.map((u, idx) => (
              <button
                key={u.id}
                onClick={() => setActiveReelIndex(idx)}
                className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                  activeReelIndex === idx
                    ? 'bg-red-600 text-white font-bold border-red-500'
                    : 'bg-black/60 text-white/50 border-white/20 hover:text-white hover:border-white/40'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <span className="hidden sm:inline">SCROLL DOWN TO REVEAL FULL FRAME</span>
        </div>
      </div>
    </section>
  );
};
