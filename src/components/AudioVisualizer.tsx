import React, { useEffect, useRef } from 'react';
import { soundEngine } from '../audio/soundEngine';

interface AudioVisualizerProps {
  isMuted: boolean;
  color?: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isMuted, color = '#ef4444' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isMuted) {
        // Draw flat subtle resting baseline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
      } else {
        const freqData = soundEngine.getAudioFrequencyData();
        const numBars = 16;
        const barWidth = canvas.width / numBars;

        if (freqData && freqData.length > 0) {
          ctx.fillStyle = color;
          for (let i = 0; i < numBars; i++) {
            const val = freqData[i * 2] || 0;
            const barHeight = Math.max(3, (val / 255) * canvas.height);
            const x = i * barWidth;
            const y = canvas.height - barHeight;

            ctx.fillRect(x + 1, y, barWidth - 2, barHeight);
          }
        } else {
          // Synthetic pulse waveform
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          const time = Date.now() * 0.005;
          for (let x = 0; x < canvas.width; x += 2) {
            const y = canvas.height / 2 + Math.sin(x * 0.15 + time) * 6;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMuted, color]);

  return (
    <div className="flex items-center gap-2">
      <canvas
        ref={canvasRef}
        width={64}
        height={22}
        className="w-16 h-5.5 rounded bg-black/40 border border-white/10"
      />
    </div>
  );
};
