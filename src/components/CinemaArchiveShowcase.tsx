import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Volume2, VolumeX, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';
import { UNIVERSES_DATA } from '../data/universes';
import { UniverseInfo } from '../types';
import { soundEngine } from '../audio/soundEngine';

interface CinemaArchiveShowcaseProps {
  onOpenTrailer: (universe: UniverseInfo) => void;
}

export const CinemaArchiveShowcase: React.FC<CinemaArchiveShowcaseProps> = ({
  onOpenTrailer,
}) => {
  const [activeUniverseId, setActiveUniverseId] = useState<string>('conjuring');
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // IntersectionObserver to dynamically track which film world is currently on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-universe-id');
            if (id) {
              setActiveUniverseId(id);
              soundEngine.setUniverseAtmosphere(id);
            }
          }
        });
      },
      { threshold: 0.45 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const fearMechanisms: Record<string, { mechanism: string; insight: string; architecture: string; evidence: string }> = {
    conjuring: {
      mechanism: 'THE FEAR OF INVASION',
      insight: 'Home is supposed to protect you. The entity systematically dismantles parental sanctuary from within.',
      architecture: 'Vertical Depth // Secluded Rhode Island Farmhouse Cellar',
      evidence: 'Recorded demonic vocalizations & physical levitations documented by Ed & Lorraine Warren in 1971.',
    },
    talktome: {
      mechanism: 'THE FEAR OF SURRENDER',
      insight: 'What happens when you willingly open the door? Possession is treated as a social thrill until the 90-second threshold breaks.',
      architecture: 'Unstable Perspective // Ceramic Embalmed Medium Hand',
      evidence: 'Cellular degradation and permanent sensory transference documented after 93 seconds of contact.',
    },
    from: {
      mechanism: 'THE FEAR OF NO ESCAPE',
      insight: 'The world itself becomes the prison. The smiling creatures never run; they walk slowly outside your window at sundown.',
      architecture: 'Looping Spatial Horizon // Middle America Forest Township',
      evidence: 'Geographical recursion anomaly: all roads lead to the central township diner. Talismans protect sealed households.',
    },
    hereditary: {
      mechanism: 'THE FEAR OF INHERITANCE',
      insight: 'Some things enter your life before you are born. The bloodline was consecrated generations ago without your consent.',
      architecture: 'Miniature Dollhouse Layers // The Treehouse Coronation Chamber',
      evidence: 'Coven invocations to King Paimon of the Northwest disguised as heirloom familial jewelry and craft miniatures.',
    },
    sinister: {
      mechanism: 'THE FEAR OF WITNESSING',
      insight: 'Looking becomes participation. Bughuul travels through the celluloid image itself.',
      architecture: 'Light Beam Projection // Super-8mm Attic Murder Reels',
      evidence: 'Standard 8mm film stock containing ritual family drownings and executions spanning 1966 to 2012.',
    },
    tarot: {
      mechanism: 'THE FEAR OF DESTINY',
      insight: 'What if the ending already knows your name? The astrological debt must be repaid in blood.',
      architecture: 'Geometric Arcana Planes // 18th-Century Occultist Deck',
      evidence: 'Cursed astrological readings executing victims in precise alignment with their foretold zodiac death cards.',
    },
  };

  return (
    <div id="cinema-archive-showcase" className="relative w-full bg-[#020204] text-[#E8E6DF] overflow-hidden">
      
      {/* Narrative Section Header */}
      <div className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest block font-bold mb-2">
            02 // THE ACTIVE ARCHIVE
          </span>
          <h2 className="font-cinzel font-black text-4xl sm:text-6xl text-white tracking-tight uppercase">
            THE 6 HORROR REALMS
          </h2>
        </div>
        <p className="font-grotesk text-xs sm:text-sm text-white/60 max-w-md font-light leading-relaxed">
          Autoplaying high-impact scary scenes from each film. As you scroll, the screen transitions automatically into that universe.
        </p>
      </div>

      {/* The 6 Immersive Full-Screen Theatrical Portals */}
      <div className="flex flex-col gap-28 sm:gap-40 pb-36 px-4 sm:px-10 max-w-7xl mx-auto">
        {UNIVERSES_DATA.map((u, idx) => {
          const meta = fearMechanisms[u.id] || fearMechanisms.conjuring;
          const isActive = activeUniverseId === u.id;
          const poster = u.posterImage || `https://img.youtube.com/vi/${u.trailerYoutubeId}/maxresdefault.jpg`;

          return (
            <div
              key={u.id}
              id={`archive-reel-0${idx + 1}`}
              ref={(el) => (sectionRefs.current[idx] = el)}
              data-universe-id={u.id}
              className={`relative rounded-3xl bg-[#060609] border transition-all duration-700 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] ${
                isActive
                  ? 'border-red-500/80 shadow-[0_0_80px_rgba(220,38,38,0.3)] scale-[1.01]'
                  : 'border-white/15 hover:border-white/40'
              }`}
            >
              {/* Main Grid: Autoplaying Scary Video Frame + Editorial Dossier */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                
                {/* Left 7 Columns: Theatrical 16:9 Autoplaying Video Frame (Zero Clicking Needed!) */}
                <div className="lg:col-span-7 relative aspect-video sm:min-h-[460px] lg:min-h-[560px] bg-black overflow-hidden group">
                  
                  {/* The Autoplaying Scary Scene from YouTube */}
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${u.trailerYoutubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${u.trailerYoutubeId}&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1`}
                    title={`${u.title} Scary Scene`}
                    allow="autoplay; encrypted-media"
                    className="absolute inset-0 w-full h-full object-cover scale-110 brightness-90 contrast-125 filter grayscale-[15%] group-hover:scale-115 transition-transform duration-1000"
                  />

                  {/* Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#060609] hidden lg:block pointer-events-none" />
                  <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

                  {/* Live Broadcast Stamp */}
                  <div className="absolute top-5 left-5 right-5 flex items-center justify-between font-mono text-[9px] text-white/80 uppercase tracking-widest z-20 pointer-events-none">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                      <span>LIVE AUTOPLAY // CASE 0{idx + 1}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-black/80 border border-white/10">{u.year} • {u.runtime}</span>
                  </div>

                  {/* Play Theatrical Cut Overlay Action */}
                  <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-20">
                    <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest hidden sm:inline">
                      DIR. {u.director}
                    </span>

                    <button
                      onClick={() => onOpenTrailer(u)}
                      className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-red-600 hover:text-white font-mono text-[10px] tracking-editorial uppercase transition-all duration-300 shadow-2xl flex items-center gap-2 font-bold cursor-pointer backdrop-blur-md"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>EXPAND THEATRICAL CUT</span>
                    </button>
                  </div>
                </div>

                {/* Right 5 Columns: Rich Editorial Fear Dossier & Directorial Analysis */}
                <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6 relative z-10 bg-[#060609]">
                  
                  {/* Top Category Badge */}
                  <div>
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
                      <span className="font-mono text-[9px] text-red-500 uppercase tracking-widest font-bold">
                        CASE FILE 0{idx + 1} // 0{idx + 1} / 06
                      </span>
                      <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                        RATING: {u.rating}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest block font-bold">
                      {meta.mechanism}
                    </span>

                    <h3 className="font-cinzel font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase mt-1">
                      {u.title}
                    </h3>

                    <p className="font-cinzel italic text-sm sm:text-base text-white/90 mt-3 border-l-2 border-red-600 pl-3 leading-relaxed">
                      "{meta.insight}"
                    </p>
                  </div>

                  {/* Forensic Evidence Breakdown */}
                  <div className="space-y-4 font-mono text-[10px] text-white/70">
                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
                      <span className="text-white/40 uppercase tracking-widest text-[8px] block">
                        SPATIAL ARCHITECTURE:
                      </span>
                      <p className="text-white/90 font-sans text-xs">
                        {meta.architecture}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1">
                      <span className="text-white/40 uppercase tracking-widest text-[8px] block">
                        CELLULOID EVIDENCE:
                      </span>
                      <p className="text-white/80 font-sans text-xs font-light">
                        {meta.evidence}
                      </p>
                    </div>
                  </div>

                  {/* Why it Terrifies List */}
                  <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                    <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block">
                      PSYCHOLOGICAL TRIGGERS:
                    </span>
                    <ul className="space-y-1.5 font-grotesk text-xs text-white/60 font-light">
                      {u.whatMakesItTerrifying.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
