import React, { useEffect, useRef } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { useAudio } from '../hooks/useAudio';

const PAL = {
    bg: '#000000',
    fg: '#e0e0e0',
    blue: '#29adff',
    purple: '#83769c',
    dark: '#1a1a1a'
};

export default function WalkScene({ onTransition }) {
    const canvasRef = useRef(null);
    const { startDrone, stopDrone, beep, noiseBurst } = useAudio();

    const state = useRef({
        px: 128, py: 180,
        ox: 0,
        mole: { x: 128, y: 70 },
        drips: [],
        flickerT: 0,
        introRevealT: 2.0,
        revealDist: 56,
        started: false
    });

    const keys = useRef({});

    useEffect(() => {
        // Init mole pos
        let mx, my;
        do {
            mx = Math.random() * 216 + 20;
            my = Math.random() * 84 + 36;
        } while (Math.hypot(mx - 128, my - 180) < 90);
        state.current.mole = { x: mx, y: my };

        startDrone();

        const handleKeyDown = (e) => keys.current[e.key.toLowerCase()] = true;
        const handleKeyUp = (e) => keys.current[e.key.toLowerCase()] = false;
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            stopDrone();
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [startDrone, stopDrone]);

    useGameLoop((dt, time) => {
        const s = state.current;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Update
        if (!s.started) { s.started = true; beep(330, 0.06); }
        if (s.introRevealT > 0) s.introRevealT -= dt;

        let dx = 0, dy = 0;
        if (keys.current['arrowleft'] || keys.current['a']) dx -= 1;
        if (keys.current['arrowright'] || keys.current['d']) dx += 1;
        if (keys.current['arrowup'] || keys.current['w']) dy -= 1;
        if (keys.current['arrowdown'] || keys.current['s']) dy += 1;

        const len = Math.hypot(dx, dy) || 1;
        const speed = 60;
        s.px = Math.max(8, Math.min(canvas.width - 8, s.px + (dx / len) * speed * dt));
        s.py = Math.max(32, Math.min(canvas.height - 8, s.py + (dy / len) * speed * dt));
        s.ox = Math.max(-200, Math.min(200, s.ox + dx * dt * 20));

        if (Math.abs(dx) + Math.abs(dy) > 0 && Math.random() < 0.02) {
            beep(120, 0.02, 'square', 0.02);
        }

        s.flickerT -= dt;
        if (s.flickerT <= 0 && Math.random() < 0.05) {
            s.flickerT = Math.random() * 0.15 + 0.05;
            noiseBurst(0.08, 0.04);
        }

        if (Math.random() < 0.03) {
            s.drips.push({ x: Math.random() * (canvas.width - 24) + 12, y: 26, v: Math.random() * 12 + 12 });
            if (s.drips.length > 40) s.drips.shift();
        }
        s.drips.forEach(d => d.y += d.v * dt);
        s.drips = s.drips.filter(d => d.y < canvas.height - 6);

        const dd = Math.hypot(s.px - s.mole.x, s.py - s.mole.y);
        if (dd < 16) {
            onTransition();
        }

        // Draw
        // Tiles
        for (let y = 0; y < canvas.height; y += 16) {
            for (let x = 0; x < canvas.width; x += 16) {
                const c = ((x >> 4) + (y >> 4)) % 2 ? '#060606' : '#040404';
                ctx.fillStyle = c;
                ctx.fillRect(x, y, 16, 16);
            }
        }

        // Wall
        ctx.fillStyle = PAL.dark;
        ctx.fillRect(0, 24, canvas.width, 2);
        ctx.fillStyle = '#0a0a0a';
        for (let x = 0; x < canvas.width; x += 32) {
            ctx.fillRect(x + Math.sin((x + s.ox) * 0.05) * 2, 26, 4, canvas.height - 30);
        }

        // Drips
        ctx.fillStyle = PAL.purple;
        s.drips.forEach(d => ctx.fillRect(d.x, d.y, 1, 4));

        // Mole (Hidden)
        const t = time / 1000 * 20; // approx
        const shake = Math.sin(t * 0.8) + Math.random() * 0.4;
        if (dd < s.revealDist) {
            const mx = s.mole.x + shake;
            const my = s.mole.y + Math.sin(t);
            // Draw Sammy
            ctx.fillStyle = PAL.purple;
            ctx.fillRect(mx - 8, my - 10, 16, 10);
            ctx.fillRect(mx - 10, my - 6, 20, 6);
            ctx.fillStyle = '#ff004d'; // Red eyes
            ctx.fillRect(mx - 5, my - 7, 3, 3);
            ctx.fillRect(mx + 2, my - 7, 3, 3);
            ctx.fillStyle = PAL.fg;
            ctx.fillRect(mx - 3, my - 1, 2, 2);
            ctx.fillRect(mx + 1, my - 1, 2, 2);
        }

        // Player
        ctx.fillStyle = PAL.blue;
        ctx.fillRect(s.px - 4, s.py - 6, 8, 12);
        ctx.fillRect(s.px - 2, s.py - 8, 4, 2);

        // Light Circle
        ctx.save();
        ctx.globalCompositeOperation = 'source-over';
        const baseAlpha = 0.93;
        const alpha = Math.max(0.4, Math.min(0.93, baseAlpha - (2.0 - Math.max(0, Math.min(2.0, s.introRevealT))) * 0.6));
        ctx.fillStyle = `rgba(0,0,0,${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = 'destination-out';
        const r = 46 + Math.max(0, s.introRevealT) * 30;
        ctx.beginPath();
        ctx.arc(s.px, s.py - 2, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Flicker
        if (s.flickerT > 0) {
            ctx.fillStyle = 'rgba(255,255,255,0.02)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = PAL.fg;
        ctx.fillText('ARROW KEYS/WASD TO MOVE', 128, 4);

    });

    return (
        <canvas ref={canvasRef} width={256} height={240} style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }} />
    );
}
