import React, { useEffect, useRef } from 'react';

interface Dot {
  x: number;
  y: number;
  size: number;
  originalSpeed: number;
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
  const trailRef = useRef<ImageData | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- START OF ADJUSTABLE PARAMETERS ---
    const DOT_COUNT = 80;
    const DOT_MIN_SIZE = 1;
    const DOT_MAX_SIZE = 3;
    const DOT_MIN_BASE_SPEED = 0.05;
    const DOT_MAX_BASE_SPEED = 0.15;
    const DOT_MOVEMENT_MULTIPLIER = 0.3;

    const MOUSE_INTERACTION_RADIUS = 120;
    const MOUSE_BASE_FORCE = 0.03;
    const MOUSE_CIRCULAR_FORCE_SCALAR = 0.4;
    const MOUSE_REPULSION_FORCE_SCALAR = 0.075;
    const MAX_INTERACTION_SPEED_FACTOR = 2.0;

    const CONNECTION_MAX_DISTANCE = 70;
    const CONNECTION_BASE_OPACITY = 0.3;
    const CONNECTION_LINE_WIDTH = 0.5;
    const CONNECTION_COLOR = 'rgba(150, 170, 255, ${opacity})';

    // Smoother trail effect - less aggressive clearing
    const TRAIL_EFFECT_ALPHA = 0.03; // Reduced from 0.08 for smoother fade
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
      
      // Apply dissolving trail effect
      if (trailRef.current) {
        ctx.putImageData(trailRef.current, 0, 0);
        ctx.fillStyle = 'rgba(26, 31, 44, 0.08)'; // Increased dissolving rate
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = 'rgba(26, 31, 44, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

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

        // Draw dot with glow
        ctx.globalCompositeOperation = 'screen';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();

        // Softer glow effect with dissolving trail
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = dot.color.replace('0.7', '0.03'); // Reduced for dissolving effect
        ctx.fill();
      });

      // Draw connections with smooth blending
      ctx.globalCompositeOperation = 'screen';
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
      
      // Store current frame for dissolving trail effect
      trailRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
      
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
