import React, { useEffect, useRef } from "react";

export const HowItWorks: React.FC = () => {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let instances: any[] = [];
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      stepsRef.current.forEach((step, idx) => {
        if (!step) return;
        instances.push(
          ScrollTrigger.create({
            trigger: step,
            start: "top 85%",
            onEnter: () =>
              gsap.fromTo(
                step,
                { opacity: 0, x: 20, scale: 0.98 },
                {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  duration: 0.85,
                  delay: idx * 0.15,
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

  const stages = [
    {
      num: "01",
      title: "The Sensory Intrusion",
      desc: "Contact is sensory before it is visual. A sudden barometric plunge, the faint scent of crushed black roses or cold stagnant pond water, and the sensation that the distance between yourself and the horizon has silently collapsed.",
      note: "Documented within four minutes of crossing the iron perimeter.",
    },
    {
      num: "02",
      title: "The Shifting Topography",
      desc: "The garden does not adhere to Euclidean geometry. Pathways lengthen when walked in reverse; stone steps leading downward bring you back to the same ruined conservatory. The exit gate remains visible, but unreachable.",
      note: "All surveyed compass bearings exhibit permanent declination drift.",
    },
    {
      num: "03",
      title: "The Involuntary Continuation",
      desc: "The estate is not a physical enclosure. Once its sensory markers have been inhaled, the memory recurs in dreams and quiet rooms. Leaving the physical grounds was an illusion; the garden now exists within your perception.",
      note: "No case of natural cessation has been recorded in the historical archive.",
    },
  ];

  return (
    <section
      id="how-section"
      className="relative min-h-screen flex items-center bg-transparent py-36 px-6 sm:px-12 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Copy */}
        <div className="lg:col-span-5 space-y-5">
          <span className="label-mono">THE DESCENT PHENOMENOLOGY</span>
          <h2 className="display-heading text-3xl sm:text-5xl uppercase">
            THE THREE<br />
            <span style={{ color: "#8B0E1A" }}>THRESHOLDS.</span>
          </h2>
          <div className="w-10 h-[1px] bg-[#8B0E1A]" />
          <p className="body-prose text-sm leading-relaxed">
            The progression of contact has been documented across twenty-four recovered journals. What begins as an aesthetic curiosity invariably transitions into an irreversible psychological integration.
          </p>
          <div className="p-5 rounded-xl glass-panel border border-white/[0.08] space-y-1.5 bg-black/40 backdrop-blur-md">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8B0E1A] font-semibold block">
              CURATORIAL OBSERVATION
            </span>
            <p className="font-inter text-xs text-white/80 italic font-light leading-relaxed">
              "We did not discover the garden. The garden opened its gates because we were already searching for it."
            </p>
          </div>
        </div>

        {/* Right Stage Rows */}
        <div className="lg:col-span-7 space-y-4">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              ref={(el) => {
                stepsRef.current[idx] = el;
              }}
              className="glass-panel p-6 sm:p-7 rounded-xl flex items-start gap-5 group transition-all duration-300 hover:border-white/[0.2] bg-black/40 backdrop-blur-md"
            >
              {/* Number */}
              <div className="font-cinzel text-3xl font-bold text-white/25 group-hover:text-[#8B0E1A] transition-colors shrink-0">
                {stage.num}
              </div>
              {/* Text */}
              <div className="flex-1 space-y-2">
                <h3 className="font-cinzel text-base font-bold text-white uppercase tracking-wide">
                  {stage.title}
                </h3>
                <p className="font-inter text-xs text-white/70 leading-relaxed font-light">
                  {stage.desc}
                </p>
                <p className="font-mono text-[9px] text-[#8B0E1A] tracking-wider uppercase">
                  {stage.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
