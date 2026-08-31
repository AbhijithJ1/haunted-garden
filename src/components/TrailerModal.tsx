import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Volume2, ExternalLink } from 'lucide-react';
import { UniverseInfo } from '../types';
import { openOnNetflix } from '../lib/netflix';

interface TrailerModalProps {
  universe: UniverseInfo | null;
  onClose: () => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ universe, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (universe) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [universe, onClose]);

  return (
    <AnimatePresence>
      {universe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[10000] flex flex-col bg-black text-white overflow-hidden select-none"
        >
          {/* Cinema Theater Top Bar */}
          <div className="flex-shrink-0 w-full px-4 sm:px-12 py-3 sm:py-4 flex items-center justify-between bg-gradient-to-b from-black to-transparent border-b border-white/[0.08]">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_12px_rgba(220,38,38,0.9)]" />
              <span className="font-cinzel font-black text-xs sm:text-sm tracking-widest uppercase truncate max-w-[160px] sm:max-w-none">
                {universe.title}
              </span>
              {/* Year & Director — only show if present and don't overflow */}
              <span className="hidden sm:inline flex-shrink-0 font-mono text-[9px] text-white/40 uppercase tracking-widest border-l border-white/20 pl-3 whitespace-nowrap">
                {universe.year}
                {universe.director && ` · DIR. ${universe.director}`}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  openOnNetflix(universe.id, universe.title);
                }}
                className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-white bg-red-600 hover:bg-red-500 uppercase tracking-widest px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(220,38,38,0.6)] font-bold"
              >
                <ExternalLink className="w-3 h-3" />
                <span>WATCH ON NETFLIX</span>
              </button>

              <button
                onClick={onClose}
                data-cursor-text="CLOSE"
                className="flex-shrink-0 group flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] text-white/70 hover:text-white uppercase tracking-widest bg-white/10 hover:bg-red-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 cursor-pointer ml-1"
              >
                <span className="hidden sm:inline">EXIT</span>
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>

          {/* Fullscreen 16:9 Cinema Projection Stage */}
          <div className="relative flex-1 w-full flex items-center justify-center bg-black overflow-hidden min-h-0">
            <iframe
              key={universe.trailerYoutubeId}
              src={`https://www.youtube-nocookie.com/embed/${universe.trailerYoutubeId}?autoplay=1&mute=0&controls=1&loop=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&cc_load_policy=0`}
              title={`${universe.title} — Official Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Cinema Theater Bottom Info Bar */}
          <div className="flex-shrink-0 w-full px-4 sm:px-12 py-2.5 sm:py-3 flex items-center justify-between bg-gradient-to-t from-black to-transparent border-t border-white/[0.08] font-mono text-[8px] sm:text-[9px] text-white/40 tracking-widest uppercase gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 text-red-400/70 truncate">
              <Volume2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              <span className="truncate">THEATRICAL AUDIO · IMMERSIVE PROJECTION</span>
            </div>
            <span className="shrink-0 hidden sm:inline">PRESS ESC OR CLICK × TO EXIT</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
