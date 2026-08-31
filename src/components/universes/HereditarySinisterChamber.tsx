import React, { useState } from 'react';
import { Film, Play } from 'lucide-react';
import { BentoTilt } from '../BentoTilt';
import { UNIVERSES_DATA } from '../../data/universes';
import { UniverseInfo } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface HereditarySinisterChamberProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const HereditarySinisterChamber: React.FC<HereditarySinisterChamberProps> = ({
  onOpenTrailer,
}) => {
  const hereditaryUniverse = UNIVERSES_DATA.find((u) => u.id === 'hereditary')!;
  const sinisterUniverse = UNIVERSES_DATA.find((u) => u.id === 'sinister')!;

  const [activeFilm, setActiveFilm] = useState<'hereditary' | 'sinister'>('hereditary');
  const [selectedFilmReel, setSelectedFilmReel] = useState('FAMILY_HANGING_1966');

  const currentUniverse = activeFilm === 'hereditary' ? hereditaryUniverse : sinisterUniverse;

  const handleTongueClick = () => {
    soundEngine.playClickTongue();
  };

  const handleSelectReel = (reelName: string) => {
    setSelectedFilmReel(reelName);
    soundEngine.playCardDraw();
  };

  return (
    <section
      id="chapter-hereditary"
      className="relative min-h-screen w-full bg-[#050302] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Scary Film Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none filter grayscale contrast-125"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${currentUniverse.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050302] via-[#050302]/90 to-[#050302]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 01 — IMMERSIVE INTRO & FILM SELECTOR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-white/[0.08] pb-10">
          <div>
            <span className="font-mono text-[10px] text-orange-500 tracking-cinematic uppercase block mb-3">
              CHAPTER 04 & 05 // THE INEVITABLE & THE CELLULOID PARASITE
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              {activeFilm === 'hereditary' ? 'HEREDITARY' : 'SINISTER'}
            </h2>
            <p className="font-cinzel italic text-base sm:text-xl text-white/70 mt-3">
              {activeFilm === 'hereditary'
                ? 'IT WAS NEVER YOUR CHOICE. THE BLOODLINE WAS CONSECRATED.'
                : 'DON’T LOOK IN THE ATTIC BOX. ONCE YOU SEE HIM, HE SEES YOU.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Film Selector Switch */}
            <div className="flex items-center p-1 bg-black/60 border border-white/10 rounded-sm">
              <button
                onClick={() => {
                  setActiveFilm('hereditary');
                  soundEngine.playCardDraw();
                }}
                className={`px-4 py-2 font-mono text-[10px] tracking-editorial uppercase transition-all cursor-pointer rounded-sm ${
                  activeFilm === 'hereditary' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                HEREDITARY (2018)
              </button>
              <button
                onClick={() => {
                  setActiveFilm('sinister');
                  soundEngine.playCardDraw();
                }}
                className={`px-4 py-2 font-mono text-[10px] tracking-editorial uppercase transition-all cursor-pointer rounded-sm ${
                  activeFilm === 'sinister' ? 'bg-white text-black font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                SINISTER (2012)
              </button>
            </div>

            <button
              onClick={() => onOpenTrailer(currentUniverse)}
              className="py-3.5 px-6 bg-white text-[#040406] hover:bg-orange-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded-sm shadow-xl"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY TRAILER</span>
            </button>
          </div>
        </div>

        {/* 02 — SCENE REVEAL & INTERACTIVE ARTIFACT */}
        {activeFilm === 'hereditary' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
            {/* Left: The Coronation Altar with BentoTilt */}
            <div className="lg:col-span-7">
              <BentoTilt tiltFactor={6}>
                <div className="relative rounded-2xl p-8 sm:p-12 bg-[#0e0602] border border-white/15 shadow-2xl min-h-[460px] flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-editorial text-white/40 mb-8 pb-4 border-b border-white/[0.06]">
                      <span>GOETIC CORONATION CHAMBER</span>
                      <span className="text-orange-400">DEMON OF THE NORTHWEST</span>
                    </div>

                    <div className="p-8 bg-black/40 border border-white/10 rounded-xl text-center flex flex-col items-center justify-center space-y-4">
                      <button
                        onClick={handleTongueClick}
                        className="w-24 h-24 rounded-full border border-orange-500/40 bg-orange-950/30 hover:bg-orange-950/60 transition-all flex flex-col items-center justify-center p-3 cursor-pointer group shadow-lg"
                      >
                        <span className="font-cinzel text-xs font-bold text-orange-200 group-hover:scale-110 transition-transform">
                          *TOCK*
                        </span>
                        <span className="font-mono text-[8px] text-white/40 mt-1 uppercase">CLICK</span>
                      </button>

                      <h3 className="font-cinzel font-bold text-xl sm:text-2xl text-white tracking-widest uppercase">
                        HAIL, KING PAIMON
                      </h3>
                      <p className="font-grotesk text-xs sm:text-sm text-white/60 max-w-md font-light">
                        "Bind the bloodline. Crown the male vessel. The ritual began generations before your birth."
                      </p>
                    </div>
                  </div>

                  <p className="font-mono text-[10px] text-white/40 tracking-editorial uppercase mt-8 pt-4 border-t border-white/[0.06]">
                    THE MINIATURE WORLD: Every scene in the Graham home mirrors the predetermined dollhouses Annie constructs.
                  </p>
                </div>
              </BentoTilt>
            </div>

            {/* Right: Hereditary Forensics Lore */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <span className="font-mono text-[10px] text-orange-500 tracking-editorial uppercase block mb-2">
                  THE GRAHAM BLOODLINE
                </span>
                <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  DOLLHOUSE INEVITABILITY
                </h3>
                <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed font-light">
                  Ari Aster's masterpiece strips away hope and agency. The family members are not protagonists fighting evil—they are chess pieces systematically moved into position for an ancient ritual.
                </p>
              </div>

              <div className="p-6 bg-[#0e0602] border border-white/10 rounded-xl">
                <span className="font-mono text-[10px] text-white/40 tracking-editorial uppercase block mb-2">
                  THE CORONATION
                </span>
                <p className="font-cinzel italic text-sm text-white/90">
                  "Paimon, King of the Northwest. We reject the Trinity and pray to thee."
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
            {/* Left: Super 8mm Projector with BentoTilt */}
            <div className="lg:col-span-7">
              <BentoTilt tiltFactor={6}>
                <div className="relative rounded-2xl p-8 sm:p-12 bg-[#020d09] border border-white/15 shadow-2xl min-h-[460px] flex flex-col justify-between overflow-hidden">
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-editorial text-white/40 mb-6 pb-4 border-b border-white/[0.06]">
                      <span>SUPER 8MM PROJECTOR REEL</span>
                      <span className="text-emerald-400">FOUND FOOTAGE ARCHIVE</span>
                    </div>

                    {/* Projector Screen Frame */}
                    <div className="w-full h-48 bg-black border border-white/10 rounded-xl flex flex-col items-center justify-center p-6 text-center cinema-scanlines mb-6">
                      <span className="font-mono text-xs text-emerald-400 tracking-editorial uppercase block">
                        CURRENT REEL: {selectedFilmReel.replace(/_/g, ' ')}
                      </span>
                      <span className="font-mono text-[10px] text-white/30 mt-2">
                        18 FRAMES PER SECOND // BUGHUUL DETECTED IN REFLECTION
                      </span>
                    </div>

                    {/* Reel Selection */}
                    <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                      {['FAMILY_HANGING_1966', 'BBQ_FAMILY_1979', 'LAWN_MOWER_1986'].map((reel) => (
                        <button
                          key={reel}
                          onClick={() => handleSelectReel(reel)}
                          className={`p-3 text-left border rounded-sm transition-all cursor-pointer ${
                            selectedFilmReel === reel
                              ? 'bg-emerald-950/60 border-emerald-500/60 text-white font-bold'
                              : 'bg-black/40 border-white/[0.06] text-white/40 hover:text-white'
                          }`}
                        >
                          {reel.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  <p className="font-mono text-[10px] text-white/40 tracking-editorial uppercase mt-8 pt-4 border-t border-white/[0.06]">
                    THE IMAGE AS INFECTION: The demonic entity Bughuul is physically summoned through celluloid projection.
                  </p>
                </div>
              </BentoTilt>
            </div>

            {/* Right: Sinister Forensics */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div>
                <span className="font-mono text-[10px] text-emerald-400 tracking-editorial uppercase block mb-2">
                  THE VISUAL PARASITE
                </span>
                <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                  BUGHUUL (MR. BOOGIE)
                </h3>
                <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed font-light">
                  Bughuul travels across dimensions through the images themselves. True-crime writer Ellison Oswalt believes he is solving murder mysteries, unaware that watching the tapes initiates his family's slaughter.
                </p>
              </div>

              <div className="p-6 bg-[#020d09] border border-white/10 rounded-xl">
                <span className="font-mono text-[10px] text-white/40 tracking-editorial uppercase block mb-2">
                  THE TRANSMISSION LAW
                </span>
                <p className="font-cinzel italic text-sm text-white/90">
                  "Once you look into the attic box, the contract is already sealed."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 03 — WHAT MAKES IT TERRIFYING */}
        <div className="border-t border-white/[0.08] pt-16">
          <span className="font-mono text-[10px] text-orange-500 tracking-cinematic uppercase block mb-6">
            WHAT MAKES IT TERRIFYING
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentUniverse.whatMakesItTerrifying.map((point, idx) => (
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
