
import React, { useEffect, useRef } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
  connections: number[];
  size: number;
  color: string;
  angleOffset: number;
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

    // --- START OF ADJUSTABLE PARAMETERS ---
    const NODE_COUNT = 35;
    const NODE_MIN_SIZE = 2.5;
    const NODE_MAX_SIZE = 5.5;
    const MIN_CONNECTIONS_PER_NODE = 2;
    const MAX_CONNECTIONS_PER_NODE = 3;

    const ORBIT_RADIUS_SCALE = 0.4;
    const ORBIT_RANDOMNESS = 0.3;

    const NODE_DRIFT_SPEED_FACTOR = 0.002;
    const NODE_DRIFT_AMPLITUDE = 0.1;

    const MOUSE_INTERACTION_RADIUS = 200;
    const MOUSE_REPULSION_FORCE = 0.08;

    const CONNECTION_MAX_DIST_OPACITY_CALC = 350;
    const CONNECTION_OPACITY_MULTIPLIER = 0.6;
    const CONNECTION_LINE_WIDTH = 1;

    const JAVA_SYMBOL_OPACITY = 0.15;
    const JAVA_SYMBOL_SIZE_SCALE = 0.3;

    // Improved trail effect parameters
    const TRAIL_EFFECT_ALPHA = 0.12;
    const BACKGROUND_COLOR_FOR_TRAIL = `rgba(26, 31, 44, ${TRAIL_EFFECT_ALPHA})`;
    // --- END OF ADJUSTABLE PARAMETERS ---

    const initNodes = () => {
      nodesRef.current = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * ORBIT_RADIUS_SCALE;

      for (let i = 0; i < NODE_COUNT; i++) {
        const angle = (i / NODE_COUNT) * Math.PI * 2;
        const r = baseRadius * (1 - ORBIT_RANDOMNESS + Math.random() * ORBIT_RANDOMNESS * 2);
        const x = centerX + Math.cos(angle) * r;
        const y = centerY + Math.sin(angle) * r;
        const size = NODE_MIN_SIZE + Math.random() * (NODE_MAX_SIZE - NODE_MIN_SIZE);

        // Purple-ish Java colors
        const colorValue = 20 + Math.floor(Math.random() * 40);
        const color = `rgb(${150 + colorValue}, ${100 + colorValue}, ${200 + colorValue})`;

        nodesRef.current.push({
          id: i,
          x, y,
          originalX: x, originalY: y,
          connections: [],
          size, color,
          angleOffset: Math.random() * Math.PI * 2,
          isDragging: false,
          dragOffset: { x: 0, y: 0 }
        });
      }
      
      nodesRef.current.forEach((node, i) => {
        const connections: number[] = [];
        const connectionCount = MIN_CONNECTIONS_PER_NODE + Math.floor(Math.random() * (MAX_CONNECTIONS_PER_NODE));
        for (let j = 0; j < connectionCount; j++) {
            let targetIndex = (i + 1 + Math.floor(Math.random() * (NODE_COUNT / 4)) ) % NODE_COUNT;
            if (targetIndex === i) targetIndex = (i + 1) % NODE_COUNT;
            if (!connections.includes(targetIndex) && !nodesRef.current[targetIndex].connections.includes(i)) {
                 connections.push(targetIndex);
            }
        }
        node.connections = connections;
      });
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
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= node.size + 10) {
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
      if(!firstMoveMadeRef.current) firstMoveMadeRef.current = true;

      if (draggedNodeRef.current) {
        draggedNodeRef.current.x = x - draggedNodeRef.current.dragOffset.x;
        draggedNodeRef.current.y = y - draggedNodeRef.current.dragOffset.y;
        draggedNodeRef.current.originalX = draggedNodeRef.current.x;
        draggedNodeRef.current.originalY = draggedNodeRef.current.y;
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

    const drawJavaSymbol = (symbolCtx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        symbolCtx.save();
        symbolCtx.translate(x, y);
        symbolCtx.globalAlpha = JAVA_SYMBOL_OPACITY;
        symbolCtx.fillStyle = '#9F7AEA';
        symbolCtx.beginPath();
        symbolCtx.moveTo(-size * 0.3, -size * 0.4);
        symbolCtx.bezierCurveTo(-size * 0.35, size * 0.2, size * 0.35, size * 0.2, size * 0.3, -size * 0.4);
        symbolCtx.lineTo(size * 0.2, -size * 0.5);
        symbolCtx.lineTo(-size * 0.2, -size * 0.5);
        symbolCtx.closePath();
        symbolCtx.fill();
        symbolCtx.beginPath();
        symbolCtx.moveTo(0, -size * 0.5);
        symbolCtx.bezierCurveTo(size * 0.2, -size * 0.7, -size * 0.2, -size * 0.9, 0, -size * 0.7);
        symbolCtx.strokeStyle = '#9F7AEA';
        symbolCtx.lineWidth = size * 0.05;
        symbolCtx.stroke();
        symbolCtx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas completely every few frames to prevent shadow buildup
      const frameCount = Date.now() % 3000;
      if (frameCount < 50) {
        ctx.fillStyle = 'rgba(26, 31, 44, 1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = BACKGROUND_COLOR_FOR_TRAIL;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      drawJavaSymbol(ctx, canvas.width / 2, canvas.height / 2, canvas.height * JAVA_SYMBOL_SIZE_SCALE);

      const time = Date.now() * NODE_DRIFT_SPEED_FACTOR;

      nodesRef.current.forEach(node => {
        if (!node.isDragging) {
          node.x = node.originalX + Math.cos(time + node.angleOffset) * NODE_DRIFT_AMPLITUDE * node.size * 5;
          node.y = node.originalY + Math.sin(time + node.angleOffset) * NODE_DRIFT_AMPLITUDE * node.size * 5;

          if (firstMoveMadeRef.current && !draggedNodeRef.current) {
            const dxMouse = node.x - mousePositionRef.current.x;
            const dyMouse = node.y - mousePositionRef.current.y;
            const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distanceMouse < MOUSE_INTERACTION_RADIUS && distanceMouse > 0) {
              const forceDirectionX = dxMouse / distanceMouse;
              const forceDirectionY = dyMouse / distanceMouse;
              const forceMagnitude = (1 - distanceMouse / MOUSE_INTERACTION_RADIUS) * MOUSE_REPULSION_FORCE;
              
              node.x += forceDirectionX * forceMagnitude;
              node.y += forceDirectionY * forceMagnitude;
            }
          }
        }
        
        node.x = Math.max(node.size, Math.min(canvas.width - node.size, node.x));
        node.y = Math.max(node.size, Math.min(canvas.height - node.size, node.y));

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections
      nodesRef.current.forEach(node => {
          node.connections.forEach(targetIndex => {
              if (targetIndex >= nodesRef.current.length) return;
              const target = nodesRef.current[targetIndex];
              
              const dx = node.x - target.x;
              const dy = node.y - target.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              const opacity = Math.max(0, 1 - (distance / CONNECTION_MAX_DIST_OPACITY_CALC)) * CONNECTION_OPACITY_MULTIPLIER;

              if (opacity > 0) {
                  const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
                  gradient.addColorStop(0, node.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`));
                  gradient.addColorStop(1, target.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`));
                  
                  ctx.strokeStyle = gradient;
                  ctx.lineWidth = CONNECTION_LINE_WIDTH;
                  ctx.beginPath();
                  ctx.moveTo(node.x, node.y);
                  ctx.lineTo(target.x, target.y);
                  ctx.stroke();
              }
          });
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
      style={{ pointerEvents: 'auto', cursor: 'default' }}
    />
  );
};
export default JavaBackground;
