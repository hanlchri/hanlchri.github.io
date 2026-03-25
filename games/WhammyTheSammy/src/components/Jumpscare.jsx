import React, { useRef, useEffect } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';

export default function Jumpscare({ onTransition, audio }) {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    // Loud burst
    audio.noiseBurst(0.8, 0.25);
    // Staggered bursts for sustained horror
    setTimeout(() => audio.noiseBurst(0.3, 0.15), 200);
    setTimeout(() => audio.noiseBurst(0.4, 0.1), 500);
    setTimeout(() => audio.beep(55, 0.5, 'sawtooth', 0.08), 100);
  }, [audio]);

  useGameLoop((dt, time) => {
    timeRef.current += dt;
    const t = timeRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Extended to 1.8s
    if (t > 1.8) { onTransition(); return; }

    // Screen shake intensity
    const shakeI = Math.max(0, 1 - t * 0.4) * 8;
    const sx = (Math.random() - 0.5) * shakeI;
    const sy = (Math.random() - 0.5) * shakeI;

    // Background flashes between black and red
    const flash = Math.sin(t * 40) > 0;
    ctx.fillStyle = flash ? '#1a0000' : '#000';
    ctx.fillRect(0, 0, W, H);

    // Giant face
    const s = 3.5 + t * 8;
    const cx = 128 + sx, cy = 120 + sy;

    // Multiple distorted copies
    for (let i = 0; i < 4; i++) {
      const ox = (Math.random() - 0.5) * (4 + t * 8) * (i > 0 ? 1 : 0);
      const oy = (Math.random() - 0.5) * (4 + t * 8) * (i > 0 ? 1 : 0);

      ctx.save();
      ctx.translate(cx + ox, cy + oy);
      ctx.scale(s, s);

      if (i > 0) ctx.globalAlpha = 0.3;

      // Face
      ctx.fillStyle = i === 1 ? '#ff004d' : i === 2 ? '#29adff' : '#83769c';
      ctx.fillRect(-8, -12, 16, 12);
      ctx.fillRect(-10, -8, 20, 8);

      // Eyes - massive and red
      ctx.fillStyle = '#ff004d';
      const eyeSize = 4 + t * 2;
      ctx.fillRect(-6, -10, eyeSize, eyeSize);
      ctx.fillRect(2, -10, eyeSize, eyeSize);

      // Gaping mouth
      ctx.fillStyle = '#000';
      ctx.fillRect(-5, -2, 10, 4 + t * 3);

      // Teeth
      if (i === 0) {
        ctx.fillStyle = '#e0e0e0';
        for (let tooth = -4; tooth < 5; tooth += 2) {
          ctx.fillRect(tooth, -2, 1, 2);
        }
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Heavy static overlay
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.2})`;
      ctx.fillRect(0, Math.random() * H, W, 1 + Math.random() * 2);
    }

    // Red vignette
    const vigAlpha = 0.2 + Math.sin(t * 30) * 0.1;
    ctx.fillStyle = `rgba(255,0,0,${vigAlpha})`;
    ctx.fillRect(0, 0, W, H);

    // Screen tear
    for (let i = 0; i < 3; i++) {
      if (Math.random() < 0.3) {
        const tearY = Math.random() * H;
        try {
          const imgData = ctx.getImageData(0, Math.floor(tearY), W, 3);
          ctx.putImageData(imgData, Math.floor((Math.random() - 0.5) * 20), Math.floor(tearY));
        } catch(e) {}
      }
    }
  });

  return (
    <canvas ref={canvasRef} width={256} height={240}
      style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }} />
  );
}
