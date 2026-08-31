import React from 'react';
import { FilmData, ARCHIVE_FRAGMENTS } from '../data/films';
import { FilmFragment } from './FilmFragment';
import { DecryptedText } from './DecryptedText';
import { Layers } from 'lucide-react';

interface ArchiveDepthEnvironmentProps {
  onOpenTrailer: (film: FilmData) => void;
}

export const ArchiveDepthEnvironment: React.FC<ArchiveDepthEnvironmentProps> = ({
  onOpenTrailer,
}) => {
  return (
    <section
      id="archive-depth-environment"
      className="relative w-full bg-black text-[#E8E6DF] select-none py-24 overflow-hidden"
    >
      {/* 01. The Archive Expansion Threshold */}
      <div className="relative z-20 max-w-5xl mx-auto text-center px-6 sm:px-12 space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] text-red-500 tracking-[0.45em] uppercase font-bold">
          <Layers className="w-3.5 h-3.5 animate-pulse" />
          <DecryptedText
            text="LEVEL 02 // THE ARCHIVE EXPANDS INTO INFINITY"
            speed={35}
            maxIterations={10}
            animateOn="both"
          />
        </div>

        <h2 className="font-cinzel font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tight uppercase leading-[0.88]">
          DEEPER DISPATCHES
        </h2>

        <p className="font-cinzel italic text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          "Those twelve showcase worlds were only the entrance. The archive extends infinitely into the dark."
        </p>
      </div>

      {/* 02. Continuous Data-Driven Discovery Corridor */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {ARCHIVE_FRAGMENTS.map((film, index) => (
          <FilmFragment
            key={film.id}
            film={film}
            index={index}
            onOpenTrailer={onOpenTrailer}
          />
        ))}
      </div>
    </section>
  );
};
