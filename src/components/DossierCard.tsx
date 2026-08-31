import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Frame } from "../config/frames";
import { FileText, MapPin } from "lucide-react";

interface DossierCardProps {
  frame: Frame;
  visible: boolean;
  onExamine?: (frame: Frame) => void;
}

export const DossierCard: React.FC<DossierCardProps> = ({
  frame,
  visible,
  onExamine,
}) => {
  if (frame.id === "entry" || frame.id === "loop-complete") return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[310px] pointer-events-auto"
        >
          {/* Translucent Frosted Glass — NOT Solid Black */}
          <div className="p-6 rounded-2xl bg-black/35 backdrop-blur-xl border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-3.5">
            {/* Header Tag */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#8B0E1A] font-bold">
                RECORD {frame.chapterNumber}
              </span>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                FIELD ARCHIVE
              </span>
            </div>

            {/* Title & Location */}
            <div>
              <h3 className="font-cinzel text-lg text-white font-bold tracking-wide">
                {frame.title}
              </h3>
              <p className="font-mono text-[9px] text-white/50 uppercase tracking-widest mt-0.5">
                {frame.location}
              </p>
            </div>

            {/* Sensory Accords */}
            {frame.sensoryNotes && (
              <div className="space-y-1.5 pt-2 border-t border-white/[0.08]">
                <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
                  SENSORY NOTES
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {frame.sensoryNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded text-[9px] font-mono text-white/80 bg-white/[0.06] border border-white/[0.1]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Field Observation Quote */}
            <div className="p-3 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#8B0E1A] block mb-1 font-bold">
                FIELD OBSERVATION
              </span>
              <p className="font-inter text-xs text-white/80 italic leading-relaxed font-light">
                "{frame.fieldObservation}"
              </p>
            </div>

            {/* Action */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => onExamine?.(frame)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-white/[0.15] hover:border-[#8B0E1A] bg-black/40 hover:bg-[#8B0E1A]/20 text-white text-xs font-mono tracking-[0.2em] uppercase font-semibold transition-all duration-300 cursor-pointer active:scale-98"
              >
                <FileText className="w-3.5 h-3.5 text-[#8B0E1A]" />
                <span>Examine Dossier</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DossierCard;
