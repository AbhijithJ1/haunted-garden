import React, { useRef, useEffect, useCallback } from 'react';

interface WaveLayer {
  text: string;
  frequency: number;
  amplitude: number;
  letterSpacing: number;
  yPosition: number;
  weight: number;
}

interface LivingWaveCanvasProps {
  layers?: WaveLayer[];
  opacity?: number;
  className?: string;
  mousePos?: { x: number; y: number };
}

const DEFAULT_LAYERS: WaveLayer[] = [
  {
    text: 'THE IMAGE ITSELF IS THE CONTAGION // ARCHIVE MMXXVI',
    frequency: 0.12,
    amplitude: 14,
    letterSpacing: 4,
    yPosition: 0.4,
    weight: 700,
  },
  {
    text: 'SOME FILMS DO NOT END WHEN THE SCREEN TURNS BLACK',
    frequency: 0.09,
    amplitude: 20,
    letterSpacing: 6,
    yPosition: 0.65,
    weight: 400,
  },
];

export const LivingWaveCanvas: React.FC<LivingWaveCanvasProps> = ({
  layers = DEFAULT_LAYERS,
  opacity = 0.35,
  className = '',
  mousePos = { x: 0.5, y: 0.5 },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const isVisibleRef = useRef(true);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resize();
    const handleResize = () => resize();
    window.addEventListener('resize', handleResize, { passive: true });

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth <= 768;
    const fontSize = isMobile ? 18 : 30;

    const render = () => {
      if (isVisibleRef.current) {
        timeRef.current += 0.008;
        const time = timeRef.current;
        const w = canvas.width;
        const h = canvas.height;

        ctx.clearRect(0, 0, w, h);

        layers.forEach((layer) => {
          ctx.font = `${layer.weight} ${fontSize}px "Cinzel", serif`;
          ctx.fillStyle = `rgba(229, 228, 222, ${opacity * 0.35})`;
          ctx.textBaseline = 'middle';

          const yBase = h * layer.yPosition;
          let x = w * 0.05;

          for (let i = 0; i < layer.text.length; i++) {
            const char = layer.text[i];
            const charWidth = ctx.measureText(char).width;
            const yOffset = Math.sin(i * layer.frequency + time) * layer.amplitude;

            ctx.fillText(char, x, yBase + yOffset);
            x += charWidth + layer.letterSpacing;
          }
        });
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [layers, opacity, resize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
