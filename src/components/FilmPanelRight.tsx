import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShowcaseFilm } from "../data/showcaseFilms";
import { LiquidGlassCard } from "./ui/liquid-weather-glass";
import { Play, ExternalLink, ShieldAlert, Sparkles } from "lucide-react";
import { openOnNetflix } from "../lib/netflix";

interface FilmPanelRightProps {
  film: ShowcaseFilm;
  visible: boolean;
  onOpenTrailer?: (film: ShowcaseFilm) => void;
}

export const FilmPanelRight: React.FC<FilmPanelRightProps> = ({
  film,
  visible,
  onOpenTrailer,
}) => {
  const handleNetflixClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openOnNetflix(film.id, film.title);
  };

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenTrailer?.(film);
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={film.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 14 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[320px] pointer-events-auto"
        >
          <LiquidGlassCard
            borderRadius="20px"
            blurIntensity="lg"
            shadowIntensity="md"
            glowIntensity="sm"
            draggable={false}
            className="p-6 sm:p-7 bg-[#030305]/80 border border-white/[0.1] shadow-2xl space-y-4"
          >
            {/* Telemetry Header */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-red-500 font-bold">
                  FEAR TELEMETRY SIGNAL
                </span>
              </div>
              <p className="font-mono text-[10px] text-white/50 leading-relaxed uppercase tracking-wider">
                {film.fearEvent.telemetryHint}
              </p>
            </div>

            {/* Signal Quote */}
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <p className="font-cinzel text-sm sm:text-base text-red-400 font-bold italic tracking-wide">
                {film.fearEvent.quoteOrSignal}
              </p>
            </div>

            {/* Spatial Environment Description */}
            <div className="text-[11px] font-inter text-white/45 leading-relaxed">
              <span className="text-white/70 font-medium">Spatial Vector: </span>
              {film.environmentDescription}
            </div>

            {/* Action Buttons: Watch Trailer + Watch on Netflix */}
            <div className="pt-2 flex flex-col gap-2.5">
              {/* Watch Trailer */}
              <button
                type="button"
                onClick={handleTrailerClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-mono uppercase tracking-widest font-semibold transition-all duration-300 backdrop-blur-md border border-white/15 hover:border-white/30 cursor-pointer active:scale-95 shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current text-white" />
                <span>Watch Trailer</span>
              </button>

              {/* Watch on Netflix */}
              <button
                type="button"
                onClick={handleNetflixClick}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-mono uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer active:scale-95 shadow-[0_0_18px_rgba(220,38,38,0.6)]"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Watch on Netflix</span>
              </button>
            </div>
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilmPanelRight;
