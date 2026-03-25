import React, { useEffect, useRef } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';

const PAL = {
  bg: '#000000', fg: '#e0e0e0', red: '#ff004d', green: '#00e436',
  blue: '#29adff', yellow: '#ffec27', dark: '#1a1a1a', gray: '#555555', purple: '#83769c'
};

const HORROR_TEXTS = ['RUN', 'BEHIND YOU', 'HE KNOWS', 'TOO SLOW', 'SAMMY'];

export default function WhackGame({ mode, onGameOver, onTransition, audio }) {
  const canvasRef = useRef(null);

  const state = useRef({
    time: 0, score: 0, hearts: 3, grid: [],
    mole: null, nextPopIn: 1.0, tension: 0,
    blackoutT: 0, sammyAttack: false, sammyT: 0,
    difficultyMultiplier: 1.0,
    horrorFlash: 0, sammyEyeHole: -1, sammyEyeT: 0,
    screenShake: 0, horrorText: '', horrorTextT: 0,
    ambientDark: 0
  });

  useEffect(() => {
    const gw = 3, gh = 3;
    const marginX = 24, marginY = 44;
    const w = 256 - marginX * 2, h = 240 - marginY * 2;
    const grid = [];
    for (let gy = 0; gy < gh; gy++) {
      for (let gx = 0; gx < gw; gx++) {
        grid.push({ x: marginX + (w / (gw - 1)) * gx, y: marginY + (h / (gh - 1)) * gy });
      }
    }
    const s = state.current;
    s.grid = grid; s.time = 0; s.score = 0; s.hearts = 3;
    s.mole = null; s.nextPopIn = 1.0; s.tension = 0;
    s.blackoutT = 0; s.sammyAttack = false; s.sammyT = 0;
    s.difficultyMultiplier = 1.0; s.horrorFlash = 0;
    s.sammyEyeHole = -1; s.sammyEyeT = 0; s.screenShake = 0;
    s.ambientDark = 0;
  }, [mode]);

  // Input
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleInput = (cx, cy) => {
      const rect = canvas.getBoundingClientRect();
      const sx = canvas.width / rect.width;
      const sy = canvas.height / rect.height;
      const mx = (cx - rect.left) * sx;
      const my = (cy - rect.top) * sy;
      const s = state.current;

      if (s.mole && s.mole.alive && !s.mole.sammy) {
        const hole = s.grid[s.mole.idx];
        const dx = mx - hole.x, dy = my - (hole.y - 4);
        if (dx * dx + dy * dy <= 20 * 20) {
          if (s.mole.decoy) {
            audio.noiseBurst(0.12, 0.08);
            s.tension = Math.min(1, s.tension + 0.12);
            s.screenShake = 0.3;
            s.horrorFlash = 0.4;
          } else {
            s.score += 1;
            audio.beep(880, 0.04);
            if (mode === 'endless') s.difficultyMultiplier += 0.025;
          }
          s.mole.alive = false; s.mole = null;
          s.nextPopIn = Math.random() * 0.3 + 0.2;
        } else {
          audio.beep(180, 0.04, 'triangle');
          s.tension = Math.min(1, s.tension + 0.04);
          s.screenShake = 0.15;
        }
      }
    };

    const onMouse = (e) => handleInput(e.clientX, e.clientY);
    const onTouch = (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      handleInput(t.clientX, t.clientY);
    };
    canvas.addEventListener('mousedown', onMouse);
    canvas.addEventListener('touchstart', onTouch, { passive: false });
    return () => {
      canvas.removeEventListener('mousedown', onMouse);
      canvas.removeEventListener('touchstart', onTouch);
    };
  }, [mode, audio]);

  useGameLoop((dt, time) => {
    const s = state.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    s.time += dt;
    s.tension = Math.max(0, Math.min(1, s.tension + dt * 0.015));
    s.ambientDark = Math.min(0.3, s.time * 0.008);
    if (s.blackoutT > 0) s.blackoutT -= dt;
    if (s.horrorFlash > 0) s.horrorFlash -= dt * 2;
    if (s.screenShake > 0) s.screenShake -= dt * 3;
    if (s.sammyEyeT > 0) s.sammyEyeT -= dt;
    if (s.horrorTextT > 0) s.horrorTextT -= dt;

    // Sammy eyes in random empty holes
    if (s.sammyEyeT <= 0 && Math.random() < 0.003 + s.tension * 0.01) {
      const emptyHoles = s.grid.map((_, i) => i).filter(i => !s.mole || s.mole.idx !== i);
      if (emptyHoles.length > 0) {
        s.sammyEyeHole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
        s.sammyEyeT = 0.3 + Math.random() * 0.5;
        if (Math.random() < 0.3) audio.whisper();
      }
    }

    // Horror text flashes
    if (s.horrorTextT <= 0 && Math.random() < 0.002 + s.tension * 0.005) {
      s.horrorText = HORROR_TEXTS[Math.floor(Math.random() * HORROR_TEXTS.length)];
      s.horrorTextT = 0.2 + Math.random() * 0.3;
    }

    // Random blackout
    if (s.blackoutT <= 0 && Math.random() < 0.001 + s.tension * 0.003) {
      s.blackoutT = 0.1 + Math.random() * 0.2;
      audio.noiseBurst(0.05, 0.03);
    }

    // Sammy attack
    if (s.sammyAttack) {
      s.sammyT += dt;
      if (s.sammyT > 0.6 && s.hearts === 3) { s.hearts = 2; audio.noiseBurst(0.15, 0.1); }
      if (s.sammyT > 1.2 && s.hearts === 2) { s.hearts = 1; audio.noiseBurst(0.15, 0.1); }
      if (s.sammyT > 1.8 && s.hearts === 1) { s.hearts = 0; audio.noiseBurst(0.25, 0.12); }
      if (s.sammyT > 2.4) {
        if (mode === 'story') onTransition(); else onGameOver(s.score);
      }
    } else {
      if (mode === 'story' && s.time >= 26.0) {
        s.sammyAttack = true;
        s.mole = { idx: 4, t: 0, alive: true, sammy: true };
        audio.noiseBurst(0.3, 0.1);
        s.screenShake = 1.0;
      }
      // Mole spawning
      if (!s.mole) {
        s.nextPopIn -= dt * s.difficultyMultiplier;
        if (s.nextPopIn <= 0) {
          const idx = Math.floor(Math.random() * s.grid.length);
          const decoy = Math.random() < 0.12 + s.tension * 0.08;
          s.mole = { idx, t: 0, alive: true, sammy: false, decoy };
        }
      } else if (s.mole.alive && !s.mole.sammy) {
        s.mole.t += dt * s.difficultyMultiplier;
        if (s.mole.t > (0.8 + Math.random() * 0.4) / s.difficultyMultiplier) {
          s.mole.alive = false; s.mole = null;
          s.nextPopIn = Math.random() * 0.3 + 0.15;
        }
      }
    }

    // === DRAW ===
    const shakeX = s.screenShake > 0 ? (Math.random() - 0.5) * s.screenShake * 6 : 0;
    const shakeY = s.screenShake > 0 ? (Math.random() - 0.5) * s.screenShake * 6 : 0;
    ctx.save();
    ctx.translate(shakeX, shakeY);

    // Background - gets darker with tension
    const bgBright = Math.max(0, 8 - s.tension * 8);
    ctx.fillStyle = `rgb(${bgBright},${bgBright},${bgBright})`;
    ctx.fillRect(0, 0, W, H);

    // Title
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = PAL.fg;
    ctx.fillText(mode === 'endless' ? 'ENDLESS WHAMMY' : 'WHAMMY THE SAMMY', 128, 6);

    // Timer (story mode)
    if (mode === 'story') {
      const remaining = Math.max(0, Math.ceil(26 - s.time));
      ctx.textAlign = 'right';
      ctx.fillStyle = remaining <= 5 ? PAL.red : PAL.fg;
      ctx.fillText(remaining + 's', 248, 6);
    }

    // Holes
    s.grid.forEach((h, i) => {
      // Hole shadow
      ctx.beginPath();
      ctx.ellipse(h.x, h.y + 6, 14, 8, 0, 0, Math.PI * 2);
      ctx.fillStyle = '#0a0a0a';
      ctx.fill();
      // Hole
      ctx.beginPath();
      ctx.ellipse(h.x, h.y + 4, 13, 7, 0, 0, Math.PI * 2);
      ctx.fillStyle = PAL.dark;
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sammy eyes in empty holes (horror element)
      if (i === s.sammyEyeHole && s.sammyEyeT > 0 && (!s.mole || s.mole.idx !== i)) {
        const ea = Math.min(1, s.sammyEyeT * 3);
        ctx.fillStyle = `rgba(255,0,77,${ea * 0.9})`;
        ctx.fillRect(h.x - 5, h.y - 1, 3, 3);
        ctx.fillRect(h.x + 2, h.y - 1, 3, 3);
      }
    });

    // Active mole
    if (s.mole && s.mole.alive) {
      const h = s.grid[s.mole.idx];
      const rise = Math.min(1, (s.mole.t || 0) / 0.15);
      const y = h.y + 8 - rise * 18;
      const isSammy = s.mole.sammy;
      const isDecoy = s.mole.decoy;
      const body = isSammy ? PAL.purple : isDecoy ? '#664444' : PAL.green;
      const eye = isSammy ? PAL.red : isDecoy ? '#aa3333' : PAL.blue;
      const shake = isSammy ? Math.sin(time * 0.03) * 2 : 0;
      const mx = h.x + shake;

      // Body
      ctx.fillStyle = body;
      ctx.fillRect(mx - 8, y - 12, 16, 12);
      ctx.fillRect(mx - 10, y - 8, 20, 8);
      // Ears
      ctx.fillRect(mx - 10, y - 14, 4, 4);
      ctx.fillRect(mx + 6, y - 14, 4, 4);
      // Eyes
      ctx.fillStyle = eye;
      ctx.fillRect(mx - 5, y - 9, 3, 3);
      ctx.fillRect(mx + 2, y - 9, 3, 3);
      // Teeth
      ctx.fillStyle = PAL.fg;
      ctx.fillRect(mx - 3, y - 2, 2, 2);
      ctx.fillRect(mx + 1, y - 2, 2, 2);

      // Sammy glow
      if (isSammy) {
        ctx.fillStyle = `rgba(255,0,77,${0.1 + Math.sin(time * 0.01) * 0.05})`;
        ctx.beginPath();
        ctx.arc(mx, y - 6, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // HUD
    ctx.textAlign = 'left';
    ctx.fillStyle = PAL.fg;
    ctx.font = '8px monospace';
    ctx.fillText('SCORE ' + s.score, 6, 6);

    // Hearts
    for (let i = 0; i < 3; i++) {
      ctx.fillStyle = i < s.hearts ? PAL.red : '#222';
      // Simple heart shape
      const hx = 6 + i * 12, hy = 18;
      ctx.fillRect(hx, hy + 1, 8, 5);
      ctx.fillRect(hx + 1, hy, 3, 1);
      ctx.fillRect(hx + 4, hy, 3, 1);
      ctx.fillRect(hx + 1, hy + 6, 6, 1);
      ctx.fillRect(hx + 2, hy + 7, 4, 1);
      ctx.fillRect(hx + 3, hy + 8, 2, 1);
    }

    // Ambient darkness overlay
    if (s.ambientDark > 0) {
      ctx.fillStyle = `rgba(0,0,0,${s.ambientDark})`;
      ctx.fillRect(0, 0, W, H);
    }

    // Horror text flash
    if (s.horrorTextT > 0) {
      ctx.fillStyle = `rgba(255,0,77,${s.horrorTextT * 2})`;
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(s.horrorText, W / 2, H / 2);
    }

    // Blackout
    if (s.blackoutT > 0) {
      ctx.fillStyle = `rgba(0,0,0,${Math.min(0.95, s.blackoutT * 5)})`;
      ctx.fillRect(0, 0, W, H);
    }

    // Horror flash (red)
    if (s.horrorFlash > 0) {
      ctx.fillStyle = `rgba(255,0,0,${s.horrorFlash * 0.15})`;
      ctx.fillRect(0, 0, W, H);
    }

    // Tap instruction
    if (s.time < 3 && !s.sammyAttack) {
      const a = Math.max(0, 1 - s.time / 3);
      ctx.fillStyle = `rgba(224,224,224,${a})`;
      ctx.font = '7px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TAP THE MOLES!', 128, 230);
    }

    ctx.restore();
  });

  return (
    <canvas
      ref={canvasRef}
      width={256} height={240}
      style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated', cursor: 'crosshair' }}
    />
  );
}
