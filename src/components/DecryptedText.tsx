import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  animateOn?: 'view' | 'hover' | 'both';
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
}

export const DecryptedText: React.FC<DecryptedTextProps> = ({
  text,
  className = '',
  speed = 45,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  animateOn = 'both',
  revealDirection = 'start',
  useOriginalCharsOnly = false,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const [isScrambling, setIsScrambling] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-50px' });
  const intervalRef = useRef<number | null>(null);

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
    : characters.split('');

  const triggerAnimation = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    let iteration = 0;
    const textLength = text.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = window.setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';

            let isRevealed = false;
            if (revealDirection === 'start') {
              isRevealed = index < (iteration / maxIterations) * textLength;
            } else if (revealDirection === 'end') {
              isRevealed = textLength - 1 - index < (iteration / maxIterations) * textLength;
            } else {
              const center = textLength / 2;
              const distFromCenter = Math.abs(index - center);
              isRevealed = distFromCenter <= ((iteration / maxIterations) * textLength) / 2;
            }

            if (isRevealed) {
              return text[index];
            }

            return availableChars[Math.floor(Math.random() * availableChars.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (isInView && (animateOn === 'view' || animateOn === 'both')) {
      triggerAnimation();
    }
  }, [isInView, text]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (animateOn === 'hover' || animateOn === 'both') {
      triggerAnimation();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`inline-block select-none cursor-default ${className}`}
    >
      {displayText}
    </span>
  );
};

export const SplitTextReveal: React.FC<{
  text: string;
  className?: string;
  delay?: number;
}> = ({ text, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  const words = text.split(' ');
  let cumulativeLetters = 0;

  return (
    <span ref={ref} className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => {
        const letters = word.split('');
        const wordOffset = cumulativeLetters;
        cumulativeLetters += letters.length + 1;

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {letters.map((char, letterIndex) => (
              <motion.span
                key={letterIndex}
                initial={{ y: '100%', rotateX: -60, opacity: 0 }}
                animate={
                  isInView
                    ? { y: 0, rotateX: 0, opacity: 1 }
                    : { y: '100%', rotateX: -60, opacity: 0 }
                }
                transition={{
                  duration: 0.7,
                  delay: delay + (wordOffset + letterIndex) * 0.025,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block transform-gpu will-change-transform"
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
};
