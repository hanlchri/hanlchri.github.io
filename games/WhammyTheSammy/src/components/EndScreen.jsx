import React, { useRef } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';

const MESSAGE = "YOU CAN'T WHAMMY THE SAMMY";

export default function EndScreen({ onTransition, audio }) {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const clickedRef = useRef(false);

  useGameLoop((dt, time) => {
    timeRef.current += dt;
    const t = timeRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    // Black background with subtle static
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // Subtle TV static
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.02})`;
      ctx.fillRect(0, Math.random() * H, W, 1);
    }

    // Text appears letter by letter
    const charsToShow = Math.floor(t * 6);
    const text = MESSAGE.substring(0, Math.min(charsToShow, MESSAGE.length));

    // Slight oscillation
    const wobble = Math.sin(time * 0.003) * 0.5;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '12px monospace';
    ctx.fillStyle = `rgb(${220 + Math.sin(time * 0.005) * 20}, ${220 + Math.sin(time * 0.005) * 20}, ${220 + Math.sin(time * 0.005) * 20})`;
    ctx.fillText(text, W / 2 + wobble, H / 2 - 10);

    // Cursor blink after text
    if (charsToShow <= MESSAGE.length) {
      const cursorX = W / 2 + ctx.measureText(text).width / 2 + 2 + wobble;
      if (Math.sin(time * 0.01) > 0) {
        ctx.fillRect(cursorX, H / 2 - 16, 2, 12);
      }
    }

    // "Click to continue" after text is done
    if (charsToShow > MESSAGE.length + 10) {
      const blink = Math.sin(time * 0.006) > 0;
      if (blink) {
        ctx.fillStyle = '#ff004d';
        ctx.font = '8px monospace';
        ctx.fillText('CLICK TO CONTINUE', W / 2, H / 2 + 20);
      }
    }

    // Occasional Sammy eyes in the dark
    if (Math.random() < 0.005) {
      const ex = Math.random() * W, ey = Math.random() * H;
      ctx.fillStyle = 'rgba(255,0,77,0.15)';
      ctx.fillRect(ex, ey, 2, 2);
      ctx.fillRect(ex + 5, ey, 2, 2);
    }
  });

  const handleClick = () => {
    if (!clickedRef.current && timeRef.current > 2) {
      clickedRef.current = true;
      audio.noiseBurst(0.15, 0.08);
      onTransition();
    }
  };

  return (
    <canvas ref={canvasRef} width={256} height={240}
      style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated', cursor: 'pointer' }}
      onClick={handleClick}
      onTouchEnd={(e) => { e.preventDefault(); handleClick(); }}
    />
  );
}
