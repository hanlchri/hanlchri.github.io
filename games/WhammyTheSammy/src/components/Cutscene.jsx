import React, { useRef, useEffect } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';

export default function Cutscene({ onTransition, audio }) {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    audio.noiseBurst(0.5, 0.1);
    audio.stopDrone();
    audio.stopHeartbeat();
  }, [audio]);

  useGameLoop((dt, time) => {
    timeRef.current += dt;
    const t = timeRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    if (t > 5.0) { onTransition(); return; }

    // Background flicker
    const f = Math.sin(time * 0.025) * 0.5 + 0.5;
    ctx.fillStyle = f > 0.5 ? '#2a1a2e' : '#0a0a0a';
    ctx.fillRect(0, 0, W, H);

    // Face zooming in with distortion
    const s = 0.8 + t * 2.0;
    const cx = 128, cy = 120;

    // Multiple offset copies for chromatic aberration
    const layers = [
      { ox: -2 - t, oy: 0, color: 'rgba(255,0,77,0.4)' },
      { ox: 2 + t, oy: 0, color: 'rgba(0,180,255,0.4)' },
      { ox: 0, oy: 0, color: null }
    ];

    layers.forEach(({ ox, oy, color }) => {
      const shake = Math.sin(t * 8) * (1 + t * 0.5);
      ctx.save();
      ctx.translate(cx + ox + shake * (Math.random() - 0.5), cy + oy + shake * (Math.random() - 0.5));
      ctx.scale(s, s);

      // Mole face
      if (color) ctx.globalAlpha = 0.5;
      ctx.fillStyle = color || '#83769c';
      ctx.fillRect(-8, -12, 16, 12);
      ctx.fillRect(-10, -8, 20, 8);

      // Eyes - get bigger over time
      const eyeSize = 3 + t * 0.5;
      ctx.fillStyle = color || '#ff004d';
      ctx.fillRect(-5, -9, eyeSize, eyeSize);
      ctx.fillRect(2, -9, eyeSize, eyeSize);

      // Mouth opens wider
      ctx.fillStyle = color || '#1a1a1a';
      ctx.fillRect(-4, -2, 8, 2 + t);

      // Teeth
      if (!color) {
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(-3, -2, 2, 1);
        ctx.fillRect(1, -2, 2, 1);
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    });

    // Static noise overlay - increases over time
    const staticIntensity = Math.min(0.15, t * 0.03);
    for (let i = 0; i < 20 + t * 10; i++) {
      const y = Math.random() * H;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * staticIntensity})`;
      ctx.fillRect(0, y, W, 1);
    }

    // Screen tear
    if (Math.random() < 0.05 + t * 0.02) {
      const tearY = Math.random() * H;
      const tearH = 2 + Math.random() * 4;
      try {
        const imgData = ctx.getImageData(0, Math.floor(tearY), W, Math.floor(tearH));
        ctx.putImageData(imgData, Math.floor((Math.random() - 0.5) * 10), Math.floor(tearY));
      } catch(e) {}
    }

    // Text that fades in
    if (t > 2.5) {
      const ta = Math.min(1, (t - 2.5) / 1.5);
      ctx.fillStyle = `rgba(255,0,77,${ta * 0.7})`;
      ctx.font = '10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('YOU FOUND HIM', 128, 30);
    }

    // Periodic noise burst
    if (Math.random() < 0.02) audio.noiseBurst(0.04, 0.03);
  });

  return (
    <canvas ref={canvasRef} width={256} height={240}
      style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }} />
  );
}
