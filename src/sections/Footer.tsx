import React, { useState } from "react";
import { frames } from "../config/frames";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";

const CHAPTERS = frames.filter((f) => f.id !== "entry" && f.id !== "loop-complete");

const EXTRACTION_CITIES =
  "VARANASI · KYOTO · EDINBURGH · PRAGUE · OAXACA · TRANSYLVANIA · KOLKATA · VIENNA · SALEM · KATHMANDU · OKINAWA · REYKJAVIK · ";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4500);
  };

  return (
    <footer
      id="site-footer"
      className="relative bg-transparent text-white pt-24 pb-8 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 sm:px-12">
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 pb-16 border-b border-white/[0.06]">
          {/* Col 1: Brand (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-full border border-white/[0.15] bg-[#8B0E1A]/20 flex items-center justify-center">
                  <span className="font-cinzel text-xs font-bold text-white">HG</span>
                </div>
                <h3 className="font-cinzel text-lg font-bold text-white tracking-widest uppercase">
                  The Haunted Garden
                </h3>
              </div>
              <p className="font-mono text-[9px] tracking-[0.3em] text-[#8B0E1A] uppercase font-semibold">
                SCENTS FROM BEYOND · EST. 1894
              </p>
            </div>
            <p className="font-inter text-xs text-white/60 leading-relaxed font-light">
              An occult fragrance archive transcribing historical anomalies into permanent olfactory coordinates. What was buried in the estate grounds does not decay.
            </p>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
              "Entered willingly."
            </p>
          </div>

          {/* Col 2: Chapter Links (4 cols) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-6 text-xs font-mono">
            <div className="space-y-3">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#8B0E1A] font-semibold block">
                ARCHIVE RECORDS
              </span>
              <ul className="space-y-2 text-white/60 font-light">
                {CHAPTERS.slice(0, 3).map((e) => (
                  <li key={e.id}>
                    <a
                      href="#catalog"
                      className="hover:text-white transition-colors truncate block max-w-[130px]"
                    >
                      {e.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#8B0E1A] font-semibold block">
                CONTINUED
              </span>
              <ul className="space-y-2 text-white/60 font-light">
                {CHAPTERS.slice(3).map((e) => (
                  <li key={e.id}>
                    <a
                      href="#catalog"
                      className="hover:text-white transition-colors truncate block max-w-[130px]"
                    >
                      {e.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#how-section" className="hover:text-white transition-colors">
                    The Thresholds
                  </a>
                </li>
                <li>
                  <a href="#story" className="hover:text-white transition-colors">
                    Case Transcripts
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Col 3: Field Dispatch Subscription (4 cols) */}
          <div className="lg:col-span-4">
            <div className="glass-panel p-6 sm:p-7 rounded-xl space-y-3 border border-white/[0.08] bg-black/40 backdrop-blur-md">
              <h4 className="font-cinzel text-sm font-bold text-white uppercase tracking-wider">
                Archival Dispatch
              </h4>
              <p className="font-inter text-xs text-white/60 leading-relaxed font-light">
                Receive private notices when new historical coordinate batches are transcribed and bottled.
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 py-3 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-white/80">
                  <CheckCircle2 className="w-4 h-4 text-[#8B0E1A]" />
                  <span>Dispatch address recorded.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter dispatch email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-[2px] bg-white/[0.04] border border-white/[0.1] focus:border-white/30 text-xs text-white placeholder:text-white/30 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-[2px] bg-white/[0.08] hover:bg-[#8B0E1A] text-white transition-colors cursor-pointer text-xs font-mono font-semibold"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
              <div className="flex items-center gap-1.5 text-[9px] text-white/40 font-mono pt-1">
                <Shield className="w-3 h-3 text-[#8B0E1A]" />
                <span>Private correspondence only · Zero distribution</span>
              </div>
            </div>
          </div>
        </div>

        {/* Infinite Location Ticker */}
        <div className="py-4 border-b border-white/[0.04] overflow-hidden whitespace-nowrap select-none">
          <div
            className="inline-block font-mono text-[10px] tracking-[0.38em] text-white/30 uppercase font-medium"
            style={{ animation: "cityScroll 35s linear infinite" }}
          >
            {EXTRACTION_CITIES} {EXTRACTION_CITIES} {EXTRACTION_CITIES}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/45">
          <p>© 2026 THE HAUNTED GARDEN. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-5 uppercase tracking-widest">
            {["Privacy", "Terms", "Archive"].map((l) => (
              <span key={l} className="hover:text-white transition-colors cursor-pointer">
                {l}
              </span>
            ))}
          </div>
          <p className="text-[#8B0E1A] font-semibold uppercase tracking-widest">
            Entered willingly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
