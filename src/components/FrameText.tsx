import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Frame } from "../config/frames";

interface FrameTextProps {
  frame: Frame;
  visible: boolean;
}

export const FrameText: React.FC<FrameTextProps> = ({ frame, visible }) => {
  if (frame.id === "entry" || frame.id === "loop-complete") return null;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={frame.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-[320px] pointer-events-auto"
        >
          {/* Translucent Frosted Glass — NOT Solid Black */}
          <div className="p-6 sm:p-7 rounded-2xl bg-black/35 backdrop-blur-xl border border-white/[0.12] shadow-[0_15px_35px_rgba(0,0,0,0.5)] space-y-3.5">
            {/* Chapter Tag */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E1A]" />
              <p className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#8B0E1A] font-semibold">
                CHAPTER {frame.chapterNumber}
              </p>
            </div>

            {/* Title in Cinzel */}
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight uppercase">
              {frame.title}
            </h2>

            {/* Subtitle Lore */}
            <p className="font-inter text-xs text-white/70 font-light italic leading-relaxed border-l border-[#8B0E1A]/60 pl-3">
              "{frame.subtitle}"
            </p>

            {/* Historical Incident Excerpt */}
            <div className="pt-2.5 border-t border-white/[0.08] space-y-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40">
                RECORDED INCIDENT
              </span>
              <p className="font-inter text-xs text-white/80 font-light leading-relaxed">
                {frame.historicalIncident}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FrameText;
