import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, ArrowRight, ShieldAlert } from 'lucide-react';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';

interface WebTacticsHorizontalReelProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const WebTacticsHorizontalReel: React.FC<WebTacticsHorizontalReelProps> = ({
  onOpenTrailer,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);

  // Responsive pinned horizontal scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-75%']);

  const fearData = [
    { universe: UNIVERSES_DATA[0], cat: 'THE FEAR OF INVASION', quote: 'Home is supposed to protect you.' },
    { universe: UNIVERSES_DATA[1], cat: 'THE FEAR OF SURRENDER', quote: 'What happens when you willingly open the door?' },
    { universe: UNIVERSES_DATA[2], cat: 'THE FEAR OF NO ESCAPE', quote: 'The world itself becomes the prison.' },
    { universe: UNIVERSES_DATA[3], cat: 'THE FEAR OF INHERITANCE', quote: 'Some things enter your life before you are born.' },
    { universe: UNIVERSES_DATA[4], cat: 'THE FEAR OF WITNESSING', quote: 'Looking becomes participation.' },
    { universe: UNIVERSES_DATA[5], cat: 'THE FEAR OF DESTINY', quote: 'What if the ending already knows your name?' },
  ];

  return (
    <section ref={targetRef} id="work-wrapper" className="relative h-[450vh] bg-[#020204] text-white">
      {/* Sticky 100vh Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center px-6 sm:px-12 py-10">
        
        {/* WebTactics Header Anchor */}
        <div className="absolute top-10 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <span className="font-mono text-[9px] text-red-500 tracking-widest uppercase block font-bold mb-1">
              02 // THE HORIZONTAL ARCHIVE REEL
            </span>
            <h2 className="font-cinzel font-black text-2xl sm:text-4xl text-white tracking-tight uppercase">
              THE 6 CONSECRATED REALMS
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-3 font-mono text-[9px] text-white/40 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span>SCROLL DOWN TO TRAVEL HORIZONTALLY</span>
          </div>
        </div>

        {/* Horizontal Track of Massive Full-Bleed Video Portals */}
        <motion.div style={{ x }} className="flex gap-8 sm:gap-14 pt-20 pl-2 sm:pl-6 will-change-transform">
          {fearData.map((item, idx) => {
            const u = item.universe;
            const poster = u.posterImage || `https://img.youtube.com/vi/${u.trailerYoutubeId}/maxresdefault.jpg`;

            return (
              <div
                key={u.id}
                id={`archive-reel-0${idx + 1}`}
                onClick={() => onOpenTrailer(u)}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[580px] md:w-[680px] h-[55vh] sm:h-[62vh] rounded-2xl bg-[#08080c] border border-white/15 overflow-hidden cursor-pointer hover:border-red-500/80 transition-all duration-500 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between p-7 sm:p-10"
              >
                {/* Autoplaying High-Definition Video Scene */}
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${u.trailerYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${u.trailerYoutubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1`}
                  title={`${u.title} Scene`}
                  allow="autoplay; encrypted-media"
                  className="absolute inset-0 w-full h-full object-cover scale-115 opacity-80 brightness-90 contrast-125 filter grayscale-[15%] group-hover:scale-120 transition-transform duration-1000 pointer-events-none"
                />

                {/* Atmospheric Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/50 pointer-events-none" />
                <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

                {/* Top Corner Numbering & Reel Stamp */}
                <div className="relative z-10 flex items-center justify-between font-mono text-[10px] text-white/80 uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel text-xl sm:text-2xl font-bold text-red-500">
                      0{idx + 1}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-black/80 border border-white/15">
                      CASE FILE 0{idx + 1}
                    </span>
                  </div>

                  <span className="text-white/60">{u.year} • {u.runtime}</span>
                </div>

                {/* Bottom Content Dossier */}
                <div className="relative z-10 mt-auto pt-6">
                  <span className="font-mono text-[9px] text-red-400 tracking-widest uppercase block font-bold mb-1">
                    {item.cat}
                  </span>

                  <h3 className="font-cinzel font-black text-3xl sm:text-5xl text-white tracking-tight uppercase group-hover:text-red-300 transition-colors">
                    {u.title}
                  </h3>

                  <p className="font-cinzel italic text-xs sm:text-sm text-white/90 mt-2 border-l border-red-500 pl-3 line-clamp-2">
                    "{item.quote}"
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                    <span className="font-mono text-[9px] text-white/60 uppercase tracking-editorial flex items-center gap-2 group-hover:text-white transition-colors">
                      <span>EXPAND THEATRICAL CUT</span>
                      <ArrowRight className="w-3.5 h-3.5 text-red-500 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-2xl">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Bottom Progress Bar */}
        <div className="absolute bottom-8 left-6 sm:left-12 right-6 sm:right-12 z-20 flex items-center justify-between border-t border-white/[0.08] pt-3 font-mono text-[9px] text-white/40 uppercase tracking-editorial">
          <span>01 / 06 REALMS SUSPENDED</span>
          <span>CONTINUOUS HORIZONTAL DESCENT</span>
        </div>

      </div>
    </section>
  );
};
