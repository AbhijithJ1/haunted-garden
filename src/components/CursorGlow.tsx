import React, { useEffect, useState } from 'react';

export const CursorGlow: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest('button, a, input, [role="button"], .cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Subtle soft red ambient dot */}
      <div
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-150 ease-out"
        style={{
          left: pos.x,
          top: pos.y,
          width: isHovering ? 24 : 8,
          height: isHovering ? 24 : 8,
          backgroundColor: isHovering ? 'rgba(220, 38, 38, 0.3)' : 'rgba(220, 38, 38, 0.6)',
          border: isHovering ? '1px solid rgba(239, 68, 68, 0.6)' : 'none',
        }}
      />
    </div>
  );
};
