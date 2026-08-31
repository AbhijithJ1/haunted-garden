import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { UniverseInfo } from '../types';
import { soundEngine } from '../audio/soundEngine';
import { DecryptedText } from './DecryptedText';
import { CleanVideoBackground } from './CleanVideoBackground';
import {
  ConjuringText,
  TheNunText,
  TalkToMeText,
  FromText,
  HereditaryText,
  TarotText,
  ItText,
  WelcomeToDerryText,
  TheRingText,
  SmileText,
  TheExorcistText,
  TheBlackPhoneText,
} from './HorrorTextAnimations';

interface SpatialWorldChapterProps {
  universe: UniverseInfo;
  chapterIndex: number;
  fearMechanism: string;
  editorialQuote: string;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const SpatialWorldChapter: React.FC<SpatialWorldChapterProps> = ({
  universe,
  chapterIndex,
  fearMechanism,
  editorialQuote,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px 0px 200px 0px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // 1. Stage 1 (0.00 - 0.25): Camera pushes forward into portal
  // 2. Stage 2 (0.25 - 0.50): Full-screen surround fear impact
  // 3. Stage 3 (0.45 - 1.00): Revelation title arrives promptly and stays rock-solid
  const portalScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [0.6, 1.0, 1.15, 1.3]
  );

  const portalOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.4, 1.0, 1.0, 0.3]
  );

  // Fear Mechanism Brief Impact (0.12 - 0.48)
  const fearEventOpacity = useTransform(
    scrollYProgress,
    [0.12, 0.22, 0.38, 0.48],
    [0, 1, 1, 0]
  );

  // Revelation Phase (Arrives fast at ~0.40 and STAYS 100% VISIBLE until next section)
  const revealOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.48, 0.9, 1],
    [0, 1, 1, 0.3]
  );

  const revealX = useTransform(
    scrollYProgress,
    [0.35, 0.5, 1],
    [-40, 0, -15]
  );

  const handleLaunchTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      soundEngine.playImpact();
    } catch {}
    onOpenTrailer(universe);
  };

  // Render bespoke fear mechanism overlay visual for all 12 Showcase Worlds
  const renderFearMechanismEvent = () => {
    switch (chapterIndex) {
      case 1:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [AUDIO ANOMALY DETECTED // TWO MATCH STRIKES IN THE DARK]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "CLAP CLAP."
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [SACRED SPACE CONQUERED // VALAK MANIFESTATION IN CLOISTER]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "GOD ENDS HERE."
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [THRESHOLD INITIATED // 90 SECONDS UNTIL SOUL EXTRACTION]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "TALK TO ME. I LET YOU IN."
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [LOCKDOWN PROTOCOL // NOCTURNAL ENTITY AT WINDOWPANE]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "THEY DO NOT RUN. THEY NEVER STOP."
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [SPATIAL ORIENTATION INVERTED // COVEN RITUAL SEAL]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "HAIL KING PAIMON."
              </p>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [ARCANA DEAL SEALED // YOUR FATE IS UNALTERABLE]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "NEVER DRAW FROM AN ACCURSED DECK."
              </p>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [STORM DRAIN ANOMALY // RED BALLOON IN VOID]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "YOU’LL FLOAT TOO."
              </p>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [DERRY MUNICIPAL ARCHIVE // SUBURBAN COMPLICITY]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "IT DOES NOT SLEEP. IT WAITS."
              </p>
            </div>
          </div>
        );
      case 9:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [CATHODE RAY INTERFERENCE // SEVEN DAYS REMAINING]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "BEFORE YOU DIE, YOU SEE THE RING."
              </p>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [UNNATURAL JAW RIGIDITY // PARASITIC WITNESS]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "IT LOOKS BACK AT YOU."
              </p>
            </div>
          </div>
        );
      case 11:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [GEORGETOWN STREETLIGHT // COLD BEDROOM BREATH]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "THE POWER OF CHRIST COMPELS YOU."
              </p>
            </div>
          </div>
        );
      case 12:
        return (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-2">
              <span className="font-mono text-[11px] text-red-500 tracking-[0.5em] uppercase font-black animate-pulse">
                [DEAD WIRE RESONANCE // ROTARY BELL FROM VOID]
              </span>
              <p className="font-cinzel text-xl sm:text-2xl text-white/90 font-black tracking-widest uppercase">
                "DON’T HANG UP. HE’S COMING."
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render bespoke typography for the revelation phase
  const renderRevealedTitle = () => {
    switch (chapterIndex) {
      case 1:
        return <ConjuringText text={universe.title} />;
      case 2:
        return <TheNunText text={universe.title} />;
      case 3:
        return <TalkToMeText text={universe.title} />;
      case 4:
        return <FromText text={universe.title} />;
      case 5:
        return <HereditaryText text={universe.title} />;
      case 6:
        return <TarotText text={universe.title} />;
      case 7:
        return <ItText text={universe.title} />;
      case 8:
        return <WelcomeToDerryText text={universe.title} />;
      case 9:
        return <TheRingText text={universe.title} />;
      case 10:
        return <SmileText text={universe.title} />;
      case 11:
        return <TheExorcistText text={universe.title} />;
      case 12:
        return <TheBlackPhoneText text={universe.title} />;
      default:
        return <span>{universe.title}</span>;
    }
  };

  return (
    <section
      ref={containerRef}
      id={`showcase-world-${chapterIndex < 10 ? `0${chapterIndex}` : chapterIndex}`}
      className="relative min-h-[125vh] w-full bg-black text-[#E8E6DF] overflow-hidden select-none"
    >
      {/* Sticky 100vh Spatial Camera Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-16 transform-gpu perspective-[1200px]">
        
        {/* 1. SPATIAL CAMERA TUNNELING PORTAL */}
        <motion.div
          style={{
            scale: portalScale,
            opacity: portalOpacity,
          }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-0 will-change-transform transform-gpu"
        >
          {isInView && (
            <CleanVideoBackground
              youtubeId={universe.trailerYoutubeId}
              posterImage={universe.posterImage}
              title={universe.title}
            />
          )}

          {/* Natural lateral vignette for cinematic framing */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/35 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
        </motion.div>

        {/* 2. STAGE 2: VISCERAL FEAR MECHANISM EVENT */}
        <motion.div
          style={{ opacity: fearEventOpacity }}
          className="absolute inset-0 z-20 pointer-events-none will-change-transform transform-gpu"
        >
          {renderFearMechanismEvent()}
        </motion.div>

        {/* 3. STAGE 3: REVELATION & THEATRICAL AFTERMATH */}
        <motion.div
          style={{ x: revealX, opacity: revealOpacity }}
          className="relative z-30 max-w-2xl lg:max-w-3xl text-left space-y-6 pointer-events-auto will-change-transform transform-gpu"
        >
          {/* Decrypted Telemetry Header */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-red-500 tracking-[0.4em] uppercase font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <DecryptedText
              text={`SHOWCASE ${chapterIndex < 10 ? `0${chapterIndex}` : chapterIndex} // ${fearMechanism}`}
              speed={35}
              maxIterations={10}
              animateOn="both"
            />
          </div>

          {/* Monumental Revealed Film Title */}
          <h2 className="font-cinzel font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-[0.9] overflow-visible">
            {renderRevealedTitle()}
          </h2>

          {/* Psychological Fear Mechanism Lore Quote */}
          <p className="font-cinzel italic text-base sm:text-xl text-white/90 leading-relaxed border-l-2 border-red-600 pl-4 max-w-lg">
            "{editorialQuote}"
          </p>

          {/* Theatrical Cinema Screen Portal */}
          <div className="pt-2 relative z-50">
            <button
              onClick={handleLaunchTrailer}
              data-cursor-text="WATCH"
              type="button"
              className="group relative z-50 cursor-pointer overflow-hidden rounded-full bg-white text-black hover:bg-red-600 hover:text-white px-8 py-4 font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-3 font-bold pointer-events-auto shadow-2xl"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>ENTER THEATRICAL SCREEN</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
