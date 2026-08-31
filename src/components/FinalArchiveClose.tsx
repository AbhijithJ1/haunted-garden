import React from 'react';
import { ArrowUp } from 'lucide-react';

export const FinalArchiveClose: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative min-h-[85vh] w-full bg-[#020204] text-[#E5E4DE] py-32 px-6 sm:px-12 flex flex-col justify-between border-t border-white/[0.08] select-none overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,5,5,0.4)_0%,rgba(2,2,4,0.95)_70%)] pointer-events-none" />
      <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />

      {/* Top Meta */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[10px] text-white/40 tracking-editorial uppercase">
        <span>ARCHIVE CONCLUSION</span>
        <span>THE REELS REMAIN SEALED</span>
      </div>

      {/* Center Unforgettable Closing Composition */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center my-auto flex flex-col items-center py-12">
        <span className="font-mono text-[10px] text-red-500 tracking-cinematic uppercase block mb-6">
          CELLULOID PERMANENCE
        </span>

        <h2 className="font-cinzel font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight uppercase leading-[0.9] mb-8">
          NOTHING IS FORGOTTEN.
        </h2>

        <p className="font-cinzel italic text-base sm:text-xl text-white/70 max-w-xl mb-12">
          "When you look long enough into the dark, the dark begins to look back."
        </p>

        <button
          onClick={scrollToTop}
          className="px-8 py-4 bg-white text-[#030305] hover:bg-red-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer shadow-2xl flex items-center gap-3 rounded-sm"
        >
          <span>RE-ENTER THE ARCHIVE</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Bottom Editorial Colophon */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-white/30 tracking-editorial uppercase">
        <span>ALL FILM ASSETS BELONG TO THEIR RESPECTIVE STUDIOS (WARNER BROS, A24, SONY PICTURES, MGM+, BLUMHOUSE)</span>
        <span>CINEDREAD MMXXVI // CURATED HORROR DISCOVERY</span>
      </div>
    </footer>
  );
};
