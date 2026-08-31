import React, { useRef, useState } from 'react';

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
  tiltFactor?: number;
}

export const BentoTilt: React.FC<BentoTiltProps> = ({
  children,
  className = '',
  tiltFactor = 10,
}) => {
  const [transformStyle, setTransformStyle] = useState('');
  const [sheenStyle, setSheenStyle] = useState({ opacity: 0, x: 0, y: 0 });
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const relativeX = x / width;
    const relativeY = y / height;

    const tiltX = (relativeY - 0.5) * -tiltFactor;
    const tiltY = (relativeX - 0.5) * tiltFactor;

    setTransformStyle(`perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.015, 1.015, 1.015)`);
    setSheenStyle({ opacity: 0.25, x, y });
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setSheenStyle({ opacity: 0, x: 0, y: 0 });
  };

  return (
    <div
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden will-change-transform ${className}`}
    >
      {/* Specular Radial Spotlight Sheen */}
      <div
        style={{
          opacity: sheenStyle.opacity,
          background: `radial-gradient(circle 350px at ${sheenStyle.x}px ${sheenStyle.y}px, rgba(220, 38, 38, 0.4), rgba(255, 255, 255, 0.15) 30%, transparent 80%)`,
          transition: 'opacity 0.3s ease',
        }}
        className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
      />

      <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};
