import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Play, ArrowDown } from 'lucide-react';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';

interface PrestigeHeroProps {
  universes: UniverseInfo[];
  currentUniverse: UniverseInfo;
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const PrestigeHero: React.FC<PrestigeHeroProps> = ({
  universes,
  currentUniverse,
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  // Responsive 150vh pinned camera sequence for brisk, snappy 60fps pacing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 24,
    restDelta: 0.001,
  });

  // 3D Spatial Typography Flight
  const letterC_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, -120, -550]);
  const letterC_Z = useTransform(smoothProgress, [0, 0.5], [140, 580]);
  const letterC_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.8, 0]);

  const letterI_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, -80, -380]);
  const letterI_Z = useTransform(smoothProgress, [0, 0.5], [110, 520]);
  const letterI_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.8, 0]);

  const letterN_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, -40, -240]);
  const letterN_Z = useTransform(smoothProgress, [0, 0.5], [160, 620]);
  const letterN_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.8, 0]);

  const letterE_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, -10, -80]);
  const letterE_Z = useTransform(smoothProgress, [0, 0.5], [-30, 420]);
  const letterE_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [0.9, 0.7, 0]);

  const letterD_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, 10, 80]);
  const letterD_Z = useTransform(smoothProgress, [0, 0.5], [-20, 440]);
  const letterD_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [0.9, 0.7, 0]);

  const letterR_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, 40, 240]);
  const letterR_Z = useTransform(smoothProgress, [0, 0.5], [-40, 400]);
  const letterR_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [0.9, 0.7, 0]);

  const letterE2_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, 80, 380]);
  const letterE2_Z = useTransform(smoothProgress, [0, 0.5], [120, 540]);
  const letterE2_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.8, 0]);

  const letterA_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, 120, 480]);
  const letterA_Z = useTransform(smoothProgress, [0, 0.5], [120, 560]);
  const letterA_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.8, 0]);

  const letterD2_X = useTransform(smoothProgress, [0, 0.45, 0.9], [0, 150, 580]);
  const letterD2_Z = useTransform(smoothProgress, [0, 0.5], [150, 600]);
  const letterD2_Opacity = useTransform(smoothProgress, [0, 0.45, 0.75], [1, 0.8, 0]);

  // Cinema Portal Expansion (Radial Iris & Engulfment)
  const portalScale = useTransform(smoothProgress, [0, 0.35, 0.7, 1], [1, 1.25, 2.8, 5.5]);
  const portalZ = useTransform(smoothProgress, [0, 0.5, 1], [0, 140, 700]);
  const portalOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 1, 0]);
  const portalClip = useTransform(
    smoothProgress,
    [0, 0.4, 0.8, 1],
    ['circle(70% at 50% 50%)', 'circle(80% at 50% 50%)', 'circle(100% at 50% 50%)', 'circle(130% at 50% 50%)']
  );

  const uiOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
  const uiY = useTransform(smoothProgress, [0, 0.25], [0, 20]);

  // Real Parallax Offsets
  const mouseX = (mousePos.x - 0.5) * 16;
  const mouseY = (mousePos.y - 0.5) * 12;

  const scrollToManifesto = () => {
    const el = document.getElementById('manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id="hero-portal"
      className="relative h-[150vh] w-full bg-[#030305] text-[#E8E6DF] select-none"
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 sm:px-12 pt-24 pb-8 perspective-[1200px] transform-gpu preserve-3d">
        
        {/* Background Film Noir Backdrop */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 filter grayscale contrast-150 transition-all duration-700 pointer-events-none scale-105"
          style={{
            backgroundImage: `url('https://img.youtube.com/vi/${currentUniverse.trailerYoutubeId}/maxresdefault.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,4,8,0.3)_0%,rgba(3,3,5,0.96)_75%)] pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

        {/* Top Minimal Stamp */}
        <motion.div
          style={{ opacity: uiOpacity, y: uiY, transform: 'translateZ(240px)' }}
          className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[10px] tracking-editorial text-white/40 uppercase"
        >
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>CINEDREAD // RETROSPECTIVE ARCHIVE</span>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <span>SIX PSYCHOLOGICAL REALMS</span>
            <span>MMXXVI</span>
          </div>
        </motion.div>

        {/* Center 3D Stage (Monumental Letters + Suspended Cinema Portal) */}
        <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center w-full max-w-5xl preserve-3d">
          
          {/* Monumental 3D Title Letters */}
          <div className="flex items-center justify-center font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] tracking-tight-title text-white leading-[0.82] uppercase drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] will-change-transform z-10 pointer-events-none preserve-3d">
            <motion.span style={{ x: letterC_X, z: letterC_Z, opacity: letterC_Opacity, display: 'inline-block' }}>C</motion.span>
            <motion.span style={{ x: letterI_X, z: letterI_Z, opacity: letterI_Opacity, display: 'inline-block' }}>I</motion.span>
            <motion.span style={{ x: letterN_X, z: letterN_Z, opacity: letterN_Opacity, display: 'inline-block' }}>N</motion.span>
            <motion.span style={{ x: letterE_X, z: letterE_Z, opacity: letterE_Opacity, display: 'inline-block' }}>E</motion.span>
            <motion.span style={{ x: letterD_X, z: letterD_Z, opacity: letterD_Opacity, display: 'inline-block' }}>D</motion.span>
            <motion.span style={{ x: letterR_X, z: letterR_Z, opacity: letterR_Opacity, display: 'inline-block' }}>R</motion.span>
            <motion.span style={{ x: letterE2_X, z: letterE2_Z, opacity: letterE2_Opacity, display: 'inline-block' }}>E</motion.span>
            <motion.span style={{ x: letterA_X, z: letterA_Z, opacity: letterA_Opacity, display: 'inline-block' }}>A</motion.span>
            <motion.span style={{ x: letterD2_X, z: letterD2_Z, opacity: letterD2_Opacity, display: 'inline-block' }}>D</motion.span>
          </div>

          {/* The Physical Suspended Cinema Portal */}
          <motion.div
            style={{
              scale: portalScale,
              z: portalZ,
              opacity: portalOpacity,
              clipPath: portalClip,
              x: mouseX,
              y: mouseY,
            }}
            onClick={() => onOpenTrailer(currentUniverse)}
            className="relative -mt-6 sm:-mt-10 md:-mt-12 mb-5 z-20 overflow-hidden bg-[#07070a] border border-white/25 rounded-2xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] will-change-transform w-[280px] sm:w-[380px] md:w-[460px] h-[155px] sm:h-[210px] md:h-[255px] cursor-pointer group hover:border-red-500/50 transition-colors"
          >
            <div
              className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-95 scale-110 group-hover:scale-120 transition-transform duration-700"
              style={{
                backgroundImage: `url('https://img.youtube.com/vi/${currentUniverse.trailerYoutubeId}/maxresdefault.jpg')`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

            {/* Portal Overlay Content */}
            <motion.div
              style={{ opacity: uiOpacity }}
              className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/90 uppercase tracking-widest">
                <span className="px-2.5 py-0.5 rounded bg-black/80 border border-white/15">
                  REEL {currentUniverse.index}
                </span>
                <span>{currentUniverse.year} • {currentUniverse.runtime}</span>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div>
                  <span className="font-cinzel font-bold text-xs sm:text-sm text-white uppercase block truncate">
                    {currentUniverse.title}
                  </span>
                  <span className="font-mono text-[8px] text-white/60 uppercase">
                    DIR. {currentUniverse.director}
                  </span>
                </div>

                <div className="p-2.5 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl pointer-events-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Film Reel Selector Pills */}
          <motion.div
            style={{ opacity: uiOpacity, y: uiY }}
            className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-[10px] z-30"
          >
            {universes.map((u) => {
              const isActive = currentUniverse.id === u.id;
              return (
                <button
                  key={u.id}
                  onClick={() => onSelectUniverse(u.id)}
                  className={`px-3 py-1.5 rounded-sm border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-black font-bold border-white shadow-md'
                      : 'bg-black/70 text-white/50 border-white/10 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-red-600' : 'bg-white/30'}`} />
                  <span>{u.index} {u.title}</span>
                </button>
              );
            })}
          </motion.div>

          {/* Subtitle Editorial Quote */}
          <motion.p
            style={{ opacity: uiOpacity, y: uiY }}
            className="font-cinzel text-sm sm:text-base text-white/80 italic tracking-widest max-w-xl mt-3"
          >
            "SOME FILMS DON'T END WHEN THE SCREEN TURNS BLACK."
          </motion.p>
        </div>

        {/* Bottom Prompt Bar */}
        <motion.div
          style={{ opacity: uiOpacity }}
          className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/[0.06] pt-3 font-mono text-[10px] text-white/40 uppercase tracking-editorial"
        >
          <div className="flex items-center gap-2">
            <ArrowDown className="w-3.5 h-3.5 text-red-500 animate-bounce" />
            <span>SCROLL TO PASS THROUGH INTO THE MANIFESTO</span>
          </div>

          <div className="hidden sm:flex items-center gap-5 font-cinzel text-xs text-white/40 font-bold tracking-widest">
            <span>WARNER BROS.</span>
            <span>•</span>
            <span className="text-red-400">A24</span>
            <span>•</span>
            <span>SONY PICTURES</span>
            <span>•</span>
            <span>MGM+</span>
            <span>•</span>
            <span>BLUMHOUSE</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
