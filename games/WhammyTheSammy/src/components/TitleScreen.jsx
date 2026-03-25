import React, { useEffect, useRef, useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';

const SUBLIMINAL = [
  'HE IS WATCHING', 'DON\'T LOOK BEHIND YOU', 'SAMMY SEES YOU',
  'YOU CAN\'T ESCAPE', 'HE REMEMBERS', 'IT\'S TOO LATE'
];

export default function TitleScreen({ onStart, onStartEndless }) {
  const canvasRef = useRef(null);
  const [selected, setSelected] = useState(0);
  const glitchRef = useRef(0);
  const sublimRef = useRef({ text: '', alpha: 0, x: 0, y: 0 });

  useGameLoop((dt, time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    // Checkerboard bg
    for (let y = 0; y < h; y += 16) {
      for (let x = 0; x < w; x += 16) {
        ctx.fillStyle = ((x >> 4) + (y >> 4)) % 2 ? '#1bffba' : '#0c7b5b';
        ctx.fillRect(x, y, 16, 16);
      }
    }

    // Glitch
    if (Math.random() < 0.025) glitchRef.current = Math.random();
    else glitchRef.current = Math.max(0, glitchRef.current - dt * 3);

    if (glitchRef.current > 0.4) {
      ctx.fillStyle = `rgba(0,0,0,${glitchRef.current * 0.8})`;
      ctx.fillRect(0, 0, w, h);

      // Subliminal horror text
      if (Math.random() < 0.4) {
        const s = sublimRef.current;
        s.text = SUBLIMINAL[Math.floor(Math.random() * SUBLIMINAL.length)];
        s.x = Math.random() * (w - 80) + 40;
        s.y = Math.random() * (h - 20) + 10;
        s.alpha = 0.6 + Math.random() * 0.4;
      }
    }

    // Draw subliminal text fading out
    const s = sublimRef.current;
    if (s.alpha > 0) {
      ctx.fillStyle = `rgba(255,0,77,${s.alpha})`;
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(s.text, s.x, s.y);
      s.alpha -= dt * 4;
    }

    // Occasional screen tear
    if (Math.random() < 0.008) {
      const tearY = Math.random() * h;
      const tearH = 2 + Math.random() * 6;
      const imgData = ctx.getImageData(0, tearY, w, tearH);
      ctx.putImageData(imgData, Math.random() * 8 - 4, tearY);
    }

    // Title
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Shadow
    ctx.fillStyle = '#000';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('WHAMMY', w / 2 + 2, 55 + 2);
    ctx.fillText('THE SAMMY', w / 2 + 2, 82 + 2);

    // Main text with slight color shift
    const flicker = Math.sin(time * 0.008) * 0.1;
    ctx.fillStyle = `rgb(${255 - flicker * 100}, ${255 - flicker * 50}, ${255})`;
    ctx.font = 'bold 22px monospace';
    ctx.fillText('WHAMMY', w / 2, 55);
    ctx.fillText('THE SAMMY', w / 2, 82);

    // Subtitle
    ctx.font = '8px monospace';
    ctx.fillStyle = '#111';
    ctx.fillText('AN HONEST FAMILY GAME', w / 2, 105);

    // Menu options
    const blink = Math.sin(time * 0.005) > 0;

    ctx.font = '10px monospace';
    ctx.fillStyle = selected === 0 ? (blink ? '#ffec27' : '#fff') : '#444';
    ctx.fillText(selected === 0 ? '> STORY MODE <' : 'STORY MODE', w / 2, 148);

    ctx.fillStyle = selected === 1 ? (blink ? '#ffec27' : '#fff') : '#444';
    ctx.fillText(selected === 1 ? '> ENDLESS MODE <' : 'ENDLESS MODE', w / 2, 168);

    // Touch hint
    ctx.font = '7px monospace';
    ctx.fillStyle = '#333';
    ctx.fillText('TAP OPTIONS OR USE KEYS', w / 2, 210);
    ctx.fillText('SPACE / ENTER TO START', w / 2, 222);
  });

  // Keyboard
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') setSelected(p => p === 0 ? 1 : 0);
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (selected === 0) onStart(); else onStartEndless();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected, onStart, onStartEndless]);

  // Touch/click on canvas
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const sy = canvas.height / rect.height;
    const y = (e.clientY - rect.top) * sy;

    if (y > 135 && y < 158) { setSelected(0); onStart(); }
    else if (y > 158 && y < 180) { setSelected(1); onStartEndless(); }
  };

  return (
    <canvas
      ref={canvasRef}
      width={256} height={240}
      style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated', cursor: 'pointer' }}
      onClick={handleCanvasClick}
      onTouchEnd={(e) => { e.preventDefault(); handleCanvasClick(e.changedTouches[0]); }}
    />
  );
}
