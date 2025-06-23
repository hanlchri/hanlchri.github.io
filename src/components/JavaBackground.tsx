
import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  isDragging: boolean;
  dragOffset: { x: number; y: number };
}

const JavaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const draggedNodeRef = useRef<Node | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Parameters
    const NODE_COUNT = 35;
    const MIN_SIZE = 3;
    const MAX_SIZE = 8;
    const MOUSE_INTERACTION_RADIUS = 150;
    const MOVEMENT_FORCE = 0.8;
    const DAMPING = 0.98;
    const TRAIL_ALPHA = 0.03;

    const initNodes = () => {
      nodesRef.current = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: MIN_SIZE + Math.random() * (MAX_SIZE - MIN_SIZE),
          color: `hsl(${200 + Math.random() * 40}, 70%, ${50 + Math.random() * 30}%)`,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          isDragging: false,
          dragOffset: { x: 0, y: 0 }
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const getNodeAtPosition = (x: number, y: number): Node | null => {
      for (const node of nodesRef.current) {
        const dx = x - node.x;
        const dy = y - node.y;
        if (Math.sqrt(dx * dx + dy * dy) <= node.size + 5) {
          return node;
        }
      }
      return null;
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const clickedNode = getNodeAtPosition(x, y);
      if (clickedNode) {
        draggedNodeRef.current = clickedNode;
        clickedNode.isDragging = true;
        clickedNode.dragOffset = {
          x: x - clickedNode.x,
          y: y - clickedNode.y
        };
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if (!firstMoveMadeRef.current) {
        firstMoveMadeRef.current = true;
      }

      if (draggedNodeRef.current) {
        draggedNodeRef.current.x = x - draggedNodeRef.current.dragOffset.x;
        draggedNodeRef.current.y = y - draggedNodeRef.current.dragOffset.y;
        draggedNodeRef.current.vx = 0;
        draggedNodeRef.current.vy = 0;
      }
    };

    const handleMouseUp = () => {
      if (draggedNodeRef.current) {
        draggedNodeRef.current.isDragging = false;
        draggedNodeRef.current = null;
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = `rgba(26, 31, 44, ${TRAIL_ALPHA})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodesRef.current.forEach((node) => {
        if (!node.isDragging) {
          if (firstMoveMadeRef.current) {
            const dx = node.x - mousePositionRef.current.x;
            const dy = node.y - mousePositionRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MOUSE_INTERACTION_RADIUS && distance > 0) {
              const force = MOVEMENT_FORCE * (1 - distance / MOUSE_INTERACTION_RADIUS);
              node.vx += (dx / distance) * force;
              node.vy += (dy / distance) * force;
            }
          }

          node.x += node.vx;
          node.y += node.vy;
          node.vx *= DAMPING;
          node.vy *= DAMPING;

          if (node.x <= node.size || node.x >= canvas.width - node.size) {
            node.vx *= -0.8;
            node.x = Math.max(node.size, Math.min(canvas.width - node.size, node.x));
          }
          if (node.y <= node.size || node.y >= canvas.height - node.size) {
            node.vy *= -0.8;
            node.y = Math.max(node.size, Math.min(canvas.height - node.size, node.y));
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        const glowAlpha = Math.min(0.8, node.size / MAX_SIZE);
        ctx.shadowColor = node.color;
        ctx.shadowBlur = node.size * 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

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
      style={{ cursor: 'default' }}
    />
  );
};

export default JavaBackground;
