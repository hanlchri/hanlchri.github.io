import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';

const T = 32;
const ROWS = 15, COLS = 19;
const W = COLS * T, H = ROWS * T;

const DIRT = 0, TUNNEL = 1, SKY = 2;

const ENEMIES = {
  MONGOOSE: { color: '#8b4513', speed: 1.0, score: 100, name: 'MANGOOSE' },
  SNAKE:    { color: '#228b22', speed: 1.4, score: 200, name: 'SNAKE' },
  WALKER:   { color: '#ffe0bd', speed: 0.7, score: 50,  name: 'WALKER' },
  GOVERNOR: { color: '#000080', speed: 0.5, score: 0,   name: 'GOVERNOR' },
  DRAGON:   { color: '#cc0000', speed: 1.1, score: 0,   name: 'DRAGON' }
};

const GLITCH_TEXTS = [
  'WHERE DID THEY GO', 'THEY WERE NEVER REAL', 'LOOK CLOSER',
  'DO YOU HEAR IT', 'THE GROUND IS WATCHING', 'KEEP DIGGING',
  'SOMETHING IS WRONG', 'DON\'T STOP'
];

export default function Game({ onQuit }) {
  const canvasRef = useRef(null);
  const audio = useAudio();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const gameOverRef = useRef(false);

  const state = useRef({
    grid: [], player: { x: 9 * T, y: 7 * T, dir: 'R' },
    enemies: [], harpoon: null, pumpT: 0, lastTime: 0,
    // Unsettling state
    killCount: 0, totalEnemies: 6, dread: 0,
    skyHue: 200, skySat: 70, skyLight: 75,
    dirtHue: 30, dirtSat: 55, dirtLight: 55,
    glitchText: '', glitchT: 0, glitchX: 0, glitchY: 0,
    scoreGlitch: 0, scoreGlitchVal: 0,
    tunnelEyes: [], endingT: -1, endingPhase: 0,
    musicStarted: false, digT: 0
  });

  const keys = useRef({});

  const resetGame = useCallback(() => {
    const g = [];
    for (let y = 0; y < ROWS; y++) {
      const row = [];
      for (let x = 0; x < COLS; x++) row.push(y < 2 ? SKY : DIRT);
      g.push(row);
    }
    // Starting tunnels
    [[7,9],[7,8],[7,10],[6,9],[8,9]].forEach(([y,x]) => g[y][x] = TUNNEL);

    const enemies = [
      { type: 'MONGOOSE', x: 2*T, y: 3*T, dir: 'R', hp: 3, inflate: 0 },
      { type: 'MONGOOSE', x: 16*T, y: 12*T, dir: 'L', hp: 3, inflate: 0 },
      { type: 'SNAKE', x: 2*T, y: 12*T, dir: 'R', hp: 2, inflate: 0 },
      { type: 'WALKER', x: 16*T, y: 3*T, dir: 'L', hp: 3, inflate: 0 },
      { type: 'GOVERNOR', x: 9*T, y: 13*T, dir: 'L', hp: 999, inflate: 0 },
      { type: 'DRAGON', x: 9*T, y: 3*T, dir: 'R', hp: 999, inflate: 0 }
    ];
    enemies.forEach(e => {
      const gx = Math.floor(e.x / T), gy = Math.floor(e.y / T);
      if (g[gy]) g[gy][gx] = TUNNEL;
    });

    const s = state.current;
    s.grid = g; s.player = { x: 9*T, y: 7*T, dir: 'R' };
    s.enemies = enemies; s.harpoon = null; s.pumpT = 0;
    s.killCount = 0; s.totalEnemies = 6; s.dread = 0;
    s.skyHue = 200; s.skySat = 70; s.skyLight = 75;
    s.dirtHue = 30; s.dirtSat = 55; s.dirtLight = 55;
    s.glitchT = 0; s.scoreGlitch = 0; s.tunnelEyes = [];
    s.endingT = -1; s.endingPhase = 0; s.musicStarted = false; s.digT = 0;
    setScore(0); setGameOver(false); setMessage('');
    gameOverRef.current = false;
  }, []);

  useEffect(() => {
    resetGame();
    const onDown = (e) => keys.current[e.key] = true;
    const onUp = (e) => keys.current[e.key] = false;
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);

    let rafId;
    const loop = (time) => {
      const dt = Math.min(0.05, (time - state.current.lastTime) / 1000);
      state.current.lastTime = time;
      update(dt, time);
      draw(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      cancelAnimationFrame(rafId);
      audio.stopMusic();
    };
  }, []);

  // Touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let touchStart = null;

    const onTS = (e) => {
      e.preventDefault();
      const t = e.changedTouches[0];
      const rect = canvas.getBoundingClientRect();
      touchStart = { x: t.clientX - rect.left, y: t.clientY - rect.top };
    };

    const onTM = (e) => {
      e.preventDefault();
      if (!touchStart) return;
      const t = e.changedTouches[0];
      const rect = canvas.getBoundingClientRect();
      const dx = (t.clientX - rect.left) - touchStart.x;
      const dy = (t.clientY - rect.top) - touchStart.y;
      keys.current = {};
      if (Math.hypot(dx, dy) > 10) {
        if (Math.abs(dx) > Math.abs(dy)) keys.current[dx > 0 ? 'ArrowRight' : 'ArrowLeft'] = true;
        else keys.current[dy > 0 ? 'ArrowDown' : 'ArrowUp'] = true;
      }
    };

    const onTE = () => { touchStart = null; keys.current = {}; };

    // Double tap for pump
    let lastTap = 0;
    const onTap = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastTap < 300) keys.current[' '] = true;
      else setTimeout(() => { keys.current[' '] = false; }, 200);
      lastTap = now;
    };

    canvas.addEventListener('touchstart', onTS, { passive: false });
    canvas.addEventListener('touchmove', onTM, { passive: false });
    canvas.addEventListener('touchend', onTE);
    canvas.addEventListener('click', onTap);
    return () => {
      canvas.removeEventListener('touchstart', onTS);
      canvas.removeEventListener('touchmove', onTM);
      canvas.removeEventListener('touchend', onTE);
      canvas.removeEventListener('click', onTap);
    };
  }, []);

  const killEnemy = (e) => {
    const s = state.current;
    s.enemies = s.enemies.filter(en => en !== e);
    const pts = ENEMIES[e.type]?.score || 0;
    setScore(prev => prev + pts);
    s.killCount++;
    audio.pop();

    // Each kill increases dread
    s.dread = s.killCount / s.totalEnemies;

    // Shift world colors
    s.skyHue = 200 - s.dread * 180;   // blue → reddish
    s.skySat = 70 - s.dread * 30;
    s.skyLight = 75 - s.dread * 35;
    s.dirtHue = 30 - s.dread * 20;
    s.dirtSat = 55 - s.dread * 20;
    s.dirtLight = 55 - s.dread * 25;

    // Increase music detune
    audio.setDetune(s.dread * 40);

    // Trigger a brief glitch
    if (s.killCount > 1) {
      s.glitchText = GLITCH_TEXTS[Math.floor(Math.random() * GLITCH_TEXTS.length)];
      s.glitchT = 0.15 + s.dread * 0.2;
      s.glitchX = Math.random() * W;
      s.glitchY = Math.random() * H;
    }

    // All enemies dead → trigger ending
    if (s.enemies.length === 0) {
      s.endingT = 0;
      audio.stopMusic();
    }
  };

  const update = (dt, time) => {
    if (gameOverRef.current) return;
    const s = state.current;
    const p = s.player;

    // Start music on first input
    if (!s.musicStarted && Object.values(keys.current).some(v => v)) {
      s.musicStarted = true;
      audio.startMusic();
    }

    // Ending sequence
    if (s.endingT >= 0) {
      s.endingT += dt;
      if (s.endingT > 6) { resetGame(); }
      return;
    }

    // Timers
    if (s.glitchT > 0) s.glitchT -= dt;
    if (s.scoreGlitch > 0) s.scoreGlitch -= dt;

    // Random score glitch
    if (Math.random() < 0.001 * (1 + s.dread * 5)) {
      s.scoreGlitch = 0.08;
      s.scoreGlitchVal = Math.floor(Math.random() * 9999);
    }

    // Random tunnel eyes
    if (Math.random() < 0.002 * (1 + s.dread * 8)) {
      const tunnels = [];
      for (let y = 2; y < ROWS; y++)
        for (let x = 0; x < COLS; x++)
          if (s.grid[y][x] === TUNNEL) tunnels.push({ x: x * T + T/2, y: y * T + T/2 });
      if (tunnels.length > 0) {
        const t = tunnels[Math.floor(Math.random() * tunnels.length)];
        s.tunnelEyes.push({ x: t.x, y: t.y, life: 0.3 + Math.random() * 0.5 });
      }
    }
    s.tunnelEyes = s.tunnelEyes.filter(e => { e.life -= dt; return e.life > 0; });

    // Movement
    const speed = 100;
    let dx = 0, dy = 0;
    if (keys.current['ArrowLeft']) { dx = -1; p.dir = 'L'; }
    else if (keys.current['ArrowRight']) { dx = 1; p.dir = 'R'; }
    else if (keys.current['ArrowUp']) { dy = -1; p.dir = 'U'; }
    else if (keys.current['ArrowDown']) { dy = 1; p.dir = 'D'; }

    // Pump
    if (keys.current[' ']) {
      if (!s.harpoon) {
        s.harpoon = { x: p.x + T/2, y: p.y + T/2, dir: p.dir, len: 0, target: null };
        audio.beep(600, 0.04, 'triangle', 0.03);
      } else if (s.harpoon.target) {
        s.pumpT += dt;
        if (s.pumpT > 0.18) {
          s.pumpT = 0;
          s.harpoon.target.inflate += 1;
          audio.beep(200 + s.harpoon.target.inflate * 80, 0.05, 'square', 0.03);
          if (s.harpoon.target.inflate >= 4) {
            const e = s.harpoon.target;
            if (e.type === 'DRAGON') { e.inflate = 0; }
            else { killEnemy(e); }
            s.harpoon = null;
          }
        }
        dx = 0; dy = 0; // Can't move while pumping
      }
    } else {
      if (s.harpoon && !s.harpoon.target) s.harpoon = null;
      s.pumpT = 0;
    }

    // Move player
    if (dx !== 0 || dy !== 0) {
      if (dx !== 0) p.y = Math.round(p.y / T) * T;
      if (dy !== 0) p.x = Math.round(p.x / T) * T;
      const nx = p.x + dx * speed * dt;
      const ny = p.y + dy * speed * dt;
      if (nx >= 0 && nx <= W - T && ny >= 0 && ny <= H - T) {
        p.x = nx; p.y = ny;
        const gx = Math.floor((p.x + T/2) / T);
        const gy = Math.floor((p.y + T/2) / T);
        if (s.grid[gy] && s.grid[gy][gx] === DIRT) {
          s.grid[gy][gx] = TUNNEL;
          s.digT += dt;
          if (s.digT > 0.15) { audio.dig(); s.digT = 0; }
        }
      }
    }

    // Update harpoon
    if (s.harpoon && !s.harpoon.target) {
      s.harpoon.len += 350 * dt;
      if (s.harpoon.len > T * 3) { s.harpoon = null; }
      else {
        const hx = s.harpoon.x + (s.harpoon.dir === 'R' ? s.harpoon.len : s.harpoon.dir === 'L' ? -s.harpoon.len : 0);
        const hy = s.harpoon.y + (s.harpoon.dir === 'D' ? s.harpoon.len : s.harpoon.dir === 'U' ? -s.harpoon.len : 0);
        const hit = s.enemies.find(e => hx > e.x && hx < e.x + T && hy > e.y && hy < e.y + T);
        if (hit) s.harpoon.target = hit;
      }
    }

    // Update enemies
    s.enemies.forEach(e => {
      if (e.inflate > 0 && (!s.harpoon || s.harpoon.target !== e)) {
        e.inflate -= dt * 1.5;
        if (e.inflate < 0) e.inflate = 0;
      }
      if (e.inflate > 0) return;

      const dist = Math.hypot(p.x - e.x, p.y - e.y);
      const info = ENEMIES[e.type];

      // Governor proximity = game over
      if (e.type === 'GOVERNOR' && dist < T * 3.5) {
        gameOverRef.current = true;
        setGameOver(true);
        setMessage('THE GOVERNOR SAW YOU');
        audio.stopMusic();
        audio.noiseBurst(0.2, 0.08);
        return;
      }

      // Movement AI
      let moveDir = e.dir;
      if (dist < T * 5 && e.type !== 'WALKER') {
        moveDir = Math.abs(p.x - e.x) > Math.abs(p.y - e.y) ? (p.x > e.x ? 'R' : 'L') : (p.y > e.y ? 'D' : 'U');
      } else if (Math.random() < 0.025) {
        moveDir = ['L','R','U','D'][Math.floor(Math.random() * 4)];
      }

      let ex = 0, ey = 0;
      if (moveDir === 'L') ex = -1; if (moveDir === 'R') ex = 1;
      if (moveDir === 'U') ey = -1; if (moveDir === 'D') ey = 1;

      const spd = info.speed * 45;
      const nex = e.x + ex * spd * dt;
      const ney = e.y + ey * spd * dt;
      const cx = nex + T/2, cy = ney + T/2;
      const gx = Math.floor(cx / T), gy = Math.floor(cy / T);
      if (s.grid[gy] && s.grid[gy][gx] === TUNNEL) {
        e.x = nex; e.y = ney; e.dir = moveDir;
      }

      // Touch = death
      if (dist < T * 0.7) {
        gameOverRef.current = true;
        setGameOver(true);
        setMessage('CAUGHT BY ' + (info.name || e.type));
        audio.stopMusic();
        audio.noiseBurst(0.2, 0.08);
      }
    });
  };

  const draw = (time) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const s = state.current;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // Ending sequence
    if (s.endingT >= 0) {
      drawEnding(ctx, s, time);
      return;
    }

    const skyColor = `hsl(${s.skyHue}, ${s.skySat}%, ${s.skyLight}%)`;
    const dirtColor = `hsl(${s.dirtHue}, ${s.dirtSat}%, ${s.dirtLight}%)`;
    const dirtDark = `hsl(${s.dirtHue}, ${s.dirtSat}%, ${s.dirtLight - 8}%)`;

    // Grid
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        const t = s.grid[y][x];
        if (t === DIRT) {
          ctx.fillStyle = dirtColor;
          ctx.fillRect(x*T, y*T, T, T);
          if (y > 3) { ctx.fillStyle = dirtDark; ctx.fillRect(x*T, y*T, T, 3); }
        } else if (t === SKY) {
          ctx.fillStyle = skyColor;
          ctx.fillRect(x*T, y*T, T, T);
        } else {
          ctx.fillStyle = '#111';
          ctx.fillRect(x*T, y*T, T, T);
        }
      }
    }

    // Tunnel eyes (unsettling)
    s.tunnelEyes.forEach(e => {
      const a = Math.min(1, e.life * 3);
      ctx.fillStyle = `rgba(255,80,80,${a * 0.5})`;
      ctx.fillRect(e.x - 4, e.y - 2, 3, 3);
      ctx.fillRect(e.x + 1, e.y - 2, 3, 3);
    });

    // Player
    const p = s.player;
    ctx.fillStyle = '#fff';
    ctx.fillRect(p.x + 4, p.y + 2, 24, 28);
    ctx.fillRect(p.x + 8, p.y - 2, 16, 6);
    // Face
    ctx.fillStyle = '#000';
    if (p.dir === 'R') { ctx.fillRect(p.x + 20, p.y + 8, 5, 5); ctx.fillRect(p.x + 20, p.y + 18, 6, 3); }
    else if (p.dir === 'L') { ctx.fillRect(p.x + 7, p.y + 8, 5, 5); ctx.fillRect(p.x + 6, p.y + 18, 6, 3); }
    else { ctx.fillRect(p.x + 10, p.y + 8, 4, 4); ctx.fillRect(p.x + 18, p.y + 8, 4, 4); }

    // Harpoon
    if (s.harpoon) {
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(s.harpoon.x, s.harpoon.y);
      const hx = s.harpoon.x + (s.harpoon.dir === 'R' ? s.harpoon.len : s.harpoon.dir === 'L' ? -s.harpoon.len : 0);
      const hy = s.harpoon.y + (s.harpoon.dir === 'D' ? s.harpoon.len : s.harpoon.dir === 'U' ? -s.harpoon.len : 0);
      ctx.lineTo(hx, hy);
      ctx.stroke();
    }

    // Enemies
    s.enemies.forEach(e => {
      const info = ENEMIES[e.type];
      const size = 24 + e.inflate * 10;
      const off = (size - 24) / 2;
      const ex = e.x + 4 - off, ey = e.y + 4 - off;

      // Body
      ctx.fillStyle = info.color;
      ctx.fillRect(ex, ey, size, size);
      // Darker top
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fillRect(ex, ey, size, size * 0.3);

      // Eyes
      const eyeOff = size * 0.15;
      ctx.fillStyle = '#fff';
      ctx.fillRect(ex + eyeOff, ey + size * 0.2, size * 0.25, size * 0.25);
      ctx.fillRect(ex + size * 0.55, ey + size * 0.2, size * 0.25, size * 0.25);
      ctx.fillStyle = '#000';
      ctx.fillRect(ex + eyeOff + 2, ey + size * 0.25, size * 0.12, size * 0.15);
      ctx.fillRect(ex + size * 0.58, ey + size * 0.25, size * 0.12, size * 0.15);

      // Inflate indicator
      if (e.inflate > 0) {
        ctx.fillStyle = `rgba(255,100,100,${e.inflate * 0.15})`;
        ctx.fillRect(ex - 2, ey - 2, size + 4, size + 4);
      }

      // Type label for governor/dragon
      if (e.type === 'GOVERNOR') {
        ctx.fillStyle = '#fff'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
        ctx.fillText('GOV', e.x + T/2, e.y - 4);
      }
      if (e.type === 'DRAGON') {
        ctx.fillStyle = '#ff4444'; ctx.font = '8px monospace'; ctx.textAlign = 'center';
        ctx.fillText('!!!', e.x + T/2, e.y - 4);
      }
    });

    // HUD
    ctx.textAlign = 'left';
    ctx.font = '16px monospace';
    const displayScore = s.scoreGlitch > 0 ? s.scoreGlitchVal : score;
    ctx.fillStyle = s.scoreGlitch > 0 ? '#ff0000' : '#fff';
    ctx.fillText('SCORE: ' + displayScore, 8, H - 8);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#aaa';
    ctx.fillText('ARROWS + SPACE', W - 8, H - 8);

    // Glitch text flash
    if (s.glitchT > 0) {
      ctx.fillStyle = `rgba(255,50,50,${s.glitchT * 3})`;
      ctx.font = '14px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(s.glitchText, s.glitchX, s.glitchY);
    }

    // Random full-frame glitch
    if (s.dread > 0.3 && Math.random() < 0.003 * s.dread) {
      ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,0,0' : '0,0,0'},0.3)`;
      ctx.fillRect(0, 0, W, H);
      audio.noiseBurst(0.02, 0.02);
    }

    // Game over overlay
    if (gameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(message || 'GAME OVER', W/2, H/2 - 10);
      ctx.font = '16px monospace';
      ctx.fillStyle = '#aaa';
      ctx.fillText('Press R to Restart', W/2, H/2 + 30);
      if (keys.current['r'] || keys.current['R']) resetGame();
    }
  };

  const drawEnding = (ctx, s, time) => {
    const t = s.endingT;

    // Phase 1: Screen goes black (0-2s)
    if (t < 2) {
      const a = Math.min(1, t / 0.5);
      ctx.fillStyle = `rgba(0,0,0,${a})`;
      ctx.fillRect(0, 0, W, H);
      // Static noise
      for (let i = 0; i < 10; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
        ctx.fillRect(0, Math.random() * H, W, 1);
      }
    }
    // Phase 2: Unsettling message (2-5s)
    else if (t < 5) {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, W, H);

      const msgT = t - 2;
      const msg1 = 'YOU CAUGHT THEM ALL.';
      const msg2 = 'BUT WERE THEY EVER REALLY THERE?';

      ctx.textAlign = 'center';
      ctx.font = '18px monospace';

      if (msgT > 0.5) {
        const chars1 = Math.min(msg1.length, Math.floor((msgT - 0.5) * 8));
        ctx.fillStyle = '#e0e0e0';
        ctx.fillText(msg1.substring(0, chars1), W/2, H/2 - 30);
      }

      if (msgT > 2.0) {
        const chars2 = Math.min(msg2.length, Math.floor((msgT - 2.0) * 6));
        ctx.fillStyle = '#ff4444';
        ctx.font = '14px monospace';
        ctx.fillText(msg2.substring(0, chars2), W/2, H/2 + 10);
      }

      // Random screen tear
      if (Math.random() < 0.05) {
        const y = Math.random() * H;
        try {
          const d = ctx.getImageData(0, Math.floor(y), W, 2);
          ctx.putImageData(d, Math.floor((Math.random() - 0.5) * 12), Math.floor(y));
        } catch(e) {}
      }

      // Static
      for (let i = 0; i < 5 + msgT * 3; i++) {
        ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`;
        ctx.fillRect(0, Math.random() * H, W, 1);
      }

      // Eyes in the dark
      if (msgT > 1.5 && Math.sin(time * 0.004) > 0.5) {
        for (let i = 0; i < 3; i++) {
          const ex = 100 + i * 200, ey = H/2 + 60 + Math.sin(time * 0.002 + i) * 20;
          ctx.fillStyle = 'rgba(255,0,0,0.2)';
          ctx.fillRect(ex, ey, 3, 3);
          ctx.fillRect(ex + 7, ey, 3, 3);
        }
      }
    }
    // Phase 3: Flash and restart (5-6s)
    else {
      const flashT = t - 5;
      if (flashT < 0.1) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, W, H);
        audio.noiseBurst(0.1, 0.06);
      } else {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
      }
    }
  };

  return (
    <canvas
      ref={canvasRef} width={W} height={H}
      style={{ maxWidth: '100vw', maxHeight: '100vh', objectFit: 'contain', imageRendering: 'pixelated', border: '4px solid #fff', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }}
    />
  );
}
