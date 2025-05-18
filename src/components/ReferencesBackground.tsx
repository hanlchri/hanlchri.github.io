
import React, { useEffect, useRef, useState } from 'react';

interface Line {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  speed: number;
  progress: number;
  color: string;
}

const ReferencesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseMoved, setMouseMoved] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let lines: Line[] = [];
    const maxLines = 50;
    
    // Initialize lines - MOVED BEFORE resizeCanvas
    const initLines = () => {
      lines = [];
      for (let i = 0; i < 25; i++) {
        addRandomLine();
      }
    };
    
    // Add a new random line
    const addRandomLine = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height;
      addLine(startX, startY);
    };
    
    // Add a line from a specific position
    const addLine = (startX: number, startY: number) => {
      // Create end point at some distance/angle from start
      const angle = Math.random() * Math.PI * 2;
      const distance = 50 + Math.random() * 150;
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;
      
      // Set line properties
      const width = 1 + Math.random() * 2;
      const speed = 0.005 + Math.random() * 0.01;
      
      // Turquoise/cyan color theme for references page
      const hue = 170 + Math.random() * 30;
      const saturation = 70 + Math.random() * 20;
      const lightness = 50 + Math.random() * 30;
      const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      
      lines.push({
        startX, startY,
        endX, endY,
        width, speed,
        progress: 0,
        color
      });
    };
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLines();
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setMouseMoved(true);
      
      // Add new lines from mouse position occasionally
      if (Math.random() < 0.05 && lines.length < maxLines) {
        addLine(e.clientX, e.clientY);
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      // Use a semi-transparent clear for a trail effect
      ctx.fillStyle = 'rgba(26, 31, 44, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Process each line
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = lines[i];
        
        // Update progress
        line.progress += line.speed;
        
        // Remove completed lines and add new ones
        if (line.progress >= 1) {
          lines.splice(i, 1);
          if (lines.length < maxLines) {
            addRandomLine();
          }
          continue;
        }
        
        // Calculate current end position based on progress
        const currentEndX = line.startX + (line.endX - line.startX) * line.progress;
        const currentEndY = line.startY + (line.endY - line.startY) * line.progress;
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(currentEndX, currentEndY);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.stroke();
        
        // Draw glow effect
        ctx.beginPath();
        ctx.moveTo(line.startX, line.startY);
        ctx.lineTo(currentEndX, currentEndY);
        ctx.strokeStyle = line.color.replace('hsl', 'hsla').replace(')', ', 0.5)');
        ctx.lineWidth = line.width * 3;
        ctx.stroke();
        
        // Draw end point
        ctx.beginPath();
        ctx.arc(currentEndX, currentEndY, line.width * 2, 0, Math.PI * 2);
        ctx.fillStyle = line.color;
        ctx.fill();
        
        // Mouse interaction - very subtle bend in lines
        if (mouseMoved) {
          const midX = (line.startX + currentEndX) / 2;
          const midY = (line.startY + currentEndY) / 2;
          const dx = midX - mousePosition.x;
          const dy = midY - mousePosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            const force = 0.2 * (1 - distance / maxDistance);
            line.endX += dx * force * 0.1;
            line.endY += dy * force * 0.1;
          }
        }
      }
      
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

export default ReferencesBackground;
