import React, { useEffect, useRef } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';

const PAL = { bg: '#000', fg: '#e0e0e0', blue: '#29adff', purple: '#83769c', dark: '#1a1a1a', red: '#ff004d' };

export default function WalkScene({ onTransition, audio }) {
  const canvasRef = useRef(null);
  const state = useRef({
    px: 128, py: 180, mole: { x: 0, y: 0 },
    drips: [], flickerT: 0, introT: 2.5,
    revealDist: 52, started: false, breathT: 0,
    shadowAngles: [0, Math.PI * 0.7, Math.PI * 1.4],
    footstepT: 0
  });
  const keys = useRef({});

  useEffect(() => {
    let mx, my;
    do {
      mx = Math.random() * 200 + 28;
      my = Math.random() * 80 + 40;
    } while (Math.hypot(mx - 128, my - 180) < 100);
    state.current.mole = { x: mx, y: my };

    audio.startDrone();
    audio.startHeartbeat(0.5);

    const onDown = (e) => keys.current[e.key.toLowerCase()] = true;
    const onUp = (e) => keys.current[e.key.toLowerCase()] = false;
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);

    return () => {
      audio.stopDrone();
      audio.stopHeartbeat();
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, [audio]);

  // Touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let touchId = null;
    let touchStart = null;

    const onTouchStart = (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      touchId = t.identifier;
      const rect = canvas.getBoundingClientRect();
      const sx = canvas.width / rect.width;
      touchStart = { x: (t.clientX - rect.left) * sx, y: (t.clientY - rect.top) * (canvas.height / rect.height) };
    };

    const onTouchMove = (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) {
        if (t.identifier === touchId && touchStart) {
          const rect = canvas.getBoundingClientRect();
          const sx = canvas.width / rect.width;
          const sy = canvas.height / rect.height;
          const cx = (t.clientX - rect.left) * sx;
          const cy = (t.clientY - rect.top) * sy;
          const dx = cx - touchStart.x;
          const dy = cy - touchStart.y;
          const len = Math.hypot(dx, dy);
          if (len > 5) {
            keys.current = {};
            if (Math.abs(dx) > Math.abs(dy)) {
              keys.current[dx > 0 ? 'arrowright' : 'arrowleft'] = true;
            } else {
              keys.current[dy > 0 ? 'arrowdown' : 'arrowup'] = true;
            }
          }
        }
      }
    };

    const onTouchEnd = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier === touchId) { touchId = null; keys.current = {}; }
      }
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);
    return () => {
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  useGameLoop((dt, time) => {
    const s = state.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    if (!s.started) { s.started = true; audio.beep(330, 0.06); }
    if (s.introT > 0) s.introT -= dt;
    s.breathT += dt;

    // Movement
    let dx = 0, dy = 0;
    if (keys.current['arrowleft'] || keys.current['a']) dx -= 1;
    if (keys.current['arrowright'] || keys.current['d']) dx += 1;
    if (keys.current['arrowup'] || keys.current['w']) dy -= 1;
    if (keys.current['arrowdown'] || keys.current['s']) dy += 1;
    const len = Math.hypot(dx, dy) || 1;
    const speed = 55;
    s.px = Math.max(8, Math.min(W - 8, s.px + (dx / len) * speed * dt));
    s.py = Math.max(32, Math.min(H - 8, s.py + (dy / len) * speed * dt));

    // Footstep sounds
    if (Math.abs(dx) + Math.abs(dy) > 0) {
      s.footstepT -= dt;
      if (s.footstepT <= 0) {
        audio.beep(80 + Math.random() * 40, 0.02, 'square', 0.015);
        s.footstepT = 0.35;
      }
    }

    // Flicker
    s.flickerT -= dt;
    if (s.flickerT <= 0 && Math.random() < 0.04) {
      s.flickerT = Math.random() * 0.12 + 0.04;
      audio.noiseBurst(0.06, 0.02);
    }

    // Drips
    if (Math.random() < 0.04) {
      s.drips.push({ x: Math.random() * (W - 24) + 12, y: 26, v: Math.random() * 15 + 10 });
      if (s.drips.length > 50) s.drips.shift();
    }
    s.drips.forEach(d => d.y += d.v * dt);
    s.drips = s.drips.filter(d => d.y < H - 6);

    // Distance to mole / heartbeat
    const dd = Math.hypot(s.px - s.mole.x, s.py - s.mole.y);
    const heartRate = 0.5 + Math.max(0, 1 - dd / 120) * 2.5;
    audio.setHeartbeatRate(heartRate);

    // Whisper when close
    if (dd < 70 && Math.random() < 0.008) audio.whisper();

    if (dd < 14) { onTransition(); return; }

    // === DRAW ===
    // Dark tiles
    for (let y = 0; y < H; y += 16) {
      for (let x = 0; x < W; x += 16) {
        ctx.fillStyle = ((x >> 4) + (y >> 4)) % 2 ? '#050505' : '#030303';
        ctx.fillRect(x, y, 16, 16);
      }
    }

    // Wall
    ctx.fillStyle = PAL.dark;
    ctx.fillRect(0, 24, W, 2);
    for (let x = 0; x < W; x += 28) {
      ctx.fillStyle = '#080808';
      ctx.fillRect(x, 26, 3, H - 30);
    }

    // Drips
    ctx.fillStyle = PAL.purple;
    s.drips.forEach(d => { ctx.globalAlpha = 0.6; ctx.fillRect(d.x, d.y, 1, 3); });
    ctx.globalAlpha = 1;

    // Shadows at edge of light (horror element)
    s.shadowAngles.forEach((a, i) => {
      const sa = a + time * 0.0003 * (i % 2 === 0 ? 1 : -1);
      const sdist = 50 + Math.sin(time * 0.001 + i) * 10;
      const sx = s.px + Math.cos(sa) * sdist;
      const sy = s.py + Math.sin(sa) * sdist;
      if (sx > 0 && sx < W && sy > 24 && sy < H) {
        ctx.fillStyle = 'rgba(80,50,80,0.15)';
        ctx.fillRect(sx - 3, sy - 5, 6, 10);
        // Tiny eyes
        if (Math.sin(time * 0.002 + i * 2) > 0.7) {
          ctx.fillStyle = 'rgba(255,0,77,0.2)';
          ctx.fillRect(sx - 2, sy - 3, 1, 1);
          ctx.fillRect(sx + 1, sy - 3, 1, 1);
        }
      }
    });

    // Mole (only visible when close)
    if (dd < s.revealDist) {
      const vis = 1 - dd / s.revealDist;
      const shake = Math.sin(time * 0.004) + Math.random() * 0.3;
      const mx = s.mole.x + shake, my = s.mole.y + Math.sin(time * 0.002);
      ctx.globalAlpha = vis;
      // Body
      ctx.fillStyle = PAL.purple;
      ctx.fillRect(mx - 8, my - 10, 16, 10);
      ctx.fillRect(mx - 10, my - 6, 20, 6);
      // Eyes (red, glowing)
      ctx.fillStyle = PAL.red;
      ctx.fillRect(mx - 5, my - 7, 3, 3);
      ctx.fillRect(mx + 2, my - 7, 3, 3);
      // Teeth
      ctx.fillStyle = PAL.fg;
      ctx.fillRect(mx - 3, my - 1, 2, 2);
      ctx.fillRect(mx + 1, my - 1, 2, 2);
      // Red glow
      ctx.fillStyle = `rgba(255,0,77,${vis * 0.1})`;
      ctx.beginPath();
      ctx.arc(mx, my - 4, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    // Player
    ctx.fillStyle = PAL.blue;
    ctx.fillRect(s.px - 4, s.py - 6, 8, 12);
    ctx.fillRect(s.px - 2, s.py - 8, 4, 2);

    // Light circle with breathing effect
    const breathe = Math.sin(s.breathT * 1.5) * 2;
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    const baseAlpha = 0.95;
    const revealProgress = Math.min(1, (2.5 - Math.max(0, s.introT)) / 2.5);
    const alpha = baseAlpha - revealProgress * 0.6;
    ctx.fillStyle = `rgba(0,0,0,${Math.max(0.3, alpha)})`;
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'destination-out';
    const r = 40 + revealProgress * 8 + breathe;
    ctx.beginPath();
    ctx.arc(s.px, s.py - 2, r, 0, Math.PI * 2);
    ctx.fill();
    // Soft edge
    const grad = ctx.createRadialGradient(s.px, s.py - 2, r * 0.7, s.px, s.py - 2, r);
    grad.addColorStop(0, 'rgba(0,0,0,1)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(s.px, s.py - 2, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Flicker overlay
    if (s.flickerT > 0) {
      ctx.fillStyle = 'rgba(255,255,255,0.015)';
      ctx.fillRect(0, 0, W, H);
    }

    // Instructions
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillStyle = PAL.fg;
    ctx.font = '7px monospace';
    if (s.introT > 0) {
      ctx.fillText('FIND SAMMY... IF YOU DARE', 128, 4);
      ctx.fillText('ARROWS/WASD OR SWIPE', 128, 14);
    }
  });

  return (
    <canvas
      ref={canvasRef}
      width={256} height={240}
      style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }}
    />
  );
}
