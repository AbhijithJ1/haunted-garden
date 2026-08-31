import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export const MasterTheatricalHero: React.FC = () => {
  const scrollToArchive = () => {
    const el = document.getElementById('immersion-archive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-transparent text-[#E8E6DF] flex flex-col justify-between px-6 sm:px-12 pt-32 pb-12 overflow-hidden select-none z-10"
    >
      {/* Center Stage: Monumental Title + Blood Droplet Formation */}
      <div className="relative my-auto flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-8 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/70 border border-red-800/60 font-mono text-[9px] text-red-400 uppercase tracking-widest backdrop-blur-md shadow-xl">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>SIX ICONIC REALMS • ONE CONTINUOUS DESCENT</span>
        </div>

        {/* Monumental Title with Glowing Letter Accent */}
        <div className="relative inline-block">
          <h1 className="special-font font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight text-white leading-[0.85] uppercase drop-shadow-[0_30px_70px_rgba(0,0,0,0.98)]">
            CINEDR<strong>E</strong>AD
          </h1>

          {/* Viscous Blood Droplet forming from the letter 'R' */}
          <div className="absolute left-[54%] bottom-[-10px] pointer-events-none z-30">
            <div className="w-3.5 h-6 rounded-b-full rounded-t-sm bg-gradient-to-b from-[#DC2626] via-[#991B1B] to-[#450A0A] shadow-[0_0_18px_rgba(220,38,38,0.9)] animate-pulse" />
          </div>
        </div>

        <p className="font-cinzel italic text-base sm:text-2xl text-white/90 max-w-2xl leading-relaxed border-l-2 border-red-600 pl-4">
          "Some films do not end when the screen turns black. The image itself is the contagion."
        </p>

        <p className="font-grotesk text-xs sm:text-sm text-white/50 max-w-xl font-light leading-relaxed">
          An interactive 3D spatial archive exploring the architectural fear mechanisms of cinema's most terrifying masterworks. Continuous autoplaying scenes and forensic dossiers.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={scrollToArchive}
            data-cursor-text="EXPLORE"
            className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-white text-[#020204] hover:bg-red-600 hover:text-white px-8 py-4 font-mono text-[10px] tracking-editorial uppercase transition-all duration-300 shadow-2xl flex items-center gap-3 font-bold"
          >
            <span>ENTER THE ARCHIVE</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* WebTactics 2-Column Hero Bottom Bar */}
      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-end gap-6 border-t border-white/[0.08] pt-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold">
            CASE DOSSIER INDEX // 01 — 06
          </span>
          <p className="font-grotesk text-xs sm:text-sm text-white/60 font-light">
            The Conjuring • Talk To Me • FROM • Hereditary • Sinister • Tarot
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 font-mono text-[9px] text-white/40 uppercase tracking-widest">
          <span className="hidden sm:inline">WARNER BROS. • A24 • SONY • MGM+ • BLUMHOUSE</span>
          <div className="flex items-center gap-3 text-red-500 font-bold">
            <div className="w-8 h-[1px] bg-red-600" />
            <span>SCROLL TO DESCEND</span>
          </div>
        </div>
      </div>
    </section>
  );
};
