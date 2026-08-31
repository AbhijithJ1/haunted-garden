import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Play, ArrowDown } from 'lucide-react';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';

interface SpatialHeroProps {
  universes: UniverseInfo[];
  currentUniverse: UniverseInfo;
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const SpatialHero: React.FC<SpatialHeroProps> = ({
  universes,
  currentUniverse,
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  // 300vh pinned scroll sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  // ==========================================
  // PHASE 01 & 02: LETTER DEPTH SEPARATION
  // Individual letters fly past camera at different Z-depths & angles
  // ==========================================
  const cX = useTransform(smoothProgress, [0, 0.45, 0.8], [0, -180, -750]);
  const cY = useTransform(smoothProgress, [0, 0.45, 0.8], [0, -60, -250]);
  const cZ = useTransform(smoothProgress, [0, 0.55], [180, 700]);
  const cOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const iX = useTransform(smoothProgress, [0, 0.45, 0.8], [0, -120, -550]);
  const iZ = useTransform(smoothProgress, [0, 0.55], [130, 620]);
  const iOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const nX = useTransform(smoothProgress, [0, 0.45, 0.8], [0, -70, -350]);
  const nZ = useTransform(smoothProgress, [0, 0.55], [210, 800]);
  const nOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const eX = useTransform(smoothProgress, [0, 0.45, 0.8], [0, -20, -120]);
  const eZ = useTransform(smoothProgress, [0, 0.55], [150, 680]);
  const eOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const dX = useTransform(smoothProgress, [0, 0.45, 0.8], [0, 20, 120]);
  const dZ = useTransform(smoothProgress, [0, 0.55], [190, 760]);
  const dOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const rX = useTransform(smoothProgress, [0, 0.45, 0.8], [0, 70, 350]);
  const rZ = useTransform(smoothProgress, [0, 0.55], [140, 640]);
  const rOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const e2X = useTransform(smoothProgress, [0, 0.45, 0.8], [0, 120, 550]);
  const e2Z = useTransform(smoothProgress, [0, 0.55], [220, 820]);
  const e2Opacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const aX = useTransform(smoothProgress, [0, 0.45, 0.8], [0, 160, 680]);
  const aZ = useTransform(smoothProgress, [0, 0.55], [160, 700]);
  const aOpacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  const d2X = useTransform(smoothProgress, [0, 0.45, 0.8], [0, 210, 850]);
  const d2Y = useTransform(smoothProgress, [0, 0.45, 0.8], [0, -40, -200]);
  const d2Z = useTransform(smoothProgress, [0, 0.55], [200, 780]);
  const d2Opacity = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  // ==========================================
  // PHASE 03 & 04: PORTAL ENGULFMENT & BREAKTHROUGH
  // Portal grows towards camera, engulfs view (scale: 1 -> 9), and passes through
  // ==========================================
  const portalScale = useTransform(smoothProgress, [0, 0.35, 0.65, 0.9, 1], [1, 1.25, 3.2, 7.5, 12]);
  const portalZ = useTransform(smoothProgress, [0, 0.5, 0.9, 1], [0, 180, 750, 1400]);
  const portalBorderRadius = useTransform(smoothProgress, [0, 0.5, 0.75], ['16px', '6px', '0px']);
  const portalOpacity = useTransform(smoothProgress, [0, 0.85, 0.98, 1], [1, 1, 0.4, 0]);

  // Deep Background Layer (-400px)
  const bgScale = useTransform(smoothProgress, [0, 1], [1.2, 0.85]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.6, 0.85], [0.35, 0.1, 0]);

  // UI Fade
  const uiOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0]);
  const uiY = useTransform(smoothProgress, [0, 0.22], [0, 30]);

  // Physical mouse parallax offsets
  const mouseX = mousePos.x - 0.5;
  const mouseY = mousePos.y - 0.5;

  const fgMoveX = mouseX * 24;
  const fgMoveY = mouseY * 18;

  const midMoveX = mouseX * 12;
  const midMoveY = mouseY * 9;

  const bgMoveX = mouseX * 4;
  const bgMoveY = mouseY * 3;

  return (
    <div
      ref={containerRef}
      id="hero-portal"
      className="relative h-[280vh] w-full bg-[#020204] text-[#E5E4DE] select-none"
    >
      {/* Pinned 3D Camera Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 sm:px-12 pt-28 pb-10 perspective-[1200px] transform-gpu preserve-3d">
        
        {/* ============================================================
            LAYER -400px: ATMOSPHERIC FOOTAGE IN DEEP VOID
            ============================================================ */}
        <motion.div
          style={{
            scale: bgScale,
            opacity: bgOpacity,
            x: bgMoveX,
            y: bgMoveY,
            transform: 'translateZ(-400px)',
          }}
          className="absolute inset-0 pointer-events-none overflow-hidden will-change-transform"
        >
          <div
            className="absolute inset-0 bg-cover bg-center filter grayscale contrast-150 brightness-75 scale-110 transition-all duration-1000"
            style={{
              backgroundImage: `url('https://img.youtube.com/vi/${currentUniverse.trailerYoutubeId}/maxresdefault.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(4,2,6,0.3)_0%,rgba(2,2,4,0.98)_75%)]" />
          <div className="absolute inset-0 film-grain opacity-40" />
        </motion.div>

        {/* Top Floating Coordinates */}
        <motion.div
          style={{
            opacity: uiOpacity,
            y: uiY,
            transform: 'translateZ(280px)',
          }}
          className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[10px] tracking-editorial text-white/40 uppercase"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>CINEDREAD // SECTOR 00</span>
          </div>
          <span className="hidden sm:inline">SPATIAL CINEMA REEL VAULT</span>
          <span>MMXXVI</span>
        </motion.div>

        {/* ============================================================
            LAYER +150px & 0px: 3D HERO STAGE (LETTERS + PORTAL)
            ============================================================ */}
        <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center w-full max-w-5xl preserve-3d">
          
          {/* INDIVIDUAL SPATIAL TYPOGRAPHY LETTERS (+150px to +220px) */}
          <div className="flex items-center justify-center font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11.5rem] tracking-tight-title text-white leading-[0.85] uppercase drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)] will-change-transform z-10 pointer-events-none preserve-3d">
            <motion.span style={{ x: cX, y: cY, z: cZ, opacity: cOpacity, display: 'inline-block' }}>C</motion.span>
            <motion.span style={{ x: iX, z: iZ, opacity: iOpacity, display: 'inline-block' }}>I</motion.span>
            <motion.span style={{ x: nX, z: nZ, opacity: nOpacity, display: 'inline-block' }}>N</motion.span>
            <motion.span style={{ x: eX, z: eZ, opacity: eOpacity, display: 'inline-block' }}>E</motion.span>
            <motion.span style={{ x: dX, z: dZ, opacity: dOpacity, display: 'inline-block' }}>D</motion.span>
            <motion.span style={{ x: rX, z: rZ, opacity: rOpacity, display: 'inline-block' }}>R</motion.span>
            <motion.span style={{ x: e2X, z: e2Z, opacity: e2Opacity, display: 'inline-block' }}>E</motion.span>
            <motion.span style={{ x: aX, z: aZ, opacity: aOpacity, display: 'inline-block' }}>A</motion.span>
            <motion.span style={{ x: d2X, y: d2Y, z: d2Z, opacity: d2Opacity, display: 'inline-block' }}>D</motion.span>
          </div>

          {/* THE PHYSICAL 3D SUSPENDED CINEMA PORTAL (0px to +1400px on scroll) */}
          <motion.div
            style={{
              scale: portalScale,
              z: portalZ,
              opacity: portalOpacity,
              borderRadius: portalBorderRadius,
              x: midMoveX,
              y: midMoveY,
            }}
            className="relative -mt-6 sm:-mt-10 md:-mt-14 mb-6 z-20 overflow-hidden bg-[#07070a] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] will-change-transform w-[260px] sm:w-[360px] md:w-[460px] h-[145px] sm:h-[200px] md:h-[255px]"
          >
            {/* Embedded High-Res Looping Footage */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentUniverse.trailerYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentUniverse.trailerYoutubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
              title={currentUniverse.trailerTitle}
              allow="autoplay; encrypted-media"
              className="w-full h-full object-cover pointer-events-none scale-125 brightness-90 contrast-115"
            />

            {/* Cinema Scanlines & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

            {/* Portal Interior Meta Overlay */}
            <motion.div
              style={{ opacity: uiOpacity }}
              className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/80 uppercase tracking-widest">
                <span className="px-2 py-0.5 rounded-sm bg-black/70 border border-white/10">
                  REEL {currentUniverse.index}
                </span>
                <span>{currentUniverse.year}</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-cinzel font-bold text-xs sm:text-sm text-white uppercase truncate">
                  {currentUniverse.title}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenTrailer(currentUniverse);
                  }}
                  className="p-2.5 rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-all transform hover:scale-110 shadow-xl cursor-pointer"
                  title="Play Full Trailer"
                >
                  <Play className="w-3 h-3 fill-current" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Film Switcher Reel Pills */}
          <motion.div
            style={{ opacity: uiOpacity, y: uiY, x: fgMoveX }}
            className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] z-30"
          >
            {universes.map((u) => {
              const isActive = currentUniverse.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => onSelectUniverse(u.id)}
                  className={`px-3.5 py-1.5 rounded-sm border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black font-bold border-white shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                      : 'bg-black/70 text-white/50 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-red-600' : 'bg-white/30'}`} />
                  <span>{u.index} {u.title}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Subtitle Line */}
          <motion.p
            style={{ opacity: uiOpacity, y: uiY }}
            className="font-cinzel text-base sm:text-xl text-white/80 italic tracking-widest max-w-2xl mt-4"
          >
            SOME FILMS DON'T END WHEN THE SCREEN GOES BLACK.
          </motion.p>
        </div>

        {/* Bottom Scroll Prompt */}
        <motion.div
          style={{ opacity: uiOpacity }}
          className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.08] pt-6 font-mono text-[10px] text-white/40 uppercase tracking-editorial"
        >
          <div className="flex items-center gap-2">
            <ArrowDown className="w-3.5 h-3.5 text-red-500 animate-bounce" />
            <span>SCROLL TO TRAVEL INTO THE PORTAL</span>
          </div>
          <span>CAMERA PUSH // Z-AXIS CHOREOGRAPHY</span>
        </motion.div>
      </div>
    </div>
  );
};
