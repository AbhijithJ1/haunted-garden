import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowDown, Film, Sparkles } from 'lucide-react';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';

interface HeroPortalProps {
  universes: UniverseInfo[];
  currentUniverse: UniverseInfo;
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const HeroPortal: React.FC<HeroPortalProps> = ({
  universes,
  currentUniverse,
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [transformStyle, setTransformStyle] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  // 3D Spatial Tilt following mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * -16;
    const tiltY = (relativeX - 0.5) * 16;

    setTransformStyle(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-portal"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#030305] text-[#E5E4DE] px-6 sm:px-12 pt-28 pb-10 select-none"
    >
      {/* 01 — DYNAMIC MOUSE-RESPONSIVE LIGHTING (Atelier Veil & Zentry Technique) */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out"
        style={{
          background: `
            radial-gradient(ellipse 900px 700px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(185, 28, 28, 0.12), transparent 60%),
            radial-gradient(ellipse 600px 500px at ${mousePos.x * 70% + 15}% ${mousePos.y * 70% + 15}%, rgba(220, 38, 38, 0.06), transparent 50%)
          `,
        }}
      />

      {/* 02 — FULL-BLEED CINEMATIC FILM BACKDROP */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUniverse.id}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.28, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-90"
            style={{
              backgroundImage: `url('https://img.youtube.com/vi/${currentUniverse.trailerYoutubeId}/maxresdefault.jpg')`,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,3,5,0.4)_0%,rgba(3,3,5,0.96)_75%)]" />
        <div className="absolute inset-0 film-grain opacity-40" />
      </div>

      {/* 03 — TOP EDITORIAL STAMP */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[10px] tracking-editorial text-white/40 uppercase"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <span>CURATED HORROR ARCHIVE</span>
        </div>
        <span className="hidden sm:inline">SIX ICONIC CINEMATIC REALMS</span>
        <span>MMXXVI</span>
      </motion.div>

      {/* 04 — CENTRAL HERO STAGE: KINETIC DISPLAY TITLE + ZENTRY 3D VIDEO PORTAL */}
      <div className="relative z-20 max-w-6xl mx-auto w-full my-auto flex flex-col items-center justify-center text-center py-4">
        {/* Monumental Kinetic Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40, letterSpacing: '0.05em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tight-title text-white leading-[0.85] uppercase drop-shadow-2xl"
        >
          CINEDREAD
        </motion.h1>

        {/* Zentry-Inspired 3D Interactive Expanding Video Portal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative -mt-4 sm:-mt-8 md:-mt-12 mb-6 z-30 flex flex-col items-center"
        >
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              transform: transformStyle,
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              transformStyle: 'preserve-3d',
            }}
            className={`group relative overflow-hidden cursor-pointer rounded-2xl bg-[#08080c] border border-white/20 shadow-[0_20px_70px_rgba(0,0,0,0.9)] transition-all duration-700 ease-out will-change-transform ${
              isExpanded
                ? 'w-[320px] sm:w-[520px] md:w-[680px] h-[180px] sm:h-[290px] md:h-[380px] border-red-500/50 shadow-[0_0_80px_rgba(220,38,38,0.35)]'
                : 'w-[200px] sm:w-[280px] md:w-[340px] h-[115px] sm:h-[160px] md:h-[195px] hover:border-white/40'
            }`}
          >
            {/* Cinematic Video Player */}
            <div className="absolute inset-0 bg-black overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${currentUniverse.trailerYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentUniverse.trailerYoutubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
                title={currentUniverse.trailerTitle}
                allow="autoplay; encrypted-media"
                className="w-full h-full object-cover pointer-events-none scale-125 brightness-90 contrast-110"
              />
            </div>

            {/* Custom Cinema Scanlines & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

            {/* Interactive Overlay & Trigger */}
            <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 transition-opacity">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/80 uppercase tracking-widest">
                <span className="px-2 py-0.5 rounded-sm bg-black/60 border border-white/10 backdrop-blur-sm">
                  REEL {currentUniverse.index}
                </span>
                <span className="text-white/60">
                  {currentUniverse.director} • {currentUniverse.year}
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="text-left">
                  <h4 className="font-cinzel font-bold text-sm sm:text-base text-white tracking-tight uppercase">
                    {currentUniverse.title}
                  </h4>
                  <span className="font-mono text-[9px] text-red-400 block tracking-editorial">
                    {isExpanded ? 'CLICK TO SHRINK PORTAL' : 'CLICK TO EXPAND PORTAL'}
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTrailer(currentUniverse);
                  }}
                  className="p-3 rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 shadow-xl cursor-pointer"
                  title="Play Full Theatrical Trailer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              </div>
            </div>
          </div>

          {/* Film Switcher Reel Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px]">
            {universes.map((u) => {
              const isActive = currentUniverse.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => onSelectUniverse(u.id)}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-black/60 text-white/50 border-white/10 hover:text-white hover:border-white/30 hover:bg-black/90'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-red-600' : 'bg-white/30'}`} />
                  <span>{u.index} {u.title}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Subtitle Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-cinzel text-base sm:text-xl md:text-2xl text-white/80 italic tracking-widest max-w-2xl mt-2"
        >
          SOME FILMS DON'T END WHEN THE SCREEN GOES BLACK.
        </motion.p>

        {/* Enter Archive Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex items-center gap-4"
        >
          <button
            onClick={() => scrollTo('manifesto')}
            className="px-8 py-3.5 bg-white text-[#030305] hover:bg-red-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer shadow-2xl flex items-center gap-3 group rounded-sm"
          >
            <span>ENTER THE ARCHIVE</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* 05 — HERO BOTTOM FOOTER META */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.08] pt-6 font-mono text-[10px] text-white/40 uppercase tracking-editorial"
      >
        <span>SCROLL TO DESCEND</span>
        <span>06 FORBIDDEN CELLULOID DISCOVERIES</span>
      </motion.div>
    </section>
  );
};
