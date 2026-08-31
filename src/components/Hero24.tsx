import React from 'react';
import { motion } from 'motion/react';
import { Play, ArrowDown, Film, Sparkles } from 'lucide-react';
import { UniverseInfo } from '../types';
import { NeuroNoiseCanvas } from './NeuroNoiseCanvas';
import { useMousePosition } from '../hooks/useMousePosition';
import { BentoTilt } from './BentoTilt';

interface Hero24Props {
  universes: UniverseInfo[];
  currentUniverse: UniverseInfo;
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const Hero24: React.FC<Hero24Props> = ({
  universes,
  currentUniverse,
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const mousePos = useMousePosition();

  // Subtle Parallax Offsets
  const mouseX = (mousePos.x - 0.5) * 16;
  const mouseY = (mousePos.y - 0.5) * 12;

  const scrollToNext = () => {
    const el = document.getElementById('scroll-mask-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Kinetic Text Stagger Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="hero-portal"
      className="relative min-h-screen w-full bg-[#020204] text-[#E5E4DE] flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-6 sm:px-12 lg:px-16 overflow-hidden select-none border-b border-white/[0.06]"
    >
      {/* 1. Theme-Aware NeuroNoise Background */}
      <NeuroNoiseCanvas intensity={0.7} />

      {/* Subtle Atmospheric Backdrop Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 filter grayscale contrast-150 transition-all duration-700 pointer-events-none scale-105"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${currentUniverse.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,2,6,0.4)_0%,rgba(2,2,4,0.96)_75%)] pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

      {/* 2. Top Status Badge */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 font-mono text-[9px] tracking-widest uppercase shadow-[0_0_20px_rgba(220,38,38,0.25)] backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
          <span>FORBIDDEN REELS ARCHIVE // SECTOR 00 LIVE</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 font-mono text-[10px] text-white/40 tracking-editorial uppercase">
          <span>6 FORBIDDEN REALMS</span>
          <span>•</span>
          <span>MMXXVI</span>
        </div>
      </div>

      {/* 3. Main Stage: Left-Aligned Editorial Story + Right 3D Cinema Portal */}
      <div className="relative z-20 my-auto max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center py-6">
        
        {/* Left-Aligned Headline & Narrative */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ transform: `translate3d(${mouseX}px, ${mouseY}px, 0)` }}
          className="lg:col-span-7 flex flex-col text-left space-y-6 will-change-transform"
        >
          <motion.div variants={wordVariants} className="flex items-center gap-3">
            <span className="w-8 h-px bg-red-600" />
            <span className="font-mono text-[10px] text-red-500 uppercase tracking-cinematic">
              THE IMMERSIVE HORROR ARCHIVE
            </span>
          </motion.div>

          <motion.h1
            variants={wordVariants}
            className="font-cinzel font-black text-6xl sm:text-7xl md:text-8xl lg:text-[6.8rem] text-white tracking-tight leading-[0.88] uppercase drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          >
            CINEDREAD
          </motion.h1>

          <motion.p
            variants={wordVariants}
            className="font-cinzel italic text-base sm:text-xl text-white/90 max-w-xl leading-relaxed border-l-2 border-red-600/60 pl-4 py-1"
          >
            "Some films don't end when the screen goes black. The image itself is the contagion."
          </motion.p>

          <motion.p
            variants={wordVariants}
            className="font-grotesk text-xs sm:text-sm text-white/60 font-light max-w-lg leading-relaxed"
          >
            Descend into six curated realms of psychological dread. Touch the embalmed threshold, unseal the Warren artifacts, and pass directly through the celluloid portal.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={wordVariants} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToNext}
              className="px-8 py-4 bg-white text-[#020204] hover:bg-red-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer shadow-[0_15px_40px_rgba(255,255,255,0.15)] flex items-center gap-3 rounded-sm font-bold group"
            >
              <span>EXPLORE ARCHIVE</span>
              <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => onOpenTrailer(currentUniverse)}
              className="px-6 py-4 bg-black/70 hover:bg-white/10 text-white/80 hover:text-white border border-white/20 hover:border-white/40 font-mono text-[11px] tracking-editorial uppercase transition-all rounded-sm cursor-pointer flex items-center gap-2 backdrop-blur-md"
            >
              <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
              <span>WATCH REEL #{currentUniverse.index}</span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right-Aligned 3D Cinema Portal */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
          <BentoTilt tiltFactor={10} className="w-full max-w-[460px]">
            <div
              onClick={() => onOpenTrailer(currentUniverse)}
              className="group relative w-full aspect-video rounded-2xl bg-[#07070a] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer hover:border-red-500/50 transition-all duration-500"
            >
              {/* High-res Looping Media */}
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentUniverse.trailerYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentUniverse.trailerYoutubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
                title={currentUniverse.trailerTitle}
                allow="autoplay; encrypted-media"
                className="w-full h-full object-cover pointer-events-none scale-120 brightness-90 contrast-115 transition-transform duration-700 group-hover:scale-130"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
              <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

              {/* Portal Metadata Overlay */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 pointer-events-none">
                <div className="flex items-center justify-between font-mono text-[9px] text-white/90 uppercase tracking-widest">
                  <span className="px-2.5 py-1 rounded-sm bg-black/80 border border-white/15">
                    REEL {currentUniverse.index}
                  </span>
                  <span className="px-2 py-0.5 rounded-sm bg-red-950/80 border border-red-500/30 text-red-300">
                    {currentUniverse.year}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <span className="font-cinzel font-bold text-sm sm:text-base text-white uppercase truncate block">
                      {currentUniverse.title}
                    </span>
                    <span className="font-mono text-[9px] text-white/60 uppercase tracking-editorial">
                      {currentUniverse.director}
                    </span>
                  </div>

                  <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-2xl">
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </BentoTilt>

          {/* Reel Switcher Buttons */}
          <div className="mt-5 flex flex-wrap justify-end gap-1.5 font-mono text-[10px]">
            {universes.map((u) => {
              const isActive = currentUniverse.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => onSelectUniverse(u.id)}
                  className={`px-3 py-1.5 rounded-sm border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.25)]'
                      : 'bg-black/70 text-white/60 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-red-600' : 'bg-white/30'}`} />
                  <span>{u.index} {u.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Bottom Studio Credentials Row */}
      <div className="relative z-20 max-w-7xl mx-auto w-full pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-white/40 uppercase tracking-editorial">
        <span>CINEMATIC ARCHIVES CURATED:</span>
        
        <div className="flex flex-wrap items-center gap-6 text-white/50 font-cinzel text-xs font-bold tracking-widest">
          <span className="hover:text-white transition-colors cursor-default">WARNER BROS.</span>
          <span className="text-white/20">•</span>
          <span className="hover:text-white transition-colors text-red-400 cursor-default">A24</span>
          <span className="text-white/20">•</span>
          <span className="hover:text-white transition-colors cursor-default">SONY PICTURES</span>
          <span className="text-white/20">•</span>
          <span className="hover:text-white transition-colors cursor-default">MGM+</span>
          <span className="text-white/20">•</span>
          <span className="hover:text-white transition-colors cursor-default">BLUMHOUSE</span>
        </div>

        <div className="flex items-center gap-2 text-white/50">
          <ArrowDown className="w-3.5 h-3.5 text-red-500 animate-bounce" />
          <span>SCROLL TO UNSEAL MASK</span>
        </div>
      </div>
    </section>
  );
};
