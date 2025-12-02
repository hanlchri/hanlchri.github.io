import React, { useEffect, useRef, useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { useAudio } from '../hooks/useAudio';

const PAL = {
    bg: '#000000',
    fg: '#e0e0e0',
    red: '#ff004d',
    green: '#00e436',
    blue: '#29adff',
    yellow: '#ffec27',
    dark: '#1a1a1a',
    gray: '#555555',
    purple: '#83769c'
};

export default function WhackGame({ mode, onGameOver, onTransition }) {
    const canvasRef = useRef(null);
    const { beep, noiseBurst } = useAudio();

    // Game State Refs (mutable for loop)
    const state = useRef({
        time: 0,
        score: 0,
        hearts: 3,
        grid: [],
        mole: null, // {idx, t, alive, sammy, decoy}
        nextPopIn: 1.0,
        tension: 0,
        blackoutT: 0,
        lastClickAt: -999,
        sammyAttack: false,
        sammyT: 0,
        // Endless specific
        difficultyMultiplier: 1.0
    });

    // Init
    useEffect(() => {
        const gw = 3, gh = 3;
        const marginX = 24, marginY = 36;
        const w = 256 - marginX * 2;
        const h = 240 - marginY * 2;
        const grid = [];
        for (let gy = 0; gy < gh; gy++) {
            for (let gx = 0; gx < gw; gx++) {
                const x = marginX + (w / (gw - 1)) * gx;
                const y = marginY + (h / (gh - 1)) * gy;
                grid.push({ x, y });
            }
        }
        state.current.grid = grid;
        state.current.time = 0;
        state.current.score = 0;
        state.current.hearts = 3;
        state.current.mole = null;
        state.current.nextPopIn = 1.0;
        state.current.tension = 0;
        state.current.blackoutT = 0;
        state.current.sammyAttack = false;
        state.current.sammyT = 0;
        state.current.difficultyMultiplier = 1.0;
    }, [mode]);

    // Input handling
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseDown = (e) => {
            const rect = canvas.getBoundingClientRect();
            const sx = canvas.width / rect.width;
            const sy = canvas.height / rect.height;
            const mx = (e.clientX - rect.left) * sx;
            const my = (e.clientY - rect.top) * sy;

            const s = state.current;
            const now = performance.now() / 1000;

            if (s.mole && s.mole.alive && !s.mole.sammy && (now - s.lastClickAt) > 0.22) {
                const hole = s.grid[s.mole.idx];
                const dx = mx - hole.x;
                const dy = my - hole.y;
                if (dx * dx + dy * dy <= 16 * 16) {
                    // Hit
                    if (s.mole.decoy) {
                        beep(180, 0.05, 'triangle', 0.06);
                        noiseBurst(0.12, 0.06);
                        s.tension = Math.min(1, s.tension + 0.08);
                    } else {
                        s.score += 1;
                        beep(880, 0.05);
                        // Ramp up difficulty in endless
                        if (mode === 'endless') {
                            s.difficultyMultiplier += 0.02;
                        }
                    }
                    s.mole.alive = false;
                    s.mole = null;
                    s.nextPopIn = Math.random() * 0.4 + 0.3;
                    s.lastClickAt = now;
                } else {
                    // Miss
                    beep(220, 0.04, 'triangle');
                    s.tension = Math.min(1, s.tension + 0.03);
                    s.lastClickAt = now;
                }
            }
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        return () => canvas.removeEventListener('mousedown', handleMouseDown);
    }, [mode, beep, noiseBurst]);

    useGameLoop((dt, time) => {
        const s = state.current;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Update
        s.time += dt;
        s.tension = Math.max(0, Math.min(1, s.tension + dt * 0.02));
        if (s.blackoutT > 0) s.blackoutT -= dt;

        // Game Over / Transition Logic
        if (s.sammyAttack) {
            s.sammyT += dt;
            if (s.sammyT > 0.6 && s.hearts === 3) { s.hearts = 2; noiseBurst(0.15, 0.08); }
            if (s.sammyT > 1.2 && s.hearts === 2) { s.hearts = 1; noiseBurst(0.15, 0.08); }
            if (s.sammyT > 1.8 && s.hearts === 1) { s.hearts = 0; noiseBurst(0.25, 0.1); }
            if (s.sammyT > 2.2) {
                if (mode === 'story') onTransition();
                else onGameOver(s.score);
            }
        } else {
            // Story Mode: Time limit triggers Sammy
            if (mode === 'story' && s.time >= 28.0) {
                s.sammyAttack = true;
                s.mole = { idx: 4, t: 0, alive: true, sammy: true };
                noiseBurst(0.2, 0.08);
            }
            // Endless Mode: Hearts = 0 triggers Sammy (or just game over)
            // Actually, let's have Sammy appear if you miss too many or just random hazards

            // Mole Spawning
            if (!s.mole) {
                s.nextPopIn -= dt * s.difficultyMultiplier;
                if (s.nextPopIn <= 0) {
                    const idx = Math.floor(Math.random() * s.grid.length);
                    const decoy = Math.random() < 0.15;
                    s.mole = { idx, t: 0, alive: true, sammy: false, decoy };
                }
            } else if (s.mole.alive) {
                s.mole.t += dt * s.difficultyMultiplier;
                const maxTime = (Math.random() * 0.6 + 0.7) / s.difficultyMultiplier;
                if (s.mole.t > maxTime) {
                    s.mole.alive = false;
                    s.mole = null;
                    s.nextPopIn = Math.random() * 0.4 + 0.2;
                    // In endless, missing a mole might hurt? Or just no score.
                    // Let's make it so missing non-decoys increases tension/risk
                }
            }
        }

        // Draw
        // BG
        ctx.fillStyle = PAL.bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Title
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillStyle = PAL.fg;
        ctx.fillText(mode === 'endless' ? 'ENDLESS WHAMMY' : 'WHAMMY THE SAMMY', 128, 6);

        // Holes
        s.grid.forEach(h => {
            ctx.beginPath();
            ctx.arc(h.x, h.y + 4, 12, 0, Math.PI * 2);
            ctx.fillStyle = PAL.dark;
            ctx.fill();
            ctx.strokeStyle = PAL.gray;
            ctx.stroke();
        });

        // Mole
        if (s.mole && s.mole.alive) {
            const h = s.grid[s.mole.idx];
            const t = s.mole.t || 0;
            const rise = Math.min(1, t / 0.2);
            const y = h.y + 8 - rise * 16;

            const isSammy = s.mole.sammy;
            const body = isSammy ? PAL.purple : PAL.green;
            const eye = isSammy ? PAL.red : PAL.blue;

            const shake = isSammy ? Math.sin(time * 0.02) * 1.5 : 0;
            const mx = h.x + shake;

            ctx.fillStyle = body;
            ctx.fillRect(mx - 8, y - 10, 16, 10);
            ctx.fillRect(mx - 10, y - 6, 20, 6);

            ctx.fillStyle = eye;
            ctx.fillRect(mx - 5, y - 7, 3, 3);
            ctx.fillRect(mx + 2, y - 7, 3, 3);

            ctx.fillStyle = PAL.fg;
            ctx.fillRect(mx - 3, y - 1, 2, 2);
            ctx.fillRect(mx + 1, y - 1, 2, 2);
        }

        // HUD
        ctx.textAlign = 'left';
        ctx.fillStyle = PAL.fg;
        ctx.fillText('SCORE ' + s.score, 6, 6);

        // Hearts
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = i < s.hearts ? PAL.red : PAL.gray;
            ctx.fillRect(6 + i * 10, 18, 8, 6);
        }

        // Blackout
        if (s.blackoutT > 0) {
            ctx.fillStyle = `rgba(0,0,0,${Math.min(0.9, s.blackoutT)})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

    });

    return (
        <canvas
            ref={canvasRef}
            width={256}
            height={240}
            style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated', cursor: 'crosshair' }}
        />
    );
}
