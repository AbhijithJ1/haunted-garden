import React, { useEffect, useRef } from 'react';

interface CinematicSmokeParticlesProps {
  isAudioActive: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  pulseSpeed: number;
  angle: number;
}

export const CinematicSmokeParticles: React.FC<CinematicSmokeParticlesProps> = ({ isAudioActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // 40 gentle cinematic dust motes / ash particles
    const particleCount = 40;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: -(Math.random() * 0.35 + 0.15),
        opacity: Math.random() * 0.4 + 0.1,
        maxOpacity: Math.random() * 0.45 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        angle: Math.random() * Math.PI * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const speedMultiplier = isAudioActive ? 1.5 : 1.0;
      const audioPulse = isAudioActive ? Math.sin(Date.now() * 0.003) * 0.15 : 0;

      particles.forEach((p) => {
        p.x += p.speedX * speedMultiplier;
        p.y += p.speedY * speedMultiplier;
        p.angle += p.pulseSpeed;

        // Current pulsing opacity
        const currentOpacity = Math.max(
          0.05,
          Math.min(0.7, p.opacity + Math.sin(p.angle) * 0.15 + audioPulse)
        );

        // Wrap around borders
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Render soft atmospheric particle
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(0.6, `rgba(220, 38, 38, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAudioActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9988] w-full h-full mix-blend-screen opacity-70"
    />
  );
};
