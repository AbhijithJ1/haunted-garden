import React from 'react';
import { ShieldAlert, Play, Eye, Flame, Lock, Radio } from 'lucide-react';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';

interface WebTacticsForensicMatrixProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const WebTacticsForensicMatrix: React.FC<WebTacticsForensicMatrixProps> = ({
  onOpenTrailer,
}) => {
  const [conjuring, talkToMe, from, hereditary, sinister, tarot] = UNIVERSES_DATA;

  return (
    <section id="services" className="relative w-full bg-[#020204] py-32 px-6 sm:px-12 text-white border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* WebTactics Section Title */}
        <div className="mb-16">
          <span className="kicker !border-red-600/30 !bg-red-950/20 !text-red-400 font-mono text-[9px]">
            03 // DIRECTORIAL ANALYSIS
          </span>
          <h2 className="font-cinzel font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase mt-3">
            THE ARCHITECTURE OF FEAR
          </h2>
          <p className="font-grotesk text-xs sm:text-sm text-white/50 max-w-lg mt-3 font-light leading-relaxed">
            Forensic analysis of how modern horror directors dismantle psychological safety, weaponize domestic spaces, and destroy viewer agency.
          </p>
        </div>

        {/* WebTactics 4-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Bento 1: Large Span 2x2 — The Conjuring */}
          <div
            onClick={() => onOpenTrailer(conjuring)}
            className="md:col-span-2 md:row-span-2 rounded-2xl bg-[#08080c] border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-red-500/60 transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden group min-h-[460px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-25 filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('https://img.youtube.com/vi/${conjuring.trailerYoutubeId}/maxresdefault.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-red-500 font-bold uppercase tracking-widest">
              <span>01 // DOMESTIC INVASION</span>
              <Lock className="w-4 h-4" />
            </div>

            <div className="relative z-10 mt-auto pt-8">
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-1">
                JAMES WAN • 2013
              </span>
              <h3 className="font-cinzel font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
                THE CONJURING
              </h3>
              <p className="font-cinzel italic text-sm text-white/80 mt-2 border-l border-red-500 pl-3">
                "The terror succeeds because possession is treated as a parasitic disease that gradually infects parental protection."
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="font-mono text-[9px] text-white/50 uppercase tracking-editorial">
                  VIEW CASE DOSSIER
                </span>
                <div className="p-2.5 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 fill-current" />
                </div>
              </div>
            </div>
          </div>

          {/* Bento 2: Span 2x1 — Talk To Me */}
          <div
            onClick={() => onOpenTrailer(talkToMe)}
            className="md:col-span-2 rounded-2xl bg-[#08080c] border border-white/10 p-8 flex flex-col justify-between hover:border-cyan-500/60 transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden group min-h-[220px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-20 filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
              style={{ backgroundImage: `url('https://img.youtube.com/vi/${talkToMe.trailerYoutubeId}/maxresdefault.jpg')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
              <span>02 // SURRENDER AS THRILL</span>
              <Flame className="w-4 h-4" />
            </div>

            <div className="relative z-10 mt-auto pt-4">
              <h3 className="font-cinzel font-bold text-2xl text-white uppercase tracking-tight">
                TALK TO ME
              </h3>
              <p className="font-cinzel italic text-xs text-white/70 mt-1">
                "Possession as viral high — once the 90-second threshold is crossed, the host has invited permanent entity residency."
              </p>
            </div>
          </div>

          {/* Bento 3: Span 1x1 — FROM */}
          <div
            onClick={() => onOpenTrailer(from)}
            className="rounded-2xl bg-[#08080c] border border-white/10 p-6 flex flex-col justify-between hover:border-yellow-500/60 transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden group min-h-[200px]"
          >
            <div className="flex items-center justify-between font-mono text-[9px] text-yellow-400 font-bold uppercase tracking-widest">
              <span>03 // NO ESCAPE</span>
              <Radio className="w-3.5 h-3.5" />
            </div>

            <div className="mt-auto">
              <h4 className="font-cinzel font-bold text-lg text-white uppercase">FROM</h4>
              <p className="font-grotesk text-[11px] text-white/60 font-light mt-1">
                Every road loops back. The predators wear familiar smiling faces outside windowpanes.
              </p>
            </div>
          </div>

          {/* Bento 4: Span 1x1 — Hereditary */}
          <div
            onClick={() => onOpenTrailer(hereditary)}
            className="rounded-2xl bg-[#08080c] border border-white/10 p-6 flex flex-col justify-between hover:border-orange-500/60 transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden group min-h-[200px]"
          >
            <div className="flex items-center justify-between font-mono text-[9px] text-orange-400 font-bold uppercase tracking-widest">
              <span>04 // INHERITANCE</span>
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>

            <div className="mt-auto">
              <h4 className="font-cinzel font-bold text-lg text-white uppercase">HEREDITARY</h4>
              <p className="font-grotesk text-[11px] text-white/60 font-light mt-1">
                Human lives arranged as miniature dollhouse preparation for Paimon's coronation.
              </p>
            </div>
          </div>

          {/* Bento 5: Span 2x1 — Sinister */}
          <div
            onClick={() => onOpenTrailer(sinister)}
            className="md:col-span-2 rounded-2xl bg-[#08080c] border border-white/10 p-8 flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden group min-h-[220px]"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              <span>05 // CELLULOID CONTAGION</span>
              <Eye className="w-4 h-4" />
            </div>

            <div className="mt-auto pt-4">
              <h3 className="font-cinzel font-bold text-2xl text-white uppercase tracking-tight">
                SINISTER
              </h3>
              <p className="font-cinzel italic text-xs text-white/70 mt-1">
                "The monster travels through the images themselves. Looking is no longer passive observation."
              </p>
            </div>
          </div>

          {/* Bento 6: Span 2x1 — Tarot */}
          <div
            onClick={() => onOpenTrailer(tarot)}
            className="md:col-span-2 rounded-2xl bg-[#08080c] border border-white/10 p-8 flex flex-col justify-between hover:border-purple-500/60 transition-all duration-500 cursor-pointer shadow-2xl relative overflow-hidden group min-h-[220px]"
          >
            <div className="flex items-center justify-between font-mono text-[10px] text-purple-400 font-bold uppercase tracking-widest">
              <span>06 // CONDEMNED DESTINY</span>
              <ShieldAlert className="w-4 h-4" />
            </div>

            <div className="mt-auto pt-4">
              <h3 className="font-cinzel font-bold text-2xl text-white uppercase tracking-tight">
                TAROT
              </h3>
              <p className="font-cinzel italic text-xs text-white/70 mt-1">
                "Astrological inevitability. The cards were never a warning; they were the sentence."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
