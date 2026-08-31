import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Play, ArrowUp } from 'lucide-react';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';

interface SpatialFilmWorldProps {
  universe: UniverseInfo;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const SpatialFilmWorld: React.FC<SpatialFilmWorldProps> = ({
  universe,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    restDelta: 0.001,
  });

  // 01 The Conjuring: Supernatural Circular Radial Aperture Opens
  const conjuringClip = useTransform(
    smoothProgress,
    [0.15, 0.5, 0.85],
    ['circle(22% at 50% 50%)', 'circle(65% at 50% 50%)', 'circle(120% at 50% 50%)']
  );
  const conjuringScale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.88, 1.05, 1.2]);
  const conjuringRotateY = useTransform(smoothProgress, [0.15, 0.5, 0.85], [-6, 0, 4]);

  // 02 Talk To Me: Foreground Layered Words Split Across Depth
  const talkWord1X = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, -180, -420]);
  const talkWord1Z = useTransform(smoothProgress, [0.2, 0.5, 0.8], [80, 260, 520]);
  const talkWord2X = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 180, 420]);
  const talkWord2Z = useTransform(smoothProgress, [0.2, 0.5, 0.8], [100, 280, 540]);
  const talkWord3Y = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 80, 180]);
  const talkWord3Z = useTransform(smoothProgress, [0.2, 0.5, 0.8], [130, 320, 600]);
  const talkBgScale = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0.92, 1.04, 1.15]);

  // 03 FROM: Narrow Vertical Doorway Threshold Opens
  const fromDoorwayClip = useTransform(
    smoothProgress,
    [0.15, 0.45, 0.8],
    ['inset(0% 40% 0% 40% round 4px)', 'inset(0% 12% 0% 12% round 8px)', 'inset(0% 0% 0% 0% round 0px)']
  );
  const fromScale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.9, 1.02, 1.15]);

  // 04 Hereditary: Dollhouse-Scale Box Approaches and Expands
  const hereditaryScale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.65, 1.0, 1.25]);
  const hereditaryBoxRotateX = useTransform(smoothProgress, [0.15, 0.5, 0.85], [8, 0, -3]);
  const hereditaryZ = useTransform(smoothProgress, [0.15, 0.5, 0.85], [-160, 20, 240]);

  // 05 Sinister: Travel into Super-8 Projection Light Cone
  const sinisterBeamScale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.75, 1.0, 1.35]);
  const sinisterBeamOpacity = useTransform(smoothProgress, [0.15, 0.45, 0.85], [0.2, 0.65, 0.05]);
  const sinisterFootageZ = useTransform(smoothProgress, [0.15, 0.5, 0.85], [-180, 0, 220]);

  // 06 Tarot: 3D Geometric Card Plane Perspective Flip
  const tarotCardRotateY = useTransform(smoothProgress, [0.15, 0.45, 0.75], [35, 90, 0]);
  const tarotScale = useTransform(smoothProgress, [0.15, 0.5, 0.85], [0.85, 1.0, 1.18]);
  const tarotZ = useTransform(smoothProgress, [0.15, 0.5, 0.85], [-100, 30, 200]);

  const pX = (mousePos.x - 0.5) * 16;
  const pY = (mousePos.y - 0.5) * 12;

  const scrollToArchive = () => {
    const el = document.getElementById('archive-corridor');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      id={`chapter-${universe.id}`}
      className="relative min-h-[120vh] w-full bg-[#030305] py-24 px-6 sm:px-12 border-t border-white/[0.06] flex flex-col justify-center overflow-hidden perspective-[1200px]"
    >
      {/* Ambient Backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 filter grayscale contrast-150 pointer-events-none scale-105"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#030305]/90 to-[#030305]" />
      <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Chapter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-white/[0.08] pb-8">
          <div>
            <span className="font-mono text-[10px] text-red-500 tracking-widest uppercase block mb-2">
              CHAPTER {universe.index} // RETROSPECTIVE STUDY
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
              {universe.title}
            </h2>
            <p className="font-cinzel italic text-base sm:text-lg text-white/70 mt-2">
              "{universe.tagline}"
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenTrailer(universe)}
              className="py-3 px-6 bg-white text-[#030305] hover:bg-red-600 hover:text-white font-mono text-[10px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded shadow-lg font-bold"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>THEATRICAL TRAILER</span>
            </button>
          </div>
        </div>

        {/* The Signature Spatial Cinema Scene */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Spatial Cinema Portal with Signature Motion */}
          <div className="lg:col-span-7 preserve-3d">
            
            {/* 02 TALK TO ME: Foreground Layered Words */}
            {universe.id === 'talktome' ? (
              <div
                onClick={() => onOpenTrailer(universe)}
                className="group relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer preserve-3d"
              >
                <motion.div
                  style={{ scale: talkBgScale, transform: `translate3d(${pX}px, ${pY}px, 0)` }}
                  className="absolute inset-0 rounded-xl bg-black border border-white/20 overflow-hidden shadow-2xl group-hover:border-red-500/50 transition-colors"
                >
                  <div
                    className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                </motion.div>

                {/* Flying Words Across Z Space */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none preserve-3d z-20">
                  <motion.span
                    style={{ x: talkWord1X, z: talkWord1Z }}
                    className="font-cinzel font-black text-5xl sm:text-6xl text-white tracking-widest uppercase drop-shadow-2xl"
                  >
                    TALK
                  </motion.span>
                  <motion.span
                    style={{ x: talkWord2X, z: talkWord2Z }}
                    className="font-cinzel font-black text-4xl sm:text-5xl text-cyan-300 tracking-widest uppercase drop-shadow-2xl"
                  >
                    TO
                  </motion.span>
                  <motion.span
                    style={{ y: talkWord3Y, z: talkWord3Z }}
                    className="font-cinzel font-black text-5xl sm:text-6xl text-white tracking-widest uppercase drop-shadow-2xl"
                  >
                    ME
                  </motion.span>
                </div>
              </div>
            ) : universe.id === 'sinister' ? (
              // 05 SINISTER: Projector Cone Beam
              <div
                onClick={() => onOpenTrailer(universe)}
                className="group relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer preserve-3d"
              >
                <motion.div
                  style={{
                    scale: sinisterBeamScale,
                    opacity: sinisterBeamOpacity,
                  }}
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.45)_0%,transparent_65%)] pointer-events-none z-20"
                />
                <motion.div
                  style={{
                    scale: sinisterBeamScale,
                    z: sinisterFootageZ,
                    transform: `translate3d(${pX}px, ${pY}px, 0)`,
                  }}
                  className="w-full h-full rounded-xl bg-black border border-white/20 overflow-hidden shadow-2xl group-hover:border-red-500/50 transition-colors"
                >
                  <div
                    className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                </motion.div>
              </div>
            ) : (
              // 01 The Conjuring (Radial Iris Aperture), 03 FROM (Doorway Slit), 04 Hereditary (Dollhouse), 06 Tarot (Card Flip)
              <motion.div
                style={{
                  scale:
                    universe.id === 'conjuring'
                      ? conjuringScale
                      : universe.id === 'from'
                      ? fromScale
                      : universe.id === 'hereditary'
                      ? hereditaryScale
                      : universe.id === 'tarot'
                      ? tarotScale
                      : 1,
                  rotateY:
                    universe.id === 'conjuring'
                      ? conjuringRotateY
                      : universe.id === 'tarot'
                      ? tarotCardRotateY
                      : 0,
                  rotateX: universe.id === 'hereditary' ? hereditaryBoxRotateX : 0,
                  z:
                    universe.id === 'conjuring'
                      ? 0
                      : universe.id === 'hereditary'
                      ? hereditaryZ
                      : universe.id === 'tarot'
                      ? tarotZ
                      : 0,
                  clipPath:
                    universe.id === 'conjuring'
                      ? conjuringClip
                      : universe.id === 'from'
                      ? fromDoorwayClip
                      : 'none',
                  transform: `translate3d(${pX}px, ${pY}px, 0)`,
                  transformStyle: 'preserve-3d',
                }}
                onClick={() => onOpenTrailer(universe)}
                className="group relative w-full aspect-video rounded-xl bg-black border border-white/20 overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] will-change-transform cursor-pointer hover:border-red-500/50 transition-colors"
              >
                <div
                  className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
                  style={{
                    backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

                {/* Bottom Cinema Meta & Play Button */}
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-white/70 tracking-editorial uppercase z-10">
                  <span>{universe.director} ({universe.year})</span>
                  <div className="p-2.5 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl">
                    <Play className="w-3 h-3 fill-current" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right: Directorial Analysis */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 will-change-transform">
            <div>
              <span className="font-mono text-[10px] text-red-500 tracking-widest uppercase block mb-2">
                DIRECTORIAL ANALYSIS
              </span>
              <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {universe.subTitle}
              </h3>
              <p className="font-grotesk text-sm text-white/60 mt-3 leading-relaxed font-light">
                {universe.synopsis}
              </p>
            </div>

            <div className="p-6 bg-[#07070a] border border-white/10 rounded-lg shadow-xl">
              <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block mb-2">
                DIRECTORIAL QUOTE
              </span>
              <p className="font-cinzel italic text-sm text-white/90 leading-relaxed">
                "{universe.loreQuote}"
              </p>
            </div>
          </div>
        </div>

        {/* Mechanisms of Dread */}
        <div className="border-t border-white/[0.08] pt-10">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] text-red-500 tracking-widest uppercase">
              THE MECHANICS OF DREAD
            </span>

            <button
              onClick={scrollToArchive}
              className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-editorial flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowUp className="w-3 h-3" />
              <span>RETURN TO ARCHIVE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {universe.whatMakesItTerrifying.map((point, idx) => (
              <div key={idx} className="flex flex-col border-t border-white/[0.08] pt-5">
                <span className="font-mono text-xs text-white/30 mb-2">0{idx + 1}</span>
                <p className="font-cinzel text-base text-white/90 leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
