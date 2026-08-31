import React, { useState, useEffect, useRef } from 'react';
import { soundEngine } from '../audio/soundEngine';

export const HiddenDisturbance: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDisturbed, setIsDisturbed] = useState(false);
  const hoverTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isHovered) {
      hoverTimerRef.current = window.setTimeout(() => {
        setIsDisturbed(true);
        soundEngine.playStinger('portal_open');
      }, 4500); // 4.5 seconds of stillness
    } else {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      setIsDisturbed(false);
    }

    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [isHovered]);

  return (
    <section className="relative w-full bg-[#030305] py-32 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <span className="font-mono text-[10px] text-white/30 tracking-cinematic uppercase mb-8">
          ARCHIVAL REEL // STILLNESS STUDY
        </span>

        {/* Archival Celluloid Frame */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full max-w-2xl aspect-[16/10] bg-[#07070a] border border-white/[0.08] shadow-cinema overflow-hidden cursor-crosshair group flex items-center justify-center p-8 select-none"
        >
          {/* Subtle Film Grain & Scanlines */}
          <div className="absolute inset-0 film-grain opacity-60 pointer-events-none" />
          <div className="absolute inset-0 cinema-scanlines opacity-40 pointer-events-none" />

          {/* Archival Shadow Play */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Minimalist Framing Silhouette */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center">
              {/* Window Arch Frame */}
              <div className="absolute inset-0 border-2 border-white/10 rounded-t-full bg-black/60 overflow-hidden">
                {/* Background Wall */}
                <div className="w-full h-full bg-[#050508] relative">
                  {/* Subtle entity shadow that imperceptibly manifests after 4.5s of hovering */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-[3000ms] ease-in-out ${
                      isDisturbed ? 'opacity-90' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-44 bg-gradient-to-t from-black via-red-950/20 to-transparent rounded-t-full" />
                    {/* Two faint specular pinpoints reflecting light in the shadow */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-60">
                      <div className="w-1 h-1 bg-white/70 rounded-full" />
                      <div className="w-1 h-1 bg-white/70 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="font-cinzel text-xs text-white/30 tracking-editorial uppercase mt-6">
              WARREN S.P.R ARCHIVAL FRAME // CELLAR THRESHOLD
            </span>
          </div>

          {/* Discreet timestamp watermark */}
          <div className="absolute bottom-4 left-6 font-mono text-[9px] text-white/20 tracking-editorial">
            1971.10.31 // 03:07:14 EST
          </div>
        </div>
      </div>
    </section>
  );
};
