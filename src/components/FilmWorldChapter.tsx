import React, { useRef, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Play, ExternalLink } from 'lucide-react';
import { ShowcaseFilm } from '../data/showcaseFilms';
import { soundEngine } from '../audio/soundEngine';
import { openOnNetflix } from '../lib/netflix';
import {
  ConjuringText,
  TheNunText,
  TalkToMeText,
  FromText,
  HereditaryText,
  TarotText,
  ItText,
  WelcomeToDerryText,
  TheRingText,
  SmileText,
  TheExorcistText,
  TheBlackPhoneText,
} from './HorrorTextAnimations';

// ─── Per-film atmospheric canvas environments ────────────────────────────────

interface CanvasEnvProps {
  film: ShowcaseFilm;
  scrollProgress: number; // 0–1
}

const FilmEnvironmentCanvas: React.FC<CanvasEnvProps> = ({ film, scrollProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const t = timeRef.current;
    const p = scrollProgress; // 0–1 scroll progress for this film

    ctx.clearRect(0, 0, W, H);

    switch (film.order) {

      // ── 01 THE CONJURING: Distant farmhouse window approach ──
      case 1: {
        // Deep black sky with subtle cloud movement
        const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
        skyGrad.addColorStop(0, `rgba(8,4,6,1)`);
        skyGrad.addColorStop(0.7, `rgba(14,8,10,1)`);
        skyGrad.addColorStop(1, `rgba(4,2,4,1)`);
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, W, H);

        // Moving storm clouds
        for (let i = 0; i < 5; i++) {
          const cx = ((t * 0.015 * (i % 2 === 0 ? 1 : -0.7) + i * W * 0.22) % (W * 1.3)) - W * 0.15;
          const cy = H * (0.08 + i * 0.06);
          const cr = W * (0.18 + i * 0.05);
          const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr);
          cloudGrad.addColorStop(0, `rgba(20,14,18,0.5)`);
          cloudGrad.addColorStop(1, `rgba(6,3,5,0)`);
          ctx.fillStyle = cloudGrad;
          ctx.fillRect(0, 0, W, H);
        }

        // Ground / horizon
        const groundGrad = ctx.createLinearGradient(0, H * 0.65, 0, H);
        groundGrad.addColorStop(0, 'rgba(8,4,6,0)');
        groundGrad.addColorStop(1, 'rgba(2,1,2,1)');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, H * 0.65, W, H * 0.35);

        // The farmhouse — a small dark rectangle
        const farmX = W * 0.5;
        const farmY = H * (0.58 - p * 0.15); // approaches as scroll increases
        const farmW = W * (0.04 + p * 0.06);
        const farmH = H * (0.06 + p * 0.09);
        ctx.fillStyle = `rgba(6,3,5,${0.9 + p * 0.1})`;
        ctx.fillRect(farmX - farmW / 2, farmY - farmH, farmW, farmH);
        // Roof
        ctx.beginPath();
        ctx.moveTo(farmX - farmW * 0.55, farmY - farmH);
        ctx.lineTo(farmX, farmY - farmH * 1.3);
        ctx.lineTo(farmX + farmW * 0.55, farmY - farmH);
        ctx.closePath();
        ctx.fillStyle = `rgba(4,2,4,0.95)`;
        ctx.fill();

        // The window — glows subtly, then flickers at fear moment (p 0.28–0.42)
        const winX = farmX + farmW * 0.1;
        const winY = farmY - farmH * 0.6;
        const winW = farmW * 0.25;
        const winH = farmH * 0.28;
        const fearPulse = (p > 0.28 && p < 0.42) ? Math.abs(Math.sin(t * 0.08)) * 0.8 : 0;
        const baseGlow = 0.35 + p * 0.2;
        const winGrad = ctx.createRadialGradient(winX + winW / 2, winY + winH / 2, 0, winX + winW / 2, winY + winH / 2, winW * 3);
        winGrad.addColorStop(0, `rgba(200,160,80,${baseGlow + fearPulse})`);
        winGrad.addColorStop(0.4, `rgba(140,90,30,${(baseGlow + fearPulse) * 0.4})`);
        winGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = winGrad;
        ctx.fillRect(winX - winW * 2, winY - winH * 2, winW * 5, winH * 5);
        ctx.fillStyle = `rgba(220,170,80,${baseGlow + fearPulse})`;
        ctx.fillRect(winX, winY, winW, winH);

        // Vignette
        const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(0,0,0,${0.6 + p * 0.3})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 02 THE NUN: Gothic cathedral corridor with candles ──
      case 2: {
        ctx.fillStyle = 'rgba(6,4,10,1)';
        ctx.fillRect(0, 0, W, H);

        // Stone corridor perspective
        const numArches = 6;
        for (let i = numArches; i >= 0; i--) {
          const depth = (i / numArches);
          const archDepth = depth + p * 0.25;
          const archW = W * (0.05 + archDepth * 0.8);
          const archH = H * (0.05 + archDepth * 0.8);
          const ax = (W - archW) / 2;
          const ay = (H - archH) / 2;

          ctx.strokeStyle = `rgba(30,20,45,${0.5 + depth * 0.4})`;
          ctx.lineWidth = 2 + depth * 3;
          ctx.beginPath();
          ctx.rect(ax, ay + archH * 0.2, archW, archH * 0.8);
          // Arch top
          ctx.moveTo(ax, ay + archH * 0.2);
          ctx.quadraticCurveTo(W / 2, ay - archH * 0.1, ax + archW, ay + archH * 0.2);
          ctx.stroke();
        }

        // Candles: extinguish progressively as scroll increases
        const candleCount = 8;
        for (let i = 0; i < candleCount; i++) {
          const side = i % 2 === 0 ? 1 : -1;
          const cx = W / 2 + side * W * (0.12 + Math.floor(i / 2) * 0.08);
          const cy = H * (0.5 + Math.floor(i / 2) * 0.06);
          const extinguishAt = i / candleCount;
          if (p < extinguishAt + 0.1) {
            const brightness = Math.max(0, 1 - (p - extinguishAt) * 5);
            const flickerFlame = brightness * (0.7 + Math.sin(t * 0.15 + i) * 0.3);
            const cGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.08);
            cGrad.addColorStop(0, `rgba(255,200,80,${flickerFlame * 0.9})`);
            cGrad.addColorStop(0.3, `rgba(220,120,20,${flickerFlame * 0.4})`);
            cGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = cGrad;
            ctx.fillRect(0, 0, W, H);
          }
        }

        // Distant silhouette at the end of the corridor (fear phase)
        if (p > 0.25) {
          const silAlpha = Math.min(1, (p - 0.25) * 3) * 0.7;
          const silW = W * 0.025;
          const silH = H * 0.07;
          const silX = W / 2 - silW / 2;
          const silY = H * 0.42;
          ctx.fillStyle = `rgba(10,6,16,${silAlpha})`;
          ctx.fillRect(silX, silY, silW, silH);
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(4,2,8,${0.75 + p * 0.2})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 03 TALK TO ME: Ceramic hand, space distorts ──
      case 3: {
        const distort = p > 0.2 ? (p - 0.2) * 1.5 : 0;
        ctx.fillStyle = 'rgba(8,12,16,1)';
        ctx.fillRect(0, 0, W, H);

        // Radial perspective distortion effect
        if (distort > 0) {
          for (let ring = 1; ring <= 6; ring++) {
            const r = W * ring * 0.12 * (1 + distort * 0.3);
            ctx.beginPath();
            ctx.arc(W / 2, H / 2, r, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(30,50,60,${distort * 0.15 / ring})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // The ceramic hand silhouette — grows as p increases
        const handScale = 0.04 + p * 0.12;
        const hx = W / 2;
        const hy = H * (0.5 + (1 - p) * 0.1);

        ctx.save();
        ctx.translate(hx, hy);
        ctx.scale(handScale * W, handScale * W);
        // Simplified hand shape
        ctx.fillStyle = `rgba(180,175,165,${0.6 + p * 0.3})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, 1.2, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Fingers
        for (let f = 0; f < 4; f++) {
          ctx.beginPath();
          ctx.ellipse(-0.9 + f * 0.6, -1.8, 0.2, 0.7, (f - 1.5) * 0.08, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // Glow around hand
        const hGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, W * (0.08 + p * 0.15));
        hGrad.addColorStop(0, `rgba(160,140,120,${p * 0.2})`);
        hGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = hGrad;
        ctx.fillRect(0, 0, W, H);

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(4,6,8,${0.8 + p * 0.15})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 04 FROM: Endless night road with forest ──
      case 4: {
        ctx.fillStyle = 'rgba(6,10,8,1)';
        ctx.fillRect(0, 0, W, H);

        // Sky
        const skyG = ctx.createLinearGradient(0, 0, 0, H * 0.5);
        skyG.addColorStop(0, 'rgba(4,8,6,1)');
        skyG.addColorStop(1, 'rgba(6,12,8,1)');
        ctx.fillStyle = skyG;
        ctx.fillRect(0, 0, W, H * 0.5);

        // Road perspective — vanishing point drifts slightly with time
        const vpX = W / 2 + Math.sin(t * 0.004) * W * 0.02;
        const vpY = H * 0.42;
        const roadOffset = (t * 2 * (1 + p)) % (H * 0.08); // moving road markings

        ctx.beginPath();
        ctx.moveTo(vpX - W * 0.01, vpY);
        ctx.lineTo(W * 0.12, H);
        ctx.lineTo(W * 0.88, H);
        ctx.lineTo(vpX + W * 0.01, vpY);
        ctx.closePath();
        ctx.fillStyle = 'rgba(10,14,10,1)';
        ctx.fill();

        // Road center lines
        for (let d = 0; d < 8; d++) {
          const dy = ((d / 7) * H * 0.58 + roadOffset) % (H * 0.58);
          const lineY = vpY + dy;
          const lineW = (dy / (H * 0.58)) * W * 0.015;
          ctx.fillStyle = `rgba(80,90,70,${0.3 + (dy / H) * 0.3})`;
          ctx.fillRect(vpX - lineW / 2, lineY, lineW, Math.max(1, dy * 0.03));
        }

        // Trees on both sides
        for (let i = 0; i < 12; i++) {
          const treeDepth = (i / 11);
          const side = i % 2 === 0 ? -1 : 1;
          const tx = W / 2 + side * (W * (0.08 + treeDepth * 0.42));
          const ty = H * (0.42 + treeDepth * 0.22);
          const tw = W * (0.006 + treeDepth * 0.018);
          const th = H * (0.05 + treeDepth * 0.12);
          ctx.fillStyle = `rgba(4,8,4,${0.7 + treeDepth * 0.3})`;
          ctx.fillRect(tx - tw / 2, ty - th, tw, th);
          // Tree foliage
          const treeGrad = ctx.createRadialGradient(tx, ty - th * 0.6, 0, tx, ty - th * 0.6, tw * 3);
          treeGrad.addColorStop(0, `rgba(8,16,8,${0.6 + treeDepth * 0.2})`);
          treeGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = treeGrad;
          ctx.fillRect(0, 0, W, H);
        }

        // Distant figure (fear phase p 0.25–0.5)
        if (p > 0.25) {
          const figAlpha = Math.min(1, (p - 0.25) * 4) * 0.85;
          const figH = H * 0.03;
          const figW = figH * 0.3;
          ctx.fillStyle = `rgba(4,6,4,${figAlpha})`;
          ctx.fillRect(vpX - figW / 2, vpY - figH, figW, figH);
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(2,4,2,${0.7 + p * 0.25})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 05 HEREDITARY: Inverted dollhouse scale ──
      case 5: {
        ctx.fillStyle = 'rgba(10,8,6,1)';
        ctx.fillRect(0, 0, W, H);

        // Miniature room that grows with scroll, then inverts
        const roomScale = 0.06 + p * 0.4;
        const invertPhase = p > 0.6 ? (p - 0.6) * 2.5 : 0; // 0–1 inversion
        const rW = W * roomScale;
        const rH = H * roomScale * 0.7;
        const rX = (W - rW) / 2;
        const rY = H * (0.5 - roomScale * 0.35) + invertPhase * H * 0.15;

        // Room walls
        ctx.strokeStyle = `rgba(${40 + p * 20},${30 + p * 20},${20 + p * 10},${0.6 + p * 0.3})`;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(rX, rY, rW, rH);
        // Floor
        ctx.strokeStyle = `rgba(50,40,25,${0.5 + p * 0.3})`;
        ctx.beginPath();
        ctx.moveTo(rX, rY + rH);
        ctx.lineTo(rX - rW * 0.2, rY + rH * 1.2);
        ctx.lineTo(rX + rW * 1.2, rY + rH * 1.2);
        ctx.lineTo(rX + rW, rY + rH);
        ctx.stroke();
        // Ceiling (inverts)
        if (invertPhase > 0) {
          ctx.save();
          ctx.translate(W / 2, H / 2);
          ctx.rotate(invertPhase * Math.PI);
          ctx.translate(-W / 2, -H / 2);
          ctx.strokeStyle = `rgba(40,30,20,${invertPhase * 0.4})`;
          ctx.strokeRect(rX, rY - rH * 0.8, rW, rH * 0.8);
          ctx.restore();
        }

        // Tiny human silhouette inside the room
        if (p > 0.1) {
          const pScale = Math.min(1, (p - 0.1) * 2);
          const figH = rH * 0.5 * pScale;
          const figX = rX + rW * 0.5;
          const figY = rY + rH - figH * 0.1;
          ctx.fillStyle = `rgba(8,6,4,${0.8 * pScale})`;
          ctx.fillRect(figX - figH * 0.08, figY - figH, figH * 0.16, figH);
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(4,3,2,${0.75 + p * 0.2})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 06 TAROT: Single card in void, rotates, passes camera ──
      case 6: {
        ctx.fillStyle = 'rgba(8,4,12,1)';
        ctx.fillRect(0, 0, W, H);

        // Card rotation — starts distant, approaches, passes through
        const cardZ = p; // 0 = far, 1 = past camera
        const cardWidth = W * Math.min(1.2, 0.06 + cardZ * 0.8);
        const cardHeight = cardWidth * 1.618; // golden ratio
        const rotY = (1 - p) * 0.3; // perspective rotation
        const cardX = (W - cardWidth) / 2;
        const cardY = (H - cardHeight) / 2;

        if (cardZ < 0.85) {
          // Draw card with perspective foreshortening
          const foreshorten = Math.cos(rotY * Math.PI);
          const visW = cardWidth * Math.max(0.05, foreshorten);
          const cx = W / 2 - visW / 2;

          ctx.fillStyle = `rgba(25,15,35,${0.95})`;
          ctx.strokeStyle = `rgba(120,90,160,${0.4 + p * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.rect(cx, cardY, visW, cardHeight);
          ctx.fill();
          ctx.stroke();

          // Card detail lines
          if (visW > W * 0.04) {
            const innerMargin = visW * 0.1;
            ctx.strokeStyle = `rgba(90,60,130,${0.2 + p * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(cx + innerMargin, cardY + cardHeight * 0.06, visW - innerMargin * 2, cardHeight * 0.88);
          }

          // Glow around card
          const cGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, cardWidth * (1 + p));
          cGrad.addColorStop(0, `rgba(80,40,120,${p * 0.15})`);
          cGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = cGrad;
          ctx.fillRect(0, 0, W, H);
        } else {
          // Card has passed through — environment behind opens
          const openPhase = (cardZ - 0.85) * 6.7;
          const envGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * openPhase * 0.6);
          envGrad.addColorStop(0, `rgba(20,10,30,${openPhase * 0.8})`);
          envGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = envGrad;
          ctx.fillRect(0, 0, W, H);
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(4,2,6,${0.7 + p * 0.25})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 07 IT: Rain, wet street, storm drain, red balloon ──
      case 7: {
        ctx.fillStyle = 'rgba(12,4,4,1)';
        ctx.fillRect(0, 0, W, H);

        // Wet street
        const streetGrad = ctx.createLinearGradient(0, H * 0.5, 0, H);
        streetGrad.addColorStop(0, 'rgba(14,8,8,1)');
        streetGrad.addColorStop(1, 'rgba(18,10,10,1)');
        ctx.fillStyle = streetGrad;
        ctx.fillRect(0, H * 0.5, W, H * 0.5);

        // Rain streaks
        const rainCount = 60;
        for (let i = 0; i < rainCount; i++) {
          const rx = (i * W * 0.019 + t * 0.8) % W;
          const ry = (i * H * 0.018 + t * 3) % H;
          const rLen = 6 + i % 8;
          ctx.strokeStyle = `rgba(80,50,50,${0.15 + (i % 3) * 0.1})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(rx, ry);
          ctx.lineTo(rx - 1, ry + rLen);
          ctx.stroke();
        }

        // Street reflection
        const reflGrad = ctx.createLinearGradient(0, H * 0.72, 0, H);
        reflGrad.addColorStop(0, 'rgba(180,80,80,0.06)');
        reflGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = reflGrad;
        ctx.fillRect(0, H * 0.72, W, H * 0.28);

        // Storm drain — circular grate at bottom center, camera descends into it
        const drainY = H * (0.72 + p * 0.15);
        const drainR = W * (0.03 + p * 0.06);
        ctx.strokeStyle = `rgba(30,15,15,${0.8})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(W / 2, drainY, drainR, 0, Math.PI * 2);
        ctx.stroke();
        // Drain interior darkness
        const drainGrad = ctx.createRadialGradient(W / 2, drainY, 0, W / 2, drainY, drainR);
        drainGrad.addColorStop(0, 'rgba(2,0,0,1)');
        drainGrad.addColorStop(1, 'rgba(8,4,4,0.5)');
        ctx.fillStyle = drainGrad;
        ctx.beginPath();
        ctx.arc(W / 2, drainY, drainR, 0, Math.PI * 2);
        ctx.fill();

        // Red balloon inside drain (fear phase p 0.3–0.65)
        if (p > 0.28) {
          const balloonAlpha = Math.min(1, (p - 0.28) * 3);
          const balloonGone = p > 0.55 ? Math.max(0, 1 - (p - 0.55) * 6) : 1;
          const bAlpha = balloonAlpha * balloonGone;
          const balloonBob = Math.sin(t * 0.04) * 2;
          const bX = W / 2;
          const bY = drainY - drainR * 0.2 + balloonBob;
          const bR = drainR * 0.25;
          const balloonGrad = ctx.createRadialGradient(bX - bR * 0.3, bY - bR * 0.3, 0, bX, bY, bR);
          balloonGrad.addColorStop(0, `rgba(255,50,30,${bAlpha})`);
          balloonGrad.addColorStop(1, `rgba(180,20,10,${bAlpha * 0.8})`);
          ctx.fillStyle = balloonGrad;
          ctx.beginPath();
          ctx.arc(bX, bY, bR, 0, Math.PI * 2);
          ctx.fill();
          // String
          ctx.strokeStyle = `rgba(200,40,20,${bAlpha * 0.5})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(bX, bY + bR);
          ctx.lineTo(bX, bY + bR * 2.5);
          ctx.stroke();
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(6,2,2,${0.7 + p * 0.25})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 08 WELCOME TO DERRY: Atmospheric fog with industrial shapes ──
      case 8: {
        ctx.fillStyle = 'rgba(10,8,4,1)';
        ctx.fillRect(0, 0, W, H);

        // Dense fog layers
        for (let layer = 0; layer < 5; layer++) {
          const fogSpeed = 0.006 + layer * 0.002;
          const fogX = ((t * fogSpeed * (layer % 2 === 0 ? 1 : -1) * W) % (W * 2)) - W;
          const fogY = H * (0.3 + layer * 0.1);
          const fogGrad = ctx.createRadialGradient(fogX + W * 0.5, fogY, 0, fogX + W * 0.5, fogY, W * (0.4 + layer * 0.1));
          fogGrad.addColorStop(0, `rgba(${20 + layer * 3},${16 + layer * 2},${8 + layer},${0.18 - layer * 0.02})`);
          fogGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = fogGrad;
          ctx.fillRect(0, 0, W, H);
        }

        // Industrial structures emerging from fog
        if (p > 0.15) {
          const emerge = Math.min(1, (p - 0.15) * 2);
          // Chimney stacks
          for (let i = 0; i < 3; i++) {
            const sx = W * (0.2 + i * 0.3);
            const sH = H * (0.2 + i * 0.05) * emerge;
            ctx.fillStyle = `rgba(8,7,4,${emerge * 0.7})`;
            ctx.fillRect(sx - W * 0.015, H * 0.35, W * 0.03, sH);
          }
          // Canal water
          const waterY = H * 0.62;
          const waterGrad = ctx.createLinearGradient(0, waterY, 0, waterY + H * 0.06);
          waterGrad.addColorStop(0, `rgba(10,12,8,${emerge * 0.6})`);
          waterGrad.addColorStop(1, `rgba(6,8,4,${emerge * 0.4})`);
          ctx.fillStyle = waterGrad;
          ctx.fillRect(0, waterY, W, H * 0.06);

          // Distant lights through fog
          for (let l = 0; l < 4; l++) {
            const lx = W * (0.1 + l * 0.28);
            const ly = H * (0.38 + Math.sin(l * 1.7) * 0.04);
            const lGrad = ctx.createRadialGradient(lx, ly, 0, lx, ly, W * 0.04);
            lGrad.addColorStop(0, `rgba(180,160,80,${emerge * 0.15})`);
            lGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = lGrad;
            ctx.fillRect(0, 0, W, H);
          }
        }

        // Entity movement in fog — barely visible
        if (p > 0.4) {
          const entityAlpha = Math.min(0.3, (p - 0.4) * 0.8);
          const entityX = W * (0.35 + Math.sin(t * 0.015) * 0.1);
          const entityGrad = ctx.createRadialGradient(entityX, H * 0.45, 0, entityX, H * 0.45, W * 0.04);
          entityGrad.addColorStop(0, `rgba(12,10,6,${entityAlpha})`);
          entityGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = entityGrad;
          ctx.fillRect(0, 0, W, H);
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(4,3,2,${0.72 + p * 0.22})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 09 THE RING: CRT television static, camera crosses screen ──
      case 9: {
        ctx.fillStyle = 'rgba(4,8,10,1)';
        ctx.fillRect(0, 0, W, H);

        const crtPhase = p; // camera approaching CRT
        const screenCrossed = p > 0.7;

        if (!screenCrossed) {
          // The CRT screen — grows as camera approaches
          const crtW = W * (0.06 + crtPhase * 0.8);
          const crtH = crtW * 0.75;
          const crtX = (W - crtW) / 2;
          const crtY = (H - crtH) / 2;

          // CRT body
          ctx.fillStyle = `rgba(10,15,18,0.95)`;
          ctx.fillRect(crtX - crtW * 0.05, crtY - crtH * 0.05, crtW * 1.1, crtH * 1.15);

          // Static on screen
          const staticIntensity = 0.3 + crtPhase * 0.5;
          for (let sy = 0; sy < crtH; sy += 2) {
            const lineY = crtY + sy;
            const lineAlpha = (Math.random() > 0.5 ? 0.08 : 0.02) * staticIntensity;
            ctx.fillStyle = `rgba(150,180,160,${lineAlpha})`;
            ctx.fillRect(crtX, lineY, crtW, 1.5);
          }

          // CRT scan line shimmer
          const scanY = (t * 2) % crtH;
          ctx.fillStyle = `rgba(180,200,180,${0.03 + crtPhase * 0.04})`;
          ctx.fillRect(crtX, crtY + scanY, crtW, 2);

          // CRT glow
          const crtGrad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, crtW * 0.8);
          crtGrad.addColorStop(0, `rgba(100,140,120,${crtPhase * 0.12})`);
          crtGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = crtGrad;
          ctx.fillRect(0, 0, W, H);
        } else {
          // Camera crossed the screen — analog distortion fills viewport
          const crossPhase = (p - 0.7) / 0.3;
          // Static distortion lines
          for (let line = 0; line < H; line += 3) {
            const offset = (Math.random() - 0.5) * W * crossPhase * 0.12;
            ctx.fillStyle = `rgba(120,160,140,${0.04 + Math.random() * 0.06})`;
            ctx.fillRect(offset, line, W, 2);
          }
          // White noise fades to black
          const staticFade = ctx.createLinearGradient(0, 0, 0, H);
          staticFade.addColorStop(0, `rgba(140,160,150,${crossPhase * 0.15})`);
          staticFade.addColorStop(1, `rgba(0,0,0,${crossPhase * 0.8})`);
          ctx.fillStyle = staticFade;
          ctx.fillRect(0, 0, W, H);
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.65);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(2,4,5,${0.7 + p * 0.25})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 10 SMILE: Ordinary room. Human silhouette. The smile. ──
      case 10: {
        // Ordinary — not horror-looking at first
        ctx.fillStyle = 'rgba(12,8,10,1)';
        ctx.fillRect(0, 0, W, H);

        // Floor line
        ctx.fillStyle = 'rgba(16,12,14,1)';
        ctx.fillRect(0, H * 0.65, W, H * 0.35);

        // Human silhouette — standing very still
        const figH = H * (0.12 + p * 0.04);
        const figW = figH * 0.28;
        const figX = W * 0.5 - figW / 2;
        const figY = H * 0.65 - figH;
        ctx.fillStyle = `rgba(8,5,7,0.9)`;
        ctx.fillRect(figX, figY, figW, figH);
        // Head
        ctx.beginPath();
        ctx.arc(figX + figW / 2, figY - figW * 0.6, figW * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(8,5,7,0.9)';
        ctx.fill();

        // The smile — appears subtly at p 0.3+
        if (p > 0.25) {
          const smileAlpha = Math.min(1, (p - 0.25) * 3);
          // A subtle curve on the face
          ctx.strokeStyle = `rgba(180,80,80,${smileAlpha * 0.7})`;
          ctx.lineWidth = Math.max(0.5, figW * 0.04);
          ctx.beginPath();
          const smileX = figX + figW / 2;
          const smileY = figY - figW * 0.45;
          ctx.arc(smileX, smileY - figW * 0.1, figW * 0.3, 0.2, Math.PI - 0.2);
          ctx.stroke();
        }

        // Walls
        ctx.strokeStyle = `rgba(20,15,18,0.5)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(W * 0.05, H * 0.1, W * 0.9, H * 0.55);

        const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.1, W / 2, H / 2, W * 0.65);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(5,3,4,${0.72 + p * 0.2})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 11 THE EXORCIST: Night street, illuminated window above ──
      case 11: {
        ctx.fillStyle = 'rgba(4,4,5,1)';
        ctx.fillRect(0, 0, W, H);

        // Near-total darkness street
        ctx.fillStyle = 'rgba(6,6,8,1)';
        ctx.fillRect(0, H * 0.6, W, H * 0.4);

        // Sidewalk / building edge
        ctx.fillStyle = 'rgba(8,8,10,0.8)';
        ctx.fillRect(0, H * 0.3, W * 0.12, H * 0.7);
        ctx.fillRect(W * 0.88, H * 0.3, W * 0.12, H * 0.7);

        // The illuminated window — the only light source
        const winW = W * 0.085;
        const winH = H * 0.06;
        const winX = W * 0.2;
        const winY = H * 0.28;

        // Glow from window
        const winGlow = ctx.createRadialGradient(winX + winW / 2, winY + winH / 2, 0, winX + winW / 2, winY + winH / 2, W * 0.22);
        winGlow.addColorStop(0, `rgba(200,190,150,${0.18 + p * 0.08})`);
        winGlow.addColorStop(0.3, `rgba(150,140,90,${0.06 + p * 0.03})`);
        winGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = winGlow;
        ctx.fillRect(0, 0, W, H);

        ctx.fillStyle = `rgba(220,210,160,${0.7 + p * 0.2})`;
        ctx.fillRect(winX, winY, winW, winH);

        // Subtle movement inside window (fear phase)
        if (p > 0.3) {
          const moveAlpha = Math.min(1, (p - 0.3) * 3);
          const shadowX = winX + winW * (0.3 + Math.sin(t * 0.02) * 0.2);
          const shadowW = winW * 0.25;
          ctx.fillStyle = `rgba(100,80,40,${moveAlpha * 0.6})`;
          ctx.fillRect(shadowX, winY, shadowW, winH);
        }

        // Window panes
        ctx.strokeStyle = `rgba(80,70,40,0.6)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(winX, winY, winW, winH);
        ctx.beginPath();
        ctx.moveTo(winX + winW / 2, winY);
        ctx.lineTo(winX + winW / 2, winY + winH);
        ctx.moveTo(winX, winY + winH / 2);
        ctx.lineTo(winX + winW, winY + winH / 2);
        ctx.stroke();

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.7);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(2,2,3,${0.85 + p * 0.12})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      // ── 12 THE BLACK PHONE: Darkness. Phone. Basement. Ring. ──
      case 12: {
        ctx.fillStyle = 'rgba(5,5,5,1)';
        ctx.fillRect(0, 0, W, H);

        // Basement gradually reveals
        if (p > 0.12) {
          const basementReveal = Math.min(1, (p - 0.12) * 2);

          // Basement walls
          ctx.fillStyle = `rgba(8,7,6,${basementReveal * 0.8})`;
          ctx.fillRect(W * 0.05, H * 0.1, W * 0.9, H * 0.8);

          // Brick texture approximation
          ctx.strokeStyle = `rgba(12,10,9,${basementReveal * 0.4})`;
          ctx.lineWidth = 0.5;
          for (let row = 0; row < 12; row++) {
            for (let col = 0; col < 8; col++) {
              const bx = W * 0.05 + col * W * 0.112;
              const by = H * 0.1 + row * H * 0.065;
              const offset = row % 2 === 0 ? 0 : W * 0.056;
              ctx.strokeRect(bx + offset, by, W * 0.11, H * 0.063);
            }
          }

          // Single bare bulb light
          const bulbAlpha = basementReveal * 0.7;
          const bulbGrad = ctx.createRadialGradient(W * 0.5, H * 0.15, 0, W * 0.5, H * 0.15, W * 0.3);
          bulbGrad.addColorStop(0, `rgba(220,200,160,${bulbAlpha})`);
          bulbGrad.addColorStop(0.2, `rgba(150,130,90,${bulbAlpha * 0.4})`);
          bulbGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = bulbGrad;
          ctx.fillRect(0, 0, W, H);

          // The phone — wall-mounted, comes into focus
          if (p > 0.3) {
            const phoneFocus = Math.min(1, (p - 0.3) * 2.5);
            const phoneW = W * (0.04 + phoneFocus * 0.06);
            const phoneH = phoneW * 0.6;
            const phoneX = W * 0.65;
            const phoneY = H * 0.42;
            ctx.fillStyle = `rgba(20,15,12,${phoneFocus * 0.95})`;
            ctx.fillRect(phoneX, phoneY, phoneW, phoneH);
            ctx.strokeStyle = `rgba(40,30,20,${phoneFocus * 0.6})`;
            ctx.lineWidth = 0.5;
            ctx.strokeRect(phoneX, phoneY, phoneW, phoneH);

            // Phone ring visual pulse (fear phase)
            if (p > 0.55) {
              const ringPulse = Math.abs(Math.sin(t * 0.12)) * Math.min(1, (p - 0.55) * 4);
              const rGrad = ctx.createRadialGradient(phoneX + phoneW / 2, phoneY + phoneH / 2, 0, phoneX + phoneW / 2, phoneY + phoneH / 2, phoneW * (1 + ringPulse * 2));
              rGrad.addColorStop(0, `rgba(60,40,20,${ringPulse * 0.5})`);
              rGrad.addColorStop(1, 'rgba(0,0,0,0)');
              ctx.fillStyle = rGrad;
              ctx.fillRect(0, 0, W, H);
            }
          }
        }

        const vig = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, W * 0.6);
        vig.addColorStop(0, 'rgba(0,0,0,0)');
        vig.addColorStop(1, `rgba(2,2,2,${0.8 + p * 0.18})`);
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);
        break;
      }

      default: {
        ctx.fillStyle = 'rgba(4,4,4,1)';
        ctx.fillRect(0, 0, W, H);
      }
    }

    timeRef.current += 1;
    animRef.current = requestAnimationFrame(draw);
  }, [film.order, scrollProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    animRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animRef.current);
    };
  }, [draw]);

  // Re-trigger draw when scrollProgress changes
  useEffect(() => {
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(draw);
  }, [draw, scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ imageRendering: 'crisp-edges' }}
    />
  );
};

// ─── Main FilmWorldChapter ───────────────────────────────────────────────────

interface FilmWorldChapterProps {
  film: ShowcaseFilm;
  onOpenTrailer: (film: ShowcaseFilm) => void;
}

export const FilmWorldChapter: React.FC<FilmWorldChapterProps> = ({
  film,
  onOpenTrailer,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: '200px 0px 200px 0px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smooth spring-based scroll progress for canvas
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const [canvasProgress, setCanvasProgress] = React.useState(0);

  useEffect(() => {
    return smoothProgress.on('change', (v) => setCanvasProgress(Math.max(0, Math.min(1, v))));
  }, [smoothProgress]);

  // ════════════════════════════════════════════════════════════════
  // PHASE 1+2: SPATIAL ENVIRONMENT + CAMERA MOVEMENT
  // Subtle parallax depth — canvas handles the main visuals
  // ════════════════════════════════════════════════════════════════
  const containerOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [0.15, 1, 1, 0.1]
  );

  // ════════════════════════════════════════════════════════════════
  // PHASE 3: FEAR / CINEMATIC ENCOUNTER
  // UI completely fades out during fear. Viewer is alone.
  // ════════════════════════════════════════════════════════════════
  const fearPhaseStart = 0.20;
  const fearPhaseEnd = 0.48;
  const uiFadeForFear = useTransform(
    scrollYProgress,
    [fearPhaseStart - 0.03, fearPhaseStart, fearPhaseEnd, fearPhaseEnd + 0.05],
    [1, 0, 0, 1]
  );

  const fearElementOpacity = useTransform(
    scrollYProgress,
    [fearPhaseStart - 0.02, fearPhaseStart + 0.04, fearPhaseEnd - 0.04, fearPhaseEnd],
    [0, 1, 1, 0]
  );
  const fearY = useTransform(scrollYProgress, [fearPhaseStart - 0.02, fearPhaseStart + 0.06], [20, 0]);

  // ════════════════════════════════════════════════════════════════
  // PHASE 4: FILM REVEAL
  // Title appears ONLY after fear phase has passed
  // ════════════════════════════════════════════════════════════════
  const titleOpacity = useTransform(
    scrollYProgress,
    [fearPhaseEnd + 0.02, fearPhaseEnd + 0.1, 0.76, 0.88],
    [0, 1, 1, 0]
  );
  const titleY = useTransform(scrollYProgress, [fearPhaseEnd + 0.02, fearPhaseEnd + 0.12], [22, 0]);

  // ════════════════════════════════════════════════════════════════
  // PHASE 5: WHY IT TERRIFIES
  // ════════════════════════════════════════════════════════════════
  const breakdownOpacity = useTransform(
    scrollYProgress,
    [0.54, 0.60, 0.70, 0.80],
    [0, 1, 1, 0]
  );
  const breakdownY = useTransform(scrollYProgress, [0.54, 0.62], [18, 0]);

  // ════════════════════════════════════════════════════════════════
  // PHASE 6: ACTIONS — Trailer + Watch on Netflix
  // ════════════════════════════════════════════════════════════════
  const actionsOpacity = useTransform(
    scrollYProgress,
    [0.60, 0.66, 0.78, 0.88],
    [0, 1, 1, 0]
  );
  const actionsY = useTransform(scrollYProgress, [0.60, 0.68], [14, 0]);

  // ════════════════════════════════════════════════════════════════
  // PHASE 7+8: CONTINUATION — environment fades as next world begins
  // (handled by containerOpacity at the end)
  // ════════════════════════════════════════════════════════════════

  // World order indicator (always visible except during fear)
  const worldIndicatorOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.12, fearPhaseStart, fearPhaseStart + 0.03, fearPhaseEnd, fearPhaseEnd + 0.04, 0.84, 0.92],
    [0, 1, 1, 0, 0, 1, 1, 0]
  );

  const handleLaunchTrailer = (e: React.MouseEvent) => {
    e.stopPropagation();
    try { soundEngine.playImpact(); } catch {}
    onOpenTrailer(film);
  };

  const handleWatchOnNetflix = (e: React.MouseEvent) => {
    e.stopPropagation();
    try { soundEngine.playImpact(); } catch {}
    openOnNetflix(film.id, film.title);
  };

  const renderRevealedTitle = () => {
    switch (film.order) {
      case 1: return <ConjuringText text={film.title} />;
      case 2: return <TheNunText text={film.title} />;
      case 3: return <TalkToMeText text={film.title} />;
      case 4: return <FromText text={film.title} />;
      case 5: return <HereditaryText text={film.title} />;
      case 6: return <TarotText text={film.title} />;
      case 7: return <ItText text={film.title} />;
      case 8: return <WelcomeToDerryText text={film.title} />;
      case 9: return <TheRingText text={film.title} />;
      case 10: return <SmileText text={film.title} />;
      case 11: return <TheExorcistText text={film.title} />;
      case 12: return <TheBlackPhoneText text={film.title} />;
      default: return <span>{film.title}</span>;
    }
  };

  const orderStr = film.order < 10 ? `0${film.order}` : `${film.order}`;

  // Per-film scroll height — pacing belongs to the film
  const filmHeights: Record<number, string> = {
    1: '280vh', // Conjuring — slow burn approach
    2: '240vh', // The Nun — vertical descent
    3: '220vh', // Talk To Me — intimate distortion
    4: '300vh', // FROM — endless road
    5: '260vh', // Hereditary — scale inversion
    6: '220vh', // Tarot — single card pass
    7: '250vh', // IT — drain descent
    8: '240vh', // Welcome To Derry — fog travel
    9: '230vh', // The Ring — CRT approach
    10: '210vh', // Smile — restrained stillness
    11: '220vh', // The Exorcist — night street
    12: '260vh', // Black Phone — basement reveal
  };

  return (
    <section
      ref={containerRef}
      id={`showcase-world-${orderStr}`}
      className="relative w-full bg-black text-white overflow-hidden"
      style={{ minHeight: filmHeights[film.order] || '240vh' }}
    >
      {/* ── STICKY CINEMATIC VIEWPORT ── */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden will-change-transform"
        style={{ contain: 'layout style' as any, opacity: containerOpacity }}
      >

        {/* ── LAYER 0: PER-FILM ATMOSPHERIC CANVAS ENVIRONMENT ── */}
        {isInView && (
          <FilmEnvironmentCanvas film={film} scrollProgress={canvasProgress} />
        )}

        {/* ── MINIMAL FILM GRAIN TEXTURE OVERLAY ── */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.025] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />

        {/* ── LAYER 1: WORLD INDICATOR (top-left) ── */}
        <motion.div
          style={{ opacity: worldIndicatorOpacity }}
          className="absolute top-8 sm:top-10 left-5 sm:left-12 z-30 pointer-events-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-red-600" />
            <span className="font-mono text-[9px] text-white/40 tracking-[0.35em] uppercase">
              WORLD {orderStr} / 12
            </span>
          </div>
        </motion.div>

        {/* ── LAYER 2: FEAR / CINEMATIC ENCOUNTER ── */}
        {/* ALL OTHER UI fades to zero during this phase */}
        <motion.div
          style={{ opacity: fearElementOpacity, y: fearY }}
          className="absolute top-1/2 inset-x-0 z-30 -translate-y-1/2 flex flex-col items-center text-center px-6 pointer-events-none will-change-transform"
        >
          <p className="font-mono text-[10px] sm:text-xs text-white/35 tracking-[0.3em] uppercase max-w-sm leading-relaxed mb-4">
            {film.fearEvent.telemetryHint}
          </p>
          <p className="font-cinzel text-xl sm:text-3xl text-white/80 italic tracking-[0.1em] max-w-md">
            {film.fearEvent.quoteOrSignal}
          </p>
        </motion.div>

        {/* ── LAYER 3: FILM REVEAL + EDITORIAL + ACTIONS (Bottom-Left) ── */}
        <div
          className="absolute bottom-8 sm:bottom-12 inset-x-0 z-30 px-5 sm:px-12 lg:px-16 pointer-events-auto"
        >

          {/* PHASE 4: FILM REVEAL */}
          <motion.div
            style={{ y: titleY, opacity: titleOpacity }}
            className="mb-3 will-change-transform"
          >
            {/* Year · Director · Fear mechanism */}
            <div className="flex items-center gap-2 text-[10px] text-white/45 font-medium tracking-[0.2em] uppercase mb-2">
              <span>{film.year}</span>
              <span className="opacity-40">·</span>
              <span>DIR. {film.director}</span>
              <span className="opacity-40">·</span>
              <span className="text-red-500/70">{film.fearMechanism}</span>
            </div>

            {/* THE TITLE — massive, cinematic, horror-specific animation */}
            <h2 className="font-black text-[clamp(2.2rem,7vw,6rem)] text-white tracking-tight uppercase leading-[0.9] max-w-3xl">
              {renderRevealedTitle()}
            </h2>
          </motion.div>

          {/* PHASE 5: WHY IT TERRIFIES */}
          <motion.div
            style={{ y: breakdownY, opacity: breakdownOpacity }}
            className="max-w-lg mb-5 will-change-transform"
          >
            <p className="text-sm text-white/55 leading-relaxed italic border-l border-red-900/40 pl-3">
              "{film.psychologicalBreakdown}"
            </p>
          </motion.div>

          {/* PHASE 6+7: ACTIONS */}
          <motion.div
            style={{ y: actionsY, opacity: actionsOpacity }}
            className="flex items-center gap-3 will-change-transform"
          >
            {/* Watch Trailer */}
            <button
              onClick={handleLaunchTrailer}
              type="button"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/8 hover:bg-white/15 text-white text-[11px] font-medium uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer backdrop-blur-sm active:scale-95 border border-white/10 hover:border-white/25"
            >
              <Play className="w-3 h-3 fill-current opacity-80" />
              <span>Trailer</span>
            </button>

            {/* Watch on Netflix */}
            <button
              onClick={handleWatchOnNetflix}
              type="button"
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-700/80 hover:bg-red-600 text-white text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer active:scale-95 border border-red-600/50 hover:border-red-500"
            >
              <ExternalLink className="w-3 h-3 opacity-80" />
              <span>Watch on Netflix</span>
            </button>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};
