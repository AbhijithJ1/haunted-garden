import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { soundEngine } from '../audio/soundEngine';

interface BloodRainHeroProps {
  onEnterShowcase?: () => void;
}

export const BloodRainHero: React.FC<BloodRainHeroProps> = ({ onEnterShowcase }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ambientLightning, setAmbientLightning] = useState(false);
  const [hasThunderRumbled, setHasThunderRumbled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ────────────────────────────────────────────────────────────────────────
  // SCROLL-DRIVEN CAMERA & ATMOSPHERE TIMELINE
  // ────────────────────────────────────────────────────────────────────────

  // Master artwork scaling and immersion dive
  const heroScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.0, 1.05, 1.25]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1.0, 1.0, 0.2]);

  // Rain dynamics
  const rainOpacity = useTransform(scrollYProgress, [0, 0.35, 0.85, 1], [0.75, 1.0, 0.8, 0]);

  // Ground blood bank flow intensity
  const groundBloodOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.4, 0.8, 0.6, 0]);

  // Thunder flash on scroll
  const scrollThunderFlash = useTransform(
    scrollYProgress,
    [0.55, 0.58, 0.62, 0.65, 0.70],
    [0, 0.9, 0.2, 0.95, 0]
  );

  // Subtle camera screen shake on thunder impact
  const screenShakeX = useTransform(
    scrollYProgress,
    [0.56, 0.58, 0.60, 0.62, 0.64, 0.66, 0.70],
    [0, -4, 4, -3, 3, -1, 0]
  );
  const screenShakeY = useTransform(
    scrollYProgress,
    [0.56, 0.58, 0.60, 0.62, 0.64, 0.66, 0.70],
    [0, 3, -3, 2, -2, 1, 0]
  );

  // Camera descent through floor into World 01
  const cameraDiveY = useTransform(scrollYProgress, [0.65, 1.0], [0, -70]);

  // UI elements fade out smoothly
  const topKickerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollPromptOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Ambient Periodic Lightning Flashes
  useEffect(() => {
    let timeoutId: any = null;
    let isCancelled = false;

    const triggerLightning = () => {
      if (isCancelled) return;
      setAmbientLightning(true);
      setTimeout(() => {
        if (!isCancelled) setAmbientLightning(false);
        // Double strike
        setTimeout(() => {
          if (!isCancelled) {
            setAmbientLightning(true);
            setTimeout(() => {
              if (!isCancelled) setAmbientLightning(false);
              const nextDelay = 5500 + Math.random() * 4000;
              timeoutId = setTimeout(triggerLightning, nextDelay);
            }, 100);
          }
        }, 80);
      }, 90);
    };

    timeoutId = setTimeout(triggerLightning, 3000);

    return () => {
      isCancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Thunder audio on scroll
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v >= 0.58 && v <= 0.68 && !hasThunderRumbled) {
        setHasThunderRumbled(true);
        try {
          soundEngine.playThunderRumble();
        } catch {}
      } else if (v < 0.50 || v > 0.75) {
        setHasThunderRumbled(false);
      }
    });
    return () => unsub();
  }, [scrollYProgress, hasThunderRumbled]);

  // Dynamic Physical Blood Rain Droplets
  const rainDroplets = useMemo(() => (
    Array.from({ length: 36 }, (_, i) => ({
      id: i,
      x: (i * 2.8 + 1.2) % 97,
      delay: (i * 0.10) % 2.0,
      duration: 0.95 + ((i * 0.15) % 0.8),
      width: (i % 3 === 0) ? 2.5 : 1.5,
      height: (i % 3 === 0) ? 44 : 28,
      opacity: (i % 3 === 0) ? 0.85 : 0.45,
      color: (i % 2 === 0) ? '#FF1A1A' : '#8B0000',
    }))
  ), []);

  return (
    <section
      ref={containerRef}
      id="blood-rain-hero"
      className="relative w-full bg-black text-white select-none overflow-hidden"
      style={{ minHeight: '125vh' }}
    >
      {/* STICKY 100VH CINEMATIC VIEWPORT */}
      <motion.div
        style={{
          x: screenShakeX,
          y: screenShakeY,
        }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center py-10 px-6 sm:px-12 will-change-transform transform-gpu"
      >

        {/* ── 1. MASTER ARTWORK BACKDROP (Clean, Natural Dark Sky & Organic Ground) ── */}
        <motion.div
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            y: cameraDiveY,
          }}
          className="absolute inset-0 pointer-events-none z-0 overflow-hidden will-change-transform transform-gpu"
        >
          <div
            className="w-full h-full bg-center bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url(/hero-bg.jpg)',
              filter: 'brightness(0.96) contrast(1.1)',
            }}
          />

          {/* Clean Natural Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />
        </motion.div>

        {/* ── 2. LIVE PHYSICAL BLOOD RAIN PARTICLES ── */}
        <motion.div
          style={{ opacity: rainOpacity }}
          className="absolute inset-0 pointer-events-none overflow-hidden z-10"
        >
          {rainDroplets.map((d) => (
            <motion.div
              key={d.id}
              initial={{ y: '-8vh' }}
              animate={{ y: '115vh' }}
              transition={{
                duration: d.duration,
                repeat: Infinity,
                delay: d.delay,
                ease: 'linear',
              }}
              style={{
                left: `${d.x}%`,
                width: `${d.width}px`,
                height: `${d.height}px`,
                opacity: d.opacity,
                background: `linear-gradient(to bottom, transparent, ${d.color})`,
              }}
              className="absolute rounded-full shadow-[0_0_8px_rgba(220,38,38,0.85)] will-change-transform"
            />
          ))}
        </motion.div>

        {/* ── 3. ANIMATED GROUND BLOOD BANK FLUID FLOW ── */}
        <motion.div
          style={{ opacity: groundBloodOpacity }}
          className="absolute inset-x-0 bottom-0 h-[38vh] pointer-events-none z-15 overflow-hidden"
        >
          <motion.div
            animate={{
              y: ['0%', '-3%', '0%'],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_95%,rgba(220,15,30,0.45)_0%,rgba(100,0,10,0.25)_50%,transparent_80%)] filter blur-2xl mix-blend-screen"
          />
        </motion.div>

        {/* ── 4. TOP KICKER: "ENTER THE HORROR ARCHIVE" ── */}
        <motion.div
          style={{ opacity: topKickerOpacity }}
          className="relative z-30 pt-24 sm:pt-28 text-center pointer-events-none"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-white/70 font-medium">
            <span>ENTER THE </span>
            <span className="text-red-500 font-semibold">HORROR</span>
            <span> ARCHIVE</span>
          </p>
        </motion.div>

        {/* ── 5. CENTER SPACER (Master Artwork Carries The Authentic Carved Title) ── */}
        <div className="relative z-20 flex-1 flex items-center justify-center pointer-events-none" />

        {/* ── 6. LIGHTNING / THUNDER FLASH ANIMATION (Ambient + Scroll) ── */}
        <motion.div
          style={{ opacity: scrollThunderFlash }}
          className="absolute inset-0 pointer-events-none z-40 mix-blend-screen will-change-opacity bg-gradient-to-b from-white/95 via-red-200/50 to-transparent"
        />
        {ambientLightning && (
          <div className="absolute inset-0 pointer-events-none z-40 mix-blend-screen bg-gradient-to-b from-white/90 via-red-200/40 to-transparent transition-opacity duration-75" />
        )}

        {/* ── 7. BOTTOM PROMPT: "SCROLL TO BEGIN" ── */}
        <motion.div
          style={{ opacity: scrollPromptOpacity }}
          className="relative z-30 pb-4 flex flex-col items-center gap-2.5 pointer-events-none"
        >
          <p className="font-mono text-[9px] sm:text-[10px] text-white/65 tracking-[0.38em] uppercase font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            SCROLL TO BEGIN
          </p>
          <div className="flex flex-col items-center">
            <div className="w-[1px] h-6 bg-gradient-to-b from-red-600 to-red-900" />
            <div className="w-1.5 h-1.5 rotate-45 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,1)] -mt-0.5" />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
