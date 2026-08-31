import React, { useState, useEffect, useRef } from 'react';
import { Flame, Play, RotateCcw } from 'lucide-react';
import { BentoTilt } from '../BentoTilt';
import { UNIVERSES_DATA } from '../../data/universes';
import { UniverseInfo } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface TalkToMeBenchProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
  onUpdateHeartRate?: (bpm: number) => void;
}

export const TalkToMeBench: React.FC<TalkToMeBenchProps> = ({ onOpenTrailer, onUpdateHeartRate }) => {
  const universe = UNIVERSES_DATA.find((u) => u.id === 'talktome')!;
  const [isHolding, setIsHolding] = useState(false);
  const [durationMs, setDurationMs] = useState(0);
  const [breachOccurred, setBreachOccurred] = useState(false);
  const timerRef = useRef<number | null>(null);

  const durationSec = +(durationMs / 1000).toFixed(1);
  const calculatedBpm = Math.min(180, Math.floor(72 + (durationSec * 2.5)));

  useEffect(() => {
    if (onUpdateHeartRate) {
      onUpdateHeartRate(calculatedBpm);
    }
  }, [calculatedBpm, onUpdateHeartRate]);

  useEffect(() => {
    if (isHolding) {
      const startTime = Date.now() - durationMs;
      timerRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        setDurationMs(elapsed);

        if (Math.random() > 0.7) {
          soundEngine.playHeartbeat(calculatedBpm);
        }

        if (elapsed > 90000 && !breachOccurred) {
          setBreachOccurred(true);
        }
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHolding, durationMs, calculatedBpm, breachOccurred]);

  const handleStartHold = () => {
    if (breachOccurred) {
      setBreachOccurred(false);
      setDurationMs(0);
    }
    setIsHolding(true);
    soundEngine.playCardDraw();
  };

  const handleStopHold = () => {
    setIsHolding(false);
  };

  const handleReset = () => {
    setIsHolding(false);
    setDurationMs(0);
    setBreachOccurred(false);
  };

  return (
    <section
      id="chapter-talktome"
      className="relative min-h-screen w-full bg-[#03060a] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Scary Film Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none filter grayscale contrast-125"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#03060a] via-[#03060a]/90 to-[#03060a]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 01 — IMMERSIVE INTRO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-white/[0.08] pb-10">
          <div>
            <span className="font-mono text-[10px] text-cyan-400 tracking-cinematic uppercase block mb-3">
              CHAPTER 02 // EMBALMED CERAMIC CONJURATION
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              TALK TO ME
            </h2>
            <p className="font-cinzel italic text-base sm:text-xl text-white/70 mt-3">
              HOLD THE HAND. SAY THE WORDS. NEVER EXCEED NINETY SECONDS.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenTrailer(universe)}
              className="py-3.5 px-6 bg-white text-[#040406] hover:bg-cyan-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded-sm shadow-xl"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY TRAILER</span>
            </button>
          </div>
        </div>

        {/* 02 — THE 90-SECOND THRESHOLD INTERACTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          {/* Left: Press & Hold Hand Stage */}
          <div className="lg:col-span-7">
            <BentoTilt tiltFactor={6}>
              <div className="relative rounded-2xl p-8 sm:p-14 bg-[#050c14] border border-white/15 shadow-2xl min-h-[460px] flex flex-col items-center justify-center overflow-hidden">
                {/* Timer Counter */}
                <div className="relative z-10 text-center mb-10">
                  <span className="font-mono text-[10px] text-cyan-400/80 tracking-editorial uppercase block mb-2">
                    POSSESSION THRESHOLD GAUGE
                  </span>
                  <div
                    className={`font-mono font-black text-5xl sm:text-7xl tracking-tighter transition-colors ${
                      durationSec >= 90
                        ? 'text-red-500 animate-pulse'
                        : durationSec >= 60
                        ? 'text-amber-400'
                        : 'text-white'
                    }`}
                  >
                    {durationSec}s <span className="text-xl sm:text-2xl text-white/30">/ 90.0s</span>
                  </div>
                </div>

                {/* Hold Button */}
                <div className="relative z-10 flex flex-col items-center">
                  <button
                    id="hold-embalmed-hand-btn"
                    onMouseDown={handleStartHold}
                    onMouseUp={handleStopHold}
                    onTouchStart={handleStartHold}
                    onTouchEnd={handleStopHold}
                    className={`w-44 h-44 sm:w-52 sm:h-52 rounded-full flex flex-col items-center justify-center p-4 transition-all duration-300 select-none cursor-pointer border ${
                      isHolding
                        ? 'bg-cyan-950/90 border-cyan-400 scale-95 shadow-[0_0_50px_rgba(6,182,212,0.5)]'
                        : 'bg-black/60 border-white/15 hover:border-cyan-500/50 hover:bg-black/80'
                    }`}
                  >
                    <Flame className={`w-8 h-8 mb-2 ${isHolding ? 'text-cyan-300 animate-pulse' : 'text-white/40'}`} />
                    <span className="font-cinzel font-bold text-xs sm:text-sm text-white tracking-widest uppercase text-center">
                      {isHolding ? 'HOLDING HAND' : 'PRESS & HOLD'}
                    </span>
                    <span className="font-mono text-[9px] text-white/40 mt-1">
                      {isHolding ? 'RELEASE TO DISCONNECT' : '"TALK TO ME"'}
                    </span>
                  </button>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={handleReset}
                      className="font-mono text-[10px] text-white/40 hover:text-white uppercase tracking-editorial flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>RESET TIMER</span>
                    </button>
                  </div>
                </div>

                {/* Breach Alert Overlay */}
                {breachOccurred && (
                  <div className="absolute inset-0 z-20 bg-red-950/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white uppercase mb-2">
                      90-SECOND THRESHOLD EXCEEDED
                    </h3>
                    <p className="font-grotesk text-xs sm:text-sm text-red-200/80 max-w-sm font-light mb-6">
                      The boundary is compromised. The entity is now permanently anchored to the host vessel.
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] tracking-editorial uppercase transition-all rounded-sm cursor-pointer"
                    >
                      RESET THRESHOLD
                    </button>
                  </div>
                )}
              </div>
            </BentoTilt>
          </div>

          {/* Right: Ritual Lore */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-[10px] text-cyan-400 tracking-editorial uppercase block mb-2">
                THE EMBALMED HAND RITUAL
              </span>
              <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                THE NINETY-SECOND RULE
              </h3>
              <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed font-light">
                Encased inside ceramic plaster lies the mummified hand of a conjurer. By clasping it and speaking the invocation, the user opens an unfiltered conduit to purgatorial entities.
              </p>
            </div>

            <div className="p-6 bg-[#050c14] border border-white/10 rounded-xl space-y-4">
              <span className="font-mono text-[10px] text-white/40 tracking-editorial uppercase block">
                THE TWO INVOCATIONS
              </span>
              <div className="border-l-2 border-cyan-500/60 pl-4 space-y-2 font-cinzel text-sm text-white/90">
                <p>"TALK TO ME." <span className="text-white/40 font-grotesk text-xs font-light block mt-0.5">— Opens spectral visibility.</span></p>
                <p>"I LET YOU IN." <span className="text-white/40 font-grotesk text-xs font-light block mt-0.5">— Grants temporary corporeal sovereignty.</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* 03 — WHAT MAKES IT TERRIFYING */}
        <div className="border-t border-white/[0.08] pt-16">
          <span className="font-mono text-[10px] text-cyan-400 tracking-cinematic uppercase block mb-6">
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
