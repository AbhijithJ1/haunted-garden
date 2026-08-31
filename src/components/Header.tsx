import React, { useState } from "react";
import { Volume2, VolumeX, ChevronDown, Menu, X } from "lucide-react";
import { frames } from "../config/frames";

interface HeaderProps {
  isMuted: boolean;
  onToggleSound: () => void;
}

const CHAPTERS = frames.filter((f) => f.id !== "entry" && f.id !== "loop-complete");

export const Header: React.FC<HeaderProps> = ({ isMuted, onToggleSound }) => {
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setChaptersOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-8 md:px-12 py-4 sm:py-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Refined Brand Mark */}
        <a
          href="#hero-section"
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <span className="font-cinzel text-base sm:text-lg font-bold text-white tracking-[0.2em] uppercase transition-colors group-hover:text-red-300">
            THE HAUNTED GARDEN
          </span>
        </a>

        {/* Center: Desktop Minimal Luxury Text Nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
          {/* Chapter Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setChaptersOpen((prev) => !prev)}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              <span>Chapters</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#8B0E1A] transition-transform duration-300 ${
                  chaptersOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {chaptersOpen && (
              <div
                className="absolute top-full mt-3 left-1/2 -translate-x-1/2 w-64 p-3 rounded-xl bg-black/90 backdrop-blur-2xl border border-white/[0.1] shadow-2xl space-y-1 z-50"
                onMouseLeave={() => setChaptersOpen(false)}
              >
                <div className="px-3 py-1 text-[9px] font-mono text-[#8B0E1A] tracking-widest border-b border-white/[0.08] mb-1">
                  HISTORICAL LOCATIONS
                </div>
                {CHAPTERS.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setChaptersOpen(false);
                      scrollToSection("hero-section");
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-white/70 hover:text-white hover:bg-white/[0.06] transition-colors flex items-center justify-between"
                  >
                    <span>{ch.title}</span>
                    <span className="text-[9px] text-[#8B0E1A]">{ch.chapterNumber}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection("stats-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Records
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("catalog")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Archive
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("how-section")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Thresholds
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("story")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Transcripts
          </button>
        </nav>

        {/* Right: Audio Control & Mobile Menu Toggle */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={onToggleSound}
            title={isMuted ? "Unmute atmospheric horror audio" : "Mute audio"}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors cursor-pointer p-1"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-white/50" />
                <span className="hidden sm:inline">Audio Off</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-[#8B0E1A] animate-pulse" />
                <span className="hidden sm:inline text-white">Audio Live</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-1.5 text-white/80 hover:text-white cursor-pointer focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-white" />
            ) : (
              <Menu className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 p-5 rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl space-y-4 pointer-events-auto max-w-sm ml-auto">
          <div className="space-y-3 font-mono text-xs uppercase tracking-[0.22em] text-white/80">
            <button
              onClick={() => scrollToSection("hero-section")}
              className="block w-full text-left py-2 hover:text-white border-b border-white/[0.06]"
            >
              The Perimeter (Hero)
            </button>
            <button
              onClick={() => scrollToSection("stats-section")}
              className="block w-full text-left py-2 hover:text-white border-b border-white/[0.06]"
            >
              The Historical Records
            </button>
            <button
              onClick={() => scrollToSection("catalog")}
              className="block w-full text-left py-2 hover:text-white border-b border-white/[0.06]"
            >
              The Six Occurrences
            </button>
            <button
              onClick={() => scrollToSection("how-section")}
              className="block w-full text-left py-2 hover:text-white border-b border-white/[0.06]"
            >
              The Three Thresholds
            </button>
            <button
              onClick={() => scrollToSection("story")}
              className="block w-full text-left py-2 hover:text-white"
            >
              Case Transcripts
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
