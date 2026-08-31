import React, { useRef, useEffect } from "react";
import { FileText } from "lucide-react";

export const Story: React.FC = () => {
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let instances: any[] = [];
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      panelRefs.current.forEach((el) => {
        if (!el) return;
        instances.push(
          ScrollTrigger.create({
            trigger: el,
            start: "top 82%",
            onEnter: () =>
              gsap.fromTo(
                el,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
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
      id="story"
      className="relative bg-transparent py-28 sm:py-36 px-6 sm:px-12 border-t border-white/[0.06]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="label-mono block mb-3">
            CURATORIAL CASE FILES // TRANSCRIPTS
          </span>
          <h2 className="display-heading text-3xl sm:text-5xl uppercase">
            THE RECORD OF<br />THE ESTATE
          </h2>
          <div className="w-12 h-[1px] bg-[#8B0E1A] mx-auto mt-4" />
        </div>

        {/* Panel 01: The Excavation */}
        <div
          ref={(el) => {
            panelRefs.current[0] = el;
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24 sm:mb-32"
        >
          <div className="space-y-4">
            <span className="label-mono">CASE TRANSCRIPT 01 · THE EXCAVATION</span>
            <h3 className="display-heading text-3xl sm:text-4xl lg:text-5xl uppercase">
              WE DO NOT<br />CREATE LEGENDS.
            </h3>
            <div className="w-10 h-[1px] bg-[#8B0E1A]" />
            <p className="body-prose text-sm leading-relaxed">
              Every anomalous sector within the estate grounds is tied to a specific historical fracture. We do not invent myths. We transcribe recovered parish registers, cross-reference soil samples, and collect the testimonies of those who lingered on the grounds past dusk.
            </p>
            <p className="font-inter text-sm text-white/60 leading-relaxed font-light italic">
              We document what remains. We preserve the sensory signatures. We depart before the perimeter locks again.
            </p>
            {/* Field Log Entry */}
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] space-y-1 bg-black/40 backdrop-blur-md">
              <span className="font-mono text-[9px] text-[#8B0E1A] uppercase tracking-widest font-semibold block">
                FIELD ENTRY // OCTOBER 1894
              </span>
              <p className="font-inter text-xs text-white/80 leading-relaxed font-light italic">
                "The soil was still warm to the touch twelve hours after sunset. When we dug three inches below the turf, we discovered black rose roots intertwined with dried bone fragments that showed no sign of fossilization."
              </p>
            </div>
          </div>

          {/* Archival Case Record Plate */}
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/[0.08] space-y-6 bg-black/40 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8B0E1A]" />
                <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
                  ARCHIVE SURVEY PLATE 01
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8B0E1A] uppercase tracking-widest">
                VERIFIED LOG
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono text-white/70">
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>SECTOR:</span>
                <span className="text-white">PERIMETER ENTRANCE</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>YEAR OF INCIDENT:</span>
                <span className="text-white">AUTUMN 1894</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>SOIL SAMPLE ANALYSIS:</span>
                <span className="text-red-400">UNIDENTIFIED ORGANIC RESIDUE</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>ANOMALY CLASSIFICATION:</span>
                <span className="text-white">TEMPORAL SHIFT // LOCKOUT</span>
              </div>
            </div>

            <p className="font-inter text-xs text-white/80 font-light leading-relaxed italic border-l-2 border-[#8B0E1A] pl-3">
              "The table was set for forty. Forty silver forks were found turned face down into the mahogany. No footprints departed the dining hall."
            </p>
          </div>
        </div>

        {/* Central Curatorial Quote */}
        <div
          ref={(el) => {
            panelRefs.current[1] = el;
          }}
          className="py-14 px-6 sm:px-14 border-y border-white/[0.06] text-center max-w-3xl mx-auto my-20 sm:my-28 bg-black/30 backdrop-blur-sm rounded-xl"
        >
          <p className="font-cinzel text-xl sm:text-2xl md:text-3xl text-white font-bold italic leading-relaxed tracking-wide mb-4">
            "Some scents do not awaken memories.
            <br />They awaken what is waiting behind them."
          </p>
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#8B0E1A] font-semibold">
            — THE CURATORIAL LOG · ARCHIVE ENTRY ZERO
          </span>
        </div>

        {/* Panel 02: The Preservation */}
        <div
          ref={(el) => {
            panelRefs.current[2] = el;
          }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* Archival Case Record Plate 02 */}
          <div className="glass-panel p-8 sm:p-10 rounded-2xl border border-white/[0.08] space-y-6 order-2 lg:order-1 bg-black/40 backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#8B0E1A]" />
                <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
                  ARCHIVE SURVEY PLATE 02
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#8B0E1A] uppercase tracking-widest">
                SEALED SAMPLES
              </span>
            </div>

            <div className="space-y-4 text-xs font-mono text-white/70">
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>BATCH CODE:</span>
                <span className="text-white">EXP-1922-ROOTS</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>EXTRACTION SITE:</span>
                <span className="text-white">SUBTERRANEAN CELLARS</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>OLFACTORY COORDINATE:</span>
                <span className="text-white">BURNT OUD & ASH RESIN</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.04] pb-2">
                <span>CONTAINMENT INTEGRITY:</span>
                <span className="text-[#8B0E1A]">PERMANENT LINK TO SOIL</span>
              </div>
            </div>

            <p className="font-inter text-xs text-white/80 font-light leading-relaxed italic border-l-2 border-[#8B0E1A] pl-3">
              "When the glass seal was fractured in London, laboratory instruments recorded the ambient scent of wet cemetery soil forty miles away."
            </p>
          </div>

          <div className="space-y-4 order-1 lg:order-2">
            <span className="label-mono">CASE TRANSCRIPT 02 · THE PRESERVATION</span>
            <h3 className="display-heading text-3xl sm:text-4xl lg:text-5xl uppercase">
              SEALED IN<br />DARKNESS.
            </h3>
            <div className="w-10 h-[1px] bg-[#8B0E1A]" />
            <p className="body-prose text-sm leading-relaxed">
              The sensory accords gathered from the estate are bottled in darkness under strictly controlled atmospheric conditions. What is preserved is not a perfume—it is an olfactory coordinate that links the wearer directly to the coordinates of the incident.
            </p>
            <p className="font-inter text-sm text-white/60 leading-relaxed font-light italic">
              When the seal is broken, the memory returns to the air. And with it, whatever was standing in the room when the record was created.
            </p>
            {/* Field Log Entry 2 */}
            <div className="p-4 rounded-xl glass-panel border border-white/[0.08] space-y-1 bg-black/40 backdrop-blur-md">
              <span className="font-mono text-[9px] text-[#8B0E1A] uppercase tracking-widest font-semibold block">
                FIELD ENTRY // NOVEMBER 1922
              </span>
              <p className="font-inter text-xs text-white/80 leading-relaxed font-light italic">
                "We opened the sample container in an enclosed laboratory forty miles south of the estate. Within three minutes, the temperature in the room fell to 4°C, and the sound of footsteps was recorded in the hallway outside."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
