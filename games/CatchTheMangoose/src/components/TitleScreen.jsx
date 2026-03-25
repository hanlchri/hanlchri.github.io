import React, { useRef, useEffect } from 'react';

const W = 608, H = 480;

export default function TitleScreen({ onStart }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const animate = (time) => {
      ctx.fillStyle = '#87ceeb';
      ctx.fillRect(0, 0, W, H);

      // Ground
      ctx.fillStyle = '#d9a066';
      ctx.fillRect(0, H * 0.5, W, H * 0.5);

      // Layers
      for (let y = H * 0.55; y < H; y += 32) {
        ctx.fillStyle = `rgba(0,0,0,${0.03 + (y - H * 0.5) / H * 0.1})`;
        ctx.fillRect(0, y, W, 4);
      }

      // Title
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Shadow
      ctx.fillStyle = '#000';
      ctx.font = 'bold 42px monospace';
      ctx.fillText('CATCH THE', W / 2 + 2, 100 + 2);
      ctx.fillText('MANGOOSE', W / 2 + 2, 150 + 2);

      // Main
      ctx.fillStyle = '#fff';
      ctx.fillText('CATCH THE', W / 2, 100);
      ctx.fillStyle = '#8b4513';
      ctx.fillText('MANGOOSE', W / 2, 150);

      // Mangoose character preview
      const mx = W / 2, my = 230;
      const bob = Math.sin(time * 0.003) * 4;
      // Body
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(mx - 16, my - 12 + bob, 32, 20);
      ctx.fillRect(mx - 12, my - 18 + bob, 24, 8);
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.fillRect(mx - 8, my - 14 + bob, 6, 6);
      ctx.fillRect(mx + 2, my - 14 + bob, 6, 6);
      ctx.fillStyle = '#000';
      ctx.fillRect(mx - 6, my - 12 + bob, 3, 3);
      ctx.fillRect(mx + 4, my - 12 + bob, 3, 3);
      // Nose
      ctx.fillStyle = '#ffb6c1';
      ctx.fillRect(mx - 2, my - 8 + bob, 4, 3);
      // Tail
      ctx.fillStyle = '#a0522d';
      ctx.fillRect(mx + 14, my - 6 + bob, 12, 4);
      ctx.fillRect(mx + 24, my - 10 + bob, 4, 8);

      // Instructions
      ctx.font = '18px monospace';
      ctx.fillStyle = '#333';
      ctx.fillText('ARROWS to Move | SPACE to Pump', W / 2, 310);
      ctx.fillText('Dig tunnels, inflate enemies!', W / 2, 340);

      // Start button
      const blink = Math.sin(time * 0.005) > 0;
      ctx.font = 'bold 24px monospace';
      ctx.fillStyle = blink ? '#ff4444' : '#cc0000';
      ctx.fillText('[ TAP OR PRESS ENTER ]', W / 2, 400);

      ctx.font = '12px monospace';
      ctx.fillStyle = '#666';
      ctx.fillText('A perfectly normal game.', W / 2, 450);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onStart(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStart]);

  return (
    <canvas
      ref={canvasRef} width={W} height={H}
      style={{ maxWidth: '100vw', maxHeight: '100vh', objectFit: 'contain', imageRendering: 'pixelated', cursor: 'pointer', border: '4px solid #fff', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
      onClick={onStart}
      onTouchEnd={(e) => { e.preventDefault(); onStart(); }}
    />
  );
}
