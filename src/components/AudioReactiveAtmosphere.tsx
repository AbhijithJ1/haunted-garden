import React from 'react';
import { motion } from 'motion/react';

interface AudioReactiveAtmosphereProps {
  isAudioActive: boolean;
}

export const AudioReactiveAtmosphere: React.FC<AudioReactiveAtmosphereProps> = ({ isAudioActive }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Deep Sub-Bass Breathing Veil */}
      <motion.div
        animate={
          isAudioActive
            ? {
                opacity: [0.35, 0.55, 0.38, 0.6, 0.35],
                scale: [1, 1.04, 1.01, 1.05, 1],
              }
            : { opacity: 0.25, scale: 1 }
        }
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,3,5,0.4)_0%,rgba(0,0,0,0.98)_80%)] will-change-transform transform-gpu"
      />

      {/* 2. Micro Celluloid Audio Resonance Scan Drift */}
      {isAudioActive && (
        <motion.div
          animate={{
            opacity: [0.03, 0.06, 0.02, 0.05, 0.03],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.015)_2px,rgba(255,255,255,0.015)_4px)] pointer-events-none"
        />
      )}
    </div>
  );
};
