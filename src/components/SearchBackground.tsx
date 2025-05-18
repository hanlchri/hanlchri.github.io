
import React, { useEffect, useRef, useState } from 'react';

interface SearchNode {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  expanding: boolean;
  color: string;
}

const SearchBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let searchNodes: SearchNode[] = [];
    const maxNodes = 12;
    let lastNodeTime = 0;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseMoved(true);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Add search node
    const addSearchNode = (x?: number, y?: number) => {
      // If no position specified, create at random position
      const posX = x ?? Math.random() * canvas.width;
      const posY = y ?? Math.random() * canvas.height;
      
      // Search theme colors - mostly purples
      const hue = 250 + Math.random() * 70;
      const saturation = 70 + Math.random() * 20;
      const lightness = 50 + Math.random() * 30;
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%)`;
      
      searchNodes.push({
        x: posX,
        y: posY,
        radius: 5 + Math.random() * 10,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.1 + Math.random() * 0.3,
        expanding: true,
        color
      });
    };
    
    // Initialize with a few nodes
    for (let i = 0; i < 5; i++) {
      addSearchNode();
    }
    
    // Animation loop
    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new nodes periodically
      if (timestamp - lastNodeTime > 800 && searchNodes.length < maxNodes) {
        addSearchNode();
        lastNodeTime = timestamp;
      }
      
      // Draw magnifying glass icon in background
      drawMagnifyingGlass(ctx, canvas.width / 2, canvas.height / 2, canvas.height * 0.2);
      
      // Process each search node
      for (let i = searchNodes.length - 1; i >= 0; i--) {
        const node = searchNodes[i];
        
        // Update radius
        if (node.expanding) {
          node.radius += node.speed;
          node.opacity -= 0.002;
          
          if (node.radius > 100) {
            node.expanding = false;
          }
        } else {
          node.radius -= node.speed * 0.3;
          node.opacity -= 0.005;
          
          if (node.radius <= 0 || node.opacity <= 0) {
            searchNodes.splice(i, 1);
            continue;
          }
        }
        
        // Mouse interaction - very subtle movements
        if (mouseMoved) {
          const dx = node.x - mousePosition.x;
          const dy = node.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            // Create a ripple effect from cursor
            const force = 0.1 * (1 - distance / maxDistance);
            node.radius += force * 2;
            node.opacity = Math.min(node.opacity + force * 0.05, 0.5);
          }
        }
        
        // Draw search node rings
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = node.color.replace('hsl', 'hsla').replace(')', `, ${node.opacity})`);
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw central dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = node.color.replace('hsl', 'hsla').replace(')', ', 0.7)');
        ctx.fill();
      }
      
      // If clicked, add a node at mouse position
      if (mouseMoved && Math.random() < 0.01 && searchNodes.length < maxNodes * 1.5) {
        addSearchNode(mousePosition.x, mousePosition.y);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Helper function to draw a magnifying glass
    const drawMagnifyingGlass = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      
      // Set very low opacity for background element
      ctx.globalAlpha = 0.05;
      
      // Draw handle
      ctx.beginPath();
      ctx.moveTo(x + size * 0.5, y + size * 0.5);
      ctx.lineTo(x + size * 0.8, y + size * 0.8);
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = size * 0.15;
      ctx.lineCap = 'round';
      ctx.stroke();
      
      // Draw circle
      ctx.beginPath();
      ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = size * 0.08;
      ctx.stroke();
      
      ctx.restore();
    };
    
    animate(0);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, mouseMoved]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default SearchBackground;
