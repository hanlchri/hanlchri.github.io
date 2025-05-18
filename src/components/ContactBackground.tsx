import React, { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  size: number;
  originalSpeed: number; // Store original speed for reference
  dirX: number;
  dirY: number;
  color: string;
}

const ContactBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const dotsRef = useRef<Dot[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- START OF ADJUSTABLE PARAMETERS ---
    const DOT_COUNT = 80;
    const DOT_MIN_SIZE = 1;
    const DOT_MAX_SIZE = 3;
    const DOT_MIN_BASE_SPEED = 0.1; // Min speed for a dot's individual dirX/dirY components initially
    const DOT_MAX_BASE_SPEED = 0.3; // Max speed
    const DOT_MOVEMENT_MULTIPLIER = 0.5; // General slowdown/speedup for dot movement

    const MOUSE_INTERACTION_RADIUS = 100; // Pixels, how far mouse interaction reaches
    const MOUSE_BASE_FORCE = 0.02; // Base strength of mouse effect before proximity scaling
    const MOUSE_CIRCULAR_FORCE_SCALAR = 0.6; // How strongly dots circle the mouse
    const MOUSE_REPULSION_FORCE_SCALAR = 0.1; // How strongly dots are pushed from mouse
    const MAX_INTERACTION_SPEED_FACTOR = 2.5; // Max factor by which dot speed can increase due to mouse

    const CONNECTION_MAX_DISTANCE = 70; // Max distance for drawing lines between dots
    const CONNECTION_BASE_OPACITY = 0.3; // Base opacity for connections
    const CONNECTION_LINE_WIDTH = 0.5;
    const CONNECTION_COLOR = 'rgba(150, 170, 255, ${opacity})'; // Use ${opacity} placeholder

    const TRAIL_EFFECT_ALPHA = 0.05; // Alpha for clearing canvas, creates trails. 0 (no trail) to 1 (instant clear)
    const BACKGROUND_COLOR_FOR_TRAIL = `rgba(26, 31, 44, ${TRAIL_EFFECT_ALPHA})`;
    // --- END OF ADJUSTABLE PARAMETERS ---

    const initDots = () => {
      dotsRef.current = [];
      for (let i = 0; i < DOT_COUNT; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = DOT_MIN_SIZE + Math.random() * (DOT_MAX_SIZE - DOT_MIN_SIZE);
        
        const speedMagnitude = DOT_MIN_BASE_SPEED + Math.random() * (DOT_MAX_BASE_SPEED - DOT_MIN_BASE_SPEED);
        const angle = Math.random() * Math.PI * 2;
        const dirX = Math.cos(angle) * speedMagnitude;
        const dirY = Math.sin(angle) * speedMagnitude;

        const hue = 200 + Math.random() * 80;
        const saturation = 70 + Math.random() * 20;
        const lightness = 60 + Math.random() * 20;
        const color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.7)`;

        dotsRef.current.push({ x, y, size, originalSpeed: speedMagnitude, dirX, dirY, color });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if (!firstMoveMadeRef.current) {
        firstMoveMadeRef.current = true;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = BACKGROUND_COLOR_FOR_TRAIL;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      dotsRef.current.forEach(dot => {
        dot.x += dot.dirX * DOT_MOVEMENT_MULTIPLIER;
        dot.y += dot.dirY * DOT_MOVEMENT_MULTIPLIER;

        if (dot.x < 0 || dot.x > canvas.width) dot.dirX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dirY *= -1;

        if (firstMoveMadeRef.current) {
          const dxMouse = dot.x - mousePositionRef.current.x;
          const dyMouse = dot.y - mousePositionRef.current.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < MOUSE_INTERACTION_RADIUS) {
            const proximityFactor = (1 - distanceMouse / MOUSE_INTERACTION_RADIUS);
            const force = MOUSE_BASE_FORCE * proximityFactor;
            
            const angleMouse = Math.atan2(dyMouse, dxMouse);
            
            // Circular flow
            const perpAngle = angleMouse + Math.PI / 2;
            dot.dirX += Math.cos(perpAngle) * force * MOUSE_CIRCULAR_FORCE_SCALAR;
            dot.dirY += Math.sin(perpAngle) * force * MOUSE_CIRCULAR_FORCE_SCALAR;

            // Repulsion
            dot.dirX += Math.cos(angleMouse) * force * MOUSE_REPULSION_FORCE_SCALAR;
            dot.dirY += Math.sin(angleMouse) * force * MOUSE_REPULSION_FORCE_SCALAR;

            // Cap speed
            const currentSpeedMag = Math.sqrt(dot.dirX * dot.dirX + dot.dirY * dot.dirY);
            const maxSpeed = dot.originalSpeed * MAX_INTERACTION_SPEED_FACTOR;
            if (currentSpeedMag > maxSpeed) {
              dot.dirX = (dot.dirX / currentSpeedMag) * maxSpeed;
              dot.dirY = (dot.dirY / currentSpeedMag) * maxSpeed;
            }
          }
        }

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = dot.color.replace('0.7', '0.1'); // Glow
        ctx.fill();
      });

      for (let i = 0; i < dotsRef.current.length; i++) {
        for (let j = i + 1; j < dotsRef.current.length; j++) {
          const dotA = dotsRef.current[i];
          const dotB = dotsRef.current[j];
          const dx = dotA.x - dotB.x;
          const dy = dotA.y - dotB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_MAX_DISTANCE) {
            const opacity = CONNECTION_BASE_OPACITY * (1 - distance / CONNECTION_MAX_DISTANCE);
            ctx.beginPath();
            ctx.moveTo(dotA.x, dotA.y);
            ctx.lineTo(dotB.x, dotB.y);
            ctx.strokeStyle = CONNECTION_COLOR.replace('${opacity}', opacity.toFixed(3));
            ctx.lineWidth = CONNECTION_LINE_WIDTH;
            ctx.stroke();
          }
        }
      }
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
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'none' }}
    />
  );
};
export default ContactBackground;
