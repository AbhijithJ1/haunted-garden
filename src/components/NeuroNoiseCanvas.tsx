import React, { useRef, useEffect } from 'react';
import { useMousePosition } from '../hooks/useMousePosition';

interface NeuroNoiseCanvasProps {
  className?: string;
  intensity?: number;
}

export const NeuroNoiseCanvas: React.FC<NeuroNoiseCanvasProps> = ({
  className = '',
  intensity = 0.6,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useMousePosition();
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    mouseRef.current = { x: mousePos.x, y: mousePos.y };
  }, [mousePos]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Intersection observer to pause when offscreen (saves 100% CPU/GPU)
    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const NUM_FILAMENTS = 28;
    const POINTS = 20;

    const render = () => {
      if (isVisibleRef.current) {
        time += 0.008;
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        // Ambient dark red radial glow
        const grad = ctx.createRadialGradient(
          w * mouseRef.current.x,
          h * mouseRef.current.y,
          40,
          w * 0.5,
          h * 0.5,
          w * 0.7
        );
        grad.addColorStop(0, 'rgba(160, 20, 20, 0.18)');
        grad.addColorStop(0.6, 'rgba(20, 4, 8, 0.4)');
        grad.addColorStop(1, 'rgba(2, 2, 4, 0.96)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Fast filament paths
        for (let i = 0; i < NUM_FILAMENTS; i++) {
          const progress = i / NUM_FILAMENTS;
          const seed = i * 1.4;
          const alpha = Math.sin(progress * Math.PI) * 0.35 * intensity;

          ctx.beginPath();
          ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
          ctx.lineWidth = i % 3 === 0 ? 1.2 : 0.6;

          for (let j = 0; j < POINTS; j++) {
            const t = j / (POINTS - 1);
            const x = w * t;
            const wave = Math.sin(t * 4 + time + seed) * 35 + Math.cos(t * 8 - time * 1.5) * 18;
            const dx = (mouseRef.current.x - t) * 2;
            const mouseInfl = Math.exp(-dx * dx * 4) * (mouseRef.current.y - 0.5) * 80;
            const y = h * (0.25 + progress * 0.55) + wave + mouseInfl;

            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
