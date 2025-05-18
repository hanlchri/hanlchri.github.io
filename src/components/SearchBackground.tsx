import React, { useEffect, useRef } from 'react';

interface SearchNode {
  x: number;
  y: number;
  radius: number;
  baseSpeed: number; // Renamed from speed for clarity
  opacity: number;
  expanding: boolean;
  color: string;
  maxRadius: number; // Individual max radius
}

const SearchBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const firstMoveMadeRef = useRef(false); // Using this instead of mouseMoved state
  const searchNodesRef = useRef<SearchNode[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const lastNodeTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- START OF ADJUSTABLE PARAMETERS ---
    const MAX_NODES_ON_SCREEN = 20;
    const INITIAL_NODE_COUNT = 6;
    const NODE_SPAWN_INTERVAL_MS = 1100; // Time between automatic new nodes

    const NODE_MIN_INITIAL_RADIUS = 5;
    const NODE_MAX_INITIAL_RADIUS = 15;
    const NODE_MIN_MAX_RADIUS_TARGET = 80; // Min for a node's individual max expansion
    const NODE_MAX_MAX_RADIUS_TARGET = 120; // Max for a node's individual max expansion

    const NODE_MIN_EXPAND_SPEED = 0.25; // Base speed for radius change
    const NODE_MAX_EXPAND_SPEED = 0.6;
    const NODE_EXPAND_SPEED_MULTIPLIER = 0.6; // Factor applied to baseSpeed for expansion
    const NODE_CONTRACT_SPEED_MULTIPLIER = 0.2; // Factor for contraction

    const NODE_EXPAND_FADE_RATE = 0.0015; // Opacity decrease rate during expansion
    const NODE_CONTRACT_FADE_RATE = 0.0025; // Opacity decrease rate during contraction
    const NODE_INITIAL_MIN_OPACITY = 0.2;
    const NODE_INITIAL_MAX_OPACITY = 0.5;

    const MOUSE_INTERACTION_RADIUS = 3000; // Pixels for mouse influence
    const MOUSE_RIPPLE_FORCE_MULTIPLIER = 0.08; // Base strength of ripple effect
    const MOUSE_RIPPLE_RADIUS_EFFECT_SCALAR = 0.8; // How much radius is affected by ripple
    const MOUSE_RIPPLE_OPACITY_EFFECT_SCALAR = 0.03; // How much opacity is affected
    const MAX_OPACITY_FROM_RIPPLE = 0.6; // Max opacity a node can reach from ripple

    const ADD_NODE_ON_PSEUDO_CLICK_PROBABILITY = 0.005; // Set to 0 to disable, or e.g., 0.003 for low chance on move
                                                      // True click handling would need an actual event listener.
    const MAX_NODES_WITH_CLICK_SPAWN = MAX_NODES_ON_SCREEN + 3; // Allow a few extra if click-spawned

    const MAGNIFYING_GLASS_OPACITY = 0.04;
    const MAGNIFYING_GLASS_SIZE_SCALE = 0.25; // Relative to canvas height
    // --- END OF ADJUSTABLE PARAMETERS ---


    const addSearchNode = (x?: number, y?: number) => {
      const posX = x ?? Math.random() * canvas.width;
      const posY = y ?? Math.random() * canvas.height;

      const hue = 250 + Math.random() * 70;
      const saturation = 70 + Math.random() * 20;
      const lightness = 50 + Math.random() * 30;
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%)`;
      const initialRadius = NODE_MIN_INITIAL_RADIUS + Math.random() * (NODE_MAX_INITIAL_RADIUS - NODE_MIN_INITIAL_RADIUS);

      searchNodesRef.current.push({
        x: posX, y: posY,
        radius: initialRadius,
        baseSpeed: NODE_MIN_EXPAND_SPEED + Math.random() * (NODE_MAX_EXPAND_SPEED - NODE_MIN_EXPAND_SPEED),
        opacity: NODE_INITIAL_MIN_OPACITY + Math.random() * (NODE_INITIAL_MAX_OPACITY - NODE_INITIAL_MIN_OPACITY),
        expanding: true, color,
        maxRadius: NODE_MIN_MAX_RADIUS_TARGET + Math.random() * (NODE_MAX_MAX_RADIUS_TARGET - NODE_MIN_MAX_RADIUS_TARGET),
      });
    };
    
    const initNodes = () => { // Renamed from implicit init in original
        searchNodesRef.current = [];
        for (let i = 0; i < INITIAL_NODE_COUNT; i++) {
            addSearchNode();
        }
        lastNodeTimeRef.current = performance.now(); // Use performance.now for timestamp
    };


    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // No re-init of nodes on resize in original, maintaining that. Could be added if desired.
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    initNodes(); // Call init after first resize

    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      if (!firstMoveMadeRef.current) {
        firstMoveMadeRef.current = true;
      }
      // Pseudo-click: add node with low probability on mouse move
      if (ADD_NODE_ON_PSEUDO_CLICK_PROBABILITY > 0 && Math.random() < ADD_NODE_ON_PSEUDO_CLICK_PROBABILITY && searchNodesRef.current.length < MAX_NODES_WITH_CLICK_SPAWN) {
        addSearchNode(mousePositionRef.current.x, mousePositionRef.current.y);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const drawMagnifyingGlass = (mgCtx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        mgCtx.save();
        mgCtx.globalAlpha = MAGNIFYING_GLASS_OPACITY;
        const glassColor = '#8B5CF6'; // Example color

        mgCtx.beginPath();
        mgCtx.moveTo(x + size * 0.5, y + size * 0.5);
        mgCtx.lineTo(x + size * 0.8, y + size * 0.8);
        mgCtx.strokeStyle = glassColor;
        mgCtx.lineWidth = size * 0.15;
        mgCtx.lineCap = 'round';
        mgCtx.stroke();

        mgCtx.beginPath();
        mgCtx.arc(x, y, size * 0.6, 0, Math.PI * 2);
        mgCtx.strokeStyle = glassColor;
        mgCtx.lineWidth = size * 0.08;
        mgCtx.stroke();
        mgCtx.restore();
    };

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastNodeTimeRef.current > NODE_SPAWN_INTERVAL_MS && searchNodesRef.current.length < MAX_NODES_ON_SCREEN) {
        addSearchNode();
        lastNodeTimeRef.current = timestamp;
      }

      drawMagnifyingGlass(ctx, canvas.width / 2, canvas.height / 2, canvas.height * MAGNIFYING_GLASS_SIZE_SCALE);

      for (let i = searchNodesRef.current.length - 1; i >= 0; i--) {
        const node = searchNodesRef.current[i];

        if (node.expanding) {
          node.radius += node.baseSpeed * NODE_EXPAND_SPEED_MULTIPLIER;
          node.opacity -= NODE_EXPAND_FADE_RATE;
          if (node.radius > node.maxRadius) {
            node.expanding = false;
          }
        } else {
          node.radius -= node.baseSpeed * NODE_CONTRACT_SPEED_MULTIPLIER;
          node.opacity -= NODE_CONTRACT_FADE_RATE;
          if (node.radius <= 0 || node.opacity <= 0) {
            searchNodesRef.current.splice(i, 1);
            continue;
          }
        }

        if (firstMoveMadeRef.current) {
          const dxMouse = node.x - mousePositionRef.current.x;
          const dyMouse = node.y - mousePositionRef.current.y;
          const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distanceMouse < MOUSE_INTERACTION_RADIUS) {
            const proximityFactor = (1 - distanceMouse / MOUSE_INTERACTION_RADIUS);
            const force = MOUSE_RIPPLE_FORCE_MULTIPLIER * proximityFactor;
            node.radius += force * MOUSE_RIPPLE_RADIUS_EFFECT_SCALAR;
            node.opacity = Math.min(node.opacity + force * MOUSE_RIPPLE_OPACITY_EFFECT_SCALAR, MAX_OPACITY_FROM_RIPPLE);
          }
        }
        
        // Ensure radius and opacity are not negative after interaction
        node.radius = Math.max(0, node.radius);
        node.opacity = Math.max(0, node.opacity);


        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = node.color.replace('hsl', 'hsla').replace(')', `, ${node.opacity})`);
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.min(3, node.radius * 0.1), 0, Math.PI * 2); // Central dot size relative to radius
        ctx.fillStyle = node.color.replace('hsl', 'hsla').replace(')', `, ${Math.min(node.opacity * 1.5, 0.7)})`);
        ctx.fill();
      }
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };
    animate(performance.now()); // Pass initial timestamp

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
export default SearchBackground;
