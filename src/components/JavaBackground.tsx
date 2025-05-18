import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  connections: number[];
  size: number;
  color: string;
}

const JavaBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let nodes: Node[] = [];
    const nodeCount = 20;
    
    // Initialize nodes in a circular pattern
    const initNodes = () => {
      nodes = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      
      for (let i = 0; i < nodeCount; i++) {
        // Position nodes in a circle with some randomness
        const angle = (i / nodeCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius * (0.8 + Math.random() * 0.4);
        const y = centerY + Math.sin(angle) * radius * (0.8 + Math.random() * 0.4);
        const size = 3 + Math.random() * 3;
        
        // Create connections - each node connects to 2-4 others
        const connections: number[] = [];
        const connectionCount = 2 + Math.floor(Math.random() * 3);
        
        for (let j = 0; j < connectionCount; j++) {
          // Connect to nodes that are nearby in the circle
          const target = (i + 1 + j) % nodeCount;
          connections.push(target);
        }
        
        // Java-themed colors - orange to gold gradients
        const colorValue = 20 + Math.floor(Math.random() * 40);
        const color = `rgb(255, ${150 + colorValue}, ${50 + colorValue})`;
        
        nodes.push({ x, y, connections, size, color });
      }
    };
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes(); // Now this call is valid since initNodes is defined before being called
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseMoved(true);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Draw connections between nodes
    const drawConnections = () => {
      nodes.forEach((node, i) => {
        node.connections.forEach(targetIndex => {
          const target = nodes[targetIndex];
          
          // Calculate distance for opacity
          const dx = node.x - target.x;
          const dy = node.y - target.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 300;
          const opacity = Math.max(0, 1 - (distance / maxDistance));
          
          if (opacity > 0) {
            // Create gradient for connections
            const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
            gradient.addColorStop(0, node.color.replace('rgb', 'rgba').replace(')', ', ' + opacity * 0.5 + ')'));
            gradient.addColorStop(1, target.color.replace('rgb', 'rgba').replace(')', ', ' + opacity * 0.5 + ')'));
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
          }
        });
      });
    };
    
    // Helper function to draw a stylized Java cup symbol
    const drawJavaSymbol = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = 0.05;
      
      // Draw cup
      ctx.fillStyle = '#F89820';
      ctx.beginPath();
      ctx.moveTo(-size * 0.3, -size * 0.4);
      ctx.bezierCurveTo(-size * 0.35, size * 0.2, size * 0.35, size * 0.2, size * 0.3, -size * 0.4);
      ctx.lineTo(size * 0.2, -size * 0.5);
      ctx.lineTo(-size * 0.2, -size * 0.5);
      ctx.closePath();
      ctx.fill();
      
      // Draw steam
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.5);
      ctx.bezierCurveTo(size * 0.2, -size * 0.7, -size * 0.2, -size * 0.9, 0, -size * 0.7);
      ctx.strokeStyle = '#F89820';
      ctx.lineWidth = size * 0.05;
      ctx.stroke();
      
      ctx.restore();
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Java logo as a faint background shape
      drawJavaSymbol(ctx, canvas.width / 2, canvas.height / 2, canvas.height * 0.3);
      
      // Update node positions with mouse interaction
      nodes.forEach((node, i) => {
        // Apply subtle circular motion
        const time = Date.now() * 0.001;
        const angle = time * 0.1 + i * 0.2;
        node.x += Math.cos(angle) * 0.2;
        node.y += Math.sin(angle) * 0.2;
        
        // Keep within bounds
        if (node.x < node.size) node.x = node.size;
        if (node.x > canvas.width - node.size) node.x = canvas.width - node.size;
        if (node.y < node.size) node.y = node.size;
        if (node.y > canvas.height - node.size) node.y = canvas.height - node.size;
        
        // Mouse interaction - very subtle
        if (mouseMoved) {
          const dx = node.x - mousePosition.x;
          const dy = node.y - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (maxDistance - distance) / maxDistance * 0.3;
            
            node.x += forceDirectionX * force;
            node.y += forceDirectionY * force;
          }
        }
        
        // Draw node
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw connections
      drawConnections();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
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

export default JavaBackground;
