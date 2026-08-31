import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#030305] text-[#a3a19b] py-24 px-6 sm:px-12 border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto flex flex-col justify-between space-y-16">
        {/* Top Colophon Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-white/[0.06]">
          <div className="max-w-xl">
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider mb-3">
              CINEDREAD
            </h2>
            <p className="font-grotesk text-xs sm:text-sm text-white/50 leading-relaxed font-light">
              An interactive cinematic exhibition dedicated to modern psychological horror, demonic iconography, and atmospheric dread. Curated for cinephiles and occult archivists.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="font-mono text-xs text-white/40 hover:text-white uppercase tracking-editorial flex items-center gap-2 cursor-pointer transition-colors"
          >
            <span>RETURN TO THE VOID ↑</span>
          </button>
        </div>

        {/* Bottom Metadata & Credits */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] text-white/30 tracking-editorial uppercase">
          <span>ALL FILM ASSETS BELONG TO THEIR RESPECTIVE STUDIOS (WARNER BROS, A24, SONY PICTURES, MGM+, BLUMHOUSE)</span>
          <span>MMXXVI // EXPERIMENTAL CINEMA ARCHIVE</span>
        </div>
      </div>
    </footer>
  );
};
