import React, { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export const Stats: React.FC = () => {
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
            start: "top 85%",
            onEnter: () =>
              gsap.fromTo(
                card,
                { opacity: 0, y: 16, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  delay: idx * 0.1,
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

  const stats = [
    {
      num: "06",
      label: "Documented Anomalies",
      note: "Distinct physical locations where the boundary between living memory and supernatural recurrence remains permanently fractured.",
      badge: "RECORDED",
    },
    {
      num: "1894",
      label: "Perimeter Established",
      note: "The year the estate gates locked permanently. Historical census records from the subsequent decade register zero departures.",
      badge: "HISTORICAL",
    },
    {
      num: "17",
      label: "Archival Testimonies",
      note: "Recovered letters, diary entries, and wire recordings from individuals who entered the grounds and documented the shifting topography.",
      badge: "PRESERVED",
    },
    {
      num: "00",
      label: "Documented Departures",
      note: "No individual who crossed the threshold of the sunken basin has ever recorded a permanent return to undisturbed consciousness.",
      badge: "VERIFIED",
    },
  ];

  return (
    <section
      id="stats-section"
      className="relative min-h-screen flex items-center bg-transparent py-36 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-5 space-y-5">
          <span className="label-mono">ARCHIVAL CONTEXT // 1894–1922</span>
          <h2 className="display-heading text-3xl sm:text-5xl uppercase">
            THE RECORD<br />
            <span style={{ color: "#8B0E1A" }}>REMAINS OPEN.</span>
          </h2>
          <div className="w-10 h-[1px] bg-[#8B0E1A]" />
          <p className="body-prose text-sm leading-relaxed">
            The estate was never a sanctuary. It was an excavation into memory that should not have been awakened. Every figure below is drawn from ecclesiastical logs and recovery surveys conducted between 1894 and 1922.
          </p>
          <p className="font-mono text-xs text-white/50 italic">
            "The soil does not forget what was buried in it."
            <br />
            <span className="text-white/35 not-italic">
              — Survey Entry 12, Parish of Blackwood
            </span>
          </p>
          <div className="pt-2">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[2px] border border-white/20 hover:border-white/40 bg-black/40 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <span>Examine Evidence</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8B0E1A]" />
            </a>
          </div>
        </div>

        {/* Right 2×2 Stat Grid (Clean Glass over Video) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {stats.map((s, idx) => (
            <div
              key={idx}
              ref={(el) => {
                cardsRef.current[idx] = el;
              }}
              className="glass-panel p-6 sm:p-7 rounded-xl space-y-2.5 transition-all duration-300 hover:border-white/[0.2] bg-black/35 backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[8px] font-mono font-medium tracking-widest text-white/50 bg-white/[0.04] border border-white/[0.06] uppercase">
                  {s.badge}
                </span>
              </div>
              <div className="font-cinzel text-4xl sm:text-5xl font-black text-white">
                {s.num}
              </div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#8B0E1A] font-semibold">
                {s.label}
              </p>
              <p className="font-inter text-xs text-white/60 leading-relaxed font-light">
                {s.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
