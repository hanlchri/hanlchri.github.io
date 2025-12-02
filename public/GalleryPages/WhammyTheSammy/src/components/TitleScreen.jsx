import React, { useEffect, useRef, useState } from 'react';
import { useGameLoop } from '../hooks/useGameLoop';

export default function TitleScreen({ onStart, onStartEndless }) {
    const canvasRef = useRef(null);
    const [glitch, setGlitch] = useState(0);
    const [selectedMode, setSelectedMode] = useState(0); // 0: Story, 1: Endless

    useGameLoop((dt, time) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        // Draw Background (Atari-ish checkerboard)
        for (let y = 0; y < h; y += 16) {
            for (let x = 0; x < w; x += 16) {
                const c = ((x >> 4) + (y >> 4)) % 2 ? '#1bffba' : '#0c7b5b';
                ctx.fillStyle = c;
                ctx.fillRect(x, y, 16, 16);
            }
        }

        // Glitch effect
        if (Math.random() < 0.02) {
            setGlitch(Math.random());
        } else {
            setGlitch(g => Math.max(0, g - dt * 2));
        }

        if (glitch > 0.5) {
            ctx.fillStyle = `rgba(0,0,0,${glitch})`;
            ctx.fillRect(0, 0, w, h);
            // Hidden horror text
            if (Math.random() < 0.3) {
                ctx.fillStyle = '#ff004d';
                ctx.font = '10px monospace';
                ctx.fillText('HE IS WATCHING', Math.random() * w, Math.random() * h);
            }
        }

        // Title Text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Shadow
        ctx.fillStyle = '#000';
        ctx.font = '20px monospace';
        ctx.fillText('WHAMMY', w / 2 + 2, 60 + 2);
        ctx.fillText('THE SAMMY', w / 2 + 2, 85 + 2);

        // Main Text
        ctx.fillStyle = '#fff';
        ctx.fillText('WHAMMY', w / 2, 60);
        ctx.fillText('THE SAMMY', w / 2, 85);

        // Subtitle
        ctx.font = '8px monospace';
        ctx.fillStyle = '#000';
        ctx.fillText('AN HONEST FAMILY GAME', w / 2, 110);

        // Menu
        const blink = Math.sin(time / 200) > 0;

        ctx.fillStyle = selectedMode === 0 ? (blink ? '#ffec27' : '#fff') : '#555';
        ctx.fillText('> STORY MODE <', w / 2, 150);

        ctx.fillStyle = selectedMode === 1 ? (blink ? '#ffec27' : '#fff') : '#555';
        ctx.fillText('> ENDLESS MODE <', w / 2, 170);

        // Instructions
        ctx.fillStyle = '#000';
        ctx.fillText('UP/DOWN to Select', w / 2, 210);
        ctx.fillText('SPACE/ENTER to Start', w / 2, 225);

    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                setSelectedMode(prev => (prev === 0 ? 1 : 0));
            }
            if (e.key === ' ' || e.key === 'Enter') {
                if (selectedMode === 0) onStart();
                else onStartEndless();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedMode, onStart, onStartEndless]);

    return (
        <canvas
            ref={canvasRef}
            width={256}
            height={240}
            style={{ width: '100%', height: '100%', objectFit: 'contain', imageRendering: 'pixelated' }}
        />
    );
}
