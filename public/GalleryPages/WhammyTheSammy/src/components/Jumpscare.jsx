import React, { useRef, useEffect } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';
import { useAudio } from '../hooks/useAudio';

export default function Jumpscare({ onTransition }) {
    const canvasRef = useRef(null);
    const { noiseBurst } = useAudio();
    const timeRef = useRef(0);

    useEffect(() => {
        noiseBurst(0.6, 0.2);
    }, [noiseBurst]);

    useGameLoop((dt) => {
        timeRef.current += dt;
        const t = timeRef.current;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        if (t > 0.7) {
            onTransition();
            return;
        }

        const s = 2.5 + t * 6;
        const cx = 128, cy = 120;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 3; i++) {
            const ox = Math.sin((t + i) * 9) * 4 * (i + 1);
            const oy = Math.cos((t + i) * 7) * 4 * (i + 1);
            ctx.save();
            ctx.translate(cx + ox, cy + oy);
            ctx.scale(s, s);

            // Mole Face
            const mx = 0, my = -10;
            ctx.fillStyle = '#83769c';
            ctx.fillRect(mx - 8, my - 10, 16, 10);
            ctx.fillRect(mx - 10, my - 6, 20, 6);
            ctx.fillStyle = '#ff004d';
            ctx.fillRect(mx - 5, my - 7, 3, 3);
            ctx.fillRect(mx + 2, my - 7, 3, 3);
            ctx.fillStyle = '#e0e0e0';
            ctx.fillRect(mx - 3, my - 1, 2, 2);
            ctx.fillRect(mx + 1, my - 1, 2, 2);

            ctx.restore();
        }

        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });

    return (
        <canvas ref={canvasRef} width={256} height={240} style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }} />
    );
}
