import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, MapPin, Compass, FileText } from "lucide-react";
import { Frame } from "../config/frames";

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  frame: Frame | null;
}

export const DossierModal: React.FC<DossierModalProps> = ({ isOpen, onClose, frame }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen || !frame) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-2xl bg-[#06060c] border border-white/[0.1] rounded-2xl p-6 sm:p-9 shadow-[0_30px_90px_rgba(0,0,0,0.95)] z-10 text-[#E8E3DF] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="space-y-1.5 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E1A]" />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#8B0E1A] font-semibold">
                CLASSIFIED DOSSIER // RECORD {frame.chapterNumber}
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl text-white font-bold tracking-wide uppercase">
              {frame.title}
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-mono text-white/45">
              <MapPin className="w-3.5 h-3.5 text-[#8B0E1A]" />
              <span>{frame.location}</span>
            </div>
          </div>

          {/* Body Content */}
          <div className="space-y-5 text-sm">
            {/* Historical Incident */}
            <div className="space-y-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 font-semibold">
                DOCUMENTED INCIDENT
              </span>
              <p className="font-inter text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                {frame.historicalIncident}
              </p>
            </div>

            {/* Field Observation Transcript */}
            <div className="p-4 rounded-xl bg-[#8B0E1A]/[0.06] border border-[#8B0E1A]/20 space-y-1">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#8B0E1A] font-bold">
                SURVIVOR TESTIMONY / FIELD NOTE
              </span>
              <p className="font-inter text-xs text-white/80 italic font-light leading-relaxed">
                "{frame.fieldObservation}"
              </p>
            </div>

            {/* Sensory Accords Profile */}
            {frame.sensoryNotes && (
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 font-semibold">
                  SENSORY MARKERS IDENTIFIED AT SITE
                </span>
                <div className="flex flex-wrap gap-2">
                  {frame.sensoryNotes.map((note, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-mono text-white/70 bg-white/[0.03] border border-white/[0.08]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <span className="font-mono text-[9px] text-white/30 tracking-widest uppercase">
              THE HAUNTED GARDEN ARCHIVE
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full border border-white/[0.1] hover:border-white/30 text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DossierModal;
