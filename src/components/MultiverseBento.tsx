import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { BentoTilt } from './BentoTilt';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';

interface MultiverseBentoProps {
  onSelectUniverse: (id: string) => void;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const MultiverseBento: React.FC<MultiverseBentoProps> = ({
  onSelectUniverse,
  onOpenTrailer,
}) => {
  const scrollToChapter = (id: string) => {
    onSelectUniverse(id);
    const el = document.getElementById(`chapter-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="multiverse-bento"
      className="relative min-h-screen w-full bg-[#030305] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <span className="font-mono text-[10px] text-red-500 tracking-cinematic uppercase block mb-3">
              INDEX // SIX HORROR REALMS
            </span>
            <h2 className="font-cinzel font-bold text-4xl sm:text-6xl text-white tracking-tight">
              THE ARCHIVE
            </h2>
          </div>

          <p className="font-grotesk text-xs sm:text-sm text-white/50 max-w-md leading-relaxed font-light">
            Six distinct mechanisms of psychological dread. Click any realm to enter its full-screen cinematic chapter.
          </p>
        </div>

        {/* 6-Card Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {UNIVERSES_DATA.map((u) => (
            <BentoTilt key={u.id} tiltFactor={8} className="h-full">
              <div
                onClick={() => scrollToChapter(u.id)}
                className="group relative h-full min-h-[380px] sm:min-h-[440px] rounded-2xl bg-[#08080c] border border-white/10 p-8 flex flex-col justify-between overflow-hidden cursor-pointer shadow-xl transition-all duration-500 hover:border-white/30"
              >
                {/* Background Film Backdrop Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-25 filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-40"
                  style={{
                    backgroundImage: `url('https://img.youtube.com/vi/${u.trailerYoutubeId}/maxresdefault.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080c] via-[#08080c]/80 to-transparent" />
                <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

                {/* Top Meta */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/40 tracking-editorial uppercase">
                  <span>REEL {u.index}</span>
                  <span>{u.year} • {u.runtime}</span>
                </div>

                {/* Bottom Title & Actions */}
                <div className="relative z-10 mt-auto pt-8">
                  <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase group-hover:text-red-400 transition-colors">
                    {u.title}
                  </h3>

                  <p className="font-cinzel italic text-xs sm:text-sm text-white/70 mt-1 line-clamp-2">
                    "{u.tagline}"
                  </p>

                  <p className="font-grotesk text-xs text-white/50 font-light mt-3 line-clamp-3 leading-relaxed">
                    {u.synopsis}
                  </p>

                  {/* Actions Row */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/70 uppercase tracking-editorial flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
                      <span>ENTER CHAPTER</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenTrailer(u);
                      }}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
                      title="Play Full Trailer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
};
