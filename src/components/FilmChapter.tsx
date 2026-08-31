import React from 'react';
import { Play, ArrowUp } from 'lucide-react';
import { UniverseInfo } from '../types';

interface FilmChapterProps {
  universe: UniverseInfo;
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const FilmChapter: React.FC<FilmChapterProps> = ({
  universe,
  onOpenTrailer,
}) => {
  const scrollToArchive = () => {
    const el = document.getElementById('multiverse-bento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id={`chapter-${universe.id}`}
      className="relative min-h-screen w-full bg-[#030305] py-32 px-6 sm:px-12 border-t border-white/[0.06] flex flex-col justify-center overflow-hidden"
    >
      {/* Background Film Footage Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 filter grayscale contrast-125 pointer-events-none"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#030305] via-[#030305]/90 to-[#030305]" />
      <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 01 — CHAPTER HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-10">
          <div>
            <span className="font-mono text-[10px] text-red-500 tracking-cinematic uppercase block mb-3">
              CHAPTER // REEL {universe.index}
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              {universe.title}
            </h2>
            <p className="font-cinzel italic text-base sm:text-xl text-white/70 mt-3">
              "{universe.tagline}"
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenTrailer(universe)}
              className="py-3.5 px-7 bg-white text-[#030305] hover:bg-red-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded-sm shadow-xl"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY FULL TRAILER</span>
            </button>
          </div>
        </div>

        {/* 02 — CINEMATIC VIDEO & EDITORIAL ANATOMY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left: 16:9 Looping Cinema Visual Frame */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-video rounded-2xl bg-black border border-white/15 overflow-hidden shadow-2xl">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${universe.trailerYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${universe.trailerYoutubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
                title={universe.trailerTitle}
                allow="autoplay; encrypted-media"
                className="w-full h-full object-cover pointer-events-none scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Tag */}
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between font-mono text-[10px] text-white/60 tracking-editorial uppercase">
                <span>{universe.director} ({universe.year})</span>
                <span>{universe.runtime} • {universe.rating}</span>
              </div>
            </div>
          </div>

          {/* Right: Short Editorial Description */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-editorial block mb-2">
                THE ARCHIVAL SUMMARY
              </span>
              <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {universe.subTitle}
              </h3>
              <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed font-light">
                {universe.synopsis}
              </p>
            </div>

            <div className="p-6 bg-[#08080c] border border-white/10 rounded-xl">
              <span className="font-mono text-[10px] text-red-400 tracking-editorial uppercase block mb-2">
                ARCHIVAL LORE RECORD
              </span>
              <p className="font-cinzel italic text-sm text-white/90 leading-relaxed">
                "{universe.loreQuote}"
              </p>
            </div>
          </div>
        </div>

        {/* 03 — WHAT MAKES IT TERRIFYING */}
        <div className="border-t border-white/[0.08] pt-16">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] text-red-500 tracking-cinematic uppercase">
              WHAT MAKES IT TERRIFYING
            </span>

            <button
              onClick={scrollToArchive}
              className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-editorial flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowUp className="w-3 h-3" />
              <span>RETURN TO INDEX</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {universe.whatMakesItTerrifying.map((point, idx) => (
              <div key={idx} className="flex flex-col border-t border-white/[0.08] pt-6">
                <span className="font-mono text-xs text-white/30 mb-3">0{idx + 1}</span>
                <p className="font-cinzel text-base sm:text-lg text-white/90 leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
