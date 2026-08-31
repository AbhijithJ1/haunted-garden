import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShowcaseFilm } from "../data/showcaseFilms";
import { LiquidGlassCard } from "./ui/liquid-weather-glass";

interface FilmPanelLeftProps {
  film: ShowcaseFilm;
  visible: boolean;
}

export const FilmPanelLeft: React.FC<FilmPanelLeftProps> = ({ film, visible }) => {
  const orderStr = film.order < 10 ? `0${film.order}` : `${film.order}`;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={film.id}
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[340px] pointer-events-auto"
        >
          <LiquidGlassCard
            borderRadius="20px"
            blurIntensity="lg"
            shadowIntensity="md"
            glowIntensity="sm"
            draggable={false}
            className="p-6 sm:p-7 bg-[#030305]/80 border border-white/[0.1] shadow-2xl"
          >
            {/* Realm Header */}
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#dc2626]" />
              <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.32em] uppercase text-red-500 font-bold">
                REALM {orderStr} / 12
              </p>
              <span className="text-[10px] font-mono text-white/40 ml-auto font-medium">
                {film.year} · DIR. {film.director.toUpperCase()}
              </span>
            </div>

            {/* Film Title */}
            <h2 className="font-cinzel text-2xl sm:text-3xl font-black text-[#E8E3DF] tracking-tight uppercase leading-[1.08] mb-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {film.title}
            </h2>

            {/* Fear Mechanism Tagline */}
            <div className="inline-block px-2.5 py-1 rounded-md bg-red-950/40 border border-red-800/30 text-[9px] font-mono tracking-wider uppercase text-red-400 font-semibold mb-3">
              {film.fearMechanism}
            </div>

            {/* Psychological Dread Breakdown */}
            <p className="font-inter text-xs leading-[1.7] text-[#E8E3DF]/75 font-light italic border-l-2 border-red-700/50 pl-3 mb-3">
              "{film.psychologicalBreakdown}"
            </p>

            {/* Editorial Quote */}
            <p className="font-inter text-[11px] leading-relaxed text-white/45 font-light">
              {film.editorialQuote}
            </p>
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilmPanelLeft;
