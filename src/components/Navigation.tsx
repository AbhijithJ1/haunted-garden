import React, { useState, useEffect } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { SHOWCASE_FILMS } from '../data/showcaseFilms';

interface NavigationProps {
  isAudioActive?: boolean;
  onToggleAudio?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isAudioActive = false,
  onToggleAudio,
}) => {
  const [activeWorld, setActiveWorld] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Dynamically detect current showcase world on screen
      const totalWorlds = SHOWCASE_FILMS.length;
      for (let i = totalWorlds; i >= 1; i--) {
        const id = `showcase-world-${i < 10 ? `0${i}` : i}`;
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveWorld(i);
            return;
          }
        }
      }
      setActiveWorld(1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentFilm = SHOWCASE_FILMS[activeWorld - 1] || SHOWCASE_FILMS[0];

  return (
    <header className="fixed top-0 inset-x-0 z-50 py-4 sm:py-5 px-4 sm:px-10 bg-transparent select-none transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-sans">
        
        {/* Left: Clean Brandmark */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <span className="font-bold text-lg sm:text-xl tracking-[0.18em] text-red-600 uppercase transition-colors">
            CINEDREAD
          </span>
          {isScrolled && (
            <span className="hidden md:inline-block text-xs text-white/50 border-l border-white/20 pl-3">
              {currentFilm.title} <span className="text-red-500">({activeWorld}/12)</span>
            </span>
          )}
        </div>



        {/* Right: Audio Control & Stream Action */}
        <div className="flex items-center gap-3">
          


          {/* Audio Atmosphere Toggle */}
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 text-xs transition-colors cursor-pointer"
          >
            {isAudioActive ? (
              <>
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-full bg-red-500 animate-pulse" />
                  <span className="w-0.5 h-2/3 bg-red-500 animate-pulse" />
                  <span className="w-0.5 h-4/5 bg-red-500 animate-pulse" />
                </div>
                <span className="hidden md:inline">Audio Live</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
                <span className="hidden md:inline">Audio Off</span>
              </>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
