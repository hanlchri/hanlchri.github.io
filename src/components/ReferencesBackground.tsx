
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
  isDragging: boolean;
  dragOffset: { x: number; y: number };
}

const ReferencesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const linesRef = useRef<Line[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const draggedLineRef = useRef<Line | null>(null);

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
    const LINE_MIN_DRAW_SPEED = 0.001;
    const LINE_MAX_DRAW_SPEED = 0.003;
    const LINE_MIN_LENGTH = 50;
    const LINE_MAX_LENGTH = 200;

    const MOUSE_INTERACTION_RADIUS = 150;
    const MOUSE_BEND_BASE_FORCE = 0.06;
    const MOUSE_BEND_SCALAR = 0.05;
    const ENABLE_BEND_REVERSION = true;
    const BEND_REVERSION_LERP_FACTOR = 0.02;

    const ADD_LINE_ON_MOUSE_PROBABILITY = 0.008;
    
    // Improved trail effect - removed periodic clearing
    const TRAIL_EFFECT_ALPHA = 0.12;
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

      // Green/teal color scheme for References
      const hue = 140 + Math.random() * 40;
      const saturation = 60 + Math.random() * 30;
      const lightness = 45 + Math.random() * 35;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

      linesRef.current.push({
        startX: sX, startY: sY,
        endX: eX, endY: eY,
        originalEndX: eX, originalEndY: eY,
        width, speed,
        progress: 0, color,
        isDragging: false,
        dragOffset: { x: 0, y: 0 }
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

    const getLineAtPosition = (x: number, y: number): Line | null => {
      for (const line of linesRef.current) {
        const currentEndX = line.startX + (line.endX - line.startX) * line.progress;
        const currentEndY = line.startY + (line.endY - line.startY) * line.progress;
        
        const distToStart = Math.sqrt((x - line.startX) ** 2 + (y - line.startY) ** 2);
        const distToEnd = Math.sqrt((x - currentEndX) ** 2 + (y - currentEndY) ** 2);
        
        if (distToStart <= 15 || distToEnd <= 15) {
          return line;
        }
      }
      return null;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const clickedLine = getLineAtPosition(x, y);
      if (clickedLine) {
        draggedLineRef.current = clickedLine;
        clickedLine.isDragging = true;
        clickedLine.dragOffset = {
          x: x - clickedLine.endX,
          y: y - clickedLine.endY
        };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if(!firstMoveMadeRef.current) firstMoveMadeRef.current = true;

      if (draggedLineRef.current) {
        draggedLineRef.current.endX = x - draggedLineRef.current.dragOffset.x;
        draggedLineRef.current.endY = y - draggedLineRef.current.dragOffset.y;
        draggedLineRef.current.originalEndX = draggedLineRef.current.endX;
        draggedLineRef.current.originalEndY = draggedLineRef.current.endY;
      }

      if (Math.random() < ADD_LINE_ON_MOUSE_PROBABILITY) {
        addLine(x, y, true);
      }
    };

    const handleMouseUp = () => {
      if (draggedLineRef.current) {
        draggedLineRef.current.isDragging = false;
        draggedLineRef.current = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Consistent trail effect without periodic clearing
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
        
        let interactedThisFrame = false;
        if (firstMoveMadeRef.current && !line.isDragging) {
          const midX = (line.startX + currentProgressEndX) / 2;
          const midY = (line.startY + currentProgressEndY) / 2;
          const dxMouse = midX - mousePositionRef.current.x;
          const dyMouse = midY - mousePositionRef.current.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < MOUSE_INTERACTION_RADIUS && distanceMouse > 0) {
            interactedThisFrame = true;
            const proximityFactor = (1 - distanceMouse / MOUSE_INTERACTION_RADIUS);
            const force = MOUSE_BEND_BASE_FORCE * proximityFactor;
            
            line.endX += (dxMouse / distanceMouse) * force * MOUSE_BEND_SCALAR * (line.endX - line.startX);
            line.endY += (dyMouse / distanceMouse) * force * MOUSE_BEND_SCALAR * (line.endY - line.startY);
          }
        }
        
        if (!interactedThisFrame && ENABLE_BEND_REVERSION && !line.isDragging) {
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
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'auto', cursor: 'default' }}
    />
  );
};
export default ReferencesBackground;
