import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Film, Play } from 'lucide-react';
import { BentoTilt } from './BentoTilt';
import { UniverseInfo } from '../types';
import { soundEngine } from '../audio/soundEngine';

interface UniverseSelectorProps {
  universes: UniverseInfo[];
  currentUniverse: UniverseInfo;
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const UniverseSelector: React.FC<UniverseSelectorProps> = ({
  universes,
  currentUniverse,
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const [hoveredUniverse, setHoveredUniverse] = useState<UniverseInfo>(currentUniverse);

  const handleHover = (u: UniverseInfo) => {
    setHoveredUniverse(u);
    soundEngine.playCardDraw();
  };

  const handleSelect = (u: UniverseInfo) => {
    onSelectUniverse(u.id);
    soundEngine.setUniverseAtmosphere(u.id);
    const targetId = u.id === 'sinister' ? 'chapter-hereditary' : `chapter-${u.id}`;
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="universe-selector"
      className="relative min-h-screen w-full bg-[#040406] py-32 px-6 sm:px-12 flex flex-col justify-center border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-1000 pointer-events-none blur-3xl"
        style={{
          background: `radial-gradient(ellipse at 80% 50%, ${hoveredUniverse.themeColor} 0%, transparent 65%)`,
        }}
      />
      <div className="absolute inset-0 film-grain pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <span className="font-mono text-[10px] text-red-500 tracking-cinematic uppercase block mb-3">
              INDEX // SIX REELS
            </span>
            <h2 className="font-cinzel font-bold text-4xl sm:text-6xl text-white tracking-tight">
              THE ARCHIVE
            </h2>
          </div>

          <p className="font-grotesk text-xs sm:text-sm text-white/50 max-w-md leading-relaxed font-light">
            Select a forbidden reel to descend into its psychological anatomy, ritual artifacts, and cinematic dread.
          </p>
        </div>

        {/* Zentry-Inspired 3D Bento Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Film List */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-white/[0.06]">
            {universes.map((u) => {
              const isSelected = hoveredUniverse.id === u.id;
              return (
                <div
                  key={u.id}
                  onMouseEnter={() => handleHover(u)}
                  onClick={() => handleSelect(u)}
                  className={`group py-5 flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    isSelected ? 'pl-4' : 'hover:pl-2 opacity-50 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs text-white/40">{u.index}</span>
                    <div className="flex flex-col">
                      <h3
                        className={`font-cinzel text-2xl sm:text-3xl font-bold tracking-tight uppercase transition-colors ${
                          isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'
                        }`}
                      >
                        {u.title}
                      </h3>
                      <span className="font-mono text-[10px] text-white/40 tracking-editorial uppercase mt-0.5">
                        {u.director} • {u.year}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        isSelected ? 'scale-150' : 'opacity-20'
                      }`}
                      style={{ backgroundColor: u.themeColor }}
                    />
                    <ArrowRight
                      className={`w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all ${
                        isSelected ? 'text-white translate-x-1' : ''
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Perspective Tilt Bento Reel Preview */}
          <div className="lg:col-span-7">
            <BentoTilt tiltFactor={8}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={hoveredUniverse.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative rounded-2xl bg-[#08080c] border border-white/15 p-8 sm:p-12 shadow-2xl overflow-hidden min-h-[480px] flex flex-col justify-between"
                >
                  {/* High-Resolution Looping Film Backdrop */}
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 transition-transform duration-1000"
                    style={{
                      backgroundImage: `url('https://img.youtube.com/vi/${hoveredUniverse.trailerYoutubeId}/maxresdefault.jpg')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/80 to-transparent" />
                  <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between font-mono text-[10px] text-white/40 tracking-editorial uppercase mb-6 pb-4 border-b border-white/[0.08]">
                      <span>REEL // {hoveredUniverse.index}</span>
                      <span>{hoveredUniverse.runtime} • {hoveredUniverse.rating}</span>
                    </div>

                    <h3 className="font-cinzel font-black text-3xl sm:text-5xl text-white tracking-tight uppercase mb-2">
                      {hoveredUniverse.title}
                    </h3>

                    <p className="font-cinzel italic text-sm sm:text-base text-white/80 mb-4">
                      "{hoveredUniverse.tagline}"
                    </p>

                    <p className="font-grotesk text-xs sm:text-sm text-white/60 leading-relaxed font-light max-w-lg mb-6">
                      {hoveredUniverse.synopsis}
                    </p>
                  </div>

                  {/* Card Actions Bottom */}
                  <div className="relative z-10 pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleSelect(hoveredUniverse)}
                      className="flex-1 py-3.5 px-6 bg-white text-[#040406] hover:bg-red-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 rounded-sm shadow-xl"
                    >
                      <span>EXPLORE CHAPTER</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenTrailer(hoveredUniverse)}
                      className="py-3.5 px-5 bg-black/60 hover:bg-white/10 text-white/80 hover:text-white border border-white/15 hover:border-white/30 font-mono text-[11px] tracking-editorial uppercase transition-all rounded-sm cursor-pointer flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
                      <span>TRAILER</span>
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </BentoTilt>
          </div>
        </div>
      </div>
    </section>
  );
};
