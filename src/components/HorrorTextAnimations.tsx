import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

// Helper component that splits text into whole words, each with whitespace-nowrap, so no word ever breaks mid-word
interface WordWrapperProps {
  text: string;
  renderLetter: (char: string, globalIndex: number, wordIndex: number, charIndex: number) => React.ReactNode;
}

const WordSplittedText: React.FC<WordWrapperProps> = ({ text, renderLetter }) => {
  const words = text.split(' ');
  let globalIndex = 0;

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-[0.3em] gap-y-1">
      {words.map((word, wIdx) => {
        const chars = word.split('');
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap">
            {chars.map((char, cIdx) => {
              const el = renderLetter(char, globalIndex, wIdx, cIdx);
              globalIndex++;
              return el;
            })}
          </span>
        );
      })}
    </span>
  );
};

// 01 — THE CONJURING: Ominous Slow Bleed & Spectral Focus (Guaranteed Whole Words)
export const ConjuringText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 30, filter: 'blur(8px)' }
            }
            transition={{
              duration: 0.8,
              delay: gIdx * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transform-gpu will-change-transform text-white/95"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

// 02 — THE NUN: Cathedral Cloister Shadow & Blood-Red Valak Inversion
export const TheNunText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.85 }
            }
            transition={{ duration: 0.8, delay: gIdx * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block transform-gpu will-change-transform text-white font-black"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

// 03 — TALK TO ME: Glitch Jitter & Embalmed Conduit Vibration
export const TalkToMeText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, x: gIdx % 2 === 0 ? -12 : 12, filter: 'blur(6px)' }}
            animate={
              isInView
                ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                : { opacity: 0, x: gIdx % 2 === 0 ? -12 : 12, filter: 'blur(6px)' }
            }
            transition={{
              duration: 0.5,
              delay: gIdx * 0.03,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="inline-block transform-gpu will-change-transform text-white font-black"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

// 04 — FROM: Shaking Runic Carving
export const FromText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <motion.span
        initial={{ opacity: 0, scaleY: 1.4, filter: 'blur(10px)' }}
        animate={
          isInView
            ? { opacity: 1, scaleY: 1, filter: 'blur(0px)' }
            : { opacity: 0, scaleY: 1.4, filter: 'blur(10px)' }
        }
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block whitespace-nowrap transform-gpu will-change-transform text-white tracking-[0.2em] font-black"
      >
        {text}
      </motion.span>
    </span>
  );
};

// 05 — HEREDITARY: 180-Degree Inverted Paimon Geometry
export const HereditaryText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, rotateX: 90, y: -20 }}
            animate={
              isInView
                ? { opacity: 1, rotateX: 0, y: 0 }
                : { opacity: 0, rotateX: 90, y: -20 }
            }
            transition={{
              duration: 0.7,
              delay: gIdx * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transform-gpu will-change-transform text-white/95"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

// 06 — TAROT: 3D Arcana Card Deal Rotation
export const TarotText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, rotateZ: (gIdx - 2.5) * 15, y: -40 }}
            animate={
              isInView
                ? { opacity: 1, rotateZ: 0, y: 0 }
                : { opacity: 0, rotateZ: (gIdx - 2.5) * 15, y: -40 }
            }
            transition={{
              duration: 0.75,
              delay: gIdx * 0.06,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transform-gpu will-change-transform text-white font-black"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

// 07 — IT: Blood-Red Balloon Floating Tension Reveal
export const ItText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <motion.span
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block whitespace-nowrap transform-gpu will-change-transform text-red-600 font-black tracking-widest"
      >
        {text}
      </motion.span>
    </span>
  );
};

// 08 — IT: WELCOME TO DERRY: Cold Atmospheric Fog Stretch
export const WelcomeToDerryText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            animate={
              isInView
                ? { opacity: 1, filter: 'blur(0px)' }
                : { opacity: 0, filter: 'blur(8px)' }
            }
            transition={{ duration: 0.8, delay: gIdx * 0.03, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block transform-gpu will-change-transform text-white font-black"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

// 09 — THE RING: CRT Horizontal Static Glitch Scanline
export const TheRingText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, scaleX: 1.4, filter: 'blur(6px)' }}
            animate={
              isInView
                ? { opacity: 1, scaleX: 1, filter: 'blur(0px)' }
                : { opacity: 0, scaleX: 1.4, filter: 'blur(6px)' }
            }
            transition={{
              duration: 0.6,
              delay: gIdx * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transform-gpu will-change-transform text-white/95"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

// 10 — SMILE: Uncomfortable Stillness & Cold Smile Focus Snap
export const SmileText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <motion.span
        initial={{ opacity: 0, scale: 1.2, filter: 'contrast(140%)' }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, filter: 'contrast(100%)' }
            : { opacity: 0, scale: 1.2, filter: 'contrast(140%)' }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block whitespace-nowrap transform-gpu will-change-transform text-white font-black tracking-wider"
      >
        {text}
      </motion.span>
    </span>
  );
};

// 11 — ANNABELLE: Porcelain Doll Inversion & Spectral Creak
export const AnnabelleText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, rotateY: 90, filter: 'blur(8px)' }}
            animate={
              isInView
                ? { opacity: 1, rotateY: 0, filter: 'blur(0px)' }
                : { opacity: 0, rotateY: 90, filter: 'blur(8px)' }
            }
            transition={{
              duration: 0.7,
              delay: gIdx * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transform-gpu will-change-transform text-white tracking-widest font-black"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};

export const TheExorcistText = AnnabelleText;

// 12 — THE BLACK PHONE: Dead Wire Telephone Resonance (Guaranteed Whole Words)
export const TheBlackPhoneText: React.FC<{ text: string }> = ({ text }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <span ref={ref} className="inline-block">
      <WordSplittedText
        text={text}
        renderLetter={(char, gIdx) => (
          <motion.span
            key={gIdx}
            initial={{ opacity: 0, scale: 0.85, y: 25 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.85, y: 25 }
            }
            transition={{
              duration: 0.65,
              delay: gIdx * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transform-gpu will-change-transform text-white font-black"
          >
            {char}
          </motion.span>
        )}
      />
    </span>
  );
};
