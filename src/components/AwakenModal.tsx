import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, Shield, Flame, Sparkles } from "lucide-react";
import { Frame } from "../config/frames";

interface AwakenModalProps {
  isOpen: boolean;
  onClose: () => void;
  frame: Frame | null;
}

export const AwakenModal: React.FC<AwakenModalProps> = ({ isOpen, onClose, frame }) => {
  const [engraving, setEngraving] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen || !frame) return null;

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-lg bg-[#070610]/95 border border-[#8B0E1A]/40 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_50px_rgba(139,14,26,0.35)] z-10 text-[#E8E3DF] overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {isOrdered ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8B0E1A]/20 border border-[#8B0E1A] flex items-center justify-center shadow-[0_0_30px_#8B0E1A] animate-pulse">
                <CheckCircle2 className="w-8 h-8 text-[#E8E3DF]" />
              </div>
              <h3 className="font-cinzel text-2xl text-white font-bold uppercase">Vessel Consecrated</h3>
              <p className="font-inter text-xs text-white/70 max-w-xs leading-relaxed italic">
                The ritual covenant for <span className="text-[#8B0E1A] font-semibold">{frame.title}</span> has been sealed in darkness. The extraction begins at dusk.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOrder} className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E1A] shadow-[0_0_8px_#8B0E1A] animate-pulse" />
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#8B0E1A] font-bold">
                    CONSECRATED ORDER PROTOCOL
                  </span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-bold uppercase">
                  {frame.title}
                </h3>
                <p className="font-inter text-xs text-[#E8E3DF]/60 mt-1 italic font-light">
                  "{frame.subtitle}"
                </p>
              </div>

              {/* Ritual Details Summary */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50 font-mono text-[10px] uppercase">VESSEL VOLUME</span>
                  <span className="font-mono text-white text-[11px] font-semibold">50 ML EXTRACT</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/50 font-mono text-[10px] uppercase">RITUAL STATUS</span>
                  <span className="font-mono text-[#8B0E1A] font-bold text-[11px] uppercase tracking-wider">SEALED AT EXTRACTION SITE</span>
                </div>
                {frame.notes && (
                  <div className="pt-2.5 border-t border-white/[0.06] flex flex-col gap-1.5">
                    <span className="text-white/50 font-mono text-[9px] uppercase tracking-wider">EXTRACTED ACCORDS</span>
                    <div className="flex flex-wrap gap-1.5">
                      {frame.notes.map((n, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md text-[9px] font-mono text-white/80 bg-[#8B0E1A]/15 border border-[#8B0E1A]/30">
                          ◆ {n}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Custom Engraving Input */}
              <div className="space-y-2">
                <label className="block text-xs font-mono tracking-wider uppercase text-white/70">
                  Covenant Inscription / Wearer Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Initials or covenant cipher (e.g. M.W. / MMXXIV)"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  maxLength={24}
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/[0.1] focus:border-[#8B0E1A] text-xs text-white placeholder:text-white/25 focus:outline-none transition-colors"
                />
              </div>

              {/* Warning Guarantee */}
              <div className="flex items-start gap-2 text-[10px] text-white/40 font-mono">
                <Shield className="w-3.5 h-3.5 text-[#8B0E1A] shrink-0 mt-0.5" />
                <span>Wax-sealed obsidian container · Dispatched during waning moon</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#8B0E1A] hover:bg-[#a11020] text-white text-xs font-mono tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-[0_0_25px_rgba(139,14,26,0.6)] active:scale-98 cursor-pointer"
              >
                <Flame className="w-4 h-4" />
                <span>SEAL COVENANT & AWAKEN</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AwakenModal;
