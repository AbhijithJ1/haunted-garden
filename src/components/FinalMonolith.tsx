import React from 'react';
import { ExternalLink } from 'lucide-react';
import { SplitTextReveal, DecryptedText } from './DecryptedText';
import { openOnNetflix } from '../lib/netflix';

export const FinalMonolith: React.FC = () => {
  return (
    <section
      id="final-monolith"
      className="relative min-h-[90vh] sm:min-h-screen w-full bg-black text-white select-none flex flex-col items-center justify-center text-center px-6 sm:px-12 py-20 overflow-hidden"
    >
      {/* Pure Clean Black Canvas */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center justify-center space-y-6">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] text-red-500 tracking-[0.4em] uppercase font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
          <DecryptedText
            text="THE PASSAGE CLOSES // ARCHIVE SEALED"
            speed={35}
            maxIterations={10}
            animateOn="both"
          />
        </div>

        <h2 className="font-cinzel font-black text-4xl sm:text-7xl md:text-8xl lg:text-[8.5rem] tracking-tight text-white leading-[0.9] uppercase flex flex-col items-center justify-center">
          <span className="block whitespace-nowrap">
            <SplitTextReveal text="NOTHING IS" delay={0.05} />
          </span>
          <span className="block whitespace-nowrap">
            <SplitTextReveal text="FORGOTTEN" delay={0.2} />
          </span>
        </h2>

        <p className="font-cinzel italic text-sm sm:text-xl text-white/70 tracking-[0.2em] uppercase max-w-2xl pt-2">
          "THE ARCHIVE IS ENDLESS. THE CAMERA DEPARTS. THE DREAD REMAINS."
        </p>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => openOnNetflix('the-conjuring', 'THE CONJURING')}
            className="group relative cursor-pointer overflow-hidden rounded-full bg-red-600 text-white hover:bg-red-500 px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 font-bold shadow-[0_0_25px_rgba(220,38,38,0.6)] active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>THE CONJURING ON NETFLIX</span>
          </button>

          <button
            onClick={() => openOnNetflix('from', 'FROM')}
            className="group relative cursor-pointer overflow-hidden rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 font-mono text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2.5 font-bold active:scale-95"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>FROM ON NETFLIX</span>
          </button>
        </div>
      </div>
    </section>
  );
};
