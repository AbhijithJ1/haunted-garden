import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { Play } from 'lucide-react';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';
import { useMousePosition } from '../hooks/useMousePosition';

interface ContinuousFilmJourneyProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const ContinuousFilmJourney: React.FC<ContinuousFilmJourneyProps> = ({
  onOpenTrailer,
}) => {
  const mousePos = useMousePosition();
  const mouseX = (mousePos.x - 0.5) * 16;
  const mouseY = (mousePos.y - 0.5) * 12;

  // ============================================================
  // REALM 01: THE CONJURING (01 — ENTER THE HOUSE // THE FEAR OF INVASION)
  // Architecture: Narrow, domestic, dark, vertical depth
  // ============================================================
  const conjuringRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: conjuringScroll } = useScroll({
    target: conjuringRef,
    offset: ['start end', 'end start'],
  });
  const conjuringProgress = useSpring(conjuringScroll, { stiffness: 80, damping: 24 });

  const conjuringScale = useTransform(conjuringProgress, [0.1, 0.45, 0.75, 0.95], [0.65, 1.0, 1.25, 1.6]);
  const conjuringZ = useTransform(conjuringProgress, [0.1, 0.5, 0.9], [-200, 40, 280]);
  const conjuringIrisClip = useTransform(
    conjuringProgress,
    [0.1, 0.45, 0.75, 0.95],
    ['circle(24% at 50% 50%)', 'circle(70% at 50% 50%)', 'circle(120% at 50% 50%)', 'circle(15% at 50% 50%)']
  );
  const conjuringInsightOpacity = useTransform(conjuringProgress, [0.25, 0.45, 0.7], [0, 1, 0]);

  // ============================================================
  // REALM 02: TALK TO ME (02 — OPEN YOURSELF // THE FEAR OF SURRENDER)
  // Architecture: Unstable, intimate, distorted, close to camera
  // ============================================================
  const talkRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: talkScroll } = useScroll({
    target: talkRef,
    offset: ['start end', 'end start'],
  });
  const talkProgress = useSpring(talkScroll, { stiffness: 80, damping: 24 });

  const talkScale = useTransform(talkProgress, [0.1, 0.45, 0.75, 0.95], [0.75, 1.05, 1.2, 1.45]);
  const talkWord1_X = useTransform(talkProgress, [0.25, 0.55, 0.85], [0, -160, -480]);
  const talkWord1_Z = useTransform(talkProgress, [0.25, 0.55, 0.85], [80, 280, 600]);
  const talkWord2_X = useTransform(talkProgress, [0.25, 0.55, 0.85], [0, 160, 480]);
  const talkWord2_Z = useTransform(talkProgress, [0.25, 0.55, 0.85], [100, 300, 620]);
  const talkWord3_Y = useTransform(talkProgress, [0.25, 0.55, 0.85], [0, 80, 200]);
  const talkWord3_Z = useTransform(talkProgress, [0.25, 0.55, 0.85], [120, 340, 660]);
  const talkInsightOpacity = useTransform(talkProgress, [0.25, 0.45, 0.7], [0, 1, 0]);
  const talkDoorwayClip = useTransform(
    talkProgress,
    [0.75, 0.95],
    ['inset(0% 0% 0% 0%)', 'inset(0% 42% 0% 42% round 4px)']
  );

  // ============================================================
  // REALM 03: FROM (03 — BECOME TRAPPED // THE FEAR OF NO ESCAPE)
  // Architecture: Wide, empty, forward depth, distant darkness
  // ============================================================
  const fromRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: fromScroll } = useScroll({
    target: fromRef,
    offset: ['start end', 'end start'],
  });
  const fromProgress = useSpring(fromScroll, { stiffness: 80, damping: 24 });

  const fromDoorwayOpen = useTransform(
    fromProgress,
    [0.1, 0.45, 0.8, 0.95],
    ['inset(0% 40% 0% 40% round 4px)', 'inset(0% 0% 0% 0% round 0px)', 'inset(0% 0% 0% 0% round 0px)', 'inset(18% 28% 18% 28% round 12px)']
  );
  const fromScale = useTransform(fromProgress, [0.1, 0.5, 0.8, 0.95], [0.85, 1.05, 1.25, 0.7]);
  const fromZ = useTransform(fromProgress, [0.1, 0.5, 0.8, 0.95], [-150, 40, 220, -120]);
  const fromInsightOpacity = useTransform(fromProgress, [0.25, 0.45, 0.7], [0, 1, 0]);

  // ============================================================
  // REALM 04: HEREDITARY (04 — DISCOVER IT WAS INHERITED // THE FEAR OF INHERITANCE)
  // Architecture: Miniature, controlled, layered, gradually overwhelming
  // ============================================================
  const hereditaryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hereditaryScroll } = useScroll({
    target: hereditaryRef,
    offset: ['start end', 'end start'],
  });
  const hereditaryProgress = useSpring(hereditaryScroll, { stiffness: 80, damping: 24 });

  const hereditaryScale = useTransform(hereditaryProgress, [0.1, 0.45, 0.75, 0.95], [0.55, 1.0, 1.3, 1.5]);
  const hereditaryZ = useTransform(hereditaryProgress, [0.1, 0.45, 0.75, 0.95], [-240, 20, 260, 420]);
  const hereditaryRotateX = useTransform(hereditaryProgress, [0.1, 0.5, 0.9], [10, 0, -4]);
  const hereditaryDecayOpacity = useTransform(hereditaryProgress, [0.75, 0.95], [0, 0.9]);
  const hereditaryInsightOpacity = useTransform(hereditaryProgress, [0.25, 0.45, 0.7], [0, 1, 0]);

  // ============================================================
  // REALM 05: SINISTER (05 — REALIZE YOU WERE WATCHING TOO // THE FEAR OF WITNESSING)
  // Architecture: Projection, darkness, narrow beam, recorded memory
  // ============================================================
  const sinisterRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sinisterScroll } = useScroll({
    target: sinisterRef,
    offset: ['start end', 'end start'],
  });
  const sinisterProgress = useSpring(sinisterScroll, { stiffness: 80, damping: 24 });

  const sinisterConeScale = useTransform(sinisterProgress, [0.1, 0.45, 0.75, 0.95], [0.65, 1.0, 1.35, 1.6]);
  const sinisterConeOpacity = useTransform(sinisterProgress, [0.1, 0.4, 0.8, 0.95], [0.2, 0.7, 0.1, 0]);
  const sinisterZ = useTransform(sinisterProgress, [0.1, 0.45, 0.75, 0.95], [-220, 0, 240, 450]);
  const sinisterInsightOpacity = useTransform(sinisterProgress, [0.25, 0.45, 0.7], [0, 1, 0]);

  // ============================================================
  // REALM 06: TAROT (06 — ACCEPT THE ENDING // THE FEAR OF DESTINY)
  // Architecture: Geometric, physical planes, fate closing
  // ============================================================
  const tarotRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tarotScroll } = useScroll({
    target: tarotRef,
    offset: ['start end', 'end start'],
  });
  const tarotProgress = useSpring(tarotScroll, { stiffness: 80, damping: 24 });

  const tarotCardRotateY = useTransform(tarotProgress, [0.1, 0.45, 0.75], [45, 90, 0]);
  const tarotScale = useTransform(tarotProgress, [0.1, 0.45, 0.75, 0.95], [0.75, 1.0, 1.25, 0.3]);
  const tarotZ = useTransform(tarotProgress, [0.1, 0.45, 0.75, 0.95], [-120, 40, 220, -300]);
  const tarotCollapseRotate = useTransform(tarotProgress, [0.75, 0.95], [0, 180]);
  const tarotInsightOpacity = useTransform(tarotProgress, [0.25, 0.45, 0.7], [0, 1, 0]);

  const [conjuring, talkToMe, from, hereditary, sinister, tarot] = UNIVERSES_DATA;

  return (
    <div id="continuous-journey" className="relative w-full bg-[#020204] text-[#E8E6DF] overflow-hidden">
      
      {/* ============================================================
          01 — THE CONJURING PASSAGE (01 ENTER THE HOUSE // THE FEAR OF INVASION)
          ============================================================ */}
      <div
        ref={conjuringRef}
        id="chapter-conjuring"
        className="relative h-[160vh] w-full flex items-center justify-center perspective-[1200px] border-t border-white/[0.04]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center preserve-3d">
          
          <motion.div
            style={{
              scale: conjuringScale,
              z: conjuringZ,
              clipPath: conjuringIrisClip,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            onClick={() => onOpenTrailer(conjuring)}
            className="group relative w-full max-w-5xl aspect-video rounded-xl bg-black border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer will-change-transform"
          >
            <div
              className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `url('${conjuring.posterImage || `https://img.youtube.com/vi/${conjuring.trailerYoutubeId}/maxresdefault.jpg`}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

            {/* Chilling Case Insight Overlay (Fades as you enter) */}
            <motion.div
              style={{ opacity: conjuringInsightOpacity }}
              className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/50 tracking-editorial uppercase">
                <span className="text-red-500 font-bold">CASE 01 / 06 • 01 ENTER THE HOUSE</span>
                <span>JAMES WAN (2013)</span>
              </div>

              <div className="max-w-xl">
                <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF INVASION
                </span>
                <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
                  THE CONJURING
                </h2>
                <p className="font-cinzel italic text-base sm:text-xl text-white/90 mt-2 border-l border-red-500 pl-3">
                  "Home is supposed to protect you."
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <span>VERTICAL DEPTH • DOMESTIC SANCTUARY DESTROYED</span>
                <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl pointer-events-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          02 — TALK TO ME PASSAGE (02 OPEN YOURSELF // THE FEAR OF SURRENDER)
          ============================================================ */}
      <div
        ref={talkRef}
        id="chapter-talktome"
        className="relative h-[160vh] w-full flex items-center justify-center perspective-[1200px] border-t border-white/[0.04]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center preserve-3d">
          
          <motion.div
            style={{
              scale: talkScale,
              clipPath: talkDoorwayClip,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            onClick={() => onOpenTrailer(talkToMe)}
            className="group relative w-full max-w-5xl aspect-video rounded-xl bg-black border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer preserve-3d will-change-transform"
          >
            <div
              className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `url('${talkToMe.posterImage || `https://img.youtube.com/vi/${talkToMe.trailerYoutubeId}/maxresdefault.jpg`}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

            {/* Layered Words Splitting Across Depth */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none preserve-3d z-20">
              <motion.span
                style={{ x: talkWord1_X, z: talkWord1_Z }}
                className="font-cinzel font-black text-6xl sm:text-8xl text-white tracking-widest uppercase drop-shadow-2xl"
              >
                TALK
              </motion.span>
              <motion.span
                style={{ x: talkWord2_X, z: talkWord2_Z }}
                className="font-cinzel font-black text-5xl sm:text-7xl text-cyan-300 tracking-widest uppercase drop-shadow-2xl"
              >
                TO
              </motion.span>
              <motion.span
                style={{ y: talkWord3_Y, z: talkWord3_Z }}
                className="font-cinzel font-black text-6xl sm:text-8xl text-white tracking-widest uppercase drop-shadow-2xl"
              >
                ME
              </motion.span>
            </div>

            {/* Meaningful Case Insight */}
            <motion.div
              style={{ opacity: talkInsightOpacity }}
              className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-30 pointer-events-none"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/50 tracking-editorial uppercase">
                <span className="text-red-500 font-bold">CASE 02 / 06 • 02 OPEN YOURSELF</span>
                <span>A24 • 2023</span>
              </div>

              <div className="max-w-xl">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF SURRENDER
                </span>
                <p className="font-cinzel italic text-base sm:text-xl text-white/90 border-l border-cyan-400 pl-3">
                  "What happens when you willingly open the door?"
                </p>
              </div>

              <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <span>UNSTABLE PERSPECTIVE • THE BOUNDARY OF MINDS DISSOLVES</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          03 — FROM PASSAGE (03 BECOME TRAPPED // THE FEAR OF NO ESCAPE)
          ============================================================ */}
      <div
        ref={fromRef}
        id="chapter-from"
        className="relative h-[160vh] w-full flex items-center justify-center perspective-[1200px] border-t border-white/[0.04]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center preserve-3d">
          
          <motion.div
            style={{
              scale: fromScale,
              z: fromZ,
              clipPath: fromDoorwayOpen,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            onClick={() => onOpenTrailer(from)}
            className="group relative w-full max-w-5xl aspect-video rounded-xl bg-black border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer will-change-transform"
          >
            <div
              className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `url('${from.posterImage || `https://img.youtube.com/vi/${from.trailerYoutubeId}/maxresdefault.jpg`}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

            <motion.div
              style={{ opacity: fromInsightOpacity }}
              className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/50 tracking-editorial uppercase">
                <span className="text-red-500 font-bold">CASE 03 / 06 • 03 BECOME TRAPPED</span>
                <span>MGM+ • 2022–PRESENT</span>
              </div>

              <div className="max-w-xl">
                <span className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF NO ESCAPE
                </span>
                <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
                  FROM
                </h2>
                <p className="font-cinzel italic text-base sm:text-xl text-white/90 mt-2 border-l border-yellow-500 pl-3">
                  "The world becomes the prison."
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <span>FORWARD DEPTH • EVERY ROAD LOOPS STRAIGHT BACK</span>
                <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl pointer-events-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          04 — HEREDITARY PASSAGE (04 DISCOVER IT WAS INHERITED // THE FEAR OF INHERITANCE)
          ============================================================ */}
      <div
        ref={hereditaryRef}
        id="chapter-hereditary"
        className="relative h-[160vh] w-full flex items-center justify-center perspective-[1200px] border-t border-white/[0.04]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center preserve-3d">
          
          <motion.div
            style={{
              scale: hereditaryScale,
              z: hereditaryZ,
              rotateX: hereditaryRotateX,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            onClick={() => onOpenTrailer(hereditary)}
            className="group relative w-full max-w-5xl aspect-video rounded-xl bg-black border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer will-change-transform"
          >
            <div
              className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `url('${hereditary.posterImage || `https://img.youtube.com/vi/${hereditary.trailerYoutubeId}/maxresdefault.jpg`}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

            <motion.div
              style={{ opacity: hereditaryDecayOpacity }}
              className="absolute inset-0 bg-red-950/40 mix-blend-color-burn pointer-events-none"
            />

            <motion.div
              style={{ opacity: hereditaryInsightOpacity }}
              className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/50 tracking-editorial uppercase">
                <span className="text-red-500 font-bold">CASE 04 / 06 • 04 DISCOVER IT WAS INHERITED</span>
                <span>ARI ASTER (2018) • A24</span>
              </div>

              <div className="max-w-xl">
                <span className="font-mono text-[10px] text-orange-500 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF INHERITANCE
                </span>
                <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
                  HEREDITARY
                </h2>
                <p className="font-cinzel italic text-base sm:text-xl text-white/90 mt-2 border-l border-orange-500 pl-3">
                  "Some things enter your life before you are born."
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <span>MINIATURE DOLLHOUSE • ZERO HUMAN AGENCY</span>
                <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl pointer-events-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          05 — SINISTER PASSAGE (05 REALIZE YOU WERE WATCHING TOO // THE FEAR OF WITNESSING)
          ============================================================ */}
      <div
        ref={sinisterRef}
        id="chapter-sinister"
        className="relative h-[160vh] w-full flex items-center justify-center perspective-[1200px] border-t border-white/[0.04]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center preserve-3d">
          
          <motion.div
            style={{
              scale: sinisterConeScale,
              opacity: sinisterConeOpacity,
            }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.45)_0%,transparent_65%)] pointer-events-none z-20"
          />

          <motion.div
            style={{
              z: sinisterZ,
              scale: sinisterConeScale,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            onClick={() => onOpenTrailer(sinister)}
            className="group relative w-full max-w-5xl aspect-video rounded-xl bg-black border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer will-change-transform"
          >
            <div
              className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `url('${sinister.posterImage || `https://img.youtube.com/vi/${sinister.trailerYoutubeId}/maxresdefault.jpg`}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

            <motion.div
              style={{ opacity: sinisterInsightOpacity }}
              className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/50 tracking-editorial uppercase">
                <span className="text-red-500 font-bold">CASE 05 / 06 • 05 REALIZE YOU WERE WATCHING TOO</span>
                <span>SCOTT DERRICKSON (2012) • BLUMHOUSE</span>
              </div>

              <div className="max-w-xl">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF WITNESSING
                </span>
                <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
                  SINISTER
                </h2>
                <p className="font-cinzel italic text-base sm:text-xl text-white/90 mt-2 border-l border-emerald-400 pl-3">
                  "Looking becomes participation."
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <span>PROJECTOR LIGHT BEAM • THE ENTITY PROPAGATES VIA VIEWING</span>
                <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl pointer-events-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================
          06 — TAROT PASSAGE (06 ACCEPT THE ENDING // THE FEAR OF DESTINY)
          ============================================================ */}
      <div
        ref={tarotRef}
        id="chapter-tarot"
        className="relative h-[160vh] w-full flex items-center justify-center perspective-[1200px] border-t border-white/[0.04]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center preserve-3d">
          
          <motion.div
            style={{
              scale: tarotScale,
              z: tarotZ,
              rotateY: tarotCardRotateY,
              rotateZ: tarotCollapseRotate,
              transform: `translate3d(${mouseX}px, ${mouseY}px, 0)`,
            }}
            onClick={() => onOpenTrailer(tarot)}
            className="group relative w-full max-w-5xl aspect-video rounded-xl bg-black border border-white/20 shadow-[0_30px_100px_rgba(0,0,0,0.95)] overflow-hidden cursor-pointer will-change-transform"
          >
            <div
              className="w-full h-full bg-cover bg-center filter grayscale contrast-125 brightness-90 group-hover:scale-110 transition-transform duration-700"
              style={{
                backgroundImage: `url('${tarot.posterImage || `https://img.youtube.com/vi/${tarot.trailerYoutubeId}/maxresdefault.jpg`}')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

            <motion.div
              style={{ opacity: tarotInsightOpacity }}
              className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between font-mono text-[9px] text-white/50 tracking-editorial uppercase">
                <span className="text-red-500 font-bold">CASE 06 / 06 • 06 ACCEPT THE ENDING</span>
                <span>SONY PICTURES (2024)</span>
              </div>

              <div className="max-w-xl">
                <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF DESTINY
                </span>
                <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white uppercase tracking-tight">
                  TAROT
                </h2>
                <p className="font-cinzel italic text-base sm:text-xl text-white/90 mt-2 border-l border-purple-400 pl-3">
                  "What if the ending already knows your name?"
                </p>
              </div>

              <div className="flex items-center justify-between font-mono text-[9px] text-white/40 uppercase tracking-widest">
                <span>GEOMETRIC PLANES • THE INEVITABILITY OF FATE</span>
                <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl pointer-events-auto">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
