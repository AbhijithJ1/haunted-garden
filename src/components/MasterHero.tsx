import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Play, ArrowDown, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';
import { BentoTilt } from './BentoTilt';
import { soundEngine } from '../audio/soundEngine';

interface MasterHeroProps {
  universes: UniverseInfo[];
  currentUniverse: UniverseInfo;
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const MasterHero: React.FC<MasterHeroProps> = ({
  universes,
  currentUniverse,
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videoSources = [
    '/videos/feature-1.mp4',
    '/videos/feature-2.mp4',
    '/videos/feature-3.mp4',
    '/videos/feature-4.mp4',
  ];

  // 180vh Camera Sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Typography 3D Depth Float
  const titleY = useTransform(smoothProgress, [0, 0.45, 0.9], [0, -60, -220]);
  const titleScale = useTransform(smoothProgress, [0, 0.45, 0.9], [1, 0.94, 0.8]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.5, 0.85], [1, 0.9, 0]);

  // Blood Drop Formation & Fall (The physical key awakening the archive)
  const dropScaleY = useTransform(smoothProgress, [0, 0.18, 0.35], [0.1, 1.8, 1.0]);
  const dropScaleX = useTransform(smoothProgress, [0, 0.18, 0.35], [0.8, 0.5, 1.0]);
  const dropY = useTransform(smoothProgress, [0.12, 0.35, 0.8], [0, 120, 680]);
  const dropOpacity = useTransform(smoothProgress, [0.05, 0.15, 0.75, 0.82], [0, 1, 1, 0]);

  // Liquid Impact Ripple
  const rippleScale = useTransform(smoothProgress, [0.65, 0.95], [0.2, 5.0]);
  const rippleOpacity = useTransform(smoothProgress, [0.65, 0.76, 0.95], [0, 0.85, 0]);

  // Cinema Portal Perspective
  const portalY = useTransform(smoothProgress, [0, 0.45, 0.9], [0, 30, 180]);
  const portalScale = useTransform(smoothProgress, [0, 0.45, 0.9], [1, 1.05, 1.2]);

  // Mouse Parallax
  const mouseX = (mousePos.x - 0.5) * 16;
  const mouseY = (mousePos.y - 0.5) * 12;

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const scrollToDescent = () => {
    const el = document.getElementById('spatial-cube-chamber');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNextVideo = () => {
    setActiveVideoIndex((prev) => (prev + 1) % videoSources.length);
    soundEngine.playCardDraw();
  };

  const posterSrc = currentUniverse.posterImage || `https://img.youtube.com/vi/${currentUniverse.trailerYoutubeId}/maxresdefault.jpg`;

  return (
    <section
      ref={containerRef}
      id="hero-portal"
      className="relative min-h-[175vh] w-full bg-[#020204] text-[#E8E6DF] select-none"
    >
      {/* Sticky Fullscreen Zentry 3D Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 sm:px-12 pt-20 pb-8 perspective-[1200px] transform-gpu preserve-3d">
        
        {/* Background Atmosphere: Ambient Looping Video + Grain */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            src={videoSources[activeVideoIndex]}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-20 filter grayscale contrast-150 scale-105 transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,3,5,0.4)_0%,rgba(2,2,4,0.98)_75%)]" />
          <div className="absolute inset-0 film-grain opacity-35" />
        </div>

        {/* Top Zentry Status Bar with 4-Bar Equalizer */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] text-white/40 tracking-editorial uppercase border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>CINEDREAD // SPATIAL ARCHIVE OF HORROR CINEMA</span>
          </div>

          <div className="flex items-center gap-6">
            {/* Zentry Equalizer Audio Visualizer */}
            <button
              onClick={handleToggleAudio}
              className="flex items-center gap-2.5 text-white/60 hover:text-white transition-colors cursor-pointer group"
            >
              <div className="flex items-end gap-[3px] h-3.5">
                <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0s' }} />
                <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0.15s' }} />
                <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0.3s' }} />
                <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0.45s' }} />
              </div>
              <span>{isMuted ? 'AUDIO DORMANT' : 'AUDIO ACTIVE'}</span>
            </button>

            <span className="hidden sm:inline">EST. MMXXVI</span>
          </div>
        </div>

        {/* Center Stage: Monumental Title + Zentry Expanding Mask Video Portal */}
        <div className="relative z-20 my-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center preserve-3d">
          
          {/* Left Column: Monumental Kinetic Title */}
          <motion.div
            style={{
              y: titleY,
              scale: titleScale,
              opacity: titleOpacity,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            className="lg:col-span-7 flex flex-col text-left space-y-4 will-change-transform relative"
          >
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-800/60 font-mono text-[9px] text-red-400 uppercase tracking-widest">
                ARCHIVE CASE FILE 01 / 06
              </span>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                IMMERSIVE DESCENT
              </span>
            </div>

            {/* Monumental Title with Letter Highlight */}
            <div className="relative inline-block">
              <h1 className="special-font font-cinzel font-black text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight text-white leading-[0.85] uppercase drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
                CINEDR<strong>E</strong>AD
              </h1>

              {/* Viscous Blood Droplet forming from the letter 'R' */}
              <div className="absolute left-[52%] bottom-[-10px] pointer-events-none z-30">
                <motion.div
                  style={{
                    y: dropY,
                    scaleY: dropScaleY,
                    scaleX: dropScaleX,
                    opacity: dropOpacity,
                  }}
                  className="w-3 h-5 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#991B1B] to-[#450A0A] shadow-[0_0_14px_rgba(220,38,38,0.8)] will-change-transform"
                />
              </div>
            </div>

            <p className="font-cinzel italic text-sm sm:text-lg text-white/90 max-w-lg leading-relaxed border-l-2 border-red-600 pl-4 py-1">
              "Some films do not end when the screen turns black. The image itself is the contagion."
            </p>

            <p className="font-grotesk text-xs sm:text-sm text-white/60 font-light max-w-md leading-relaxed">
              Six masterworks of psychological horror suspended in continuous spatial depth. Directorial analysis, sound design, and the architecture of fear.
            </p>

            {/* Zentry Style Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToDescent}
                className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-white text-[#020204] hover:bg-red-600 hover:text-white px-7 py-3.5 font-mono text-[10px] tracking-editorial uppercase transition-all duration-300 shadow-2xl flex items-center gap-2.5 font-bold"
              >
                <span>ENTER THE ARCHIVE</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenTrailer(currentUniverse)}
                className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-black/80 hover:bg-white/10 text-white/90 hover:text-white border border-white/20 hover:border-white/40 px-6 py-3.5 font-mono text-[10px] tracking-editorial uppercase transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Play className="w-3 h-3 text-red-500 fill-current" />
                <span>PLAY THEATRICAL CUT ({currentUniverse.year})</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Zentry Bento Tilt Cinema Portal with Interactive Video Mask */}
          <motion.div
            style={{
              y: portalY,
              scale: portalScale,
            }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end preserve-3d"
          >
            <BentoTilt tiltFactor={8} className="w-full max-w-[460px]">
              <div
                onClick={handleNextVideo}
                className="group relative w-full aspect-video rounded-2xl bg-[#08080c] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer hover:border-red-500/60 transition-all duration-500"
              >
                {/* Zentry Video Loop */}
                <video
                  src={videoSources[activeVideoIndex]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />
                <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

                {/* Overlay Metadata */}
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10 pointer-events-none">
                  <div className="flex items-center justify-between font-mono text-[9px] text-white/90 uppercase tracking-widest">
                    <span className="px-2.5 py-0.5 rounded bg-black/80 border border-white/15">
                      REEL {currentUniverse.index} // CLICK TO SWITCH REEL
                    </span>
                    <span>{currentUniverse.year} • {currentUniverse.runtime}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <span className="font-cinzel font-bold text-base text-white uppercase block">
                        {currentUniverse.title}
                      </span>
                      <span className="font-mono text-[8px] text-white/60 uppercase">
                        DIR. {currentUniverse.director}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTrailer(currentUniverse);
                      }}
                      className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-2xl pointer-events-auto cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </BentoTilt>

            {/* Film Selector Reel Tabs */}
            <div className="mt-4 flex flex-wrap justify-end gap-1.5 font-mono text-[9px]">
              {universes.map((u) => {
                const isActive = currentUniverse.id === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => onSelectUniverse(u.id)}
                    className={`px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
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
            </div>
          </motion.div>
        </div>

        {/* Phase 3 Impact Ripple (in liquid depth) */}
        <div className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
          <motion.div
            style={{
              scale: rippleScale,
              opacity: rippleOpacity,
            }}
            className="w-32 h-32 rounded-full border border-red-600/70 shadow-[0_0_40px_rgba(220,38,38,0.4)] will-change-transform"
          />
        </div>

        {/* Bottom Studio Credentials Footer */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-3 font-mono text-[9px] text-white/40 uppercase tracking-widest">
          <span>CURATED FROM:</span>

          <div className="flex flex-wrap items-center gap-5 text-white/40 font-cinzel text-xs font-bold tracking-widest">
            <span className="hover:text-white transition-colors">WARNER BROS.</span>
            <span>•</span>
            <span className="text-red-400 hover:text-red-300 transition-colors">A24</span>
            <span>•</span>
            <span className="hover:text-white transition-colors">SONY PICTURES</span>
            <span>•</span>
            <span className="hover:text-white transition-colors">MGM+</span>
            <span>•</span>
            <span className="hover:text-white transition-colors">BLUMHOUSE</span>
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <ArrowDown className="w-3 h-3 text-red-500 animate-bounce" />
            <span>SCROLL TO ENTER HEXAHEDRON</span>
          </div>
        </div>
      </div>
    </section>
  );
};
