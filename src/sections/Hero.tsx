import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { frames, Frame } from "../config/frames";
import { FrameText } from "../components/FrameText";
import { DossierCard } from "../components/DossierCard";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { ArrowDown, FileText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExamineDossier?: (frame: Frame) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExamineDossier }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const totalFrames = frames.length; // 8
  const SCROLL_HEIGHT_VH = totalFrames * 130;
  const activeFrame = frames[activeFrameIndex] || frames[0];

  useEffect(() => {
    if (!heroRef.current || !stageRef.current) return;

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: stageRef.current,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);
        const rawIdx = Math.min(Math.floor(p * totalFrames), totalFrames - 1);
        setActiveFrameIndex(rawIdx);
      },
    });

    return () => {
      scrollTriggerInstance.kill();
    };
  }, [totalFrames]);

  const handleDotClick = (idx: number) => {
    setActiveFrameIndex(idx);
    if (heroRef.current) {
      const heroTop = heroRef.current.offsetTop;
      const heroHeight = heroRef.current.offsetHeight;
      const targetScroll = heroTop + ((idx + 0.08) / totalFrames) * heroHeight;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const isEntry = activeFrame.id === "entry";
  const isOutro = activeFrame.id === "loop-complete";
  const isChapter = !isEntry && !isOutro;

  const currentYoutubeId = activeFrame.youtubeId || "G_hqJxTMFn0";

  return (
    <section
      id="hero-section"
      ref={heroRef}
      style={{
        position: "relative",
        background: "#030306",
        minHeight: `${SCROLL_HEIGHT_VH}vh`,
      }}
    >
      {/* Sticky Stage Viewport */}
      <div
        ref={stageRef}
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Authentic Haunted Garden Horror Background Video */}
        <BackgroundVideo youtubeId={currentYoutubeId} />

        {/* Top Status Header (Only visible for chapters 1-6) */}
        {isChapter && (
          <div className="absolute top-16 sm:top-20 md:top-24 inset-x-0 z-10 flex justify-center pointer-events-none px-4">
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-mono text-white/90 uppercase tracking-[0.25em] sm:tracking-[0.3em] bg-black/40 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/[0.08]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B0E1A]" />
              <span className="truncate max-w-[240px] sm:max-w-none">
                CHAPTER {activeFrame.chapterNumber} — {activeFrame.title}
              </span>
            </div>
          </div>
        )}

        {/* Center Presentation: Entry */}
        {isEntry && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none pt-8 sm:pt-10">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl space-y-4 sm:space-y-6 pointer-events-auto"
            >
              <div className="font-mono text-[9px] sm:text-[11px] text-[#8B0E1A] tracking-[0.35em] sm:tracking-[0.4em] uppercase font-semibold">
                HISTORICAL ARCHIVE // EST. 1894
              </div>

              {/* Pure Cinzel Display Typography (Fluid Responsive clamp) */}
              <h1
                className="font-cinzel font-black uppercase text-white leading-[0.9] tracking-[0.02em] sm:tracking-[0.03em]"
                style={{
                  fontSize: "clamp(2.5rem, 7.5vw, 6.5rem)",
                  textShadow: "0 4px 24px rgba(0,0,0,0.9)",
                }}
              >
                THE HAUNTED<br />
                <span style={{ color: "#8B0E1A" }}>GARDEN</span>
              </h1>

              <p className="font-inter text-xs sm:text-sm md:text-base text-white/90 font-light max-w-lg mx-auto leading-relaxed italic px-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                "A forgotten estate beneath bruised skies. Follow the stone path. Descend into what should have remained undisturbed."
              </p>

              {/* Premium Architectural Luxury Button */}
              <div className="pt-2 sm:pt-4">
                <button
                  type="button"
                  onClick={() => handleDotClick(1)}
                  className="group relative inline-flex items-center justify-center px-7 sm:px-9 py-3 sm:py-3.5 rounded-[2px] font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.35em] font-semibold text-white transition-all duration-300 active:scale-98 cursor-pointer border border-white/25 hover:border-[#8B0E1A] bg-black/50 hover:bg-[#8B0E1A]/80 backdrop-blur-sm shadow-lg"
                >
                  <span className="relative z-10">Enter the Grounds</span>
                  <div className="absolute inset-0 bg-[#8B0E1A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[2px] -z-0" />
                </button>
              </div>

              <div className="pt-2 flex flex-col items-center gap-1 opacity-70">
                <span className="font-mono text-[8px] sm:text-[9px] text-white/70 tracking-[0.3em] uppercase">
                  SCROLL TO DESCEND
                </span>
                <ArrowDown className="w-3.5 h-3.5 text-[#8B0E1A] animate-bounce" />
              </div>
            </motion.div>
          </div>
        )}

        {/* Outro Screen */}
        {isOutro && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none pt-8 sm:pt-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-xl w-full space-y-4 sm:space-y-6 pointer-events-auto p-6 sm:p-9 rounded-xl glass-panel border border-[#8B0E1A]/40"
            >
              <span className="font-mono text-[8px] sm:text-[9px] text-[#8B0E1A] tracking-[0.3em] uppercase font-semibold">
                ARCHIVE CONCLUSION
              </span>

              <h2 className="font-cinzel font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase leading-tight">
                YOU WERE NEVER<br />
                <span style={{ color: "#8B0E1A" }}>ALONE.</span>
              </h2>

              <p className="font-inter text-xs sm:text-sm text-white/80 font-light italic leading-relaxed">
                "The path has ended. But the garden does not conclude at the perimeter. It followed you home."
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleDotClick(0)}
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-[2px] font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-white transition-all cursor-pointer active:scale-98 border border-white/20 hover:border-[#8B0E1A] bg-black/40 hover:bg-[#8B0E1A]/80"
                >
                  Return to the Perimeter →
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Chapter Presentation: Desktop Dual Panels vs Mobile Adaptive Layout */}
        {isChapter && (
          <>
            {/* Desktop Layout (>= lg: 1024px) */}
            <div className="hidden lg:grid absolute inset-0 z-10 grid-cols-[320px_1fr_310px] items-center px-8 xl:px-14 py-24 pointer-events-none gap-6">
              <div className="pointer-events-auto flex justify-start">
                <FrameText frame={activeFrame} visible={true} />
              </div>
              <div />
              <div className="pointer-events-auto flex justify-end">
                <DossierCard
                  frame={activeFrame}
                  visible={true}
                  onExamine={onExamineDossier}
                />
              </div>
            </div>

            {/* Mobile / Tablet Layout (< lg: 1024px) */}
            <div className="lg:hidden absolute inset-0 z-10 flex flex-col justify-end px-4 pb-16 pt-20 pointer-events-none">
              <div className="pointer-events-auto max-w-md mx-auto w-full space-y-2.5">
                <FrameText frame={activeFrame} visible={true} />
                <button
                  type="button"
                  onClick={() => onExamineDossier?.(activeFrame)}
                  className="w-full py-2.5 px-4 rounded-xl border border-white/20 hover:border-[#8B0E1A] bg-black/60 backdrop-blur-xl text-white text-[11px] font-mono tracking-[0.2em] uppercase font-semibold flex items-center justify-center gap-2 shadow-lg"
                >
                  <FileText className="w-3.5 h-3.5 text-[#8B0E1A]" />
                  <span>Examine Chapter Dossier</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Bottom Minimal Chapter Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
          }}
          className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto"
        >
          {frames.map((f, idx) => {
            const isCurrent = activeFrameIndex === idx;
            return (
              <button
                key={f.id}
                onClick={() => handleDotClick(idx)}
                title={`Chapter ${f.chapterNumber} — ${f.title}`}
                type="button"
                className="p-1 cursor-pointer focus:outline-none"
              >
                <div
                  style={{
                    width: isCurrent ? 20 : 5,
                    height: 3,
                    borderRadius: 1,
                    background: isCurrent ? "#8B0E1A" : "rgba(255, 255, 255, 0.25)",
                    transition: "all 0.3s ease",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
