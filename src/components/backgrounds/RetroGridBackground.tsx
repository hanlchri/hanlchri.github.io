
import React, { useEffect, useRef } from 'react';

const RetroGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Draw the grid and glow effect
    const draw = () => {
      const time = Date.now() * 0.001;
      
      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.lineWidth = 1;
      const gridSize = 32; // 32-bit style grid
      const perspective = 500 + Math.sin(time * 0.2) * 200;
      
      // Horizon point (center of screen)
      const horizonY = canvas.height * 0.5;
      const horizonX = canvas.width * 0.5;
      
      // Draw horizontal lines with perspective
      ctx.beginPath();
      for (let y = -gridSize * 10; y <= canvas.height + gridSize * 10; y += gridSize) {
        // Calculate vanishing point perspective
        const relativeY = y - horizonY;
        const perspectiveFactor = Math.min(1, Math.abs(relativeY) / perspective);
        
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 + 0.1 * perspectiveFactor})`;
        
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      ctx.stroke();
      
      // Draw vertical lines with perspective
      ctx.beginPath();
      for (let x = -gridSize * 10; x <= canvas.width + gridSize * 10; x += gridSize) {
        // Calculate vanishing point perspective
        const relativeX = x - horizonX;
        const perspectiveFactor = Math.min(1, Math.abs(relativeX) / perspective);
        
        ctx.strokeStyle = `rgba(30, 174, 219, ${0.1 + 0.1 * perspectiveFactor})`;
        
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      ctx.stroke();
      
      // Draw glow in the center
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.5
      );
      gradient.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
      gradient.addColorStop(0.5, 'rgba(30, 174, 219, 0.05)');
      gradient.addColorStop(1, 'rgba(26, 31, 44, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    
    // Animation loop
    const animate = () => {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
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

export default RetroGridBackground;
