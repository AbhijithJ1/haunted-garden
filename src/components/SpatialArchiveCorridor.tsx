import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { BentoTilt } from './BentoTilt';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';
import { soundEngine } from '../audio/soundEngine';

interface SpatialArchiveCorridorProps {
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

// 3D Spatial Matrix for the 6 suspended horror realms
const PORTAL_SPATIAL_COORDINATES = [
  { id: 'conjuring', xOffset: '-16%', yOffset: '0px', zDepth: '60px', rotY: 4, rotX: 2 },
  { id: 'talktome', xOffset: '22%', yOffset: '80px', zDepth: '-40px', rotY: -5, rotX: -2 },
  { id: 'from', xOffset: '-12%', yOffset: '60px', zDepth: '80px', rotY: 3, rotX: 2 },
  { id: 'hereditary', xOffset: '18%', yOffset: '100px', zDepth: '-20px', rotY: -4, rotX: -1 },
  { id: 'sinister', xOffset: '-20%', yOffset: '80px', zDepth: '50px', rotY: 5, rotX: 2 },
  { id: 'tarot', xOffset: '14%', yOffset: '120px', zDepth: '0px', rotY: -3, rotX: 3 },
];

export const SpatialArchiveCorridor: React.FC<SpatialArchiveCorridorProps> = ({
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();
  const [activeUniverseId, setActiveUniverseId] = useState<string | null>(null);
  const portalRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver for Mobile Scroll-based Active Film Immersion
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-universe-id');
            if (id) {
              setActiveUniverseId(id);
              soundEngine.setUniverseAtmosphere(id);
            }
          }
        });
      },
      { threshold: 0.55 }
    );

    portalRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handlePortalEnter = (universe: UniverseInfo) => {
    setActiveUniverseId(universe.id);
    soundEngine.setUniverseAtmosphere(universe.id);
  };

  const handlePortalLeave = () => {
    // Return to dormant background
    setActiveUniverseId(null);
  };

  const scrollToChapter = (id: string) => {
    onSelectUniverse(id);
    const el = document.getElementById(`chapter-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeUniverse = UNIVERSES_DATA.find((u) => u.id === activeUniverseId);

  return (
    <section
      ref={containerRef}
      id="archive-corridor"
      className="relative min-h-[220vh] w-full bg-[#020204] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden perspective-[1400px]"
    >
      {/* ============================================================
          FULL-VIEWPORT ACTIVE FILM SCARY ENVIRONMENT
          Only wakes up and consumes the screen when user approaches a portal
          ============================================================ */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeUniverse ? (
            <motion.div
              key={activeUniverse.id}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1.0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Active Film Backdrop */}
              <div
                className="w-full h-full bg-cover bg-center scale-120 brightness-75 contrast-125 filter grayscale"
                style={{
                  backgroundImage: `url('${activeUniverse.posterImage || `https://img.youtube.com/vi/${activeUniverse.trailerYoutubeId}/maxresdefault.jpg`}')`,
                }}
              />

              {/* Noir Gradient & Vignette Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,2,6,0.3)_0%,rgba(2,2,4,0.95)_80%)]" />
              <div className="absolute inset-0 bg-[#020204]/40 backdrop-blur-[1px]" />
              <div className="absolute inset-0 film-grain opacity-40" />
            </motion.div>
          ) : (
            /* Dormant Ambient Darkness */
            <motion.div
              key="dormant"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-[#020204]"
            >
              <div
                className="absolute inset-0 opacity-20 transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse 900px 700px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(140, 20, 20, 0.2), transparent 70%)`,
                }}
              />
              <div className="absolute inset-0 film-grain opacity-25" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24 border-b border-white/[0.08] pb-8">
          <div>
            <span className="font-mono text-[10px] text-red-500 tracking-widest uppercase block mb-2">
              03 // THE 6 REALMS
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              THE ARCHIVE
            </h2>
          </div>

          <p className="font-grotesk text-xs sm:text-sm text-white/50 max-w-md leading-relaxed font-light">
            Six dormant horror realms suspended in space. Approach any portal to awaken its atmosphere and disturb the environment.
          </p>
        </div>

        {/* 3D Asymmetrical Spatial Corridor */}
        <div className="relative w-full flex flex-col gap-24 sm:gap-36 transform-gpu preserve-3d py-12">
          {UNIVERSES_DATA.map((u, idx) => {
            const coords = PORTAL_SPATIAL_COORDINATES[idx] || PORTAL_SPATIAL_COORDINATES[0];
            const isCurrentlyActive = activeUniverseId === u.id;
            const isAnyActive = activeUniverseId !== null;
            const pX = (mousePos.x - 0.5) * (idx % 2 === 0 ? 14 : -14);
            const pY = (mousePos.y - 0.5) * 10;
            const cardPoster = u.posterImage || `https://img.youtube.com/vi/${u.trailerYoutubeId}/maxresdefault.jpg`;

            return (
              <motion.div
                key={u.id}
                ref={(el) => (portalRefs.current[idx] = el)}
                data-universe-id={u.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => handlePortalEnter(u)}
                onMouseLeave={handlePortalLeave}
                style={{
                  transform: `translateX(${coords.xOffset}) translateZ(${
                    isCurrentlyActive ? '120px' : coords.zDepth
                  }) rotateY(${isCurrentlyActive ? 0 : coords.rotY}deg) rotateX(${
                    isCurrentlyActive ? 0 : coords.rotX
                  }deg) translate3d(${pX}px, ${pY}px, 0)`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                  opacity: isAnyActive && !isCurrentlyActive ? 0.35 : 1.0,
                }}
                className={`w-full max-w-2xl preserve-3d will-change-transform ${
                  idx % 2 === 0 ? 'self-start ml-2 sm:ml-8' : 'self-end mr-2 sm:mr-8'
                }`}
              >
                <BentoTilt tiltFactor={8}>
                  <div
                    onClick={() => scrollToChapter(u.id)}
                    className={`group relative rounded-2xl bg-[#07070a] p-8 sm:p-10 flex flex-col justify-between overflow-hidden cursor-pointer shadow-[0_30px_90px_rgba(0,0,0,0.95)] transition-all duration-500 min-h-[380px] sm:min-h-[440px] border ${
                      isCurrentlyActive
                        ? 'border-red-500/80 shadow-[0_0_80px_rgba(220,38,38,0.35)] scale-[1.03]'
                        : 'border-white/15 hover:border-white/40'
                    }`}
                  >
                    {/* Portal Poster Layer */}
                    <div
                      className={`absolute inset-0 bg-cover bg-center filter grayscale contrast-125 transition-all duration-700 ${
                        isCurrentlyActive
                          ? 'scale-110 opacity-70 brightness-110'
                          : 'opacity-35 scale-100 group-hover:scale-105'
                      }`}
                      style={{ backgroundImage: `url('${cardPoster}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07070a] via-[#07070a]/80 to-transparent" />
                    <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

                    {/* Top Film Stamp */}
                    <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/50 tracking-editorial uppercase">
                      <span className={`px-2.5 py-1 rounded transition-colors ${
                        isCurrentlyActive ? 'bg-red-600 text-white font-bold' : 'bg-black/70 border border-white/10'
                      }`}>
                        REEL {u.index}
                      </span>
                      <span>{u.year} • {u.runtime} • {u.director}</span>
                    </div>

                    {/* Foreground Content */}
                    <div className="relative z-10 mt-auto pt-6">
                      <span className="font-mono text-[9px] text-red-500 tracking-widest uppercase block mb-1">
                        {u.subTitle}
                      </span>
                      <h3 className={`font-cinzel font-bold text-3xl sm:text-4xl text-white tracking-tight uppercase transition-colors ${
                        isCurrentlyActive ? 'text-red-400' : 'group-hover:text-white'
                      }`}>
                        {u.title}
                      </h3>

                      <p className="font-cinzel italic text-xs sm:text-sm text-white/70 mt-1 line-clamp-2">
                        "{u.tagline}"
                      </p>

                      <p className="font-grotesk text-xs sm:text-sm text-white/50 font-light mt-3 line-clamp-3 leading-relaxed">
                        {u.synopsis}
                      </p>

                      {/* Action Row */}
                      <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <span className="font-mono text-[10px] text-white/80 uppercase tracking-editorial flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform">
                          <span>EXPLORE FILM CHAPTER</span>
                          <ArrowRight className="w-3.5 h-3.5 text-red-500" />
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenTrailer(u);
                          }}
                          className={`p-2.5 rounded-full transition-all cursor-pointer shadow-lg ${
                            isCurrentlyActive
                              ? 'bg-red-600 text-white scale-110'
                              : 'bg-white/5 hover:bg-white text-white/70 hover:text-black'
                          }`}
                          title="Play Full Trailer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </BentoTilt>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
