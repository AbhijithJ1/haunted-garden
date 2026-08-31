import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ArrowDown, Play } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';
import { UNIVERSES_DATA } from '../data/universes';

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  // Responsive 140vh pinned scroll spatial descent
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Spatial word flight across Z-depth planes
  const line1_Z = useTransform(smoothProgress, [0, 0.5, 0.9], [40, 180, 420]);
  const line1_Y = useTransform(smoothProgress, [0, 0.5, 0.9], [0, -40, -120]);
  const line1_Opacity = useTransform(smoothProgress, [0, 0.5, 0.8], [1, 0.85, 0]);

  const line2_Z = useTransform(smoothProgress, [0, 0.5, 0.9], [-20, 80, 260]);
  const line2_Opacity = useTransform(smoothProgress, [0.1, 0.6, 0.85], [1, 0.9, 0]);

  // Framed Aperture Window expands from small box into full environment
  const apertureScale = useTransform(smoothProgress, [0.15, 0.6, 1], [0.75, 1.05, 1.3]);
  const apertureZ = useTransform(smoothProgress, [0.15, 0.6, 1], [-80, 40, 200]);

  const pX = (mousePos.x - 0.5) * 14;
  const pY = (mousePos.y - 0.5) * 10;

  const scrollToArchive = () => {
    const el = document.getElementById('archive-corridor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const conjuring = UNIVERSES_DATA[0];

  return (
    <div
      ref={containerRef}
      id="manifesto"
      className="relative h-[140vh] w-full bg-[#030305] text-[#E8E6DF] select-none border-t border-white/[0.06]"
    >
      {/* Sticky Pinned Descent Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 sm:px-12 py-12 perspective-[1200px] transform-gpu preserve-3d">
        
        {/* Top Minimal Stamp */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[10px] text-white/40 uppercase tracking-widest border-b border-white/[0.06] pb-3">
          <span className="text-red-500 font-bold">00 // THE DESCENT</span>
          <span>THE CELLULOID MANIFESTO</span>
        </div>

        {/* Center Spatial Stage: Text on Planes + Expanding Aperture */}
        <div className="relative z-20 my-auto max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center preserve-3d">
          
          {/* Plane 1: Foreground Inscription */}
          <motion.h2
            style={{
              z: line1_Z,
              y: line1_Y,
              opacity: line1_Opacity,
              transform: `translate3d(${pX * 1.3}px, ${pY * 1.3}px, 0)`,
            }}
            className="font-cinzel text-3xl sm:text-5xl md:text-6xl text-white font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] will-change-transform max-w-4xl"
          >
            Real dread is not what leaps from the shadows.
          </motion.h2>

          {/* Plane 0: The Central Expanding Aperture Window */}
          <motion.div
            style={{
              scale: apertureScale,
              z: apertureZ,
              transform: `translate3d(${pX}px, ${pY}px, 0)`,
            }}
            className="relative w-full max-w-[540px] aspect-video bg-[#07070a] border border-white/20 rounded-xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] my-3 will-change-transform"
          >
            <div
              className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-90 scale-110"
              style={{
                backgroundImage: `url('https://img.youtube.com/vi/${conjuring.trailerYoutubeId}/maxresdefault.jpg')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

            <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
              <span>RHODE ISLAND FARMHOUSE // ARCHIVE MMXXVI</span>
              <span>1971</span>
            </div>
          </motion.div>

          {/* Plane 2: Deep Kinetic Text Inscription */}
          <motion.p
            style={{
              z: line2_Z,
              opacity: line2_Opacity,
              transform: `translate3d(${pX * 0.7}px, ${pY * 0.7}px, 0)`,
            }}
            className="font-cinzel italic text-base sm:text-2xl text-white/80 max-w-2xl mt-4 tracking-wide drop-shadow-lg"
          >
            "It is the realization that the shadows were waiting for you all along."
          </motion.p>
        </div>

        {/* Bottom Editorial Callout */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[10px] text-white/40 uppercase tracking-editorial">
          <span className="font-cinzel italic text-white/50 lowercase">
            "cinema provides a frame; dread destroys the sanctuary."
          </span>

          <button
            onClick={scrollToArchive}
            className="text-red-400 hover:text-white uppercase tracking-editorial flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>ENTER THE ARCHIVE CORRIDOR</span>
            <ArrowDown className="w-3.5 h-3.5 text-red-500 animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
};
