
import React, { useEffect, useRef } from 'react';

const RetroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Animation function
    const render = () => {
      if (!ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background color
      ctx.fillStyle = '#0a0a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid setup
      const gridSize = 40;
      const horizonY = canvas.height * 0.6;
      const vanishingPointX = canvas.width / 2;
      
      // Draw grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#4b0082';

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        const distanceFromCenter = Math.abs(x - vanishingPointX);
        const perspectiveStrength = 0.3 + (distanceFromCenter / canvas.width) * 0.8;
        
        ctx.beginPath();
        
        // Calculate offset based on time for pulsing effect
        const offset = Math.sin(time * 0.5) * 5;
        
        // Start off-screen at the bottom
        ctx.moveTo(x, canvas.height + offset);
        
        // Calculate perspective endpoint
        const perspectiveX = vanishingPointX + (x - vanishingPointX) * perspectiveStrength;
        ctx.lineTo(perspectiveX, horizonY + offset);
        
        // Set line opacity based on distance
        const opacity = 0.4 + 0.6 * (1 - distanceFromCenter / (canvas.width / 2));
        ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = horizonY; y < canvas.height; y += gridSize) {
        const perspectiveStrength = 1 - (y - horizonY) / (canvas.height - horizonY);
        
        ctx.beginPath();
        
        // Calculate offset based on time for pulsing effect
        const offset = Math.sin(time * 0.5) * 5;
        
        // Draw horizontal line with perspective
        ctx.moveTo(0, y + offset);
        
        ctx.bezierCurveTo(
          canvas.width * 0.25, // Control point 1 X
          y - gridSize * (1 - perspectiveStrength) + offset, // Control point 1 Y
          canvas.width * 0.75, // Control point 2 X
          y - gridSize * (1 - perspectiveStrength) + offset, // Control point 2 Y
          canvas.width, // End point X
          y + offset // End point Y
        );
        
        // Set line opacity based on distance from horizon
        const opacity = 0.2 + 0.8 * (1 - (y - horizonY) / (canvas.height - horizonY));
        ctx.strokeStyle = `rgba(51, 195, 240, ${opacity})`;
        ctx.stroke();
      }
      
      // Draw a subtle gradient on top
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(26, 31, 44, 0.3)');
      gradient.addColorStop(0.5, 'rgba(26, 31, 44, 0.1)');
      gradient.addColorStop(1, 'rgba(26, 31, 44, 0.7)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create scanline effect
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, y, canvas.width, 1);
      }
      
      // Add some "stars" or pixels in the upper part (sky)
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * horizonY;
        const size = Math.random() * 1.5;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.7})`;
        ctx.fillRect(x, y, size, size);
      }

      // Update time for animation
      time += 0.01;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-80 animate-fade-in" 
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default RetroBackground;
