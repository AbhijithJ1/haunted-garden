import React, { useEffect, useRef } from "react";
import { frames, Frame } from "../config/frames";
import { FileText, MapPin } from "lucide-react";

const CHAPTERS = frames.filter((f) => f.id !== "entry" && f.id !== "loop-complete");

interface CatalogProps {
  onExamineDossier?: (frame: Frame) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ onExamineDossier }) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let instances: any[] = [];
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      cardsRef.current.forEach((card, idx) => {
        if (!card) return;
        instances.push(
          ScrollTrigger.create({
            trigger: card,
            start: "top 88%",
            onEnter: () =>
              gsap.fromTo(
                card,
                { opacity: 0, y: 20, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  delay: (idx % 3) * 0.1,
                  ease: "power3.out",
                }
              ),
            once: true,
          })
        );
      });
    };
    init();
    return () => instances.forEach((s) => s.kill());
  }, []);

  return (
    <section
      id="catalog"
      className="relative bg-transparent py-28 sm:py-36 px-6 sm:px-12 border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 border-b border-white/[0.06] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="label-mono block mb-2">
              THE ACTIVE CASE ARCHIVES // RECORDS 01–06
            </span>
            <h2 className="display-heading text-3xl sm:text-5xl md:text-6xl uppercase">
              THE SIX<br />OCCURRENCES
            </h2>
          </div>
          <p className="body-prose text-sm max-w-sm font-light leading-relaxed">
            Six distinct anomalous sectors documented within the perimeter. Each record preserves the historical incident, sensory markers, and survivor testimonies.
          </p>
        </div>

        {/* 3-column Dossier Grid (Clean Glass over Video) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {CHAPTERS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              onClick={() => onExamineDossier?.(item)}
              className="group relative flex flex-col rounded-xl glass-panel p-6 border border-white/[0.08] hover:border-white/[0.22] transition-all duration-300 hover:-translate-y-1 cursor-pointer space-y-3.5 bg-black/40 backdrop-blur-md"
            >
              {/* Top Record Tag */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#8B0E1A] font-semibold">
                  RECORD {item.chapterNumber}
                </span>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                  CLASSIFIED
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h3 className="font-cinzel text-xl font-bold text-white uppercase tracking-wide group-hover:text-red-100 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-[10px] font-mono text-white/50">
                  <MapPin className="w-3 h-3 text-[#8B0E1A] shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
              </div>

              {/* Incident Excerpt */}
              <p className="font-inter text-xs text-white/70 font-light leading-relaxed line-clamp-3">
                {item.historicalIncident}
              </p>

              {/* Field Observation Quote */}
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <p className="font-inter text-[11px] text-white/80 italic font-light leading-relaxed line-clamp-2">
                  "{item.fieldObservation}"
                </p>
              </div>

              {/* Sensory Notes */}
              {item.sensoryNotes && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.sensoryNotes.map((note, nIdx) => (
                    <span
                      key={nIdx}
                      className="px-2 py-0.5 rounded text-[9px] font-mono text-white/60 bg-white/[0.03] border border-white/[0.06]"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}

              {/* Card Action */}
              <div className="pt-3 border-t border-white/[0.06] mt-auto">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExamineDossier?.(item);
                  }}
                  className="w-full py-2.5 rounded-[2px] border border-white/[0.1] group-hover:border-[#8B0E1A]/80 bg-white/[0.02] group-hover:bg-[#8B0E1A]/20 text-white/80 group-hover:text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#8B0E1A]" />
                  <span>Examine Dossier</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
