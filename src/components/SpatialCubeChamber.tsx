import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Play, RotateCw } from 'lucide-react';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';
import { soundEngine } from '../audio/soundEngine';

interface SpatialCubeChamberProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
  onSelectUniverse: (id: string) => void;
}

export const SpatialCubeChamber: React.FC<SpatialCubeChamberProps> = ({
  onOpenTrailer,
  onSelectUniverse,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useMousePosition();
  const [activeFaceIndex, setActiveFaceIndex] = useState<number>(0);

  // Pinned scroll for smooth 3D Cube rotation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001,
  });

  // 360-degree rotation across X and Y axes on scroll
  const rotX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [-12, 10, -15, 80, -80, -12]);
  const rotY = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [-25, -115, -205, -295, -385, -475]);
  const cubeScale = useTransform(smoothProgress, [0, 0.5, 1], [0.85, 1.05, 0.9]);

  // Mouse Parallax
  const mouseRotX = (mousePos.y - 0.5) * -18;
  const mouseRotY = (mousePos.x - 0.5) * 18;

  const faces = [
    { universe: UNIVERSES_DATA[0], name: 'FRONT', fear: 'THE FEAR OF INVASION', insight: 'Home is supposed to protect you.', transform: 'rotateY(0deg) translateZ(clamp(140px, 18vw, 220px))' },
    { universe: UNIVERSES_DATA[1], name: 'RIGHT', fear: 'THE FEAR OF SURRENDER', insight: 'What happens when you willingly open the door?', transform: 'rotateY(90deg) translateZ(clamp(140px, 18vw, 220px))' },
    { universe: UNIVERSES_DATA[2], name: 'BACK', fear: 'THE FEAR OF NO ESCAPE', insight: 'The world becomes the prison.', transform: 'rotateY(180deg) translateZ(clamp(140px, 18vw, 220px))' },
    { universe: UNIVERSES_DATA[3], name: 'LEFT', fear: 'THE FEAR OF INHERITANCE', insight: 'Some things enter your life before you are born.', transform: 'rotateY(-90deg) translateZ(clamp(140px, 18vw, 220px))' },
    { universe: UNIVERSES_DATA[4], name: 'TOP', fear: 'THE FEAR OF WITNESSING', insight: 'Looking becomes participation.', transform: 'rotateX(90deg) translateZ(clamp(140px, 18vw, 220px))' },
    { universe: UNIVERSES_DATA[5], name: 'BOTTOM', fear: 'THE FEAR OF DESTINY', insight: 'What if the ending already knows your name?', transform: 'rotateX(-90deg) translateZ(clamp(140px, 18vw, 220px))' },
  ];

  const handleFaceClick = (universe: UniverseInfo, index: number) => {
    setActiveFaceIndex(index);
    onSelectUniverse(universe.id);
    soundEngine.playCardDraw();
    onOpenTrailer(universe);
  };

  return (
    <section
      ref={containerRef}
      id="spatial-cube-chamber"
      className="relative min-h-[190vh] w-full bg-[#020204] text-[#E8E6DF] select-none border-t border-white/[0.06]"
    >
      {/* Sticky Fullscreen 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center px-6 sm:px-12 py-12 perspective-[1400px] transform-gpu preserve-3d">
        
        {/* Background Ambient Radial Glow & Celluloid Grain */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(140,20,30,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

        {/* Top Section Header */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-editorial border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span>02 // THE HEXAHEDRON OF DREAD</span>
          </div>

          <div className="flex items-center gap-2 text-white/50">
            <RotateCw className="w-3 h-3 text-red-500 animate-spin" />
            <span>SCROLL OR ROTATE TO EXAMINE THE 6 FACES</span>
          </div>
        </div>

        {/* The 3D Cube Scene */}
        <div className="relative z-20 my-auto flex items-center justify-center preserve-3d w-full max-w-2xl h-[340px] sm:h-[440px]">
          <motion.div
            style={{
              scale: cubeScale,
              rotateX: useTransform(rotX, (v) => v + mouseRotX),
              rotateY: useTransform(rotY, (v) => v + mouseRotY),
            }}
            className="relative w-[280px] sm:w-[360px] md:w-[420px] aspect-video preserve-3d will-change-transform"
          >
            {faces.map((face, idx) => {
              const u = face.universe;
              const poster = u.posterImage || `https://img.youtube.com/vi/${u.trailerYoutubeId}/maxresdefault.jpg`;

              return (
                <div
                  key={face.name}
                  style={{
                    transform: face.transform,
                    backfaceVisibility: 'hidden',
                  }}
                  onClick={() => handleFaceClick(u, idx)}
                  className="group absolute inset-0 rounded-xl bg-[#08080c] border border-white/25 shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer hover:border-red-500/80 transition-all duration-300 flex flex-col justify-between p-5"
                >
                  {/* Poster Backdrop */}
                  <div
                    className="absolute inset-0 bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-115 transition-transform duration-700"
                    style={{ backgroundImage: `url('${poster}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50 pointer-events-none" />
                  <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

                  {/* Face Top Stamp */}
                  <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
                    <span className="px-2 py-0.5 rounded bg-black/80 border border-white/15">
                      FACE 0{idx + 1} // {face.name}
                    </span>
                    <span>{u.year}</span>
                  </div>

                  {/* Face Content */}
                  <div className="relative z-10 mt-auto">
                    <span className="font-mono text-[8px] text-red-400 tracking-widest uppercase block mb-0.5">
                      {face.fear}
                    </span>
                    <h3 className="font-cinzel font-bold text-lg sm:text-xl text-white uppercase tracking-tight group-hover:text-red-300 transition-colors">
                      {u.title}
                    </h3>
                    <p className="font-cinzel italic text-[11px] text-white/80 line-clamp-1 mt-0.5">
                      "{face.insight}"
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-white/[0.08] pt-2">
                      <span className="font-mono text-[8px] text-white/50 uppercase tracking-editorial">
                        CLICK TO ENTER // {u.director}
                      </span>
                      <div className="p-2 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl">
                        <Play className="w-2.5 h-2.5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Case Narrative Insight */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/[0.06] pt-3 font-mono text-[9px] text-white/40 uppercase tracking-editorial">
          <span>THE SIX FACES OF FEAR // CINEDREAD SPATIAL CORE</span>

          <div className="flex items-center gap-4 text-white/60">
            <span>SCROLL TO PROCEED THROUGH THE ARCHIVE PASSAGES</span>
          </div>
        </div>
      </div>
    </section>
  );
};
