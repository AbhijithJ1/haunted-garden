import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Frame } from "../config/frames";
import { LiquidGlassCard } from "./ui/liquid-weather-glass";
import { Sparkles, ArrowRight, ShieldAlert } from "lucide-react";

interface AwakenCardProps {
  frame: Frame;
  visible: boolean;
  onAwaken?: (frame: Frame) => void;
  onInvestigate?: (frame: Frame) => void;
}

export const AwakenCard: React.FC<AwakenCardProps> = ({
  frame,
  visible,
  onAwaken,
  onInvestigate,
}) => {
  // If entry or loop-complete, no right awaken card needed
  if (frame.id === "entry" || frame.id === "loop-complete") return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, x: 28, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 16, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[310px] pointer-events-auto"
        >
          <LiquidGlassCard
            borderRadius="24px"
            blurIntensity="lg"
            shadowIntensity="md"
            glowIntensity="sm"
            draggable={false}
            className="p-6 sm:p-7 bg-[#030308]/80 border border-white/[0.1] shadow-2xl backdrop-blur-2xl"
          >
            {/* Entity Header */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E1A] animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#8B0E1A] font-bold">
                  ENTITY {frame.entityNumber || "SPECIES"}
                </span>
              </div>
              <span className="font-mono text-[9px] text-[#E8E3DF]/40 uppercase tracking-widest">
                50 ML VESSEL
              </span>
            </div>

            {/* Title */}
            <h3 className="font-cinzel text-xl text-[#E8E3DF] font-bold tracking-wide mb-1 leading-snug">
              {frame.title}
            </h3>

            {/* Essence Note */}
            {frame.essenceNote && (
              <p className="font-mono text-[9px] text-white/45 uppercase tracking-wider mb-4">
                {frame.essenceNote}
              </p>
            )}

            {/* Notes List */}
            {frame.notes && frame.notes.length > 0 && (
              <div className="mb-5 space-y-2 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <p className="text-[8px] font-mono tracking-[0.25em] text-[#8B0E1A] uppercase font-bold">
                  RITUAL ACCORDS
                </p>
                <ul className="space-y-1 text-xs text-[#E8E3DF]/80 font-light">
                  {frame.notes.map((note, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[#8B0E1A] text-[8px]">◆</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Status / Consecration notice */}
            <div className="mb-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[9px] font-mono">
              <span className="text-white/40 uppercase tracking-widest">EXTRACTION</span>
              <span className="text-[#8B0E1A] font-semibold tracking-widest uppercase">CONSECRATED</span>
            </div>

            {/* Primary CTA Button — NO PRICE */}
            <button
              onClick={() => onAwaken?.(frame)}
              type="button"
              className="group w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full border border-[#8B0E1A] bg-[#8B0E1A]/20 hover:bg-[#8B0E1A] text-white text-xs font-mono tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_0_20px_rgba(139,14,26,0.35)] hover:shadow-[0_0_30px_rgba(139,14,26,0.6)] active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8B0E1A] group-hover:text-white group-hover:rotate-12 transition-all" />
              <span>Awaken Entity</span>
            </button>

            {/* Secondary CTA Link */}
            {frame.ctaSecondary && (
              <div className="mt-3 text-center">
                <button
                  onClick={() => onInvestigate?.(frame)}
                  type="button"
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#E8E3DF]/50 hover:text-white transition-colors tracking-widest cursor-pointer"
                >
                  <span>{frame.ctaSecondary}</span>
                  <ArrowRight className="w-3 h-3 text-[#8B0E1A]" />
                </button>
              </div>
            )}
          </LiquidGlassCard>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AwakenCard;
