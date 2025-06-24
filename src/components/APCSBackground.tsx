
import React, { useEffect, useRef } from 'react';

interface Hexagon {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const APCSBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hexagonsRef = useRef<Hexagon[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Reduced speed constants
    const MAX_HEXAGONS = 40;
    const HEXAGON_SPEED = 0.2; // Reduced from higher values
    const ROTATION_SPEED = 0.001; // Much slower rotation
    const SPAWN_RATE = 0.008; // Reduced spawn rate

    const createHexagon = (): Hexagon => {
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const x = side === 'left' ? -50 : canvas.width + 50;
      const y = Math.random() * canvas.height;
      
      // Linear momentum - consistent direction with slight variation
      const baseVx = side === 'left' ? HEXAGON_SPEED : -HEXAGON_SPEED;
      const vx = baseVx + (Math.random() - 0.5) * 0.1; // Small variation
      const vy = (Math.random() - 0.5) * 0.1; // Minimal vertical drift
      
      const colors = ['#00ff88', '#88ff00', '#00ffff', '#ff8800', '#ff0088'];
      
      return {
        x,
        y,
        vx,
        vy,
        size: Math.random() * 30 + 15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * ROTATION_SPEED,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        maxLife: 1
      };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawHexagon = (hex: Hexagon) => {
      ctx.save();
      ctx.translate(hex.x, hex.y);
      ctx.rotate(hex.rotation);
      
      ctx.globalAlpha = hex.opacity * hex.life;
      ctx.strokeStyle = hex.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = hex.color;
      ctx.shadowBlur = 8; // Reduced shadow blur for better performance
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = hex.size * Math.cos(angle);
        const y = hex.size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.stroke();
      
      ctx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      // Faster fade for better performance
      ctx.fillStyle = 'rgba(26, 31, 44, 0.05)'; // Increased fade rate
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn new hexagons at reduced rate
      if (Math.random() < SPAWN_RATE && hexagonsRef.current.length < MAX_HEXAGONS) {
        hexagonsRef.current.push(createHexagon());
      }

      // Update and draw hexagons
      hexagonsRef.current = hexagonsRef.current.filter(hex => {
        // Mouse interaction with reduced influence
        const dx = hex.x - mousePositionRef.current.x;
        const dy = hex.y - mousePositionRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          const angle = Math.atan2(dy, dx);
          hex.vx += Math.cos(angle) * force * 0.005; // Reduced mouse influence
          hex.vy += Math.sin(angle) * force * 0.005;
        }

        // Update position with linear momentum
        hex.x += hex.vx;
        hex.y += hex.vy;
        hex.rotation += hex.rotationSpeed;

        // Gradual velocity damping to maintain linear momentum
        hex.vx *= 0.998; // Very gentle damping
        hex.vy *= 0.998;

        // Update life for fading effect
        hex.life *= 0.998; // Slower fade

        // Remove hexagons that are off-screen or too faded
        const isOffScreen = hex.x < -100 || hex.x > canvas.width + 100 || 
                           hex.y < -100 || hex.y > canvas.height + 100;
        const isTooFaded = hex.life < 0.1;
        
        if (!isOffScreen && !isTooFaded) {
          drawHexagon(hex);
          return true;
        }
        return false;
      });

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-60"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default APCSBackground;
