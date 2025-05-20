
import React, { useEffect, useRef } from 'react';

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  originalEndX: number;
  originalEndY: number;
  width: number;
  speed: number;
  progress: number;
  color: string;
}

const ReferencesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const linesRef = useRef<Line[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- START OF ADJUSTABLE PARAMETERS ---
    const MAX_LINES = 45;
    const INITIAL_LINE_COUNT = 22;
    const LINE_MIN_WIDTH = 1;
    const LINE_MAX_WIDTH = 3;
    const LINE_MIN_DRAW_SPEED = 0.001; // Reduced from 0.002
    const LINE_MAX_DRAW_SPEED = 0.003; // Reduced from 0.006
    const LINE_MIN_LENGTH = 50;
    const LINE_MAX_LENGTH = 200;

    const MOUSE_INTERACTION_RADIUS = 200; // Reduced from 300
    const MOUSE_BEND_BASE_FORCE = 0.095;  // Reduced from 0.12
    const MOUSE_BEND_SCALAR = 0.075;      // Reduced from 0.1
    const ENABLE_BEND_REVERSION = true;
    const BEND_REVERSION_LERP_FACTOR = 0.03; // Reduced from 0.05

    // Reduced for less frequent line additions
    const ADD_LINE_ON_MOUSE_PROBABILITY = 0.008; // Reduced from 0.015
    
    const TRAIL_EFFECT_ALPHA = 0.1; // Increased for smoother trails
    const BACKGROUND_COLOR_FOR_TRAIL = `rgba(26, 31, 44, ${TRAIL_EFFECT_ALPHA})`;
    const GLOW_OPACITY = 0.4;
    // --- END OF ADJUSTABLE PARAMETERS ---
    
    const addLine = (startX?: number, startY?: number, fromMouse = false) => {
      if (linesRef.current.length >= MAX_LINES && !fromMouse) return;
      if (linesRef.current.length >= MAX_LINES + 5 && fromMouse) return;

      const sX = startX ?? Math.random() * canvas.width;
      const sY = startY ?? Math.random() * canvas.height;

      const angle = Math.random() * Math.PI * 2;
      const distance = LINE_MIN_LENGTH + Math.random() * (LINE_MAX_LENGTH - LINE_MIN_LENGTH);
      const eX = sX + Math.cos(angle) * distance;
      const eY = sY + Math.sin(angle) * distance;

      const width = LINE_MIN_WIDTH + Math.random() * (LINE_MAX_WIDTH - LINE_MIN_WIDTH);
      const speed = LINE_MIN_DRAW_SPEED + Math.random() * (LINE_MAX_DRAW_SPEED - LINE_MIN_DRAW_SPEED);

      const hue = 170 + Math.random() * 30;
      const saturation = 70 + Math.random() * 20;
      const lightness = 50 + Math.random() * 30;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      linesRef.current.push({
        startX: sX, startY: sY,
        endX: eX, endY: eY,
        originalEndX: eX, originalEndY: eY,
        width, speed,
        progress: 0, color
      });
    };

    const initLines = () => {
      linesRef.current = [];
      for (let i = 0; i < INITIAL_LINE_COUNT; i++) {
        addLine();
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines();
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if(!firstMoveMadeRef.current) firstMoveMadeRef.current = true;

      if (Math.random() < ADD_LINE_ON_MOUSE_PROBABILITY) {
        addLine(e.clientX, e.clientY, true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.fillStyle = BACKGROUND_COLOR_FOR_TRAIL;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = linesRef.current.length - 1; i >= 0; i--) {
        const line = linesRef.current[i];
        line.progress += line.speed;

        if (line.progress >= 1) {
          linesRef.current.splice(i, 1);
          if (linesRef.current.length < MAX_LINES * 0.8) {
             addLine();
          }
          continue;
        }

        const currentProgressEndX = line.startX + (line.endX - line.startX) * line.progress;
        const currentProgressEndY = line.startY + (line.endY - line.startY) * line.progress;
        
        // Mouse interaction: bend line endpoint
        let interactedThisFrame = false;
        if (firstMoveMadeRef.current) {
          const midX = (line.startX + currentProgressEndX) / 2;
          const midY = (line.startY + currentProgressEndY) / 2;
          const dxMouse = midX - mousePositionRef.current.x;
          const dyMouse = midY - mousePositionRef.current.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < MOUSE_INTERACTION_RADIUS && distanceMouse > 0) {
            interactedThisFrame = true;
            const proximityFactor = (1 - distanceMouse / MOUSE_INTERACTION_RADIUS);
            const force = MOUSE_BEND_BASE_FORCE * proximityFactor;
            
            // Bend away from mouse: influence original endX/endY so progress calc is correct
            line.endX += (dxMouse / distanceMouse) * force * MOUSE_BEND_SCALAR * (line.endX - line.startX);
            line.endY += (dyMouse / distanceMouse) * force * MOUSE_BEND_SCALAR * (line.endY - line.startY);
          }
        }
        
        if (!interactedThisFrame && ENABLE_BEND_REVERSION) {
            line.endX += (line.originalEndX - line.endX) * BEND_REVERSION_LERP_FACTOR;
            line.endY += (line.originalEndY - line.endY) * BEND_REVERSION_LERP_FACTOR;
        }


        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(currentProgressEndX, currentProgressEndY);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(currentProgressEndX, currentProgressEndY);
        ctx.strokeStyle = line.color.replace('hsl', 'hsla').replace(')', `, ${GLOW_OPACITY})`);
        ctx.lineWidth = line.width * 3;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(currentProgressEndX, currentProgressEndY, line.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = line.color;
        ctx.fill();
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
export default ReferencesBackground;
