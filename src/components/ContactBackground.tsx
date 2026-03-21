
import React, { useEffect, useRef } from 'react';

interface GridNode {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
}

const ContactBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef<GridNode[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const colsRef = useRef(0);
  const rowsRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SPACING = 40;
    const MOUSE_RADIUS = 160;
    const MOUSE_FORCE = 8;
    const SPRING = 0.03;
    const DAMPING = 0.92;
    const LINE_BASE_COLOR = [100, 200, 220]; // teal-ish

    const trailCanvas = document.createElement('canvas');
    const trailCtx = trailCanvas.getContext('2d');

    const initGrid = () => {
      nodesRef.current = [];
      const cols = Math.ceil(canvas.width / SPACING) + 2;
      const rows = Math.ceil(canvas.height / SPACING) + 2;
      colsRef.current = cols;
      rowsRef.current = rows;

      const offsetX = (canvas.width - (cols - 1) * SPACING) / 2;
      const offsetY = (canvas.height - (rows - 1) * SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = offsetX + c * SPACING;
          const y = offsetY + r * SPACING;
          nodesRef.current.push({
            x, y,
            baseX: x, baseY: y,
            vx: 0, vy: 0,
          });
        }
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      trailCanvas.width = canvas.width;
      trailCanvas.height = canvas.height;
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      prevMouseRef.current = { ...mouseRef.current };
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    const getNode = (col: number, row: number): GridNode | null => {
      if (col < 0 || col >= colsRef.current || row < 0 || row >= rowsRef.current) return null;
      return nodesRef.current[row * colsRef.current + col];
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const cols = colsRef.current;
      const rows = rowsRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mvx = mx - prevMouseRef.current.x;
      const mvy = my - prevMouseRef.current.y;

      // Update physics
      for (let i = 0; i < nodesRef.current.length; i++) {
        const node = nodesRef.current[i];

        // Mouse displacement — push nodes away from cursor with velocity influence
        const dx = node.x - mx;
        const dy = node.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const factor = (1 - dist / MOUSE_RADIUS);
          const pushStrength = factor * factor * MOUSE_FORCE;
          // Push in direction away from mouse, biased by mouse velocity
          node.vx += (dx / dist) * pushStrength + mvx * factor * 0.15;
          node.vy += (dy / dist) * pushStrength + mvy * factor * 0.15;
        }

        // Spring back to base position
        const restDx = node.baseX - node.x;
        const restDy = node.baseY - node.y;
        node.vx += restDx * SPRING;
        node.vy += restDy * SPRING;

        // Damping
        node.vx *= DAMPING;
        node.vy *= DAMPING;

        // Integrate
        node.x += node.vx;
        node.y += node.vy;
      }

      // Trail: save, clear, draw faded previous frame
      if (trailCtx) {
        trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
        trailCtx.drawImage(canvas, 0, 0);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (trailCtx) {
        ctx.globalAlpha = 0.82;
        ctx.drawImage(trailCanvas, 0, 0);
        ctx.globalAlpha = 1.0;
      }

      // Draw grid lines
      ctx.lineCap = 'round';

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const node = getNode(c, r)!;

          // Displacement magnitude for color intensity
          const dispX = node.x - node.baseX;
          const dispY = node.y - node.baseY;
          const disp = Math.sqrt(dispX * dispX + dispY * dispY);
          const intensity = Math.min(1, disp / 30);

          // Draw line to right neighbor
          const right = getNode(c + 1, r);
          if (right) {
            const rDisp = Math.sqrt((right.x - right.baseX) ** 2 + (right.y - right.baseY) ** 2);
            const avgIntensity = (intensity + Math.min(1, rDisp / 30)) / 2;
            const alpha = 0.08 + avgIntensity * 0.5;
            const [br, bg, bb] = LINE_BASE_COLOR;
            // Shift toward white/brighter when displaced
            const cr = br + (255 - br) * avgIntensity * 0.6;
            const cg = bg + (255 - bg) * avgIntensity * 0.3;
            const cb = bb + (255 - bb) * avgIntensity * 0.2;

            ctx.strokeStyle = `rgba(${cr | 0}, ${cg | 0}, ${cb | 0}, ${alpha})`;
            ctx.lineWidth = 0.5 + avgIntensity * 1.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(right.x, right.y);
            ctx.stroke();
          }

          // Draw line to bottom neighbor
          const bottom = getNode(c, r + 1);
          if (bottom) {
            const bDisp = Math.sqrt((bottom.x - bottom.baseX) ** 2 + (bottom.y - bottom.baseY) ** 2);
            const avgIntensity = (intensity + Math.min(1, bDisp / 30)) / 2;
            const alpha = 0.08 + avgIntensity * 0.5;
            const [br, bg, bb] = LINE_BASE_COLOR;
            const cr = br + (255 - br) * avgIntensity * 0.6;
            const cg = bg + (255 - bg) * avgIntensity * 0.3;
            const cb = bb + (255 - bb) * avgIntensity * 0.2;

            ctx.strokeStyle = `rgba(${cr | 0}, ${cg | 0}, ${cb | 0}, ${alpha})`;
            ctx.lineWidth = 0.5 + avgIntensity * 1.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(bottom.x, bottom.y);
            ctx.stroke();
          }

          // Draw node dot when displaced
          if (intensity > 0.05) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 1 + intensity * 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(150, 230, 240, ${intensity * 0.6})`;
            ctx.fill();
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
