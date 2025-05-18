import React, { useEffect, useRef } from 'react';

interface Node {
  id: number; // Added for easier original position tracking
  x: number;
  y: number;
  originalX: number; // To help with bounded movement or return
  originalY: number;
  connections: number[]; // Indices of other nodes
  size: number;
  color: string;
  angleOffset: number; // For individual motion pattern
}

const JavaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false);
  const nodesRef = useRef<Node[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- START OF ADJUSTABLE PARAMETERS ---
    const NODE_COUNT = 25; // Number of nodes
    const NODE_MIN_SIZE = 2.5;
    const NODE_MAX_SIZE = 5.5;
    const MIN_CONNECTIONS_PER_NODE = 2;
    const MAX_CONNECTIONS_PER_NODE = 3; // Max additional connections (so 2 to 2+3=5)

    const ORBIT_RADIUS_SCALE = 0.35; // Scale of overall circular pattern relative to canvas size
    const ORBIT_RANDOMNESS = 0.3;  // How much nodes deviate from perfect circle

    const NODE_DRIFT_SPEED_FACTOR = 0.0003; // Time factor for circular motion
    const NODE_DRIFT_AMPLITUDE = 0.1;    // Amplitude of the gentle drift

    const MOUSE_INTERACTION_RADIUS = 120; // Pixels for mouse influence
    const MOUSE_REPULSION_FORCE = 0.1; // Strength of mouse push effect (max force at 0 distance)

    const CONNECTION_MAX_DIST_OPACITY_CALC = 350; // Max distance used for calculating connection opacity
    const CONNECTION_OPACITY_MULTIPLIER = 0.6; // Multiplier for connection line opacity
    const CONNECTION_LINE_WIDTH = 1;

    const JAVA_SYMBOL_OPACITY = 0.04;
    const JAVA_SYMBOL_SIZE_SCALE = 0.3; // Relative to canvas height
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

        const colorValue = 20 + Math.floor(Math.random() * 40);
        const color = `rgb(255, ${150 + colorValue}, ${50 + colorValue})`;

        nodesRef.current.push({
          id: i,
          x, y,
          originalX: x, originalY: y, // Store original for drift reference
          connections: [], // Will be populated next
          size, color,
          angleOffset: Math.random() * Math.PI * 2 // For varied drift
        });
      }
      
      // Create connections
      nodesRef.current.forEach((node, i) => {
        const connections: number[] = [];
        const connectionCount = MIN_CONNECTIONS_PER_NODE + Math.floor(Math.random() * (MAX_CONNECTIONS_PER_NODE));
        for (let j = 0; j < connectionCount; j++) {
            // Connect to relatively nearby nodes in the circular arrangement
            let targetIndex = (i + 1 + Math.floor(Math.random() * (NODE_COUNT / 4)) ) % NODE_COUNT;
            if (targetIndex === i) targetIndex = (i + 1) % NODE_COUNT; // Avoid self-connection
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

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if(!firstMoveMadeRef.current) firstMoveMadeRef.current = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const drawJavaSymbol = (symbolCtx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        symbolCtx.save();
        symbolCtx.translate(x, y);
        symbolCtx.globalAlpha = JAVA_SYMBOL_OPACITY;
        symbolCtx.fillStyle = '#F89820';
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
        symbolCtx.strokeStyle = '#F89820';
        symbolCtx.lineWidth = size * 0.05;
        symbolCtx.stroke();
        symbolCtx.restore();
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawJavaSymbol(ctx, canvas.width / 2, canvas.height / 2, canvas.height * JAVA_SYMBOL_SIZE_SCALE);

      const time = Date.now() * NODE_DRIFT_SPEED_FACTOR;

      nodesRef.current.forEach(node => {
        // Gentle drift around original position
        const driftAngle = time + node.angleOffset;
        node.x = node.originalX + Math.cos(driftAngle) * NODE_DRIFT_AMPLITUDE * node.size * 5; // Scale drift by size
        node.y = node.originalY + Math.sin(driftAngle) * NODE_DRIFT_AMPLITUDE * node.size * 5;


        if (firstMoveMadeRef.current) {
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
        
        // Keep within bounds (optional, could be removed if drift + original pos keeps them roughly in view)
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
                if (targetIndex >= nodesRef.current.length) return; // Safety check
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
export default JavaBackground;
