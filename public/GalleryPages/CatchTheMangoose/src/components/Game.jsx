import React, { useEffect, useRef, useState } from 'react';

// Constants
const TILE_SIZE = 32;
const ROWS = 15;
const COLS = 19;
const WIDTH = COLS * TILE_SIZE;
const HEIGHT = ROWS * TILE_SIZE;

const TYPES = {
    DIRT: 0,
    TUNNEL: 1,
    SKY: 2
};

const ENEMIES = {
    MONGOOSE: { color: '#8b4513', speed: 1.0, score: 100 },
    SNAKE: { color: '#00ff00', speed: 1.5, score: 200 },
    ASIAN_MALE: { color: '#ffe0bd', speed: 0.8, score: 50 }, // Neutral walker
    GOVERNOR: { color: '#000080', speed: 0.6, score: 0 }, // Mitt Romney
    DRAGON: { color: '#ff0000', speed: 1.2, score: 0 } // Invincible
};

export default function Game() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState('');

    // Game State
    const state = useRef({
        grid: [],
        player: { x: 9, y: 7, dir: 'R', pumping: false, pumpT: 0 },
        enemies: [],
        harpoon: null, // { x, y, dir, len, active }
        lastTime: 0
    });

    const keys = useRef({});

    // Init
    useEffect(() => {
        resetGame();

        const handleKeyDown = (e) => keys.current[e.key] = true;
        const handleKeyUp = (e) => keys.current[e.key] = false;
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        let rafId;
        const loop = (time) => {
            const dt = Math.min(0.05, (time - state.current.lastTime) / 1000);
            state.current.lastTime = time;
            update(dt);
            draw();
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            cancelAnimationFrame(rafId);
        };
    }, []);

    const resetGame = () => {
        // Init Grid
        const g = [];
        for (let y = 0; y < ROWS; y++) {
            const row = [];
            for (let x = 0; x < COLS; x++) {
                if (y < 2) row.push(TYPES.SKY);
                else row.push(TYPES.DIRT);
            }
            g.push(row);
        }
        // Initial tunnel
        g[7][9] = TYPES.TUNNEL;
        g[7][8] = TYPES.TUNNEL;
        g[7][10] = TYPES.TUNNEL;
        g[6][9] = TYPES.TUNNEL;
        g[8][9] = TYPES.TUNNEL;

        state.current.grid = g;
        state.current.player = { x: 9 * TILE_SIZE, y: 7 * TILE_SIZE, dir: 'R', pumping: false, pumpT: 0 };
        state.current.harpoon = null;

        // Spawn Enemies
        state.current.enemies = [
            { type: 'MONGOOSE', x: 2 * TILE_SIZE, y: 3 * TILE_SIZE, dir: 'R', hp: 3, inflate: 0 },
            { type: 'MONGOOSE', x: 16 * TILE_SIZE, y: 12 * TILE_SIZE, dir: 'L', hp: 3, inflate: 0 },
            { type: 'SNAKE', x: 2 * TILE_SIZE, y: 12 * TILE_SIZE, dir: 'R', hp: 2, inflate: 0 },
            { type: 'ASIAN_MALE', x: 16 * TILE_SIZE, y: 3 * TILE_SIZE, dir: 'L', hp: 3, inflate: 0 },
            { type: 'GOVERNOR', x: 9 * TILE_SIZE, y: 13 * TILE_SIZE, dir: 'L', hp: 999, inflate: 0 },
            { type: 'DRAGON', x: 9 * TILE_SIZE, y: 3 * TILE_SIZE, dir: 'R', hp: 999, inflate: 0 }
        ];

        // Carve out caves for enemies
        state.current.enemies.forEach(e => {
            const gx = Math.floor(e.x / TILE_SIZE);
            const gy = Math.floor(e.y / TILE_SIZE);
            if (g[gy] && g[gy][gx] !== undefined) g[gy][gx] = TYPES.TUNNEL;
        });

        setScore(0);
        setGameOver(false);
        setMessage('');
    };

    const update = (dt) => {
        if (gameOver) return;

        const s = state.current;
        const p = s.player;

        // Movement
        const speed = 100;
        let dx = 0, dy = 0;
        if (keys.current['ArrowLeft']) { dx = -1; p.dir = 'L'; }
        else if (keys.current['ArrowRight']) { dx = 1; p.dir = 'R'; }
        else if (keys.current['ArrowUp']) { dy = -1; p.dir = 'U'; }
        else if (keys.current['ArrowDown']) { dy = 1; p.dir = 'D'; }

        // Pump / Attack
        if (keys.current[' ']) {
            if (!s.harpoon) {
                s.harpoon = {
                    x: p.x + TILE_SIZE / 2,
                    y: p.y + TILE_SIZE / 2,
                    dir: p.dir,
                    len: 0,
                    active: true,
                    target: null
                };
            } else if (s.harpoon.target) {
                // Pumping
                p.pumping = true;
                p.pumpT += dt;
                if (p.pumpT > 0.15) {
                    p.pumpT = 0;
                    s.harpoon.target.inflate += 1;
                    if (s.harpoon.target.inflate >= 4) {
                        // Pop!
                        const e = s.harpoon.target;
                        if (e.type === 'DRAGON' || e.type === 'GOVERNOR') {
                            // Can't pop these easily? Or maybe just Dragon.
                            if (e.type === 'DRAGON') {
                                e.inflate = 0; // Reset
                            } else {
                                // Governor pops?
                                killEnemy(e);
                            }
                        } else {
                            killEnemy(e);
                        }
                        s.harpoon = null;
                        p.pumping = false;
                    }
                }
            }
        } else {
            p.pumping = false;
            if (s.harpoon && !s.harpoon.target) {
                s.harpoon = null; // Retract if key released and missed
            }
        }

        if (!p.pumping) {
            // Move Player
            if (dx !== 0 || dy !== 0) {
                // Snap to grid axis
                if (dx !== 0) p.y = Math.round(p.y / TILE_SIZE) * TILE_SIZE;
                if (dy !== 0) p.x = Math.round(p.x / TILE_SIZE) * TILE_SIZE;

                const nx = p.x + dx * speed * dt;
                const ny = p.y + dy * speed * dt;

                // Bounds
                if (nx >= 0 && nx <= WIDTH - TILE_SIZE && ny >= 0 && ny <= HEIGHT - TILE_SIZE) {
                    p.x = nx;
                    p.y = ny;

                    // Dig
                    const cx = p.x + TILE_SIZE / 2;
                    const cy = p.y + TILE_SIZE / 2;
                    const gx = Math.floor(cx / TILE_SIZE);
                    const gy = Math.floor(cy / TILE_SIZE);
                    if (s.grid[gy][gx] === TYPES.DIRT) {
                        s.grid[gy][gx] = TYPES.TUNNEL;
                    }
                }
            }
        }

        // Update Harpoon
        if (s.harpoon && !s.harpoon.target) {
            s.harpoon.len += 300 * dt;
            if (s.harpoon.len > TILE_SIZE * 3) s.harpoon = null; // Max reach
            else {
                // Check collision
                const hx = s.harpoon.x + (s.harpoon.dir === 'R' ? s.harpoon.len : s.harpoon.dir === 'L' ? -s.harpoon.len : 0);
                const hy = s.harpoon.y + (s.harpoon.dir === 'D' ? s.harpoon.len : s.harpoon.dir === 'U' ? -s.harpoon.len : 0);

                const hit = s.enemies.find(e =>
                    hx > e.x && hx < e.x + TILE_SIZE &&
                    hy > e.y && hy < e.y + TILE_SIZE
                );
                if (hit) {
                    s.harpoon.target = hit;
                }
            }
        }

        // Update Enemies
        s.enemies.forEach(e => {
            if (e.inflate > 0 && (!s.harpoon || s.harpoon.target !== e)) {
                e.inflate -= dt * 2; // Deflate if not being pumped
                if (e.inflate < 0) e.inflate = 0;
            }
            if (e.inflate > 0) return; // Stunned

            // AI
            const dist = Math.hypot(p.x - e.x, p.y - e.y);
            const type = ENEMIES[e.type];

            // Governor Logic
            if (e.type === 'GOVERNOR') {
                // Line of sight? Or just proximity
                if (dist < TILE_SIZE * 4) {
                    // Calls police
                    setGameOver(true);
                    setMessage('GOVERNOR CALLED THE POLICE! YOU LOSE!');
                }
            }

            // Movement
            // Simple random walk + chase if close
            let moveDir = e.dir;
            if (dist < TILE_SIZE * 5 && e.type !== 'ASIAN_MALE') {
                // Chase
                if (Math.abs(p.x - e.x) > Math.abs(p.y - e.y)) {
                    moveDir = p.x > e.x ? 'R' : 'L';
                } else {
                    moveDir = p.y > e.y ? 'D' : 'U';
                }
            } else if (Math.random() < 0.02) {
                // Random turn
                const dirs = ['L', 'R', 'U', 'D'];
                moveDir = dirs[Math.floor(Math.random() * 4)];
            }

            let ex = 0, ey = 0;
            if (moveDir === 'L') ex = -1;
            if (moveDir === 'R') ex = 1;
            if (moveDir === 'U') ey = -1;
            if (moveDir === 'D') ey = 1;

            // Can only move in tunnels (except Dragon/Ghost mode?)
            // For now, simple tunnel movement
            const speed = type.speed * 40;
            const nex = e.x + ex * speed * dt;
            const ney = e.y + ey * speed * dt;

            // Check grid
            const cx = nex + TILE_SIZE / 2;
            const cy = ney + TILE_SIZE / 2;
            const gx = Math.floor(cx / TILE_SIZE);
            const gy = Math.floor(cy / TILE_SIZE);

            if (s.grid[gy] && s.grid[gy][gx] === TYPES.TUNNEL) {
                e.x = nex;
                e.y = ney;
                e.dir = moveDir;
            }

            // Collision with player
            if (dist < TILE_SIZE * 0.8) {
                setGameOver(true);
                setMessage('CAUGHT BY ' + e.type);
            }
        });
    };

    const killEnemy = (e) => {
        const s = state.current;
        s.enemies = s.enemies.filter(en => en !== e);
        setScore(prev => prev + (ENEMIES[e.type].score || 0));
        if (s.enemies.length === 0) {
            // Win? Or respawn?
            // Maybe just win level
            setMessage('ALL CLEARED!');
            // setGameOver(true);
        }
    };

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const s = state.current;

        // Clear
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, WIDTH, HEIGHT);

        // Grid
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                const t = s.grid[y][x];
                if (t === TYPES.DIRT) {
                    ctx.fillStyle = '#d9a066';
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    // Layers
                    ctx.fillStyle = 'rgba(0,0,0,0.1)';
                    if (y > 4) ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, 4);
                } else if (t === TYPES.SKY) {
                    ctx.fillStyle = '#87ceeb';
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                } else {
                    // Tunnel
                    ctx.fillStyle = '#000';
                    ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
        }

        // Player
        const p = s.player;
        ctx.fillStyle = '#fff';
        ctx.fillRect(p.x + 4, p.y + 4, 24, 24);
        // Eyes
        ctx.fillStyle = '#000';
        if (p.dir === 'R') ctx.fillRect(p.x + 20, p.y + 8, 4, 4);
        if (p.dir === 'L') ctx.fillRect(p.x + 8, p.y + 8, 4, 4);

        // Harpoon
        if (s.harpoon) {
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 2;
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
            ctx.fillStyle = info.color;

            // Inflate effect
            const size = 24 + e.inflate * 10;
            const offset = (size - 24) / 2;

            ctx.fillRect(e.x + 4 - offset, e.y + 4 - offset, size, size);

            // Label for clarity (temp)
            // ctx.fillStyle = '#fff';
            // ctx.font = '8px monospace';
            // ctx.fillText(e.type[0], e.x + 10, e.y + 16);
        });

        // UI
        if (gameOver) {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0, 0, WIDTH, HEIGHT);
            ctx.fillStyle = '#fff';
            ctx.font = '30px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(message || 'GAME OVER', WIDTH / 2, HEIGHT / 2);
            ctx.font = '16px monospace';
            ctx.fillText('Press R to Restart', WIDTH / 2, HEIGHT / 2 + 40);

            if (keys.current['r'] || keys.current['R']) {
                resetGame();
            }
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                SCORE: {score} | ARROWS to Move | SPACE to Pump
            </div>
            <canvas
                ref={canvasRef}
                width={WIDTH}
                height={HEIGHT}
            />
        </div>
    );
}
