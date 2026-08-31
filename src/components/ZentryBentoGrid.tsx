import React from 'react';
import { Play } from 'lucide-react';
import { BentoTilt } from './BentoTilt';
import { UniverseInfo } from '../types';
import { UNIVERSES_DATA } from '../data/universes';

interface ZentryBentoGridProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
  onSelectUniverse: (id: string) => void;
}

export const ZentryBentoGrid: React.FC<ZentryBentoGridProps> = ({
  onOpenTrailer,
  onSelectUniverse,
}) => {
  const [conjuring, talkToMe, from, hereditary, sinister] = UNIVERSES_DATA;

  return (
    <section id="zentry-grid" className="relative w-full bg-[#020204] py-32 px-4 sm:px-10 text-white border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest block mb-2">
            04 // THE ARCHIVE DOSSIER
          </span>
          <h2 className="special-font font-cinzel font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
            IMMERSIVE <strong>F</strong>EAR M<strong>A</strong>TRIX
          </h2>
          <p className="font-grotesk text-xs sm:text-sm text-white/50 max-w-xl mt-3 font-light leading-relaxed">
            Directorial analysis, psychological architecture, and cinematic evidence from the six consecrated realms of modern dread.
          </p>
        </div>

        {/* Feature 1: Monumental Full-Width Bento Card */}
        <BentoTilt tiltFactor={5} className="w-full mb-7">
          <div
            onClick={() => onOpenTrailer(conjuring)}
            className="group relative h-96 md:h-[60vh] w-full rounded-2xl bg-[#08080c] border border-white/15 overflow-hidden cursor-pointer hover:border-red-500/60 transition-all duration-500 shadow-2xl"
          >
            <video
              src="/videos/feature-1.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />
            <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

            <div className="relative z-10 flex size-full flex-col justify-between p-8 md:p-12">
              <div className="flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
                <span className="px-3 py-1 rounded bg-black/80 border border-white/15">
                  CASE 01 // THE WARREN OCCULT VAULT
                </span>
                <span>JAMES WAN (2013)</span>
              </div>

              <div>
                <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF INVASION
                </span>
                <h1 className="special-font font-cinzel font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  THE C<strong>O</strong>NJURING
                </h1>
                <p className="font-cinzel italic text-sm text-white/80 max-w-md mt-2">
                  "Home is supposed to protect you. The entity systematically dismantles parental sanctuary."
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] pt-4">
                <span className="font-mono text-[9px] text-white/50 uppercase tracking-editorial">
                  CLICK TO LAUNCH THEATRICAL RECONSTRUCTION
                </span>
                <div className="p-3 rounded-full bg-white text-black group-hover:bg-red-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-xl">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </BentoTilt>

        {/* 2x2 Grid of Interactive Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          
          {/* Card 2: Talk To Me */}
          <BentoTilt tiltFactor={6}>
            <div
              onClick={() => onOpenTrailer(talkToMe)}
              className="group relative h-[380px] sm:h-[440px] rounded-2xl bg-[#08080c] border border-white/15 overflow-hidden cursor-pointer hover:border-cyan-500/60 transition-all duration-500 shadow-2xl p-8 flex flex-col justify-between"
            >
              <video
                src="/videos/feature-2.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
                <span className="px-2.5 py-1 rounded bg-black/80 border border-white/15">
                  CASE 02 // 90-SECOND THRESHOLD
                </span>
                <span>A24 • 2023</span>
              </div>

              <div className="relative z-10 mt-auto">
                <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF SURRENDER
                </span>
                <h3 className="special-font font-cinzel font-bold text-2xl sm:text-3xl text-white uppercase">
                  TALK T<strong>O</strong> ME
                </h3>
                <p className="font-cinzel italic text-xs sm:text-sm text-white/70 mt-1">
                  "Possession treated as social high, until the door cannot be closed."
                </p>
              </div>
            </div>
          </BentoTilt>

          {/* Card 3: FROM */}
          <BentoTilt tiltFactor={6}>
            <div
              onClick={() => onOpenTrailer(from)}
              className="group relative h-[380px] sm:h-[440px] rounded-2xl bg-[#08080c] border border-white/15 overflow-hidden cursor-pointer hover:border-yellow-500/60 transition-all duration-500 shadow-2xl p-8 flex flex-col justify-between"
            >
              <video
                src="/videos/feature-3.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
                <span className="px-2.5 py-1 rounded bg-black/80 border border-white/15">
                  CASE 03 // FORBIDDEN TOWNSHIP
                </span>
                <span>MGM+ • 2022–PRESENT</span>
              </div>

              <div className="relative z-10 mt-auto">
                <span className="font-mono text-[9px] text-yellow-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF NO ESCAPE
                </span>
                <h3 className="special-font font-cinzel font-bold text-2xl sm:text-3xl text-white uppercase">
                  FR<strong>O</strong>M
                </h3>
                <p className="font-cinzel italic text-xs sm:text-sm text-white/70 mt-1">
                  "Every road traveled loops straight back to the center of town."
                </p>
              </div>
            </div>
          </BentoTilt>

          {/* Card 4: Hereditary */}
          <BentoTilt tiltFactor={6}>
            <div
              onClick={() => onOpenTrailer(hereditary)}
              className="group relative h-[380px] sm:h-[440px] rounded-2xl bg-[#08080c] border border-white/15 overflow-hidden cursor-pointer hover:border-orange-500/60 transition-all duration-500 shadow-2xl p-8 flex flex-col justify-between"
            >
              <video
                src="/videos/feature-4.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
                <span className="px-2.5 py-1 rounded bg-black/80 border border-white/15">
                  CASE 04 // PAIMON CORONATION
                </span>
                <span>ARI ASTER • A24</span>
              </div>

              <div className="relative z-10 mt-auto">
                <span className="font-mono text-[9px] text-orange-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF INHERITANCE
                </span>
                <h3 className="special-font font-cinzel font-bold text-2xl sm:text-3xl text-white uppercase">
                  HEREDIT<strong>A</strong>RY
                </h3>
                <p className="font-cinzel italic text-xs sm:text-sm text-white/70 mt-1">
                  "Zero human agency; the bloodline was consecrated before birth."
                </p>
              </div>
            </div>
          </BentoTilt>

          {/* Card 5: Sinister */}
          <BentoTilt tiltFactor={6}>
            <div
              onClick={() => onOpenTrailer(sinister)}
              className="group relative h-[380px] sm:h-[440px] rounded-2xl bg-[#08080c] border border-white/15 overflow-hidden cursor-pointer hover:border-emerald-500/60 transition-all duration-500 shadow-2xl p-8 flex flex-col justify-between"
            >
              <video
                src="/videos/feature-5.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute inset-0 film-grain opacity-35 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between font-mono text-[9px] text-white/70 uppercase tracking-widest">
                <span className="px-2.5 py-1 rounded bg-black/80 border border-white/15">
                  CASE 05 // SUPER-8 CELLULOID
                </span>
                <span>SCOTT DERRICKSON • BLUMHOUSE</span>
              </div>

              <div className="relative z-10 mt-auto">
                <span className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest block font-bold mb-1">
                  THE FEAR OF WITNESSING
                </span>
                <h3 className="special-font font-cinzel font-bold text-2xl sm:text-3xl text-white uppercase">
                  SINIST<strong>E</strong>R
                </h3>
                <p className="font-cinzel italic text-xs sm:text-sm text-white/70 mt-1">
                  "The monster propagates through the act of viewing itself."
                </p>
              </div>
            </div>
          </BentoTilt>

        </div>
      </div>
    </section>
  );
};
