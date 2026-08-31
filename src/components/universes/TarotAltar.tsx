import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCw } from 'lucide-react';
import { BentoTilt } from '../BentoTilt';
import { TAROT_CARDS, UNIVERSES_DATA } from '../../data/universes';
import { TarotCardData, UniverseInfo } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface TarotAltarProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const TarotAltar: React.FC<TarotAltarProps> = ({ onOpenTrailer }) => {
  const universe = UNIVERSES_DATA.find((u) => u.id === 'tarot')!;
  const [selectedCard, setSelectedCard] = useState<TarotCardData>(TAROT_CARDS[0]);
  const [isFlipped, setIsFlipped] = useState(true);

  const handleCardClick = (card: TarotCardData) => {
    setSelectedCard(card);
    setIsFlipped(false);
    soundEngine.playCardDraw();

    setTimeout(() => {
      setIsFlipped(true);
      soundEngine.playOccultChime();
    }, 200);
  };

  const handleRandomDraw = () => {
    const randomIdx = Math.floor(Math.random() * TAROT_CARDS.length);
    handleCardClick(TAROT_CARDS[randomIdx]);
  };

  return (
    <section
      id="chapter-tarot"
      className="relative min-h-screen w-full bg-[#050308] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Scary Film Atmosphere */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none filter grayscale contrast-125"
        style={{
          backgroundImage: `url('https://img.youtube.com/vi/${universe.trailerYoutubeId}/maxresdefault.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050308] via-[#050308]/90 to-[#050308]" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* 01 — IMMERSIVE INTRO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-b border-white/[0.08] pb-10">
          <div>
            <span className="font-mono text-[10px] text-purple-400 tracking-cinematic uppercase block mb-3">
              CHAPTER 06 // THE CURSED ASTROLOGICAL VELLUM
            </span>
            <h2 className="font-cinzel font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase">
              TAROT
            </h2>
            <p className="font-cinzel italic text-base sm:text-xl text-white/70 mt-3">
              THE CARDS WERE NEVER THE WARNING. THEY WERE THE SENTENCE.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenTrailer(universe)}
              className="py-3.5 px-6 bg-white text-[#040406] hover:bg-purple-600 hover:text-white font-mono text-[11px] tracking-editorial uppercase transition-all duration-300 cursor-pointer flex items-center gap-2 rounded-sm shadow-xl"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY TRAILER</span>
            </button>
          </div>
        </div>

        {/* 02 — THE ARCANA DECK & PROPHECY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          {/* Left: 3D Card Display with BentoTilt */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <BentoTilt tiltFactor={8}>
              <div className="w-[300px] sm:w-[340px] h-[440px] sm:h-[500px] relative flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedCard.id}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full bg-[#0b0614] border border-purple-500/40 rounded-2xl p-7 flex flex-col justify-between shadow-2xl relative"
                    style={{
                      boxShadow: '0 20px 60px -10px rgba(124, 58, 237, 0.35)',
                    }}
                  >
                    {/* Card Header */}
                    <div className="flex items-center justify-between font-mono text-[10px] text-purple-300">
                      <span>{selectedCard.arcana}</span>
                      <span>{selectedCard.astrologicalSign}</span>
                    </div>

                    {/* Card Center Motif */}
                    <div className="my-auto text-center py-6">
                      <span className="font-cinzel text-xl sm:text-2xl font-bold text-white uppercase block">
                        {selectedCard.name}
                      </span>
                      <span className="font-mono text-[10px] text-purple-400 tracking-editorial uppercase block mt-2">
                        ARCHETYPE: {selectedCard.archetype}
                      </span>
                    </div>

                    {/* Card Bottom Meta */}
                    <div className="pt-4 border-t border-purple-500/20 flex items-center justify-between font-mono text-[10px] text-white/40">
                      <span>AFFINITY: {selectedCard.demonicAffinity}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </BentoTilt>

            {/* Quick Draw Action */}
            <div className="mt-6 flex flex-wrap justify-center gap-2 font-mono text-[10px]">
              {TAROT_CARDS.map((card) => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card)}
                  className={`px-3 py-1.5 border rounded-sm transition-all cursor-pointer ${
                    selectedCard.id === card.id
                      ? 'bg-purple-950/80 border-purple-400 text-white font-bold'
                      : 'bg-black/40 border-white/10 text-white/40 hover:text-white'
                  }`}
                >
                  {card.name.split(' ')[1] || card.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Foretold Demise Prophecy */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-[10px] text-purple-400 tracking-editorial uppercase block mb-2">
                ASTROLOGICAL CONDEMNATION
              </span>
              <h3 className="font-cinzel font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                {selectedCard.name}
              </h3>
              <p className="font-grotesk text-sm text-white/60 mt-4 leading-relaxed font-light">
                {selectedCard.symbolism}
              </p>
            </div>

            <div className="p-6 bg-[#0b0614] border border-purple-500/30 rounded-xl">
              <span className="font-mono text-[10px] text-purple-400 tracking-editorial uppercase block mb-2">
                FORETOLD DEMISE PROPHECY
              </span>
              <p className="font-cinzel italic text-sm sm:text-base text-white/95 leading-relaxed">
                "{selectedCard.demiseProphecy}"
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleRandomDraw}
                className="py-3 px-6 bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-200 font-mono text-[10px] tracking-editorial uppercase flex items-center gap-2 rounded-sm cursor-pointer transition-all shadow-lg"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>DRAW ANOTHER CARD</span>
              </button>
            </div>
          </div>
        </div>

        {/* 03 — WHAT MAKES IT TERRIFYING */}
        <div className="border-t border-white/[0.08] pt-16">
          <span className="font-mono text-[10px] text-purple-400 tracking-cinematic uppercase block mb-6">
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
