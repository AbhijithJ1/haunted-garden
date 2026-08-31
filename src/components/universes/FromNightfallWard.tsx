import React, { useState } from 'react';
import { Shield, Lock, Unlock, Play } from 'lucide-react';
import { BentoTilt } from '../BentoTilt';
import { UNIVERSES_DATA } from '../../data/universes';
import { UniverseInfo } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface FromNightfallWardProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const FromNightfallWard: React.FC<FromNightfallWardProps> = ({ onOpenTrailer }) => {
  const universe = UNIVERSES_DATA.find((u) => u.id === 'from')!;
  const [talismanSuspended, setTalismanSuspended] = useState(true);
  const [doorBolted, setDoorBolted] = useState(true);
  const [shuttersSealed, setShuttersSealed] = useState(true);

  const toggleTalisman = () => {
    setTalismanSuspended(!talismanSuspended);
    soundEngine.playWardClank();
  };

  const toggleDoor = () => {
    setDoorBolted(!doorBolted);
    soundEngine.playWardClank();
  };

  const toggleShutters = () => {
    setShuttersSealed(!shuttersSealed);
    soundEngine.playWardClank();
  };

  const isSanctuarySecure = talismanSuspended && doorBolted && shuttersSealed;

  return (
    <section
      id="chapter-from"
      className="relative min-h-screen w-full bg-[#060502] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Scary Film Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none filter grayscale contrast-125"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#060502] via-[#060502]/90 to-[#060502]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 01 — IMMERSIVE INTRO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-white/[0.08] pb-10">
          <div>
            <span className="font-mono text-[10px] text-amber-500 tracking-cinematic uppercase block mb-3">
              CHAPTER 03 // TOWNSHIP OF THE FORBIDDEN FOREST
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              FROM
            </h2>
            <p className="font-cinzel italic text-base sm:text-xl text-white/70 mt-3">
              THE ROADS NEVER LEAD OUT. SUSPEND THE TALISMAN AT NIGHTFALL.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenTrailer(universe)}
              className="py-3.5 px-6 bg-white text-[#040406] hover:bg-amber-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded-sm shadow-xl"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY TRAILER</span>
            </button>
          </div>
        </div>

        {/* 02 — THE NIGHTFALL WARD LAW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          {/* Left: Interactive Threshold Defense with BentoTilt */}
          <div className="lg:col-span-7">
            <BentoTilt tiltFactor={6}>
              <div className="relative rounded-2xl p-8 sm:p-12 bg-[#0d0a04] border border-white/15 shadow-2xl min-h-[460px] flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-editorial text-white/40 mb-8 pb-4 border-b border-white/[0.06]">
                    <span>SANCTUARY THRESHOLD INTEGRITY</span>
                    <span className={isSanctuarySecure ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                      {isSanctuarySecure ? 'SANCTUARY SEALED' : 'BREACH HAZARD'}
                    </span>
                  </div>

                  {/* Central Talisman Node */}
                  <div className="p-6 bg-black/40 border border-white/10 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
                    <div className="flex items-center gap-4">
                      <div
                        onClick={toggleTalisman}
                        className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all cursor-pointer select-none ${
                          talismanSuspended
                            ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-[0_0_30px_rgba(234,179,8,0.4)]'
                            : 'bg-black border-white/20 text-white/30'
                        }`}
                      >
                        <Shield className="w-7 h-7" />
                      </div>
                      <div>
                        <h4 className="font-cinzel font-bold text-base text-white uppercase">
                          RUNED STONE TALISMAN
                        </h4>
                        <p className="font-grotesk text-xs text-white/50 font-light mt-0.5">
                          Suspended inside an enclosed entranceway to repel nocturnal stalkers.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={toggleTalisman}
                      className={`px-4 py-2 font-mono text-[10px] tracking-editorial uppercase border rounded-sm transition-all cursor-pointer ${
                        talismanSuspended
                          ? 'bg-amber-950/50 border-amber-500/50 text-amber-200'
                          : 'bg-white text-black hover:bg-amber-500'
                      }`}
                    >
                      {talismanSuspended ? 'SUSPENDED ON ENTRY' : 'HANG TALISMAN'}
                    </button>
                  </div>

                  {/* Barrier Toggles */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={toggleDoor}
                      className={`p-4 text-left border rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                        doorBolted ? 'bg-black/40 border-white/10' : 'bg-red-950/40 border-red-500/50'
                      }`}
                    >
                      <div>
                        <span className="font-cinzel font-bold text-xs text-white block">FRONT TIMBER DOOR</span>
                        <span className="font-mono text-[10px] text-white/40">{doorBolted ? 'BOLTED' : 'UNLATCHED'}</span>
                      </div>
                      {doorBolted ? <Lock className="w-4 h-4 text-emerald-400" /> : <Unlock className="w-4 h-4 text-red-400" />}
                    </button>

                    <button
                      onClick={toggleShutters}
                      className={`p-4 text-left border rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                        shuttersSealed ? 'bg-black/40 border-white/10' : 'bg-red-950/40 border-red-500/50'
                      }`}
                    >
                      <div>
                        <span className="font-cinzel font-bold text-xs text-white block">WINDOW SHUTTERS</span>
                        <span className="font-mono text-[10px] text-white/40">{shuttersSealed ? 'SEALED & COVERED' : 'EXPOSED'}</span>
                      </div>
                      {shuttersSealed ? <Lock className="w-4 h-4 text-emerald-400" /> : <Unlock className="w-4 h-4 text-red-400" />}
                    </button>
                  </div>
                </div>

                <p className="font-mono text-[10px] text-white/40 tracking-editorial uppercase mt-8 pt-4 border-t border-white/[0.06]">
                  RULE: A single unsealed opening invalidates the talisman for the entire structure.
                </p>
              </div>
            </BentoTilt>
          </div>

          {/* Right: Nocturnal Predator Lore */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-[10px] text-amber-500 tracking-editorial uppercase block mb-2">
                THE SMILING ENTITIES
              </span>
              <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                NOCTURNAL SIEGE
              </h3>
              <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed font-light">
                They emerge from the forest the moment the sun sinks below the tree line. They never run. They mimic familiar voices and polite neighbors, waiting for a resident to open a windowpane.
              </p>
            </div>

            <div className="p-6 bg-[#0d0a04] border border-white/10 rounded-xl">
              <span className="font-mono text-[10px] text-white/40 tracking-editorial uppercase block mb-2">
                CRITICAL PROTOCOL
              </span>
              <p className="font-cinzel italic text-sm text-white/90">
                "They don't shout. They whisper. They know your name. Do not look into their eyes."
              </p>
            </div>
          </div>
        </div>

        {/* 03 — WHAT MAKES IT TERRIFYING */}
        <div className="border-t border-white/[0.08] pt-16">
          <span className="font-mono text-[10px] text-amber-500 tracking-cinematic uppercase block mb-6">
            WHAT MAKES IT TERRIFYING
          </span>

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
