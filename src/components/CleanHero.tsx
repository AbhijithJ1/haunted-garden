import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { soundEngine } from '../audio/soundEngine';

export const CleanHero: React.FC = () => {
  const [isMuted, setIsMuted] = React.useState(true);

  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const scrollToArchive = () => {
    const el = document.getElementById('case-dossiers');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#020204] text-[#E8E6DF] flex flex-col justify-between px-6 sm:px-12 pt-24 pb-12 overflow-hidden border-b border-white/[0.08]"
    >
      {/* Ambient Live Video Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <iframe
          src="https://www.youtube-nocookie.com/embed/k10ETZ41q5o?autoplay=1&mute=1&controls=0&loop=1&playlist=k10ETZ41q5o&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
          title="Ambient Hero"
          allow="autoplay; encrypted-media"
          className="w-full h-full object-cover scale-135 opacity-20 brightness-75 contrast-150 filter grayscale"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,3,5,0.4)_0%,rgba(2,2,4,0.98)_75%)]" />
        <div className="absolute inset-0 film-grain opacity-35" />
      </div>

      {/* Top Header Label */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between font-mono text-[9px] text-white/40 tracking-editorial uppercase border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <span className="text-white/80 font-bold">CINEDREAD // SPATIAL ARCHIVE OF HORROR CINEMA</span>
        </div>

        <button
          onClick={handleToggleAudio}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          <div className="flex items-end gap-[3px] h-3.5">
            <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0s' }} />
            <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0.15s' }} />
            <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0.3s' }} />
            <div className={`indicator-line ${isMuted ? '!h-1 !opacity-30 !animate-none' : ''}`} style={{ animationDelay: '0.45s' }} />
          </div>
          <span>{isMuted ? 'ENABLE AUDIO' : 'ATMOSPHERE ACTIVE'}</span>
        </button>
      </div>

      {/* Center Stage: Monumental Title + Purpose */}
      <div className="relative z-20 my-auto flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-12 space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/60 border border-red-800/60 font-mono text-[9px] text-red-400 uppercase tracking-widest backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>SIX ICONIC REALMS • DIRECTORIAL FEAR ANALYSIS</span>
        </div>

        {/* Monumental Title */}
        <h1 className="font-cinzel font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight text-white leading-[0.85] uppercase drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
          CINEDREAD
        </h1>

        <p className="font-cinzel italic text-base sm:text-2xl text-white/90 max-w-2xl leading-relaxed">
          "Some films do not end when the screen turns black. The image itself is the contagion."
        </p>

        <p className="font-grotesk text-xs sm:text-sm text-white/50 max-w-xl font-light leading-relaxed">
          A physical spatial archive where you travel through the defining worlds and psychological fears of horror cinema. Autoplaying scenes, directorial dossiers, and forensic analysis.
        </p>

        <div className="pt-2">
          <button
            onClick={scrollToArchive}
            className="group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-white text-[#020204] hover:bg-red-600 hover:text-white px-8 py-4 font-mono text-[10px] tracking-editorial uppercase transition-all duration-300 shadow-2xl flex items-center gap-3 font-bold"
          >
            <span>ENTER THE ARCHIVE</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* WebTactics 2-Column Hero Bottom Bar */}
      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-end gap-6 border-t border-white/[0.08] pt-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold">
            CASE DOSSIER INDEX // 01 — 06
          </span>
          <p className="font-grotesk text-xs sm:text-sm text-white/60 font-light">
            James Wan • Danny & Michael Philippou • MGM+ • Ari Aster • Scott Derrickson • Sony Pictures
          </p>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 font-mono text-[9px] text-white/40 uppercase tracking-widest">
          <span className="hidden sm:inline">WARNER BROS. • A24 • SONY • MGM+ • BLUMHOUSE</span>
          <div className="flex items-center gap-2 text-red-500 font-bold">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            <span>SCROLL TO EXPLORE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
