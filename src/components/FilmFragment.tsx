import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Play, ArrowRight } from 'lucide-react';
import { FilmData } from '../data/films';
import { soundEngine } from '../audio/soundEngine';
import { DecryptedText } from './DecryptedText';
import { CleanVideoBackground } from './CleanVideoBackground';

interface FilmFragmentProps {
  film: FilmData;
  index: number;
  onOpenTrailer: (film: FilmData) => void;
}

export const FilmFragment: React.FC<FilmFragmentProps> = ({
  film,
  index,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px 0px 200px 0px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spatial Parallax & Ingestion Physics
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.8, 1], [0.65, 1.0, 1.15, 1.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.8, 1], [0.35, 1.0, 1.0, 0.2]);

  const handleLaunchTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      soundEngine.playImpact();
    } catch {}
    onOpenTrailer(film);
  };

  return (
    <div
      ref={containerRef}
      id={`archive-fragment-${film.id}`}
      className="relative min-h-[100vh] sm:min-h-[120vh] w-full flex items-center justify-center select-none py-16 px-6 sm:px-12 overflow-hidden"
    >
      {/* 3D Atmospheric Original Film Clip Background Layer */}
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 will-change-transform transform-gpu"
      >
        {isInView && (
          <CleanVideoBackground
            youtubeId={film.trailerYoutubeId}
            posterImage={film.posterMedia}
            title={film.title}
          />
        )}

        {/* Cinematic Lateral and Vertical Shadow Vignettes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, ${film.atmosphereColor}80 0%, #000000 85%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none" />
      </motion.div>

      {/* Cinematic Discovery Fragment Stage */}
      <div className="relative z-20 max-w-6xl w-full mx-auto flex flex-col items-center text-center space-y-6">
        
        {/* Discovered Object Telemetry */}
        <div className="inline-flex items-center gap-2 font-mono text-[9px] text-red-500 tracking-[0.45em] uppercase font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
          <DecryptedText
            text={`DISCOVERY // ${film.fragmentDiscovery?.objectName || film.fearMechanism}`}
            speed={35}
            maxIterations={10}
            animateOn="both"
          />
        </div>

        {/* Eerie Visual Hint */}
        {film.fragmentDiscovery?.objectVisual && (
          <p className="font-cinzel italic text-xs sm:text-sm text-white/50 tracking-[0.2em] uppercase max-w-lg">
            "{film.fragmentDiscovery.objectVisual}"
          </p>
        )}

        {/* Monumental Revealed Film Title */}
        <h3 className="font-cinzel font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-[0.9]">
          {film.title}
        </h3>

        {/* Metadata Kicker */}
        <div className="font-mono text-[10px] text-white/60 tracking-[0.3em] uppercase">
          {film.year} · {film.category} · {film.fearMechanism}
        </div>

        {/* Editorial Lore */}
        <p className="font-cinzel italic text-base sm:text-xl text-white/90 leading-relaxed max-w-xl">
          "{film.editorialQuote}"
        </p>

        <p className="font-sans text-xs sm:text-sm text-white/60 max-w-lg leading-relaxed pt-1">
          {film.psychologicalBreakdown}
        </p>

        {/* Theatrical Trailer Button */}
        <div className="pt-4">
          <button
            onClick={handleLaunchTrailer}
            data-cursor-text="WATCH"
            type="button"
            className="group relative z-30 cursor-pointer overflow-hidden rounded-full bg-white/10 hover:bg-red-600 text-white px-8 py-3.5 font-mono text-[9px] tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-3 font-bold pointer-events-auto backdrop-blur-md shadow-2xl"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>ENTER THEATRICAL SCREEN</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
