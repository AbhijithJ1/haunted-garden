import React, { useEffect, useRef } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

export const CinematicAtmosphere: React.FC = () => {
  const mouse = useMousePosition();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Floating cinematic dust embers / celluloid particles
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      speedY: -(Math.random() * 0.35 + 0.1),
      speedX: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.4 + 0.1,
      fadeSpeed: Math.random() * 0.005 + 0.002,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset if offscreen
        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = `rgba(235, 230, 220, ${p.opacity * 0.5})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const pX = (mouse.x - 0.5) * 20;
  const pY = (mouse.y - 0.5) * 15;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {/* 1. Volumetric Anamorphic Projector Beam (Subtle, breathing, hyper-premium) */}
      <div
        style={{
          transform: `translate3d(${pX * 0.5}px, ${pY * 0.5}px, 0)`,
        }}
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[90vw] h-[65vh] bg-[radial-gradient(ellipse_at_top,rgba(220,38,38,0.06)_0%,rgba(139,92,246,0.02)_40%,transparent_75%)] blur-[80px] will-change-transform transition-transform duration-700"
      />

      {/* 2. Floating Celluloid Dust Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
      />

      {/* 3. Deep Cinematic Radial Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,2,4,0.92)_100%)] pointer-events-none" />

      {/* 4. Film Grain Texture */}
      <div className="absolute inset-0 film-grain opacity-15 pointer-events-none" />
    </div>
  );
};
