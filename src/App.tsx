import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Header } from "./components/Header";
import { CustomCursor } from "./components/CustomCursor";
import { AudioPlayer } from "./components/AudioPlayer";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { Hero } from "./sections/Hero";
import { Stats } from "./sections/Stats";
import { Catalog } from "./sections/Catalog";
import { HowItWorks } from "./sections/HowItWorks";
import { Story } from "./sections/Story";
import { Footer } from "./sections/Footer";
import { DossierModal } from "./components/DossierModal";
import { Frame } from "./config/frames";

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [selectedDossier, setSelectedDossier] = useState<Frame | null>(null);

  useEffect(() => {
    let lenis: Lenis | null = null;
    let onTick: ((time: number) => void) | null = null;

    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      onTick = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn("Smooth scroll initialization notice:", e);
    }

    return () => {
      if (onTick) gsap.ticker.remove(onTick);
      lenis?.destroy();
    };
  }, []);

  return (
    <div
      className="relative min-h-screen bg-[#030306] text-[#E8E3DF] overflow-x-hidden select-none"
      style={{ colorScheme: "dark" }}
    >
      {/* Native Local Background Video for Remaining Pages (Fixed behind all sections) */}
      <BackgroundVideo
        videoSrc="/videos/feature-4.mp4"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
      />

      {/* Atmospheric Audio Stream */}
      <AudioPlayer isPlaying={!isMuted} />

      {/* Precision Cursor */}
      <CustomCursor />

      {/* Fixed Frosted Glass Navigation */}
      <Header
        isMuted={isMuted}
        onToggleSound={() => setIsMuted((prev) => !prev)}
      />

      <main className="relative z-10 w-full">
        {/* Stage 1: The Pinned Scrollytelling Runway (Native Cinedread Video Background) */}
        <Hero onExamineDossier={setSelectedDossier} />

        {/* Stage 2: Historical Context & Archival Records */}
        <Stats />

        {/* Stage 3: The Six Occurrences */}
        <Catalog onExamineDossier={setSelectedDossier} />

        {/* Stage 4: The Three Thresholds */}
        <HowItWorks />

        {/* Stage 5: Curatorial Case Files & Transcripts */}
        <Story />

        {/* Stage 6: The Perimeter & Archival Dispatch */}
        <Footer />
      </main>

      {/* Classified Case Dossier Modal */}
      <DossierModal
        isOpen={!!selectedDossier}
        onClose={() => setSelectedDossier(null)}
        frame={selectedDossier}
      />
    </div>
  );
};

export default App;
